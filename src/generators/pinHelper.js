// Pin Helper for MicroPython Generator — resolves reusable GPIO pin variables
/**
 * Resolves a GPIO pin variable and registers its single top-level initialization statement.
 * @param {object} generator - Blockly Python generator instance
 * @param {string|number} pin - Pin number or name (e.g., 25, "25", "A0")
 * @param {string} [mode="OUT"] - Pin mode: "OUT", "IN", "PULL_UP", "INPUT_PULLUP", "PWM"
 * @returns {string} The variable name assigned to this pin (e.g., "gpio25")
 */
export function getGpioPinVar(generator, pin, mode = "OUT") {
  const rawPin = String(pin !== undefined && pin !== null ? pin : 25).trim();
  const safePin = rawPin.replace(/[^a-zA-Z0-9_]/g, "_");
  const varName = `gpio${safePin}`;

  generator.definitions_["import_machine_pin"] = "from machine import Pin";

  const defKey = `pin_init_${safePin}`;
  if (!generator.definitions_[defKey]) {
    const normalizedMode = String(mode).toUpperCase();
    let initExpr = "";
    if (normalizedMode === "PULL_UP" || normalizedMode === "INPUT_PULLUP" || normalizedMode === "IN_PULLUP") {
      initExpr = `${varName} = Pin(${rawPin}, Pin.IN, Pin.PULL_UP)`;
    } else if (normalizedMode === "IN" || normalizedMode === "INPUT") {
      initExpr = `${varName} = Pin(${rawPin}, Pin.IN)`;
    } else if (normalizedMode === "PWM") {
      generator.definitions_["import_machine_pwm"] = "from machine import PWM";
      initExpr = `${varName} = PWM(Pin(${rawPin}), freq=1000)`;
    } else {
      initExpr = `${varName} = Pin(${rawPin}, Pin.OUT)`;
    }
    generator.definitions_[defKey] = initExpr;
  }

  return varName;
}
