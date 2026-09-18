import { svg } from './svgHelper.js';

export const nature = [
  // ── SUN ──────────────────────────────────────────────────────────
  {
    name: 'Sun',
    category: 'Nature',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#FF6F00" stroke-width="2" stroke-linecap="round">
    <circle cx="48" cy="48" r="22" fill="#FFD54F"/>
    <line x1="48" y1="10" x2="48" y2="18"/>
    <line x1="48" y1="78" x2="48" y2="86"/>
    <line x1="10" y1="48" x2="18" y2="48"/>
    <line x1="78" y1="48" x2="86" y2="48"/>
    <line x1="21" y1="21" x2="27" y2="27"/>
    <line x1="69" y1="69" x2="75" y2="75"/>
    <line x1="21" y1="69" x2="27" y2="63"/>
    <line x1="69" y1="21" x2="75" y2="27"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'shining',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#FF6F00" stroke-width="2" stroke-linecap="round">
    <circle cx="48" cy="48" r="22" fill="#FFD54F"/>
    <line x1="48" y1="10" x2="48" y2="18"/>
    <line x1="48" y1="78" x2="48" y2="86"/>
    <line x1="10" y1="48" x2="18" y2="48"/>
    <line x1="78" y1="48" x2="86" y2="48"/>
    <line x1="21" y1="21" x2="27" y2="27"/>
    <line x1="69" y1="69" x2="75" y2="75"/>
    <line x1="21" y1="69" x2="27" y2="63"/>
    <line x1="69" y1="21" x2="75" y2="27"/>
  </g>
</svg>`)
      },
      {
        name: 'sunglasses',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#FF6F00" stroke-width="2" stroke-linecap="round">
    <!-- Wavy sun rays -->
    <path d="M48,8 Q52,14 48,20" stroke="#FF9100" stroke-width="2.5"/>
    <path d="M48,76 Q52,82 48,88" stroke="#FF9100" stroke-width="2.5"/>
    <path d="M8,48 Q14,52 20,48" stroke="#FF9100" stroke-width="2.5"/>
    <path d="M76,48 Q82,52 88,48" stroke="#FF9100" stroke-width="2.5"/>
    <path d="M20,20 Q26,24 28,28" stroke="#FF9100" stroke-width="2.5"/>
    <path d="M68,68 Q74,72 76,76" stroke="#FF9100" stroke-width="2.5"/>
    <path d="M20,76 Q26,72 28,68" stroke="#FF9100" stroke-width="2.5"/>
    <path d="M68,28 Q74,24 76,20" stroke="#FF9100" stroke-width="2.5"/>
    <circle cx="48" cy="48" r="24" fill="#FFCA28"/>
    <!-- Sunglasses -->
    <rect x="32" y="42" width="14" height="10" rx="3" fill="#212121" stroke="#212121"/>
    <rect x="50" y="42" width="14" height="10" rx="3" fill="#212121" stroke="#212121"/>
    <line x1="44" y1="46" x2="52" y2="46" stroke="#212121" stroke-width="2"/>
    <line x1="28" y1="44" x2="32" y2="46" stroke="#212121" stroke-width="2"/>
    <line x1="64" y1="46" x2="68" y2="44" stroke="#212121" stroke-width="2"/>
    <!-- Cool smile -->
    <path d="M40,58 Q48,66 56,58" stroke="#D84315" stroke-width="2"/>
  </g>
</svg>`)
      },
      {
        name: 'sunrise',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke-linecap="round">
    <!-- Warm horizon glow -->
    <rect x="8" y="58" width="80" height="26" fill="#FFE082" opacity="0.4" stroke="none"/>
    <line x1="6" y1="64" x2="90" y2="64" stroke="#FFA726" stroke-width="3"/>
    <!-- Half sun rising -->
    <path d="M24,64 A24,24 0 0,1 72,64 Z" fill="#FF7043" stroke="#E64A19" stroke-width="2"/>
    <!-- Rising radiant beams -->
    <line x1="48" y1="24" x2="48" y2="34" stroke="#FF9800" stroke-width="3"/>
    <line x1="28" y1="32" x2="36" y2="39" stroke="#FF9800" stroke-width="3"/>
    <line x1="68" y1="32" x2="60" y2="39" stroke="#FF9800" stroke-width="3"/>
    <line x1="16" y1="48" x2="26" y2="51" stroke="#FF9800" stroke-width="3"/>
    <line x1="80" y1="48" x2="70" y2="51" stroke="#FF9800" stroke-width="3"/>
  </g>
</svg>`)
      },
      {
        name: 'blazing',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <!-- Blazing flame spikes around edge -->
    <polygon points="48,4 53,20 48,16 43,20" fill="#FF3D00" stroke="#DD2C00" stroke-width="1"/>
    <polygon points="48,92 53,76 48,80 43,76" fill="#FF3D00" stroke="#DD2C00" stroke-width="1"/>
    <polygon points="4,48 20,53 16,48 20,43" fill="#FF3D00" stroke="#DD2C00" stroke-width="1"/>
    <polygon points="92,48 76,53 80,48 76,43" fill="#FF3D00" stroke="#DD2C00" stroke-width="1"/>
    <polygon points="18,18 32,26 27,24 26,30" fill="#FF6D00" stroke="#DD2C00" stroke-width="1"/>
    <polygon points="78,78 64,70 69,72 70,66" fill="#FF6D00" stroke="#DD2C00" stroke-width="1"/>
    <polygon points="18,78 26,66 27,72 32,70" fill="#FF6D00" stroke="#DD2C00" stroke-width="1"/>
    <polygon points="78,18 70,30 69,24 64,26" fill="#FF6D00" stroke="#DD2C00" stroke-width="1"/>
    <circle cx="48" cy="48" r="26" fill="#FF9100" stroke="#DD2C00" stroke-width="2"/>
    <circle cx="48" cy="48" r="18" fill="#FFEA00" stroke="#FF6D00" stroke-width="1.5"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── FLOWER ───────────────────────────────────────────────────────
  {
    name: 'Flower',
    category: 'Nature',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#880E4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="48" y1="48" x2="48" y2="88" stroke="#33691E" stroke-width="4"/>
    <path d="M48,68 Q64,60 68,68Z" fill="#76FF03" stroke="#33691E"/>
    <circle cx="48" cy="30" r="10" fill="#FF4081"/>
    <circle cx="30" cy="48" r="10" fill="#FF4081"/>
    <circle cx="66" cy="48" r="10" fill="#FF4081"/>
    <circle cx="48" cy="66" r="10" fill="#FF4081"/>
    <circle cx="48" cy="48" r="10" fill="#FFD54F" stroke="#FF6F00"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'pink-blossom',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#880E4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="48" y1="48" x2="48" y2="88" stroke="#33691E" stroke-width="4"/>
    <path d="M48,68 Q64,60 68,68Z" fill="#76FF03" stroke="#33691E"/>
    <circle cx="48" cy="30" r="10" fill="#FF4081"/>
    <circle cx="30" cy="48" r="10" fill="#FF4081"/>
    <circle cx="66" cy="48" r="10" fill="#FF4081"/>
    <circle cx="48" cy="66" r="10" fill="#FF4081"/>
    <circle cx="48" cy="48" r="10" fill="#FFD54F" stroke="#FF6F00"/>
  </g>
</svg>`)
      },
      {
        name: 'sunflower',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#E65100" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="48" y1="48" x2="48" y2="88" stroke="#33691E" stroke-width="4"/>
    <path d="M48,68 Q32,60 28,68Z" fill="#76FF03" stroke="#33691E"/>
    <path d="M48,64 Q64,56 68,64Z" fill="#76FF03" stroke="#33691E"/>
    <!-- 8 Golden Petals -->
    <circle cx="48" cy="28" r="9" fill="#FFD600"/>
    <circle cx="28" cy="48" r="9" fill="#FFD600"/>
    <circle cx="68" cy="48" r="9" fill="#FFD600"/>
    <circle cx="48" cy="68" r="9" fill="#FFD600"/>
    <circle cx="34" cy="34" r="9" fill="#FFC400"/>
    <circle cx="62" cy="34" r="9" fill="#FFC400"/>
    <circle cx="34" cy="62" r="9" fill="#FFC400"/>
    <circle cx="62" cy="62" r="9" fill="#FFC400"/>
    <!-- Seed center -->
    <circle cx="48" cy="48" r="13" fill="#5D4037" stroke="#3E2723"/>
    <circle cx="48" cy="48" r="10" fill="#3E2723"/>
  </g>
</svg>`)
      },
      {
        name: 'blue-violet',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#311B92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="48" y1="48" x2="48" y2="88" stroke="#2E7D32" stroke-width="4"/>
    <path d="M48,68 Q64,60 68,68Z" fill="#00E676" stroke="#1B5E20"/>
    <circle cx="48" cy="30" r="10" fill="#7C4DFF"/>
    <circle cx="30" cy="48" r="10" fill="#7C4DFF"/>
    <circle cx="66" cy="48" r="10" fill="#7C4DFF"/>
    <circle cx="48" cy="66" r="10" fill="#7C4DFF"/>
    <circle cx="48" cy="48" r="10" fill="#00E5FF" stroke="#0288D1"/>
    <!-- Dewdrop sparkle -->
    <circle cx="45" cy="45" r="2.5" fill="#FFF" stroke="none"/>
  </g>
</svg>`)
      },
      {
        name: 'breeze',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#880E4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Curved stem in breeze -->
    <path d="M48,88 Q48,68 60,52" stroke="#33691E" stroke-width="4"/>
    <path d="M52,72 Q68,66 70,72Z" fill="#76FF03" stroke="#33691E"/>
    <!-- Flower head angled -->
    <g transform="translate(12, -4)">
      <circle cx="48" cy="30" r="10" fill="#FF4081"/>
      <circle cx="30" cy="48" r="10" fill="#FF4081"/>
      <circle cx="66" cy="48" r="10" fill="#FF4081"/>
      <circle cx="48" cy="66" r="10" fill="#FF4081"/>
      <circle cx="48" cy="48" r="10" fill="#FFD54F" stroke="#FF6F00"/>
    </g>
    <!-- Wind breeze arcs -->
    <path d="M12,32 Q24,28 36,34" stroke="#81D4FA" stroke-width="2" stroke-linecap="round"/>
    <path d="M18,44 Q30,40 42,46" stroke="#81D4FA" stroke-width="2" stroke-linecap="round"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── CLOUD ────────────────────────────────────────────────────────
  {
    name: 'Cloud',
    category: 'Nature',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#0288D1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M26,64 L70,64 C80,64 86,54 80,44 C82,30 66,24 56,32 C48,20 30,24 30,38 C20,38 16,52 26,64Z" fill="#E0F7FA"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'fluffy',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#0288D1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M26,64 L70,64 C80,64 86,54 80,44 C82,30 66,24 56,32 C48,20 30,24 30,38 C20,38 16,52 26,64Z" fill="#E0F7FA"/>
  </g>
</svg>`)
      },
      {
        name: 'rain',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#455A64" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M26,56 L70,56 C80,56 86,46 80,36 C82,22 66,16 56,24 C48,12 30,16 30,30 C20,30 16,44 26,56Z" fill="#90A4AE"/>
    <!-- Raindrops falling -->
    <line x1="30" y1="64" x2="26" y2="76" stroke="#00E5FF" stroke-width="3" stroke-linecap="round"/>
    <line x1="44" y1="64" x2="40" y2="76" stroke="#00E5FF" stroke-width="3" stroke-linecap="round"/>
    <line x1="58" y1="64" x2="54" y2="76" stroke="#00E5FF" stroke-width="3" stroke-linecap="round"/>
    <line x1="72" y1="64" x2="68" y2="76" stroke="#00E5FF" stroke-width="3" stroke-linecap="round"/>
    <line x1="38" y1="78" x2="34" y2="90" stroke="#29B6F6" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="52" y1="78" x2="48" y2="90" stroke="#29B6F6" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="66" y1="78" x2="62" y2="90" stroke="#29B6F6" stroke-width="2.5" stroke-linecap="round"/>
  </g>
</svg>`)
      },
      {
        name: 'thunder',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#263238" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M26,52 L70,52 C80,52 86,42 80,32 C82,18 66,12 56,20 C48,8 30,12 30,26 C20,26 16,40 26,52Z" fill="#455A64"/>
    <!-- Sharp lightning bolt -->
    <polygon points="50,50 40,68 48,68 42,90 58,64 50,64" fill="#FFEA00" stroke="#FF8F00" stroke-width="1.5"/>
  </g>
</svg>`)
      },
      {
        name: 'sunset',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#C2185B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M26,64 L70,64 C80,64 86,54 80,44 C82,30 66,24 56,32 C48,20 30,24 30,38 C20,38 16,52 26,64Z" fill="#F8BBD0"/>
    <path d="M30,64 L66,64 C74,64 78,56 74,48 C68,54 52,56 40,54 C34,54 28,58 30,64Z" fill="#FF80AB" stroke="none"/>
    <circle cx="74" cy="28" r="4" fill="#FFD54F" stroke="#FFA000"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── TREE ─────────────────────────────────────────────────────────
  {
    name: 'Tree',
    category: 'Nature',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="42" y="62" width="12" height="24" rx="2" fill="#5D4037" stroke="#3E2723"/>
    <polygon points="48,8 20,42 76,42" fill="#2E7D32"/>
    <polygon points="48,22 24,52 72,52" fill="#4CAF50"/>
    <polygon points="48,34 28,62 68,62" fill="#2E7D32"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'pine',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="42" y="62" width="12" height="24" rx="2" fill="#5D4037" stroke="#3E2723"/>
    <polygon points="48,8 20,42 76,42" fill="#2E7D32"/>
    <polygon points="48,22 24,52 72,52" fill="#4CAF50"/>
    <polygon points="48,34 28,62 68,62" fill="#2E7D32"/>
  </g>
</svg>`)
      },
      {
        name: 'oak',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="42" y="60" width="12" height="26" rx="2" fill="#5D4037" stroke="#3E2723"/>
    <!-- Round bushy canopy -->
    <circle cx="48" cy="30" r="20" fill="#43A047"/>
    <circle cx="32" cy="42" r="16" fill="#388E3C"/>
    <circle cx="64" cy="42" r="16" fill="#388E3C"/>
    <circle cx="48" cy="46" r="18" fill="#4CAF50"/>
  </g>
</svg>`)
      },
      {
        name: 'autumn',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#BF360C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="42" y="60" width="12" height="26" rx="2" fill="#4E342E" stroke="#3E2723"/>
    <!-- Autumn foliage -->
    <circle cx="48" cy="30" r="20" fill="#FF5722"/>
    <circle cx="32" cy="42" r="16" fill="#E65100"/>
    <circle cx="64" cy="42" r="16" fill="#FB8C00"/>
    <circle cx="48" cy="46" r="18" fill="#FF9800"/>
    <!-- Falling leaves -->
    <ellipse cx="20" cy="66" rx="3" ry="5" fill="#FF5722" transform="rotate(30 20 66)"/>
    <ellipse cx="76" cy="72" rx="3" ry="5" fill="#FF9800" transform="rotate(-30 76 72)"/>
  </g>
</svg>`)
      },
      {
        name: 'winter-snow',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="42" y="62" width="12" height="24" rx="2" fill="#5D4037" stroke="#3E2723"/>
    <polygon points="48,8 20,42 76,42" fill="#2E7D32"/>
    <polygon points="48,22 24,52 72,52" fill="#388E3C"/>
    <polygon points="48,34 28,62 68,62" fill="#2E7D32"/>
    <!-- Snow caps on branches -->
    <path d="M48,8 L36,24 Q48,20 60,24 Z" fill="#ECEFF1" stroke="#B0BEC5"/>
    <path d="M28,42 Q48,38 68,42 L72,46 Q48,42 24,46 Z" fill="#ECEFF1" stroke="#B0BEC5"/>
    <path d="M26,56 Q48,52 70,56 L72,62 Q48,58 24,62 Z" fill="#ECEFF1" stroke="#B0BEC5"/>
  </g>
</svg>`)
      }
    ]
  }
];
