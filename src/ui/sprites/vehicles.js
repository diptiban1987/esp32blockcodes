import { svg } from './svgHelper.js';

export const vehicles = [
  // ── HELICOPTER ───────────────────────────────────────────────────
  {
    name: 'Helicopter',
    category: 'Vehicles',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="16" y1="20" x2="76" y2="20" stroke="#37474F" stroke-width="4"/>
    <line x1="46" y1="20" x2="46" y2="30"/>
    <ellipse cx="46" cy="48" rx="28" ry="18" fill="#FFC107"/>
    <path d="M46,30 Q68,30 74,48 L46,48Z" fill="#80DEEA"/>
    <line x1="18" y1="48" x2="2" y2="44" stroke-width="4" stroke="#FFC107"/>
    <line x1="2" y1="36" x2="2" y2="52" stroke-width="3" stroke="#37474F"/>
    <line x1="30" y1="66" x2="30" y2="76"/>
    <line x1="62" y1="66" x2="62" y2="76"/>
    <line x1="16" y1="76" x2="76" y2="76" stroke-width="3" stroke="#37474F"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'level',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="16" y1="20" x2="76" y2="20" stroke="#37474F" stroke-width="4"/>
    <line x1="46" y1="20" x2="46" y2="30"/>
    <ellipse cx="46" cy="48" rx="28" ry="18" fill="#FFC107"/>
    <path d="M46,30 Q68,30 74,48 L46,48Z" fill="#80DEEA"/>
    <line x1="18" y1="48" x2="2" y2="44" stroke-width="4" stroke="#FFC107"/>
    <line x1="2" y1="36" x2="2" y2="52" stroke-width="3" stroke="#37474F"/>
    <line x1="30" y1="66" x2="30" y2="76"/>
    <line x1="62" y1="66" x2="62" y2="76"/>
    <line x1="16" y1="76" x2="76" y2="76" stroke-width="3" stroke="#37474F"/>
  </g>
</svg>`)
      },
      {
        name: 'rotor-spin',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="rotate(6 48 48)">
    <!-- Spinning rotor disc blur -->
    <ellipse cx="46" cy="20" rx="40" ry="4" fill="#B0BEC5" opacity="0.5" stroke="#78909C" stroke-dasharray="8,4"/>
    <line x1="46" y1="20" x2="46" y2="30"/>
    <ellipse cx="46" cy="48" rx="28" ry="18" fill="#FFC107"/>
    <path d="M46,30 Q68,30 74,48 L46,48Z" fill="#80DEEA"/>
    <line x1="18" y1="48" x2="2" y2="44" stroke-width="4" stroke="#FFC107"/>
    <ellipse cx="2" cy="44" rx="3" ry="10" fill="#B0BEC5" opacity="0.6"/>
    <line x1="30" y1="66" x2="30" y2="76"/>
    <line x1="62" y1="66" x2="62" y2="76"/>
    <line x1="16" y1="76" x2="76" y2="76" stroke-width="3" stroke="#37474F"/>
  </g>
</svg>`)
      },
      {
        name: 'rescue-red',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#B71C1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="16" y1="20" x2="76" y2="20" stroke="#263238" stroke-width="4"/>
    <line x1="46" y1="20" x2="46" y2="30" stroke="#263238"/>
    <ellipse cx="46" cy="48" rx="28" ry="18" fill="#E53935"/>
    <path d="M46,30 Q68,30 74,48 L46,48Z" fill="#E0F7FA"/>
    <!-- Rescue cross -->
    <rect x="30" y="44" width="10" height="4" fill="#FFF" stroke="none"/>
    <rect x="33" y="41" width="4" height="10" fill="#FFF" stroke="none"/>
    <line x1="18" y1="48" x2="2" y2="44" stroke-width="4" stroke="#E53935"/>
    <line x1="2" y1="36" x2="2" y2="52" stroke-width="3" stroke="#263238"/>
    <line x1="30" y1="66" x2="30" y2="76" stroke="#263238"/>
    <line x1="62" y1="66" x2="62" y2="76" stroke="#263238"/>
    <line x1="16" y1="76" x2="76" y2="76" stroke-width="3" stroke="#263238"/>
  </g>
</svg>`)
      },
      {
        name: 'police-blue',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#0D47A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Siren on roof -->
    <circle cx="46" cy="22" r="3" fill="#FF1744" stroke="none"/>
    <line x1="16" y1="20" x2="76" y2="20" stroke="#263238" stroke-width="4"/>
    <line x1="46" y1="20" x2="46" y2="30" stroke="#263238"/>
    <ellipse cx="46" cy="48" rx="28" ry="18" fill="#1565C0"/>
    <path d="M46,30 Q68,30 74,48 L46,48Z" fill="#E1F5FE"/>
    <line x1="26" y1="48" x2="52" y2="48" stroke="#FFF" stroke-width="3"/>
    <line x1="18" y1="48" x2="2" y2="44" stroke-width="4" stroke="#1565C0"/>
    <line x1="2" y1="36" x2="2" y2="52" stroke-width="3" stroke="#263238"/>
    <line x1="30" y1="66" x2="30" y2="76" stroke="#263238"/>
    <line x1="62" y1="66" x2="62" y2="76" stroke="#263238"/>
    <line x1="16" y1="76" x2="76" y2="76" stroke-width="3" stroke="#263238"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── BICYCLE ──────────────────────────────────────────────────────
  {
    name: 'Bicycle',
    category: 'Vehicles',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#E53935" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="26" cy="60" r="18" stroke="#37474F" stroke-width="3" fill="none"/>
    <circle cx="70" cy="60" r="18" stroke="#37474F" stroke-width="3" fill="none"/>
    <polygon points="26,60 46,60 62,38 40,38" fill="none"/>
    <line x1="46" y1="60" x2="34" y2="34"/>
    <line x1="70" y1="60" x2="60" y2="28"/>
    <line x1="56" y1="28" x2="66" y2="28" stroke="#37474F"/>
    <rect x="28" y="30" width="12" height="4" rx="2" fill="#37474F" stroke="none"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'red',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#E53935" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="26" cy="60" r="18" stroke="#37474F" stroke-width="3" fill="none"/>
    <circle cx="70" cy="60" r="18" stroke="#37474F" stroke-width="3" fill="none"/>
    <polygon points="26,60 46,60 62,38 40,38" fill="none"/>
    <line x1="46" y1="60" x2="34" y2="34"/>
    <line x1="70" y1="60" x2="60" y2="28"/>
    <line x1="56" y1="28" x2="66" y2="28" stroke="#37474F"/>
    <rect x="28" y="30" width="12" height="4" rx="2" fill="#37474F" stroke="none"/>
  </g>
</svg>`)
      },
      {
        name: 'speeding',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#E53935" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="26" cy="60" r="18" stroke="#37474F" stroke-width="3" fill="none"/>
    <circle cx="70" cy="60" r="18" stroke="#37474F" stroke-width="3" fill="none"/>
    <!-- Spokes motion blur -->
    <line x1="26" y1="44" x2="26" y2="76" stroke="#90A4AE" stroke-width="1.5"/>
    <line x1="12" y1="60" x2="40" y2="60" stroke="#90A4AE" stroke-width="1.5"/>
    <line x1="70" y1="44" x2="70" y2="76" stroke="#90A4AE" stroke-width="1.5"/>
    <line x1="56" y1="60" x2="84" y2="60" stroke="#90A4AE" stroke-width="1.5"/>
    <polygon points="26,60 46,60 62,38 40,38" fill="none"/>
    <line x1="46" y1="60" x2="34" y2="34"/>
    <line x1="70" y1="60" x2="60" y2="28"/>
    <line x1="56" y1="28" x2="66" y2="28" stroke="#37474F"/>
    <rect x="28" y="30" width="12" height="4" rx="2" fill="#37474F" stroke="none"/>
    <!-- Motion lines -->
    <line x1="4" y1="48" x2="16" y2="48" stroke="#42A5F5" stroke-width="2"/>
    <line x1="2" y1="64" x2="14" y2="64" stroke="#42A5F5" stroke-width="2"/>
  </g>
</svg>`)
      },
      {
        name: 'blue-mountain',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#0288D1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="26" cy="60" r="18" stroke="#212121" stroke-width="4" fill="none"/>
    <circle cx="70" cy="60" r="18" stroke="#212121" stroke-width="4" fill="none"/>
    <polygon points="26,60 46,60 62,38 40,38" fill="none"/>
    <line x1="46" y1="60" x2="34" y2="34"/>
    <line x1="70" y1="60" x2="60" y2="28"/>
    <line x1="54" y1="28" x2="68" y2="28" stroke="#212121" stroke-width="3"/>
    <rect x="26" y="28" width="14" height="6" rx="2" fill="#212121" stroke="none"/>
  </g>
</svg>`)
      },
      {
        name: 'green-cruiser',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#00BFA5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="26" cy="60" r="18" stroke="#546E7A" stroke-width="3" fill="none"/>
    <circle cx="70" cy="60" r="18" stroke="#546E7A" stroke-width="3" fill="none"/>
    <!-- Curved retro cruiser frame -->
    <path d="M26,60 C36,54 44,58 46,60" fill="none"/>
    <path d="M46,60 C48,46 54,40 62,38" fill="none"/>
    <line x1="26" y1="60" x2="40" y2="38"/>
    <line x1="40" y1="38" x2="62" y2="38"/>
    <line x1="46" y1="60" x2="34" y2="34"/>
    <line x1="70" y1="60" x2="60" y2="28"/>
    <line x1="54" y1="28" x2="66" y2="28" stroke="#546E7A"/>
    <!-- Basket -->
    <rect x="64" y="26" width="10" height="8" rx="2" fill="#FFE082" stroke="#FFB300" stroke-width="1.5"/>
    <rect x="28" y="30" width="12" height="4" rx="2" fill="#8D6E63" stroke="none"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── SUBMARINE ────────────────────────────────────────────────────
  {
    name: 'Submarine',
    category: 'Vehicles',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="54" rx="36" ry="18" fill="#FBC02D"/>
    <rect x="42" y="24" width="16" height="16" fill="#FBC02D"/>
    <line x1="54" y1="24" x2="54" y2="12" stroke-width="3"/>
    <line x1="54" y1="12" x2="62" y2="12" stroke-width="3"/>
    <circle cx="34" cy="54" r="4" fill="#80DEEA"/>
    <circle cx="48" cy="54" r="4" fill="#80DEEA"/>
    <circle cx="62" cy="54" r="4" fill="#80DEEA"/>
    <polygon points="12,48 4,40 4,68 12,60" fill="#E65100"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'yellow',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="54" rx="36" ry="18" fill="#FBC02D"/>
    <rect x="42" y="24" width="16" height="16" fill="#FBC02D"/>
    <line x1="54" y1="24" x2="54" y2="12" stroke-width="3"/>
    <line x1="54" y1="12" x2="62" y2="12" stroke-width="3"/>
    <circle cx="34" cy="54" r="4" fill="#80DEEA"/>
    <circle cx="48" cy="54" r="4" fill="#80DEEA"/>
    <circle cx="62" cy="54" r="4" fill="#80DEEA"/>
    <polygon points="12,48 4,40 4,68 12,60" fill="#E65100"/>
  </g>
</svg>`)
      },
      {
        name: 'bubbles',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="50" cy="54" rx="36" ry="18" fill="#FBC02D"/>
    <rect x="44" y="24" width="16" height="16" fill="#FBC02D"/>
    <line x1="56" y1="24" x2="56" y2="12" stroke-width="3"/>
    <line x1="56" y1="12" x2="64" y2="12" stroke-width="3"/>
    <circle cx="36" cy="54" r="4" fill="#00E5FF"/>
    <circle cx="50" cy="54" r="4" fill="#00E5FF"/>
    <circle cx="64" cy="54" r="4" fill="#00E5FF"/>
    <polygon points="14,48 6,40 6,68 14,60" fill="#E65100"/>
    <!-- Propeller stream bubbles -->
    <circle cx="2" cy="54" r="2.5" fill="#80D8FF" stroke="#0091EA"/>
    <circle cx="6" cy="38" r="3" fill="#80D8FF" stroke="#0091EA"/>
    <circle cx="4" cy="70" r="2" fill="#80D8FF" stroke="#0091EA"/>
    <circle cx="20" cy="28" r="4" fill="#80D8FF" stroke="#0091EA"/>
    <circle cx="78" cy="36" r="3" fill="#80D8FF" stroke="#0091EA"/>
  </g>
</svg>`)
      },
      {
        name: 'deep-sea',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#0D47A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Searchlight beam -->
    <polygon points="82,54 96,38 96,70" fill="#FFF59D" opacity="0.4" stroke="none"/>
    <ellipse cx="48" cy="54" rx="36" ry="18" fill="#1A237E"/>
    <rect x="42" y="24" width="16" height="16" fill="#1A237E"/>
    <line x1="54" y1="24" x2="54" y2="12" stroke-width="3" stroke="#283593"/>
    <line x1="54" y1="12" x2="62" y2="12" stroke-width="3" stroke="#283593"/>
    <!-- Glowing portholes -->
    <circle cx="34" cy="54" r="4" fill="#FFEB3B"/>
    <circle cx="48" cy="54" r="4" fill="#FFEB3B"/>
    <circle cx="62" cy="54" r="4" fill="#FFEB3B"/>
    <polygon points="12,48 4,40 4,68 12,60" fill="#D50000"/>
  </g>
</svg>`)
      },
      {
        name: 'coral-explorer',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#BF360C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="44" cy="54" rx="34" ry="18" fill="#FF5722"/>
    <rect x="38" y="24" width="16" height="16" fill="#FF5722"/>
    <line x1="50" y1="24" x2="50" y2="12" stroke-width="3" stroke="#BF360C"/>
    <line x1="50" y1="12" x2="58" y2="12" stroke-width="3" stroke="#BF360C"/>
    <circle cx="30" cy="54" r="4" fill="#E0F7FA"/>
    <circle cx="44" cy="54" r="4" fill="#E0F7FA"/>
    <circle cx="58" cy="54" r="4" fill="#E0F7FA"/>
    <polygon points="10,48 2,40 2,68 10,60" fill="#FFAB00"/>
    <!-- Robotic arm claw on front -->
    <line x1="74" y1="58" x2="84" y2="64" stroke="#37474F" stroke-width="3"/>
    <path d="M84,60 Q90,62 86,68" stroke="#37474F" stroke-width="2.5" fill="none"/>
    <path d="M84,68 Q90,66 86,60" stroke="#37474F" stroke-width="2.5" fill="none"/>
  </g>
</svg>`)
      }
    ]
  }
];
