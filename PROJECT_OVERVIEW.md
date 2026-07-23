# TechyGuide Blocks — Project Overview

## 1. What It Is

An in-browser, Blockly-based visual programming IDE that supports **two modes**:
- **Scratch Mode** — A Scratch 3.0-like environment with sprites, stage, costumes, backdrops, and a full visual block interpreter that runs in the browser via PixiJS.
- **Board Mode** — An ESP32 hardware programming environment that generates **MicroPython** and **Arduino C++** code from visual blocks, with Web-Serial-based upload to real hardware.

---

## 2. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Runtime | Vanilla JavaScript (ES6 Modules) | No TypeScript, no UI framework |
| Bundler | Webpack 5 | Build, dev server, HMR |
| CSS | Tailwind CSS v4.2.4 + Custom Properties | Utility-first styling + theme system |
| Block Editor | Google Blockly v12 | Visual block workspace, toolbox, code generators |
| Canvas / 2D | PixiJS v8.17.1 | Stage renderer (480×360), sprites, pen trails, bubbles |
| Icons | Lucide v1.9 | SVG icons via `data-lucide` |
| Fonts | Google Fonts (Inter, JetBrains Mono) | UI and code typography |
| Hardware Comms | Web Serial API | Upload MicroPython to ESP32 via Raw REPL |
| Hardware Comms | Web Bluetooth API | Scan/connect to BLE devices |

---

## 3. Project Structure

```
src/
├── index.js                  # Entry point — wires all modules together
├── index.html                # HTML shell
├── index.css                 # Design system with light/dark CSS custom properties
├── tw-input.css / output.css # Tailwind v4 source and compiled output
├── toolbox.js                # Board-mode Blockly toolbox definition
├── scratchToolbox.js         # Scratch-mode Blockly toolbox definition
├── serialization.js          # LocalStorage save/load for workspace
├── project.js                # Project file save/load (.techyguide format)
│
├── services/                 # App-level services
│   └── featureFlags.js       # Plan-based feature flag system (free/maker/pro/enterprise)
│
├── engine/                   # Scratch runtime engine
│   ├── EventBus.js           # Pub/sub event system
│   ├── SpriteEngine.js       # Sprite class (position, costumes, movement)
│   ├── SpriteStore.js        # Central sprite store with observer pattern
│   ├── StageRenderer.js      # PixiJS-based 480×360 canvas renderer (theme-aware)
│   └── BlockInterpreter.js   # Async interpreter that runs Scratch blocks
│
├── blocks/                   # Blockly block definitions
│   ├── motionBlocks.js, looksBlocks.js, soundBlocks.js
│   ├── eventBlocks.js, controlBlocks.js, sensingBlocks.js
│   ├── print.js, text.js, wait.js, digital_pin.js
│   └── esp32/                # ESP32 hardware blocks (17 block categories)
│
├── generators/               # Code generators (MicroPython + Arduino C++)
│   ├── arduinoGenerator.js   # Custom Blockly Generator for Arduino C++
│   ├── validateWorkspace.js  # Pin conflict / orphan / coverage checks
│   ├── fallbackGen.js        # No-op generators for Scratch-only blocks
│   ├── controlGen.js, arduinoControlGen.js
│   ├── print.js, addText.js, wait.js, digital_pin.js
│   └── esp32/                # MicroPython generators per block category
│       └── arduino/          # Arduino C++ generators per block category
│
├── upload/                   # Upload pipeline
│   ├── uploadPanel.js        # Upload button + status management (plan-gated)
│   ├── serialUpload.js       # MicroPython Raw REPL upload via Web Serial
│   ├── arduinoCodeBuilder.js # Arduino sketch builder (.ino)
│   ├── codeBuilder.js        # ESP32 MicroPython code wrapper
│   └── indentUtils.js        # Code formatting utilities
│
└── ui/                       # DOM-based UI modules (vanilla JS)
    ├── ModeSwitcher.js       # Navbar, mode toggling, board selection + plan badge
    ├── SubscriptionModal.js  # Pricing plan comparison & upgrade modal
    ├── customToolbar.js      # Toolbox color-coded category icons
    ├── icons.js              # Lucide icon initializer
    ├── ConnectModal.js       # Web Serial + Bluetooth connection UI
    ├── SerialMonitor.js      # Real-time serial terminal (plan-gated)
    ├── SpritePanel.js        # Sprite list, properties, controls
    ├── SpriteChooserModal.js # Sprite library browser
    ├── spriteLibrary.js      # Built-in sprite SVGs
    ├── BackdropChooserModal.js
    └── backdropLibrary.js    # Built-in backdrop definitions

server/
└── compileServer.js          # Arduino CLI compile/upload API (Express middleware)

docs/
└── PROJECT_REFERENCE.md      # Full function inventory & business roadmap
```

