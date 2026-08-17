// Generator — ANALOG HALL EFFECT SENSOR blocks (MicroPython)
// New "esp32_hallfx_*" prefix. Does NOT touch the existing
// "esp32_hall_module_*" or "esp32_get_hall_sensor" generators
// (backward compatible).
import { Order } from "blockly/python";

export const forBlock = Object.create(null);

// ─────────────────────────────────────────────────────────────
//  SETUP — declare ADC pin once
// ─────────────────────────────────────────────────────────────
forBlock["esp32_hallfx_setup"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_machine_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`hallfx_adc_${pin}`] =
    `hallfx_adc_${pin} = ADC(Pin(${pin}))\nhallfx_adc_${pin}.atten(ADC.ATTN_11DB)`;
  return "";
};

// ─────────────────────────────────────────────────────────────
//  RAW (0–4095)
// ─────────────────────────────────────────────────────────────
forBlock["esp32_hallfx_raw"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_machine_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`hallfx_adc_${pin}`] =
    `hallfx_adc_${pin} = ADC(Pin(${pin}))\nhallfx_adc_${pin}.atten(ADC.ATTN_11DB)`;
  return [`hallfx_adc_${pin}.read()`, Order.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  FIELD STRENGTH % (0–100; ~50 ≈ no field for ratiometric sensors)
// ─────────────────────────────────────────────────────────────
forBlock["esp32_hallfx_field_percent"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_machine_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`hallfx_adc_${pin}`] =
    `hallfx_adc_${pin} = ADC(Pin(${pin}))\nhallfx_adc_${pin}.atten(ADC.ATTN_11DB)`;
  return [`int(hallfx_adc_${pin}.read() * 100 / 4095)`, Order.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  VOLTAGE (0 – 3.3 V)
// ─────────────────────────────────────────────────────────────
forBlock["esp32_hallfx_voltage"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_machine_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`hallfx_adc_${pin}`] =
    `hallfx_adc_${pin} = ADC(Pin(${pin}))\nhallfx_adc_${pin}.atten(ADC.ATTN_11DB)`;
  return [`round(hallfx_adc_${pin}.read() * 3.3 / 4095, 2)`, Order.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  IS NEAR (field strength % > threshold)
// ─────────────────────────────────────────────────────────────
forBlock["esp32_hallfx_is_near"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  const threshold = block.getFieldValue("THRESHOLD") || "70";
  generator.definitions_["import_machine_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`hallfx_adc_${pin}`] =
    `hallfx_adc_${pin} = ADC(Pin(${pin}))\nhallfx_adc_${pin}.atten(ADC.ATTN_11DB)`;
  return [`(int(hallfx_adc_${pin}.read() * 100 / 4095) > ${threshold})`, Order.RELATIONAL];
};

// ─────────────────────────────────────────────────────────────
//  WAIT UNTIL NEAR (with optional timeout, -1 = forever)
// ─────────────────────────────────────────────────────────────
forBlock["esp32_hallfx_wait_until_near"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  const threshold = block.getFieldValue("THRESHOLD") || "70";
  const timeout = block.getFieldValue("TIMEOUT");
  const toMs = Number(timeout);
  generator.definitions_["import_machine_adc"] = "from machine import Pin, ADC";
  generator.definitions_["import_time"] = "import time";
  generator.definitions_[`hallfx_adc_${pin}`] =
    `hallfx_adc_${pin} = ADC(Pin(${pin}))\nhallfx_adc_${pin}.atten(ADC.ATTN_11DB)`;
  if (!Number.isFinite(toMs) || toMs < 0) {
    return `while not (int(hallfx_adc_${pin}.read() * 100 / 4095) > ${threshold}):\n  time.sleep_ms(10)\n`;
  }
  return (
    `_hallfx_deadline = time.ticks_ms() + ${Math.max(0, Math.floor(toMs))}\n` +
    `while not (int(hallfx_adc_${pin}.read() * 100 / 4095) > ${threshold}):\n` +
    `  if time.ticks_diff(time.ticks_ms(), _hallfx_deadline) >= 0:\n    break\n  time.sleep_ms(10)\n`
  );
};

// ─────────────────────────────────────────────────────────────
//  Shared helper — low→high pulse counter on a digital Hall OUT pin
//  Used by both pulse-count and RPM blocks so the loop body is emitted
//  exactly once even if both blocks appear in the same sketch.
// ─────────────────────────────────────────────────────────────
function ensurePulseCounter(generator) {
  generator.definitions_["import_machine_pin"] = "from machine import Pin";
  generator.definitions_["import_time"] = "import time";
  generator.definitions_["def_hallfx_count"] =
`def hallfx_count_pulses(pin_no, duration_ms):
    p = Pin(pin_no, Pin.IN)
    last = p.value()
    count = 0
    end = time.ticks_ms() + duration_ms
    while time.ticks_ms() < end:
        v = p.value()
        if v == 1 and last == 0:
            count += 1
        last = v
        time.sleep_us(200)
    return count`;
}

// ─────────────────────────────────────────────────────────────
//  COUNT PULSES (digital hall OUT, given sample window ms)
// ─────────────────────────────────────────────────────────────
forBlock["esp32_hallfx_count_pulses"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  const duration = block.getFieldValue("DURATION") || "1000";
  ensurePulseCounter(generator);
  return [`hallfx_count_pulses(${pin}, ${duration})`, Order.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  RPM (tachometer) — rpm = pulses * 60000 / (duration * poles)
// ─────────────────────────────────────────────────────────────
forBlock["esp32_hallfx_rpm"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  const duration = block.getFieldValue("DURATION") || "1000";
  const poles = block.getFieldValue("POLES") || "1";
  ensurePulseCounter(generator);
  return [`int(hallfx_count_pulses(${pin}, ${duration}) * 60000 / (${duration} * ${poles}))`, Order.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  ALARM — if strength > threshold turn ON output pin, else OFF
// ─────────────────────────────────────────────────────────────
forBlock["esp32_hallfx_alarm"] = function (block, generator) {
  const sensorPin = block.getFieldValue("SENSOR_PIN");
  const threshold = block.getFieldValue("THRESHOLD") || "70";
  const outputPin = block.getFieldValue("OUTPUT_PIN");
  generator.definitions_["import_machine_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`hallfx_adc_${sensorPin}`] =
    `hallfx_adc_${sensorPin} = ADC(Pin(${sensorPin}))\nhallfx_adc_${sensorPin}.atten(ADC.ATTN_11DB)`;
  generator.definitions_[`hallfx_out_${outputPin}`] = `hallfx_out_${outputPin} = Pin(${outputPin}, Pin.OUT)`;
  return (
    `if int(hallfx_adc_${sensorPin}.read() * 100 / 4095) > ${threshold}:\n` +
    `  hallfx_out_${outputPin}.on()\n` +
    `else:\n` +
    `  hallfx_out_${outputPin}.off()\n`
  );
};

// ─────────────────────────────────────────────────────────────
//  PRINT TO SERIAL
// ─────────────────────────────────────────────────────────────
forBlock["esp32_hallfx_print_serial"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_machine_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`hallfx_adc_${pin}`] =
    `hallfx_adc_${pin} = ADC(Pin(${pin}))\nhallfx_adc_${pin}.atten(ADC.ATTN_11DB)`;
  return `print("Hall Strength:", int(hallfx_adc_${pin}.read() * 100 / 4095), "%")\n`;
};
