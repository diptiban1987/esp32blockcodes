// main entry — registers blocks, injects workspace, wires engine and ui
import * as Blockly from "blockly";

import { blocks as printblock } from "./blocks/print";
import { blocks1 as textBlocks } from "./blocks/text";
import { blocks2 as waitBlocks } from "./blocks/wait";
import { blocks3 as pinBlocks } from "./blocks/digital_pin";
import { forBlock as printGen } from "./generators/print";
import { forBlock as addTextGen } from "./generators/addText";
import { forBlock as waitGen } from "./generators/wait";
import { forBlock as pinGen } from "./generators/digital_pin";
import { forBlock as controlGen } from "./generators/controlGen";

import { actuatorBlocks } from "./blocks/esp32/actuatorBlocks";
import { sensorBlocks } from "./blocks/esp32/sensorBlocks";
import { communicationBlocks } from "./blocks/esp32/communicationBlocks";
import { inputBlocks } from "./blocks/esp32/inputBlocks";
import { terminalBlocks } from "./blocks/esp32/terminalBlocks";
import { notificationBlocks } from "./blocks/esp32/notificationBlocks";
import { cameraBlocks } from "./blocks/esp32/cameraBlocks";
import { iotBlocks } from "./blocks/esp32/iotBlocks";
import { wifiBlocks } from "./blocks/esp32/wifiBlocks";
import { httpBlocks } from "./blocks/esp32/httpBlocks";
import { mqttBlocks } from "./blocks/esp32/mqttBlocks";
import { dabbleBlocks } from "./blocks/esp32/dabbleBlocks";
import { esp32CoreBlocks, updateStarterBlocks } from "./blocks/esp32/esp32CoreBlocks";
import { mpuBlocks } from "./blocks/esp32/mpuBlocks";
import { heartBlocks } from "./blocks/esp32/heartBlocks";
import { lcdBlocks } from "./blocks/esp32/lcdBlocks";
import { l298nBlocks } from "./blocks/esp32/l298nBlocks";
import { fireBlocks } from "./blocks/esp32/fireBlocks";
import { blynkBlocks } from "./blocks/esp32/blynkBlocks";
import { hallBlocks } from "./blocks/esp32/hallBlocks";


// MicroPython generators (existing)
import { forBlock as actuatorGen } from "./generators/esp32/actuatorGen";
import { forBlock as sensorGen } from "./generators/esp32/sensorGen";
import { forBlock as communicationGen } from "./generators/esp32/communicationGen";
import { forBlock as inputGen } from "./generators/esp32/inputGen";
import { forBlock as terminalGen } from "./generators/esp32/terminalGen";
import { forBlock as notificationGen } from "./generators/esp32/notificationGen";
import { forBlock as cameraGen } from "./generators/esp32/cameraGen";
import { forBlock as iotGen } from "./generators/esp32/iotGen";
import { forBlock as wifiGen } from "./generators/esp32/wifiGen";
import { forBlock as httpGen } from "./generators/esp32/httpGen";
import { forBlock as mqttGen } from "./generators/esp32/mqttGen";
import { forBlock as dabbleGen } from "./generators/esp32/dabbleGen";
import { forBlock as esp32CoreGen } from "./generators/esp32/esp32CoreGen";
import { forBlock as mpuGen } from "./generators/esp32/mpuGen";
import { forBlock as heartGen } from "./generators/esp32/heartGen";
import { forBlock as lcdGen } from "./generators/esp32/lcdGen";
import { forBlock as l298nGen } from "./generators/esp32/l298nGen";
import { forBlock as fireGen } from "./generators/esp32/fireGen";
import { forBlock as blynkGen } from "./generators/esp32/blynkGen";
import { forBlock as hallGen } from "./generators/esp32/hallGen";
import { pythonGenerator } from "blockly/python";


// Fallback generators + validation (crash-proof system)
import { forBlock as fallbackGen, arduinoForBlock as arduinoFallbackGen } from "./generators/fallbackGen";
import { fullValidation, installSafetyNet, reportGeneratorCoverage } from "./generators/validateWorkspace";

// Arduino C++ generators (new)
import { arduinoGenerator } from "./generators/arduinoGenerator";
import { forBlock as arduinoControlGen } from "./generators/arduinoControlGen";
import { forBlock as arduinoCoreGen } from "./generators/esp32/arduino/coreGen";
import { forBlock as arduinoActuatorGen } from "./generators/esp32/arduino/actuatorGen";
import { forBlock as arduinoSensorGen } from "./generators/esp32/arduino/sensorGen";
import { forBlock as arduinoCommunicationGen } from "./generators/esp32/arduino/communicationGen";
import { forBlock as arduinoInputGen } from "./generators/esp32/arduino/inputGen";
import { forBlock as arduinoTerminalGen } from "./generators/esp32/arduino/terminalGen";
import { forBlock as arduinoNotificationGen } from "./generators/esp32/arduino/notificationGen";
import { forBlock as arduinoCameraGen } from "./generators/esp32/arduino/cameraGen";
import { forBlock as arduinoIotGen } from "./generators/esp32/arduino/iotGen";
import { forBlock as arduinoWifiGen } from "./generators/esp32/arduino/wifiGen";
import { forBlock as arduinoHttpGen } from "./generators/esp32/arduino/httpGen";
import { forBlock as arduinoMqttGen } from "./generators/esp32/arduino/mqttGen";
import { forBlock as arduinoDabbleGen } from "./generators/esp32/arduino/dabbleGen";
import { forBlock as arduinoMpuGen } from "./generators/esp32/arduino/mpuGen";
import { forBlock as arduinoHeartGen } from "./generators/esp32/arduino/heartGen";
import { forBlock as arduinoLcdGen } from "./generators/esp32/arduino/lcdGen";
import { forBlock as arduinoL298nGen } from "./generators/esp32/arduino/l298nGen";
import { forBlock as arduinoFireGen } from "./generators/esp32/arduino/fireGen";
import { forBlock as arduinoBlynkGen } from "./generators/esp32/arduino/blynkGen";
import { forBlock as arduinoHallGen } from "./generators/esp32/arduino/hallGen";


