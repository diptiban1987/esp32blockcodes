import spriteStore from './engine/SpriteStore';
import { DEFAULT_CAT_SVG } from './engine/SpriteEngine';
import { getCurrentMode, setMode, showToast } from './ui/ModeSwitcher';
import * as Blockly from 'blockly';

function serializeSprite(s) {
  return {
    id: s.id,
    name: s.name,
    x: s.x,
    y: s.y,
    direction: s.direction,
    size: s.size,
    visible: s.visible,
    opacity: s.opacity,
    rotationStyle: s.rotationStyle,
    costumes: (s.costumes || []).map(c => ({ name: c.name, src: c.src })),
    currentCostumeIndex: s.currentCostumeIndex ?? 0,
    sayBubble: s.sayBubble ?? null,
    penDown: s.penDown ?? false,
    penColor: s.penColor ?? '#4C97FF',
    penSize: s.penSize ?? 1,
    penTrails: s.penTrails || [],
    workspaceState: s.workspaceState || null,
  };
}

export function saveProject(ws) {
  const mode = getCurrentMode();
  const allSprites = spriteStore.getAllSprites();
  const selSprite = spriteStore.getSelectedSprite() || allSprites[0];
  const selIndex = selSprite ? allSprites.findIndex(s => s.id === selSprite.id) : 0;

  // In TechyBlocks mode, always snapshot the live workspace into the selected sprite
  // before serializing, so the saved file is guaranteed to be up-to-date.
  if (mode === 'techyblocks' && selSprite) {
    try {
      const liveState = Blockly.serialization.workspaces.save(ws);
      spriteStore.saveWorkspaceState(selSprite.id, liveState);
    } catch (err) {
      console.warn('[saveProject] Error saving live workspace:', err);
    }
  }

  const data = {
    version: 2,
    mode: mode,
    project: {
      spriteStore: {
        sprites: allSprites.map(serializeSprite),
        selectedSpriteIndex: selIndex >= 0 ? selIndex : 0,
        currentBackdrop: spriteStore.getCurrentBackdrop(),
        backdrops: spriteStore.getBackdrops(),
      },
      // TechyBlocks: save current workspace under animationWorkspace for backward compatibility
      animationWorkspace: mode === 'techyblocks' ? Blockly.serialization.workspaces.save(ws) : null,
      boardWorkspace: mode === 'board' ? Blockly.serialization.workspaces.save(ws) : null,
    },
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'project.techyguide';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast('Project saved successfully!');
}

export async function loadProject(ws) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.techyguide,.json,.blocks';
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      restoreProject(data, ws);
    } catch (err) {
      console.error('[loadProject] Error:', err);
      alert('Failed to load project: ' + err.message);
    }
  };
  input.click();
}

/**
 * Import blocks from a .techyguide / .json / .blocks file into the workspace.
 * Uses restoreProject so both full projects and standalone blocks are handled properly.
 */
export async function importBlocks(ws) {
  return loadProject(ws);
}

export function restoreProject(data, ws) {
  if (!data || typeof data !== 'object') {
    alert('Invalid project file.');
    return;
  }

  const projectData = data.project || data;
  const spriteData = projectData.spriteStore 
    || (Array.isArray(data.sprites) ? data : null) 
    || (Array.isArray(projectData.sprites) ? projectData : null);
  const boardWs = projectData.boardWorkspace || null;
  const hasSprites = spriteData && Array.isArray(spriteData.sprites) && spriteData.sprites.length > 0;

  // Case 1: Board mode project
  if (boardWs || data.mode === 'board') {
    setMode('board');
    if (boardWs) {
      ws.clear();
      Blockly.serialization.workspaces.load(boardWs, ws);
    }
    showToast('Board project loaded successfully.');
    return;
  }

  // Case 2: Full TechyBlocks project with sprites
  if (hasSprites) {
    setMode('techyblocks');

    // Restore backdrops
    if (spriteData.backdrops && Array.isArray(spriteData.backdrops)) {
      for (const bd of spriteData.backdrops) {
        spriteStore.addBackdropToLibrary(bd);
      }
    }
    if (spriteData.currentBackdrop) {
      spriteStore.setBackdrop(spriteData.currentBackdrop);
    }

    // Restore all sprites atomically with their properties and workspaceStates
    const selIndex = typeof spriteData.selectedSpriteIndex === 'number' ? spriteData.selectedSpriteIndex : 0;
    spriteStore.restoreSprites(spriteData.sprites, selIndex);

    // Ensure the selected sprite's workspace is loaded into the live Blockly workspace
    const activeSprite = spriteStore.getSelectedSprite();
    if (activeSprite) {
      const blocksToLoad = activeSprite.workspaceState || (selIndex === 0 ? projectData.animationWorkspace : null);
      if (blocksToLoad) {
        activeSprite.workspaceState = blocksToLoad;
        try {
          ws.clear();
          Blockly.serialization.workspaces.load(blocksToLoad, ws);
        } catch (err) {
          console.warn('[restoreProject] Error loading blocks into workspace:', err);
        }
      } else {
        ws.clear();
      }
      // Emit select so UI highlights active sprite thumb
      spriteStore.selectSprite(activeSprite.id);
    }

    showToast(`Loaded project with ${spriteData.sprites.length} sprites and blocks!`);
    return;
  }

  // Case 3: Standalone blocks file (e.g. exported blocks or example blocks)
  const blocksData = projectData.animationWorkspace || projectData.boardWorkspace || (data.blocks ? data : null);
  if (blocksData) {
    ws.clear();
    Blockly.serialization.workspaces.load(blocksData, ws);
    if (getCurrentMode() === 'techyblocks') {
      const selId = spriteStore.selectedSpriteId;
      if (selId) {
        spriteStore.saveWorkspaceState(selId, blocksData);
      }
    }
    showToast('Blocks loaded into workspace.');
    return;
  }

  alert('Could not find valid sprites or blocks in this file.');
}

export function loadProjectData(data, ws) {
  restoreProject(data, ws);
}

