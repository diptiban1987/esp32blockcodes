// Builds a complete Arduino sketch from the Blockly workspace
// Separates setup() code (from esp32_when_starts) from loop() code
import { arduinoGenerator } from '../generators/arduinoGenerator';

/**
 * Generate a full Arduino sketch from the current workspace.
 * @param {Blockly.Workspace} workspace
 * @returns {string} Complete Arduino sketch as C++ string
 */
export function buildArduinoSketch(workspace) {
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

  const parts = [
    ...includes,
    '',
    ...globals,
    ...funcDefs,
    (globals.length || funcDefs.length) ? '' : null,
    'void setup() {',
    setupBody || null,
    '}',
    '',
    'void loop() {',
    loopBody || null,
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
