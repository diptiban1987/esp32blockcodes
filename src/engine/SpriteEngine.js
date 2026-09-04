// Sprite Engine

let nextSpriteId = 1;

const DEFAULT_CAT_SVG = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#000" stroke-width="1.5">
    <!-- Body -->
    <ellipse cx="48" cy="56" rx="28" ry="24" fill="#00897B"/>
    <!-- Head -->
    <circle cx="48" cy="32" r="20" fill="#00897B"/>
    <!-- Left ear -->
    <polygon points="32,18 24,2 38,14" fill="#00897B" stroke="#000"/>
    <polygon points="33,16 28,6 37,14" fill="#4DB6AC" stroke="none"/>
    <!-- Right ear -->
    <polygon points="64,18 72,2 58,14" fill="#00897B" stroke="#000"/>
    <polygon points="63,16 68,6 59,14" fill="#4DB6AC" stroke="none"/>
    <!-- Eyes -->
    <ellipse cx="40" cy="30" rx="4" ry="5" fill="white"/>
    <ellipse cx="56" cy="30" rx="4" ry="5" fill="white"/>
    <circle cx="41" cy="31" r="2" fill="#000"/>
    <circle cx="57" cy="31" r="2" fill="#000"/>
    <!-- Nose -->
    <ellipse cx="48" cy="36" rx="2.5" ry="1.5" fill="#FF6B6B"/>
    <!-- Mouth -->
    <path d="M44,38 Q48,42 52,38" stroke="#000" fill="none" stroke-width="1"/>
    <!-- Whiskers -->
    <line x1="20" y1="34" x2="36" y2="36" stroke="#000" stroke-width="0.8"/>
    <line x1="20" y1="38" x2="36" y2="38" stroke="#000" stroke-width="0.8"/>
    <line x1="60" y1="36" x2="76" y2="34" stroke="#000" stroke-width="0.8"/>
    <line x1="60" y1="38" x2="76" y2="38" stroke="#000" stroke-width="0.8"/>
    <!-- Feet -->
    <ellipse cx="36" cy="78" rx="8" ry="5" fill="#00897B"/>
    <ellipse cx="60" cy="78" rx="8" ry="5" fill="#00897B"/>
    <!-- Tail -->
    <path d="M72,60 Q85,50 80,38" stroke="#00897B" fill="none" stroke-width="5"/>
  </g>
</svg>`)}`;

const DEFAULT_CAT_WALKING_SVG = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Body (tilted forward in walking stride) -->
    <ellipse cx="46" cy="54" rx="28" ry="22" fill="#00897B" transform="rotate(-6 46 54)"/>
    <!-- Head -->
    <circle cx="52" cy="30" r="20" fill="#00897B"/>
    <!-- Left ear -->
    <polygon points="36,16 28,1 42,12" fill="#00897B" stroke="#000"/>
    <polygon points="37,14 32,5 41,12" fill="#4DB6AC" stroke="none"/>
    <!-- Right ear -->
    <polygon points="68,16 76,1 62,12" fill="#00897B" stroke="#000"/>
    <polygon points="67,14 72,5 63,12" fill="#4DB6AC" stroke="none"/>
    <!-- Eyes -->
    <ellipse cx="45" cy="28" rx="4" ry="5" fill="white"/>
    <ellipse cx="61" cy="28" rx="4" ry="5" fill="white"/>
    <circle cx="47" cy="29" r="2" fill="#000"/>
    <circle cx="63" cy="29" r="2" fill="#000"/>
    <!-- Nose -->
    <ellipse cx="54" cy="34" rx="2.5" ry="1.5" fill="#FF6B6B"/>
    <!-- Mouth -->
    <path d="M50,36 Q54,40 58,36" stroke="#000" fill="none" stroke-width="1"/>
    <!-- Whiskers -->
    <line x1="26" y1="32" x2="42" y2="34" stroke="#000" stroke-width="0.8"/>
    <line x1="26" y1="36" x2="42" y2="36" stroke="#000" stroke-width="0.8"/>
    <line x1="66" y1="34" x2="82" y2="32" stroke="#000" stroke-width="0.8"/>
    <line x1="66" y1="36" x2="82" y2="36" stroke="#000" stroke-width="0.8"/>
    <!-- Front Leg Extended Forward (Walking stride) -->
    <ellipse cx="68" cy="74" rx="10" ry="5" fill="#00897B" transform="rotate(25 68 74)"/>
    <!-- Back Leg Extended Backward (Walking stride) -->
    <ellipse cx="22" cy="76" rx="10" ry="5" fill="#00897B" transform="rotate(-20 22 76)"/>
    <!-- Mid Support Paws -->
    <ellipse cx="40" cy="76" rx="7" ry="5" fill="#00796B"/>
    <!-- Tail (swishing dynamic curve) -->
    <path d="M68,54 Q84,40 76,24" stroke="#00897B" fill="none" stroke-width="5"/>
    <path d="M68,54 Q84,40 76,24" stroke="#000" fill="none" stroke-width="1.5"/>
  </g>
