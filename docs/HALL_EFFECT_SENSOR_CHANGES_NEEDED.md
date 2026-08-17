# Hall Effect Sensor — Changes Needed in Existing Files

**Companion to:** `docs/HALL_EFFECT_SENSOR_REPORT.md`
**Date:** 17 Aug 2026
**Status:** ✅ **APPLIED** — the edits below were applied on 17 Aug 2026.
The new `esp32_hallfx_*` blocks now appear under **Sensors → 🧲 Hall Effect**
and generate both MicroPython and Arduino C++ code.

The new Hall Effect sensor feature was originally added as **new files only**
(see the report). The edits listed in this document were then applied to make
the new `esp32_hallfx_*` blocks visible and usable in the UI. **All edits are
additive** — no existing registrations, type names, or toolbox entries were
removed or renamed, so the project remains fully backward compatible.

> Everything below is **optional for the project to keep working.** Until these
> edits are applied, the new files are simply never imported and webpack
> tree-shakes them out of the bundle — the running app is byte-for-byte
> identical to before. Even if a saved workspace happens to contain an
> `esp32_hallfx_*` block, the project's `installSafetyNet` fallback
> (MicroPython + Arduino) turns it into a safe no-op, so code generation can
> never crash. Apply these edits whenever you are ready to surface the feature.

**Two files** need changes. **No phase / config changes are required** — the
`"🧲 Hall Effect"` subcategory is already enabled at Phase 2
(`src/productionPhase.js:65`) and its icon/color are already registered in
`src/ui/customToolbar.js` (`'Hall Effect': 'magnet'`, `'Hall Effect': '#FF8C1A'`).

---

## 1. `src/index.js`  (6 lines to add)

### 1a. Add imports

Put these with the other ESP32 block imports (around the existing
`import { fireBlocks } from "./blocks/esp32/fireBlocks";` line ~31):

```js
import { hallBlocks } from "./blocks/esp32/hallBlocks";
```

Put these with the other MicroPython generator imports (around the existing
`import { forBlock as fireGen } from "./generators/esp32/fireGen";` line ~53):

```js
import { forBlock as hallGen } from "./generators/esp32/hallGen";
```

Put this with the other Arduino generator imports (around the existing
`import { forBlock as arduinoFireGen } from "./generators/esp32/arduino/fireGen";`
line ~82):

```js
import { forBlock as arduinoHallGen } from "./generators/esp32/arduino/hallGen";
```

### 1b. Register the block definitions

Add this line next to the other `Blockly.common.defineBlocks(...)` calls
(e.g. right after `Blockly.common.defineBlocks(fireBlocks);` around line ~165):

```js
Blockly.common.defineBlocks(hallBlocks);
```

### 1c. Register the MicroPython generator

Inside `registerGatedGenerators()`, right after the unconditional line
`Object.assign(pythonGenerator.forBlock, sensorGen);` (around line ~179), add:

```js
  Object.assign(pythonGenerator.forBlock, hallGen);
```

### 1d. Register the Arduino C++ generator

Inside the `if (isFeaturePhaseEnabled('arduinoGen')) { ... }` block, right
after `Object.assign(arduinoGenerator.forBlock, arduinoSensorGen);`
(around line ~236), add:

```js
    Object.assign(arduinoGenerator.forBlock, arduinoHallGen);
```

That is the full set of `index.js` edits.

> **Why unconditional for MicroPython?** The existing `esp32_hall_module_*`
> generators live in `sensorGen`, which is already registered
> unconditionally. Following the same pattern keeps the analog-hall
> generators available for any saved workspace that references them. The
> *toolbox* entry (the only thing that actually shows them to the user) is
> still phase-gated by the `"🧲 Hall Effect"` subcategory.

---

## 2. `src/toolbox.js`  (add entries to the existing "🧲 Hall Effect" subcategory)

Locate the existing subcategory (currently lines ~311–321):

