// modal for selecting or uploading sounds from the built-in library or local disk
import { SOUND_LIBRARY } from './soundLibrary.js';
import SoundStore from '../engine/SoundStore.js';
import SoundEngine from '../engine/SoundEngine.js';

let modalEl = null;
let currentQuery = '';
let selectedCategory = 'All';

export function openSoundChooser() {
  if (modalEl) return;

  currentQuery = '';
  selectedCategory = 'All';

  modalEl = document.createElement('div');
  modalEl.className = 'chooser-overlay';
  modalEl.innerHTML = `
    <div class="chooser-modal sound-chooser-modal">
      <div class="chooser-header">
        <h3>Choose a Sound</h3>
        <button class="chooser-close" id="closeSoundChooser" title="Close"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
      </div>

      <div class="chooser-tabs">
        <button class="chooser-tab active" data-tab="library">Library</button>
        <button class="chooser-tab" data-tab="upload">Upload Local Audio</button>
      </div>

      <div class="chooser-toolbar" id="soundToolbar">
        <div class="chooser-search-box">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="soundSearchInput" placeholder="Search sounds by name or category..." autocomplete="off" />
          <button id="soundSearchClear" class="search-clear-btn" style="display:none;" title="Clear">&times;</button>
        </div>
        <div class="chooser-category-pills" id="soundCategoryPills">
          <button class="category-pill active" data-category="All">All</button>
          <button class="category-pill" data-category="Effects">Effects</button>
          <button class="category-pill" data-category="Animals">Animals</button>
          <button class="category-pill" data-category="Music">Music</button>
          <button class="category-pill" data-category="Loops">Loops</button>
          <button class="category-pill" data-category="Voice">Voice</button>
        </div>
      </div>

      <div class="chooser-body" id="soundChooserBody">
        <!-- populated dynamically -->
      </div>
    </div>
  `;

  document.body.appendChild(modalEl);

  renderLibraryGrid();

  const searchInput = modalEl.querySelector('#soundSearchInput');
  const searchClear = modalEl.querySelector('#soundSearchClear');

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

  modalEl.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      modalEl.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedCategory = pill.dataset.category;
      renderLibraryGrid();
    });
  });

  modalEl.querySelector('#closeSoundChooser').addEventListener('click', close);
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) close();
  });
  document.addEventListener('keydown', onEsc);

  modalEl.querySelectorAll('.chooser-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      modalEl.querySelectorAll('.chooser-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const toolbar = modalEl.querySelector('#soundToolbar');
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
  const body = modalEl.querySelector('#soundChooserBody');
  if (!body) return;

  const q = currentQuery.toLowerCase();
  const allSounds = SoundStore.getSounds();

  const filtered = allSounds.filter(s => {
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
        <p>No sounds found matching "<strong>${escapeHtml(currentQuery)}</strong>"</p>
        <button class="chooser-reset-btn" id="resetSoundSearch">Clear Search</button>
      </div>
    `;

    const resetBtn = body.querySelector('#resetSoundSearch');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        const searchInput = modalEl.querySelector('#soundSearchInput');
        const searchClear = modalEl.querySelector('#soundSearchClear');
        if (searchInput) searchInput.value = '';
        if (searchClear) searchClear.style.display = 'none';
        currentQuery = '';
        renderLibraryGrid();
      });
    }
    return;
  }

  let html = '<div class="chooser-grid sound-grid">';
  filtered.forEach(sound => {
    html += `
      <div class="chooser-item sound-item" data-sound-name="${sound.name}">
        <div class="sound-item-icon">${sound.icon || '🎵'}</div>
        <div class="sound-item-info">
          <span class="sound-name">${sound.name}</span>
          <small class="sound-category-label">${sound.category || 'Sound'}</small>
        </div>
        <button class="sound-play-preview-btn" data-sound-name="${sound.name}" title="Play Preview">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </button>
      </div>
    `;
  });
  html += '</div>';

  body.innerHTML = html;

  body.querySelectorAll('.sound-play-preview-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const soundName = btn.dataset.soundName;
      SoundEngine.playSound(soundName);
    });
  });

  body.querySelectorAll('.sound-item').forEach(item => {
    item.addEventListener('click', () => {
      const name = item.dataset.soundName;
      const soundDef = allSounds.find(s => s.name === name);
      if (soundDef) {
        SoundStore.addSound(soundDef);
        SoundEngine.playSound(name);
      }
      close();
    });
  });
}

function renderUploadPane() {
  const body = modalEl.querySelector('#soundChooserBody');
  body.innerHTML = `
    <div class="chooser-upload-area">
      <div class="upload-dropzone" id="soundDropZone">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4C97FF" stroke-width="1.5">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
        <p>Drag & drop a local audio file here (.mp3, .wav, .ogg, .m4a, .webm)</p>
        <p class="upload-hint">or</p>
        <label class="upload-browse-btn">
          Browse Audio Files
          <input type="file" accept="audio/*,.mp3,.wav,.ogg,.m4a,.webm,.flac" id="soundFileInput" hidden />
        </label>
      </div>
    </div>
  `;

  const fileInput = body.querySelector('#soundFileInput');
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleCustomUpload(file);
  });

  const dropZone = body.querySelector('#soundDropZone');
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith('audio/') || /\.(mp3|wav|ogg|m4a|webm|flac)$/i.test(file.name))) {
      handleCustomUpload(file);
    }
  });
}

function handleCustomUpload(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const dataUrl = reader.result;
    const cleanName = file.name.replace(/\.[^.]+$/, '') || 'Custom Sound';

    const soundDef = {
      name: cleanName,
      category: 'Custom Uploads',
      type: 'audio',
      value: dataUrl,
      icon: '🎙️',
    };

    SoundStore.addSound(soundDef);
    SoundEngine.playSound(cleanName);
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
