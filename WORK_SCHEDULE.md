# 📅 TECHYGUIDE BLOCKS — DAY-WISE WORK SCHEDULE (1-YEAR UNLOCK ROADMAP)

> **Project:** TechyGuide Blocks — Feature Unlock Roadmap  
> **Duration:** June 25, 2026 → June 25, 2027 (~12 months, **275 working days**)  
> **Driver:** Calendar date — every working day unlocks or progresses the next feature.  
> **Day 1 = TODAY (Jun 25, 2026):** bare-minimum demo — Ultrasonic + Arduino C++ + MicroPython + Upload (code uploading works live).  
> **Updated:** June 25, 2026

---

## 📋 Schedule Parameters

| Parameter | Value |
|---|---|
| **Start Date (Day 1)** | June 25, 2026 |
| **End Date (Day 275)** | June 25, 2027 |
| **Total Working Days** | 275 |
| **Work Hours** | 5:00 PM – 7:00 PM (2 hrs/day) |
| **Days OFF** | Sundays, 2nd & 4th Saturdays, Gazetted Holidays |
| **Unlock mechanism** | Real calendar date vs `UNLOCK_DATES` in `src/services/phaseConfig.js` |

> On each working day, open the app — that day's feature(s) are auto-unlocked by date. 
> To preview a future day's state, use the Phase Admin Panel → *Simulated date*.

---

## 🚫 Holiday Calendar (2026–2027)

### Gazetted Holidays

| Date | Day | Holiday |
|---|---|---|
| Jun 26, 2026 | Fri | Muharram |
| Aug 15, 2026 | Sat | Independence Day |
| Aug 26, 2026 | Wed | Milad-un-Nabi |
| Sep 04, 2026 | Fri | Janmashtami |
| Oct 02, 2026 | Fri | Gandhi Jayanti |
| Oct 20, 2026 | Tue | Dussehra |
| Nov 08, 2026 | Sun | Diwali |
| Nov 24, 2026 | Tue | Guru Nanak Jayanti |
| Dec 25, 2026 | Fri | Christmas |
| Jan 26, 2027 | Tue | Republic Day |
| Mar 04, 2027 | Thu | Holi |
| Mar 26, 2027 | Fri | Ram Navami |
| Mar 31, 2027 | Wed | Mahavir Jayanti |
| Apr 02, 2027 | Fri | Good Friday |
| May 01, 2027 | Sat | Buddha Purnima |
| May 27, 2027 | Thu | Eid-ul-Adha |

### 2nd & 4th Saturdays OFF

| Month | 2nd Saturday | 4th Saturday |
|---|---|---|
| Jun 2026 | Jun 27 |
| Jul 2026 | Jul 11 | Jul 25 |
| Aug 2026 | Aug 08 | Aug 22 |
| Sep 2026 | Sep 12 | Sep 26 |
| Oct 2026 | Oct 10 | Oct 24 |
| Nov 2026 | Nov 14 | Nov 28 |
| Dec 2026 | Dec 12 | Dec 26 |
| Jan 2027 | Jan 09 | Jan 23 |
| Feb 2027 | Feb 13 | Feb 27 |
| Mar 2027 | Mar 13 | Mar 27 |
| Apr 2027 | Apr 10 | Apr 24 |
| May 2027 | May 08 | May 22 |
| Jun 2027 | Jun 12 |

---

## 📊 Phase Summary (display only — gating is per-date)

| Phase | Display from | % | Scope |
|---|---|---|---|
| **Phase 1** | Jun 25, 2026 | 40% | ESP32 Core, Inputs, Logic, Loops, Math, Text, Variables, Functions, Temperature, LED, Buzzer |
| **Phase 2** | Jun 25, 2026 | 52% | 40 sensor blocks + Upload (Web Serial) + Serial Monitor v2 + Connect Modal |
| **Phase 3** | Sep 01, 2026 | 65% | Arduino C++ generators (live Day 1) + Compile pipeline + 13 actuator blocks |
| **Phase 4** | Nov 01, 2026 | 78% | LCD (4) + NeoPixel (3) + L298N (5) + DC Motor (3) = 15 blocks |
| **Phase 5** | Jan 01, 2027 | 90% | WiFi + BLE + HTTP + MQTT + Blynk + ThingSpeak + Storage + Library Manager |
| **Phase 6** | Apr 01, 2027 | 100% | Camera + Dabble + Multi-board + AI/ML + DB + Dashboard + Cloud + Subscription + Docs |

---

## Legend

| Symbol | Meaning |
|---|---|
| 🔓 | Unlock / enable feature (goes live by date) |
| 🧪 | Test & verify |
| 🚀 | Build + deploy |
| 📝 | Documentation / planning / review |
| 🔧 | Integration / wiring / polish |
| 🐛 | Bug fix |
| ⬛ | Holiday / OFF |

---

## ⭐ DAY 1 — TODAY (Jun 25, 2026) — Bare-Minimum Live Demo

