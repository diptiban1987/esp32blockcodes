// Stage Renderer
import { Application, Sprite as PixiSprite, Graphics, Text, TextStyle, Container, Texture, Assets } from 'pixi.js';
import spriteStore from './SpriteStore.js';

export class StageRenderer {
  constructor(containerEl) {
    this.containerEl = containerEl;
    this.width = 480;
    this.height = 360;
    this.sprites = [];
    this.backdrop = '#ffffff';

    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseDown = false;
    this._mouseWasClicked = false;
    this._mouseClickTimeout = null;

    this._onSpriteClick = null;
    this._onStageClick = null;
    this._spriteClickListeners = [];

    this.app = null;
    this._pixiSprites = new Map();       
    this._penContainer = null;           
    this._spriteContainer = null;        
    this._bubbleContainer = null;        
    this._bubbleObjects = new Map();     
    this._penGraphics = null;
    this._costumeCanvasCache = new Map();
    this._renderScale = 1;            // bitmap pixels per stage pixel (kept in sync with renderer.resolution)
    this._currentBackdropDef = null;  // last backdrop applied (re-applied when render scale changes)
    this._resizeObserver = null;
  }

  async init() {
    this.app = new Application();
    await this.app.init({
      width: this.width,
      height: this.height,
      background: this.backdrop,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      // The canvas is CSS-stretched to fill its pane (and near-fullscreen when
      // maximized), so autoDensity would fight the CSS sizing. Logical size
      // stays 480x360 and the bitmap resolution is managed dynamically in
      // _applyRenderScale() so the canvas renders 1:1 with the device pixels
      // it actually occupies — this is what keeps everything crisp.
      autoDensity: false,
    });

    this.containerEl.appendChild(this.app.canvas);
    this.app.canvas.style.width = '100%';
    this.app.canvas.style.height = 'auto';
    this.app.canvas.style.display = 'block';

    this._renderScale = window.devicePixelRatio || 1;
    if (typeof ResizeObserver !== 'undefined') {
      this._resizeObserver = new ResizeObserver(() => this._applyRenderScale());
      this._resizeObserver.observe(this.app.canvas);
    }
    window.addEventListener('resize', () => this._applyRenderScale());

    this._bgSprite = new PixiSprite();
    this._bgSprite.width = this.width;
    this._bgSprite.height = this.height;
    this._bgSprite.zIndex = -1;
    this.app.stage.addChild(this._bgSprite);

    this._penContainer = new Container();
    this._spriteContainer = new Container();
    this._bubbleContainer = new Container();
    this._highlightContainer = new Container();
    this.app.stage.addChild(this._penContainer);
    this.app.stage.addChild(this._spriteContainer);
    this.app.stage.addChild(this._bubbleContainer);
    this.app.stage.addChild(this._highlightContainer);

    this._penGraphics = new Graphics();
    this._penContainer.addChild(this._penGraphics);

    this._highlightGraphics = new Graphics();
    this._highlightContainer.addChild(this._highlightGraphics);

    this.app.stage.eventMode = 'static';
    this.app.stage.hitArea = this.app.screen;

    this.app.stage.on('pointermove', (e) => {
      const pos = e.global;
      this.mouseX = Math.round(pos.x - 240);
      this.mouseY = Math.round(180 - pos.y);
      if (e.buttons !== undefined && e.buttons === 0 && this.mouseDown) {
        this.mouseDown = false;
      }
    });

    const setDown = () => {
      this.mouseDown = true;
      this._mouseWasClicked = true;
      if (this._mouseClickTimeout) clearTimeout(this._mouseClickTimeout);
      this._mouseClickTimeout = setTimeout(() => {
        this._mouseWasClicked = false;
      }, 2000);
    };

    const setUp = () => {
      this.mouseDown = false;
    };

    this.app.stage.on('pointerdown', (e) => {
      setDown();
      if (e.target === this.app.stage && this._onStageClick) {
        this._onStageClick();
      }
    });
    this.app.stage.on('pointerup', setUp);
    this.app.stage.on('pointerupoutside', setUp);

    if (this.app.canvas) {
      this.app.canvas.addEventListener('pointerdown', setDown);
      this.app.canvas.addEventListener('mousedown', setDown);
      this.app.canvas.addEventListener('touchstart', setDown, { passive: true });
      this.app.canvas.addEventListener('pointerup', setUp);
      this.app.canvas.addEventListener('mouseup', setUp);
      this.app.canvas.addEventListener('touchend', setUp);
    }

    if (this.containerEl) {
      this.containerEl.addEventListener('pointerdown', setDown);
      this.containerEl.addEventListener('mousedown', setDown);
      this.containerEl.addEventListener('touchstart', setDown, { passive: true });
    }

    const stageWrapper = this.containerEl?.parentElement;
    if (stageWrapper) {
      stageWrapper.addEventListener('pointerdown', (e) => {
        if (e.target && e.target.closest && e.target.closest('#stageControls')) return;
        setDown();
      });
      stageWrapper.addEventListener('mousedown', (e) => {
        if (e.target && e.target.closest && e.target.closest('#stageControls')) return;
        setDown();
      });
      stageWrapper.addEventListener('touchstart', (e) => {
        if (e.target && e.target.closest && e.target.closest('#stageControls')) return;
        setDown();
      }, { passive: true });
    }

    window.addEventListener('pointerup', setUp);
    window.addEventListener('mouseup', setUp);
    window.addEventListener('touchend', setUp);
    window.addEventListener('pointercancel', setUp);

    spriteStore.on((event, data) => {
      if (event === 'backdrop') this._applyBackdrop(data);
    });

    this.app.ticker.add(() => this._syncFrame());
  }