</svg>`)}`;

export class Sprite {
  constructor(name, options = {}) {
    this.id = nextSpriteId++;
    this.name = name || `Sprite${this.id}`;

    this.x = options.x || 0;           
    this.y = options.y || 0;           
    this.direction = options.direction || 90; 
    this.size = options.size || 100;    

    this.visible = true;
    this.costumes = [];
    this.currentCostumeIndex = 0;
    this.sayBubble = null;      
    this.opacity = 1;

    this.penDown = false;
    this.penColor = '#4C97FF';
    this.penSize = 1;
    this.penTrails = [];  

    this._costumeImages = new Map();
    this._loaded = false;
    this.rotationStyle = 'all around';

    this.workspaceState = null;

    if (Array.isArray(options.costumes) && options.costumes.length > 0) {
      options.costumes.forEach((c, idx) => {
        this.addCostume(c.name || `costume${idx + 1}`, c.src || c.svg);
      });
    } else if (options.costumeSrc) {
      const costumeName = name ? name.toLowerCase() : 'costume1';
      this.addCostume(costumeName, options.costumeSrc);
    } else {
      // Default Cat with costume1 (standing) and costume2 (walking)
      this.addCostume('costume1', DEFAULT_CAT_SVG);
      this.addCostume('costume2', DEFAULT_CAT_WALKING_SVG);
    }
  }

  addCostume(name, src) {
    this.costumes.push({ name, src });
    const img = new Image();
    img.onload = () => {
      this._costumeImages.set(name, img);
      this._loaded = true;
      if (this.onCostumeLoad) this.onCostumeLoad();
    };
    img.src = src;
    if (img.complete && img.naturalWidth > 0) {
      this._costumeImages.set(name, img);
      this._loaded = true;
    }
    return this;
  }

  getCurrentCostume() {
    return this.costumes[this.currentCostumeIndex] || null;
  }

  getCostumeImage() {
    const costume = this.getCurrentCostume();
    if (!costume) return null;
    return this._costumeImages.get(costume.name) || null;
  }

  switchCostume(nameOrIndex) {
    if (typeof nameOrIndex === 'number') {
      this.currentCostumeIndex = ((nameOrIndex - 1) % this.costumes.length + this.costumes.length) % this.costumes.length;
    } else {
      const idx = this.costumes.findIndex(c => c.name === nameOrIndex);
      if (idx !== -1) this.currentCostumeIndex = idx;
    }
  }

  nextCostume() {
    if (this.costumes.length > 0) {
      this.currentCostumeIndex = (this.currentCostumeIndex + 1) % this.costumes.length;
    }
  }

  moveSteps(steps) {
    const angleRad = (90 - this.direction) * (Math.PI / 180);
    const oldX = this.x;
    const oldY = this.y;
    this.x += steps * Math.cos(angleRad);
    this.y += steps * Math.sin(angleRad);
    this._clampToStage();
    if (this.penDown) {
      this.penTrails.push({
        x1: oldX, y1: oldY,
        x2: this.x, y2: this.y,
        color: this.penColor, size: this.penSize
      });
    }
  }

  goToXY(x, y) {
    const oldX = this.x;
    const oldY = this.y;
    this.x = x;
    this.y = y;
    this._clampToStage();
    if (this.penDown) {
      this.penTrails.push({
        x1: oldX, y1: oldY,
        x2: this.x, y2: this.y,
        color: this.penColor, size: this.penSize
      });
    }
  }

  turnRight(degrees) {
    this.direction = (this.direction + degrees) % 360;
  }

  turnLeft(degrees) {
    this.direction = (this.direction - degrees + 360) % 360;
  }

  pointInDirection(deg) {
    this.direction = deg;
  }

  changeX(dx) {
    const oldX = this.x;
    const oldY = this.y;
    this.x += dx;
    this._clampToStage();
    if (this.penDown) {
      this.penTrails.push({
        x1: oldX, y1: oldY,
        x2: this.x, y2: this.y,
        color: this.penColor, size: this.penSize
      });
    }
  }

  changeY(dy) {
    const oldX = this.x;
    const oldY = this.y;
    this.y += dy;
    this._clampToStage();
    if (this.penDown) {
      this.penTrails.push({
        x1: oldX, y1: oldY,
        x2: this.x, y2: this.y,
        color: this.penColor, size: this.penSize
      });
    }
  }