import { motionBlocks } from "./blocks/motionBlocks";
import { looksBlocks } from "./blocks/looksBlocks";
import { eventBlocks } from "./blocks/eventBlocks";
import { controlBlocks } from "./blocks/controlBlocks";
import { sensingBlocks } from "./blocks/sensingBlocks";
import { soundBlocks } from "./blocks/soundBlocks";
import { techyblocksToolbox } from "./techyblocksToolbox";
import { BlockInterpreter } from "./engine/BlockInterpreter";
import { StageRenderer } from "./engine/StageRenderer";
import spriteStore from "./engine/SpriteStore";
import { Extension } from "./extensions";
import { initBuiltInExtensions } from "./extensions/index";

import { toolbox as espToolbox, getFilteredToolbox, getPicoToolbox } from "./toolbox";
import { addCustomToolbar } from "./ui/customToolbar";
import { initBlockSearch, refreshBlockSearch } from "./ui/blockSearch";
import { initExtensionsModal } from "./ui/ExtensionsModal";

import { initUploadPanel, updateUploadButtonForLanguage } from "./upload/uploadPanel";
import { buildESP32Code } from "./upload/codeBuilder";
import { buildPicoCode } from "./upload/picoCodeBuilder";
import { buildArduinoSketch, emptyArduinoSketch } from "./upload/arduinoCodeBuilder";
import { getCurrentBoard, setCurrentBoard } from "./services/boardConfig";
import { initModeSwitcher, getCurrentMode, showToast, syncBoardSelection } from "./ui/ModeSwitcher";
import { initSpritePanel, setDraggedBlockState, mergeDraggedBlocksIntoSprite } from "./ui/SpritePanel";
import { SPRITE_LIBRARY } from "./ui/spriteLibrary";
import { closeSpriteChooser } from "./ui/SpriteChooserModal";
import { initConnectButton } from "./ui/ConnectModal";
import { initSerialMonitor } from "./ui/SerialMonitor";
import { refreshIcons } from "./ui/icons";
import { isFeatureEnabled } from "./services/featureFlags";
import { showSubscriptionModal } from "./ui/SubscriptionModal";
import { isPhaseEnabled, isFeaturePhaseEnabled, refreshPhaseCache, isSensorSubEnabled, isActuatorSubEnabled, isCategoryEnabled } from "./productionPhase";
import "./index.css";
import "./output.css";

// ── Saturated, Rich Blockly Palette ─────────────────
try {
  if (Blockly.utils?.colour?.setHsvSaturation) {
    Blockly.utils.colour.setHsvSaturation(0.85);
    Blockly.utils.colour.setHsvValue(0.90);
  }
} catch (_) {}




// ── Blockly Theme Definitions ────────────────────────
const BLOCKLY_THEMES = {
  light: Blockly.Theme.defineTheme('techyguide-light', {
    base: Blockly.Themes.Classic,
    blockStyles: {
      logic_blocks: { colourPrimary: '#2563EB', colourSecondary: '#1D4ED8', colourTertiary: '#1E40AF' },
      loop_blocks: { colourPrimary: '#7C3AED', colourSecondary: '#6D28D9', colourTertiary: '#5B21B6' },
      math_blocks: { colourPrimary: '#16A34A', colourSecondary: '#15803D', colourTertiary: '#166534' },
      text_blocks: { colourPrimary: '#EA580C', colourSecondary: '#C2410C', colourTertiary: '#9A3412' },
      variable_blocks: { colourPrimary: '#EA580C', colourSecondary: '#C2410C', colourTertiary: '#9A3412' },
      list_blocks: { colourPrimary: '#C2410C', colourSecondary: '#9A3412', colourTertiary: '#7C2D12' },
      procedure_blocks: { colourPrimary: '#DB2777', colourSecondary: '#BE185D', colourTertiary: '#9D174D' },
      colour_blocks: { colourPrimary: '#0891B2', colourSecondary: '#0E7490', colourTertiary: '#155E75' },
      hat_blocks: { colourPrimary: '#E11D48', colourSecondary: '#BE123C', colourTertiary: '#9F1239' },
    },
    categoryStyles: {
      logic_category: { colour: '#2563EB' },
      loop_category: { colour: '#7C3AED' },
      math_category: { colour: '#16A34A' },
      text_category: { colour: '#EA580C' },
      variable_category: { colour: '#EA580C' },
      list_category: { colour: '#C2410C' },
      procedure_category: { colour: '#DB2777' },
    },
    componentStyles: {
      workspaceBackgroundColour: 'transparent',
      toolboxBackgroundColour:   '#E3F2FD',
      flyoutBackgroundColour:    '#EFF6FF',
      scrollbarColour: '#90CAF9',
    },
  }),
  dark: Blockly.Theme.defineTheme('techyguide-dark', {
    base: Blockly.Themes.Classic,
    blockStyles: {
      logic_blocks: { colourPrimary: '#3B82F6', colourSecondary: '#2563EB', colourTertiary: '#1D4ED8' },
      loop_blocks: { colourPrimary: '#8B5CF6', colourSecondary: '#7C3AED', colourTertiary: '#6D28D9' },
      math_blocks: { colourPrimary: '#22C55E', colourSecondary: '#16A34A', colourTertiary: '#15803D' },
      text_blocks: { colourPrimary: '#F97316', colourSecondary: '#EA580C', colourTertiary: '#C2410C' },
      variable_blocks: { colourPrimary: '#F97316', colourSecondary: '#EA580C', colourTertiary: '#C2410C' },
      list_blocks: { colourPrimary: '#EA580C', colourSecondary: '#C2410C', colourTertiary: '#9A3412' },
      procedure_blocks: { colourPrimary: '#EC4899', colourSecondary: '#DB2777', colourTertiary: '#BE185D' },
      colour_blocks: { colourPrimary: '#06B6D4', colourSecondary: '#0891B2', colourTertiary: '#0E7490' },
      hat_blocks: { colourPrimary: '#F43F5E', colourSecondary: '#E11D48', colourTertiary: '#BE123C' },
    },
    componentStyles: {
      workspaceBackgroundColour: 'transparent',
      toolboxBackgroundColour: '#0F172A',
      flyoutBackgroundColour: '#0F172A',
      scrollbarColour: '#475569',
    },
  }),
};

function applyBlocklyTheme(theme) {
  const next = theme === 'dark' ? BLOCKLY_THEMES.dark : BLOCKLY_THEMES.light;
  ws.setTheme(next);
}

