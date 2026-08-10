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
  const cloudChecked = cfg.cloudOtaMode ? 'checked' : '';
  const staticChecked = cfg.useStaticIp ? 'checked' : '';
  return `
    <div style="display:flex;flex-direction:column;gap:14px;">

      <label style="display:flex;align-items:center;gap:10px;cursor:pointer;">
        <input type="checkbox" id="wl_enabled" ${enabledChecked} style="width:16px;height:16px;">
        <span style="font-weight:600;">Enable wireless upload</span>
      </label>

      <div style="border-top:1px solid var(--border-color);padding-top:12px;">
        <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px;display:flex;align-items:center;gap:6px;">
          <i data-lucide="cloud" style="width:14px;height:14px;color:#3b82f6;"></i> Cloud OTA (AWS Lightsail Mode 3)
        </div>
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer;margin-bottom:10px;">
          <input type="checkbox" id="wl_cloudOtaMode" ${cloudChecked} style="width:16px;height:16px;">
          <span style="font-weight:600;font-size:13px;color:#3b82f6;">Use AWS Lightsail Remote Cloud OTA</span>
        </label>
        <div id="wl_cloudOtaFields" style="display:${cfg.cloudOtaMode ? 'flex' : 'none'};flex-direction:column;gap:8px;">
          <div style="display:flex;gap:8px;">
            <div style="flex:1;">
              <label style="font-size:12px;display:block;margin-bottom:3px;">Device ID</label>
              <input id="wl_deviceId" class="modal-input" type="text" placeholder="TG-ESP32-000001"
                value="${_esc(cfg.deviceId || 'TG-ESP32-000001')}" style="width:100%;box-sizing:border-box;">
            </div>
          </div>
          <div>
            <label style="font-size:12px;display:block;margin-bottom:3px;">Lightsail Server URL
              <span style="color:#94a3b8;font-weight:400;"> — ESP32 polls this address</span>
            </label>
            <input id="wl_cloudServer" class="modal-input" type="text"
              placeholder="https://block.techyguide.in"
              value="${_esc(cfg.cloudServer || window.location.origin)}"
              style="width:100%;box-sizing:border-box;">
          </div>
          <div id="wl_cloudServerInfo" style="background:rgba(59,130,246,0.1);border-radius:6px;padding:8px 10px;font-size:11px;color:var(--text-secondary);border-left:3px solid #3b82f6;line-height:1.5;">
            <strong style="color:#60a5fa;">How Cloud OTA works:</strong><br>
            ① Your ESP32 connects to <strong>this server URL</strong> every 10s (outbound — no port forwarding needed).<br>
            ② When you click Upload, the server compiles firmware and stores it here.<br>
            ③ ESP32 downloads firmware via HTTPS, verifies SHA256, flashes, and reboots.<br>
            <span style="color:#fbbf24;">&#9888; The URL above must match <code>SERVER_BASE_URL</code> in your docker-compose.yml.</span>
          </div>
        </div>
      </div>

      <div style="border-top:1px solid var(--border-color);padding-top:12px;">
        <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px;">
          WiFi Credentials
        </div>
        <div style="display:flex;gap:8px;">
          <div style="flex:1;">
            <label style="font-size:12px;display:block;margin-bottom:3px;">SSID</label>
            <input id="wl_ssid" class="modal-input" type="text" placeholder="Your WiFi / Hotspot name"
              value="${_esc(cfg.wifiSsid)}" style="width:100%;box-sizing:border-box;">
          </div>
          <div style="flex:1;">
            <label style="font-size:12px;display:block;margin-bottom:3px;">Password</label>
            <input id="wl_wifipass" class="modal-input" type="password" placeholder="WiFi password"
              value="${_esc(cfg.wifiPass)}" style="width:100%;box-sizing:border-box;">
          </div>
        </div>
      </div>

      <div>
        <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px;">
          ESP32 Discovery & Address
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;gap:8px;">
            <div style="flex:1;">
              <label style="font-size:12px;display:block;margin-bottom:3px;">Hostname (mDNS)</label>
              <input id="wl_hostname" class="modal-input" type="text" placeholder="techyguide"
                value="${_esc(cfg.hostname || 'techyguide')}" style="width:100%;box-sizing:border-box;">
            </div>
            <div style="flex:1;">
              <label style="font-size:12px;display:block;margin-bottom:3px;">ESP32 IP Address</label>
              <input id="wl_ip" class="modal-input" type="text" placeholder="e.g. 192.168.1.100"
                value="${_esc(cfg.espIp)}" style="width:100%;box-sizing:border-box;">
            </div>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <button id="wl_pingBtn" class="refresh-btn" style="padding:6px 12px;white-space:nowrap;">
              <i data-lucide="signal" style="width:14px;height:14px;"></i> Test Connection
            </button>
            <div id="wl_pingResult" style="font-size:12px;min-height:18px;flex:1;"></div>
          </div>
          <div style="background:var(--accent-light,#e8f4fd);border-radius:6px;padding:8px 10px;font-size:11px;color:var(--text-secondary);border-left:3px solid var(--accent,#3b82f6);">
            <strong>mDNS auto-discovery:</strong> Your ESP32 will advertise itself as <code>${_esc(cfg.hostname || 'techyguide')}.local</code> — works automatically on home WiFi, Android hotspot, iPhone hotspot, or office routers.
          </div>
        </div>
      </div>

      <div>
        <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px;">
          Static IP (Optional)
        </div>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;margin-bottom:8px;">
          <input type="checkbox" id="wl_useStaticIp" ${staticChecked} style="width:14px;height:14px;">
          <span style="font-size:12px;">Use fixed static IP (prevents router IP changes)</span>
        </label>
        <div id="wl_staticIpFields" style="display:${cfg.useStaticIp ? 'flex' : 'none'};gap:6px;">
          <div style="flex:2;">
            <label style="font-size:11px;display:block;margin-bottom:2px;">Static IP</label>
            <input id="wl_staticIp" class="modal-input" type="text" placeholder="192.168.1.200"
              value="${_esc(cfg.staticIp || '')}" style="width:100%;box-sizing:border-box;font-size:12px;">
          </div>
          <div style="flex:2;">
            <label style="font-size:11px;display:block;margin-bottom:2px;">Gateway</label>
            <input id="wl_gateway" class="modal-input" type="text" placeholder="192.168.1.1"
              value="${_esc(cfg.gateway || '')}" style="width:100%;box-sizing:border-box;font-size:12px;">
          </div>
          <div style="flex:2;">
            <label style="font-size:11px;display:block;margin-bottom:2px;">Subnet</label>
            <input id="wl_subnet" class="modal-input" type="text" placeholder="255.255.255.0"
              value="${_esc(cfg.subnet || '255.255.255.0')}" style="width:100%;box-sizing:border-box;font-size:12px;">
          </div>
        </div>
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
          <li>Fill in your <strong>WiFi SSID</strong> and <strong>Password</strong> in the Config tab.</li>
          <li>Enable <strong>wireless upload</strong> using the toggle, then click <em>Save &amp; Enable</em>.</li>
          <li>Click <strong>Upload</strong> — the app auto-injects WiFi + mDNS + OTA code and flashes via USB once.</li>
          <li>Open the Serial Monitor to watch your ESP32 connect to WiFi. It will print its IP address and mDNS hostname (<code>http://techyguide.local</code>).</li>
          <li>Enter the IP in the Config tab and click Test. Disconnect USB — all future uploads go over WiFi!</li>
        </ol>
      </div>
    `;
  }
  return `
    <div style="display:flex;flex-direction:column;gap:14px;font-size:13px;line-height:1.6;">
      <div style="background:var(--accent-light,#e8f4fd);border-radius:8px;padding:12px;border-left:3px solid var(--accent,#3b82f6);">
        <strong>MicroPython Setup</strong><br>
        Enable WebREPL on your ESP32 once via USB. After that, upload over WiFi every time.
      </div>
      <ol style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:8px;">
        <li>Connect ESP32 via USB and open the Serial Monitor.</li>
        <li>Type <code>import webrepl_setup</code> in the REPL and press Enter.</li>
        <li>Select <strong>E</strong> to enable, set a password (e.g. <code>techyguide</code>), then reboot.</li>
        <li>Enter the ESP32 IP in the Config tab and click <em>Save &amp; Enable</em>.</li>
      </ol>
    </div>
  `;
}

