import { svg } from './svgHelper.js';
import { MAZE_PNG, QUADRANT_PNG } from '../libraryAssets.js';

export const things = [
  // ── MAZE ─────────────────────────────────────────────────────────
  {
    name: 'Maze',
    category: 'Things',
    svg: MAZE_PNG,
    costumes: [
      {
        name: 'original',
        src: MAZE_PNG
      },
      {
        name: 'blue-labyrinth',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <rect width="96" height="96" fill="#0D47A1" rx="8"/>
  <path d="M12,12 L84,12 L84,84 L12,84 Z" fill="none" stroke="#64B5F6" stroke-width="4"/>
  <path d="M12,28 L36,28 L36,52 L24,52" fill="none" stroke="#64B5F6" stroke-width="4"/>
  <path d="M52,12 L52,36 L72,36" fill="none" stroke="#64B5F6" stroke-width="4"/>
  <path d="M36,68 L52,68 L52,52 L84,52" fill="none" stroke="#64B5F6" stroke-width="4"/>
  <path d="M68,68 L68,84" fill="none" stroke="#64B5F6" stroke-width="4"/>
  <circle cx="24" cy="20" r="4" fill="#FF5252"/>
  <circle cx="76" cy="76" r="4" fill="#00E676"/>
</svg>`)
      },
      {
        name: 'neon-grid',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <rect width="96" height="96" fill="#121212" rx="8"/>
  <path d="M8,8 L88,8 L88,88 L8,88 Z" fill="none" stroke="#00E5FF" stroke-width="3"/>
  <path d="M24,8 L24,40 L48,40" fill="none" stroke="#00E5FF" stroke-width="3"/>
  <path d="M48,24 L72,24 L72,56" fill="none" stroke="#00E5FF" stroke-width="3"/>
  <path d="M8,56 L32,56 L32,76" fill="none" stroke="#00E5FF" stroke-width="3"/>
  <path d="M48,64 L48,88 M64,72 L88,72" fill="none" stroke="#00E5FF" stroke-width="3"/>
  <circle cx="80" cy="16" r="4" fill="#FF4081"/>
  <circle cx="16" cy="80" r="4" fill="#76FF03"/>
</svg>`)
      },
      {
        name: 'circular-maze',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <circle cx="48" cy="48" r="44" fill="#263238"/>
  <circle cx="48" cy="48" r="40" fill="none" stroke="#FFD54F" stroke-width="3"/>
  <circle cx="48" cy="48" r="28" fill="none" stroke="#FFD54F" stroke-width="3" stroke-dasharray="120,30"/>
  <circle cx="48" cy="48" r="16" fill="none" stroke="#FFD54F" stroke-width="3" stroke-dasharray="70,25"/>
  <circle cx="48" cy="48" r="5" fill="#FF5252"/>
</svg>`)
      }
    ]
  },

  // ── QUADRANT ─────────────────────────────────────────────────────
  {
    name: 'Quadrant',
    category: 'Things',
    svg: QUADRANT_PNG,
    costumes: [
      {
        name: 'original',
        src: QUADRANT_PNG
      },
      {
        name: 'coordinate-dark',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <rect width="96" height="96" fill="#1E293B" rx="6"/>
  <!-- Grid Lines -->
  <line x1="24" y1="8" x2="24" y2="88" stroke="#334155" stroke-width="1"/>
  <line x1="72" y1="8" x2="72" y2="88" stroke="#334155" stroke-width="1"/>
  <line x1="8" y1="24" x2="88" y2="24" stroke="#334155" stroke-width="1"/>
  <line x1="8" y1="72" x2="88" y2="72" stroke="#334155" stroke-width="1"/>
  <!-- Axes -->
  <line x1="8" y1="48" x2="88" y2="48" stroke="#38BDF8" stroke-width="2.5"/>
  <line x1="48" y1="8" x2="48" y2="88" stroke="#38BDF8" stroke-width="2.5"/>
  <!-- Arrow heads -->
  <polygon points="88,48 82,44 82,52" fill="#38BDF8"/>
  <polygon points="48,8 44,14 52,14" fill="#38BDF8"/>
  <text x="88" y="44" font-size="8" fill="#F8FAFC" font-family="sans-serif">x</text>
  <text x="52" y="12" font-size="8" fill="#F8FAFC" font-family="sans-serif">y</text>
</svg>`)
      },
      {
        name: 'four-quadrants',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <!-- Quadrant colored backgrounds -->
  <rect x="48" y="8" width="40" height="40" fill="#E0F2FE"/>
  <rect x="8" y="8" width="40" height="40" fill="#FEF3C7"/>
  <rect x="8" y="48" width="40" height="40" fill="#DCFCE7"/>
  <rect x="48" y="48" width="40" height="40" fill="#FCE7F3"/>
  <!-- Axes -->
  <line x1="4" y1="48" x2="92" y2="48" stroke="#0F172A" stroke-width="2"/>
  <line x1="48" y1="4" x2="48" y2="92" stroke="#0F172A" stroke-width="2"/>
  <!-- Roman numerals -->
  <text x="66" y="30" font-size="11" font-weight="bold" fill="#0369A1" text-anchor="middle">I</text>
  <text x="28" y="30" font-size="11" font-weight="bold" fill="#B45309" text-anchor="middle">II</text>
  <text x="28" y="70" font-size="11" font-weight="bold" fill="#15803D" text-anchor="middle">III</text>
  <text x="66" y="70" font-size="11" font-weight="bold" fill="#BE185D" text-anchor="middle">IV</text>
</svg>`)
      },
      {
        name: 'polar-grid',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <rect width="96" height="96" fill="#0F172A" rx="6"/>
  <circle cx="48" cy="48" r="40" fill="none" stroke="#334155" stroke-width="1.5"/>
  <circle cx="48" cy="48" r="28" fill="none" stroke="#334155" stroke-width="1.5"/>
  <circle cx="48" cy="48" r="14" fill="none" stroke="#334155" stroke-width="1.5"/>
  <line x1="8" y1="48" x2="88" y2="48" stroke="#06B6D4" stroke-width="2"/>
  <line x1="48" y1="8" x2="48" y2="88" stroke="#06B6D4" stroke-width="2"/>
  <line x1="20" y1="20" x2="76" y2="76" stroke="#475569" stroke-width="1"/>
  <line x1="20" y1="76" x2="76" y2="20" stroke="#475569" stroke-width="1"/>
  <circle cx="48" cy="48" r="3" fill="#F43F5E"/>
</svg>`)
      }
    ]
  },

  // ── SPACESHIP ────────────────────────────────────────────────────
  {
    name: 'Spaceship',
    category: 'Things',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#263238" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="50" rx="38" ry="16" fill="#78909C"/>
    <ellipse cx="48" cy="48" rx="20" ry="16" fill="#80DEEA"/>
    <ellipse cx="48" cy="54" rx="38" ry="10" fill="#455A64"/>
    <circle cx="24" cy="54" r="3" fill="#FFEB3B"/>
    <circle cx="36" cy="56" r="3" fill="#FFEB3B"/>
    <circle cx="48" cy="57" r="3" fill="#FFEB3B"/>
    <circle cx="60" cy="56" r="3" fill="#FFEB3B"/>
    <circle cx="72" cy="54" r="3" fill="#FFEB3B"/>
    <polygon points="48,16 44,24 52,24" fill="#FF5252"/>
    <line x1="48" y1="24" x2="48" y2="34" stroke="#263238" stroke-width="2"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'saucer',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#263238" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="50" rx="38" ry="16" fill="#78909C"/>
    <ellipse cx="48" cy="48" rx="20" ry="16" fill="#80DEEA"/>
    <ellipse cx="48" cy="54" rx="38" ry="10" fill="#455A64"/>
    <circle cx="24" cy="54" r="3" fill="#FFEB3B"/>
    <circle cx="36" cy="56" r="3" fill="#FFEB3B"/>
    <circle cx="48" cy="57" r="3" fill="#FFEB3B"/>
    <circle cx="60" cy="56" r="3" fill="#FFEB3B"/>
    <circle cx="72" cy="54" r="3" fill="#FFEB3B"/>
    <polygon points="48,16 44,24 52,24" fill="#FF5252"/>
    <line x1="48" y1="24" x2="48" y2="34" stroke="#263238" stroke-width="2"/>
  </g>
</svg>`)
      },
      {
        name: 'beam',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <!-- Tractor beam shooting down -->
  <polygon points="36,60 60,60 76,92 20,92" fill="#76FF03" opacity="0.35" stroke="none"/>
  <line x1="20" y1="92" x2="76" y2="92" stroke="#76FF03" stroke-width="2"/>
  <g fill="none" stroke="#263238" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="44" rx="38" ry="16" fill="#78909C"/>
    <ellipse cx="48" cy="42" rx="20" ry="16" fill="#80DEEA"/>
    <ellipse cx="48" cy="48" rx="38" ry="10" fill="#455A64"/>
    <circle cx="24" cy="48" r="3" fill="#00E5FF"/>
    <circle cx="36" cy="50" r="3" fill="#00E5FF"/>
    <circle cx="48" cy="51" r="3" fill="#00E5FF"/>
    <circle cx="60" cy="50" r="3" fill="#00E5FF"/>
    <circle cx="72" cy="48" r="3" fill="#00E5FF"/>
    <polygon points="48,10 44,18 52,18" fill="#FF5252"/>
    <line x1="48" y1="18" x2="48" y2="28" stroke="#263238" stroke-width="2"/>
  </g>
</svg>`)
      },
      {
        name: 'shields',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <!-- Energy shield bubble -->
  <ellipse cx="48" cy="48" rx="44" ry="34" fill="#00E5FF" opacity="0.25" stroke="#00B0FF" stroke-width="2" stroke-dasharray="6,4"/>
  <g fill="none" stroke="#263238" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="50" rx="38" ry="16" fill="#90A4AE"/>
    <ellipse cx="48" cy="48" rx="20" ry="16" fill="#B2EBF2"/>
    <ellipse cx="48" cy="54" rx="38" ry="10" fill="#546E7A"/>
    <circle cx="24" cy="54" r="3" fill="#FF4081"/>
    <circle cx="36" cy="56" r="3" fill="#FF4081"/>
    <circle cx="48" cy="57" r="3" fill="#FF4081"/>
    <circle cx="60" cy="56" r="3" fill="#FF4081"/>
    <circle cx="72" cy="54" r="3" fill="#FF4081"/>
    <polygon points="48,16 44,24 52,24" fill="#FF1744"/>
    <line x1="48" y1="24" x2="48" y2="34" stroke="#263238" stroke-width="2"/>
  </g>
</svg>`)
      },
      {
        name: 'warp-speed',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <!-- Warp trails -->
  <line x1="2" y1="36" x2="16" y2="36" stroke="#00E5FF" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="6" y1="52" x2="20" y2="52" stroke="#FF4081" stroke-width="2" stroke-linecap="round"/>
  <line x1="80" y1="36" x2="94" y2="36" stroke="#00E5FF" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="76" y1="52" x2="90" y2="52" stroke="#FF4081" stroke-width="2" stroke-linecap="round"/>
  <g fill="none" stroke="#263238" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="50" rx="38" ry="16" fill="#5C6BC0"/>
    <ellipse cx="48" cy="48" rx="20" ry="16" fill="#E8EAF6"/>
    <ellipse cx="48" cy="54" rx="38" ry="10" fill="#3949AB"/>
    <circle cx="24" cy="54" r="3" fill="#76FF03"/>
    <circle cx="36" cy="56" r="3" fill="#76FF03"/>
    <circle cx="48" cy="57" r="3" fill="#76FF03"/>
    <circle cx="60" cy="56" r="3" fill="#76FF03"/>
    <circle cx="72" cy="54" r="3" fill="#76FF03"/>
    <polygon points="48,16 44,24 52,24" fill="#FFEA00"/>
    <line x1="48" y1="24" x2="48" y2="34" stroke="#263238" stroke-width="2"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── ROCKET ───────────────────────────────────────────────────────
  {
    name: 'Rocket',
    category: 'Things',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M48,14 C36,30 34,54 36,70 L60,70 C62,54 60,30 48,14Z" fill="#ECEFF1"/>
    <circle cx="48" cy="40" r="8" fill="#29B6F6"/>
    <circle cx="48" cy="40" r="4" fill="#0288D1"/>
    <path d="M36,54 Q24,64 28,78 L36,68Z" fill="#FF5252"/>
    <path d="M60,54 Q72,64 68,78 L60,68Z" fill="#FF5252"/>
    <path d="M40,72 L40,84 Q48,92 56,84 L56,72Z" fill="#FF9800"/>
    <path d="M44,72 L44,80 Q48,86 52,80 L52,72Z" fill="#FFEB3B"/>
    <ellipse cx="48" cy="14" rx="4" ry="6" fill="#FF5252"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'launch',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M48,14 C36,30 34,54 36,70 L60,70 C62,54 60,30 48,14Z" fill="#ECEFF1"/>
    <circle cx="48" cy="40" r="8" fill="#29B6F6"/>
    <circle cx="48" cy="40" r="4" fill="#0288D1"/>
    <path d="M36,54 Q24,64 28,78 L36,68Z" fill="#FF5252"/>
    <path d="M60,54 Q72,64 68,78 L60,68Z" fill="#FF5252"/>
    <path d="M40,72 L40,84 Q48,92 56,84 L56,72Z" fill="#FF9800"/>
    <path d="M44,72 L44,80 Q48,86 52,80 L52,72Z" fill="#FFEB3B"/>
    <ellipse cx="48" cy="14" rx="4" ry="6" fill="#FF5252"/>
  </g>
</svg>`)
      },
      {
        name: 'boost',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M48,8 C36,24 34,48 36,64 L60,64 C62,48 60,24 48,8Z" fill="#ECEFF1"/>
    <circle cx="48" cy="34" r="8" fill="#29B6F6"/>
    <circle cx="48" cy="34" r="4" fill="#0288D1"/>
    <path d="M36,48 Q24,58 28,72 L36,62Z" fill="#FF5252"/>
    <path d="M60,48 Q72,58 68,72 L60,62Z" fill="#FF5252"/>
    <!-- Huge thrust fire -->
    <path d="M38,64 L34,94 L48,82 L62,94 L58,64 Z" fill="#FF3D00" stroke="#BF360C"/>
    <path d="M42,64 L40,88 L48,78 L56,88 L54,64 Z" fill="#FFEA00" stroke="none"/>
    <ellipse cx="48" cy="8" rx="4" ry="6" fill="#FF5252"/>
  </g>
</svg>`)
      },
      {
        name: 'space-orbit',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="rotate(45 48 48)">
    <path d="M48,14 C36,30 34,54 36,70 L60,70 C62,54 60,30 48,14Z" fill="#CFD8DC"/>
    <circle cx="48" cy="40" r="8" fill="#00E5FF"/>
    <circle cx="48" cy="40" r="4" fill="#0091EA"/>
    <path d="M36,54 Q24,64 28,78 L36,68Z" fill="#1565C0"/>
    <path d="M60,54 Q72,64 68,78 L60,68Z" fill="#1565C0"/>
    <path d="M42,70 L44,80 L48,74 L52,80 L54,70 Z" fill="#00E5FF" stroke="none"/>
    <ellipse cx="48" cy="14" rx="4" ry="6" fill="#1565C0"/>
  </g>
</svg>`)
      },
      {
        name: 'golden-glory',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#BF360C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M48,14 C36,30 34,54 36,70 L60,70 C62,54 60,30 48,14Z" fill="#FFD54F"/>
    <circle cx="48" cy="40" r="8" fill="#FFF"/>
    <circle cx="48" cy="40" r="4" fill="#FFB300"/>
    <path d="M36,54 Q24,64 28,78 L36,68Z" fill="#FF9100"/>
    <path d="M60,54 Q72,64 68,78 L60,68Z" fill="#FF9100"/>
    <path d="M40,72 L40,86 Q48,94 56,86 L56,72Z" fill="#FF3D00"/>
    <path d="M44,72 L44,80 Q48,88 52,80 L52,72Z" fill="#FFEB3B"/>
    <ellipse cx="48" cy="14" rx="4" ry="6" fill="#FF9100"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── CAR ──────────────────────────────────────────────────────────
  {
    name: 'Car',
    category: 'Things',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="12" y="44" width="72" height="22" rx="6" fill="#FF1744"/>
    <path d="M28,44 L34,26 L62,26 L68,44" fill="#D50000"/>
    <rect x="36" y="28" width="12" height="14" rx="2" fill="#80DEEA"/>
    <rect x="52" y="28" width="12" height="14" rx="2" fill="#80DEEA"/>
    <circle cx="28" cy="66" r="8" fill="#37474F"/>
    <circle cx="28" cy="66" r="4" fill="#CFD8DC"/>
    <circle cx="68" cy="66" r="8" fill="#37474F"/>
    <circle cx="68" cy="66" r="4" fill="#CFD8DC"/>
    <rect x="14" y="48" width="8" height="4" rx="2" fill="#FFD54F"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'red',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="12" y="44" width="72" height="22" rx="6" fill="#FF1744"/>
    <path d="M28,44 L34,26 L62,26 L68,44" fill="#D50000"/>
    <rect x="36" y="28" width="12" height="14" rx="2" fill="#80DEEA"/>
    <rect x="52" y="28" width="12" height="14" rx="2" fill="#80DEEA"/>
    <circle cx="28" cy="66" r="8" fill="#37474F"/>
    <circle cx="28" cy="66" r="4" fill="#CFD8DC"/>
    <circle cx="68" cy="66" r="8" fill="#37474F"/>
    <circle cx="68" cy="66" r="4" fill="#CFD8DC"/>
    <rect x="14" y="48" width="8" height="4" rx="2" fill="#FFD54F"/>
  </g>
</svg>`)
      },
      {
        name: 'blue',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#0D47A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="12" y="44" width="72" height="22" rx="6" fill="#1E88E5"/>
    <path d="M28,44 L34,26 L62,26 L68,44" fill="#1565C0"/>
    <rect x="36" y="28" width="12" height="14" rx="2" fill="#E1F5FE"/>
    <rect x="52" y="28" width="12" height="14" rx="2" fill="#E1F5FE"/>
    <circle cx="28" cy="66" r="8" fill="#263238"/>
    <circle cx="28" cy="66" r="4" fill="#CFD8DC"/>
    <circle cx="68" cy="66" r="8" fill="#263238"/>
    <circle cx="68" cy="66" r="4" fill="#CFD8DC"/>
    <rect x="14" y="48" width="8" height="4" rx="2" fill="#FFEA00"/>
  </g>
</svg>`)
      },
      {
        name: 'taxi-yellow',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#E65100" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="42" y="20" width="12" height="6" rx="1" fill="#FF6D00" stroke="#BF360C"/>
    <rect x="12" y="44" width="72" height="22" rx="6" fill="#FFD600"/>
    <path d="M28,44 L34,26 L62,26 L68,44" fill="#FFC400"/>
    <!-- Taxi checkered stripe -->
    <rect x="12" y="52" width="72" height="5" fill="#212121" stroke="none"/>
    <rect x="18" y="52" width="6" height="5" fill="#FFF" stroke="none"/>
    <rect x="30" y="52" width="6" height="5" fill="#FFF" stroke="none"/>
    <rect x="42" y="52" width="6" height="5" fill="#FFF" stroke="none"/>
    <rect x="54" y="52" width="6" height="5" fill="#FFF" stroke="none"/>
    <rect x="66" y="52" width="6" height="5" fill="#FFF" stroke="none"/>
    <rect x="36" y="28" width="12" height="14" rx="2" fill="#E0F7FA"/>
    <rect x="52" y="28" width="12" height="14" rx="2" fill="#E0F7FA"/>
    <circle cx="28" cy="66" r="8" fill="#37474F"/>
    <circle cx="28" cy="66" r="4" fill="#CFD8DC"/>
    <circle cx="68" cy="66" r="8" fill="#37474F"/>
    <circle cx="68" cy="66" r="4" fill="#CFD8DC"/>
    <rect x="14" y="48" width="8" height="4" rx="2" fill="#FFF"/>
  </g>
</svg>`)
      },
      {
        name: 'green-sports',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="12" y="44" width="72" height="22" rx="6" fill="#00E676"/>
    <path d="M28,44 L34,26 L62,26 L68,44" fill="#00C853"/>
    <!-- Racing stripes -->
    <rect x="44" y="26" width="4" height="40" fill="#FFF" stroke="none"/>
    <rect x="50" y="26" width="4" height="40" fill="#FFF" stroke="none"/>
    <rect x="36" y="28" width="12" height="14" rx="2" fill="#212121"/>
    <rect x="52" y="28" width="12" height="14" rx="2" fill="#212121"/>
    <circle cx="28" cy="66" r="8" fill="#212121"/>
    <circle cx="28" cy="66" r="4" fill="#FFD600"/>
    <circle cx="68" cy="66" r="8" fill="#212121"/>
    <circle cx="68" cy="66" r="4" fill="#FFD600"/>
    <rect x="14" y="48" width="8" height="4" rx="2" fill="#FFEB3B"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── AIRPLANE ─────────────────────────────────────────────────────
  {
    name: 'Airplane',
    category: 'Things',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#0D47A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12,48 L40,42 L48,16 L58,16 L54,42 L84,46 L88,54 L54,52 L48,80 L38,80 L42,50 L12,48Z" fill="#29B6F6"/>
    <circle cx="64" cy="46" r="2" fill="#FFF"/>
    <circle cx="72" cy="47" r="2" fill="#FFF"/>
    <circle cx="80" cy="48" r="2" fill="#FFF"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'passenger',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#0D47A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12,48 L40,42 L48,16 L58,16 L54,42 L84,46 L88,54 L54,52 L48,80 L38,80 L42,50 L12,48Z" fill="#29B6F6"/>
    <circle cx="64" cy="46" r="2" fill="#FFF"/>
    <circle cx="72" cy="47" r="2" fill="#FFF"/>
    <circle cx="80" cy="48" r="2" fill="#FFF"/>
  </g>
</svg>`)
      },
      {
        name: 'contrails',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <!-- Jet contrails -->
  <line x1="2" y1="20" x2="44" y2="20" stroke="#E0F7FA" stroke-width="3" stroke-dasharray="8,4"/>
  <line x1="2" y1="76" x2="36" y2="76" stroke="#E0F7FA" stroke-width="3" stroke-dasharray="8,4"/>
  <g fill="none" stroke="#0D47A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14,48 L42,42 L50,16 L60,16 L56,42 L86,46 L90,54 L56,52 L50,80 L40,80 L44,50 L14,48Z" fill="#29B6F6"/>
    <circle cx="66" cy="46" r="2" fill="#FFF"/>
    <circle cx="74" cy="47" r="2" fill="#FFF"/>
    <circle cx="82" cy="48" r="2" fill="#FFF"/>
  </g>
</svg>`)
      },
      {
        name: 'jet-fighter',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#263238" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Sleek delta-wing jet fighter -->
    <path d="M14,50 L38,44 L54,12 L60,12 L56,44 L88,48 L88,52 L56,54 L60,84 L54,84 L38,54 L14,50 Z" fill="#78909C"/>
    <polygon points="66,46 76,47 70,51" fill="#FFD54F"/>
    <circle cx="78" cy="49" r="3" fill="#00E5FF"/>
    <polygon points="14,48 4,50 14,52" fill="#FF5252"/>
  </g>
</svg>`)
      },
      {
        name: 'vintage-biplane',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#B71C1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18,48 L76,48 L80,54 L18,52 Z" fill="#E53935"/>
    <!-- Top and bottom wings -->
    <rect x="40" y="24" width="28" height="6" rx="2" fill="#FFD54F" stroke="#F57F17"/>
    <rect x="40" y="66" width="28" height="6" rx="2" fill="#FFD54F" stroke="#F57F17"/>
    <!-- Wing struts -->
    <line x1="44" y1="30" x2="44" y2="66" stroke="#5D4037" stroke-width="2"/>
    <line x1="62" y1="30" x2="62" y2="66" stroke="#5D4037" stroke-width="2"/>
    <!-- Propeller -->
    <ellipse cx="82" cy="50" rx="3" ry="14" fill="#90A4AE" opacity="0.7"/>
    <circle cx="82" cy="50" r="3" fill="#212121"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── GAMEPAD ──────────────────────────────────────────────────────
  {
    name: 'Gamepad',
    category: 'Things',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="14" y="32" width="68" height="36" rx="18" fill="#37474F"/>
    <polygon points="34,42 38,42 38,38 42,38 42,42 46,42 46,46 42,46 42,50 38,50 38,46 34,46" fill="#B0BEC5"/>
    <circle cx="62" cy="40" r="3" fill="#FF1744"/>
    <circle cx="70" cy="44" r="3" fill="#FFEA00"/>
    <circle cx="58" cy="48" r="3" fill="#00E676"/>
    <circle cx="66" cy="52" r="3" fill="#2979FF"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'classic-dark',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="14" y="32" width="68" height="36" rx="18" fill="#37474F"/>
    <polygon points="34,42 38,42 38,38 42,38 42,42 46,42 46,46 42,46 42,50 38,50 38,46 34,46" fill="#B0BEC5"/>
    <circle cx="62" cy="40" r="3" fill="#FF1744"/>
    <circle cx="70" cy="44" r="3" fill="#FFEA00"/>
    <circle cx="58" cy="48" r="3" fill="#00E676"/>
    <circle cx="66" cy="52" r="3" fill="#2979FF"/>
  </g>
</svg>`)
      },
      {
        name: 'white-edition',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#78909C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="14" y="32" width="68" height="36" rx="18" fill="#ECEFF1"/>
    <polygon points="34,42 38,42 38,38 42,38 42,42 46,42 46,46 42,46 42,50 38,50 38,46 34,46" fill="#37474F"/>
    <circle cx="62" cy="40" r="3" fill="#FF5252"/>
    <circle cx="70" cy="44" r="3" fill="#FFD600"/>
    <circle cx="58" cy="48" r="3" fill="#00E676"/>
    <circle cx="66" cy="52" r="3" fill="#00E5FF"/>
  </g>
</svg>`)
      },
      {
        name: 'retro-8bit',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#424242" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="12" y="32" width="72" height="34" rx="4" fill="#BDBDBD"/>
    <!-- Black inlay band -->
    <rect x="20" y="36" width="56" height="24" fill="#212121"/>
    <!-- Plus D-pad -->
    <polygon points="26,46 30,46 30,42 34,42 34,46 38,46 38,50 34,50 34,54 30,54 30,50 26,50" fill="#757575"/>
    <!-- Red round buttons -->
    <circle cx="62" cy="48" r="4" fill="#D50000"/>
    <circle cx="70" cy="48" r="4" fill="#D50000"/>
  </g>
</svg>`)
      },
      {
        name: 'neon-gamer',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#00E5FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="14" y="32" width="68" height="36" rx="18" fill="#121212"/>
    <polygon points="34,42 38,42 38,38 42,38 42,42 46,42 46,46 42,46 42,50 38,50 38,46 34,46" fill="#00E5FF"/>
    <circle cx="62" cy="40" r="3" fill="#FF4081"/>
    <circle cx="70" cy="44" r="3" fill="#FF4081"/>
    <circle cx="58" cy="48" r="3" fill="#76FF03"/>
    <circle cx="66" cy="52" r="3" fill="#76FF03"/>
    <line x1="44" y1="48" x2="52" y2="48" stroke="#FFD600" stroke-width="2"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── GUITAR ───────────────────────────────────────────────────────
  {
    name: 'Guitar',
    category: 'Things',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#3E2723" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M26,50 C16,56 18,78 34,80 C50,82 56,66 48,56 C54,48 46,42 36,44Z" fill="#FF9800"/>
    <line x1="42" y1="48" x2="76" y2="14" stroke="#8D6E63" stroke-width="4"/>
    <polygon points="74,16 84,6 88,10 78,20" fill="#3E2723"/>
    <circle cx="34" cy="62" r="6" fill="#3E2723"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'acoustic',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#3E2723" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M26,50 C16,56 18,78 34,80 C50,82 56,66 48,56 C54,48 46,42 36,44Z" fill="#FF9800"/>
    <line x1="42" y1="48" x2="76" y2="14" stroke="#8D6E63" stroke-width="4"/>
    <polygon points="74,16 84,6 88,10 78,20" fill="#3E2723"/>
    <circle cx="34" cy="62" r="6" fill="#3E2723"/>
  </g>
</svg>`)
      },
      {
        name: 'electric-red',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Sharp double-cutaway electric guitar body -->
    <path d="M24,46 L18,58 C16,74 34,84 46,80 L52,66 L56,48 L46,48 L42,54 L36,46 Z" fill="#D50000"/>
    <line x1="44" y1="48" x2="78" y2="14" stroke="#CFD8DC" stroke-width="4"/>
    <polygon points="76,16 86,6 90,10 80,20" fill="#212121"/>
    <rect x="36" y="58" width="10" height="6" rx="1" fill="#212121"/>
    <rect x="34" y="66" width="10" height="6" rx="1" fill="#212121"/>
  </g>
</svg>`)
      },
      {
        name: 'electric-blue',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#0D47A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M24,46 L18,58 C16,74 34,84 46,80 L52,66 L56,48 L46,48 L42,54 L36,46 Z" fill="#00E5FF"/>
    <line x1="44" y1="48" x2="78" y2="14" stroke="#ECEFF1" stroke-width="4"/>
    <polygon points="76,16 86,6 90,10 80,20" fill="#0D47A1"/>
    <rect x="36" y="58" width="10" height="6" rx="1" fill="#0D47A1"/>
    <rect x="34" y="66" width="10" height="6" rx="1" fill="#0D47A1"/>
  </g>
</svg>`)
      },
      {
        name: 'rock-notes',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#3E2723" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M26,50 C16,56 18,78 34,80 C50,82 56,66 48,56 C54,48 46,42 36,44Z" fill="#FF9800"/>
    <line x1="42" y1="48" x2="76" y2="14" stroke="#8D6E63" stroke-width="4"/>
    <polygon points="74,16 84,6 88,10 78,20" fill="#3E2723"/>
    <circle cx="34" cy="62" r="6" fill="#3E2723"/>
    <!-- Floating music notes and spark vibes -->
    <path d="M14,32 L20,28 L20,38 M14,40 A2,2 0 1,1 14,36 L14,32" stroke="#FF4081" stroke-width="2" fill="#FF4081"/>
    <polygon points="56,26 58,22 60,26 64,27 60,29 58,33 56,29 52,27" fill="#FFD600" stroke="none"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── MAGIC WAND ───────────────────────────────────────────────────
  {
    name: 'Magic Wand',
    category: 'Things',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4A148C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="20" y1="80" x2="60" y2="40" stroke="#37474F" stroke-width="6"/>
    <polygon points="68,14 73,26 86,28 76,37 79,50 68,43 57,50 60,37 50,28 63,26" fill="#FFD54F" stroke="#FF6F00"/>
    <circle cx="30" cy="30" r="2" fill="#E040FB"/>
    <circle cx="84" cy="64" r="2" fill="#E040FB"/>
    <circle cx="44" cy="18" r="1.5" fill="#00E5FF"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'star-spark',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4A148C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="20" y1="80" x2="60" y2="40" stroke="#37474F" stroke-width="6"/>
    <polygon points="68,14 73,26 86,28 76,37 79,50 68,43 57,50 60,37 50,28 63,26" fill="#FFD54F" stroke="#FF6F00"/>
    <circle cx="30" cy="30" r="2" fill="#E040FB"/>
    <circle cx="84" cy="64" r="2" fill="#E040FB"/>
    <circle cx="44" cy="18" r="1.5" fill="#00E5FF"/>
  </g>
</svg>`)
      },
      {
        name: 'spellcast',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4A148C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="20" y1="80" x2="60" y2="40" stroke="#37474F" stroke-width="6"/>
    <!-- Radiant magic burst around star -->
    <circle cx="68" cy="32" r="22" fill="#EA80FC" opacity="0.3" stroke="#E040FB" stroke-dasharray="4,4"/>
    <polygon points="68,14 73,26 86,28 76,37 79,50 68,43 57,50 60,37 50,28 63,26" fill="#FFF59D" stroke="#FFD600"/>
    <line x1="68" y1="6" x2="68" y2="12" stroke="#FFD600" stroke-width="3"/>
    <line x1="88" y1="18" x2="84" y2="22" stroke="#FFD600" stroke-width="3"/>
    <line x1="94" y1="36" x2="88" y2="36" stroke="#FFD600" stroke-width="3"/>
    <line x1="48" y1="20" x2="52" y2="24" stroke="#FFD600" stroke-width="3"/>
  </g>
</svg>`)
      },
      {
        name: 'crystal-orb',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#0D47A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="20" y1="80" x2="60" y2="40" stroke="#5D4037" stroke-width="6"/>
    <!-- Glowing blue crystal orb tip -->
    <circle cx="68" cy="32" r="16" fill="#00E5FF" stroke="#0091EA" stroke-width="2.5"/>
    <circle cx="64" cy="28" r="4" fill="#FFF" opacity="0.9" stroke="none"/>
    <polygon points="28,24 30,20 32,24 36,25 32,27 30,31 28,27 24,25" fill="#00E5FF" stroke="none"/>
    <polygon points="82,58 84,54 86,58 90,59 86,61 84,65 82,61 78,59" fill="#00E5FF" stroke="none"/>
  </g>
</svg>`)
      },
      {
        name: 'fairy-heart',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#C2185B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="20" y1="80" x2="60" y2="40" stroke="#FF80AB" stroke-width="6"/>
    <!-- Glowing pink heart tip -->
    <path d="M68,26 C64,20 54,20 54,30 C54,42 68,48 68,48 C68,48 82,42 82,30 C82,20 72,20 68,26 Z" fill="#FF4081" stroke="#D81B60" stroke-width="2"/>
    <circle cx="64" cy="26" r="2.5" fill="#FFF" stroke="none"/>
    <circle cx="34" cy="34" r="2" fill="#FF80AB" stroke="none"/>
    <circle cx="82" cy="62" r="2" fill="#FF80AB" stroke="none"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── TREASURE CHEST ───────────────────────────────────────────────
  {
    name: 'Treasure Chest',
    category: 'Things',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#3E2723" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="18" y="44" width="60" height="34" rx="4" fill="#795548"/>
    <path d="M18,44 Q48,24 78,44Z" fill="#A1887F"/>
    <rect x="42" y="48" width="12" height="14" rx="2" fill="#FFD54F"/>
    <circle cx="48" cy="54" r="2" fill="#3E2723"/>
    <circle cx="32" cy="36" r="3" fill="#FFD54F"/>
    <circle cx="44" cy="32" r="4" fill="#FFD54F"/>
    <circle cx="58" cy="34" r="3" fill="#FFD54F"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'closed',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#3E2723" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="18" y="44" width="60" height="34" rx="4" fill="#795548"/>
    <path d="M18,44 Q48,24 78,44Z" fill="#A1887F"/>
    <rect x="42" y="48" width="12" height="14" rx="2" fill="#FFD54F"/>
    <circle cx="48" cy="54" r="2" fill="#3E2723"/>
    <circle cx="32" cy="36" r="3" fill="#FFD54F"/>
    <circle cx="44" cy="32" r="4" fill="#FFD54F"/>
    <circle cx="58" cy="34" r="3" fill="#FFD54F"/>
  </g>
</svg>`)
      },
      {
        name: 'open-gold',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#3E2723" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Open lid tilted back -->
    <path d="M18,36 Q48,16 78,36 L78,22 Q48,6 18,22 Z" fill="#A1887F"/>
    <!-- Gold coins overflowing -->
    <rect x="18" y="44" width="60" height="34" rx="4" fill="#795548"/>
    <ellipse cx="48" cy="44" rx="28" ry="8" fill="#FFD600" stroke="#FF6F00"/>
    <circle cx="34" cy="42" r="4" fill="#FFEB3B"/>
    <circle cx="44" cy="40" r="4.5" fill="#FFD600"/>
    <circle cx="56" cy="42" r="4" fill="#FFEB3B"/>
    <circle cx="64" cy="44" r="3.5" fill="#FFD600"/>
    <!-- Gems -->
    <polygon points="40,36 44,32 48,36 44,40" fill="#00E5FF" stroke="#0091EA"/>
    <polygon points="52,36 56,32 60,36 56,40" fill="#FF1744" stroke="#B71C1C"/>
    <!-- Front latch -->
    <rect x="42" y="48" width="12" height="12" rx="2" fill="#FFD54F"/>
  </g>
</svg>`)
      },
      {
        name: 'magic-burst',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <!-- Glowing light beams from inside chest -->
  <polygon points="48,42 20,4 32,4" fill="#FFF9C4" opacity="0.6" stroke="none"/>
  <polygon points="48,42 42,2 54,2" fill="#FFF9C4" opacity="0.7" stroke="none"/>
  <polygon points="48,42 64,4 76,4" fill="#FFF9C4" opacity="0.6" stroke="none"/>
  <g fill="none" stroke="#3E2723" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18,36 Q48,16 78,36 L78,22 Q48,6 18,22 Z" fill="#A1887F"/>
    <rect x="18" y="44" width="60" height="34" rx="4" fill="#795548"/>
    <ellipse cx="48" cy="44" rx="28" ry="8" fill="#FFFDE7" stroke="#FFD600"/>
    <rect x="42" y="48" width="12" height="12" rx="2" fill="#FFD54F"/>
    <polygon points="26,18 28,14 30,18 34,19 30,21 28,25 26,21 22,19" fill="#FFD600" stroke="none"/>
    <polygon points="70,16 72,12 74,16 78,17 74,19 72,23 70,19 66,17" fill="#FFD600" stroke="none"/>
  </g>
</svg>`)
      },
      {
        name: 'empty',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#3E2723" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18,36 Q48,16 78,36 L78,22 Q48,6 18,22 Z" fill="#A1887F"/>
    <rect x="18" y="44" width="60" height="34" rx="4" fill="#795548"/>
    <!-- Deep purple velvet lining inside empty chest -->
    <ellipse cx="48" cy="44" rx="26" ry="7" fill="#4A148C" stroke="#311B92"/>
    <rect x="42" y="48" width="12" height="12" rx="2" fill="#FFD54F"/>
    <!-- Spiderweb in corner -->
    <path d="M22,46 Q28,52 34,48 M22,54 Q30,58 36,52" stroke="#B0BEC5" stroke-width="1"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── STAR ─────────────────────────────────────────────────────────
  {
    name: 'Star',
    category: 'Things',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <polygon points="48,8 58,34 86,34 64,52 72,80 48,64 24,80 32,52 10,34 38,34" fill="#FFD54F" stroke="#FF6F00" stroke-width="2"/>
</svg>`),
    costumes: [
      {
        name: 'gold',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <polygon points="48,8 58,34 86,34 64,52 72,80 48,64 24,80 32,52 10,34 38,34" fill="#FFD54F" stroke="#FF6F00" stroke-width="2"/>
</svg>`)
      },
      {
        name: 'sparkle',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke-linecap="round">
    <!-- Star glints -->
    <line x1="48" y1="2" x2="48" y2="10" stroke="#FFD600" stroke-width="3"/>
    <line x1="48" y1="84" x2="48" y2="92" stroke="#FFD600" stroke-width="3"/>
    <line x1="2" y1="48" x2="10" y2="48" stroke="#FFD600" stroke-width="3"/>
    <line x1="86" y1="48" x2="94" y2="48" stroke="#FFD600" stroke-width="3"/>
    <polygon points="48,8 58,34 86,34 64,52 72,80 48,64 24,80 32,52 10,34 38,34" fill="#FFEE58" stroke="#FFB300" stroke-width="2"/>
    <circle cx="48" cy="44" r="6" fill="#FFF" opacity="0.7"/>
  </g>
</svg>`)
      },
      {
        name: 'rainbow-magenta',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <polygon points="48,8 58,34 86,34 64,52 72,80 48,64 24,80 32,52 10,34 38,34" fill="#FF4081" stroke="#C2185B" stroke-width="2"/>
  <circle cx="48" cy="46" r="8" fill="#FFF" opacity="0.4"/>
</svg>`)
      },
      {
        name: 'cyan-diamond',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <polygon points="48,8 58,34 86,34 64,52 72,80 48,64 24,80 32,52 10,34 38,34" fill="#00E5FF" stroke="#0091EA" stroke-width="2"/>
  <circle cx="48" cy="46" r="8" fill="#FFF" opacity="0.6"/>
</svg>`)
      }
    ]
  },

  // ── BALL (Things) ────────────────────────────────────────────────
  {
    name: 'Ball',
    category: 'Things',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <circle cx="48" cy="48" r="34" fill="#FF3D00" stroke="#DD2C00" stroke-width="2"/>
  <path d="M20,32 Q48,24 76,32 M20,64 Q48,72 76,64" stroke="white" stroke-width="3" fill="none"/>
  <line x1="48" y1="14" x2="48" y2="82" stroke="white" stroke-width="3"/>
</svg>`),
    costumes: [
      {
        name: 'red-stripe',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <circle cx="48" cy="48" r="34" fill="#FF3D00" stroke="#DD2C00" stroke-width="2"/>
  <path d="M20,32 Q48,24 76,32 M20,64 Q48,72 76,64" stroke="white" stroke-width="3" fill="none"/>
  <line x1="48" y1="14" x2="48" y2="82" stroke="white" stroke-width="3"/>
</svg>`)
      },
      {
        name: 'blue-stripe',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <circle cx="48" cy="48" r="34" fill="#1976D2" stroke="#0D47A1" stroke-width="2"/>
  <path d="M20,32 Q48,24 76,32 M20,64 Q48,72 76,64" stroke="white" stroke-width="3" fill="none"/>
  <line x1="48" y1="14" x2="48" y2="82" stroke="white" stroke-width="3"/>
</svg>`)
      },
      {
        name: 'green-stripe',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <circle cx="48" cy="48" r="34" fill="#00C853" stroke="#1B5E20" stroke-width="2"/>
  <path d="M20,32 Q48,24 76,32 M20,64 Q48,72 76,64" stroke="white" stroke-width="3" fill="none"/>
  <line x1="48" y1="14" x2="48" y2="82" stroke="white" stroke-width="3"/>
</svg>`)
      },
      {
        name: 'bounce',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <!-- Slightly squashed for floor impact bounce -->
  <ellipse cx="48" cy="54" rx="38" ry="28" fill="#FF3D00" stroke="#DD2C00" stroke-width="2"/>
  <path d="M16,40 Q48,32 80,40 M16,68 Q48,76 80,68" stroke="white" stroke-width="3" fill="none"/>
  <line x1="48" y1="26" x2="48" y2="82" stroke="white" stroke-width="3"/>
  <!-- Bounce contact line -->
  <line x1="24" y1="86" x2="72" y2="86" stroke="#B0BEC5" stroke-width="3" stroke-linecap="round"/>
</svg>`)
      }
    ]
  },

  // ── PENCIL ───────────────────────────────────────────────────────
  {
    name: 'Pencil',
    category: 'Things',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g stroke="#37474F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M74,14 L82,22 L72,32 L64,24 Z" fill="#FF80AB"/>
    <path d="M64,24 L72,32 L66,38 L58,30 Z" fill="#CFD8DC"/>
    <line x1="62" y1="28" x2="68" y2="34" stroke="#90A4AE" stroke-width="1"/>
    <path d="M58,30 L66,38 L32,72 L24,64 Z" fill="#FFCA28"/>
    <path d="M54,26 L62,34 L28,68 L20,60 Z" fill="#FFB300" opacity="0.4"/>
    <path d="M24,64 L32,72 L16,80 Z" fill="#FFE0B2"/>
    <path d="M20,76 L24,80 L16,80 Z" fill="#263238"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'yellow',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g stroke="#37474F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M74,14 L82,22 L72,32 L64,24 Z" fill="#FF80AB"/>
    <path d="M64,24 L72,32 L66,38 L58,30 Z" fill="#CFD8DC"/>
    <line x1="62" y1="28" x2="68" y2="34" stroke="#90A4AE" stroke-width="1"/>
    <path d="M58,30 L66,38 L32,72 L24,64 Z" fill="#FFCA28"/>
    <path d="M54,26 L62,34 L28,68 L20,60 Z" fill="#FFB300" opacity="0.4"/>
    <path d="M24,64 L32,72 L16,80 Z" fill="#FFE0B2"/>
    <path d="M20,76 L24,80 L16,80 Z" fill="#263238"/>
  </g>
</svg>`)
      },
      {
        name: 'writing',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <!-- Doodled pencil line -->
  <path d="M12,86 Q20,80 26,86 T38,82 T46,86" stroke="#78909C" stroke-width="2" fill="none" stroke-linecap="round"/>
  <g stroke="#37474F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M74,14 L82,22 L72,32 L64,24 Z" fill="#FF80AB"/>
    <path d="M64,24 L72,32 L66,38 L58,30 Z" fill="#CFD8DC"/>
    <line x1="62" y1="28" x2="68" y2="34" stroke="#90A4AE" stroke-width="1"/>
    <path d="M58,30 L66,38 L32,72 L24,64 Z" fill="#FFCA28"/>
    <path d="M54,26 L62,34 L28,68 L20,60 Z" fill="#FFB300" opacity="0.4"/>
    <path d="M24,64 L32,72 L16,80 Z" fill="#FFE0B2"/>
    <path d="M20,76 L24,80 L16,80 Z" fill="#263238"/>
  </g>
</svg>`)
      },
      {
        name: 'blue-pencil',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g stroke="#0D47A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M74,14 L82,22 L72,32 L64,24 Z" fill="#FFFFFF"/>
    <path d="M64,24 L72,32 L66,38 L58,30 Z" fill="#B0BEC5"/>
    <line x1="62" y1="28" x2="68" y2="34" stroke="#78909C" stroke-width="1"/>
    <path d="M58,30 L66,38 L32,72 L24,64 Z" fill="#1E88E5"/>
    <path d="M54,26 L62,34 L28,68 L20,60 Z" fill="#1565C0" opacity="0.4"/>
    <path d="M24,64 L32,72 L16,80 Z" fill="#FFE0B2"/>
    <path d="M20,76 L24,80 L16,80 Z" fill="#0D47A1"/>
  </g>
</svg>`)
      },
      {
        name: 'red-pencil',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g stroke="#B71C1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M74,14 L82,22 L72,32 L64,24 Z" fill="#212121"/>
    <path d="M64,24 L72,32 L66,38 L58,30 Z" fill="#CFD8DC"/>
    <line x1="62" y1="28" x2="68" y2="34" stroke="#90A4AE" stroke-width="1"/>
    <path d="M58,30 L66,38 L32,72 L24,64 Z" fill="#E53935"/>
    <path d="M54,26 L62,34 L28,68 L20,60 Z" fill="#B71C1C" opacity="0.4"/>
    <path d="M24,64 L32,72 L16,80 Z" fill="#FFE0B2"/>
    <path d="M20,76 L24,80 L16,80 Z" fill="#B71C1C"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── PEN ──────────────────────────────────────────────────────────
  {
    name: 'Pen',
    category: 'Things',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g stroke="#263238" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M72,16 L80,24 L74,30 L66,22 Z" fill="#0FBD8C"/>
    <path d="M76,20 L62,34 L59,31" fill="none" stroke="#ECEFF1" stroke-width="2.5"/>
    <path d="M66,22 L74,30 L38,66 L30,58 Z" fill="#0FBD8C"/>
    <path d="M62,18 L70,26 L34,62 L26,54 Z" fill="#008f66" opacity="0.3"/>
    <path d="M30,58 L38,66 L28,76 L20,68 Z" fill="#ECEFF1"/>
    <path d="M20,68 L28,76 L14,82 Z" fill="#FFD54F"/>
    <circle cx="15" cy="81" r="1.5" fill="#263238"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'emerald',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g stroke="#263238" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M72,16 L80,24 L74,30 L66,22 Z" fill="#0FBD8C"/>
    <path d="M76,20 L62,34 L59,31" fill="none" stroke="#ECEFF1" stroke-width="2.5"/>
    <path d="M66,22 L74,30 L38,66 L30,58 Z" fill="#0FBD8C"/>
    <path d="M62,18 L70,26 L34,62 L26,54 Z" fill="#008f66" opacity="0.3"/>
    <path d="M30,58 L38,66 L28,76 L20,68 Z" fill="#ECEFF1"/>
    <path d="M20,68 L28,76 L14,82 Z" fill="#FFD54F"/>
    <circle cx="15" cy="81" r="1.5" fill="#263238"/>
  </g>
</svg>`)
      },
      {
        name: 'blue-gel',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g stroke="#0D47A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M72,16 L80,24 L74,30 L66,22 Z" fill="#1976D2"/>
    <path d="M76,20 L62,34 L59,31" fill="none" stroke="#ECEFF1" stroke-width="2.5"/>
    <path d="M66,22 L74,30 L38,66 L30,58 Z" fill="#1976D2"/>
    <path d="M62,18 L70,26 L34,62 L26,54 Z" fill="#0D47A1" opacity="0.3"/>
    <path d="M30,58 L38,66 L28,76 L20,68 Z" fill="#ECEFF1"/>
    <path d="M20,68 L28,76 L14,82 Z" fill="#CFD8DC"/>
    <circle cx="15" cy="81" r="1.5" fill="#0D47A1"/>
  </g>
</svg>`)
      },
      {
        name: 'ink-writing',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <!-- Smooth ink signature line -->
  <path d="M8,88 Q18,80 24,86 T36,80 T46,84" stroke="#0FBD8C" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <g stroke="#263238" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M72,16 L80,24 L74,30 L66,22 Z" fill="#0FBD8C"/>
    <path d="M76,20 L62,34 L59,31" fill="none" stroke="#ECEFF1" stroke-width="2.5"/>
    <path d="M66,22 L74,30 L38,66 L30,58 Z" fill="#0FBD8C"/>
    <path d="M62,18 L70,26 L34,62 L26,54 Z" fill="#008f66" opacity="0.3"/>
    <path d="M30,58 L38,66 L28,76 L20,68 Z" fill="#ECEFF1"/>
    <path d="M20,68 L28,76 L14,82 Z" fill="#FFD54F"/>
    <circle cx="15" cy="81" r="1.5" fill="#263238"/>
  </g>
</svg>`)
      },
      {
        name: 'luxury-gold',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g stroke="#B78103" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M72,16 L80,24 L74,30 L66,22 Z" fill="#212121"/>
    <path d="M76,20 L62,34 L59,31" fill="none" stroke="#FFD700" stroke-width="2.5"/>
    <path d="M66,22 L74,30 L38,66 L30,58 Z" fill="#212121"/>
    <path d="M62,18 L70,26 L34,62 L26,54 Z" fill="#FFD700" opacity="0.5"/>
    <path d="M30,58 L38,66 L28,76 L20,68 Z" fill="#FFD700"/>
    <path d="M20,68 L28,76 L14,82 Z" fill="#FFE082"/>
    <circle cx="15" cy="81" r="1.5" fill="#212121"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── PAINTBRUSH ───────────────────────────────────────────────────
  {
    name: 'Paintbrush',
    category: 'Things',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g stroke="#3E2723" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M82,14 L76,8 L40,44 L46,50 Z" fill="#8D6E63"/>
    <path d="M40,44 L46,50 L34,62 L28,56 Z" fill="#B0BEC5"/>
    <path d="M28,56 L34,62 Q26,76 16,80 Q20,70 28,56 Z" fill="#4C97FF"/>
    <path d="M20,72 Q16,80 14,82 Q18,78 24,74 Z" fill="#1565C0"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'blue-paint',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g stroke="#3E2723" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M82,14 L76,8 L40,44 L46,50 Z" fill="#8D6E63"/>
    <path d="M40,44 L46,50 L34,62 L28,56 Z" fill="#B0BEC5"/>
    <path d="M28,56 L34,62 Q26,76 16,80 Q20,70 28,56 Z" fill="#4C97FF"/>
    <path d="M20,72 Q16,80 14,82 Q18,78 24,74 Z" fill="#1565C0"/>
  </g>
</svg>`)
      },
      {
        name: 'painting-stroke',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <!-- Paint stroke on canvas -->
  <path d="M14,84 Q30,76 46,88 Q62,80 78,84" stroke="#4C97FF" stroke-width="6" fill="none" stroke-linecap="round"/>
  <g stroke="#3E2723" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M82,14 L76,8 L40,44 L46,50 Z" fill="#8D6E63"/>
    <path d="M40,44 L46,50 L34,62 L28,56 Z" fill="#B0BEC5"/>
    <path d="M28,56 L34,62 Q26,76 16,80 Q20,70 28,56 Z" fill="#4C97FF"/>
    <path d="M20,72 Q16,80 14,82 Q18,78 24,74 Z" fill="#1565C0"/>
  </g>
</svg>`)
      },
      {
        name: 'red-paint',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g stroke="#3E2723" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M82,14 L76,8 L40,44 L46,50 Z" fill="#8D6E63"/>
    <path d="M40,44 L46,50 L34,62 L28,56 Z" fill="#B0BEC5"/>
    <path d="M28,56 L34,62 Q26,76 16,80 Q20,70 28,56 Z" fill="#FF5252"/>
    <path d="M20,72 Q16,80 14,82 Q18,78 24,74 Z" fill="#D50000"/>
  </g>
</svg>`)
      },
      {
        name: 'rainbow-splatter',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <!-- Paint splatters -->
  <circle cx="12" cy="74" r="3" fill="#FFD600" stroke="none"/>
  <circle cx="16" cy="88" r="2.5" fill="#00E676" stroke="none"/>
  <circle cx="28" cy="86" r="3" fill="#FF4081" stroke="none"/>
  <g stroke="#3E2723" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M82,14 L76,8 L40,44 L46,50 Z" fill="#8D6E63"/>
    <path d="M40,44 L46,50 L34,62 L28,56 Z" fill="#B0BEC5"/>
    <path d="M28,56 L34,62 Q26,76 16,80 Q20,70 28,56 Z" fill="#AA00FF"/>
    <path d="M20,72 Q16,80 14,82 Q18,78 24,74 Z" fill="#FF6D00"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── POT ──────────────────────────────────────────────────────────
  {
    name: 'Pot',
    category: 'Things',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <radialGradient id="potGrad1" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FB923C"/>
      <stop offset="50%" stop-color="#EA580C"/>
      <stop offset="100%" stop-color="#9A3412"/>
    </radialGradient>
    <linearGradient id="potRimGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FDBA74"/>
      <stop offset="50%" stop-color="#FB923C"/>
      <stop offset="100%" stop-color="#C2410C"/>
    </linearGradient>
  </defs>
  <g fill="none" stroke="#7C2D12" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20,44 C10,44 10,58 22,60" stroke="#9A3412" stroke-width="3" fill="none"/>
    <path d="M76,44 C86,44 86,58 74,60" stroke="#9A3412" stroke-width="3" fill="none"/>
    <path d="M24,36 L72,36 C76,52 74,74 64,84 L32,84 C22,74 20,52 24,36 Z" fill="url(#potGrad1)"/>
    <path d="M22,54 Q48,60 74,54" stroke="#FDBA74" stroke-width="2.5" opacity="0.6"/>
    <ellipse cx="48" cy="34" rx="28" ry="7" fill="url(#potRimGrad1)" stroke="#7C2D12" stroke-width="1.5"/>
    <ellipse cx="48" cy="34" rx="22" ry="4" fill="#7C2D12" opacity="0.85"/>
    <path d="M48,34 Q42,16 32,20 Q44,24 46,33" fill="#22C55E" stroke="#15803D" stroke-width="1.2"/>
    <path d="M48,34 Q54,12 66,16 Q54,22 50,33" fill="#16A34A" stroke="#15803D" stroke-width="1.2"/>
    <path d="M48,34 L48,16" stroke="#15803D" stroke-width="2"/>
    <circle cx="48" cy="14" r="2" fill="#4ADE80" stroke="#15803D"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'sprout',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <radialGradient id="potGradA" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FB923C"/>
      <stop offset="50%" stop-color="#EA580C"/>
      <stop offset="100%" stop-color="#9A3412"/>
    </radialGradient>
    <linearGradient id="potRimGradA" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FDBA74"/>
      <stop offset="50%" stop-color="#FB923C"/>
      <stop offset="100%" stop-color="#C2410C"/>
    </linearGradient>
  </defs>
  <g fill="none" stroke="#7C2D12" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20,44 C10,44 10,58 22,60" stroke="#9A3412" stroke-width="3" fill="none"/>
    <path d="M76,44 C86,44 86,58 74,60" stroke="#9A3412" stroke-width="3" fill="none"/>
    <path d="M24,36 L72,36 C76,52 74,74 64,84 L32,84 C22,74 20,52 24,36 Z" fill="url(#potGradA)"/>
    <path d="M22,54 Q48,60 74,54" stroke="#FDBA74" stroke-width="2.5" opacity="0.6"/>
    <ellipse cx="48" cy="34" rx="28" ry="7" fill="url(#potRimGradA)" stroke="#7C2D12" stroke-width="1.5"/>
    <ellipse cx="48" cy="34" rx="22" ry="4" fill="#7C2D12" opacity="0.85"/>
    <path d="M48,34 Q42,16 32,20 Q44,24 46,33" fill="#22C55E" stroke="#15803D" stroke-width="1.2"/>
    <path d="M48,34 Q54,12 66,16 Q54,22 50,33" fill="#16A34A" stroke="#15803D" stroke-width="1.2"/>
    <path d="M48,34 L48,16" stroke="#15803D" stroke-width="2"/>
    <circle cx="48" cy="14" r="2" fill="#4ADE80" stroke="#15803D"/>
  </g>
</svg>`)
      },
      {
        name: 'blooming',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <radialGradient id="potGradB" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FB923C"/>
      <stop offset="50%" stop-color="#EA580C"/>
      <stop offset="100%" stop-color="#9A3412"/>
    </radialGradient>
  </defs>
  <g fill="none" stroke="#7C2D12" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20,44 C10,44 10,58 22,60" stroke="#9A3412" stroke-width="3" fill="none"/>
    <path d="M76,44 C86,44 86,58 74,60" stroke="#9A3412" stroke-width="3" fill="none"/>
    <path d="M24,36 L72,36 C76,52 74,74 64,84 L32,84 C22,74 20,52 24,36 Z" fill="url(#potGradB)"/>
    <ellipse cx="48" cy="34" rx="28" ry="7" fill="#FB923C" stroke="#7C2D12" stroke-width="1.5"/>
    <ellipse cx="48" cy="34" rx="22" ry="4" fill="#7C2D12" opacity="0.85"/>
    <line x1="48" y1="34" x2="48" y2="18" stroke="#15803D" stroke-width="2.5"/>
    <!-- Pink blooming flower -->
    <circle cx="48" cy="12" r="5" fill="#FF4081"/>
    <circle cx="42" cy="16" r="4.5" fill="#FF4081"/>
    <circle cx="54" cy="16" r="4.5" fill="#FF4081"/>
    <circle cx="48" cy="16" r="3.5" fill="#FFD600" stroke="#FFA000"/>
  </g>
</svg>`)
      },
      {
        name: 'succulent',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <radialGradient id="potGradC" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FB923C"/>
      <stop offset="50%" stop-color="#EA580C"/>
      <stop offset="100%" stop-color="#9A3412"/>
    </radialGradient>
  </defs>
  <g fill="none" stroke="#7C2D12" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20,44 C10,44 10,58 22,60" stroke="#9A3412" stroke-width="3" fill="none"/>
    <path d="M76,44 C86,44 86,58 74,60" stroke="#9A3412" stroke-width="3" fill="none"/>
    <path d="M24,36 L72,36 C76,52 74,74 64,84 L32,84 C22,74 20,52 24,36 Z" fill="url(#potGradC)"/>
    <ellipse cx="48" cy="34" rx="28" ry="7" fill="#FB923C" stroke="#7C2D12" stroke-width="1.5"/>
    <!-- Succulent rosette leaves -->
    <ellipse cx="48" cy="24" rx="7" ry="12" fill="#80CBC4" stroke="#00796B"/>
    <ellipse cx="40" cy="28" rx="6" ry="11" fill="#4DB6AC" stroke="#00796B" transform="rotate(-30 40 28)"/>
    <ellipse cx="56" cy="28" rx="6" ry="11" fill="#4DB6AC" stroke="#00796B" transform="rotate(30 56 28)"/>
    <ellipse cx="48" cy="30" rx="5" ry="8" fill="#B2DFDB" stroke="#004D40"/>
  </g>
</svg>`)
      },
      {
        name: 'clay-empty',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <radialGradient id="potGradD" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FB923C"/>
      <stop offset="50%" stop-color="#EA580C"/>
      <stop offset="100%" stop-color="#9A3412"/>
    </radialGradient>
  </defs>
  <g fill="none" stroke="#7C2D12" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20,44 C10,44 10,58 22,60" stroke="#9A3412" stroke-width="3" fill="none"/>
    <path d="M76,44 C86,44 86,58 74,60" stroke="#9A3412" stroke-width="3" fill="none"/>
    <path d="M24,36 L72,36 C76,52 74,74 64,84 L32,84 C22,74 20,52 24,36 Z" fill="url(#potGradD)"/>
    <path d="M22,54 Q48,60 74,54" stroke="#FDBA74" stroke-width="2.5" opacity="0.6"/>
    <ellipse cx="48" cy="34" rx="28" ry="7" fill="#FB923C" stroke="#7C2D12" stroke-width="1.5"/>
    <!-- Rich dark soil inside -->
    <ellipse cx="48" cy="34" rx="22" ry="4" fill="#3E2723" stroke="#271410"/>
  </g>
</svg>`)
      }
    ]
  }
];