// ── Register Block Definitions ──────────────────────
Blockly.common.defineBlocks(printblock);
Blockly.common.defineBlocks(textBlocks);
Blockly.common.defineBlocks(waitBlocks);
Blockly.common.defineBlocks(pinBlocks);

Blockly.common.defineBlocks(actuatorBlocks);
Blockly.common.defineBlocks(sensorBlocks);
Blockly.common.defineBlocks(communicationBlocks);
Blockly.common.defineBlocks(inputBlocks);
Blockly.common.defineBlocks(terminalBlocks);
Blockly.common.defineBlocks(notificationBlocks);
Blockly.common.defineBlocks(cameraBlocks);
Blockly.common.defineBlocks(iotBlocks);
Blockly.common.defineBlocks(wifiBlocks);
Blockly.common.defineBlocks(httpBlocks);
Blockly.common.defineBlocks(mqttBlocks);
Blockly.common.defineBlocks(dabbleBlocks);
Blockly.common.defineBlocks(esp32CoreBlocks);
Blockly.common.defineBlocks(mpuBlocks);
Blockly.common.defineBlocks(heartBlocks);
Blockly.common.defineBlocks(lcdBlocks);
Blockly.common.defineBlocks(l298nBlocks);
Blockly.common.defineBlocks(fireBlocks);
Blockly.common.defineBlocks(blynkBlocks);
Blockly.common.defineBlocks(hallBlocks);


// ── Phase-gated Generator Registration System ──
export function registerGatedGenerators() {
  // Python generators (Core & Phase 1 always registered)
  Object.assign(pythonGenerator.forBlock, printGen);
  Object.assign(pythonGenerator.forBlock, addTextGen);
  Object.assign(pythonGenerator.forBlock, waitGen);
  Object.assign(pythonGenerator.forBlock, pinGen);
  Object.assign(pythonGenerator.forBlock, controlGen);
  Object.assign(pythonGenerator.forBlock, esp32CoreGen);
  Object.assign(pythonGenerator.forBlock, inputGen);
  Object.assign(pythonGenerator.forBlock, sensorGen);       // sensorGen handles core sensors
  Object.assign(pythonGenerator.forBlock, actuatorGen);     // actuatorGen handles core actuators
  Object.assign(pythonGenerator.forBlock, hallGen);         // analog Hall effect sensor blocks
  Object.assign(pythonGenerator.forBlock, terminalGen);

  // Phase 2 sensor generators registered dynamically based on schedule
  if (isPhaseEnabled(2)) {
    if (isSensorSubEnabled("🔥 Fire & Gas")) {
      Object.assign(pythonGenerator.forBlock, fireGen);
    }
    Object.assign(pythonGenerator.forBlock, heartGen); // Heart blocks are defined but not in toolbox
    if (isSensorSubEnabled("📐 Motion (MPU6050)")) {
      Object.assign(pythonGenerator.forBlock, mpuGen);
    }
  }

  // Phase 3 actuator/notification generators
  if (isPhaseEnabled(3)) {
    if (isActuatorSubEnabled("Notification")) {
      Object.assign(pythonGenerator.forBlock, notificationGen);
    }
  }

  // Motor generators (L298 / L298N)
  if (isCategoryEnabled("Motors") || isSensorSubEnabled("🏎️ Motor Driver (L298N)")) {
    Object.assign(pythonGenerator.forBlock, l298nGen);
  }
  if (isPhaseEnabled(4)) {
    if (isCategoryEnabled("Displays")) {
      Object.assign(pythonGenerator.forBlock, lcdGen);
    }
  }

  // Phase 5 communication & IoT generators
  if (isPhaseEnabled(5)) {
    if (isCategoryEnabled("Comms & IoT")) {
      Object.assign(pythonGenerator.forBlock, communicationGen);
      Object.assign(pythonGenerator.forBlock, iotGen);
      Object.assign(pythonGenerator.forBlock, wifiGen);
      Object.assign(pythonGenerator.forBlock, httpGen);
      Object.assign(pythonGenerator.forBlock, mqttGen);
      Object.assign(pythonGenerator.forBlock, blynkGen);
    }
  }

  // Phase 6 advanced/ML generators
  if (isPhaseEnabled(6)) {
    Object.assign(pythonGenerator.forBlock, cameraGen);
    if (isCategoryEnabled("Dabble")) {
      Object.assign(pythonGenerator.forBlock, dabbleGen);
    }
  }

  // Arduino C++ generator registrations (unlocked when arduinoGen feature is enabled)
  if (isFeaturePhaseEnabled('arduinoGen')) {
    Object.assign(arduinoGenerator.forBlock, arduinoControlGen);
    Object.assign(arduinoGenerator.forBlock, arduinoCoreGen);
    Object.assign(arduinoGenerator.forBlock, arduinoActuatorGen);
    Object.assign(arduinoGenerator.forBlock, arduinoSensorGen);
    Object.assign(arduinoGenerator.forBlock, arduinoHallGen);
    Object.assign(arduinoGenerator.forBlock, arduinoCommunicationGen);
    Object.assign(arduinoGenerator.forBlock, arduinoInputGen);
    Object.assign(arduinoGenerator.forBlock, arduinoTerminalGen);
    Object.assign(arduinoGenerator.forBlock, arduinoNotificationGen);
    Object.assign(arduinoGenerator.forBlock, arduinoCameraGen);
    Object.assign(arduinoGenerator.forBlock, arduinoIotGen);
    Object.assign(arduinoGenerator.forBlock, arduinoWifiGen);
    Object.assign(arduinoGenerator.forBlock, arduinoHttpGen);
    Object.assign(arduinoGenerator.forBlock, arduinoMqttGen);
    Object.assign(arduinoGenerator.forBlock, arduinoDabbleGen);
    Object.assign(arduinoGenerator.forBlock, arduinoMpuGen);
    Object.assign(arduinoGenerator.forBlock, arduinoHeartGen);
    Object.assign(arduinoGenerator.forBlock, arduinoLcdGen);
    Object.assign(arduinoGenerator.forBlock, arduinoL298nGen);
    Object.assign(arduinoGenerator.forBlock, arduinoFireGen);
    Object.assign(arduinoGenerator.forBlock, arduinoBlynkGen);
  }
}

