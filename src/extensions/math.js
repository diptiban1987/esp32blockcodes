/**
 * Math Extension — adds useful math helpers as reporter blocks:
 * clamp, lerp, map, distance, easing functions, random booleans, etc.
 */

const EASING = {
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => 1 - (1 - t) * (1 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
};

export const mathExtension = {
  id: 'math',
  name: 'Math+',
  color: '#FF9500',
  version: '1.0.0',
  author: 'TechyGuide',
  description: 'Extra math reporters: clamp, lerp, map, easing, random booleans, π, e.',

  blocks: [
    {
      type: 'math_clamp',
      message0: 'clamp %1 min %2 max %3',
      args0: [
        { type: 'input_value', name: 'VAL', check: 'Number' },
        { type: 'input_value', name: 'MIN', check: 'Number' },
        { type: 'input_value', name: 'MAX', check: 'Number' },
      ],
      output: 'Number',
      colour: '#FF9500',
      tooltip: 'Restrict a value to the [min, max] range.',
    },
    {
      type: 'math_lerp',
      message0: 'lerp %1 to %2 by %3',
      args0: [
        { type: 'input_value', name: 'A', check: 'Number' },
        { type: 'input_value', name: 'B', check: 'Number' },
        { type: 'input_value', name: 'T', check: 'Number' },
      ],
      output: 'Number',
      colour: '#FF9500',
      tooltip: 'Linearly interpolate between A and B by factor T (0..1).',
    },
    {
      type: 'math_map',
      message0: 'map %1 from [%2, %3] to [%4, %5]',
      args0: [
        { type: 'input_value', name: 'VAL', check: 'Number' },
        { type: 'input_value', name: 'IN_MIN', check: 'Number' },
        { type: 'input_value', name: 'IN_MAX', check: 'Number' },
        { type: 'input_value', name: 'OUT_MIN', check: 'Number' },
        { type: 'input_value', name: 'OUT_MAX', check: 'Number' },
      ],
      output: 'Number',
      colour: '#FF9500',
      tooltip: 'Re-map a number from one range to another.',
    },
    {
      type: 'math_distance',
      message0: 'distance x1 %1 y1 %2 x2 %3 y2 %4',
      args0: [
        { type: 'input_value', name: 'X1', check: 'Number' },
        { type: 'input_value', name: 'Y1', check: 'Number' },
        { type: 'input_value', name: 'X2', check: 'Number' },
        { type: 'input_value', name: 'Y2', check: 'Number' },
      ],
      output: 'Number',
      colour: '#FF9500',
      tooltip: 'Euclidean distance between two points.',
    },
    {
      type: 'math_ease',
      message0: 'ease %1 t %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'FUNC',
          options: [
            ['linear', 'linear'],
            ['easeInQuad', 'easeInQuad'],
            ['easeOutQuad', 'easeOutQuad'],
            ['easeInOutQuad', 'easeInOutQuad'],
            ['easeInCubic', 'easeInCubic'],
            ['easeOutCubic', 'easeOutCubic'],
            ['easeInOutCubic', 'easeInOutCubic'],
          ],
        },
        { type: 'input_value', name: 'T', check: 'Number' },
      ],
      output: 'Number',
      colour: '#FF9500',
      tooltip: 'Apply an easing function (t should be 0..1).',
    },
    {
      type: 'math_random_bool',
      message0: 'random true/false with chance %1 %',
      args0: [{ type: 'input_value', name: 'PCT', check: 'Number' }],
      output: 'Boolean',
      colour: '#FF9500',
      tooltip: 'Randomly returns true with the given percentage chance (0..100).',
    },
    {
      type: 'math_pi',
      message0: 'π',
      output: 'Number',
      colour: '#FF9500',
      tooltip: 'The mathematical constant π (~3.14159).',
    },
    {
      type: 'math_e',
      message0: 'e',
      output: 'Number',
      colour: '#FF9500',
      tooltip: 'Euler\'s number (~2.71828).',
    },
    {
      type: 'math_deg_to_rad',
      message0: 'degrees %1 to radians',
      args0: [{ type: 'input_value', name: 'DEG', check: 'Number' }],
      output: 'Number',
      colour: '#FF9500',
    },
    {
      type: 'math_rad_to_deg',
      message0: 'radians %1 to degrees',
      args0: [{ type: 'input_value', name: 'RAD', check: 'Number' }],
      output: 'Number',
      colour: '#FF9500',
    },
  ],

  toolbox: [
    { kind: 'block', type: 'math_clamp' },
    { kind: 'block', type: 'math_lerp' },
    { kind: 'block', type: 'math_map' },
    { kind: 'block', type: 'math_distance' },
    { kind: 'block', type: 'math_ease' },
    { kind: 'block', type: 'math_random_bool' },
    { kind: 'block', type: 'math_pi' },
    { kind: 'block', type: 'math_e' },
    { kind: 'block', type: 'math_deg_to_rad' },
    { kind: 'block', type: 'math_rad_to_deg' },
  ],

  // Reporter blocks don't have runtime methods — they're handled by
  // an output-value resolver. The interpreter's _evalValue already
  // handles regular shadow-only reporter blocks fine, but these need
  // custom evaluation. We'll provide them via a small adapter below.
  runtime: {
    methods: {},
    reporter: {
      math_pi() {
        return Math.PI;
      },
      math_e() {
        return Math.E;
      },
      math_clamp(block, ctx) {
        const v = Number(ctx.interpreter._evalValue(block, 'VAL', 0));
        const lo = Number(ctx.interpreter._evalValue(block, 'MIN', 0));
        const hi = Number(ctx.interpreter._evalValue(block, 'MAX', 1));
        return Math.max(lo, Math.min(hi, v));
      },
      math_lerp(block, ctx) {
        const a = Number(ctx.interpreter._evalValue(block, 'A', 0));
        const b = Number(ctx.interpreter._evalValue(block, 'B', 1));
        const t = Number(ctx.interpreter._evalValue(block, 'T', 0));
        return a + (b - a) * t;
      },
      math_map(block, ctx) {
        const v = Number(ctx.interpreter._evalValue(block, 'VAL', 0));
        const i0 = Number(ctx.interpreter._evalValue(block, 'IN_MIN', 0));
        const i1 = Number(ctx.interpreter._evalValue(block, 'IN_MAX', 1));
        const o0 = Number(ctx.interpreter._evalValue(block, 'OUT_MIN', 0));
        const o1 = Number(ctx.interpreter._evalValue(block, 'OUT_MAX', 1));
        if (i1 === i0) return o0;
        return o0 + ((v - i0) * (o1 - o0)) / (i1 - i0);
      },
      math_distance(block, ctx) {
        const x1 = Number(ctx.interpreter._evalValue(block, 'X1', 0));
        const y1 = Number(ctx.interpreter._evalValue(block, 'Y1', 0));
        const x2 = Number(ctx.interpreter._evalValue(block, 'X2', 0));
        const y2 = Number(ctx.interpreter._evalValue(block, 'Y2', 0));
        return Math.hypot(x2 - x1, y2 - y1);
      },
      math_ease(block, ctx) {
        const fn = EASING[block.getFieldValue('FUNC') || 'linear'] || EASING.linear;
        const t = Number(ctx.interpreter._evalValue(block, 'T', 0));
        return fn(Math.max(0, Math.min(1, t)));
      },
      math_random_bool(block, ctx) {
        const pct = Number(ctx.interpreter._evalValue(block, 'PCT', 50));
        return Math.random() * 100 < pct;
      },
      math_deg_to_rad(block, ctx) {
        return (Number(ctx.interpreter._evalValue(block, 'DEG', 0)) * Math.PI) / 180;
      },
      math_rad_to_deg(block, ctx) {
        return (Number(ctx.interpreter._evalValue(block, 'RAD', 0)) * 180) / Math.PI;
      },
    },
  },

  generator: {
    language: 'arduino',
    fn(block) {
      return `// math helper: ${block.type}\n`;
    },
  },
};
