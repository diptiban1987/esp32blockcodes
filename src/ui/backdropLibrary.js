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
    name: 'Cloud',
    category: 'Outdoors',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <defs>
    <linearGradient id="cloudSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="60%" stop-color="#7DD3FC"/>
      <stop offset="100%" stop-color="#BAE6FD"/>
    </linearGradient>
    <radialGradient id="sunGlow" cx="20%" cy="20%" r="50%">
      <stop offset="0%" stop-color="#FEF08A" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#FDE047" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#FACC15" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="480" height="360" fill="url(#cloudSky)"/>
  <circle cx="80" cy="80" r="100" fill="url(#sunGlow)"/>
  <circle cx="80" cy="80" r="32" fill="#FDE047"/>
  <!-- Distant Soft Clouds -->
  <path d="M-20,180 Q20,150 60,170 Q100,140 150,165 Q200,145 250,175 Q300,155 350,170 Q400,140 450,165 Q480,155 500,175 L500,360 L-20,360Z" fill="#E0F2FE" opacity="0.6"/>
  <!-- Midground Clouds -->
  <path d="M-40,240 Q10,190 70,220 Q120,180 190,210 Q260,175 330,215 Q400,185 470,220 Q500,205 520,235 L520,360 L-40,360Z" fill="#F0F9FF" opacity="0.85"/>
  <!-- Foreground Main Fluffy Clouds -->
  <g fill="#FFFFFF">
    <ellipse cx="120" cy="300" rx="90" ry="45"/>
    <circle cx="90" cy="270" r="45"/>
    <circle cx="150" cy="265" r="50"/>
    <circle cx="210" cy="280" r="40"/>
    <ellipse cx="360" cy="310" rx="100" ry="50"/>
    <circle cx="310" cy="275" r="48"/>
    <circle cx="375" cy="265" r="52"/>
    <circle cx="430" cy="285" r="42"/>
  </g>
  <!-- Floating High Clouds -->
  <g fill="#FFFFFF" opacity="0.9">
    <ellipse cx="360" cy="110" rx="48" ry="18"/>
    <circle cx="340" cy="100" r="20"/>
    <circle cx="375" cy="98" r="22"/>
    <ellipse cx="180" cy="130" rx="36" ry="14"/>
    <circle cx="165" cy="122" r="16"/>
    <circle cx="192" cy="120" r="18"/>
  </g>
