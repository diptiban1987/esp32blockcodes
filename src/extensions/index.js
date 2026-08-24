/**
 * Built-in TechyBlocks extensions.
 *
 * These ship with the editor by default. Each extension lives in its own
 * file under src/extensions/ and is registered here. Third-party extensions
 * can be added by:
 *   1) dropping a new file (e.g. src/extensions/myext.js) that calls
 *      Extension.register({ ... }), then
 *   2) importing it from this index file.
 *
 * Removing or commenting out an import here disables that extension.
 */

import { Extension } from '../extensions';
import { penExtension } from './pen';
import { uiBlocksExtension } from './uiBlocks';
import { drawingExtension } from './drawing';
import { mathExtension } from './math';
import { controlsExtension } from './controls';

/**
 * Register every built-in extension. Safe to call multiple times —
 * already-registered ids are simply overwritten with a warning.
 */
export function initBuiltInExtensions() {
  Extension.register(penExtension);
  Extension.register(uiBlocksExtension);
  Extension.register(drawingExtension);
  Extension.register(mathExtension);
  Extension.register(controlsExtension);
}
