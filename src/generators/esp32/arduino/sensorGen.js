// Arduino C++ generator for all ESP32 sensor blocks
import { ArduinoOrder } from '../../arduinoGenerator';

export const forBlock = Object.create(null);

// ─────────────────────────────────────────────────────────────
//  ULTRASONIC (HC-SR04) — no library needed
// ─────────────────────────────────────────────────────────────
forBlock['esp32_ultrasonic_setup'] = function (block, generator) {
  const trig = block.getFieldValue('TRIG');
  const echo = block.getFieldValue('ECHO');
  generator.definitions_['def_ultrasonic_pins'] =
`int _ultrasonic_trig = ${trig};
int _ultrasonic_echo = ${echo};`;
  generator.definitions_['init_ultrasonic_pins'] =
`  pinMode(_ultrasonic_trig, OUTPUT);
  pinMode(_ultrasonic_echo, INPUT);`;
  return '';
};

forBlock['esp32_ultrasonic_get_distance'] = function (block, generator) {
  generator.definitions_['def_ultrasonic_pins'] = generator.definitions_['def_ultrasonic_pins'] ||
`int _ultrasonic_trig = 14;
int _ultrasonic_echo = 27;`;
  generator.definitions_['init_ultrasonic_pins'] = generator.definitions_['init_ultrasonic_pins'] ||
`  pinMode(_ultrasonic_trig, OUTPUT);
  pinMode(_ultrasonic_echo, INPUT);`;
  generator.definitions_['def_ultrasonic_read'] =
`long readUltrasonic() {
  digitalWrite(_ultrasonic_trig, LOW);
  delayMicroseconds(5);
  digitalWrite(_ultrasonic_trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(_ultrasonic_trig, LOW);
  long duration = pulseIn(_ultrasonic_echo, HIGH, 50000);
  delay(60); // Keep sensor stable by adding hold-off time
  if (duration == 0) return -1;
  return (long)(duration * 0.0343 / 2);
}`;
  return ['readUltrasonic()', ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_ultrasonic'] = function (block, generator) {
  const trig = block.getFieldValue('TRIG');
  const echo = block.getFieldValue('ECHO');
  generator.definitions_['def_ultrasonic_with_pins'] =
`long readUltrasonicPins(int trigPin, int echoPin) {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long duration = pulseIn(echoPin, HIGH, 50000);
  delay(60);
  if (duration == 0) return -1;
  return (long)(duration * 0.0343 / 2);
}`;
  return [`readUltrasonicPins(${trig}, ${echo})`, ArduinoOrder.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  DHT11 / DHT22 — Library: DHTesp (ESP32-optimised, no bit-bang hang)
// ─────────────────────────────────────────────────────────────
// DHTesp uses the ESP32's RMT hardware peripheral for pulse timing,
// avoiding the timing-sensitive bit-bang reads that hang Adafruit DHT
// 1.4.7 on ESP32 Arduino core 3.x. Generates clean getter functions
// instead of comma-operator expressions, and uses sensor-specific
// sample intervals (DHT11 = 1000 ms, DHT22 = 2000 ms).

function _dhtTypeParams(type) {
  if (type === 'DHT22') return { enum: 'DHTesp::DHT22', interval: 2000 };
  return { enum: 'DHTesp::DHT11', interval: 1000 };
}

function _dhtGlobalHelpers(type) {
  const p = _dhtTypeParams(type);
  return `unsigned long _dht_last_read = 0;
const unsigned long _dht_interval = ${p.interval};
float _dht_last_temp = 0.0;
float _dht_last_hum = 0.0;

void _dht_update() {
  if (millis() - _dht_last_read < _dht_interval) return;
  TempAndHumidity _th = dht_sensor.getTempAndHumidity();
  if (dht_sensor.getStatus() == DHTesp::ERROR_NONE) {
    _dht_last_read = millis();
    _dht_last_temp = _th.temperature;
    _dht_last_hum = _th.humidity;
  }
}

float getDHTTemperature() {
  _dht_update();
  return _dht_last_temp;
}

float getDHTHumidity() {
  _dht_update();
  return _dht_last_hum;
}`;
}

forBlock['esp32_dht_setup'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  const type = block.getFieldValue('TYPE') || 'DHT11';
  const p = _dhtTypeParams(type);
  generator.definitions_['include_dht'] = '#include <DHTesp.h>';
  generator.definitions_['decl_dht_global'] = 'DHTesp dht_sensor;';
  generator.definitions_['init_dht_global'] = `  dht_sensor.setup(${pin}, ${p.enum});\n  delay(${p.interval}); // let sensor stabilize\n  Serial.println("DHT sensor ready on pin ${pin}");`;
  generator.definitions_['def_dht_safe_read'] = _dhtGlobalHelpers(type);
  generator.definitions_['loop_delay_dht'] = `  delay(${p.interval}); // DHT min sample interval`;
  return '';
};

forBlock['esp32_dht_get_reading'] = function (block, generator) {
  const reading = block.getFieldValue('READING');
  generator.definitions_['include_dht'] = '#include <DHTesp.h>';
  if (!generator.definitions_['decl_dht_global']) {
    generator.definitions_['decl_dht_global'] = 'DHTesp dht_sensor;';
    generator.definitions_['init_dht_global'] = '  dht_sensor.setup(5, DHTesp::DHT11);\n  delay(1000); // let sensor stabilize\n  Serial.println("DHT sensor ready on pin 5");';
    generator.definitions_['def_dht_safe_read'] = _dhtGlobalHelpers('DHT11');
    generator.definitions_['loop_delay_dht'] = '  delay(1000); // DHT min sample interval';
  }
  const fnName = reading === 'temperature' ? 'getDHTTemperature' : 'getDHTHumidity';
  return [`${fnName}()`, ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_dht'] = function (block, generator) {
  const reading = block.getFieldValue('READING');
  const pin = block.getFieldValue('PIN');
  generator.definitions_['include_dht'] = '#include <DHTesp.h>';
  generator.definitions_[`decl_dht_${pin}`] = `DHTesp dht${pin};`;
  generator.definitions_[`init_dht_${pin}`] = `  dht${pin}.setup(${pin}, DHTesp::DHT11);\n  delay(1000); // let sensor stabilize\n  Serial.println("DHT sensor ready on pin ${pin}");`;
  generator.definitions_[`def_dht_safe_read_${pin}`] =
`unsigned long _dht${pin}_last_read = 0;
const unsigned long _dht${pin}_interval = 1000;
float _dht${pin}_last_temp = 0.0;
float _dht${pin}_last_hum = 0.0;

void _dht${pin}_update() {
  if (millis() - _dht${pin}_last_read < _dht${pin}_interval) return;
  TempAndHumidity _th = dht${pin}.getTempAndHumidity();
  if (dht${pin}.getStatus() == DHTesp::ERROR_NONE) {
    _dht${pin}_last_read = millis();
    _dht${pin}_last_temp = _th.temperature;
    _dht${pin}_last_hum = _th.humidity;
  }
}

float getDHT${pin}Temperature() {
  _dht${pin}_update();
  return _dht${pin}_last_temp;
}

float getDHT${pin}Humidity() {
  _dht${pin}_update();
  return _dht${pin}_last_hum;
}`;
  generator.definitions_[`loop_delay_dht_${pin}`] = '  delay(1000); // DHT min sample interval';
  const fnName = reading === 'temperature' ? `getDHT${pin}Temperature` : `getDHT${pin}Humidity`;
  return [`${fnName}()`, ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_dht_serial_both'] = function (block, generator) {
  generator.definitions_['include_dht'] = '#include <DHTesp.h>';
  if (!generator.definitions_['decl_dht_global']) {
    generator.definitions_['decl_dht_global'] = 'DHTesp dht_sensor;';
    generator.definitions_['init_dht_global'] = '  dht_sensor.setup(5, DHTesp::DHT11);\n  delay(1000); // let sensor stabilize\n  Serial.println("DHT sensor ready on pin 5");';
    generator.definitions_['def_dht_safe_read'] = _dhtGlobalHelpers('DHT11');
    generator.definitions_['loop_delay_dht'] = '  delay(1000); // DHT min sample interval';
  }
  return `  Serial.printf("Temperature: %.2f C | Humidity: %.2f %%\\n", getDHTTemperature(), getDHTHumidity());\n`;
};


// ─────────────────────────────────────────────────────────────
//  DS18B20 Temperature — Libraries: OneWire + DallasTemperature
// ─────────────────────────────────────────────────────────────
forBlock['esp32_ds18b20_setup'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_['include_onewire'] = '#include <OneWire.h>';
  generator.definitions_['include_dallas'] = '#include <DallasTemperature.h>';
  generator.definitions_['decl_ds18b20'] =
`OneWire _ds_wire(${pin});
DallasTemperature _ds_sensor(&_ds_wire);`;
  generator.definitions_['init_ds18b20'] = `  _ds_sensor.begin();`;
  return '';
};

forBlock['esp32_ds18b20_get_temp'] = function (block, generator) {
  generator.definitions_['include_onewire'] = generator.definitions_['include_onewire'] || '#include <OneWire.h>';
  generator.definitions_['include_dallas'] = generator.definitions_['include_dallas'] || '#include <DallasTemperature.h>';
  generator.definitions_['decl_ds18b20'] = generator.definitions_['decl_ds18b20'] ||
`OneWire _ds_wire(4);
DallasTemperature _ds_sensor(&_ds_wire);`;
  generator.definitions_['init_ds18b20'] = generator.definitions_['init_ds18b20'] || `  _ds_sensor.begin();`;
  generator.definitions_['def_ds18b20_read_c'] =
`float getDS18B20TempC() {
  _ds_sensor.requestTemperatures();
  return _ds_sensor.getTempCByIndex(0);
}`;
  return ['getDS18B20TempC()', ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_ds18b20_get_temp_f'] = function (block, generator) {
  generator.definitions_['include_onewire'] = generator.definitions_['include_onewire'] || '#include <OneWire.h>';
  generator.definitions_['include_dallas'] = generator.definitions_['include_dallas'] || '#include <DallasTemperature.h>';
  generator.definitions_['decl_ds18b20'] = generator.definitions_['decl_ds18b20'] ||
`OneWire _ds_wire(4);
DallasTemperature _ds_sensor(&_ds_wire);`;
  generator.definitions_['init_ds18b20'] = generator.definitions_['init_ds18b20'] || `  _ds_sensor.begin();`;
  generator.definitions_['def_ds18b20_read_f'] =
`float getDS18B20TempF() {
  _ds_sensor.requestTemperatures();
  return _ds_sensor.getTempFByIndex(0);
}`;
  return ['getDS18B20TempF()', ArduinoOrder.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  BMP280 — Library: Adafruit BMP280 Library
//  Robust init: auto-detect I2C address, no infinite loop on failure
// ─────────────────────────────────────────────────────────────
forBlock['esp32_bmp280_setup'] = function (block, generator) {
  const sda = block.getFieldValue('SDA');
  const scl = block.getFieldValue('SCL');
  generator.definitions_['include_wire'] = '#include <Wire.h>';
  generator.definitions_['include_math'] = '#include <math.h>';
  generator.definitions_['include_bmp280'] = '#include <Adafruit_BMP280.h>';
  generator.definitions_['decl_bmp280'] = 'Adafruit_BMP280 _bmp280;\nbool bmp280Available = false;';
  generator.definitions_['init_wire'] =
`  Wire.begin(${sda}, ${scl});`;
  generator.definitions_['init_bmp280'] =
`  bmp280Available = _bmp280.begin(0x76);
  if (!bmp280Available) bmp280Available = _bmp280.begin(0x77);
  if (bmp280Available) {
    Serial.println("BMP280 initialized.");
  } else {
    Serial.println("BMP280 not detected.");
  }`;
  return '';
};

forBlock['esp32_bmp280_temperature'] = function (block, generator) {
  generator.definitions_['include_wire'] = generator.definitions_['include_wire'] || '#include <Wire.h>';
  generator.definitions_['include_math'] = generator.definitions_['include_math'] || '#include <math.h>';
  generator.definitions_['include_bmp280'] = generator.definitions_['include_bmp280'] || '#include <Adafruit_BMP280.h>';
  if (!generator.definitions_['decl_bmp280']) {
    generator.definitions_['decl_bmp280'] = 'Adafruit_BMP280 _bmp280;\nbool bmp280Available = false;';
    generator.definitions_['init_wire'] = '  Wire.begin();';
    generator.definitions_['init_bmp280'] =
`  bmp280Available = _bmp280.begin(0x76);
  if (!bmp280Available) bmp280Available = _bmp280.begin(0x77);
  if (bmp280Available) Serial.println("BMP280 initialized.");
  else Serial.println("BMP280 not detected.");`;
  }
  generator.definitions_['def_bmp280_get_temp'] =
`float getBMP280Temperature() {
  if (bmp280Available) return _bmp280.readTemperature();
  return NAN;
}`;
  return ['getBMP280Temperature()', ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_bmp280_pressure'] = function (block, generator) {
  generator.definitions_['include_wire'] = generator.definitions_['include_wire'] || '#include <Wire.h>';
  generator.definitions_['include_math'] = generator.definitions_['include_math'] || '#include <math.h>';
  generator.definitions_['include_bmp280'] = generator.definitions_['include_bmp280'] || '#include <Adafruit_BMP280.h>';
  if (!generator.definitions_['decl_bmp280']) {
    generator.definitions_['decl_bmp280'] = 'Adafruit_BMP280 _bmp280;\nbool bmp280Available = false;';
    generator.definitions_['init_wire'] = '  Wire.begin();';
    generator.definitions_['init_bmp280'] =
`  bmp280Available = _bmp280.begin(0x76);
  if (!bmp280Available) bmp280Available = _bmp280.begin(0x77);
  if (bmp280Available) Serial.println("BMP280 initialized.");
  else Serial.println("BMP280 not detected.");`;
  }
  generator.definitions_['def_bmp280_get_press'] =
`float getBMP280Pressure() {
  if (bmp280Available) return _bmp280.readPressure() / 100.0F;
  return NAN;
}`;
  return ['getBMP280Pressure()', ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_bmp280_altitude'] = function (block, generator) {
  const seaLevel = block.getFieldValue('SEALEVEL');
  generator.definitions_['include_wire'] = generator.definitions_['include_wire'] || '#include <Wire.h>';
  generator.definitions_['include_math'] = generator.definitions_['include_math'] || '#include <math.h>';
  generator.definitions_['include_bmp280'] = generator.definitions_['include_bmp280'] || '#include <Adafruit_BMP280.h>';
  if (!generator.definitions_['decl_bmp280']) {
    generator.definitions_['decl_bmp280'] = 'Adafruit_BMP280 _bmp280;\nbool bmp280Available = false;';
    generator.definitions_['init_wire'] = '  Wire.begin();';
    generator.definitions_['init_bmp280'] =
`  bmp280Available = _bmp280.begin(0x76);
  if (!bmp280Available) bmp280Available = _bmp280.begin(0x77);
  if (bmp280Available) Serial.println("BMP280 initialized.");
  else Serial.println("BMP280 not detected.");`;
  }
  generator.definitions_['def_bmp280_get_alt'] =
`float getBMP280Altitude() {
  if (bmp280Available) return _bmp280.readAltitude(${seaLevel});
  return NAN;
}`;
  return ['getBMP280Altitude()', ArduinoOrder.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  MPU6050 — Library: Adafruit MPU6050
//  Robust init: availability flag, no crash on missing sensor
// ─────────────────────────────────────────────────────────────
forBlock['esp32_mpu_init'] = function (block, generator) {
  const sda = block.getFieldValue('SDA');
  const scl = block.getFieldValue('SCL');
  generator.definitions_['include_wire'] = '#include <Wire.h>';
  generator.definitions_['include_mpu'] = '#include <Adafruit_MPU6050.h>\n#include <Adafruit_Sensor.h>';
  generator.definitions_['decl_mpu'] = 'Adafruit_MPU6050 mpu;\nbool mpuAvailable = false;';
  generator.definitions_['init_wire'] = `  Wire.begin(${sda}, ${scl});`;
  generator.definitions_['init_mpu'] =
`  mpuAvailable = mpu.begin();
  if (mpuAvailable) {
    Serial.println("MPU6050 initialized.");
  } else {
    Serial.println("MPU6050 not detected.");
  }`;
  return '';
};

forBlock['esp32_mpu_accel'] = function (block, generator) {
  const axis = block.getFieldValue('AXIS');
  generator.definitions_['include_wire'] = '#include <Wire.h>';
  generator.definitions_['include_mpu'] = '#include <Adafruit_MPU6050.h>\n#include <Adafruit_Sensor.h>';
  if (!generator.definitions_['decl_mpu']) {
    generator.definitions_['decl_mpu'] = 'Adafruit_MPU6050 mpu;\nbool mpuAvailable = false;';
    generator.definitions_['init_wire'] = '  Wire.begin();';
    generator.definitions_['init_mpu'] =
`  mpuAvailable = mpu.begin();
  if (mpuAvailable) Serial.println("MPU6050 initialized.");
  else Serial.println("MPU6050 not detected.");`;
  }
  generator.definitions_['def_mpu_get_accel'] =
`float getMPUAccel(char axis) {
  if (!mpuAvailable) return NAN;
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);
  if (axis == 'x') return a.acceleration.x;
  if (axis == 'y') return a.acceleration.y;
  return a.acceleration.z;
}`;
  return [`getMPUAccel('${axis}')`, ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_mpu_gyro'] = function (block, generator) {
  const axis = block.getFieldValue('AXIS');
  generator.definitions_['include_wire'] = '#include <Wire.h>';
  generator.definitions_['include_mpu'] = '#include <Adafruit_MPU6050.h>\n#include <Adafruit_Sensor.h>';
  if (!generator.definitions_['decl_mpu']) {
    generator.definitions_['decl_mpu'] = 'Adafruit_MPU6050 mpu;\nbool mpuAvailable = false;';
    generator.definitions_['init_wire'] = '  Wire.begin();';
    generator.definitions_['init_mpu'] =
`  mpuAvailable = mpu.begin();
  if (mpuAvailable) Serial.println("MPU6050 initialized.");
  else Serial.println("MPU6050 not detected.");`;
  }
  generator.definitions_['def_mpu_get_gyro'] =
`float getMPUGyro(char axis) {
  if (!mpuAvailable) return NAN;
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);
  if (axis == 'x') return g.gyro.x;
  if (axis == 'y') return g.gyro.y;
  return g.gyro.z;
}`;
  return [`getMPUGyro('${axis}')`, ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_mpu_temp'] = function (block, generator) {
  generator.definitions_['include_wire'] = '#include <Wire.h>';
  generator.definitions_['include_mpu'] = '#include <Adafruit_MPU6050.h>\n#include <Adafruit_Sensor.h>';
  if (!generator.definitions_['decl_mpu']) {
    generator.definitions_['decl_mpu'] = 'Adafruit_MPU6050 mpu;\nbool mpuAvailable = false;';
    generator.definitions_['init_wire'] = '  Wire.begin();';
    generator.definitions_['init_mpu'] =
`  mpuAvailable = mpu.begin();
  if (mpuAvailable) Serial.println("MPU6050 initialized.");
  else Serial.println("MPU6050 not detected.");`;
  }
  generator.definitions_['def_mpu_get_temp'] =
`float getMPUTemp() {
  if (!mpuAvailable) return NAN;
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);
  return temp.temperature;
}`;
  return [`getMPUTemp()`, ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_mpu_tilt'] = function (block, generator) {
  const threshold = block.getFieldValue('THRESHOLD') || '30';
  generator.definitions_['include_wire'] = '#include <Wire.h>';
  generator.definitions_['include_mpu'] = '#include <Adafruit_MPU6050.h>\n#include <Adafruit_Sensor.h>';
  if (!generator.definitions_['decl_mpu']) {
    generator.definitions_['decl_mpu'] = 'Adafruit_MPU6050 mpu;\nbool mpuAvailable = false;';
    generator.definitions_['init_wire'] = '  Wire.begin();';
    generator.definitions_['init_mpu'] =
`  mpuAvailable = mpu.begin();
  if (mpuAvailable) Serial.println("MPU6050 initialized.");
  else Serial.println("MPU6050 not detected.");`;
  }
  generator.definitions_['def_mpu_tilt'] =
`bool mpu_is_tilted(float threshold_deg) {
  if (!mpuAvailable) return false;
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);
  float angle = atan2(sqrt(a.acceleration.x * a.acceleration.x + a.acceleration.y * a.acceleration.y), abs(a.acceleration.z)) * 180.0 / PI;
  return angle > threshold_deg;
}`;
  return [`mpu_is_tilted(${threshold})`, ArduinoOrder.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  RFID (MFRC522) — Library: MFRC522
// ─────────────────────────────────────────────────────────────
forBlock['esp32_rfid_setup'] = function (block, generator) {
  const ss = block.getFieldValue('SS');
  const rst = block.getFieldValue('RST');
  generator.definitions_['include_spi'] = '#include <SPI.h>';
  generator.definitions_['include_mfrc522'] = '#include <MFRC522.h>';
  generator.definitions_['decl_rfid'] = `MFRC522 _rfid(${ss}, ${rst});`;
  generator.definitions_['init_rfid'] = `  SPI.begin();\n  _rfid.PCD_Init();`;
  return '';
};

forBlock['esp32_rfid_card_present'] = function (block, generator) {
  generator.definitions_['include_spi'] = generator.definitions_['include_spi'] || '#include <SPI.h>';
  generator.definitions_['include_mfrc522'] = generator.definitions_['include_mfrc522'] || '#include <MFRC522.h>';
  generator.definitions_['decl_rfid'] = generator.definitions_['decl_rfid'] || 'MFRC522 _rfid(5, 22);';
  generator.definitions_['init_rfid'] = generator.definitions_['init_rfid'] || '  SPI.begin();\n  _rfid.PCD_Init();';
  return ['(_rfid.PICC_IsNewCardPresent() && _rfid.PICC_ReadCardSerial())', ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_rfid_read_uid'] = function (block, generator) {
  generator.definitions_['include_spi'] = generator.definitions_['include_spi'] || '#include <SPI.h>';
  generator.definitions_['include_mfrc522'] = generator.definitions_['include_mfrc522'] || '#include <MFRC522.h>';
  generator.definitions_['decl_rfid'] = generator.definitions_['decl_rfid'] || 'MFRC522 _rfid(5, 22);';
  generator.definitions_['init_rfid'] = generator.definitions_['init_rfid'] || '  SPI.begin();\n  _rfid.PCD_Init();';
  generator.definitions_['def_rfid_uid'] =
`String getRFIDUID() {
  String uid = "";
  for (byte i = 0; i < _rfid.uid.size; i++) {
    if (_rfid.uid.uidByte[i] < 0x10) uid += "0";
    uid += String(_rfid.uid.uidByte[i], HEX);
    if (i < _rfid.uid.size - 1) uid += " ";
  }
  uid.toUpperCase();
  _rfid.PICC_HaltA();
  return uid;
}`;
  return ['getRFIDUID()', ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_rfid_uid_match'] = function (block, generator) {
  const uid = block.getFieldValue('UID');
  generator.definitions_['include_spi'] = generator.definitions_['include_spi'] || '#include <SPI.h>';
  generator.definitions_['include_mfrc522'] = generator.definitions_['include_mfrc522'] || '#include <MFRC522.h>';
  generator.definitions_['decl_rfid'] = generator.definitions_['decl_rfid'] || 'MFRC522 _rfid(5, 22);';
  generator.definitions_['init_rfid'] = generator.definitions_['init_rfid'] || '  SPI.begin();\n  _rfid.PCD_Init();';
  generator.definitions_['def_rfid_uid'] = generator.definitions_['def_rfid_uid'] ||
`String getRFIDUID() {
  String uid = "";
  for (byte i = 0; i < _rfid.uid.size; i++) {
    if (_rfid.uid.uidByte[i] < 0x10) uid += "0";
    uid += String(_rfid.uid.uidByte[i], HEX);
    if (i < _rfid.uid.size - 1) uid += " ";
  }
  uid.toUpperCase();
  _rfid.PICC_HaltA();
  return uid;
}`;
  return [`(getRFIDUID() == "${uid.toUpperCase()}")`, ArduinoOrder.EQUALITY];
};

// ─────────────────────────────────────────────────────────────
//  IR Remote Receiver — Library: IRremote
// ─────────────────────────────────────────────────────────────
forBlock['esp32_ir_receiver_setup'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_['include_irremote'] = '#define IR_RECEIVE_PIN ' + pin + '\n#include <IRremote.hpp>';
  generator.definitions_['init_irremote'] = `  IrReceiver.begin(IR_RECEIVE_PIN, ENABLE_LED_FEEDBACK);`;
  return '';
};

forBlock['esp32_ir_receiver_available'] = function (block, generator) {
  generator.definitions_['include_irremote'] = generator.definitions_['include_irremote'] || '#define IR_RECEIVE_PIN 15\n#include <IRremote.hpp>';
  generator.definitions_['init_irremote'] = generator.definitions_['init_irremote'] || '  IrReceiver.begin(IR_RECEIVE_PIN, ENABLE_LED_FEEDBACK);';
  return ['IrReceiver.decode()', ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_ir_receiver_read'] = function (block, generator) {
  generator.definitions_['include_irremote'] = generator.definitions_['include_irremote'] || '#define IR_RECEIVE_PIN 15\n#include <IRremote.hpp>';
  generator.definitions_['init_irremote'] = generator.definitions_['init_irremote'] || '  IrReceiver.begin(IR_RECEIVE_PIN, ENABLE_LED_FEEDBACK);';
  return ['IrReceiver.decodedIRData.command', ArduinoOrder.MEMBER];
};

forBlock['esp32_ir_receiver_resume'] = function (block, generator) {
  generator.definitions_['include_irremote'] = generator.definitions_['include_irremote'] || '#define IR_RECEIVE_PIN 15\n#include <IRremote.hpp>';
  return 'IrReceiver.resume();\n';
};

// ─────────────────────────────────────────────────────────────
//  IR Remote Sender (Transmitter) — Library: IRremote
// ─────────────────────────────────────────────────────────────
forBlock['esp32_ir_sender_setup'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_['include_irremote'] = '#include <IRremote.hpp>';
  // IRsend is a global object; the send pin is configured by IrSender.begin().
  generator.definitions_['decl_irsend'] = `IRsend _irsend(${pin});`;
  generator.definitions_['init_irsend'] = `  _irsend.begin();`;
  return '';
};

forBlock['esp32_ir_send'] = function (block, generator) {
  const addr = block.getFieldValue('ADDR') || '0';
  const cmd = block.getFieldValue('CMD') || '0';
  // Guard: if no setup block was placed, provide sane defaults so the
  // generated code still compiles and transmits on the default pin.
  generator.definitions_['include_irremote'] = generator.definitions_['include_irremote'] || '#include <IRremote.hpp>';
  generator.definitions_['decl_irsend'] = generator.definitions_['decl_irsend'] || `IRsend _irsend(4);`;
  generator.definitions_['init_irsend'] = generator.definitions_['init_irsend'] || `  _irsend.begin();`;
  return `_irsend.sendNEC(0x${addr}, 0x${cmd}, 0);\n`;
};

// ─────────────────────────────────────────────────────────────
//  PIR Motion Sensor — no library needed
// ─────────────────────────────────────────────────────────────
forBlock['esp32_pir_sensor'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_[`pinmode_input_${pin}`] = `  pinMode(${pin}, INPUT);`;
  return [`digitalRead(${pin})`, ArduinoOrder.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  IR Obstacle Sensor — no library needed
// ─────────────────────────────────────────────────────────────
forBlock['esp32_ir_sensor'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_[`pinmode_input_${pin}`] = `  pinMode(${pin}, INPUT);`;
  return [`(digitalRead(${pin}) == LOW)`, ArduinoOrder.EQUALITY];
};

// ── IR Analog — raw ADC value (0-4095) ────────────────────────
forBlock['esp32_ir_sensor_analog'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  return [`analogRead(${pin})`, ArduinoOrder.FUNCTION_CALL];
};

// ── IR Analog — proximity as 0-100% ───────────────────────────
forBlock['esp32_ir_sensor_analog_percent'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  return [`map(4095 - analogRead(${pin}), 0, 4095, 0, 100)`, ArduinoOrder.FUNCTION_CALL];
};

// ── IR Line Sensor — analog value for line following ──────────
forBlock['esp32_ir_line_analog'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  return [`analogRead(${pin})`, ArduinoOrder.FUNCTION_CALL];
};

// ── IR Line Sensor — black line detected (threshold) ──────────
forBlock['esp32_ir_line_detected'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  const threshold = block.getFieldValue('THRESHOLD') || '2000';
  return [`(analogRead(${pin}) > ${threshold})`, ArduinoOrder.EQUALITY];
};

// ─────────────────────────────────────────────────────────────
//  Sound / Microphone — no library needed
// ─────────────────────────────────────────────────────────────
forBlock['esp32_sound_sensor_analog'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  return [`analogRead(${pin})`, ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_sound_sensor_digital'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_[`pinmode_input_${pin}`] = `  pinMode(${pin}, INPUT);`;
  return [`(digitalRead(${pin}) == HIGH)`, ArduinoOrder.EQUALITY];
};

forBlock['esp32_sound_sensor_percent'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  return [`map(analogRead(${pin}), 0, 4095, 0, 100)`, ArduinoOrder.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  Touch Sensor (TTP223) — no library needed
// ─────────────────────────────────────────────────────────────
forBlock['esp32_touch_sensor'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_[`pinmode_input_${pin}`] = `  pinMode(${pin}, INPUT);`;
  return [`(digitalRead(${pin}) == HIGH)`, ArduinoOrder.EQUALITY];
};

// ─────────────────────────────────────────────────────────────
//  Vibration Sensor (SW-420) — no library needed
// ─────────────────────────────────────────────────────────────
forBlock['esp32_vibration_sensor'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_[`pinmode_input_${pin}`] = `  pinMode(${pin}, INPUT);`;
  return [`(digitalRead(${pin}) == HIGH)`, ArduinoOrder.EQUALITY];
};

// ─────────────────────────────────────────────────────────────
//  Flame Sensor — no library needed
// ─────────────────────────────────────────────────────────────
forBlock['esp32_flame_digital'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_[`pinmode_input_${pin}`] = `  pinMode(${pin}, INPUT);`;
  return [`(digitalRead(${pin}) == LOW)`, ArduinoOrder.EQUALITY];
};

forBlock['esp32_flame_analog'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  return [`analogRead(${pin})`, ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_flame_percent'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  return [`map(4095 - analogRead(${pin}), 0, 4095, 0, 100)`, ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_flame_alarm'] = function (block, generator) {
  const sensorPin = block.getFieldValue('SENSOR_PIN');
  const threshold = block.getFieldValue('THRESHOLD') || '30';
  const outputPin = block.getFieldValue('OUTPUT_PIN');
  generator.definitions_[`pinmode_output_${outputPin}`] = `  pinMode(${outputPin}, OUTPUT);`;
  return `if (map(4095 - analogRead(${sensorPin}), 0, 4095, 0, 100) > ${threshold}) {\n  digitalWrite(${outputPin}, HIGH);\n} else {\n  digitalWrite(${outputPin}, LOW);\n}\n`;
};

// ─────────────────────────────────────────────────────────────
//  MQ-2 Gas Sensor — no library needed
// ─────────────────────────────────────────────────────────────
forBlock['esp32_gas_sensor_analog'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  return [`analogRead(${pin})`, ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_gas_sensor_digital'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_[`pinmode_input_${pin}`] = `  pinMode(${pin}, INPUT);`;
  return [`(digitalRead(${pin}) == LOW)`, ArduinoOrder.EQUALITY];
};

forBlock['esp32_gas_sensor_percent'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  return [`map(analogRead(${pin}), 0, 4095, 0, 100)`, ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_gas_alarm'] = function (block, generator) {
  const sensorPin = block.getFieldValue('SENSOR_PIN');
  const threshold = block.getFieldValue('THRESHOLD') || '50';
  const outputPin = block.getFieldValue('OUTPUT_PIN');
  generator.definitions_[`pinmode_output_${outputPin}`] = `  pinMode(${outputPin}, OUTPUT);`;
  return `if (map(analogRead(${sensorPin}), 0, 4095, 0, 100) > ${threshold}) {\n  digitalWrite(${outputPin}, HIGH);\n} else {\n  digitalWrite(${outputPin}, LOW);\n}\n`;
};

// ─────────────────────────────────────────────────────────────
//  Soil Moisture — no library needed
// ─────────────────────────────────────────────────────────────
forBlock['esp32_soil_moisture_analog'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  return [`analogRead(${pin})`, ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_soil_moisture_digital'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_[`pinmode_input_${pin}`] = `  pinMode(${pin}, INPUT);`;
  return [`(digitalRead(${pin}) == HIGH)`, ArduinoOrder.EQUALITY];
};

// ─────────────────────────────────────────────────────────────
//  Water Level Sensor — no library needed
// ─────────────────────────────────────────────────────────────
forBlock['esp32_water_level_analog'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  return [`analogRead(${pin})`, ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_water_level_digital'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_[`pinmode_input_${pin}`] = `  pinMode(${pin}, INPUT);`;
  return [`(digitalRead(${pin}) == LOW)`, ArduinoOrder.EQUALITY];
};

// ─────────────────────────────────────────────────────────────
//  Rain Sensor — no library needed
// ─────────────────────────────────────────────────────────────
forBlock['esp32_rain_sensor'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  const mode = block.getFieldValue('MODE');
  if (mode === 'DIGITAL') {
    generator.definitions_[`pinmode_input_${pin}`] = `  pinMode(${pin}, INPUT);`;
    return [`(digitalRead(${pin}) == LOW)`, ArduinoOrder.EQUALITY];
  } else {
    return [`analogRead(${pin})`, ArduinoOrder.FUNCTION_CALL];
  }
};

forBlock['esp32_rain_analog'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  return [`analogRead(${pin})`, ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_rain_digital'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_[`pinmode_input_${pin}`] = `  pinMode(${pin}, INPUT);`;
  return [`(digitalRead(${pin}) == LOW)`, ArduinoOrder.EQUALITY];
};

forBlock['esp32_rain_percent'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  return [`map(4095 - analogRead(${pin}), 0, 4095, 0, 100)`, ArduinoOrder.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  LIGHT SENSORS — LDR & BH1750 (Arduino C++)
// ─────────────────────────────────────────────────────────────

// LDR (Raw Analog 0-4095)
forBlock['esp32_ldr_sensor'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  return [`analogRead(${pin})`, ArduinoOrder.FUNCTION_CALL];
};

// LDR (Percentage 0-100%)
forBlock['esp32_ldr_percent'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  return [`map(analogRead(${pin}), 0, 4095, 0, 100)`, ArduinoOrder.FUNCTION_CALL];
};

// LDR (Digital Output)
forBlock['esp32_ldr_digital'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_[`ldr_dig_setup_${pin}`] = `pinMode(${pin}, INPUT);`;
  return [`(digitalRead(${pin}) == LOW)`, ArduinoOrder.EQUALITY];
};

// LDR (Dark Check)
forBlock['esp32_ldr_is_dark'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  const threshold = block.getFieldValue('THRESHOLD') || '1500';
  return [`(analogRead(${pin}) < ${threshold})`, ArduinoOrder.RELATIONAL];
};

// LDR Print to Serial
forBlock['esp32_ldr_print_serial'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_['serial_begin'] = 'Serial.begin(115200);';
  return `Serial.print("LDR Light Level: ");\nSerial.println(analogRead(${pin}));\n`;
};

// ── BH1750 Digital Ambient Light Sensor (Arduino C++) ──
forBlock['esp32_bh1750_setup'] = function (block, generator) {
  const sda = block.getFieldValue('SDA');
  const scl = block.getFieldValue('SCL');
  const addr = block.getFieldValue('ADDR') || '0x23';

  generator.includes_['wire'] = '#include <Wire.h>';
  generator.includes_['bh1750'] = '#include <BH1750.h>';
  generator.definitions_['bh1750_obj'] = `BH1750 _lightMeter(${addr});`;
  generator.definitions_['bh1750_setup'] = `
Wire.begin(${sda}, ${scl});
_lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE);`;
  return '';
};

forBlock['esp32_bh1750_read_lux'] = function (block, generator) {
  generator.includes_['wire'] = '#include <Wire.h>';
  generator.includes_['bh1750'] = '#include <BH1750.h>';
  if (!generator.definitions_['bh1750_obj']) {
    generator.definitions_['bh1750_obj'] = 'BH1750 _lightMeter(0x23);';
  }
  return ['_lightMeter.readLightLevel()', ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_bh1750_is_light'] = function (block, generator) {
  const threshold = block.getFieldValue('THRESHOLD') || '300';
  generator.includes_['wire'] = '#include <Wire.h>';
  generator.includes_['bh1750'] = '#include <BH1750.h>';
  if (!generator.definitions_['bh1750_obj']) {
    generator.definitions_['bh1750_obj'] = 'BH1750 _lightMeter(0x23);';
  }
  return [`(_lightMeter.readLightLevel() > ${threshold})`, ArduinoOrder.RELATIONAL];
};

forBlock['esp32_bh1750_print_serial'] = function (block, generator) {
  generator.includes_['wire'] = '#include <Wire.h>';
  generator.includes_['bh1750'] = '#include <BH1750.h>';
  generator.definitions_['serial_begin'] = 'Serial.begin(115200);';
  if (!generator.definitions_['bh1750_obj']) {
    generator.definitions_['bh1750_obj'] = 'BH1750 _lightMeter(0x23);';
  }
  return `Serial.print("BH1750 Lux: ");\nSerial.println(_lightMeter.readLightLevel());\n`;
};

// ─────────────────────────────────────────────────────────────
//  Potentiometer — no library needed
// ─────────────────────────────────────────────────────────────
forBlock['esp32_potentiometer'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  return [`analogRead(${pin})`, ArduinoOrder.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  Hall Sensor Module — no library needed
// ─────────────────────────────────────────────────────────────
forBlock['esp32_hall_module_value'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_[`pinmode_input_${pin}`] = `  pinMode(${pin}, INPUT);`;
  return [`digitalRead(${pin})`, ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_hall_module_detected'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_[`pinmode_input_${pin}`] = `  pinMode(${pin}, INPUT);`;
  return [`(digitalRead(${pin}) == LOW)`, ArduinoOrder.EQUALITY];
};

forBlock['esp32_hall_module_wait'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_[`pinmode_input_${pin}`] = `  pinMode(${pin}, INPUT);`;
  return `while (digitalRead(${pin}) == HIGH) { delay(10); }\n`;
};

// ─────────────────────────────────────────────────────────────
//  Generic Analog / Digital — no library needed
// ─────────────────────────────────────────────────────────────
forBlock['esp32_analog_sensor'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  return [`analogRead(${pin})`, ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_digital_sensor'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_[`pinmode_input_${pin}`] = `  pinMode(${pin}, INPUT);`;
  return [`digitalRead(${pin})`, ArduinoOrder.FUNCTION_CALL];
};

// ─────────────────────────────────────────────────────────────
//  GENERALIZED WATER LEVEL SENSOR — Arduino C++
// ─────────────────────────────────────────────────────────────
forBlock['esp32_water_setup'] = function (block, generator) {
  // Nothing needed in Arduino for a passive analog sensor
  return '';
};

forBlock['esp32_water_read_level'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  // map(analogRead(pin), 0, 4095, 0, 100)
  return [`map(analogRead(${pin}), 0, 4095, 0, 100)`, ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_water_is_above'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  const threshold = block.getFieldValue('THRESHOLD');
  return [`(map(analogRead(${pin}), 0, 4095, 0, 100) > ${threshold})`, ArduinoOrder.RELATIONAL];
};

forBlock['esp32_water_print_serial'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_['serial_begin'] = '  Serial.begin(115200);';
  return `int _waterPct_${pin} = map(analogRead(${pin}), 0, 4095, 0, 100);\n  Serial.print("Water Level: "); Serial.print(_waterPct_${pin}); Serial.println("%");\n`;
};

forBlock['esp32_water_alert'] = function (block, generator) {
  const sensorPin = block.getFieldValue('SENSOR_PIN');
  const threshold  = block.getFieldValue('THRESHOLD');
  const outputPin  = block.getFieldValue('OUTPUT_PIN');
  generator.definitions_[`pinmode_output_${outputPin}`] = `  pinMode(${outputPin}, OUTPUT);`;
  generator.definitions_['serial_begin'] = '  Serial.begin(115200);';
  return `if (map(analogRead(${sensorPin}), 0, 4095, 0, 100) > ${threshold}) {\n    digitalWrite(${outputPin}, HIGH);\n  } else {\n    digitalWrite(${outputPin}, LOW);\n  }\n`;
};

// ─────────────────────────────────────────────────────────────
//  GENERALIZED SOIL MOISTURE SENSOR — Arduino C++
// ─────────────────────────────────────────────────────────────
forBlock['esp32_soil_setup'] = function (block, generator) {
  return '';
};

forBlock['esp32_soil_read_moisture'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  // Invert: dry soil = high raw value, wet soil = low raw value
  return [`map(analogRead(${pin}), 4095, 0, 0, 100)`, ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_soil_is_dry'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  const threshold = block.getFieldValue('THRESHOLD');
  return [`(map(analogRead(${pin}), 4095, 0, 0, 100) < ${threshold})`, ArduinoOrder.RELATIONAL];
};

forBlock['esp32_soil_print_serial'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_['serial_begin'] = '  Serial.begin(115200);';
  return `int _soilPct_${pin} = map(analogRead(${pin}), 4095, 0, 0, 100);\n  Serial.print("Soil Moisture: "); Serial.print(_soilPct_${pin}); Serial.println("%");\n`;
};

forBlock['esp32_soil_watering_alert'] = function (block, generator) {
  const sensorPin = block.getFieldValue('SENSOR_PIN');
  const threshold  = block.getFieldValue('THRESHOLD');
  const outputPin  = block.getFieldValue('OUTPUT_PIN');
  generator.definitions_[`pinmode_output_${outputPin}`] = `  pinMode(${outputPin}, OUTPUT);`;
  return `if (map(analogRead(${sensorPin}), 4095, 0, 0, 100) < ${threshold}) {\n    digitalWrite(${outputPin}, HIGH); // Turn ON pump/relay\n  } else {\n    digitalWrite(${outputPin}, LOW);  // Turn OFF pump/relay\n  }\n`;
};

// ─────────────────────────────────────────────────────────────
//  GENERALIZED SOUND SENSOR — Arduino C++
// ─────────────────────────────────────────────────────────────
forBlock['esp32_sound_setup'] = function (block, generator) {
  const dpin = block.getFieldValue('DPIN');
  generator.definitions_[`pinmode_input_${dpin}`] = `  pinMode(${dpin}, INPUT);`;
  generator.definitions_['serial_begin'] = '  Serial.begin(115200);';
  return '';
};

forBlock['esp32_sound_read_volume'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  return [`map(analogRead(${pin}), 0, 4095, 0, 100)`, ArduinoOrder.FUNCTION_CALL];
};

forBlock['esp32_sound_is_loud'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  const threshold = block.getFieldValue('THRESHOLD');
  return [`(map(analogRead(${pin}), 0, 4095, 0, 100) > ${threshold})`, ArduinoOrder.RELATIONAL];
};

forBlock['esp32_sound_detected_digital'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_[`pinmode_input_${pin}`] = `  pinMode(${pin}, INPUT);`;
  return [`(digitalRead(${pin}) == HIGH)`, ArduinoOrder.EQUALITY];
};

forBlock['esp32_sound_print_serial'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  generator.definitions_['serial_begin'] = '  Serial.begin(115200);';
  return `int _soundVol_${pin} = map(analogRead(${pin}), 0, 4095, 0, 100);\n  Serial.print("Sound Level: "); Serial.print(_soundVol_${pin}); Serial.println("/100");\n`;
};

forBlock['esp32_sound_trigger_output'] = function (block, generator) {
  const sensorPin = block.getFieldValue('SENSOR_PIN');
  const threshold  = block.getFieldValue('THRESHOLD');
  const outputPin  = block.getFieldValue('OUTPUT_PIN');
  const duration   = block.getFieldValue('DURATION');
  generator.definitions_[`pinmode_output_${outputPin}`] = `  pinMode(${outputPin}, OUTPUT);`;
  return `if (map(analogRead(${sensorPin}), 0, 4095, 0, 100) > ${threshold}) {\n    digitalWrite(${outputPin}, HIGH);\n    delay(${duration});\n    digitalWrite(${outputPin}, LOW);\n  }\n`;
};

