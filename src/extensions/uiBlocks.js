/**
 * UI Blocks Extension — adds in-app dialogs, notifications, console output,
 * prompts and confirmations that work inside the TechyBlocks runtime.
 */

export const uiBlocksExtension = {
  id: 'ui',
  name: 'UI',
  color: '#5856D6',
  version: '1.0.0',
  author: 'TechyGuide',
  description: 'Show dialogs, toasts, prompts and log messages from your project.',

  blocks: [
    {
      type: 'ui_show_toast',
      message0: 'show toast %1',
      args0: [{ type: 'input_value', name: 'TEXT', check: 'String' }],
      previousStatement: null,
      nextStatement: null,
      colour: '#5856D6',
      tooltip: 'Display a small floating notification at the top of the screen.',
    },
    {
      type: 'ui_log',
      message0: 'log %1',
      args0: [{ type: 'input_value', name: 'TEXT', check: null }],
      previousStatement: null,
      nextStatement: null,
      colour: '#5856D6',
      tooltip: 'Print a message to the browser console (open DevTools to see).',
    },
    {
      type: 'ui_prompt',
      message0: 'prompt %1 with default %2',
      args0: [
        { type: 'input_value', name: 'QUESTION', check: 'String' },
        { type: 'input_value', name: 'DEFAULT', check: 'String' },
      ],
      output: 'String',
      colour: '#5856D6',
      tooltip: 'Show a text input prompt and return what the user types.',
    },
    {
      type: 'ui_confirm',
      message0: 'confirm %1',
      args0: [{ type: 'input_value', name: 'QUESTION', check: 'String' }],
      output: 'Boolean',
      colour: '#5856D6',
      tooltip: 'Show an OK/Cancel dialog. Returns true if OK is clicked.',
    },
    {
      type: 'ui_set_title',
      message0: 'set page title to %1',
      args0: [{ type: 'input_value', name: 'TEXT', check: 'String' }],
      previousStatement: null,
      nextStatement: null,
      colour: '#5856D6',
      tooltip: 'Change the browser tab title.',
    },
  ],

  toolbox: [
    { kind: 'block', type: 'ui_show_toast' },
    { kind: 'block', type: 'ui_log' },
    { kind: 'block', type: 'ui_prompt' },
    { kind: 'block', type: 'ui_confirm' },
    { kind: 'block', type: 'ui_set_title' },
  ],

  runtime: {
    methods: {
      ui_show_toast(block, ctx) {
        const text = ctx.interpreter._evalValue
          ? ctx.interpreter._evalValue(block, 'TEXT', '')
          : '';
        const fn = (typeof window !== 'undefined' && window.__showToast) || ((m) => console.log('[toast]', m));
        fn(String(text));
      },
      ui_log(block, ctx) {
        const text = ctx.interpreter._evalValue
          ? ctx.interpreter._evalValue(block, 'TEXT', '')
          : '';
        console.log('[TechyBlocks]', text);
      },
      async ui_prompt(block, ctx) {
        const q = ctx.interpreter._evalValue(block, 'QUESTION', '');
        const d = ctx.interpreter._evalValue(block, 'DEFAULT', '');
        const ans = window.prompt(String(q), String(d));
        ctx.interpreter.answer = ans == null ? '' : String(ans);
        await ctx.interpreter._yieldFrame?.();
      },
      async ui_confirm(block, ctx) {
        const q = ctx.interpreter._evalValue(block, 'QUESTION', '');
        const ok = window.confirm(String(q));
        // Stash result on a transient property; the reporter block reads it.
        ctx.interpreter._lastConfirm = !!ok;
        await ctx.interpreter._yieldFrame?.();
      },
      ui_set_title(block, ctx) {
        const text = ctx.interpreter._evalValue(block, 'TEXT', '');
        document.title = String(text);
      },
    },
  },

  generator: {
    language: 'arduino',
    fn(block) {
      const text = block.getFieldValue('TEXT') || '""';
      switch (block.type) {
        case 'ui_show_toast': return `// toast: ${text}\n`;
        case 'ui_log':        return `Serial.println(${text});\n`;
        case 'ui_set_title':  return `// set title: ${text}\n`;
        default:              return '';
      }
    },
  },
};
