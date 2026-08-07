// uploadPanel — Arduino compile+upload & MicroPython upload
import { ESPLoader, Transport } from "esptool-js";
import { uploadToESP32 } from "./serialUpload";
import { refreshIcons } from "../ui/icons";
import { connectSerialMonitor, disconnectMonitorPort, toggleMonitor as smToggle, writeBuildLog, clearBuildLog } from "../ui/SerialMonitor";
import { showToast } from "../ui/ModeSwitcher";
import { showSubscriptionModal } from "../ui/SubscriptionModal";
import { showNoBoardModal } from "../ui/NoBoardModal";
import { disconnectSerialPort, getConnectionState, suspendSerialPort, resumeSerialPort } from "../ui/ConnectModal";
import { isFeatureEnabled } from "../services/featureFlags";
import { checkAndInstallLibraries } from "../ui/LibraryManager";

// Backend API base URL. In development this is "" (relative, proxied by webpack-dev-server).
// For production builds, set BACKEND_API_URL=https://your-api.com
const API_BASE = typeof __API_BASE_URL__ !== "undefined" ? __API_BASE_URL__ : "";

const STATUS_LABELS = {
  idle: { text: "Ready", cls: "status-idle" },
  compiling: { text: "Compiling…", cls: "status-waiting" },
  select_port: { text: "Select Port…", cls: "status-waiting" },
  uploading: { text: "Uploading…", cls: "status-uploading" },
  success: { text: "Done!", cls: "status-success" },
  error: { text: "Error", cls: "status-error" },
};

import { openWirelessModal, initWirelessModal, isWirelessEnabled } from "../ui/WirelessModal";
import { getWirelessConfig, uploadViaMicroPythonOTA, uploadViaArduinoOTA } from "./otaUpload";
import { buildArduinoSketch } from "./arduinoCodeBuilder";

let _getCode = null;
let _getLanguage = null;
let _getWorkspace = null;
let _isUploading = false;
let _preSelectedPort = null; // Web Serial port claimed immediately on button click

export function initUploadPanel(getCode, getLanguage, getWorkspace) {
  _getCode = getCode;
  _getLanguage = getLanguage || (() => "micropython");
  _getWorkspace = getWorkspace || null;

  const uploadBtn = document.getElementById("uploadBtn");
  if (uploadBtn) {
    uploadBtn.addEventListener("click", handleUpload);
  }

  const headerUploadBtn = document.getElementById("headerUploadBtn");
  if (headerUploadBtn) {
    headerUploadBtn.addEventListener("click", handleUpload);
  }

  // Inject WiFi wireless button next to header button / code editor header
  _ensureWirelessButton();
  setTimeout(_ensureWirelessButton, 200);
  setTimeout(_ensureWirelessButton, 800);

  // Initialize Wireless Modal
  initWirelessModal((enabled) => _updateWirelessBtnUI(enabled));
  _updateWirelessBtnUI(isWirelessEnabled());
}

