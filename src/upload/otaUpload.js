// Wireless upload helpers — MicroPython via WebREPL, Arduino via ArduinoOTA.
// All network calls go through the local compile server (/api/*) to avoid
// HTTPS/CORS/mixed-content issues when the app is served from a remote origin.

/**
 * Upload MicroPython code wirelessly via the compile-server WebREPL proxy.
 * The server opens a WebSocket to the ESP32 and performs Raw REPL upload.
 *
 * @param {string}   code       MicroPython source
 * @param {object}   opts       { ip, password?, port? }
 * @param {Function} onStatus   called with status string keys
 */
export async function uploadViaMicroPythonOTA(code, { ip, password = 'techyguide', port = 8266 }, onStatus = () => {}) {
  onStatus('connecting');

  let resp;
  try {
    resp = await fetch('/api/webrepl-upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ip, port, password, code }),
    });
  } catch (err) {
    throw new Error(
      'Cannot reach compile server. Make sure it is running locally on this machine.'
    );
  }

  let result;
  try {
    result = await resp.json();
  } catch {
    throw new Error(`Server error (HTTP ${resp.status})`);
  }

  if (!resp.ok || !result.success) {
    throw new Error(result.output || `WebREPL upload failed (HTTP ${resp.status})`);
  }

  onStatus('success');
  return result;
}

/**
 * Push a compiled Arduino firmware binary to the ESP32 via ArduinoOTA.
 * The compile server runs:  arduino-cli upload --protocol network --port <ip>:3232
 * which uses the same protocol as Arduino IDE OTA upload.
 *
 * Only the app binary (flash address 0x10000) is sent — bootloader and
 * partition table never change after the first USB flash.
 *
 * @param {string}   espIp          ESP32 IP address on the local network
 * @param {object}   compileResult  Response object from /api/compile
 * @param {Function} onStatus
 */
export async function uploadViaArduinoOTA(espIp, compileResult, onStatus = () => {}) {
  onStatus('uploading');

  // Extract only the app binary (0x10000); skip bootloader & partitions.
  let appBinary = null;
  if (compileResult.binaryType === 'split' && Array.isArray(compileResult.flashFiles)) {
    const appFile = compileResult.flashFiles.find(f => f.address === 0x10000);
    appBinary = appFile ? appFile.data : null;
  }
  if (!appBinary && compileResult.binary)          appBinary = compileResult.binary;
  if (!appBinary && compileResult.flashFiles?.[0]) appBinary = compileResult.flashFiles[0].data;

  if (!appBinary) {
    throw new Error('No app binary available. Re-compile first, then try OTA upload.');
  }

  let resp;
  try {
    resp = await fetch('/api/ota-push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // port 3232 is the ArduinoOTA default; matches ArduinoOTA.setPort(3232) in the sketch
      body: JSON.stringify({ espIp, binary: appBinary, port: 3232 }),
    });
  } catch (err) {
    throw new Error(
      'Cannot reach compile server. Make sure it is running locally on this machine.'
    );
  }

  const result = await resp.json().catch(() => ({ success: false, output: `HTTP ${resp.status}` }));

  if (!result.success) {
    throw new Error(result.output || 'OTA upload failed');
  }

  onStatus('success');
  return result;
}

/**
 * Push compiled firmware directly from the browser to the ESP32's /update endpoint.
 * Used when the compile server is on AWS (can't reach the ESP32's private IP).
 * The browser is on the same LAN as the ESP32 so it can POST directly.
 *
 * Requires the ESP32 sketch to have Access-Control-Allow-Origin: * on /update.
 */
