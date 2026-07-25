// modal for selecting or uploading backdrops from the built-in library
import { BACKDROP_LIBRARY } from './backdropLibrary.js';
import spriteStore from '../engine/SpriteStore.js';

let modalEl = null;
let currentQuery = '';
let selectedCategory = 'All';

export function openBackdropChooser() {
  if (modalEl) return;

  currentQuery = '';
  selectedCategory = 'All';

  modalEl = document.createElement('div');
  modalEl.className = 'chooser-overlay';
  modalEl.innerHTML = `
    <div class="chooser-modal backdrop-chooser-modal">
      <div class="chooser-header">
        <h3>Choose a Backdrop</h3>
        <button class="chooser-close" id="closeBackdropChooser" title="Close"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
      </div>

      <div class="chooser-tabs">
        <button class="chooser-tab active" data-tab="library">Library</button>
        <button class="chooser-tab" data-tab="upload">Upload</button>
      </div>

      <div class="chooser-toolbar" id="backdropToolbar">
        <div class="chooser-search-box">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="backdropSearchInput" placeholder="Search backdrops by name or category..." autocomplete="off" />
          <button id="backdropSearchClear" class="search-clear-btn" style="display:none;" title="Clear">&times;</button>
        </div>
        <div class="chooser-category-pills" id="backdropCategoryPills">
          <button class="category-pill active" data-category="All">All</button>
          <button class="category-pill" data-category="Outdoors">Outdoors</button>
          <button class="category-pill" data-category="Indoors">Indoors</button>
          <button class="category-pill" data-category="Space">Space</button>
          <button class="category-pill" data-category="Water">Water</button>
          <button class="category-pill" data-category="Sports & Games">Sports & Games</button>
          <button class="category-pill" data-category="Fantasy & Magic">Fantasy & Magic</button>
          <button class="category-pill" data-category="Music & Dance">Music & Dance</button>
          <button class="category-pill" data-category="Patterns & Tech">Patterns & Tech</button>
          <button class="category-pill" data-category="Gradients">Gradients</button>
          <button class="category-pill" data-category="Colors">Colors</button>
        </div>
      </div>

      <div class="chooser-body" id="backdropChooserBody">
        <!-- populated dynamically -->
      </div>
    </div>
  `;

  document.body.appendChild(modalEl);

  renderLibraryGrid();

  // Search input listeners
  const searchInput = modalEl.querySelector('#backdropSearchInput');
  const searchClear = modalEl.querySelector('#backdropSearchClear');

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

  modalEl.querySelector('#closeBackdropChooser').addEventListener('click', close);
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) close();
  });
  document.addEventListener('keydown', onEsc);

  modalEl.querySelectorAll('.chooser-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      modalEl.querySelectorAll('.chooser-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const toolbar = modalEl.querySelector('#backdropToolbar');
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
  const body = modalEl.querySelector('#backdropChooserBody');
  if (!body) return;

  const currentBackdrop = spriteStore.getCurrentBackdrop();
  const q = currentQuery.toLowerCase();

  const filtered = BACKDROP_LIBRARY.filter(bd => {
    const matchesCat = selectedCategory === 'All' || bd.category === selectedCategory;
    const matchesQuery = !q || bd.name.toLowerCase().includes(q) || (bd.category && bd.category.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  if (filtered.length === 0) {
    body.innerHTML = `
      <div class="chooser-empty">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <p>No backdrops found matching "<strong>${escapeHtml(currentQuery)}</strong>"</p>
        <button class="chooser-reset-btn" id="resetBackdropSearch">Clear Search</button>
      </div>
    `;

    const resetBtn = body.querySelector('#resetBackdropSearch');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        const searchInput = modalEl.querySelector('#backdropSearchInput');
        const searchClear = modalEl.querySelector('#backdropSearchClear');
        if (searchInput) searchInput.value = '';
        if (searchClear) searchClear.style.display = 'none';
        currentQuery = '';
        renderLibraryGrid();
      });
    }
    return;
  }

  let html = '';
  if (selectedCategory === 'All' && !q) {
    const categories = {};
    filtered.forEach(bd => {
      const cat = bd.category || 'Other';
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(bd);
    });

    for (const [cat, backdrops] of Object.entries(categories)) {
      html += `<div class="chooser-category"><span>${cat} (${backdrops.length})</span></div>`;
      html += '<div class="chooser-grid backdrop-grid">';
      backdrops.forEach(bd => {
        const isActive = currentBackdrop && currentBackdrop.name === bd.name;
        const previewStyle = getPreviewStyle(bd);
        html += `
          <div class="chooser-item backdrop-item ${isActive ? 'active' : ''}" data-backdrop-name="${bd.name}" title="${bd.name}">
            <div class="backdrop-preview-thumb" style="${previewStyle}"></div>
            <span>${bd.name}</span>
          </div>
        `;
      });
      html += '</div>';
    }
  } else {
    html += `<div class="chooser-category"><span>Found ${filtered.length} Backdrop${filtered.length > 1 ? 's' : ''}</span></div>`;
    html += '<div class="chooser-grid backdrop-grid">';
    filtered.forEach(bd => {
      const isActive = currentBackdrop && currentBackdrop.name === bd.name;
      const previewStyle = getPreviewStyle(bd);
      html += `
        <div class="chooser-item backdrop-item ${isActive ? 'active' : ''}" data-backdrop-name="${bd.name}" title="${bd.name}">
          <div class="backdrop-preview-thumb" style="${previewStyle}"></div>
          <span>${bd.name}</span>
        </div>
      `;
    });
    html += '</div>';
  }

  body.innerHTML = html;

  body.querySelectorAll('.backdrop-item').forEach(item => {
    item.addEventListener('click', () => {
      const name = item.dataset.backdropName;
      const bd = BACKDROP_LIBRARY.find(b => b.name === name);
      if (bd) {
        spriteStore.setBackdrop(bd);
      }
      close();
    });
  });
}

function renderUploadPane() {
  const body = modalEl.querySelector('#backdropChooserBody');
  body.innerHTML = `
    <div class="chooser-upload-area">
      <div class="upload-dropzone" id="backdropDropZone">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        <p>Drag & drop a backdrop image</p>
        <p class="upload-hint">or</p>
        <label class="upload-browse-btn">
          Browse Files
          <input type="file" accept="image/*" id="backdropFileInput" hidden />
        </label>
      </div>
    </div>
  `;

  const fileInput = body.querySelector('#backdropFileInput');
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleCustomUpload(file);
  });

  const dropZone = body.querySelector('#backdropDropZone');
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
    const bd = { name, type: 'image', value: dataUrl };
    spriteStore.addBackdropToLibrary(bd);
    spriteStore.setBackdrop(bd);
    close();
  };
  reader.readAsDataURL(file);
}

function getPreviewStyle(bd) {
  if (bd.type === 'color') return `background: ${bd.value};`;
  if (bd.type === 'gradient') return `background: ${bd.value};`;
  if (bd.type === 'svg' || bd.type === 'image') return `background-image: url('${bd.value}'); background-position: center; background-size: cover; background-repeat: no-repeat;`;
  return `background: #fff;`;
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
