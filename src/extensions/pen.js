/**
 * Pen Extension for TechyBlocks
 * Scratch 3.0 compatible Pen extension
 * Color: #0FBD8C (Emerald Green)
 */

export const penExtension = {
  id: 'pen',
  name: 'Pen',
  color: '#0FBD8C',
  icon: 'pen-tool',
  version: '1.0.0',
  author: 'TechyGuide',
  description: 'Draw with your sprites.',
  tag: 'Scratch Extension',
  available: true,

  blocks: [
    {
      type: 'pen_clear',
      message0: 'erase all',
      previousStatement: null,
      nextStatement: null,
      colour: '#0FBD8C',
      tooltip: 'Clear all pen marks from the stage.',
    },
    {
      type: 'pen_stamp',
      message0: 'stamp',
      previousStatement: null,
      nextStatement: null,
      colour: '#0FBD8C',
      tooltip: 'Stamp the sprite onto the canvas.',
    },
    {
      type: 'pen_down',
      message0: 'pen down',
      previousStatement: null,
      nextStatement: null,
      colour: '#0FBD8C',
      tooltip: 'Put the pen down so the sprite draws as it moves.',
    },
    {
      type: 'pen_up',
      message0: 'pen up',
      previousStatement: null,
      nextStatement: null,
      colour: '#0FBD8C',
      tooltip: 'Lift the pen up so the sprite stops drawing.',
    },
    {
      type: 'pen_set_color',
      message0: 'set pen color to %1',
      args0: [
        { type: 'field_colour', name: 'COLOR', colour: '#4C97FF' },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#0FBD8C',
      tooltip: 'Set the pen color.',
    },
    {
      type: 'pen_change_color_param',
      message0: 'change pen %1 by %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'PARAM',
          options: [
            ['color', 'COLOR'],
            ['saturation', 'SATURATION'],
            ['brightness', 'BRIGHTNESS'],
            ['transparency', 'TRANSPARENCY'],
          ],
        },
        { type: 'input_value', name: 'VALUE', check: 'Number' },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#0FBD8C',
      tooltip: 'Change a pen color property.',
    },
    {
      type: 'pen_set_color_param',
      message0: 'set pen %1 to %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'PARAM',
          options: [
            ['color', 'COLOR'],
            ['saturation', 'SATURATION'],
            ['brightness', 'BRIGHTNESS'],
            ['transparency', 'TRANSPARENCY'],
          ],
        },
        { type: 'input_value', name: 'VALUE', check: 'Number' },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#0FBD8C',
      tooltip: 'Set a pen color property.',
    },
    {
      type: 'pen_change_size',
      message0: 'change pen size by %1',
      args0: [
        { type: 'input_value', name: 'SIZE', check: 'Number' },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#0FBD8C',
      tooltip: 'Change the pen size by an amount.',
    },
    {
      type: 'pen_set_size',
      message0: 'set pen size to %1',
      args0: [
        { type: 'input_value', name: 'SIZE', check: 'Number' },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#0FBD8C',
      tooltip: 'Set the pen size.',
    },
  ],

  toolbox: [
    { kind: 'block', type: 'pen_clear' },
    { kind: 'block', type: 'pen_stamp' },
    { kind: 'sep', gap: '20' },
    { kind: 'block', type: 'pen_down' },
    { kind: 'block', type: 'pen_up' },
    { kind: 'sep', gap: '20' },
    { kind: 'block', type: 'pen_set_color' },
    {
      kind: 'block',
      type: 'pen_change_color_param',
      inputs: {
        VALUE: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
      },
    },
    {
      kind: 'block',
      type: 'pen_set_color_param',
      inputs: {
        VALUE: { shadow: { type: 'math_number', fields: { NUM: 50 } } },
      },
    },
    { kind: 'sep', gap: '20' },
    {
      kind: 'block',
      type: 'pen_change_size',
      inputs: {
        SIZE: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
      },
    },
    {
      kind: 'block',
      type: 'pen_set_size',
      inputs: {
        SIZE: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
      },
    },
  ],
};