| Item | Key | Status |
|---|---|---|
| Ultrasonic (HC-SR04) | `📏 Ultrasonic` | ✅ Live today |
| Arduino C++ code generator | `arduinoGen` | ✅ Live today |
| Arduino Compile & Upload | `arduinoUpload` | ✅ Live today |
| MicroPython Web-Serial Upload | `micropythonUpload` | ✅ Live today |

```bash
# Verify Day 1 works:
cd D:\Techyguide_Blocks_Production
npx webpack --mode development
npx webpack serve --mode development --open
# → Ultrasonic blocks appear; Arduino + MicroPython code generates;
#   Upload button compiles/uploads to a real ESP32.
```

---

---

# 📆 DAY-BY-DAY UNLOCK CALENDAR

## June 2026

| Day | Date | Task | Details |
|---|---|---|---|
| 1 | Thu 25 Jun 2026 | 🔓 Unlock: Ultrasonic (HC-SR04); Arduino C++ code generator; Arduino Compile & Upload; MicroPython Web-Serial Upload | Live in toolbox + code-gen |
| 2 | Mon 29 Jun 2026 | 🔧 Integration / polish + regression check | Harden |
| 3 | Tue 30 Jun 2026 | 📝 Month-end review — 52% milestone | Checkpoint |

## July 2026

| Day | Date | Task | Details |
|---|---|---|---|
| 4 | Wed 01 Jul 2026 | 📝 Month start — review & plan (July) | Planning |
| 2 | Fri 26 Jun 2026 | 🔓 Unlock: Environmental (BMP280, Rain) | Live in toolbox + code-gen |
| 6 | Fri 03 Jul 2026 | 🧪 Test + bug-fix polish | Verify |
| 7 | Sat 04 Jul 2026 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 8 | Mon 06 Jul 2026 | 🔧 Integration / polish + regression check | Harden |
| 9 | Tue 07 Jul 2026 | 🔓 Unlock: RFID (MFRC522) | Live in toolbox + code-gen |
| 10 | Wed 08 Jul 2026 | 🔧 Integration / polish + regression check | Harden |
| 11 | Thu 09 Jul 2026 | 🔧 Integration / polish + regression check | Harden |
| 12 | Fri 10 Jul 2026 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 13 | Mon 13 Jul 2026 | 🔓 Unlock: IR Remote | Live in toolbox + code-gen |
| 14 | Tue 14 Jul 2026 | 🔧 Integration / polish + regression check | Harden |
| 15 | Wed 15 Jul 2026 | 🔧 Integration / polish + regression check | Harden |
| 16 | Thu 16 Jul 2026 | 🔧 Integration / polish + regression check | Harden |
| 17 | Fri 17 Jul 2026 | 🔓 Unlock: Fire & Gas (Flame, MQ-2) | Live in toolbox + code-gen |
| 18 | Sat 18 Jul 2026 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 19 | Mon 20 Jul 2026 | 🔧 Integration / polish + regression check | Harden |
| 20 | Tue 21 Jul 2026 | 🔧 Integration / polish + regression check | Harden |
| 21 | Wed 22 Jul 2026 | 🔓 Unlock: Water & Rain (Level, Soil) | Live in toolbox + code-gen |
| 22 | Thu 23 Jul 2026 | 🔧 Integration / polish + regression check | Harden |
| 23 | Fri 24 Jul 2026 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 24 | Mon 27 Jul 2026 | 🔧 Integration / polish + regression check | Harden |
| 25 | Tue 28 Jul 2026 | 🔓 Unlock: Sound Sensor | Live in toolbox + code-gen |
| 26 | Wed 29 Jul 2026 | 🔧 Integration / polish + regression check | Harden |
| 27 | Thu 30 Jul 2026 | 🔧 Integration / polish + regression check | Harden |
| 28 | Fri 31 Jul 2026 | 📝 Month-end review — 52% milestone | Checkpoint |

## August 2026

