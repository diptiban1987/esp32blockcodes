import { svg } from './svgHelper.js';

export const space = [
  // ── ASTRONAUT ────────────────────────────────────────────────────
  {
    name: 'Astronaut',
    category: 'Space',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#37474F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="34" r="18" fill="#ECEFF1"/>
    <ellipse cx="48" cy="34" rx="12" ry="10" fill="#FFB300"/>
    <rect x="28" y="52" width="40" height="32" rx="10" fill="#ECEFF1"/>
    <rect x="36" y="58" width="24" height="12" rx="3" fill="#1E88E5"/>
    <circle cx="42" cy="64" r="2" fill="#FF1744"/>
    <circle cx="54" cy="64" r="2" fill="#00E676"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'floating',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#37474F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="34" r="18" fill="#ECEFF1"/>
    <ellipse cx="48" cy="34" rx="12" ry="10" fill="#FFB300"/>
    <rect x="28" y="52" width="40" height="32" rx="10" fill="#ECEFF1"/>
    <rect x="36" y="58" width="24" height="12" rx="3" fill="#1E88E5"/>
    <circle cx="42" cy="64" r="2" fill="#FF1744"/>
    <circle cx="54" cy="64" r="2" fill="#00E676"/>
  </g>
</svg>`)
      },
      {
        name: 'spacewalk',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#37474F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-10 48 48)">
    <!-- Backpack thrusters -->
    <rect x="22" y="44" width="8" height="24" rx="3" fill="#78909C"/>
    <rect x="66" y="44" width="8" height="24" rx="3" fill="#78909C"/>
    <path d="M22,68 L18,78 L26,74 Z" fill="#00E5FF" stroke="none"/>
    <path d="M74,68 L78,78 L70,74 Z" fill="#00E5FF" stroke="none"/>
    <!-- Floating limbs -->
    <rect x="18" y="46" width="10" height="18" rx="4" fill="#CFD8DC" transform="rotate(-30 23 55)"/>
    <rect x="68" y="46" width="10" height="18" rx="4" fill="#CFD8DC" transform="rotate(30 73 55)"/>
    <circle cx="48" cy="30" r="18" fill="#ECEFF1"/>
    <ellipse cx="48" cy="30" rx="12" ry="10" fill="#FFB300"/>
    <rect x="28" y="48" width="40" height="32" rx="10" fill="#ECEFF1"/>
    <rect x="36" y="54" width="24" height="12" rx="3" fill="#1E88E5"/>
    <circle cx="42" cy="60" r="2" fill="#FF1744"/>
    <circle cx="54" cy="60" r="2" fill="#00E676"/>
    <!-- Floating legs -->
    <rect x="32" y="78" width="12" height="14" rx="4" fill="#CFD8DC" transform="rotate(10 38 85)"/>
    <rect x="52" y="78" width="12" height="14" rx="4" fill="#CFD8DC" transform="rotate(-10 58 85)"/>
  </g>
</svg>`)
      },
      {
        name: 'waving',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#37474F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Waving arm -->
    <path d="M68,52 Q78,40 76,26" stroke="#37474F" stroke-width="8" stroke-linecap="round"/>
    <circle cx="76" cy="24" r="5" fill="#ECEFF1" stroke="#37474F" stroke-width="2"/>
    <circle cx="48" cy="34" r="18" fill="#ECEFF1"/>
    <!-- Visor with earth reflection -->
    <ellipse cx="48" cy="34" rx="12" ry="10" fill="#FFB300"/>
    <circle cx="45" cy="32" r="3" fill="#4FC3F7" stroke="none"/>
    <rect x="28" y="52" width="40" height="32" rx="10" fill="#ECEFF1"/>
    <rect x="36" y="58" width="24" height="12" rx="3" fill="#1E88E5"/>
    <circle cx="42" cy="64" r="2" fill="#FF1744"/>
    <circle cx="54" cy="64" r="2" fill="#00E676"/>
    <rect x="20" y="54" width="8" height="20" rx="4" fill="#CFD8DC"/>
  </g>
</svg>`)
      },
      {
        name: 'flag',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#37474F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Flagpole planted -->
    <line x1="76" y1="14" x2="76" y2="86" stroke="#B0BEC5" stroke-width="3"/>
    <polygon points="76,16 94,22 76,28" fill="#FF5252" stroke="#D32F2F" stroke-width="1.5"/>
    <circle cx="44" cy="34" r="18" fill="#ECEFF1"/>
    <ellipse cx="44" cy="34" rx="12" ry="10" fill="#FFB300"/>
    <rect x="24" y="52" width="40" height="32" rx="10" fill="#ECEFF1"/>
    <rect x="32" y="58" width="24" height="12" rx="3" fill="#1E88E5"/>
    <circle cx="38" cy="64" r="2" fill="#FF1744"/>
    <circle cx="50" cy="64" r="2" fill="#00E676"/>
    <!-- Hand on flagpole -->
    <line x1="56" y1="58" x2="76" y2="52" stroke="#37474F" stroke-width="6"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── SATURN ───────────────────────────────────────────────────────
  {
    name: 'Saturn',
    category: 'Space',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="48" r="22" fill="#FFB74D"/>
    <ellipse cx="48" cy="48" rx="42" ry="12" stroke="#FFD54F" stroke-width="5" transform="rotate(-20 48 48)"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'golden',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="48" r="22" fill="#FFB74D"/>
    <ellipse cx="48" cy="48" rx="42" ry="12" stroke="#FFD54F" stroke-width="5" transform="rotate(-20 48 48)"/>
  </g>
</svg>`)
      },
      {
        name: 'tilted',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#E65100" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="48" r="22" fill="#FFA726"/>
    <!-- Atmospheric bands -->
    <path d="M28,42 Q48,46 68,42" stroke="#FB8C00" stroke-width="3"/>
    <path d="M30,52 Q48,56 66,52" stroke="#F57C00" stroke-width="3"/>
    <!-- Double rings -->
    <ellipse cx="48" cy="48" rx="44" ry="12" stroke="#FFE082" stroke-width="4" transform="rotate(-35 48 48)"/>
    <ellipse cx="48" cy="48" rx="38" ry="9" stroke="#FFB300" stroke-width="2.5" transform="rotate(-35 48 48)"/>
  </g>
</svg>`)
      },
      {
        name: 'purple-nebula',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#311B92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="48" r="22" fill="#7E57C2"/>
    <path d="M28,44 Q48,48 68,44" stroke="#5E35B1" stroke-width="3"/>
    <path d="M30,54 Q48,58 66,54" stroke="#512DA8" stroke-width="3"/>
    <!-- Glowing violet ring -->
    <ellipse cx="48" cy="48" rx="42" ry="12" stroke="#E1BEE7" stroke-width="5" transform="rotate(-20 48 48)"/>
    <!-- Sparkles -->
    <circle cx="16" cy="30" r="2" fill="#FFF" stroke="none"/>
    <circle cx="78" cy="62" r="1.5" fill="#FFF" stroke="none"/>
  </g>
</svg>`)
      },
      {
        name: 'ice-blue',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#006064" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="48" r="22" fill="#26C6DA"/>
    <path d="M28,44 Q48,48 68,44" stroke="#00ACC1" stroke-width="3"/>
    <path d="M30,54 Q48,58 66,54" stroke="#0097A7" stroke-width="3"/>
    <!-- Bright icy turquoise ring -->
    <ellipse cx="48" cy="48" rx="42" ry="12" stroke="#B2EBF2" stroke-width="5" transform="rotate(-20 48 48)"/>
    <circle cx="20" cy="22" r="2" fill="#E0F7FA" stroke="none"/>
    <circle cx="76" cy="74" r="2" fill="#E0F7FA" stroke="none"/>
  </g>
</svg>`)
      }
    ]
  }
];