// Initial generator registration on startup
registerGatedGenerators();


// Arduino generators for General blocks (shared between Scratch and ESP32 toolboxes)
arduinoGenerator.forBlock['print_block'] = function (block, generator) {
  const text = generator.valueToCode(block, 'TEXT', 99) || '""';
  return `Serial.println(${text});\n`;
};
arduinoGenerator.forBlock['add_text'] = function (block, generator) {
  const text = generator.valueToCode(block, 'TEXT', 99) || '""';
  return `Serial.print(${text});\n`;
};
arduinoGenerator.forBlock['wait_block'] = function (block) {
  const time = block.getFieldValue('TIME') || '1';
  return `delay((long)(${time} * 1000));\n`;
};
arduinoGenerator.forBlock['digital_write'] = function (block, generator) {
  const pin = block.getFieldValue('PIN');
  const state = block.getFieldValue('STATE') === '1' ? 'HIGH' : 'LOW';
  generator.definitions_[`pinMode_${pin}`] = `pinMode(${pin}, OUTPUT);`;
  return `digitalWrite(${pin}, ${state});\n`;
};

// ── Fallback generators (Scratch-only blocks → safe no-ops) ──
// Registered CONDITIONALLY: never overwrites a real generator
for (const [type, fn] of Object.entries(fallbackGen)) {
  if (!pythonGenerator.forBlock[type]) {
    pythonGenerator.forBlock[type] = fn;
  }
}
for (const [type, fn] of Object.entries(arduinoFallbackGen)) {
  if (!arduinoGenerator.forBlock[type]) {
    arduinoGenerator.forBlock[type] = fn;
  }
}

// ── Safety nets: prevent crashes from ANY future unmapped block ──
installSafetyNet(pythonGenerator, "Python");
installSafetyNet(arduinoGenerator, "Arduino");

// Expose diagnostic to browser console: reportGeneratorCoverage(pythonGenerator)
window._reportPyCoverage = () => reportGeneratorCoverage(pythonGenerator);
window._reportArdCoverage = () => reportGeneratorCoverage(arduinoGenerator);

Blockly.common.defineBlocks(motionBlocks);
Blockly.common.defineBlocks(looksBlocks);
Blockly.common.defineBlocks(soundBlocks);
Blockly.common.defineBlocks(eventBlocks);
Blockly.common.defineBlocks(controlBlocks);
Blockly.common.defineBlocks(sensingBlocks);

// ── Load built-in extensions + register their blocks ─────────────────
initBuiltInExtensions();
Extension.getAllBlockDefinitions().forEach((def) => {
  const blockName = def.type;
  Blockly.common.defineBlocks({
    [blockName]: {
      init: function () {
        this.jsonInit(def);
      },
    },
  });
});

// ── Inject Blockly Workspace ────────────────────────
const blocklyDiv = document.getElementById("blocklyDiv");

const ws = Blockly.inject(blocklyDiv, {
  renderer: 'zelos',
  theme: BLOCKLY_THEMES.light,
  toolbox: Extension.applyExtensionsToToolbox(techyblocksToolbox),
  grid: {
    spacing: 24,
    length: 2,
    colour: '#94a3b8',
    snap: false
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
    pinch: true
  }
});

addCustomToolbar(ws);
initBlockSearch(ws, Extension.applyExtensionsToToolbox(techyblocksToolbox));
initExtensionsModal(ws);

// ── Robust workspace resize handling ─────────────────
// 1) Recalculate workspace whenever the container size changes
const ro = new ResizeObserver(() => { try { Blockly.svgResize(ws); } catch (e) {} });
ro.observe(blocklyDiv);

// 2) Also listen to window resize (fallback + robustness)
window.addEventListener('resize', () => { try { Blockly.svgResize(ws); } catch (e) {} });

// 3) Force one initial resize after the browser has finished layout
requestAnimationFrame(() => { requestAnimationFrame(() => { try { Blockly.svgResize(ws); } catch (e) {} }); });

// ── Pane Toggle logic ───────────────────────────────
const togglePaneBtn = document.getElementById("togglePaneBtn");
if (togglePaneBtn) {
  togglePaneBtn.addEventListener("click", () => {
    togglePaneBtn.classList.toggle("is-collapsed");
    
    const animationPane = document.getElementById("animationPane");
    const boardPane = document.getElementById("boardPane");

    if (animationPane) animationPane.classList.toggle("is-hidden");
    if (boardPane) boardPane.classList.toggle("is-hidden");

    // Trigger Blockly resize smoothly alongside the CSS transition
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
      Blockly.svgResize(ws);
      if (time - start < 350) requestAnimationFrame(animate);
    });
  });
}


// ── Stage Renderer + Interpreter ────────────────────
const stageContainer = document.getElementById("stageCanvas");
const renderer = new StageRenderer(stageContainer);
const interpreter = new BlockInterpreter(spriteStore, ws);
interpreter.setRenderer(renderer);

// Wire extension runtimes into the interpreter so extension blocks can execute.
Extension.list().forEach((ext) => {
  if (ext.runtime) {
    interpreter.registerExtensionRuntime(ext.id, ext.runtime);
  }
});

