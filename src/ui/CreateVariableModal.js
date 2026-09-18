// Modal for creating a new variable with the option to show/hide it on stage
import spriteStore from '../engine/SpriteStore';
import eventBus, { Events } from '../engine/EventBus';

let _activeModal = null;

export function openCreateVariableModal(workspace, interpreter, onCreated) {
  if (_activeModal) {
    _activeModal.remove();
    _activeModal = null;
  }

  const overlay = document.createElement('div');
  overlay.id = 'createVariableModalOverlay';
  overlay.className = 'create-var-modal-overlay';
  overlay.innerHTML = `
    <div class="create-var-modal-card" role="dialog" aria-modal="true" aria-labelledby="createVarTitle">
      <div class="create-var-modal-header">
        <div class="create-var-modal-title" id="createVarTitle">
          <span class="create-var-title-dot"></span>
          <span>New Variable</span>
        </div>
        <button type="button" class="create-var-modal-close" aria-label="Close modal">&times;</button>
      </div>

      <div class="create-var-modal-body">
        <label for="createVarNameInput" class="create-var-label">New variable name:</label>
        <input
          type="text"
          id="createVarNameInput"
          class="create-var-input"
          placeholder="e.g. score"
          autocomplete="off"
          spellcheck="false"
          maxlength="40"
        />
        <div id="createVarError" class="create-var-error" style="display: none;"></div>

        <div class="create-var-scope-group">
          <label class="create-var-radio-label">
            <input type="radio" name="varScope" value="global" checked class="create-var-radio" />
            <span>For all sprites</span>
          </label>
        </div>

        <div class="create-var-option-group">
          <label class="create-var-checkbox-label">
            <input type="checkbox" id="createVarShowOnStage" checked class="create-var-checkbox" />
            <span class="create-var-checkbox-text">Show variable on stage</span>
          </label>
        </div>
      </div>

      <div class="create-var-modal-footer">
        <button type="button" class="create-var-btn create-var-btn-cancel">Cancel</button>
        <button type="button" class="create-var-btn create-var-btn-ok">OK</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  _activeModal = overlay;

  const card = overlay.querySelector('.create-var-modal-card');
  const input = overlay.querySelector('#createVarNameInput');
  const errorEl = overlay.querySelector('#createVarError');
  const showCheckbox = overlay.querySelector('#createVarShowOnStage');
  const cancelBtn = overlay.querySelector('.create-var-btn-cancel');
  const okBtn = overlay.querySelector('.create-var-btn-ok');
  const closeBtn = overlay.querySelector('.create-var-modal-close');

  const closeModal = () => {
    document.removeEventListener('keydown', onKeyDown);
    if (overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
    if (_activeModal === overlay) {
      _activeModal = null;
    }
  };

  const showError = (msg) => {
    errorEl.textContent = msg;
    errorEl.style.display = 'block';
    input.classList.add('input-error');
    input.focus();
  };

  const clearError = () => {
    errorEl.textContent = '';
    errorEl.style.display = 'none';
    input.classList.remove('input-error');
  };

  const handleSubmit = () => {
    clearError();
    const rawName = input.value.trim();
    if (!rawName) {
      showError('Please enter a variable name.');
      return;
    }

    // Check if variable name already exists in workspace or spriteStore
    const existingWsVars = workspace ? (workspace.getAllVariables() || []) : [];
    const nameExistsInWs = existingWsVars.some(
      v => v.name.toLowerCase() === rawName.toLowerCase()
    );
    const existingProjVars = spriteStore?.getProjectVariables?.() || [];
    const nameExistsInStore = existingProjVars.some(
      v => v.name.toLowerCase() === rawName.toLowerCase()
    );

    if (nameExistsInWs || nameExistsInStore) {
      showError(`A variable named "${rawName}" already exists.`);
      return;
    }

    const showOnStage = !!showCheckbox.checked;

    // 1. Create in workspace
    let newVar = null;
    if (workspace && typeof workspace.createVariable === 'function') {
      try {
        newVar = workspace.createVariable(rawName);
      } catch (err) {
        console.warn('[CreateVariableModal] Error creating variable in workspace:', err);
      }
    }

    // 2. Register in SpriteStore with visibility
    if (spriteStore) {
      if (newVar) {
        spriteStore.syncVariablesFromWorkspace(workspace);
      }
      spriteStore.setVariableVisible(rawName, showOnStage);
    }

    // 3. Initialize in interpreter
    if (interpreter) {
      interpreter.setVariable(rawName, 0);
      if (showOnStage) {
        interpreter.showVariable(rawName);
      } else {
        interpreter.hideVariable(rawName);
      }
    } else {
      eventBus.emit('variable_visibility_changed', { name: rawName, visible: showOnStage });
      eventBus.emit('variable_changed', { name: rawName, value: 0 });
    }

    // 4. Refresh workspace flyout
    try {
      if (workspace && workspace.getToolbox()) {
        workspace.refreshToolboxSelection();
      }
    } catch (_) {}

    closeModal();

    if (typeof onCreated === 'function') {
      onCreated({ name: rawName, showOnStage, variable: newVar });
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  input.addEventListener('input', clearError);
  cancelBtn.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  okBtn.addEventListener('click', handleSubmit);

  overlay.addEventListener('mousedown', (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', onKeyDown);

  // Focus input automatically
  requestAnimationFrame(() => {
    input.focus();
    input.select();
  });
}
