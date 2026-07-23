# TechyGuide Blocks — Project Blueprint

> **Project:** TechyGuide Blocks
> **Description:** Block-based visual programming IDE for Scratch and ESP32 hardware
> **Tech Stack:** Vanilla JS, Blockly v12, PixiJS v8, Tailwind CSS v4, Webpack 5
> **Target Platforms:** Web (Chrome, Edge, Opera — Web Serial/Bluetooth capable)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture Summary](#2-architecture-summary)
3. [Completed Features](#3-completed-features)
4. [Development Stages & Timeline](#4-development-stages--timeline)
5. [Future Implementations](#5-future-implementations)
6. [Project Status Summary](#6-project-status-summary)

---

## 1. Project Overview

TechyGuide Blocks is an in-browser visual programming IDE with two modes:

- **Scratch Mode** — A Scratch 3.0-like environment with sprites, stage, costumes, backdrops, and a full visual block interpreter running on PixiJS.
- **Board Mode** — An ESP32 hardware programming environment that generates MicroPython and Arduino C++ code from visual blocks, with Web-Serial upload to real hardware.

Monetization uses a 4-tier plan system: **Starter (Free)**, **Maker (₹199/mo)**, **Pro (₹499/mo)**, and **Enterprise (Custom)**.

---

## 2. Architecture Summary

```
src/
├── index.js              # Entry point — wires all modules together
├── index.html            # HTML shell
├── index.css             # Design system with light/dark CSS custom properties
├── landing.html          # Product landing page
├── tw-input.css          # Tailwind v4 source
├── output.css            # Compiled Tailwind output
├── toolbox.js            # Board-mode Blockly toolbox definition
├── scratchToolbox.js     # Scratch-mode toolbox definition
├── serialization.js      # LocalStorage workspace save/load
├── project.js            # Project file save/load (.techyguide format)
├── productionPhase.js    # Runtime phase / unlock helpers
├── engine/               # Scratch runtime
│   ├── EventBus.js
│   ├── SpriteEngine.js
│   ├── SpriteStore.js
│   ├── StageRenderer.js
│   └── BlockInterpreter.js
├── blocks/               # Blockly block definitions
│   ├── motionBlocks.js, looksBlocks.js, soundBlocks.js
│   ├── eventBlocks.js, controlBlocks.js, sensingBlocks.js
│   ├── print.js, text.js, wait.js, digital_pin.js
│   └── esp32/            # 19 ESP32 hardware block category files
├── generators/           # Code generators
│   ├── arduinoGenerator.js, validateWorkspace.js, fallbackGen.js
│   ├── controlGen.js, arduinoControlGen.js
│   ├── print.js, addText.js, wait.js, digital_pin.js
│   ├── esp32/            # MicroPython generators per category
│   └── esp32/arduino/    # Arduino C++ generators per category
├── upload/               # Upload pipeline
│   ├── uploadPanel.js
│   ├── serialUpload.js   # MicroPython Raw REPL upload via Web Serial
│   ├── arduinoCodeBuilder.js
│   ├── codeBuilder.js
│   └── indentUtils.js
├── ui/                   # DOM-based UI modules
│   ├── ModeSwitcher.js
│   ├── SubscriptionModal.js
│   ├── ConnectModal.js
│   ├── SerialMonitor.js
│   ├── NoBoardModal.js
│   ├── phaseAdminPanel.js
│   ├── SpritePanel.js
│   ├── SpriteChooserModal.js
│   ├── spriteLibrary.js
│   ├── BackdropChooserModal.js
│   ├── backdropLibrary.js
│   ├── blockSearch.js
│   ├── LibraryManager.js
│   ├── customToolbar.js
│   ├── icons.js
│   └── uploadPanel.js
└── services/             # App-level services
    ├── featureFlags.js   # 4-tier plan feature gating
    └── phaseConfig.js    # Phase unlock configuration / UNLOCK_DATES

server/
└── compileServer.js      # Arduino CLI compile/upload Express API

docs/
└── PROJECT_REFERENCE.md  # Full function inventory & business roadmap

scripts/
└── generate_schedule.py  # WORK_SCHEDULE.md generator
```

---

## 3. Completed Features

### 3.1 Scratch Mode — Fully Implemented
| Feature | Status | Details |
|---------|--------|---------|
| Motion blocks (10) | ✅ Done | move, turn, goto, glide, change x/y, set direction, bounce, etc. |
| Looks blocks (16) | ✅ Done | say/think bubbles, switch costume, next/previous costume, size, color, ghost effects, show/hide, layers |
| Sound blocks (9) | ✅ Done | play sound, stop sound, change/clear/rest volume, tempo effects |
| Events blocks (8) | ✅ Done | green flag, key press, sprite click, broadcast & wait, when backdrop switches |
| Control blocks (12) | ✅ Done | wait, repeat, forever, if/else, wait/repeat until, stop, create/clone/delete clones |
| Sensing blocks (6+) | ✅ Done | touching, distance, ask/wait, timer, days since 2000, username |
| Operators | ✅ Done | math ops, comparison, logic, string ops (built-in Blockly) |
| Variables | ✅ Done | built-in Blockly variable system |
| Stage (480×360) | ✅ Done | PixiJS canvas, theme-aware background |
| Sprite system | ✅ Done | sprites with costumes, position, direction, physics, pen trails |
| Costumes & backdrops | ✅ Done | library with SVGs, chooser modals |
| Block interpreter | ✅ Done | async per-thread interpreter with requestAnimationFrame yielding |
| Pen system | ✅ Done | pen down/up, color, size, stamp |
| Hat block triggers | ✅ Done | green flag, key press, sprite click, broadcast, backdrop switch |
| Control flow | ✅ Done | wait, repeat, forever, if/else, stop, broadcast, clone events |

### 3.2 Board Mode (ESP32) — Fully Implemented
| Category | Blocks | Status |
|----------|--------|--------|
| ESP32 Core | 10 (digital/analog I/O, PWM, touch, hall, map) | ✅ Done |
| Actuators | 11 (servo, motor, relay, LED, pin monitor) | ✅ Done |
| Sensors | 10 (ultrasonic, PIR, IR, rain, LDR, DHT, potentiometer) | ✅ Done |
| MPU6050 | 5 (init, accel, gyro, temp, tilt) | ✅ Done |
| Heart Sensor | 4 (init, value, BPM, pulse) | ✅ Done |
| LCD 16×2 | 5 (init, print, clear, cursor, backlight) | ✅ Done |
| L298N Motor | 5 (init, forward, backward, speed, stop) | ✅ Done |
| Inputs | 6 (tactile switch, slide switch, triggers) | ✅ Done |
| Communication | 9 (serial/Bluetooth, available, read, write) | ✅ Done |
| Terminal | 3 (data, number, send) | ✅ Done |
| Notification | 4 (send/clear notification, play/stop music) | ✅ Done |
| Camera | 7 (init, flash, rotate, capture, save, stream) | ✅ Done |
| IoT | 3 (create file, log data, stop logger) | ✅ Done |

### 3.3 Code Generation — Fully Implemented
| Feature | Status | Details |
|---------|--------|---------|
| MicroPython generators | ✅ Done | All ESP32 blocks generate MicroPython |
| Arduino C++ generators | ✅ Done | Custom Blockly.Generator('Arduino') with operator precedence |
| Fallback generators | ✅ Done | No-op generators for Scratch-only blocks in Board mode |
| Workspace validation | ✅ Done | Pin conflict, orphan block, generator coverage checks |
| Code editor | ✅ Done | Syntax highlighting, line numbers, tab support |

### 3.4 Upload Pipeline — Fully Implemented
| Feature | Status | Details |
|---------|--------|---------|
| Web Serial upload | ✅ Done | MicroPython Raw REPL with chunked transfer, error recovery |
| Arduino CLI backend | ✅ Done | Express API for compile/upload |
| Upload panel UI | ✅ Done | Plan-gated upload button + status management |

### 3.5 UI & UX — Fully Implemented
| Feature | Status | Details |
|---------|--------|---------|
| Mode switcher | ✅ Done | Scratch ↔ Board toggle in navbar |
| Theme system | ✅ Done | Light/dark with CSS custom properties, Blockly theme, persistence |
| Subscription modal | ✅ Done | Plan comparison with feature checklists, upgrade flow |
| Plan badge | ✅ Done | Header badge with click-to-upgrade |
| Connect modal | ✅ Done | Web Serial + Bluetooth connection UI |
| Serial monitor | ✅ Done | Baud selection, line endings, auto-scroll, color-coded output |
| Sprite panel | ✅ Done | Sprite list, properties, controls |
| Sprite chooser | ✅ Done | Library browser modal |
| Backdrop chooser | ✅ Done | Library browser modal |
| Feature flags | ✅ Done | 4-tier gating system (free/maker/pro/enterprise) |

### 3.6 Developer Tooling — Fully Implemented
| Feature | Status | Details |
|---------|--------|---------|
| Webpack build | ✅ Done | Production build to dist/, dev server with HMR |
| Tailwind CSS v4 | ✅ Done | Utility-first styling |
| Lucide icons | ✅ Done | SVG icon system |
| Project save/load | ✅ Done | LocalStorage + .techyguide file format |

---

## 4. Development Stages & Timeline

### Stage 1: Foundation & Core (Completed — ~8 weeks)
| Phase | Time | What Was Done |
|-------|------|---------------|
| Project scaffolding | Week 1 | Webpack setup, Tailwind, Blockly integration, HTML shell |
| Block definitions | Week 2 | Custom blocks, toolbox definitions |
| Scratch engine core | Weeks 3-4 | SpriteEngine, SpriteStore, StageRenderer, EventBus |
| Block interpreter | Week 5 | Async interpreter, requestAnimationFrame yielding |
| Code generators | Week 6 | MicroPython + Arduino C++ generators for all blocks |

### Stage 2: Scratch Mode (Completed — ~6 weeks)
| Phase | Time | What Was Done |
|-------|------|---------------|
| Motion, Looks, Sound blocks | Week 7 | Block defs + interpreter handlers |
| Events & Control blocks | Week 8 | Hat triggers, broadcast, clones, control flow |
| Sensing & Pen system | Week 9 | Touch, distance, timer, pen trails |
| Sprite & Backdrop system | Week 10 | Library, chooser modals, costume management |
| Stage renderer | Week 11 | PixiJS layers, drag support, theme-aware rendering |
| Polish & edge cases | Week 12 | Bug fixes, performance tuning |

### Stage 3: Board Mode (Completed — ~6 weeks)
| Phase | Time | What Was Done |
|-------|------|---------------|
| ESP32 core blocks | Week 13 | GPIO, ADC, DAC, PWM, touch, hall, map |
| Sensor & actuator blocks | Week 14 | DHT, ultrasonic, PIR, servo, motor, LCD |
| Communication & IoT | Week 15 | Serial, Bluetooth, terminal, notification, camera, IoT |
| MicroPython generators | Week 16 | All ESP32 → MicroPython |
| Arduino C++ generators | Week 17 | Custom Arduino generator |
| Workspace validation | Week 18 | Pin conflict, orphan, coverage checks |

### Stage 4: Upload & Hardware Comms (Completed — ~3 weeks)
| Phase | Time | What Was Done |
|-------|------|---------------|
| Web Serial upload | Week 19 | Raw REPL protocol, chunked transfer, error recovery |
| Arduino CLI server | Week 20 | Express API for compile/upload |
| Upload panel & status | Week 21 | Plan-gated UI, status indicators |

### Stage 5: UI & Monetization (Completed — ~4 weeks)
| Phase | Time | What Was Done |
|-------|------|---------------|
| Mode switcher & navbar | Week 22 | Toggle, board selection, plan badge |
| Theme system | Week 23 | Light/dark CSS variables + Blockly theme switching |
| Subscription modal | Week 24 | Plan comparison, feature checklists, upgrade flow |
| Feature flag system | Week 25 | Plan-gated entry points across the app |

### Stage 6: Short-Term — Next Steps (~6 weeks)
| Phase | Time | Effort | Priority |
|-------|------|--------|----------|
| Backend API server | 2 weeks | 🔴 High | Express/Fastify server for production |
| User authentication | 1 week | 🔴 High | Email/Google/GitHub login with JWT |
| Database setup | 1 week | 🔴 High | PostgreSQL or MongoDB for users/projects |
| Cloud project save | 1 week | 🟡 Medium | Save/load from server (free: 3, maker: 10, pro: unlimited) |
| Undo/redo system | 1 week | 🟡 Medium | Full undo/redo stack for workspace operations |
| Multi-tab sprite editing | 1 week | 🟡 Medium | Edit multiple sprite scripts simultaneously |
| More Scratch blocks | 1 week | 🟢 Low | "My Blocks" procedures, string/date operator blocks |

### Stage 7: Medium-Term (~8 weeks)
| Phase | Time | Effort | Priority |
|-------|------|--------|----------|
| Real-time hardware debugging | 2 weeks | 🟡 Medium | Live variable monitoring, pin state visualization |
| Blockly procedure generator support | 1 week | 🟡 Medium | Translate procedures → Arduino/Python functions |
| Custom block creation UI | 2 weeks | 🟡 Medium | User-defined block creator |
| Team/classroom dashboard | 2 weeks | 🟡 Medium | Teacher dashboards, assignments, grading |
| Payment integration | 1 week | 🟡 Medium | Razorpay (India) / Stripe (global) |

### Stage 8: Long-Term (~12+ weeks)
| Phase | Time | Effort | Priority |
|-------|------|--------|----------|
| More microcontroller support | 3 weeks | 🟢 Low | Arduino Uno, Pi Pico, STM32, Micro:bit |
| Circuit simulator | 4 weeks | 🟢 Low | Virtual breadboard with real-time simulation |
| Mobile companion app | 3 weeks | 🟢 Low | React Native or Flutter app |
| AI assistant for block programming | 3 weeks | 🟢 Low | Natural language → block conversion |
| Plugin/extension system | 2 weeks | 🟢 Low | Dynamic third-party block packages |
| Offline PWA | 2 weeks | 🟢 Low | Service worker caching for full offline use |

### Overall Timeline Visualization

```
Milestone             | Q1  | Q2  | Q3  | Q4  | Q5  | Q6  |
Stage 1 — Foundation  | ███ |     |     |     |     |     |
Stage 2 — Scratch Mode| ███ | ███ |     |     |     |     |
Stage 3 — Board Mode  |     | ███ | ███ |     |     |     |
Stage 4 — Upload      |     |     | █   |     |     |     |
Stage 5 — UI/Monetize |     |     | ██  |     |     |     |
Stage 6 — Short-Term  |     |     |     | ███ |     |     |
Stage 7 — Medium-Term |     |     |     |     | ████|     |
Stage 8 — Long-Term   |     |     |     |     |     | ██████|
                        ──────────────────────────────────────
                        ≈ 30 weeks completed → ≈ 26 weeks remaining
```

---

## 5. Future Implementations

### 5.1 Backend & Infrastructure
| Feature | Status | Target Stage |
|---------|--------|--------------|
| Express/Fastify API server | ❌ Not started | Stage 6 |
| PostgreSQL/MongoDB database | ❌ Not started | Stage 6 |
| User auth (email/Google/GitHub + JWT) | ❌ Not started | Stage 6 |
| Cloud project save/load | ❌ Not started | Stage 6 |
| Payment gateway (Razorpay/Stripe) | ❌ Not started | Stage 7 |
| Production deployment (Docker/cloud) | ❌ Not started | Stage 6 |

### 5.2 Editor Enhancements
| Feature | Status | Target Stage |
|---------|--------|--------------|
| Undo/redo stack | ❌ Not started | Stage 6 |
| Multi-tab sprite editing | ❌ Not started | Stage 6 |
| "My Blocks" procedures | ❌ Not started | Stage 6 |
| String/date operator blocks | ❌ Not started | Stage 6 |
| Custom block creation UI | ❌ Not started | Stage 7 |

### 5.3 Hardware & Debugging
| Feature | Status | Target Stage |
|---------|--------|--------------|
| Real-time variable monitoring | ❌ Not started | Stage 7 |
| Pin state visualization | ❌ Not started | Stage 7 |
| Additional MCUs (Arduino Uno, Pi Pico, STM32, Micro:bit) | ❌ Not started | Stage 8 |
| Circuit simulator | ❌ Not started | Stage 8 |

### 5.4 Platform Expansion
| Feature | Status | Target Stage |
|---------|--------|--------------|
| Teacher/classroom dashboard | ❌ Not started | Stage 7 |
| Mobile companion app | ❌ Not started | Stage 8 |
| AI assistant (NL → blocks) | ❌ Not started | Stage 8 |
| Plugin/extension system | ❌ Not started | Stage 8 |
| Offline PWA support | ❌ Not started | Stage 8 |

---

## 6. Project Status Summary

### By the Numbers
- **Files:** 85+ source files across `src/`, `server/`, `docs/`, `scripts/`
- **Blocks:** 100+ custom Blockly block definitions enabled / ~317 planned
- **Scratch blocks implemented:** Motion (10), Looks (16), Sound (9), Events (8), Control (12), Sensing (6+)
- **ESP32 block categories:** 19 source files covering 17 hardware categories, with MicroPython + Arduino C++ generators
- **Generator files:** 47+ (shared framework + per-category MicroPython + per-category Arduino C++)
- **UI components:** 17 DOM-based modules
- **Lines of code:** ~20,000+ (estimated)

### Completion Status
| Area | Progress | Status |
|------|----------|--------|
| Scratch Mode (core engine) | 100% | ✅ Complete |
| Scratch blocks (core set) | 100% | ✅ Complete |
| Board Mode blocks (enabled categories) | 100% | ✅ Complete for enabled blocks |
| Code generation (MicroPython) | 100% | ✅ Complete for enabled blocks |
| Code generation (Arduino C++) | 100% | ✅ Complete for enabled blocks |
| Upload pipeline | 100% | ✅ Complete |
| Theme system | 100% | ✅ Complete |
| Monetization (UI + gating) | 100% | ✅ Complete |
| All 167 ESP32 blocks (full roadmap) | ~55% | 🟡 In progress / date-unlocked |
| Cloud saves + backend API | 0% | ❌ Not started |
| User authentication | 0% | ❌ Not started |
| Undo/redo | 0% | ❌ Not started |
| Payment integration | 0% | ❌ Not started |
| Advanced hardware debugging | 0% | ❌ Not started |
| Classroom/team features | 0% | ❌ Not started |
| Mobile app | 0% | ❌ Not started |
| AI assistant | 0% | ❌ Not started |

### Overall Progress
```
Core Application (Scratch + Board Modes)   ████████████████████ 100%  (enabled scope)
UI & Monetization                          ████████████████████ 100%
ESP32 Block Roadmap (all 167 planned)      ████████████░░░░░░░░  55%
Backend & Infrastructure                   ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   0%
Editor Enhancements                        ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   0%
Advanced Hardware Features                 ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   0%
Platform Expansion                         ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   0%
────────────────────────────────────────────────────────────────
Total: ≈ 55% complete (frontend core done, backend & expansion pending)
```

### What's Working Right Now
- Run `npm start` → Open `http://localhost:8081` → Full Scratch + Board IDE
- Save/load projects via LocalStorage or `.techyguide` file
- Upload MicroPython to ESP32 via Web Serial
- Switch between light/dark themes
- All plan-gating works (free users see upgrade prompts)

### Immediate Next Actions
1. Build Express/Fastify backend API
2. Set up PostgreSQL/MongoDB database
3. Implement user authentication (email + OAuth)
4. Move project storage from LocalStorage to cloud
5. Implement undo/redo for Blockly workspace

---

*Blueprint generated: June 10, 2026*
*Last updated: July 13, 2026*
