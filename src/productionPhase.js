// ──────────────────────────────────────────────────────────────
// TechyGuide — Production Phase Control (Company Demo Snapshot)
// ──────────────────────────────────────────────────────────────
// Static snapshot: no date-based unlocking, no gradual unlock.
// Gating is driven solely by the ENABLED_KEYS set in phaseConfig.js.
// ──────────────────────────────────────────────────────────────

import { getPhase, setPhase, isUnlocked } from './services/phaseConfig.js';

// Dynamic phase getter — always reads from phaseConfig
export function getCurrentPhase() {
  return getPhase();
}

// For backward compat: CURRENT_PHASE as a getter-backed "constant"
let _cachedPhase = getPhase();
export { _cachedPhase as CURRENT_PHASE };

export function setCurrentPhase(phase) {
  const result = setPhase(phase);
  if (result) {
    _cachedPhase = getPhase();
  }
  return result;
}

export function refreshPhaseCache() {
  _cachedPhase = getPhase();
}

// ── Category → Phase mapping (kept for reference / getCategoryPhase) ──
export const CATEGORY_PHASE = {
  "ESP32 Core":   1,
  "Inputs":       1,
  "Logic":        1,
  "Loops":        1,
  "Math":         1,
  "Text":         1,
  "Lists":        1,
  "Variables":    1,
  "Functions":    1,
  "Sensors":      1,
  "Actuators":    1,
  "Motors":       1,
  "Displays":     4,
  "Comms & IoT":  5,
  "Dabble":       6,
};

// ── Subcategory mappings (kept for reference only) ──
export const SENSOR_SUB_PHASE = {
  "🌡️ Temperature":       1,
  "📏 Ultrasonic":         2,
  "🌦️ Environmental":      2,
  "📐 Motion (MPU6050)":   2,
  "👁️ Motion / Obstacle":  2,
  "📡 RFID (MFRC522)":     2,
  "📺 IR Remote":          2,
  "🔥 Fire & Gas":         2,
  "💧 Water & Rain":       2,
  "🔊 Sound":              2,
  "👆 Touch & Vibration":  2,
  "💡 Light":              2,
  "🏎️ Motor Driver (L298N)": 1,
  "🧲 Hall Effect":        2,
  "🎛️ Analog / Generic":   2,
};

export const ACTUATOR_SUB_PHASE = {
  "LED":            1,
  "Buzzer":         1,
  "Servo":          3,
  "Relay":          3,
  "Notification":   3,
  "Music":          3,
  "Water Pump":     3,
};

export const FEATURE_PHASE = {
  micropythonGen:    1,
  micropythonUpload: 2,
  arduinoGen:        2,
  arduinoUpload:     2,
  serialMonitor:     1,
  serialSend:        2,
  libraryManager:    5,
  boardSelection:    6,
  cloudSave:         6,
  subscription:      6,
};

// ── Helper functions ──

export function isPhaseEnabled(requiredPhase) {
  return getCurrentPhase() >= requiredPhase;
}

export function isCategoryEnabled(categoryName) {
  return isUnlocked(categoryName);
}

export function isSensorSubEnabled(subName) {
  return isUnlocked(subName);
}

export function isActuatorSubEnabled(subName) {
  return isUnlocked(subName);
}

export function isFeaturePhaseEnabled(featureName) {
  return isUnlocked(featureName);
}

export function getCategoryPhase(categoryName) {
  return CATEGORY_PHASE[categoryName] || 6;
}

export function getPhaseLabel(requiredPhase) {
  return `🔒 Phase ${requiredPhase}`;
}
