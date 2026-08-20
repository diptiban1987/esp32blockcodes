// esp32 Analog Hall Effect Sensor blocks — comprehensive analog-hall suite
// (new "esp32_hallfx_*" prefix — additive, backward-compatible;
//  existing "esp32_hall_module_*" and "esp32_get_hall_sensor" blocks are untouched)
import * as Blockly from "blockly/core";

const PIN_OPTIONS = [
  ["2","2"],["4","4"],["5","5"],["12","12"],["13","13"],
  ["14","14"],["15","15"],["16","16"],["17","17"],["18","18"],
  ["19","19"],["21","21"],["22","22"],["23","23"],["25","25"],
  ["26","26"],["27","27"],["32","32"],["33","33"]
];

const ANALOG_PIN_OPTIONS = [
  ["32","32"],["33","33"],["34","34"],["35","35"],["36","36"],["39","39"]
];

// ─────────────────────────────────────────────────────────────
//  ANALOG HALL EFFECT MODULE (SS49E / 44E / AH3503 / A1302 …)
//  — Analog OUT pin → ESP32 ADC.  No external library needed.
//  Provides field strength %, voltage, threshold detection,
//  pulse counting and RPM measurement (tachometer) for
//  fans / motors / wheels with a magnet + hall pickup.
// ─────────────────────────────────────────────────────────────
const hallfxSetup = {
  type: "esp32_hallfx_setup",
  message0: "setup analog hall sensor | signal pin %1",
  args0: [{ type: "field_number", name: "PIN", value: 32, min: 0, max: 39 }],
  previousStatement: null, nextStatement: null, colour: 0,
  tooltip: "Initialize an analog Hall effect sensor (SS49E / 44E / AH3503 …) on an ADC pin. Place once in setup."
};

const hallfxRaw = {
  type: "esp32_hallfx_raw",
  message0: "hall sensor raw value (0–4095) at pin %1",
  args0: [{ type: "field_number", name: "PIN", value: 32, min: 0, max: 39 }],
  output: "Number", colour: 0,
  tooltip: "Read raw ADC value (0–4095) from an analog hall sensor. Mid-range ≈ no field; deviation = magnet present."
};

const hallfxFieldPercent = {
  type: "esp32_hallfx_field_percent",
  message0: "hall field strength % at pin %1",
  args0: [{ type: "field_number", name: "PIN", value: 32, min: 0, max: 39 }],
  output: "Number", colour: 0,
  tooltip: "Magnetic field strength as 0–100%. 50% ≈ no field; >50% North-deflected; <50% South-deflected."
};

const hallfxVoltage = {
  type: "esp32_hallfx_voltage",
  message0: "hall sensor voltage (V) at pin %1",
  args0: [{ type: "field_number", name: "PIN", value: 32, min: 0, max: 39 }],
  output: "Number", colour: 0,
  tooltip: "Read hall sensor OUT voltage in Volts (0 – 3.3 V) from the analog signal pin."
};

const hallfxIsNear = {
  type: "esp32_hallfx_is_near",
  message0: "magnet near? hall pin %1 threshold %2 %",
  args0: [
    { type: "field_number", name: "PIN", value: 32, min: 0, max: 39 },
    { type: "field_number", name: "THRESHOLD", value: 70, min: 0, max: 100 }
  ],
  output: "Boolean", colour: 0,
  tooltip: "Returns true if the hall field strength % exceeds the threshold (magnet in range)."
};

const hallfxWaitUntilNear = {
  type: "esp32_hallfx_wait_until_near",
  message0: "wait until magnet near hall pin %1 (> %2 %) timeout %3 ms (-1 = forever)",
  args0: [
    { type: "field_number", name: "PIN", value: 32, min: 0, max: 39 },
    { type: "field_number", name: "THRESHOLD", value: 70, min: 0, max: 100 },
    { type: "field_number", name: "TIMEOUT", value: -1, min: -1 }
  ],
  previousStatement: null, nextStatement: null, colour: 0,
  tooltip: "Pause until a magnet comes within range of the hall sensor, or until timeout elapses. Use -1 ms to wait forever."
};

// ─────────────────────────────────────────────────────────────
//  PULSE COUNTING / TACHOMETER  (digital OUT of a hall module:
//  e.g. A3144 / 3144 / 44E with DO pin → any GPIO)
// ─────────────────────────────────────────────────────────────
const hallfxCountPulses = {
  type: "esp32_hallfx_count_pulses",
  message0: "count hall pulses at digital pin %1 for %2 ms",
  args0: [
    { type: "field_number", name: "PIN", value: 2, min: 0, max: 39 },
    { type: "field_number", name: "DURATION", value: 1000, min: 50 }
  ],
  output: "Number", colour: 0,
  tooltip: "Counts low→high transitions on the hall sensor's digital OUT pin during the sample window. Returns the number of magnet passes."
};

const hallfxRpm = {
  type: "esp32_hallfx_rpm",
  message0: "measure RPM | hall pin %1 sample %2 ms | magnets per rev %3",
  args0: [
    { type: "field_number", name: "PIN", value: 2, min: 0, max: 39 },
    { type: "field_number", name: "DURATION", value: 1000, min: 50 },
    { type: "field_number", name: "POLES", value: 1, min: 1, max: 64, precision: 1 }
  ],
  output: "Number", colour: 0,
  tooltip: "Measure rotation speed in RPM using a hall pickup. Counts pulses over the sample window, then rpm = pulses × 60000 / (duration × magnets_per_rev)."
};

// ─────────────────────────────────────────────────────────────
//  ALL-IN-ONE ALARM & SERIAL PRINT
// ─────────────────────────────────────────────────────────────
const hallfxAlarm = {
  type: "esp32_hallfx_alarm",
  message0: "if hall pin %1 strength > %2 % turn ON pin %3 (else OFF)",
  args0: [
    { type: "field_number", name: "SENSOR_PIN", value: 32, min: 0, max: 39 },
    { type: "field_number", name: "THRESHOLD", value: 70, min: 0, max: 100 },
    { type: "field_number", name: "OUTPUT_PIN", value: 2, min: 0, max: 39 }
  ],
  previousStatement: null, nextStatement: null, colour: 0,
  tooltip: "All-in-one block: turn OUTPUT_PIN (LED / buzzer / relay) ON when the hall field strength exceeds the threshold, otherwise turn it OFF."
};

const hallfxPrintSerial = {
  type: "esp32_hallfx_print_serial",
  message0: "print hall strength to serial | pin %1",
  args0: [{ type: "field_number", name: "PIN", value: 32, min: 0, max: 39 }],
  previousStatement: null, nextStatement: null, colour: 0,
  tooltip: "Read the hall field strength % and print it to the serial monitor (e.g. 'Hall Strength: 53%')."
};

export const hallBlocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  hallfxSetup,
  hallfxRaw,
  hallfxFieldPercent,
  hallfxVoltage,
  hallfxIsNear,
  hallfxWaitUntilNear,
  hallfxCountPulses,
  hallfxRpm,
  hallfxAlarm,
  hallfxPrintSerial,
]);
