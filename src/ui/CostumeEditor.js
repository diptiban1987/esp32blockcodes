// Scratch-style Costumes & Paint Tool Studio
import spriteStore from '../engine/SpriteStore.js';
import { SPRITE_LIBRARY } from './spriteLibrary.js';

let containerEl = null;
let currentSprite = null;
let currentCostumeIdx = 0;

// Paint Studio State
let currentTool = 'brush'; // 'select' | 'brush' | 'eraser' | 'fill' | 'text' | 'line' | 'circle' | 'rect' | 'eyedropper'
let fillColor = '#00897B';
let isFillTransparent = false;
let outlineColor = '#000000';
let isOutlineTransparent = false;
let strokeWidth = 4;
let brushSize = 10;
let eraserSize = 20;

// Canvas & Drawing State
let canvasEl = null;
let ctx = null;
let isDrawing = false;
let startX = 0;
let startY = 0;
let snapshotData = null;

// Undo / Redo History for active costume
const undoStack = [];
const redoStack = [];
const MAX_HISTORY = 30;

let zoomLevel = 1.0;

/**
 * Initializes or mounts the Costume & Paint Studio in the target container
 * @param {HTMLElement} el 
 */
export function initCostumeEditor(el) {
  containerEl = el;
  setupSpriteListeners();
  renderCostumeStudio();
}

/**
 * Shows the Costume Editor and refreshes it for the currently selected sprite
 */
export function showCostumeEditor() {
  if (!containerEl) return;
  containerEl.style.display = 'flex';
  currentSprite = spriteStore.getSelectedSprite();
  currentCostumeIdx = currentSprite ? currentSprite.currentCostumeIndex : 0;
  renderCostumeStudio();
}

/**
 * Hides the Costume Editor
 */
export function hideCostumeEditor() {
  if (!containerEl) return;
  containerEl.style.display = 'none';
}

function setupSpriteListeners() {
  spriteStore.on((event, data) => {
    if (event === 'select') {
      currentSprite = data;
      currentCostumeIdx = currentSprite ? currentSprite.currentCostumeIndex : 0;
      if (containerEl && containerEl.style.display !== 'none') {
        renderCostumeStudio();
      }
    } else if (event === 'update' && data && currentSprite && data.id === currentSprite.id) {
      if (containerEl && containerEl.style.display !== 'none') {
        updateCostumeList();
      }
    }
  });
}