| Day | Date | Task | Details |
|---|---|---|---|
| 29 | Sat 01 Aug 2026 | 🔓 Unlock: Light (LDR, BH1750) | Live in toolbox + code-gen |
| 30 | Mon 03 Aug 2026 | 🔧 Integration / polish + regression check | Harden |
| 31 | Tue 04 Aug 2026 | 🔧 Integration / polish + regression check | Harden |
| 32 | Wed 05 Aug 2026 | 🔧 Integration / polish + regression check | Harden |
| 33 | Thu 06 Aug 2026 | 🔓 Unlock: Hall Effect | Live in toolbox + code-gen |
| 34 | Fri 07 Aug 2026 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 35 | Mon 10 Aug 2026 | 🔧 Integration / polish + regression check | Harden |
| 36 | Tue 11 Aug 2026 | 🔧 Integration / polish + regression check | Harden |
| 37 | Wed 12 Aug 2026 | 🔓 Unlock: Analog / Generic | Live in toolbox + code-gen |
| 38 | Thu 13 Aug 2026 | 🔧 Integration / polish + regression check | Harden |
| 39 | Fri 14 Aug 2026 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 40 | Mon 17 Aug 2026 | 🔧 Integration / polish + regression check | Harden |
| 41 | Tue 18 Aug 2026 | 🔓 Unlock: Motion (MPU6050) | Live in toolbox + code-gen |
| 42 | Wed 19 Aug 2026 | 🔧 Integration / polish + regression check | Harden |
| 43 | Thu 20 Aug 2026 | 🔧 Integration / polish + regression check | Harden |
| 44 | Fri 21 Aug 2026 | 🔓 Unlock: Motion / Obstacle | Live in toolbox + code-gen |
| 45 | Mon 24 Aug 2026 | 🔧 Integration / polish + regression check | Harden |
| 46 | Tue 25 Aug 2026 | 🔧 Integration / polish + regression check | Harden |
| 47 | Thu 27 Aug 2026 | 🔓 Unlock: Touch & Vibration | Live in toolbox + code-gen |
| 48 | Fri 28 Aug 2026 | 🧪 Test + bug-fix polish | Verify |
| 49 | Sat 29 Aug 2026 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 50 | Mon 31 Aug 2026 | 🔓 Unlock: Serial Monitor v2 (Send) | Live in toolbox + code-gen |

## September 2026

| Day | Date | Task | Details |
|---|---|---|---|
| 51 | Tue 01 Sep 2026 | 📝 Month start — review & plan (September) | Planning |
| 52 | Wed 02 Sep 2026 | 🔧 Integration / polish + regression check | Harden |
| 53 | Thu 03 Sep 2026 | 🔓 Unlock: Connect Modal (USB pick) | Live in toolbox + code-gen |
| 54 | Sat 05 Sep 2026 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 55 | Mon 07 Sep 2026 | 🔧 Integration / polish + regression check | Harden |
| 56 | Tue 08 Sep 2026 | 🔧 Integration / polish + regression check | Harden |
| 57 | Wed 09 Sep 2026 | 🔓 Unlock: Servo (angle, sweep, detach) | Live in toolbox + code-gen |
| 58 | Thu 10 Sep 2026 | 🔧 Integration / polish + regression check | Harden |
| 59 | Fri 11 Sep 2026 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 60 | Mon 14 Sep 2026 | 🔧 Integration / polish + regression check | Harden |
| 61 | Tue 15 Sep 2026 | 🔓 Unlock: Relay (single, multi) | Live in toolbox + code-gen |
| 62 | Wed 16 Sep 2026 | 🔧 Integration / polish + regression check | Harden |
| 63 | Thu 17 Sep 2026 | 🔧 Integration / polish + regression check | Harden |
| 64 | Fri 18 Sep 2026 | 🧪 Test + bug-fix polish | Verify |
| 65 | Sat 19 Sep 2026 | 🔓 Unlock: Notification (piezo, indicator) | Live in toolbox + code-gen |
| 66 | Mon 21 Sep 2026 | 🔧 Integration / polish + regression check | Harden |
| 67 | Tue 22 Sep 2026 | 🔧 Integration / polish + regression check | Harden |
| 68 | Wed 23 Sep 2026 | 🔧 Integration / polish + regression check | Harden |
| 69 | Thu 24 Sep 2026 | 🔓 Unlock: Music (note, melody) | Live in toolbox + code-gen |
| 70 | Fri 25 Sep 2026 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 71 | Mon 28 Sep 2026 | 🔧 Integration / polish + regression check | Harden |
| 72 | Tue 29 Sep 2026 | 🔧 Integration / polish + regression check | Harden |
| 73 | Wed 30 Sep 2026 | 🔓 Unlock: Water Pump (on/off, speed) | Live in toolbox + code-gen |

## October 2026

| Day | Date | Task | Details |
|---|---|---|---|
| 74 | Thu 01 Oct 2026 | 📝 Month start — review & plan (October) | Planning |
| 75 | Sat 03 Oct 2026 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 76 | Mon 05 Oct 2026 | 🔧 Integration / polish + regression check | Harden |
| 77 | Tue 06 Oct 2026 | 🔧 Integration / polish + regression check | Harden |
| 78 | Wed 07 Oct 2026 | 🔧 Integration / polish + regression check | Harden |
| 79 | Thu 08 Oct 2026 | 🔧 Integration / polish + regression check | Harden |
| 80 | Fri 09 Oct 2026 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 81 | Mon 12 Oct 2026 | 🔧 Integration / polish + regression check | Harden |
| 82 | Tue 13 Oct 2026 | 🔓 Unlock: Displays + LCD I2C (init/print/cursor/clear/backlight) | Live in toolbox + code-gen |
| 83 | Wed 14 Oct 2026 | 🔧 Integration / polish + regression check | Harden |
| 84 | Thu 15 Oct 2026 | 🔧 Integration / polish + regression check | Harden |
| 85 | Fri 16 Oct 2026 | 🧪 Test + bug-fix polish | Verify |
| 86 | Sat 17 Oct 2026 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 87 | Mon 19 Oct 2026 | 🔧 Integration / polish + regression check | Harden |
| 88 | Wed 21 Oct 2026 | 🔓 Unlock: NeoPixel WS2812B (init/set/fill/rainbow) | Live in toolbox + code-gen |
| 89 | Thu 22 Oct 2026 | 🔧 Integration / polish + regression check | Harden |
| 90 | Fri 23 Oct 2026 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 91 | Mon 26 Oct 2026 | 🔧 Integration / polish + regression check | Harden |
| 92 | Tue 27 Oct 2026 | 🔧 Integration / polish + regression check | Harden |
| 93 | Wed 28 Oct 2026 | 🔧 Integration / polish + regression check | Harden |
| 94 | Thu 29 Oct 2026 | 🔓 Unlock: Motors + L298N (init/fwd/rev/speed/stop) | Live in toolbox + code-gen |
| 95 | Fri 30 Oct 2026 | 🧪 Test + bug-fix polish | Verify |
| 96 | Sat 31 Oct 2026 | 📝 Month-end review — 65% milestone | Checkpoint |

