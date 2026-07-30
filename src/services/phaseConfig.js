// ──────────────────────────────────────────────────────────────
// TechyGuide — Phase Configuration Service (Company Demo Snapshot)
// ──────────────────────────────────────────────────────────────
// NO date-based unlocking. Only explicitly enabled keys are live.
// This snapshot reflects the project status as of the snapshot date.
// ──────────────────────────────────────────────────────────────

const STORAGE_KEY = 'tg_phase';
const HISTORY_KEY = 'tg_phase_history';
const GRADUAL_KEY = 'tg_phase_gradual_unlock';
const SIMULATED_DATE_KEY = 'tg_phase_simulated_date';

// Snapshot date: 2026-07-13 — working blocks enabled up to this date.
export const DEFAULT_PHASE = 2;

// Cosmetic phase label boundaries (% progress display only).
export const PHASE_START_DATES = {
  1: "2026-06-25",
  2: "2026-06-25",
  3: "2026-09-01",
  4: "2026-11-01",
  5: "2027-01-01",
  6: "2027-04-01",
};

// Statically enabled keys for the company demo snapshot.
// Phase 1 core items are always enabled; additional items are enabled
// based on the project's working status up to the snapshot date.
const ENABLED_KEYS = new Set([
  // ── Phase 1: Foundation (always enabled) ──
  "ESP32 Core",
  "Inputs",
  "Logic",
  "Loops",
  "Math",
  "Text",
  "Lists",
  "Variables",
  "Functions",
  "Sensors",
  "Actuators",
  "🌡️ Temperature",
  "LED",
  "Buzzer",
  "micropythonGen",
  "serialMonitor",

  // ── Unlocked as of snapshot date (2026-07-13) ──
  "📏 Ultrasonic",
  "🌦️ Environmental",
  "📡 RFID (MFRC522)",
  "📺 IR Remote",
  "arduinoGen",
  "arduinoUpload",
  "micropythonUpload",

  // ── Unlocked per WORK_SCHEDULE rows 17 & 21 (2026-07-17 / 2026-07-22) ──
  "🔥 Fire & Gas",
  "💧 Water & Rain",
  "🔊 Sound",
  "👆 Touch & Vibration",
  "💡 Light",
  "🧲 Hall Effect",
  "🎛️ Analog / Generic",
]);

// Kept for API compatibility; unused for gating in this snapshot.
export const UNLOCK_DATES = {};

// Phase metadata for labels / progress display.
const PHASE_INFO = {
  1: {
    name: 'Foundation',
    description: 'ESP32 Core, Inputs, Logic, Loops, Math, Text, Variables, Functions, Temperature sensor, LED, Buzzer',
    percent: 40,
    icon: '🏗️',
  },
  2: {
    name: 'Sensors & Upload',
    description: 'Ultrasonic, Environmental, RFID, IR Remote, Upload via Web Serial, Serial Monitor',
    percent: 52,
    icon: '📡',
  },
  3: {
    name: 'Arduino & Actuators',
    description: 'Servo, Relay, Notification, Music, Water Pump',
    percent: 65,
    icon: '⚙️',
  },
  4: {
    name: 'Displays & Motors',
    description: 'LCD I2C, NeoPixel, L298N, DC Motor',
    percent: 78,
    icon: '🖥️',
  },
  5: {
    name: 'Communication & IoT',
    description: 'WiFi, BLE, HTTP Client, MQTT, Blynk, ThingSpeak, Storage/Logger',
    percent: 90,
    icon: '☁️',
  },
  6: {
    name: 'Full Release',
    description: 'Camera, Dabble, Multi-board, AI/ML, Dashboard, Documentation, Cloud Save',
    percent: 100,
    icon: '🚀',
  },
};

// ── Event system ──
const listeners = [];

function emit(eventData) {
  for (const fn of listeners) {
    try { fn(eventData); } catch (e) { console.error('[PhaseConfig] listener error:', e); }
  }
}

// ── Core API ──

export function getCurrentPhaseForDate(dateStr) {
  return DEFAULT_PHASE;
}

/**
 * Get the current phase.
 * In the company demo snapshot the phase is FIXED to DEFAULT_PHASE
 * so the hosted demo cannot accidentally unlock future blocks.
 */
export function getPhase() {
  return DEFAULT_PHASE;
}

/**
 * setPhase exists for API compatibility but does NOT change gating.
 * It persists to localStorage only so any existing UI that calls it
 * behaves without throwing, but the snapshot remains locked to DEFAULT_PHASE.
 */
export function setPhase(phase) {
  const n = parseInt(phase, 10);
  if (isNaN(n) || n < 1 || n > 6) {
    console.warn('[PhaseConfig] Invalid phase:', phase);
    return false;
  }
  const oldPhase = getPhase();
  if (oldPhase === n) return false;

  try {
    localStorage.setItem(STORAGE_KEY, String(n));
    addHistory(oldPhase, n);
  } catch (e) {
    console.warn('[PhaseConfig] Failed to persist phase:', e);
  }

  emit({ type: 'phase-change', oldPhase, newPhase: n });
  console.log(`[PhaseConfig] Phase display changed: ${oldPhase} → ${n} (${PHASE_INFO[n].name})`);
  return true;
}

export function advancePhase() {
  return false;
}

export function getPhaseInfo(phase) {
  const p = phase || getPhase();
  return PHASE_INFO[p] || PHASE_INFO[DEFAULT_PHASE];
}

export function getAllPhaseInfo() {
  return { ...PHASE_INFO };
}

export function onPhaseChange(callback) {
  listeners.push(callback);
  return () => {
    const idx = listeners.indexOf(callback);
    if (idx > -1) listeners.splice(idx, 1);
  };
}

// ── History / Audit Trail ──

function addHistory(oldPhase, newPhase) {
  try {
    const history = getHistory();
    history.push({
      from: oldPhase,
      to: newPhase,
      timestamp: new Date().toISOString(),
    });
    if (history.length > 50) history.splice(0, history.length - 50);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    // Silently fail
  }
}

export function getHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // Silently fail
  }
  return [];
}

export function resetPhase() {
  const old = getPhase();
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(HISTORY_KEY);
    localStorage.removeItem(GRADUAL_KEY);
    localStorage.removeItem(SIMULATED_DATE_KEY);
  } catch (e) {
    // Silently fail
  }
  emit({ type: 'phase-change', oldPhase: old, newPhase: DEFAULT_PHASE });
  return DEFAULT_PHASE;
}

export function isGradualUnlockEnabled() {
  return false;
}

export function setGradualUnlockEnabled(enabled) {
  try {
    localStorage.setItem(GRADUAL_KEY, String(enabled));
  } catch (e) {
    // Silently fail
  }
  const p = getPhase();
  emit({ type: 'phase-change', oldPhase: p, newPhase: p });
}

export function getRealCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

export function getSimulatedDate() {
  return "";
}

export function setSimulatedDate(dateStr) {
  try {
    if (dateStr) {
      localStorage.setItem(SIMULATED_DATE_KEY, dateStr);
    } else {
      localStorage.removeItem(SIMULATED_DATE_KEY);
    }
  } catch (e) {
    // Silently fail
  }
  const p = getPhase();
  emit({ type: 'phase-change', oldPhase: p, newPhase: p });
}

export function getSystemDate() {
  return "2026-07-13";
}

/**
 * Returns true if the given key is explicitly enabled for this snapshot.
 * Unknown keys are DISABLED (no date-based fallback).
 */
export function isUnlocked(key) {
  return ENABLED_KEYS.has(key);
}
