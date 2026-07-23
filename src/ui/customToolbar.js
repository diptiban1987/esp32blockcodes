import { refreshIcons } from './icons';

const CATEGORY_COLORS = {
  Motion: '#4C97FF', Looks: '#9966FF', Sound: '#CF63CF',
  Events: '#FFBF00', Control: '#FFAB19', Sensing: '#5CB1D6',
  Operators: '#59C059', Variables: '#FF8C1A', 'My Blocks': '#FF6680',
  Logic: '#4C97FF', Loops: '#9966FF', Math: '#59C059',
  Text: '#FF8C1A', Lists: '#CC5B22', 'ESP32 Core': '#5CB1D6',
  Inputs: '#59C059', Sensors: '#FF8C1A', Actuators: '#00A69C',
  Displays: '#3D8BF5', Motors: '#FF4D4D', 'Comms & IoT': '#10B981',
  Dabble: '#6366F1', Functions: '#FF6680',
  Program: '#5CB1D6', Pins: '#5CB1D6',
  'Tactile Switch': '#59C059', 'Slide Switch': '#59C059', 'Touch & Hall': '#59C059',
  Ultrasonic: '#FF8C1A', PIR: '#FF8C1A', IR: '#FF8C1A', Rain: '#FF8C1A', LDR: '#FF8C1A',
  DHT: '#FF8C1A', Generic: '#FF8C1A', 'Hall Module': '#FF8C1A', MPU6050: '#FF8C1A', 'Heart Rate': '#FF8C1A',
  Servo: '#00A69C', Relay: '#00A69C', LED: '#00A69C', Notification: '#00A69C', Music: '#00A69C',
  LCD: '#3D8BF5',
  L298N: '#FF4D4D', 'Generic Motor': '#FF4D4D',
  'Serial / Bluetooth': '#10B981', Camera: '#10B981', 'Storage / Logger': '#10B981',
  'WiFi / Network': '#10B981', 'HTTP Client': '#10B981', MQTT: '#10B981',
  'Blynk IoT': '#00bcd4', 'ThingSpeak': '#8bc34a',
  'Virtual Pins': '#00bcd4', Notifications: '#00bcd4', Widgets: '#00bcd4', Timer: '#00bcd4',
  Setup: '#6366F1', Gamepad: '#6366F1', 'Phone Sensors': '#6366F1', 'Color Detector': '#6366F1',
  'Fire & Safety': '#FF8C1A',
  Buzzer: '#00A69C', 'Water Pump': '#00A69C',
  NeoPixel: '#3D8BF5',
};

const CATEGORY_ICONS = {
  Motion: 'move', Looks: 'eye', Sound: 'volume-2',
  Events: 'zap', Control: 'refresh-cw', Sensing: 'crosshair',
  Operators: 'sigma', Variables: 'box', 'My Blocks': 'puzzle',
  Logic: 'git-branch', Loops: 'repeat', Math: 'calculator',
  Text: 'type', Lists: 'list', 'ESP32 Core': 'cpu',
  Inputs: 'toggle-left', Sensors: 'activity', Actuators: 'zap-off',
  Displays: 'monitor', Motors: 'wind', 'Comms & IoT': 'wifi',
  Dabble: 'gamepad-2', Functions: 'puzzle',
  Program: 'play', Pins: 'plug',
  'Tactile Switch': 'toggle-left', 'Slide Switch': 'toggle-right', 'Touch & Hall': 'hand',
  Ultrasonic: 'move-horizontal', PIR: 'eye', IR: 'radio', Rain: 'cloud-rain', LDR: 'sun',
  DHT: 'thermometer', Generic: 'menu', 'Hall Module': 'magnet', MPU6050: 'gyroscope', 'Heart Rate': 'heart-pulse',
  Servo: 'rotate-cw', Relay: 'power', LED: 'lightbulb', Notification: 'bell', Music: 'music',
  LCD: 'monitor',
  L298N: 'wind', 'Generic Motor': 'fan',
  'Serial / Bluetooth': 'bluetooth', Camera: 'camera', 'Storage / Logger': 'hard-drive',
  'WiFi / Network': 'wifi', 'HTTP Client': 'globe', MQTT: 'radio-tower',
  'Blynk IoT': 'cloud', 'ThingSpeak': 'bar-chart-2',
  'Virtual Pins': 'git-commit', Notifications: 'bell-ring', Widgets: 'layout-dashboard', Timer: 'timer',
  Setup: 'settings', Gamepad: 'gamepad-2', 'Phone Sensors': 'smartphone', 'Color Detector': 'palette',
  'Fire & Safety': 'flame',
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
    const color = CATEGORY_COLORS[name];
    if (!color) { cat.tgDone = true; return; }
    cat.style.setProperty('--cat-color', color);
    const iconName = CATEGORY_ICONS[name];
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