## November 2026

| Day | Date | Task | Details |
|---|---|---|---|
| 97 | Mon 02 Nov 2026 | 📝 Month start — review & plan (November) | Planning |
| 98 | Tue 03 Nov 2026 | 🔧 Integration / polish + regression check | Harden |
| 99 | Wed 04 Nov 2026 | 🔧 Integration / polish + regression check | Harden |
| 100 | Thu 05 Nov 2026 | 🔓 Unlock: DC Motor (init/speed/direction) | Live in toolbox + code-gen |
| 101 | Fri 06 Nov 2026 | 🧪 Test + bug-fix polish | Verify |
| 102 | Sat 07 Nov 2026 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 103 | Mon 09 Nov 2026 | 🔧 Integration / polish + regression check | Harden |
| 104 | Tue 10 Nov 2026 | 🔧 Integration / polish + regression check | Harden |
| 105 | Wed 11 Nov 2026 | 🔧 Integration / polish + regression check | Harden |
| 106 | Thu 12 Nov 2026 | 🔓 Unlock: Comms & IoT + WiFi (8 blocks) | Live in toolbox + code-gen |
| 107 | Fri 13 Nov 2026 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 108 | Mon 16 Nov 2026 | 🔧 Integration / polish + regression check | Harden |
| 109 | Tue 17 Nov 2026 | 🔧 Integration / polish + regression check | Harden |
| 110 | Wed 18 Nov 2026 | 🔧 Integration / polish + regression check | Harden |
| 111 | Thu 19 Nov 2026 | 🔧 Integration / polish + regression check | Harden |
| 112 | Fri 20 Nov 2026 | 🔓 Unlock: Bluetooth LE (6 blocks) | Live in toolbox + code-gen |
| 113 | Sat 21 Nov 2026 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 114 | Mon 23 Nov 2026 | 🔧 Integration / polish + regression check | Harden |
| 115 | Wed 25 Nov 2026 | 🔧 Integration / polish + regression check | Harden |
| 116 | Thu 26 Nov 2026 | 🔧 Integration / polish + regression check | Harden |
| 117 | Fri 27 Nov 2026 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 118 | Mon 30 Nov 2026 | 🔓 Unlock: HTTP Client (8 blocks) | Live in toolbox + code-gen |

## December 2026

| Day | Date | Task | Details |
|---|---|---|---|
| 119 | Tue 01 Dec 2026 | 📝 Month start — review & plan (December) | Planning |
| 120 | Wed 02 Dec 2026 | 🔧 Integration / polish + regression check | Harden |
| 121 | Thu 03 Dec 2026 | 🔧 Integration / polish + regression check | Harden |
| 122 | Fri 04 Dec 2026 | 🧪 Test + bug-fix polish | Verify |
| 123 | Sat 05 Dec 2026 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 124 | Mon 07 Dec 2026 | 🔧 Integration / polish + regression check | Harden |
| 125 | Tue 08 Dec 2026 | 🔓 Unlock: MQTT (10 blocks) | Live in toolbox + code-gen |
| 126 | Wed 09 Dec 2026 | 🔧 Integration / polish + regression check | Harden |
| 127 | Thu 10 Dec 2026 | 🔧 Integration / polish + regression check | Harden |
| 128 | Fri 11 Dec 2026 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 129 | Mon 14 Dec 2026 | 🔧 Integration / polish + regression check | Harden |
| 130 | Tue 15 Dec 2026 | 🔧 Integration / polish + regression check | Harden |
| 131 | Wed 16 Dec 2026 | 🔧 Integration / polish + regression check | Harden |
| 132 | Thu 17 Dec 2026 | 🔧 Integration / polish + regression check | Harden |
| 133 | Fri 18 Dec 2026 | 🔓 Unlock: Blynk IoT (8 blocks) | Live in toolbox + code-gen |
| 134 | Sat 19 Dec 2026 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 135 | Mon 21 Dec 2026 | 🔧 Integration / polish + regression check | Harden |
| 136 | Tue 22 Dec 2026 | 🔧 Integration / polish + regression check | Harden |
| 137 | Wed 23 Dec 2026 | 🔧 Integration / polish + regression check | Harden |
| 138 | Thu 24 Dec 2026 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 139 | Mon 28 Dec 2026 | 🔧 Integration / polish + regression check | Harden |
| 140 | Tue 29 Dec 2026 | 🔓 Unlock: ThingSpeak (6 blocks) | Live in toolbox + code-gen |
| 141 | Wed 30 Dec 2026 | 🔧 Integration / polish + regression check | Harden |
| 142 | Thu 31 Dec 2026 | 📝 Month-end review — 78% milestone | Checkpoint |

