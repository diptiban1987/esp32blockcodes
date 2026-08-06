// Cross-check block types defined vs generators registered vs toolbox usage
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

function walk(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walk(p));
    else if (e.name.endsWith('.js')) out.push(p);
  }
  return out;
}

// 1. Extract defined block types from blocks files
const blockFiles = walk(path.join(root, 'src', 'blocks'));
const SKIP = /^(type|input_value|input_statement|input_dummy|end_row|field_dropdown|field_input|field_number|field_checkbox|field_colour|field_angle|field_variable|field_image)$/;
const typeRe = /^[ \t]*type\s*:\s*["'`]([A-Za-z0-9_]+)["'`]/gm;
const defineBlockRe = /Blockly\.defineBlocksWithJsonArray|defineBlocksWithJsonArray/g;
const defined = new Map(); // type -> file
const dupes = [];
for (const f of blockFiles) {
  const src = fs.readFileSync(f, 'utf8');
  let m;
  while ((m = typeRe.exec(src))) {
    const t = m[1];
    if (SKIP.test(t)) continue;
    if (defined.has(t)) dupes.push([t, defined.get(t), f]);
    defined.set(t, f);
  }
}

// 1b. Extract block types created via Blockly.Blocks['name'] = {...} style
const blocksDotRe = /Blockly\.Blocks\[["'`]([A-Za-z0-9_]+)["'`]\]/g;
for (const f of blockFiles) {
  const src = fs.readFileSync(f, 'utf8');
  let m;
  while ((m = blocksDotRe.exec(src))) {
    const t = m[1];
    if (SKIP.test(t)) continue;
    if (defined.has(t)) dupes.push([t, defined.get(t), f]);
    defined.set(t, f);
  }
}

// 2. Extract block types handled by generators — bracket assignments forBlock["x"] = ...
const genFiles = walk(path.join(root, 'src', 'generators'));
const genHandled = new Map(); // type -> [files]
const bracketRe = /forBlock\[["'`]([A-Za-z0-9_]+)["'`]\]\s*=/g;
const fallbackGenTypes = [];
for (const f of genFiles) {
  const src = fs.readFileSync(f, 'utf8');
  const rel = path.relative(root, f);
  let m;
  while ((m = bracketRe.exec(src))) {
    if (!genHandled.has(m[1])) genHandled.set(m[1], []);
    genHandled.get(m[1]).push(rel);
  }
  // fallbackGen builds handlers programmatically from lists — extract quoted entries & object keys
  if (/fallbackGen\.js$/.test(f)) {
    const q = /["'`]([a-z][A-Za-z0-9_]*)["'`]\s*,/g;
    let qm; while ((qm = q.exec(src))) fallbackGenTypes.push(qm[1]);
    const kv = /^\s*([a-z][A-Za-z0-9_]*)\s*:\s*\[/gm;
    let km; while ((km = kv.exec(src))) fallbackGenTypes.push(km[1]);
    const kv2 = /^\s*"([a-z][A-Za-z0-9_]*)"\s*,?\s*(?:\/\/|$)/gm;
    let k2; while ((k2 = kv2.exec(src))) fallbackGenTypes.push(k2[1]);
  }
}
for (const t of fallbackGenTypes) {
  if (!genHandled.has(t)) genHandled.set(t, ['fallbackGen(list)']);
}

// ── Arduino handlers: files under generators/esp32/arduino/** + arduinoControlGen + fallback arduinoForBlock ──
const ardHandled = new Map();
for (const f of genFiles) {
  const src = fs.readFileSync(f, 'utf8');
  const rel = path.relative(root, f);
  const isArdDir = /generators[\\/]esp32[\\/]arduino[\\/]/.test(rel) || /arduinoControlGen\.js$/.test(rel);
  if (isArdDir) {
    let m;
    const re = /forBlock\[["'`]([A-Za-z0-9_]+)["'`]\]\s*=/g;
    while ((m = re.exec(src))) {
      if (!ardHandled.has(m[1])) ardHandled.set(m[1], []);
      ardHandled.get(m[1]).push(rel);
    }
  }
  let am;
  const are = /arduinoForBlock\[["'`]([A-Za-z0-9_]+)["'`]\]\s*=/g;
  while ((am = are.exec(src))) {
    if (!ardHandled.has(am[1])) ardHandled.set(am[1], []);
    ardHandled.get(am[1]).push(rel);
  }
}
// fallback list entries count for arduino too
for (const t of fallbackGenTypes) {
  if (!ardHandled.has(t)) ardHandled.set(t, ['fallbackGen(list)']);
}

// 3. Toolbox types
const toolboxSrc = fs.readFileSync(path.join(root, 'src', 'toolbox.js'), 'utf8');
const scratchTbSrc = fs.readFileSync(path.join(root, 'src', 'scratchToolbox.js'), 'utf8');
const tbTypeRe = /^[ \t]*type\s*:\s*["'`]([A-Za-z0-9_]+)["'`]/gm;
const tbTypes = new Set();
let m;
while ((m = tbTypeRe.exec(toolboxSrc))) tbTypes.add(m[1]);
while ((m = tbTypeRe.exec(scratchTbSrc))) tbTypes.add(m[1]);

// Blockly built-ins used in toolbox (no custom definition needed)
const builtinRe = /^(logic_|controls_|math_|text|lists_|variables_|procedures_|colour_)/;

// 4. Reports
console.log('=== TOTAL DEFINED BLOCK TYPES:', defined.size, '===');
console.log('\n=== DUPLICATE DEFINITIONS ===');
if (!dupes.length) console.log('(none)');
dupes.forEach(([t, a, b]) => console.log(`${t}: ${path.relative(root, a)} AND ${path.relative(root, b)}`));

console.log('\n=== DEFINED BLOCKS WITH NO PYTHON/JS GENERATOR HANDLER ===');
const noGen = [];
for (const [t, f] of defined) {
  if (!genHandled.has(t)) noGen.push([t, path.relative(root, f)]);
}
if (!noGen.length) console.log('(none)');
noGen.forEach(([t, f]) => console.log(`${t}  (${f})`));

console.log('\n=== DEFINED BLOCKS WITH NO ARDUINO GENERATOR HANDLER ===');
const noArd = [];
for (const [t, f] of defined) {
  if (!ardHandled.has(t)) noArd.push([t, path.relative(root, f)]);
}
if (!noArd.length) console.log('(none)');
noArd.forEach(([t, f]) => console.log(`${t}  (${f})`));

console.log('\n=== TOOLBOX BLOCKS NOT DEFINED & NOT BUILTIN ===');
const missing = [];
for (const t of tbTypes) {
  if (!defined.has(t) && !builtinRe.test(t) && t !== 'variables' && t !== 'procedures') missing.push(t);
}
if (!missing.length) console.log('(none)');
missing.forEach(t => console.log(t));

console.log('\n=== GENERATORS FOR UNDEFINED BLOCKS (stale handlers) ===');
const stale = [];
for (const [t, files] of genHandled) {
  if (!defined.has(t) && !builtinRe.test(t)) stale.push([t, files.join(', ')]);
}
if (!stale.length) console.log('(none)');
stale.forEach(([t, f]) => console.log(`${t}  (${f})`));
