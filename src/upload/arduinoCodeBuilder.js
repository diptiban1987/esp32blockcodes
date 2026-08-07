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
    '#include <WiFi.h>',
    '#include <WebServer.h>',
    '#include <Update.h>',
    '#include <ESPmDNS.h>',
    '',
    `const char* _ota_ssid = "${ssid}";`,
    `const char* _ota_pass = "${pass}";`,
    `const char* _ota_hostname = "${hostname}";`,
    'WebServer _otaSrv(80);',
    'bool _otaReady = false;',
    '',
  ];

  // Static IP configuration (optional — only if user specified one)
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
    `  WiFi.setHostname(_ota_hostname);`,
  );

  if (staticIp) {
    lines.push('  WiFi.config(_staticIP, _gateway, _subnet);');
  }

  lines.push(
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
    '  // mDNS — makes ESP32 discoverable as <hostname>.local on ANY network',
    '  if (MDNS.begin(_ota_hostname)) {',
    `    Serial.print("mDNS started: http://"); Serial.print(_ota_hostname); Serial.println(".local");`,
    '    MDNS.addService("http", "tcp", 80);',
    '  }',
    '',
    '  _otaSrv.on("/ping", HTTP_GET, []() {',
    '    String info = "TechyGuide-OTA-Ready\\nIP:" + WiFi.localIP().toString();',
    '    _otaSrv.send(200, "text/plain", info);',
    '  });',
    '  _otaSrv.on("/update", HTTP_POST,',
    '    []() { _otaSrv.send(200, "text/plain", Update.hasError() ? "FAIL" : "OK"); ESP.restart(); },',
    '    []() {',
    '      HTTPUpload& up = _otaSrv.upload();',
    '      if      (up.status == UPLOAD_FILE_START)  { Update.begin(UPDATE_SIZE_UNKNOWN); }',
    '      else if (up.status == UPLOAD_FILE_WRITE)  { Update.write(up.buf, up.currentSize); }',
    '      else if (up.status == UPLOAD_FILE_END)    { Update.end(true); }',
    '    }',
    '  );',
    '  _otaSrv.begin();',
    '  _otaReady = true;',
    '  Serial.println("─────────────────────────────────");',
    '  Serial.print("OTA ready at http://"); Serial.println(WiFi.localIP());',
    `  Serial.print("  or http://"); Serial.print(_ota_hostname); Serial.println(".local");`,
    '  Serial.println("─────────────────────────────────");',
    '}',
  );

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
    otaGlobalBlock = _otaGlobals(
      otaConfig.ssid,
      otaConfig.pass || '',
      otaConfig.hostname || 'techyguide',
      otaConfig.staticIp || '',
      otaConfig.gateway || '',
      otaConfig.subnet || ''
    );
    otaSetupLine   = '  _setupOTA();';
    otaLoopLine    = '  if (_otaReady) _otaSrv.handleClient();';
    // OTA always needs Serial for the IP printout
    if (!fullSetup.some(l => l.includes('Serial.begin'))) {
      fullSetup.unshift('  Serial.begin(115200);');
    }
  }

  const finalSetupBody = [
    otaSetupLine,
    ...(otaConfig?.ssid ? fullSetup : [setupBody || null]),
  ].filter(Boolean).join('\n') || null;

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