## January 2027

| Day | Date | Task | Details |
|---|---|---|---|
| 143 | Fri 01 Jan 2027 | 📝 Month start — review & plan (January) | Planning |
| 144 | Sat 02 Jan 2027 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 145 | Mon 04 Jan 2027 | 🔧 Integration / polish + regression check | Harden |
| 146 | Tue 05 Jan 2027 | 🔓 Unlock: Storage / Logger (4 blocks) | Live in toolbox + code-gen |
| 147 | Wed 06 Jan 2027 | 🔧 Integration / polish + regression check | Harden |
| 148 | Thu 07 Jan 2027 | 🔧 Integration / polish + regression check | Harden |
| 149 | Fri 08 Jan 2027 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 150 | Mon 11 Jan 2027 | 🔧 Integration / polish + regression check | Harden |
| 151 | Tue 12 Jan 2027 | 🔓 Unlock: Library Manager (install/uninstall) | Live in toolbox + code-gen |
| 152 | Wed 13 Jan 2027 | 🔧 Integration / polish + regression check | Harden |
| 153 | Thu 14 Jan 2027 | 🔧 Integration / polish + regression check | Harden |
| 154 | Fri 15 Jan 2027 | 🧪 Test + bug-fix polish | Verify |
| 155 | Sat 16 Jan 2027 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 156 | Mon 18 Jan 2027 | 🔧 Integration / polish + regression check | Harden |
| 157 | Tue 19 Jan 2027 | 🔧 Integration / polish + regression check | Harden |
| 158 | Wed 20 Jan 2027 | 🔓 Unlock: Camera — ESP32-CAM (6 blocks) | Live in toolbox + code-gen |
| 159 | Thu 21 Jan 2027 | 🔧 Integration / polish + regression check | Harden |
| 160 | Fri 22 Jan 2027 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 161 | Mon 25 Jan 2027 | 🔧 Integration / polish + regression check | Harden |
| 162 | Wed 27 Jan 2027 | 🔧 Integration / polish + regression check | Harden |
| 163 | Thu 28 Jan 2027 | 🔧 Integration / polish + regression check | Harden |
| 164 | Fri 29 Jan 2027 | 🧪 Test + bug-fix polish | Verify |
| 165 | Sat 30 Jan 2027 | 🔓 Unlock: Dabble mobile app (7 blocks) | Live in toolbox + code-gen |

## February 2027

| Day | Date | Task | Details |
|---|---|---|---|
| 166 | Mon 01 Feb 2027 | 📝 Month start — review & plan (February) | Planning |
| 167 | Tue 02 Feb 2027 | 🔧 Integration / polish + regression check | Harden |
| 168 | Wed 03 Feb 2027 | 🔧 Integration / polish + regression check | Harden |
| 169 | Thu 04 Feb 2027 | 🔧 Integration / polish + regression check | Harden |
| 170 | Fri 05 Feb 2027 | 🧪 Test + bug-fix polish | Verify |
| 171 | Sat 06 Feb 2027 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 172 | Mon 08 Feb 2027 | 🔧 Integration / polish + regression check | Harden |
| 173 | Tue 09 Feb 2027 | 🔓 Unlock: Multi-board selector (ESP32 variants, Pico, RPi) | Live in toolbox + code-gen |
| 174 | Wed 10 Feb 2027 | 🔧 Integration / polish + regression check | Harden |
| 175 | Thu 11 Feb 2027 | 🔧 Integration / polish + regression check | Harden |
| 176 | Fri 12 Feb 2027 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 177 | Mon 15 Feb 2027 | 🔧 Integration / polish + regression check | Harden |
| 178 | Tue 16 Feb 2027 | 🔧 Integration / polish + regression check | Harden |
| 179 | Wed 17 Feb 2027 | 🔧 Integration / polish + regression check | Harden |
| 180 | Thu 18 Feb 2027 | 🔓 Unlock: AI/ML — TF Lite (6 blocks) | Live in toolbox + code-gen |
| 181 | Fri 19 Feb 2027 | 🧪 Test + bug-fix polish | Verify |
| 182 | Sat 20 Feb 2027 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 183 | Mon 22 Feb 2027 | 🔧 Integration / polish + regression check | Harden |
| 184 | Tue 23 Feb 2027 | 🔧 Integration / polish + regression check | Harden |
| 185 | Wed 24 Feb 2027 | 🔧 Integration / polish + regression check | Harden |
| 186 | Thu 25 Feb 2027 | 🔧 Integration / polish + regression check | Harden |
| 187 | Fri 26 Feb 2027 | 📝 Month-end review — 90% milestone | Checkpoint |