(async () => {
  await renderer.init();

  // Scratch always starts with a default sprite so the stage is not empty.
  // If no sprites were restored (e.g. fresh load), add the default cat.
  if (spriteStore.getAllSprites().length === 0) {
    spriteStore.addSprite("Cat");
  }

  spriteStore.on((event) => {
    renderer.setSprites(spriteStore.getAllSprites());
  });
  renderer.setSprites(spriteStore.getAllSprites());

  let _isLoadingWorkspace = false;

  spriteStore.on((event, sprite) => {
    if (event === "select" && sprite) {
      _isLoadingWorkspace = true;
      try {
        ws.clear();
        if (sprite.workspaceState) {
          Blockly.serialization.workspaces.load(sprite.workspaceState, ws);
        }
      } catch (err) {
        console.warn('[workspace] Error loading sprite workspace:', err);
      } finally {
        _isLoadingWorkspace = false;
      }
    }
  });

  ws.addChangeListener((e) => {
      if (e.isUiEvent || ws.isDragging() || _isLoadingWorkspace) return;
      
      if (getCurrentMode() === "techyblocks") {
          const selectedId = spriteStore.selectedSpriteId;
          if (selectedId) {
              const state = Blockly.serialization.workspaces.save(ws);
              spriteStore.saveWorkspaceState(selectedId, state);
          }
      }
  });

  // ── TechyBlocks Mode: Click on any block to run it independently (Scratch standard) ──
  ws.addChangeListener((e) => {
    if (getCurrentMode() !== 'techyblocks') return;
    if (e.type === Blockly.Events.CLICK && e.targetType === 'block') {
      const block = ws.getBlockById(e.blockId);
      if (block && !block.isInFlyout) {
        interpreter.runStack(block);
      }
    }
  });


  // ── Universal Block Drag-to-Sprite Copy Handler ──
  const blocklyContainer = document.getElementById('blocklyDiv');
  if (blocklyContainer) {
    blocklyContainer.addEventListener('pointerdown', (downEvt) => {
      if (getCurrentMode() !== 'techyblocks') return;
      if (downEvt.button !== 0) return; // only left click / primary touch

      const blockGroup = downEvt.target.closest('.blocklyDraggable');
      if (!blockGroup) return;

      // Find the Blockly block instance
      const allBlocks = ws.getAllBlocks(false);
      const clickedBlock = allBlocks.find(b => b.getSvgRoot() === blockGroup);
      if (!clickedBlock || clickedBlock.isInFlyout) return;

      const startX = downEvt.clientX;
      const startY = downEvt.clientY;
      let isDraggingBlock = false;
      let lastHoveredTargetId = null;

      const onPointerMove = (moveEvt) => {
        if (!isDraggingBlock) {
          const dx = moveEvt.clientX - startX;
          const dy = moveEvt.clientY - startY;
          if (Math.sqrt(dx * dx + dy * dy) > 6) {
            isDraggingBlock = true;
            try {
              const blockJson = Blockly.serialization.blocks.save(clickedBlock, {
                addCoordinates: true,
                saveIds: false,
              });
              setDraggedBlockState(blockJson);
            } catch (err) {
              console.warn('[drag-to-sprite] serialization error:', err);
            }
          }
        }

        if (isDraggingBlock) {
          let hoveredSpriteId = null;
          let isHoveringAddBtn = false;
          let hoveredChooserItem = null;

          const el = document.elementFromPoint(moveEvt.clientX, moveEvt.clientY);

          // 1. Check if hovering over a thumbnail in the sprite panel
          const thumb = el?.closest('.sprite-thumb');
          if (thumb && thumb.dataset.spriteId) {
            hoveredSpriteId = thumb.dataset.spriteId;
          }

          // 2. Check if hovering over another sprite on the stage canvas
          if (!hoveredSpriteId && renderer) {
            const canvasSprite = renderer.getSpriteAtClientPoint(moveEvt.clientX, moveEvt.clientY);
            if (canvasSprite && canvasSprite.id) {
              hoveredSpriteId = canvasSprite.id;
            }
          }

          // 3. Check if hovering over the "+ Choose a Sprite" button
          if (!hoveredSpriteId) {
            const addBtn = el?.closest('#addSpriteBtn, .add-sprite-fab');
            if (addBtn) isHoveringAddBtn = true;
          }

          // 4. Check if hovering over an item in the Choose a Sprite modal
          if (!hoveredSpriteId && !isHoveringAddBtn) {
            hoveredChooserItem = el?.closest('.chooser-item');
          }

          // Don't treat the currently selected sprite as a copy target
          if (hoveredSpriteId === spriteStore.selectedSpriteId) {
            hoveredSpriteId = null;
          }

          // Update sprite target highlights
          if (hoveredSpriteId !== lastHoveredTargetId) {
            if (lastHoveredTargetId) {
              const prevThumb = document.querySelector(`.sprite-thumb[data-sprite-id="${lastHoveredTargetId}"]`);
              if (prevThumb) prevThumb.classList.remove('sprite-thumb--drop-target');
            }
            if (hoveredSpriteId) {
              const targetThumb = document.querySelector(`.sprite-thumb[data-sprite-id="${hoveredSpriteId}"]`);
              if (targetThumb) targetThumb.classList.add('sprite-thumb--drop-target');
              if (renderer) renderer.setDropTargetSprite(hoveredSpriteId);
            } else {
              if (renderer) renderer.setDropTargetSprite(null);
            }
            lastHoveredTargetId = hoveredSpriteId;
          }

          // Update Add Sprite FAB button highlight
          const addFab = document.getElementById('addSpriteBtn') || document.querySelector('.add-sprite-fab');
          if (addFab) {
            addFab.classList.toggle('add-sprite-fab--drop-target', isHoveringAddBtn);
          }

          // Update Chooser Item highlight in Choose a Sprite modal
          document.querySelectorAll('.chooser-item--drop-target').forEach(ci => {
            if (ci !== hoveredChooserItem) ci.classList.remove('chooser-item--drop-target');
          });
          if (hoveredChooserItem) {
            hoveredChooserItem.classList.add('chooser-item--drop-target');
          }
        }
      };

      const onPointerUp = (upEvt) => {
        window.removeEventListener('pointermove', onPointerMove, true);
        window.removeEventListener('pointerup', onPointerUp, true);

        if (lastHoveredTargetId) {
          const prevThumb = document.querySelector(`.sprite-thumb[data-sprite-id="${lastHoveredTargetId}"]`);
          if (prevThumb) prevThumb.classList.remove('sprite-thumb--drop-target');
          if (renderer) renderer.setDropTargetSprite(null);
          lastHoveredTargetId = null;
        }

        const addFab = document.getElementById('addSpriteBtn') || document.querySelector('.add-sprite-fab');
        if (addFab) addFab.classList.remove('add-sprite-fab--drop-target');

        document.querySelectorAll('.chooser-item--drop-target').forEach(ci => {
          ci.classList.remove('chooser-item--drop-target');
        });

        if (isDraggingBlock) {
          let targetSpriteId = null;
          const el = document.elementFromPoint(upEvt.clientX, upEvt.clientY);

          // 1. Check if dropped on a thumbnail in the sprite panel
          const thumb = el?.closest('.sprite-thumb');
          if (thumb && thumb.dataset.spriteId) {
            targetSpriteId = thumb.dataset.spriteId;
          }

          // 2. Check if dropped directly on another sprite on the stage canvas
          if (!targetSpriteId && renderer) {
            const canvasSprite = renderer.getSpriteAtClientPoint(upEvt.clientX, upEvt.clientY);
            if (canvasSprite && canvasSprite.id) {
              targetSpriteId = canvasSprite.id;
            }
          }

          // 3. Check if dropped onto a sprite item in the Choose a Sprite modal
          const chooserItem = el?.closest('.chooser-item');
          if (!targetSpriteId && chooserItem && chooserItem.dataset.spriteName) {
            const name = chooserItem.dataset.spriteName;
            const spriteDef = SPRITE_LIBRARY.find(s => s.name === name);
            if (spriteDef) {
              const count = spriteStore.getAllSprites().length + 1;
              const displayName = `${spriteDef.name}${count > 1 ? count : ''}`;
              const newSprite = spriteStore.addSprite(displayName, { costumeSrc: spriteDef.svg });
              if (newSprite) {
                targetSpriteId = newSprite.id;
                closeSpriteChooser();
              }
            }
          }

          // 4. Check if dropped onto the "+ Choose a Sprite" button
          const addBtn = el?.closest('#addSpriteBtn, .add-sprite-fab');
          if (!targetSpriteId && addBtn) {
            const existingNames = new Set(spriteStore.getAllSprites().map(s => s.name));
            const nextDef = SPRITE_LIBRARY.find(s => !existingNames.has(s.name)) || SPRITE_LIBRARY[0];
            const count = spriteStore.getAllSprites().length + 1;
            const displayName = `${nextDef.name}${count > 1 ? count : ''}`;
            const newSprite = spriteStore.addSprite(displayName, { costumeSrc: nextDef.svg });
            if (newSprite) {
              targetSpriteId = newSprite.id;
            }
          }

          const currentSelectedId = spriteStore.selectedSpriteId;
          if (targetSpriteId && targetSpriteId !== currentSelectedId) {
            const copied = mergeDraggedBlocksIntoSprite(targetSpriteId);
            if (copied) {
              // Flash copy success on thumbnail
              const targetThumb = document.querySelector(`.sprite-thumb[data-sprite-id="${targetSpriteId}"]`);
              if (targetThumb) {
                targetThumb.classList.add('sprite-thumb--copy-success');
                setTimeout(() => targetThumb.classList.remove('sprite-thumb--copy-success'), 600);
              }

              // Flash copy success on stage canvas
              if (renderer) {
                renderer.flashCopySuccess(targetSpriteId);
              }

              const targetSprite = spriteStore.getSpriteById(targetSpriteId);
              const name = targetSprite?.name || 'Sprite';
              showToast(`🧩 Code copied to "${name}"!`);
            }
          }
          setDraggedBlockState(null);
        }
      };

      window.addEventListener('pointermove', onPointerMove, true);
      window.addEventListener('pointerup', onPointerUp, true);
    }, true);
  }

  // Expose global handlers so the inline onclick attributes in index.html
  // always fire (avoids PixiJS canvas swallowing the click events).
  window.__greenFlag = function() {
      console.log('[DIAG-GF] green flag button clicked');
      spriteStore.resetAll();
      console.log('[DIAG-GF] sprites reset. selectedSprite=', spriteStore.getSelectedSprite()?.name, 'allSprites=', spriteStore.getAllSprites().length);
      interpreter.startAll();
      console.log('[DIAG-GF] startAll() returned. threads=', interpreter.threads.length);
  };

  window.__stopAll = function() {
      interpreter.stopAll();
  };

  window.__toggleStageMaximize = function() {
      const container = document.getElementById('stageContainer');
      const btn = document.getElementById('maximizeStageBtn');
      if (!container || !btn) return;

      const isMax = container.classList.toggle('stage-maximized');
      btn.classList.toggle('is-maximized', isMax);

      if (isMax) {
          btn.title = "Restore Stage";
          btn.innerHTML = `<i data-lucide="minimize-2" stroke-width="2" style="width: 15px; height: 15px; pointer-events: none;"></i>`;
      } else {
          btn.title = "Maximize Stage";
          btn.innerHTML = `<i data-lucide="maximize-2" stroke-width="2" style="width: 15px; height: 15px; pointer-events: none;"></i>`;
      }
      try { refreshIcons(); } catch (e) {}
  };

  // Exit maximize on Escape key
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
          const container = document.getElementById('stageContainer');
          if (container && container.classList.contains('stage-maximized')) {
              window.__toggleStageMaximize();
          }
      }
  });

  // Keep the addEventListener listeners too (harmless if they fire as well)
  document.getElementById("stopBtn")?.addEventListener("click", () => {
      interpreter.stopAll();
  });


  initSpritePanel();

  // Expose showToast globally so SpritePanel can use it for copy feedback
  window.__showToast = showToast;
})();

