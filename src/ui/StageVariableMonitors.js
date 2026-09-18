// Stage Variable Monitors — Scratch-style variable readout pills on the stage
import spriteStore from '../engine/SpriteStore';
import eventBus, { Events } from '../engine/EventBus';

export class StageVariableMonitors {
  constructor(stageContainerEl, interpreter) {
    this.stageContainer = stageContainerEl;
    this.interpreter = interpreter;
    this.monitors = new Map(); // varName -> { el, labelEl, valueEl, closeEl, x, y }
    this.containerEl = null;
    this._pollInterval = null;

    this._initContainer();
    this._bindEvents();
    this.syncFromStore();
    this._startPolling();
  }

  _initContainer() {
    let existing = this.stageContainer.querySelector('#stageVariableMonitors');
    if (existing) {
      this.containerEl = existing;
    } else {
      this.containerEl = document.createElement('div');
      this.containerEl.id = 'stageVariableMonitors';
      this.containerEl.className = 'stage-variable-monitors';
      this.stageContainer.appendChild(this.containerEl);
    }
  }

  _bindEvents() {
    // Listen to variable value changes
    eventBus.on('variable_changed', ({ name, value }) => {
      this.updateValue(name, value);
    });

    // Listen to visibility changes
    eventBus.on('variable_visibility_changed', ({ name, visible }) => {
      if (visible) {
        this.showVariable(name);
      } else {
        this.hideVariable(name);
      }
    });

    // Listen to project store changes
    if (spriteStore?.on) {
      spriteStore.on((event, data) => {
        if (event === 'variables_updated' || event === 'restore') {
          this.syncFromStore();
        } else if (event === 'variable_visibility') {
          if (data && data.name) {
            if (data.visible) this.showVariable(data.name);
            else this.hideVariable(data.name);
          }
        }
      });
    }
  }

  _startPolling() {
    if (this._pollInterval) clearInterval(this._pollInterval);
    // Poll every 60ms to catch fast loop increments from scripts
    this._pollInterval = setInterval(() => {
      if (!this.interpreter) return;
      for (const [varName, monitor] of this.monitors.entries()) {
        if (monitor.el.style.display !== 'none') {
          const liveVal = this.interpreter.getVariable(varName);
          this.updateValue(varName, liveVal);
        }
      }
    }, 60);
  }

  syncFromStore() {
    if (!spriteStore) return;
    const projectVars = spriteStore.getProjectVariables() || [];
    const activeNames = new Set();

    projectVars.forEach((pv, idx) => {
      activeNames.add(pv.name);
      const isVisible = pv.visible !== false;
      let monitor = this.monitors.get(pv.name);

      if (!monitor) {
        monitor = this._createMonitorElement(pv.name, pv.x, pv.y, idx);
      }

      if (isVisible) {
        monitor.el.style.display = 'inline-flex';
        const currentVal = this.interpreter ? this.interpreter.getVariable(pv.name) : (pv.value ?? 0);
        this.updateValue(pv.name, currentVal);
      } else {
        monitor.el.style.display = 'none';
      }
    });

    // Clean up monitors for deleted variables
    for (const [name, monitor] of this.monitors.entries()) {
      if (!activeNames.has(name)) {
        monitor.el.remove();
        this.monitors.delete(name);
      }
    }
  }

