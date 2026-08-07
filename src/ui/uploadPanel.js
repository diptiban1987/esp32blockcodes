// esp32 upload panel — status badge, upload button, and output log
import { uploadToESP32 } from "../upload/serialUpload";
import { refreshIcons } from "./icons";
import { connectSerialMonitor, toggleMonitor as smToggle } from "./SerialMonitor";
import {
  getWirelessConfig,
  uploadViaMicroPythonOTA,
  uploadViaArduinoOTA,
} from "../upload/otaUpload";
import { openWirelessModal, initWirelessModal, isWirelessEnabled } from "./WirelessModal";
import { buildArduinoSketch } from "../upload/arduinoCodeBuilder";

const STATUS_LABELS = {
  idle: { text: "Ready", cls: "status-idle" },
  waiting_port: { text: "Select Port…", cls: "status-waiting" },
  connecting: { text: "Connecting…", cls: "status-waiting" },
  interrupting: { text: "Interrupting…", cls: "status-waiting" },
  entering_repl: { text: "Entering REPL…", cls: "status-waiting" },
  uploading: { text: "Uploading…", cls: "status-uploading" },
  reading_output: { text: "Reading output…", cls: "status-uploading" },
  success: { text: "Done!", cls: "status-success" },
  error: { text: "Error", cls: "status-error" },
};

let _getCode = null;
let _getLanguage = null;
let _getWorkspace = null;
let _isUploading = false;

import { showToast } from "./ModeSwitcher";

/**
 * @param {Function} getCode      — returns current code string from editor
 * @param {Function} getLanguage  — returns 'arduino' | 'micropython'
 * @param {Function} getWorkspace — returns the Blockly workspace (needed for Arduino OTA build)
 */
export function initUploadPanel(getCode, getLanguage, getWorkspace) {
  _getCode = getCode;
  _getLanguage = getLanguage || (() => 'micropython');
  _getWorkspace = getWorkspace || null;

  const uploadBtn = document.getElementById("uploadBtn");
  if (uploadBtn) uploadBtn.addEventListener("click", handleUpload);

  const headerUploadBtn = document.getElementById("headerUploadBtn");
  if (headerUploadBtn) headerUploadBtn.addEventListener("click", handleUpload);

  // Wire up wireless toggle button (injected into DOM if not already there)
  _ensureWirelessButton();

  // Initialise the wireless modal — update button appearance when toggled
  initWirelessModal((enabled) => _updateWirelessBtnUI(enabled));

  // Reflect saved state on load
  _updateWirelessBtnUI(isWirelessEnabled());
}

/**
 * Update the upload button label based on selected language + wireless state.
 */
export function updateUploadButtonForLanguage(lang) {
  const cfg = getWirelessConfig();
  const uploadBtnLabel = document.getElementById("uploadBtnLabel");
  if (!uploadBtnLabel) return;

  if (lang === 'arduino') {
    uploadBtnLabel.textContent = cfg.enabled && cfg.espIp ? 'Flash via WiFi' : 'Download .ino';
  } else {
    uploadBtnLabel.textContent = cfg.enabled ? 'Upload via WiFi' : 'Upload Code';
  }
}

// ── Main upload handler ───────────────────────────────────────────────────────

async function handleUpload() {
  if (_isUploading) return;

  const code = _getCode();
  if (!code || code.trim() === "") {
    showToast("No code in workspace. Add some blocks first.");
    return;
  }

  const lang   = _getLanguage ? _getLanguage() : 'micropython';
  const cfg    = getWirelessConfig();
  const useOTA = cfg.enabled && cfg.espIp;

  // ── Arduino path ──────────────────────────────────────────────────────────
  if (lang === 'arduino') {
    if (cfg.enabled && cfg.wifiSsid) {
      // Build OTA-injected sketch (regardless of whether we have an IP yet)
      let otaCode = code;
      if (_getWorkspace) {
        try {
          otaCode = buildArduinoSketch(_getWorkspace(), { ssid: cfg.wifiSsid, pass: cfg.wifiPass });
        } catch (_) {
          otaCode = code; // fall back to the pre-generated code
        }
      }

      if (useOTA) {
        // Wireless: compile on server, then push binary to ESP32
        await _handleArduinoOTA(otaCode, cfg.espIp);
      } else {
        // No IP yet — download the OTA-injected sketch so user can do first USB flash
        _downloadFile(otaCode, 'sketch_ota.ino', 'text/x-arduino');
        showToast("OTA sketch downloaded! Flash once via USB. The serial monitor will show the ESP32's IP — enter it in Wireless Settings.");
      }
    } else {
      // Wireless disabled — download plain .ino as before
      _downloadFile(code, 'sketch.ino', 'text/x-arduino');
      showToast("Arduino sketch downloaded! Open in Arduino IDE to compile & upload.");
    }
    return;
  }

  // ── MicroPython path ──────────────────────────────────────────────────────
  _isUploading = true;
  setButtonState(true);

  if (useOTA) {
    await _handleMicroPythonOTA(code, cfg);
  } else {
    await _handleMicroPythonUSB(code);
  }
}

