// block definition for digital_write
import * as Blockly from "blockly/core";

const pin = {
  type: "digital_write",
  message0: "set digital pin %1 to %2",
  args0: [
    {
      type: "field_number",
      name: "PIN",
      value: 2,
      min: 0,
      max: 39
    },
    {
      type: "field_dropdown",
      name: "STATE",
      options: [
        ["HIGH", "1"],
        ["LOW", "0"]
      ]
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#0284C7",
  tooltip: "Set digital pin HIGH or LOW"
};

export const blocks3 = Blockly.common.createBlockDefinitionsFromJsonArray([
  pin,
]);
