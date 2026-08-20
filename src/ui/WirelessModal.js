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

  // Smart mode banner — rich high-contrast colors
  const modeBanner = isCloud
    ? `<div style="background:#EFF6FF;border:1.5px solid #93C5FD;border-radius:8px;padding:10px 14px;font-size:12.5px;line-height:1.6;margin-bottom:2px;color:#1E3A8A;">
        <div style="display:flex;align-items:center;gap:6px;font-weight:800;color:#1D4ED8;margin-bottom:4px;font-size:13px;">
          <i data-lucide="cloud" style="width:16px;height:16px;"></i> Cloud OTA mode active
        </div>
        You are on the cloud server (<strong>${_esc(window.location.origin)}</strong>).<br>
        Uploads will be sent to your ESP32 via the Server outbound polling channel.<br>
        <span style="color:#1E40AF;font-weight:600;">USB takes priority automatically if connected &amp; authorized.</span>
      </div>`
    : `<div style="background:#F0FDF4;border:1.5px solid #86EFAC;border-radius:8px;padding:10px 14px;font-size:12.5px;line-height:1.6;margin-bottom:2px;color:#14532D;">
        <div style="display:flex;align-items:center;gap:6px;font-weight:800;color:#15803D;margin-bottom:4px;font-size:13px;">
          <i data-lucide="wifi" style="width:16px;height:16px;"></i> Local WiFi OTA mode active
        </div>
        You are running locally. If the ESP32 is on the same WiFi, uploads go directly over LAN.<br>
        <span style="color:#166534;font-weight:600;">If local WiFi fails, Cloud OTA is tried automatically as fallback.</span>
      </div>`;

  return `
    <div style="display:flex;flex-direction:column;gap:14px;">

      <!-- Smart Mode Banner -->
      ${modeBanner}

      <!-- Single Toggle -->
      <label style="display:flex;align-items:center;gap:12px;cursor:pointer;padding:12px 14px;background:#F8FAFC;border-radius:10px;border:1.5px solid #CBD5E1;">
        <div style="position:relative;width:44px;height:24px;flex-shrink:0;">
          <input type="checkbox" id="wl_enabled" ${enabledChecked}
            style="opacity:0;position:absolute;inset:0;width:100%;height:100%;cursor:pointer;z-index:2;margin:0;">
          <div id="wl_toggleTrack" style="
            position:absolute;inset:0;border-radius:12px;transition:background 0.2s;
            background:${cfg.enabled ? '#0284C7' : '#94A3B8'};
          "></div>
          <div id="wl_toggleThumb" style="
            position:absolute;top:3px;width:18px;height:18px;border-radius:9px;background:#fff;
            transition:left 0.2s;left:${cfg.enabled ? '23px' : '3px'};
            box-shadow:0 1px 4px rgba(0,0,0,0.3);
          "></div>
        </div>
        <div>
          <div style="font-weight:800;font-size:14.5px;color:#0F172A;">Enable Wireless Upload</div>
          <div style="font-size:12px;font-weight:600;color:#334155;">
            Auto-selects: USB → Local WiFi OTA → Cloud OTA
          </div>
        </div>
      </label>

      <!-- WiFi Credentials -->
      <div style="border-top:1.5px solid #E2E8F0;padding-top:12px;">
        <div style="font-size:12.5px;font-weight:800;color:#0F172A;margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px;display:flex;align-items:center;gap:6px;">
          <i data-lucide="wifi" style="width:15px;height:15px;color:#0284C7;"></i> WiFi Credentials
        </div>
        <div style="display:flex;gap:8px;">
          <div style="flex:1;">
            <label style="font-size:12.5px;font-weight:750;color:#0F172A;display:block;margin-bottom:4px;">WiFi SSID / Hotspot Name</label>
            <input id="wl_ssid" class="modal-input" type="text" placeholder="Your WiFi or Hotspot name"
              value="${_esc(cfg.wifiSsid)}" style="width:100%;box-sizing:border-box;background:#FFFFFF;border:1.5px solid #94A3B8;color:#0F172A;font-weight:700;font-size:13px;padding:7px 10px;border-radius:6px;">
          </div>
          <div style="flex:1;">
            <label style="font-size:12.5px;font-weight:750;color:#0F172A;display:block;margin-bottom:4px;">Password</label>
            <input id="wl_wifipass" class="modal-input" type="password" placeholder="WiFi password"
              value="${_esc(cfg.wifiPass)}" style="width:100%;box-sizing:border-box;background:#FFFFFF;border:1.5px solid #94A3B8;color:#0F172A;font-weight:700;font-size:13px;padding:7px 10px;border-radius:6px;">
          </div>
        </div>
      </div>

      <!-- ESP32 Identity -->
      <div>
        <div style="font-size:12.5px;font-weight:800;color:#0F172A;margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px;display:flex;align-items:center;gap:6px;">
          <i data-lucide="cpu" style="width:15px;height:15px;color:#0284C7;"></i> ESP32 Device
        </div>
        <div style="display:flex;gap:8px;margin-bottom:8px;">
          <div style="flex:1;">
            <label style="font-size:12.5px;font-weight:750;color:#0F172A;display:block;margin-bottom:4px;">Device ID
              <span style="color:#475569;font-weight:600;font-size:11.5px;">— unique per board</span>
            </label>
            <input id="wl_deviceId" class="modal-input" type="text" placeholder="TG-ESP32-000001"
              value="${_esc(cfg.deviceId || 'TG-ESP32-000001')}" style="width:100%;box-sizing:border-box;background:#FFFFFF;border:1.5px solid #94A3B8;color:#0F172A;font-weight:700;font-size:13px;padding:7px 10px;border-radius:6px;">
          </div>
          <div style="flex:1;">
            <label style="font-size:12.5px;font-weight:750;color:#0F172A;display:block;margin-bottom:4px;">Hostname (mDNS)</label>
            <input id="wl_hostname" class="modal-input" type="text" placeholder="techyguide"
              value="${_esc(cfg.hostname || 'techyguide')}" style="width:100%;box-sizing:border-box;background:#FFFFFF;border:1.5px solid #94A3B8;color:#0F172A;font-weight:700;font-size:13px;padding:7px 10px;border-radius:6px;">
          </div>
        </div>

        <!-- ESP32 IP + ping -->
        <div style="display:flex;gap:8px;align-items:flex-end;margin-bottom:8px;">
          <div style="flex:1;">
            <label style="font-size:12.5px;font-weight:750;color:#0F172A;display:block;margin-bottom:4px;">ESP32 IP Address
              <span style="color:#475569;font-weight:600;font-size:11.5px;">— for local WiFi OTA (optional)</span>
            </label>
            <input id="wl_ip" class="modal-input" type="text" placeholder="e.g. 192.168.1.100"
              value="${_esc(cfg.espIp)}" style="width:100%;box-sizing:border-box;background:#FFFFFF;border:1.5px solid #94A3B8;color:#0F172A;font-weight:700;font-size:13px;padding:7px 10px;border-radius:6px;">
          </div>
          <button id="wl_pingBtn" class="refresh-btn" style="padding:7px 14px;white-space:nowrap;height:36px;background:#0284C7;color:#FFFFFF;border:none;border-radius:6px;font-weight:750;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
            <i data-lucide="signal" style="width:14px;height:14px;"></i> Test
          </button>
        </div>
        <div id="wl_pingResult" style="font-size:12.5px;font-weight:700;min-height:16px;"></div>
      </div>

      <!-- Cloud OTA Server URL -->
      <div>
        <div style="font-size:12.5px;font-weight:800;color:#0F172A;margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px;display:flex;align-items:center;gap:6px;">
          <i data-lucide="cloud" style="width:15px;height:15px;color:#0284C7;"></i> Cloud OTA Server
        </div>
        <label style="font-size:12.5px;font-weight:750;color:#0F172A;display:block;margin-bottom:4px;">Server URL
          <span style="color:#475569;font-weight:600;font-size:11.5px;">— ESP32 polls this to check for updates</span>
        </label>
        <input id="wl_cloudServer" class="modal-input" type="text"
          placeholder="https://block.techyguide.in"
          value="${_esc(cfg.cloudServer || window.location.origin)}"
          style="width:100%;box-sizing:border-box;background:#FFFFFF;border:1.5px solid #94A3B8;color:#0F172A;font-weight:700;font-size:13px;padding:7px 10px;border-radius:6px;">
        <div style="margin-top:6px;background:#F0F9FF;border:1px solid #BAE6FD;border-radius:6px;padding:8px 12px;font-size:12px;color:#0C4A6E;font-weight:600;border-left:3.5px solid #0284C7;line-height:1.5;">
          Used automatically when local WiFi OTA is unavailable or you're on the cloud server.
          Must match <code>SERVER_BASE_URL</code> in your <code>docker-compose.yml</code>.
        </div>
      </div>

      <!-- Static IP -->
      <div>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;margin-bottom:8px;">
          <input type="checkbox" id="wl_useStaticIp" ${staticChecked} style="width:15px;height:15px;">
          <span style="font-size:12.5px;font-weight:700;color:#0F172A;">Use fixed static IP for ESP32 (optional — prevents router IP changes)</span>
        </label>
        <div id="wl_staticIpFields" style="display:${cfg.useStaticIp ? 'flex' : 'none'};gap:6px;">
          <div style="flex:2;">
            <label style="font-size:12px;font-weight:750;color:#0F172A;display:block;margin-bottom:2px;">Static IP</label>
            <input id="wl_staticIp" class="modal-input" type="text" placeholder="192.168.1.200"
              value="${_esc(cfg.staticIp || '')}" style="width:100%;box-sizing:border-box;background:#FFFFFF;border:1.5px solid #94A3B8;color:#0F172A;font-weight:700;font-size:12.5px;padding:6px 8px;border-radius:6px;">
          </div>
          <div style="flex:2;">
            <label style="font-size:12px;font-weight:750;color:#0F172A;display:block;margin-bottom:2px;">Gateway</label>
            <input id="wl_gateway" class="modal-input" type="text" placeholder="192.168.1.1"
              value="${_esc(cfg.gateway || '')}" style="width:100%;box-sizing:border-box;background:#FFFFFF;border:1.5px solid #94A3B8;color:#0F172A;font-weight:700;font-size:12.5px;padding:6px 8px;border-radius:6px;">
          </div>
          <div style="flex:2;">
            <label style="font-size:12px;font-weight:750;color:#0F172A;display:block;margin-bottom:2px;">Subnet</label>
            <input id="wl_subnet" class="modal-input" type="text" placeholder="255.255.255.0"
              value="${_esc(cfg.subnet || '255.255.255.0')}" style="width:100%;box-sizing:border-box;background:#FFFFFF;border:1.5px solid #94A3B8;color:#0F172A;font-weight:700;font-size:12.5px;padding:6px 8px;border-radius:6px;">
          </div>
        </div>
      </div>

      <!-- MicroPython WebREPL -->
      <div>
        <div style="font-size:12.5px;font-weight:800;color:#0F172A;margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px;display:flex;align-items:center;gap:6px;">
          <i data-lucide="terminal" style="width:15px;height:15px;color:#0284C7;"></i> MicroPython WebREPL
        </div>
        <div style="display:flex;gap:8px;">
          <div style="flex:1;">
            <label style="font-size:12.5px;font-weight:750;color:#0F172A;display:block;margin-bottom:4px;">WebREPL Password</label>
            <input id="wl_webreplpass" class="modal-input" type="text" placeholder="e.g. techyguide"
              value="${_esc(cfg.webreplPass)}" style="width:100%;box-sizing:border-box;background:#FFFFFF;border:1.5px solid #94A3B8;color:#0F172A;font-weight:700;font-size:13px;padding:7px 10px;border-radius:6px;">
          </div>
          <div style="width:85px;">
            <label style="font-size:12.5px;font-weight:750;color:#0F172A;display:block;margin-bottom:4px;">Port</label>
            <input id="wl_webreplport" class="modal-input" type="number" value="${cfg.webreplPort}"
              style="width:100%;box-sizing:border-box;background:#FFFFFF;border:1.5px solid #94A3B8;color:#0F172A;font-weight:700;font-size:13px;padding:7px 10px;border-radius:6px;">
          </div>
        </div>
      </div>

    </div>
  `;
}

