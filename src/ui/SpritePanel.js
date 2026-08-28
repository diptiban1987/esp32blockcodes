// sprite properties bar, sprite list, and backdrop list ui
import spriteStore from '../engine/SpriteStore';
import { openSpriteChooser } from './SpriteChooserModal';
import { openBackdropChooser } from './BackdropChooserModal';
import { openSoundChooser } from './SoundChooserModal';
import { SPRITE_LIBRARY } from './spriteLibrary';

// ── Block Drag-to-Sprite State ─────────────────────────────────────────────
// Holds the serialized block JSON set by index.js during a Blockly block drag.
let _draggedBlockState = null;

/**
 * Called by index.js when a Blockly block drag starts or ends.
 * @param {Object|null} blockState  — Blockly block JSON (single block + children), or null to clear.
 */
export function setDraggedBlockState(blockState) {
  _draggedBlockState = blockState;

  // Toggle the body attribute that drives the CSS drag-mode UI
  if (blockState) {
    document.body.dataset.blockDragging = 'true';
  } else {
    delete document.body.dataset.blockDragging;
    // Remove any lingering drop-target highlights
    document.querySelectorAll('.sprite-thumb--drop-target').forEach(el => {
      el.classList.remove('sprite-thumb--drop-target');
    });
  }
}

/**
 * Merges a dragged block JSON into the target sprite's workspaceState.
 * Existing blocks on that sprite are kept; the new block stack is appended.
 * @param {string} targetSpriteId
 */
export function mergeDraggedBlocksIntoSprite(targetSpriteId) {
  if (!_draggedBlockState) return false;

  const targetSprite = spriteStore.getSpriteById(targetSpriteId);
  if (!targetSprite) return false;

  // Deep-clone the dragged block so offsets don't alias
  const newBlock = JSON.parse(JSON.stringify(_draggedBlockState));

  // Offset the pasted block so it's clearly positioned in the new workspace
  const PASTE_OFFSET = 30;
  newBlock.x = (typeof newBlock.x === 'number' && !isNaN(newBlock.x)) ? newBlock.x + PASTE_OFFSET : 40;
  newBlock.y = (typeof newBlock.y === 'number' && !isNaN(newBlock.y)) ? newBlock.y + PASTE_OFFSET : 40;

  // Build or extend the target sprite's workspaceState
  let wsState = targetSprite.workspaceState;
  if (!wsState || typeof wsState !== 'object') {
    wsState = { languageVersion: 0, blocks: { languageVersion: 0, blocks: [] } };
  }

  if (!wsState.blocks || typeof wsState.blocks !== 'object') {
    wsState.blocks = { languageVersion: 0, blocks: [] };
  }

  let blocksArr;
  if (Array.isArray(wsState.blocks.blocks)) {
    blocksArr = wsState.blocks.blocks;
  } else if (Array.isArray(wsState.blocks)) {
    blocksArr = wsState.blocks;
    wsState.blocks = { languageVersion: 0, blocks: blocksArr };
  } else {
    blocksArr = [];
    wsState.blocks.blocks = blocksArr;
  }

  blocksArr.push(newBlock);

  // Preserve variables if existing
  const mergedState = {
    ...wsState,
    blocks: {
      languageVersion: 0,
      blocks: blocksArr,
    },
  };

  spriteStore.saveWorkspaceState(targetSpriteId, mergedState);
  return true;
}

