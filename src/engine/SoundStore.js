// Sound Store — manages available sounds and custom audio uploads for the workspace
import { SOUND_LIBRARY } from '../ui/soundLibrary.js';
import SoundEngine from './SoundEngine.js';

class SoundStore {
  constructor() {
    this.listeners = [];
    this.sounds = [...SOUND_LIBRARY];
  }

  on(fn) {
    this.listeners.push(fn);
  }

  _emit(event, data) {
    this.listeners.forEach(fn => fn(event, data));
  }

  getSounds() {
    return this.sounds;
  }

  getSoundOptions() {
    if (!this.sounds || this.sounds.length === 0) {
      return [['Meow', 'Meow'], ['Grunt', 'Grunt'], ['Pop', 'Pop']];
    }
    return this.sounds.map(s => [s.name, s.name]);
  }

  addSound(soundDef) {
    const exists = this.sounds.find(s => s.name.toLowerCase() === soundDef.name.toLowerCase());
    if (!exists) {
      this.sounds.push(soundDef);
    } else {
      Object.assign(exists, soundDef);
    }

    if (soundDef.value) {
      SoundEngine.registerCustomSound(soundDef.name, soundDef.value);
    }

    this._emit('update', soundDef);
  }

  removeSound(name) {
    const before = this.sounds.length;
    this.sounds = this.sounds.filter(s => s.name !== name);
    if (this.sounds.length !== before) {
      SoundEngine.unregisterCustomSound(name);
      this._emit('update', { name, removed: true });
    }
  }

  renameSound(oldName, newName) {
    const def = this.sounds.find(s => s.name === oldName);
    const clean = String(newName || '').trim();
    if (!def || !clean || clean === oldName) return;
    if (this.sounds.some(s => s.name.toLowerCase() === clean.toLowerCase() && s.name !== oldName)) {
      this._emit('update', def); // name already taken — keep as-is
      return;
    }
    def.name = clean;
    if (def.value) {
      SoundEngine.unregisterCustomSound(oldName);
      SoundEngine.registerCustomSound(clean, def.value);
    }
    this._emit('update', def);
  }
}

export default new SoundStore();
