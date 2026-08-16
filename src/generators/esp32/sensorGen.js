// Generator - SENSOR BLOCKS (MicroPython)
import { Order } from "blockly/python";

export const forBlock = Object.create(null);

// ─────────────────────────────────────────────────────────────
//  ULTRASONIC (HC-SR04)
// ─────────────────────────────────────────────────────────────
forBlock["esp32_ultrasonic"] = function (block, generator) {
  const trig = block.getFieldValue("TRIG");
  const echo = block.getFieldValue("ECHO");

  generator.definitions_["import_machine"] = "from machine import Pin";
  generator.definitions_["import_time"] = "import time";

  generator.definitions_[`pin_trig_${trig}`] = `trig_${trig} = Pin(${trig}, Pin.OUT)`;
  generator.definitions_[`pin_echo_${echo}`] = `echo_${echo} = Pin(${echo}, Pin.IN)`;

  generator.definitions_["def_ultrasonic"] = `def ultrasonic_read_once(trig, echo):
    trig.value(0)
    time.sleep_us(5)
    trig.value(1)
    time.sleep_us(10)
    trig.value(0)
    timeout = time.ticks_us() + 30000
    while echo.value() == 0:
        if time.ticks_diff(timeout, time.ticks_us()) <= 0:
            return None
    start = time.ticks_us()
    timeout = time.ticks_us() + 30000
    while echo.value() == 1:
        if time.ticks_diff(timeout, time.ticks_us()) <= 0:
            return None
    duration = time.ticks_diff(time.ticks_us(), start)
    distance = (duration * 0.0343) / 2
    if distance < 2 or distance > 400:
        return None
    return distance

def read_ultrasonic(trig, echo):
    readings = []
    for _ in range(5):
        d = ultrasonic_read_once(trig, echo)
        if d is not None:
            readings.append(d)
        time.sleep_ms(20)
    if not readings:
        return -1
    readings.sort()
    median = readings[len(readings) // 2]
    return round(median, 2)
`;

  return [`read_ultrasonic(trig_${trig}, echo_${echo})`, Order.FUNCTION_CALL];
};

forBlock["esp32_ultrasonic_setup"] = function (block, generator) {
  const trig = block.getFieldValue("TRIG");
  const echo = block.getFieldValue("ECHO");
  generator.definitions_["import_machine"] = "from machine import Pin";
  generator.definitions_["import_time"] = "import time";
  generator.definitions_["def_ultrasonic_setup"] =
`ultrasonic_trig_pin = Pin(${trig}, Pin.OUT)
ultrasonic_echo_pin = Pin(${echo}, Pin.IN)`;
  return "";
};

