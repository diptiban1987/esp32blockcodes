# TechyGuide — Company Demo Snapshot

This is a **company-demo snapshot** of the TechyGuide Blocks project. It contains only the Scratch and ESP32 blocks that are working as of the snapshot date, with **no date-based auto-unlocking**.

## Why this snapshot exists

The original project uses a day-by-day unlock schedule (`src/services/phaseConfig.js`) so features appear progressively by calendar date. For a company presentation, that schedule makes it look as though future blocks are already complete but hidden. This snapshot removes the date-based unlocking so the hosted demo only shows what is actually implemented and working right now.

## What changed from the main project

1. **`src/services/phaseConfig.js`** rewritten:
   - Removed `UNLOCK_DATES` and `PHASE_2_SCHEDULE`.
   - Added a static `ENABLED_KEYS` set with only currently-working blocks/features.
   - `isUnlocked()` now returns `true` only for explicitly enabled keys.
   - `getPhase()` always returns a fixed phase (`DEFAULT_PHASE = 2`).

2. **`src/productionPhase.js`** rewritten:
   - Removed `PHASE_2_SENSOR_DATES` and `PHASE_2_FEATURE_DATES`.
   - Removed gradual-unlock logic.
   - Gating functions now rely on `isUnlocked()` from `phaseConfig.js`.

3. **`src/index.js`**:
   - Removed the phase admin panel import and initialization.
   - Removed the `onPhaseChange` listener block.
   - The company cannot manually unlock future phases from the UI.

4. **`aws/`** folder added:
   - Deployment guides and Docker files for AWS (S3 + CloudFront frontend, EC2/ECS backend).

## Currently enabled blocks

### Scratch Mode
- Motion, Looks, Sound, Events, Control, Sensing, Operators, Variables, My Blocks

### Board Mode — ESP32
| Category | Enabled items |
|----------|---------------|
| ESP32 Core | Program structure, digital/analog I/O, PWM, touch, hall, map |
| Inputs | Tactile switch, slide switch, triggers |
| Sensors | Temperature, Ultrasonic, Environmental (BMP280, Rain), RFID, IR Remote |
| Actuators | LED, Buzzer |

### Enabled features
- MicroPython code generation
- MicroPython Web-Serial upload to ESP32
- Arduino C++ code generation
- Arduino compile & upload (requires backend server)
- Serial monitor

## Run locally

```bash
npm install
npm start          # Dev server at http://localhost:8081
```

## Build for hosting

```bash
npm run build:prod
# Output is in dist/
```

## Deploy to AWS

See [`aws/README.md`](aws/README.md).

## Snapshot date

July 13, 2026