</svg>`),
  },
  {
    name: 'City',
    category: 'Outdoors',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <defs>
    <linearGradient id="citySky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="45%" stop-color="#312E81"/>
      <stop offset="75%" stop-color="#7C2D12"/>
      <stop offset="100%" stop-color="#EA580C"/>
    </linearGradient>
    <linearGradient id="cityRoad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
  </defs>
  <rect width="480" height="360" fill="url(#citySky)"/>
  <circle cx="390" cy="90" r="28" fill="#FEF08A" opacity="0.9"/>
  <!-- Distant Layer Buildings -->
  <g fill="#1E1B4B" opacity="0.7">
    <rect x="15" y="150" width="45" height="150"/>
    <polygon points="37,120 20,150 55,150"/>
    <rect x="70" y="110" width="55" height="190"/>
    <line x1="97" y1="110" x2="97" y2="75" stroke="#1E1B4B" stroke-width="2"/>
    <rect x="135" y="140" width="50" height="160"/>
    <rect x="195" y="100" width="60" height="200"/>
    <polygon points="225,65 200,100 250,100"/>
    <rect x="265" y="130" width="55" height="170"/>
    <rect x="330" y="115" width="60" height="185"/>
    <line x1="360" y1="115" x2="360" y2="85" stroke="#1E1B4B" stroke-width="2"/>
    <rect x="400" y="145" width="65" height="155"/>
  </g>
  <!-- Foreground Buildings -->
  <g fill="#0F172A">
    <rect x="0" y="170" width="50" height="130"/>
    <rect x="45" y="135" width="65" height="165"/>
    <rect x="120" y="90" width="70" height="210"/>
    <polygon points="155,50 125,90 185,90"/>
    <line x1="155" y1="50" x2="155" y2="25" stroke="#EF4444" stroke-width="2"/>
    <circle cx="155" cy="23" r="2" fill="#EF4444"/>
    <rect x="200" y="150" width="55" height="150"/>
    <rect x="265" y="110" width="75" height="190"/>
    <line x1="302" y1="110" x2="302" y2="70" stroke="#0F172A" stroke-width="3"/>
    <rect x="350" y="160" width="60" height="140"/>
    <rect x="420" y="125" width="60" height="175"/>
  </g>
  <!-- Illuminated Windows -->
  <g fill="#FDE047" opacity="0.85">
    <rect x="58" y="150" width="8" height="12" rx="1"/><rect x="74" y="150" width="8" height="12" rx="1"/><rect x="90" y="150" width="8" height="12" rx="1"/>
    <rect x="58" y="175" width="8" height="12" rx="1"/><rect x="90" y="175" width="8" height="12" rx="1"/>
    <rect x="58" y="200" width="8" height="12" rx="1"/><rect x="74" y="200" width="8" height="12" rx="1"/>
    <rect x="135" y="110" width="10" height="14" rx="1"/><rect x="155" y="110" width="10" height="14" rx="1"/><rect x="165" y="135" width="10" height="14" rx="1"/>
    <rect x="135" y="160" width="10" height="14" rx="1"/><rect x="155" y="160" width="10" height="14" rx="1"/>
    <rect x="135" y="190" width="10" height="14" rx="1"/><rect x="165" y="190" width="10" height="14" rx="1"/>
    <rect x="280" y="130" width="10" height="14" rx="1"/><rect x="305" y="130" width="10" height="14" rx="1"/>
    <rect x="280" y="155" width="10" height="14" rx="1"/><rect x="295" y="180" width="10" height="14" rx="1"/><rect x="315" y="180" width="10" height="14" rx="1"/>
    <rect x="365" y="180" width="8" height="12" rx="1"/><rect x="385" y="180" width="8" height="12" rx="1"/><rect x="385" y="205" width="8" height="12" rx="1"/>
    <rect x="435" y="145" width="9" height="13" rx="1"/><rect x="455" y="145" width="9" height="13" rx="1"/><rect x="435" y="170" width="9" height="13" rx="1"/>
  </g>
  <!-- Road & Streetlights -->
  <rect y="295" width="480" height="65" fill="url(#cityRoad)"/>
  <rect y="295" width="480" height="4" fill="#334155"/>
  <line x1="0" y1="330" x2="480" y2="330" stroke="#FDE047" stroke-width="3" stroke-dasharray="24 18"/>
  <!-- Street Lamps -->
  <g stroke="#64748B" stroke-width="2" fill="none">
    <path d="M60,295 L60,260 Q60,250 70,250 L75,250"/>
    <circle cx="75" cy="253" r="3" fill="#FDE047" stroke="#F59E0B" stroke-width="1"/>
    <path d="M240,295 L240,260 Q240,250 250,250 L255,250"/>
    <circle cx="255" cy="253" r="3" fill="#FDE047" stroke="#F59E0B" stroke-width="1"/>
    <path d="M420,295 L420,260 Q420,250 430,250 L435,250"/>
    <circle cx="435" cy="253" r="3" fill="#FDE047" stroke="#F59E0B" stroke-width="1"/>
  </g>
</svg>`),
  },
  {
    name: 'School',
    category: 'Outdoors',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <defs>
    <linearGradient id="schoolSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#E0F2FE"/>
    </linearGradient>
    <linearGradient id="schoolBrick" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#DC2626"/>
      <stop offset="100%" stop-color="#991B1B"/>
    </linearGradient>
    <linearGradient id="schoolRoof" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
  </defs>
  <rect width="480" height="360" fill="url(#schoolSky)"/>
  <circle cx="410" cy="65" r="28" fill="#FDE047"/>
  <!-- Distant Trees & Horizon -->
  <rect y="230" width="480" height="130" fill="#22C55E"/>
  <circle cx="40" cy="220" r="35" fill="#15803D"/>
  <circle cx="80" cy="215" r="40" fill="#16A34A"/>
  <circle cx="410" cy="215" r="38" fill="#16A34A"/>
  <circle cx="450" cy="220" r="32" fill="#15803D"/>
  <!-- Main School Building -->
  <!-- Left Wing -->
  <rect x="70" y="145" width="105" height="100" fill="url(#schoolBrick)" stroke="#7F1D1D" stroke-width="1.5"/>
  <!-- Right Wing -->
  <rect x="305" y="145" width="105" height="100" fill="url(#schoolBrick)" stroke="#7F1D1D" stroke-width="1.5"/>
  <!-- Center Main Section -->
  <rect x="160" y="125" width="160" height="120" fill="url(#schoolBrick)" stroke="#7F1D1D" stroke-width="1.5"/>
  <!-- Roof Tops -->
  <polygon points="65,145 175,145 120,115" fill="url(#schoolRoof)"/>
  <polygon points="305,145 415,145 360,115" fill="url(#schoolRoof)"/>
  <polygon points="150,125 330,125 240,85" fill="url(#schoolRoof)"/>
  <!-- Bell / Clock Tower -->
  <rect x="215" y="45" width="50" height="42" fill="#F8FAFC" stroke="#94A3B8" stroke-width="1.5"/>
  <polygon points="205,45 275,45 240,15" fill="#DC2626" stroke="#991B1B"/>
  <circle cx="240" cy="65" r="14" fill="#FFFFFF" stroke="#334155" stroke-width="2"/>
  <line x1="240" y1="65" x2="240" y2="56" stroke="#0F172A" stroke-width="2"/>
  <line x1="240" y1="65" x2="246" y2="65" stroke="#0F172A" stroke-width="1.5"/>
  <!-- Columns & Portico Entrance -->
  <rect x="200" y="185" width="80" height="60" fill="#F8FAFC" stroke="#CBD5E1"/>
  <polygon points="195,185 285,185 240,165" fill="#E2E8F0" stroke="#94A3B8"/>
  <rect x="205" y="185" width="8" height="60" fill="#FFFFFF" stroke="#CBD5E1"/>
  <rect x="267" y="185" width="8" height="60" fill="#FFFFFF" stroke="#CBD5E1"/>
  <!-- School Double Doors -->
  <rect x="222" y="202" width="17" height="43" fill="#3B82F6" stroke="#1D4ED8"/>
  <rect x="241" y="202" width="17" height="43" fill="#3B82F6" stroke="#1D4ED8"/>
  <circle cx="236" cy="225" r="1.5" fill="#FDE047"/>
  <circle cx="244" cy="225" r="1.5" fill="#FDE047"/>
  <!-- Windows -->
  <g fill="#BAE6FD" stroke="#F8FAFC" stroke-width="2">
    <rect x="90" y="165" width="26" height="32" rx="2"/><rect x="130" y="165" width="26" height="32" rx="2"/>
    <rect x="90" y="205" width="26" height="30" rx="2"/><rect x="130" y="205" width="26" height="30" rx="2"/>
    <rect x="325" y="165" width="26" height="32" rx="2"/><rect x="365" y="165" width="26" height="32" rx="2"/>
    <rect x="325" y="205" width="26" height="30" rx="2"/><rect x="365" y="205" width="26" height="30" rx="2"/>
    <rect x="175" y="140" width="26" height="32" rx="2"/><rect x="279" y="140" width="26" height="32" rx="2"/>
  </g>
  <!-- Entry Stairs & Pathway -->
  <rect x="200" y="245" width="80" height="6" fill="#94A3B8"/>
  <rect x="195" y="251" width="90" height="6" fill="#64748B"/>
  <polygon points="210,257 270,257 320,360 160,360" fill="#E2E8F0"/>
  <!-- Flagpole -->
  <line x1="45" y1="280" x2="45" y2="150" stroke="#94A3B8" stroke-width="3"/>
  <polygon points="46,152 75,162 46,172" fill="#EF4444" stroke="#DC2626"/>
  <circle cx="45" cy="148" r="3.5" fill="#FDE047"/>
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
  <defs>
    <linearGradient id="classWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FEF3C7"/>
      <stop offset="100%" stop-color="#FDE68A"/>
    </linearGradient>
    <linearGradient id="classFloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#D97706"/>
      <stop offset="100%" stop-color="#92400E"/>
    </linearGradient>
    <linearGradient id="chalkboard" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#065F46"/>
      <stop offset="100%" stop-color="#064E3B"/>
    </linearGradient>
  </defs>
  <!-- Wall & Floor -->
  <rect width="480" height="250" fill="url(#classWall)"/>
  <rect y="250" width="480" height="110" fill="url(#classFloor)"/>
  <!-- Floor Planks -->
  <line x1="0" y1="250" x2="480" y2="250" stroke="#78350F" stroke-width="3"/>
  <line x1="60" y1="250" x2="20" y2="360" stroke="#78350F" stroke-width="1.5" opacity="0.6"/>
  <line x1="160" y1="250" x2="130" y2="360" stroke="#78350F" stroke-width="1.5" opacity="0.6"/>
  <line x1="260" y1="250" x2="240" y2="360" stroke="#78350F" stroke-width="1.5" opacity="0.6"/>
  <line x1="360" y1="250" x2="350" y2="360" stroke="#78350F" stroke-width="1.5" opacity="0.6"/>
  <line x1="440" y1="250" x2="445" y2="360" stroke="#78350F" stroke-width="1.5" opacity="0.6"/>
  <!-- Classroom Window Left -->
  <rect x="20" y="30" width="75" height="120" fill="#BAE6FD" stroke="#FFFFFF" stroke-width="6" rx="2"/>
  <line x1="57" y1="30" x2="57" y2="150" stroke="#FFFFFF" stroke-width="4"/>
  <line x1="20" y1="90" x2="95" y2="90" stroke="#FFFFFF" stroke-width="4"/>
  <circle cx="45" cy="55" r="14" fill="#FDE047" opacity="0.9"/>
  <!-- Large Central Chalkboard -->
  <rect x="120" y="25" width="240" height="145" rx="6" fill="#78350F" stroke="#451A03" stroke-width="3"/>
  <rect x="128" y="33" width="224" height="129" rx="3" fill="url(#chalkboard)"/>
  <!-- Chalkboard Writing -->
  <text x="145" y="65" font-family="'Comic Sans MS', sans-serif" font-size="18" font-weight="bold" fill="#FFFFFF" opacity="0.95">ABC  123</text>
  <text x="145" y="95" font-family="'Comic Sans MS', sans-serif" font-size="14" fill="#FEF08A" opacity="0.9">2 + 2 = 4</text>
  <text x="145" y="125" font-family="'Comic Sans MS', sans-serif" font-size="14" fill="#A7F3D0" opacity="0.9">Welcome to Class!</text>
  <!-- Chalk Tray & Chalks -->
  <rect x="120" y="167" width="240" height="6" rx="2" fill="#B45309" stroke="#78350F"/>
  <rect x="150" y="164" width="12" height="4" fill="#FFFFFF" rx="1"/>
  <rect x="166" y="164" width="12" height="4" fill="#FEF08A" rx="1"/>
  <rect x="310" y="163" width="22" height="5" fill="#475569" rx="1"/>
  <!-- Classroom Clock -->
  <circle cx="410" cy="50" r="22" fill="#FFFFFF" stroke="#334155" stroke-width="3"/>
  <circle cx="410" cy="50" r="2" fill="#0F172A"/>
  <line x1="410" y1="50" x2="410" y2="36" stroke="#0F172A" stroke-width="2"/>
  <line x1="410" y1="50" x2="422" y2="50" stroke="#DC2626" stroke-width="1.5"/>
  <!-- Wall Educational Poster -->
  <rect x="385" y="88" width="75" height="65" rx="3" fill="#EFF6FF" stroke="#3B82F6" stroke-width="2"/>
  <text x="395" y="108" font-family="sans-serif" font-size="10" font-weight="bold" fill="#1E40AF">WORLD</text>
  <circle cx="422" cy="128" r="14" fill="#60A5FA" opacity="0.5"/>
  <path d="M415,122 Q425,120 428,128 Q422,136 415,128 Z" fill="#22C55E"/>
  <!-- Teacher's Desk -->
  <polygon points="160,205 320,205 340,240 140,240" fill="#9A3412" stroke="#78350F" stroke-width="1.5"/>
  <rect x="155" y="240" width="170" height="55" fill="#7C2D12" stroke="#451A03" stroke-width="1.5"/>
  <!-- Drawers on Teacher Desk -->
  <rect x="255" y="246" width="60" height="20" fill="#9A3412" stroke="#451A03"/>
  <rect x="255" y="269" width="60" height="20" fill="#9A3412" stroke="#451A03"/>
  <circle cx="285" cy="256" r="2" fill="#FDE047"/>
  <circle cx="285" cy="279" r="2" fill="#FDE047"/>
  <!-- Apple & Stack of Books on Teacher Desk -->
  <rect x="175" y="222" width="34" height="6" fill="#3B82F6" rx="1"/>
  <rect x="178" y="216" width="30" height="6" fill="#10B981" rx="1"/>
  <rect x="180" y="210" width="26" height="6" fill="#F59E0B" rx="1"/>
  <circle cx="225" cy="216" r="7" fill="#DC2626"/>
  <path d="M225,209 Q228,206 230,207" stroke="#15803D" stroke-width="1.5" fill="none"/>
  <!-- Student Desk Silhouette in foreground -->
  <polygon points="40,290 120,290 135,335 25,335" fill="#B45309" stroke="#78350F" opacity="0.85"/>
  <polygon points="360,290 440,290 455,335 345,335" fill="#B45309" stroke="#78350F" opacity="0.85"/>
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
    name: 'Fish Tank',
    category: 'Water',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <defs>
    <linearGradient id="tankWater" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="40%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#0369A1"/>
    </linearGradient>
    <linearGradient id="tankGravel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FCD34D"/>
      <stop offset="40%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#B45309"/>
    </linearGradient>
    <linearGradient id="tankFrame" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
  </defs>
  <!-- Tank Glass Background -->
  <rect width="480" height="360" fill="url(#tankWater)"/>
  <!-- Sunlight Caustics / Water Surface Shimmer -->
  <g stroke="#FFFFFF" stroke-width="2" opacity="0.3" fill="none">
    <path d="M30,30 Q80,45 130,25 Q180,50 240,30 Q300,55 360,35 Q420,50 460,30"/>
    <path d="M60,55 Q120,70 180,45 Q240,75 310,50 Q380,70 430,55"/>
    <path d="M100,90 Q170,110 240,85 Q320,115 390,90"/>
  </g>
  <!-- Aquarium Castle Ornament -->
  <g fill="#64748B" stroke="#334155" stroke-width="1.5">
    <rect x="290" y="210" width="80" height="75"/>
    <!-- Castle Turrets -->
    <rect x="280" y="180" width="25" height="105"/>
    <polygon points="275,180 310,180 292,150" fill="#0284C7"/>
    <rect x="355" y="180" width="25" height="105"/>
    <polygon points="350,180 385,180 367,150" fill="#0284C7"/>
    <!-- Castle Archway Door -->
    <path d="M315,285 L315,250 Q330,235 345,250 L345,285 Z" fill="#0F172A"/>
  </g>
  <!-- Air Stone Bubbler on Left -->
  <rect x="65" y="300" width="20" height="12" rx="3" fill="#475569" stroke="#1E293B"/>
  <g fill="#FFFFFF" opacity="0.6">
    <circle cx="75" cy="285" r="3.5"/><circle cx="72" cy="265" r="4"/><circle cx="78" cy="240" r="5"/>
    <circle cx="74" cy="210" r="4.5"/><circle cx="76" cy="175" r="6"/><circle cx="71" cy="140" r="5.5"/>
    <circle cx="77" cy="105" r="6.5"/><circle cx="73" cy="70" r="7"/><circle cx="75" cy="40" r="8"/>
    <!-- Secondary random bubbles -->
    <circle cx="210" cy="220" r="4"/><circle cx="215" cy="180" r="5"/><circle cx="208" cy="130" r="6"/>
    <circle cx="410" cy="240" r="3.5"/><circle cx="415" cy="190" r="5"/><circle cx="408" cy="150" r="5.5"/>
  </g>
  <!-- Sea Grass / Kelp Plants -->
  <g fill="none" stroke-linecap="round">
    <path d="M120,310 Q90,230 130,170 Q100,110 120,60" stroke="#10B981" stroke-width="8" opacity="0.9"/>
    <path d="M140,310 Q165,240 135,180 Q160,120 145,80" stroke="#059669" stroke-width="7" opacity="0.85"/>
    <path d="M100,310 Q120,250 95,200 Q125,140 105,95" stroke="#34D399" stroke-width="6" opacity="0.9"/>
    <path d="M400,310 Q430,240 395,180 Q425,120 405,70" stroke="#10B981" stroke-width="8" opacity="0.9"/>
    <path d="M425,310 Q395,250 430,195 Q400,135 420,90" stroke="#059669" stroke-width="7" opacity="0.85"/>
    <path d="M450,310 Q470,260 445,210 Q465,155 450,110" stroke="#34D399" stroke-width="6" opacity="0.9"/>
  </g>
  <!-- Bottom Colorful Gravel -->
  <path d="M0,305 Q120,295 240,308 Q360,298 480,305 L480,360 L0,360 Z" fill="url(#tankGravel)"/>
  <!-- Gravel Pebbles Texture -->
  <g opacity="0.7">
    <circle cx="40" cy="325" r="4" fill="#EF4444"/><circle cx="55" cy="335" r="5" fill="#3B82F6"/><circle cx="90" cy="328" r="4" fill="#10B981"/>
    <circle cx="150" cy="330" r="5" fill="#EC4899"/><circle cx="210" cy="325" r="4" fill="#8B5CF6"/><circle cx="270" cy="335" r="5" fill="#06B6D4"/>
    <circle cx="330" cy="326" r="4.5" fill="#F97316"/><circle cx="390" cy="332" r="5" fill="#EAB308"/><circle cx="440" cy="328" r="4" fill="#10B981"/>
  </g>
  <!-- Aquarium Glass Outer Frame -->
  <rect x="0" y="0" width="480" height="12" fill="url(#tankFrame)"/>
  <rect x="0" y="348" width="480" height="12" fill="url(#tankFrame)"/>
  <rect x="0" y="0" width="10" height="360" fill="url(#tankFrame)"/>
  <rect x="470" y="0" width="10" height="360" fill="url(#tankFrame)"/>
  <!-- Glass Corner Specular Reflection -->
  <polygon points="12,12 80,12 12,140" fill="#FFFFFF" opacity="0.12"/>
</svg>`),
  },
  {
    name: 'Under Water Sea',
    category: 'Water',
    type: 'svg',
    value: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
  <defs>
    <linearGradient id="seaWater" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="35%" stop-color="#0369A1"/>
      <stop offset="70%" stop-color="#075985"/>
      <stop offset="100%" stop-color="#0C4A6E"/>
    </linearGradient>
    <linearGradient id="seaSunbeam" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#BAE6FD" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#0284C7" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="seaSand" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FDE68A"/>
      <stop offset="50%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
  </defs>
  <!-- Deep Blue Water -->
  <rect width="480" height="360" fill="url(#seaWater)"/>
  <!-- Sun Rays Filtering Down -->
  <polygon points="60,0 120,0 200,320 100,320" fill="url(#seaSunbeam)"/>
  <polygon points="180,0 260,0 360,320 250,320" fill="url(#seaSunbeam)"/>
  <polygon points="320,0 390,0 470,320 380,320" fill="url(#seaSunbeam)"/>
  <!-- Distant Ocean Drop-off Ridge -->
  <path d="M0,240 Q140,210 280,235 Q380,220 480,245 L480,360 L0,360 Z" fill="#0369A1" opacity="0.6"/>
  <!-- Sandy Sea Floor -->
  <path d="M0,275 Q100,260 200,278 Q320,262 480,280 L480,360 L0,360 Z" fill="url(#seaSand)"/>
  <!-- Coral Reef Formations Left -->
  <g fill="#F43F5E" stroke="#E11D48" stroke-width="1.5">
    <path d="M20,290 C5,240 30,220 35,250 C40,210 65,220 55,260 C70,230 85,250 70,290 Z"/>
    <circle cx="32" cy="235" r="4" fill="#FDA4AF"/>
    <circle cx="50" cy="225" r="4" fill="#FDA4AF"/>
  </g>
  <!-- Purple Coral Center-Right -->
  <g fill="#A855F7" stroke="#7E22CE" stroke-width="1.5">
    <path d="M380,285 C360,230 390,210 400,245 C410,205 435,215 425,255 C440,225 460,245 445,290 Z"/>
    <circle cx="395" cy="225" r="4" fill="#E9D5FF"/>
    <circle cx="420" cy="218" r="4" fill="#E9D5FF"/>
  </g>
  <!-- Yellow Brain Coral & Sea Anemone -->
  <ellipse cx="140" cy="295" rx="22" ry="14" fill="#FACC15" stroke="#CA8A04" stroke-width="1.5"/>
  <path d="M125,295 Q140,285 155,295 M130,290 Q140,300 150,290" stroke="#CA8A04" stroke-width="1.5" fill="none"/>
  <!-- Starfish on Seabed -->
  <polygon points="260,305 264,315 275,315 266,322 270,332 260,326 250,332 254,322 245,315 256,315" fill="#FB923C" stroke="#EA580C" stroke-width="1"/>
  <!-- Sea Shell -->
  <path d="M320,325 Q330,310 340,325 Q330,330 320,325 Z" fill="#FDE047" stroke="#D97706"/>
  <!-- Ascending Deep Sea Bubbles -->
  <g fill="#BAE6FD" opacity="0.65">
    <circle cx="160" cy="180" r="5"/><circle cx="164" cy="140" r="6"/><circle cx="158" cy="95" r="7.5"/>
    <circle cx="290" cy="220" r="4"/><circle cx="286" cy="170" r="5.5"/><circle cx="292" cy="120" r="7"/>
    <circle cx="350" cy="150" r="4.5"/><circle cx="355" cy="100" r="6"/><circle cx="348" cy="50" r="7.5"/>
  </g>
</svg>`),
  },
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
