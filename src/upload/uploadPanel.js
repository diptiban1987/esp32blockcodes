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

let _getCode = null;
let _getLanguage = null;
let _isUploading = false;

export function initUploadPanel(getCode, getLanguage) {
  _getCode = getCode;
  _getLanguage = getLanguage || (() => "micropython");

  const uploadBtn = document.getElementById("uploadBtn");
  if (uploadBtn) {
    uploadBtn.addEventListener("click", handleUpload);
  }

  const headerUploadBtn = document.getElementById("headerUploadBtn");
  if (headerUploadBtn) {
    headerUploadBtn.addEventListener("click", handleUpload);
  }
}

export function updateUploadButtonForLanguage(lang) {
  const uploadBtnLabel = document.getElementById("uploadBtnLabel");
  if (uploadBtnLabel) {
    uploadBtnLabel.textContent = lang === "arduino" ? "Compile & Upload" : "Upload Code";
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
  const libsOk = await checkAndInstallLibraries(code);
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
      body: JSON.stringify({ code }),
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
      if ("serial" in navigator && compileData.binary) {
        setStatus("uploading");
        writeBuildLog("[Build] Cloud host detected. Using Web Serial to flash ESP32 directly from browser…\n", "system");
        
        await flashESP32WebSerial(compileData.binary, writeBuildLog, setProgress);

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

async function flashESP32WebSerial(base64Binary, writeBuildLog, setProgress) {
  if (!("serial" in navigator)) {
    throw new Error("Web Serial API is not supported in this browser. Use Chrome or Edge.");
  }

  writeBuildLog("[Build] Disconnecting Serial Monitor to free port…\n", "system");
  await disconnectMonitorPort();
  const wasConnected = getConnectionState() === "connected";
  if (wasConnected) {
    await suspendSerialPort();
  }

  writeBuildLog("[Build] Select your ESP32 serial port in the browser prompt…\n", "system");
  setProgress("Select your ESP32 serial port...", 65, 300);

  const device = await navigator.serial.requestPort();

  writeBuildLog("[Build] Connecting to ESP32 via Web Serial…\n", "system");
  setProgress("Connecting to ESP32...", 70, 300);

  const transport = new Transport(device, true);
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

  // Convert base64 to binary string
  const binaryString = atob(base64Binary);

  await esploader.writeFlash({
    fileArray: [
      {
        data: binaryString,
        address: 0x10000,
      },
    ],
    flashSize: "keep",
    eraseAll: false,
    compress: true,
    reportProgress: (fileIndex, written, total) => {
      const pct = Math.round((written / total) * 100);
      setProgress(`Flashing binary (${pct}%)...`, 80 + Math.round(pct * 0.18));
    },
  });

  writeBuildLog("[Build] Flashing complete! Resetting board…\n", "build");
  try { await transport.disconnect(); } catch (_) {}
  try { await device.close(); } catch (_) {}

  if (wasConnected) {
    await resumeSerialPort();
  }
  await connectSerialMonitor();
}