function renderCostumeStudio() {
  if (!containerEl) return;

  currentSprite = spriteStore.getSelectedSprite();
  if (!currentSprite) {
    containerEl.innerHTML = `
      <div class="costume-empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 11-8-8-6 6a2 2 0 0 0 0 2.83l7.17 7.17"/><path d="m14 15 4 4"/><path d="m2 22 3-3"/></svg>
        <h3>No Sprite Selected</h3>
        <p>Select a sprite from the stage or sprite list to edit its costumes.</p>
      </div>
    `;
    return;
  }

  currentCostumeIdx = Math.min(currentSprite.currentCostumeIndex, Math.max(0, currentSprite.costumes.length - 1));
  const activeCostume = currentSprite.costumes[currentCostumeIdx] || { name: 'costume1', src: '' };

  containerEl.innerHTML = `
    <div class="costume-studio-container">
      <!-- ── Left Column: Costume Thumbnails List ── -->
      <div class="costume-sidebar">
        <div class="costume-sidebar-header">
          <span>Costumes</span>
          <span class="costume-count-badge">${currentSprite.costumes.length}</span>
        </div>
        <div class="costume-list" id="costumeThumbnailsList">
          <!-- Populated by updateCostumeList() -->
        </div>

        <!-- Add Costume FAB Button -->
        <div class="costume-fab-wrapper">
          <div class="costume-fab-menu" id="costumeFabMenu" style="display:none;">
            <button class="costume-fab-item" id="btnUploadCostume" title="Upload Costume">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              <span>Upload Costume</span>
            </button>
            <button class="costume-fab-item" id="btnSurpriseCostume" title="Surprise Costume">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span>Surprise</span>
            </button>
            <button class="costume-fab-item" id="btnPaintCostume" title="Paint New Costume">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 11-8-8-6 6a2 2 0 0 0 0 2.83l7.17 7.17"/><path d="m14 15 4 4"/><path d="m2 22 3-3"/></svg>
              <span>Paint</span>
            </button>
            <button class="costume-fab-item" id="btnChooseCostume" title="Choose a Costume from Library">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span>Choose a Costume</span>
            </button>
          </div>

          <button class="costume-add-fab" id="costumeAddFab" title="Add Costume">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <input type="file" id="costumeFileInput" accept="image/svg+xml,image/png,image/jpeg,image/webp" style="display:none;" />
        </div>
      </div>

      <!-- ── Right Column: Scratch Paint Editor ── -->
      <div class="paint-editor-main">
        <!-- Top Toolbar: Name, Undo/Redo, Flip, Delete, Properties -->
        <div class="paint-top-bar">
          <!-- Costume Name Input -->
          <div class="paint-control-group">
            <label class="paint-label">Costume</label>
            <input type="text" id="costumeNameInput" class="paint-text-input" value="${activeCostume.name || 'costume1'}" />
          </div>

          <div class="paint-divider"></div>

          <!-- Undo & Redo -->
          <button class="paint-btn-icon" id="paintUndoBtn" title="Undo (Ctrl+Z)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
          </button>
          <button class="paint-btn-icon" id="paintRedoBtn" title="Redo (Ctrl+Y)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/></svg>
          </button>

          <div class="paint-divider"></div>

          <!-- Flip Controls -->
          <button class="paint-btn-tool" id="paintFlipHBtn" title="Flip Horizontal">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="7 10 2 15 7 20"/><polyline points="17 10 22 15 17 20"/><line x1="2" y1="15" x2="22" y2="15"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
            <span>Flip H</span>
          </button>
          <button class="paint-btn-tool" id="paintFlipVBtn" title="Flip Vertical">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="10 7 15 2 20 7"/><polyline points="10 17 15 22 20 17"/><line x1="15" y1="2" x2="15" y2="22"/><line x1="4" y1="12" x2="20" y2="12"/></svg>
            <span>Flip V</span>
          </button>

          <div class="paint-divider"></div>

          <!-- Clear / Delete -->
          <button class="paint-btn-tool paint-btn-danger" id="paintClearBtn" title="Clear Canvas">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            <span>Clear</span>
          </button>

          <!-- Zoom Controls -->
          <div class="paint-zoom-group">
            <button class="paint-btn-icon" id="paintZoomOut" title="Zoom Out">-</button>
            <span class="paint-zoom-text" id="paintZoomLabel">100%</span>
            <button class="paint-btn-icon" id="paintZoomIn" title="Zoom In">+</button>
            <button class="paint-btn-icon" id="paintZoomReset" title="Reset Zoom">⟲</button>
          </div>
        </div>

        <!-- Property Bar: Fill, Outline, Size -->
        <div class="paint-properties-bar">
          <!-- Fill Color Picker -->
          <div class="paint-prop-item">
            <span class="paint-prop-label">Fill</span>
            <div class="paint-color-swatch" id="fillColorSwatch" style="background-color: ${isFillTransparent ? 'transparent' : fillColor};">
              ${isFillTransparent ? '<span class="transparent-slash"></span>' : ''}
            </div>
            <input type="color" id="fillColorInput" value="${fillColor}" class="paint-hidden-picker" />
            <button class="paint-btn-tiny ${isFillTransparent ? 'active' : ''}" id="toggleFillTrans" title="Toggle Transparent Fill">∅</button>
          </div>

          <!-- Outline Color Picker -->
          <div class="paint-prop-item">
            <span class="paint-prop-label">Outline</span>
            <div class="paint-color-swatch" id="outlineColorSwatch" style="background-color: ${isOutlineTransparent ? 'transparent' : outlineColor};">
              ${isOutlineTransparent ? '<span class="transparent-slash"></span>' : ''}
            </div>
            <input type="color" id="outlineColorInput" value="${outlineColor}" class="paint-hidden-picker" />
            <button class="paint-btn-tiny ${isOutlineTransparent ? 'active' : ''}" id="toggleOutlineTrans" title="Toggle Transparent Outline">∅</button>
          </div>

          <!-- Size / Thickness Slider -->
          <div class="paint-prop-item">
            <span class="paint-prop-label" id="sizePropLabel">Size</span>
            <input type="range" id="sizeSlider" min="1" max="60" value="${brushSize}" class="paint-slider" />
            <span class="paint-size-val" id="sizeValText">${brushSize}</span>
          </div>

          <!-- Quick Palette Colors -->
          <div class="paint-quick-palette">
            <span class="quick-color" style="background:#000000;" data-color="#000000"></span>
            <span class="quick-color" style="background:#FFFFFF; border:1px solid #ccc;" data-color="#FFFFFF"></span>
            <span class="quick-color" style="background:#FF4D4D;" data-color="#FF4D4D"></span>
            <span class="quick-color" style="background:#FFAB19;" data-color="#FFAB19"></span>
            <span class="quick-color" style="background:#FFDE17;" data-color="#FFDE17"></span>
            <span class="quick-color" style="background:#59C059;" data-color="#59C059"></span>
            <span class="quick-color" style="background:#4C97FF;" data-color="#4C97FF"></span>
            <span class="quick-color" style="background:#9966FF;" data-color="#9966FF"></span>
            <span class="quick-color" style="background:#CF63CF;" data-color="#CF63CF"></span>
            <span class="quick-color" style="background:#78350F;" data-color="#78350F"></span>
          </div>
        </div>

        <!-- ── Canvas Stage Area with Side Tool Palette ── -->
        <div class="paint-workspace">
          <!-- Paint Tool Palette (Left side of drawing canvas) -->
          <div class="paint-tools-palette">
            <button class="tool-btn ${currentTool === 'select' ? 'active' : ''}" data-tool="select" title="Select (V)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 3 7 18 3-7 7-3L3 3z"/></svg>
            </button>
            <button class="tool-btn ${currentTool === 'brush' ? 'active' : ''}" data-tool="brush" title="Brush (B)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 11-8-8-6 6a2 2 0 0 0 0 2.83l7.17 7.17"/><path d="m14 15 4 4"/><path d="m2 22 3-3"/></svg>
            </button>
            <button class="tool-btn ${currentTool === 'eraser' ? 'active' : ''}" data-tool="eraser" title="Eraser (E)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>
            </button>
            <button class="tool-btn ${currentTool === 'fill' ? 'active' : ''}" data-tool="fill" title="Fill Bucket (F)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z"/><path d="m5 2 5 5"/><path d="M2 13h15"/><path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4 .3 1.6 2 2.4 2 4Z"/></svg>
            </button>
            <button class="tool-btn ${currentTool === 'text' ? 'active' : ''}" data-tool="text" title="Text (T)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>
            </button>
            <button class="tool-btn ${currentTool === 'line' ? 'active' : ''}" data-tool="line" title="Line (L)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="19" x2="19" y2="5"/></svg>
            </button>
            <button class="tool-btn ${currentTool === 'circle' ? 'active' : ''}" data-tool="circle" title="Circle (C)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>
            </button>
            <button class="tool-btn ${currentTool === 'rect' ? 'active' : ''}" data-tool="rect" title="Rectangle (R)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
            </button>
            <button class="tool-btn ${currentTool === 'eyedropper' ? 'active' : ''}" data-tool="eyedropper" title="Eyedropper (I)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 22 1-1h3l9-9"/><path d="M14 4l6 6"/><path d="m18 2 4 4-2 2-4-4 2-2Z"/></svg>
            </button>
          </div>

          <!-- Drawing Canvas Wrapper with Grid Background & Crosshair -->
          <div class="paint-canvas-viewport" id="paintCanvasViewport">
            <div class="paint-canvas-wrapper" id="paintCanvasWrapper" style="transform: scale(${zoomLevel});">
              <canvas id="costumeCanvas" width="480" height="360" class="costume-paint-canvas"></canvas>
              <!-- Center Crosshair / Origin Anchor -->
              <div class="canvas-crosshair">
                <div class="crosshair-h"></div>
                <div class="crosshair-v"></div>
                <div class="crosshair-center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  initCanvasAndEvents();
  updateCostumeList();
  loadActiveCostumeOntoCanvas();
}

function updateCostumeList() {
  const listEl = containerEl?.querySelector('#costumeThumbnailsList');
  if (!listEl || !currentSprite) return;

  listEl.innerHTML = '';

  currentSprite.costumes.forEach((costume, idx) => {
    const item = document.createElement('div');
    item.className = `costume-thumb-card ${idx === currentCostumeIdx ? 'active' : ''}`;
    item.dataset.index = idx;

    item.innerHTML = `
      <div class="costume-thumb-num">${idx + 1}</div>
      <div class="costume-thumb-preview">
        <img src="${costume.src}" alt="${costume.name}" />
      </div>
      <div class="costume-thumb-info">
        <span class="costume-thumb-name">${costume.name || `costume${idx + 1}`}</span>
        <span class="costume-thumb-dim">96×96</span>
      </div>
      ${currentSprite.costumes.length > 1 ? `
        <button class="costume-thumb-del" title="Delete Costume" data-del-index="${idx}">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      ` : ''}
    `;

    item.addEventListener('click', (e) => {
      if (e.target.closest('.costume-thumb-del')) return;
      selectCostume(idx);
    });

    const delBtn = item.querySelector('.costume-thumb-del');
    delBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteCostume(idx);
    });

    listEl.appendChild(item);
  });
}

function selectCostume(idx) {
  if (!currentSprite || idx < 0 || idx >= currentSprite.costumes.length) return;
  currentCostumeIdx = idx;
  currentSprite.currentCostumeIndex = idx;
  spriteStore._emit('update', currentSprite);

  updateCostumeList();

  const nameInput = containerEl?.querySelector('#costumeNameInput');
  if (nameInput) {
    nameInput.value = currentSprite.costumes[idx].name || `costume${idx + 1}`;
  }

  loadActiveCostumeOntoCanvas();
}

function deleteCostume(idx) {
  if (!currentSprite || currentSprite.costumes.length <= 1) return;
  currentSprite.costumes.splice(idx, 1);
  if (currentCostumeIdx >= currentSprite.costumes.length) {
    currentCostumeIdx = currentSprite.costumes.length - 1;
  }
  currentSprite.currentCostumeIndex = currentCostumeIdx;
  spriteStore._emit('update', currentSprite);
  renderCostumeStudio();
}

function initCanvasAndEvents() {
  canvasEl = containerEl.querySelector('#costumeCanvas');
  if (!canvasEl) return;
  ctx = canvasEl.getContext('2d', { willReadFrequently: true });

  // Costume Name Input Change
  const nameInput = containerEl.querySelector('#costumeNameInput');
  nameInput?.addEventListener('input', (e) => {
    if (currentSprite && currentSprite.costumes[currentCostumeIdx]) {
      currentSprite.costumes[currentCostumeIdx].name = e.target.value.trim() || `costume${currentCostumeIdx + 1}`;
      updateCostumeList();
      spriteStore._emit('update', currentSprite);
    }
  });

  // Undo / Redo
  containerEl.querySelector('#paintUndoBtn')?.addEventListener('click', () => undo());
  containerEl.querySelector('#paintRedoBtn')?.addEventListener('click', () => redo());

  // Flip Buttons
  containerEl.querySelector('#paintFlipHBtn')?.addEventListener('click', () => flipCanvas(true, false));
  containerEl.querySelector('#paintFlipVBtn')?.addEventListener('click', () => flipCanvas(false, true));

  // Clear Canvas
  containerEl.querySelector('#paintClearBtn')?.addEventListener('click', () => {
    saveUndoState();
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    commitCanvasToSprite();
  });

  // Zoom Controls
  containerEl.querySelector('#paintZoomIn')?.addEventListener('click', () => setZoom(zoomLevel + 0.2));
  containerEl.querySelector('#paintZoomOut')?.addEventListener('click', () => setZoom(zoomLevel - 0.2));
  containerEl.querySelector('#paintZoomReset')?.addEventListener('click', () => setZoom(1.0));

  // Color Pickers
  const fillInput = containerEl.querySelector('#fillColorInput');
  const outlineInput = containerEl.querySelector('#outlineColorInput');
  const fillSwatch = containerEl.querySelector('#fillColorSwatch');
  const outlineSwatch = containerEl.querySelector('#outlineColorSwatch');

  fillSwatch?.addEventListener('click', () => fillInput?.click());
  outlineSwatch?.addEventListener('click', () => outlineInput?.click());

  fillInput?.addEventListener('input', (e) => {
    fillColor = e.target.value;
    isFillTransparent = false;
    updateSwatches();
  });

  outlineInput?.addEventListener('input', (e) => {
    outlineColor = e.target.value;
    isOutlineTransparent = false;
    updateSwatches();
  });

  containerEl.querySelector('#toggleFillTrans')?.addEventListener('click', () => {
    isFillTransparent = !isFillTransparent;
    updateSwatches();
  });

  containerEl.querySelector('#toggleOutlineTrans')?.addEventListener('click', () => {
    isOutlineTransparent = !isOutlineTransparent;
    updateSwatches();
  });

  // Quick Palette
  containerEl.querySelectorAll('.quick-color').forEach(qc => {
    qc.addEventListener('click', () => {
      const col = qc.dataset.color;
      if (currentTool === 'fill' || currentTool === 'circle' || currentTool === 'rect' || currentTool === 'text') {
        fillColor = col;
        isFillTransparent = false;
      } else {
        outlineColor = col;
        isOutlineTransparent = false;
      }
      updateSwatches();
    });
  });

  // Size Slider
  const sizeSlider = containerEl.querySelector('#sizeSlider');
  const sizeValText = containerEl.querySelector('#sizeValText');
  sizeSlider?.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    brushSize = val;
    eraserSize = val * 2;
    strokeWidth = val;
    if (sizeValText) sizeValText.textContent = val;
  });

  // Tools Selection
  containerEl.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      containerEl.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTool = btn.dataset.tool;
      updateToolCursor();
    });
  });

  // FAB Menu Add Costume
  const fabBtn = containerEl.querySelector('#costumeAddFab');
  const fabMenu = containerEl.querySelector('#costumeFabMenu');
  fabBtn?.addEventListener('click', () => {
    const isOpen = fabMenu.style.display === 'flex';
    fabMenu.style.display = isOpen ? 'none' : 'flex';
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.costume-fab-wrapper') && fabMenu) {
      fabMenu.style.display = 'none';
    }
  });

  // FAB Actions
  containerEl.querySelector('#btnPaintCostume')?.addEventListener('click', () => {
    fabMenu.style.display = 'none';
    addNewBlankCostume();
  });

  containerEl.querySelector('#btnSurpriseCostume')?.addEventListener('click', () => {
    fabMenu.style.display = 'none';
    addSurpriseCostume();
  });

  containerEl.querySelector('#btnChooseCostume')?.addEventListener('click', () => {
    fabMenu.style.display = 'none';
    openCostumeChooser();
  });

  const fileInput = containerEl.querySelector('#costumeFileInput');
  containerEl.querySelector('#btnUploadCostume')?.addEventListener('click', () => {
    fabMenu.style.display = 'none';
    fileInput?.click();
  });

  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target.result;
      const name = file.name.replace(/\.[^/.]+$/, '').toLowerCase();
      addNewCostume(name, src);
    };
    reader.readAsDataURL(file);
    fileInput.value = '';
  });

  // Canvas Mouse & Touch Events
  canvasEl.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  canvasEl.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvasEl.dispatchEvent(mouseEvent);
  }, { passive: false });

  window.addEventListener('touchmove', (e) => {
    if (!isDrawing) return;
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    window.dispatchEvent(mouseEvent);
  }, { passive: false });

  window.addEventListener('touchend', () => {
    if (!isDrawing) return;
    const mouseEvent = new MouseEvent('mouseup', {});
    window.dispatchEvent(mouseEvent);
  });
}

function updateSwatches() {
  const fillSwatch = containerEl?.querySelector('#fillColorSwatch');
  const outlineSwatch = containerEl?.querySelector('#outlineColorSwatch');
  const toggleFill = containerEl?.querySelector('#toggleFillTrans');
  const toggleOutline = containerEl?.querySelector('#toggleOutlineTrans');

  if (fillSwatch) {
    fillSwatch.style.backgroundColor = isFillTransparent ? 'transparent' : fillColor;
    fillSwatch.innerHTML = isFillTransparent ? '<span class="transparent-slash"></span>' : '';
  }
  if (outlineSwatch) {
    outlineSwatch.style.backgroundColor = isOutlineTransparent ? 'transparent' : outlineColor;
    outlineSwatch.innerHTML = isOutlineTransparent ? '<span class="transparent-slash"></span>' : '';
  }

  toggleFill?.classList.toggle('active', isFillTransparent);
  toggleOutline?.classList.toggle('active', isOutlineTransparent);
}

function setZoom(level) {
  zoomLevel = Math.max(0.4, Math.min(3.0, level));
  const wrapper = containerEl?.querySelector('#paintCanvasWrapper');
  const label = containerEl?.querySelector('#paintZoomLabel');
  if (wrapper) wrapper.style.transform = `scale(${zoomLevel})`;
  if (label) label.textContent = `${Math.round(zoomLevel * 100)}%`;
}

function updateToolCursor() {
  if (!canvasEl) return;
  canvasEl.className = 'costume-paint-canvas tool-' + currentTool;
}

function loadActiveCostumeOntoCanvas() {
  if (!canvasEl || !ctx || !currentSprite) return;
  const costume = currentSprite.costumes[currentCostumeIdx];
  if (!costume || !costume.src) {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    return;
  }

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = costume.src;
  img.onload = () => {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    // Draw centered on canvas
    const cx = canvasEl.width / 2;
    const cy = canvasEl.height / 2;
    const w = img.naturalWidth || 96;
    const h = img.naturalHeight || 96;
    // Scale standard 96x96 sprites nicely in editor center
    const drawW = w === 96 ? 192 : w;
    const drawH = h === 96 ? 192 : h;
    ctx.drawImage(img, cx - drawW / 2, cy - drawH / 2, drawW, drawH);
    undoStack.length = 0;
    redoStack.length = 0;
    saveUndoState();
  };
}

function getCanvasCoords(e) {
  const rect = canvasEl.getBoundingClientRect();
  const scaleX = canvasEl.width / rect.width;
  const scaleY = canvasEl.height / rect.height;
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY
  };
}

function saveUndoState() {
  if (!ctx || !canvasEl) return;
  const imgData = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
  undoStack.push(imgData);
  if (undoStack.length > MAX_HISTORY) undoStack.shift();
  redoStack.length = 0;
}

function undo() {
  if (undoStack.length <= 1 || !ctx) return;
  const current = undoStack.pop();
  redoStack.push(current);
  const prev = undoStack[undoStack.length - 1];
  ctx.putImageData(prev, 0, 0);
  commitCanvasToSprite();
}

function redo() {
  if (redoStack.length === 0 || !ctx) return;
  const next = redoStack.pop();
  undoStack.push(next);
  ctx.putImageData(next, 0, 0);
  commitCanvasToSprite();
}

function flipCanvas(horizontal = true, vertical = false) {
  if (!canvasEl || !ctx) return;
  saveUndoState();
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvasEl.width;
  tempCanvas.height = canvasEl.height;
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(canvasEl, 0, 0);

  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  ctx.save();
  ctx.translate(horizontal ? canvasEl.width : 0, vertical ? canvasEl.height : 0);
  ctx.scale(horizontal ? -1 : 1, vertical ? -1 : 1);
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.restore();

  commitCanvasToSprite();
}

function onPointerDown(e) {
  if (!canvasEl || !ctx) return;
  const pos = getCanvasCoords(e);
  startX = pos.x;
  startY = pos.y;
  isDrawing = true;

  saveUndoState();
  snapshotData = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);

  if (currentTool === 'eyedropper') {
    sampleColor(pos.x, pos.y);
    isDrawing = false;
    return;
  }

  if (currentTool === 'fill') {
    floodFill(Math.round(pos.x), Math.round(pos.y), fillColor);
    isDrawing = false;
    commitCanvasToSprite();
    return;
  }

  if (currentTool === 'text') {
    const text = prompt('Enter text to add:');
    if (text) {
      ctx.font = `bold ${Math.max(16, brushSize * 2)}px Inter, sans-serif`;
      ctx.fillStyle = isFillTransparent ? outlineColor : fillColor;
      ctx.fillText(text, pos.x, pos.y);
      commitCanvasToSprite();
    }
    isDrawing = false;
    return;
  }

  if (currentTool === 'brush' || currentTool === 'eraser') {
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (currentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = eraserSize;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = isOutlineTransparent ? fillColor : outlineColor;
      ctx.lineWidth = brushSize;
    }
  }
}

function onPointerMove(e) {
  if (!isDrawing || !ctx || !canvasEl) return;
  const pos = getCanvasCoords(e);

  if (currentTool === 'brush' || currentTool === 'eraser') {
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  } else if (currentTool === 'line' || currentTool === 'rect' || currentTool === 'circle') {
    // Restore previous snapshot for rubberbanding preview
    if (snapshotData) ctx.putImageData(snapshotData, 0, 0);

    ctx.globalCompositeOperation = 'source-over';
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = outlineColor;
    ctx.fillStyle = fillColor;

    if (currentTool === 'line') {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else if (currentTool === 'rect') {
      const x = Math.min(startX, pos.x);
      const y = Math.min(startY, pos.y);
      const w = Math.abs(pos.x - startX);
      const h = Math.abs(pos.y - startY);
      if (!isFillTransparent) ctx.fillRect(x, y, w, h);
      if (!isOutlineTransparent) ctx.strokeRect(x, y, w, h);
    } else if (currentTool === 'circle') {
      const rx = Math.abs(pos.x - startX) / 2;
      const ry = Math.abs(pos.y - startY) / 2;
      const cx = Math.min(startX, pos.x) + rx;
      const cy = Math.min(startY, pos.y) + ry;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      if (!isFillTransparent) ctx.fill();
      if (!isOutlineTransparent) ctx.stroke();
    }
  }
}

function onPointerUp() {
  if (!isDrawing) return;
  isDrawing = false;
  ctx.globalCompositeOperation = 'source-over';
  commitCanvasToSprite();
}

function sampleColor(x, y) {
  const pixel = ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data;
  const hex = '#' + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1);
  fillColor = hex;
  outlineColor = hex;
  isFillTransparent = false;
  isOutlineTransparent = false;
  updateSwatches();
  currentTool = 'brush';
  updateToolCursor();
  containerEl?.querySelectorAll('.tool-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tool === 'brush');
  });
}

function floodFill(startX, startY, fillHex) {
  if (isFillTransparent) return;
  const imgData = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
  const data = imgData.data;
  const width = canvasEl.width;
  const height = canvasEl.height;

  const targetColor = getPixelColor(data, startX, startY, width);
  const fillRgb = hexToRgb(fillHex);

  if (colorsMatch(targetColor, fillRgb)) return;

  const stack = [[startX, startY]];
  const visited = new Uint8Array(width * height);

  while (stack.length > 0) {
    const [x, y] = stack.pop();
    const idx = y * width + x;

    if (x < 0 || x >= width || y < 0 || y >= height || visited[idx]) continue;
    visited[idx] = 1;

    const curColor = getPixelColor(data, x, y, width);
    if (!colorsMatch(curColor, targetColor)) continue;

    setPixelColor(data, x, y, width, fillRgb);

    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }

  ctx.putImageData(imgData, 0, 0);
}

function getPixelColor(data, x, y, width) {
  const i = (y * width + x) * 4;
  return [data[i], data[i + 1], data[i + 2], data[i + 3]];
}

function setPixelColor(data, x, y, width, rgb) {
  const i = (y * width + x) * 4;
  data[i] = rgb.r;
  data[i + 1] = rgb.g;
  data[i + 2] = rgb.b;
  data[i + 3] = 255;
}

function colorsMatch(c1, c2) {
  if (Array.isArray(c2)) {
    return Math.abs(c1[0] - c2[0]) < 10 && Math.abs(c1[1] - c2[1]) < 10 && Math.abs(c1[2] - c2[2]) < 10 && Math.abs(c1[3] - c2[3]) < 10;
  }
  return Math.abs(c1[0] - c2.r) < 10 && Math.abs(c1[1] - c2.g) < 10 && Math.abs(c1[2] - c2.b) < 10;
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

function commitCanvasToSprite() {
  if (!canvasEl || !currentSprite || !currentSprite.costumes[currentCostumeIdx]) return;
  const dataUrl = canvasEl.toDataURL('image/png');
  const costume = currentSprite.costumes[currentCostumeIdx];
  costume.src = dataUrl;

  const img = new Image();
  img.src = dataUrl;
  img.onload = () => {
    currentSprite._costumeImages.set(costume.name, img);
    updateCostumeList();
    spriteStore._emit('update', currentSprite);
  };
}

function addNewBlankCostume() {
  if (!currentSprite) return;
  const count = currentSprite.costumes.length + 1;
  const name = `costume${count}`;

  // Blank 96x96 transparent SVG
  const blankSvg = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"></svg>
  `)}`;

  addNewCostume(name, blankSvg);
}

function addSurpriseCostume() {
  if (!currentSprite || SPRITE_LIBRARY.length === 0) return;
  const randomDef = SPRITE_LIBRARY[Math.floor(Math.random() * SPRITE_LIBRARY.length)];
  const name = `${randomDef.name.toLowerCase()}`;
  addNewCostume(name, randomDef.svg);
}

function addNewCostume(name, src) {
  if (!currentSprite) return;
  currentSprite.addCostume(name, src);
  currentCostumeIdx = currentSprite.costumes.length - 1;
  currentSprite.currentCostumeIndex = currentCostumeIdx;
  spriteStore._emit('update', currentSprite);
  renderCostumeStudio();
}

function openCostumeChooser() {
  // Use Sprite library to choose a costume for current sprite
  import('./SpriteChooserModal.js').then(({ openSpriteChooser }) => {
    // Custom modal callback or sprite chooser
    openSpriteChooser((spriteDef) => {
      if (spriteDef && spriteDef.svg) {
        addNewCostume(spriteDef.name.toLowerCase(), spriteDef.svg);
      }
    });
  });
}