  /**
   * Match the canvas bitmap resolution to the device pixels it is displayed at.
   * The canvas is CSS-stretched (pane fill via width:100%, and near-fullscreen
   * when maximized), so a fixed-resolution bitmap would be upscaled by the
   * browser and look blurry. The logical stage size always stays 480x360.
   */
  _applyRenderScale() {
    if (!this.app || !this.app.renderer) return;
    const rect = this.app.canvas.getBoundingClientRect();
    if (!rect.width) return;
    const dpr = window.devicePixelRatio || 1;
    const res = Math.min(6, Math.max(1, dpr * (rect.width / this.width)));
    if (Math.abs(res - this._renderScale) < 0.05) return;
    this._renderScale = res;
    this.app.renderer.resolution = res; // reallocates the framebuffer; logical size unchanged
    this._refreshResolutionDependentTextures();
  }

  _refreshResolutionDependentTextures() {
    // Costume textures are supersampled from their sources; re-rasterize at the new scale.
    this._costumeCanvasCache.forEach((tex) => tex.destroy(true));
    this._costumeCanvasCache.clear();
    // Re-rasterize the current backdrop at the new scale.
    if (this._currentBackdropDef) {
      this._applyBackdrop(this._currentBackdropDef);
    }
  }

  _applyBackdrop(bd) {
    if (!bd) return;

    this._currentBackdropDef = bd;

    if (bd.type === 'color') {
      this.app.renderer.background.color = bd.value;
      this._bgSprite.visible = false;
    } else if (bd.type === 'gradient') {
      this._bgSprite.visible = true;
      const res = Math.max(1, this._renderScale || 1);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(this.width * res);
      canvas.height = Math.round(this.height * res);
      const ctx = canvas.getContext('2d');
      ctx.scale(res, res); // keep gradient drawing code in logical 480x360 coordinates

      // Parse gradient string: e.g. "linear-gradient(180deg, #87CEEB 0%, #E0F7FA 100%)"
      const grad = ctx.createLinearGradient(0, 0, 0, this.height);
      const stopsStr = bd.value.replace(/linear-gradient\s*\(\s*180deg\s*,\s*/i, '').replace(/\s*\)$/, '');
      const stops = stopsStr.split(/,\s*/);
      for (const stop of stops) {
        const parts = stop.trim().split(/\s+/);
        if (parts.length >= 2) {
          const color = parts[0];
          const offset = parseFloat(parts[1]) / 100;
          if (!isNaN(offset)) {
            grad.addColorStop(offset, color);
          }
        }
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, this.width, this.height);

      const tex = Texture.from(canvas);
      this._bgSprite.texture = tex;
      this._bgSprite.width = this.width;
      this._bgSprite.height = this.height;
    } else if (bd.type === 'svg' || bd.type === 'image') {
      this._bgSprite.visible = true;
      const img = new Image();
      const applyTexture = () => {
        if (this._bgSprite.texture) {
          this._bgSprite.texture.destroy(true);
        }
        const canvas = document.createElement('canvas');
        const res = Math.max(1, this._renderScale || 1);
        canvas.width = Math.round(this.width * res);
        canvas.height = Math.round(this.height * res);
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingQuality = 'high';
        // SVG backdrops are vectors and rasterize crisply at any size; raster
        // images get high-quality resampling instead of a blurry GPU upscale.
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const tex = Texture.from(canvas);
        this._bgSprite.texture = tex;
        this._bgSprite.width = this.width;
        this._bgSprite.height = this.height;
      };

      img.onload = applyTexture;
      img.onerror = (err) => {
        console.error('[StageRenderer] Failed to load backdrop image:', bd.value, err);
      };
      img.src = bd.value;
      if (img.complete && img.naturalWidth > 0) {
        applyTexture();
      }
    }
  }

