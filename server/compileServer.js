// compileServer.js — Arduino compile + upload API endpoint
// Mounted as middleware on the webpack dev server

const path = require("path");
const fs = require("fs");
const os = require("os");
const { execSync, execFileSync, exec, execFile } = require("child_process");

const ARDUINO_CLI = "arduino-cli";
const FQBN = "esp32:esp32:esp32";
const DATA_DIR = process.env.ARDUINO_DATA_DIR || "C:\\arduino-cli\\arduino-data";
const LIBRARIES_DIR = process.env.ARDUINO_LIBRARIES_DIR ||
  require("path").join(require("os").homedir(), "Documents", "Arduino", "libraries");

// ── helpers ────────────────────────────────────────────

function findCli() {
  // Explicit Linux & Windows binary locations
  const directPaths = [
    "/usr/local/bin/arduino-cli",
    "/usr/bin/arduino-cli",
    path.join(os.homedir(), ".local", "bin", "arduino-cli"),
    path.join(os.homedir(), ".local", "bin", "arduino-cli.exe"),
    "C:\\arduino-cli\\arduino-cli.exe",
    "C:\\arduino-cli\\arduino-cli",
  ];
  for (const p of directPaths) {
    if (fs.existsSync(p)) return p;
  }

  try {
    execSync(`${ARDUINO_CLI} version`, { encoding: "utf8", stdio: "pipe" });
    return ARDUINO_CLI;
  } catch (_) {
    const candidates = [
      path.join(os.homedir(), "AppData", "Local", "Programs", "Arduino CLI", "arduino-cli"),
      "C:\\Program Files\\Arduino CLI\\arduino-cli",
    ];
    for (const c of candidates) {
      try {
        execSync(`"${c}" version`, { encoding: "utf8", stdio: "pipe" });
        return c;
      } catch (_) {}
    }
    return null;
  }
}

function arduinoEnv() {
  return { ...process.env, ARDUINO_DATA_DIR: DATA_DIR };
}

function findFiles(dir, ext) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  function walk(d) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(ext)) results.push(full);
    }
  }
  walk(dir);
  return results;
}

// ── Compile: receives .ino code, writes temp sketch, runs arduino-cli ──
function compileSketch(inoCode) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "arduino-sketch-"));
  const sketchDir = path.join(tmpDir, "sketch");
  const buildDir = path.join(tmpDir, "build");
  fs.mkdirSync(sketchDir, { recursive: true });
  fs.mkdirSync(buildDir, { recursive: true });

  fs.writeFileSync(path.join(sketchDir, "sketch.ino"), inoCode, "utf8");

  try {
    const cli = findCli();
    if (!cli) {
      return {
        success: false,
        output: "arduino-cli binary not found. Please verify /usr/local/bin/arduino-cli exists.",
        binaryPath: null, sketchDir: null, buildDir: null
      };
    }
    const out = execFileSync(
      cli,
      ["compile", "--fqbn", FQBN, "--libraries", LIBRARIES_DIR, "--output-dir", buildDir, sketchDir],
      { encoding: "utf8", env: arduinoEnv(), stdio: "pipe", timeout: 120000 }
    );

    // Find binaries in the output dir
    const bins = findFiles(buildDir, ".bin");
    const mergedBin = bins.find((f) => f.includes("merged"));
    const appBin = bins.find((f) => f.includes("sketch.ino") || f.includes(".ino"));

    return {
      success: true,
      output: out,
      binaryPath: mergedBin || appBin || null,
      sketchDir: tmpDir,
      buildDir,
    };
  } catch (err) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    return {
      success: false,
      output: err.stderr || err.message,
      binaryPath: null,
      sketchDir: null,
      buildDir: null,
    };
  }
}

