/**
 * TechyBlocks Extension Framework
 *
 * Lightweight extension system that lets third parties (or future updates)
 * register new block categories, custom blocks, generators, and runtime
 * behaviors without touching the core codebase.
 *
 * Public API:
 *   - Extension.register({ id, name, color, icon, blocks, generator, runtime, onLoad })
 *   - Extension.list()
 *   - Extension.get(id)
 *   - Extension.getBlocks(id)
 *   - Extension.getAllBlockDefinitions()
 *
 * An extension is a self-contained object:
 *   {
 *     id:        'myext',                // unique string id
 *     name:      'My Extension',         // category display name
 *     color:     '#FF6680',              // category block color
 *     icon:      '<svg>...</svg>',       // optional category icon (raw svg)
 *     version:   '1.0.0',                // optional semver
 *     author:    'TechyGuide',           // optional
 *     description: 'What it does',       // optional, shown in UI
 *     blocks:    [ { type, jsonInit, ... } ],    // Blockly block defs
 *     toolbox:   [ { kind: 'block', type: '...' }, ... ],  // toolbox entries
 *     generator: { language: 'arduino'|'micropython', fn: (block)=>'code' },
 *     runtime:   { onStart, onStop, methods: { myMethod(args, sprite, ws) { ... } } },
 *     onLoad:    (ctx) => { ... },       // called once when registered
 *   }
 *
 * Usage in src/index.js (already wired in):
 *   import { initExtensions, applyExtensionsToToolbox, getExtensionRuntime } from './extensions';
 *   initExtensions();      // registers built-in extensions
 *   applyExtensionsToToolbox(workspace, baseToolbox);  // merges extension categories
 *
 * Third-party authors should:
 *   1) Place their extension file under src/extensions/<name>.js
 *   2) Register it in src/extensions/index.js OR call Extension.register(myExt) at runtime
 *   3) Bundle via Webpack (or load dynamically via <script src="...">)
 */

const _extensions = new Map();
const _listeners = new Set();

/**
 * Register an extension. Returns the extension (or throws on duplicate id).
 */
function register(ext) {
  if (!ext || typeof ext !== 'object') {
    throw new Error('[Extension] register() requires an object');
  }
  if (!ext.id || typeof ext.id !== 'string') {
    throw new Error('[Extension] extension.id is required (string)');
  }
  if (_extensions.has(ext.id)) {
    console.warn(`[Extension] "${ext.id}" already registered — overwriting`);
  }
  const normalized = {
    id: ext.id,
    name: ext.name || ext.id,
    color: ext.color || '#FF6680',
    icon: ext.icon || null,
    version: ext.version || '1.0.0',
    author: ext.author || 'TechyGuide',
    description: ext.description || '',
    blocks: Array.isArray(ext.blocks) ? ext.blocks : [],
    toolbox: Array.isArray(ext.toolbox) ? ext.toolbox : [],
    generator: ext.generator || null,
    runtime: ext.runtime || null,
    onLoad: typeof ext.onLoad === 'function' ? ext.onLoad : null,
  };
  _extensions.set(ext.id, normalized);
  if (normalized.onLoad) {
    try {
      normalized.onLoad({ id: normalized.id });
    } catch (err) {
      console.error(`[Extension] onLoad failed for "${normalized.id}":`, err);
    }
  }
  _listeners.forEach((fn) => {
    try { fn('registered', normalized); } catch (_) {}
  });
  return normalized;
}

/**
 * Unregister an extension by id.
 */
function unregister(id) {
  const existed = _extensions.delete(id);
  if (existed) {
    _listeners.forEach((fn) => {
      try { fn('unregistered', { id }); } catch (_) {}
    });
  }
  return existed;
}

/**
 * Return list of registered extensions.
 */
function list() {
  return Array.from(_extensions.values());
}

/**
 * Look up a single extension.
 */
function get(id) {
  return _extensions.get(id) || null;
}

