// Builds a complete Arduino sketch from the Blockly workspace
// Separates setup() code (from esp32_when_starts) from loop() code
import { arduinoGenerator } from '../generators/arduinoGenerator';

// ── OTA injection template ────────────────────────────────────────────────────
// Injected when otaConfig = { ssid, pass, hostname?, staticIp?, gateway?, subnet? } is provided.
// Adds WiFi + mDNS + HTTP OTA server so the ESP32 can receive future firmware
// updates wirelessly without touching USB again.
//
// mDNS makes the ESP32 discoverable as "<hostname>.local" on ANY network —
// works on 192.168.1.x, 192.168.0.x, 192.168.43.x (Android hotspot),
// 172.20.10.x (iPhone hotspot), 10.0.0.x (enterprise), etc.
function _otaGlobals(ssid, pass, hostname = 'techyguide', staticIp = '', gateway = '', subnet = '') {
  const lines = [
    '// ── TechyGuide OTA (ArduinoOTA over WiFi) ─────────────────────────────────',
    '#include <WiFi.h>',
    '#include <ArduinoOTA.h>',
    '#include <esp_wifi.h>',
    '',
    `const char* _ota_ssid = "${ssid}";`,
    `const char* _ota_pass = "${pass}";`,
    `const char* _ota_hostname = "${hostname}";`,
    'bool _otaReady = false;',
    '',
  ];

  // Static IP configuration (optional)
  if (staticIp) {
    const ipParts = staticIp.split('.').map(p => parseInt(p) || 0);
    const gwParts = gateway ? gateway.split('.').map(p => parseInt(p) || 0) : [ipParts[0], ipParts[1], ipParts[2], 1];
    const snParts = subnet ? subnet.split('.').map(p => parseInt(p) || 0) : [255, 255, 255, 0];
    lines.push(
      `IPAddress _staticIP(${ipParts.join(', ')});`,
      `IPAddress _gateway(${gwParts.join(', ')});`,
      `IPAddress _subnet(${snParts.join(', ')});`,
      ''
    );
  }

  lines.push(
    'void _setupOTA() {',
    '  WiFi.mode(WIFI_STA);',
  );

  if (staticIp) {
    lines.push('  WiFi.config(_staticIP, _gateway, _subnet, _gateway);');
  }

  lines.push(
    '  WiFi.setHostname(_ota_hostname);',
    '  WiFi.begin(_ota_ssid, _ota_pass);',
    '  Serial.print("Connecting to WiFi");',
    '  unsigned long _t = millis();',
    '  while (WiFi.status() != WL_CONNECTED && millis() - _t < 15000) {',
    '    delay(500); Serial.print(".");',
    '  }',
    '  Serial.println();',
    '  if (WiFi.status() != WL_CONNECTED) {',
    '    Serial.println("OTA: WiFi connection failed! Check SSID/password.");',
    '    return;',
    '  }',
    '  Serial.print("WiFi connected! IP: "); Serial.println(WiFi.localIP());',
    '',
    '  // Disable power saving — keeps connection stable during OTA flash',
    '  esp_wifi_set_ps(WIFI_PS_NONE);',
    '',
    '  ArduinoOTA.setHostname(_ota_hostname);',
    '  ArduinoOTA.setPort(3232);',
    '',
    '  ArduinoOTA.onStart([]() {',
    '    String type = (ArduinoOTA.getCommand() == U_FLASH) ? "firmware" : "filesystem";',
    '    Serial.println("OTA START: " + type);',
    '  });',
    '  ArduinoOTA.onEnd([]() {',
    '    Serial.println("\\nOTA END — Rebooting...");',
    '  });',
    '  ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {',
    '    Serial.printf("Progress: %u%%\\r", (progress * 100) / total);',
    '    yield();',
    '  });',
    '  ArduinoOTA.onError([](ota_error_t error) {',
    '    Serial.printf("OTA ERROR [%u]: ", error);',
    '    if      (error == OTA_AUTH_ERROR)    Serial.println("Auth Failed");',
    '    else if (error == OTA_BEGIN_ERROR)   Serial.println("Begin Failed");',
    '    else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");',
    '    else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");',
    '    else if (error == OTA_END_ERROR)     Serial.println("End Failed");',
    '  });',
    '',
    '  ArduinoOTA.begin();',
    '  _otaReady = true;',
    '  Serial.println("─────────────────────────────────");',
    '  Serial.print("OTA ready at http://"); Serial.println(WiFi.localIP());',
    `  Serial.print("  ArduinoOTA: "); Serial.print(_ota_hostname); Serial.println(".local:3232");`,
    '  Serial.println("─────────────────────────────────");',
    '}',
  );

  return lines.join('\n');
}