function _ensureWirelessButton() {
  // 1. Header Wifi button
  if (!document.getElementById('wirelessToggleBtn')) {
    const target = document.getElementById("headerThemeBtn") || 
                   document.getElementById("headerCodeBtn") || 
                   document.getElementById("headerViewGroup");
    if (target && target.parentElement) {
      const btn = document.createElement('button');
      btn.id = 'wirelessToggleBtn';
      btn.title = 'Wireless Upload Settings';
      btn.className = 'header-toolbar-btn';
      btn.style.cssText = 'display:inline-flex;align-items:center;gap:4px;padding:6px 12px;margin-left:6px;border-radius:8px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);color:#fff;cursor:pointer;font-size:13px;font-weight:600;transition:all 0.2s;';
      btn.innerHTML = `<i data-lucide="wifi" style="width:15px;height:15px;"></i><span>WiFi</span>`;
      
      if (target.id === 'headerThemeBtn') {
        target.parentElement.insertBefore(btn, target);
      } else {
        target.parentElement.insertBefore(btn, target.nextSibling);
      }
      refreshIcons();
    }
  }

  // 2. Editor header Wifi button (inside Code View header next to MicroPython / Arduino dropdown)
  if (!document.getElementById('editorWirelessBtn')) {
    const envDropdown = document.getElementById('envDropdown');
    if (envDropdown && envDropdown.parentElement) {
      const eBtn = document.createElement('button');
      eBtn.id = 'editorWirelessBtn';
      eBtn.title = 'Wireless Upload Settings';
      eBtn.className = 'toolbar-btn';
      eBtn.style.cssText = 'display:inline-flex;align-items:center;gap:4px;padding:4px 10px;margin-left:8px;border-radius:6px;border:1px solid var(--border);background:var(--bg-secondary,#1e293b);color:var(--text-primary,#fff);cursor:pointer;font-size:12px;font-weight:600;';
      eBtn.innerHTML = `<i data-lucide="wifi" style="width:14px;height:14px;"></i><span>Wireless</span>`;
      envDropdown.parentElement.appendChild(eBtn);
      refreshIcons();
    }
  }

  // Add click listeners to both buttons
  ['wirelessToggleBtn', 'editorWirelessBtn'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn && !btn._hasClickListener) {
      btn._hasClickListener = true;
      btn.addEventListener('click', () => {
        openWirelessModal(_getLanguage?.() || 'micropython');
      });
    }
  });
}

function _updateWirelessBtnUI(enabled) {
  ['wirelessToggleBtn', 'editorWirelessBtn'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.title = enabled ? 'Wireless Upload: ON — click to configure' : 'Wireless Upload: OFF — click to enable';
    if (id === 'wirelessToggleBtn') {
      btn.style.background = enabled ? '#3b82f6' : 'rgba(255,255,255,0.1)';
      btn.style.borderColor = enabled ? '#2563eb' : 'rgba(255,255,255,0.2)';
    } else {
      btn.style.background = enabled ? '#3b82f6' : 'var(--bg-secondary,#1e293b)';
      btn.style.color = '#fff';
    }
  });
  if (_getLanguage) updateUploadButtonForLanguage(_getLanguage());
}

export function updateUploadButtonForLanguage(lang) {
  const cfg = getWirelessConfig();
  const uploadBtnLabel = document.getElementById("uploadBtnLabel");
  if (!uploadBtnLabel) return;
  if (lang === "arduino") {
    uploadBtnLabel.textContent = cfg.enabled && cfg.espIp ? "Flash via WiFi" : "Compile & Upload";
  } else {
    uploadBtnLabel.textContent = cfg.enabled ? "Upload via WiFi" : "Upload Code";
  }
}

import { isFeaturePhaseEnabled } from "../productionPhase";

async function handleUpload() {
  if (_isUploading) return;

  if (!isFeatureEnabled('compileUpload')) {
    showSubscriptionModal();
    return;
  }

  // Phase-gate: Upload availability is driven by date (UNLOCK_DATES).
  const lang = _getLanguage ? _getLanguage() : "micropython";
  if (lang === "micropython" && !isFeaturePhaseEnabled('micropythonUpload')) {
    showToast("MicroPython Upload unlocks later in the schedule.\nUse 'Download .py' to save your code.");
    return;
  }
  if (lang === "arduino" && !isFeaturePhaseEnabled('arduinoUpload')) {
    showToast("Arduino Compile & Upload unlocks later in the schedule.\nUse 'Download .ino' to save your code.");
    return;
  }

  const code = _getCode();
  if (!code || code.trim() === "") {
    showToast("No code in workspace. Add some blocks first.");
    return;
  }



  if (lang === "arduino") {
    return handleArduinoUpload(code);
  }

  // ── MicroPython upload (existing) ──
  _isUploading = true;
  setButtonState(true);

  try {
    const result = await uploadToESP32(code, (status) => setStatus(status));
    if (result.success) {
      setStatus("success");
      showToast("Upload Successful! Serial monitor reconnected.");
      const smBody = document.getElementById("smBody");
      if (smBody && smBody.style.display === "none") smToggle();
    } else {
      setStatus("error");
      showToast("ESP32 Error: " + result.output);
    }
  } catch (err) {
    setStatus("error");
    if (err.name === "NotFoundError") {
      showToast("No port selected. Upload cancelled.");
      setStatus("idle");
    } else {
      showToast("Error: " + err.message);
    }
  } finally {
    _isUploading = false;
    setButtonState(false);
  }
}

