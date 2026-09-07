// ══════════════════════════════════════════════════════════
// SOUND STUDIO — interactive editor for the Sounds tab.
// Waveform visualization with seek + drag-selection, playback,
// destructive effects (volume / fade in / fade out / reverse /
// normalize / trim) with undo, microphone recording with a live
// level meter, renaming and deletion.
// ══════════════════════════════════════════════════════════
import SoundStore from '../engine/SoundStore.js';
import SoundEngine from '../engine/SoundEngine.js';
import { openSoundChooser } from './SoundChooserModal.js';

let containerEl = null;
let selectedName = null;
let currentDef = null;             // sound currently open in the editor
let audioBufferCache = new Map();  // name -> { samples, sampleRate, duration, value }
let undoStacks = new Map();        // name -> [{ samples, sampleRate }]
let selection = null;              // { start, end } seconds (trim range)
let playing = null;                // { audio, raf, def, sel }
let recording = null;              // active recording session state
let audioCtx = null;

const MAX_UNDO = 12;

function toast(msg) {
  if (typeof window.__showToast === 'function') window.__showToast(msg);
  else console.log('[SoundEditor]', msg);
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[m]);
}

function fmtTime(sec) {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = sec - m * 60;
  return `${m}:${s < 10 ? '0' : ''}${s.toFixed(1)}`;
}

function getCtx() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AC();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

async function fetchArrayBuffer(dataUrl) {
  const res = await fetch(dataUrl);
  return await res.arrayBuffer();
}

// Resolve the playable data URL for a sound (custom value or synthesized library WAV)
function getSoundDataUrl(def) {
  if (def && def.value) return def.value;
  try {
    return SoundEngine.getBuiltInSoundWavUrl(def ? def.name : 'Meow');
  } catch (e) {
    return null;
  }
}

// Decode a sound into a mono Float32Array + sampleRate (cached per name+value)
async function ensureDecoded(def) {
  if (!def) return null;
  const cached = audioBufferCache.get(def.name);
  if (cached && cached.value === (def.value || null)) return cached;
  const url = getSoundDataUrl(def);
  if (!url) return null;
  try {
    const arr = await fetchArrayBuffer(url);
    const buf = await getCtx().decodeAudioData(arr);
    let samples;
    if (buf.numberOfChannels === 1) {
      samples = new Float32Array(buf.getChannelData(0));
    } else {
      const len = buf.length;
      samples = new Float32Array(len);
      for (let c = 0; c < buf.numberOfChannels; c++) {
        const ch = buf.getChannelData(c);
        for (let i = 0; i < len; i++) samples[i] += ch[i] / buf.numberOfChannels;
      }
    }
    const info = { samples, sampleRate: buf.sampleRate, duration: buf.duration, value: def.value || null };
    audioBufferCache.set(def.name, info);
    return info;
  } catch (err) {
    console.error('[SoundEditor] decode failed for', def && def.name, err);
    return null;
  }
}

// Encode mono samples back into a WAV data URL via the shared engine encoder
function encodeWav(samples, sampleRate) {
  try {
    return SoundEngine.encodeWavDataUrl(sampleRate, samples);
  } catch (e) {
    console.error('[SoundEditor] WAV encode failed', e);
    return null;
  }
}

/* ── init / show / hide (mirrors the Costume Editor API) ── */

export function initSoundEditor(el) {
  containerEl = el;
  SoundStore.on(() => {
    // keep the selection valid if the sound list changed
    if (selectedName && !SoundStore.getSounds().find(s => s.name === selectedName)) {
      selectedName = null;
      currentDef = null;
    } else if (selectedName) {
      currentDef = SoundStore.getSounds().find(s => s.name === selectedName) || null;
    }
    render();
  });
  render();
}

export function showSoundEditor() {
  if (!containerEl) return;
  containerEl.style.display = 'flex';
  render();
}

export function hideSoundEditor() {
  if (!containerEl) return;
  containerEl.style.display = 'none';
  stopPlayback();
  cancelRecording(true);
}

/* ── studio rendering ──────────────────────────────────── */

