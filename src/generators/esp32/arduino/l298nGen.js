// Arduino C++ generator for L298 & L298N Motor Driver blocks
import { ArduinoOrder } from '../../arduinoGenerator';

export const forBlock = Object.create(null);

// ── Helper: build motor-direction code ────────────────────────────────────────
function _motorDirCode(motor, dir, speed) {
  let code = '';
  if (motor === 'A' || motor === 'BOTH') {
    if (speed !== null)
      code += `#ifdef L298N_ENA\nanalogWrite(L298N_ENA, map(${speed}, 0, 100, 0, 255));\n#endif\n`;
    code += dir === 'FORWARD'
      ? `digitalWrite(L298N_IN1, HIGH);\ndigitalWrite(L298N_IN2, LOW);\n`
      : `digitalWrite(L298N_IN1, LOW);\ndigitalWrite(L298N_IN2, HIGH);\n`;
  }
  if (motor === 'B' || motor === 'BOTH') {
    if (speed !== null)
      code += `#ifdef L298N_ENB\nanalogWrite(L298N_ENB, map(${speed}, 0, 100, 0, 255));\n#endif\n`;
    code += dir === 'FORWARD'
      ? `digitalWrite(L298N_IN3, HIGH);\ndigitalWrite(L298N_IN4, LOW);\n`
      : `digitalWrite(L298N_IN3, LOW);\ndigitalWrite(L298N_IN4, HIGH);\n`;
  }
  return code;
}

function _motorStopCode(motor) {
  let code = '';
  if (motor === 'A' || motor === 'BOTH')
    code += `digitalWrite(L298N_IN1, LOW);\ndigitalWrite(L298N_IN2, LOW);\n`;
  if (motor === 'B' || motor === 'BOTH')
    code += `digitalWrite(L298N_IN3, LOW);\ndigitalWrite(L298N_IN4, LOW);\n`;
  return code;
}

// ── KEY TRICK: any definitions_ key that contains "setup" is routed by
// arduinoCodeBuilder into setup() instead of loop(). We use this to make all
// "timed" blocks execute ONCE at boot (in setup), not repeatedly in loop(). ──

// ── Setup blocks ──────────────────────────────────────────────────────────────
forBlock['esp32_l298n_init'] = function (block, generator) {
  const in1 = block.getFieldValue('IN1');
  const in2 = block.getFieldValue('IN2');
  const ena = block.getFieldValue('ENA');
  const in3 = block.getFieldValue('IN3');
  const in4 = block.getFieldValue('IN4');
  const enb = block.getFieldValue('ENB');

  generator.definitions_['l298n_pins'] = `
#define L298N_IN1 ${in1}
#define L298N_IN2 ${in2}
#define L298N_ENA ${ena}
#define L298N_IN3 ${in3}
#define L298N_IN4 ${in4}
#define L298N_ENB ${enb}`;

  generator.definitions_['l298n_setup'] = `
pinMode(L298N_IN1, OUTPUT);
pinMode(L298N_IN2, OUTPUT);
pinMode(L298N_ENA, OUTPUT);
pinMode(L298N_IN3, OUTPUT);
pinMode(L298N_IN4, OUTPUT);
pinMode(L298N_ENB, OUTPUT);
analogWrite(L298N_ENA, 255);
analogWrite(L298N_ENB, 255);`;
  return '';
};

forBlock['esp32_l298n_init_4pin'] = function (block, generator) {
  const in1 = block.getFieldValue('IN1');
  const in2 = block.getFieldValue('IN2');
  const in3 = block.getFieldValue('IN3');
  const in4 = block.getFieldValue('IN4');

  generator.definitions_['l298n_pins'] = `
#define L298N_IN1 ${in1}
#define L298N_IN2 ${in2}
#define L298N_IN3 ${in3}
#define L298N_IN4 ${in4}`;

  generator.definitions_['l298n_setup'] = `
pinMode(L298N_IN1, OUTPUT);
pinMode(L298N_IN2, OUTPUT);
pinMode(L298N_IN3, OUTPUT);
pinMode(L298N_IN4, OUTPUT);`;
  return '';
};

// ── Continuous run (goes into loop) ──────────────────────────────────────────
forBlock['esp32_l298n_motor_run'] = function (block, generator) {
  const motor = block.getFieldValue('MOTOR');
  const dir = block.getFieldValue('DIR');
  const speed = block.getFieldValue('SPEED') || '80';
  return _motorDirCode(motor, dir, speed);
};

forBlock['esp32_l298n_motor_forward'] = function (block, generator) {
  return _motorDirCode(block.getFieldValue('MOTOR'), 'FORWARD', null);
};

forBlock['esp32_l298n_motor_backward'] = function (block, generator) {
  return _motorDirCode(block.getFieldValue('MOTOR'), 'BACKWARD', null);
};