## March 2027

| Day | Date | Task | Details |
|---|---|---|---|
| 188 | Mon 01 Mar 2027 | 🔓 Unlock: Database — Firebase + Supabase (8 blocks) | Live in toolbox + code-gen |
| 189 | Tue 02 Mar 2027 | 🔧 Integration / polish + regression check | Harden |
| 190 | Wed 03 Mar 2027 | 🔧 Integration / polish + regression check | Harden |
| 191 | Fri 05 Mar 2027 | 🧪 Test + bug-fix polish | Verify |
| 192 | Sat 06 Mar 2027 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 193 | Mon 08 Mar 2027 | 🔧 Integration / polish + regression check | Harden |
| 194 | Tue 09 Mar 2027 | 🔧 Integration / polish + regression check | Harden |
| 195 | Wed 10 Mar 2027 | 🔧 Integration / polish + regression check | Harden |
| 196 | Thu 11 Mar 2027 | 🔓 Unlock: Cloud project save/load + version history | Live in toolbox + code-gen |
| 197 | Fri 12 Mar 2027 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 198 | Mon 15 Mar 2027 | 🔧 Integration / polish + regression check | Harden |
| 199 | Tue 16 Mar 2027 | 🔧 Integration / polish + regression check | Harden |
| 200 | Wed 17 Mar 2027 | 🔧 Integration / polish + regression check | Harden |
| 201 | Thu 18 Mar 2027 | 🔧 Integration / polish + regression check | Harden |
| 202 | Fri 19 Mar 2027 | 🧪 Test + bug-fix polish | Verify |
| 203 | Sat 20 Mar 2027 | 🔓 Unlock: Real-time Dashboard + data export | Live in toolbox + code-gen |
| 204 | Mon 22 Mar 2027 | 🔧 Integration / polish + regression check | Harden |
| 205 | Tue 23 Mar 2027 | 🔧 Integration / polish + regression check | Harden |
| 206 | Wed 24 Mar 2027 | 🔧 Integration / polish + regression check | Harden |
| 207 | Thu 25 Mar 2027 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 208 | Mon 29 Mar 2027 | 🔧 Integration / polish + regression check | Harden |
| 209 | Tue 30 Mar 2027 | 📝 Month-end review — 90% milestone | Checkpoint |

## April 2027

| Day | Date | Task | Details |
|---|---|---|---|
| 210 | Thu 01 Apr 2027 | 🔓 Unlock: Subscription / license system | Live in toolbox + code-gen |
| 211 | Sat 03 Apr 2027 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 212 | Mon 05 Apr 2027 | 🔧 Integration / polish + regression check | Harden |
| 213 | Tue 06 Apr 2027 | 🔧 Integration / polish + regression check | Harden |
| 214 | Wed 07 Apr 2027 | 🔧 Integration / polish + regression check | Harden |
| 215 | Thu 08 Apr 2027 | 🔧 Integration / polish + regression check | Harden |
| 216 | Fri 09 Apr 2027 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 217 | Mon 12 Apr 2027 | 🔧 Integration / polish + regression check | Harden |
| 218 | Tue 13 Apr 2027 | 🔧 Integration / polish + regression check | Harden |
| 219 | Wed 14 Apr 2027 | 🔧 Integration / polish + regression check | Harden |
| 220 | Thu 15 Apr 2027 | 🔧 Integration / polish + regression check | Harden |
| 221 | Fri 16 Apr 2027 | 🧪 Test + bug-fix polish | Verify |
| 222 | Sat 17 Apr 2027 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 223 | Mon 19 Apr 2027 | 🔧 Integration / polish + regression check | Harden |
| 224 | Tue 20 Apr 2027 | 🔧 Integration / polish + regression check | Harden |
| 225 | Wed 21 Apr 2027 | 🔧 Integration / polish + regression check | Harden |
| 226 | Thu 22 Apr 2027 | 🔧 Integration / polish + regression check | Harden |
| 227 | Fri 23 Apr 2027 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 228 | Mon 26 Apr 2027 | 🔧 Integration / polish + regression check | Harden |
| 229 | Tue 27 Apr 2027 | 🔧 Integration / polish + regression check | Harden |
| 230 | Wed 28 Apr 2027 | 🔧 Integration / polish + regression check | Harden |
| 231 | Thu 29 Apr 2027 | 🔧 Integration / polish + regression check | Harden |
| 232 | Fri 30 Apr 2027 | 📝 Month-end review — 100% milestone | Checkpoint |