function render() {
  if (!containerEl) return;
  stopPlayback();
  if (!currentDef) {
    const sounds = SoundStore.getSounds();
    currentDef = (selectedName && sounds.find(s => s.name === selectedName)) || sounds[0] || null;
    if (currentDef) selectedName = currentDef.name;
  } else {
    currentDef = SoundStore.getSounds().find(s => s.name === currentDef.name) || currentDef;
  }
  containerEl.innerHTML = `
    <div class="sound-studio-container">
      <aside class="sound-library-pane">
        <div class="sound-pane-header">
          <span class="sound-pane-title">Sound Studio</span>
          <span class="sound-pane-sub">${SoundStore.getSounds().length} sound${SoundStore.getSounds().length === 1 ? '' : 's'} in project</span>
        </div>
        <div class="sound-list" id="soundList"></div>
        <div class="sound-add-bar">
          <button class="sound-add-btn" id="addSoundChooseBtn" title="Choose from library">🎵<span>Choose</span></button>
          <button class="sound-add-btn" id="addSoundUploadBtn" title="Upload an audio file">📁<span>Upload</span></button>
          <button class="sound-add-btn sound-add-record" id="addSoundRecordBtn" title="Record with your microphone">🎙️<span>Record</span></button>
          <input type="file" id="soundEditorFileInput" accept="audio/*,.mp3,.wav,.ogg,.m4a,.webm,.flac" hidden />
        </div>
      </aside>
      <section class="sound-editor-pane" id="soundEditorPane"></section>
    </div>
    <div class="record-overlay" id="recordOverlay" style="display:none;"></div>
  `;
  renderSoundList();
  renderEditorPane();
  bindStudioEvents();
}

function selectSound(name) {
  const def = SoundStore.getSounds().find(s => s.name === name);
  if (!def) return;
  selectedName = name;
  currentDef = def;
  selection = null;
  render();
}

function renderSoundList() {
  const listEl = containerEl.querySelector('#soundList');
  const sounds = SoundStore.getSounds();
  listEl.innerHTML = '';
  if (sounds.length === 0) {
    listEl.innerHTML = '<div class="sound-list-empty">No sounds yet.<br>Add one below! 👇</div>';
    return;
  }
  sounds.forEach(def => {
    const item = document.createElement('div');
    item.className = 'sound-list-item' + (currentDef && currentDef.name === def.name ? ' selected' : '');
    item.title = def.name;
    item.innerHTML = `
      <button class="sound-item-play" title="Preview">▶</button>
      <span class="sound-item-icon">${def.icon || '🔊'}</span>
      <span class="sound-item-name">${escapeHtml(def.name)}</span>
      <span class="sound-item-dur">···</span>
    `;
    item.addEventListener('click', () => selectSound(def.name));
    item.querySelector('.sound-item-play').addEventListener('click', (e) => {
      e.stopPropagation();
      SoundEngine.playSound(def.name);
    });
    listEl.appendChild(item);
    const durEl = item.querySelector('.sound-item-dur');
    ensureDecoded(def).then(info => {
      durEl.textContent = info ? fmtTime(info.duration) : '—';
    });
  });
}

function bindStudioEvents() {
  containerEl.querySelector('#addSoundChooseBtn').addEventListener('click', () => openSoundChooser());
  containerEl.querySelector('#addSoundRecordBtn').addEventListener('click', openRecorder);
  const fileInput = containerEl.querySelector('#soundEditorFileInput');
  containerEl.querySelector('#addSoundUploadBtn').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) importSoundFile(file);
    fileInput.value = '';
  });
}

function importSoundFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const cleanName = file.name.replace(/\.[^.]+$/, '') || 'Custom Sound';
    SoundStore.addSound({ name: cleanName, category: 'Custom Uploads', type: 'audio', value: reader.result, icon: '📁' });
    selectedName = cleanName;
    currentDef = null;
    selection = null;
    toast(`🎵 Added "${cleanName}"`);
    render();
  };
  reader.readAsDataURL(file);
}

/* ── editor pane (waveform + tools for the selected sound) ── */