---

## 4. Architecture Overview

### 4.1 Dual-Mode Architecture
The app operates in two mutually exclusive modes toggled via the navbar:
- **Scratch Mode** → Blockly workspace + Stage canvas + Sprite panel (Scratch-like creative coding)
- **Board Mode** → Blockly workspace (with ESP32 blocks injected) + Code editor + Serial Monitor (hardware programming)

### 4.2 No UI Framework
All UI modules use **vanilla JS DOM manipulation** — no React, Vue, or Angular. Each module exports an init function called from `index.js`. Cross-module communication happens through:
- **SpriteStore** — Observer pattern singleton (`on()`, `_emit()`) for sprite lifecycle events
- **EventBus** — Pub/sub for runtime events (`GREEN_FLAG`, `STOP_ALL`, `KEY_PRESS`, `BROADCAST`)
- **Module-level variables** with getter functions (e.g., `getCurrentMode()`)

### 4.3 Scratch Engine (Interpreter + Renderer)
- **SpriteEngine.js** — Each sprite has position, direction, costumes, physics (move, turn, glide), visual state (size, opacity, bubbles), pen trails
- **SpriteStore.js** — Singleton array of sprites, per-sprite workspace state persistence, backdrop management
- **StageRenderer.js** — PixiJS layers: background → pen trails → sprites → bubbles, with drag support; theme-aware background color
- **BlockInterpreter.js** — Async `Thread` per sprite per hat block; uses `requestAnimationFrame` yielding and `EventBus` for cross-sprite triggers

### 4.4 Code Generation (Dual-Language)
Each ESP32 block has **two generators** — one for MicroPython and one for Arduino C++:

```
Workspace Blocks
├── Scratch Mode → BlockInterpreter (runs in browser)
└── Board Mode
    ├── MicroPython → Raw REPL upload via Web Serial
    └── Arduino C++ → Download .ino file / Compile via arduino-cli
```

- `arduinoGenerator.js` — Custom `Blockly.Generator('Arduino')` with its own operator precedence
- `fallbackGen.js` — No-op generators for all Scratch-only blocks to prevent crashes in hardware mode
- `validateWorkspace.js` — Pin conflict detection, orphan block detection, generator coverage reporting

### 4.5 Hardware Upload Pipeline
```
uploadPanel.js → serialUpload.js → Web Serial API
  1. Pause SerialMonitor (release reader lock)
  2. Open port at 115200 baud
  3. Send Ctrl+C (interrupt running program)
  4. Enter Raw REPL mode (Ctrl+A)
  5. Send code in 256-byte chunks
  6. Send Ctrl+D (execute)
  7. Read OK/error response
  8. Resume SerialMonitor for live output
```

### 4.6 Monetization & Feature Gating
The app uses a **plan-based feature flag system**:

| Plan | Price | Key Features |
|---|---|---|
| Starter (Free) | Free | Scratch Mode, local save/load (3 projects max), ads shown |
| Maker | ₹199/mo | Board Mode, cloud save (10 projects), code gen, serial monitor, compile & upload, export |
| Pro | ₹499/mo | Everything in Maker + unlimited cloud, classroom (30 students), teacher dashboard, custom blocks, API |
| Enterprise | Custom | Unlimited students, self-hosted, custom branding, dedicated support, SLA |

Feature gates are enforced in the UI via `isFeatureEnabled()` calls at every entry point (board mode toggle, upload button, download button, language switcher, serial monitor). Free users see a subscription modal prompting upgrade.

### 4.7 Theme System
Light/dark theme toggle in the header with:
- **CSS Custom Properties** — Full `[data-theme="light"]` and `[data-theme="dark"]` token sets covering backgrounds, text, borders, code editor, upload panel, modals, inputs
- **Blockly theme switching** — Workspace, toolbox, and flyout colors update via `ws.setTheme()`
- **Persistent preference** — Theme saved to `localStorage` and restored on load
- **StageRenderer** — PixiJS stage background updates on theme change

---

## 5. Key Features Implemented

### Scratch Mode
- Motion (10 blocks), Looks (16), Sound (9), Events (8), Control (12), Sensing (6+)
- Operators, Variables, My Blocks (built-in Blockly)
- Full sprite system with costumes, backdrops, say/think bubbles
- Pen system (pen down/up, color, size, stamp)
- Hat block triggers (green flag, key press, sprite click, broadcast)
- Control flow (wait, repeat, forever, if/else, stop, broadcast, wait/repeat until)
- In-browser async interpreter with PixiJS rendering

