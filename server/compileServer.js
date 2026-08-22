// compileServer.js — Arduino compile + upload API endpoint
// Mounted as middleware on the webpack dev server

const path = require("path");
const fs = require("fs");
const os = require("os");
const { execSync, execFileSync, exec, execFile, spawn } = require("child_process");

const ARDUINO_CLI = "arduino-cli";
const FQBN = "esp32:esp32:esp32";
const DATA_DIR = process.env.ARDUINO_DATA_DIR || "C:\\arduino-cli\\arduino-data";
const LIBRARIES_DIR = process.env.ARDUINO_LIBRARIES_DIR ||
  require("path").join(require("os").homedir(), "Documents", "Arduino", "libraries");

const crypto = require("crypto");
const FIRMWARE_DIR = path.join(os.homedir(), ".techyguide", "firmware");
if (!fs.existsSync(FIRMWARE_DIR)) {
  fs.mkdirSync(FIRMWARE_DIR, { recursive: true });
}

// ── Disk-persisted OTA state ───────────────────────────────────────────────
// Persisted to disk so OTA jobs survive Docker container restarts / deploys.
// File: ~/.techyguide/cloud-ota-state.json
const OTA_STATE_FILE = path.join(os.homedir(), ".techyguide", "cloud-ota-state.json");

function _loadOtaState() {
  try {
    if (fs.existsSync(OTA_STATE_FILE)) {
      const raw = fs.readFileSync(OTA_STATE_FILE, "utf8");
      const parsed = JSON.parse(raw);
      return {
        devices: parsed.devices || {},
        jobs: parsed.jobs || {},
      };
    }
  } catch (e) {
    console.warn("[CloudOTA] Could not load OTA state file:", e.message);
  }
  return { devices: {}, jobs: {} };
}

function _saveOtaState() {
  try {
    fs.writeFileSync(
      OTA_STATE_FILE,
      JSON.stringify({ devices: _cloudDevices, jobs: _cloudJobs }, null, 2),
      "utf8"
    );
  } catch (e) {
    console.warn("[CloudOTA] Could not persist OTA state:", e.message);
  }
}

// Load persisted state on startup
const _otaState = _loadOtaState();
const _cloudDevices = _otaState.devices; // deviceId -> { deviceId, ip, version, lastSeen, otaStatus, otaError }
const _cloudJobs    = _otaState.jobs;    // jobId -> { jobId, deviceId, version, filename, size, sha256, status, error, createdAt }

// Public Lightsail server base URL — used to return absolute firmware download URLs
// to ESP32 devices that poll from behind home/school/office NAT.
// Set SERVER_BASE_URL=https://block.techyguide.in in your Docker environment.
const SERVER_BASE_URL = (process.env.SERVER_BASE_URL || "").replace(/\/+$/, "");

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

/**
 * Find espota.py from the ESP32 Arduino core.
 * Using this directly bypasses arduino-cli's mDNS port-discovery step,
 * which fails with "port not found" on newer arduino-cli versions even
 * when the ESP32 IP is valid and port 3232 is open.
 */
function findEspotaPy() {
  const hwPath = path.join(DATA_DIR, "packages", "esp32", "hardware", "esp32");
  if (!fs.existsSync(hwPath)) return null;
  try {
    const versions = fs.readdirSync(hwPath).sort().reverse(); // newest version first
    for (const v of versions) {
      const p = path.join(hwPath, v, "tools", "espota.py");
      if (fs.existsSync(p)) return p;
    }
  } catch (_) {}
  return null;
}

/**
 * Find boot_app0.bin from the arduino-data packages directory.
 * Required for OTA partition schemes — placed at flash address 0xe000.
 */