// ── Arduino OTA (compile on server + HTTP push to ESP32) ─────────────────────

async function _handleArduinoOTA(code, espIp) {
  _isUploading = true;
  setButtonState(true);
  setStatus('uploading');

  try {
    // 1. Compile on server
    showToast("Compiling…");
    const compResp = await fetch('/api/compile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const compResult = await compResp.json();

    if (!compResult.success) {
      setStatus('error');
      showToast("Compile error — check code and try again.");
      console.error('[OTA] Compile failed:', compResult.output);
      return;
    }

    // 2. Push binary to ESP32
    showToast("Pushing firmware over WiFi…");
    const result = await uploadViaArduinoOTA(espIp, compResult, setStatus);
    setStatus('success');
    showToast(`OTA upload done! ESP32 at ${espIp} is rebooting with new firmware.`);
  } catch (err) {
    setStatus('error');
    showToast("OTA Error: " + err.message);
  } finally {
    _isUploading = false;
    setButtonState(false);
  }
}

// ── MicroPython OTA (WebREPL via compile-server proxy) ───────────────────────

async function _handleMicroPythonOTA(code, cfg) {
  try {
    const result = await uploadViaMicroPythonOTA(
      code,
      { ip: cfg.espIp, password: cfg.webreplPass, port: cfg.webreplPort },
      setStatus,
    );

    if (result.success) {
      setStatus("success");
      showToast("Uploaded via WiFi!");
    } else {
      setStatus("error");
      showToast("WiFi Upload Error: " + result.output);
    }
  } catch (err) {
    setStatus("error");
    showToast("WiFi Upload Error: " + err.message);
  } finally {
    _isUploading = false;
    setButtonState(false);
  }
}

// ── MicroPython USB (existing Web Serial Raw REPL) ───────────────────────────

async function _handleMicroPythonUSB(code) {
  try {
    const result = await uploadToESP32(code, setStatus);

    if (result.success) {
      setStatus("success");
      showToast("Upload Successful! Serial monitor reconnected.");
      const smBody = document.getElementById('smBody');
      if (smBody && smBody.style.display === 'none') smToggle();
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

// ── Wireless toggle button ────────────────────────────────────────────────────

function _ensureWirelessButton() {
  if (document.getElementById('wirelessToggleBtn')) return;

  // Try to insert next to the header upload button
  const headerBtn = document.getElementById("headerUploadBtn");
  if (headerBtn && headerBtn.parentElement) {
    const btn = document.createElement('button');
    btn.id = 'wirelessToggleBtn';
    btn.title = 'Wireless Upload Settings';
    btn.className = 'header-btn';
    btn.style.cssText = 'display:inline-flex;align-items:center;gap:4px;padding:5px 10px;';
    btn.innerHTML = `<i data-lucide="wifi" style="width:14px;height:14px;"></i>`;
    headerBtn.parentElement.insertBefore(btn, headerBtn.nextSibling);
    refreshIcons();
  }

  const btn = document.getElementById('wirelessToggleBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      openWirelessModal(_getLanguage?.() || 'micropython');
    });
  }
}

function _updateWirelessBtnUI(enabled) {
  const btn = document.getElementById('wirelessToggleBtn');
  if (!btn) return;
  btn.title = enabled ? 'Wireless Upload: ON — click to configure' : 'Wireless Upload: OFF — click to enable';
  btn.style.color  = enabled ? 'var(--accent, #3b82f6)' : '';
  btn.style.opacity = enabled ? '1' : '0.6';
  // Refresh the upload button label too
  if (_getLanguage) updateUploadButtonForLanguage(_getLanguage());
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
  el.style.display = key === 'idle' ? 'none' : 'inline';
}

function setButtonState(uploading) {
  const btn = document.getElementById("uploadBtn");
  if (btn) {
    btn.disabled = uploading;
    const label = btn.querySelector('#uploadBtnLabel');
    if (label) {
      label.textContent = uploading ? "Uploading…" : (_getLanguage?.() === 'arduino' ? 'Download .ino' : 'Upload Code');
    }
  }

  const headerBtn = document.getElementById("headerUploadBtn");
  if (headerBtn) {
    headerBtn.disabled = uploading;
    headerBtn.innerHTML = uploading
      ? `<i data-lucide="loader" class="spin-icon" style="width:14px;height:14px;"></i> Uploading…`
      : `<i data-lucide="upload" style="width:14px;height:14px;"></i> Upload`;
    refreshIcons();
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