export async function uploadViaArduinoOTADirect(espIp, compileResult, onStatus = () => {}) {
  onStatus('uploading');

  let appBinary = null;
  if (compileResult.binaryType === 'split' && Array.isArray(compileResult.flashFiles)) {
    const appFile = compileResult.flashFiles.find(f => f.address === 0x10000);
    appBinary = appFile ? appFile.data : null;
  }
  if (!appBinary && compileResult.binary)          appBinary = compileResult.binary;
  if (!appBinary && compileResult.flashFiles?.[0]) appBinary = compileResult.flashFiles[0].data;

  if (!appBinary) {
    throw new Error('No app binary available. Re-compile first, then try OTA upload.');
  }

  const binaryStr = atob(appBinary);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);
  const blob = new Blob([bytes], { type: 'application/octet-stream' });
  const formData = new FormData();
  formData.append('update', blob, 'firmware.bin');

  let resp;
  try {
    resp = await fetch(`http://${espIp}/update`, { method: 'POST', body: formData });
  } catch (err) {
    throw new Error(
      `Cannot reach ESP32 at ${espIp}. Make sure it is powered on and connected to WiFi.`
    );
  }

  const text = await resp.text().catch(() => '');
  if (!resp.ok || text === 'FAIL') {
    throw new Error(`ESP32 update failed (HTTP ${resp.status}): ${text}`);
  }

  onStatus('success');
  return { success: true };
}

/**
 * Ping the ESP32 through the compile server to verify it is reachable and
 * running ArduinoOTA firmware (TCP port 3232 open).
 *
 * @param   {string} espIp
 * @returns {Promise<{reachable: boolean, otaReady: boolean, ip: string}>}
 */
export async function pingESP32(espIp) {
  try {
    const resp = await fetch('/api/ota-ping', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ espIp }),
    });
    const data = await resp.json();
    return { reachable: true, otaReady: !!data.otaReady, ip: espIp, ...data };
  } catch (_) {
    return { reachable: false, otaReady: false, ip: espIp };
  }
}

// ── localStorage helpers ──────────────────────────────────────────────────────

/** Returns the current wireless config from localStorage. */
export function getWirelessConfig() {
  try {
    return {
      enabled:     localStorage.getItem('tg_wireless_enabled') === 'true',
      espIp:       localStorage.getItem('tg_esp32_ip')         || '',
      wifiSsid:    localStorage.getItem('tg_wifi_ssid')        || '',
      wifiPass:    localStorage.getItem('tg_wifi_pass')        || '',
      hostname:    localStorage.getItem('tg_esp32_hostname')    || 'techyguide',
      useStaticIp: localStorage.getItem('tg_use_static_ip')  === 'true',
      staticIp:    localStorage.getItem('tg_static_ip')        || '',
      gateway:     localStorage.getItem('tg_gateway')          || '',
      subnet:      localStorage.getItem('tg_subnet')           || '255.255.255.0',
      webreplPass: localStorage.getItem('tg_webrepl_pass')     || 'techyguide',
      webreplPort: parseInt(localStorage.getItem('tg_webrepl_port') || '8266', 10),
    };
  } catch (_) {
    return { enabled: false, espIp: '', wifiSsid: '', wifiPass: '', hostname: 'techyguide', useStaticIp: false, staticIp: '', gateway: '', subnet: '255.255.255.0', webreplPass: 'techyguide', webreplPort: 8266 };
  }
}

/** Persists changed fields from cfg into localStorage (only keys present in cfg are written). */
export function saveWirelessConfig(cfg) {
  try {
    if ('enabled'     in cfg) localStorage.setItem('tg_wireless_enabled', String(cfg.enabled));
    if ('espIp'       in cfg) localStorage.setItem('tg_esp32_ip',         cfg.espIp);
    if ('wifiSsid'    in cfg) localStorage.setItem('tg_wifi_ssid',        cfg.wifiSsid);
    if ('wifiPass'    in cfg) localStorage.setItem('tg_wifi_pass',        cfg.wifiPass);
    if ('hostname'    in cfg) localStorage.setItem('tg_esp32_hostname',   cfg.hostname);
    if ('useStaticIp' in cfg) localStorage.setItem('tg_use_static_ip',   String(cfg.useStaticIp));
    if ('staticIp'    in cfg) localStorage.setItem('tg_static_ip',        cfg.staticIp);
    if ('gateway'     in cfg) localStorage.setItem('tg_gateway',          cfg.gateway);
    if ('subnet'      in cfg) localStorage.setItem('tg_subnet',           cfg.subnet);
    if ('webreplPass' in cfg) localStorage.setItem('tg_webrepl_pass',     cfg.webreplPass);
    if ('webreplPort' in cfg) localStorage.setItem('tg_webrepl_port',     String(cfg.webreplPort));
  } catch (_) {}
}