function renderEditorPane() {
  const pane = containerEl.querySelector('#soundEditorPane');
  if (!currentDef) {
    pane.innerHTML = `
      <div class="sound-editor-empty">
        <div class="sound-editor-empty-icon">🎙️</div>
        <h3>Sound Studio</h3>
        <p>Add sounds to your project — choose from the library,<br>upload an audio file, or record your own voice.</p>
        <div class="sound-editor-empty-actions">
          <button class="sound-cta-btn" id="emptyRecordBtn">🎙️ Record a Sound</button>
          <button class="sound-cta-btn sound-cta-secondary" id="emptyChooseBtn">🎵 Choose from Library</button>
        </div>
      </div>`;
    pane.querySelector('#emptyRecordBtn').addEventListener('click', openRecorder);
    pane.querySelector('#emptyChooseBtn').addEventListener('click', () => openSoundChooser());
    return;
  }

  pane.innerHTML = `
    <div class="sound-editor-head">
      <input class="sound-name-input" id="soundNameInput" value="${escapeHtml(currentDef.name)}" title="Rename sound" spellcheck="false" />
      <span class="sound-meta" id="soundMeta">decoding…</span>
    </div>
    <div class="waveform-wrap" id="waveformWrap">
      <canvas class="waveform-canvas" id="waveformCanvas"></canvas>
      <div class="waveform-hint">Click to seek · drag to select a range, then Trim</div>
    </div>
    <div class="sound-transport">
      <button class="sound-play-btn" id="soundPlayBtn" title="Play">▶</button>
      <button class="sound-stop-btn" id="soundStopBtn" title="Stop">■</button>
      <label class="sound-check${selection ? '' : ' disabled'}">
        <input type="checkbox" id="soundPlaySelChk" ${selection ? '' : 'disabled'} />
        <span>Play selection only</span>
      </label>
      <span class="sound-transport-spacer"></span>
      <button class="sound-tool-btn" id="soundUndoBtn" title="Undo the last edit">↩ Undo</button>
    </div>
    <div class="sound-tools">
      <div class="sound-tool">
        <label>Volume <b id="volVal">100%</b></label>
        <input type="range" id="soundVolRange" min="25" max="200" value="100" />
        <button class="sound-apply-btn" id="applyVolBtn">Apply</button>
      </div>
      <span class="sound-tools-sep"></span>
      <button class="sound-tool-btn" id="fadeInBtn" title="Fade in over the first half second">Fade In</button>
      <button class="sound-tool-btn" id="fadeOutBtn" title="Fade out over the last half second">Fade Out</button>
      <button class="sound-tool-btn" id="reverseBtn" title="Play the sound backwards">⇄ Reverse</button>
      <button class="sound-tool-btn" id="normalizeBtn" title="Boost to maximum volume without clipping">Normalize</button>
      <button class="sound-tool-btn sound-tool-danger" id="trimBtn" title="Keep only the selected range" ${selection ? '' : 'disabled'}>✂ Trim</button>
      <span class="sound-tools-sep"></span>
      <button class="sound-tool-btn sound-tool-danger" id="deleteSoundBtn" title="Delete this sound from the project">🗑 Delete</button>
    </div>
  `;
  bindEditorEvents();
  drawWaveformForCurrent();
}

function bindEditorEvents() {
  const nameInput = containerEl.querySelector('#soundNameInput');
  nameInput.addEventListener('change', () => {
    const newName = nameInput.value.trim();
    if (newName && newName !== currentDef.name) {
      SoundStore.renameSound(currentDef.name, newName);
      selectedName = newName;
      currentDef = SoundStore.getSounds().find(s => s.name === newName) || currentDef;
    } else {
      nameInput.value = currentDef.name;
    }
  });

  containerEl.querySelector('#soundPlayBtn').addEventListener('click', togglePlay);
  containerEl.querySelector('#soundStopBtn').addEventListener('click', stopPlayback);
  containerEl.querySelector('#soundUndoBtn').addEventListener('click', undoEdit);

  bindEffectEvents();
  bindWaveformInteraction();
}