let currentProgress = 0;
let progressInterval = null;

function setProgress(label, targetPercent, durationMs = 0) {
  const progressWrapper = document.getElementById("uploadProgressWrapper");
  const progressBar = document.getElementById("uploadProgressBar");
  const progressLabel = document.getElementById("uploadProgressLabel");
  const progressPercent = document.getElementById("uploadProgressPercent");

  if (progressLabel) progressLabel.textContent = label;

  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }

  if (durationMs <= 0) {
    currentProgress = targetPercent;
    if (progressBar) progressBar.style.width = `${currentProgress}%`;
    if (progressPercent) progressPercent.textContent = `${Math.round(currentProgress)}%`;
  } else {
    const startPercent = currentProgress;
    const steps = 30;
    const stepDuration = durationMs / steps;
    const stepIncrement = (targetPercent - startPercent) / steps;
    let currentStep = 0;

    progressInterval = setInterval(() => {
      currentStep++;
      currentProgress = startPercent + stepIncrement * currentStep;
      if (stepIncrement > 0 && currentProgress > targetPercent) currentProgress = targetPercent;
      if (stepIncrement < 0 && currentProgress < targetPercent) currentProgress = targetPercent;

      if (progressBar) progressBar.style.width = `${currentProgress}%`;
      if (progressPercent) progressPercent.textContent = `${Math.round(currentProgress)}%`;

      if (currentStep >= steps) {
        clearInterval(progressInterval);
        progressInterval = null;
        currentProgress = targetPercent;
      }
    }, stepDuration);
  }
}

