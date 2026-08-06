// Compare stage block types vs BlockInterpreter cases AND reporter evaluation
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const stageFiles = ['motionBlocks','looksBlocks','eventBlocks','controlBlocks','sensingBlocks','soundBlocks']
  .map(n => path.join(root,'src','blocks',n+'.js'));
const typeRe = /\btype\s*:\s*["']([a-z_0-9]+)["']/g;
const defined = new Set();
for (const f of stageFiles) {
  const src = fs.readFileSync(f,'utf8');
  let m; while ((m = typeRe.exec(src))) defined.add(m[1]);
}

const interp = fs.readFileSync(path.join(root,'src','engine','BlockInterpreter.js'),'utf8');
const caseRe = /case\s+['"]([a-z_0-9]+)['"]/g;
const cases = new Set();
let m; while ((m = caseRe.exec(interp))) cases.add(m[1]);

console.log('STAGE BLOCK TYPES:', defined.size);
console.log('INTERPRETER CASES:', cases.size);
console.log('\n=== DEFINED STAGE BLOCKS WITH NO INTERPRETER CASE ===');
const missing = [...defined].filter(t => !cases.has(t));
if (!missing.length) console.log('(none)');
missing.forEach(t => console.log(' ', t));

// Also: any interpreter case for a block that's never defined?
console.log('\n=== INTERPRETER CASES FOR UNDEFINED BLOCKS (stale) ===');
const stale = [...cases].filter(t => !defined.has(t) && !/^(controls_|logic_|math_|text|lists_|variables_|colour_)/.test(t));
if (!stale.length) console.log('(none)');
stale.forEach(t => console.log(' ', t));