function bindEffectEvents() {
  const volRange = containerEl.querySelector('#soundVolRange');
  volRange.addEventListener('input', () => {
    containerEl.querySelector('#volVal').textContent = `${volRange.value}%`;
  });
  containerEl.querySelector('#applyVolBtn').addEventListener('click', () => {
    applyTransform(info => {
      const gain = Number(volRange.value) / 100;
      for (let i = 0; i < info.samples.length; i++) {
        info.samples[i] = Math.max(-1, Math.min(1, info.samples[i] * gain));
      }
    }, 'volume');
  });

  containerEl.querySelector('#fadeInBtn').addEventListener('click', () => {
    applyTransform(info => {
      const { i0, i1 } = activeRange(info);
      const fade = Math.min(info.sampleRate * 0.5, i1 - i0);
      for (let i = i0; i < i0 + fade; i++) info.samples[i] *= (i - i0) / fade;
    }, 'fade in');
  });

  containerEl.querySelector('#fadeOutBtn').addEventListener('click', () => {
    applyTransform(info => {
      const { i0, i1 } = activeRange(info);
      const fade = Math.min(info.sampleRate * 0.5, i1 - i0);
      for (let i = i1 - fade; i < i1; i++) info.samples[i] *= (i1 - i) / fade;
    }, 'fade out');
  });

  containerEl.querySelector('#reverseBtn').addEventListener('click', () => {
    applyTransform(info => { info.samples.reverse(); }, 'reverse');
  });

  containerEl.querySelector('#normalizeBtn').addEventListener('click', () => {
    applyTransform(info => {
      const { i0, i1 } = activeRange(info);
      let peak = 0;
      for (let i = i0; i < i1; i++) peak = Math.max(peak, Math.abs(info.samples[i]));
      if (peak > 0.0001) {
        const gain = 0.95 / peak;
        for (let i = 0; i < info.samples.length; i++) info.samples[i] *= gain;
      }
    }, 'normalize');
  });

  containerEl.querySelector('#trimBtn').addEventListener('click', () => {
    if (!selection) return;
    applyTransform(info => {
      const sr = info.sampleRate;
      const i0 = Math.max(0, Math.floor(selection.start * sr));
      const i1 = Math.min(info.samples.length, Math.ceil(selection.end * sr));
      info.samples = info.samples.slice(i0, i1);
      selection = null;
    }, 'trim');
  });

  containerEl.querySelector('#deleteSoundBtn').addEventListener('click', () => {
    if (!currentDef) return;
    SoundStore.removeSound(currentDef.name);
    selectedName = null;
    currentDef = null;
    toast('🗑 Sound deleted');
  });
}

// Range the next effect applies to: the drag-selection when present, else the whole sound.
function activeRange(info) {
  if (selection) {
    const sr = info.sampleRate;
    return {
      i0: Math.max(0, Math.floor(selection.start * sr)),
      i1: Math.min(info.samples.length, Math.ceil(selection.end * sr)),
    };
  }
  return { i0: 0, i1: info.samples.length };
}

async function applyTransform(transformFn, label) {
  const def = currentDef;
  if (!def) return;
  const info = await ensureDecoded(def);
  if (!info) {
    toast('⚠️ Could not decode this sound for editing');
    return;
  }
  pushUndo(def.name, info);
  const work = { samples: new Float32Array(info.samples), sampleRate: info.sampleRate };
  transformFn(work);
  const wav = encodeWav(work.samples, work.sampleRate);
  if (!wav) return;
  // Re-register the same sound with its new audio (merges by name).
  SoundStore.addSound({ ...def, type: 'audio', value: wav, icon: def.icon || '🔊' });
  toast(`✅ ${label} applied`);
}

function pushUndo(name, info) {
  const stack = undoStacks.get(name) || [];
  stack.push({ samples: new Float32Array(info.samples), sampleRate: info.sampleRate });
  if (stack.length > MAX_UNDO) stack.shift();
  undoStacks.set(name, stack);
}