async function handleArduinoUpload(code) {
  // ── Auto-inject OTA code when wireless is enabled with WiFi credentials ──
  const cfg = getWirelessConfig();
  let finalCode = code;
  if (cfg.enabled && cfg.wifiSsid && _getWorkspace) {
    try {
      finalCode = buildArduinoSketch(_getWorkspace(), { ssid: cfg.wifiSsid, pass: cfg.wifiPass });
      writeBuildLog("[Build] OTA wireless code injected (WiFi + HTTP OTA server)\n", "system");
    } catch (_) {
      finalCode = code; // fallback to pre-generated code
    }
  }

  // ── Claim Web Serial port NOW while still inside the user gesture ──
  // navigator.serial.requestPort() must be called synchronously within a click
  // handler. By the time compilation finishes, the gesture window is closed.
  if ("serial" in navigator) {
    try {
      // Reuse any already-authorized port silently (no dialog needed)
      const existingPorts = await navigator.serial.getPorts();
      if (existingPorts.length === 1) {
        _preSelectedPort = existingPorts[0];
      } else if (existingPorts.length > 1) {
        // Multiple pre-authorized ports — show port picker modal
        _preSelectedPort = await showPortPickerModal(existingPorts);
      } else {
        // No previously authorized port — request one now (inside user gesture)
        _preSelectedPort = await navigator.serial.requestPort();
      }
    } catch (err) {
      if (err.name === "NotFoundError" || err.name === "AbortError") {
        // User cancelled port picker — don't block; we'll handle on flash
        _preSelectedPort = null;
      }
    }
  }

  _isUploading = true;
  setButtonState(true);
  clearBuildLog();

  const progressWrapper = document.getElementById("uploadProgressWrapper");
  const progressBar = document.getElementById("uploadProgressBar");
  if (progressWrapper) progressWrapper.style.display = "block";
  if (progressBar) {
    progressBar.style.width = "0%";
    progressBar.style.background = "";
    progressBar.classList.remove("error");
  }
  currentProgress = 0;

  writeBuildLog("[Build] Starting Compile & Upload…\n", "system");
  setProgress("Starting…", 3, 200);

  // ── Step 0: Library check — show install modal if any libs are missing ──
  writeBuildLog("[Build] Checking installed libraries…\n", "system");
  setProgress("Checking libraries...", 8, 500);
  const libsOk = await checkAndInstallLibraries(finalCode);
  if (!libsOk) {
    writeBuildLog("[Build] Cancelled — install required libraries and try again.\n", "error");
    setProgress("Cancelled", 0);
    if (progressWrapper) progressWrapper.style.display = "none";
    _isUploading = false;
    setButtonState(false);
    setStatus("idle");
    return;
  }
  writeBuildLog("[Build] All libraries OK!\n", "build");

  try {
    // Step 1: Compile
    setStatus("compiling");
    writeBuildLog("[Build] Compiling sketch for ESP32…\n", "system");
    setProgress("Compiling sketch for ESP32...", 45, 12000);

    const compileRes = await fetch(`${API_BASE}/api/compile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: finalCode }),
    });
    const compileData = await compileRes.json();

    if (!compileData.success) {
      setStatus("error");
      writeBuildLog(`[Build] Compile failed:\n${compileData.output}\n`, "error");
      showToast("Compile failed");
      setProgress("Compile failed!", 100);
      if (progressBar) progressBar.classList.add("error");
      return;
    }

    writeBuildLog(`[Build] Compilation successful!\n${compileData.output}\n`, "build");
    console.log("[upload] Compile OK, binary size:", compileData.binarySize);
    setProgress("Compilation successful!", 55, 300);

    // Step 2: List available serial ports (server or web serial)
    setStatus("select_port");
    writeBuildLog("[Build] Scanning serial ports…\n", "system");
    setProgress("Scanning serial ports...", 60, 400);

    let ports = [];
    try {
      const portsRes = await fetch(`${API_BASE}/api/ports`);
      const portsData = await portsRes.json();
      ports = (portsData.ports || []).filter((p) => p.port && (p.fqbn || p.vid || p.pid));
    } catch (_) {}

    // If server has no attached serial ports (e.g. cloud host on AWS), flash via Web Serial in browser
    if (ports.length === 0) {
      if ("serial" in navigator && (compileData.binary || compileData.flashFiles)) {
        setStatus("uploading");
        writeBuildLog("[Build] Cloud host detected. Using Web Serial to flash ESP32 directly from browser…\n", "system");

        await flashESP32WebSerial(compileData, writeBuildLog, setProgress);

        setStatus("success");
        writeBuildLog("[Build] Upload to ESP32 successful!\n", "build");
        showToast("Upload to ESP32 successful!");
        setProgress("Done!", 100, 200);
        return;
      }


      setStatus("error");
      writeBuildLog("[Build] No serial ports detected. Plug in your ESP32.\n", "error");
      showNoBoardModal();
      setProgress("No serial ports detected!", 100);
      if (progressBar) progressBar.classList.add("error");
      return;
    }

    // Let user pick from all detected ports
    let selectedPort = null;
    if (ports.length === 1) {
      selectedPort = ports[0].port;
    } else {
      const choice = prompt(
        `Select COM port:\n${ports.map((p, i) => `${i + 1}. ${p.port} — ${p.board}${p.vid ? ' (VID:'+p.vid+')' : ''}`).join("\n")}`,
        "1"
      );
      const idx = parseInt(choice) - 1;
      if (isNaN(idx) || idx < 0 || idx >= ports.length) {
        setStatus("idle");
        writeBuildLog("[Build] Upload cancelled.\n", "system");
        showToast("Upload cancelled.");
        setProgress("Upload cancelled!", 0);
        return;
      }
      selectedPort = ports[idx].port;
    }

    if (!selectedPort) {
      setStatus("idle");
      writeBuildLog("[Build] No port selected.\n", "system");
      showToast("No port selected.");
      setProgress("No port selected!", 0);
      return;
    }

    writeBuildLog(`[Build] Selected port: ${selectedPort}\n`, "system");
    setProgress("Disconnecting serial monitor...", 68, 500);

    // Step 3: Disconnect ALL Web Serial ports before uploading (arduino-cli needs the port)
    writeBuildLog("[Build] Disconnecting Serial Monitor to free port…\n", "system");
    await disconnectMonitorPort();
    const wasConnected = getConnectionState() === "connected";
    if (wasConnected) {
      await suspendSerialPort();
    }
    writeBuildLog("[Build] Port released.\n", "build");
    setProgress("Port released, waiting for OS...", 72, 300);

    // Windows needs time to fully release the COM port handle.
    // Without this delay, arduino-cli gets "PermissionError: Access is denied".
    await new Promise((r) => setTimeout(r, 1500));

    // Step 4: Upload
    setStatus("uploading");
    writeBuildLog(`[Build] Uploading binary to ESP32 on ${selectedPort}…\n`, "system");
    setProgress("Uploading binary to ESP32...", 95, 4000);

    const uploadRes = await fetch(`${API_BASE}/api/upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, port: selectedPort }),
    });
    const uploadData = await uploadRes.json();

    if (uploadData.success) {
      setStatus("success");
      writeBuildLog(`[Build] Upload to ${selectedPort} successful!\n${uploadData.output}\n`, "build");
      showToast(`Upload to ${selectedPort} successful!`);
      setProgress("Reconnecting serial monitor...", 98, 200);
      // Reconnect Serial Monitor to show Serial.println output
      writeBuildLog("[Build] Reconnecting Serial Monitor…\n", "system");
      if (wasConnected) {
        await resumeSerialPort();
      }
      await connectSerialMonitor();
      setProgress("Done!", 100, 200);
    } else {
      setStatus("error");
      writeBuildLog(`[Build] Upload failed:\n${uploadData.output}\n`, "error");
      showToast(`Upload failed:\n${uploadData.output}`);
      setProgress("Upload failed!", 100);
      if (progressBar) progressBar.classList.add("error");
    }
  } catch (err) {
    setStatus("error");
    writeBuildLog(`[Build] Error: ${err.message}\n`, "error");
    showToast("Error: " + err.message);
    setProgress("Error occurred!", 100);
    if (progressBar) progressBar.classList.add("error");
  } finally {
    _isUploading = false;
    setButtonState(false);
    writeBuildLog("[Build] Done.\n", "system");
    setTimeout(() => {
      if (progressWrapper) progressWrapper.style.display = "none";
    }, 1500);
  }
}

