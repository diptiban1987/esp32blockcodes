import { refreshIcons } from './icons';
import { openExtensionsModal } from './ExtensionsModal';

const CATEGORY_COLORS = {
  Motion: '#2563EB', Looks: '#7C3AED', Sound: '#C026D3',
  Events: '#D97706', Control: '#EA580C', Sensing: '#0284C7',
  Operators: '#16A34A', Variables: '#EA580C', 'My Blocks': '#DB2777',
  Pen: '#0FBD8C',
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
  'Motion / Obstacle': '#D97706', '👁️ Motion / Obstacle': '#D97706', 'RFID (MFRC522)': '#D97706', 'IR Remote': '#D97706',
  'Hall Effect': '#D97706', 'Analog / Generic': '#D97706',
  Buzzer: '#0D9488', 'Water Pump': '#0D9488',
  NeoPixel: '#2563EB',
};


const CATEGORY_ICONS = {
  Motion: 'move', Looks: 'eye', Sound: 'volume-2',
  Events: 'zap', Control: 'refresh-cw', Sensing: 'crosshair',
  Operators: 'sigma', Variables: 'box', 'My Blocks': 'puzzle',
  Pen: 'pen-tool',
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
  'Motion / Obstacle': 'eye', '👁️ Motion / Obstacle': 'eye', 'RFID (MFRC522)': 'radio', 'IR Remote': 'tv',
  'Hall Effect': 'magnet', 'Analog / Generic': 'sliders',
  Buzzer: 'volume-2', 'Water Pump': 'droplets',
  NeoPixel: 'lightbulb',
};

export function enhanceToolbox() {
  const categories = document.querySelectorAll('.blocklyToolboxCategory');
  categories.forEach((cat) => {
    const label = cat.querySelector('.blocklyToolboxCategoryLabel');
    if (!label) return;
    const name = label.textContent.trim();
    const cleanName = name.replace(/^[\p{Emoji}\p{Extended_Pictographic}\u200d\uFE0F\s]+/u, '').trim();
    const color = CATEGORY_COLORS[name] || CATEGORY_COLORS[cleanName];
    if (color) {
      cat.style.setProperty('--cat-color', color);
    }
    const iconName = CATEGORY_ICONS[name] || CATEGORY_ICONS[cleanName];
    let icon = cat.querySelector('.tg-cat-icon');
    if (!icon && iconName) {
      icon = document.createElement('i');
      icon.setAttribute('data-lucide', iconName);
      icon.className = 'tg-cat-icon';
      try { label.parentNode.insertBefore(icon, label); } catch (e) {}
    }
    const old = cat.querySelector('[id^="color-"]');
    if (old) old.remove();
  });
  try { refreshIcons(); } catch (e) {}
}

// ── Accordion & Category Selection via Blockly API ──────────────────

let _ws = null;          // Blockly workspace reference

/** Returns top-level collapsible toolbox items */
function getTopLevelCollapsibles() {
  if (!_ws) return [];
  const toolbox = _ws.getToolbox ? _ws.getToolbox() : null;
  if (!toolbox || typeof toolbox.getToolboxItems !== 'function') return [];
  const items = toolbox.getToolboxItems() || [];
  // Only the top-level ones — filter by having no parent via getParent()
  return items.filter(item =>
    item.isCollapsible && item.isCollapsible() &&
    (!item.getParent || !item.getParent())
  );
}

/**
 * Walk UP from el to find the nearest .blocklyToolboxCategory element.
 * Then match it against the Blockly item registry.
 */
function findToolboxItemForElement(el) {
  if (!_ws || !el) return null;
  const toolbox = _ws.getToolbox ? _ws.getToolbox() : null;
  if (!toolbox || typeof toolbox.getToolboxItems !== 'function') return null;

  // Walk up the DOM to find the nearest .blocklyToolboxCategory row
  let rowEl = el.closest ? el.closest('.blocklyToolboxCategory') : null;
  if (!rowEl) {
    let curr = el;
    while (curr && curr !== document.body) {
      if (curr.classList && curr.classList.contains('blocklyToolboxCategory')) {
        rowEl = curr;
        break;
      }
      curr = curr.parentElement;
    }
  }
  if (!rowEl || rowEl === document.body) return null;

  // 1. Try direct ID lookup if row has an ID
  const rowId = rowEl.id || rowEl.getAttribute('id');
  if (rowId && typeof toolbox.getToolboxItemById === 'function') {
    const item = toolbox.getToolboxItemById(rowId);
    if (item) {
      const isCollapsible = !!(item.isCollapsible && item.isCollapsible());
      const parent = item.getParent ? item.getParent() : null;
      return {
        item,
        parent: parent || null,
        isTopLevel: !parent,
        isCollapsible,
      };
    }
  }

  // 2. Fallback: match rowEl against getClickTarget of each item
  const allItems = toolbox.getToolboxItems() || [];
  for (const item of allItems) {
    const clickTarget = typeof item.getClickTarget === 'function' ? item.getClickTarget() : null;
    if (clickTarget === rowEl) {
      const isCollapsible = !!(item.isCollapsible && item.isCollapsible());
      const parent = item.getParent ? item.getParent() : null;
      return {
        item,
        parent: parent || null,
        isTopLevel: !parent,
        isCollapsible,
      };
    }
  }
  return null;
}

