// Audio Engine — PCM WAV Data URL Generator + Web Audio API player
class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.activeSources = new Set();
    this.volume = 100; // 0 to 100
    this.effects = {
      pitch: 0,
      pan: 0,
    };
    this.customSounds = new Map(); // soundName -> dataUrl
    this.wavCache = new Map(); // built-in soundName -> WAV dataUrl
  }

  _initCtx() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  registerCustomSound(name, dataUrl) {
    this.customSounds.set(name, dataUrl);
  }

  getVolume() {
    return this.volume;
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(100, Number(vol) || 0));
  }

  changeVolume(delta) {
    this.setVolume(this.volume + (Number(delta) || 0));
  }

  setSoundEffect(effect, val) {
    const num = Number(val) || 0;
    if (effect === 'PITCH' || effect === 'pitch') {
      this.effects.pitch = Math.max(-360, Math.min(360, num));
    } else if (effect === 'PAN' || effect === 'pan') {
      this.effects.pan = Math.max(-100, Math.min(100, num));
    }
  }

  changeSoundEffect(effect, delta) {
    const num = Number(delta) || 0;
    if (effect === 'PITCH' || effect === 'pitch') {
      this.setSoundEffect('pitch', this.effects.pitch + num);
    } else if (effect === 'PAN' || effect === 'pan') {
      this.setSoundEffect('pan', this.effects.pan + num);
    }
  }

  clearSoundEffects() {
    this.effects.pitch = 0;
    this.effects.pan = 0;
  }

  stopAllSounds() {
    for (const source of this.activeSources) {
      try {
        if (source.stop) source.stop();
        if (source.pause) source.pause();
      } catch (e) {}
    }
    this.activeSources.clear();
  }

  async playSound(soundName, loop = false, speed = 1) {
    this._initCtx();
    const nameStr = String(soundName || 'Meow');

    // 1. Check custom uploaded sound or Data URL/HTTP URL
    if (this.customSounds.has(nameStr) || nameStr.startsWith('data:audio') || nameStr.startsWith('http://') || nameStr.startsWith('https://') || nameStr.startsWith('blob:')) {
      const src = this.customSounds.get(nameStr) || nameStr;
      return this._playAudioUrl(src, loop, speed);
    }

    // 2. Get real PCM WAV Data URL for built-in sound
    const wavUrl = this.getBuiltInSoundWavUrl(nameStr);
    return this._playAudioUrl(wavUrl, loop, speed);
  }

  async playSoundUntilDone(soundName, speed = 1) {
    return this.playSound(soundName, false, speed);
  }

  _playAudioUrl(url, loop = false, speed = 1) {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.crossOrigin = 'anonymous';
      audio.src = url;
      audio.volume = Math.max(0, Math.min(1, this.volume / 100));
      
      const effectiveSpeed = Math.max(0.25, Math.min(4, speed * Math.pow(2, this.effects.pitch / 120)));
      audio.playbackRate = effectiveSpeed;

      audio.loop = Boolean(loop);

      this.activeSources.add(audio);

      const cleanup = () => {
        this.activeSources.delete(audio);
        audio.onended = null;
        audio.onerror = null;
        resolve();
      };

      audio.onended = cleanup;
      audio.onerror = (err) => {
        console.warn('[SoundEngine] Audio playback error:', err);
        cleanup();
      };

      audio.play().catch((err) => {
        console.warn('[SoundEngine] Audio play blocked/failed:', err);
        cleanup();
      });

      if (loop) {
        resolve();
      }
    });
  }

  /**
   * Encodes a float32 audio sample array into a standard 16-bit PCM WAV Data URL
   */
  encodeWavDataUrl(sampleRate, samples) {
    const numSamples = samples.length;
    const buffer = new ArrayBuffer(44 + numSamples * 2);
    const view = new DataView(buffer);

    /* RIFF identifier */
    view.setUint32(0, 0x52494646, false); // "RIFF"
    /* file length */
    view.setUint32(4, 36 + numSamples * 2, true);
    /* RIFF type */
    view.setUint32(8, 0x57415645, false); // "WAVE"
    /* format chunk identifier */
    view.setUint32(12, 0x666d7420, false); // "fmt "
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (1 = PCM) */
    view.setUint16(20, 1, true);
    /* channel count = 1 (Mono) */
    view.setUint16(22, 1, true);
    /* sample rate */
    view.setUint32(24, sampleRate, true);
    /* byte rate (sampleRate * 2) */
    view.setUint32(28, sampleRate * 2, true);
    /* block align = 2 */
    view.setUint16(32, 2, true);
    /* bits per sample = 16 */
    view.setUint16(34, 16, true);
    /* data chunk identifier */
    view.setUint32(36, 0x64617461, false); // "data"
    /* data chunk length */
    view.setUint32(40, numSamples * 2, true);

    /* Float32 to 16-bit PCM */
    let offset = 44;
    for (let i = 0; i < numSamples; i++) {
      const s = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      offset += 2;
    }

    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return 'data:audio/wav;base64,' + btoa(binary);
  }

  /**
   * Generates realistic PCM audio data for built-in sounds
   */
  getBuiltInSoundWavUrl(name) {
    const key = String(name || 'Meow').toLowerCase();
    if (this.wavCache.has(key)) {
      return this.wavCache.get(key);
    }

    const sampleRate = 22050; // 22.05kHz mono PCM
    let samples;

    if (key.includes('meow')) {
      // 🐱 REALISTIC CAT MEOW WAV (Vocal curve + vocal tract formants)
      const duration = 0.5;
      const numSamples = Math.floor(sampleRate * duration);
      samples = new Float32Array(numSamples);
      let phase = 0;

      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const progress = t / duration;

        // Meow pitch glissando (360Hz -> 680Hz -> 340Hz)
        let freq;
        if (progress < 0.35) {
          freq = 360 + (680 - 360) * (progress / 0.35);
        } else {
          freq = 680 - (680 - 340) * ((progress - 0.35) / 0.65);
        }

        // Vibrato
        freq += Math.sin(2 * Math.PI * 6 * t) * 12;

        phase += (2 * Math.PI * freq) / sampleRate;

        // Rich harmonics + formant envelope
        let val = Math.sin(phase) * 0.5 + Math.sin(phase * 2) * 0.25 + Math.sin(phase * 3) * 0.15 + Math.sin(phase * 4) * 0.08;

        // Envelope: smooth attack, sustain, fade out
        let env;
        if (progress < 0.1) env = progress / 0.1;
        else if (progress < 0.7) env = 1.0 - (progress - 0.1) * 0.3;
        else env = 0.82 * (1.0 - (progress - 0.7) / 0.3);

        samples[i] = val * env * 0.8;
      }

    } else if (key.includes('bark')) {
      // 🐶 REALISTIC DOG BARK WAV
      const duration = 0.22;
      const numSamples = Math.floor(sampleRate * duration);
      samples = new Float32Array(numSamples);
      let phase = 0;

      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const progress = t / duration;

        // Deep bark pitch drop (220Hz -> 85Hz)
        const freq = 220 * Math.exp(-progress * 3.5);
        phase += (2 * Math.PI * freq) / sampleRate;

        // Sawtooth-like vocal texture + acoustic bark noise
        const saw = (phase % (2 * Math.PI)) / Math.PI - 1;
        const noise = (Math.random() * 2 - 1) * 0.3;
        const val = saw * 0.6 + noise * 0.4;

        const env = Math.exp(-progress * 9);
        samples[i] = val * env * 0.9;
      }

    } else if (key.includes('chirp')) {
      // 🐦 BIRD CHIRP WAV
      const duration = 0.18;
      const numSamples = Math.floor(sampleRate * duration);
      samples = new Float32Array(numSamples);
      let phase = 0;

      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const progress = t / duration;

        // Chirp frequency modulation (2200Hz -> 3400Hz -> 2000Hz)
        let freq = 2200 + 1200 * Math.sin(progress * Math.PI);
        phase += (2 * Math.PI * freq) / sampleRate;

        const env = Math.sin(progress * Math.PI);
        samples[i] = Math.sin(phase) * env * 0.7;
      }

    } else if (key.includes('pop')) {
      // 🫧 BUBBLE POP WAV
      const duration = 0.08;
      const numSamples = Math.floor(sampleRate * duration);
      samples = new Float32Array(numSamples);
      let phase = 0;

      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const progress = t / duration;

        const freq = 750 * Math.exp(-progress * 25) + 120;
        phase += (2 * Math.PI * freq) / sampleRate;

        const env = Math.exp(-progress * 20);
        samples[i] = Math.sin(phase) * env * 0.9;
      }

    } else if (key.includes('laser')) {
      // ⚡ LASER PEW WAV
      const duration = 0.18;
      const numSamples = Math.floor(sampleRate * duration);
      samples = new Float32Array(numSamples);
      let phase = 0;

      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const progress = t / duration;

        const freq = 1400 * Math.exp(-progress * 15) + 60;
        phase += (2 * Math.PI * freq) / sampleRate;

        const saw = (phase % (2 * Math.PI)) / Math.PI - 1;
        const env = Math.exp(-progress * 10);
        samples[i] = saw * env * 0.8;
      }

    } else if (key.includes('coin')) {
      // 🪙 ARCADE COIN WAV
      const duration = 0.3;
      const numSamples = Math.floor(sampleRate * duration);
      samples = new Float32Array(numSamples);
      let phase = 0;

      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const progress = t / duration;

        const freq = progress < 0.28 ? 987.77 : 1318.51; // B5 to E6
        phase += (2 * Math.PI * freq) / sampleRate;

        const square = Math.sin(phase) >= 0 ? 0.6 : -0.6;
        const env = Math.exp(-progress * 6);
        samples[i] = square * env * 0.7;
      }

    } else if (key.includes('boing')) {
      // 🌀 CARTOON BOING WAV
      const duration = 0.38;
      const numSamples = Math.floor(sampleRate * duration);
      samples = new Float32Array(numSamples);
      let phase = 0;

      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const progress = t / duration;

        let freq = 150 + (680 - 150) * Math.pow(progress, 0.7);
        freq += Math.sin(2 * Math.PI * 18 * t) * 20;

        phase += (2 * Math.PI * freq) / sampleRate;
        const env = Math.exp(-progress * 4);
        samples[i] = Math.sin(phase) * env * 0.8;
      }

    } else if (key.includes('bell')) {
      // 🔔 CRYSTAL BELL CHIME WAV
      const duration = 0.9;
      const numSamples = Math.floor(sampleRate * duration);
      samples = new Float32Array(numSamples);

      const bellFreqs = [523.25, 1046.5, 1568.0, 2630.0];
      const bellAmps = [0.4, 0.3, 0.2, 0.1];

      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        let sum = 0;

        bellFreqs.forEach((f, idx) => {
          sum += Math.sin(2 * Math.PI * f * t) * bellAmps[idx] * Math.exp(-t * (3 + idx));
        });

        samples[i] = sum * 0.8;
      }

    } else if (key.includes('whistle')) {
      // 😙 REFEREE WHISTLE WAV
      const duration = 0.4;
      const numSamples = Math.floor(sampleRate * duration);
      samples = new Float32Array(numSamples);

      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const progress = t / duration;

        // Dual sine tone generating 50Hz whistle beat
        const t1 = Math.sin(2 * Math.PI * 2230 * t);
        const t2 = Math.sin(2 * Math.PI * 2280 * t);
        const env = Math.exp(-progress * 4) * Math.sin(Math.min(1, progress / 0.05) * Math.PI / 2);

        samples[i] = (t1 + t2) * 0.4 * env;
      }

    } else if (key.includes('piano')) {
      // 🎹 ACOUSTIC PIANO NOTE WAV (Concert A4 440Hz)
      const duration = 0.9;
      const numSamples = Math.floor(sampleRate * duration);
      samples = new Float32Array(numSamples);

      const harmonics = [
        { f: 440, a: 0.5, d: 2.5 },
        { f: 880, a: 0.25, d: 3.5 },
        { f: 1320, a: 0.12, d: 4.5 },
        { f: 1760, a: 0.06, d: 5.5 },
      ];

      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        let sum = 0;

        // Initial hammer attack transient
        const hammer = (i < 100) ? (Math.random() * 2 - 1) * (1 - i / 100) * 0.3 : 0;

        harmonics.forEach(h => {
          sum += Math.sin(2 * Math.PI * h.f * t) * h.a * Math.exp(-t * h.d);
        });

        samples[i] = (sum + hammer) * 0.8;
      }

    } else if (key.includes('drum kick') || key.includes('kick')) {
      // 🥁 BASS DRUM KICK WAV
      const duration = 0.22;
      const numSamples = Math.floor(sampleRate * duration);
      samples = new Float32Array(numSamples);

      let phase = 0;
      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const progress = t / duration;

        const freq = 150 * Math.exp(-progress * 18) + 30;
        phase += (2 * Math.PI * freq) / sampleRate;

        const click = (i < 80) ? (Math.random() * 2 - 1) * (1 - i / 80) * 0.4 : 0;
        const env = Math.exp(-progress * 12);
        samples[i] = (Math.sin(phase) * env + click) * 0.9;
      }

    } else if (key.includes('snare')) {
      // 🪘 SNARE DRUM WAV
      const duration = 0.22;
      const numSamples = Math.floor(sampleRate * duration);
      samples = new Float32Array(numSamples);

      let phase = 0;
      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const progress = t / duration;

        const toneFreq = 180 * Math.exp(-progress * 15) + 80;
        phase += (2 * Math.PI * toneFreq) / sampleRate;

        const tone = Math.sin(phase) * Math.exp(-progress * 16) * 0.4;
        const noise = (Math.random() * 2 - 1) * Math.exp(-progress * 12) * 0.6;

        samples[i] = (tone + noise) * 0.85;
      }

    } else if (key.includes('guitar')) {
      // 🎸 ACOUSTIC GUITAR CHORD WAV (E minor strum)
      const duration = 0.9;
      const numSamples = Math.floor(sampleRate * duration);
      samples = new Float32Array(numSamples);

      const chord = [164.81, 246.94, 329.63, 392.00, 493.88]; // E3, B3, E4, G4, B4

      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        let sum = 0;

        chord.forEach((freq, idx) => {
          const strumDelay = idx * 0.025; // Strum timing
          if (t >= strumDelay) {
            const dt = t - strumDelay;
            const stringTone = Math.sin(2 * Math.PI * freq * dt) * 0.2 * Math.exp(-dt * 3.0);
            sum += stringTone;
          }
        });

        samples[i] = sum * 0.8;
      }

    } else if (key.includes('victory') || key.includes('jingle')) {
      // 🏆 VICTORY FANFARE WAV
      const duration = 0.6;
      const numSamples = Math.floor(sampleRate * duration);
      samples = new Float32Array(numSamples);

      const notes = [
        { f: 523.25, start: 0.0, dur: 0.12 },  // C5
        { f: 659.25, start: 0.12, dur: 0.12 }, // E5
        { f: 783.99, start: 0.24, dur: 0.12 }, // G5
        { f: 1046.50, start: 0.36, dur: 0.24 },// C6
      ];

      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        let sum = 0;

        notes.forEach(n => {
          if (t >= n.start && t < n.start + n.dur) {
            const dt = t - n.start;
            const tone = (Math.sin(2 * Math.PI * n.f * dt) + 0.3 * Math.sin(2 * Math.PI * n.f * 2 * dt)) * 0.4;
            const env = Math.exp(-dt * 4);
            sum += tone * env;
          }
        });

        samples[i] = sum * 0.85;
      }

    } else if (key.includes('applause')) {
      // 👏 CROWD APPLAUSE WAV
      const duration = 1.0;
      const numSamples = Math.floor(sampleRate * duration);
      samples = new Float32Array(numSamples);

      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const progress = t / duration;

        const envelope = Math.sin(progress * Math.PI);
        const clap = (Math.random() > 0.94) ? (Math.random() * 2 - 1) * 1.8 : (Math.random() * 2 - 1) * 0.25;

        samples[i] = clap * envelope * 0.6;
      }

    } else {
      // Default Meow
      return this.getBuiltInSoundWavUrl('meow');
    }

    const dataUrl = this.encodeWavDataUrl(sampleRate, samples);
    this.wavCache.set(key, dataUrl);
    return dataUrl;
  }
}

export default new SoundEngine();