forBlock["esp32_ultrasonic_get_distance"] = function (block, generator) {
  generator.definitions_["import_machine"] = "from machine import Pin";
  generator.definitions_["import_time"] = "import time";
  if (!generator.definitions_["def_ultrasonic_setup"]) {
    generator.definitions_["def_ultrasonic_setup"] =
`ultrasonic_trig_pin = Pin(12, Pin.OUT)
ultrasonic_echo_pin = Pin(13, Pin.IN)`;
  }
  generator.definitions_["def_ultrasonic_helper"] = `def ultrasonic_read_once(trig, echo):
    trig.value(0)
    time.sleep_us(5)
    trig.value(1)
    time.sleep_us(10)
    trig.value(0)
    timeout = time.ticks_us() + 30000
    while echo.value() == 0:
        if time.ticks_diff(timeout, time.ticks_us()) <= 0:
            return None
    start = time.ticks_us()
    timeout = time.ticks_us() + 30000
    while echo.value() == 1:
        if time.ticks_diff(timeout, time.ticks_us()) <= 0:
            return None
    duration = time.ticks_diff(time.ticks_us(), start)
    distance = (duration * 0.0343) / 2
    if distance < 2 or distance > 400:
        return None
    return distance

def read_ultrasonic(trig, echo):
    readings = []
    for _ in range(5):
        d = ultrasonic_read_once(trig, echo)
        if d is not None:
            readings.append(d)
        time.sleep_ms(20)
    if not readings:
        return -1
    readings.sort()
    median = readings[len(readings) // 2]
    return round(median, 2)
`;
  return [`read_ultrasonic(ultrasonic_trig_pin, ultrasonic_echo_pin)`, Order.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  DHT11 / DHT22 — respects TYPE selection
// ─────────────────────────────────────────────────────────────
forBlock["esp32_dht_setup"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  const type = block.getFieldValue("TYPE") || "DHT11";
  const dhtClass = type === "DHT22" ? "DHT22" : "DHT11";
  generator.definitions_["import_machine"] = "from machine import Pin";
  generator.definitions_["import_dht"] = "import dht";
  generator.definitions_["def_dht_setup"] = `dht_sensor = dht.${dhtClass}(Pin(${pin}))`;
  return "";
};

forBlock["esp32_dht_get_reading"] = function (block, generator) {
  const reading = block.getFieldValue("READING");
  generator.definitions_["import_machine"] = "from machine import Pin";
  generator.definitions_["import_dht"] = "import dht";
  if (!generator.definitions_["def_dht_setup"]) {
    generator.definitions_["def_dht_setup"] = `dht_sensor = dht.DHT11(Pin(15))`;
  }
  generator.definitions_["dht_reader"] = `def read_dht(sensor, reading):
    try:
        sensor.measure()
        if reading == "temperature":
            return sensor.temperature()
        return sensor.humidity()
    except Exception:
        return -1
`;
  const method = reading === "temperature" ? "temperature" : "humidity";
  return [`read_dht(dht_sensor, "${method}")`, Order.FUNCTION_CALL];
};

forBlock["esp32_dht"] = function (block, generator) {
  const reading = block.getFieldValue("READING");
  const pin = block.getFieldValue("PIN");

  generator.definitions_["import_machine"] = "from machine import Pin";
  generator.definitions_["import_dht"] = "import dht";
  generator.definitions_[`dht_${pin}`] = `dht_${pin} = dht.DHT11(Pin(${pin}))`;

  generator.definitions_["dht_reader"] = `def read_dht(sensor, reading):
    try:
        sensor.measure()
        if reading == "temperature":
            return sensor.temperature()
        return sensor.humidity()
    except Exception:
        return -1
`;

  const method = reading === "temperature" ? "temperature" : "humidity";
  return [`read_dht(dht_${pin}, "${method}")`, Order.FUNCTION_CALL];
};

forBlock["esp32_dht_serial_both"] = function (block, generator) {
  generator.definitions_["import_machine"] = "from machine import Pin";
  generator.definitions_["import_dht"] = "import dht";
  if (!generator.definitions_["def_dht_setup"]) {
    generator.definitions_["def_dht_setup"] = `dht_sensor = dht.DHT11(Pin(15))`;
  }
  generator.definitions_["dht_reader"] = `def read_dht(sensor, reading):
    try:
        sensor.measure()
        if reading == "temperature":
            return sensor.temperature()
        return sensor.humidity()
    except Exception:
        return -1
`;
  return `print("Temperature: {:.2f} C | Humidity: {:.2f} %".format(read_dht(dht_sensor, "temperature"), read_dht(dht_sensor, "humidity")))\n`;
};

// ─────────────────────────────────────────────────────────────
//  DIGITAL SENSOR (generic)
// ─────────────────────────────────────────────────────────────
forBlock["esp32_digital_sensor"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_machine"] = "from machine import Pin";
  generator.definitions_[`pin_in_${pin}`] = `pin_${pin} = Pin(${pin}, Pin.IN)`;
  return [`pin_${pin}.value()`, Order.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  ANALOG / POTENTIOMETER / LDR / RAIN
// ─────────────────────────────────────────────────────────────
forBlock["esp32_analog_sensor"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`adc_${pin}`] = `adc_${pin} = ADC(Pin(${pin}))\nadc_${pin}.atten(ADC.ATTN_11DB)\n`;
  return [`adc_${pin}.read()`, Order.FUNCTION_CALL];
};

forBlock["esp32_potentiometer"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`pot_adc_${pin}`] = `pot_${pin} = ADC(Pin(${pin}))\npot_${pin}.atten(ADC.ATTN_11DB)\n`;
  return [`pot_${pin}.read()`, Order.FUNCTION_CALL];
};

forBlock["esp32_rain_sensor"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  const mode = block.getFieldValue("MODE");
  if (mode === "DIGITAL") {
    generator.definitions_["import_pin"] = "from machine import Pin";
    generator.definitions_[`rain_digital_${pin}`] = `rain_${pin} = Pin(${pin}, Pin.IN)`;
    return [`rain_${pin}.value()`, Order.FUNCTION_CALL];
  }
  generator.definitions_["import_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`rain_adc_${pin}`] = `rain_adc_${pin} = ADC(Pin(${pin}))\nrain_adc_${pin}.atten(ADC.ATTN_11DB)\n`;
  return [`rain_adc_${pin}.read()`, Order.FUNCTION_CALL];
};

forBlock["esp32_rain_analog"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`rain_adc_${pin}`] = `rain_adc_${pin} = ADC(Pin(${pin}))\nrain_adc_${pin}.atten(ADC.ATTN_11DB)\n`;
  return [`rain_adc_${pin}.read()`, Order.FUNCTION_CALL];
};

forBlock["esp32_rain_digital"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_pin"] = "from machine import Pin";
  generator.definitions_[`rain_digital_${pin}`] = `rain_${pin} = Pin(${pin}, Pin.IN)`;
  return [`rain_${pin}.value() == 0`, Order.COMPARISON];
};

forBlock["esp32_rain_percent"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`rain_adc_${pin}`] = `rain_adc_${pin} = ADC(Pin(${pin}))\nrain_adc_${pin}.atten(ADC.ATTN_11DB)\n`;
  return [`int((4095 - rain_adc_${pin}.read()) * 100 / 4095)`, Order.FUNCTION_CALL];
};


// ─────────────────────────────────────────────────────────────
//  LIGHT SENSORS — LDR & BH1750 (MicroPython)
// ─────────────────────────────────────────────────────────────

// LDR (Raw Analog 0-4095)
forBlock["esp32_ldr_sensor"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`ldr_adc_${pin}`] = `ldr_adc_${pin} = ADC(Pin(${pin}))\nldr_adc_${pin}.atten(ADC.ATTN_11DB)\n`;
  return [`ldr_adc_${pin}.read()`, Order.FUNCTION_CALL];
};

// LDR (Percentage 0-100%)
forBlock["esp32_ldr_percent"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`ldr_adc_${pin}`] = `ldr_adc_${pin} = ADC(Pin(${pin}))\nldr_adc_${pin}.atten(ADC.ATTN_11DB)\n`;
  return [`int(ldr_adc_${pin}.read() * 100 / 4095)`, Order.MULTIPLICATIVE];
};

// LDR (Digital Output)
forBlock["esp32_ldr_digital"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_pin"] = "from machine import Pin";
  generator.definitions_[`ldr_dig_${pin}`] = `ldr_dig_${pin} = Pin(${pin}, Pin.IN)`;
  return [`ldr_dig_${pin}.value() == 0`, Order.COMPARISON];
};

// LDR (Dark Check)
forBlock["esp32_ldr_is_dark"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  const threshold = block.getFieldValue("THRESHOLD") || "1500";
  generator.definitions_["import_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`ldr_adc_${pin}`] = `ldr_adc_${pin} = ADC(Pin(${pin}))\nldr_adc_${pin}.atten(ADC.ATTN_11DB)\n`;
  return [`(ldr_adc_${pin}.read() < ${threshold})`, Order.RELATIONAL];
};

// LDR Print to Serial
forBlock["esp32_ldr_print_serial"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`ldr_adc_${pin}`] = `ldr_adc_${pin} = ADC(Pin(${pin}))\nldr_adc_${pin}.atten(ADC.ATTN_11DB)\n`;
  return `print("LDR Light:", ldr_adc_${pin}.read())\n`;
};

