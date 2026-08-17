// Generator — ANALOG HALL EFFECT SENSOR blocks (Arduino C++)
// New "esp32_hallfx_*" prefix. Does NOT touch the existing
// "esp32_hall_module_*" or "esp32_get_hall_sensor" Arduino
// generators (backward compatible).
import { ArduinoOrder } from "../../arduinoGenerator";

export const forBlock = Object.create(null);

// ─────────────────────────────────────────────────────────────
//  SETUP — nothing required for a passive analog hall sensor
// ─────────────────────────────────────────────────────────────
forBlock["esp32_hallfx_setup"] = function () {
  return "";
};

// ─────────────────────────────────────────────────────────────
//  RAW (0–4095)
// ─────────────────────────────────────────────────────────────
forBlock["esp32_hallfx_raw"] = function (block) {
  const pin = block.getFieldValue("PIN");
  return [`analogRead(${pin})`, ArduinoOrder.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  FIELD STRENGTH % (0–100; ~50 ≈ no field for ratiometric sensors)
// ─────────────────────────────────────────────────────────────
forBlock["esp32_hallfx_field_percent"] = function (block) {
  const pin = block.getFieldValue("PIN");
  return [`map(analogRead(${pin}), 0, 4095, 0, 100)`, ArduinoOrder.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  VOLTAGE (0 – 3.3 V)
// ─────────────────────────────────────────────────────────────
forBlock["esp32_hallfx_voltage"] = function (block) {
  const pin = block.getFieldValue("PIN");
  return [`(analogRead(${pin}) * 3.3 / 4095.0)`, ArduinoOrder.MULTIPLICATIVE];
};

// ─────────────────────────────────────────────────────────────
//  IS NEAR (field strength % > threshold)
// ─────────────────────────────────────────────────────────────
forBlock["esp32_hallfx_is_near"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const threshold = block.getFieldValue("THRESHOLD") || "70";
  return [`(map(analogRead(${pin}), 0, 4095, 0, 100) > ${threshold})`, ArduinoOrder.RELATIONAL];
};

// ─────────────────────────────────────────────────────────────
//  WAIT UNTIL NEAR (with optional timeout, -1 = forever)
//  Wrapped in a bare block `{ ... }` so the local `unsigned long`
//  deadline variable can't collide if multiple wait blocks appear
//  in the same function.
// ─────────────────────────────────────────────────────────────
forBlock["esp32_hallfx_wait_until_near"] = function (block) {
  const pin = block.getFieldValue("PIN");
  const threshold = block.getFieldValue("THRESHOLD") || "70";
  const timeout = Number(block.getFieldValue("TIMEOUT"));
  const cond = `!(map(analogRead(${pin}), 0, 4095, 0, 100) > ${threshold})`;
  if (!Number.isFinite(timeout) || timeout < 0) {
    return `while (${cond}) { delay(10); }\n`;
  }
  const ms = Math.max(0, Math.floor(timeout));
  return (
    `{\n` +
    `  unsigned long _hallfx_deadline = millis() + ${ms};\n` +
    `  while (${cond}) {\n` +
    `    if ((long)(millis() - _hallfx_deadline) >= 0) break;\n` +
    `    delay(10);\n` +
    `  }\n` +
    `}\n`
  );
};

// ─────────────────────────────────────────────────────────────
//  Shared helper — low→high pulse counter on a digital Hall OUT pin.
//  Emitted once at global scope via definitions_.
// ─────────────────────────────────────────────────────────────
function ensurePulseCounter(generator) {
  if (!generator.definitions_["def_hallfx_count"]) {
    generator.definitions_["def_hallfx_count"] =
`int hallfx_count_pulses(int pinNo, int durationMs) {
  int last = digitalRead(pinNo);
  int count = 0;
  unsigned long end = (unsigned long)millis() + (unsigned long)durationMs;
  while ((unsigned long)millis() < end) {
    int v = digitalRead(pinNo);
    if (v == 1 && last == 0) { count++; }
    last = v;
    delayMicroseconds(200);
  }
  return count;
}`;
  }
}

// ─────────────────────────────────────────────────────────────
//  COUNT PULSES (digital hall OUT, given sample window ms)
// ─────────────────────────────────────────────────────────────
forBlock["esp32_hallfx_count_pulses"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  const duration = block.getFieldValue("DURATION") || "1000";
  generator.definitions_[`pinMode_input_${pin}`] = `  pinMode(${pin}, INPUT);`;
  ensurePulseCounter(generator);
  return [`hallfx_count_pulses(${pin}, ${duration})`, ArduinoOrder.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  RPM (tachometer) — rpm = pulses * 60000 / (duration * poles)
// ─────────────────────────────────────────────────────────────
forBlock["esp32_hallfx_rpm"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  const duration = block.getFieldValue("DURATION") || "1000";
  const poles = block.getFieldValue("POLES") || "1";
  generator.definitions_[`pinMode_input_${pin}`] = `  pinMode(${pin}, INPUT);`;
  ensurePulseCounter(generator);
  return [`(hallfx_count_pulses(${pin}, ${duration}) * 60000L / ((${duration}) * (${poles})))`, ArduinoOrder.MULTIPLICATIVE];
};

// ─────────────────────────────────────────────────────────────
//  ALARM — if strength > threshold turn ON output pin, else OFF
// ─────────────────────────────────────────────────────────────
forBlock["esp32_hallfx_alarm"] = function (block, generator) {
  const sensorPin = block.getFieldValue("SENSOR_PIN");
  const threshold = block.getFieldValue("THRESHOLD") || "70";
  const outputPin = block.getFieldValue("OUTPUT_PIN");
  generator.definitions_[`pinMode_output_${outputPin}`] = `  pinMode(${outputPin}, OUTPUT);`;
  return (
    `if (map(analogRead(${sensorPin}), 0, 4095, 0, 100) > ${threshold}) {\n` +
    `  digitalWrite(${outputPin}, HIGH);\n` +
    `} else {\n` +
    `  digitalWrite(${outputPin}, LOW);\n` +
    `}\n`
  );
};

// ─────────────────────────────────────────────────────────────
//  PRINT TO SERIAL
// ─────────────────────────────────────────────────────────────
forBlock["esp32_hallfx_print_serial"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["serial_begin"] = "Serial.begin(115200);";
  return (
    `Serial.print("Hall Strength: ");\n` +
    `Serial.print(map(analogRead(${pin}), 0, 4095, 0, 100));\n` +
    `Serial.println("%");\n`
  );
};