// ── Mode Switcher ───────────────────────────────────
initModeSwitcher(
  // onModeChange callback
  (newMode) => {
    console.log("Mode switched to:", newMode);

    if (newMode === "techyblocks") {
      ws.updateToolbox(Extension.applyExtensionsToToolbox(techyblocksToolbox));
      addCustomToolbar(ws);
      refreshBlockSearch(Extension.applyExtensionsToToolbox(techyblocksToolbox));

      ws.clear();
      const activeSprite = spriteStore.getSelectedSprite();
      if (activeSprite && activeSprite.workspaceState) {
          Blockly.serialization.workspaces.load(activeSprite.workspaceState, ws);
      }
    } else {
      const board = getCurrentBoard();
      const currentToolbox = board === 'pico' ? getPicoToolbox() : getFilteredToolbox();
      ws.updateToolbox(currentToolbox);
      addCustomToolbar(ws);
      refreshBlockSearch(currentToolbox);
      updateStarterBlocks(ws);

      ws.clear(); 

      // Auto-update the code panel once on entering board mode
      setTimeout(() => {
        regenerateCode();
        const toolbox = ws.getToolbox();
        if (toolbox) {
          const items = toolbox.getToolboxItems();
          const targetName = board === 'pico' ? 'Raspberry Pi Core' : 'ESP32 Core';
          const espItem = items.find(i => i.getName && (i.getName() === targetName || i.getName() === 'ESP32 Core' || i.getName() === 'Raspberry Pi Core'));
          if (espItem) {
            toolbox.setSelectedItem(espItem);
          }
        }
      }, 100);
    }
  },
  // onViewChange callback (Stage / Code toggle from header pills)
  (view) => {
    console.log("View switched to:", view);
    setBoardView(view);
  }
);

