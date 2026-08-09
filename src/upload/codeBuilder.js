// transforms raw blockly python into clean esp32-ready micropython
const SCAFFOLDING_PATTERNS = [
  /^if\s+False\s*:/,
  /^pass\s*$/,
];

function isScaffolding(line) {
  const t = line.trim();
  return SCAFFOLDING_PATTERNS.some((re) => re.test(t));
}

function isImportLine(line) {
  const t = line.trim();
  return t.startsWith("import ") || t.startsWith("from ");
}

function isFunctionDef(line) {
  // Detect both function and class definitions at top level
  return /^(def|class)\s+\w+/.test(line.trim()) && !line.startsWith(" ");
}

function isPinInit(line) {
  // Classifies hardware initialization lines that should be hoisted above the loop.
  // These run once at startup, not repeatedly in while True:.
  const t = line.trim();
  if (line.startsWith(" ")) return false;

  // Named hardware variable patterns:
  // gpio25 = Pin(25, Pin.OUT), trig_18 = Pin(18, Pin.OUT), echo_27 = Pin(27, Pin.IN), adc_34 = ADC(Pin(34))
  if (/^(trig_|echo_|adc_|pin_|gpio|pwm_|relay_)\w*\s*=/.test(t)) return true;

  // dht_sensor = ..., dht_5 = ... (any dht_ prefix)
  if (/^dht_\w+\s*[.=]/.test(t)) return true;

  // Bare constructor calls without method chaining (e.g., Pin(2, Pin.OUT))
  // But NOT Pin(2, Pin.OUT).value(1) — that's a runtime operation
  if (/^(Pin|PWM|ADC|TouchPad)\s*\(/.test(t) && !t.includes(').')) return true;

  // Generic hardware init: variable = Constructor(...) where Constructor is UpperCamelCase
  // Catches: _i2c_lcd = I2C(...), _lcd = I2cLcd(...), neopixel = NeoPixel(...)
  // Does NOT catch: Temp = read_dht(...) because read_dht starts with lowercase
  if (/^\w+\s*=\s*[A-Z]\w*\s*\(/.test(t)) return true;

  // Module constructor: var = module.Constructor(...)
  // Catches: dht_sensor = dht.DHT11(Pin(5)), bmp = bmp280.BMP280(...)
  if (/^\w+\s*=\s*\w+\.[A-Z]\w*\s*\(/.test(t)) return true;

  return false;
}




function isVarInit(line) {
  // Matches Blockly-generated variable declarations: distance = None, speed = None
  // These should be placed in the setup section, not leak above the loop
  return /^\w+\s*=\s*None\s*$/.test(line.trim()) && !line.startsWith(" ");
}

function hasTopLevelLoop(lines) {
  return lines.some((l) => /^(while|for)\s/.test(l.trim()) && !l.startsWith(" "));
}

export function buildESP32Code(rawCode) {
  if (!rawCode || rawCode.trim() === "") return "while True:\n  pass\n";

  const allLines = rawCode.split("\n");

  const headerLines = [];   // imports
  const setupLines = [];    // pin/hardware initialization (hoisted from definitions_)
  const defLines = [];      // function definitions (top-level defs + their bodies)
  const bodyLines = [];     // everything else

  let inDef = false;

  for (const line of allLines) {
    const trimmed = line.trim();

    // ── Handle blank lines ──
    if (trimmed === "") {
      if (inDef) {
        // Blank line INSIDE a function — keep it, don't end the function yet.
        // We'll check the next non-blank line to decide if the function continues.
        defLines.push("");
      }
      // Blank lines outside functions are discarded (Blockly artifact)
      continue;
    }

    if (isScaffolding(line)) continue;

    // ── If we're inside a function definition ──
    if (inDef) {
      if (line.startsWith(" ") || line.startsWith("\t")) {
        // Indented → still part of the function body
        defLines.push(line);
        continue;
      } else {
        // Non-indented line → function ended, fall through to classify this line below
        inDef = false;
        // Trim trailing blank lines we speculatively added to defLines
        while (defLines.length > 0 && defLines[defLines.length - 1].trim() === "") {
          defLines.pop();
        }
        defLines.push(""); // single blank line separator after function
      }
    }

    // ── Classify the current line ──
    if (isImportLine(line)) {
      if (!headerLines.includes(trimmed)) {
        headerLines.push(trimmed);
      }
      continue;
    }

    if (isPinInit(line)) {
      if (!setupLines.includes(trimmed)) {
        setupLines.push(trimmed);
      }
      continue;
    }

    if (isVarInit(line)) {
      if (!setupLines.includes(trimmed)) {
        setupLines.push(trimmed);
      }
      continue;
    }

    if (isFunctionDef(line)) {
      inDef = true;
      defLines.push(line);
      continue;
    }

    bodyLines.push(line);
  }

  // If file ended while still inside a function def, trim trailing blanks
  if (inDef) {
    while (defLines.length > 0 && defLines[defLines.length - 1].trim() === "") {
      defLines.pop();
    }
  }


  const bodyText = bodyLines.join("\n");
  if (
    (bodyText.includes("time.sleep") || rawCode.includes("time.sleep")) &&
    !headerLines.some((l) => l.includes("import time"))
  ) {
    headerLines.push("import time");
  }

  // Consolidate all "from machine import ..." lines into a single clean, deduplicated line
  const machineImports = new Set();
  const otherHeaderLines = [];

  for (const line of headerLines) {
    const machineMatch = line.match(/^from\s+machine\s+import\s+(.+)$/);
    if (machineMatch) {
      const items = machineMatch[1].split(',').map(s => s.trim());
      items.forEach(item => { if (item) machineImports.add(item); });
    } else {
      if (!otherHeaderLines.includes(line)) {
        otherHeaderLines.push(line);
      }
    }
  }

  const finalHeaderLines = [...otherHeaderLines];
  if (machineImports.size > 0) {
    const sortedImports = Array.from(machineImports).sort();
    finalHeaderLines.unshift(`from machine import ${sortedImports.join(', ')}`);
  }

  // Build the parts: imports → class/function defs → hardware init → body
  // Definitions must come BEFORE hardware init because init lines may use
  // classes defined in defLines (e.g., _lcd = I2cLcd(...) needs class I2cLcd first)
  const parts = [...finalHeaderLines];
  if (defLines.length > 0) {
    parts.push("", ...defLines);
  }
  if (setupLines.length > 0) {
    parts.push("", ...setupLines);
  }

  if (bodyLines.length === 0) {
    return parts.join("\n") + "\n";
  }

  if (hasTopLevelLoop(bodyLines)) {
    // Body already has a loop, don't wrap
    parts.push("", ...bodyLines);
    return parts.join("\n") + "\n";
  }

  // Wrap body in while True: (using 2-space indent to match Blockly's default)
  const indented = bodyLines.map((l) => "  " + l);
  parts.push("", "while True:", ...indented);
  return parts.join("\n") + "\n";
}
