// For each generator handler, ensure every getFieldValue("X") and valueToCode(block, "X") name
// exists in the block definition's fields/inputs.
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

// Parse block definitions: capture the object literal per block via createBlockDefinitionsFromJsonArray
// Simpler: for each blocks file, associate types with the whole file's field/input names only when
// the file defines exactly one type. For multi-type files we match per-object via brace tracking.
const blockFiles = walk(path.join(root, 'src', 'blocks'));
const blockInfo = new Map(); // type -> { fields:Set, inputs:Set }

function extractObjectAt(src, startIdx) {
  // startIdx = index of '{'
  let depth = 0, i = startIdx, inStr = false, strCh = '';
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === strCh && src[i - 1] !== '\\') inStr = false;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = true; strCh = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return src.slice(startIdx, i + 1); }
  }
  return null;
}

for (const f of blockFiles) {
  const src = fs.readFileSync(f, 'utf8');
  const typeRe = /\btype\s*:\s*["']([A-Za-z0-9_]+)["']/g;
  let m;
  while ((m = typeRe.exec(src))) {
    const t = m[1];
    // find enclosing object: scan backwards to '{' then forward-match braces
    let s = src.lastIndexOf('{', m.index);
    // walk back until we find a '{' whose forward match contains this type at depth 1
    while (s >= 0) {
      const obj = extractObjectAt(src, s);
      if (obj && obj.indexOf(src.slice(m.index, m.index + m[0].length)) !== -1) {
        // confirm this object's first `type:` is ours
        const firstType = obj.match(/\btype\s*:\s*["']([A-Za-z0-9_]+)["']/);
        if (firstType && firstType[1] === t) {
          // collect names
          const fields = new Set();
          const inputs = new Set();
          const fieldRe = /\bname\s*:\s*["']([A-Z0-9_]+)["']/g;
          let fm; while ((fm = fieldRe.exec(obj))) fields.add(fm[1]);
          const INPUT_KINDS = ['input_value','input_statement','input_dummy','end_row'];
          const inputRe = /\btype\s*:\s*["'](input_value|input_statement|input_dummy|end_row)["']\s*,\s*name\s*:\s*["']([A-Z0-9_]+)["']/g;
          let im; while ((im = inputRe.exec(obj))) inputs.add(im[2]);
          // ALSO inline (no explicit type) args named names are fields (dropdown/input/number etc.)
          blockInfo.set(t, { fields, inputs, file: path.relative(root, f) });
          break;
        }
      }
      s = src.lastIndexOf('{', s - 1);
    }
  }
}

// Parse generators: for each forBlock["t"] handler, collect getFieldValue/getTitleValue + valueToCode names
const genFiles = walk(path.join(root, 'src', 'generators'));
const handlerRe = /forBlock\[["']([A-Za-z0-9_]+)["']\]\s*=\s*function/g;
const problems = [];
for (const f of genFiles) {
  const src = fs.readFileSync(f, 'utf8');
  const rel = path.relative(root, f);
  let m;
  while ((m = handlerRe.exec(src))) {
    const t = m[1];
    // extract function body
    const braceStart = src.indexOf('{', m.index + m[0].length);
    const body = extractObjectAt(src, braceStart) || '';
    const info = blockInfo.get(t);
    if (!info) continue; // defined elsewhere / builtin
    const used = new Set();
    let u;
    const gfv = /(?:getFieldValue|getTitleValue)\s*\(\s*["']([A-Z0-9_]+)["']\s*\)/g;
    while ((u = gfv.exec(body))) used.add(u[1]);
    const vtc = /valueToCode\(\s*block\s*,\s*["']([A-Z0-9_]+)["']/g;
    while ((u = vtc.exec(body))) used.add(u[1]);
    const stc = /statementToCode\(\s*block\s*,\s*["']([A-Z0-9_]+)["']/g;
    while ((u = stc.exec(body))) used.add(u[1]);
    for (const name of used) {
      if (!info.fields.has(name)) {
        problems.push({ block: t, name, gen: rel, def: info.file });
      }
    }
  }
}

console.log('=== FIELD/INPUT NAME MISMATCHES (generator uses a name the block does NOT define) ===');
if (!problems.length) console.log('(none)');
for (const p of problems) {
  console.log(`${p.block}: uses "${p.name}" in [${p.gen}] but ${p.def} does not define it`);
}
console.log('TOTAL:', problems.length);