## May 2027

| Day | Date | Task | Details |
|---|---|---|---|
| 233 | Mon 03 May 2027 | 📝 Month start — review & plan (May) | Planning |
| 234 | Tue 04 May 2027 | 🔧 Integration / polish + regression check | Harden |
| 235 | Wed 05 May 2027 | 🔧 Integration / polish + regression check | Harden |
| 236 | Thu 06 May 2027 | 🔧 Integration / polish + regression check | Harden |
| 237 | Fri 07 May 2027 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 238 | Mon 10 May 2027 | 🔧 Integration / polish + regression check | Harden |
| 239 | Tue 11 May 2027 | 🔧 Integration / polish + regression check | Harden |
| 240 | Wed 12 May 2027 | 🔧 Integration / polish + regression check | Harden |
| 241 | Thu 13 May 2027 | 🔧 Integration / polish + regression check | Harden |
| 242 | Fri 14 May 2027 | 🧪 Test + bug-fix polish | Verify |
| 243 | Sat 15 May 2027 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 244 | Mon 17 May 2027 | 🔧 Integration / polish + regression check | Harden |
| 245 | Tue 18 May 2027 | 🔧 Integration / polish + regression check | Harden |
| 246 | Wed 19 May 2027 | 🔧 Integration / polish + regression check | Harden |
| 247 | Thu 20 May 2027 | 🔧 Integration / polish + regression check | Harden |
| 248 | Fri 21 May 2027 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 249 | Mon 24 May 2027 | 🔧 Integration / polish + regression check | Harden |
| 250 | Tue 25 May 2027 | 🔧 Integration / polish + regression check | Harden |
| 251 | Wed 26 May 2027 | 🔧 Integration / polish + regression check | Harden |
| 252 | Fri 28 May 2027 | 🧪 Test + bug-fix polish | Verify |
| 253 | Sat 29 May 2027 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 254 | Mon 31 May 2027 | 📝 Month-end review — 100% milestone | Checkpoint |

## June 2027

| Day | Date | Task | Details |
|---|---|---|---|
| 255 | Tue 01 Jun 2027 | 📝 Month start — review & plan (June) | Planning |
| 256 | Wed 02 Jun 2027 | 🔧 Integration / polish + regression check | Harden |
| 257 | Thu 03 Jun 2027 | 🔧 Integration / polish + regression check | Harden |
| 258 | Fri 04 Jun 2027 | 🧪 Test + bug-fix polish | Verify |
| 259 | Sat 05 Jun 2027 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 260 | Mon 07 Jun 2027 | 🔧 Integration / polish + regression check | Harden |
| 261 | Tue 08 Jun 2027 | 🔧 Integration / polish + regression check | Harden |
| 262 | Wed 09 Jun 2027 | 🔧 Integration / polish + regression check | Harden |
| 263 | Thu 10 Jun 2027 | 🔧 Integration / polish + regression check | Harden |
| 264 | Fri 11 Jun 2027 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 265 | Mon 14 Jun 2027 | 🔧 Integration / polish + regression check | Harden |
| 266 | Tue 15 Jun 2027 | 🔧 Integration / polish + regression check | Harden |
| 267 | Wed 16 Jun 2027 | 🔧 Integration / polish + regression check | Harden |
| 268 | Thu 17 Jun 2027 | 🔧 Integration / polish + regression check | Harden |
| 269 | Fri 18 Jun 2027 | 🧪 Test + bug-fix polish | Verify |
| 270 | Sat 19 Jun 2027 | 🚀 Deploy + integration test of the week's unlocks | Build & verify |
| 271 | Mon 21 Jun 2027 | 🔧 Integration / polish + regression check | Harden |
| 272 | Tue 22 Jun 2027 | 🔧 Integration / polish + regression check | Harden |
| 273 | Wed 23 Jun 2027 | 🔧 Integration / polish + regression check | Harden |
| 274 | Thu 24 Jun 2027 | 🔧 Integration / polish + regression check | Harden |
| 275 | Fri 25 Jun 2027 | 📝 Month-end review — 100% milestone | Checkpoint |

---

## 🔑 Unlock Dates → Code Map (single source of truth)

All gating reads `UNLOCK_DATES` in `src/services/phaseConfig.js`. 
On each date below, the listed item becomes live (toolbox visible + generator active + upload allowed).