/**
 * Return all block JSON definitions from every extension (flattened).
 * Pass these into Blockly.Blocks.register(...) before workspace init.
 */
function getAllBlockDefinitions() {
  const out = [];
  _extensions.forEach((ext) => {
    ext.blocks.forEach((b) => out.push({ ...b, _ext: ext.id }));
  });
  return out;
}

const _activeExtensions = new Set();

/**
 * Check if an extension is currently active in the toolbox.
 */
function isExtensionActive(id) {
  return _activeExtensions.has(id);
}

/**
 * Activate an extension in the toolbox.
 */
function activateExtension(id) {
  if (!_extensions.has(id)) return false;
  _activeExtensions.add(id);
  _listeners.forEach((fn) => {
    try { fn('activated', { id }); } catch (_) {}
  });
  return true;
}

/**
 * Deactivate an extension from the toolbox.
 */
function deactivateExtension(id) {
  const existed = _activeExtensions.delete(id);
  if (existed) {
    _listeners.forEach((fn) => {
      try { fn('deactivated', { id }); } catch (_) {}
    });
  }
  return existed;
}

/**
 * Get array of active extension ids.
 */
function getActiveExtensions() {
  return Array.from(_activeExtensions);
}

/**
 * Return toolbox entries for registered extensions as
 * Blockly category objects ready to be appended to the toolbox JSON.
 */
function getAllToolboxCategories(activeFilter) {
  const out = [];
  const allowed = activeFilter || _activeExtensions;
  _extensions.forEach((ext) => {
    if (!ext.toolbox || ext.toolbox.length === 0) return;
    if (allowed && !allowed.has(ext.id)) return;
    out.push({
      kind: 'category',
      name: ext.name,
      colour: ext.color,
      icon: ext.icon || undefined,
      contents: ext.toolbox.map((entry) => ({ ...entry })),
      _ext: ext.id,
    });
  });
  return out;
}

/**
 * Return the runtime object for an extension (if it declared one).
 * Use to call extension-specific runtime methods from interpreter.
 */
function getRuntime(id) {
  const ext = _extensions.get(id);
  return ext ? ext.runtime : null;
}

/**
 * Generate code for a block belonging to an extension. Returns a string
 * (or null if the extension did not register a generator for that block).
 */
function generateCode(extId, block, language) {
  const ext = _extensions.get(extId);
  if (!ext || !ext.generator) return null;
  const targetLang = ext.generator.language || 'any';
  if (targetLang !== 'any' && targetLang !== language) return null;
  try {
    return ext.generator.fn(block, language);
  } catch (err) {
    console.error(`[Extension] generator failed for "${extId}":`, err);
    return null;
  }
}

/**
 * Subscribe to extension lifecycle events. Returns unsubscribe fn.
 * Events: 'registered', 'unregistered', 'activated', 'deactivated'
 */
function onChange(fn) {
  _listeners.add(fn);
  return () => _listeners.delete(fn);
}

/**
 * Merge active extension categories into a base toolbox JSON object.
 * Pure function — does not mutate the base.
 */
function applyExtensionsToToolbox(baseToolbox, activeFilter) {
  if (!baseToolbox || !Array.isArray(baseToolbox.contents)) return baseToolbox;
  const filter = activeFilter instanceof Set
    ? activeFilter
    : (Array.isArray(activeFilter) ? new Set(activeFilter) : _activeExtensions);
  const extCategories = getAllToolboxCategories(filter);
  if (extCategories.length === 0) return baseToolbox;
  return {
    ...baseToolbox,
    contents: [...baseToolbox.contents, ...extCategories],
  };
}

export const Extension = {
  register,
  unregister,
  list,
  get,
  getAllBlockDefinitions,
  getAllToolboxCategories,
  isExtensionActive,
  activateExtension,
  deactivateExtension,
  getActiveExtensions,
  getRuntime,
  generateCode,
  onChange,
  applyExtensionsToToolbox,
};

export default Extension;