function undoEdit() {
  if (!currentDef) return;
  const stack = undoStacks.get(currentDef.name);
  if (!stack || stack.length === 0) {
    toast('↩ Nothing left to undo');
    return;
  }
  const snap = stack.pop();
  const wav = encodeWav(snap.samples, snap.sampleRate);
  if (!wav) return;
  SoundStore.addSound({ ...currentDef, type: 'audio', value: wav, icon: currentDef.icon || '🔊' });
  toast('↩ Undo');
}

/* ── waveform drawing + playback ───────────────────────── */

async function drawWaveformForCurrent() {
  const canvas = containerEl.querySelector('#waveformCanvas');
  if (!canvas) return;
  const info = await ensureDecoded(currentDef);
  const meta = containerEl.querySelector('#soundMeta');
  if (meta) {
    meta.textContent = info
      ? `${fmtTime(info.duration)} · ${info.sampleRate} Hz · mono`
      : 'format not editable (still playable)';
  }
  const wrap = canvas.parentElement;
  const dpr = window.devicePixelRatio || 1;
  const w = wrap.clientWidth || 600;
  const h = wrap.clientHeight || 160;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  canvas._cssW = w;
  canvas._cssH = h;
  canvas._dpr = dpr;
  canvas._info = info;
  canvas._peaks = null;
  drawWave(canvas);
}

// Compute per-pixel peak buckets for the waveform
function computePeaks(samples, buckets) {
  const peaks = new Float32Array(buckets);
  if (!samples || samples.length === 0) return peaks;
  const per = samples.length / buckets;
  for (let b = 0; b < buckets; b++) {
    const s0 = Math.floor(b * per);
    const s1 = Math.min(samples.length, Math.floor((b + 1) * per));
    let peak = 0;
    for (let i = s0; i < s1; i++) {
      const v = Math.abs(samples[i]);
      if (v > peak) peak = v;
    }
    peaks[b] = peak;
  }
  return peaks;
}

