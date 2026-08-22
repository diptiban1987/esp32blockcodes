import { refreshIcons } from './icons';

const CATEGORY_COLORS = {
  Motion: '#2563EB', Looks: '#7C3AED', Sound: '#C026D3',
  Events: '#D97706', Control: '#EA580C', Sensing: '#0284C7',
  Operators: '#16A34A', Variables: '#EA580C', 'My Blocks': '#DB2777',
  Logic: '#2563EB', Loops: '#7C3AED', Math: '#16A34A',
  Text: '#EA580C', Lists: '#C2410C', 'ESP32 Core': '#E11D48', 'Raspberry Pi Core': '#E11D48', 'Pico Core': '#E11D48',
  Inputs: '#059669', Sensors: '#D97706', Actuators: '#0D9488',
  Displays: '#2563EB', Motors: '#E11D48', 'Comms & IoT': '#059669',
  Dabble: '#4F46E5', Functions: '#DB2777',
  Program: '#0284C7', Pins: '#0284C7',
  'Tactile Switch': '#059669', 'Slide Switch': '#059669', 'Touch & Hall': '#059669',
  Ultrasonic: '#D97706', PIR: '#D97706', IR: '#D97706', Rain: '#D97706', LDR: '#D97706',
  DHT: '#D97706', Generic: '#D97706', 'Hall Module': '#D97706', MPU6050: '#D97706', 'Heart Rate': '#D97706',
  Servo: '#0D9488', Relay: '#0D9488', LED: '#0D9488', Notification: '#0D9488', Music: '#0D9488',
  LCD: '#2563EB',
  'L298 / L298N': '#E11D48', 'L298N': '#E11D48', 'Motor Driver (L298N)': '#E11D48', '🏎️ Motor Driver (L298N)': '#E11D48', 'Generic Motor': '#E11D48',
  'Serial / Bluetooth': '#059669', Camera: '#059669', 'Storage / Logger': '#059669',
  'WiFi / Network': '#059669', 'HTTP Client': '#059669', MQTT: '#059669',
  'Blynk IoT': '#0891B2', 'ThingSpeak': '#65A30D',
  'Virtual Pins': '#0891B2', Notifications: '#0891B2', Widgets: '#0891B2', Timer: '#0891B2',
  Setup: '#4F46E5', Gamepad: '#4F46E5', 'Phone Sensors': '#4F46E5', 'Color Detector': '#4F46E5',
  'Fire & Safety': '#EA580C', 'Fire & Gas': '#EA580C', 'Water & Rain': '#0284C7',
  Sound: '#C026D3', 'Touch & Vibration': '#059669', Light: '#D97706',
  'Temperature': '#D97706', 'Environmental': '#D97706', 'Motion (MPU6050)': '#D97706',
  'Motion / Obstacle': '#D97706', 'RFID (MFRC522)': '#D97706', 'IR Remote': '#D97706',
  'Hall Effect': '#D97706', 'Analog / Generic': '#D97706',
  Buzzer: '#0D9488', 'Water Pump': '#0D9488',
  NeoPixel: '#2563EB',
};


const CATEGORY_ICONS = {
  Motion: 'move', Looks: 'eye', Sound: 'volume-2',
  Events: 'zap', Control: 'refresh-cw', Sensing: 'crosshair',
  Operators: 'sigma', Variables: 'box', 'My Blocks': 'puzzle',
  Logic: 'git-branch', Loops: 'repeat', Math: 'calculator',
  Text: 'type', Lists: 'list', 'ESP32 Core': 'cpu', 'Raspberry Pi Core': 'cpu', 'Pico Core': 'cpu',
  Inputs: 'toggle-left', Sensors: 'activity', Actuators: 'zap-off',
  Displays: 'monitor', Motors: 'wind', 'Comms & IoT': 'wifi',
  Dabble: 'gamepad-2', Functions: 'puzzle',
  Program: 'play', Pins: 'plug',
  'Tactile Switch': 'toggle-left', 'Slide Switch': 'toggle-right', 'Touch & Hall': 'hand',
  Ultrasonic: 'move-horizontal', PIR: 'eye', IR: 'radio', Rain: 'cloud-rain', LDR: 'sun',
  DHT: 'thermometer', Generic: 'menu', 'Hall Module': 'magnet', MPU6050: 'rotate-3d', 'Heart Rate': 'heart-pulse',
  Servo: 'rotate-cw', Relay: 'power', LED: 'lightbulb', Notification: 'bell', Music: 'music',
  LCD: 'monitor',
  'L298 / L298N': 'car', 'L298N': 'car', 'Motor Driver (L298N)': 'car', '🏎️ Motor Driver (L298N)': 'car', 'Generic Motor': 'fan',
  'Serial / Bluetooth': 'bluetooth', Camera: 'camera', 'Storage / Logger': 'hard-drive',
  'WiFi / Network': 'wifi', 'HTTP Client': 'globe', MQTT: 'radio-tower',
  'Blynk IoT': 'cloud', 'ThingSpeak': 'bar-chart-2',
  'Virtual Pins': 'git-commit', Notifications: 'bell-ring', Widgets: 'layout-dashboard', Timer: 'timer',
  Setup: 'settings', Gamepad: 'gamepad-2', 'Phone Sensors': 'smartphone', 'Color Detector': 'palette',
  'Fire & Safety': 'flame', 'Fire & Gas': 'flame', 'Water & Rain': 'cloud-rain',
  Sound: 'volume-2', 'Touch & Vibration': 'hand', Light: 'sun',
  'Temperature': 'thermometer', 'Environmental': 'cloud-sun',   'Motion (MPU6050)': 'rotate-3d',
  'Motion / Obstacle': 'eye', 'RFID (MFRC522)': 'radio', 'IR Remote': 'tv',
  'Hall Effect': 'magnet', 'Analog / Generic': 'sliders',
  Buzzer: 'volume-2', 'Water Pump': 'droplets',
  NeoPixel: 'lightbulb',
};