function _cloudOtaGlobals(ssid, pass, serverUrl = '', deviceId = 'TG-ESP32-000001', currentVersion = '1.0.0') {
  const lines = [
    '// ── TechyGuide Cloud OTA (Lightsail Remote OTA) ───────────────────────────────',
    '#include <WiFi.h>',
    '#include <HTTPClient.h>',
    '#include <Update.h>',
    '',
    `const char* _cloud_ssid = "${ssid}";`,
    `const char* _cloud_pass = "${pass}";`,
    `const char* _cloud_server = "${serverUrl}";`,
    `const char* _cloud_deviceId = "${deviceId}";`,
    `const char* _cloud_version = "${currentVersion}";`,
    'unsigned long _lastCloudPoll = 0;',
    'bool _cloudOtaReady = false;',
    '',
    'void _reportCloudStatus(const char* jobId, const char* status, const char* err = "") {',
    '  if (WiFi.status() != WL_CONNECTED) return;',
    '  HTTPClient http;',
    '  String url = String(_cloud_server) + "/api/cloud-ota/status";',
    '  http.begin(url);',
    '  http.addHeader("Content-Type", "application/json");',
    '  String body = "{\\"deviceId\\":\\"" + String(_cloud_deviceId) + "\\",\\"jobId\\":\\"" + String(jobId) + "\\",\\"status\\":\\"" + String(status) + "\\",\\"error\\":\\"" + String(err) + "\\",\\"version\\":\\"" + String(_cloud_version) + "\\"}";',
    '  http.POST(body);',
    '  http.end();',
    '}',
    '',
    'void _performCloudOTA(String downloadUrl, String jobId, String expectedSha256, int expectedSize) {',
    '  _reportCloudStatus(jobId.c_str(), "DOWNLOADING");',
    '  HTTPClient http;',
    '  String fullUrl = downloadUrl.startsWith("http") ? downloadUrl : (String(_cloud_server) + downloadUrl);',
    '  Serial.print("[CloudOTA] Downloading firmware from: "); Serial.println(fullUrl);',
    '  http.begin(fullUrl);',
    '  int httpCode = http.GET();',
    '  if (httpCode != 200) {',
    '    Serial.printf("[CloudOTA] Download failed, HTTP code: %d\\n", httpCode);',
    '    _reportCloudStatus(jobId.c_str(), "FAILED", "Firmware Download Failed");',
    '    http.end();',
    '    return;',
    '  }',
    '  int contentLength = http.getSize();',
    '  if (contentLength <= 0) contentLength = expectedSize;',
    '  _reportCloudStatus(jobId.c_str(), "VERIFYING");',
    '  if (!Update.begin(contentLength)) {',
    '    Serial.printf("[CloudOTA] Update.begin failed, error: %d\\n", Update.getError());',
    '    _reportCloudStatus(jobId.c_str(), "FAILED", "OTA Partition Error");',
    '    http.end();',
    '    return;',
    '  }',
    '  _reportCloudStatus(jobId.c_str(), "INSTALLING");',
    '  WiFiClient* stream = http.getStreamPtr();',
    '  size_t written = Update.writeStream(*stream);',
    '  if (written != (size_t)contentLength) {',
    '    Serial.printf("[CloudOTA] Written %d of %d bytes\\n", (int)written, contentLength);',
    '    _reportCloudStatus(jobId.c_str(), "FAILED", "Incomplete Firmware Stream");',
    '    http.end();',
    '    return;',
    '  }',
    '  if (!Update.end() || !Update.isFinished()) {',
    '    Serial.printf("[CloudOTA] Update.end failed, error: %d\\n", Update.getError());',
    '    _reportCloudStatus(jobId.c_str(), "FAILED", "Update Installation Failed");',
    '    http.end();',
    '    return;',
    '  }',
    '  Serial.println("[CloudOTA] OTA Installation Success! Rebooting...");',
    '  _reportCloudStatus(jobId.c_str(), "REBOOTING");',
    '  _reportCloudStatus(jobId.c_str(), "SUCCESS");',
    '  delay(1000);',
    '  ESP.restart();',
    '}',
    '',
    'void _pollCloudOTA() {',
    '  if (WiFi.status() != WL_CONNECTED) return;',
    '  HTTPClient http;',
    '  String pollUrl = String(_cloud_server) + "/api/cloud-ota/poll?deviceId=" + String(_cloud_deviceId) + "&version=" + String(_cloud_version);',
    '  http.begin(pollUrl);',
    '  http.addHeader("x-device-id", _cloud_deviceId);',
    '  http.addHeader("x-firmware-version", _cloud_version);',
    '  int httpCode = http.GET();',
    '  if (httpCode == 200) {',
    '    String payload = http.getString();',
    '    if (payload.indexOf("\\"hasJob\\":true") != -1) {',
    '      Serial.println("[CloudOTA] Pending OTA job found!");',
    '      int jStart = payload.indexOf("\\"jobId\\":\\"") + 9;',
    '      int jEnd = payload.indexOf("\\"", jStart);',
    '      String jobId = payload.substring(jStart, jEnd);',
    '      int dStart = payload.indexOf("\\"downloadUrl\\":\\"") + 15;',
    '      int dEnd = payload.indexOf("\\"", dStart);',
    '      String downloadUrl = payload.substring(dStart, dEnd);',
    '      int sStart = payload.indexOf("\\"sha256\\":\\"") + 10;',
    '      int sEnd = payload.indexOf("\\"", sStart);',
    '      String sha256 = payload.substring(sStart, sEnd);',
    '      int szStart = payload.indexOf("\\"size\\":") + 7;',
    '      int szEnd = payload.indexOf(",", szStart);',
    '      if (szEnd == -1) szEnd = payload.indexOf("}", szStart);',
    '      int size = payload.substring(szStart, szEnd).toInt();',
    '      _performCloudOTA(downloadUrl, jobId, sha256, size);',
    '    }',
    '  }',
    '  http.end();',
    '}',
    '',
    'void _setupOTA() {',
    '  WiFi.mode(WIFI_STA);',
    '  WiFi.begin(_cloud_ssid, _cloud_pass);',
    '  Serial.print("[CloudOTA] Connecting WiFi");',
    '  unsigned long _t = millis();',
    '  while (WiFi.status() != WL_CONNECTED && millis() - _t < 15000) {',
    '    delay(500); Serial.print(".");',
    '  }',
    '  Serial.println();',
    '  if (WiFi.status() != WL_CONNECTED) {',
    '    Serial.println("[CloudOTA] WiFi Connection Failed!");',
    '    return;',
    '  }',
    '  Serial.print("[CloudOTA] WiFi Connected! IP: "); Serial.println(WiFi.localIP());',
    '  Serial.print("[CloudOTA] Lightsail Server: "); Serial.println(_cloud_server);',
    '  _cloudOtaReady = true;',
    '  _pollCloudOTA();',
    '}',
  ];
  return lines.join('\n');
}

