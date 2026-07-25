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
}

export default new SoundStore();