function enhanceToolbox() {
  const categories = document.querySelectorAll('.blocklyToolboxCategory');
  categories.forEach((cat) => {
    if (cat.tgDone) return;
    const label = cat.querySelector('.blocklyToolboxCategoryLabel');
    if (!label) return;
    const name = label.textContent.trim();
    const cleanName = name.replace(/^[\p{Emoji}\p{Extended_Pictographic}\u200d\uFE0F\s]+/u, '').trim();
    const color = CATEGORY_COLORS[name] || CATEGORY_COLORS[cleanName];
    if (!color) { cat.tgDone = true; return; }
    cat.style.setProperty('--cat-color', color);
    const iconName = CATEGORY_ICONS[name] || CATEGORY_ICONS[cleanName];
    if (iconName) {
      const icon = document.createElement('i');
      icon.setAttribute('data-lucide', iconName);
      icon.className = 'tg-cat-icon';
      try { label.parentNode.insertBefore(icon, label); } catch (e) {}
    }
    const old = cat.querySelector('[id^="color-"]');
    if (old) old.remove();
    cat.tgDone = true;
  });
  try { refreshIcons(); } catch (e) {}
}

// ── Accordion via Blockly API ────────────────────────────────────────

let _ws = null;          // Blockly workspace reference
let _clickInstalled = false;

/** Returns top-level collapsible toolbox items */
function getTopLevelCollapsibles() {
  if (!_ws) return [];
  const toolbox = _ws.getToolbox();
  if (!toolbox) return [];
  const items = toolbox.getToolboxItems();
  return items.filter(item => item.isCollapsible && item.isCollapsible());
}

/**
 * Collapse all top-level categories, then open only `targetItem`.
 * @param {object} targetItem  A Blockly CollapsibleToolboxCategory
 */
function openOnlyItem(targetItem) {
  const collapsibles = getTopLevelCollapsibles();
  collapsibles.forEach(item => {
    if (item === targetItem) {
      // If already open → keep open (we just want to make sure others close)
      if (!item.isExpanded()) item.setExpanded(true);
    } else {
      if (item.isExpanded()) item.setExpanded(false);
    }
  });
}

/**
 * Given a click target DOM element, find which top-level
 * CollapsibleToolboxCategory was clicked.
 */
function findClickedItem(el) {
  if (!_ws) return null;
  const toolbox = _ws.getToolbox();
  if (!toolbox) return null;
  const items = toolbox.getToolboxItems();
  // Walk up from clicked element; stop when we hit a top-level category div
  let cur = el;
  while (cur) {
    for (const item of items) {
      if (!item.isCollapsible || !item.isCollapsible()) continue;
      const div = item.getDiv && item.getDiv();
      if (!div) continue;
      // The "row" of a CollapsibleToolboxCategory = the clickable header
      // We only want clicks on the header row, NOT on the subcategory panel
      const rowDiv = div.querySelector(':scope > div:first-child') || div.firstElementChild;
      if (rowDiv && rowDiv.contains(cur)) return item;
    }
    cur = cur.parentElement;
  }
  return null;
}

export function addCustomToolbar(ws) {
  // Accept an optional workspace reference; keep previous one if not given
  if (ws) _ws = ws;

  enhanceToolbox();

  const toolboxDiv = document.querySelector('.blocklyToolboxDiv, .blocklyToolbox');
  if (!toolboxDiv) return;

  // ── Install click listener (once only) ──
  if (!_clickInstalled) {
    _clickInstalled = true;

    toolboxDiv.addEventListener('click', (e) => {
      const clickedItem = findClickedItem(e.target);
      if (!clickedItem) return;
      openOnlyItem(clickedItem);
    }, true);
  }

  // ── MutationObserver: re-enhance icons when toolbox DOM changes ──
  if (!toolboxDiv._tgDomObs) {
    const domObs = new MutationObserver(() => {
      requestAnimationFrame(() => { enhanceToolbox(); });
    });
    domObs.observe(toolboxDiv, { childList: true, subtree: true });
    toolboxDiv._tgDomObs = domObs;
  }

  // ── Open first category by default ──
  requestAnimationFrame(() => {
    const collapsibles = getTopLevelCollapsibles();
    if (collapsibles.length === 0) return;
    const anyOpen = collapsibles.some(i => i.isExpanded());
    if (!anyOpen) {
      collapsibles[0].setExpanded(true);
    }
  });
}