// ── read body helper ──────────────────────────────────
// If express.json() already pre-parsed the body (aws/server.js),
// use req.body directly. Otherwise read raw stream (webpack dev server).
function getBody(req) {
  if (req.body !== undefined) return Promise.resolve(req.body);
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (c) => (data += c));
    req.on("end", () => {
      try { resolve(JSON.parse(data)); }
      catch (e) { reject(new Error("Invalid JSON")); }
    });
    req.on("error", reject);
  });
}

// ── Router ─────────────────────────────────────────────
function createRouter(cli) {
  const router = {};

  const KNOWN_VIDS = {
    "0x1A86": "ESP32 (CH340)",
    "0x10C4": "ESP32 (CP210x)",
    "0x0403": "ESP32 (FTDI)",
    "0x1A86|0x7523": "ESP32 (CH340)",
  };

  function guessBoardName(p) {
    const mfg = `${p.mfg || ""} ${p.boardName || ""}`.trim();
    if (mfg) return mfg;
    const vid = p.port?.properties?.vid || "";
    const pid = p.port?.properties?.pid || "";
    const key = `${vid}|${pid}`;
    return KNOWN_VIDS[key] || KNOWN_VIDS[vid] || "Serial port";
  }

  // GET /api/ports — list serial ports
  router.listPorts = async (req, res) => {
    try {
      if (!cli) throw new Error("arduino-cli not found");
      const out = execFileSync(cli, ["board", "list", "--format", "json"], {
        encoding: "utf8",
        env: arduinoEnv(),
        stdio: "pipe",
        timeout: 10000,
      });
      const parsed = JSON.parse(out);
      const detectedPorts = parsed.detected_ports || [];
      const detected = detectedPorts.map((p) => ({
        port: p.port?.address || p.port?.label || "unknown",
        board: guessBoardName(p),
        fqbn: p.matchingFqbn || "",
        vid: p.port?.properties?.vid || "",
        pid: p.port?.properties?.pid || "",
      }));
      res.json({ success: true, ports: detected });
    } catch (err) {
      res.json({ success: true, ports: [] });
    }
  };

  // POST /api/compile — compile only, return base64 binary
  router.compile = async (req, res) => {
    if (!cli) {
      return res.status(500).json({
        success: false,
        output: "arduino-cli not found. Install from https://arduino.github.io/arduino-cli/",
      });
    }

    try {
      const { code } = await getBody(req);
      if (!code || !code.trim()) {
        return res.status(400).json({ success: false, output: "No code provided." });
      }

      console.log("[compileServer] Compiling sketch...");
      const result = compileSketch(code);

      if (!result.success) {
        return res.status(422).json({ success: false, output: result.output });
      }

      if (result.binaryPath && fs.existsSync(result.binaryPath)) {
        const binData = fs.readFileSync(result.binaryPath);
        res.json({
          success: true,
          output: result.output,
          binary: binData.toString("base64"),
          binarySize: binData.length,
        });
      } else {
        res.json({
          success: true,
          output: result.output + "\n(No .bin found in build output)",
          binary: null,
        });
      }

      if (result.sketchDir) {
        fs.rmSync(result.sketchDir, { recursive: true, force: true });
      }
    } catch (err) {
      res.status(500).json({ success: false, output: err.message });
    }
  };

  // POST /api/upload — compile + upload to given port
  router.upload = async (req, res) => {
    if (!cli) {
      return res.status(500).json({
        success: false,
        output: "arduino-cli not found. Install from https://arduino.github.io/arduino-cli/",
      });
    }

    try {
      const { code, port } = await getBody(req);
      if (!code || !code.trim()) {
        return res.status(400).json({ success: false, output: "No code provided." });
      }
      if (!port) {
        return res.status(400).json({ success: false, output: "No port specified." });
      }

      // Write temp sketch
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "arduino-upload-"));
      const sketchDir = path.join(tmpDir, "sketch");
      fs.mkdirSync(sketchDir, { recursive: true });
      fs.writeFileSync(path.join(sketchDir, "sketch.ino"), code, "utf8");

      try {
        console.log(`[compileServer] Compiling + uploading to ${port}...`);
        const out = execFileSync(
          cli,
          ["compile", "--upload", "--port", port, "--fqbn", FQBN, "--libraries", LIBRARIES_DIR, sketchDir],
          { encoding: "utf8", env: arduinoEnv(), stdio: "pipe", timeout: 180000 }
        );
        res.json({ success: true, output: out });
      } catch (err) {
        res.status(422).json({
          success: false,
          output: err.stderr || err.message,
        });
      } finally {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      }
    } catch (err) {
      res.status(500).json({ success: false, output: err.message });
    }
  };

  // GET /api/libs — list installed libraries (async, non-blocking)
  router.listLibs = (req, res) => {
    if (!cli) return res.json({ success: true, libs: [] });
    // Use plain-text list — more compatible across arduino-cli versions
    exec(`"${cli}" lib list`, { timeout: 15000, env: arduinoEnv() }, (err, stdout, stderr) => {
      if (err) {
        console.warn('[compileServer] lib list error:', stderr || err.message);
        return res.json({ success: true, libs: [] });
      }
      // Each line: "Name      Version  Available  Location  Description"
      // Split on 2+ consecutive spaces to isolate columns
      const libs = [];
      const lines = stdout.split('\n').slice(1); // skip header row
      for (const line of lines) {
        if (!line.trim()) continue;
        const cols = line.split(/\s{2,}/);
        if (cols[0] && cols[0].trim()) libs.push(cols[0].trim());
      }
      res.json({ success: true, libs });
    });
  };

  // POST /api/install-lib — install a single named library (async, non-blocking)
  router.installLib = async (req, res) => {
    if (!cli) {
      return res.status(500).json({ success: false, output: 'arduino-cli not found.' });
    }
    try {
      const { library } = await getBody(req);
      if (!library || !library.trim()) {
        return res.status(400).json({ success: false, output: 'No library name provided.' });
      }
      console.log(`[compileServer] Installing library: ${library}`);

      // Update library index first to ensure we can fetch the library
      await new Promise((resolve) => {
        execFile(cli, ['lib', 'update-index'], {
          encoding: 'utf8', env: arduinoEnv(), timeout: 60000,
        }, () => resolve());
      });

      // Use async exec — library installs take 30-120s and would freeze the page
      await new Promise((resolve, reject) => {
        execFile(cli, ['lib', 'install', library], {
          encoding: 'utf8', env: arduinoEnv(), timeout: 180000,
        }, (err, stdout, stderr) => {
          if (err) {
            const msg = stderr || stdout || err.message;
            res.status(422).json({ success: false, output: msg });
            resolve();
          } else {
            res.json({ success: true, output: stdout });
            resolve();
          }
        });
      });
    } catch (err) {
      res.status(500).json({ success: false, output: err.message });
    }
  };

  return router;
}

// ─── Express-compatible middleware ─────────────────────
let _router = null;

function handleRequest(req, res) {
  if (!_router) _router = createRouter(findCli());

  // Extract clean path (strip query params)
  const rawPath = (req.url || "/").split("?")[0];
  // Strip optional /api prefix so /libs and /api/libs both map to /libs
  const endpoint = rawPath.replace(/^\/api/, "") || "/";

  const method = req.method;
  const isGet = method === "GET" || method === "HEAD";

  if (method === "OPTIONS") {
    return res.status(204).end();
  }

  if (isGet && endpoint === "/ports") return _router.listPorts(req, res);
  if (method === "POST" && endpoint === "/compile") return _router.compile(req, res);
  if (method === "POST" && endpoint === "/upload") return _router.upload(req, res);
  if (isGet && endpoint === "/libs") return _router.listLibs(req, res);
  if (method === "POST" && endpoint === "/install-lib") return _router.installLib(req, res);

  // Not our route
  res.status(404).json({ success: false, output: `Not found: ${method} ${req.url}` });
}

module.exports = handleRequest;