// ── Timed run → runs ONCE in setup(), not in loop() ──────────────────────────
// Uses "setup_" prefix in definitions_ key so arduinoCodeBuilder routes it to setup()
forBlock['esp32_l298n_motor_run_time'] = function (block, generator) {
  const motor = block.getFieldValue('MOTOR');
  const dir = block.getFieldValue('DIR');
  const speed = block.getFieldValue('SPEED') || '80';
  const time = block.getFieldValue('TIME') || '1';
  const ms = Math.round(parseFloat(time) * 1000);

  const code =
    _motorDirCode(motor, dir, speed) +
    `delay(${ms});\n` +
    _motorStopCode(motor);

  // KEY: "setup_" prefix → routed into setup() by arduinoCodeBuilder
  generator.definitions_[`setup_motor_timed_${block.id}`] = code.trimEnd();
  return ''; // nothing added to loop()
};

// ── Turn left / right continuous (goes into loop) ─────────────────────────────
forBlock['esp32_l298n_turn_left'] = function (block, generator) {
  const speed = block.getFieldValue('SPEED') || '70';
  let code = '';
  code += `#ifdef L298N_ENA\nanalogWrite(L298N_ENA, map(${speed}, 0, 100, 0, 255));\n#endif\n`;
  code += `#ifdef L298N_ENB\nanalogWrite(L298N_ENB, map(${speed}, 0, 100, 0, 255));\n#endif\n`;
  // A=forward, B=backward
  code += `digitalWrite(L298N_IN1, HIGH);\ndigitalWrite(L298N_IN2, LOW);\n`;
  code += `digitalWrite(L298N_IN3, LOW);\ndigitalWrite(L298N_IN4, HIGH);\n`;
  return code;
};

forBlock['esp32_l298n_turn_right'] = function (block, generator) {
  const speed = block.getFieldValue('SPEED') || '70';
  let code = '';
  code += `#ifdef L298N_ENA\nanalogWrite(L298N_ENA, map(${speed}, 0, 100, 0, 255));\n#endif\n`;
  code += `#ifdef L298N_ENB\nanalogWrite(L298N_ENB, map(${speed}, 0, 100, 0, 255));\n#endif\n`;
  // A=backward, B=forward
  code += `digitalWrite(L298N_IN1, LOW);\ndigitalWrite(L298N_IN2, HIGH);\n`;
  code += `digitalWrite(L298N_IN3, HIGH);\ndigitalWrite(L298N_IN4, LOW);\n`;
  return code;
};

// ── Timed turn → runs ONCE in setup() ─────────────────────────────────────────
forBlock['esp32_l298n_turn_left_time'] = function (block, generator) {
  const speed = block.getFieldValue('SPEED') || '70';
  const time = block.getFieldValue('TIME') || '1';
  const ms = Math.round(parseFloat(time) * 1000);
  let code = '';
  code += `#ifdef L298N_ENA\nanalogWrite(L298N_ENA, map(${speed}, 0, 100, 0, 255));\n#endif\n`;
  code += `#ifdef L298N_ENB\nanalogWrite(L298N_ENB, map(${speed}, 0, 100, 0, 255));\n#endif\n`;
  code += `digitalWrite(L298N_IN1, HIGH);\ndigitalWrite(L298N_IN2, LOW);\n`;
  code += `digitalWrite(L298N_IN3, LOW);\ndigitalWrite(L298N_IN4, HIGH);\n`;
  code += `delay(${ms});\n`;
  code += `digitalWrite(L298N_IN1, LOW);\ndigitalWrite(L298N_IN2, LOW);\n`;
  code += `digitalWrite(L298N_IN3, LOW);\ndigitalWrite(L298N_IN4, LOW);\n`;
  generator.definitions_[`setup_turn_left_${block.id}`] = code.trimEnd();
  return '';
};

forBlock['esp32_l298n_turn_right_time'] = function (block, generator) {
  const speed = block.getFieldValue('SPEED') || '70';
  const time = block.getFieldValue('TIME') || '1';
  const ms = Math.round(parseFloat(time) * 1000);
  let code = '';
  code += `#ifdef L298N_ENA\nanalogWrite(L298N_ENA, map(${speed}, 0, 100, 0, 255));\n#endif\n`;
  code += `#ifdef L298N_ENB\nanalogWrite(L298N_ENB, map(${speed}, 0, 100, 0, 255));\n#endif\n`;
  code += `digitalWrite(L298N_IN1, LOW);\ndigitalWrite(L298N_IN2, HIGH);\n`;
  code += `digitalWrite(L298N_IN3, HIGH);\ndigitalWrite(L298N_IN4, LOW);\n`;
  code += `delay(${ms});\n`;
  code += `digitalWrite(L298N_IN1, LOW);\ndigitalWrite(L298N_IN2, LOW);\n`;
  code += `digitalWrite(L298N_IN3, LOW);\ndigitalWrite(L298N_IN4, LOW);\n`;
  generator.definitions_[`setup_turn_right_${block.id}`] = code.trimEnd();
  return '';
};

