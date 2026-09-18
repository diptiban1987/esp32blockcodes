import { svg } from './svgHelper.js';

export const sports = [
  // ── BALL ─────────────────────────────────────────────────────────
  {
    name: 'Ball',
    category: 'Sports',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <radialGradient id="ballGrad1" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFE082"/>
      <stop offset="25%" stop-color="#FFB300"/>
      <stop offset="60%" stop-color="#FF6F00"/>
      <stop offset="100%" stop-color="#C43E00"/>
    </radialGradient>
    <radialGradient id="ballHighlight1" cx="32%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="48" r="36" fill="url(#ballGrad1)" stroke="#B23C00" stroke-width="2"/>
    <path d="M22,34 Q48,58 74,34" stroke="#FFF" stroke-width="3" fill="none" opacity="0.45"/>
    <path d="M22,62 Q48,38 74,62" stroke="#FFF" stroke-width="3" fill="none" opacity="0.45"/>
    <ellipse cx="38" cy="36" rx="20" ry="14" fill="url(#ballHighlight1)"/>
    <circle cx="34" cy="30" r="4.5" fill="#FFFFFF" opacity="0.9"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'gold',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <radialGradient id="bgGold" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFE082"/>
      <stop offset="25%" stop-color="#FFB300"/>
      <stop offset="60%" stop-color="#FF6F00"/>
      <stop offset="100%" stop-color="#C43E00"/>
    </radialGradient>
    <radialGradient id="hlGold" cx="32%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="48" r="36" fill="url(#bgGold)" stroke="#B23C00" stroke-width="2"/>
    <path d="M22,34 Q48,58 74,34" stroke="#FFF" stroke-width="3" fill="none" opacity="0.45"/>
    <path d="M22,62 Q48,38 74,62" stroke="#FFF" stroke-width="3" fill="none" opacity="0.45"/>
    <ellipse cx="38" cy="36" rx="20" ry="14" fill="url(#hlGold)"/>
    <circle cx="34" cy="30" r="4.5" fill="#FFFFFF" opacity="0.9"/>
  </g>
</svg>`)
      },
      {
        name: 'cyan',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <radialGradient id="bgCyan" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#E0F7FA"/>
      <stop offset="25%" stop-color="#00E5FF"/>
      <stop offset="60%" stop-color="#0091EA"/>
      <stop offset="100%" stop-color="#01579B"/>
    </radialGradient>
    <radialGradient id="hlCyan" cx="32%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="48" r="36" fill="url(#bgCyan)" stroke="#01579B" stroke-width="2"/>
    <path d="M22,34 Q48,58 74,34" stroke="#FFF" stroke-width="3" fill="none" opacity="0.5"/>
    <path d="M22,62 Q48,38 74,62" stroke="#FFF" stroke-width="3" fill="none" opacity="0.5"/>
    <ellipse cx="38" cy="36" rx="20" ry="14" fill="url(#hlCyan)"/>
    <circle cx="34" cy="30" r="4.5" fill="#FFFFFF" opacity="0.9"/>
  </g>
</svg>`)
      },
      {
        name: 'magenta',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <radialGradient id="bgPink" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FCE4EC"/>
      <stop offset="25%" stop-color="#FF4081"/>
      <stop offset="60%" stop-color="#D81B60"/>
      <stop offset="100%" stop-color="#880E4F"/>
    </radialGradient>
  </defs>
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="48" r="36" fill="url(#bgPink)" stroke="#880E4F" stroke-width="2"/>
    <path d="M22,34 Q48,58 74,34" stroke="#FFF" stroke-width="3" fill="none" opacity="0.5"/>
    <path d="M22,62 Q48,38 74,62" stroke="#FFF" stroke-width="3" fill="none" opacity="0.5"/>
    <ellipse cx="38" cy="36" rx="18" ry="12" fill="#FFF" opacity="0.5"/>
    <circle cx="34" cy="30" r="4" fill="#FFFFFF" opacity="0.9"/>
  </g>
</svg>`)
      },
      {
        name: 'emerald',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <radialGradient id="bgGreen" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#E8F5E9"/>
      <stop offset="25%" stop-color="#00E676"/>
      <stop offset="60%" stop-color="#00C853"/>
      <stop offset="100%" stop-color="#1B5E20"/>
    </radialGradient>
  </defs>
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="48" r="36" fill="url(#bgGreen)" stroke="#1B5E20" stroke-width="2"/>
    <path d="M22,34 Q48,58 74,34" stroke="#FFF" stroke-width="3" fill="none" opacity="0.5"/>
    <path d="M22,62 Q48,38 74,62" stroke="#FFF" stroke-width="3" fill="none" opacity="0.5"/>
    <ellipse cx="38" cy="36" rx="18" ry="12" fill="#FFF" opacity="0.5"/>
    <circle cx="34" cy="30" r="4" fill="#FFFFFF" opacity="0.9"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── SOCCER BALL ──────────────────────────────────────────────────
  {
    name: 'Soccer Ball',
    category: 'Sports',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="48" r="34" fill="#FFFFFF"/>
    <polygon points="48,28 36,36 40,50 56,50 60,36" fill="#212121"/>
    <line x1="48" y1="28" x2="48" y2="14"/>
    <line x1="36" y1="36" x2="20" y2="30"/>
    <line x1="40" y1="50" x2="26" y2="62"/>
    <line x1="56" y1="50" x2="70" y2="62"/>
    <line x1="60" y1="36" x2="76" y2="30"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'classic',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="48" r="34" fill="#FFFFFF"/>
    <polygon points="48,28 36,36 40,50 56,50 60,36" fill="#212121"/>
    <line x1="48" y1="28" x2="48" y2="14"/>
    <line x1="36" y1="36" x2="20" y2="30"/>
    <line x1="40" y1="50" x2="26" y2="62"/>
    <line x1="56" y1="50" x2="70" y2="62"/>
    <line x1="60" y1="36" x2="76" y2="30"/>
  </g>
</svg>`)
      },
      {
        name: 'rolling',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="rotate(35 48 48)">
    <circle cx="48" cy="48" r="34" fill="#FFFFFF"/>
    <polygon points="48,28 36,36 40,50 56,50 60,36" fill="#212121"/>
    <line x1="48" y1="28" x2="48" y2="14"/>
    <line x1="36" y1="36" x2="20" y2="30"/>
    <line x1="40" y1="50" x2="26" y2="62"/>
    <line x1="56" y1="50" x2="70" y2="62"/>
    <line x1="60" y1="36" x2="76" y2="30"/>
  </g>
</svg>`)
      },
      {
        name: 'spin',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="rotate(80 48 48)">
    <circle cx="48" cy="48" r="34" fill="#FFFFFF"/>
    <polygon points="48,28 36,36 40,50 56,50 60,36" fill="#212121"/>
    <line x1="48" y1="28" x2="48" y2="14"/>
    <line x1="36" y1="36" x2="20" y2="30"/>
    <line x1="40" y1="50" x2="26" y2="62"/>
    <line x1="56" y1="50" x2="70" y2="62"/>
    <line x1="60" y1="36" x2="76" y2="30"/>
    <!-- Speed arcs -->
    <path d="M12,48 A36,36 0 0,1 48,12" stroke="#42A5F5" stroke-width="2" stroke-dasharray="6,4"/>
  </g>
</svg>`)
      },
      {
        name: 'blue-edition',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#0D47A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="48" r="34" fill="#E3F2FD"/>
    <polygon points="48,28 36,36 40,50 56,50 60,36" fill="#1976D2"/>
    <line x1="48" y1="28" x2="48" y2="14" stroke="#1976D2" stroke-width="2"/>
    <line x1="36" y1="36" x2="20" y2="30" stroke="#1976D2" stroke-width="2"/>
    <line x1="40" y1="50" x2="26" y2="62" stroke="#1976D2" stroke-width="2"/>
    <line x1="56" y1="50" x2="70" y2="62" stroke="#1976D2" stroke-width="2"/>
    <line x1="60" y1="36" x2="76" y2="30" stroke="#1976D2" stroke-width="2"/>
    <polygon points="48,14 42,14 48,20" fill="#00E5FF"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── BASKETBALL ───────────────────────────────────────────────────
  {
    name: 'Basketball',
    category: 'Sports',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#3E2723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="48" r="34" fill="#E65100"/>
    <line x1="14" y1="48" x2="82" y2="48"/>
    <line x1="48" y1="14" x2="48" y2="82"/>
    <path d="M22,24 C40,40 40,56 22,72"/>
    <path d="M74,24 C56,40 56,56 74,72"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'classic',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#3E2723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="48" r="34" fill="#E65100"/>
    <line x1="14" y1="48" x2="82" y2="48"/>
    <line x1="48" y1="14" x2="48" y2="82"/>
    <path d="M22,24 C40,40 40,56 22,72"/>
    <path d="M74,24 C56,40 56,56 74,72"/>
  </g>
</svg>`)
      },
      {
        name: 'spinning',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#3E2723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="rotate(25 48 48)">
    <circle cx="48" cy="48" r="34" fill="#FF6D00"/>
    <line x1="14" y1="48" x2="82" y2="48"/>
    <line x1="48" y1="14" x2="48" y2="82"/>
    <path d="M22,24 C40,40 40,56 22,72"/>
    <path d="M74,24 C56,40 56,56 74,72"/>
    <ellipse cx="34" cy="30" rx="8" ry="4" fill="#FFF" opacity="0.3" stroke="none"/>
  </g>
</svg>`)
      },
      {
        name: 'bounce',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#3E2723" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <!-- Squashed bottom for dynamic bounce impact -->
    <ellipse cx="48" cy="52" rx="36" ry="30" fill="#E65100"/>
    <line x1="12" y1="52" x2="84" y2="52"/>
    <line x1="48" y1="22" x2="48" y2="82"/>
    <path d="M22,30 C38,44 38,60 22,74"/>
    <path d="M74,30 C58,44 58,60 74,74"/>
    <line x1="20" y1="86" x2="76" y2="86" stroke="#BDBDBD" stroke-width="3" stroke-linecap="round"/>
  </g>
</svg>`)
      },
      {
        name: 'fireball',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#BF360C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <!-- Flame trail behind ball -->
    <path d="M16,28 Q6,14 12,38 Q4,30 14,52" stroke="#FF9100" stroke-width="4" stroke-linecap="round"/>
    <circle cx="52" cy="48" r="32" fill="#FF3D00"/>
    <line x1="20" y1="48" x2="84" y2="48" stroke="#3E2723"/>
    <line x1="52" y1="16" x2="52" y2="80" stroke="#3E2723"/>
    <path d="M28,26 C44,40 44,56 28,70" stroke="#3E2723"/>
    <path d="M76,26 C60,40 60,56 76,70" stroke="#3E2723"/>
    <circle cx="44" cy="36" r="4" fill="#FFEA00" stroke="none"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── TENNIS RACKET ────────────────────────────────────────────────
  {
    name: 'Tennis Racket',
    category: 'Sports',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="38" cy="34" rx="20" ry="24" fill="#76FF03" opacity="0.3" stroke="#C6FF00" stroke-width="3"/>
    <line x1="50" y1="50" x2="78" y2="78" stroke="#37474F" stroke-width="6"/>
    <rect x="74" y="74" width="10" height="12" rx="2" fill="#E0E0E0" stroke="#37474F"/>
    <circle cx="70" cy="30" r="8" fill="#C6FF00" stroke="#9E9D24" stroke-width="1.5"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'ready',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="38" cy="34" rx="20" ry="24" fill="#76FF03" opacity="0.3" stroke="#C6FF00" stroke-width="3"/>
    <line x1="50" y1="50" x2="78" y2="78" stroke="#37474F" stroke-width="6"/>
    <rect x="74" y="74" width="10" height="12" rx="2" fill="#E0E0E0" stroke="#37474F"/>
    <circle cx="70" cy="30" r="8" fill="#C6FF00" stroke="#9E9D24" stroke-width="1.5"/>
  </g>
</svg>`)
      },
      {
        name: 'smash',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="32" rx="22" ry="22" fill="#76FF03" opacity="0.3" stroke="#FFD600" stroke-width="3"/>
    <line x1="48" y1="54" x2="48" y2="88" stroke="#37474F" stroke-width="6"/>
    <rect x="44" y="78" width="8" height="14" rx="2" fill="#E0E0E0" stroke="#37474F"/>
    <!-- Ball at impact center with stars/sparks -->
    <circle cx="48" cy="32" r="8" fill="#C6FF00" stroke="#9E9D24" stroke-width="1.5"/>
    <line x1="32" y1="20" x2="24" y2="14" stroke="#FFD600" stroke-width="2"/>
    <line x1="64" y1="20" x2="72" y2="14" stroke="#FFD600" stroke-width="2"/>
  </g>
</svg>`)
      },
      {
        name: 'red-frame',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="38" cy="34" rx="20" ry="24" fill="#FFCDD2" opacity="0.4" stroke="#D50000" stroke-width="3.5"/>
    <line x1="50" y1="50" x2="78" y2="78" stroke="#D50000" stroke-width="6"/>
    <rect x="72" y="72" width="12" height="14" rx="2" fill="#212121" stroke="#D50000"/>
    <circle cx="70" cy="30" r="8" fill="#EEFF41" stroke="#9E9D24" stroke-width="1.5"/>
  </g>
</svg>`)
      },
      {
        name: 'blue-tour',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="38" cy="34" rx="20" ry="24" fill="#E1F5FE" opacity="0.4" stroke="#0288D1" stroke-width="3.5"/>
    <line x1="50" y1="50" x2="78" y2="78" stroke="#01579B" stroke-width="6"/>
    <rect x="72" y="72" width="12" height="14" rx="2" fill="#FFF" stroke="#01579B"/>
    <circle cx="72" cy="26" r="8" fill="#C6FF00" stroke="#7CB342" stroke-width="1.5"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── TROPHY ───────────────────────────────────────────────────────
  {
    name: 'Trophy',
    category: 'Sports',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#E65100" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M26,18 L70,18 L64,48 C60,60 36,60 32,48Z" fill="#FFD54F"/>
    <path d="M26,24 C14,24 14,40 28,40" fill="none" stroke-width="2"/>
    <path d="M70,24 C82,24 82,40 68,40" fill="none" stroke-width="2"/>
    <rect x="44" y="58" width="8" height="16" fill="#FFB300"/>
    <rect x="28" y="74" width="40" height="12" rx="3" fill="#5D4037" stroke="#3E2723"/>
    <polygon points="48,26 44,34 53,29 43,29 52,34" fill="#FFF"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'gold',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#E65100" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M26,18 L70,18 L64,48 C60,60 36,60 32,48Z" fill="#FFD54F"/>
    <path d="M26,24 C14,24 14,40 28,40" fill="none" stroke-width="2"/>
    <path d="M70,24 C82,24 82,40 68,40" fill="none" stroke-width="2"/>
    <rect x="44" y="58" width="8" height="16" fill="#FFB300"/>
    <rect x="28" y="74" width="40" height="12" rx="3" fill="#5D4037" stroke="#3E2723"/>
    <polygon points="48,26 44,34 53,29 43,29 52,34" fill="#FFF"/>
  </g>
</svg>`)
      },
      {
        name: 'silver',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#455A64" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M26,18 L70,18 L64,48 C60,60 36,60 32,48Z" fill="#CFD8DC"/>
    <path d="M26,24 C14,24 14,40 28,40" fill="none" stroke-width="2"/>
    <path d="M70,24 C82,24 82,40 68,40" fill="none" stroke-width="2"/>
    <rect x="44" y="58" width="8" height="16" fill="#B0BEC5"/>
    <rect x="28" y="74" width="40" height="12" rx="3" fill="#37474F" stroke="#263238"/>
    <circle cx="48" cy="36" r="8" fill="#ECEFF1"/>
    <text x="48" y="40" font-size="10" font-weight="bold" fill="#37474F" text-anchor="middle">2</text>
  </g>
</svg>`)
      },
      {
        name: 'bronze',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4E342E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M26,18 L70,18 L64,48 C60,60 36,60 32,48Z" fill="#BCAAA4"/>
    <path d="M26,24 C14,24 14,40 28,40" fill="none" stroke-width="2"/>
    <path d="M70,24 C82,24 82,40 68,40" fill="none" stroke-width="2"/>
    <rect x="44" y="58" width="8" height="16" fill="#8D6E63"/>
    <rect x="28" y="74" width="40" height="12" rx="3" fill="#3E2723" stroke="#271410"/>
    <circle cx="48" cy="36" r="8" fill="#D7CCC8"/>
    <text x="48" y="40" font-size="10" font-weight="bold" fill="#4E342E" text-anchor="middle">3</text>
  </g>
</svg>`)
      },
      {
        name: 'victory-sparkle',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#E65100" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M26,18 L70,18 L64,48 C60,60 36,60 32,48Z" fill="#FFC107"/>
    <path d="M26,24 C14,24 14,40 28,40" fill="none" stroke-width="2"/>
    <path d="M70,24 C82,24 82,40 68,40" fill="none" stroke-width="2"/>
    <rect x="44" y="58" width="8" height="16" fill="#FFA000"/>
    <rect x="28" y="74" width="40" height="12" rx="3" fill="#424242" stroke="#212121"/>
    <!-- #1 Star -->
    <polygon points="48,26 51,33 58,34 53,39 54,46 48,42 42,46 43,39 38,34 45,33" fill="#FFF" stroke="none"/>
    <!-- Sparkles and stars -->
    <polygon points="14,16 16,11 18,16 23,18 18,20 16,25 14,20 9,18" fill="#FFD700" stroke="none"/>
    <polygon points="80,14 81,10 83,14 87,15 83,17 81,21 80,17 76,15" fill="#FFD700" stroke="none"/>
    <circle cx="20" cy="56" r="3" fill="#FF4081" stroke="none"/>
    <circle cx="78" cy="54" r="3" fill="#00E5FF" stroke="none"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── SKATEBOARD ───────────────────────────────────────────────────
  {
    name: 'Skateboard',
    category: 'Sports',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12,44 C20,38 76,38 84,44 L80,52 C72,56 24,56 16,52Z" fill="#FF4081"/>
    <circle cx="28" cy="62" r="6" fill="#37474F"/>
    <circle cx="68" cy="62" r="6" fill="#37474F"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'flat',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12,44 C20,38 76,38 84,44 L80,52 C72,56 24,56 16,52Z" fill="#FF4081"/>
    <circle cx="28" cy="62" r="6" fill="#37474F"/>
    <circle cx="68" cy="62" r="6" fill="#37474F"/>
  </g>
</svg>`)
      },
      {
        name: 'kickflip',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-25 48 48)">
    <path d="M12,44 C20,38 76,38 84,44 L80,52 C72,56 24,56 16,52Z" fill="#FF4081"/>
    <circle cx="28" cy="62" r="6" fill="#00E5FF"/>
    <circle cx="68" cy="62" r="6" fill="#00E5FF"/>
    <path d="M26,45 L70,45" stroke="#FFF" stroke-width="2"/>
  </g>
