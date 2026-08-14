// MicroPython generator for L298 & L298N Motor Driver blocks
import { Order } from "blockly/python";

export const forBlock = Object.create(null);

forBlock["esp32_l298n_init"] = function (block, generator) {
  const in1 = block.getFieldValue("IN1");
  const in2 = block.getFieldValue("IN2");
  const ena = block.getFieldValue("ENA");
  const in3 = block.getFieldValue("IN3");
  const in4 = block.getFieldValue("IN4");
  const enb = block.getFieldValue("ENB");

  generator.definitions_["import_machine"] = "from machine import Pin, PWM";
  generator.definitions_["import_time"] = "import time";
  generator.definitions_["l298n_setup"] = `
_l298n_in1 = Pin(${in1}, Pin.OUT)
_l298n_in2 = Pin(${in2}, Pin.OUT)
_l298n_ena = PWM(Pin(${ena}), freq=1000)
_l298n_in3 = Pin(${in3}, Pin.OUT)
_l298n_in4 = Pin(${in4}, Pin.OUT)
_l298n_enb = PWM(Pin(${enb}), freq=1000)
_l298n_ena.duty(1023)
_l298n_enb.duty(1023)
`;
  return "";
};

forBlock["esp32_l298n_init_4pin"] = function (block, generator) {
  const in1 = block.getFieldValue("IN1");
  const in2 = block.getFieldValue("IN2");
  const in3 = block.getFieldValue("IN3");
  const in4 = block.getFieldValue("IN4");

  generator.definitions_["import_machine"] = "from machine import Pin";
  generator.definitions_["import_time"] = "import time";
  generator.definitions_["l298n_setup"] = `
_l298n_in1 = Pin(${in1}, Pin.OUT)
_l298n_in2 = Pin(${in2}, Pin.OUT)
_l298n_in3 = Pin(${in3}, Pin.OUT)
_l298n_in4 = Pin(${in4}, Pin.OUT)
`;
  return "";
};

forBlock["esp32_l298n_motor_run"] = function (block, generator) {
  const motor = block.getFieldValue("MOTOR");
  const dir = block.getFieldValue("DIR");
  const speed = block.getFieldValue("SPEED") || "80";
  let code = "";

  if (motor === "A" || motor === "BOTH") {
    code += `if '_l298n_ena' in globals(): _l298n_ena.duty(int(${speed} * 1023 / 100))\n`;
    if (dir === "FORWARD") {
      code += `_l298n_in1.value(1)\n_l298n_in2.value(0)\n`;
    } else {
      code += `_l298n_in1.value(0)\n_l298n_in2.value(1)\n`;
    }
  }
  if (motor === "B" || motor === "BOTH") {
    code += `if '_l298n_enb' in globals(): _l298n_enb.duty(int(${speed} * 1023 / 100))\n`;
    if (dir === "FORWARD") {
      code += `_l298n_in3.value(1)\n_l298n_in4.value(0)\n`;
    } else {
      code += `_l298n_in3.value(0)\n_l298n_in4.value(1)\n`;
    }
  }
  return code;
};

forBlock["esp32_l298n_motor_forward"] = function (block, generator) {
  const motor = block.getFieldValue("MOTOR");
  let code = "";
  if (motor === "A" || motor === "BOTH") {
    code += `_l298n_in1.value(1)\n_l298n_in2.value(0)\n`;
  }
  if (motor === "B" || motor === "BOTH") {
    code += `_l298n_in3.value(1)\n_l298n_in4.value(0)\n`;
  }
  return code;
};

forBlock["esp32_l298n_motor_backward"] = function (block, generator) {
  const motor = block.getFieldValue("MOTOR");
  let code = "";
  if (motor === "A" || motor === "BOTH") {
    code += `_l298n_in1.value(0)\n_l298n_in2.value(1)\n`;
  }
  if (motor === "B" || motor === "BOTH") {
    code += `_l298n_in3.value(0)\n_l298n_in4.value(1)\n`;
  }
  return code;
};

