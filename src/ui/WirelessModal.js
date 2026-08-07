// WirelessModal — configure WiFi credentials, ESP32 IP, and WebREPL settings.
// Used for both Arduino OTA and MicroPython WebREPL wireless uploads.
import { refreshIcons } from './icons';
import { getWirelessConfig, saveWirelessConfig, pingESP32 } from '../upload/otaUpload';

let _overlay = null;
let _onToggle = null; // callback(enabled) when wireless mode changes

export function initWirelessModal(onToggle) {
  _onToggle = onToggle;
}

export function openWirelessModal(lang) {
  if (!_overlay) _createModal();
  _renderModal(lang || 'micropython');
  _overlay.classList.add('open');
}

export function closeWirelessModal() {
  if (_overlay) _overlay.classList.remove('open');
}

export function isWirelessEnabled() {
  return getWirelessConfig().enabled;
}

// ── Modal creation ────────────────────────────────────────────────────────────

function _createModal() {
  _overlay = document.createElement('div');
  _overlay.className = 'modal-overlay';
  _overlay.id = 'wirelessModalOverlay';
  _overlay.innerHTML = `
    <div class="modal-content" style="max-width:480px">
      <div class="modal-header">
        <h3 style="display:flex;align-items:center;gap:8px;">
          <i data-lucide="wifi" style="width:18px;height:18px;"></i>
          Wireless Upload
        </h3>
        <button class="modal-close" id="wirelessModalClose">
          <i data-lucide="x" style="width:16px;height:16px;"></i>
        </button>
      </div>
      <div class="modal-tabs">
        <button class="modal-tab active" data-tab="config">Configuration</button>
        <button class="modal-tab" data-tab="setup">First-Time Setup</button>
      </div>
      <div class="modal-body" id="wirelessModalBody" style="padding:16px;"></div>
      <div class="modal-footer">
        <span id="wirelessStatusText" style="font-size:12px;color:var(--text-muted)"></span>
        <button class="btn-primary" id="wirelessSaveBtn">Save &amp; Enable</button>
      </div>
    </div>
  `;
  document.body.appendChild(_overlay);

  _overlay.querySelector('#wirelessModalClose').addEventListener('click', closeWirelessModal);
  _overlay.addEventListener('click', e => { if (e.target === _overlay) closeWirelessModal(); });

  let activeTab = 'config';
  let currentLang = 'micropython';

  _overlay.querySelectorAll('.modal-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      activeTab = tab.dataset.tab;
      _overlay.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      _renderBody(activeTab, currentLang);
    });
  });

  _overlay._setLang = (lang) => { currentLang = lang; _renderBody(activeTab, lang); };

  _overlay.querySelector('#wirelessSaveBtn').addEventListener('click', async () => {
    await _saveAndTest(currentLang);
  });

  refreshIcons();
}

function _renderModal(lang) {
  _overlay._setLang?.(lang);
}

// ── Body renderers ────────────────────────────────────────────────────────────

function _renderBody(tab, lang) {
  const body = document.getElementById('wirelessModalBody');
  if (!body) return;
  if (tab === 'setup') {
    body.innerHTML = _setupHTML(lang);
  } else {
    body.innerHTML = _configHTML();
    _wireConfigEvents();
  }
  refreshIcons();
}

function _configHTML() {
  const cfg = getWirelessConfig();
  const enabledChecked = cfg.enabled ? 'checked' : '';
  return `
    <div style="display:flex;flex-direction:column;gap:14px;">

      <label style="display:flex;align-items:center;gap:10px;cursor:pointer;">
        <input type="checkbox" id="wl_enabled" ${enabledChecked} style="width:16px;height:16px;">
        <span style="font-weight:600;">Enable wireless upload</span>
      </label>

      <div style="border-top:1px solid var(--border-color);padding-top:12px;">
        <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px;">
          WiFi (for Arduino OTA)
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;gap:8px;">
            <div style="flex:1;">
              <label style="font-size:12px;display:block;margin-bottom:3px;">SSID</label>
              <input id="wl_ssid" class="modal-input" type="text" placeholder="Your WiFi name"
                value="${_esc(cfg.wifiSsid)}" style="width:100%;box-sizing:border-box;">
            </div>
            <div style="flex:1;">
              <label style="font-size:12px;display:block;margin-bottom:3px;">Password</label>
              <input id="wl_wifipass" class="modal-input" type="password" placeholder="WiFi password"
                value="${_esc(cfg.wifiPass)}" style="width:100%;box-sizing:border-box;">
            </div>
          </div>
        </div>
      </div>

      <div>
        <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px;">
          ESP32 Connection
        </div>
        <div style="display:flex;gap:8px;align-items:flex-end;">
          <div style="flex:1;">
            <label style="font-size:12px;display:block;margin-bottom:3px;">ESP32 IP Address</label>
            <input id="wl_ip" class="modal-input" type="text" placeholder="e.g. 192.168.1.100"
              value="${_esc(cfg.espIp)}" style="width:100%;box-sizing:border-box;">
          </div>
          <button id="wl_pingBtn" class="refresh-btn" style="padding:6px 12px;white-space:nowrap;">
            <i data-lucide="signal" style="width:14px;height:14px;"></i> Test
          </button>
        </div>
        <div id="wl_pingResult" style="font-size:12px;margin-top:6px;min-height:18px;"></div>
      </div>

      <div>
        <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px;">
          MicroPython WebREPL
        </div>
        <div style="display:flex;gap:8px;">
          <div style="flex:1;">
            <label style="font-size:12px;display:block;margin-bottom:3px;">WebREPL Password</label>
            <input id="wl_webreplpass" class="modal-input" type="text" placeholder="e.g. techyguide"
              value="${_esc(cfg.webreplPass)}" style="width:100%;box-sizing:border-box;">
          </div>
          <div style="width:80px;">
            <label style="font-size:12px;display:block;margin-bottom:3px;">Port</label>
            <input id="wl_webreplport" class="modal-input" type="number" value="${cfg.webreplPort}"
              style="width:100%;box-sizing:border-box;">
          </div>
        </div>
      </div>

    </div>
  `;
}