/**
 * Generate a full Arduino sketch from the current workspace.
 *
 * @param {Blockly.Workspace} workspace
 * @param {{ ssid: string, pass: string, hostname?: string, staticIp?: string, gateway?: string, subnet?: string } | null} otaConfig
 *   When provided, injects a WiFi + mDNS + OTA server so the sketch can be
 *   updated wirelessly after the first USB flash.
 * @returns {string} Complete Arduino sketch as C++ string
 */
export function buildArduinoSketch(workspace, otaConfig = null) {
  const topBlocks = workspace.getTopBlocks(true);

  arduinoGenerator.init(workspace);

  const setupLines = [];
  const loopLines = [];

  for (const block of topBlocks) {
    if (block.type === 'esp32_when_starts') {
      const setupCode = (arduinoGenerator.statementToCode(block, 'SETUP') || '').replace(/^\s+/gm, '');
      const loopCode = (arduinoGenerator.statementToCode(block, 'LOOP') || '').replace(/^\s+/gm, '');
      if (setupCode.trim()) setupLines.push(setupCode.trimEnd());
      if (loopCode.trim()) loopLines.push(loopCode.trimEnd());
    } else {
      const code = arduinoGenerator.blockToCode(block);
      if (typeof code === 'string' && code.trim()) {
        loopLines.push(code.trimEnd());
      }
    }
  }

  // Collect definitions: includes, pin-setup (→ setup), functions, globals, loop-end delays
  const includes = [];
  const pinSetupDefs = [];  // e.g. pinMode() — goes inside setup()
  const funcDefs = [];      // function declarations
  const globals = [];       // variable declarations
  const loopDelays = [];    // delay() injected at end of loop() — key starts with 'loop_delay_'

  for (const [key, val] of Object.entries(arduinoGenerator.definitions_)) {
    const first = val.split('\n')[0].trim();
    const keyLower = key.toLowerCase();
    if (key.startsWith('loop_delay_')) {
      loopDelays.push(val);
    } else if (first.startsWith('#include') || first.startsWith('#define')) {
      if (!includes.includes(val)) includes.push(val);
    } else if (
      first.startsWith('pinMode') ||
      keyLower.startsWith('init') ||
      keyLower.includes('_init') ||
      keyLower.includes('setup') ||
      keyLower.includes('pinmode')
    ) {
      pinSetupDefs.push(val);
    } else if (/^(void|int|float|long|bool|String)\s+\w+\s*\(/.test(first)) {
      funcDefs.push(val);
    } else {
      globals.push(val);
    }
  }

  // Add I2C device detection helper if any I2C sensor is used
  const hasI2CSensor = Object.keys(arduinoGenerator.definitions_).some(
    k => k.includes('bmp280') || k.includes('mpu') || k.includes('lcd')
  );
  if (hasI2CSensor) {
    const i2cHelper =
`bool i2cDeviceExists(uint8_t address) {
  Wire.beginTransmission(address);
  return (Wire.endTransmission() == 0);
}`;
    if (!funcDefs.includes(i2cHelper)) funcDefs.push(i2cHelper);
  }

  const indentCode = (code) =>
    code
      .split('\n')
      .map((l) => (l.trim() ? '  ' + l.replace(/^\s+/, '') : ''))
      .join('\n');

  // Auto-inject Serial.begin if any code uses Serial
  const allCode = setupLines.join('\n') + loopLines.join('\n');
  const needsSerial = /Serial\.(print|println|read|write|available|parseInt|parseFloat)/.test(allCode);

  // Combine setup: Serial.begin + pin setup defs + user setup blocks
  const fullSetup = [];
  if (needsSerial) fullSetup.push('  Serial.begin(115200);');
  for (const pd of pinSetupDefs) fullSetup.push(indentCode(pd));
  for (const sl of setupLines) fullSetup.push(indentCode(sl));

  const setupBody = fullSetup.length > 0 ? fullSetup.join('\n') : '';

  // Build loop body — user code first, then sensor delays at end
  const loopBodyLines = loopLines.map(indentCode);
  // Only add delay if user hasn't already added one to the loop
  const userHasDelay = loopLines.some(l => /\bdelay\s*\(/.test(l));
  if (!userHasDelay && loopDelays.length > 0) {
    // Use the longest delay (sensors with slower sample rate take priority)
    const delayMs = loopDelays.reduce((max, d) => {
      const m = d.match(/delay\((\d+)\)/);
      return m ? Math.max(max, parseInt(m[1])) : max;
    }, 0);
    if (delayMs > 0) loopBodyLines.push(`  delay(${delayMs}); // sensor sample interval`);
  }

  const loopBody = loopBodyLines.length > 0 ? loopBodyLines.join('\n') : '';

  // ── OTA injection ──────────────────────────────────────────────────────────
  // When otaConfig is supplied, prepend the OTA globals block and wire
  // _setupOTA() into setup() and _otaSrv.handleClient() into loop().
  let otaGlobalBlock = null;
  let otaSetupLine   = null;
  let otaLoopLine    = null;

  if (otaConfig?.ssid) {
    if (otaConfig.cloudOtaMode) {
      otaGlobalBlock = _cloudOtaGlobals(
        otaConfig.ssid,
        otaConfig.pass || '',
        otaConfig.serverUrl || '',
        otaConfig.deviceId || 'TG-ESP32-000001',
        otaConfig.version || '1.0.0'
      );
      otaSetupLine   = '  _setupOTA();';
      otaLoopLine    = '  if (_cloudOtaReady && millis() - _lastCloudPoll > 10000) { _lastCloudPoll = millis(); _pollCloudOTA(); }';
    } else {
      otaGlobalBlock = _otaGlobals(
        otaConfig.ssid,
        otaConfig.pass || '',
        otaConfig.hostname || 'techyguide',
        otaConfig.staticIp || '',
        otaConfig.gateway || '',
        otaConfig.subnet || ''
      );
      otaSetupLine   = '  _setupOTA();';
      otaLoopLine    = '  if (_otaReady) ArduinoOTA.handle();';
    }
    // OTA always needs Serial for the IP printout
    if (!fullSetup.some(l => l.includes('Serial.begin'))) {
      fullSetup.unshift('  Serial.begin(115200);');
    }
  }

  const finalSetupBody = (() => {
    if (!otaConfig?.ssid) return setupBody || null;
    // Serial.begin must come first so _setupOTA()'s WiFi messages are visible
    // in the serial monitor. Pull it to the front, then _setupOTA(), then the
    // rest of the user's setup code.
    const serialLine = '  Serial.begin(115200);';
    const restOfSetup = fullSetup.filter(l => !l.includes('Serial.begin'));
    return [serialLine, otaSetupLine, ...restOfSetup].filter(Boolean).join('\n') || null;
  })();

  const finalLoopBody = otaLoopLine
    ? [otaLoopLine, loopBody].filter(Boolean).join('\n')
    : (loopBody || null);

  const parts = [
    ...(otaGlobalBlock ? [otaGlobalBlock, ''] : []),
    ...includes,
    '',
    ...globals,
    ...funcDefs,
    (globals.length || funcDefs.length) ? '' : null,
    'void setup() {',
    otaConfig?.ssid ? (finalSetupBody || null) : (setupBody || null),
    '}',
    '',
    'void loop() {',
    finalLoopBody,
    '}',
  ].filter((l) => l !== null);

  return parts.join('\n') + '\n';
}


/**
 * Returns a minimal empty Arduino sketch template.
 */
export function emptyArduinoSketch() {
  return [
    'void setup() {',
    '',
    '}',
    '',
    'void loop() {',
    '',
    '}',
  ].join('\n') + '\n';
}
