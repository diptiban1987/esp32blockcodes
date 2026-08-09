// python generator for esp32 core blocks
import { Order } from "blockly/python";
import { getGpioPinVar } from "../pinHelper";

export const forBlock = Object.create(null);

forBlock["esp32_when_starts"] = function (block, generator) {
  // Extract child blocks from SETUP and LOOP statement inputs
  const setupCode = generator.statementToCode(block, "SETUP") || "";
  const loopCode = generator.statementToCode(block, "LOOP") || "";

  let code = "";
  // Setup code: strip Blockly's auto-indent so it appears at top level.
  // buildESP32Code() will classify import/pin-init lines and hoist them above the loop.
  if (setupCode.trim()) {
    code += setupCode.replace(/^  /gm, "");
  }
  // Loop code: also emit at top level — buildESP32Code() wraps in while True:
  if (loopCode.trim()) {
    code += loopCode.replace(/^  /gm, "");
  }
  return code;
};

forBlock["esp32_read_digital_pin"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  const gpioVar = getGpioPinVar(generator, pin, "IN");
  return [`${gpioVar}.value()`, Order.FUNCTION_CALL];
};

forBlock["esp32_read_analog_pin"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_machine_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`adc_init_${pin}`] = `adc_${pin} = ADC(Pin(${pin}))`;
  return [`adc_${pin}.read()`, Order.FUNCTION_CALL];
};

forBlock["esp32_set_digital_pin"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  const state = block.getFieldValue("STATE");
  const gpioVar = getGpioPinVar(generator, pin, "OUT");
  return `${gpioVar}.value(${state})\n`;
};

forBlock["esp32_set_pin_mode"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  const mode = block.getFieldValue("MODE");
  const modeMap = { OUTPUT: "OUT", INPUT: "IN", INPUT_PULLUP: "INPUT_PULLUP" };
  const pyMode = modeMap[mode] || mode;
  getGpioPinVar(generator, pin, pyMode);
  return "";
};

forBlock["esp32_set_pwm_pin"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  const value = block.getFieldValue("VALUE");
  const gpioVar = getGpioPinVar(generator, pin, "PWM");
  return `${gpioVar}.duty(${value})\n`;
};

forBlock["esp32_get_touch_pin"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_machine_touch"] = "from machine import Pin, TouchPad";
  return [`TouchPad(Pin(${pin})).read()`, Order.FUNCTION_CALL];
};

forBlock["esp32_get_hall_sensor"] = function (block, generator) {
  generator.definitions_["import_esp32"] = "import esp32";
  return [`esp32.hall_sensor()`, Order.FUNCTION_CALL];
};

forBlock["esp32_get_bt_mac"] = function (block, generator) {
  generator.definitions_["import_bt_core"] = "import bluetooth";
  return [`':'.join(['%02x' % b for b in bluetooth.BLE().config('mac')[1]])`, Order.FUNCTION_CALL];
};

forBlock["esp32_map_value"] = function (block, generator) {
  const fromLow = block.getFieldValue("FROM_LOW");
  const fromHigh = block.getFieldValue("FROM_HIGH");
  const toLow = block.getFieldValue("TO_LOW");
  const toHigh = block.getFieldValue("TO_HIGH");
  const value = generator.valueToCode(block, "VALUE", Order.NONE) || "0";
  generator.definitions_["def_map"] =
`def _map(x, in_min, in_max, out_min, out_max):
    return int((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min)`;
  return [`_map(${value}, ${fromLow}, ${fromHigh}, ${toLow}, ${toHigh})`, Order.FUNCTION_CALL];
};

forBlock["esp32_hall_magnet_detected"] = function (block, generator) {
  const threshold = block.getFieldValue("THRESHOLD") || "100";
  generator.definitions_["import_esp32"] = "import esp32";
  return [`abs(esp32.hall_sensor()) > ${threshold}`, Order.COMPARISON];
};