function findBootApp0() {
  const hwPath = path.join(DATA_DIR, "packages", "esp32", "hardware", "esp32");
  if (!fs.existsSync(hwPath)) return null;
  try {
    const versions = fs.readdirSync(hwPath).sort().reverse(); // newest version first
    for (const v of versions) {
      const p = path.join(hwPath, v, "tools", "partitions", "boot_app0.bin");
      if (fs.existsSync(p)) return p;
    }
  } catch (_) {}
  return null;
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

function getFqbn(board) {
  if (board === "pico") {
    return "arduino:mbed_rp2040:pico";
  }
  return FQBN;
}

// ── Compile: receives .ino code, writes temp sketch, runs arduino-cli ──
function compileSketch(inoCode, board = "esp32") {
  const fqbn = getFqbn(board);
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
      ["compile", "--fqbn", fqbn, "--libraries", LIBRARIES_DIR, "--output-dir", buildDir, sketchDir],
      { encoding: "utf8", env: arduinoEnv(), stdio: "pipe", timeout: 300000 }
    );

    // Find all needed binaries in the output dir
    const uf2s = findFiles(buildDir, ".uf2");
    const bins = findFiles(buildDir, ".bin");
    const elfs = findFiles(buildDir, ".elf");

    const appBin    = bins.find((f) => (f.includes("sketch.ino") || f.includes(".ino")) && !f.includes("bootloader") && !f.includes("partition") && !f.includes("merged"));
    const bootBin   = bins.find((f) => f.includes("bootloader"));
    const partBin   = bins.find((f) => f.includes("partition"));
    const mergedBin = bins.find((f) => f.includes("merged"));
    const bootApp0  = findBootApp0();
    const uf2File   = uf2s.length > 0 ? uf2s[0] : null;

    // Prefer split (4 individual files) for ESP32, or uf2/bin for Pico
    const binaryType = uf2File ? "uf2" : ((bootBin && partBin && appBin) ? "split" : (mergedBin ? "merged" : "app"));

    return {
      success: true,
      output: out,
      binaryType,
      uf2File,
      bootBin:  bootBin  || null,
      partBin:  partBin  || null,
      appBin:   appBin   || null,
      bootApp0: bootApp0 || null,
      mergedBin: mergedBin || null,
      binaryPath: uf2File || mergedBin || appBin || (bins.length ? bins[0] : (elfs.length ? elfs[0] : null)),
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
      const { code, board } = await getBody(req);
      if (!code || !code.trim()) {
        return res.status(400).json({ success: false, output: "No code provided." });
      }

      console.log(`[compileServer] Compiling sketch for board: ${board || 'esp32'}...`);
      const result = compileSketch(code, board || "esp32");

      if (!result.success) {
        return res.status(422).json({ success: false, output: result.output });
      }

      if (result.binaryType === "merged" && result.mergedBin && fs.existsSync(result.mergedBin)) {
        // Official merged binary generated by arduino-cli / esptool -> flash at 0x0000
        const binData = fs.readFileSync(result.mergedBin);
        console.log(`[compileServer] Merged flash binary size: ${binData.length} bytes`);
        res.json({
          success: true,
          output: result.output,
          binaryType: "merged",
          binary: binData.toString("base64"),
          flashFiles: [
            { address: 0x0000, data: binData.toString("base64") }
          ],
          binarySize: binData.length,
        });
      } else if (result.bootBin && result.partBin && result.appBin) {
        // Return all parts with their exact flash addresses
        const flashFiles = [
          { address: 0x1000,  data: fs.readFileSync(result.bootBin).toString("base64") },
          { address: 0x8000,  data: fs.readFileSync(result.partBin).toString("base64") },
        ];
        if (result.bootApp0 && fs.existsSync(result.bootApp0)) {
          flashFiles.push({ address: 0xe000, data: fs.readFileSync(result.bootApp0).toString("base64") });
        }
        flashFiles.push({ address: 0x10000, data: fs.readFileSync(result.appBin).toString("base64") });

        console.log(`[compileServer] Split flash: ${flashFiles.length} files (boot_app0: ${!!result.bootApp0})`);
        res.json({
          success: true,
          output: result.output,
          binaryType: "split",
          flashFiles,
          binarySize: fs.readFileSync(result.appBin).length,
        });
      } else if (result.binaryPath && fs.existsSync(result.binaryPath)) {
        const binData = fs.readFileSync(result.binaryPath);
        res.json({
          success: true,
          output: result.output,
          binary: binData.toString("base64"),
          flashFiles: [
            { address: 0x10000, data: binData.toString("base64") }
          ],
          binaryType: result.binaryType || "app",
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
      const { code, port, board } = await getBody(req);
      if (!code || !code.trim()) {
        return res.status(400).json({ success: false, output: "No code provided." });
      }
      if (!port) {
        return res.status(400).json({ success: false, output: "No port specified." });
      }

      const fqbn = getFqbn(board || "esp32");

      // Write temp sketch
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "arduino-upload-"));
      const sketchDir = path.join(tmpDir, "sketch");
      fs.mkdirSync(sketchDir, { recursive: true });
      fs.writeFileSync(path.join(sketchDir, "sketch.ino"), code, "utf8");

      try {
        console.log(`[compileServer] Compiling + uploading for ${board || 'esp32'} (${fqbn}) to ${port}...`);
        const out = execFileSync(
          cli,
          ["compile", "--upload", "--port", port, "--fqbn", fqbn, "--libraries", LIBRARIES_DIR, sketchDir],
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

  // POST /api/ota-push — upload compiled firmware to ESP32 via ArduinoOTA (arduino-cli network protocol).
  // The server must be on the same LAN as the ESP32.  AWS / cloud deployments cannot
  // use this route because the ESP32's private IP is not routable from the internet.
  router.otaPush = async (req, res) => {
    try {
      const { espIp, binary, port = 3232 } = await getBody(req);
      if (!espIp)   return res.status(400).json({ success: false, output: 'No ESP32 IP provided.' });
      if (!binary)  return res.status(400).json({ success: false, output: 'No binary provided.' });

      const cli = findCli();
      if (!cli) return res.status(500).json({ success: false, output: 'arduino-cli not found. Install from https://arduino.github.io/arduino-cli/' });

      const binBuffer = Buffer.from(binary, 'base64');
      console.log(`[OTA] Pushing ${binBuffer.length} bytes to ${espIp}:${port} via ArduinoOTA...`);

      // Write the app binary to a temp file — arduino-cli needs a file path.
      const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'arduino-ota-'));
      const binPath = path.join(tmpDir, 'firmware.bin');
      fs.writeFileSync(binPath, binBuffer);

      try {
        // Prefer espota.py directly — arduino-cli's --protocol network requires the
        // ESP32 to be discoverable via mDNS first, and throws "port not found" on
        // newer versions (0.34+) even when the IP is valid and port 3232 is open.
        // espota.py opens a direct TCP connection to the IP, no mDNS needed.
        const espotaScript = findEspotaPy();
        let out;
        if (espotaScript) {
          const pythonBin = os.platform() === 'win32' ? 'python' : 'python3';
          console.log(`[OTA] Using espota.py at ${espotaScript}`);
          out = execFileSync(
            pythonBin,
            [espotaScript, '-i', espIp, '-p', String(port), '-f', binPath],
            { encoding: 'utf8', env: process.env, stdio: 'pipe', timeout: 60000 }
          );
        } else {
          // Fallback: let arduino-cli attempt it (works on older CLI versions)
          console.log('[OTA] espota.py not found — falling back to arduino-cli network protocol');
          out = execFileSync(
            cli,
            ['upload', '--port', `${espIp}:${port}`, '--fqbn', FQBN, '--protocol', 'network', '-i', binPath],
            { encoding: 'utf8', env: arduinoEnv(), stdio: 'pipe', timeout: 60000 }
          );
        }
        console.log(`[OTA] Success — ESP32 at ${espIp}:${port} is rebooting`);
        res.json({ success: true, output: `OTA flash successful. ESP32 is rebooting...\n${out}` });
      } catch (err) {
        const msg = (err.stderr || err.stdout || err.message || '').trim();
        console.error(`[OTA] Push failed:`, msg);
        res.status(500).json({ success: false, output: `OTA push failed: ${msg}` });
      } finally {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      }
    } catch (err) {
      res.status(500).json({ success: false, output: err.message });
    }
  };

  // POST /api/ota-ping — check if ESP32 is reachable and has ArduinoOTA running.
  // Tries a TCP connection to port 3232 (the ArduinoOTA port set in the sketch).
  // Falls back to a quick HTTP GET to port 80 /ping for backward compatibility.
  router.otaPing = async (req, res) => {
    try {
      const { espIp } = await getBody(req);
      if (!espIp) return res.status(400).json({ reachable: false, output: 'No IP provided.' });

      const net = require('net');
      const OTA_PORT = 3232;

      const tcpReachable = await new Promise((resolve) => {
        const sock = new net.Socket();
        sock.setTimeout(3000);
        sock.once('connect', () => { sock.destroy(); resolve(true); });
        sock.once('error',   () => { sock.destroy(); resolve(false); });
        sock.once('timeout', () => { sock.destroy(); resolve(false); });
        sock.connect(OTA_PORT, espIp);
      });

      if (tcpReachable) {
        console.log(`[OTA-ping] ${espIp}:${OTA_PORT} is open — ArduinoOTA ready`);
        res.json({ reachable: true, otaReady: true, ip: espIp });
      } else {
        // Not on ArduinoOTA port — device may be unreachable or running different firmware
        res.json({ reachable: false, otaReady: false, ip: espIp });
      }
    } catch (err) {
      res.json({ reachable: false, otaReady: false, output: err.message });
    }
  };

  // POST /api/mdns-resolve — resolve a .local hostname on the server's local network.
  // Node.js getaddrinfo() does not use mDNS on Windows; this spawns a platform-specific
  // command that does use the OS mDNS stack so the server can find the ESP32 by hostname.
  router.mdnsResolve = async (req, res) => {
    try {
      const { hostname } = await getBody(req);
      if (!hostname) return res.status(400).json({ success: false, ip: null, output: 'No hostname provided.' });

      const platform = os.platform();
      let cmd, args;

      if (platform === 'win32') {
        // PowerShell uses Windows DNS Client which supports mDNS on Windows 10/11.
        cmd = 'powershell';
        args = [
          '-NonInteractive', '-NoProfile', '-Command',
          `try { [System.Net.Dns]::GetHostAddresses('${hostname}') ` +
          `| Where-Object { $_.AddressFamily -eq 'InterNetwork' } ` +
          `| Select-Object -First 1 -ExpandProperty IPAddressToString } ` +
          `catch { Write-Error $_.Exception.Message; exit 1 }`,
        ];
      } else if (platform === 'darwin') {
        // macOS — dscacheutil speaks mDNS via mDNSResponder
        cmd = 'dscacheutil';
        args = ['-q', 'host', '-a', 'name', hostname];
      } else {
        // Linux — avahi-resolve-host-name (requires avahi-utils package)
        cmd = 'avahi-resolve-host-name';
        args = ['--name', hostname];
      }

      const ip = await new Promise((resolve, reject) => {
        const proc = spawn(cmd, args);
        let stdout = '';
        let stderr = '';
        proc.stdout.on('data', d => { stdout += d.toString(); });
        proc.stderr.on('data', d => { stderr += d.toString(); });
        const timer = setTimeout(() => { proc.kill(); reject(new Error('mDNS resolve timed out after 6s')); }, 6000);
        proc.on('close', (code) => {
          clearTimeout(timer);
          const m = stdout.match(/\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/);
          if (m) resolve(m[1]);
          else reject(new Error(`Could not resolve ${hostname} — code ${code}: ${stderr.trim() || stdout.trim()}`));
        });
        proc.on('error', (err) => { clearTimeout(timer); reject(err); });
      });

      console.log(`[mDNS] Resolved ${hostname} → ${ip}`);
      res.json({ success: true, ip });
    } catch (err) {
      console.warn(`[mDNS] Resolution failed for hostname: ${err.message}`);
      res.status(404).json({ success: false, ip: null, output: err.message });
    }
  };

  // POST /api/webrepl-upload — MicroPython WebREPL upload via server-side WebSocket proxy
  router.webreplUpload = async (req, res) => {
    let ws = null;
    try {
      const WebSocket = require('ws');
      const { ip, port = 8266, password = '', code } = await getBody(req);
      if (!ip) return res.status(400).json({ success: false, output: 'No ESP32 IP provided.' });
      if (!code) return res.status(400).json({ success: false, output: 'No code provided.' });

      const wsUrl = `ws://${ip}:${port}`;
      console.log(`[WebREPL] Connecting to ${wsUrl}...`);

      ws = new WebSocket(wsUrl, { handshakeTimeout: 5000 });
      let buffer = '';
      let resolver = null;

      const waitFor = (pattern, timeoutMs = 3000) => new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error(`Timeout waiting for: ${pattern}`)), timeoutMs);
        resolver = (data) => {
          buffer += data;
          if (buffer.includes(pattern)) {
            clearTimeout(timer);
            resolver = null;
            resolve(buffer);
            buffer = '';
          }
        };
      });

      ws.on('message', (data) => {
        const text = data.toString();
        if (resolver) resolver(text);
      });

      await new Promise((resolve, reject) => {
        ws.once('open', resolve);
        ws.once('error', reject);
        setTimeout(() => reject(new Error('Connection timeout')), 5000);
      });

      // Authenticate
      await waitFor('Password:', 5000);
      ws.send(password + '\r\n');
      await waitFor('>>>', 5000);

      // Interrupt + enter raw REPL
      ws.send('\x03\x03');
      await new Promise(r => setTimeout(r, 200));
      ws.send('\x01');
      const greeting = await waitFor('raw REPL', 3000).catch(async () => {
        ws.send('\x04\x03\x01');
        return await waitFor('raw REPL', 3000);
      });

      // Send code in chunks
      const CHUNK = 256;
      for (let i = 0; i < code.length; i += CHUNK) {
        ws.send(code.slice(i, i + CHUNK));
        await new Promise(r => setTimeout(r, 20));
      }
      ws.send('\x04'); // execute

      // Read response
      const resp = await waitFor('\x04', 3000).catch(() => buffer);
      let stderr = '';
      const match = resp.match(/OK([\s\S]*?)\x04([\s\S]*?)\x04/);
      if (match) stderr = match[2].trim();

      ws.close();

      if (stderr) {
        res.json({ success: false, output: stderr });
      } else {
        res.json({ success: true, output: 'Code uploaded via WebREPL!' });
      }

    } catch (err) {
      if (ws) try { ws.close(); } catch (_) {}
      console.error('[WebREPL] Error:', err.message);
      res.status(500).json({ success: false, output: err.message });
    }
  };

  // ── Cloud OTA Endpoints (Mode 3: Lightsail Remote Firmware OTA) ──
  router.cloudOtaPublish = async (req, res) => {
    try {
      const { code, deviceId = "TG-ESP32-000001", version = "1.0.1" } = await getBody(req);
      if (!code || !code.trim()) {
        return res.status(400).json({ success: false, output: "No code provided for compilation." });
      }

      console.log(`[CloudOTA] Compiling firmware for device ${deviceId} (v${version})...`);
      const comp = compileSketch(code);
      if (!comp.success) {
        return res.status(422).json({ success: false, output: comp.output });
      }

      const binPath = comp.appBin || comp.mergedBin || comp.binaryPath;
      if (!binPath || !fs.existsSync(binPath)) {
        return res.status(500).json({ success: false, output: "Compilation succeeded but binary file not found." });
      }

      const binBuffer = fs.readFileSync(binPath);
      const sha256 = crypto.createHash("sha256").update(binBuffer).digest("hex");
      const filename = `firmware-${deviceId.replace(/[^a-zA-Z0-9_-]/g, "")}-${Date.now()}.bin`;
      const targetPath = path.join(FIRMWARE_DIR, filename);

      fs.writeFileSync(targetPath, binBuffer);

      if (comp.sketchDir) {
        fs.rmSync(comp.sketchDir, { recursive: true, force: true });
      }

      const jobId = `job-${Date.now()}`;
      const job = {
        jobId,
        deviceId,
        version,
        filename,
        filePath: targetPath,
        size: binBuffer.length,
        sha256,
        status: "PENDING",
        error: null,
        createdAt: Date.now(),
      };

      _cloudJobs[jobId] = job;
      _cloudJobs[`latest_${deviceId}`] = job;

      if (!_cloudDevices[deviceId]) {
        _cloudDevices[deviceId] = {
          deviceId,
          ip: "Unknown",
          version: "0.0.0",
          lastSeen: 0,
          otaStatus: "PENDING",
          otaError: null,
        };
      }
      _cloudDevices[deviceId].otaStatus = "PENDING";
      _cloudDevices[deviceId].otaError = null;

      // Persist to disk so the job survives a container restart
      _saveOtaState();

      console.log(`[CloudOTA] Job ${jobId} created for ${deviceId} (${binBuffer.length} bytes, SHA256: ${sha256.substring(0, 8)}...)`);

      res.json({
        success: true,
        jobId,
        deviceId,
        version,
        size: binBuffer.length,
        sha256,
        output: comp.output,
      });
    } catch (err) {
      console.error("[CloudOTA] Publish error:", err);
      res.status(500).json({ success: false, output: err.message });
    }
  };

  router.cloudOtaPoll = async (req, res) => {
    try {
      const deviceId = req.headers["x-device-id"] || req.query?.deviceId || "TG-ESP32-000001";
      const currentVersion = req.headers["x-firmware-version"] || req.query?.version || "1.0.0";
      const clientIp = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "127.0.0.1";

      _cloudDevices[deviceId] = {
        deviceId,
        ip: clientIp,
        version: currentVersion,
        lastSeen: Date.now(),
        otaStatus: _cloudDevices[deviceId]?.otaStatus || "IDLE",
        otaError: _cloudDevices[deviceId]?.otaError || null,
      };

      const latestJob = _cloudJobs[`latest_${deviceId}`];
      if (latestJob && latestJob.status === "PENDING") {
        // Always return an ABSOLUTE URL so the ESP32 can download firmware
        // from the Lightsail server regardless of its own local network.
        // SERVER_BASE_URL must be set to https://block.techyguide.in (or similar)
        // in the Docker environment. Falls back to a relative path for local dev.
        const downloadUrl = SERVER_BASE_URL
          ? `${SERVER_BASE_URL}/api/cloud-ota/download/${latestJob.filename}`
          : `/api/cloud-ota/download/${latestJob.filename}`;

        return res.json({
          hasJob: true,
          jobId: latestJob.jobId,
          version: latestJob.version,
          size: latestJob.size,
          sha256: latestJob.sha256,
          downloadUrl,
        });
      }

      res.json({ hasJob: false });
    } catch (err) {
      res.status(500).json({ hasJob: false, error: err.message });
    }
  };

  router.cloudOtaStatus = async (req, res) => {
    try {
      const { deviceId, jobId, status, error, version } = await getBody(req);
      if (!deviceId || !status) {
        return res.status(400).json({ success: false, output: "Missing deviceId or status" });
      }

      console.log(`[CloudOTA] Device ${deviceId} status: ${status} ${error ? "(" + error + ")" : ""}`);

      if (_cloudDevices[deviceId]) {
        _cloudDevices[deviceId].otaStatus = status;
        _cloudDevices[deviceId].otaError = error || null;
        _cloudDevices[deviceId].lastSeen = Date.now();
        if (version && status === "SUCCESS") {
          _cloudDevices[deviceId].version = version;
        }
      }

      if (jobId && _cloudJobs[jobId]) {
        _cloudJobs[jobId].status = status;
        if (error) _cloudJobs[jobId].error = error;
      }
      if (_cloudJobs[`latest_${deviceId}`]) {
        _cloudJobs[`latest_${deviceId}`].status = status;
        if (error) _cloudJobs[`latest_${deviceId}`].error = error;
      }

      // Persist updated status to disk
      _saveOtaState();

      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, output: err.message });
    }
  };

  router.cloudOtaDownload = async (req, res) => {
    try {
      const parts = (req.url || "").split("/download/");
      const filename = path.basename(parts[1] || "");
      if (!filename) return res.status(400).end("Invalid filename");

      const filePath = path.join(FIRMWARE_DIR, filename);
      if (!fs.existsSync(filePath)) {
        return res.status(404).end("Firmware binary not found");
      }

      const stat = fs.statSync(filePath);
      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader("Content-Length", stat.size);
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

      fs.createReadStream(filePath).pipe(res);
    } catch (err) {
      res.status(500).end(err.message);
    }
  };

  router.cloudOtaDevices = async (req, res) => {
    const list = Object.values(_cloudDevices).map(dev => {
      const isOnline = (Date.now() - dev.lastSeen) < 35000;
      return {
        ...dev,
        status: isOnline ? "ONLINE" : "OFFLINE",
      };
    });
    res.json({ success: true, devices: list });
  };

  router.cloudOtaJobStatus = async (req, res) => {
    const rawUrl = req.url || "";
    const urlParams = new URLSearchParams(rawUrl.includes("?") ? rawUrl.split("?")[1] : "");
    const deviceId = urlParams.get("deviceId") || "TG-ESP32-000001";
    const jobId = urlParams.get("jobId");
    const job = jobId ? _cloudJobs[jobId] : _cloudJobs[`latest_${deviceId}`];
    const dev = _cloudDevices[deviceId];

    const isOnline = dev ? (Date.now() - dev.lastSeen) < 35000 : false;

    res.json({
      success: true,
      deviceId,
      deviceOnline: isOnline,
      deviceIp: dev?.ip || "Unknown",
      currentVersion: dev?.version || "Unknown",
      jobStatus: job?.status || dev?.otaStatus || "IDLE",
      error: job?.error || dev?.otaError || null,
      sha256: job?.sha256 || null,
      version: job?.version || null,
    });
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
  if (method === "POST" && endpoint === "/ota-push") return _router.otaPush(req, res);
  if (method === "POST" && endpoint === "/ota-ping") return _router.otaPing(req, res);
  if (method === "POST" && endpoint === "/mdns-resolve") return _router.mdnsResolve(req, res);
  if (method === "POST" && endpoint === "/webrepl-upload") return _router.webreplUpload(req, res);

  // Cloud OTA routes
  if (method === "POST" && endpoint === "/cloud-ota/publish") return _router.cloudOtaPublish(req, res);
  if ((isGet || method === "POST") && endpoint === "/cloud-ota/poll") return _router.cloudOtaPoll(req, res);
  if (method === "POST" && endpoint === "/cloud-ota/status") return _router.cloudOtaStatus(req, res);
  if (isGet && endpoint.startsWith("/cloud-ota/download/")) return _router.cloudOtaDownload(req, res);
  if (isGet && endpoint === "/cloud-ota/devices") return _router.cloudOtaDevices(req, res);
  if (isGet && endpoint === "/cloud-ota/job-status") return _router.cloudOtaJobStatus(req, res);

  // Not our route
  res.status(404).json({ success: false, output: `Not found: ${method} ${req.url}` });
}

module.exports = handleRequest;