function _setupHTML(lang) {
  if (lang === 'arduino') {
    return `
      <div style="display:flex;flex-direction:column;gap:14px;font-size:13px;line-height:1.6;color:#0F172A;">
        <div style="background:#EFF6FF;border-radius:8px;padding:12px;border-left:3.5px solid #0284C7;border:1px solid #BAE6FD;color:#0C4A6E;font-weight:600;">
          <strong style="color:#0284C7;font-size:13.5px;">One-time USB setup required</strong><br>
          You only need USB once. After that, every upload goes over WiFi or Cloud OTA automatically.
        </div>
        <ol style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:8px;font-weight:600;color:#1E293B;">
          <li>Fill in your <strong style="color:#0F172A;">WiFi SSID</strong> and <strong style="color:#0F172A;">Password</strong> in the Config tab.</li>
          <li>Set your <strong style="color:#0F172A;">Device ID</strong> (e.g. <code>TG-ESP32-000001</code>) and <strong style="color:#0F172A;">Cloud Server URL</strong>.</li>
          <li>Toggle <strong style="color:#0F172A;">Enable Wireless Upload</strong> ON and click <em>Save &amp; Enable</em>.</li>
          <li>Connect ESP32 via USB, then click <strong style="color:#0F172A;">Upload</strong>. The app auto-injects WiFi + Cloud OTA polling code and flashes via USB once.</li>
          <li>Open the Serial Monitor — you'll see the ESP32 connect to WiFi and start polling the cloud server.</li>
          <li>Disconnect USB — all future uploads go over WiFi or Cloud OTA automatically!</li>
        </ol>
        <div style="background:#FEF3C7;border-left:3.5px solid #D97706;border:1px solid #FDE68A;border-radius:6px;padding:10px 12px;font-size:12.5px;color:#78350F;font-weight:600;">
          <strong style="color:#92400E;">Upload Priority Order:</strong><br>
          🔌 USB (if connected) → 📡 Local WiFi OTA (if on same LAN) → ☁️ Cloud OTA (always available as fallback)
        </div>
      </div>
    `;
  }
  return `
    <div style="display:flex;flex-direction:column;gap:14px;font-size:13px;line-height:1.6;color:#0F172A;">
      <div style="background:#EFF6FF;border-radius:8px;padding:12px;border-left:3.5px solid #0284C7;border:1px solid #BAE6FD;color:#0C4A6E;font-weight:600;">
        <strong style="color:#0284C7;font-size:13.5px;">MicroPython Setup</strong><br>
        Enable WebREPL on your ESP32 once via USB. After that, upload over WiFi every time.
      </div>
      <ol style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:8px;font-weight:600;color:#1E293B;">
        <li>Connect ESP32 via USB and open the Serial Monitor.</li>
        <li>Type <code>import webrepl_setup</code> in the REPL and press Enter.</li>
        <li>Select <strong style="color:#0F172A;">E</strong> to enable, set a password (e.g. <code>techyguide</code>), then reboot.</li>
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