/**
 * Safely select a toolbox category and open & position its flyout blocks
 */
function selectCategoryItem(item) {
  if (!_ws || !item) return;
  const toolbox = _ws.getToolbox ? _ws.getToolbox() : null;
  if (!toolbox) return;

  try {
    const flyout = _ws.getFlyout ? _ws.getFlyout() : null;
    const current = toolbox.getSelectedItem();

    if (current === item) {
      // Re-show if closed
      if (flyout && (!flyout.isVisible() || (flyout.getContents && flyout.getContents().length === 0))) {
        if (typeof item.getContents === 'function') {
          flyout.show(item.getContents());
        }
      }
    } else {
      toolbox.setSelectedItem(item);
    }

    if (flyout) {
      flyout.position();
    }
  } catch (err) {
    console.warn('[customToolbar] selectCategoryItem error:', err);
  }
}

export function addCustomToolbar(ws) {
  if (ws) _ws = ws;

  enhanceToolbox();

  const toolboxDiv = document.querySelector('.blocklyToolboxDiv, .blocklyToolbox');
  if (!toolboxDiv) return;

  // ── Install mousedown listener (capture phase, per-element) ──
  if (!toolboxDiv._tgClickInstalled) {
    toolboxDiv._tgClickInstalled = true;

    toolboxDiv.addEventListener('mousedown', (e) => {
      const match = findToolboxItemForElement(e.target);
      if (!match) return;

      const toolbox = _ws ? _ws.getToolbox() : null;
      if (!toolbox) return;

      // Stop default handling so we control expansion and block selection cleanly
      e.preventDefault();
      e.stopPropagation();

      const collapsibles = getTopLevelCollapsibles();

      if (match.isTopLevel && match.isCollapsible) {
        // A) Top-level parent category (ESP32 Core, Inputs, Sensors, etc.)
        // Single-accordion: expand this one, collapse all others
        collapsibles.forEach(c => {
          if (c === match.item) {
            if (!c.isExpanded()) c.setExpanded(true);
          } else {
            if (c.isExpanded()) c.setExpanded(false);
          }
        });

        // Auto-select its first child so blocks open immediately
        if (typeof match.item.getChildToolboxItems === 'function') {
          const children = match.item.getChildToolboxItems() || [];
          if (children.length > 0) {
            selectCategoryItem(children[0]);
          }
        }

      } else if (match.isTopLevel && !match.isCollapsible) {
        // B) Non-collapsible top category (Motion, Looks, Sound, Logic, Math, etc.)
        collapsibles.forEach(c => {
          if (c.isExpanded()) c.setExpanded(false);
        });

        selectCategoryItem(match.item);

      } else {
        // C) Child subcategory (Program, Pins, Tactile Switch, Slide Switch, etc.)
        if (match.parent && typeof match.parent.isExpanded === 'function' && !match.parent.isExpanded()) {
          match.parent.setExpanded(true);
        }
        selectCategoryItem(match.item);
      }
    }, true); // capture phase
  }

  // ── MutationObserver: re-enhance icons when toolbox DOM changes ──
  if (!toolboxDiv._tgDomObs) {
    const domObs = new MutationObserver(() => {
      requestAnimationFrame(() => enhanceToolbox());
    });
    domObs.observe(toolboxDiv, { childList: true, subtree: true });
    toolboxDiv._tgDomObs = domObs;
  }

  // ── Open first category and select first child by default ──
  requestAnimationFrame(() => {
    const collapsibles = getTopLevelCollapsibles();
    if (collapsibles.length > 0) {
      if (!collapsibles.some(i => i.isExpanded())) collapsibles[0].setExpanded(true);
      if (typeof collapsibles[0].getChildToolboxItems === 'function') {
        const children = collapsibles[0].getChildToolboxItems();
        if (children && children.length > 0) selectCategoryItem(children[0]);
      }
    } else if (_ws) {
      try {
        const toolbox = _ws.getToolbox();
        const items = toolbox && toolbox.getToolboxItems();
        if (items && items.length > 0 && !toolbox.getSelectedItem()) {
          selectCategoryItem(items[0]);
        }
      } catch (_) {}
    }
  });
}
