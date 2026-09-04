// Sprite Store

import { Sprite } from './SpriteEngine.js';

class SpriteStore {
  constructor() {
    this.sprites = [];
    this.selectedSpriteId = null;
    this._listeners = [];

    this._backdrops = [];         
    this._currentBackdrop = null; 
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
}

const spriteStore = new SpriteStore();
export default spriteStore;
