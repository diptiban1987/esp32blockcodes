// DeveloperPinModal — Protects ESP32 and Raspberry Pi Hardware Board Mode with a Developer PIN
import { refreshIcons } from './icons';
import { showToast } from './ModeSwitcher';

export const DEVELOPER_PIN = '250560';

let _modalEl = null;
let _currentOnSuccess = null;
let _currentOnCancel = null;
let _isUnlocked = false;

/**
 * Check if the developer PIN has been validated for this session
 */
export function isDeveloperUnlocked() {
  if (_isUnlocked) return true;
  try {
    return sessionStorage.getItem('techy_developer_unlocked') === 'true';
  } catch (e) {
    return _isUnlocked;
  }
}

/**
 * Mark developer access as unlocked or locked
 */
export function setDeveloperUnlocked(unlocked = true) {
  _isUnlocked = !!unlocked;
  try {
    if (unlocked) {
      sessionStorage.setItem('techy_developer_unlocked', 'true');
    } else {
      sessionStorage.removeItem('techy_developer_unlocked');
    }
  } catch (e) {}
}

/**
 * Lock developer access back
 */
export function lockDeveloperAccess() {
  setDeveloperUnlocked(false);
}

/**
 * Ensures developer PIN is validated every time before opening board mode.
 * Opens the Developer PIN modal on every access attempt.
 */
export function requireDeveloperPin(onSuccess, onCancel) {
  showDeveloperPinModal(onSuccess, onCancel);
}

/**
 * Shows the developer PIN entry modal
 */
export function showDeveloperPinModal(onSuccess, onCancel) {
  _currentOnSuccess = onSuccess;
  _currentOnCancel = onCancel;

  if (!_modalEl) {
    _createModal();
  }

  const pinInput = _modalEl.querySelector('#devPinInput');
  const errorMsg = _modalEl.querySelector('#devPinError');

  if (pinInput) {
    pinInput.value = '';
  }
  if (errorMsg) {
    errorMsg.style.display = 'none';
    errorMsg.textContent = '';
  }

  _modalEl.classList.add('open');

  requestAnimationFrame(() => {
    if (pinInput) {
      pinInput.focus();
    }
    refreshIcons();
  });
}

function _closeModal(cancelled = false) {
  if (_modalEl) {
    _modalEl.classList.remove('open');
  }
  if (cancelled && typeof _currentOnCancel === 'function') {
    _currentOnCancel();
  }
  _currentOnSuccess = null;
  _currentOnCancel = null;
}

function _verifyPin() {
  const pinInput = _modalEl.querySelector('#devPinInput');
  const errorMsg = _modalEl.querySelector('#devPinError');
  const modalBox = _modalEl.querySelector('.dev-pin-box');

  const enteredPin = pinInput ? pinInput.value.trim() : '';

  if (enteredPin === DEVELOPER_PIN) {
    _closeModal(false);
    showToast('🔓 Developer PIN verified — Board Mode unlocked');
    if (typeof _currentOnSuccess === 'function') {
      const cb = _currentOnSuccess;
      _currentOnSuccess = null;
      _currentOnCancel = null;
      cb();
    }
  } else {
    if (errorMsg) {
      errorMsg.textContent = enteredPin.length === 0
        ? 'Please enter the Developer PIN.'
        : '❌ Incorrect Developer PIN. Access denied.';
      errorMsg.style.display = 'block';
    }

    if (modalBox) {
      modalBox.classList.remove('pin-shake');
      void modalBox.offsetWidth; // Trigger reflow for restart animation
      modalBox.classList.add('pin-shake');
    }

    if (pinInput) {
      pinInput.value = '';
      pinInput.focus();
    }
  }
}

