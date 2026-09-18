import { svg } from './svgHelper.js';

export const food = [
  // ── APPLE ────────────────────────────────────────────────────────
  {
    name: 'Apple',
    category: 'Food',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <radialGradient id="apRed" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FF6B6B"/>
      <stop offset="40%" stop-color="#EF4444"/>
      <stop offset="80%" stop-color="#DC2626"/>
      <stop offset="100%" stop-color="#991B1B"/>
    </radialGradient>
    <radialGradient id="apHl" cx="30%" cy="25%" r="35%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <g fill="none" stroke="#7F1D1D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M48,22 Q60,10 70,16 Q62,28 48,22 Z" fill="#22C55E" stroke="#15803D" stroke-width="1.5"/>
    <path d="M48,30 C46,18 52,12 56,8" stroke="#78350F" stroke-width="3.5" fill="none"/>
    <path d="M48,32 C34,24 16,32 16,52 C16,74 36,86 48,84 C60,86 80,74 80,52 C80,32 62,24 48,32 Z" fill="url(#apRed)"/>
    <ellipse cx="34" cy="44" rx="8" ry="14" fill="url(#apHl)" stroke="none" transform="rotate(-20 34 44)"/>
    <circle cx="30" cy="38" r="2.5" fill="#FFFFFF" opacity="0.9" stroke="none"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'red',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <radialGradient id="apRed1" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FF6B6B"/>
      <stop offset="40%" stop-color="#EF4444"/>
      <stop offset="80%" stop-color="#DC2626"/>
      <stop offset="100%" stop-color="#991B1B"/>
    </radialGradient>
  </defs>
  <g fill="none" stroke="#7F1D1D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M48,22 Q60,10 70,16 Q62,28 48,22 Z" fill="#22C55E" stroke="#15803D" stroke-width="1.5"/>
    <path d="M48,30 C46,18 52,12 56,8" stroke="#78350F" stroke-width="3.5" fill="none"/>
    <path d="M48,32 C34,24 16,32 16,52 C16,74 36,86 48,84 C60,86 80,74 80,52 C80,32 62,24 48,32 Z" fill="url(#apRed1)"/>
    <circle cx="30" cy="38" r="3" fill="#FFFFFF" opacity="0.8" stroke="none"/>
  </g>
</svg>`)
      },
      {
        name: 'green',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <radialGradient id="apGreen" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#CCFF90"/>
      <stop offset="40%" stop-color="#76FF03"/>
      <stop offset="80%" stop-color="#64DD17"/>
      <stop offset="100%" stop-color="#2E7D32"/>
    </radialGradient>
  </defs>
  <g fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M48,22 Q60,10 70,16 Q62,28 48,22 Z" fill="#00E676" stroke="#1B5E20" stroke-width="1.5"/>
    <path d="M48,30 C46,18 52,12 56,8" stroke="#78350F" stroke-width="3.5" fill="none"/>
    <path d="M48,32 C34,24 16,32 16,52 C16,74 36,86 48,84 C60,86 80,74 80,52 C80,32 62,24 48,32 Z" fill="url(#apGreen)"/>
    <circle cx="30" cy="38" r="3" fill="#FFFFFF" opacity="0.8" stroke="none"/>
  </g>
</svg>`)
      },
      {
        name: 'bite',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#7F1D1D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M48,22 Q60,10 70,16 Q62,28 48,22 Z" fill="#22C55E" stroke="#15803D" stroke-width="1.5"/>
    <path d="M48,30 C46,18 52,12 56,8" stroke="#78350F" stroke-width="3.5" fill="none"/>
    <!-- Apple body with bite out of right side -->
    <path d="M48,32 C34,24 16,32 16,52 C16,74 36,86 48,84 C60,86 80,74 80,52 C72,50 68,42 74,36 C66,34 62,26 62,24 C56,26 50,30 48,32 Z" fill="#EF4444"/>
    <!-- Pale yellow interior of bite mark -->
    <path d="M80,52 C70,50 68,40 76,34 C78,38 80,46 80,52 Z" fill="#FFF9C4" stroke="#D7CCC8" stroke-width="1"/>
    <circle cx="30" cy="38" r="3" fill="#FFFFFF" opacity="0.8" stroke="none"/>
  </g>
</svg>`)
      },
      {
        name: 'core',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#7F1D1D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M48,22 Q60,10 70,16 Q62,28 48,22 Z" fill="#22C55E" stroke="#15803D" stroke-width="1.5"/>
    <path d="M48,30 C46,18 52,12 56,8" stroke="#78350F" stroke-width="3.5" fill="none"/>
    <!-- Core remnants -->
    <path d="M38,32 C44,30 52,30 58,32 L56,38 C50,42 50,56 56,60 L58,84 C52,86 44,86 38,84 L40,60 C46,56 46,42 40,38 Z" fill="#FFF9C4" stroke="#8D6E63"/>
    <!-- Red skin caps top and bottom -->
    <path d="M38,32 C44,28 52,28 58,32 L56,38 C50,34 46,34 40,38 Z" fill="#EF4444"/>
    <path d="M38,84 C44,88 52,88 58,84 L56,78 C50,82 46,82 40,78 Z" fill="#EF4444"/>
    <!-- Apple seeds -->
    <ellipse cx="46" cy="46" rx="2" ry="4" fill="#3E2723" transform="rotate(15 46 46)"/>
    <ellipse cx="50" cy="54" rx="2" ry="4" fill="#3E2723" transform="rotate(-15 50 54)"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── BOWL ─────────────────────────────────────────────────────────
  {
    name: 'Bowl',
    category: 'Food',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#004D40" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="80" rx="16" ry="4" fill="#00695C"/>
    <path d="M 10,36 C 10,68 26,80 34,80 L 62,80 C 70,80 86,68 86,36 Z" fill="#26A69A"/>
    <path d="M 14,42 C 16,66 30,76 36,78 L 60,78 C 66,76 80,66 82,42 C 70,52 26,52 14,42 Z" fill="#00897B" opacity="0.6"/>
    <ellipse cx="48" cy="36" rx="38" ry="13" fill="#004D40"/>
    <ellipse cx="48" cy="37" rx="35" ry="10" fill="#00796B"/>
    <ellipse cx="48" cy="36" rx="38" ry="13" stroke="#80CBC4" stroke-width="1.5"/>
    <path d="M 20,50 Q 48,74 76,50 Q 48,66 20,50 Z" fill="#E0F2F1" opacity="0.5" stroke="none"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'bowl-teal',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#004D40" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="80" rx="16" ry="4" fill="#00695C"/>
    <path d="M 10,36 C 10,68 26,80 34,80 L 62,80 C 70,80 86,68 86,36 Z" fill="#26A69A"/>
    <path d="M 14,42 C 16,66 30,76 36,78 L 60,78 C 66,76 80,66 82,42 C 70,52 26,52 14,42 Z" fill="#00897B" opacity="0.6"/>
    <ellipse cx="48" cy="36" rx="38" ry="13" fill="#004D40"/>
    <ellipse cx="48" cy="37" rx="35" ry="10" fill="#00796B"/>
    <ellipse cx="48" cy="36" rx="38" ry="13" stroke="#80CBC4" stroke-width="1.5"/>
    <path d="M 20,50 Q 48,74 76,50 Q 48,66 20,50 Z" fill="#E0F2F1" opacity="0.5" stroke="none"/>
  </g>
</svg>`)
      },
      {
        name: 'bowl-orange',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#BF360C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="80" rx="16" ry="4" fill="#E65100"/>
    <path d="M 10,36 C 10,68 26,80 34,80 L 62,80 C 70,80 86,68 86,36 Z" fill="#FFA726"/>
    <path d="M 14,42 C 16,66 30,76 36,78 L 60,78 C 66,76 80,66 82,42 C 70,52 26,52 14,42 Z" fill="#FB8C00" opacity="0.6"/>
    <ellipse cx="48" cy="36" rx="38" ry="13" fill="#BF360C"/>
    <ellipse cx="48" cy="37" rx="35" ry="10" fill="#E65100"/>
    <ellipse cx="48" cy="36" rx="38" ry="13" stroke="#FFE082" stroke-width="1.5"/>
    <path d="M 20,50 Q 48,74 76,50 Q 48,66 20,50 Z" fill="#FFF8E1" opacity="0.55" stroke="none"/>
  </g>
</svg>`)
      },
      {
        name: 'bowl-purple',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4A148C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="80" rx="16" ry="4" fill="#6A1B9A"/>
    <path d="M 10,36 C 10,68 26,80 34,80 L 62,80 C 70,80 86,68 86,36 Z" fill="#AB47BC"/>
    <path d="M 14,42 C 16,66 30,76 36,78 L 60,78 C 66,76 80,66 82,42 C 70,52 26,52 14,42 Z" fill="#8E24AA" opacity="0.6"/>
    <ellipse cx="48" cy="36" rx="38" ry="13" fill="#311B92"/>
    <ellipse cx="48" cy="37" rx="35" ry="10" fill="#4A148C"/>
    <ellipse cx="48" cy="36" rx="38" ry="13" stroke="#E1BEE7" stroke-width="1.5"/>
    <path d="M 20,50 Q 48,74 76,50 Q 48,66 20,50 Z" fill="#F3E5F5" opacity="0.55" stroke="none"/>
  </g>
</svg>`)
      },
      {
        name: 'bowl-wood',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#3E2723" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="80" rx="16" ry="4" fill="#4E342E"/>
    <path d="M 10,36 C 10,68 26,80 34,80 L 62,80 C 70,80 86,68 86,36 Z" fill="#8D6E63"/>
    <path d="M 14,42 C 16,66 30,76 36,78 L 60,78 C 66,76 80,66 82,42 C 70,52 26,52 14,42 Z" fill="#6D4C41" opacity="0.6"/>
    <ellipse cx="48" cy="36" rx="38" ry="13" fill="#3E2723"/>
    <ellipse cx="48" cy="37" rx="35" ry="10" fill="#5D4037"/>
    <ellipse cx="48" cy="36" rx="38" ry="13" stroke="#BCAAA4" stroke-width="1.5"/>
    <path d="M 20,50 Q 48,74 76,50 Q 48,66 20,50 Z" fill="#D7CCC8" opacity="0.4" stroke="none"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── PIZZA ────────────────────────────────────────────────────────
  {
    name: 'Pizza',
    category: 'Food',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#D84315" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="48,8 14,80 82,80" fill="#FFCA28"/>
    <path d="M12,80 Q48,94 84,80" stroke="#8D6E63" stroke-width="8" fill="none"/>
    <circle cx="44" cy="36" r="5" fill="#D32F2F"/>
    <circle cx="36" cy="62" r="6" fill="#D32F2F"/>
    <circle cx="58" cy="56" r="5" fill="#D32F2F"/>
    <circle cx="48" cy="46" r="2" fill="#7CB342"/>
    <circle cx="32" cy="44" r="2" fill="#7CB342"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'pepperoni',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#D84315" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="48,8 14,80 82,80" fill="#FFCA28"/>
    <path d="M12,80 Q48,94 84,80" stroke="#8D6E63" stroke-width="8" fill="none"/>
    <circle cx="44" cy="36" r="5" fill="#D32F2F"/>
    <circle cx="36" cy="62" r="6" fill="#D32F2F"/>
    <circle cx="58" cy="56" r="5" fill="#D32F2F"/>
    <circle cx="48" cy="46" r="2" fill="#7CB342"/>
    <circle cx="32" cy="44" r="2" fill="#7CB342"/>
  </g>
</svg>`)
      },
      {
        name: 'cheese-pull',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#D84315" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="48,8 14,72 82,72" fill="#FFD54F"/>
    <path d="M12,72 Q48,86 84,72" stroke="#8D6E63" stroke-width="8" fill="none"/>
    <!-- Gooey dripping melted cheese strands -->
    <path d="M24,72 Q28,88 32,74" fill="#FFEA00" stroke="#FFA000"/>
    <path d="M42,72 Q48,92 54,74" fill="#FFEA00" stroke="#FFA000"/>
    <path d="M64,72 Q68,86 72,74" fill="#FFEA00" stroke="#FFA000"/>
    <circle cx="44" cy="32" r="5" fill="#D32F2F"/>
    <circle cx="36" cy="56" r="6" fill="#D32F2F"/>
    <circle cx="58" cy="52" r="5" fill="#D32F2F"/>
  </g>
</svg>`)
      },
      {
        name: 'supreme',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#D84315" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="48,8 14,80 82,80" fill="#FFCA28"/>
    <path d="M12,80 Q48,94 84,80" stroke="#8D6E63" stroke-width="8" fill="none"/>
    <circle cx="44" cy="34" r="5" fill="#D32F2F"/>
    <circle cx="58" cy="56" r="5" fill="#D32F2F"/>
    <!-- Mushrooms -->
    <path d="M30,58 Q36,52 42,58 Z" fill="#D7CCC8" stroke="#8D6E63"/>
    <!-- Black olives -->
    <circle cx="48" cy="46" r="3" fill="#212121" stroke="#424242"/>
    <circle cx="48" cy="46" r="1" fill="#FFCA28" stroke="none"/>
    <!-- Green peppers -->
    <path d="M32,40 Q38,36 42,42" stroke="#388E3C" stroke-width="3" fill="none"/>
    <path d="M54,42 Q60,38 64,44" stroke="#388E3C" stroke-width="3" fill="none"/>
  </g>
</svg>`)
      },
      {
        name: 'bite',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#D84315" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Pizza slice with bite taken out of tip -->
    <path d="M38,24 Q48,32 58,24 L82,80 L14,80 Z" fill="#FFCA28"/>
    <path d="M12,80 Q48,94 84,80" stroke="#8D6E63" stroke-width="8" fill="none"/>
    <!-- Cheese crumbs / drips at bite -->
    <circle cx="48" cy="28" r="2" fill="#FFD54F" stroke="none"/>
    <circle cx="36" cy="62" r="6" fill="#D32F2F"/>
    <circle cx="58" cy="56" r="5" fill="#D32F2F"/>
    <circle cx="48" cy="46" r="2" fill="#7CB342"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── BURGER ───────────────────────────────────────────────────────
  {
    name: 'Burger',
    category: 'Food',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4E342E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20,40 C20,20 76,20 76,40Z" fill="#FFA726"/>
    <rect x="16" y="44" width="64" height="6" rx="3" fill="#66BB6A"/>
    <polygon points="18,52 78,52 74,60 22,60" fill="#FF7043"/>
    <rect x="18" y="60" width="60" height="10" rx="4" fill="#4E342E"/>
    <path d="M20,72 C20,84 76,84 76,72Z" fill="#FFA726"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'classic',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4E342E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20,40 C20,20 76,20 76,40Z" fill="#FFA726"/>
    <circle cx="34" cy="28" r="1.5" fill="#FFF8E1" stroke="none"/>
    <circle cx="46" cy="24" r="1.5" fill="#FFF8E1" stroke="none"/>
    <circle cx="60" cy="28" r="1.5" fill="#FFF8E1" stroke="none"/>
    <rect x="16" y="44" width="64" height="6" rx="3" fill="#66BB6A"/>
    <polygon points="18,52 78,52 74,60 22,60" fill="#FF7043"/>
    <rect x="18" y="60" width="60" height="10" rx="4" fill="#4E342E"/>
    <path d="M20,72 C20,84 76,84 76,72Z" fill="#FFA726"/>
  </g>
</svg>`)
      },
      {
        name: 'cheeseburger',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4E342E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20,38 C20,18 76,18 76,38Z" fill="#FFA726"/>
    <circle cx="34" cy="26" r="1.5" fill="#FFF8E1" stroke="none"/>
    <circle cx="48" cy="22" r="1.5" fill="#FFF8E1" stroke="none"/>
    <circle cx="62" cy="26" r="1.5" fill="#FFF8E1" stroke="none"/>
    <rect x="16" y="40" width="64" height="6" rx="3" fill="#66BB6A"/>
    <rect x="18" y="48" width="60" height="10" rx="3" fill="#4E342E"/>
    <!-- Melted cheddar cheese triangles oozing down -->
    <polygon points="18,56 78,56 72,66 58,56 46,68 34,56 24,66" fill="#FFD600" stroke="#FFAB00"/>
    <path d="M20,70 C20,82 76,82 76,70Z" fill="#FFA726"/>
  </g>
</svg>`)
      },
      {
        name: 'double-deluxe',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4E342E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20,30 C20,12 76,12 76,30Z" fill="#FFA726"/>
    <rect x="16" y="32" width="64" height="5" rx="2" fill="#66BB6A"/>
    <rect x="18" y="39" width="60" height="8" rx="3" fill="#4E342E"/>
    <polygon points="18,46 78,46 74,52 22,52" fill="#FFD600"/>
    <rect x="18" y="54" width="60" height="8" rx="3" fill="#4E342E"/>
    <polygon points="20,62 76,62 70,68 26,68" fill="#FF7043"/>
    <path d="M20,72 C20,84 76,84 76,72Z" fill="#FFA726"/>
  </g>
</svg>`)
      },
      {
        name: 'bite',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4E342E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Right side has bite curve -->
    <path d="M20,40 C20,20 60,20 62,32 C56,36 56,44 64,48 C56,52 56,60 66,66 C62,76 40,84 20,72 Z" fill="#FFA726"/>
    <rect x="16" y="44" width="46" height="6" rx="3" fill="#66BB6A"/>
    <polygon points="18,52 58,52 54,60 22,60" fill="#FF7043"/>
    <rect x="18" y="60" width="44" height="10" rx="4" fill="#4E342E"/>
    <path d="M20,72 C20,84 54,84 56,72Z" fill="#FFA726"/>
    <!-- Crumbs -->
    <circle cx="70" cy="44" r="1.5" fill="#FFA726" stroke="none"/>
    <circle cx="72" cy="54" r="1.5" fill="#4E342E" stroke="none"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── DONUT ────────────────────────────────────────────────────────
  {
    name: 'Donut',
    category: 'Food',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4E342E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="48" r="34" fill="#FF80AB"/>
    <circle cx="48" cy="48" r="12" fill="#FFFFFF"/>
    <line x1="32" y1="28" x2="36" y2="26" stroke="#FFEB3B" stroke-width="3"/>
    <line x1="58" y1="28" x2="62" y2="30" stroke="#00E676" stroke-width="3"/>
    <line x1="26" y1="52" x2="30" y2="54" stroke="#00E5FF" stroke-width="3"/>
    <line x1="64" y1="56" x2="68" y2="52" stroke="#FF3D00" stroke-width="3"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'strawberry',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4E342E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="48" r="34" fill="#FF80AB"/>
    <circle cx="48" cy="48" r="12" fill="#FFFFFF"/>
    <line x1="32" y1="28" x2="36" y2="26" stroke="#FFEB3B" stroke-width="3"/>
    <line x1="58" y1="28" x2="62" y2="30" stroke="#00E676" stroke-width="3"/>
    <line x1="26" y1="52" x2="30" y2="54" stroke="#00E5FF" stroke-width="3"/>
    <line x1="64" y1="56" x2="68" y2="52" stroke="#FF3D00" stroke-width="3"/>
  </g>
</svg>`)
      },
      {
        name: 'chocolate',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="48" r="34" fill="#5D4037"/>
    <circle cx="48" cy="48" r="12" fill="#FFFFFF"/>
    <line x1="30" y1="30" x2="36" y2="28" stroke="#FFF" stroke-width="3"/>
    <line x1="58" y1="28" x2="64" y2="32" stroke="#FFEB3B" stroke-width="3"/>
    <line x1="26" y1="50" x2="32" y2="52" stroke="#FF4081" stroke-width="3"/>
    <line x1="62" y1="56" x2="68" y2="50" stroke="#00E5FF" stroke-width="3"/>
    <line x1="44" y1="68" x2="52" y2="68" stroke="#76FF03" stroke-width="3"/>
  </g>
</svg>`)
      },
      {
        name: 'blue-frosting',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#01579B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="48" r="34" fill="#00E5FF"/>
    <circle cx="48" cy="48" r="12" fill="#FFFFFF"/>
    <circle cx="34" cy="28" r="2.5" fill="#FFD600" stroke="none"/>
    <circle cx="60" cy="30" r="2.5" fill="#FF4081" stroke="none"/>
    <circle cx="28" cy="50" r="2.5" fill="#FFF" stroke="none"/>
    <circle cx="64" cy="54" r="2.5" fill="#76FF03" stroke="none"/>
    <circle cx="48" cy="68" r="2.5" fill="#FFD600" stroke="none"/>
  </g>
</svg>`)
      },
      {
        name: 'bite',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4E342E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Bite removed from top right -->
    <path d="M48,14 A34,34 0 0,0 14,48 A34,34 0 0,0 48,82 A34,34 0 0,0 82,48 C74,48 70,38 76,32 C68,32 64,22 66,16 C60,14 54,14 48,14 Z" fill="#FF80AB"/>
    <circle cx="48" cy="48" r="12" fill="#FFFFFF"/>
    <line x1="32" y1="28" x2="36" y2="26" stroke="#FFEB3B" stroke-width="3"/>
    <line x1="26" y1="52" x2="30" y2="54" stroke="#00E5FF" stroke-width="3"/>
    <line x1="60" y1="62" x2="66" y2="58" stroke="#FF3D00" stroke-width="3"/>
    <!-- Pastry texture inside bite -->
    <circle cx="72" cy="26" r="1.5" fill="#FFE082" stroke="none"/>
    <circle cx="62" cy="18" r="1.5" fill="#FFE082" stroke="none"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── ICE CREAM ────────────────────────────────────────────────────
  {
    name: 'Ice Cream',
    category: 'Food',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4E342E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="48,88 28,48 68,48" fill="#FFB74D"/>
    <line x1="38" y1="48" x2="48" y2="88" stroke="#D7CCC8"/>
    <line x1="58" y1="48" x2="48" y2="88" stroke="#D7CCC8"/>
    <circle cx="48" cy="40" r="18" fill="#FF80AB"/>
    <circle cx="36" cy="42" r="12" fill="#80DEEA"/>
    <circle cx="60" cy="42" r="12" fill="#B388FF"/>
    <circle cx="48" cy="20" r="6" fill="#FF1744"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'triple-scoop',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4E342E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="48,88 28,48 68,48" fill="#FFB74D"/>
    <line x1="38" y1="48" x2="48" y2="88" stroke="#D7CCC8"/>
    <line x1="58" y1="48" x2="48" y2="88" stroke="#D7CCC8"/>
    <circle cx="48" cy="40" r="18" fill="#FF80AB"/>
    <circle cx="36" cy="42" r="12" fill="#80DEEA"/>
    <circle cx="60" cy="42" r="12" fill="#B388FF"/>
    <circle cx="48" cy="20" r="6" fill="#FF1744"/>
  </g>
</svg>`)
      },
      {
        name: 'melting',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4E342E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="48,88 28,48 68,48" fill="#FFB74D"/>
    <line x1="38" y1="48" x2="48" y2="88" stroke="#D7CCC8"/>
    <line x1="58" y1="48" x2="48" y2="88" stroke="#D7CCC8"/>
    <circle cx="48" cy="40" r="18" fill="#FF80AB"/>
    <circle cx="36" cy="42" r="12" fill="#80DEEA"/>
    <circle cx="60" cy="42" r="12" fill="#B388FF"/>
    <circle cx="48" cy="20" r="6" fill="#FF1744"/>
    <!-- Melting drips running down cone -->
    <path d="M36,48 Q38,62 40,54" fill="#80DEEA" stroke="#00ACC1"/>
    <path d="M58,48 Q62,64 64,52" fill="#B388FF" stroke="#7E57C2"/>
    <circle cx="40" cy="68" r="2" fill="#80DEEA" stroke="none"/>
  </g>
</svg>`)
      },
      {
        name: 'chocolate-fudge',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#3E2723" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="48,88 28,48 68,48" fill="#FFB74D"/>
    <line x1="38" y1="48" x2="48" y2="88" stroke="#D7CCC8"/>
    <line x1="58" y1="48" x2="48" y2="88" stroke="#D7CCC8"/>
    <circle cx="48" cy="40" r="18" fill="#8D6E63"/>
    <circle cx="36" cy="42" r="12" fill="#D7CCC8"/>
    <circle cx="60" cy="42" r="12" fill="#A1887F"/>
    <!-- Dark chocolate fudge drizzle -->
    <path d="M38,28 Q48,22 58,28 Q52,38 48,34 Q44,40 38,28 Z" fill="#3E2723" stroke="#212121"/>
    <circle cx="48" cy="18" r="6" fill="#FF1744"/>
  </g>
</svg>`)
      },
      {
        name: 'mint-chip',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="48,88 28,48 68,48" fill="#FFB74D"/>
    <line x1="38" y1="48" x2="48" y2="88" stroke="#D7CCC8"/>
    <line x1="58" y1="48" x2="48" y2="88" stroke="#D7CCC8"/>
    <circle cx="48" cy="38" r="20" fill="#B9F6CA"/>
    <!-- Chocolate chips -->
    <polygon points="40,32 44,30 42,35" fill="#3E2723" stroke="none"/>
    <polygon points="54,34 58,36 55,40" fill="#3E2723" stroke="none"/>
    <polygon points="46,44 50,42 48,47" fill="#3E2723" stroke="none"/>
    <polygon points="34,42 38,44 35,48" fill="#3E2723" stroke="none"/>
    <polygon points="58,46 62,44 60,49" fill="#3E2723" stroke="none"/>
    <circle cx="48" cy="18" r="6" fill="#FF1744"/>
  </g>
</svg>`)
      }
    ]
  }
];