initConnectButton();

// ── Wire header toolbar (Save, Import, Undo, Redo) ──
(function initHeaderToolbar() {
  document.getElementById('headerSaveBtn')?.addEventListener('click', () => saveProject(ws));

  document.getElementById('headerImportBtn')?.addEventListener('click', () => importBlocks(ws));

  const undoBtn = document.getElementById('headerUndoBtn');
  const redoBtn = document.getElementById('headerRedoBtn');

  undoBtn?.addEventListener('click', () => ws.undo(false));
  redoBtn?.addEventListener('click', () => ws.undo(true));

  function updateUndoRedo() {
    if (undoBtn) undoBtn.disabled = !ws.getUndoStack?.().length;
    if (redoBtn) redoBtn.disabled = !ws.getRedoStack?.().length;
  }

  ws.addChangeListener(() => updateUndoRedo());
  setTimeout(updateUndoRedo, 500);
})();

// ══════════════════════════════════════════════════════
//  CODE EDITOR — Dual Language System
// ══════════════════════════════════════════════════════

let currentCodeLang = 'arduino'; // 'arduino' | 'micropython'

const codeTextarea = document.getElementById("codeContent");
const codeGutter = document.getElementById("codeGutter");
const codeLineCount = document.getElementById("codeLineCount");
const codeFileNameEl = document.getElementById("codeFileName");
const downloadBtnLabel = document.getElementById("downloadBtnLabel");

// Provide the code from textarea to the upload panel
initUploadPanel(
  () => codeTextarea?.value || '',
  () => currentCodeLang,
  () => ws
);

// ── Stage / Code View Toggle (driven by header pills) ──
const boardStageView = document.getElementById("boardStageView");
const boardCodeView = document.getElementById("boardCodeView");
const boardStageSlot = document.getElementById("boardStageSlot");
const stageCanvasContainer = document.getElementById("stageContainer");

function setBoardView(view) {
  const animationPane = document.getElementById("animationPane");
  const boardPane = document.getElementById("boardPane");
  const stageControls = document.getElementById('stageControls');

  if (view === 'stage') {
    if (animationPane) animationPane.style.display = 'flex';
    if (boardPane) boardPane.style.display = 'none';
    if (stageControls) stageControls.style.display = 'flex';
  } else {
    if (animationPane) animationPane.style.display = 'none';
    if (boardPane) boardPane.style.display = 'flex';
    if (stageControls) stageControls.style.display = 'none';

    if (boardCodeView) boardCodeView.style.display = 'flex';
    if (boardStageView) boardStageView.style.display = 'none';
    
    regenerateCode();
  }
}

// ── Arduino / MicroPython Language Toggle ───────────
const envDropdown = document.getElementById("envDropdown");

function setCodeLanguage(lang) {
  if (!isFeatureEnabled('micropythonGen') && lang === 'micropython') {
    showSubscriptionModal();
    if (envDropdown) envDropdown.value = currentCodeLang;
    return;
  }
  if (!isFeatureEnabled('arduinoGen') && lang === 'arduino') {
    showSubscriptionModal();
    if (envDropdown) envDropdown.value = currentCodeLang;
    return;
  }

  currentCodeLang = lang;

  if (envDropdown && envDropdown.value !== lang) {
    envDropdown.value = lang;
  }

  if (lang === 'arduino') {
    if (codeFileNameEl) codeFileNameEl.textContent = 'sketch.ino';
    if (downloadBtnLabel) downloadBtnLabel.textContent = 'Download .ino';
  } else {
    if (codeFileNameEl) codeFileNameEl.textContent = 'main.py';
    if (downloadBtnLabel) downloadBtnLabel.textContent = 'Download .py';
  }
  updateUploadButtonForLanguage(lang);
  regenerateCode();
}

// Hide Arduino option in language dropdown for Phase 1-2
// Arduino dropdown visibility is driven by the date-gated arduinoGen flag.
if (envDropdown && !isFeaturePhaseEnabled('arduinoGen')) {
  const arduinoOpt = envDropdown.querySelector('option[value="arduino"]');
  if (arduinoOpt) arduinoOpt.style.display = 'none';
}
envDropdown?.addEventListener('change', (e) => setCodeLanguage(e.target.value));

// ── Board Selector ───────────────────────────────────
const boardDropdown = document.getElementById('boardDropdown');

function updateToolboxForBoard(board) {
  if (getCurrentMode() === 'techyblocks') return;
  const tbx = board === 'pico' ? getPicoToolbox() : getFilteredToolbox();
  ws.updateToolbox(tbx);
  addCustomToolbar(ws);
  refreshBlockSearch(tbx);
  updateStarterBlocks(ws);
}

boardDropdown?.addEventListener('change', (e) => {
  const board = e.target.value;
  setCurrentBoard(board);
  syncBoardSelection(board);
  updateToolboxForBoard(board);
  updateStarterBlocks(ws);
  regenerateCode();

  if (board === 'pico') {
    showToast('🏎️ Te-Bot mode (Raspberry Pi Pico)');
  } else {
    showToast('🤖 I-Bot mode (ESP32)');
  }
});

// ── Code Generation ─────────────────────────────────
import { getWirelessConfig } from './upload/otaUpload';