### Board Mode (ESP32 Hardware)
17 hardware block categories with MicroPython + Arduino C++ generation:

| Category | Blocks | Key Blocks |
|---|---|---|
| ESP32 Core | 10 | digital/analog I/O, PWM, touch, hall, map |
| Actuators | 11 | servo, motor, relay, LED, pin monitor |
| Sensors | 10 | ultrasonic, PIR, IR, rain, LDR, DHT, potentiometer |
| MPU6050 | 5 | init, accel, gyro, temp, tilt |
| Heart Sensor | 4 | init, value, BPM, pulse detected |
| LCD 16×2 | 5 | init, print, clear, set_cursor, backlight |
| L298N Motor | 5 | init, forward, backward, speed, stop |
| Inputs | 6 | tactile switch, slide switch, wait/press triggers |
| Communication | 9 | serial/Bluetooth, available, read, write |
| Terminal | 3 | data, number, send |
| Notification | 4 | send/clear notification, play/stop music |
| Camera | 7 | init, flash, rotate, capture, save, stream |
| IoT | 3 | create file, log data, stop logger |

### Monetization
- Feature flag service with 4 plan tiers (free/maker/pro/enterprise)
- Subscription/pricing comparison modal with feature checklists
- Plan badge in header with click-to-upgrade flow
- Feature gates across board mode, serial monitor, upload, download, code generation

### Theme System
- Light/dark theme toggle with CSS custom properties
- Blockly workspace theme switching
- StageRenderer PixiJS background adapts to theme
- Preference persisted in localStorage

### Developer Tooling
- Webpack dev server with HMR (`npm start`)
- Production build to `dist/` (`npm run build`)
- Code validation (pin conflicts, orphans, generator coverage)
- Code editor with line numbers, syntax highlighting, tab support
- Serial monitor with baud selection, line endings, auto-scroll, color-coded output
- Download generated `.ino` / `.py` files (plan-gated)
- Upload MicroPython to ESP32 via Web Serial Raw REPL (plan-gated)
- Arduino CLI compile + upload via backend API (plan-gated)

---

## 6. Future Enhancements & Scope

### 6.1 Short-Term (Usability & Robustness)
- **Backend API server** — Separate Express/Fastify server for production deployment
- **Database (PostgreSQL/MongoDB)** — User accounts, project persistence, subscription management
- **User authentication** — Email/Google/GitHub login with JWT
- **Cloud project save** — Save to server instead of local storage only
- **Multi-tab sprite editing** — Allow editing scripts of multiple sprites simultaneously
- **Undo/redo** — Full undo/redo stack for block workspace operations
- **More scratch blocks** — Add "My Blocks" (custom procedures), "Operators" string/date blocks

### 6.2 Medium-Term (Hardware & Tooling)
- **Real-time hardware debugging** — Live variable monitoring, pin state visualization
- **Blockly procedure support in generators** — Properly translate procedures into Arduino/Python functions
- **Custom block creation UI** — Allow users to define their own blocks
- **Team/classroom dashboard** — Teacher dashboards, assignment management, grading
- **Payment integration** — Razorpay (India) / Stripe (global) for plan upgrades

### 6.3 Long-Term (Platform Expansion)
- **Support for additional microcontrollers** — Arduino Uno, Raspberry Pi Pico, STM32, Micro:bit
- **Circuit simulator** — Virtual breadboard with real-time simulation
- **Mobile companion app** — React Native or Flutter app
- **AI assistant for block programming** — Natural language to block conversion
- **Plugin / extension system** — Dynamic third-party block packages
- **Offline PWA** — Service worker caching for full offline functionality

---

## 7. Development Workflow

```bash
npm install          # Install dependencies
npm start            # Dev server with hot reload at localhost:8081
npm run build        # Production build to dist/
npm run tw:watch     # Watch Tailwind CSS changes (if needed separately)
```

---

## 8. Key Design Decisions

1. **Vanilla JS over frameworks** — Smaller bundle, no framework lock-in, but requires manual DOM management
2. **Two separate code generators** — Each ESP32 block has both MicroPython and Arduino C++ implementations, keeping the generation layer clean
3. **Per-sprite workspace state** — Each sprite carries its own Blockly XML, enabling independent scripts per sprite
4. **Fallback generators** — Crash-proof system ensures Scratch-only blocks don't break hardware code generation
5. **Web Serial Raw REPL** — Custom protocol implementation for MicroPython upload, handling chunked transfer and error recovery
6. **Plan-based feature gating** — Feature flags checked at every entry point before allowing access to gated functionality
7. **CSS custom properties for theming** — Light/dark theme toggle implemented entirely through CSS variables without JS-driven style changes
