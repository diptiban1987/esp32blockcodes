import { Extension } from '../extensions';
import { techyblocksToolbox } from '../techyblocksToolbox';
import { refreshBlockSearch } from './blockSearch';
import { refreshIcons } from './icons';
import { showToast } from './ModeSwitcher';

const EXTENSIONS_LIBRARY = [
  {
    id: 'pen',
    name: 'Pen',
    description: 'Draw with your sprites.',
    color: '#0FBD8C',
    gradient: 'linear-gradient(135deg, #0FBD8C 0%, #008f66 100%)',
    iconSvg: `<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>`,
    tag: 'Scratch Extension',
    isAvailable: true,
  },
  {
    id: 'music',
    name: 'Music',
    description: 'Play instruments and drums.',
    color: '#FFBF00',
    gradient: 'linear-gradient(135deg, #FFBF00 0%, #d49a00 100%)',
    iconSvg: `<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,
    tag: 'Coming Soon',
    isAvailable: false,
  },
  {
    id: 'video_sensing',
    name: 'Video Sensing',
    description: 'Sense motion with the camera.',
    color: '#15B8E6',
    gradient: 'linear-gradient(135deg, #15B8E6 0%, #0c88ab 100%)',
    iconSvg: `<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>`,
    tag: 'Coming Soon',
    isAvailable: false,
  },
  {
    id: 'face_sensing',
    name: 'Face Sensing (AI)',
    description: 'Detect faces, expressions, and poses using AI vision.',
    color: '#9966FF',
    gradient: 'linear-gradient(135deg, #9966FF 0%, #6830d9 100%)',
    iconSvg: `<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><circle cx="9" cy="9" r="1.5"></circle><circle cx="15" cy="9" r="1.5"></circle><path d="M9 15c1.5 1.5 4.5 1.5 6 0"></path></svg>`,
    tag: 'Coming Soon',
    isAvailable: false,
  },
  {
    id: 'text2speech',
    name: 'Text to Speech',
    description: 'Make your projects talk with natural voices.',
    color: '#4C97FF',
    gradient: 'linear-gradient(135deg, #4C97FF 0%, #1e62c4 100%)',
    iconSvg: `<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,
    tag: 'Coming Soon',
    isAvailable: false,
  },
  {
    id: 'translate',
    name: 'Translate',
    description: 'Translate text into many languages.',
    color: '#27AE60',
    gradient: 'linear-gradient(135deg, #27AE60 0%, #19733e 100%)',
    iconSvg: `<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
    tag: 'Coming Soon',
    isAvailable: false,
  },
  {
    id: 'microbit',
    name: 'micro:bit',
    description: 'Connect your projects with the physical world.',
    color: '#00B5B5',
    gradient: 'linear-gradient(135deg, #00B5B5 0%, #007777 100%)',
    iconSvg: `<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
    tag: 'Coming Soon',
    isAvailable: false,
  },
];

let _modalEl = null;
let _workspace = null;