function _downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType || "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function setStatus(key) {
  const el = document.getElementById("uploadStatus");
  if (!el) return;
  const { text, cls } = STATUS_LABELS[key] || STATUS_LABELS.idle;
  el.textContent = text;
  el.className = cls;
  el.style.display = key === "idle" ? "none" : "inline";
}

function setButtonState(uploading) {
  const btn = document.getElementById("uploadBtn");
  if (btn) {
    btn.disabled = uploading;
    const label = btn.querySelector("#uploadBtnLabel");
    if (label) {
      label.textContent = uploading
        ? "Working…"
        : (_getLanguage?.() === "arduino" ? "Compile & Upload" : "Upload Code");
    }
  }

  const headerBtn = document.getElementById("headerUploadBtn");
  if (headerBtn) {
    headerBtn.disabled = uploading;
    headerBtn.innerHTML = uploading
      ? `<i data-lucide="loader" class="spin-icon" style="width:14px;height:14px;"></i> Working…`
      : `<i data-lucide="upload" style="width:14px;height:14px;"></i> Upload`;
    refreshIcons();
  }
}

async function flashESP32WebSerial(compileData, writeBuildLog, setProgress) {
  if (!("serial" in navigator)) {
    throw new Error("Web Serial API is not supported in this browser. Use Chrome or Edge.");
  }

  writeBuildLog("[Build] Disconnecting Serial Monitor to free port…\n", "system");
  await disconnectMonitorPort();
  const wasConnected = getConnectionState() === "connected";
  if (wasConnected) {
    await suspendSerialPort();
  }

  // Use port claimed at button-click time (user gesture already consumed)
  let device = _preSelectedPort;
  if (!device) {
    // Fallback: try previously authorized ports
    const existingPorts = await navigator.serial.getPorts();
    if (existingPorts.length === 1) {
      device = existingPorts[0];
    } else if (existingPorts.length > 1) {
      device = await showPortPickerModal(existingPorts);
    }
  }
  if (!device) {
    throw new Error("No serial port selected. Please click 'Compile & Upload' again and select your ESP32 port.");
  }
  writeBuildLog("[Build] Using pre-selected ESP32 serial port…\n", "system");
  setProgress("Connecting to ESP32...", 65, 300);

  writeBuildLog("[Build] Connecting to ESP32 via Web Serial…\n", "system");
  setProgress("Connecting to ESP32...", 70, 300);

  const transport = new Transport(device, false);
  const terminal = {
    clean() {},
    writeLine(msg) { writeBuildLog(`[esptool] ${msg}\n`, "build"); },
    write(msg) { writeBuildLog(msg, "build"); }
  };

  const esploader = new ESPLoader({
    transport,
    baudrate: 115200,
    terminal,
  });

  await esploader.main();
  writeBuildLog("[Build] ESP32 connected! Flashing compiled binary…\n", "build");
  setProgress("Flashing binary to ESP32...", 80, 400);

  // Build the fileArray with correct flash addresses depending on binary type
  let fileArray;
  if (compileData.flashFiles && compileData.flashFiles.length > 0) {
    const addrs = compileData.flashFiles.map((f) => `0x${f.address.toString(16)}`).join(", ");
    writeBuildLog(`[Build] Flashing ${compileData.flashFiles.length} binary file(s) at address(es) [${addrs}]…\n`, "system");
    // atob() returns a binary string; pako's deflate() UTF-8 encodes strings,
    // corrupting bytes >0x7F. Convert to Uint8Array so pako treats data as raw bytes.
    fileArray = compileData.flashFiles.map((f) => ({
      data: Uint8Array.from(atob(f.data), (c) => c.charCodeAt(0)),
      address: f.address,
    }));
  } else if (compileData.binary) {
    writeBuildLog("[Build] Flashing binary at 0x10000…\n", "system");
    fileArray = [{ data: Uint8Array.from(atob(compileData.binary), (c) => c.charCodeAt(0)), address: 0x10000 }];
  } else {
    throw new Error("No binary data received from compile server.");
  }

  await esploader.writeFlash({
    fileArray,
    flashSize: "keep",
    eraseAll: false,
    compress: true,
    reportProgress: (fileIndex, written, total) => {
      const pct = Math.round((written / total) * 100);
      setProgress(`Flashing binary (${pct}%)...`, 80 + Math.round(pct * 0.18));
    },
  });

  writeBuildLog("[Build] Flashing complete! Resetting ESP32 into run mode…\n", "build");
  setProgress("Resetting board...", 99, 200);

  // ── Correct ESP32 reset sequence ──────────────────────────────────────
  // DTR controls GPIO0 (BOOT pin). DTR=HIGH keeps GPIO0 LOW → download mode.
  // We MUST set DTR=LOW first so GPIO0 goes HIGH (normal boot), THEN pulse
  // RTS (EN pin) to reset. Without releasing DTR, the chip re-enters
  // download mode and never runs the user code.
  try {
    await transport.setDTR(false);                          // GPIO0 HIGH = normal boot
    await new Promise((r) => setTimeout(r, 50));
    await transport.setRTS(true);                           // EN LOW = hold in reset
    await new Promise((r) => setTimeout(r, 100));
    await transport.setRTS(false);                          // EN HIGH = chip runs!
    await new Promise((r) => setTimeout(r, 500));
  } catch (_) {
    // Fallback: try ESPLoader's hardReset if transport signals unavailable
    try { await esploader.hardReset(); } catch (_) {}
    await new Promise((r) => setTimeout(r, 500));
  }

  try { await transport.disconnect(); } catch (_) {}
  try { await device.close(); } catch (_) {}
  _preSelectedPort = null;

  writeBuildLog("[Build] Board reset! ESP32 is now running your new code.\n", "build");


  if (wasConnected) {
    await resumeSerialPort();
  }
  await connectSerialMonitor();
}