// ── Init ───────────────────────────────────────────────────────────────────
export function initSpritePanel() {
  const container = document.getElementById('spritePanelContainer');
  if (!container) return;

  container.innerHTML = `
    <!-- Top info bar (Sprite properties) -->
    <div class="sprite-info-bar">
      <!-- Row 1: Name, X, Y -->
      <div class="info-row">
        <label class="info-group sprite-name-group">
          <span>Sprite</span>
          <input type="text" id="propName" autocomplete="off" />
        </label>
        
        <div class="info-group xy-group">
          <label>
            <span>X</span>
            <input type="number" id="propX" />
          </label>
          <label>
            <span>Y</span>
            <input type="number" id="propY" />
          </label>
        </div>
      </div>

      <!-- Row 2: Show/Hide, Size, Direction -->
      <div class="info-row align-center">
        <div class="info-group show-group">
          <span>Show</span>
          <div class="toggle-btns">
            <button id="propShow" class="icon-btn" title="Show">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
            <button id="propHide" class="icon-btn" title="Hide">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"></path></svg>
            </button>
          </div>
        </div>

        <label class="info-group size-group">
          <span>Size</span>
          <input type="number" id="propSize" min="1" max="1000" />
        </label>

        <label class="info-group direction-group">
          <span>Direction</span>
          <input type="number" id="propDir" />
        </label>
      </div>
    </div>

    <!-- Main lists area (Sprites vs Stage) -->
    <div class="media-lists-area">
      <div class="sprite-list-section">
        <div id="spriteList" class="media-list"></div>
        <div class="fab-group">
          <button class="fab-btn add-sound-fab" id="addSoundBtn" title="Choose / Upload Sound" style="background:#CF63CF;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
          </button>
          <button class="fab-btn add-sprite-fab" id="addSpriteBtn" title="Choose a Sprite">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8M8 12h8"></path></svg>
          </button>
        </div>
      </div>

      <div class="stage-list-section">
        <div class="stage-header">
          <span>Stage</span>
          <br>
          <small>Backdrops</small>
        </div>
        <div class="backdrop-thumb selected" id="backdropPreview">
          <div class="backdrop-preview" id="backdropPreviewInner"></div>
        </div>
        <button class="fab-btn add-backdrop-fab" id="addBackdropBtn" title="Choose a Backdrop">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
        </button>
      </div>
    </div>

    <!-- Floating hint pill shown during block drag -->
    <div id="blockDragHint">&#x1F9E9; Drop on a sprite to copy blocks</div>
  `;

  bindEvents();
  renderPanel();

  spriteStore.on((event) => {
    renderPanel();
    if (event === 'backdrop') {
      updateBackdropPreview();
    }
  });
}

function bindEvents() {
  const propName = document.getElementById('propName');
  const propX = document.getElementById('propX');
  const propY = document.getElementById('propY');
  const propSize = document.getElementById('propSize');
  const propDir = document.getElementById('propDir');
  const propShow = document.getElementById('propShow');
  const propHide = document.getElementById('propHide');
  const addSpriteBtn = document.getElementById('addSpriteBtn');
  const addBackdropBtn = document.getElementById('addBackdropBtn');
  const addSoundBtn = document.getElementById('addSoundBtn');

  const updateProp = (fn) => {
    const s = spriteStore.getSelectedSprite();
    if (s) {
      fn(s);
      spriteStore._emit('update', s); 
    }
  };

  propName.addEventListener('change', (e) => updateProp(s => s.name = e.target.value));
  propX.addEventListener('change', (e) => updateProp(s => s.setX(Number(e.target.value))));
  propY.addEventListener('change', (e) => updateProp(s => s.setY(Number(e.target.value))));
  propSize.addEventListener('change', (e) => updateProp(s => s.setSize(Number(e.target.value))));
  propDir.addEventListener('change', (e) => updateProp(s => s.direction = Number(e.target.value)));

  propShow.addEventListener('click', () => updateProp(s => s.visible = true));
  propHide.addEventListener('click', () => updateProp(s => s.visible = false));

  if (addSpriteBtn) {
    addSpriteBtn.addEventListener('click', () => {
      openSpriteChooser();
    });

    addSpriteBtn.addEventListener('dragover', (e) => {
      if (!_draggedBlockState) return;
      e.preventDefault();
      addSpriteBtn.classList.add('add-sprite-fab--drop-target');
    });

    addSpriteBtn.addEventListener('dragleave', () => {
      addSpriteBtn.classList.remove('add-sprite-fab--drop-target');
    });

    addSpriteBtn.addEventListener('drop', (e) => {
      e.preventDefault();
      addSpriteBtn.classList.remove('add-sprite-fab--drop-target');
      if (!_draggedBlockState) return;

      const existingNames = new Set(spriteStore.getAllSprites().map(s => s.name));
      const nextDef = SPRITE_LIBRARY.find(s => !existingNames.has(s.name)) || SPRITE_LIBRARY[0];
      const count = spriteStore.getAllSprites().length + 1;
      const displayName = `${nextDef.name}${count > 1 ? count : ''}`;
      const newSprite = spriteStore.addSprite(displayName, { costumeSrc: nextDef.svg });
      if (newSprite) {
        mergeDraggedBlocksIntoSprite(newSprite.id);
        spriteStore.selectSprite(newSprite.id);
        if (typeof window.__showToast === 'function') {
          window.__showToast(`🧩 New sprite "${displayName}" created with copied code!`);
        }
      }
    });
  }

  addBackdropBtn.addEventListener('click', () => {
    openBackdropChooser();
  });

  if (addSoundBtn) {
    addSoundBtn.addEventListener('click', () => {
      openSoundChooser();
    });
  }
}

