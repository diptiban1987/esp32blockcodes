// Sprite Store

import { Sprite } from './SpriteEngine.js';
import { BACKDROP_LIBRARY } from '../ui/backdropLibrary.js';

class SpriteStore {
  constructor() {
    this.sprites = [];
    this.selectedSpriteId = null;
    this._listeners = [];

    this._backdrops = [];         
    this._currentBackdrop = null; 
    this.projectVariables = [];
  }

  on(listener) {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter(l => l !== listener);
    };
  }

  _emit(event, data) {
    this._listeners.forEach(l => l(event, data));
  }

  addSprite(name, options = {}) {
    const sprite = new Sprite(name, options);

    sprite.onCostumeLoad = () => this._emit('update', sprite);
    sprite._spriteStoreRef = this;

    if (this.projectVariables && this.projectVariables.length > 0) {
      sprite.workspaceState = {
        variables: this.getProjectVariables(),
        blocks: { languageVersion: 0, blocks: [] }
      };
    }

    this.sprites.push(sprite);

    if (this.sprites.length === 1) {
      this.selectedSpriteId = sprite.id;
    }

    this._emit('add', sprite);
    return sprite;
  }

  removeSprite(id) {
    const idx = this.sprites.findIndex(s => s.id === id);
    if (idx === -1) return;

    const removed = this.sprites.splice(idx, 1)[0];

    if (this.selectedSpriteId === id) {
      this.selectedSpriteId = this.sprites.length > 0 ? this.sprites[0].id : null;
      if (this.selectedSpriteId) {
        this._emit('select', this.getSelectedSprite());
      }
    }

    this._emit('remove', removed);
  }

  clearAllSprites() {
    this.sprites = [];
    this.selectedSpriteId = null;
  }

  restoreSprites(spritesData, selectedIndex = 0) {
    this.sprites = [];
    this.selectedSpriteId = null;

    if (Array.isArray(spritesData)) {
      for (const saved of spritesData) {
        const sprite = new Sprite(saved.name, {
          x: saved.x ?? 0,
          y: saved.y ?? 0,
          direction: saved.direction ?? 90,
          size: saved.size ?? 100,
          costumes: saved.costumes && saved.costumes.length > 0 ? saved.costumes : null,
          costumeSrc: saved.costumes && saved.costumes[0] ? saved.costumes[0].src : null,
        });

        sprite.visible = saved.visible ?? true;
        sprite.opacity = saved.opacity ?? 1;
        sprite.rotationStyle = saved.rotationStyle ?? 'all around';
        sprite.currentCostumeIndex = saved.currentCostumeIndex ?? 0;
        sprite.sayBubble = saved.sayBubble ?? null;
        sprite.penDown = saved.penDown ?? false;
        sprite.penColor = saved.penColor ?? '#4C97FF';
        sprite.penSize = saved.penSize ?? 1;
        sprite.penTrails = saved.penTrails ?? [];
        sprite.workspaceState = saved.workspaceState ?? null;

        sprite.onCostumeLoad = () => this._emit('update', sprite);
        sprite._spriteStoreRef = this;

        this.sprites.push(sprite);
      }
    }

    if (this.sprites.length > 0) {
      const idx = (typeof selectedIndex === 'number' && selectedIndex >= 0 && selectedIndex < this.sprites.length) ? selectedIndex : 0;
      this.selectedSpriteId = this.sprites[idx].id;
    }

    this._emit('restore', this.sprites);
    this._emit('update', null);
  }

  selectSprite(id) {
    const sprite = this.sprites.find(s => s.id === id);
    if (!sprite) return;

    this.selectedSpriteId = id;
    this._emit('select', sprite);
  }

  getSelectedSprite() {
    return this.sprites.find(s => s.id === this.selectedSpriteId) || null;
  }

  getSpriteById(id) {
    return this.sprites.find(s => s.id === id) || null;
  }

  getSpriteByName(name) {
    if (!name) return null;
    return this.sprites.find(s => s.name === name || String(s.id) === String(name)) || null;
  }

  getAllSprites() {
    return this.sprites;
  }

  saveWorkspaceState(spriteId, state) {
    const sprite = this.getSpriteById(spriteId);
    if (sprite) {
      sprite.workspaceState = state;
    }
  }

  getWorkspaceState(spriteId) {
    const sprite = this.getSpriteById(spriteId);
    return sprite ? sprite.workspaceState : null;
  }

  resetAll() {
    this.sprites.forEach(s => {
      s.sayBubble = null;
      s.penTrails = [];
    });
    this._emit('update', null);
  }

  setBackdrop(backdropDef) {
    this._currentBackdrop = backdropDef;
    this._emit('backdrop', backdropDef);
  }

  /**
   * Add a backdrop to this project's backdrop list (if not already present)
   * and make it the current backdrop. This is how a project accumulates
   * two or more backdrops that can be switched between.
   */
  addBackdrop(backdropDef) {
    if (!backdropDef) return;
    const existing = this._backdrops.find(b => b.name === backdropDef.name);
    if (existing) {
      Object.assign(existing, backdropDef); // refresh stored value (e.g. re-uploaded image)
    } else {
      this._backdrops.push(backdropDef);
    }
    this._currentBackdrop = this._backdrops.find(b => b.name === backdropDef.name);
    this._emit('backdropList', this._backdrops);
    this._emit('backdrop', this._currentBackdrop);
  }

  /**
   * Switch to a backdrop by name. Resolves from the project's backdrop list
   * first, then from the built-in library — a library backdrop is added to
   * the project list on first use (same behavior as Scratch).
   */
  switchBackdrop(name) {
    if (!name) return;
    let def = this._backdrops.find(b => b.name === name);
    if (!def) {
      const libDef = BACKDROP_LIBRARY.find(b => b.name === name);
      if (!libDef) return;
      def = { ...libDef };
    }
    this.addBackdrop(def);
  }

  /**
   * Cycle to the next backdrop in the project's backdrop list.
   */
  nextBackdrop() {
    const list = this._backdrops;
    if (!list || list.length < 2) return;
    const idx = this._currentBackdrop ? list.findIndex(b => b.name === this._currentBackdrop.name) : -1;
    const next = list[(idx + 1) % list.length];
    this._currentBackdrop = next;
    this._emit('backdrop', next);
  }

  getCurrentBackdrop() {
    return this._currentBackdrop;
  }

  addBackdropToLibrary(backdropDef) {
    this._backdrops.push(backdropDef);
  }

  getBackdrops() {
    return this._backdrops;
  }

  getBackdropNames() {
    const names = [];
    if (this._currentBackdrop) names.push(this._currentBackdrop.name);
    this._backdrops.forEach(b => {
      if (!names.includes(b.name)) names.push(b.name);
    });
    return names;
  }

  // ── Global Project Variables Management ──
  getProjectVariables() {
    if (!this.projectVariables) {
      this.projectVariables = [];
    }
    return this.projectVariables.map(v => ({
      name: v.name,
      id: v.id,
      type: v.type || ''
    }));
  }

  setProjectVariables(vars) {
    if (Array.isArray(vars)) {
      this.projectVariables = vars.map(v => ({
        name: v.name,
        id: v.id,
        type: v.type || ''
      }));
    }
  }

  syncVariablesFromWorkspace(workspace) {
    if (!workspace) return;
    const varMap = workspace.getVariableMap ? workspace.getVariableMap() : null;
    if (!varMap) return;
    const liveVars = varMap.getAllVariables ? varMap.getAllVariables() : [];
    if (!this.projectVariables) this.projectVariables = [];

    for (const lv of liveVars) {
      const id = typeof lv.getId === 'function' ? lv.getId() : lv.id;
      const existing = this.projectVariables.find(pv => pv.name === lv.name);
      if (existing) {
        if (id) existing.id = id;
        existing.type = lv.type || '';
      } else {
        this.projectVariables.push({
          name: lv.name,
          id: id,
          type: lv.type || ''
        });
      }
    }
  }

  syncVariablesToWorkspace(workspace) {
    if (!workspace || !this.projectVariables) return;
    const varMap = workspace.getVariableMap ? workspace.getVariableMap() : null;
    if (!varMap) return;
    for (const pv of this.projectVariables) {
      const existing = varMap.getVariable(pv.name);
      if (!existing) {
        try {
          varMap.createVariable(pv.name, pv.type || '', pv.id);
        } catch (_) {
          try {
            varMap.createVariable(pv.name);
          } catch (_) {}
        }
      }
    }
  }

  handleVariableEvent(e) {
    if (!this.projectVariables) this.projectVariables = [];
    if (e.type === 'var_create') {
      const existing = this.projectVariables.find(v => v.id === e.varId || v.name === e.varName);
      if (!existing) {
        this.projectVariables.push({
          name: e.varName,
          id: e.varId,
          type: e.varType || ''
        });
      } else {
        if (e.varId) existing.id = e.varId;
        if (e.varName) existing.name = e.varName;
      }
    } else if (e.type === 'var_rename') {
      const target = this.projectVariables.find(v => v.id === e.varId);
      if (target && e.newName) {
        target.name = e.newName;
      }
    } else if (e.type === 'var_delete') {
      const idx = this.projectVariables.findIndex(v => v.id === e.varId || v.name === e.varName);
      if (idx !== -1) {
        this.projectVariables.splice(idx, 1);
      }
    }
  }
}

const spriteStore = new SpriteStore();
export default spriteStore;
