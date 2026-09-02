// ModeSwitcher — builds the modern navbar and handles mode/view toggling
import { refreshIcons } from './icons';
import { isFeatureEnabled, getPlan } from '../services/featureFlags';
import { showSubscriptionModal, updatePlanBadge } from './SubscriptionModal';
import { requireDeveloperPin } from './DeveloperPinModal';
import techyGuideLogo from '../../public/logo/logo-ByQhDDdF.webp';
import iBotImg from '../../public/board/i-bot.png';
import tBotImg from '../../public/board/t-bot.PNG';
import picoImg from '../../public/board/pico.svg';
import { setCurrentBoard, getCurrentBoard } from '../services/boardConfig';

let currentMode = 'techyblocks'; // 'techyblocks' | 'board'
let currentBoardView = 'stage'; // 'stage' | 'code'
let selectedBoard = null; // 'i-bot' | 't-bot' | 'pico'
let onModeChangeCallback = null;
let onViewChangeCallback = null;

// ── Toast notification ──────────────────────────────
export function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';

  toast.style.cssText = `
    position: fixed; top: 24px; left: 50%;
    transform: translateX(-50%) translateY(-20px);
    background: #fff; color: #1a1a1a;
    border-left: 4px solid var(--accent);
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    padding: 12px 24px; border-radius: 10px;
    display: flex; align-items: center; gap: 10px;
    font-family: var(--font-ui); font-size: 14px; font-weight: 600;
    z-index: 9999; opacity: 0;
    transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  `;

  toast.innerHTML = `
    <i data-lucide="info" style="width:18px;height:18px;color:var(--accent);flex-shrink:0;"></i>
    <span>${message}</span>
  `;

  document.body.appendChild(toast);
  refreshIcons();

  void toast.offsetWidth;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(-20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── Board options ───────────────────────────────────
export const BOARDS = [
  {
    id: 'techyblocks',
    name: 'TechyBlocks',
    mode: 'techyblocks',
    desc: 'Block Coding & Animation',
    isTechyblocks: true,
  },
  {
    id: 'i-bot',
    name: 'I-Bot',
    mode: 'board',
    boardType: 'esp32',
    desc: 'ESP32 Robotic Board',
    img: iBotImg,
    defaultLang: 'arduino',
  },
  {
    id: 't-bot',
    name: 'Te-Bot',
    mode: 'board',
    boardType: 'pico',
    desc: 'Raspberry Pi Pico Robotic Board',
    img: tBotImg,
    defaultLang: 'arduino',
  },
];

// ── Init ────────────────────────────────────────────
export function initModeSwitcher(onModeChange, onViewChange) {
  onModeChangeCallback = onModeChange;
  onViewChangeCallback = onViewChange;

  const header = document.getElementById('appHeader');
  if (!header) return;

  // ══════════════════════════════════════════════════
  //  LEFT SECTION — Logo
  // ══════════════════════════════════════════════════
  const leftSection = document.createElement('div');
  leftSection.className = 'header-left';

  const logo = document.createElement('a');
  logo.href = 'index.html';
  logo.className = 'header-logo';
  const logoImg = document.createElement('img');
  logoImg.src = techyGuideLogo;
  logoImg.alt = 'TechyGuide';
  logoImg.className = 'header-logo-img';
  logo.appendChild(logoImg);
  leftSection.appendChild(logo);

  // ══════════════════════════════════════════════════
  //  CENTER SECTION — Mode Switcher + Board Dropdown + Connect
  // ══════════════════════════════════════════════════
  const centerSection = document.createElement('div');
  centerSection.className = 'header-center';

  // ── Mode Switcher Segmented Button (TechyBlocks vs Board Mode) ──
  const modeToggle = document.createElement('div');
  modeToggle.className = 'header-mode-toggle';
  modeToggle.id = 'headerModeToggle';
  modeToggle.innerHTML = `
    <button class="header-mode-btn active" id="modeBtnTechyblocks" data-mode="techyblocks" title="Switch to TechyBlocks Animation Mode">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
      <span class="mode-label-full">TechyBlocks</span>
      <span class="mode-label-short">Blocks</span>
    </button>
    <button class="header-mode-btn" id="modeBtnBoard" data-mode="board" title="Switch to Hardware Board Mode">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>
      </svg>
      <span class="mode-label-full" id="boardModeBtnLabel">Board Mode</span>
      <span class="mode-label-short">Board</span>
    </button>
  `;

  modeToggle.querySelector('#modeBtnTechyblocks').addEventListener('click', () => {
    _switchMode('techyblocks');
  });
  modeToggle.querySelector('#modeBtnBoard').addEventListener('click', () => {
    requireDeveloperPin(() => {
      if (!selectedBoard) selectedBoard = 'i-bot';
      _switchMode('board');
    });
  });

  // ── Board Dropdown ──
  const boardWrap = document.createElement('div');
  boardWrap.className = 'relative';

  const boardBtn = document.createElement('button');
  boardBtn.className = 'nav-btn nav-btn--board';
  boardBtn.id = 'boardToggleBtn';
  boardBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
         style="pointer-events:none;flex-shrink:0;">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <rect x="9" y="9" width="6" height="6"/>
      <path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/>
      <path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>
    </svg>
    <span id="boardBtnLabel">I-Bot</span>
  `;

  // ── Board Selection Modal (compact popup) ──
  const boardPanel = document.createElement('div');
  boardPanel.className = 'board-modal-overlay';
  boardPanel.id = 'boardDropdownPanel';

  const modalBox = document.createElement('div');
  modalBox.className = 'board-modal-box';

  // Header with title + close
  const modalHeader = document.createElement('div');
  modalHeader.className = 'board-modal-header';
  modalHeader.innerHTML = `
    <span class="board-modal-title">Select Environment / Board</span>
    <button class="board-modal-close" id="closeBoardModalBtn">
      <i data-lucide="x" style="width:18px;height:18px;"></i>
    </button>
  `;
  modalBox.appendChild(modalHeader);

  // Cards row
  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'board-modal-cards';

  BOARDS.forEach((board) => {
    const card = document.createElement('div');
    card.className = 'board-modal-card';
    card.dataset.boardId = board.id;

    if (board.isTechyblocks) {
      card.innerHTML = `
        <div class="board-modal-card-img" style="display:flex;align-items:center;justify-content:center;background:rgba(255,140,26,0.12);border-radius:10px;padding:8px;">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#FF8C1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
          </svg>
        </div>
        <span class="board-modal-card-name">TechyBlocks Mode</span>
      `;
    } else {
      card.innerHTML = `
        <div class="board-modal-card-img">
          <img src="${board.img}" alt="${board.name}">
        </div>
        <span class="board-modal-card-name">${board.name}</span>
      `;
    }

    card.addEventListener('click', () => {
      boardPanel.classList.remove('open');

      if (board.isTechyblocks) {
        _switchMode('techyblocks');
        return;
      }

      requireDeveloperPin(() => {
        if (!isFeatureEnabled('boardMode')) {
          showSubscriptionModal();
          return;
        }

        selectedBoard = board.id;

        cardsContainer.querySelectorAll('.board-modal-card').forEach(c => {
          c.classList.remove('is-selected');
        });
        card.classList.add('is-selected');

        // Update boardConfig
        setCurrentBoard(board.boardType);

        // Update header board button label
        const boardBtnLabel = document.getElementById('boardBtnLabel');
        if (boardBtnLabel) {
          boardBtnLabel.textContent = board.name;
        }

        _switchMode('board');

        // Sync with editor's #boardDropdown
        const boardDropdown = document.getElementById('boardDropdown');
        if (boardDropdown && boardDropdown.value !== board.boardType) {
          boardDropdown.value = board.boardType;
          boardDropdown.dispatchEvent(new Event('change'));
        }
      });
    });

    cardsContainer.appendChild(card);
  });

  modalBox.appendChild(cardsContainer);
  boardPanel.appendChild(modalBox);

  // Close on backdrop click
  boardPanel.addEventListener('click', (e) => {
    if (e.target === boardPanel) boardPanel.classList.remove('open');
  });

  // Close button
  modalBox.querySelector('#closeBoardModalBtn').addEventListener('click', () => {
    boardPanel.classList.remove('open');
  });

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && boardPanel.classList.contains('open')) {
      boardPanel.classList.remove('open');
    }
  });

  // Open modal
  boardBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    boardPanel.classList.add('open');
    refreshIcons();
  });

  boardWrap.appendChild(boardBtn);
  document.body.appendChild(boardPanel);

  // ── Connect Button ──
  const connectBtn = document.createElement('button');
  connectBtn.className = 'nav-btn nav-btn--connect is-disconnected';
  connectBtn.id = 'connectBtn';
  connectBtn.title = 'Board Not Connected — Click to connect ESP32';
  connectBtn.innerHTML = `
    <span class="status-dot"></span>
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
         style="pointer-events:none;flex-shrink:0;">
      <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
      <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
      <line x1="12" y1="20" x2="12.01" y2="20"/>
    </svg>
    <span id="connectBtnLabel">Connect</span>
  `;

  centerSection.appendChild(modeToggle);
  centerSection.appendChild(boardWrap);
  centerSection.appendChild(connectBtn);

  // ══════════════════════════════════════════════════
  //  RIGHT SECTION — View Toggle + Theme + Upload
  // ══════════════════════════════════════════════════
  const rightSection = document.createElement('div');
  rightSection.className = 'header-right';

  // ── View Toggle (Professional Pill Tabs for Desktop) ──
  const tabGroup = document.createElement('div');
  tabGroup.className = 'header-view-toggle';
  tabGroup.id = 'headerViewGroup';
  tabGroup.innerHTML = `
    <button class="header-view-btn active" id="headerStageBtn" data-view="stage">
      <i data-lucide="monitor" style="width:14px;height:14px;"></i>
      Stage
    </button>
    <button class="header-view-btn" id="headerCodeBtn" data-view="code">
      <i data-lucide="upload" style="width:14px;height:14px;"></i>
      Upload
    </button>
  `;

  // ── Theme Toggle ──
  const themeBtn = document.createElement('button');
  themeBtn.className = 'header-toolbar-btn header-theme-btn';
  themeBtn.id = 'headerThemeBtn';
  themeBtn.setAttribute('data-tooltip', 'Toggle Theme');

  themeBtn.innerHTML = `
    <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
         style="pointer-events:none;display:block;">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
    <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
         style="pointer-events:none;display:none;">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  `;

  const _moonIcon = themeBtn.querySelector('.icon-moon');
  const _sunIcon  = themeBtn.querySelector('.icon-sun');

  function _applyThemeIcon(isDark) {
    _moonIcon.style.display = isDark ? 'none'  : 'block';
    _sunIcon.style.display  = isDark ? 'block' : 'none';
  }

  // Restore saved theme on load
  const savedTheme = localStorage.getItem('techyguide-theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    _applyThemeIcon(true);
  }

  const toggleTheme = () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('techyguide-theme', next);
    _applyThemeIcon(next === 'dark');
    document.dispatchEvent(new CustomEvent('techyguide-themechange', { detail: { theme: next } }));
  };

  themeBtn.addEventListener('click', toggleTheme);

  rightSection.appendChild(tabGroup);
  rightSection.appendChild(themeBtn);

  // ── Plan Badge ──
  const planBadge = document.createElement('span');
  planBadge.className = 'plan-badge';
  planBadge.id = 'planBadge';
  planBadge.addEventListener('click', showSubscriptionModal);
  rightSection.appendChild(planBadge);

  // ── Mobile Header Quick Actions & Hamburger Menu (screens ≤600px) ──
  const mobileQuickActions = document.createElement('div');
  mobileQuickActions.className = 'mobile-header-actions';
  mobileQuickActions.innerHTML = `
    <button class="mobile-header-quick-btn" id="mobileUndoBtn" title="Undo (Ctrl+Z)">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
      </svg>
    </button>
    <button class="mobile-header-quick-btn" id="mobileSaveBtn" title="Save Project">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
      </svg>
    </button>
    <button class="mobile-header-menu-btn" id="mobileHeaderMenuBtn" title="More Options">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
      </svg>
    </button>
  `;

  mobileQuickActions.querySelector('#mobileUndoBtn').addEventListener('click', () => {
    document.getElementById('headerUndoBtn')?.click();
  });

  mobileQuickActions.querySelector('#mobileSaveBtn').addEventListener('click', () => {
    document.getElementById('headerSaveBtn')?.click();
  });

  const mobileMenuBtn = mobileQuickActions.querySelector('#mobileHeaderMenuBtn');

  const mobileDrawer = document.createElement('div');
  mobileDrawer.className = 'mobile-header-drawer';
  mobileDrawer.id = 'mobileHeaderDrawer';
  mobileDrawer.innerHTML = `
    <div class="mobile-drawer-content">
      <div class="mobile-drawer-header">
        <span class="mobile-drawer-title">Options & Tools</span>
        <button class="mobile-drawer-close" id="closeMobileDrawerBtn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="mobile-drawer-body">
        <div class="mobile-drawer-item">
          <span>🧩 Extensions Library</span>
          <button class="mobile-drawer-action-btn" id="drawerExtBtn">Open</button>
        </div>
        <div class="mobile-drawer-item">
          <span>📖 Examples Library</span>
          <button class="mobile-drawer-action-btn" id="drawerExamplesBtn">View</button>
        </div>
        <div class="mobile-drawer-item">
          <span>📂 Open Project (.sb3 / .json)</span>
          <button class="mobile-drawer-action-btn" id="drawerOpenBtn">Load</button>
        </div>
        <div class="mobile-drawer-item">
          <span>💾 Save Project</span>
          <button class="mobile-drawer-action-btn" id="drawerSaveBtn">Save</button>
        </div>
        <div class="mobile-drawer-item">
          <span>🌙 Dark / Light Theme</span>
          <button class="mobile-drawer-action-btn" id="drawerThemeBtn">Toggle</button>
        </div>
        <div class="mobile-drawer-item">
          <span>🤖 Target Board</span>
          <button class="mobile-drawer-action-btn" id="drawerBoardBtn">Change</button>
        </div>
        <div class="mobile-drawer-item">
          <span>⭐ Subscription Plan</span>
          <button class="mobile-drawer-action-btn" id="drawerPlanBtn">Upgrade</button>
        </div>
      </div>
    </div>
  `;

  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileDrawer.classList.toggle('open');
  });

  mobileDrawer.querySelector('#closeMobileDrawerBtn').addEventListener('click', () => {
    mobileDrawer.classList.remove('open');
  });

  mobileDrawer.addEventListener('click', (e) => {
    if (e.target === mobileDrawer) mobileDrawer.classList.remove('open');
  });

  mobileDrawer.querySelector('#drawerExtBtn').addEventListener('click', () => {
    mobileDrawer.classList.remove('open');
    document.getElementById('headerExtensionBtn')?.click() || document.getElementById('scratchStickyExtBtn')?.click();
  });

  mobileDrawer.querySelector('#drawerExamplesBtn').addEventListener('click', () => {
    mobileDrawer.classList.remove('open');
    document.getElementById('headerExamplesBtn')?.click();
  });

  mobileDrawer.querySelector('#drawerOpenBtn').addEventListener('click', () => {
    mobileDrawer.classList.remove('open');
    document.getElementById('headerImportBtn')?.click();
  });

  mobileDrawer.querySelector('#drawerSaveBtn').addEventListener('click', () => {
    mobileDrawer.classList.remove('open');
    document.getElementById('headerSaveBtn')?.click();
  });

  mobileDrawer.querySelector('#drawerThemeBtn').addEventListener('click', () => {
    toggleTheme();
  });

  mobileDrawer.querySelector('#drawerBoardBtn').addEventListener('click', () => {
    mobileDrawer.classList.remove('open');
    boardPanel.classList.add('open');
  });

  mobileDrawer.querySelector('#drawerPlanBtn').addEventListener('click', () => {
    mobileDrawer.classList.remove('open');
    showSubscriptionModal();
  });

  rightSection.appendChild(mobileQuickActions);
  document.body.appendChild(mobileDrawer);

  // ══════════════════════════════════════════════════
  //  ASSEMBLE
  // ══════════════════════════════════════════════════
  header.appendChild(leftSection);
  header.appendChild(centerSection);
  header.appendChild(rightSection);

  // Wire view toggle
  document.getElementById('headerStageBtn')?.addEventListener('click', () => _setView('stage'));
  document.getElementById('headerCodeBtn')?.addEventListener('click', () => _setView('code'));

  // Render Lucide icons
  updatePlanBadge();
  refreshIcons();

  // Force clean initial state
  currentMode = null;
  _switchMode('techyblocks');
}

// ── Mode switching ──────────────────────────────────
export function setMode(newMode) {
  if (newMode === 'board') {
    requireDeveloperPin(() => _switchMode(newMode));
  } else {
    _switchMode(newMode);
  }
}

function _switchMode(newMode) {
  if (newMode === currentMode) return;
  currentMode = newMode;

  const body = document.body;
  const animationPane = document.getElementById('animationPane');
  const boardPane = document.getElementById('boardPane');
  const stageControls = document.getElementById('stageControls');
  const boardBtnLabel = document.getElementById('boardBtnLabel');
  const modeBtnTechyblocks = document.getElementById('modeBtnTechyblocks');
  const modeBtnBoard = document.getElementById('modeBtnBoard');
  const boardWrap = document.querySelector('.header-center .relative');
  const connectBtn = document.getElementById('connectBtn');

  const headerViewGroup = document.getElementById('headerViewGroup');
  const wirelessToggleBtn = document.getElementById('wirelessToggleBtn');

  if (newMode === 'techyblocks') {
    body.classList.remove('mode-board');
    body.classList.add('mode-techyblocks');
    if (window.innerWidth > 992) {
      if (animationPane) animationPane.style.display = 'flex';
      if (boardPane) boardPane.style.display = 'none';
    }
    if (stageControls) stageControls.style.display = 'flex';
    if (boardBtnLabel) boardBtnLabel.textContent = 'Board';

    if (modeBtnTechyblocks) modeBtnTechyblocks.classList.add('active');
    if (modeBtnBoard) modeBtnBoard.classList.remove('active');
    if (boardWrap) boardWrap.style.display = 'none';
    if (connectBtn) connectBtn.style.display = 'none';
    if (headerViewGroup) headerViewGroup.style.display = 'none';
    if (wirelessToggleBtn) wirelessToggleBtn.style.display = 'none';

    _setView('stage');
  } else {
    body.classList.remove('mode-techyblocks');
    body.classList.add('mode-board');
    if (window.innerWidth > 992) {
      if (animationPane) animationPane.style.display = 'none';
      if (boardPane) boardPane.style.display = 'flex';
    }
    if (stageControls) stageControls.style.display = 'none';

    if (modeBtnBoard) modeBtnBoard.classList.add('active');
    if (modeBtnTechyblocks) modeBtnTechyblocks.classList.remove('active');
    if (boardWrap) boardWrap.style.display = 'block';
    if (connectBtn && window.innerWidth > 992) connectBtn.style.display = 'flex';
    if (headerViewGroup && window.innerWidth > 992) headerViewGroup.style.display = 'flex';
    if (wirelessToggleBtn && window.innerWidth > 992) wirelessToggleBtn.style.display = 'inline-flex';

    if (boardBtnLabel) {
      const found = BOARDS.find(b => b.id === selectedBoard);
      boardBtnLabel.textContent = found ? found.name : 'I-Bot';
    }

    _setView('code');
  }

  if (onModeChangeCallback) {
    onModeChangeCallback(newMode);
  }
}

// ── View switching ──────────────────────────────────
function _setView(view) {
  if (view === currentBoardView) return;

  // Guard: switching to Upload requires a board to be selected
  if (view === 'code' && !selectedBoard) {
    showToast('Please select a board first.');
    return;
  }

  currentBoardView = view;

  const stageBtn = document.getElementById('headerStageBtn');
  const codeBtn = document.getElementById('headerCodeBtn');

  if (view === 'stage') {
    stageBtn?.classList.add('active');
    codeBtn?.classList.remove('active');
  } else {
    codeBtn?.classList.add('active');
    stageBtn?.classList.remove('active');
  }

  if (onViewChangeCallback) onViewChangeCallback(view);
}

// ── Sync Board Selection (from editor dropdown or other sources) ────
export function syncBoardSelection(boardType) {
  if (boardType === 'pico') {
    selectedBoard = 't-bot';
  } else {
    selectedBoard = 'i-bot';
  }

  const boardBtnLabel = document.getElementById('boardBtnLabel');
  if (boardBtnLabel && currentMode === 'board') {
    const found = BOARDS.find(b => b.id === selectedBoard) || BOARDS.find(b => b.boardType === boardType);
    if (found) boardBtnLabel.textContent = found.name;
  }

  const modal = document.getElementById('boardDropdownPanel');
  if (modal) {
    modal.querySelectorAll('.board-modal-card').forEach(c => {
      if (c.dataset.boardId === selectedBoard) {
        c.classList.add('is-selected');
      } else {
        c.classList.remove('is-selected');
      }
    });
  }
}

// ── Public getters ──────────────────────────────────
export function getCurrentMode() {
  return currentMode === 'techyblocks' ? 'techyblocks' : currentMode;
}

export function getCurrentBoardView() {
  return currentBoardView;
}

export function getSelectedBoard() {
  return selectedBoard;
}