/**
 * Show a styled modal for picking from multiple pre-authorized Web Serial ports.
 * Returns a Promise<SerialPort | null>.
 */
function showPortPickerModal(ports) {
  return new Promise((resolve) => {
    // Remove any existing modal
    const existing = document.getElementById("portPickerModal");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "portPickerModal";
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:9999;
      background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);
      display:flex;align-items:center;justify-content:center;
    `;

    const box = document.createElement("div");
    box.style.cssText = `
      background:var(--bg-primary,#1e1e2e);color:var(--text-primary,#fff);
      border:1px solid var(--border,#444);border-radius:14px;
      padding:28px 24px;width:380px;max-width:92vw;
      box-shadow:0 20px 60px rgba(0,0,0,0.5);
      font-family:var(--font-ui,sans-serif);
    `;
    box.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
        <span style="font-size:24px;">🔌</span>
        <h3 style="margin:0;font-size:16px;font-weight:700;">Select ESP32 Port</h3>
      </div>
      <p style="font-size:13px;color:var(--text-muted,#aaa);margin:0 0 14px;">
        Multiple authorized serial ports found. Choose your ESP32:
      </p>
      <div id="portPickerList" style="display:flex;flex-direction:column;gap:8px;"></div>
      <button id="portPickerCancel" style="
        margin-top:18px;width:100%;padding:9px;border-radius:8px;border:1px solid var(--border,#444);
        background:transparent;color:var(--text-primary,#fff);cursor:pointer;font-size:13px;
      ">Cancel</button>
    `;

    const list = box.querySelector("#portPickerList");
    ports.forEach((port, i) => {
      const info = port.getInfo ? port.getInfo() : {};
      const label = info.usbVendorId
        ? `Port ${i + 1} — VID:${info.usbVendorId.toString(16)} PID:${info.usbProductId?.toString(16) || "?"}`
        : `Serial Port ${i + 1}`;
      const btn = document.createElement("button");
      btn.style.cssText = `
        padding:10px 14px;border-radius:9px;border:1px solid var(--border,#444);
        background:var(--bg-secondary,#252535);color:var(--text-primary,#fff);
        cursor:pointer;font-size:13px;text-align:left;transition:background 0.15s;
      `;
      btn.textContent = label;
      btn.onmouseover = () => btn.style.background = "var(--accent,#6366f1)";
      btn.onmouseleave = () => btn.style.background = "var(--bg-secondary,#252535)";
      btn.onclick = () => { overlay.remove(); resolve(port); };
      list.appendChild(btn);
    });

    box.querySelector("#portPickerCancel").onclick = () => { overlay.remove(); resolve(null); };
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  });
}