function _createModal() {
  const overlay = document.createElement('div');
  overlay.className = 'board-modal-overlay dev-pin-overlay';
  overlay.id = 'developerPinModal';

  const modalBox = document.createElement('div');
  modalBox.className = 'board-modal-box dev-pin-box';
  modalBox.style.maxWidth = '420px';
  modalBox.style.padding = '24px';

  modalBox.innerHTML = `
    <div class="board-modal-header" style="margin-bottom: 16px; padding-bottom: 12px;">
      <div style="display:flex; align-items:center; gap: 10px;">
        <div style="width:36px; height:36px; border-radius:10px; background:rgba(255,140,26,0.14); display:flex; align-items:center; justify-content:center; color:#FF8C1A; flex-shrink:0;">
          <i data-lucide="shield-alert" style="width:20px; height:20px;"></i>
        </div>
        <div>
          <span class="board-modal-title" style="display:block; font-size:16px; font-weight:700;">Developer Access Required</span>
          <span style="font-size:12px; color:var(--text-muted, #64748b);">Hardware Board Mode (ESP32 & Raspberry Pi)</span>
        </div>
      </div>
      <button class="board-modal-close" id="closeDevPinModalBtn" title="Close">
        <i data-lucide="x" style="width:18px;height:18px;"></i>
      </button>
    </div>

    <div style="text-align: left; margin-bottom: 18px;">
      <p style="font-size: 13.5px; color: var(--text-secondary, #475569); margin: 0 0 14px; line-height: 1.5;">
        To access <strong>ESP32</strong> (I-Bot) or <strong>Raspberry Pi Pico</strong> (T-Bot) board development, please enter the Developer PIN below:
      </p>

      <div style="position: relative; margin-bottom: 8px;">
        <input
          type="password"
          id="devPinInput"
          placeholder="Enter 6-digit PIN"
          maxlength="12"
          autocomplete="off"
          style="
            width: 100%;
            height: 48px;
            padding: 0 45px 0 16px;
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 4px;
            border-radius: 10px;
            border: 1.5px solid var(--border, #cbd5e1);
            background: var(--bg-secondary, #f8fafc);
            color: var(--text-primary, #0f172a);
            box-sizing: border-box;
            outline: none;
            transition: all 0.2s ease;
            text-align: center;
            font-family: monospace, var(--font-ui);
          "
        />
        <button
          type="button"
          id="toggleDevPinVisibilityBtn"
          title="Show / Hide PIN"
          style="
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            color: var(--text-muted, #94a3b8);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px;
            border-radius: 6px;
          "
        >
          <i data-lucide="eye" style="width: 18px; height: 18px;"></i>
        </button>
      </div>

      <div id="devPinError" style="
        display: none;
        color: #ef4444;
        font-size: 12.5px;
        font-weight: 600;
        margin-top: 6px;
        text-align: center;
      "></div>
    </div>

    <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;">
      <button id="cancelDevPinBtn" style="
        padding: 9px 16px;
        border: 1px solid var(--border, #cbd5e1);
        background: var(--bg-secondary, #f1f5f9);
        border-radius: 9px;
        font-size: 13.5px;
        font-weight: 600;
        color: var(--text-secondary, #475569);
        cursor: pointer;
        transition: all 0.15s ease;
      ">Cancel</button>
      <button id="submitDevPinBtn" style="
        padding: 9px 20px;
        border: none;
        background: linear-gradient(135deg, #FF8C1A 0%, #EA580C 100%);
        border-radius: 9px;
        font-size: 13.5px;
        font-weight: 700;
        color: #ffffff;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        box-shadow: 0 4px 12px rgba(255, 140, 26, 0.35);
        transition: all 0.15s ease;
      ">
        <i data-lucide="unlock" style="width: 16px; height: 16px;"></i>
        <span>Unlock Board</span>
      </button>
    </div>
  `;

  overlay.appendChild(modalBox);
  document.body.appendChild(overlay);
  _modalEl = overlay;

  // ── Event Handlers ──
  const closeBtn = modalBox.querySelector('#closeDevPinModalBtn');
  const cancelBtn = modalBox.querySelector('#cancelDevPinBtn');
  const submitBtn = modalBox.querySelector('#submitDevPinBtn');
  const pinInput = modalBox.querySelector('#devPinInput');
  const toggleVisibilityBtn = modalBox.querySelector('#toggleDevPinVisibilityBtn');

  closeBtn?.addEventListener('click', () => _closeModal(true));
  cancelBtn?.addEventListener('click', () => _closeModal(true));
  submitBtn?.addEventListener('click', () => _verifyPin());

  // Toggle show/hide PIN
  toggleVisibilityBtn?.addEventListener('click', () => {
    if (!pinInput) return;
    const isPassword = pinInput.type === 'password';
    pinInput.type = isPassword ? 'text' : 'password';
    toggleVisibilityBtn.innerHTML = isPassword
      ? '<i data-lucide="eye-off" style="width: 18px; height: 18px;"></i>'
      : '<i data-lucide="eye" style="width: 18px; height: 18px;"></i>';
    refreshIcons();
  });

  // Handle enter key to submit, escape to cancel
  pinInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      _verifyPin();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      _closeModal(true);
    }
  });

  pinInput?.addEventListener('mousedown', (e) => e.stopPropagation());

  // Focus styling on input
  pinInput?.addEventListener('focus', () => {
    pinInput.style.borderColor = '#FF8C1A';
    pinInput.style.boxShadow = '0 0 0 3px rgba(255, 140, 26, 0.18)';
    pinInput.style.background = 'var(--bg-primary, #ffffff)';
  });

  pinInput?.addEventListener('blur', () => {
    pinInput.style.borderColor = 'var(--border, #cbd5e1)';
    pinInput.style.boxShadow = 'none';
    pinInput.style.background = 'var(--bg-secondary, #f8fafc)';
  });

  // Click outside to cancel
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      _closeModal(true);
    }
  });

  // ESC to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      _closeModal(true);
    }
  });
}
