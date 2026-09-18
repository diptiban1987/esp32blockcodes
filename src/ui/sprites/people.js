import { svg } from './svgHelper.js';

export const people = [
  // ── BOY ────────────────────────────────────────────────────────
  {
    name: 'Boy',
    category: 'People',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#37474F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M28,26 Q48,10 68,26 L72,32 L24,32Z" fill="#E53935"/>
    <rect x="20" y="30" width="56" height="6" rx="3" fill="#C62828"/>
    <circle cx="48" cy="44" r="16" fill="#FFCC80"/>
    <circle cx="41" cy="42" r="2.5" fill="#37474F"/>
    <circle cx="55" cy="42" r="2.5" fill="#37474F"/>
    <path d="M44,50 Q48,54 52,50" fill="none"/>
    <rect x="28" y="60" width="40" height="28" rx="6" fill="#1E88E5"/>
    <path d="M40,60 L40,88 M56,60 L56,88" stroke="#1565C0"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'standing',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#37474F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M28,26 Q48,10 68,26 L72,32 L24,32Z" fill="#E53935"/>
    <rect x="20" y="30" width="56" height="6" rx="3" fill="#C62828"/>
    <circle cx="48" cy="44" r="16" fill="#FFCC80"/>
    <circle cx="41" cy="42" r="2.5" fill="#37474F"/>
    <circle cx="55" cy="42" r="2.5" fill="#37474F"/>
    <path d="M44,50 Q48,54 52,50" fill="none"/>
    <rect x="28" y="60" width="40" height="28" rx="6" fill="#1E88E5"/>
    <path d="M40,60 L40,88 M56,60 L56,88" stroke="#1565C0"/>
  </g>
</svg>`)
      },
      {
        name: 'walking',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#37474F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M30,24 Q50,8 70,24 L74,30 L26,30Z" fill="#E53935"/>
    <rect x="22" y="28" width="56" height="6" rx="3" fill="#C62828"/>
    <circle cx="50" cy="42" r="16" fill="#FFCC80"/>
    <circle cx="43" cy="40" r="2.5" fill="#37474F"/>
    <circle cx="57" cy="40" r="2.5" fill="#37474F"/>
    <path d="M46,48 Q50,52 54,48" fill="none"/>
    <rect x="30" y="58" width="40" height="24" rx="6" fill="#1E88E5"/>
    <!-- Walking stride legs -->
    <path d="M38,82 L28,92" stroke="#1565C0" stroke-width="6" stroke-linecap="round"/>
    <path d="M60,82 L72,92" stroke="#1565C0" stroke-width="6" stroke-linecap="round"/>
  </g>
</svg>`)
      },
      {
        name: 'jumping',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#37474F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M28,20 Q48,4 68,20 L72,26 L24,26Z" fill="#E53935"/>
    <rect x="20" y="24" width="56" height="6" rx="3" fill="#C62828"/>
    <circle cx="48" cy="38" r="16" fill="#FFCC80"/>
    <circle cx="41" cy="36" r="2.5" fill="#37474F"/>
    <circle cx="55" cy="36" r="2.5" fill="#37474F"/>
    <path d="M42,44 Q48,50 54,44" fill="#FF8A80" stroke="#37474F"/>
    <!-- Arms raised in air -->
    <path d="M28,52 L14,36" stroke="#FFCC80" stroke-width="5" stroke-linecap="round"/>
    <path d="M68,52 L82,36" stroke="#FFCC80" stroke-width="5" stroke-linecap="round"/>
    <rect x="28" y="52" width="40" height="24" rx="6" fill="#1E88E5"/>
    <!-- Tucked legs in jump -->
    <path d="M36,76 L30,86 L42,86" stroke="#1565C0" stroke-width="5"/>
    <path d="M60,76 L66,86 L54,86" stroke="#1565C0" stroke-width="5"/>
  </g>
</svg>`)
      },
      {
        name: 'waving',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#37474F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M28,26 Q48,10 68,26 L72,32 L24,32Z" fill="#E53935"/>
    <rect x="20" y="30" width="56" height="6" rx="3" fill="#C62828"/>
    <circle cx="48" cy="44" r="16" fill="#FFCC80"/>
    <circle cx="41" cy="42" r="2.5" fill="#37474F"/>
    <circle cx="55" cy="42" r="2.5" fill="#37474F"/>
    <path d="M43,50 Q48,55 53,50" stroke="#37474F"/>
    <!-- Waving hand -->
    <path d="M68,62 L84,48 L80,38" stroke="#FFCC80" stroke-width="5" stroke-linecap="round"/>
    <circle cx="80" cy="36" r="4" fill="#FFCC80"/>
    <rect x="28" y="60" width="40" height="28" rx="6" fill="#1E88E5"/>
    <path d="M40,60 L40,88 M56,60 L56,88" stroke="#1565C0"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── GIRL ───────────────────────────────────────────────────────
  {
    name: 'Girl',
    category: 'People',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4A148C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="24" cy="36" r="10" fill="#4E342E"/>
    <circle cx="72" cy="36" r="10" fill="#4E342E"/>
    <circle cx="48" cy="42" r="16" fill="#FFE0B2"/>
    <path d="M32,32 Q48,22 64,32" fill="#4E342E"/>
    <circle cx="41" cy="40" r="2.5" fill="#37474F"/>
    <circle cx="55" cy="40" r="2.5" fill="#37474F"/>
    <path d="M44,48 Q48,52 52,48" fill="none"/>
    <path d="M30,58 L66,58 L74,86 L22,86Z" fill="#D81B60"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'standing',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4A148C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="24" cy="36" r="10" fill="#4E342E"/>
    <circle cx="72" cy="36" r="10" fill="#4E342E"/>
    <circle cx="48" cy="42" r="16" fill="#FFE0B2"/>
    <path d="M32,32 Q48,22 64,32" fill="#4E342E"/>
    <circle cx="41" cy="40" r="2.5" fill="#37474F"/>
    <circle cx="55" cy="40" r="2.5" fill="#37474F"/>
    <path d="M44,48 Q48,52 52,48" fill="none"/>
    <path d="M30,58 L66,58 L74,86 L22,86Z" fill="#D81B60"/>
  </g>
</svg>`)
      },
      {
        name: 'walking',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4A148C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="22" cy="34" r="10" fill="#4E342E"/>
    <circle cx="74" cy="34" r="10" fill="#4E342E"/>
    <circle cx="48" cy="40" r="16" fill="#FFE0B2"/>
    <circle cx="41" cy="38" r="2.5" fill="#37474F"/>
    <circle cx="55" cy="38" r="2.5" fill="#37474F"/>
    <path d="M32,56 L64,56 L72,82 L24,82Z" fill="#D81B60"/>
    <!-- Walking feet -->
    <path d="M36,82 L26,92" stroke="#4E342E" stroke-width="4" stroke-linecap="round"/>
    <path d="M60,82 L70,92" stroke="#4E342E" stroke-width="4" stroke-linecap="round"/>
  </g>
</svg>`)
      },
      {
        name: 'jumping',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4A148C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Pigtails bouncing up -->
    <circle cx="20" cy="28" r="10" fill="#4E342E"/>
    <circle cx="76" cy="28" r="10" fill="#4E342E"/>
    <circle cx="48" cy="36" r="16" fill="#FFE0B2"/>
    <circle cx="41" cy="34" r="2.5" fill="#37474F"/>
    <circle cx="55" cy="34" r="2.5" fill="#37474F"/>
    <path d="M43,42 Q48,47 53,42" fill="#FF8A80" stroke="#4A148C"/>
    <!-- Arms raised in air -->
    <path d="M28,50 L14,34" stroke="#FFE0B2" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M68,50 L82,34" stroke="#FFE0B2" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M28,52 L68,52 L78,76 L18,76Z" fill="#D81B60"/>
  </g>
</svg>`)
      },
      {
        name: 'waving',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4A148C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="24" cy="36" r="10" fill="#4E342E"/>
    <circle cx="72" cy="36" r="10" fill="#4E342E"/>
    <circle cx="48" cy="42" r="16" fill="#FFE0B2"/>
    <circle cx="41" cy="40" r="2.5" fill="#37474F"/>
    <circle cx="55" cy="40" r="2.5" fill="#37474F"/>
    <path d="M44,48 Q48,53 52,48" stroke="#4A148C"/>
    <!-- Waving arm -->
    <path d="M68,60 L82,46 L80,36" stroke="#FFE0B2" stroke-width="4.5" stroke-linecap="round"/>
    <circle cx="80" cy="34" r="3.5" fill="#FFE0B2"/>
    <path d="M30,58 L66,58 L74,86 L22,86Z" fill="#D81B60"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── SUPERHERO ──────────────────────────────────────────────────
  {
    name: 'Superhero',
    category: 'People',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#B71C1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22,40 Q10,70 18,88 L78,88 Q86,70 74,40Z" fill="#D32F2F"/>
    <circle cx="48" cy="34" r="16" fill="#FFCC80"/>
    <path d="M32,30 Q48,26 64,30 L64,38 Q48,42 32,38Z" fill="#1976D2"/>
    <circle cx="41" cy="34" r="2" fill="white"/>
    <circle cx="55" cy="34" r="2" fill="white"/>
    <path d="M44,42 Q48,45 52,42" stroke="#B71C1C"/>
    <rect x="30" y="50" width="36" height="34" rx="6" fill="#1976D2"/>
    <polygon points="48,56 42,66 54,66" fill="#FBC02D"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'standing',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#B71C1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22,40 Q10,70 18,88 L78,88 Q86,70 74,40Z" fill="#D32F2F"/>
    <circle cx="48" cy="34" r="16" fill="#FFCC80"/>
    <path d="M32,30 Q48,26 64,30 L64,38 Q48,42 32,38Z" fill="#1976D2"/>
    <circle cx="41" cy="34" r="2" fill="white"/>
    <circle cx="55" cy="34" r="2" fill="white"/>
    <rect x="30" y="50" width="36" height="34" rx="6" fill="#1976D2"/>
    <polygon points="48,56 42,66 54,66" fill="#FBC02D"/>
  </g>
</svg>`)
      },
      {
        name: 'flying',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#B71C1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Flowing cape behind flying hero -->
    <path d="M20,54 Q8,60 2,74 Q18,72 32,64" fill="#D32F2F"/>
    <!-- Body angled forward flying -->
    <ellipse cx="44" cy="50" rx="20" ry="14" fill="#1976D2" transform="rotate(-20 44 50)"/>
    <circle cx="64" cy="40" r="13" fill="#FFCC80"/>
    <path d="M54,34 Q66,30 76,34 L74,40 Q64,42 54,38Z" fill="#1976D2"/>
    <!-- Fist forward -->
    <path d="M68,44 L88,32" stroke="#FFCC80" stroke-width="6" stroke-linecap="round"/>
    <circle cx="90" cy="31" r="4" fill="#FFCC80"/>
  </g>
</svg>`)
      },
      {
        name: 'landing',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#B71C1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Cape billowing up high -->
    <path d="M16,28 Q24,8 48,16 Q72,8 80,28 L74,54 L22,54 Z" fill="#D32F2F"/>
    <circle cx="48" cy="44" r="14" fill="#FFCC80"/>
    <path d="M34,40 Q48,36 62,40 L62,46 Q48,50 34,46Z" fill="#1976D2"/>
    <!-- Ground impact pose -->
    <rect x="34" y="58" width="28" height="22" rx="4" fill="#1976D2"/>
    <path d="M48,72 L48,88" stroke="#FFCC80" stroke-width="6" stroke-linecap="round"/>
    <circle cx="48" cy="88" r="5" fill="#FBC02D"/>
  </g>
</svg>`)
      },
      {
        name: 'laser-beam',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#B71C1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22,40 Q10,70 18,88 L78,88 Q86,70 74,40Z" fill="#D32F2F"/>
    <circle cx="48" cy="34" r="16" fill="#FFCC80"/>
    <!-- Glowing eyes -->
    <circle cx="41" cy="34" r="3" fill="#00E5FF"/>
    <circle cx="55" cy="34" r="3" fill="#00E5FF"/>
    <!-- Laser beams -->
    <line x1="41" y1="34" x2="10" y2="10" stroke="#00E5FF" stroke-width="3" stroke-linecap="round"/>
    <line x1="55" y1="34" x2="86" y2="10" stroke="#00E5FF" stroke-width="3" stroke-linecap="round"/>
    <rect x="30" y="50" width="36" height="34" rx="6" fill="#1976D2"/>
    <polygon points="48,56 42,66 54,66" fill="#FBC02D"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── WIZARD ─────────────────────────────────────────────────────
  {
    name: 'Wizard',
    category: 'People',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#311B92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="48,4 26,30 70,30" fill="#4A148C"/>
    <ellipse cx="48" cy="30" rx="26" ry="6" fill="#6A1B9A"/>
    <polygon points="48,12 45,18 51,18" fill="#FFD54F"/>
    <circle cx="48" cy="42" r="14" fill="#FFCC80"/>
    <path d="M34,44 Q48,64 62,44 Q58,68 48,70 Q38,68 34,44Z" fill="#FFFFFF"/>
    <circle cx="42" cy="40" r="2" fill="#311B92"/>
    <circle cx="54" cy="40" r="2" fill="#311B92"/>
    <path d="M26,56 L70,56 L76,88 L20,88Z" fill="#4A148C"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'standing',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#311B92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="48,4 26,30 70,30" fill="#4A148C"/>
    <ellipse cx="48" cy="30" rx="26" ry="6" fill="#6A1B9A"/>
    <polygon points="48,12 45,18 51,18" fill="#FFD54F"/>
    <circle cx="48" cy="42" r="14" fill="#FFCC80"/>
    <path d="M34,44 Q48,64 62,44 Q58,68 48,70 Q38,68 34,44Z" fill="#FFFFFF"/>
    <circle cx="42" cy="40" r="2" fill="#311B92"/>
    <circle cx="54" cy="40" r="2" fill="#311B92"/>
    <path d="M26,56 L70,56 L76,88 L20,88Z" fill="#4A148C"/>
  </g>
</svg>`)
      },
      {
        name: 'casting-spell',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#311B92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="44,4 22,30 66,30" fill="#4A148C"/>
    <ellipse cx="44" cy="30" rx="26" ry="6" fill="#6A1B9A"/>
    <circle cx="44" cy="42" r="14" fill="#FFCC80"/>
    <path d="M30,44 Q44,64 58,44 Q54,68 44,70 Q34,68 30,44Z" fill="#FFFFFF"/>
    <!-- Staff with glowing magic orb -->
    <line x1="72" y1="88" x2="80" y2="18" stroke="#8D6E63" stroke-width="3"/>
    <circle cx="80" cy="16" r="7" fill="#00E5FF"/>
    <circle cx="80" cy="16" r="4" fill="#E0F7FA"/>
    <!-- Magic sparkles -->
    <polygon points="88,6 89,10 93,11 89,12 88,16 87,12 83,11 87,10" fill="#FFEB3B"/>
    <path d="M24,56 L64,56 L70,88 L18,88Z" fill="#4A148C"/>
  </g>
</svg>`)
      },
      {
        name: 'spellbook',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#311B92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="48,4 26,30 70,30" fill="#4A148C"/>
    <ellipse cx="48" cy="30" rx="26" ry="6" fill="#6A1B9A"/>
    <circle cx="48" cy="42" r="14" fill="#FFCC80"/>
    <!-- Floating open grimoire -->
    <path d="M32,66 L48,72 L64,66 L64,82 L48,86 L32,82 Z" fill="#5D4037" stroke="#3E2723"/>
    <path d="M48,72 L48,86" stroke="#D7CCC8" stroke-width="2"/>
    <path d="M34,68 L46,73 L46,84 L34,80 Z" fill="#FFF8E1"/>
    <path d="M62,68 L50,73 L50,84 L62,80 Z" fill="#FFF8E1"/>
    <!-- Floating mystical glow -->
    <circle cx="48" cy="62" r="4" fill="#FF4081" opacity="0.8"/>
  </g>
</svg>`)
      },
      {
        name: 'summoning',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#311B92" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="48,2 26,28 70,28" fill="#4A148C"/>
    <ellipse cx="48" cy="28" rx="26" ry="6" fill="#6A1B9A"/>
    <circle cx="48" cy="40" r="14" fill="#FFCC80"/>
    <!-- Hands raised summoning huge energy sphere -->
    <path d="M30,52 L22,34 M66,52 L74,34" stroke="#FFCC80" stroke-width="4.5" stroke-linecap="round"/>
    <circle cx="48" cy="18" r="12" fill="#7C4DFF" opacity="0.8"/>
    <circle cx="48" cy="18" r="7" fill="#E040FB"/>
    <circle cx="48" cy="18" r="3" fill="#FFFFFF"/>
    <path d="M26,56 L70,56 L76,88 L20,88Z" fill="#4A148C"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── DANCER ─────────────────────────────────────────────────────
  {
    name: 'Dancer',
    category: 'People',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#880E4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="24" r="14" fill="#FFCC80"/>
    <path d="M36,20 Q48,12 60,20" fill="#880E4F"/>
    <circle cx="43" cy="24" r="2" fill="#333"/>
    <circle cx="53" cy="24" r="2" fill="#333"/>
    <path d="M45,29 Q48,32 51,29"/>
    <path d="M20,36 L36,44 M76,20 L60,40" stroke="#FF4081" stroke-width="3"/>
    <path d="M38,38 L58,38 L66,66 L30,66Z" fill="#E91E63"/>
    <path d="M40,66 L34,88 M56,66 L62,88" stroke="#880E4F" stroke-width="3"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'dance-pose-1',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#880E4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="24" r="14" fill="#FFCC80"/>
    <path d="M36,20 Q48,12 60,20" fill="#880E4F"/>
    <circle cx="43" cy="24" r="2" fill="#333"/>
    <circle cx="53" cy="24" r="2" fill="#333"/>
    <path d="M20,36 L36,44 M76,20 L60,40" stroke="#FF4081" stroke-width="3"/>
    <path d="M38,38 L58,38 L66,66 L30,66Z" fill="#E91E63"/>
    <path d="M40,66 L34,88 M56,66 L62,88" stroke="#880E4F" stroke-width="3"/>
  </g>
</svg>`)
      },
      {
        name: 'spin',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#880E4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="24" r="14" fill="#FFCC80"/>
    <path d="M36,20 Q48,12 60,20" fill="#880E4F"/>
    <!-- Both arms in circle above head -->
    <path d="M36,40 Q28,14 48,12 Q68,14 60,40" stroke="#FF4081" stroke-width="3"/>
    <!-- Spinning flared tutu -->
    <ellipse cx="48" cy="58" rx="28" ry="10" fill="#E91E63"/>
    <path d="M48,64 L48,90" stroke="#880E4F" stroke-width="3.5"/>
  </g>
</svg>`)
      },
      {
        name: 'leap',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#880E4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="50" cy="22" r="13" fill="#FFCC80"/>
    <path d="M38,36 L18,24 M62,36 L84,24" stroke="#FF4081" stroke-width="3"/>
    <path d="M40,36 L60,36 L68,60 L32,60Z" fill="#E91E63"/>
    <!-- Split leap legs in mid-air -->
    <path d="M36,60 L14,72 M60,60 L82,72" stroke="#880E4F" stroke-width="3.5"/>
  </g>
</svg>`)
      },
      {
        name: 'bow',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#880E4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="34" r="13" fill="#FFCC80"/>
    <!-- Curtsey pose -->
    <path d="M34,48 L18,60 M62,48 L78,60" stroke="#FF4081" stroke-width="3"/>
    <path d="M32,48 L64,48 L78,82 L18,82Z" fill="#E91E63"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── QUEEN ──────────────────────────────────────────────────────
  {
    name: 'Queen',
    category: 'People',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4C1D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M28,52 L68,52 L78,88 L18,88 Z" fill="#7C3AED" stroke="#4C1D95"/>
    <rect x="24" y="84" width="48" height="4" rx="2" fill="#F59E0B" stroke="#B45309"/>
    <circle cx="48" cy="34" r="15" fill="#FFEDD5" stroke="#4C1D95"/>
    <circle cx="42" cy="33" r="2" fill="#1E1B4B"/>
    <circle cx="54" cy="33" r="2" fill="#1E1B4B"/>
    <polygon points="34,22 37,12 43,18 48,8 53,18 59,12 62,22" fill="#F59E0B" stroke="#B45309" stroke-width="1.5"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'standing',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4C1D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M28,52 L68,52 L78,88 L18,88 Z" fill="#7C3AED" stroke="#4C1D95"/>
    <rect x="24" y="84" width="48" height="4" rx="2" fill="#F59E0B" stroke="#B45309"/>
    <circle cx="48" cy="34" r="15" fill="#FFEDD5" stroke="#4C1D95"/>
    <circle cx="42" cy="33" r="2" fill="#1E1B4B"/>
    <circle cx="54" cy="33" r="2" fill="#1E1B4B"/>
    <polygon points="34,22 37,12 43,18 48,8 53,18 59,12 62,22" fill="#F59E0B" stroke="#B45309" stroke-width="1.5"/>
  </g>
</svg>`)
      },
      {
        name: 'waving',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4C1D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M28,52 L68,52 L78,88 L18,88 Z" fill="#7C3AED" stroke="#4C1D95"/>
    <circle cx="48" cy="34" r="15" fill="#FFEDD5" stroke="#4C1D95"/>
    <circle cx="42" cy="33" r="2" fill="#1E1B4B"/>
    <circle cx="54" cy="33" r="2" fill="#1E1B4B"/>
    <polygon points="34,22 37,12 43,18 48,8 53,18 59,12 62,22" fill="#F59E0B" stroke="#B45309"/>
    <!-- Royal Wave -->
    <path d="M70,52 L84,40 L82,30" stroke="#FFEDD5" stroke-width="4"/>
    <circle cx="82" cy="28" r="3.5" fill="#FFEDD5"/>
  </g>
</svg>`)
      },
      {
        name: 'with-scepter',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4C1D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M28,52 L68,52 L78,88 L18,88 Z" fill="#7C3AED" stroke="#4C1D95"/>
    <circle cx="48" cy="34" r="15" fill="#FFEDD5" stroke="#4C1D95"/>
    <polygon points="34,22 37,12 43,18 48,8 53,18 59,12 62,22" fill="#F59E0B"/>
    <!-- Golden Royal Scepter -->
    <line x1="22" y1="84" x2="22" y2="40" stroke="#F59E0B" stroke-width="3"/>
    <circle cx="22" cy="38" r="5" fill="#EF4444" stroke="#B45309"/>
  </g>
</svg>`)
      },
      {
        name: 'crowning',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4C1D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M28,54 L68,54 L78,88 L18,88 Z" fill="#7C3AED"/>
    <circle cx="48" cy="38" r="15" fill="#FFEDD5"/>
    <!-- Crown held above head with sparkles -->
    <polygon points="34,14 37,4 43,10 48,0 53,10 59,4 62,14" fill="#F59E0B" stroke="#B45309"/>
    <circle cx="28" cy="8" r="2" fill="#FFEB3B"/>
    <circle cx="68" cy="8" r="2" fill="#FFEB3B"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── DIVER ──────────────────────────────────────────────────────
  {
    name: 'Diver',
    category: 'People',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#263238" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="61" y="38" width="15" height="30" rx="7" fill="#FFB300" stroke="#E65100"/>
    <path d="M30,85 L18,91 L35,91 Z" fill="#FFB300" stroke="#E65100"/>
    <path d="M54,85 L67,91 L50,91 Z" fill="#FFB300" stroke="#E65100"/>
    <path d="M36,72 L30,85 M50,72 L54,85" stroke="#1565C0" stroke-width="7"/>
    <path d="M31,45 L57,45 L61,73 L27,73 Z" fill="#1565C0"/>
    <circle cx="44" cy="32" r="13" fill="#FFCC80"/>
    <rect x="32" y="26" width="24" height="11" rx="4.5" fill="#4DD0E1" fill-opacity="0.85"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'swimming-level',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#263238" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="61" y="38" width="15" height="30" rx="7" fill="#FFB300" stroke="#E65100"/>
    <path d="M30,85 L18,91 L35,91 Z" fill="#FFB300" stroke="#E65100"/>
    <path d="M54,85 L67,91 L50,91 Z" fill="#FFB300" stroke="#E65100"/>
    <path d="M36,72 L30,85 M50,72 L54,85" stroke="#1565C0" stroke-width="7"/>
    <path d="M31,45 L57,45 L61,73 L27,73 Z" fill="#1565C0"/>
    <circle cx="44" cy="32" r="13" fill="#FFCC80"/>
    <rect x="32" y="26" width="24" height="11" rx="4.5" fill="#4DD0E1" fill-opacity="0.85"/>
  </g>
</svg>`)
      },
      {
        name: 'swimming-fast',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#263238" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="36" y="39" width="16" height="9" rx="4.5" fill="#FFB300" stroke="#E65100" transform="rotate(-8 44 43.5)"/>
    <polygon points="23,66 5,74 17,60" fill="#FFB300" stroke="#E65100"/>
    <polygon points="28,72 9,84 21,68" fill="#FFB300" stroke="#E65100"/>
    <ellipse cx="46" cy="57" rx="18" ry="10" fill="#1565C0" transform="rotate(-8 46 57)"/>
    <circle cx="68" cy="48" r="11" fill="#FFCC80"/>
    <rect x="64" y="44" width="16" height="8" rx="3" fill="#4DD0E1"/>
  </g>
</svg>`)
      },
      {
        name: 'diving-deep',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#263238" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="50" rx="14" ry="24" fill="#1565C0" transform="rotate(25 48 50)"/>
    <circle cx="58" cy="68" r="12" fill="#FFCC80"/>
    <rect x="54" y="66" width="14" height="7" rx="3" fill="#4DD0E1"/>
    <!-- Fins up in air -->
    <path d="M28,26 L18,12 L34,18 Z" fill="#FFB300"/>
    <path d="M38,20 L30,6 L44,14 Z" fill="#FFB300"/>
    <!-- Bubble trail -->
    <circle cx="68" cy="54" r="3" fill="#B3E5FC"/>
    <circle cx="74" cy="42" r="4" fill="#B3E5FC"/>
    <circle cx="80" cy="28" r="5" fill="#B3E5FC"/>
  </g>
</svg>`)
      },
      {
        name: 'treasure-found',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#263238" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="61" y="38" width="15" height="30" rx="7" fill="#FFB300" stroke="#E65100"/>
    <path d="M31,45 L57,45 L61,73 L27,73 Z" fill="#1565C0"/>
    <circle cx="44" cy="32" r="13" fill="#FFCC80"/>
    <rect x="32" y="26" width="24" height="11" rx="4.5" fill="#4DD0E1" fill-opacity="0.85"/>
    <!-- Holding glowing pearl / gem -->
    <circle cx="20" cy="54" r="6" fill="#00E5FF" stroke="#00B0FF"/>
    <circle cx="18" cy="52" r="2" fill="#FFFFFF"/>
  </g>
</svg>`)
      }
    ]
  }
];