// ── BH1750 I2C Ambient Light Sensor (MicroPython) ──
forBlock["esp32_bh1750_setup"] = function (block, generator) {
  const sda = block.getFieldValue("SDA");
  const scl = block.getFieldValue("SCL");
  const addr = block.getFieldValue("ADDR") || "0x23";

  generator.definitions_["import_i2c"] = "from machine import Pin, I2C";
  generator.definitions_["import_time"] = "import time";
  generator.definitions_["bh1750_helper"] = `
def _bh1750_read_lux(i2c, addr=${addr}):
    try:
        data = i2c.readfrom(addr, 2)
        return round(((data[0] << 8) | data[1]) / 1.2, 1)
    except Exception:
        return 0.0
`;
  generator.definitions_["bh1750_init"] = `
_i2c_bh1750 = I2C(0, scl=Pin(${scl}), sda=Pin(${sda}), freq=400000)
try:
    _i2c_bh1750.writeto(${addr}, bytes([0x10]))  # Continuous H-Resolution Mode
except Exception as e:
    print("BH1750 init error:", e)
`;
  return "";
};

forBlock["esp32_bh1750_read_lux"] = function (block, generator) {
  generator.definitions_["import_i2c"] = "from machine import Pin, I2C";
  if (!generator.definitions_["bh1750_helper"]) {
    generator.definitions_["bh1750_helper"] = `
def _bh1750_read_lux(i2c, addr=0x23):
    try:
        data = i2c.readfrom(addr, 2)
        return round(((data[0] << 8) | data[1]) / 1.2, 1)
    except Exception:
        return 0.0
`;
  }
  return ["_bh1750_read_lux(_i2c_bh1750)", Order.FUNCTION_CALL];
};

forBlock["esp32_bh1750_is_light"] = function (block, generator) {
  const threshold = block.getFieldValue("THRESHOLD") || "300";
  generator.definitions_["import_i2c"] = "from machine import Pin, I2C";
  if (!generator.definitions_["bh1750_helper"]) {
    generator.definitions_["bh1750_helper"] = `
def _bh1750_read_lux(i2c, addr=0x23):
    try:
        data = i2c.readfrom(addr, 2)
        return round(((data[0] << 8) | data[1]) / 1.2, 1)
    except Exception:
        return 0.0
`;
  }
  return [`(_bh1750_read_lux(_i2c_bh1750) > ${threshold})`, Order.RELATIONAL];
};

forBlock["esp32_bh1750_print_serial"] = function (block, generator) {
  generator.definitions_["import_i2c"] = "from machine import Pin, I2C";
  if (!generator.definitions_["bh1750_helper"]) {
    generator.definitions_["bh1750_helper"] = `
def _bh1750_read_lux(i2c, addr=0x23):
    try:
        data = i2c.readfrom(addr, 2)
        return round(((data[0] << 8) | data[1]) / 1.2, 1)
    except Exception:
        return 0.0
`;
  }
  return `print("BH1750 Lux:", _bh1750_read_lux(_i2c_bh1750))\n`;
};

// ─────────────────────────────────────────────────────────────
//  IR OBSTACLE SENSOR — active LOW (LOW = obstacle detected)
// ─────────────────────────────────────────────────────────────
forBlock["esp32_ir_sensor"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_pin"] = "from machine import Pin";
  generator.definitions_[`ir_${pin}`] = `ir_${pin} = Pin(${pin}, Pin.IN)`;
  return [`ir_${pin}.value() == 0`, Order.COMPARISON];
};

// ── IR Analog — raw ADC value (0-4095) ────────────────────────
forBlock["esp32_ir_sensor_analog"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_machine"] = "from machine import ADC, Pin";
  generator.definitions_[`ir_adc_${pin}`] = `_ir_adc_${pin} = ADC(Pin(${pin}))\n_ir_adc_${pin}.atten(ADC.ATTN_11DB)`;
  return [`_ir_adc_${pin}.read()`, Order.FUNCTION_CALL];
};

// ── IR Analog — proximity as 0-100% ───────────────────────────
forBlock["esp32_ir_sensor_analog_percent"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_machine"] = "from machine import ADC, Pin";
  generator.definitions_[`ir_adc_${pin}`] = `_ir_adc_${pin} = ADC(Pin(${pin}))\n_ir_adc_${pin}.atten(ADC.ATTN_11DB)`;
  // ADC reads lower when object is CLOSE; invert so 100% = very close
  return [`int((4095 - _ir_adc_${pin}.read()) * 100 / 4095)`, Order.FUNCTION_CALL];
};

// ── IR Line Sensor — analog value for line following ──────────
forBlock["esp32_ir_line_analog"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_machine"] = "from machine import ADC, Pin";
  generator.definitions_[`ir_line_adc_${pin}`] = `_ir_line_${pin} = ADC(Pin(${pin}))\n_ir_line_${pin}.atten(ADC.ATTN_11DB)`;
  return [`_ir_line_${pin}.read()`, Order.FUNCTION_CALL];
};

// ── IR Line Sensor — black line detected (threshold) ──────────
forBlock["esp32_ir_line_detected"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  const threshold = block.getFieldValue("THRESHOLD") || "2000";
  generator.definitions_["import_machine"] = "from machine import ADC, Pin";
  generator.definitions_[`ir_line_adc_${pin}`] = `_ir_line_${pin} = ADC(Pin(${pin}))\n_ir_line_${pin}.atten(ADC.ATTN_11DB)`;
  return [`(_ir_line_${pin}.read() > ${threshold})`, Order.COMPARISON];
};