| Working Day | Date | Key | Kind | Label |
|---|---|---|---|---|
| 1 | 2026-06-25 | `📏 Ultrasonic` | sensor | Ultrasonic (HC-SR04) |
| 1 | 2026-06-25 | `arduinoGen` | feature | Arduino C++ code generator |
| 1 | 2026-06-25 | `arduinoUpload` | feature | Arduino Compile & Upload |
| 1 | 2026-06-25 | `micropythonUpload` | feature | MicroPython Web-Serial Upload |
| 2 | 2026-06-26 | `🌦️ Environmental` | sensor | Environmental (BMP280, Rain) |
| 9 | 2026-07-07 | `📡 RFID (MFRC522)` | sensor | RFID (MFRC522) |
| 13 | 2026-07-13 | `📺 IR Remote` | sensor | IR Remote |
| 17 | 2026-07-17 | `🔥 Fire & Gas` | sensor | Fire & Gas (Flame, MQ-2) |
| 21 | 2026-07-22 | `💧 Water & Rain` | sensor | Water & Rain (Level, Soil) |
| 25 | 2026-07-28 | `🔊 Sound` | sensor | Sound Sensor |
| 29 | 2026-08-01 | `💡 Light` | sensor | Light (LDR, BH1750) |
| 33 | 2026-08-06 | `🧲 Hall Effect` | sensor | Hall Effect |
| 37 | 2026-08-12 | `🎛️ Analog / Generic` | sensor | Analog / Generic |
| 41 | 2026-08-18 | `📐 Motion (MPU6050)` | sensor | Motion (MPU6050) |
| 44 | 2026-08-21 | `👁️ Motion / Obstacle` | sensor | Motion / Obstacle |
| 47 | 2026-08-27 | `👆 Touch & Vibration` | sensor | Touch & Vibration |
| 50 | 2026-08-31 | `serialSend` | feature | Serial Monitor v2 (Send) |
| 53 | 2026-09-03 | `connectModal` | feature | Connect Modal (USB pick) |
| 57 | 2026-09-09 | `Servo` | actuator | Servo (angle, sweep, detach) |
| 61 | 2026-09-15 | `Relay` | actuator | Relay (single, multi) |
| 65 | 2026-09-19 | `Notification` | actuator | Notification (piezo, indicator) |
| 69 | 2026-09-24 | `Music` | actuator | Music (note, melody) |
| 73 | 2026-09-30 | `Water Pump` | actuator | Water Pump (on/off, speed) |
| 82 | 2026-10-13 | `Displays` | category | Displays + LCD I2C (init/print/cursor/clear/backlight) |
| 88 | 2026-10-21 | `NeoPixel` | category | NeoPixel WS2812B (init/set/fill/rainbow) |
| 94 | 2026-10-29 | `Motors` | category | Motors + L298N (init/fwd/rev/speed/stop) |
| 100 | 2026-11-05 | `DC Motor` | actuator | DC Motor (init/speed/direction) |
| 106 | 2026-11-12 | `Comms & IoT` | category | Comms & IoT + WiFi (8 blocks) |
| 112 | 2026-11-20 | `BLE` | sensor | Bluetooth LE (6 blocks) |
| 118 | 2026-11-30 | `HTTP` | sensor | HTTP Client (8 blocks) |
| 125 | 2026-12-08 | `MQTT` | sensor | MQTT (10 blocks) |
| 133 | 2026-12-18 | `Blynk` | sensor | Blynk IoT (8 blocks) |
| 140 | 2026-12-29 | `ThingSpeak` | sensor | ThingSpeak (6 blocks) |
| 146 | 2027-01-05 | `Storage` | sensor | Storage / Logger (4 blocks) |
| 151 | 2027-01-12 | `libraryManager` | feature | Library Manager (install/uninstall) |
| 158 | 2027-01-20 | `Camera` | category | Camera — ESP32-CAM (6 blocks) |
| 165 | 2027-01-30 | `Dabble` | category | Dabble mobile app (7 blocks) |
| 173 | 2027-02-09 | `boardSelection` | feature | Multi-board selector (ESP32 variants, Pico, RPi) |
| 180 | 2027-02-18 | `AI/ML` | sensor | AI/ML — TF Lite (6 blocks) |
| 188 | 2027-03-01 | `Database` | sensor | Database — Firebase + Supabase (8 blocks) |
| 196 | 2027-03-11 | `cloudSave` | feature | Cloud project save/load + version history |
| 203 | 2027-03-20 | `Dashboard` | sensor | Real-time Dashboard + data export |
| 210 | 2027-04-01 | `subscription` | feature | Subscription / license system |

---

## 📊 Progress Milestones

```
Jun 25, 2026  ┃ PHASE 1       ████████░░░░░░░░░░░░  40%
Jun 25, 2026  ┃ PHASE 2       ██████████░░░░░░░░░░  52%
Sep 01, 2026  ┃ PHASE 3       █████████████░░░░░░░  65%
Nov 01, 2026  ┃ PHASE 4       ███████████████░░░░░  78%
Jan 01, 2027  ┃ PHASE 5       ██████████████████░░  90%
Apr 01, 2027  ┃ PHASE 6       ████████████████████  100%
```

---

*Schedule regenerated: June 25, 2026 — spans 275 working days (Jun 25 2026 → Jun 25 2027).*  
*Gating source: `src/services/phaseConfig.js` → `UNLOCK_DATES` + `PHASE_START_DATES`.*  
*Generator: `scripts/generate_schedule.py`.*