// ── Speed / Stop ──────────────────────────────────────────────────────────────
forBlock['esp32_l298n_motor_speed'] = function (block, generator) {
  const motor = block.getFieldValue('MOTOR');
  const speed = block.getFieldValue('SPEED') || '75';
  let code = '';
  if (motor === 'A' || motor === 'BOTH')
    code += `#ifdef L298N_ENA\nanalogWrite(L298N_ENA, map(${speed}, 0, 100, 0, 255));\n#endif\n`;
  if (motor === 'B' || motor === 'BOTH')
    code += `#ifdef L298N_ENB\nanalogWrite(L298N_ENB, map(${speed}, 0, 100, 0, 255));\n#endif\n`;
  return code;
};

forBlock['esp32_l298n_stop_motor'] = function (block, generator) {
  return _motorStopCode(block.getFieldValue('MOTOR'));
};

forBlock['esp32_l298n_stop_all'] = function (block, generator) {
  return `digitalWrite(L298N_IN1, LOW);\ndigitalWrite(L298N_IN2, LOW);\ndigitalWrite(L298N_IN3, LOW);\ndigitalWrite(L298N_IN4, LOW);\n`;
};

// ── Robot navigation continuous (goes into loop) ──────────────────────────────
forBlock['esp32_l298n_robot_move'] = function (block, generator) {
  const move = block.getFieldValue('MOVE');
  const speed = block.getFieldValue('SPEED') || '80';
  let code = `#ifdef L298N_ENA\nanalogWrite(L298N_ENA, map(${speed}, 0, 100, 0, 255));\n#endif\n` +
             `#ifdef L298N_ENB\nanalogWrite(L298N_ENB, map(${speed}, 0, 100, 0, 255));\n#endif\n`;

  switch (move) {
    case 'FORWARD':
      code += `digitalWrite(L298N_IN1, HIGH); digitalWrite(L298N_IN2, LOW);\n` +
              `digitalWrite(L298N_IN3, HIGH); digitalWrite(L298N_IN4, LOW);\n`;
      break;
    case 'BACKWARD':
      code += `digitalWrite(L298N_IN1, LOW); digitalWrite(L298N_IN2, HIGH);\n` +
              `digitalWrite(L298N_IN3, LOW); digitalWrite(L298N_IN4, HIGH);\n`;
      break;
    case 'TURN_LEFT':
      code += `digitalWrite(L298N_IN1, HIGH); digitalWrite(L298N_IN2, LOW);\n` +
              `digitalWrite(L298N_IN3, LOW); digitalWrite(L298N_IN4, HIGH);\n`;
      break;
    case 'TURN_RIGHT':
      code += `digitalWrite(L298N_IN1, LOW); digitalWrite(L298N_IN2, HIGH);\n` +
              `digitalWrite(L298N_IN3, HIGH); digitalWrite(L298N_IN4, LOW);\n`;
      break;
    case 'SPIN_LEFT':
      code += `digitalWrite(L298N_IN1, HIGH); digitalWrite(L298N_IN2, LOW);\n` +
              `digitalWrite(L298N_IN3, LOW); digitalWrite(L298N_IN4, HIGH);\n`;
      break;
    case 'SPIN_RIGHT':
      code += `digitalWrite(L298N_IN1, LOW); digitalWrite(L298N_IN2, HIGH);\n` +
              `digitalWrite(L298N_IN3, HIGH); digitalWrite(L298N_IN4, LOW);\n`;
      break;
    case 'STOP':
    default:
      code += `digitalWrite(L298N_IN1, LOW); digitalWrite(L298N_IN2, LOW);\n` +
              `digitalWrite(L298N_IN3, LOW); digitalWrite(L298N_IN4, LOW);\n`;
      break;
  }
  return code;
};

// ── Robot timed → runs ONCE in setup() ───────────────────────────────────────
forBlock['esp32_l298n_robot_move_time'] = function (block, generator) {
  const moveCode = forBlock['esp32_l298n_robot_move'](block, generator);
  const time = block.getFieldValue('TIME') || '1';
  const ms = Math.round(parseFloat(time) * 1000);
  const code = moveCode +
    `delay(${ms});\n` +
    `digitalWrite(L298N_IN1, LOW); digitalWrite(L298N_IN2, LOW);\n` +
    `digitalWrite(L298N_IN3, LOW); digitalWrite(L298N_IN4, LOW);\n`;

  // KEY: "setup_" prefix → routed into setup() by arduinoCodeBuilder
  generator.definitions_[`setup_robot_timed_${block.id}`] = code.trimEnd();
  return '';
};

forBlock['esp32_l298n_robot_stop'] = forBlock['esp32_l298n_stop_all'];
