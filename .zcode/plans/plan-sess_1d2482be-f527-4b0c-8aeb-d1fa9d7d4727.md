## Add schedule rows 17-22 unlocks into the project

### Context / finding
The schedule rows 17-22 in `WORK_SCHEDULE.md` already exist on paper. The corresponding **sensor blocks are already implemented in code** (block definitions + MicroPython + Arduino generators + toolbox entries):
- 🔥 **Fire & Gas**: `esp32_flame_digital`, `esp32_flame_analog`, `esp32_gas_sensor_analog`, `esp32_gas_sensor_digital` — all present.
- 💧 **Water & Rain**: `esp32_rain_sensor`, `esp32_soil_moisture_analog`, `esp32_soil_moisture_digital` — present.

**The gap:** This is a "company-demo snapshot" where date-based unlocking was removed and subcategories are gated by an explicit `ENABLED_KEYS` set in `src/services/phaseConfig.js`. `🔥 Fire & Gas` and `💧 Water & Rain` are **NOT** in that set, so the toolbox filter (`src/toolbox.js` → `isSensorSubEnabled`) hides them. They are "in code" but not "live in toolbox."

**Additionally**, the schedule describes Water & Rain as "(**Level**, Soil)" — i.e. a water-level sensor. Rain + Soil exist, but there is **no water-level sensor block**. I'll add one so the category matches its stated scope.

### Changes

**1. `src/services/phaseConfig.js` — enable the two subcategories**
Add two keys to the `ENABLED_KEYS` set (in the "Unlocked as of snapshot date" section):
- `"🔥 Fire & Gas"`
- `"💧 Water & Rain"`

This makes the toolbox filter stop hiding those two subcategories. (No change to `productionPhase.js` — `SENSOR_SUB_PHASE` already lists both as phase 2, and `isSensorSubEnabled` reads from `ENABLED_KEYS`.)

**2. Add a new water-level sensor block** — `esp32_water_level`
A water-level sensor module (common FC-151 / water-level probe) returns analog level + a digital threshold flag, mirroring the existing flame/soil pattern.

- **`src/blocks/esp32/sensorBlocks.js`** — add `waterLevelAnalog` (analog reading 0-4095, `ANALOG_PIN_OPTIONS`, output Number) and `waterLevelDigital` (boolean "water detected?", `PIN_OPTIONS`, output Boolean) block definitions, with matching tooltips. Register both in the exported `sensorBlocks` array, near the rain/soil entries.
- **`src/generators/esp32/sensorGen.js`** (MicroPython) — add `forBlock["esp32_water_level_analog"]` (ADC read, same pattern as `esp32_flame_analog`/`esp32_soil_moisture_analog`) and `forBlock["esp32_water_level_digital"]` (`Pin.IN`, `value() == 0` active-low, same as `esp32_flame_digital`/`esp32_gas_sensor_digital`).
- **`src/generators/esp32/arduino/sensorGen.js`** (Arduino C++) — add the two generators following the existing flame/soil Arduino style (analog → `analogRead(pin)`; digital → `pinMode(pin, INPUT)` + `(digitalRead(pin) == LOW)`).
- **`src/toolbox.js`** — add the two new blocks to the `💧 Water & Rain` category contents (with a label "Water Level — No library needed"), after the rain/soil blocks.
- **`src/generators/validateWorkspace.js`** — add `esp32_water_level_digital` to `INPUT_BLOCKS` (it uses a pin as INPUT), matching how `esp32_flame_digital` / `esp32_soil_moisture_digital` are handled. (The analog variant uses an ADC pin — consistent with `esp32_flame_analog` / `esp32_soil_moisture_analog`, which are NOT in the allowlist, so I'll follow that precedent and leave the analog one out.)

### What I will NOT change
- The schedule rows in `WORK_SCHEDULE.md` (they already exist at lines 146-151 and 477-478 — no edit needed).
- The existing flame/gas/rain/soil blocks or their generators (already correct and consistent).
- `productionPhase.js` (its `SENSOR_SUB_PHASE` already maps both subcategories to phase 2; gating flows through `isUnlocked` in `phaseConfig.js`).
- The phase display (remains `DEFAULT_PHASE = 2`; these are subcategory unlocks, not phase bumps).
- README.md sensor scope line (it predates this snapshot; not part of "add these into the project").

### Verification
- `npm run build:prod` compiles with no errors.
- Trace: `isUnlocked("🔥 Fire & Gas")` and `isUnlocked("💧 Water & Rain")` now return `true` → both subcategories survive the `getFilteredToolbox()` filter → blocks appear in the IDE toolbox.
- Confirm new `esp32_water_level_*` blocks generate valid code in both Arduino and MicroPython output.