</svg>`)
      },
      {
        name: 'grind',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="rotate(20 48 48)">
    <path d="M12,44 C20,38 76,38 84,44 L80,52 C72,56 24,56 16,52Z" fill="#7C4DFF"/>
    <circle cx="28" cy="62" r="6" fill="#FFD600"/>
    <circle cx="68" cy="62" r="6" fill="#FFD600"/>
    <!-- Grind sparks -->
    <line x1="68" y1="68" x2="76" y2="76" stroke="#FF5722" stroke-width="2"/>
    <line x1="72" y1="66" x2="82" y2="68" stroke="#FFD600" stroke-width="2"/>
  </g>
</svg>`)
      },
      {
        name: 'flame-deck',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12,44 C20,38 76,38 84,44 L80,52 C72,56 24,56 16,52Z" fill="#212121"/>
    <!-- Flame graphics -->
    <path d="M18,48 Q32,42 46,47 Q36,51 24,51 Z" fill="#FF3D00" stroke="none"/>
    <path d="M46,47 Q60,42 74,48 Q60,52 46,50 Z" fill="#FFEA00" stroke="none"/>
    <circle cx="28" cy="62" r="6" fill="#00E676"/>
    <circle cx="68" cy="62" r="6" fill="#00E676"/>
  </g>
</svg>`)
      }
    ]
  }
];