function generateCurrentCode() {
  // Pre-flight validation: pin conflicts, orphans, coverage (never blocks execution)
  const gen = currentCodeLang === 'arduino' ? arduinoGenerator : pythonGenerator;
  const report = fullValidation(ws, gen);
  if (report.errors.length) {
    console.error('[codegen] Errors:', report.errors);
  }
  if (report.warnings.length) {
    console.warn('[codegen] Warnings:', report.warnings);
  }

  if (currentCodeLang === 'arduino') {
    // When wireless upload is enabled with WiFi credentials, inject OTA code
    const cfg = getWirelessConfig();
    const otaConfig = (cfg.enabled && cfg.wifiSsid)
      ? {
          ssid: cfg.wifiSsid,
          pass: cfg.wifiPass,
          hostname: cfg.hostname || 'techyguide',
          staticIp: cfg.useStaticIp ? cfg.staticIp : '',
          gateway: cfg.useStaticIp ? cfg.gateway : '',
          subnet: cfg.useStaticIp ? cfg.subnet : '',
        }
      : null;
    return buildArduinoSketch(ws, otaConfig);
  } else {
    // Only generate code from esp32_when_starts blocks — orphan blocks outside are ignored
    pythonGenerator.init(ws);
    let raw = "";
    const topBlocks = ws.getTopBlocks(true);
    for (const block of topBlocks) {
      if (block.type === "esp32_when_starts") {
        raw += pythonGenerator.blockToCode(block);
      }
    }
    raw = pythonGenerator.finish(raw);
    // Route to Pico builder or ESP32 builder based on active board
    return getCurrentBoard() === 'pico' ? buildPicoCode(raw) : buildESP32Code(raw);
  }
}

function updateGutter(code) {
  const lines = (code || '').split('\n');

  if (codeGutter) {
    codeGutter.innerHTML = lines.map((_, i) => `<div>${i + 1}</div>`).join('');
  }

  if (codeLineCount) {
    codeLineCount.textContent = `${lines.length} line${lines.length !== 1 ? 's' : ''}`;
  }
}

function updateCodeEditor(code) {
  if (codeTextarea) {
    codeTextarea.value = code || '';
  }
  updateGutter(code);
}

function regenerateCode() {
  if (getCurrentMode() === "techyblocks") return;
  const code = generateCurrentCode();
  updateCodeEditor(code);
}

// Sync gutter when user manually edits the textarea
codeTextarea?.addEventListener('input', () => {
  updateGutter(codeTextarea.value);
});

// Sync gutter scrolling with textarea scrolling
codeTextarea?.addEventListener('scroll', () => {
  if (codeGutter) {
    codeGutter.scrollTop = codeTextarea.scrollTop;
  }
});

// Handle Tab key inside textarea for indentation
codeTextarea?.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = codeTextarea.selectionStart;
    const end = codeTextarea.selectionEnd;
    codeTextarea.value = codeTextarea.value.substring(0, start) + '  ' + codeTextarea.value.substring(end);
    codeTextarea.selectionStart = codeTextarea.selectionEnd = start + 2;
    updateGutter(codeTextarea.value);
  }
});

// ── Wireless config change → Regenerate Code ────────
// Fired by WirelessModal when the user saves settings, so the OTA block
// is injected (or removed) immediately without needing a page refresh.
document.addEventListener('techyguide-wireless-changed', () => {
  if (currentCodeLang === 'arduino') regenerateCode();
  updateUploadButtonForLanguage(currentCodeLang);
});

// ── Workspace Change → Regenerate Code ──────────────
ws.addChangeListener((e) => {
  if (e.isUiEvent || e.type === Blockly.Events.FINISHED_LOADING || ws.isDragging()) return;
  regenerateCode();
});

// ── Download Button ─────────────────────────────────
const downloadCodeBtn = document.getElementById("downloadCodeBtn");
if (downloadCodeBtn) {
  downloadCodeBtn.addEventListener("click", () => {
    if (!isFeatureEnabled('exportCode')) {
      showSubscriptionModal();
      return;
    }
    const code = codeTextarea?.value || generateCurrentCode();
    const ext = currentCodeLang === 'arduino' ? 'ino' : 'py';
    const filename = currentCodeLang === 'arduino' ? 'sketch.ino' : 'main.py';
    const blob = new Blob([code], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  });
}

// ── Project Save / Load ─────────────────────────────
import { saveProject, loadProject, importBlocks } from './project';

function initProjectButtons() {
  const header = document.getElementById('appHeader');
  if (!header) return;

  const rightSection = header.querySelector('.flex.items-center.gap-3.shrink-0');
  if (!rightSection) return;

  const saveBtn = document.createElement('button');
  saveBtn.className = 'nav-btn nav-btn--save';
  saveBtn.title = 'Save project';
  saveBtn.innerHTML = `<i data-lucide="save" style="width:16px;height:16px;"></i>`;
  saveBtn.addEventListener('click', () => saveProject(ws));

  const loadBtn = document.createElement('button');
  loadBtn.className = 'nav-btn nav-btn--load';
  loadBtn.title = 'Load project';
  loadBtn.innerHTML = `<i data-lucide="folder-open" style="width:16px;height:16px;"></i>`;
  loadBtn.addEventListener('click', () => loadProject(ws));

  rightSection.insertBefore(loadBtn, rightSection.firstChild);
  rightSection.insertBefore(saveBtn, rightSection.firstChild);
  refreshIcons();
}

initProjectButtons();

// Restore saved theme on load
const savedTheme = localStorage.getItem('techyguide-theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  applyBlocklyTheme(savedTheme);
  renderer.setThemeBackground(savedTheme === 'dark');
}

// Listen for theme changes from the ModeSwitcher theme button
document.addEventListener('techyguide-themechange', (e) => {
  const theme = e.detail?.theme || 'light';
  applyBlocklyTheme(theme);
  renderer.setThemeBackground(theme === 'dark');
});

// Initial icon render
refreshIcons();

// Initialize serial monitor
initSerialMonitor();
refreshIcons();

// ── Universal Modal Close System ─────────────────────
// Ensures close buttons and backdrop/ESC clicks work 100% reliably across all modals.
(function initGlobalModalClose() {
  document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest(
      '.modal-close, .board-modal-close, .modal-close-btn, #wirelessModalClose, #connectModalClose, #closeSubscriptionBtn, #closeBoardModalBtn, [data-close-modal]'
    );
    if (closeBtn) {
      e.stopPropagation();
      document.querySelectorAll('.modal-overlay.open, .board-modal-overlay.open').forEach(el => {
        el.classList.remove('open');
      });
      return;
    }

    if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('board-modal-overlay')) {
      e.target.classList.remove('open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open, .board-modal-overlay.open').forEach(el => {
        el.classList.remove('open');
      });
    }
  });
})();

// ── Phase Admin Panel disabled in company demo snapshot ──
// No manual phase unlock is available; the snapshot reflects the
// current working blocks as configured in src/services/phaseConfig.js.
