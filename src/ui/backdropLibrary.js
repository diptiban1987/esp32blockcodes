// built-in backdrop library — colors, gradients, and svg scenes
const svg = (raw) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(raw)}`;

export const BACKDROP_LIBRARY = [
  // ── COLORS & GRADIENTS ──────────────────────────────────
  {
    name: 'White',
    category: 'Colors',
    type: 'color',
    value: '#ffffff',
  },
  {
    name: 'Dark Mode',
    category: 'Colors',
    type: 'color',
    value: '#1e1e2e',
  },
  {
    name: 'Mint Green',
    category: 'Colors',
    type: 'color',
    value: '#e8f5e9',
  },
  {
    name: 'Pastel Pink',
    category: 'Colors',
    type: 'color',
    value: '#fce4ec',
  },
  {
    name: 'Blue Sky',
    category: 'Gradients',
    type: 'gradient',
    value: 'linear-gradient(180deg, #87CEEB 0%, #E0F7FA 100%)',
  },
  {
    name: 'Sunset',
    category: 'Gradients',
    type: 'gradient',
    value: 'linear-gradient(180deg, #2C3E50 0%, #E74C3C 40%, #F39C12 70%, #F1C40F 100%)',
  },
  {
    name: 'Night Sky',
    category: 'Gradients',
    type: 'gradient',
    value: 'linear-gradient(180deg, #0C0C2E 0%, #1a1a4e 50%, #2C3E6B 100%)',
  },
  {
    name: 'Ocean Gradient',
    category: 'Gradients',
    type: 'gradient',
    value: 'linear-gradient(180deg, #1A5276 0%, #2980B9 40%, #3498DB 70%, #85C1E9 100%)',
  },
  {
    name: 'Aurora',
    category: 'Gradients',
    type: 'gradient',
    value: 'linear-gradient(135deg, #00b09b 0%, #96c93d 50%, #00d2ff 100%)',
  },
  {
    name: 'Cyberpunk',
    category: 'Gradients',
    type: 'gradient',
    value: 'linear-gradient(135deg, #FF007F 0%, #7F00FF 50%, #00F0FF 100%)',
  },

  // ── OUTDOORS ─────────────────────────────────────────────
  {
    name: 'Desert',
    category: 'Outdoors',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="#87CEEB"/>
  <rect y="200" width="480" height="160" fill="#EDC9AF"/>
  <circle cx="380" cy="80" r="40" fill="#F1C40F" opacity="0.9"/>
  <path d="M0,220 Q60,180 120,220 Q180,190 240,220 Q300,185 360,220 Q420,195 480,220 L480,360 L0,360Z" fill="#D4A574"/>
  <path d="M0,260 Q80,230 160,260 Q240,235 320,260 Q400,240 480,260 L480,360 L0,360Z" fill="#C49A6C"/>
  <ellipse cx="100" cy="180" rx="3" ry="30" fill="#27AE60"/>
  <ellipse cx="100" cy="150" rx="14" ry="10" fill="#2ECC71"/>
  <ellipse cx="90" cy="160" rx="10" ry="8" fill="#27AE60"/>
  <ellipse cx="110" cy="158" rx="10" ry="8" fill="#27AE60"/>
</svg>`),
  },
  {
    name: 'Mountain',
    category: 'Outdoors',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="#B3E5FC"/>
  <polygon points="60,360 180,120 300,360" fill="#546E7A"/>
  <polygon points="180,120 150,180 180,170 210,180" fill="#ECEFF1"/>
  <polygon points="200,360 340,80 480,360" fill="#37474F"/>
  <polygon points="340,80 300,160 340,150 380,160" fill="#FFFFFF"/>
  <rect y="260" width="480" height="100" fill="#4CAF50"/>
  <polygon points="40,360 70,280 100,360" fill="#2E7D32"/>
  <polygon points="100,360 130,270 160,360" fill="#1B5E20"/>
  <polygon points="380,360 410,290 440,360" fill="#2E7D32"/>
</svg>`),
  },
  {
    name: 'Beach',
    category: 'Outdoors',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="#81D4FA"/>
  <circle cx="80" cy="70" r="36" fill="#FFEE58"/>
  <rect y="160" width="480" height="80" fill="#0288D1"/>
  <path d="M0,220 Q120,200 240,220 Q360,240 480,220 L480,360 L0,360Z" fill="#FFE082"/>
  <path d="M400,360 C380,260 410,180 420,160" stroke="#795548" stroke-width="12" fill="none"/>
  <path d="M420,160 Q360,140 340,160 M420,160 Q440,120 480,140 M420,160 Q380,180 370,210 M420,160 Q460,180 470,210" stroke="#2E7D32" stroke-width="6" fill="none"/>
</svg>`),
  },
  {
    name: 'City Skyline',
    category: 'Outdoors',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="#1A237E"/>
  <circle cx="400" cy="70" r="30" fill="#FFF59D"/>
  <rect x="20" y="140" width="70" height="220" fill="#212121"/>
  <rect x="110" y="80" width="90" height="280" fill="#37474F"/>
  <rect x="220" y="160" width="60" height="200" fill="#263238"/>
  <rect x="300" y="110" width="80" height="250" fill="#455A64"/>
  <rect x="400" y="180" width="60" height="180" fill="#212121"/>
  <rect x="130" y="110" width="16" height="20" fill="#FFEE58"/>
  <rect x="160" y="110" width="16" height="20" fill="#FFEE58"/>
  <rect x="130" y="150" width="16" height="20" fill="#FFEE58"/>
  <rect x="160" y="190" width="16" height="20" fill="#FFEE58"/>
  <rect x="320" y="140" width="16" height="20" fill="#FFEE58"/>
  <rect x="350" y="180" width="16" height="20" fill="#FFEE58"/>
</svg>`),
  },
  {
    name: 'Park',
    category: 'Outdoors',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="#81D4FA"/>
  <ellipse cx="240" cy="400" rx="360" ry="200" fill="#66BB6A"/>
  <path d="M0,280 Q240,240 480,280 L480,360 L0,360Z" fill="#A1887F"/>
  <circle cx="80" cy="180" r="50" fill="#388E3C"/>
  <rect x="72" y="220" width="16" height="80" fill="#4E342E"/>
  <circle cx="400" cy="190" r="44" fill="#2E7D32"/>
  <rect x="392" y="220" width="16" height="80" fill="#4E342E"/>
</svg>`),
  },

  // ── INDOORS ──────────────────────────────────────────────
  {
    name: 'Gym',
    category: 'Indoors',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="#F5F0E8"/>
  <rect y="280" width="480" height="80" fill="#D4A574"/>
  <rect y="280" width="480" height="4" fill="#C49A6C"/>
  <line x1="0" y1="180" x2="480" y2="180" stroke="#ddd" stroke-width="1"/>
  <rect x="60" y="120" width="360" height="8" rx="4" fill="#7F8C8D"/>
  <rect x="40" y="100" width="16" height="48" rx="3" fill="#2C3E50"/>
  <rect x="404" y="100" width="16" height="48" rx="3" fill="#2C3E50"/>
  <rect x="32" y="108" width="8" height="32" rx="2" fill="#E74C3C"/>
  <rect x="420" y="108" width="8" height="32" rx="2" fill="#E74C3C"/>
</svg>`),
  },
  {
    name: 'Classroom',
    category: 'Indoors',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="#FFF8E1"/>
  <rect y="260" width="480" height="100" fill="#D7CCC8"/>
  <rect x="40" y="40" width="400" height="180" rx="8" fill="#1B5E20" stroke="#3E2723" stroke-width="8"/>
  <rect x="60" y="60" width="120" height="8" rx="2" fill="#A5D6A7" opacity="0.4"/>
  <line x1="80" y1="140" x2="200" y2="140" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="8 6"/>
  <line x1="80" y1="170" x2="340" y2="170" stroke="#FFFFFF" stroke-width="3"/>
</svg>`),
  },
  {
    name: 'Stage',
    category: 'Indoors',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="#212121"/>
  <rect y="260" width="480" height="100" fill="#8D6E63"/>
  <polygon points="0,0 80,0 40,260 0,260" fill="#B71C1C"/>
  <polygon points="480,0 400,0 440,260 480,260" fill="#B71C1C"/>
  <path d="M0,0 Q240,60 480,0 L480,40 Q240,100 0,40Z" fill="#C62828"/>
  <polygon points="140,0 340,0 400,260 80,260" fill="#FFF59D" opacity="0.15"/>
</svg>`),
  },

  // ── SPACE ────────────────────────────────────────────────
  {
    name: 'Space',
    category: 'Space',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="#0a0a2e"/>
  <circle cx="60" cy="40" r="1.5" fill="white" opacity="0.9"/>
  <circle cx="140" cy="80" r="1" fill="white" opacity="0.7"/>
  <circle cx="200" cy="30" r="2" fill="white" opacity="0.8"/>
  <circle cx="300" cy="60" r="1.2" fill="white" opacity="0.6"/>
  <circle cx="380" cy="90" r="1.8" fill="white" opacity="0.9"/>
  <circle cx="420" cy="40" r="1" fill="white" opacity="0.5"/>
  <circle cx="100" cy="160" r="1.5" fill="white" opacity="0.7"/>
  <circle cx="240" cy="140" r="2" fill="white" opacity="0.8"/>
  <circle cx="340" cy="180" r="1" fill="white" opacity="0.6"/>
  <circle cx="450" cy="150" r="1.8" fill="white" opacity="0.9"/>
  <circle cx="50" cy="260" r="1.2" fill="white" opacity="0.7"/>
  <circle cx="180" cy="280" r="1.5" fill="white" opacity="0.5"/>
  <circle cx="280" cy="300" r="2" fill="white" opacity="0.8"/>
  <circle cx="400" cy="260" r="1" fill="white" opacity="0.7"/>
  <circle cx="460" cy="320" r="1.5" fill="white" opacity="0.6"/>
  <circle cx="320" cy="240" r="1.2" fill="white" opacity="0.9"/>
  <circle cx="160" cy="200" r="1" fill="white" opacity="0.8"/>
  <circle cx="80" cy="320" r="1.5" fill="white" opacity="0.7"/>
  <circle cx="220" cy="200" r="1.8" fill="white" opacity="0.6"/>
  <circle cx="360" cy="320" r="1" fill="white" opacity="0.5"/>
  <circle cx="120" cy="120" r="1.2" fill="#FFD700" opacity="0.8"/>
  <circle cx="350" cy="130" r="1.5" fill="#FFD700" opacity="0.6"/>
</svg>`),
  },
  {
    name: 'Moon Surface',
    category: 'Space',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="#090A0F"/>
  <circle cx="400" cy="70" r="45" fill="#1E88E5"/>
  <circle cx="380" cy="60" r="42" fill="#42A5F5" opacity="0.8"/>
  <ellipse cx="240" cy="380" rx="340" ry="140" fill="#78909C"/>
  <ellipse cx="120" cy="280" rx="40" ry="12" fill="#546E7A"/>
  <ellipse cx="320" cy="310" rx="60" ry="18" fill="#546E7A"/>
  <ellipse cx="220" cy="330" rx="25" ry="8" fill="#37474F"/>
</svg>`),
  },

  // ── WATER ────────────────────────────────────────────────
  {
    name: 'Underwater',
    category: 'Water',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <defs>
    <linearGradient id="uw" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1A5276"/>
      <stop offset="100%" stop-color="#0B2545"/>
    </linearGradient>
  </defs>
  <rect width="480" height="360" fill="url(#uw)"/>
  <ellipse cx="80" cy="340" rx="30" ry="8" fill="#27AE60" opacity="0.5"/>
  <ellipse cx="200" cy="350" rx="40" ry="10" fill="#1E8449" opacity="0.4"/>
  <ellipse cx="380" cy="345" rx="35" ry="9" fill="#27AE60" opacity="0.5"/>
  <path d="M70,360 Q70,300 75,280 Q80,260 85,280 Q90,300 90,360" fill="#27AE60" opacity="0.6"/>
  <path d="M190,360 Q190,290 198,270 Q206,290 206,360" fill="#2ECC71" opacity="0.5"/>
  <path d="M370,360 Q372,310 378,290 Q384,310 386,360" fill="#27AE60" opacity="0.6"/>
  <circle cx="100" cy="100" r="8" fill="white" opacity="0.08"/>
  <circle cx="260" cy="200" r="12" fill="white" opacity="0.06"/>
  <circle cx="400" cy="140" r="6" fill="white" opacity="0.08"/>
  <circle cx="160" cy="300" r="10" fill="white" opacity="0.05"/>
</svg>`),
  },
  {
    name: 'Coral Reef',
    category: 'Water',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="#00838F"/>
  <rect y="280" width="480" height="80" fill="#FFE082"/>
  <path d="M40,360 C20,260 80,240 60,360" fill="#FF4081"/>
  <path d="M140,360 C120,220 180,200 160,360" fill="#E040FB"/>
  <path d="M340,360 C320,240 380,220 360,360" fill="#00E676"/>
  <circle cx="120" cy="80" r="14" fill="#E0F7FA" opacity="0.2"/>
  <circle cx="320" cy="120" r="20" fill="#E0F7FA" opacity="0.15"/>
</svg>`),
  },

  // ── SPORTS & GAMES (NEW CATEGORY) ────────────────────────
  {
    name: 'Soccer Field',
    category: 'Sports & Games',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="#2E7D32"/>
  <line x1="240" y1="0" x2="240" y2="360" stroke="#FFFFFF" stroke-width="4"/>
  <circle cx="240" cy="180" r="50" stroke="#FFFFFF" stroke-width="4" fill="none"/>
  <rect x="0" y="90" width="80" height="180" stroke="#FFFFFF" stroke-width="4" fill="none"/>
  <rect x="400" y="90" width="80" height="180" stroke="#FFFFFF" stroke-width="4" fill="none"/>
  <rect x="0" y="20" width="480" height="320" stroke="#FFFFFF" stroke-width="6" fill="none"/>
</svg>`),
  },
  {
    name: 'Basketball Court',
    category: 'Sports & Games',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="#D7CCC8"/>
  <rect x="10" y="10" width="460" height="340" fill="#EF6C00" stroke="#FFFFFF" stroke-width="4"/>
  <line x1="240" y1="10" x2="240" y2="350" stroke="#FFFFFF" stroke-width="4"/>
  <circle cx="240" cy="180" r="44" stroke="#FFFFFF" stroke-width="4" fill="none"/>
  <rect x="10" y="110" width="100" height="140" fill="#1565C0" stroke="#FFFFFF" stroke-width="4"/>
  <rect x="370" y="110" width="100" height="140" fill="#1565C0" stroke="#FFFFFF" stroke-width="4"/>
</svg>`),
  },

  // ── FANTASY & MAGIC (NEW CATEGORY) ────────────────────────
  {
    name: 'Enchanted Forest',
    category: 'Fantasy & Magic',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="#1A0033"/>
  <ellipse cx="240" cy="360" rx="300" ry="120" fill="#330066"/>
  <circle cx="100" cy="180" r="60" fill="#7B1FA2" opacity="0.6"/>
  <circle cx="380" cy="160" r="70" fill="#4A148C" opacity="0.7"/>
  <circle cx="120" cy="280" r="14" fill="#00E5FF" opacity="0.8"/>
  <circle cx="280" cy="240" r="10" fill="#E040FB" opacity="0.9"/>
  <circle cx="360" cy="290" r="18" fill="#00E676" opacity="0.7"/>
</svg>`),
  },
  {
    name: 'Candy Land',
    category: 'Fantasy & Magic',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="#F8BBD0"/>
  <path d="M0,240 Q120,180 240,220 Q360,260 480,200 L480,360 L0,360Z" fill="#F48FB1"/>
  <circle cx="100" cy="180" r="26" fill="#FF4081"/>
  <circle cx="100" cy="180" r="16" fill="#FFFFFF"/>
  <circle cx="100" cy="180" r="8" fill="#FF4081"/>
  <rect x="96" y="206" width="8" height="60" fill="#FFF"/>
  <circle cx="380" cy="160" r="30" fill="#7C4DFF"/>
  <rect x="376" y="190" width="8" height="70" fill="#FFF"/>
</svg>`),
  },

  // ── MUSIC & DANCE (NEW CATEGORY) ─────────────────────────
  {
    name: 'Concert Stage',
    category: 'Music & Dance',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="#121212"/>
  <polygon points="40,0 140,0 220,260 0,260" fill="#D500F9" opacity="0.3"/>
  <polygon points="440,0 340,0 260,260 480,260" fill="#00E5FF" opacity="0.3"/>
  <rect y="260" width="480" height="100" fill="#212121"/>
  <circle cx="240" cy="40" r="18" fill="#FFFFFF" opacity="0.8"/>
</svg>`),
  },

  // ── PATTERNS & TECH (NEW CATEGORY) ───────────────────────
  {
    name: 'Grid / Graph',
    category: 'Patterns & Tech',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="#FFFFFF"/>
  <defs>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E0E0E0" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="480" height="360" fill="url(#grid)"/>
  <line x1="240" y1="0" x2="240" y2="360" stroke="#4C97FF" stroke-width="2"/>
  <line x1="0" y1="180" x2="480" y2="180" stroke="#4C97FF" stroke-width="2"/>
</svg>`),
  },
  {
    name: 'Synthwave',
    category: 'Patterns & Tech',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <rect width="480" height="360" fill="#0F051D"/>
  <circle cx="240" cy="180" r="70" fill="#FF007F"/>
  <rect y="180" width="480" height="180" fill="#170A2C"/>
  <line x1="0" y1="180" x2="480" y2="180" stroke="#00F0FF" stroke-width="2"/>
  <line x1="240" y1="180" x2="0" y2="360" stroke="#00F0FF" stroke-width="1.5"/>
  <line x1="240" y1="180" x2="120" y2="360" stroke="#00F0FF" stroke-width="1.5"/>
  <line x1="240" y1="180" x2="240" y2="360" stroke="#00F0FF" stroke-width="1.5"/>
  <line x1="240" y1="180" x2="360" y2="360" stroke="#00F0FF" stroke-width="1.5"/>
  <line x1="240" y1="180" x2="480" y2="360" stroke="#00F0FF" stroke-width="1.5"/>
  <line x1="0" y1="210" x2="480" y2="210" stroke="#FF007F" stroke-width="1"/>
  <line x1="0" y1="250" x2="480" y2="250" stroke="#FF007F" stroke-width="1"/>
  <line x1="0" y1="300" x2="480" y2="300" stroke="#FF007F" stroke-width="1"/>
</svg>`),
  },
];