// ─────────────────────────────────────────────────────────────
//  PIR MOTION SENSOR
// ─────────────────────────────────────────────────────────────
forBlock["esp32_pir_sensor"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_pin"] = "from machine import Pin";
  generator.definitions_["import_time"] = "import time";
  generator.definitions_[`pir_${pin}`] = `pir_${pin} = Pin(${pin}, Pin.IN, Pin.PULL_DOWN)`;
  generator.definitions_["pir_reader"] = `def read_pir(sensor):
    detections = 0
    for _ in range(5):
        if sensor.value():
            detections += 1
        time.sleep_ms(20)
    return 1 if detections >= 3 else 0
`;
  return [`read_pir(pir_${pin})`, Order.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  TOUCH SENSOR (TTP223) — no library needed
// ─────────────────────────────────────────────────────────────
forBlock["esp32_touch_sensor"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_pin"] = "from machine import Pin";
  generator.definitions_[`touch_${pin}`] = `touch_${pin} = Pin(${pin}, Pin.IN)`;
  return [`touch_${pin}.value() == 1`, Order.COMPARISON];
};

// ─────────────────────────────────────────────────────────────
//  VIBRATION SENSOR (SW-420) — no library needed
// ─────────────────────────────────────────────────────────────
forBlock["esp32_vibration_sensor"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_pin"] = "from machine import Pin";
  generator.definitions_[`vib_${pin}`] = `vib_${pin} = Pin(${pin}, Pin.IN)`;
  return [`vib_${pin}.value() == 1`, Order.COMPARISON];
};

// ─────────────────────────────────────────────────────────────
//  FLAME SENSOR — no library needed
// ─────────────────────────────────────────────────────────────
forBlock["esp32_flame_digital"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_pin"] = "from machine import Pin";
  generator.definitions_[`flame_${pin}`] = `flame_${pin} = Pin(${pin}, Pin.IN)`;
  return [`flame_${pin}.value() == 0`, Order.COMPARISON];
};

forBlock["esp32_flame_analog"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`flame_adc_${pin}`] = `flame_adc_${pin} = ADC(Pin(${pin}))\nflame_adc_${pin}.atten(ADC.ATTN_11DB)\n`;
  return [`flame_adc_${pin}.read()`, Order.FUNCTION_CALL];
};

forBlock["esp32_flame_percent"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`flame_adc_${pin}`] = `flame_adc_${pin} = ADC(Pin(${pin}))\nflame_adc_${pin}.atten(ADC.ATTN_11DB)\n`;
  return [`int((4095 - flame_adc_${pin}.read()) * 100 / 4095)`, Order.FUNCTION_CALL];
};

forBlock["esp32_flame_alarm"] = function (block, generator) {
  const sensorPin = block.getFieldValue("SENSOR_PIN");
  const threshold = block.getFieldValue("THRESHOLD") || "30";
  const outputPin = block.getFieldValue("OUTPUT_PIN");
  generator.definitions_["import_pin_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`flame_adc_${sensorPin}`] = `flame_adc_${sensorPin} = ADC(Pin(${sensorPin}))\nflame_adc_${sensorPin}.atten(ADC.ATTN_11DB)\n`;
  generator.definitions_[`out_pin_${outputPin}`] = `out_${outputPin} = Pin(${outputPin}, Pin.OUT)`;
  return `if int((4095 - flame_adc_${sensorPin}.read()) * 100 / 4095) > ${threshold}:\n  out_${outputPin}.value(1)\nelse:\n  out_${outputPin}.value(0)\n`;
};

// ─────────────────────────────────────────────────────────────
//  MQ-2 GAS SENSOR — no library needed
// ─────────────────────────────────────────────────────────────
forBlock["esp32_gas_sensor_analog"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`gas_adc_${pin}`] = `gas_adc_${pin} = ADC(Pin(${pin}))\ngas_adc_${pin}.atten(ADC.ATTN_11DB)\n`;
  return [`gas_adc_${pin}.read()`, Order.FUNCTION_CALL];
};

forBlock["esp32_gas_sensor_digital"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_pin"] = "from machine import Pin";
  generator.definitions_[`gas_${pin}`] = `gas_${pin} = Pin(${pin}, Pin.IN)`;
  return [`gas_${pin}.value() == 0`, Order.COMPARISON];
};

forBlock["esp32_gas_sensor_percent"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`gas_adc_${pin}`] = `gas_adc_${pin} = ADC(Pin(${pin}))\ngas_adc_${pin}.atten(ADC.ATTN_11DB)\n`;
  return [`int(gas_adc_${pin}.read() * 100 / 4095)`, Order.FUNCTION_CALL];
};

forBlock["esp32_gas_alarm"] = function (block, generator) {
  const sensorPin = block.getFieldValue("SENSOR_PIN");
  const threshold = block.getFieldValue("THRESHOLD") || "50";
  const outputPin = block.getFieldValue("OUTPUT_PIN");
  generator.definitions_["import_pin_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`gas_adc_${sensorPin}`] = `gas_adc_${sensorPin} = ADC(Pin(${sensorPin}))\ngas_adc_${sensorPin}.atten(ADC.ATTN_11DB)\n`;
  generator.definitions_[`out_pin_${outputPin}`] = `out_${outputPin} = Pin(${outputPin}, Pin.OUT)`;
  return `if int(gas_adc_${sensorPin}.read() * 100 / 4095) > ${threshold}:\n  out_${outputPin}.value(1)\nelse:\n  out_${outputPin}.value(0)\n`;
};

// ─────────────────────────────────────────────────────────────
//  SOIL MOISTURE — no library needed
// ─────────────────────────────────────────────────────────────
forBlock["esp32_soil_moisture_analog"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`soil_adc_${pin}`] = `soil_adc_${pin} = ADC(Pin(${pin}))\nsoil_adc_${pin}.atten(ADC.ATTN_11DB)\n`;
  return [`soil_adc_${pin}.read()`, Order.FUNCTION_CALL];
};

forBlock["esp32_soil_moisture_digital"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_pin"] = "from machine import Pin";
  generator.definitions_[`soil_${pin}`] = `soil_${pin} = Pin(${pin}, Pin.IN)`;
  return [`soil_${pin}.value() == 1`, Order.COMPARISON];
};

// ─────────────────────────────────────────────────────────────
//  WATER LEVEL SENSOR — no library needed
// ─────────────────────────────────────────────────────────────
forBlock["esp32_water_level_analog"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`water_adc_${pin}`] = `water_adc_${pin} = ADC(Pin(${pin}))\nwater_adc_${pin}.atten(ADC.ATTN_11DB)\n`;
  return [`water_adc_${pin}.read()`, Order.FUNCTION_CALL];
};

forBlock["esp32_water_level_digital"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_pin"] = "from machine import Pin";
  generator.definitions_[`water_${pin}`] = `water_${pin} = Pin(${pin}, Pin.IN)`;
  return [`water_${pin}.value() == 0`, Order.COMPARISON];
};