function _setupHTML(lang) {
  if (lang === 'arduino') {
    return `
      <div style="display:flex;flex-direction:column;gap:14px;font-size:13px;line-height:1.6;">
        <div style="background:var(--accent-light,#e8f4fd);border-radius:8px;padding:12px;border-left:3px solid var(--accent,#3b82f6);">
          <strong>One-time USB setup required</strong><br>
          You only need USB once. After that, every upload goes over WiFi automatically.
        </div>
        <ol style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:8px;">
          <li>Fill in your <strong>WiFi SSID</strong> and <strong>password</strong> in the Config tab.</li>
          <li>Enable <strong>wireless upload</strong> using the toggle, then click <em>Save &amp; Enable</em>.</li>
          <li>Click <strong>Upload</strong> — the sketch will be compiled with an OTA server built in and downloaded as <code>.ino</code>. Flash it to your ESP32 via USB using Arduino IDE once.</li>
          <li>Your ESP32 will print its IP address on the serial monitor on startup (look for <code>OTA ready at http://...</code>). Enter that IP in the Config tab.</li>
          <li>All future uploads go wirelessly — no USB needed.</li>
        </ol>
        <div style="font-size:12px;color:var(--text-muted);background:var(--surface-2,#f5f5f5);padding:10px;border-radius:6px;">
          <strong>Library requirements:</strong> WiFi.h, WebServer.h, and Update.h are included in the standard
          <code>esp32:esp32</code> Arduino core — no extra library install needed.
        </div>
      </div>
    `;
  }
  // MicroPython
  return `
    <div style="display:flex;flex-direction:column;gap:14px;font-size:13px;line-height:1.6;">
      <div style="background:var(--accent-light,#e8f4fd);border-radius:8px;padding:12px;border-left:3px solid var(--accent,#3b82f6);">
        <strong>One-time USB setup required</strong><br>
        Enable WebREPL on your ESP32 once via USB. After that, upload over WiFi every time.
      </div>
      <ol style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:8px;">
        <li>Connect ESP32 via USB and open the Serial Monitor.</li>
        <li>
          Type the following in the REPL and press Enter:
          <br><code style="background:var(--surface-2,#f0f0f0);padding:2px 6px;border-radius:4px;display:inline-block;margin-top:4px;">import webrepl_setup</code>
        </li>
        <li>Choose <strong>E</strong> to enable, set a password (e.g. <code>techyguide</code>), then reboot.</li>
        <li>Your ESP32's IP will appear in the serial monitor. Enter it in the Config tab.</li>
        <li>Fill in the same WebREPL password in the Config tab and click <em>Save &amp; Enable</em>.</li>
        <li>Disconnect USB — all future uploads go over WiFi.</li>
      </ol>
      <div style="font-size:12px;color:var(--text-muted);background:var(--surface-2,#f5f5f5);padding:10px;border-radius:6px;">
        <strong>Tip:</strong> Make sure your ESP32 and this computer are on the same WiFi network.
        WebREPL runs on port 8266 by default.
      </div>
    </div>
  `;
}

function _wireConfigEvents() {
  document.getElementById('wl_pingBtn')?.addEventListener('click', async () => {
    const ip = document.getElementById('wl_ip')?.value.trim();
    const resultEl = document.getElementById('wl_pingResult');
    if (!ip) { resultEl.textContent = 'Enter an IP address first.'; return; }

    resultEl.innerHTML = '<i data-lucide="loader" style="width:12px;height:12px;" class="spin-icon"></i> Testing…';
    refreshIcons();

    const result = await pingESP32(ip);
    if (result.otaReady) {
      resultEl.innerHTML = `<span style="color:#22c55e;">✓ Connected — OTA firmware detected at ${ip}</span>`;
    } else if (result.reachable) {
      resultEl.innerHTML = `<span style="color:#f59e0b;">⚠ Reachable but OTA firmware not detected. Flash the OTA sketch first.</span>`;
    } else {
      resultEl.innerHTML = `<span style="color:#ef4444;">✗ Cannot reach ${ip}. Check IP and that both devices are on the same network.</span>`;
    }
  });
}

async function _saveAndTest(lang) {
  const statusEl = document.getElementById('wirelessStatusText');
  const enabled  = document.getElementById('wl_enabled')?.checked ?? false;
  const espIp    = document.getElementById('wl_ip')?.value.trim()        || '';
  const wifiSsid = document.getElementById('wl_ssid')?.value.trim()      || '';
  const wifiPass = document.getElementById('wl_wifipass')?.value         || '';
  const webreplPass = document.getElementById('wl_webreplpass')?.value   || 'techyguide';
  const webreplPort = parseInt(document.getElementById('wl_webreplport')?.value || '8266', 10);

  saveWirelessConfig({ enabled, espIp, wifiSsid, wifiPass, webreplPass, webreplPort });

  if (_onToggle) _onToggle(enabled);

  if (statusEl) {
    statusEl.textContent = enabled
      ? `Wireless upload enabled (${espIp || 'no IP set'})`
      : 'Wireless upload disabled — using USB.';
  }

  closeWirelessModal();
}

// ── Utility ───────────────────────────────────────────────────────────────────

function _esc(s) {
  return String(s || '').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}
