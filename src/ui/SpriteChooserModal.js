// modal for selecting or uploading sprites from the built-in library
import { SPRITE_LIBRARY } from './spriteLibrary.js';
import spriteStore from '../engine/SpriteStore.js';
import { mergeDraggedBlocksIntoSprite } from './SpritePanel.js';

let modalEl = null;
let currentQuery = '';
let selectedCategory = 'All';

export function openSpriteChooser() {
  if (modalEl) return;

  currentQuery = '';
  selectedCategory = 'All';

  modalEl = document.createElement('div');
  modalEl.className = 'chooser-overlay';
  modalEl.innerHTML = `
    <div class="chooser-modal sprite-chooser-modal">
      <div class="chooser-header">
        <h3>Choose a Sprite</h3>
        <button class="chooser-close" id="closeSpriteChooser" title="Close"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
      </div>

      <div class="chooser-tabs">
        <button class="chooser-tab active" data-tab="library">Library</button>
        <button class="chooser-tab" data-tab="upload">Upload</button>
      </div>

      <div class="chooser-toolbar" id="spriteToolbar">
        <div class="chooser-search-box">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="spriteSearchInput" placeholder="Search sprites by name or category..." autocomplete="off" />
          <button id="spriteSearchClear" class="search-clear-btn" style="display:none;" title="Clear">&times;</button>
        </div>
        <div class="chooser-category-pills" id="spriteCategoryPills">
          <button class="category-pill active" data-category="All">All</button>
          <button class="category-pill" data-category="Animals">Animals</button>
          <button class="category-pill" data-category="People">People</button>
          <button class="category-pill" data-category="Fantasy">Fantasy</button>
          <button class="category-pill" data-category="Sports">Sports</button>
          <button class="category-pill" data-category="Music">Music</button>
          <button class="category-pill" data-category="Vehicles">Vehicles</button>
          <button class="category-pill" data-category="Space">Space</button>
          <button class="category-pill" data-category="Things">Things</button>
          <button class="category-pill" data-category="Food">Food</button>
          <button class="category-pill" data-category="Nature">Nature</button>
        </div>
      </div>

      <div class="chooser-body" id="spriteChooserBody">
        <!-- Library grid populated dynamically -->
      </div>
    </div>
  `;

  document.body.appendChild(modalEl);

  renderLibraryGrid();

  // Search input listeners
  const searchInput = modalEl.querySelector('#spriteSearchInput');
  const searchClear = modalEl.querySelector('#spriteSearchClear');

  searchInput.addEventListener('input', (e) => {
    currentQuery = e.target.value.trim();
    searchClear.style.display = currentQuery ? 'flex' : 'none';
    renderLibraryGrid();
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    currentQuery = '';
    searchClear.style.display = 'none';
    searchInput.focus();
    renderLibraryGrid();
  });

  // Category pill listeners
  modalEl.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      modalEl.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedCategory = pill.dataset.category;
      renderLibraryGrid();
    });
  });

  modalEl.querySelector('#closeSpriteChooser').addEventListener('click', close);
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) close();
  });

  document.addEventListener('keydown', onEsc);

  modalEl.querySelectorAll('.chooser-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      modalEl.querySelectorAll('.chooser-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const toolbar = modalEl.querySelector('#spriteToolbar');
      if (tab.dataset.tab === 'library') {
        if (toolbar) toolbar.style.display = 'flex';
        renderLibraryGrid();
      } else {
        if (toolbar) toolbar.style.display = 'none';
        renderUploadPane();
      }
    });
  });

  requestAnimationFrame(() => {
    modalEl.classList.add('open');
    searchInput.focus();
  });
}