  _applyRenderScale() {
    if (!this.app || !this.app.renderer) return;
    const canvas = this.app.canvas;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width > 0) {
      const dpr = window.devicePixelRatio || 1;
      const cssWidth = rect.width;
      const targetScale = Math.max(1, (cssWidth / this.width) * dpr);
      this._renderScale = targetScale;
    }
  }

  setSprites(sprites) {
    this.sprites = sprites;
  }

  start() {
    
  }

  stop() {
    if (this.app) this.app.ticker.stop();
  }

  _syncFrame() {
    this._syncPenTrails();
    this._syncSpriteDisplayObjects();
    this._syncBubbles();
  }

  _syncPenTrails() {
    const g = this._penGraphics;
    g.clear();

    for (const sprite of this.sprites) {
      for (const trail of sprite.penTrails) {
        const p1 = this._toPixi(trail.x1, trail.y1);
        const p2 = this._toPixi(trail.x2, trail.y2);
        g.moveTo(p1.x, p1.y);
        g.lineTo(p2.x, p2.y);
        g.stroke({ width: trail.size, color: trail.color });
      }
    }
  }

  _syncSpriteDisplayObjects() {
    const activeIds = new Set();

    for (let i = 0; i < this.sprites.length; i++) {
      const sprite = this.sprites[i];
      activeIds.add(sprite.id);

      let pixiSprite = this._pixiSprites.get(sprite.id);

      if (!pixiSprite) {
        
        pixiSprite = new PixiSprite();
        pixiSprite.anchor.set(0.5);
        pixiSprite.eventMode = 'static';
        pixiSprite.cursor = 'pointer';
        pixiSprite._spriteRef = sprite;
        pixiSprite._dragging = false;

        pixiSprite.on('pointerdown', (e) => {
          this.mouseDown = true;
          this._mouseWasClicked = true;
          if (this._mouseClickTimeout) clearTimeout(this._mouseClickTimeout);
          this._mouseClickTimeout = setTimeout(() => {
            this._mouseWasClicked = false;
          }, 2000);
          e.stopPropagation();
          pixiSprite._dragging = true;
          pixiSprite._dragOffset = {
            x: e.global.x - pixiSprite.x,
            y: e.global.y - pixiSprite.y,
          };
          pixiSprite.alpha = 0.85;
          if (this._onSpriteClick) this._onSpriteClick(sprite);
          console.log('[DIAG-R] fanning out to', this._spriteClickListeners.length, 'listeners');
          this._spriteClickListeners.forEach(fn => fn(sprite));
        });

        pixiSprite.on('globalpointermove', (e) => {
          if (!pixiSprite._dragging) return;
          const newX = e.global.x - pixiSprite._dragOffset.x;
          const newY = e.global.y - pixiSprite._dragOffset.y;
          pixiSprite.x = newX;
          pixiSprite.y = newY;
          
          sprite.x = Math.round(newX - 240);
          sprite.y = Math.round(180 - newY);
          
          spriteStore._emit('update', sprite);
        });

        const endDrag = () => {
          this.mouseDown = false;
          if (!pixiSprite._dragging) return;
          pixiSprite._dragging = false;
          pixiSprite.alpha = sprite.opacity;
          
          spriteStore._emit('update', sprite);
        };
        pixiSprite.on('pointerup', endDrag);
        pixiSprite.on('pointerupoutside', endDrag);

        this._spriteContainer.addChild(pixiSprite);
        this._pixiSprites.set(sprite.id, pixiSprite);
      }

      const costumeImg = sprite.getCostumeImage();
      const costume = sprite.getCurrentCostume();
      const cacheKey = `${sprite.id}_${costume?.name || 'default'}`;
      if (costumeImg && costumeImg.complete && costumeImg.naturalWidth > 0) {
        let tex = this._costumeCanvasCache.get(cacheKey);
        if (!tex) {
          // Supersample SVG costumes (they are vectors and rasterize crisply at
          // any size) so the GPU never upscales a tiny 96x96 bitmap on HiDPI
          // screens. Raster (PNG/JPG) costumes stay at their native size.
          const isSvg = typeof costume?.src === 'string' && costume.src.startsWith('data:image/svg');
          const raster = isSvg ? Math.max(2, Math.ceil(this._renderScale || 1)) : 1;
          const canvas = document.createElement('canvas');
          canvas.width = costumeImg.naturalWidth * raster;
          canvas.height = costumeImg.naturalHeight * raster;
          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(costumeImg, 0, 0, canvas.width, canvas.height);
          tex = Texture.from(canvas);
          tex._rasterScale = raster; // remember the supersample factor for scale math
          this._costumeCanvasCache.set(cacheKey, tex);
        }
        if (pixiSprite.texture !== tex) {
          pixiSprite.texture = tex;
        }
      }

      if (!pixiSprite._dragging) {
        const pos = this._toPixi(sprite.x, sprite.y);
        pixiSprite.x = pos.x;
        pixiSprite.y = pos.y;
      }

      const natW = (costumeImg && costumeImg.naturalWidth) || 96;
      const natH = (costumeImg && costumeImg.naturalHeight) || 96;
      const maxDim = Math.max(natW, natH, 1);
      const normalizedBaseScale = 96 / maxDim;
      // Divide by the texture's supersample factor so the sprite's on-stage
      // size is unchanged — the extra bitmap pixels are pure sharpness.
      const rasterScale = (pixiSprite.texture && pixiSprite.texture._rasterScale) || 1;
      const scale = (sprite.size / 100) * normalizedBaseScale * 0.85 / rasterScale;

      if (sprite.rotationStyle === 'don\'t rotate') {
        pixiSprite.rotation = 0;
        pixiSprite.scale.set(scale);
      } else if (sprite.rotationStyle === 'left-right') {
        pixiSprite.rotation = 0;
        const facingRight = sprite.direction > 0 && sprite.direction < 180;
        pixiSprite.scale.set(facingRight ? scale : -scale, scale);
      } else {
        pixiSprite.rotation = ((sprite.direction - 90) * Math.PI) / 180;
        pixiSprite.scale.set(scale);
      }

      pixiSprite.visible = sprite.visible;
      pixiSprite.alpha = sprite.opacity;

      pixiSprite.zIndex = i;
    }

    for (const [id, pixiSprite] of this._pixiSprites) {
      if (!activeIds.has(id)) {
        this._spriteContainer.removeChild(pixiSprite);
        pixiSprite.destroy();
        this._pixiSprites.delete(id);
        for (const key of this._costumeCanvasCache.keys()) {
          if (key.startsWith(`${id}_`)) {
            this._costumeCanvasCache.delete(key);
          }
        }
      }
    }

    this._spriteContainer.sortChildren();
  }

  _syncBubbles() {
    const activeIds = new Set();

    for (const sprite of this.sprites) {
      if (!sprite.visible || !sprite.sayBubble) {
        
        if (this._bubbleObjects.has(sprite.id)) {
          this._removeBubble(sprite.id);
        }
        continue;
      }

      if (sprite.sayBubble.expiresAt && Date.now() > sprite.sayBubble.expiresAt) {
        sprite.clearBubble();
        this._removeBubble(sprite.id);
        continue;
      }

      activeIds.add(sprite.id);
      const bubble = sprite.sayBubble;
      const pos = this._toPixi(sprite.x, sprite.y);

      let obj = this._bubbleObjects.get(sprite.id);

      if (!obj || obj._lastText !== bubble.text || obj._lastType !== bubble.type) {

        this._removeBubble(sprite.id);

        // ── High-Definition Rich Speech Bubble ───────────────────
        const style = new TextStyle({
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
          fontSize: 16,
          fontWeight: '700',
          fill: '#0F172A',
          letterSpacing: 0.3,
        });

        // Use high resolution so text is supersampled and razor sharp (no blurriness)
        const textRes = Math.max(3, (window.devicePixelRatio || 1) * 2);
        const textObj = new Text({
          text: String(bubble.text),
          style,
          resolution: textRes,
        });

        const paddingX = 16;
        const paddingY = 8;
        const minW = 56;
        const bubbleW = Math.max(Math.ceil(textObj.width) + paddingX * 2, minW);
        const bubbleH = Math.ceil(textObj.height) + paddingY * 2;
        const radius = 12;

        // 1. Soft drop-shadow layer
        const shadow = new Graphics();
        shadow.roundRect(2, 3, bubbleW, bubbleH, radius);
        shadow.fill({ color: 0x000000, alpha: 0.12 });

        // 2. White bubble card with crisp blue accent border
        const bg = new Graphics();
        bg.roundRect(0, 0, bubbleW, bubbleH, radius);
        bg.fill('#FFFFFF');
        bg.stroke({ width: 2, color: '#4C97FF' });

        // 3. Bubble tail
        const tail = new Graphics();
        const seam = new Graphics();
        if (bubble.type === 'think') {
          tail.circle(14, bubbleH + 6, 5);
          tail.fill('#FFFFFF');
          tail.stroke({ width: 2, color: '#4C97FF' });
          tail.circle(7, bubbleH + 15, 3);
          tail.fill('#FFFFFF');
          tail.stroke({ width: 2, color: '#4C97FF' });
        } else {
          tail.moveTo(12, bubbleH - 1);
          tail.lineTo(4, bubbleH + 11);
          tail.lineTo(24, bubbleH - 1);
          tail.closePath();
          tail.fill('#FFFFFF');
          tail.stroke({ width: 2, color: '#4C97FF' });

          // Cover the seam where tail attaches to bubble border
          seam.rect(13, bubbleH - 2, 10, 4);
          seam.fill('#FFFFFF');
        }

        textObj.x = paddingX;
        textObj.y = paddingY;

        const container = new Container();
        container.addChild(shadow, bg, tail, seam, textObj);

        this._bubbleContainer.addChild(container);
        obj = { container, _lastText: bubble.text, _lastType: bubble.type, bubbleW, bubbleH };
        this._bubbleObjects.set(sprite.id, obj);
      }

      const bW = obj.bubbleW || 60;
      const bH = obj.bubbleH || 36;
      let bx = pos.x + 16;
      let by = pos.y - bH - 14;

      // Keep bubble within stage boundary (480x360)
      if (bx + bW > 470) bx = Math.max(10, pos.x - bW - 10);
      if (bx < 10) bx = 10;
      if (by < 10) by = 10;
      if (by + bH > 350) by = 350 - bH;

      obj.container.x = bx;
      obj.container.y = by;
    }

    for (const [id] of this._bubbleObjects) {
      if (!this.sprites.find(s => s.id === id)) {
        this._removeBubble(id);
      }
    }
  }

  _removeBubble(spriteId) {
    const obj = this._bubbleObjects.get(spriteId);
    if (obj) {
      this._bubbleContainer.removeChild(obj.container);
      obj.container.destroy({ children: true });
      this._bubbleObjects.delete(spriteId);
    }
  }

  _toPixi(sx, sy) {
    return {
      x: 240 + sx,
      y: 180 - sy,
    };
  }

  _fromPixi(px, py) {
    return {
      x: px - 240,
      y: 180 - py,
    };
  }

  onSpriteClick(callback) {
    // Support multiple listeners so every sprite's "when this sprite clicked"
    // hat can be active at once (each sprite registers its own callback).
    this._spriteClickListeners.push(callback);
  }

  offSpriteClick(callback) {
    this._spriteClickListeners = this._spriteClickListeners.filter(fn => fn !== callback);
  }

  onStageClick(callback) {
    this._onStageClick = callback;
  }

  setThemeBackground(isDark) {
    const color = isDark ? '#1E293B' : '#FFFFFF';
    this.backdrop = color;
    if (this.app && this.app.renderer) {
      // Only apply theme background if no custom backdrop is currently active
      if (!this._bgSprite || !this._bgSprite.visible) {
        this.app.renderer.background.color = color;
      }
    }
  }

  getApp() {
    return this.app;
  }

  /**
   * Find which sprite on the canvas (if any) is under the client screen coordinates.
   * Searches top-rendered sprite first.
   * @param {number} clientX
   * @param {number} clientY
   * @returns {Sprite|null}
   */
  getSpriteAtClientPoint(clientX, clientY) {
    if (!this.app || !this.app.canvas) return null;
    const rect = this.app.canvas.getBoundingClientRect();
    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      return null;
    }

    const stageX = ((clientX - rect.left) / rect.width) * this.width;
    const stageY = ((clientY - rect.top) / rect.height) * this.height;

    const sprites = this.sprites || [];
    for (let i = sprites.length - 1; i >= 0; i--) {
      const sprite = sprites[i];
      if (sprite.visible === false) continue;

      const pixiSprite = this._pixiSprites.get(sprite.id);
      if (pixiSprite) {
        const halfW = Math.max(28, (pixiSprite.width || 50) / 2);
        const halfH = Math.max(28, (pixiSprite.height || 50) / 2);
        const minX = pixiSprite.x - halfW;
        const maxX = pixiSprite.x + halfW;
        const minY = pixiSprite.y - halfH;
        const maxY = pixiSprite.y + halfH;

        if (stageX >= minX && stageX <= maxX && stageY >= minY && stageY <= maxY) {
          return sprite;
        }
      } else {
        const pixiPos = this._toPixi(sprite.x, sprite.y);
        const halfSize = Math.max(28, (sprite.size / 100) * 35);
        if (
          stageX >= pixiPos.x - halfSize &&
          stageX <= pixiPos.x + halfSize &&
          stageY >= pixiPos.y - halfSize &&
          stageY <= pixiPos.y + halfSize
        ) {
          return sprite;
        }
      }
    }
    return null;
  }

  /**
   * Set or clear the visual drop-target highlight on a canvas sprite during block drag.
   * @param {string|null} spriteId
   */
  setDropTargetSprite(spriteId) {
    if (!this._highlightGraphics) return;
    this._highlightGraphics.clear();
    if (!spriteId) return;

    const sprite = (this.sprites || []).find(s => s.id === spriteId);
    if (!sprite || sprite.visible === false) return;

    const pixiSprite = this._pixiSprites.get(spriteId);
    const posX = pixiSprite ? pixiSprite.x : this._toPixi(sprite.x, sprite.y).x;
    const posY = pixiSprite ? pixiSprite.y : this._toPixi(sprite.x, sprite.y).y;
    const halfW = Math.max(32, pixiSprite ? (pixiSprite.width || 50) / 2 + 8 : (sprite.size / 100) * 40);
    const halfH = Math.max(32, pixiSprite ? (pixiSprite.height || 50) / 2 + 8 : (sprite.size / 100) * 40);

    const g = this._highlightGraphics;
    g.roundRect(posX - halfW, posY - halfH, halfW * 2, halfH * 2, 12);
    g.fill({ color: 0x4F8CFF, alpha: 0.2 });
    g.stroke({ width: 3, color: 0x4F8CFF, alpha: 0.95 });
  }

  /**
   * Flash a green copy-success indicator around a canvas sprite after block drop.
   * @param {string} spriteId
   */
  flashCopySuccess(spriteId) {
    if (!this._highlightGraphics) return;
    this._highlightGraphics.clear();
    if (!spriteId) return;

    const sprite = (this.sprites || []).find(s => s.id === spriteId);
    if (!sprite) return;

    const pixiSprite = this._pixiSprites.get(spriteId);
    const posX = pixiSprite ? pixiSprite.x : this._toPixi(sprite.x, sprite.y).x;
    const posY = pixiSprite ? pixiSprite.y : this._toPixi(sprite.x, sprite.y).y;
    const halfW = Math.max(34, pixiSprite ? (pixiSprite.width || 50) / 2 + 12 : (sprite.size / 100) * 44);
    const halfH = Math.max(34, pixiSprite ? (pixiSprite.height || 50) / 2 + 12 : (sprite.size / 100) * 44);

    const g = this._highlightGraphics;
    g.roundRect(posX - halfW, posY - halfH, halfW * 2, halfH * 2, 14);
    g.fill({ color: 0x22C55E, alpha: 0.3 });
    g.stroke({ width: 3.5, color: 0x22C55E, alpha: 1 });

    if (this._flashTimer) clearTimeout(this._flashTimer);
    this._flashTimer = setTimeout(() => {
      if (this._highlightGraphics) this._highlightGraphics.clear();
    }, 700);
  }

  /**
   * Check if mouse/pointer is down, or was clicked/tapped recently.
   * Consumes the click latch when true is returned so a momentary click
   * isn't missed by blocking blocks (like glideToXY).
   * @returns {boolean}
   */
  isMouseDown() {
    if (this.mouseDown) return true;
    if (this._mouseWasClicked) {
      this._mouseWasClicked = false;
      if (this._mouseClickTimeout) {
        clearTimeout(this._mouseClickTimeout);
        this._mouseClickTimeout = null;
      }
      return true;
    }
    return false;
  }

  /**
   * Reset mouse down and click latch state (e.g. on green flag start or stop).
   */
  resetMouseState() {
    this.mouseDown = false;
    this._mouseWasClicked = false;
    if (this._mouseClickTimeout) {
      clearTimeout(this._mouseClickTimeout);
      this._mouseClickTimeout = null;
    }
  }

  /**
   * Display a Scratch-style Ask & Wait input prompt at the bottom of the stage.
   * Resolves with the user's input string when submitted.
   * @param {string} question
   * @param {object} [sprite]
   * @returns {Promise<string>}
   */
  showAskPrompt(question, sprite) {
    return new Promise((resolve) => {
      this.hideAskPrompt();

      if (sprite && typeof sprite.say === 'function') {
        sprite.say(question);
      }

      const wrapper = document.createElement('div');
      wrapper.className = 'stage-ask-prompt-container';
      wrapper.innerHTML = `
        <div class="stage-ask-inner">
          <input type="text" class="stage-ask-input" placeholder="Type answer here..." autofocus autocomplete="off" />
          <button type="button" class="stage-ask-btn" title="Submit">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
        </div>
      `;

      const targetContainer = this.containerEl?.parentElement || this.containerEl || document.body;
      targetContainer.appendChild(wrapper);

      const input = wrapper.querySelector('.stage-ask-input');
      const btn = wrapper.querySelector('.stage-ask-btn');

      setTimeout(() => {
        try { input?.focus(); } catch (_) {}
      }, 50);

      let resolved = false;
      const finish = () => {
        if (resolved) return;
        resolved = true;
        const val = input ? input.value : '';
        this.hideAskPrompt();
        if (sprite && typeof sprite.clearBubble === 'function') {
          sprite.clearBubble();
        }
        resolve(val);
      };

      btn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        finish();
      });

      input?.addEventListener('keydown', (e) => {
        e.stopPropagation();
        if (e.key === 'Enter') {
          e.preventDefault();
          finish();
        }
      });

      this._currentAsk = {
        element: wrapper,
        cancel: () => {
          if (resolved) return;
          resolved = true;
          this.hideAskPrompt();
          if (sprite && typeof sprite.clearBubble === 'function') {
            sprite.clearBubble();
          }
          resolve('');
        }
      };
    });
  }

  /**
   * Hide and dismiss any active ask prompt on the stage.
   */
  hideAskPrompt() {
    if (this._currentAsk) {
      if (this._currentAsk.element && this._currentAsk.element.parentNode) {
        this._currentAsk.element.parentNode.removeChild(this._currentAsk.element);
      }
      this._currentAsk = null;
    }
  }
}


