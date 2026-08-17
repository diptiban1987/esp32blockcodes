# Hall Effect Sensor — Detailed Implementation Report

**Project:** TechyGuide Blocks (Company Demo Snapshot)
**Date:** 17 Aug 2026
**Author:** opencode assistant
**Scope:** Add a comprehensive **analog Hall Effect sensor** feature to the ESP32 Board Mode, in a fully **additive / backward-compatible** way (no existing source files were modified).

---

## 1. Background

The project is an in-browser, Blockly-based visual programming IDE with two
modes — **Scratch Mode** and **Board Mode (ESP32 hardware)**. Board Mode
generates **MicroPython** and **Arduino C++** code from visual blocks and
uploads it to real ESP32 hardware via Web Serial.

Before this change the project already contained a minimal Hall coverage:

| Block type | File | What it does |
|---|---|---|
| `esp32_get_hall_sensor` | `src/blocks/esp32/esp32CoreBlocks.js` | Reads the ESP32 **built-in** hall sensor (`hallRead()` / `esp32.hall_sensor()`). |
| `esp32_hall_magnet_detected` | `src/blocks/esp32/esp32CoreBlocks.js` | Built-in hall above a threshold. |
| `esp32_hall_module_value` | `src/blocks/esp32/sensorBlocks.js` | Reads the **digital** OUT of an external hall module (0/1). |
| `esp32_hall_module_detected` | `src/blocks/esp32/sensorBlocks.js` | Digital magnet-detected (active-low). |
| `esp32_hall_module_wait` | `src/blocks/esp32/sensorBlocks.js` | Blocks until a magnet is detected (digital). |

Those five blocks are **digital only** — they cannot measure *field strength*,
*voltage*, *proximity %*, *pulse counting*, or *RPM*. The new feature fills that
gap for **analog** Hall sensors (SS49E, 44E, AH3503, A1302, A3144 with an analog
tap, etc.) and adds a **tachometer** capability used for fans / motors / wheels.

> **Backward compatibility:** All existing block type names, generators,
> toolbox entries and registration calls were left untouched. The new blocks
> use a brand-new prefix **`esp32_hallfx_*`** that cannot collide with the
> existing `esp32_hall_module_*` or `esp32_get_hall_sensor` / `esp32_hall_magnet_detected`.

---

## 2. Files Added (this change)

| Path | Purpose |
|---|---|
| `src/blocks/esp32/hallBlocks.js` | Blockly block **definitions** (JSON) for 10 new blocks. Exports `hallBlocks`. |
| `src/generators/esp32/hallGen.js` | **MicroPython** generators for the 10 new blocks. Exports `forBlock`. |
| `src/generators/esp32/arduino/hallGen.js` | **Arduino C++** generators for the 10 new blocks. Exports `forBlock`. |
| `docs/HALL_EFFECT_SENSOR_REPORT.md` | This file (detailed report). |
| `docs/HALL_EFFECT_SENSOR_CHANGES_NEEDED.md` | The **only** edits needed in *existing* files to make the new blocks visible in the UI (the user asked to not change anything; those edits are documented, not applied). |

**Files modified:** none. **Files removed:** none.

---

## 3. New Blocks Inventory

All blocks use colour `0` (orange) to match the existing Hall sensor category.
New type prefix: **`esp32_hallfx_`**.

| # | Block type | Message | Returns | Type |
|---|---|---|---|---|
| 1 | `esp32_hallfx_setup` | `setup analog hall sensor \| signal pin %1` | — | statement |
| 2 | `esp32_hallfx_raw` | `hall sensor raw value (0–4095) at pin %1` | Number | reporter |
| 3 | `esp32_hallfx_field_percent` | `hall field strength % at pin %1` | Number | reporter |
| 4 | `esp32_hallfx_voltage` | `hall sensor voltage (V) at pin %1` | Number | reporter |
| 5 | `esp32_hallfx_is_near` | `magnet near? hall pin %1 threshold %2 %` | Boolean | reporter |
| 6 | `esp32_hallfx_wait_until_near` | `wait until magnet near hall pin %1 (> %2 %) timeout %3 ms (-1 = forever)` | — | statement |
| 7 | `esp32_hallfx_count_pulses` | `count hall pulses at digital pin %1 for %2 ms` | Number | reporter |
| 8 | `esp32_hallfx_rpm` | `measure RPM \| hall pin %1 sample %2 ms \| magnets per rev %3` | Number | reporter |
| 9 | `esp32_hallfx_alarm` | `if hall pin %1 strength > %2 % turn ON pin %3 (else OFF)` | — | statement |
| 10 | `esp32_hallfx_print_serial` | `print hall strength to serial \| pin %1` | — | statement |