forBlock["esp32_l298n_motor_speed"] = function (block, generator) {
  const motor = block.getFieldValue("MOTOR");
  const speed = block.getFieldValue("SPEED") || "75";
  let code = "";
  if (motor === "A" || motor === "BOTH") {
    code += `if '_l298n_ena' in globals(): _l298n_ena.duty(int(${speed} * 1023 / 100))\n`;
  }
  if (motor === "B" || motor === "BOTH") {
    code += `if '_l298n_enb' in globals(): _l298n_enb.duty(int(${speed} * 1023 / 100))\n`;
  }
  return code;
};

forBlock["esp32_l298n_stop_motor"] = function (block, generator) {
  const motor = block.getFieldValue("MOTOR");
  let code = "";
  if (motor === "A" || motor === "BOTH") {
    code += `_l298n_in1.value(0)\n_l298n_in2.value(0)\n`;
  }
  if (motor === "B" || motor === "BOTH") {
    code += `_l298n_in3.value(0)\n_l298n_in4.value(0)\n`;
  }
  return code;
};

forBlock["esp32_l298n_stop_all"] = function (block, generator) {
  return `_l298n_in1.value(0)\n_l298n_in2.value(0)\n_l298n_in3.value(0)\n_l298n_in4.value(0)\n`;
};

// Robot navigation movements
forBlock["esp32_l298n_robot_move"] = function (block, generator) {
  const move = block.getFieldValue("MOVE");
  const speed = block.getFieldValue("SPEED") || "80";
  let code = `if '_l298n_ena' in globals(): _l298n_ena.duty(int(${speed} * 1023 / 100))\n` +
             `if '_l298n_enb' in globals(): _l298n_enb.duty(int(${speed} * 1023 / 100))\n`;

  switch (move) {
    case "FORWARD":
      code += `_l298n_in1.value(1)\n_l298n_in2.value(0)\n_l298n_in3.value(1)\n_l298n_in4.value(0)\n`;
      break;
    case "BACKWARD":
      code += `_l298n_in1.value(0)\n_l298n_in2.value(1)\n_l298n_in3.value(0)\n_l298n_in4.value(1)\n`;
      break;
    case "TURN_LEFT":
      code += `_l298n_in1.value(1)\n_l298n_in2.value(0)\n_l298n_in3.value(0)\n_l298n_in4.value(0)\n`;
      break;
    case "TURN_RIGHT":
      code += `_l298n_in1.value(0)\n_l298n_in2.value(0)\n_l298n_in3.value(1)\n_l298n_in4.value(0)\n`;
      break;
    case "SPIN_LEFT":
      code += `_l298n_in1.value(1)\n_l298n_in2.value(0)\n_l298n_in3.value(0)\n_l298n_in4.value(1)\n`;
      break;
    case "SPIN_RIGHT":
      code += `_l298n_in1.value(0)\n_l298n_in2.value(1)\n_l298n_in3.value(1)\n_l298n_in4.value(0)\n`;
      break;
    case "STOP":
    default:
      code += `_l298n_in1.value(0)\n_l298n_in2.value(0)\n_l298n_in3.value(0)\n_l298n_in4.value(0)\n`;
      break;
  }
  return code;
};

forBlock["esp32_l298n_robot_move_time"] = function (block, generator) {
  const moveCode = forBlock["esp32_l298n_robot_move"](block, generator);
  const time = block.getFieldValue("TIME") || "1";
  generator.definitions_["import_time"] = "import time";
  return `${moveCode}time.sleep(${time})\n` +
         `_l298n_in1.value(0)\n_l298n_in2.value(0)\n_l298n_in3.value(0)\n_l298n_in4.value(0)\n`;
};

forBlock["esp32_l298n_robot_stop"] = forBlock["esp32_l298n_stop_all"];

