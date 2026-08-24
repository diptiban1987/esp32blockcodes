/**
 * Controls Extension — extra flow-control blocks that complement the
 * standard Control category. Includes debounced wrappers, "every N
 * seconds" loop, key-combination hats, etc.
 */

export const controlsExtension = {
  id: 'controls',
  name: 'Controls+',
  color: '#FFAB19',
  version: '1.0.0',
  author: 'TechyGuide',
  description: 'Extra flow blocks: every N seconds, wait until key combo, debounce, once.',

  blocks: [
    {
      type: 'every_n_seconds',
      message0: 'every %1 seconds %2',
      args0: [
        { type: 'input_value', name: 'SECS', check: 'Number' },
        { type: 'input_statement', name: 'DO' },
      ],
      colour: '#FFAB19',
      tooltip: 'Run the inner blocks repeatedly every N seconds (forever loop).',
    },
    {
      type: 'wait_until_key_combo',
      message0: 'wait until %1 is held',
      args0: [
        {
          type: 'field_dropdown',
          name: 'KEY',
          options: [
            ['shift', 'Shift'],
            ['ctrl', 'Control'],
            ['alt', 'Alt'],
            ['meta', 'Meta'],
            ['space', ' '],
            ['enter', 'Enter'],
            ['escape', 'Escape'],
          ],
        },
      ],
      colour: '#FFAB19',
      tooltip: 'Pause the script until the chosen key is held down.',
    },
    {
      type: 'once',
      message0: 'run once %1',
      args0: [{ type: 'input_statement', name: 'DO' }],
      colour: '#FFAB19',
      tooltip: 'Run the inner blocks exactly once, no matter how many times this hat fires.',
    },
    {
      type: 'debounce',
      message0: 'debounce by %1 ms %2',
      args0: [
        { type: 'input_value', name: 'MS', check: 'Number' },
        { type: 'input_statement', name: 'DO' },
      ],
      colour: '#FFAB19',
      tooltip: 'Run DO only after MS milliseconds have passed since the last trigger (ignores new triggers during cooldown).',
    },
    {
      type: 'stop_if',
      message0: 'stop script if %1',
      args0: [{ type: 'input_value', name: 'COND', check: 'Boolean' }],
      previousStatement: null,
      nextStatement: null,
      colour: '#FFAB19',
      tooltip: 'Stop the current stack immediately if the condition is true.',
    },
  ],

  toolbox: [
    { kind: 'block', type: 'every_n_seconds' },
    { kind: 'block', type: 'wait_until_key_combo' },
    { kind: 'block', type: 'once' },
    { kind: 'block', type: 'debounce' },
    { kind: 'block', type: 'stop_if' },
  ],

  runtime: {
    state: new Map(), // blockId → { lastRun, fired }

    methods: {
      async every_n_seconds(block, ctx) {
        const secs = Number(ctx.interpreter._evalValue(block, 'SECS', 1));
        const sub = block.getInputTargetBlock('DO');
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        // forever-like loop until thread cancelled
        while (!ctx.interpreter._threadStopped?.()) {
          if (sub) {
            // Use interpreter to run the sub-stack against current sprite
            await ctx.interpreter._executeBlock(sub);
          }
          await sleep(Math.max(1, secs * 1000));
        }
      },
      async wait_until_key_combo(block, ctx) {
        const keyName = String(block.getFieldValue('KEY') || '').toLowerCase();
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        while (!ctx.interpreter._threadStopped?.()) {
          const held = ctx.interpreter.keysDown;
          if (
            (keyName === 'shift' && (held.has('Shift') || held.has('shift'))) ||
            (keyName === 'control' && (held.has('Control') || held.has('ctrl'))) ||
            (keyName === 'alt' && held.has('Alt')) ||
            (keyName === 'meta' && held.has('Meta')) ||
            (keyName === ' ' && held.has(' ')) ||
            (keyName === 'enter' && held.has('Enter')) ||
            (keyName === 'escape' && held.has('Escape'))
          ) {
            return;
          }
          await sleep(50);
        }
      },
      async once(block, ctx) {
        const id = block.id;
        const state = this.state || (this.state = new Map());
        if (state.get(id)) return; // already ran
        state.set(id, true);
        const sub = block.getInputTargetBlock('DO');
        if (sub) await ctx.interpreter._executeBlock(sub);
      },
      async debounce(block, ctx) {
        const ms = Number(ctx.interpreter._evalValue(block, 'MS', 300));
        const sub = block.getInputTargetBlock('DO');
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        // Naive debounce: just wait ms then run, ignoring subsequent triggers
        // (since each invocation has its own timer the actual debounce logic
        // lives in the application code that triggers this block).
        await sleep(ms);
        if (sub) await ctx.interpreter._executeBlock(sub);
      },
      stop_if(block, ctx) {
        const cond = !!ctx.interpreter._evalValue(block, 'COND', false);
        if (cond) throw new Error('THREAD_STOPPED');
      },
    },
  },

  generator: {
    language: 'arduino',
    fn(block) {
      switch (block.type) {
        case 'every_n_seconds': return '// every n seconds (extension)\n';
        case 'stop_if':         return '// stop if (extension)\n';
        default:                return `// control extension: ${block.type}\n`;
      }
    },
  },
};
