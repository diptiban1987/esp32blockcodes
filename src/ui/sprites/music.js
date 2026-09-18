import { svg } from './svgHelper.js';

export const music = [
  // ── PIANO ────────────────────────────────────────────────────────
  {
    name: 'Piano',
    category: 'Music',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="14" y="24" width="68" height="48" rx="4" fill="#212121"/>
    <rect x="18" y="44" width="60" height="24" rx="2" fill="#FFFFFF"/>
    <rect x="26" y="44" width="6" height="14" fill="#212121"/>
    <rect x="36" y="44" width="6" height="14" fill="#212121"/>
    <rect x="50" y="44" width="6" height="14" fill="#212121"/>
    <rect x="60" y="44" width="6" height="14" fill="#212121"/>
    <rect x="70" y="44" width="6" height="14" fill="#212121"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'grand',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="14" y="24" width="68" height="48" rx="4" fill="#212121"/>
    <rect x="18" y="44" width="60" height="24" rx="2" fill="#FFFFFF"/>
    <rect x="26" y="44" width="6" height="14" fill="#212121"/>
    <rect x="36" y="44" width="6" height="14" fill="#212121"/>
    <rect x="50" y="44" width="6" height="14" fill="#212121"/>
    <rect x="60" y="44" width="6" height="14" fill="#212121"/>
    <rect x="70" y="44" width="6" height="14" fill="#212121"/>
  </g>
</svg>`)
      },
      {
        name: 'playing',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="14" y="24" width="68" height="48" rx="4" fill="#212121"/>
    <rect x="18" y="44" width="60" height="24" rx="2" fill="#FFFFFF"/>
    <!-- Keys with some pressed down and music notes rising -->
    <rect x="26" y="44" width="6" height="14" fill="#212121"/>
    <rect x="36" y="44" width="6" height="14" fill="#212121"/>
    <rect x="50" y="46" width="6" height="14" fill="#00E5FF"/>
    <rect x="60" y="44" width="6" height="14" fill="#212121"/>
    <rect x="70" y="46" width="6" height="14" fill="#00E5FF"/>
    <!-- Floating notes -->
    <path d="M48,16 L56,12 L56,22 M48,26 A3,3 0 1,1 48,20 L48,16" stroke="#FFD600" stroke-width="2" fill="#FFD600"/>
    <circle cx="28" cy="18" r="3" fill="#FF4081" stroke="none"/>
    <circle cx="68" cy="16" r="2.5" fill="#76FF03" stroke="none"/>
  </g>
</svg>`)
      },
      {
        name: 'white',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#90A4AE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="14" y="24" width="68" height="48" rx="4" fill="#ECEFF1" stroke="#78909C"/>
    <rect x="18" y="44" width="60" height="24" rx="2" fill="#FFFFFF" stroke="#B0BEC5"/>
    <rect x="26" y="44" width="6" height="14" fill="#37474F" stroke="#263238"/>
    <rect x="36" y="44" width="6" height="14" fill="#37474F" stroke="#263238"/>
    <rect x="50" y="44" width="6" height="14" fill="#37474F" stroke="#263238"/>
    <rect x="60" y="44" width="6" height="14" fill="#37474F" stroke="#263238"/>
    <rect x="70" y="44" width="6" height="14" fill="#37474F" stroke="#263238"/>
    <line x1="20" y1="32" x2="76" y2="32" stroke="#FFD700" stroke-width="2"/>
  </g>
</svg>`)
      },
      {
        name: 'synth',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1A237E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="14" y="24" width="68" height="48" rx="4" fill="#0D47A1"/>
    <!-- LED display panel -->
    <rect x="20" y="28" width="56" height="12" rx="2" fill="#000"/>
    <line x1="24" y1="34" x2="40" y2="34" stroke="#00E5FF" stroke-width="2"/>
    <circle cx="50" cy="34" r="2" fill="#FF1744"/>
    <circle cx="58" cy="34" r="2" fill="#00E676"/>
    <circle cx="66" cy="34" r="2" fill="#FFD600"/>
    <!-- Keys -->
    <rect x="18" y="44" width="60" height="24" rx="2" fill="#E1F5FE"/>
    <rect x="26" y="44" width="6" height="14" fill="#1A237E"/>
    <rect x="36" y="44" width="6" height="14" fill="#1A237E"/>
    <rect x="50" y="44" width="6" height="14" fill="#1A237E"/>
    <rect x="60" y="44" width="6" height="14" fill="#1A237E"/>
    <rect x="70" y="44" width="6" height="14" fill="#1A237E"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── DRUMS ────────────────────────────────────────────────────────
  {
    name: 'Drums',
    category: 'Music',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="34" rx="34" ry="12" fill="#ECEFF1"/>
    <rect x="14" y="34" width="68" height="36" fill="#E53935"/>
    <ellipse cx="48" cy="70" rx="34" ry="12" fill="#B71C1C"/>
    <line x1="20" y1="36" x2="32" y2="70"/>
    <line x1="48" y1="44" x2="32" y2="70"/>
    <line x1="48" y1="44" x2="64" y2="70"/>
    <line x1="76" y1="36" x2="64" y2="70"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'red',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="34" rx="34" ry="12" fill="#ECEFF1"/>
    <rect x="14" y="34" width="68" height="36" fill="#E53935"/>
    <ellipse cx="48" cy="70" rx="34" ry="12" fill="#B71C1C"/>
    <line x1="20" y1="36" x2="32" y2="70"/>
    <line x1="48" y1="44" x2="32" y2="70"/>
    <line x1="48" y1="44" x2="64" y2="70"/>
    <line x1="76" y1="36" x2="64" y2="70"/>
  </g>
</svg>`)
      },
      {
        name: 'hit',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Drumsticks striking -->
    <line x1="22" y1="12" x2="42" y2="30" stroke="#8D6E63" stroke-width="4" stroke-linecap="round"/>
    <line x1="74" y1="12" x2="54" y2="30" stroke="#8D6E63" stroke-width="4" stroke-linecap="round"/>
    <!-- Vibration bursts -->
    <ellipse cx="48" cy="34" rx="34" ry="12" fill="#FFF"/>
    <ellipse cx="48" cy="34" rx="14" ry="5" stroke="#FFD600" stroke-width="2"/>
    <rect x="14" y="34" width="68" height="36" fill="#E53935"/>
    <ellipse cx="48" cy="70" rx="34" ry="12" fill="#B71C1C"/>
    <line x1="20" y1="36" x2="32" y2="70"/>
    <line x1="48" y1="44" x2="32" y2="70"/>
    <line x1="48" y1="44" x2="64" y2="70"/>
    <line x1="76" y1="36" x2="64" y2="70"/>
  </g>
</svg>`)
      },
      {
        name: 'blue',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#0D47A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="34" rx="34" ry="12" fill="#E1F5FE"/>
    <rect x="14" y="34" width="68" height="36" fill="#1E88E5"/>
    <ellipse cx="48" cy="70" rx="34" ry="12" fill="#0D47A1"/>
    <line x1="20" y1="36" x2="32" y2="70" stroke="#FFF"/>
    <line x1="48" y1="44" x2="32" y2="70" stroke="#FFF"/>
    <line x1="48" y1="44" x2="64" y2="70" stroke="#FFF"/>
    <line x1="76" y1="36" x2="64" y2="70" stroke="#FFF"/>
  </g>
</svg>`)
      },
      {
        name: 'cymbal',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Brass Cymbal on stand -->
    <line x1="74" y1="18" x2="74" y2="60" stroke="#78909C" stroke-width="3"/>
    <ellipse cx="74" cy="18" rx="18" ry="6" fill="#FFD54F" stroke="#FF8F00" stroke-width="2" transform="rotate(-15 74 18)"/>
    <!-- Main Drum -->
    <ellipse cx="42" cy="42" rx="28" ry="10" fill="#ECEFF1"/>
    <rect x="14" y="42" width="56" height="30" fill="#E53935"/>
    <ellipse cx="42" cy="72" rx="28" ry="10" fill="#B71C1C"/>
    <line x1="18" y1="44" x2="28" y2="72"/>
    <line x1="42" y1="50" x2="28" y2="72"/>
    <line x1="42" y1="50" x2="56" y2="72"/>
    <line x1="66" y1="44" x2="56" y2="72"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── MICROPHONE ───────────────────────────────────────────────────
  {
    name: 'Microphone',
    category: 'Music',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="36" y="14" width="24" height="32" rx="12" fill="#90A4AE"/>
    <line x1="36" y1="28" x2="60" y2="28" stroke="#37474F"/>
    <path d="M28,32 C28,52 68,52 68,32" stroke="#37474F" stroke-width="3"/>
    <line x1="48" y1="50" x2="48" y2="72" stroke="#37474F" stroke-width="4"/>
    <rect x="36" y="72" width="24" height="8" rx="3" fill="#37474F"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'studio',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="36" y="14" width="24" height="32" rx="12" fill="#90A4AE"/>
    <line x1="36" y1="28" x2="60" y2="28" stroke="#37474F"/>
    <path d="M28,32 C28,52 68,52 68,32" stroke="#37474F" stroke-width="3"/>
    <line x1="48" y1="50" x2="48" y2="72" stroke="#37474F" stroke-width="4"/>
    <rect x="36" y="72" width="24" height="8" rx="3" fill="#37474F"/>
  </g>
</svg>`)
      },
      {
        name: 'on-air',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="36" y="14" width="24" height="32" rx="12" fill="#FF5252"/>
    <line x1="36" y1="28" x2="60" y2="28" stroke="#B71C1C"/>
    <path d="M28,32 C28,52 68,52 68,32" stroke="#37474F" stroke-width="3"/>
    <line x1="48" y1="50" x2="48" y2="72" stroke="#37474F" stroke-width="4"/>
    <rect x="36" y="72" width="24" height="8" rx="3" fill="#37474F"/>
    <!-- Soundwaves -->
    <path d="M22,24 C16,30 16,36 22,42" stroke="#FF1744" stroke-width="2.5"/>
    <path d="M74,24 C80,30 80,36 74,42" stroke="#FF1744" stroke-width="2.5"/>
  </g>
</svg>`)
      },
      {
        name: 'gold',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#B27B00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="36" y="14" width="24" height="32" rx="12" fill="#FFD54F"/>
    <line x1="36" y1="28" x2="60" y2="28" stroke="#FF8F00"/>
    <path d="M28,32 C28,52 68,52 68,32" stroke="#FF8F00" stroke-width="3"/>
    <line x1="48" y1="50" x2="48" y2="72" stroke="#FF8F00" stroke-width="4"/>
    <rect x="36" y="72" width="24" height="8" rx="3" fill="#FFA000"/>
    <circle cx="48" cy="22" r="3" fill="#FFF" stroke="none"/>
  </g>
</svg>`)
      },
      {
        name: 'handheld',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-25 48 48)">
    <circle cx="48" cy="24" r="16" fill="#CFD8DC" stroke="#37474F" stroke-width="2"/>
    <line x1="36" y1="24" x2="60" y2="24" stroke="#78909C"/>
    <line x1="48" y1="12" x2="48" y2="36" stroke="#78909C"/>
    <polygon points="42,38 54,38 50,84 46,84" fill="#263238" stroke="#212121"/>
    <rect x="46" y="50" width="4" height="8" rx="1" fill="#FF1744" stroke="none"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── MUSIC NOTE ───────────────────────────────────────────────────
  {
    name: 'Music Note',
    category: 'Music',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="#7C4DFF" stroke="#311B92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="30" cy="68" rx="10" ry="7"/>
    <ellipse cx="68" cy="56" rx="10" ry="7"/>
    <rect x="36" y="20" width="6" height="48"/>
    <rect x="74" y="20" width="6" height="36"/>
    <polygon points="36,20 80,10 80,22 36,32" fill="#7C4DFF"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'double-note',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="#7C4DFF" stroke="#311B92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="30" cy="68" rx="10" ry="7"/>
    <ellipse cx="68" cy="56" rx="10" ry="7"/>
    <rect x="36" y="20" width="6" height="48"/>
    <rect x="74" y="20" width="6" height="36"/>
    <polygon points="36,20 80,10 80,22 36,32" fill="#7C4DFF"/>
  </g>
</svg>`)
      },
      {
        name: 'single-note',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="#00E5FF" stroke="#0091EA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="40" cy="68" rx="12" ry="8" transform="rotate(-20 40 68)"/>
    <rect x="48" y="20" width="6" height="48"/>
    <path d="M54,20 C66,20 74,32 74,44 C68,34 60,34 54,32 Z" fill="#00E5FF"/>
  </g>
</svg>`)
      },
      {
        name: 'melody',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="#FF4081" stroke="#C2185B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="28" cy="64" rx="9" ry="6"/>
    <ellipse cx="64" cy="52" rx="9" ry="6"/>
    <rect x="34" y="22" width="5" height="42"/>
    <rect x="70" y="22" width="5" height="30"/>
    <polygon points="34,22 75,12 75,22 34,32" fill="#FF4081"/>
    <!-- Joyful stars -->
    <polygon points="20,24 22,20 24,24 28,25 24,27 22,31 20,27 16,25" fill="#FFD600" stroke="none"/>
    <polygon points="80,38 82,34 84,38 88,39 84,41 82,45 80,41 76,39" fill="#00E676" stroke="none"/>
  </g>
</svg>`)
      },
      {
        name: 'triple-harmony',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="#FFD600" stroke="#FF6F00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="24" cy="68" rx="8" ry="6"/>
    <ellipse cx="50" cy="58" rx="8" ry="6"/>
    <ellipse cx="76" cy="48" rx="8" ry="6"/>
    <rect x="29" y="18" width="4" height="50"/>
    <rect x="55" y="18" width="4" height="40"/>
    <rect x="81" y="18" width="4" height="30"/>
    <polygon points="29,18 85,8 85,16 29,26" fill="#FF9100"/>
  </g>
</svg>`)
      }
    ]
  }
];