  _createMonitorElement(varName, posX, posY, index = 0) {
    const monitorEl = document.createElement('div');
    monitorEl.className = 'stage-var-monitor';
    monitorEl.dataset.varName = varName;

    // Default top-right layout if positions not stored
    const defaultTop = 10 + (index * 34);
    if (typeof posX === 'number') {
      monitorEl.style.left = `${posX}px`;
      monitorEl.style.right = 'auto';
    } else {
      monitorEl.style.right = '10px';
      monitorEl.style.left = 'auto';
    }
    const finalTop = typeof posY === 'number' ? posY : defaultTop;
    monitorEl.style.top = `${finalTop}px`;

    monitorEl.innerHTML = `
      <span class="stage-var-monitor-label">${escapeHtml(varName)}</span>
      <span class="stage-var-monitor-value">0</span>
      <button type="button" class="stage-var-monitor-close" title="Hide variable">&times;</button>
    `;

    this.containerEl.appendChild(monitorEl);

    const labelEl = monitorEl.querySelector('.stage-var-monitor-label');
    const valueEl = monitorEl.querySelector('.stage-var-monitor-value');
    const closeEl = monitorEl.querySelector('.stage-var-monitor-close');

    const monitorData = {
      el: monitorEl,
      labelEl,
      valueEl,
      closeEl,
      x: posX,
      y: finalTop
    };

    // Close button click -> hide variable
    closeEl.addEventListener('click', (e) => {
      e.stopPropagation();
      this.hideVariable(varName);
      if (spriteStore) spriteStore.setVariableVisible(varName, false);
      if (this.interpreter) this.interpreter.hideVariable(varName);
    });

    // Make monitor draggable across stage
    this._makeDraggable(monitorEl, monitorData, varName);

    this.monitors.set(varName, monitorData);
    return monitorData;
  }

  _makeDraggable(el, monitorData, varName) {
    let startX = 0;
    let startY = 0;
    let origLeft = 0;
    let origTop = 0;
    let isDragging = false;

    const onPointerDown = (e) => {
      if (e.target.closest('.stage-var-monitor-close')) return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      origLeft = el.offsetLeft;
      origTop = el.offsetTop;

      // Switch to left-based coordinates so drag is seamless from the right corner
      el.style.left = `${origLeft}px`;
      el.style.right = 'auto';

      el.classList.add('dragging');
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      e.preventDefault();
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      const containerWidth = this.containerEl.clientWidth || 480;
      const containerHeight = this.containerEl.clientHeight || 360;
      const elWidth = el.offsetWidth || 80;
      const elHeight = el.offsetHeight || 28;

      let newLeft = Math.max(0, Math.min(origLeft + dx, containerWidth - elWidth));
      let newTop = Math.max(0, Math.min(origTop + dy, containerHeight - elHeight));

      el.style.left = `${newLeft}px`;
      el.style.top = `${newTop}px`;
      monitorData.x = newLeft;
      monitorData.y = newTop;
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      el.classList.remove('dragging');
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      // Persist coordinate in SpriteStore
      if (spriteStore?.setVariablePosition) {
        spriteStore.setVariablePosition(varName, monitorData.x, monitorData.y);
      }
    };

    el.addEventListener('pointerdown', onPointerDown);
  }

  showVariable(varName) {
    if (!varName) return;
    let monitor = this.monitors.get(varName);
    if (!monitor) {
      monitor = this._createMonitorElement(varName, undefined, undefined, this.monitors.size);
    }
    monitor.el.style.display = 'inline-flex';
    const val = this.interpreter ? this.interpreter.getVariable(varName) : 0;
    this.updateValue(varName, val);
  }

  hideVariable(varName) {
    if (!varName) return;
    const monitor = this.monitors.get(varName);
    if (monitor) {
      monitor.el.style.display = 'none';
    }
  }

  updateValue(varName, value) {
    const monitor = this.monitors.get(varName);
    if (!monitor) return;

    let displayVal = value ?? 0;
    if (typeof displayVal === 'number') {
      // Clean display for floating numbers
      if (!Number.isInteger(displayVal)) {
        displayVal = Number(displayVal.toFixed(2));
      }
    }
    monitor.valueEl.textContent = String(displayVal);
  }

  destroy() {
    if (this._pollInterval) {
      clearInterval(this._pollInterval);
      this._pollInterval = null;
    }
    if (this.containerEl && this.containerEl.parentNode) {
      this.containerEl.parentNode.removeChild(this.containerEl);
    }
    this.monitors.clear();
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