**Field dropdowns**

* **Analog blocks** (#1–#5 wait, #9, #10) → `ANALOG_PIN_OPTIONS` =
  `32, 33, 34, 35, 36, 39` (ESP32 ADC1 pins).
* **Pulse count / RPM blocks** (#7, #8) read a **digital** OUT (A3144 / 44E DO
  pin) → `PIN_OPTIONS` =
  `2, 4, 5, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 32, 33`.

**Numeric fields**

* `esp32_hallfx_is_near.THRESHOLD` → 0–100, default `70`.
* `esp32_hallfx_wait_until_near.THRESHOLD` → 0–100, default `70`;
  `TIMEOUT` → ms, default `-1` (−1 = wait forever).
* `esp32_hallfx_count_pulses.DURATION` → ms, min `50`, default `1000`.
* `esp32_hallfx_rpm.DURATION` → ms, min `50`, default `1000`;
  `POLES` → magnets per revolution, min `1`, max `64`, default `1`.
* `esp32_hallfx_alarm.THRESHOLD` → 0–100, default `70`.

---

## 4. How It Works — Physics & Math

### 4.1 Analog Hall sensors

A ratiometric linear Hall IC (e.g. **SS49E / 44E / AH3503**) outputs ≈ Vcc / 2
with no field present, and the voltage rises or falls depending on the polarity
and proximity of a magnet. On an ESP32 ADC1 pin configured with **11 dB
attenuation**, the ADC reads 0–4095 over 0–3.3 V, so:

| Reading | Meaning |
|---|---|
| `raw` (0–4095) | Direct ADC value. |
| `field % = int(raw * 100 / 4095)` | 0–100. ~50 ≈ no field; >50 = N-deflected; <50 = S-deflected. |
| `voltage (V) = round(raw * 3.3 / 4095, 2)` | 0 – 3.3 V. |
| `is near = field % > threshold` | Simple high-side trigger (matches the flame / gas / water / soil threshold pattern already in the project). |

### 4.2 Digital Hall sensors (pulse counting)

A digital Hall switch (e.g. **A3144 / 44E on DO**) outputs a clean 0/1 that flips
each time a magnet passes. Counting **low → high** transitions over a sample
window gives the number of magnet passes — ideal for tachometry.

```
count_pulses(pin, duration_ms)
   = number of low→high transitions on digitalRead(pin) over duration_ms

RPM = count_pulses * 60000 / (duration_ms * magnets_per_revolution)
```

`magnets_per_revolution` is the number of magnets mounted on the rotating part
(default `1` — one magnet per full revolution).

---

## 5. Generated Code Examples

### 5.1 MicroPython

**Setup + read strength %**
```python
from machine import Pin, ADC
hallfx_adc_32 = ADC(Pin(32))
hallfx_adc_32.atten(ADC.ATTN_11DB)
# field %:
print("Hall Strength:", int(hallfx_adc_32.read() * 100 / 4095), "%")
```

**Wait until magnet near (timeout 2000 ms)**
```python
_hallfx_deadline = time.ticks_ms() + 2000
while not (int(hallfx_adc_32.read() * 100 / 4095) > 70):
    if time.ticks_diff(time.ticks_ms(), _hallfx_deadline) >= 0:
        break
    time.sleep_ms(10)
```

**RPM (pin 14, sample 1000 ms, 1 magnet/rev)**
```python
def hallfx_count_pulses(pin_no, duration_ms):
    p = Pin(pin_no, Pin.IN)
    last = p.value()
    count = 0
    end = time.ticks_ms() + duration_ms
    while time.ticks_ms() < end:
        v = p.value()
        if v == 1 and last == 0:
            count += 1
        last = v
        time.sleep_us(200)
    return count

# block returns:
int(hallfx_count_pulses(14, 1000) * 60000 / (1000 * 1))
```

### 5.2 Arduino C++

**Setup + read strength %**
```cpp
Serial.print("Hall Strength: ");
Serial.print(map(analogRead(32), 0, 4095, 0, 100));
Serial.println("%");
```

**Alarm**
```cpp
if (map(analogRead(32), 0, 4095, 0, 100) > 70) {
  digitalWrite(2, HIGH);
} else {
  digitalWrite(2, LOW);
}
```

**RPM**
```cpp
int hallfx_count_pulses(int pinNo, int durationMs) {
  int last = digitalRead(pinNo);
  int count = 0;
  unsigned long end = (unsigned long)millis() + (unsigned long)durationMs;
  while ((unsigned long)millis() < end) {
    int v = digitalRead(pinNo);
    if (v == 1 && last == 0) { count++; }
    last = v;
    delayMicroseconds(200);
  }
  return count;
}
// block returns:
(hallfx_count_pulses(14, 1000) * 60000L / ((1000) * (1)))
```

---

## 6. Backward-Compatibility Guarantees

1. **No existing file was edited.** All new code lives in three brand-new files.
2. **No block type name collision.** New prefix `esp32_hallfx_*` is disjoint from
   `esp32_hall_module_*`, `esp32_get_hall_sensor`, `esp32_hall_magnet_detected`.
3. **No generator overwrite.** The new `forBlock` objects are only assigned to
   the new `esp32_hallfx_*` keys; they never redefine existing keys (and the
   project's `Object.assign` registration in `index.js` already keeps the
   existing generators).
4. **No toolbox change.** The existing "🧲 Hall Effect" toolbox category still
   shows only the three legacy digital blocks. The new blocks are *defined* but
   not surfaced in the UI until the small wiring edits in
   `HALL_EFFECT_SENSOR_CHANGES_NEEDED.md` are applied — exactly as requested.
5. **Fallback safety net preserved.** Until wired, an `esp32_hallfx_*` block
   placed in a workspace would fall through to the project's existing
   `installSafetyNet` no-op fallback (MicroPython **and** Arduino), so it cannot
   crash code generation. Backward compatibility is therefore safe *even with
   no wiring edits at all*.

---

## 7. Testing Notes (manual)

Because the `test` script in `package.json` is not configured, verification is
done by build + manual inspection:

* `npm run build:prod` must succeed (the new modules must be syntactically
  valid ES modules that webpack can tree-shake — they are imported nowhere yet,
  so they are simply excluded from the bundle, which is fine).
* After applying the edits in `HALL_EFFECT_SENSOR_CHANGES_NEEDED.md`, run
  `npm start`, switch to **Board Mode**, open the **Sensors → 🧲 Hall Effect**
  category, drag each new block into the workspace, switch the language
  dropdown to **MicroPython** and then **Arduino**, and confirm the generated
  code matches §5.
* On real hardware (SS49E on GPIO 32; A3144 DO on GPIO 14 + a magnet on a small
  fan), confirm: `field %` moves ~40–60 with no magnet and jumps >70 when a
  magnet approaches; `count_pulses` matches the number of magnet passes;
  `rpm` stabilises around the fan's rated speed.

---

## 8. Summary

A complete, self-contained **analog Hall Effect sensor** feature has been added
to the project as **new files only**. The existing working project is unchanged
and remains fully functional. The single document
`docs/HALL_EFFECT_SENSOR_CHANGES_NEEDED.md` lists the minimal edits required in
two existing files (`src/index.js` and `src/toolbox.js`) to make the new blocks
appear in the UI — to be applied whenever the team is ready.