function _wireConfigEvents() {
  const staticCheckbox = document.getElementById('wl_useStaticIp');
  const staticFields = document.getElementById('wl_staticIpFields');
  if (staticCheckbox && staticFields) {
    staticCheckbox.addEventListener('change', () => {
      staticFields.style.display = staticCheckbox.checked ? 'flex' : 'none';
    });
  }

  const cloudCheckbox = document.getElementById('wl_cloudOtaMode');
  const cloudFields = document.getElementById('wl_cloudOtaFields');
  if (cloudCheckbox && cloudFields) {
    cloudCheckbox.addEventListener('change', () => {
      cloudFields.style.display = cloudCheckbox.checked ? 'flex' : 'none';
    });
  }

  document.getElementById('wl_pingBtn')?.addEventListener('click', async () => {
    const ip = document.getElementById('wl_ip')?.value.trim();
    const resultEl = document.getElementById('wl_pingResult');
    if (!ip) { resultEl.textContent = 'Enter an IP address or hostname first.'; return; }

    resultEl.innerHTML = '<i data-lucide="loader" style="width:12px;height:12px;" class="spin-icon"></i> Testing…';
    refreshIcons();

    const result = await pingESP32(ip);
    if (result.otaReady) {
      resultEl.innerHTML = `<span style="color:#22c55e;">✓ Connected — OTA firmware detected at ${ip}</span>`;
    } else if (result.reachable) {
      resultEl.innerHTML = `<span style="color:#f59e0b;">⚠ Reachable but OTA firmware not detected. Flash the OTA sketch first.</span>`;
    } else {
      resultEl.innerHTML = `<span style="color:#ef4444;">✗ Cannot reach ${ip}. Check IP/hostname and WiFi network.</span>`;
    }
  });
}

