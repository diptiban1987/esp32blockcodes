// python generator for digital_write — emits gpioX.value()
import { getGpioPinVar } from "./pinHelper";

export const forBlock = Object.create(null);

forBlock["digital_write"] = function(block, generator) {
  const pin = block.getFieldValue("PIN");
  const state = block.getFieldValue("STATE");

  const gpioVar = getGpioPinVar(generator, pin, "OUT");
  return `${gpioVar}.value(${state})\n`;
};