// ─────────────────────────────────────────────────────────────
//  SOUND / MICROPHONE — no library needed
// ─────────────────────────────────────────────────────────────
forBlock["esp32_sound_sensor_analog"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`sound_adc_${pin}`] = `sound_adc_${pin} = ADC(Pin(${pin}))\nsound_adc_${pin}.atten(ADC.ATTN_11DB)\n`;
  return [`sound_adc_${pin}.read()`, Order.FUNCTION_CALL];
};

forBlock["esp32_sound_sensor_digital"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_pin"] = "from machine import Pin";
  generator.definitions_[`sound_${pin}`] = `sound_${pin} = Pin(${pin}, Pin.IN)`;
  return [`sound_${pin}.value() == 1`, Order.COMPARISON];
};

forBlock["esp32_sound_sensor_percent"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import Pin, ADC";
  generator.definitions_[`sound_adc_${pin}`] = `sound_adc_${pin} = ADC(Pin(${pin}))\nsound_adc_${pin}.atten(ADC.ATTN_11DB)\n`;
  return [`int(sound_adc_${pin}.read() * 100 / 4095)`, Order.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  HALL SENSOR MODULE
// ─────────────────────────────────────────────────────────────
forBlock["esp32_hall_module_value"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_pin"] = "from machine import Pin";
  generator.definitions_[`hall_${pin}`] = `hall_${pin} = Pin(${pin}, Pin.IN)`;
  return [`hall_${pin}.value()`, Order.FUNCTION_CALL];
};

forBlock["esp32_hall_module_detected"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_pin"] = "from machine import Pin";
  generator.definitions_[`hall_${pin}`] = `hall_${pin} = Pin(${pin}, Pin.IN)`;
  return [`hall_${pin}.value() == 0`, Order.COMPARISON];
};

forBlock["esp32_hall_module_wait"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_pin"] = "from machine import Pin";
  generator.definitions_["import_time"] = "import time";
  generator.definitions_[`hall_${pin}`] = `hall_${pin} = Pin(${pin}, Pin.IN)`;
  return `while hall_${pin}.value() == 1:\n  time.sleep_ms(10)\n`;
};

// ─────────────────────────────────────────────────────────────
//  DS18B20 — Libraries: onewire + ds18x20
// ─────────────────────────────────────────────────────────────
forBlock["esp32_ds18b20_setup"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_onewire"] = "from onewire import OneWire";
  generator.definitions_["import_ds18x20"] = "import ds18x20";
  generator.definitions_["import_time"] = "import time";
  generator.definitions_["def_ds18b20_setup"] =
`ds_pin = OneWire(Pin(${pin}))
ds_sensor = ds18x20.DS18X20(ds_pin)
ds_roms = ds_sensor.scan()`;
  return "";
};

forBlock["esp32_ds18b20_get_temp"] = function (block, generator) {
  generator.definitions_["import_onewire"] = "from onewire import OneWire";
  generator.definitions_["import_ds18x20"] = "import ds18x20";
  generator.definitions_["import_time"] = "import time";
  if (!generator.definitions_["def_ds18b20_setup"]) {
    generator.definitions_["def_ds18b20_setup"] =
`ds_pin = OneWire(Pin(4))
ds_sensor = ds18x20.DS18X20(ds_pin)
ds_roms = ds_sensor.scan()`;
  }
  generator.definitions_["def_ds18b20_read"] = `def getDS18B20TempC():
    try:
        ds_sensor.convert_temp()
        time.sleep_ms(750)
        for rom in ds_roms:
            return ds_sensor.read_temp(rom)
        return -1
    except Exception:
        return -1
`;
  return [`getDS18B20TempC()`, Order.FUNCTION_CALL];
};

forBlock["esp32_ds18b20_get_temp_f"] = function (block, generator) {
  generator.definitions_["import_onewire"] = "from onewire import OneWire";
  generator.definitions_["import_ds18x20"] = "import ds18x20";
  generator.definitions_["import_time"] = "import time";
  if (!generator.definitions_["def_ds18b20_setup"]) {
    generator.definitions_["def_ds18b20_setup"] =
`ds_pin = OneWire(Pin(4))
ds_sensor = ds18x20.DS18X20(ds_pin)
ds_roms = ds_sensor.scan()`;
  }
  generator.definitions_["def_ds18b20_read_f"] = `def getDS18B20TempF():
    try:
        ds_sensor.convert_temp()
        time.sleep_ms(750)
        for rom in ds_roms:
            c = ds_sensor.read_temp(rom)
            return c * 9 / 5 + 32
        return -1
    except Exception:
        return -1
`;
  return [`getDS18B20TempF()`, Order.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  BMP280 — Library: adafruit_micropython_bmp280
// ─────────────────────────────────────────────────────────────
forBlock["esp32_bmp280_setup"] = function (block, generator) {
  const sda = block.getFieldValue("SDA");
  const scl = block.getFieldValue("SCL");
  generator.definitions_["import_machine"] = "from machine import Pin, I2C";
  generator.definitions_["import_bmp280"] = "from bmp280 import BMP280";
  generator.definitions_["def_bmp280_setup"] =
`i2c_bmp = I2C(0, sda=Pin(${sda}), scl=Pin(${scl}), freq=400000)
bmp280 = BMP280(i2c_bmp)
bmp280Available = True`;
  return "";
};

forBlock["esp32_bmp280_temperature"] = function (block, generator) {
  generator.definitions_["import_machine"] = "from machine import Pin, I2C";
  generator.definitions_["import_bmp280"] = "from bmp280 import BMP280";
  if (!generator.definitions_["def_bmp280_setup"]) {
    generator.definitions_["def_bmp280_setup"] =
`i2c_bmp = I2C(0, sda=Pin(21), scl=Pin(22), freq=400000)
bmp280 = BMP280(i2c_bmp)
bmp280Available = True`;
  }
  generator.definitions_["def_bmp280_temp"] = `def getBMP280Temperature():
    try:
        return bmp280.temperature
    except Exception:
        return -1
`;
  return [`getBMP280Temperature()`, Order.FUNCTION_CALL];
};

forBlock["esp32_bmp280_pressure"] = function (block, generator) {
  generator.definitions_["import_machine"] = "from machine import Pin, I2C";
  generator.definitions_["import_bmp280"] = "from bmp280 import BMP280";
  if (!generator.definitions_["def_bmp280_setup"]) {
    generator.definitions_["def_bmp280_setup"] =
`i2c_bmp = I2C(0, sda=Pin(21), scl=Pin(22), freq=400000)
bmp280 = BMP280(i2c_bmp)
bmp280Available = True`;
  }
  generator.definitions_["def_bmp280_press"] = `def getBMP280Pressure():
    try:
        return bmp280.pressure
    except Exception:
        return -1
`;
  return [`getBMP280Pressure()`, Order.FUNCTION_CALL];
};

forBlock["esp32_bmp280_altitude"] = function (block, generator) {
  const seaLevel = block.getFieldValue("SEALEVEL");
  generator.definitions_["import_machine"] = "from machine import Pin, I2C";
  generator.definitions_["import_bmp280"] = "from bmp280 import BMP280";
  if (!generator.definitions_["def_bmp280_setup"]) {
    generator.definitions_["def_bmp280_setup"] =
`i2c_bmp = I2C(0, sda=Pin(21), scl=Pin(22), freq=400000)
bmp280 = BMP280(i2c_bmp)
bmp280Available = True`;
  }
  generator.definitions_["def_bmp280_alt"] =
`def getBMP280Altitude():
    try:
        p = bmp280.pressure
        return 44330 * (1.0 - (p / 100 / ${seaLevel}) ** 0.1903)
    except Exception:
        return -1
`;
  return [`getBMP280Altitude()`, Order.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  RFID (MFRC522) — Library: mfrc522
// ─────────────────────────────────────────────────────────────
forBlock["esp32_rfid_setup"] = function (block, generator) {
  const ss = block.getFieldValue("SS");
  const rst = block.getFieldValue("RST");
  generator.definitions_["import_mfrc522"] = "from mfrc522 import MFRC522";
  generator.definitions_["def_rfid_setup"] =
`rfid_reader = MFRC522(spi_id=0, sck=Pin(18), miso=Pin(19), mosi=Pin(23), cs=Pin(${ss}), rst=Pin(${rst}))`;
  return "";
};

forBlock["esp32_rfid_card_present"] = function (block, generator) {
  generator.definitions_["import_mfrc522"] = "from mfrc522 import MFRC522";
  if (!generator.definitions_["def_rfid_setup"]) {
    generator.definitions_["def_rfid_setup"] =
`rfid_reader = MFRC522(spi_id=0, sck=Pin(18), miso=Pin(19), mosi=Pin(23), cs=Pin(5), rst=Pin(22))`;
  }
  generator.definitions_["def_rfid_present"] = `def rfidCardPresent():
    try:
        stat, tag_type = rfid_reader.request(rfid_reader.REQALL)
        return stat == rfid_reader.OK
    except Exception:
        return False
`;
  return [`rfidCardPresent()`, Order.FUNCTION_CALL];
};

forBlock["esp32_rfid_read_uid"] = function (block, generator) {
  generator.definitions_["import_mfrc522"] = "from mfrc522 import MFRC522";
  if (!generator.definitions_["def_rfid_setup"]) {
    generator.definitions_["def_rfid_setup"] =
`rfid_reader = MFRC522(spi_id=0, sck=Pin(18), miso=Pin(19), mosi=Pin(23), cs=Pin(5), rst=Pin(22))`;
  }
  generator.definitions_["def_rfid_uid"] = `def getRFIDUID():
    try:
        stat, tag_type = rfid_reader.request(rfid_reader.REQALL)
        if stat != rfid_reader.OK:
            return ""
        stat, uid = rfid_reader.anticoll()
        if stat != rfid_reader.OK:
            return ""
        # Space-separated uppercase hex — matches the Arduino getRFIDUID() format
        return " ".join("{:02X}".format(b) for b in uid)
    except Exception:
        return ""
`;
  return [`getRFIDUID()`, Order.FUNCTION_CALL];
};

forBlock["esp32_rfid_uid_match"] = function (block, generator) {
  const uidRaw = block.getFieldValue("UID") || "";
  // Normalize to space-separated uppercase hex (e.g. "A1 B2 C3 D4") so the
  // comparison matches the canonical UID format returned by getRFIDUID().
  const uidNorm = uidRaw.trim().toUpperCase().replace(/\s+/g, " ");
  generator.definitions_["import_mfrc522"] = "from mfrc522 import MFRC522";
  if (!generator.definitions_["def_rfid_setup"]) {
    generator.definitions_["def_rfid_setup"] =
`rfid_reader = MFRC522(spi_id=0, sck=Pin(18), miso=Pin(19), mosi=Pin(23), cs=Pin(5), rst=Pin(22))`;
  }
  generator.definitions_["def_rfid_uid"] = `def getRFIDUID():
    try:
        stat, tag_type = rfid_reader.request(rfid_reader.REQALL)
        if stat != rfid_reader.OK:
            return ""
        stat, uid = rfid_reader.anticoll()
        if stat != rfid_reader.OK:
            return ""
        # Space-separated uppercase hex — matches the Arduino getRFIDUID() format
        return " ".join("{:02X}".format(b) for b in uid)
    except Exception:
        return ""
`;
  return [`getRFIDUID() == "${uidNorm}"`, Order.COMPARISON];
};

// ─────────────────────────────────────────────────────────────
//  IR REMOTE RECEIVER — Library: ir_rx
// ─────────────────────────────────────────────────────────────
forBlock["esp32_ir_receiver_setup"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  // ir_rx exposes protocol classes (NEC_8) under the protocol submodules, e.g. ir_rx.nec
  generator.definitions_["import_machine"] = "from machine import Pin";
  generator.definitions_["import_ir_rx"] = "from ir_rx.nec import NEC_8 as IR_RX";
  generator.definitions_["import_time"] = "import time";
  generator.definitions_["def_ir_setup"] =
`ir_last_code = 0

def ir_callback(data):
    global ir_last_code
    ir_last_code = data

ir_receiver = IR_RX(${pin}, ir_callback)`;
  return "";
};

forBlock["esp32_ir_receiver_available"] = function (block, generator) {
  generator.definitions_["import_machine"] = "from machine import Pin";
  generator.definitions_["import_ir_rx"] = "from ir_rx.nec import NEC_8 as IR_RX";
  generator.definitions_["import_time"] = "import time";
  if (!generator.definitions_["def_ir_setup"]) {
    generator.definitions_["def_ir_setup"] =
`ir_last_code = 0

def ir_callback(data):
    global ir_last_code
    ir_last_code = data

ir_receiver = IR_RX(15, ir_callback)`;
  }
  generator.definitions_["def_ir_available"] = `def irAvailable():
    global ir_last_code
    if ir_last_code != 0:
        return True
    return False
`;
  return [`irAvailable()`, Order.FUNCTION_CALL];
};

forBlock["esp32_ir_receiver_read"] = function (block, generator) {
  generator.definitions_["import_machine"] = "from machine import Pin";
  generator.definitions_["import_ir_rx"] = "from ir_rx.nec import NEC_8 as IR_RX";
  generator.definitions_["import_time"] = "import time";
  if (!generator.definitions_["def_ir_setup"]) {
    generator.definitions_["def_ir_setup"] =
`ir_last_code = 0

def ir_callback(data):
    global ir_last_code
    ir_last_code = data

ir_receiver = IR_RX(15, ir_callback)`;
  }
  generator.definitions_["def_ir_read"] = `def irReadCode():
    global ir_last_code
    code = ir_last_code
    ir_last_code = 0
    return code
`;
  return [`irReadCode()`, Order.FUNCTION_CALL];
};

forBlock["esp32_ir_receiver_resume"] = function (block, generator) {
  generator.definitions_["import_machine"] = "from machine import Pin";
  generator.definitions_["import_ir_rx"] = "from ir_rx.nec import NEC_8 as IR_RX";
  return "";
};

// ─────────────────────────────────────────────────────────────
//  IR REMOTE SENDER — Library: ir_tx
// ─────────────────────────────────────────────────────────────
forBlock["esp32_ir_sender_setup"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_machine"] = "from machine import Pin";
  // ir_tx exposes protocol classes under protocol submodules, e.g. ir_tx.nec
  generator.definitions_["import_ir_tx"] = "from ir_tx.nec import NEC_8 as IR_TX";
  generator.definitions_["def_ir_sender"] = `ir_sender = IR_TX(${pin})`;
  return "";
};

forBlock["esp32_ir_send"] = function (block, generator) {
  const addr = block.getFieldValue("ADDR") || "0";
  const cmd = block.getFieldValue("CMD") || "0";
  generator.definitions_["import_machine"] = "from machine import Pin";
  generator.definitions_["import_ir_tx"] = "from ir_tx.nec import NEC_8 as IR_TX";
  if (!generator.definitions_["def_ir_sender"]) {
    generator.definitions_["def_ir_sender"] = `ir_sender = IR_TX(4)`;
  }
  return `ir_sender.transmit(${addr}, ${cmd})\n`;
};

// ─────────────────────────────────────────────────────────────
//  GENERALIZED WATER LEVEL SENSOR — MicroPython
// ─────────────────────────────────────────────────────────────
forBlock["esp32_water_setup"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import ADC, Pin";
  generator.definitions_[`water_adc_${pin}`] =
    `water_adc_${pin} = ADC(Pin(${pin}))\nwater_adc_${pin}.atten(ADC.ATTN_11DB)`;
  return "";
};

forBlock["esp32_water_read_level"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import ADC, Pin";
  generator.definitions_[`water_adc_${pin}`] =
    `water_adc_${pin} = ADC(Pin(${pin}))\nwater_adc_${pin}.atten(ADC.ATTN_11DB)`;
  // Map 0-4095 to 0-100
  return [`int(water_adc_${pin}.read() * 100 / 4095)`, Order.FUNCTION_CALL];
};

forBlock["esp32_water_is_above"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  const threshold = block.getFieldValue("THRESHOLD");
  generator.definitions_["import_adc"] = "from machine import ADC, Pin";
  generator.definitions_[`water_adc_${pin}`] =
    `water_adc_${pin} = ADC(Pin(${pin}))\nwater_adc_${pin}.atten(ADC.ATTN_11DB)`;
  return [`(int(water_adc_${pin}.read() * 100 / 4095) > ${threshold})`, Order.RELATIONAL];
};

forBlock["esp32_water_print_serial"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import ADC, Pin";
  generator.definitions_[`water_adc_${pin}`] =
    `water_adc_${pin} = ADC(Pin(${pin}))\nwater_adc_${pin}.atten(ADC.ATTN_11DB)`;
  return `_water_pct_${pin} = int(water_adc_${pin}.read() * 100 / 4095)\nprint("Water Level: " + str(_water_pct_${pin}) + "%")\n`;
};

forBlock["esp32_water_alert"] = function (block, generator) {
  const sensorPin = block.getFieldValue("SENSOR_PIN");
  const threshold  = block.getFieldValue("THRESHOLD");
  const outputPin  = block.getFieldValue("OUTPUT_PIN");
  generator.definitions_["import_adc"] = "from machine import ADC, Pin";
  generator.definitions_[`water_adc_${sensorPin}`] =
    `water_adc_${sensorPin} = ADC(Pin(${sensorPin}))\nwater_adc_${sensorPin}.atten(ADC.ATTN_11DB)`;
  generator.definitions_[`water_out_${outputPin}`] = `water_out_${outputPin} = Pin(${outputPin}, Pin.OUT)`;
  return `if int(water_adc_${sensorPin}.read() * 100 / 4095) > ${threshold}:\n  water_out_${outputPin}.on()\nelse:\n  water_out_${outputPin}.off()\n`;
};

// ─────────────────────────────────────────────────────────────
//  GENERALIZED SOIL MOISTURE SENSOR — MicroPython
// ─────────────────────────────────────────────────────────────
forBlock["esp32_soil_setup"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import ADC, Pin";
  generator.definitions_[`soil_adc_${pin}`] =
    `soil_adc_${pin} = ADC(Pin(${pin}))\nsoil_adc_${pin}.atten(ADC.ATTN_11DB)`;
  return "";
};

forBlock["esp32_soil_read_moisture"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import ADC, Pin";
  generator.definitions_[`soil_adc_${pin}`] =
    `soil_adc_${pin} = ADC(Pin(${pin}))\nsoil_adc_${pin}.atten(ADC.ATTN_11DB)`;
  // Invert: dry = high raw, wet = low raw → moisture% = 100 - (raw*100/4095)
  return [`(100 - int(soil_adc_${pin}.read() * 100 / 4095))`, Order.FUNCTION_CALL];
};

forBlock["esp32_soil_is_dry"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  const threshold = block.getFieldValue("THRESHOLD");
  generator.definitions_["import_adc"] = "from machine import ADC, Pin";
  generator.definitions_[`soil_adc_${pin}`] =
    `soil_adc_${pin} = ADC(Pin(${pin}))\nsoil_adc_${pin}.atten(ADC.ATTN_11DB)`;
  return [`((100 - int(soil_adc_${pin}.read() * 100 / 4095)) < ${threshold})`, Order.RELATIONAL];
};

forBlock["esp32_soil_print_serial"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import ADC, Pin";
  generator.definitions_[`soil_adc_${pin}`] =
    `soil_adc_${pin} = ADC(Pin(${pin}))\nsoil_adc_${pin}.atten(ADC.ATTN_11DB)`;
  return `_soil_pct_${pin} = 100 - int(soil_adc_${pin}.read() * 100 / 4095)\nprint("Soil Moisture: " + str(_soil_pct_${pin}) + "%")\n`;
};

forBlock["esp32_soil_watering_alert"] = function (block, generator) {
  const sensorPin = block.getFieldValue("SENSOR_PIN");
  const threshold  = block.getFieldValue("THRESHOLD");
  const outputPin  = block.getFieldValue("OUTPUT_PIN");
  generator.definitions_["import_adc"] = "from machine import ADC, Pin";
  generator.definitions_[`soil_adc_${sensorPin}`] =
    `soil_adc_${sensorPin} = ADC(Pin(${sensorPin}))\nsoil_adc_${sensorPin}.atten(ADC.ATTN_11DB)`;
  generator.definitions_[`soil_out_${outputPin}`] = `soil_out_${outputPin} = Pin(${outputPin}, Pin.OUT)`;
  return `if (100 - int(soil_adc_${sensorPin}.read() * 100 / 4095)) < ${threshold}:\n  soil_out_${outputPin}.on()  # Turn ON pump/relay\nelse:\n  soil_out_${outputPin}.off()  # Turn OFF pump/relay\n`;
};

// ─────────────────────────────────────────────────────────────
//  SOUND SENSOR — MicroPython
// ─────────────────────────────────────────────────────────────
forBlock["esp32_sound_setup"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  if (pin) {
    generator.definitions_["import_adc"] = "from machine import ADC, Pin";
    generator.definitions_[`sound_adc_${pin}`] =
      `sound_adc_${pin} = ADC(Pin(${pin}))\nsound_adc_${pin}.atten(ADC.ATTN_11DB)`;
  }
  return "";
};

forBlock["esp32_sound_detected"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_pin"] = "from machine import Pin";
  generator.definitions_[`sound_dig_${pin}`] = `sound_dig_${pin} = Pin(${pin}, Pin.IN)`;
  return [`sound_dig_${pin}.value() == 1`, Order.COMPARISON];
};

forBlock["esp32_sound_read_volume"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import ADC, Pin";
  generator.definitions_[`sound_adc_${pin}`] =
    `sound_adc_${pin} = ADC(Pin(${pin}))\nsound_adc_${pin}.atten(ADC.ATTN_11DB)`;
  return [`int(sound_adc_${pin}.read() * 100 / 4095)`, Order.FUNCTION_CALL];
};

forBlock["esp32_sound_is_loud"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  const threshold = block.getFieldValue("THRESHOLD") || "50";
  generator.definitions_["import_adc"] = "from machine import ADC, Pin";
  generator.definitions_[`sound_adc_${pin}`] =
    `sound_adc_${pin} = ADC(Pin(${pin}))\nsound_adc_${pin}.atten(ADC.ATTN_11DB)`;
  return [`(int(sound_adc_${pin}.read() * 100 / 4095) > ${threshold})`, Order.RELATIONAL];
};

forBlock["esp32_sound_detected_digital"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_pin"] = "from machine import Pin";
  generator.definitions_[`sound_dig_${pin}`] = `sound_dig_${pin} = Pin(${pin}, Pin.IN)`;
  return [`sound_dig_${pin}.value() == 1`, Order.COMPARISON];
};

forBlock["esp32_sound_print_serial"] = function (block, generator) {
  const pin = block.getFieldValue("PIN");
  generator.definitions_["import_adc"] = "from machine import ADC, Pin";
  generator.definitions_[`sound_adc_${pin}`] =
    `sound_adc_${pin} = ADC(Pin(${pin}))\nsound_adc_${pin}.atten(ADC.ATTN_11DB)`;
  return `_sound_vol_${pin} = int(sound_adc_${pin}.read() * 100 / 4095)\nprint("Sound Level: " + str(_sound_vol_${pin}) + "%")\n`;
};

forBlock["esp32_sound_trigger_output"] = function (block, generator) {
  const sensorPin = block.getFieldValue("SENSOR_PIN");
  const threshold  = block.getFieldValue("THRESHOLD") || "60";
  const outputPin  = block.getFieldValue("OUTPUT_PIN");
  const duration   = block.getFieldValue("DURATION") || "500";
  generator.definitions_["import_adc"] = "from machine import ADC, Pin";
  generator.definitions_["import_time"] = "import time";
  generator.definitions_[`sound_adc_${sensorPin}`] =
    `sound_adc_${sensorPin} = ADC(Pin(${sensorPin}))\nsound_adc_${sensorPin}.atten(ADC.ATTN_11DB)`;
  generator.definitions_[`sound_out_${outputPin}`] = `sound_out_${outputPin} = Pin(${outputPin}, Pin.OUT)`;
  return `if int(sound_adc_${sensorPin}.read() * 100 / 4095) > ${threshold}:\n  sound_out_${outputPin}.on()\n  time.sleep_ms(${duration})\n  sound_out_${outputPin}.off()\n`;
};