function drawWave(canvas) {
  const info = canvas._info;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height, dpr = canvas._dpr || 1;
  ctx.clearRect(0, 0, W, H);

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#EDF4FF');
  bg.addColorStop(1, '#E3ECFB');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  if (!info || !info.samples || info.samples.length === 0) {
    ctx.fillStyle = '#94a3b8';
    ctx.font = `${13 * dpr}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('No waveform available', W / 2, H / 2);
    return;
  }

  const mid = H / 2;
  const buckets = Math.max(60, Math.floor(W / (3 * dpr)));
  if (!canvas._peaks || canvas._peaks.length !== buckets) {
    canvas._peaks = computePeaks(info.samples, buckets);
  }

  // selection highlight
  if (selection && info.duration > 0) {
    const x0 = (selection.start / info.duration) * W;
    const x1 = (selection.end / info.duration) * W;
    ctx.fillStyle = 'rgba(76, 151, 255, 0.22)';
    ctx.fillRect(x0, 0, Math.max(2, x1 - x0), H);
  }

  // waveform bars (mirrored)
  const barW = Math.max(1, Math.floor(2 * dpr));
  const gap = Math.max(1, Math.floor(1 * dpr));
  const step = barW + gap;
  const maxAmp = H * 0.44;
  ctx.fillStyle = '#4C97FF';
  const peaks = canvas._peaks;
  for (let b = 0; b < peaks.length; b++) {
    const x = (b / peaks.length) * W;
    const amp = Math.max(peaks[b] * maxAmp, 1.2 * dpr);
    ctx.fillRect(x, mid - amp, barW, amp * 2);
  }

  // center line
  ctx.strokeStyle = 'rgba(30, 41, 59, 0.25)';
  ctx.lineWidth = 1 * dpr;
  ctx.beginPath();
  ctx.moveTo(0, mid);
  ctx.lineTo(W, mid);
  ctx.stroke();

  // playhead
  if (playing && playing.def === currentDef && info.duration > 0) {
    const t = Math.min(playing.audio.currentTime, info.duration);
    const x = (t / info.duration) * W;
    ctx.strokeStyle = '#FF6680';
    ctx.lineWidth = 2 * dpr;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
}

function togglePlay() {
  if (playing) {
    stopPlayback();
    return;
  }
  const def = currentDef;
  if (!def) return;
  const url = getSoundDataUrl(def);
  if (!url) return;
  const audio = new Audio(url);
  audio.volume = Math.max(0, Math.min(1, (SoundEngine.getVolume() || 100) / 100));
  const selChk = containerEl.querySelector('#soundPlaySelChk');
  const sel = (selChk && selChk.checked && selection) ? selection : null;
  if (sel) audio.currentTime = sel.start;
  playing = { audio, def, raf: null, sel };
  audio.addEventListener('ended', stopPlayback);
  audio.play().catch(() => {});
  const tick = () => {
    if (!playing) return;
    const canvas = containerEl.querySelector('#waveformCanvas');
    if (canvas) drawWave(canvas);
    if (playing && playing.sel && playing.audio.currentTime >= playing.sel.end) {
      stopPlayback();
      return;
    }
    if (playing && !playing.audio.paused) {
      playing.raf = requestAnimationFrame(tick);
    }
  };
  playing.raf = requestAnimationFrame(tick);
}

function stopPlayback() {
  if (!playing) return;
  try { playing.audio.pause(); } catch (e) {}
  if (playing.raf) cancelAnimationFrame(playing.raf);
  playing = null;
  const canvas = containerEl && containerEl.querySelector('#waveformCanvas');
  if (canvas) drawWave(canvas);
}

function bindWaveformInteraction() {
  const canvas = containerEl.querySelector('#waveformCanvas');
  if (!canvas) return;
  let dragging = false;
  let dragStartX = 0;
  let moved = false;

  const xToTime = (clientX) => {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const info = canvas._info;
    return info && info.duration > 0 ? ratio * info.duration : 0;
  };

  canvas.addEventListener('pointerdown', (e) => {
    if (!canvas._info) return;
    dragging = true;
    moved = false;
    dragStartX = e.clientX;
    try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!dragging || !canvas._info) return;
    if (Math.abs(e.clientX - dragStartX) > 4) moved = true;
    if (moved) {
      const a = xToTime(dragStartX);
      const b = xToTime(e.clientX);
      selection = { start: Math.min(a, b), end: Math.max(a, b) };
      updateSelectionUI();
      drawWave(canvas);
    }
  });

  canvas.addEventListener('pointerup', (e) => {
    if (!dragging) return;
    dragging = false;
    if (!moved) {
      // plain click = seek (and clear any selection)
      const t = xToTime(e.clientX);
      selection = null;
      updateSelectionUI();
      if (playing) playing.audio.currentTime = t;
    }
    drawWave(canvas);
  });

  canvas.addEventListener('dblclick', () => {
    selection = null;
    updateSelectionUI();
    drawWave(canvas);
  });
}

function updateSelectionUI() {
  const trimBtn = containerEl.querySelector('#trimBtn');
  if (trimBtn) trimBtn.disabled = !selection;
  const chk = containerEl.querySelector('#soundPlaySelChk');
  if (chk) {
    chk.disabled = !selection;
    chk.parentElement.classList.toggle('disabled', !selection);
  }
}

/* ── microphone recording ──────────────────────────────── */

async function openRecorder() {
  if (recording) return;
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || typeof MediaRecorder === 'undefined') {
    toast('⚠️ Recording is not supported in this browser');
    return;
  }

  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true }
    });
  } catch (err) {
    toast('🎤 Microphone access was denied');
    return;
  }

  const overlay = containerEl.querySelector('#recordOverlay');
  overlay.style.display = 'flex';
  overlay.innerHTML = `
    <div class="record-panel">
      <div class="record-title"><span class="record-dot"></span> Recording from Microphone</div>
      <div class="record-timer" id="recTimer">0:00.0</div>
      <canvas class="record-meter" id="recMeterCanvas"></canvas>
      <div class="record-status" id="recStatus">Speak into your microphone…</div>
      <div class="record-actions">
        <button class="sound-tool-btn" id="recCancelBtn">✕ Cancel</button>
        <button class="sound-stop-btn record-stop" id="recStopBtn" title="Stop recording">■</button>
        <button class="sound-apply-btn record-save" id="recSaveBtn" style="display:none;">💾 Save Sound</button>
        <button class="sound-tool-btn" id="recDiscardBtn" style="display:none;">🗑 Discard</button>
      </div>
      <div class="record-preview" id="recPreview" style="display:none;"></div>
    </div>
  `;

  const state = {
    stream,
    chunks: [],
    startTime: Date.now(),
    timerInt: null,
    meterRaf: null,
    recorder: null,
    resultWav: null,
    resultDuration: 0,
  };
  recording = state;

  const timerEl = overlay.querySelector('#recTimer');
  state.timerInt = setInterval(() => {
    timerEl.textContent = fmtTime((Date.now() - state.startTime) / 1000);
  }, 100);

  // live level meter via AnalyserNode
  const ctx = getCtx();
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 512;
  ctx.createMediaStreamSource(stream).connect(analyser);
  const meterData = new Uint8Array(analyser.fftSize);
  const meterCanvas = overlay.querySelector('#recMeterCanvas');
  const mdpr = window.devicePixelRatio || 1;
  meterCanvas.width = Math.round(meterCanvas.clientWidth * mdpr);
  meterCanvas.height = Math.round(meterCanvas.clientHeight * mdpr);
  const meterCtx = meterCanvas.getContext('2d');
  const meterPeaks = [];
  const drawMeter = () => {
    if (!recording) return;
    analyser.getByteTimeDomainData(meterData);
    let peak = 0;
    for (let i = 0; i < meterData.length; i++) {
      peak = Math.max(peak, Math.abs(meterData[i] - 128) / 128);
    }
    meterPeaks.push(peak);
    if (meterPeaks.length > 80) meterPeaks.shift();
    const W = meterCanvas.width, H = meterCanvas.height;
    meterCtx.clearRect(0, 0, W, H);
    meterCtx.fillStyle = '#1e293b';
    meterCtx.fillRect(0, 0, W, H);
    meterCtx.fillStyle = peak > 0.85 ? '#FF6680' : '#4C97FF';
    const barW = Math.max(2, Math.floor(3 * mdpr));
    meterPeaks.forEach((p, i) => {
      const h = Math.max(2 * mdpr, p * H * 0.92);
      meterCtx.fillRect((i / 80) * W, (H - h) / 2, barW, h);
    });
    state.meterRaf = requestAnimationFrame(drawMeter);
  };
  drawMeter();

  const cleanupStream = () => {
    if (state.timerInt) clearInterval(state.timerInt);
    if (state.meterRaf) cancelAnimationFrame(state.meterRaf);
    stream.getTracks().forEach(t => t.stop());
  };
  state.cleanupStream = cleanupStream;

  overlay.querySelector('#recCancelBtn').addEventListener('click', () => {
    cancelRecording();
    overlay.style.display = 'none';
    overlay.innerHTML = '';
  });

  overlay.querySelector('#recStopBtn').addEventListener('click', () => {
    if (state.recorder && state.recorder.state !== 'inactive') {
      state.recorder.stop();
    }
  });

  const recorder = new MediaRecorder(stream);
  state.recorder = recorder;
  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) state.chunks.push(e.data);
  };
  recorder.onstop = async () => {
    cleanupStream();
    overlay.querySelector('#recStatus').textContent = 'Processing recording…';
    try {
      const blob = new Blob(state.chunks, { type: recorder.mimeType || 'audio/webm' });
      const arr = await blob.arrayBuffer();
      const buf = await getCtx().decodeAudioData(arr);
      let samples;
      if (buf.numberOfChannels === 1) {
        samples = new Float32Array(buf.getChannelData(0));
      } else {
        samples = new Float32Array(buf.length);
        for (let c = 0; c < buf.numberOfChannels; c++) {
          const ch = buf.getChannelData(c);
          for (let i = 0; i < buf.length; i++) samples[i] += ch[i] / buf.numberOfChannels;
        }
      }
      state.resultSamples = samples;
      state.resultRate = buf.sampleRate;
      state.resultWav = encodeWav(samples, buf.sampleRate);
      state.resultDuration = buf.duration;
      showRecordPreview(overlay, state);
    } catch (err) {
      console.error('[SoundEditor] recording processing failed', err);
      toast('⚠️ Could not process the recording');
      cancelRecording();
      overlay.style.display = 'none';
      overlay.innerHTML = '';
    }
  };
  recorder.start();
}

// After stopping: preview the recording and choose Save / Discard
function showRecordPreview(overlay, state) {
  overlay.querySelector('#recStatus').textContent = 'Recording captured 🎉';
  overlay.querySelector('#recStopBtn').style.display = 'none';
  overlay.querySelector('#recCancelBtn').style.display = 'none';
  overlay.querySelector('#recSaveBtn').style.display = '';
  overlay.querySelector('#recDiscardBtn').style.display = '';

  const preview = overlay.querySelector('#recPreview');
  preview.style.display = 'block';
  preview.innerHTML = `
    <canvas class="record-preview-wave" id="recPreviewWave"></canvas>
    <div class="record-preview-row">
      <input class="sound-name-input record-name" id="recNameInput" value="Recording ${SoundStore.getSounds().length + 1}" spellcheck="false" />
      <button class="sound-play-btn" id="recPreviewPlay" title="Preview recording">▶</button>
      <span class="sound-meta">${fmtTime(state.resultDuration)} · ready to save</span>
    </div>
  `;

  const waveCanvas = preview.querySelector('#recPreviewWave');
  const dpr = window.devicePixelRatio || 1;
  waveCanvas.width = Math.round(waveCanvas.clientWidth * dpr);
  waveCanvas.height = Math.round(waveCanvas.clientHeight * dpr);
  const wctx = waveCanvas.getContext('2d');
  const peaks = computePeaks(state.resultSamples, Math.max(60, Math.floor(waveCanvas.width / (3 * dpr))));
  const mid = waveCanvas.height / 2;
  const maxAmp = waveCanvas.height * 0.44;
  wctx.fillStyle = '#EDF4FF';
  wctx.fillRect(0, 0, waveCanvas.width, waveCanvas.height);
  wctx.fillStyle = '#4C97FF';
  peaks.forEach((p, i) => {
    const x = (i / peaks.length) * waveCanvas.width;
    const amp = Math.max(p * maxAmp, 1.2 * dpr);
    wctx.fillRect(x, mid - amp, Math.max(1, Math.floor(2 * dpr)), amp * 2);
  });

  preview.querySelector('#recPreviewPlay').addEventListener('click', () => {
    if (state.resultWav) SoundEngine.playSound(state.resultWav);
  });

  overlay.querySelector('#recSaveBtn').addEventListener('click', () => {
    const name = (preview.querySelector('#recNameInput').value || '').trim() || `Recording ${SoundStore.getSounds().length + 1}`;
    SoundStore.addSound({ name, category: 'Recorded', type: 'audio', value: state.resultWav, icon: '🎙️' });
    selectedName = name;
    currentDef = null;
    selection = null;
    recording = null;
    overlay.style.display = 'none';
    overlay.innerHTML = '';
    toast(`🎙️ Saved "${name}"`);
    render();
  });

  overlay.querySelector('#recDiscardBtn').addEventListener('click', () => {
    cancelRecording();
    overlay.style.display = 'none';
    overlay.innerHTML = '';
  });
}

function cancelRecording(silent = false) {
  if (!recording) return;
  const state = recording;
  recording = null;
  try {
    if (state.recorder && state.recorder.state !== 'inactive') state.recorder.stop();
  } catch (e) {}
  if (state.timerInt) clearInterval(state.timerInt);
  if (state.meterRaf) cancelAnimationFrame(state.meterRaf);
  if (state.stream) state.stream.getTracks().forEach(t => t.stop());
  if (!silent && containerEl) {
    const overlay = containerEl.querySelector('#recordOverlay');
    if (overlay) { overlay.style.display = 'none'; overlay.innerHTML = ''; }
  }
}







