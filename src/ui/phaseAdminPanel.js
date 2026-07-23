// ──────────────────────────────────────────────────────────────
// TechyGuide — Phase Admin Panel
// ──────────────────────────────────────────────────────────────
// Floating admin panel for toggling phases at runtime.
// Accessed via Ctrl+Shift+P keyboard shortcut.
// ──────────────────────────────────────────────────────────────

import {
  getPhase, setPhase, getPhaseInfo, getAllPhaseInfo, getHistory,
  isGradualUnlockEnabled, setGradualUnlockEnabled, getSimulatedDate, setSimulatedDate, getSystemDate, PHASE_2_SCHEDULE
} from '../services/phaseConfig.js';

let panelEl = null;
let isVisible = false;

/**
 * Injects the admin panel CSS into the page.
 */
function injectStyles() {
  if (document.getElementById('phase-admin-styles')) return;

  const style = document.createElement('style');
  style.id = 'phase-admin-styles';
  style.textContent = `
    .phase-admin-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.5);
      z-index: 99998; opacity: 0; transition: opacity .3s ease;
      pointer-events: none;
    }
    .phase-admin-overlay.visible { opacity: 1; pointer-events: all; }

    .phase-admin-panel {
      position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%) scale(.9);
      width: 520px; max-width: 92vw; max-height: 85vh;
      background: #0f172a; border: 1px solid rgba(99,102,241,.3);
      border-radius: 16px; z-index: 99999;
      box-shadow: 0 25px 80px rgba(0,0,0,.5), 0 0 40px rgba(99,102,241,.15);
      opacity: 0; transition: all .3s cubic-bezier(.4,0,.2,1);
      overflow-y: auto; color: #e2e8f0; font-family: 'Inter', system-ui, sans-serif;
    }
    .phase-admin-panel.visible {
      opacity: 1; transform: translate(-50%, -50%) scale(1);
    }

    .pa-header {
      padding: 1.25rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,.08);
      display: flex; align-items: center; justify-content: space-between;
    }
    .pa-header h3 {
      font-size: 1rem; font-weight: 700; margin: 0;
      display: flex; align-items: center; gap: .5rem;
    }
    .pa-header h3 .pa-badge {
      background: rgba(99,102,241,.2); color: #818cf8;
      padding: 2px 8px; border-radius: 6px; font-size: .7rem;
      font-weight: 600;
    }
    .pa-close {
      background: none; border: none; color: #64748b;
      font-size: 1.25rem; cursor: pointer; padding: 4px 8px;
      border-radius: 6px; transition: all .2s;
    }
    .pa-close:hover { color: #ef4444; background: rgba(239,68,68,.1); }

    .pa-body { padding: 1.25rem 1.5rem; }

    .pa-current {
      background: rgba(99,102,241,.1); border: 1px solid rgba(99,102,241,.2);
      border-radius: 10px; padding: 1rem 1.25rem; margin-bottom: 1.25rem;
      display: flex; align-items: center; gap: 1rem;
    }
    .pa-current-icon { font-size: 2rem; }
    .pa-current-info h4 { margin: 0 0 .25rem; font-size: .95rem; font-weight: 700; color: #fff; }
    .pa-current-info p { margin: 0; font-size: .75rem; color: #94a3b8; }
    .pa-current-bar {
      height: 4px; background: rgba(255,255,255,.08); border-radius: 4px;
      margin-top: .5rem; overflow: hidden;
    }
    .pa-current-bar-fill {
      height: 100%; border-radius: 4px;
      background: linear-gradient(90deg, #6366f1, #a78bfa);
      transition: width .5s ease;
    }

    .pa-phases { display: flex; flex-direction: column; gap: .5rem; }

    .pa-phase-btn {
      display: flex; align-items: center; gap: .75rem;
      padding: .75rem 1rem; border-radius: 10px;
      border: 1px solid rgba(255,255,255,.06);
      background: rgba(255,255,255,.03);
      cursor: pointer; transition: all .25s ease; width: 100%;
      text-align: left; color: #e2e8f0; font-family: inherit;
    }
    .pa-phase-btn:hover {
      background: rgba(99,102,241,.08); border-color: rgba(99,102,241,.2);
      transform: translateX(4px);
    }
    .pa-phase-btn.active {
      background: rgba(99,102,241,.15); border-color: rgba(99,102,241,.4);
      box-shadow: 0 0 20px rgba(99,102,241,.1);
    }
    .pa-phase-btn.active .pa-phase-name { color: #a78bfa; }

    .pa-phase-icon { font-size: 1.25rem; flex-shrink: 0; width: 28px; text-align: center; }
    .pa-phase-num {
      background: rgba(255,255,255,.08); color: #94a3b8;
      padding: 2px 8px; border-radius: 4px; font-size: .65rem;
      font-weight: 700; font-family: monospace; flex-shrink: 0;
    }
    .pa-phase-btn.active .pa-phase-num {
      background: rgba(99,102,241,.3); color: #c4b5fd;
    }
    .pa-phase-name { font-weight: 600; font-size: .85rem; flex: 1; }
    .pa-phase-pct {
      font-size: .7rem; color: #64748b; font-weight: 600;
      font-family: monospace; flex-shrink: 0;
    }

    .pa-footer {
      padding: 1rem 1.5rem; border-top: 1px solid rgba(255,255,255,.06);
      display: flex; justify-content: space-between; align-items: center;
    }
    .pa-footer-hint {
      font-size: .7rem; color: #475569;
    }
    .pa-apply-btn {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: #fff; border: none; padding: .5rem 1.5rem;
      border-radius: 8px; font-weight: 700; font-size: .8rem;
      cursor: pointer; transition: all .25s;
      box-shadow: 0 4px 15px rgba(99,102,241,.3);
    }
    .pa-apply-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(99,102,241,.4);
    }
    .pa-apply-btn:disabled {
      opacity: .4; cursor: not-allowed; transform: none;
      box-shadow: none;
    }

    .pa-gradual-section {
      background: rgba(255,255,255,.02); border: 1px dashed rgba(255,255,255,.1);
      border-radius: 12px; padding: 1.25rem; margin-top: 1rem;
      display: flex; flex-direction: column; gap: 0.75rem;
    }
    .pa-gradual-title {
      font-size: .85rem; font-weight: 700; color: #fff;
      display: flex; align-items: center; justify-content: space-between;
    }
    .pa-checkbox-label {
      display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; color: #94a3b8; cursor: pointer;
      user-select: none;
    }
    .pa-checkbox-label input {
      accent-color: #6366f1; cursor: pointer;
    }
    .pa-slider-container {
      display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.25rem;
    }
    .pa-date-slider {
      width: 100%; accent-color: #6366f1; cursor: pointer; height: 6px; border-radius: 3px; background: rgba(255,255,255,.1);
    }
    .pa-date-info {
      font-size: 0.75rem; color: #a78bfa; font-weight: 600; display: flex; justify-content: space-between;
    }
    .pa-checklist-container {
      max-height: 140px; overflow-y: auto; border: 1px solid rgba(255,255,255,.05);
      border-radius: 8px; background: rgba(0,0,0,.2); padding: 0.5rem;
      display: flex; flex-direction: column; gap: 0.25rem;
    }
    .pa-checklist-item {
      display: flex; align-items: center; justify-content: space-between;
      font-size: 0.7rem; padding: 0.35rem 0.5rem; border-radius: 6px;
    }
    .pa-checklist-item.unlocked {
      background: rgba(16,185,129,.05); color: #34d399;
    }
    .pa-checklist-item.locked {
      background: rgba(255,255,255,.02); color: #64748b;
    }
    .pa-checklist-status {
      font-weight: 700; font-family: monospace;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Creates the admin panel DOM and appends to body.
 */
function createPanel() {
  injectStyles();

  // Overlay
  const overlay = document.createElement('div');
  overlay.className = 'phase-admin-overlay';
  overlay.addEventListener('click', hidePanel);
  document.body.appendChild(overlay);

  // Panel
  const panel = document.createElement('div');
  panel.className = 'phase-admin-panel';
  document.body.appendChild(panel);

  panelEl = { overlay, panel };
  updatePanelContent();
}

let selectedPhase = null;

function selectPhase(phase) {
  selectedPhase = phase;
  updatePanelContent();
}

function applyPhase() {
  if (selectedPhase === null) return;
  const changed = setPhase(selectedPhase);
  if (changed) {
    updatePanelContent();
    // Show a brief "Applied!" flash
    const applyBtn = panelEl.panel.querySelector('.pa-apply-btn');
    if (applyBtn) {
      applyBtn.textContent = '✓ Applied!';
      applyBtn.disabled = true;
    }
    setTimeout(() => {
      if (applyBtn) {
        applyBtn.textContent = 'Apply & Reload Toolbox';
      }
    }, 1500);
  }
}

function _bindGradualControls() {
  const checkbox = panelEl.panel.querySelector('#paGradualCheckbox');
  if (checkbox) {
    checkbox.addEventListener('change', (e) => {
      setGradualUnlockEnabled(e.target.checked);
      updatePanelContent();
    });
  }

  const slider = panelEl.panel.querySelector('#paDateSlider');
  if (slider) {
    slider.addEventListener('input', (e) => {
      const idx = parseInt(e.target.value, 10);
      const milestone = PHASE_2_SCHEDULE[idx];
      if (milestone) {
        setSimulatedDate(milestone.date);
        
        // Update labels live
        const dateStrEl = panelEl.panel.querySelector('#paSimulatedDateStr');
        const dayLabelEl = panelEl.panel.querySelector('#paSimulatedDayLabel');
        if (dateStrEl) dateStrEl.textContent = milestone.date;
        if (dayLabelEl) dayLabelEl.textContent = `Day ${milestone.day}`;
        
        // Update checklist statuses
        const items = panelEl.panel.querySelectorAll('.pa-checklist-item');
        items.forEach((item, i) => {
          const itemMilestone = PHASE_2_SCHEDULE[i];
          if (itemMilestone) {
            const isUnlocked = milestone.date >= itemMilestone.date;
            item.className = `pa-checklist-item ${isUnlocked ? 'unlocked' : 'locked'}`;
            const statusEl = item.querySelector('.pa-checklist-status');
            if (statusEl) {
              statusEl.textContent = isUnlocked ? '✓ Unlocked' : '🔒 Locked';
            }
          }
        });
      }
    });
  }
}

function updatePanelContent() {
  if (!panelEl) return;
  if (selectedPhase === null) {
    selectedPhase = getPhase();
  }
  panelEl.panel.innerHTML = buildPanelHTML();

  // Re-bind events
  panelEl.panel.querySelector('.pa-close').addEventListener('click', hidePanel);

  const buttons = panelEl.panel.querySelectorAll('.pa-phase-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      selectPhase(parseInt(btn.dataset.phase, 10));
    });
  });
  
  const applyBtn = panelEl.panel.querySelector('.pa-apply-btn');
  if (applyBtn) {
    applyBtn.addEventListener('click', applyPhase);
  }

  _bindGradualControls();
}

function buildPanelHTML() {
  const current = getPhase();
  if (selectedPhase === null) selectedPhase = current;
  
  const info = getPhaseInfo(selectedPhase);
  const allPhases = getAllPhaseInfo();

  let phaseBtns = '';
  for (let i = 1; i <= 6; i++) {
    const p = allPhases[i];
    const active = i === selectedPhase ? ' active' : '';
    phaseBtns += `
      <button class="pa-phase-btn${active}" data-phase="${i}">
        <span class="pa-phase-icon">${p.icon}</span>
        <span class="pa-phase-num">P${i}</span>
        <span class="pa-phase-name">${p.name}</span>
        <span class="pa-phase-pct">${p.percent}%</span>
      </button>`;
  }

  // Gradual Unlock UI for Phase 2
  let gradualUnlockUI = '';
  if (selectedPhase === 2) {
    const gradualEnabled = isGradualUnlockEnabled();
    const simulatedDate = getSimulatedDate();
    
    // Find index of current simulated date in schedule
    let sliderVal = 0;
    let currentMilestone = PHASE_2_SCHEDULE[0];
    for (let i = 0; i < PHASE_2_SCHEDULE.length; i++) {
      if (simulatedDate >= PHASE_2_SCHEDULE[i].date) {
        sliderVal = i;
        currentMilestone = PHASE_2_SCHEDULE[i];
      }
    }
    
    // Generate checklist HTML
    let checklistHTML = '';
    PHASE_2_SCHEDULE.forEach((m) => {
      const isUnlocked = simulatedDate >= m.date;
      const statusText = isUnlocked ? '✓ Unlocked' : '🔒 Locked';
      const statusClass = isUnlocked ? 'unlocked' : 'locked';
      checklistHTML += `
        <div class="pa-checklist-item ${statusClass}" data-date="${m.date}">
          <span>${m.label} (${m.date})</span>
          <span class="pa-checklist-status">${statusText}</span>
        </div>`;
    });

    gradualUnlockUI = `
      <div class="pa-gradual-section">
        <div class="pa-gradual-title">
          <span>Gradual Unlock Mode</span>
          <label class="pa-checkbox-label">
            <input type="checkbox" id="paGradualCheckbox" ${gradualEnabled ? 'checked' : ''}>
            Enable gradual unlock
          </label>
        </div>
        
        ${gradualEnabled ? `
          <div class="pa-slider-container">
            <div class="pa-date-info">
              <span>Date: <span id="paSimulatedDateStr">${simulatedDate}</span></span>
              <span id="paSimulatedDayLabel">Day ${currentMilestone.day}</span>
            </div>
            <input type="range" id="paDateSlider" class="pa-date-slider" min="0" max="${PHASE_2_SCHEDULE.length - 1}" value="${sliderVal}">
            <div class="pa-checklist-container">
              ${checklistHTML}
            </div>
          </div>
        ` : `
          <div style="font-size:0.75rem;color:#64748b;font-style:italic;">
            Gradual unlock disabled. All Phase 2 features will unlock immediately upon applying.
          </div>
        `}
      </div>`;
  }

  const isCurrentActive = selectedPhase === current;
  const applyDisabled = isCurrentActive ? 'disabled' : '';

  return `
    <div class="pa-header">
      <h3>⚡ Phase Control <span class="pa-badge">ADMIN</span></h3>
      <button class="pa-close">✕</button>
    </div>
    <div class="pa-body">
      <div class="pa-current">
        <div class="pa-current-icon">${info.icon}</div>
        <div class="pa-current-info" style="flex:1">
          <h4>Phase ${selectedPhase}: ${info.name}</h4>
          <p>${info.description}</p>
          <div class="pa-current-bar">
            <div class="pa-current-bar-fill" style="width:${info.percent}%"></div>
          </div>
        </div>
      </div>
      <div class="pa-phases">
        ${phaseBtns}
      </div>
      ${gradualUnlockUI}
    </div>
    <div class="pa-footer">
      <span class="pa-footer-hint">Ctrl+Shift+P to toggle</span>
      <button class="pa-apply-btn" ${applyDisabled}>Apply & Reload Toolbox</button>
    </div>`;
}

/**
 * Show the admin panel.
 */
export function showPanel() {
  if (!panelEl) createPanel();
  selectedPhase = getPhase();
  updatePanelContent();

  requestAnimationFrame(() => {
    panelEl.overlay.classList.add('visible');
    panelEl.panel.classList.add('visible');
  });
  isVisible = true;
}

/**
 * Hide the admin panel.
 */
export function hidePanel() {
  if (!panelEl) return;
  panelEl.overlay.classList.remove('visible');
  panelEl.panel.classList.remove('visible');
  isVisible = false;
}

/**
 * Toggle the admin panel visibility.
 */
export function togglePanel() {
  if (isVisible) hidePanel();
  else showPanel();
}

/**
 * Initialize the admin panel keyboard shortcut.
 * Ctrl+Shift+P opens/closes the panel.
 */
export function initPhaseAdmin() {
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'P' || e.key === 'p')) {
      e.preventDefault();
      togglePanel();
    }
  });
  console.log('[PhaseAdmin] Ready. Press Ctrl+Shift+P to toggle admin panel.');
}