function updateBackdropPreview() {
  const preview = document.getElementById('backdropPreviewInner');
  if (!preview) return;
  const bd = spriteStore.getCurrentBackdrop();
  if (!bd) {
    preview.style.background = '#fff';
    return;
  }
  if (bd.type === 'color') {
    preview.style.background = bd.value;
  } else if (bd.type === 'gradient') {
    preview.style.background = bd.value;
  } else if (bd.type === 'svg' || bd.type === 'image') {
    preview.style.backgroundImage = `url('${bd.value}')`;
    preview.style.backgroundPosition = 'center';
    preview.style.backgroundSize = 'cover';
    preview.style.backgroundRepeat = 'no-repeat';
  }
}

function renderPanel() {
  const s = spriteStore.getSelectedSprite();
  if (s) {
    document.getElementById('propName').value = s.name;
    document.getElementById('propX').value = Math.round(s.x);
    document.getElementById('propY').value = Math.round(s.y);
    document.getElementById('propSize').value = Math.round(s.size);
    document.getElementById('propDir').value = Math.round(s.direction);
    
    document.getElementById('propShow').classList.toggle('active', s.visible);
    document.getElementById('propHide').classList.toggle('active', !s.visible);
  } else {
    ['propName','propX','propY','propSize','propDir'].forEach(id => {
      document.getElementById(id).value = '';
    });
  }

  const list = document.getElementById('spriteList');
  if (!list) return;
  list.innerHTML = '';
  
  const sprites = spriteStore.getAllSprites();

  sprites.forEach(sprite => {
    const thumb = document.createElement('div');
    thumb.className = `sprite-thumb ${sprite.id === s?.id ? 'selected' : ''}`;
    thumb.dataset.spriteId = sprite.id;

    const delBtn = sprites.length > 1 ? `<div class="delete-btn" data-id="${sprite.id}"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></div>` : '';

    const img = sprite.getCostumeImage();
    if (img && img.src) {
      thumb.innerHTML = `
        <img src="${img.src}" alt="${sprite.name}">
        <div class="sprite-thumb-info">
            <span class="sprite-thumb-name">${sprite.name}</span>
        </div>
        ${delBtn}
      `;
    } else {
      thumb.innerHTML = `
        <div style="font-size: 24px; line-height: 1; flex: 1; display:flex; align-items:center;"></div>
        <div class="sprite-thumb-info">
            <span class="sprite-thumb-name">${sprite.name}</span>
        </div>
        ${delBtn}
      `;
    }

    // ── Click to select ─────────────────────────────────────────────────────
    thumb.addEventListener('click', (e) => {
      const delTarget = e.target.closest('.delete-btn');
      if (delTarget) {
          e.stopPropagation();
          spriteStore.removeSprite(sprite.id);
          return;
      }
      spriteStore.selectSprite(sprite.id);
    });

    // ── Drag-to-copy drop target handlers ──────────────────────────────────
    thumb.addEventListener('dragover', (e) => {
      if (!_draggedBlockState) return;       // only accept block drags
      e.preventDefault();                    // allow drop
      e.dataTransfer.dropEffect = 'copy';
      thumb.classList.add('sprite-thumb--drop-target');
    });

    thumb.addEventListener('dragleave', (e) => {
      // Only remove if we have truly left this thumb (not just entered a child)
      if (!thumb.contains(e.relatedTarget)) {
        thumb.classList.remove('sprite-thumb--drop-target');
      }
    });

    thumb.addEventListener('drop', (e) => {
      e.preventDefault();
      thumb.classList.remove('sprite-thumb--drop-target');

      if (!_draggedBlockState) return;

      const copied = mergeDraggedBlocksIntoSprite(sprite.id);
      if (copied) {
        // Flash a green success ring on the target thumb
        thumb.classList.add('sprite-thumb--copy-success');
        thumb.addEventListener('animationend', () => {
          thumb.classList.remove('sprite-thumb--copy-success');
        }, { once: true });

        // Show a brief toast
        const spriteName = sprite.name;
        if (typeof window.__showToast === 'function') {
          window.__showToast(`\u{1F9E9} Blocks copied to "${spriteName}"!`);
        } else {
          _showCopyToast(`\u{1F9E9} Blocks copied to "${spriteName}"!`);
        }
      }
    });

    list.appendChild(thumb);
  });

  updateBackdropPreview();
}

/** Minimal inline toast fallback. */
function _showCopyToast(message) {
  let toast = document.getElementById('spriteCopyToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'spriteCopyToast';
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '64px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--accent, #4F8CFF)',
      color: '#fff',
      padding: '8px 20px',
      borderRadius: '999px',
      fontSize: '13px',
      fontWeight: '600',
      boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
      zIndex: '99999',
      pointerEvents: 'none',
      transition: 'opacity 0.3s',
      opacity: '0',
    });
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => { toast.style.opacity = '0'; }, 2200);
}
