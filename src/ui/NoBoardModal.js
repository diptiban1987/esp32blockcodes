import { refreshIcons } from './icons';

let _modalEl = null;

export function showNoBoardModal() {
  if (_modalEl) {
    _modalEl.classList.add('open');
    return;
  }

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'noBoardModal';

  const content = document.createElement('div');
  content.className = 'modal-content';
  content.style.cssText = `
    width: 420px;
    max-height: 320px;
    padding: 0;
  `;

  content.innerHTML = `
    <div class="modal-header">
      <h3>No Board Detected</h3>
      <button class="modal-close" id="closeNoBoardBtn">
        <i data-lucide="x" style="width:16px;height:16px;"></i>
      </button>
    </div>
    <div style="padding: 24px 20px; text-align: center;">
      <div style="font-size: 48px; margin-bottom: 12px; line-height: 1;">
        <i data-lucide="usb" style="width:48px;height:48px;color:var(--text-muted);"></i>
      </div>
      <p style="font-size: 15px; font-weight: 600; color: var(--text-primary); margin: 0 0 8px;">
        Please connect your ESP32 board
      </p>
      <p style="font-size: 13px; color: var(--text-muted); margin: 0 0 20px; line-height: 1.5;">
        Plug in your ESP32 via USB and ensure the drivers are installed.<br>
        Then click the upload button again.
      </p>
      <div style="display: flex; gap: 8px; justify-content: center;">
        <button id="noBoardCloseBtn" style="
          padding: 8px 20px;
          border: 1px solid var(--border);
          background: var(--bg-secondary);
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          cursor: pointer;
          font-family: var(--font-ui);
        ">OK</button>
      </div>
    </div>
  `;

  overlay.appendChild(content);
  document.body.appendChild(overlay);
  _modalEl = overlay;

  refreshIcons();

  requestAnimationFrame(() => overlay.classList.add('open'));

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeNoBoardModal();
  });

  document.getElementById('closeNoBoardBtn')?.addEventListener('click', closeNoBoardModal);
  document.getElementById('noBoardCloseBtn')?.addEventListener('click', closeNoBoardModal);
}

export function closeNoBoardModal() {
  if (_modalEl) {
    _modalEl.classList.remove('open');
    setTimeout(() => {
      if (_modalEl && _modalEl.parentNode) _modalEl.parentNode.removeChild(_modalEl);
      _modalEl = null;
    }, 200);
  }
}
