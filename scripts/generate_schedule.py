#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Single source of truth for the TechyGuide Blocks day-wise unlock schedule.

Produces:
  1. WORK_SCHEDULE.md            (rewritten 1-year day-by-day plan)
  2. console output: UNLOCK_DATES + PHASE_START_DATES + PHASE_2_SCHEDULE (JS)

Calendar rules:
  - Start: 25 Jun 2026 (Day 1). Span: 1 year -> 25 Jun 2027.
  - OFF: Sundays, 2nd & 4th Saturdays, gazetted holidays.
  - Day 1 (today) = BARE MINIMUM: Ultrasonic + Arduino C++ gen + Arduino upload
    + MicroPython upload (so code uploading demonstrably works on day 1).
"""
from datetime import date, timedelta
from collections import defaultdict

# ── Holidays ──────────────────────────────────────────────────────────────
HOLIDAYS = {
    date(2026, 6, 26):  "Muharram",
    date(2026, 8, 15):  "Independence Day",
    date(2026, 8, 26):  "Milad-un-Nabi",
    date(2026, 9, 4):   "Janmashtami",
    date(2026, 10, 2):  "Gandhi Jayanti",
    date(2026, 10, 20): "Dussehra",
    date(2026, 11, 8):  "Diwali",
    date(2026, 11, 24): "Guru Nanak Jayanti",
    date(2026, 12, 25): "Christmas",
    date(2027, 1, 26):  "Republic Day",
    date(2027, 3, 4):   "Holi",
    date(2027, 3, 26):  "Ram Navami",
    date(2027, 3, 31):  "Mahavir Jayanti",
    date(2027, 4, 2):   "Good Friday",
    date(2027, 5, 1):   "Buddha Purnima",
    date(2027, 5, 27):  "Eid-ul-Adha",
}

def off_reason(d):
    if d.weekday() == 6:                       # Sunday
        return "Sunday"
    if d.weekday() == 5:                       # Saturday -> 2nd/4th off
        satnum = (d.day - 1) // 7 + 1
        if satnum in (2, 4):
            return f"{satnum} Saturday"
    if d in HOLIDAYS:
        return HOLIDAYS[d]
    return None

# ── Build working-day list (Day n -> date) ────────────────────────────────
START = date(2026, 6, 25)
END   = date(2027, 6, 25)   # 1-year span
working = []
off_list = []
d = START
while d <= END:
    r = off_reason(d)
    if r:
        off_list.append((d, r))
    else:
        working.append(d)
    d += timedelta(days=1)

WD = {i + 1: dt for i, dt in enumerate(working)}      # day number -> date
DATE_TO_WD = {dt: i for i, dt in WD.items()}           # date -> day number
TOTAL = len(working)

# ── Unlock plan ───────────────────────────────────────────────────────────
# Each entry: working-day number -> list of (kind, key, label)
#   kind in: sensor, sensor_group, actuator, category, feature
UNLOCK = {
    # ===== DAY 1 — BARE MINIMUM DEMO (today) =====
    1: [
        ("sensor",  "📏 Ultrasonic",        "Ultrasonic (HC-SR04)"),
        ("feature", "arduinoGen",           "Arduino C++ code generator"),
        ("feature", "arduinoUpload",        "Arduino Compile & Upload"),
        ("feature", "micropythonUpload",    "MicroPython Web-Serial Upload"),
    ],
    # ===== Sensors =====
    2:  [("sensor", "🌦️ Environmental",     "Environmental (BMP280, Rain)")],
    9:  [("sensor", "📡 RFID (MFRC522)",     "RFID (MFRC522)")],
    13: [("sensor", "📺 IR Remote",          "IR Remote")],
    17: [("sensor", "🔥 Fire & Gas",         "Fire & Gas (Flame, MQ-2)")],
    21: [("sensor", "💧 Water & Rain",       "Water & Rain (Level, Soil)")],
    25: [("sensor", "🔊 Sound",              "Sound Sensor")],
    29: [("sensor", "💡 Light",              "Light (LDR, BH1750)")],
    33: [("sensor", "🧲 Hall Effect",        "Hall Effect")],
    37: [("sensor", "🎛️ Analog / Generic",   "Analog / Generic")],
    41: [("sensor", "📐 Motion (MPU6050)",   "Motion (MPU6050)")],
    44: [("sensor", "👁️ Motion / Obstacle",  "Motion / Obstacle")],
    47: [("sensor", "👆 Touch & Vibration",  "Touch & Vibration")],
    50: [("feature","serialSend",            "Serial Monitor v2 (Send)")],
    53: [("feature","connectModal",          "Connect Modal (USB pick)")],
    # ===== Actuators (Arduino gen already live from Day 1) =====
    57: [("actuator","Servo",                "Servo (angle, sweep, detach)")],
    61: [("actuator","Relay",                "Relay (single, multi)")],
    65: [("actuator","Notification",         "Notification (piezo, indicator)")],
    69: [("actuator","Music",                "Music (note, melody)")],
    73: [("actuator","Water Pump",           "Water Pump (on/off, speed)")],
    # ===== Displays + Motors =====
    82: [("category","Displays",             "Displays + LCD I2C (init/print/cursor/clear/backlight)")],
    88: [("category","NeoPixel",             "NeoPixel WS2812B (init/set/fill/rainbow)")],
    94: [("category","Motors",               "Motors + L298N (init/fwd/rev/speed/stop)")],
    100:[("actuator","DC Motor",             "DC Motor (init/speed/direction)")],
    # ===== Communication + IoT =====
    106:[("category","Comms & IoT",          "Comms & IoT + WiFi (8 blocks)")],
    112:[("sensor","BLE",                    "Bluetooth LE (6 blocks)")],
    118:[("sensor","HTTP",                   "HTTP Client (8 blocks)")],
    125:[("sensor","MQTT",                   "MQTT (10 blocks)")],
    133:[("sensor","Blynk",                  "Blynk IoT (8 blocks)")],
    140:[("sensor","ThingSpeak",             "ThingSpeak (6 blocks)")],
    146:[("sensor","Storage",                "Storage / Logger (4 blocks)")],
    151:[("feature","libraryManager",        "Library Manager (install/uninstall)")],
    # ===== Advanced =====
    158:[("category","Camera",               "Camera — ESP32-CAM (6 blocks)")],
    165:[("category","Dabble",               "Dabble mobile app (7 blocks)")],
    173:[("feature","boardSelection",        "Multi-board selector (ESP32 variants, Pico, RPi)")],
    180:[("sensor","AI/ML",                  "AI/ML — TF Lite (6 blocks)")],
    188:[("sensor","Database",               "Database — Firebase + Supabase (8 blocks)")],
    196:[("feature","cloudSave",             "Cloud project save/load + version history")],
    203:[("sensor","Dashboard",              "Real-time Dashboard + data export")],
    210:[("feature","subscription",          "Subscription / license system")],
}

# ── Phase display boundaries (for the % progress label only) ──────────────
# Gating is by UNLOCK_DATES; these only drive the cosmetic phase label.
PHASE_START_DATES = {
    1: "2026-06-25",   # Foundation (live Day 1)
    2: "2026-06-25",   # Sensors + Upload (Ultrasonic demo live Day 1)
    3: "2026-09-01",   # Arduino + Actuators full suite
    4: "2026-11-01",   # Displays + Motors
    5: "2027-01-01",   # Communication + IoT
    6: "2027-04-01",   # Advanced / Full release
}
PHASE_PCT = {1: 40, 2: 52, 3: 65, 4: 78, 5: 90, 6: 100}

# ── Build UNLOCK_DATES (key -> "YYYY-MM-DD") for the code ─────────────────
UNLOCK_DATES = {}
for wd, items in UNLOCK.items():
    iso = WD[wd].isoformat()
    for kind, key, label in items:
        UNLOCK_DATES[key] = iso

# ── Determine per-day task text for the markdown ──────────────────────────
def first_wd_of_month(dt):
    return DATE_TO_WD.get(date(dt.year, dt.month, min(
        dd for dd in range(1, 32)
        if date(dt.year, dt.month, dd) in DATE_TO_WD)))

def last_wd_of_month(dt):
    return DATE_TO_WD.get(date(dt.year, dt.month, max(
        dd for dd in range(31, 0, -1)
        if date(dt.year, dt.month, dd) in DATE_TO_WD)))

# precompute month first/last working days
month_first = {}
month_last = {}
for wd, dt in WD.items():
    mk = (dt.year, dt.month)
    if mk not in month_first:
        month_first[mk] = wd
    month_last[mk] = wd

# group working days into calendar weeks (Mon-Sun) for weekly deploy/test
week_of = {}
for wd, dt in WD.items():
    monday = dt - timedelta(days=dt.weekday())
    week_of[wd] = monday
# last working day of each week
week_last_wd = {}
for wd, dt in WD.items():
    m = week_of[wd]
    if wd > week_last_wd.get(m, 0):
        week_last_wd[m] = wd

def task_for(wd, dt):
    if wd in UNLOCK:
        labels = "; ".join(lbl for _, _, lbl in UNLOCK[wd])
        return ("🔓", f"Unlock: {labels}", "Live in toolbox + code-gen")
    mk = (dt.year, dt.month)
    is_week_last = (wd == week_last_wd[week_of[wd]])
    if wd == month_first.get(mk):
        return ("📝", f"Month start — review & plan ({dt.strftime('%B')})", "Planning")
    if wd == month_last.get(mk):
        return ("📝", f"Month-end review — {PHASE_PCT[current_phase(dt)]}% milestone", "Checkpoint")
    if is_week_last:
        return ("🚀", "Deploy + integration test of the week's unlocks", "Build & verify")
    if dt.weekday() == 4:  # Friday (mid-week when Sat is off)
        return ("🧪", "Test + bug-fix polish", "Verify")
    return ("🔧", "Integration / polish + regression check", "Harden")

def current_phase(dt):
    iso = dt.isoformat()
    p = 1
    for ph, ds in sorted(PHASE_START_DATES.items()):
        if iso >= ds:
            p = ph
    return p

# ── Write WORK_SCHEDULE.md ────────────────────────────────────────────────
lines = []
A = lines.append
A("# 📅 TECHYGUIDE BLOCKS — DAY-WISE WORK SCHEDULE (1-YEAR UNLOCK ROADMAP)")
A("")
A("> **Project:** TechyGuide Blocks — Feature Unlock Roadmap  ")
A(f"> **Duration:** June 25, 2026 → June 25, 2027 (~12 months, **{TOTAL} working days**)  ")
A("> **Driver:** Calendar date — every working day unlocks or progresses the next feature.  ")
A("> **Day 1 = TODAY (Jun 25, 2026):** bare-minimum demo — Ultrasonic + Arduino C++ + MicroPython + Upload (code uploading works live).  ")
A("> **Updated:** June 25, 2026")
A("")
A("---")
A("")
A("## 📋 Schedule Parameters")
A("")
A("| Parameter | Value |")
A("|---|---|")
A(f"| **Start Date (Day 1)** | June 25, 2026 |")
A(f"| **End Date (Day {TOTAL})** | June 25, 2027 |")
A("| **Total Working Days** | %d |" % TOTAL)
A("| **Work Hours** | 5:00 PM – 7:00 PM (2 hrs/day) |")
A("| **Days OFF** | Sundays, 2nd & 4th Saturdays, Gazetted Holidays |")
A("| **Unlock mechanism** | Real calendar date vs `UNLOCK_DATES` in `src/services/phaseConfig.js` |")
A("")
A("> On each working day, open the app — that day's feature(s) are auto-unlocked by date. ")
A("> To preview a future day's state, use the Phase Admin Panel → *Simulated date*.")
A("")
A("---")
A("")
A("## 🚫 Holiday Calendar (2026–2027)")
A("")
A("### Gazetted Holidays")
A("")
A("| Date | Day | Holiday |")
A("|---|---|---|")
for dt in sorted(HOLIDAYS):
    A(f"| {dt.strftime('%b %d, %Y')} | {dt.strftime('%a')} | {HOLIDAYS[dt]} |")
A("")
A("### 2nd & 4th Saturdays OFF")
A("")
A("| Month | 2nd Saturday | 4th Saturday |")
A("|---|---|---|")
sat_tbl = defaultdict(list)
for dt, r in off_list:
    if "Saturday" in r:
        sat_tbl[(dt.year, dt.month)].append(dt)
for ym in sorted(sat_tbl):
    y, m = ym
    sats = sorted(sat_tbl[ym])
    A(f"| {date(y, m, 1).strftime('%b %Y')} | " + " | ".join(s.strftime('%b %d') for s in sats) + " |")
A("")
A("---")
A("")
A("## 📊 Phase Summary (display only — gating is per-date)")
A("")
A("| Phase | Display from | % | Scope |")
A("|---|---|---|---|")
scope = {
    1: "ESP32 Core, Inputs, Logic, Loops, Math, Text, Variables, Functions, Temperature, LED, Buzzer",
    2: "40 sensor blocks + Upload (Web Serial) + Serial Monitor v2 + Connect Modal",
    3: "Arduino C++ generators (live Day 1) + Compile pipeline + 13 actuator blocks",
    4: "LCD (4) + NeoPixel (3) + L298N (5) + DC Motor (3) = 15 blocks",
    5: "WiFi + BLE + HTTP + MQTT + Blynk + ThingSpeak + Storage + Library Manager",
    6: "Camera + Dabble + Multi-board + AI/ML + DB + Dashboard + Cloud + Subscription + Docs",
}
for ph in range(1, 7):
    ds = PHASE_START_DATES[ph]
    ddt = date.fromisoformat(ds)
    A(f"| **Phase {ph}** | {ddt.strftime('%b %d, %Y')} | {PHASE_PCT[ph]}% | {scope[ph]} |")
A("")
A("---")
A("")
A("## Legend")
A("")
A("| Symbol | Meaning |")
A("|---|---|")
A("| 🔓 | Unlock / enable feature (goes live by date) |")
A("| 🧪 | Test & verify |")
A("| 🚀 | Build + deploy |")
A("| 📝 | Documentation / planning / review |")
A("| 🔧 | Integration / wiring / polish |")
A("| 🐛 | Bug fix |")
A("| ⬛ | Holiday / OFF |")
A("")
A("---")
A("")
# Day-1 callout
A("## ⭐ DAY 1 — TODAY (Jun 25, 2026) — Bare-Minimum Live Demo")
A("")
A("| Item | Key | Status |")
A("|---|---|---|")
for kind, key, label in UNLOCK[1]:
    A(f"| {label} | `{key}` | ✅ Live today |")
A("")
A("```bash")
A("# Verify Day 1 works:")
A("cd D:\\Techyguide_Blocks_Production")
A("npx webpack --mode development")
A("npx webpack serve --mode development --open")
A("# → Ultrasonic blocks appear; Arduino + MicroPython code generates;")
A("#   Upload button compiles/uploads to a real ESP32.")
A("```")
A("")
A("---")
A("")
A("---")
A("")
# Per-month tables
A("# 📆 DAY-BY-DAY UNLOCK CALENDAR")
A("")
by_month = defaultdict(list)
for wd, dt in WD.items():
    by_month[(dt.year, dt.month)].append((wd, dt))

MONTH_NAME = {1:"January",2:"February",3:"March",4:"April",5:"May",6:"June",
              7:"July",8:"August",9:"September",10:"October",11:"November",12:"December"}

def em(emoji, txt):
    return f"{emoji} {txt}" if emoji else txt

for ym in sorted(by_month):
    y, m = ym
    A(f"## {MONTH_NAME[m]} {y}")
    A("")
    A("| Day | Date | Task | Details |")
    A("|---|---|---|---|")
    for wd, dt in by_month[ym]:
        e, task, detail = task_for(wd, dt)
        # mark holidays that fall inside this month's flow as OFF rows (for clarity)
        A(f"| {wd} | {dt.strftime('%a %d %b %Y')} | {em(e, task)} | {detail} |")
    A("")

A("---")
A("")
A("## 🔑 Unlock Dates → Code Map (single source of truth)")
A("")
A("All gating reads `UNLOCK_DATES` in `src/services/phaseConfig.js`. ")
A("On each date below, the listed item becomes live (toolbox visible + generator active + upload allowed).")
A("")
A("| Working Day | Date | Key | Kind | Label |")
A("|---|---|---|---|---|")
for wd in sorted(UNLOCK):
    iso = WD[wd].isoformat()
    for kind, key, label in UNLOCK[wd]:
        A(f"| {wd} | {iso} | `{key}` | {kind} | {label} |")
A("")
A("---")
A("")
A("## 📊 Progress Milestones")
A("")
A("```")
for ph in range(1, 7):
    ds = PHASE_START_DATES[ph]
    ddt = date.fromisoformat(ds)
    bar = "█" * (PHASE_PCT[ph] // 5) + "░" * (20 - PHASE_PCT[ph] // 5)
    A(f"{ddt.strftime('%b %d, %Y')}  ┃ PHASE {ph:<7} {bar}  {PHASE_PCT[ph]}%")
A("```")
A("")
A("---")
A("")
A("*Schedule regenerated: June 25, 2026 — spans 275 working days (Jun 25 2026 → Jun 25 2027).*  ")
A("*Gating source: `src/services/phaseConfig.js` → `UNLOCK_DATES` + `PHASE_START_DATES`.*  ")
A("*Generator: `scripts/generate_schedule.py`.*")
A("")

with open("WORK_SCHEDULE.md", "w", encoding="utf-8") as f:
    f.write("\n".join(lines))
print("WROTE WORK_SCHEDULE.md (%d lines)" % len(lines))

# ── Emit JS maps for phaseConfig.js ───────────────────────────────────────
def js_map(title, mapping):
    out = [f"// {title}"]
    for k in mapping:
        out.append(f'  {json_dump_key(k)}: "{mapping[k]}",')
    return "\n".join(out)

def json_dump_key(k):
    # quote keys that aren't plain identifiers
    import re
    if re.fullmatch(r"[A-Za-z_$][A-Za-z0-9_$]*", k):
        return k
    return '"%s"' % k

print("\n\n================ PHASE_START_DATES ================")
print("export const PHASE_START_DATES = {")
for ph in sorted(PHASE_START_DATES):
    print(f'  {ph}: "{PHASE_START_DATES[ph]}",')
print("};")

print("\n================ UNLOCK_DATES ================")
print("export const UNLOCK_DATES = {")
for k in UNLOCK_DATES:
    print(f'  {json_dump_key(k)}: "{UNLOCK_DATES[k]}",')
print("};")

print("\n================ PHASE_2_SCHEDULE (admin panel) ================")
print("export const PHASE_2_SCHEDULE = [")
for wd in sorted(UNLOCK):
    iso = WD[wd].isoformat()
    for kind, key, label in UNLOCK[wd]:
        t = "feature" if kind == "feature" else ("sensor" if kind in ("sensor","sensor_group") else ("actuator" if kind=="actuator" else "category"))
        print(f'  {{ date: "{iso}", day: {wd}, label: "{label}", key: {json_dump_key(key) if key.isidentifier() else chr(34)+key+chr(34)}, type: "{t}" }},')
print("];")

print(f"\nTOTAL WORKING DAYS: {TOTAL}")