  setX(x) {
    const oldX = this.x;
    const oldY = this.y;
    this.x = x;
    this._clampToStage();
    if (this.penDown) {
      this.penTrails.push({
        x1: oldX, y1: oldY,
        x2: this.x, y2: this.y,
        color: this.penColor, size: this.penSize
      });
    }
  }

  setY(y) {
    const oldX = this.x;
    const oldY = this.y;
    this.y = y;
    this._clampToStage();
    if (this.penDown) {
      this.penTrails.push({
        x1: oldX, y1: oldY,
        x2: this.x, y2: this.y,
        color: this.penColor, size: this.penSize
      });
    }
  }

  _clampToStage() {
    this.x = Math.max(-240, Math.min(240, this.x));
    this.y = Math.max(-180, Math.min(180, this.y));
  }

  say(text, seconds = 0) {
    this.sayBubble = {
      text: String(text),
      type: 'say',
      expiresAt: seconds > 0 ? Date.now() + seconds * 1000 : null
    };
  }

  think(text, seconds = 0) {
    this.sayBubble = {
      text: String(text),
      type: 'think',
      expiresAt: seconds > 0 ? Date.now() + seconds * 1000 : null
    };
  }

  clearBubble() {
    this.sayBubble = null;
  }

  changeSize(amount) {
    this.size = Math.max(5, this.size + amount);
  }

  setSize(percent) {
    this.size = Math.max(5, percent);
  }

  show() { this.visible = true; }
  hide() { this.visible = false; }

  isTouchingEdge() {
    const halfW = 24 * (this.size / 100);
    const halfH = 24 * (this.size / 100);
    return (
      this.x - halfW <= -240 || this.x + halfW >= 240 ||
      this.y - halfH <= -180 || this.y + halfH >= 180
    );
  }

  bounceOffEdge() {
    const halfW = 24 * (this.size / 100);
    const halfH = 24 * (this.size / 100);
    if (this.x - halfW <= -240) {
      this.x = -240 + halfW;
      this.direction = -this.direction;
    } else if (this.x + halfW >= 240) {
      this.x = 240 - halfW;
      this.direction = -this.direction;
    }
    if (this.y - halfH <= -180) {
      this.y = -180 + halfH;
      this.direction = 180 - this.direction;
    } else if (this.y + halfH >= 180) {
      this.y = 180 - halfH;
      this.direction = 180 - this.direction;
    }
    this.direction = ((this.direction % 360) + 360) % 360;
  }

  setRotationStyle(style) {
    if (['left-right', 'don\'t rotate', 'all around'].includes(style)) {
      this.rotationStyle = style;
    }
  }

  goToLayer(layer) {
    if (!this._spriteStoreRef) return;
    const sprites = this._spriteStoreRef.getAllSprites();
    const idx = sprites.indexOf(this);
    if (idx === -1) return;
    sprites.splice(idx, 1);
    if (layer === 'front') {
      sprites.push(this);
    } else {
      sprites.unshift(this);
    }
    this._spriteStoreRef._emit('update', this);
  }

  changeLayer(delta) {
    if (!this._spriteStoreRef) return;
    const sprites = this._spriteStoreRef.getAllSprites();
    const idx = sprites.indexOf(this);
    if (idx === -1) return;
    let newIdx = idx + (delta > 0 ? 1 : -1);
    newIdx = Math.max(0, Math.min(sprites.length - 1, newIdx));
    if (newIdx === idx) return;
    sprites.splice(idx, 1);
    sprites.splice(newIdx, 0, this);
    this._spriteStoreRef._emit('update', this);
  }

  distanceTo(otherSprite) {
    const dx = this.x - otherSprite.x;
    const dy = this.y - otherSprite.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  glideToXY(x, y, seconds) {
    return new Promise((resolve) => {
      this._glideCancelled = false;
      const startX = this.x;
      const startY = this.y;
      const startTime = Date.now();
      const duration = seconds * 1000;

      // Allow the thread/interpreter to abort a glide mid-flight.
      // If an external canceller is set, stop animating immediately.
      const cancelled = () => this._glideCancelled === true;

      const step = () => {
        if (cancelled()) {
          resolve();
          return;
        }
        const elapsed = Date.now() - startTime;
        const t = Math.min(elapsed / duration, 1);

        const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const prevX = this.x;
        const prevY = this.y;
        this.x = startX + (x - startX) * eased;
        this.y = startY + (y - startY) * eased;
        if (this.penDown) {
          this.penTrails.push({
            x1: prevX, y1: prevY,
            x2: this.x, y2: this.y,
            color: this.penColor, size: this.penSize
          });
        }

        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          this.x = x;
          this.y = y;
          resolve();
        }
      };
      requestAnimationFrame(step);
    });
  }

  cancelGlide() {
    this._glideCancelled = true;
  }
}

export { DEFAULT_CAT_SVG };
