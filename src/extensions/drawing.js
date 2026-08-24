/**
 * Drawing Extension — lets projects draw shapes directly on the stage
 * canvas (overlaid on the sprite layer). Supports rectangles, circles,
 * lines, and clear. Uses Pixi.js Graphics if available, falls back to
 * an HTML5 canvas overlay otherwise.
 */

let _overlay = null;
let _ctx = null;

function ensureOverlay() {
  if (_overlay && _ctx) return _ctx;
  if (typeof document === 'undefined') return null;
  const host = document.getElementById('stageCanvas') || document.getElementById('stageContainer');
  if (!host) return null;
  // Find the actual <canvas> inside the host — Pixi renders into one.
  const canvas = host.querySelector('canvas') || host;
  if (!(canvas instanceof HTMLCanvasElement)) return null;
  // Create an overlay canvas on top, sized to the visible area.
  const overlay = document.createElement('canvas');
  overlay.id = 'tbDrawingOverlay';
  overlay.style.position = 'absolute';
  overlay.style.left = '0';
  overlay.style.top = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.pointerEvents = 'none';
  overlay.style.zIndex = '5';
  // Match size of inner canvas
  overlay.width = canvas.clientWidth || 480;
  overlay.height = canvas.clientHeight || 360;
  if (getComputedStyle(host).position === 'static') {
    host.style.position = 'relative';
  }
  host.appendChild(overlay);
  _overlay = overlay;
  _ctx = overlay.getContext('2d');
  return _ctx;
}

function stageToOverlay(cx, cy, ctx) {
  if (!_overlay) return { x: 0, y: 0 };
  // Stage uses sprite coordinates (x: -240..240, y: -180..180).
  // Map to overlay pixel coordinates.
  const w = _overlay.width;
  const h = _overlay.height;
  return {
    x: ((cx + 240) / 480) * w,
    y: ((180 - cy) / 360) * h,
  };
}

export const drawingExtension = {
  id: 'drawing',
  name: 'Drawing',
  color: '#E91E63',
  version: '1.0.0',
  author: 'TechyGuide',
  description: 'Draw lines, rectangles, and circles directly on the stage.',

  blocks: [
    {
      type: 'draw_clear',
      message0: 'clear drawings',
      previousStatement: null,
      nextStatement: null,
      colour: '#E91E63',
      tooltip: 'Clear all drawings on the stage.',
    },
    {
      type: 'draw_line',
      message0: 'draw line from x %1 y %2 to x %3 y %4 color %5 width %6',
      args0: [
        { type: 'input_value', name: 'X1', check: 'Number' },
        { type: 'input_value', name: 'Y1', check: 'Number' },
        { type: 'input_value', name: 'X2', check: 'Number' },
        { type: 'input_value', name: 'Y2', check: 'Number' },
        { type: 'input_value', name: 'COLOR', check: 'String' },
        { type: 'input_value', name: 'WIDTH', check: 'Number' },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#E91E63',
      tooltip: 'Draw a line between two stage-coordinate points.',
    },
    {
      type: 'draw_rect',
      message0: 'draw rect x %1 y %2 width %3 height %4 color %5',
      args0: [
        { type: 'input_value', name: 'X', check: 'Number' },
        { type: 'input_value', name: 'Y', check: 'Number' },
        { type: 'input_value', name: 'W', check: 'Number' },
        { type: 'input_value', name: 'H', check: 'Number' },
        { type: 'input_value', name: 'COLOR', check: 'String' },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#E91E63',
      tooltip: 'Draw a filled rectangle (stage coordinates).',
    },
    {
      type: 'draw_circle',
      message0: 'draw circle at x %1 y %2 radius %3 color %4',
      args0: [
        { type: 'input_value', name: 'X', check: 'Number' },
        { type: 'input_value', name: 'Y', check: 'Number' },
        { type: 'input_value', name: 'R', check: 'Number' },
        { type: 'input_value', name: 'COLOR', check: 'String' },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: '#E91E63',
      tooltip: 'Draw a filled circle (stage coordinates).',
    },
  ],

  toolbox: [
    { kind: 'block', type: 'draw_clear' },
    { kind: 'block', type: 'draw_line' },
    { kind: 'block', type: 'draw_rect' },
    { kind: 'block', type: 'draw_circle' },
  ],

  runtime: {
    methods: {
      draw_clear(block, ctx) {
        const c = ensureOverlay();
        if (c && _overlay) c.clearRect(0, 0, _overlay.width, _overlay.height);
      },
      draw_line(block, ctx) {
        const c = ensureOverlay();
        if (!c || !_overlay) return;
        const x1 = Number(ctx.interpreter._evalValue(block, 'X1', 0));
        const y1 = Number(ctx.interpreter._evalValue(block, 'Y1', 0));
        const x2 = Number(ctx.interpreter._evalValue(block, 'X2', 0));
        const y2 = Number(ctx.interpreter._evalValue(block, 'Y2', 0));
        const color = String(ctx.interpreter._evalValue(block, 'COLOR', '#000000'));
        const width = Number(ctx.interpreter._evalValue(block, 'WIDTH', 2));
        const p1 = stageToOverlay(x1, y1, c);
        const p2 = stageToOverlay(x2, y2, c);
        c.strokeStyle = color;
        c.lineWidth = width;
        c.beginPath();
        c.moveTo(p1.x, p1.y);
        c.lineTo(p2.x, p2.y);
        c.stroke();
      },
      draw_rect(block, ctx) {
        const c = ensureOverlay();
        if (!c || !_overlay) return;
        const x = Number(ctx.interpreter._evalValue(block, 'X', 0));
        const y = Number(ctx.interpreter._evalValue(block, 'Y', 0));
        const w = Number(ctx.interpreter._evalValue(block, 'W', 20));
        const h = Number(ctx.interpreter._evalValue(block, 'H', 20));
        const color = String(ctx.interpreter._evalValue(block, 'COLOR', '#000000'));
        const p = stageToOverlay(x, y, c);
        const sx = (w / 480) * _overlay.width;
        const sy = (h / 360) * _overlay.height;
        c.fillStyle = color;
        c.fillRect(p.x - sx / 2, p.y - sy / 2, sx, sy);
      },
      draw_circle(block, ctx) {
        const c = ensureOverlay();
        if (!c || !_overlay) return;
        const x = Number(ctx.interpreter._evalValue(block, 'X', 0));
        const y = Number(ctx.interpreter._evalValue(block, 'Y', 0));
        const r = Number(ctx.interpreter._evalValue(block, 'R', 20));
        const color = String(ctx.interpreter._evalValue(block, 'COLOR', '#000000'));
        const p = stageToOverlay(x, y, c);
        const sr = (r / 240) * (_overlay.width / 2);
        c.fillStyle = color;
        c.beginPath();
        c.arc(p.x, p.y, sr, 0, Math.PI * 2);
        c.fill();
      },
    },
  },

  generator: {
    language: 'arduino',
    fn(block) {
      switch (block.type) {
        case 'draw_clear': return '// drawings cleared\n';
        default:           return `// drawing block (${block.type})\n`;
      }
    },
  },
};