async function _saveAndTest(lang) {
  const statusEl    = document.getElementById('wirelessStatusText');
  const enabled     = document.getElementById('wl_enabled')?.checked ?? false;
  const cloudOtaMode = document.getElementById('wl_cloudOtaMode')?.checked ?? false;
  const deviceId    = document.getElementById('wl_deviceId')?.value.trim()  || 'TG-ESP32-000001';
  const cloudServer = document.getElementById('wl_cloudServer')?.value.trim() || window.location.origin;
  const espIp       = document.getElementById('wl_ip')?.value.trim()        || '';
  const wifiSsid    = document.getElementById('wl_ssid')?.value.trim()      || '';
  const wifiPass    = document.getElementById('wl_wifipass')?.value         || '';
  const hostname    = document.getElementById('wl_hostname')?.value.trim()  || 'techyguide';
  const useStaticIp = document.getElementById('wl_useStaticIp')?.checked    ?? false;
  const staticIp    = document.getElementById('wl_staticIp')?.value.trim()  || '';
  const gateway     = document.getElementById('wl_gateway')?.value.trim()   || '';
  const subnet      = document.getElementById('wl_subnet')?.value.trim()    || '255.255.255.0';
  const webreplPass = document.getElementById('wl_webreplpass')?.value   || 'techyguide';
  const webreplPort = parseInt(document.getElementById('wl_webreplport')?.value || '8266', 10);

  saveWirelessConfig({ enabled, cloudOtaMode, deviceId, cloudServer, espIp, wifiSsid, wifiPass, hostname, useStaticIp, staticIp, gateway, subnet, webreplPass, webreplPort });

  if (_onToggle) _onToggle(enabled);

  if (statusEl) {
    if (enabled && cloudOtaMode) {
      statusEl.textContent = `Cloud OTA enabled for device ${deviceId}`;
    } else if (enabled) {
      statusEl.textContent = `Local WiFi upload enabled (${espIp || hostname + '.local'})`;
    } else {
      statusEl.textContent = 'Wireless upload disabled — using USB.';
    }
  }

  closeWirelessModal();

  document.dispatchEvent(new CustomEvent('techyguide-wireless-changed', { detail: { enabled, cloudOtaMode } }));
}

// ── Utility ───────────────────────────────────────────────────────────────────

function _esc(s) {
  return String(s || '').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

