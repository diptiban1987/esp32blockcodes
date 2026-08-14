import { ArduinoOrder } from '../../arduinoGenerator';

export const forBlock = Object.create(null);

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

forBlock['esp32_l298n_motor_run'] = function (block, generator) {
  const motor = block.getFieldValue('MOTOR');
  const dir = block.getFieldValue('DIR');
  const speed = block.getFieldValue('SPEED') || '80';
  let code = '';

  if (motor === 'A' || motor === 'BOTH') {
    code += `#ifdef L298N_ENA\nanalogWrite(L298N_ENA, map(${speed}, 0, 100, 0, 255));\n#endif\n`;
    if (dir === 'FORWARD') {
      code += `digitalWrite(L298N_IN1, HIGH);\ndigitalWrite(L298N_IN2, LOW);\n`;
    } else {
      code += `digitalWrite(L298N_IN1, LOW);\ndigitalWrite(L298N_IN2, HIGH);\n`;
    }
  }
  if (motor === 'B' || motor === 'BOTH') {
    code += `#ifdef L298N_ENB\nanalogWrite(L298N_ENB, map(${speed}, 0, 100, 0, 255));\n#endif\n`;
    if (dir === 'FORWARD') {
      code += `digitalWrite(L298N_IN3, HIGH);\ndigitalWrite(L298N_IN4, LOW);\n`;
    } else {
      code += `digitalWrite(L298N_IN3, LOW);\ndigitalWrite(L298N_IN4, HIGH);\n`;
    }
  }
  return code;
};

forBlock['esp32_l298n_motor_run_time'] = function (block, generator) {
  const motor = block.getFieldValue('MOTOR');
  const dir = block.getFieldValue('DIR');
  const speed = block.getFieldValue('SPEED') || '80';
  const time = block.getFieldValue('TIME') || '1';
  const ms = Math.round(parseFloat(time) * 1000);
  let code = '';
  if (motor === 'A' || motor === 'BOTH') {
    code += `#ifdef L298N_ENA\nanalogWrite(L298N_ENA, map(${speed}, 0, 100, 0, 255));\n#endif\n`;
    code += dir === 'FORWARD'
      ? `digitalWrite(L298N_IN1, HIGH);\ndigitalWrite(L298N_IN2, LOW);\n`
      : `digitalWrite(L298N_IN1, LOW);\ndigitalWrite(L298N_IN2, HIGH);\n`;
  }
  if (motor === 'B' || motor === 'BOTH') {
    code += `#ifdef L298N_ENB\nanalogWrite(L298N_ENB, map(${speed}, 0, 100, 0, 255));\n#endif\n`;
    code += dir === 'FORWARD'
      ? `digitalWrite(L298N_IN3, HIGH);\ndigitalWrite(L298N_IN4, LOW);\n`
      : `digitalWrite(L298N_IN3, LOW);\ndigitalWrite(L298N_IN4, HIGH);\n`;
  }
  code += `delay(${ms});\n`;
  // Auto-stop
  if (motor === 'A' || motor === 'BOTH') {
    code += `digitalWrite(L298N_IN1, LOW);\ndigitalWrite(L298N_IN2, LOW);\n`;
  }
  if (motor === 'B' || motor === 'BOTH') {
    code += `digitalWrite(L298N_IN3, LOW);\ndigitalWrite(L298N_IN4, LOW);\n`;
  }
  return code;
};

forBlock['esp32_l298n_motor_forward'] = function (block, generator) {
  const motor = block.getFieldValue('MOTOR');
  let code = '';
  if (motor === 'A' || motor === 'BOTH') {
    code += `digitalWrite(L298N_IN1, HIGH);\ndigitalWrite(L298N_IN2, LOW);\n`;
  }
  if (motor === 'B' || motor === 'BOTH') {
    code += `digitalWrite(L298N_IN3, HIGH);\ndigitalWrite(L298N_IN4, LOW);\n`;
  }
  return code;
};

forBlock['esp32_l298n_motor_backward'] = function (block, generator) {
  const motor = block.getFieldValue('MOTOR');
  let code = '';
  if (motor === 'A' || motor === 'BOTH') {
    code += `digitalWrite(L298N_IN1, LOW);\ndigitalWrite(L298N_IN2, HIGH);\n`;
  }
  if (motor === 'B' || motor === 'BOTH') {
    code += `digitalWrite(L298N_IN3, LOW);\ndigitalWrite(L298N_IN4, HIGH);\n`;
  }
  return code;
};

forBlock['esp32_l298n_motor_speed'] = function (block, generator) {
  const motor = block.getFieldValue('MOTOR');
  const speed = block.getFieldValue('SPEED') || '75';
  let code = '';
  if (motor === 'A' || motor === 'BOTH') {
    code += `#ifdef L298N_ENA\nanalogWrite(L298N_ENA, map(${speed}, 0, 100, 0, 255));\n#endif\n`;
  }
  if (motor === 'B' || motor === 'BOTH') {
    code += `#ifdef L298N_ENB\nanalogWrite(L298N_ENB, map(${speed}, 0, 100, 0, 255));\n#endif\n`;
  }
  return code;
};

forBlock['esp32_l298n_stop_motor'] = function (block, generator) {
  const motor = block.getFieldValue('MOTOR');
  let code = '';
  if (motor === 'A' || motor === 'BOTH') {
    code += `digitalWrite(L298N_IN1, LOW);\ndigitalWrite(L298N_IN2, LOW);\n`;
  }
  if (motor === 'B' || motor === 'BOTH') {
    code += `digitalWrite(L298N_IN3, LOW);\ndigitalWrite(L298N_IN4, LOW);\n`;
  }
  return code;
};

forBlock['esp32_l298n_stop_all'] = function (block, generator) {
  return `digitalWrite(L298N_IN1, LOW);\ndigitalWrite(L298N_IN2, LOW);\ndigitalWrite(L298N_IN3, LOW);\ndigitalWrite(L298N_IN4, LOW);\n`;
};

// Robot navigation movements
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
              `digitalWrite(L298N_IN3, LOW); digitalWrite(L298N_IN4, LOW);\n`;
      break;
    case 'TURN_RIGHT':
      code += `digitalWrite(L298N_IN1, LOW); digitalWrite(L298N_IN2, LOW);\n` +
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

forBlock['esp32_l298n_robot_move_time'] = function (block, generator) {
  const moveCode = forBlock['esp32_l298n_robot_move'](block, generator);
  const time = block.getFieldValue('TIME') || '1';
  const ms = Math.round(parseFloat(time) * 1000);
  return `${moveCode}delay(${ms});\n` +
         `digitalWrite(L298N_IN1, LOW); digitalWrite(L298N_IN2, LOW);\n` +
         `digitalWrite(L298N_IN3, LOW); digitalWrite(L298N_IN4, LOW);\n`;
};

forBlock['esp32_l298n_robot_stop'] = forBlock['esp32_l298n_stop_all'];

