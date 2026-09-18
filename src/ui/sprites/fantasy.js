import { svg } from './svgHelper.js';

export const fantasy = [
  // ── ROBOT ────────────────────────────────────────────────────────
  {
    name: 'Robot',
    category: 'Fantasy',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#37474F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="28" y="30" width="40" height="32" rx="6" fill="#78909C"/>
    <rect x="32" y="62" width="32" height="20" rx="4" fill="#B0BEC5"/>
    <rect x="20" y="36" width="8" height="20" rx="3" fill="#B0BEC5"/>
    <rect x="68" y="36" width="8" height="20" rx="3" fill="#B0BEC5"/>
    <rect x="32" y="18" width="32" height="14" rx="6" fill="#CFD8DC"/>
    <rect x="44" y="10" width="8" height="8" rx="2" fill="#78909C"/>
    <circle cx="48" cy="8" r="3" fill="#FF5252"/>
    <circle cx="40" cy="25" r="3" fill="#00E676"/>
    <circle cx="56" cy="25" r="3" fill="#00E676"/>
    <rect x="40" y="42" width="16" height="6" rx="2" fill="#263238"/>
    <line x1="44" y1="42" x2="44" y2="48" stroke="#B0BEC5"/>
    <line x1="48" y1="42" x2="48" y2="48" stroke="#B0BEC5"/>
    <line x1="52" y1="42" x2="52" y2="48" stroke="#B0BEC5"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'standing',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#37474F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="28" y="30" width="40" height="32" rx="6" fill="#78909C"/>
    <rect x="32" y="62" width="32" height="20" rx="4" fill="#B0BEC5"/>
    <rect x="20" y="36" width="8" height="20" rx="3" fill="#B0BEC5"/>
    <rect x="68" y="36" width="8" height="20" rx="3" fill="#B0BEC5"/>
    <rect x="32" y="18" width="32" height="14" rx="6" fill="#CFD8DC"/>
    <rect x="44" y="10" width="8" height="8" rx="2" fill="#78909C"/>
    <circle cx="48" cy="8" r="3" fill="#FF5252"/>
    <circle cx="40" cy="25" r="3" fill="#00E676"/>
    <circle cx="56" cy="25" r="3" fill="#00E676"/>
    <rect x="40" y="42" width="16" height="6" rx="2" fill="#263238"/>
    <line x1="44" y1="42" x2="44" y2="48" stroke="#B0BEC5"/>
    <line x1="48" y1="42" x2="48" y2="48" stroke="#B0BEC5"/>
    <line x1="52" y1="42" x2="52" y2="48" stroke="#B0BEC5"/>
  </g>
</svg>`)
      },
      {
        name: 'walking',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#37474F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="28" y="28" width="40" height="32" rx="6" fill="#78909C"/>
    <rect x="30" y="60" width="14" height="24" rx="4" fill="#90A4AE" transform="rotate(8 37 72)"/>
    <rect x="52" y="60" width="14" height="24" rx="4" fill="#B0BEC5" transform="rotate(-8 59 72)"/>
    <rect x="18" y="28" width="8" height="22" rx="3" fill="#B0BEC5" transform="rotate(20 22 39)"/>
    <rect x="70" y="38" width="8" height="22" rx="3" fill="#B0BEC5" transform="rotate(-20 74 49)"/>
    <rect x="32" y="16" width="32" height="14" rx="6" fill="#CFD8DC"/>
    <rect x="44" y="8" width="8" height="8" rx="2" fill="#78909C"/>
    <circle cx="48" cy="6" r="3.5" fill="#FFB300"/>
    <circle cx="40" cy="23" r="3" fill="#00E676"/>
    <circle cx="56" cy="23" r="3" fill="#00E676"/>
    <rect x="40" y="40" width="16" height="6" rx="2" fill="#263238"/>
    <circle cx="44" cy="43" r="1.5" fill="#00E676"/>
    <circle cx="48" cy="43" r="1.5" fill="#00E676"/>
    <circle cx="52" cy="43" r="1.5" fill="#00E676"/>
  </g>
</svg>`)
      },
      {
        name: 'alert',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#37474F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="8" r="7" fill="#FF1744" opacity="0.3"/>
    <circle cx="48" cy="8" r="4.5" fill="#FF1744"/>
    <line x1="38" y1="4" x2="42" y2="6" stroke="#FF5252" stroke-width="2"/>
    <line x1="58" y1="4" x2="54" y2="6" stroke="#FF5252" stroke-width="2"/>
    <rect x="44" y="10" width="8" height="8" rx="2" fill="#78909C"/>
    <rect x="32" y="18" width="32" height="14" rx="6" fill="#CFD8DC"/>
    <circle cx="40" cy="25" r="3.5" fill="#FF1744"/>
    <circle cx="56" cy="25" r="3.5" fill="#FF1744"/>
    <rect x="28" y="30" width="40" height="32" rx="6" fill="#78909C"/>
    <rect x="18" y="24" width="8" height="20" rx="3" fill="#B0BEC5" transform="rotate(-30 22 34)"/>
    <rect x="70" y="24" width="8" height="20" rx="3" fill="#B0BEC5" transform="rotate(30 74 34)"/>
    <rect x="32" y="62" width="32" height="20" rx="4" fill="#B0BEC5"/>
    <rect x="38" y="40" width="20" height="10" rx="2" fill="#D50000"/>
    <text x="48" y="48" font-size="8" font-family="monospace" font-weight="bold" fill="#FFF" text-anchor="middle">!</text>
  </g>
</svg>`)
      },
      {
        name: 'rocket',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#37474F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="28" y="22" width="40" height="32" rx="6" fill="#78909C"/>
    <rect x="34" y="54" width="28" height="14" rx="4" fill="#B0BEC5"/>
    <path d="M38,68 L34,88 L44,80 L48,92 L52,80 L62,88 L58,68 Z" fill="#FF9100" stroke="#FF3D00" stroke-width="1.5"/>
    <path d="M42,68 L40,82 L46,76 L48,86 L50,76 L56,82 L54,68 Z" fill="#FFEA00" stroke="none"/>
    <rect x="16" y="26" width="10" height="18" rx="3" fill="#B0BEC5" transform="rotate(-35 21 35)"/>
    <rect x="70" y="26" width="10" height="18" rx="3" fill="#B0BEC5" transform="rotate(35 75 35)"/>
    <rect x="32" y="10" width="32" height="14" rx="6" fill="#CFD8DC"/>
    <rect x="44" y="2" width="8" height="8" rx="2" fill="#78909C"/>
    <circle cx="48" cy="2" r="3" fill="#00E5FF"/>
    <circle cx="40" cy="17" r="3" fill="#00E5FF"/>
    <circle cx="56" cy="17" r="3" fill="#00E5FF"/>
    <rect x="40" y="34" width="16" height="6" rx="2" fill="#263238"/>
    <line x1="44" y1="34" x2="44" y2="40" stroke="#00E5FF"/>
    <line x1="48" y1="34" x2="48" y2="40" stroke="#00E5FF"/>
    <line x1="52" y1="34" x2="52" y2="40" stroke="#00E5FF"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── ALIEN ────────────────────────────────────────────────────────
  {
    name: 'Alien',
    category: 'Fantasy',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="48" y1="20" x2="48" y2="6" stroke="#1B5E20" stroke-width="2"/>
    <circle cx="48" cy="6" r="4" fill="#FFEB3B"/>
    <ellipse cx="48" cy="38" rx="26" ry="20" fill="#76FF03"/>
    <circle cx="48" cy="34" r="8" fill="white"/>
    <circle cx="48" cy="34" r="4" fill="#311B92"/>
    <path d="M38,48 Q48,56 58,48" stroke="#1B5E20" stroke-width="2"/>
    <ellipse cx="48" cy="66" rx="18" ry="18" fill="#64DD17"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'idle',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="48" y1="20" x2="48" y2="6" stroke="#1B5E20" stroke-width="2"/>
    <circle cx="48" cy="6" r="4" fill="#FFEB3B"/>
    <ellipse cx="48" cy="38" rx="26" ry="20" fill="#76FF03"/>
    <circle cx="48" cy="34" r="8" fill="white"/>
    <circle cx="48" cy="34" r="4" fill="#311B92"/>
    <path d="M38,48 Q48,56 58,48" stroke="#1B5E20" stroke-width="2"/>
    <ellipse cx="48" cy="66" rx="18" ry="18" fill="#64DD17"/>
  </g>
</svg>`)
      },
      {
        name: 'waving',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M48,20 Q40,10 42,6" stroke="#1B5E20" stroke-width="2"/>
    <circle cx="42" cy="6" r="4" fill="#FFD600"/>
    <ellipse cx="48" cy="38" rx="26" ry="20" fill="#76FF03"/>
    <circle cx="48" cy="34" r="8" fill="white"/>
    <circle cx="50" cy="33" r="4" fill="#311B92"/>
    <path d="M38,47 Q48,57 58,47" stroke="#1B5E20" stroke-width="2"/>
    <ellipse cx="48" cy="66" rx="18" ry="18" fill="#64DD17"/>
    <!-- Waving arm -->
    <path d="M66,60 Q78,48 84,36" stroke="#1B5E20" stroke-width="5" stroke-linecap="round"/>
    <circle cx="84" cy="34" r="4" fill="#76FF03" stroke="#1B5E20" stroke-width="1.5"/>
  </g>
</svg>`)
      },
      {
        name: 'surprised',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="48" y1="18" x2="48" y2="4" stroke="#1B5E20" stroke-width="2.5"/>
    <circle cx="48" cy="4" r="6" fill="#FF1744"/>
    <ellipse cx="48" cy="36" rx="28" ry="22" fill="#76FF03"/>
    <circle cx="48" cy="32" r="11" fill="white"/>
    <circle cx="48" cy="32" r="6" fill="#311B92"/>
    <circle cx="50" cy="30" r="2" fill="white"/>
    <ellipse cx="48" cy="48" rx="4" ry="6" fill="#1B5E20"/>
    <ellipse cx="48" cy="68" rx="16" ry="16" fill="#64DD17"/>
    <path d="M30,64 Q22,56 20,46" stroke="#1B5E20" stroke-width="4" stroke-linecap="round"/>
    <path d="M66,64 Q74,56 76,46" stroke="#1B5E20" stroke-width="4" stroke-linecap="round"/>
  </g>
</svg>`)
      },
      {
        name: 'floating',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="86" rx="24" ry="5" fill="#B9F6CA" opacity="0.6" stroke="none"/>
    <line x1="48" y1="16" x2="48" y2="2" stroke="#1B5E20" stroke-width="2"/>
    <circle cx="48" cy="2" r="5" fill="#00E5FF"/>
    <ellipse cx="48" cy="32" rx="26" ry="20" fill="#69F0AE"/>
    <circle cx="48" cy="28" r="8" fill="white"/>
    <circle cx="48" cy="28" r="4" fill="#00B0FF"/>
    <circle cx="50" cy="26" r="1.5" fill="white"/>
    <path d="M40,42 Q48,48 56,42" stroke="#1B5E20" stroke-width="2"/>
    <ellipse cx="48" cy="58" rx="18" ry="16" fill="#00E676"/>
    <!-- Floating tentacles/feet -->
    <path d="M36,72 Q34,80 38,84" stroke="#1B5E20" stroke-width="3"/>
    <path d="M48,74 Q48,82 50,86" stroke="#1B5E20" stroke-width="3"/>
    <path d="M60,72 Q62,80 58,84" stroke="#1B5E20" stroke-width="3"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── GHOST ────────────────────────────────────────────────────────
  {
    name: 'Ghost',
    category: 'Fantasy',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#B0BEC5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M24,48 C24,24 72,24 72,48 L72,82 L64,74 L56,82 L48,74 L40,82 L32,74 L24,82Z" fill="#ECEFF1"/>
    <ellipse cx="38" cy="42" rx="5" ry="7" fill="#263238"/>
    <ellipse cx="58" cy="42" rx="5" ry="7" fill="#263238"/>
    <circle cx="40" cy="40" r="2" fill="white"/>
    <circle cx="60" cy="40" r="2" fill="white"/>
    <ellipse cx="48" cy="56" rx="5" ry="3" fill="#B0BEC5" stroke="none"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'floating',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#B0BEC5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M24,48 C24,24 72,24 72,48 L72,82 L64,74 L56,82 L48,74 L40,82 L32,74 L24,82Z" fill="#ECEFF1"/>
    <ellipse cx="38" cy="42" rx="5" ry="7" fill="#263238"/>
    <ellipse cx="58" cy="42" rx="5" ry="7" fill="#263238"/>
    <circle cx="40" cy="40" r="2" fill="white"/>
    <circle cx="60" cy="40" r="2" fill="white"/>
    <ellipse cx="48" cy="56" rx="5" ry="3" fill="#B0BEC5" stroke="none"/>
  </g>
</svg>`)
      },
      {
        name: 'spooky',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#90A4AE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20,44 C20,18 76,18 76,44 L78,80 L68,72 L58,80 L48,72 L38,80 L28,72 L18,80Z" fill="#CFD8DC"/>
    <!-- Raised spooky arms -->
    <path d="M20,48 Q8,36 12,28 Q18,28 22,40" fill="#CFD8DC" stroke="#90A4AE"/>
    <path d="M76,48 Q88,36 84,28 Q78,28 74,40" fill="#CFD8DC" stroke="#90A4AE"/>
    <ellipse cx="38" cy="40" rx="6" ry="8" fill="#1A237E"/>
    <ellipse cx="58" cy="40" rx="6" ry="8" fill="#1A237E"/>
    <circle cx="40" cy="38" r="2" fill="#E8EAF6"/>
    <circle cx="60" cy="38" r="2" fill="#E8EAF6"/>
    <ellipse cx="48" cy="58" rx="6" ry="8" fill="#263238"/>
  </g>
</svg>`)
      },
      {
        name: 'happy',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#B0BEC5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M26,46 C26,22 70,22 70,46 L70,78 Q60,72 50,78 Q40,72 30,78 Q22,72 26,68 Z" fill="#F5F5F5"/>
    <!-- Smiling eyes -->
    <path d="M34,42 Q40,36 44,42" stroke="#263238" stroke-width="2.5" fill="none"/>
    <path d="M52,42 Q58,36 62,42" stroke="#263238" stroke-width="2.5" fill="none"/>
    <!-- Blush -->
    <ellipse cx="32" cy="48" rx="4" ry="2" fill="#FF8A80" opacity="0.6" stroke="none"/>
    <ellipse cx="64" cy="48" rx="4" ry="2" fill="#FF8A80" opacity="0.6" stroke="none"/>
    <!-- Cute open smile -->
    <path d="M42,50 Q48,58 54,50 Z" fill="#D32F2F" stroke="#263238"/>
  </g>
</svg>`)
      },
      {
        name: 'glow',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#80DEEA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="48" rx="36" ry="36" fill="#E0F7FA" opacity="0.4" stroke="none"/>
    <path d="M26,48 C26,24 70,24 70,48 L72,80 L62,74 L52,80 L42,74 L32,80 L24,76Z" fill="#E0F7FA" stroke="#4DD0E1"/>
    <ellipse cx="38" cy="42" rx="4" ry="6" fill="#006064"/>
    <ellipse cx="58" cy="42" rx="4" ry="6" fill="#006064"/>
    <circle cx="39" cy="40" r="1.5" fill="white"/>
    <circle cx="59" cy="40" r="1.5" fill="white"/>
    <ellipse cx="48" cy="54" rx="4" ry="2" fill="#80DEEA" stroke="none"/>
    <!-- Magic sparkles -->
    <polygon points="18,30 20,25 22,30 27,32 22,34 20,39 18,34 13,32" fill="#00E5FF" stroke="none"/>
    <polygon points="76,22 77,18 79,22 83,23 79,25 77,29 76,25 72,23" fill="#00E5FF" stroke="none"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── MONSTER ────────────────────────────────────────────────────────
  {
    name: 'Monster',
    category: 'Fantasy',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4A148C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="26,20 32,32 20,32" fill="#FFD54F"/>
    <polygon points="70,20 76,32 64,32" fill="#FFD54F"/>
    <rect x="22" y="28" width="52" height="54" rx="20" fill="#AB47BC"/>
    <circle cx="48" cy="46" r="10" fill="white"/>
    <circle cx="48" cy="46" r="5" fill="#D500F9"/>
    <circle cx="48" cy="46" r="2" fill="#000"/>
    <path d="M36,64 L60,64" stroke="#4A148C" stroke-width="2"/>
    <polygon points="40,64 43,70 46,64" fill="white"/>
    <polygon points="50,64 53,70 56,64" fill="white"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'friendly',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4A148C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="26,20 32,32 20,32" fill="#FFD54F"/>
    <polygon points="70,20 76,32 64,32" fill="#FFD54F"/>
    <rect x="22" y="28" width="52" height="54" rx="20" fill="#AB47BC"/>
    <circle cx="48" cy="46" r="10" fill="white"/>
    <circle cx="48" cy="46" r="5" fill="#D500F9"/>
    <circle cx="48" cy="46" r="2" fill="#000"/>
    <path d="M36,64 L60,64" stroke="#4A148C" stroke-width="2"/>
    <polygon points="40,64 43,70 46,64" fill="white"/>
    <polygon points="50,64 53,70 56,64" fill="white"/>
  </g>
</svg>`)
      },
      {
        name: 'roaring',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4A148C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="22,14 30,30 16,28" fill="#FFB300"/>
    <polygon points="74,14 80,28 66,30" fill="#FFB300"/>
    <rect x="20" y="26" width="56" height="56" rx="22" fill="#9C27B0"/>
    <!-- Monster raised hands -->
    <circle cx="14" cy="40" r="6" fill="#AB47BC" stroke="#4A148C"/>
    <circle cx="82" cy="40" r="6" fill="#AB47BC" stroke="#4A148C"/>
    <circle cx="48" cy="42" r="11" fill="white"/>
    <circle cx="48" cy="42" r="6" fill="#FF1744"/>
    <circle cx="48" cy="42" r="2.5" fill="#000"/>
    <!-- Big open roaring mouth with sharp teeth -->
    <ellipse cx="48" cy="66" rx="14" ry="10" fill="#212121"/>
    <polygon points="38,58 41,64 44,58" fill="white"/>
    <polygon points="45,58 48,64 51,58" fill="white"/>
    <polygon points="52,58 55,64 58,58" fill="white"/>
    <polygon points="41,74 44,68 47,74" fill="white"/>
    <polygon points="49,74 52,68 55,74" fill="white"/>
  </g>
</svg>`)
      },
      {
        name: 'happy',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4A148C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="26,22 32,32 20,32" fill="#FFD54F"/>
    <polygon points="70,22 76,32 64,32" fill="#FFD54F"/>
    <rect x="22" y="28" width="52" height="54" rx="20" fill="#BA68C8"/>
    <!-- Happy crescent eye -->
    <path d="M40,48 Q48,36 56,48" stroke="#4A148C" stroke-width="4" fill="none"/>
    <ellipse cx="32" cy="52" rx="4" ry="2" fill="#FF4081" opacity="0.6" stroke="none"/>
    <ellipse cx="64" cy="52" rx="4" ry="2" fill="#FF4081" opacity="0.6" stroke="none"/>
    <!-- Happy smile -->
    <path d="M38,60 Q48,72 58,60" fill="#4A148C"/>
    <polygon points="46,60 48,65 50,60" fill="white"/>
  </g>
</svg>`)
      },
      {
        name: 'surprised',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4A148C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="24,18 32,32 18,30" fill="#FFD54F"/>
    <polygon points="72,18 78,30 64,32" fill="#FFD54F"/>
    <rect x="22" y="28" width="52" height="54" rx="20" fill="#AB47BC"/>
    <!-- Huge wide eye -->
    <circle cx="48" cy="44" r="14" fill="white"/>
    <circle cx="48" cy="44" r="7" fill="#00E5FF"/>
    <circle cx="48" cy="44" r="3" fill="#000"/>
    <circle cx="51" cy="41" r="2" fill="white"/>
    <!-- Small round O mouth -->
    <circle cx="48" cy="68" r="5" fill="#212121"/>
  </g>
</svg>`)
      }
    ]
  }
];