function renderLibraryGrid() {
  const body = modalEl.querySelector('#spriteChooserBody');
  if (!body) return;

  const q = currentQuery.toLowerCase();
  const filtered = SPRITE_LIBRARY.filter(s => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesQuery = !q || s.name.toLowerCase().includes(q) || (s.category && s.category.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  if (filtered.length === 0) {
    body.innerHTML = `
      <div class="chooser-empty">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <p>No sprites found matching "<strong>${escapeHtml(currentQuery)}</strong>"</p>
        <button class="chooser-reset-btn" id="resetSpriteSearch">Clear Search</button>
      </div>
    `;

    const resetBtn = body.querySelector('#resetSpriteSearch');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        const searchInput = modalEl.querySelector('#spriteSearchInput');
        const searchClear = modalEl.querySelector('#spriteSearchClear');
        if (searchInput) searchInput.value = '';
        if (searchClear) searchClear.style.display = 'none';
        currentQuery = '';
        renderLibraryGrid();
      });
    }
    return;
  }

  // Group by category if "All" is selected and no active query; otherwise render flat grid
  let html = '';
  if (selectedCategory === 'All' && !q) {
    const categories = {};
    filtered.forEach(s => {
      const cat = s.category || 'Other';
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(s);
    });

    for (const [cat, sprites] of Object.entries(categories)) {
      html += `<div class="chooser-category"><span>${cat} (${sprites.length})</span></div>`;
      html += '<div class="chooser-grid">';
      sprites.forEach(sprite => {
        html += `
          <div class="chooser-item" data-sprite-name="${sprite.name}" title="${sprite.name}">
            <img src="${sprite.svg}" alt="${sprite.name}" />
            <span>${sprite.name}</span>
          </div>
        `;
      });
      html += '</div>';
    }
  } else {
    html += `<div class="chooser-category"><span>Found ${filtered.length} Sprite${filtered.length > 1 ? 's' : ''}</span></div>`;
    html += '<div class="chooser-grid">';
    filtered.forEach(sprite => {
      html += `
        <div class="chooser-item" data-sprite-name="${sprite.name}" title="${sprite.name}">
          <img src="${sprite.svg}" alt="${sprite.name}" />
          <span>${sprite.name}</span>
        </div>
      `;
    });
    html += '</div>';
  }

  body.innerHTML = html;

  body.querySelectorAll('.chooser-item').forEach(item => {
    item.addEventListener('click', () => {
      const name = item.dataset.spriteName;
      const spriteDef = SPRITE_LIBRARY.find(s => s.name === name);
      if (spriteDef) {
        const i = spriteStore.getAllSprites().length + 1;
        const displayName = `${spriteDef.name}${i > 1 ? i : ''}`;
        spriteStore.addSprite(displayName, { costumeSrc: spriteDef.svg });
      }
      close();
    });

    item.addEventListener('dragover', (e) => {
      e.preventDefault();
      item.classList.add('chooser-item--drop-target');
    });

    item.addEventListener('dragleave', () => {
      item.classList.remove('chooser-item--drop-target');
    });

    item.addEventListener('drop', (e) => {
      e.preventDefault();
      item.classList.remove('chooser-item--drop-target');
      const name = item.dataset.spriteName;
      const spriteDef = SPRITE_LIBRARY.find(s => s.name === name);
      if (spriteDef) {
        const i = spriteStore.getAllSprites().length + 1;
        const displayName = `${spriteDef.name}${i > 1 ? i : ''}`;
        const newSprite = spriteStore.addSprite(displayName, { costumeSrc: spriteDef.svg });
        if (newSprite) {
          mergeDraggedBlocksIntoSprite(newSprite.id);
          spriteStore.selectSprite(newSprite.id);
          if (typeof window.__showToast === 'function') {
            window.__showToast(`🧩 Code copied to new "${displayName}"!`);
          }
        }
      }
      close();
    });
  });
}

function renderUploadPane() {
  const body = modalEl.querySelector('#spriteChooserBody');
  body.innerHTML = `
    <div class="chooser-upload-area">
      <div class="upload-dropzone" id="spriteDropZone">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="1.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        <p>Drag & drop an image here</p>
        <p class="upload-hint">or</p>
        <label class="upload-browse-btn">
          Browse Files
          <input type="file" accept="image/*" id="spriteFileInput" hidden />
        </label>
      </div>
    </div>
  `;

  const fileInput = body.querySelector('#spriteFileInput');
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleCustomUpload(file);
  });

  const dropZone = body.querySelector('#spriteDropZone');
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleCustomUpload(file);
  });
}

function handleCustomUpload(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const dataUrl = reader.result;
    const name = file.name.replace(/\.[^.]+$/, '') || 'Custom';
    spriteStore.addSprite(name, { costumeSrc: dataUrl });
    close();
  };
  reader.readAsDataURL(file);
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[m]);
}

function onEsc(e) {
  if (e.key === 'Escape') close();
}

function close() {
  if (!modalEl) return;
  modalEl.classList.remove('open');
  document.removeEventListener('keydown', onEsc);

  setTimeout(() => {
    if (modalEl && modalEl.parentNode) {
      modalEl.parentNode.removeChild(modalEl);
    }
    modalEl = null;
  }, 200);
}

export { close as closeSpriteChooser };