function renderModal() {
  if (_modalEl) return _modalEl;

  const modal = document.createElement('div');
  modal.id = 'extensionsModalOverlay';
  modal.className = 'ext-modal-overlay';
  modal.style.display = 'none';

  modal.innerHTML = `
    <div class="ext-modal-container">
      <div class="ext-modal-header">
        <button class="ext-modal-back-btn" id="extModalBackBtn" title="Back">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <h2 class="ext-modal-title">Choose an Extension</h2>
        <div class="ext-search-wrapper">
          <svg class="ext-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" id="extSearchInput" class="ext-search-input" placeholder="Search extensions..." autocomplete="off" />
        </div>
        <button class="ext-modal-close-btn" id="extModalCloseBtn" title="Close">✕</button>
      </div>

      <div class="ext-modal-body">
        <div class="ext-cards-grid" id="extCardsGrid"></div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeExtensionsModal();
  });

  const closeBtn = modal.querySelector('#extModalCloseBtn');
  const backBtn = modal.querySelector('#extModalBackBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeExtensionsModal);
  if (backBtn) backBtn.addEventListener('click', closeExtensionsModal);

  const searchInput = modal.querySelector('#extSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      populateCards(e.target.value.trim().toLowerCase());
    });
  }

  _modalEl = modal;
  return modal;
}

function populateCards(filter = '') {
  const grid = document.getElementById('extCardsGrid');
  if (!grid) return;

  grid.innerHTML = '';

  const filtered = EXTENSIONS_LIBRARY.filter((ext) => {
    if (!filter) return true;
    return (
      ext.name.toLowerCase().includes(filter) ||
      ext.description.toLowerCase().includes(filter) ||
      ext.tag.toLowerCase().includes(filter)
    );
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="ext-empty-state">
        <p>No extensions found matching "<strong>${filter}</strong>".</p>
      </div>
    `;
    return;
  }

  filtered.forEach((ext) => {
    const isAdded = Extension.isExtensionActive(ext.id);
    const card = document.createElement('div');
    card.className = `ext-card ${isAdded ? 'is-added' : ''} ${!ext.isAvailable ? 'is-coming-soon' : ''}`;
    card.setAttribute('data-id', ext.id);

    card.innerHTML = `
      <div class="ext-card-banner" style="background: ${ext.gradient};">
        <div class="ext-card-icon">${ext.iconSvg}</div>
        <span class="ext-card-tag" style="background: rgba(0,0,0,0.2);">${ext.tag}</span>
      </div>
      <div class="ext-card-content">
        <div class="ext-card-title-row">
          <h3 class="ext-card-name">${ext.name}</h3>
          ${isAdded ? '<span class="ext-badge-added">✓ Added</span>' : ''}
        </div>
        <p class="ext-card-desc">${ext.description}</p>
      </div>
    `;

    card.addEventListener('click', () => handleExtensionClick(ext));
    grid.appendChild(card);
  });
}

function handleExtensionClick(ext) {
  if (!ext.isAvailable) {
    showToast(`🚀 ${ext.name} extension is coming soon in the next update!`);
    return;
  }

  if (Extension.isExtensionActive(ext.id)) {
    showToast(`ℹ️ ${ext.name} is already added in your workspace.`);
    closeExtensionsModal();
    selectToolboxCategory(ext.name);
    return;
  }

  // Activate extension
  Extension.activateExtension(ext.id);

  if (_workspace) {
    try {
      const updatedToolbox = Extension.applyExtensionsToToolbox(techyblocksToolbox);
      _workspace.updateToolbox(updatedToolbox);
      refreshBlockSearch(updatedToolbox);
    } catch (err) {
      console.warn('[Extension] Error updating toolbox:', err);
    }
  }

  closeExtensionsModal();
  showToast(`✨ ${ext.name} extension added to workspace!`);

  setTimeout(() => {
    selectToolboxCategory(ext.name);
    refreshIcons();
  }, 100);
}

function selectToolboxCategory(categoryName) {
  try {
    const categories = document.querySelectorAll('.blocklyToolboxCategory');
    for (const cat of categories) {
      const label = cat.querySelector('.blocklyToolboxCategoryLabel');
      if (label && label.textContent.trim().toLowerCase() === categoryName.toLowerCase()) {
        cat.click();
        cat.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        break;
      }
    }
  } catch (_) {}
}

export function openExtensionsModal(ws) {
  if (ws) _workspace = ws;
  const modal = renderModal();
  populateCards('');
  const searchInput = modal.querySelector('#extSearchInput');
  if (searchInput) searchInput.value = '';
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  if (searchInput) setTimeout(() => searchInput.focus(), 150);
}

export function closeExtensionsModal() {
  if (_modalEl) {
    _modalEl.style.display = 'none';
  }
  document.body.style.overflow = '';
}

export function initExtensionsModal(ws) {
  if (ws) _workspace = ws;
  renderModal();
}