```js
{
  kind: "category",
  name: "🧲 Hall Effect",
  colour: "#ff8c1a",
  contents: [
    { kind: "label", text: "Hall Sensor Module — No library needed" },
    { kind: "block", type: "esp32_hall_module_value" },
    { kind: "block", type: "esp32_hall_module_detected" },
    { kind: "block", type: "esp32_hall_module_wait" },
  ]
},
```

Append the new blocks inside the `contents` array (after the existing
`esp32_hall_module_wait` entry):

```js
        { kind: "label", text: "━━ Analog Hall (SS49E / 44E / AH3503) — No library needed ━━" },
        { kind: "block", type: "esp32_hallfx_setup" },
        { kind: "block", type: "esp32_hallfx_raw" },
        { kind: "block", type: "esp32_hallfx_field_percent" },
        { kind: "block", type: "esp32_hallfx_voltage" },
        { kind: "block", type: "esp32_hallfx_is_near" },
        { kind: "block", type: "esp32_hallfx_wait_until_near" },
        { kind: "block", type: "esp32_hallfx_alarm" },
        { kind: "block", type: "esp32_hallfx_print_serial" },
        { kind: "label", text: "━━ Tachometer (digital OUT — A3144 / 3144) ━━" },
        { kind: "block", type: "esp32_hallfx_count_pulses" },
        { kind: "block", type: "esp32_hallfx_rpm" },
```

No other toolbox change is needed — `phaseFilterToolbox()` will pick up the new
entries automatically (the parent "🧲 Hall Effect" subcategory is already
enabled at Phase 2).

---

## 3. Files that do **NOT** need changes

| File | Why no change |
|---|---|
| `src/productionPhase.js` | `"🧲 Hall Effect": 2` already exists (line 65). Subcategory is enabled. |
| `src/services/phaseConfig.js` | Company-demo snapshot already includes the Hall subcategory in `ENABLED_KEYS` (it powers the existing 3 hall blocks). |
| `src/ui/customToolbar.js` | Icon/color for `'Hall Effect'` already registered (`'magnet'`, `#FF8C1A`). |
| `src/generators/validateWorkspace.js` | Validation is generic; new blocks are validated automatically. |
| `src/generators/fallbackGen.js` | Fallback safety net already covers any unmapped block (incl. `esp32_hallfx_*` until wired). |
| `src/generators/esp32/sensorGen.js` | Untouched — existing `esp32_hall_module_*` generators stay as-is. |
| `src/generators/esp32/esp32CoreGen.js` | Untouched — existing `esp32_get_hall_sensor` / `esp32_hall_magnet_detected` stay as-is. |
| `src/blocks/esp32/sensorBlocks.js` | Untouched — existing hall block definitions stay as-is. |
| `src/blocks/esp32/esp32CoreBlocks.js` | Untouched. |
| `package.json` | No new dependencies (analog hall + digital pulse counting need no library). |
| `webpack.config.js` | No new loaders/entry points. |

---

## 4. Verification after applying the edits

```bash
npm install        # only if node_modules is missing
npm start          # Dev server at http://localhost:8081
```

Then:

1. Switch to **Board Mode**.
2. Open the **Sensors → 🧲 Hall Effect** category — you should now see the 3
   legacy digital blocks **plus** the 10 new analog / tachometer blocks.
3. Drag `esp32_hallfx_setup`, `esp32_hallfx_field_percent`, and
   `esp32_hallfx_print_serial` into the workspace.
4. Set the language dropdown to **MicroPython** — confirm the generated code
   matches `docs/HALL_EFFECT_SENSOR_REPORT.md` §5.1.
5. Set the dropdown to **Arduino** — confirm it matches §5.2.
6. `npm run build:prod` should still succeed.

---

## 5. Summary

| Action | Files | Status |
|---|---|---|
| New feature files | `hallBlocks.js`, `hallGen.js`, `arduino/hallGen.js`, `docs/*` | ✅ Done |
| Wire into UI | `src/index.js` (6 lines), `src/toolbox.js` (12 entries) | ✅ Applied |

The project remains fully backward compatible: all edits are purely additive
(new imports / new `defineBlocks` / new `Object.assign` / new toolbox entries).
No existing block type, generator, phase config, or toolbox entry was changed.
