// WirelessModal — configure WiFi credentials, ESP32 IP, and OTA settings.
// Smart single-toggle design: no need to pick between Local WiFi vs Cloud OTA.
// The system auto-detects the best method and uses the other as fallback.
import { refreshIcons } from './icons';
import { getWirelessConfig, saveWirelessConfig, pingESP32 } from '../upload/otaUpload';

let _overlay = null;
let _onToggle = null;

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

// ─────────────────────────────────────────────────────────────────────────────
// Modal creation
// ─────────────────────────────────────────────────────────────────────────────

function _createModal() {
  _overlay = document.createElement('div');
  _overlay.className = 'modal-overlay';
  _overlay.id = 'wirelessModalOverlay';
  _overlay.innerHTML = `
    <div class="modal-content" style="max-width:500px">
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

// ─────────────────────────────────────────────────────────────────────────────
// Body renderers
// ─────────────────────────────────────────────────────────────────────────────

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
  const staticChecked  = cfg.useStaticIp ? 'checked' : '';

  // Detect current environment for the smart indicator
  const isCloud = window.location.protocol === 'https:';
  const serverUrl = cfg.cloudServer || window.location.origin;

  // Smart mode banner
  const modeBanner = isCloud
    ? `<div style="background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.35);border-radius:8px;padding:10px 12px;font-size:12px;line-height:1.6;margin-bottom:2px;">
        <div style="display:flex;align-items:center;gap:6px;font-weight:700;color:#60a5fa;margin-bottom:4px;">
          <i data-lucide="cloud" style="width:14px;height:14px;"></i> Cloud OTA mode active
        </div>
        You are on the cloud server (<strong>${_esc(window.location.origin)}</strong>).<br>
        Uploads will be sent to your ESP32 via the Lightsail outbound polling channel.<br>
        <span style="color:#94a3b8;">USB takes priority automatically if connected &amp; authorized.</span>
      </div>`
    : `<div style="background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.3);border-radius:8px;padding:10px 12px;font-size:12px;line-height:1.6;margin-bottom:2px;">
        <div style="display:flex;align-items:center;gap:6px;font-weight:700;color:#4ade80;margin-bottom:4px;">
          <i data-lucide="wifi" style="width:14px;height:14px;"></i> Local WiFi OTA mode active
        </div>
        You are running locally. If the ESP32 is on the same WiFi, uploads go directly over LAN.<br>
        <span style="color:#94a3b8;">If local WiFi fails, Cloud OTA is tried automatically as fallback.</span>
      </div>`;

  return `
    <div style="display:flex;flex-direction:column;gap:14px;">

      <!-- Smart Mode Banner -->
      ${modeBanner}

      <!-- Single Toggle -->
      <label style="display:flex;align-items:center;gap:12px;cursor:pointer;padding:12px;background:var(--bg-secondary,#1e293b);border-radius:10px;border:1px solid var(--border-color);">
        <div style="position:relative;width:44px;height:24px;flex-shrink:0;">
          <input type="checkbox" id="wl_enabled" ${enabledChecked}
            style="opacity:0;position:absolute;inset:0;width:100%;height:100%;cursor:pointer;z-index:2;margin:0;">
          <div id="wl_toggleTrack" style="
            position:absolute;inset:0;border-radius:12px;transition:background 0.2s;
            background:${cfg.enabled ? '#3b82f6' : 'var(--border-color,#444)'};
          "></div>
          <div id="wl_toggleThumb" style="
            position:absolute;top:3px;width:18px;height:18px;border-radius:9px;background:#fff;
            transition:left 0.2s;left:${cfg.enabled ? '23px' : '3px'};
            box-shadow:0 1px 4px rgba(0,0,0,0.3);
          "></div>
        </div>
        <div>
          <div style="font-weight:700;font-size:14px;">Enable Wireless Upload</div>
          <div style="font-size:11px;color:var(--text-muted);">
            Auto-selects: USB → Local WiFi OTA → Cloud OTA
          </div>
        </div>
      </label>

      <!-- WiFi Credentials -->
      <div style="border-top:1px solid var(--border-color);padding-top:12px;">
        <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px;display:flex;align-items:center;gap:6px;">
          <i data-lucide="wifi" style="width:13px;height:13px;"></i> WiFi Credentials
        </div>
        <div style="display:flex;gap:8px;">
          <div style="flex:1;">
            <label style="font-size:12px;display:block;margin-bottom:3px;">WiFi SSID / Hotspot Name</label>
            <input id="wl_ssid" class="modal-input" type="text" placeholder="Your WiFi or Hotspot name"
              value="${_esc(cfg.wifiSsid)}" style="width:100%;box-sizing:border-box;">
          </div>
          <div style="flex:1;">
            <label style="font-size:12px;display:block;margin-bottom:3px;">Password</label>
            <input id="wl_wifipass" class="modal-input" type="password" placeholder="WiFi password"
              value="${_esc(cfg.wifiPass)}" style="width:100%;box-sizing:border-box;">
          </div>
        </div>
      </div>

      <!-- ESP32 Identity -->
      <div>
        <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px;display:flex;align-items:center;gap:6px;">
          <i data-lucide="cpu" style="width:13px;height:13px;"></i> ESP32 Device
        </div>
        <div style="display:flex;gap:8px;margin-bottom:8px;">
          <div style="flex:1;">
            <label style="font-size:12px;display:block;margin-bottom:3px;">Device ID
              <span style="color:#94a3b8;font-weight:400;">— unique per board</span>
            </label>
            <input id="wl_deviceId" class="modal-input" type="text" placeholder="TG-ESP32-000001"
              value="${_esc(cfg.deviceId || 'TG-ESP32-000001')}" style="width:100%;box-sizing:border-box;">
          </div>
          <div style="flex:1;">
            <label style="font-size:12px;display:block;margin-bottom:3px;">Hostname (mDNS)</label>
            <input id="wl_hostname" class="modal-input" type="text" placeholder="techyguide"
              value="${_esc(cfg.hostname || 'techyguide')}" style="width:100%;box-sizing:border-box;">
          </div>
        </div>

        <!-- ESP32 IP + ping -->
        <div style="display:flex;gap:8px;align-items:flex-end;margin-bottom:8px;">
          <div style="flex:1;">
            <label style="font-size:12px;display:block;margin-bottom:3px;">ESP32 IP Address
              <span style="color:#94a3b8;font-weight:400;">— for local WiFi OTA (optional)</span>
            </label>
            <input id="wl_ip" class="modal-input" type="text" placeholder="e.g. 192.168.1.100"
              value="${_esc(cfg.espIp)}" style="width:100%;box-sizing:border-box;">
          </div>
          <button id="wl_pingBtn" class="refresh-btn" style="padding:6px 12px;white-space:nowrap;height:34px;">
            <i data-lucide="signal" style="width:14px;height:14px;"></i> Test
          </button>
        </div>
        <div id="wl_pingResult" style="font-size:12px;min-height:16px;"></div>
      </div>

      <!-- Lightsail Server URL -->
      <div>
        <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px;display:flex;align-items:center;gap:6px;">
          <i data-lucide="cloud" style="width:13px;height:13px;"></i> Cloud OTA Server (Lightsail)
        </div>
        <label style="font-size:12px;display:block;margin-bottom:3px;">Server URL
          <span style="color:#94a3b8;font-weight:400;">— ESP32 polls this to check for updates</span>
        </label>
        <input id="wl_cloudServer" class="modal-input" type="text"
          placeholder="https://block.techyguide.in"
          value="${_esc(cfg.cloudServer || window.location.origin)}"
          style="width:100%;box-sizing:border-box;">
        <div style="margin-top:6px;background:rgba(59,130,246,0.08);border-radius:6px;padding:7px 10px;font-size:11px;color:var(--text-secondary);border-left:3px solid #3b82f6;line-height:1.5;">
          Used automatically when local WiFi OTA is unavailable or you're on the cloud server.
          Must match <code>SERVER_BASE_URL</code> in your <code>docker-compose.yml</code>.
        </div>
      </div>

      <!-- Static IP (collapsed by default) -->
      <div>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;margin-bottom:8px;">
          <input type="checkbox" id="wl_useStaticIp" ${staticChecked} style="width:14px;height:14px;">
          <span style="font-size:12px;color:var(--text-muted);">Use fixed static IP for ESP32 (optional — prevents router IP changes)</span>
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

      <!-- MicroPython WebREPL (compact) -->
      <div>
        <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px;">MicroPython WebREPL</div>
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
          You only need USB once. After that, every upload goes over WiFi or Cloud OTA automatically.
        </div>
        <ol style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:8px;">
          <li>Fill in your <strong>WiFi SSID</strong> and <strong>Password</strong> in the Config tab.</li>
          <li>Set your <strong>Device ID</strong> (e.g. <code>TG-ESP32-000001</code>) and <strong>Lightsail Server URL</strong>.</li>
          <li>Toggle <strong>Enable Wireless Upload</strong> ON and click <em>Save &amp; Enable</em>.</li>
          <li>Connect ESP32 via USB, then click <strong>Upload</strong>. The app auto-injects WiFi + Cloud OTA polling code and flashes via USB once.</li>
          <li>Open the Serial Monitor — you'll see the ESP32 connect to WiFi and start polling the cloud server.</li>
          <li>Disconnect USB — all future uploads go over WiFi or Cloud OTA automatically!</li>
        </ol>
        <div style="background:rgba(251,191,36,0.1);border-left:3px solid #fbbf24;border-radius:6px;padding:10px 12px;font-size:12px;">
          <strong>Upload Priority Order:</strong><br>
          🔌 USB (if connected) → 📡 Local WiFi OTA (if on same LAN) → ☁️ Cloud OTA (always available as fallback)
        </div>
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
  // Static IP toggle
  const staticCheckbox = document.getElementById('wl_useStaticIp');
  const staticFields   = document.getElementById('wl_staticIpFields');
  if (staticCheckbox && staticFields) {
    staticCheckbox.addEventListener('change', () => {
      staticFields.style.display = staticCheckbox.checked ? 'flex' : 'none';
    });
  }

  // Animated toggle track + thumb
  const enabledCheckbox = document.getElementById('wl_enabled');
  const track = document.getElementById('wl_toggleTrack');
  const thumb = document.getElementById('wl_toggleThumb');
  if (enabledCheckbox && track && thumb) {
    enabledCheckbox.addEventListener('change', () => {
      const on = enabledCheckbox.checked;
      track.style.background = on ? '#3b82f6' : 'var(--border-color,#444)';
      thumb.style.left = on ? '23px' : '3px';
    });
  }

  // Ping test
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
  const statusEl   = document.getElementById('wirelessStatusText');
  const enabled    = document.getElementById('wl_enabled')?.checked ?? false;
  const deviceId   = document.getElementById('wl_deviceId')?.value.trim()   || 'TG-ESP32-000001';
  const cloudServer = document.getElementById('wl_cloudServer')?.value.trim() || window.location.origin;
  const espIp      = document.getElementById('wl_ip')?.value.trim()         || '';
  const wifiSsid   = document.getElementById('wl_ssid')?.value.trim()       || '';
  const wifiPass   = document.getElementById('wl_wifipass')?.value          || '';
  const hostname   = document.getElementById('wl_hostname')?.value.trim()   || 'techyguide';
  const useStaticIp = document.getElementById('wl_useStaticIp')?.checked    ?? false;
  const staticIp   = document.getElementById('wl_staticIp')?.value.trim()   || '';
  const gateway    = document.getElementById('wl_gateway')?.value.trim()    || '';
  const subnet     = document.getElementById('wl_subnet')?.value.trim()     || '255.255.255.0';
  const webreplPass = document.getElementById('wl_webreplpass')?.value      || 'techyguide';
  const webreplPort = parseInt(document.getElementById('wl_webreplport')?.value || '8266', 10);

  // Always enable cloudOtaMode internally — the upload logic now decides which method to use
  saveWirelessConfig({
    enabled,
    cloudOtaMode: true,   // always true — smart fallback handles the rest
    deviceId, cloudServer,
    espIp, wifiSsid, wifiPass, hostname,
    useStaticIp, staticIp, gateway, subnet,
    webreplPass, webreplPort,
  });

  if (_onToggle) _onToggle(enabled);

  if (statusEl) {
    const isCloud = window.location.protocol === 'https:';
    if (enabled && isCloud) {
      statusEl.textContent = `Cloud OTA active — polling via ${cloudServer}`;
    } else if (enabled && espIp) {
      statusEl.textContent = `Local WiFi OTA → Cloud OTA fallback (${espIp})`;
    } else if (enabled) {
      statusEl.textContent = `Wireless enabled — Cloud OTA fallback via ${cloudServer}`;
    } else {
      statusEl.textContent = 'Wireless upload disabled — using USB.';
    }
  }

  closeWirelessModal();
  document.dispatchEvent(new CustomEvent('techyguide-wireless-changed', { detail: { enabled } }));
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility
// ─────────────────────────────────────────────────────────────────────────────
function _esc(s) {
  return String(s || '').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}
