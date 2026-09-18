import { svg } from './svgHelper.js';

export const animals = [
  // ── CAT ────────────────────────────────────────────────────────
  {
    name: 'Cat',
    category: 'Animals',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="56" rx="28" ry="24" fill="#00897B"/>
    <circle cx="48" cy="32" r="20" fill="#00897B"/>
    <polygon points="32,18 24,2 38,14" fill="#00897B" stroke="#000"/>
    <polygon points="33,16 28,6 37,14" fill="#4DB6AC" stroke="none"/>
    <polygon points="64,18 72,2 58,14" fill="#00897B" stroke="#000"/>
    <polygon points="63,16 68,6 59,14" fill="#4DB6AC" stroke="none"/>
    <ellipse cx="40" cy="30" rx="4" ry="5" fill="white"/>
    <ellipse cx="56" cy="30" rx="4" ry="5" fill="white"/>
    <circle cx="41" cy="31" r="2" fill="#000"/>
    <circle cx="57" cy="31" r="2" fill="#000"/>
    <ellipse cx="48" cy="36" rx="2.5" ry="1.5" fill="#FF6B6B"/>
    <path d="M44,38 Q48,42 52,38" fill="none"/>
    <line x1="20" y1="34" x2="36" y2="36" stroke-width="1"/>
    <line x1="20" y1="38" x2="36" y2="38" stroke-width="1"/>
    <line x1="60" y1="36" x2="76" y2="34" stroke-width="1"/>
    <line x1="60" y1="38" x2="76" y2="38" stroke-width="1"/>
    <ellipse cx="36" cy="78" rx="8" ry="5" fill="#00897B"/>
    <ellipse cx="60" cy="78" rx="8" ry="5" fill="#00897B"/>
    <path d="M72,60 Q85,50 80,38" stroke="#00897B" stroke-width="5" fill="none"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'standing',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="56" rx="28" ry="24" fill="#00897B"/>
    <circle cx="48" cy="32" r="20" fill="#00897B"/>
    <polygon points="32,18 24,2 38,14" fill="#00897B" stroke="#000"/>
    <polygon points="33,16 28,6 37,14" fill="#4DB6AC" stroke="none"/>
    <polygon points="64,18 72,2 58,14" fill="#00897B" stroke="#000"/>
    <polygon points="63,16 68,6 59,14" fill="#4DB6AC" stroke="none"/>
    <ellipse cx="40" cy="30" rx="4" ry="5" fill="white"/>
    <ellipse cx="56" cy="30" rx="4" ry="5" fill="white"/>
    <circle cx="41" cy="31" r="2" fill="#000"/>
    <circle cx="57" cy="31" r="2" fill="#000"/>
    <ellipse cx="48" cy="36" rx="2.5" ry="1.5" fill="#FF6B6B"/>
    <path d="M44,38 Q48,42 52,38" fill="none"/>
    <line x1="20" y1="34" x2="36" y2="36" stroke-width="1"/>
    <line x1="20" y1="38" x2="36" y2="38" stroke-width="1"/>
    <line x1="60" y1="36" x2="76" y2="34" stroke-width="1"/>
    <line x1="60" y1="38" x2="76" y2="38" stroke-width="1"/>
    <ellipse cx="36" cy="78" rx="8" ry="5" fill="#00897B"/>
    <ellipse cx="60" cy="78" rx="8" ry="5" fill="#00897B"/>
    <path d="M72,60 Q85,50 80,38" stroke="#00897B" stroke-width="5" fill="none"/>
  </g>
</svg>`)
      },
      {
        name: 'walking',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="46" cy="54" rx="28" ry="22" fill="#00897B" transform="rotate(-6 46 54)"/>
    <circle cx="52" cy="30" r="20" fill="#00897B"/>
    <polygon points="36,16 28,1 42,12" fill="#00897B" stroke="#000"/>
    <polygon points="37,14 32,5 41,12" fill="#4DB6AC" stroke="none"/>
    <polygon points="68,16 76,1 62,12" fill="#00897B" stroke="#000"/>
    <polygon points="67,14 72,5 63,12" fill="#4DB6AC" stroke="none"/>
    <ellipse cx="45" cy="28" rx="4" ry="5" fill="white"/>
    <ellipse cx="61" cy="28" rx="4" ry="5" fill="white"/>
    <circle cx="47" cy="29" r="2" fill="#000"/>
    <circle cx="63" cy="29" r="2" fill="#000"/>
    <ellipse cx="54" cy="34" rx="2.5" ry="1.5" fill="#FF6B6B"/>
    <path d="M50,36 Q54,40 58,36" stroke="#000" fill="none" stroke-width="1"/>
    <ellipse cx="68" cy="74" rx="10" ry="5" fill="#00897B" transform="rotate(25 68 74)"/>
    <ellipse cx="22" cy="76" rx="10" ry="5" fill="#00897B" transform="rotate(-20 22 76)"/>
    <ellipse cx="40" cy="76" rx="7" ry="5" fill="#00796B"/>
    <path d="M68,54 Q84,40 76,24" stroke="#00897B" stroke-width="5" fill="none"/>
  </g>
</svg>`)
      },
      {
        name: 'jumping',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="46" rx="26" ry="20" fill="#00897B" transform="rotate(-12 48 46)"/>
    <circle cx="56" cy="24" r="18" fill="#00897B"/>
    <polygon points="42,10 36,-3 50,7" fill="#00897B" stroke="#000"/>
    <polygon points="70,10 78,-3 64,7" fill="#00897B" stroke="#000"/>
    <ellipse cx="52" cy="22" rx="4" ry="5" fill="white"/>
    <ellipse cx="66" cy="22" rx="4" ry="5" fill="white"/>
    <circle cx="54" cy="22" r="2" fill="#000"/>
    <circle cx="68" cy="22" r="2" fill="#000"/>
    <ellipse cx="60" cy="28" rx="2.5" ry="1.5" fill="#FF6B6B"/>
    <path d="M56,30 Q60,34 64,30" stroke="#000" fill="none"/>
    <ellipse cx="74" cy="42" rx="11" ry="5" fill="#00897B" transform="rotate(20 74 42)"/>
    <ellipse cx="20" cy="62" rx="11" ry="5" fill="#00897B" transform="rotate(-40 20 62)"/>
    <path d="M30,50 Q16,36 10,20" stroke="#00897B" stroke-width="5" fill="none"/>
  </g>
</svg>`)
      },
      {
        name: 'sitting',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="62" rx="24" ry="24" fill="#00897B"/>
    <circle cx="48" cy="32" r="20" fill="#00897B"/>
    <polygon points="32,18 24,2 38,14" fill="#00897B" stroke="#000"/>
    <polygon points="64,18 72,2 58,14" fill="#00897B" stroke="#000"/>
    <path d="M36,28 Q40,24 44,28" stroke="#000" stroke-width="2"/>
    <path d="M52,28 Q56,24 60,28" stroke="#000" stroke-width="2"/>
    <ellipse cx="48" cy="35" rx="2.5" ry="1.5" fill="#FF6B6B"/>
    <path d="M42,38 Q48,46 54,38" fill="#FF8A80" stroke="#000"/>
    <ellipse cx="40" cy="82" rx="7" ry="5" fill="#00796B"/>
    <ellipse cx="56" cy="82" rx="7" ry="5" fill="#00796B"/>
    <path d="M72,70 Q84,78 76,86 Q64,88 56,84" stroke="#00897B" stroke-width="4" fill="none"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── DOG ────────────────────────────────────────────────────────
  {
    name: 'Dog',
    category: 'Animals',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#5D4037" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="58" rx="26" ry="22" fill="#D7CCC8"/>
    <circle cx="48" cy="34" r="18" fill="#D7CCC8"/>
    <ellipse cx="30" cy="24" rx="10" ry="14" fill="#8D6E63"/>
    <ellipse cx="66" cy="24" rx="10" ry="14" fill="#8D6E63"/>
    <ellipse cx="41" cy="32" rx="3.5" ry="4" fill="white"/>
    <ellipse cx="55" cy="32" rx="3.5" ry="4" fill="white"/>
    <circle cx="42" cy="33" r="2" fill="#212121"/>
    <circle cx="56" cy="33" r="2" fill="#212121"/>
    <ellipse cx="48" cy="39" rx="4" ry="3" fill="#4E342E"/>
    <path d="M44,42 Q48,46 52,42" fill="none"/>
    <ellipse cx="48" cy="50" rx="10" ry="8" fill="#EFEBE9" stroke="none"/>
    <ellipse cx="36" cy="78" rx="7" ry="5" fill="#D7CCC8"/>
    <ellipse cx="60" cy="78" rx="7" ry="5" fill="#D7CCC8"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'standing',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#5D4037" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="58" rx="26" ry="22" fill="#D7CCC8"/>
    <circle cx="48" cy="34" r="18" fill="#D7CCC8"/>
    <ellipse cx="30" cy="24" rx="10" ry="14" fill="#8D6E63"/>
    <ellipse cx="66" cy="24" rx="10" ry="14" fill="#8D6E63"/>
    <ellipse cx="41" cy="32" rx="3.5" ry="4" fill="white"/>
    <ellipse cx="55" cy="32" rx="3.5" ry="4" fill="white"/>
    <circle cx="42" cy="33" r="2" fill="#212121"/>
    <circle cx="56" cy="33" r="2" fill="#212121"/>
    <ellipse cx="48" cy="39" rx="4" ry="3" fill="#4E342E"/>
    <path d="M44,42 Q48,46 52,42" fill="none"/>
    <ellipse cx="36" cy="78" rx="7" ry="5" fill="#D7CCC8"/>
    <ellipse cx="60" cy="78" rx="7" ry="5" fill="#D7CCC8"/>
    <path d="M72,56 Q86,45 80,34" stroke="#8D6E63" stroke-width="4" fill="none"/>
  </g>
</svg>`)
      },
      {
        name: 'running',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#5D4037" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="56" rx="26" ry="22" fill="#D7CCC8" transform="rotate(-4 48 56)"/>
    <circle cx="52" cy="32" r="18" fill="#D7CCC8"/>
    <ellipse cx="32" cy="20" rx="10" ry="14" fill="#8D6E63" transform="rotate(-15 32 20)"/>
    <ellipse cx="68" cy="20" rx="10" ry="14" fill="#8D6E63" transform="rotate(15 68 20)"/>
    <ellipse cx="45" cy="30" rx="3.5" ry="4" fill="white"/>
    <ellipse cx="59" cy="30" rx="3.5" ry="4" fill="white"/>
    <circle cx="46" cy="31" r="2" fill="#212121"/>
    <circle cx="60" cy="31" r="2" fill="#212121"/>
    <ellipse cx="52" cy="37" rx="4" ry="3" fill="#4E342E"/>
    <path d="M48,40 Q52,45 56,40" fill="#FF8A80" stroke="#D32F2F"/>
    <ellipse cx="68" cy="72" rx="9" ry="5" fill="#D7CCC8" transform="rotate(20 68 72)"/>
    <ellipse cx="26" cy="76" rx="9" ry="5" fill="#D7CCC8" transform="rotate(-15 26 76)"/>
    <path d="M72,56 Q86,45 82,32" stroke="#8D6E63" stroke-width="4" fill="none"/>
  </g>
</svg>`)
      },
      {
        name: 'sitting',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#5D4037" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="62" rx="24" ry="22" fill="#D7CCC8"/>
    <circle cx="48" cy="34" r="18" fill="#D7CCC8"/>
    <ellipse cx="28" cy="24" rx="9" ry="13" fill="#8D6E63"/>
    <ellipse cx="68" cy="24" rx="9" ry="13" fill="#8D6E63"/>
    <circle cx="42" cy="32" r="3" fill="#212121"/>
    <circle cx="54" cy="32" r="3" fill="#212121"/>
    <ellipse cx="48" cy="38" rx="4" ry="3" fill="#4E342E"/>
    <path d="M44,42 Q48,46 52,42" fill="none"/>
    <ellipse cx="40" cy="82" rx="8" ry="5" fill="#BCAAA4"/>
    <ellipse cx="56" cy="82" rx="8" ry="5" fill="#BCAAA4"/>
    <path d="M70,68 Q82,60 84,72" stroke="#8D6E63" stroke-width="4" fill="none"/>
  </g>
</svg>`)
      },
      {
        name: 'happy',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#5D4037" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="58" rx="26" ry="22" fill="#D7CCC8"/>
    <circle cx="48" cy="34" r="18" fill="#D7CCC8"/>
    <ellipse cx="28" cy="20" rx="9" ry="13" fill="#8D6E63" transform="rotate(-20 28 20)"/>
    <ellipse cx="68" cy="20" rx="9" ry="13" fill="#8D6E63" transform="rotate(20 68 20)"/>
    <path d="M38,30 Q42,26 46,30" stroke="#212121" stroke-width="2"/>
    <path d="M50,30 Q54,26 58,30" stroke="#212121" stroke-width="2"/>
    <ellipse cx="48" cy="36" rx="4" ry="3" fill="#4E342E"/>
    <path d="M42,40 Q48,50 54,40" fill="#FF5252" stroke="#D32F2F"/>
    <ellipse cx="36" cy="78" rx="7" ry="5" fill="#D7CCC8"/>
    <ellipse cx="60" cy="78" rx="7" ry="5" fill="#D7CCC8"/>
    <path d="M72,56 Q88,40 84,24" stroke="#8D6E63" stroke-width="4" fill="none"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── PANDA ──────────────────────────────────────────────────────
  {
    name: 'Panda',
    category: 'Animals',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="28" cy="22" r="10" fill="#212121"/>
    <circle cx="68" cy="22" r="10" fill="#212121"/>
    <ellipse cx="48" cy="60" rx="26" ry="22" fill="#FFFFFF"/>
    <ellipse cx="32" cy="62" rx="8" ry="14" fill="#212121"/>
    <ellipse cx="64" cy="62" rx="8" ry="14" fill="#212121"/>
    <circle cx="48" cy="36" r="20" fill="#FFFFFF"/>
    <ellipse cx="40" cy="34" rx="6" ry="8" fill="#212121" transform="rotate(-15 40 34)"/>
    <ellipse cx="56" cy="34" rx="6" ry="8" fill="#212121" transform="rotate(15 56 34)"/>
    <circle cx="40" cy="33" r="2.5" fill="#FFFFFF"/>
    <circle cx="56" cy="33" r="2.5" fill="#FFFFFF"/>
    <circle cx="40" cy="33" r="1.2" fill="#212121"/>
    <circle cx="56" cy="33" r="1.2" fill="#212121"/>
    <ellipse cx="48" cy="42" rx="3.5" ry="2.5" fill="#212121"/>
    <path d="M44,45 Q48,48 52,45" fill="none"/>
    <ellipse cx="36" cy="80" rx="7" ry="5" fill="#212121"/>
    <ellipse cx="60" cy="80" rx="7" ry="5" fill="#212121"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'sitting',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="28" cy="22" r="10" fill="#212121"/>
    <circle cx="68" cy="22" r="10" fill="#212121"/>
    <ellipse cx="48" cy="60" rx="26" ry="22" fill="#FFFFFF"/>
    <ellipse cx="32" cy="62" rx="8" ry="14" fill="#212121"/>
    <ellipse cx="64" cy="62" rx="8" ry="14" fill="#212121"/>
    <circle cx="48" cy="36" r="20" fill="#FFFFFF"/>
    <ellipse cx="40" cy="34" rx="6" ry="8" fill="#212121" transform="rotate(-15 40 34)"/>
    <ellipse cx="56" cy="34" rx="6" ry="8" fill="#212121" transform="rotate(15 56 34)"/>
    <circle cx="40" cy="33" r="2.5" fill="#FFFFFF"/>
    <circle cx="56" cy="33" r="2.5" fill="#FFFFFF"/>
    <circle cx="40" cy="33" r="1.2" fill="#212121"/>
    <circle cx="56" cy="33" r="1.2" fill="#212121"/>
    <ellipse cx="48" cy="42" rx="3.5" ry="2.5" fill="#212121"/>
    <path d="M44,45 Q48,48 52,45" fill="none"/>
    <ellipse cx="36" cy="80" rx="7" ry="5" fill="#212121"/>
    <ellipse cx="60" cy="80" rx="7" ry="5" fill="#212121"/>
  </g>
</svg>`)
      },
      {
        name: 'waving',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="28" cy="20" r="10" fill="#212121"/>
    <circle cx="68" cy="20" r="10" fill="#212121"/>
    <ellipse cx="48" cy="58" rx="26" ry="22" fill="#FFFFFF"/>
    <ellipse cx="24" cy="48" rx="8" ry="12" fill="#212121" transform="rotate(-35 24 48)"/>
    <ellipse cx="66" cy="62" rx="8" ry="14" fill="#212121"/>
    <circle cx="48" cy="34" r="20" fill="#FFFFFF"/>
    <ellipse cx="40" cy="32" rx="6" ry="8" fill="#212121" transform="rotate(-15 40 32)"/>
    <ellipse cx="56" cy="32" rx="6" ry="8" fill="#212121" transform="rotate(15 56 32)"/>
    <circle cx="40" cy="31" r="2.5" fill="#FFFFFF"/>
    <circle cx="56" cy="31" r="2.5" fill="#FFFFFF"/>
    <ellipse cx="48" cy="40" rx="3.5" ry="2.5" fill="#212121"/>
    <path d="M44,43 Q48,48 52,43" fill="#FF8A80"/>
    <ellipse cx="38" cy="78" rx="8" ry="5" fill="#212121"/>
    <ellipse cx="58" cy="80" rx="8" ry="5" fill="#212121"/>
  </g>
</svg>`)
      },
      {
        name: 'eating-bamboo',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="28" cy="22" r="10" fill="#212121"/>
    <circle cx="68" cy="22" r="10" fill="#212121"/>
    <ellipse cx="48" cy="60" rx="26" ry="22" fill="#FFFFFF"/>
    <circle cx="48" cy="36" r="20" fill="#FFFFFF"/>
    <ellipse cx="40" cy="34" rx="6" ry="8" fill="#212121" transform="rotate(-15 40 34)"/>
    <ellipse cx="56" cy="34" rx="6" ry="8" fill="#212121" transform="rotate(15 56 34)"/>
    <circle cx="40" cy="33" r="2.5" fill="#FFFFFF"/>
    <circle cx="56" cy="33" r="2.5" fill="#FFFFFF"/>
    <!-- Bamboo shoot -->
    <path d="M30,70 L60,34" stroke="#4CAF50" stroke-width="5" stroke-linecap="round"/>
    <path d="M42,50 L50,44 M48,42 L56,38" stroke="#81C784" stroke-width="2"/>
    <ellipse cx="48" cy="42" rx="3.5" ry="2.5" fill="#212121"/>
    <ellipse cx="38" cy="54" rx="7" ry="10" fill="#212121" transform="rotate(20 38 54)"/>
    <ellipse cx="56" cy="52" rx="7" ry="10" fill="#212121" transform="rotate(-20 56 52)"/>
    <ellipse cx="36" cy="80" rx="7" ry="5" fill="#212121"/>
    <ellipse cx="60" cy="80" rx="7" ry="5" fill="#212121"/>
  </g>
</svg>`)
      },
      {
        name: 'rolling',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="48" r="30" fill="#FFFFFF"/>
    <ellipse cx="30" cy="32" rx="10" ry="12" fill="#212121" transform="rotate(-30 30 32)"/>
    <ellipse cx="66" cy="32" rx="10" ry="12" fill="#212121" transform="rotate(30 66 32)"/>
    <ellipse cx="36" cy="46" rx="6" ry="8" fill="#212121"/>
    <ellipse cx="60" cy="46" rx="6" ry="8" fill="#212121"/>
    <circle cx="36" cy="45" r="2" fill="#FFFFFF"/>
    <circle cx="60" cy="45" r="2" fill="#FFFFFF"/>
    <ellipse cx="48" cy="52" rx="4" ry="3" fill="#212121"/>
    <path d="M44,56 Q48,60 52,56" stroke="#212121"/>
    <ellipse cx="32" cy="70" rx="8" ry="10" fill="#212121"/>
    <ellipse cx="64" cy="70" rx="8" ry="10" fill="#212121"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── LION ───────────────────────────────────────────────────────
  {
    name: 'Lion',
    category: 'Animals',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4E342E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="38" r="26" fill="#E65100"/>
    <ellipse cx="48" cy="62" rx="24" ry="20" fill="#FFB74D"/>
    <circle cx="48" cy="38" r="18" fill="#FFB74D"/>
    <circle cx="34" cy="24" r="6" fill="#FFB74D"/>
    <circle cx="62" cy="24" r="6" fill="#FFB74D"/>
    <ellipse cx="42" cy="34" rx="3.5" ry="4" fill="white"/>
    <ellipse cx="54" cy="34" rx="3.5" ry="4" fill="white"/>
    <circle cx="42" cy="35" r="2" fill="#212121"/>
    <circle cx="54" cy="35" r="2" fill="#212121"/>
    <polygon points="48,40 44,45 52,45" fill="#E65100"/>
    <path d="M44,48 Q48,52 52,48" fill="none"/>
    <ellipse cx="36" cy="80" rx="7" ry="5" fill="#FFB74D"/>
    <ellipse cx="60" cy="80" rx="7" ry="5" fill="#FFB74D"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'standing',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4E342E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="38" r="26" fill="#E65100"/>
    <ellipse cx="48" cy="62" rx="24" ry="20" fill="#FFB74D"/>
    <circle cx="48" cy="38" r="18" fill="#FFB74D"/>
    <circle cx="34" cy="24" r="6" fill="#FFB74D"/>
    <circle cx="62" cy="24" r="6" fill="#FFB74D"/>
    <ellipse cx="42" cy="34" rx="3.5" ry="4" fill="white"/>
    <ellipse cx="54" cy="34" rx="3.5" ry="4" fill="white"/>
    <circle cx="42" cy="35" r="2" fill="#212121"/>
    <circle cx="54" cy="35" r="2" fill="#212121"/>
    <polygon points="48,40 44,45 52,45" fill="#E65100"/>
    <path d="M44,48 Q48,52 52,48" fill="none"/>
    <ellipse cx="36" cy="80" rx="7" ry="5" fill="#FFB74D"/>
    <ellipse cx="60" cy="80" rx="7" ry="5" fill="#FFB74D"/>
  </g>
</svg>`)
      },
      {
        name: 'walking',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4E342E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="52" cy="36" r="26" fill="#E65100"/>
    <ellipse cx="46" cy="60" rx="24" ry="20" fill="#FFB74D" transform="rotate(-6 46 60)"/>
    <circle cx="52" cy="36" r="18" fill="#FFB74D"/>
    <circle cx="38" cy="22" r="6" fill="#FFB74D"/>
    <circle cx="66" cy="22" r="6" fill="#FFB74D"/>
    <ellipse cx="46" cy="32" rx="3.5" ry="4" fill="white"/>
    <ellipse cx="58" cy="32" rx="3.5" ry="4" fill="white"/>
    <circle cx="47" cy="33" r="2" fill="#212121"/>
    <circle cx="59" cy="33" r="2" fill="#212121"/>
    <polygon points="52,38 48,43 56,43" fill="#E65100"/>
    <ellipse cx="66" cy="76" rx="9" ry="5" fill="#FFB74D" transform="rotate(22 66 76)"/>
    <ellipse cx="24" cy="78" rx="9" ry="5" fill="#FFB74D" transform="rotate(-18 24 78)"/>
  </g>
</svg>`)
      },
      {
        name: 'roaring',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4E342E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="36" r="28" fill="#BF360C"/>
    <circle cx="48" cy="36" r="25" fill="#E65100"/>
    <ellipse cx="48" cy="62" rx="24" ry="20" fill="#FFB74D"/>
    <circle cx="48" cy="36" r="18" fill="#FFB74D"/>
    <path d="M40,28 Q44,24 48,28" stroke="#000" stroke-width="2"/>
    <path d="M48,28 Q52,24 56,28" stroke="#000" stroke-width="2"/>
    <polygon points="48,36 44,40 52,40" fill="#BF360C"/>
    <!-- Roaring mouth -->
    <ellipse cx="48" cy="46" rx="7" ry="5" fill="#D32F2F"/>
    <polygon points="45,42 47,45 49,42" fill="#FFF"/>
    <ellipse cx="36" cy="80" rx="7" ry="5" fill="#FFB74D"/>
    <ellipse cx="60" cy="80" rx="7" ry="5" fill="#FFB74D"/>
    <path d="M72,62 Q86,52 82,40" stroke="#FFB74D" stroke-width="4"/>
  </g>
</svg>`)
      },
      {
        name: 'crouching',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4E342E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="46" r="24" fill="#E65100"/>
    <ellipse cx="48" cy="68" rx="28" ry="16" fill="#FFB74D"/>
    <circle cx="48" cy="46" r="16" fill="#FFB74D"/>
    <circle cx="36" cy="34" r="5" fill="#FFB74D"/>
    <circle cx="60" cy="34" r="5" fill="#FFB74D"/>
    <circle cx="43" cy="43" r="2" fill="#212121"/>
    <circle cx="53" cy="43" r="2" fill="#212121"/>
    <polygon points="48,48 45,51 51,51" fill="#E65100"/>
    <ellipse cx="28" cy="76" rx="8" ry="4" fill="#FFB74D"/>
    <ellipse cx="68" cy="76" rx="8" ry="4" fill="#FFB74D"/>
    <path d="M74,66 Q88,68 84,54" stroke="#FFB74D" stroke-width="4"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── OWL ────────────────────────────────────────────────────────
  {
    name: 'Owl',
    category: 'Animals',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#3E2723" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="50" rx="24" ry="32" fill="#795548"/>
    <ellipse cx="48" cy="54" rx="16" ry="24" fill="#D7CCC8"/>
    <circle cx="38" cy="36" r="10" fill="#FFF"/>
    <circle cx="58" cy="36" r="10" fill="#FFF"/>
    <circle cx="38" cy="36" r="5" fill="#FFB300"/>
    <circle cx="58" cy="36" r="5" fill="#FFB300"/>
    <circle cx="38" cy="36" r="2.5" fill="#212121"/>
    <circle cx="58" cy="36" r="2.5" fill="#212121"/>
    <polygon points="48,40 44,48 52,48" fill="#FF6F00"/>
    <polygon points="26,20 34,26 24,32" fill="#5D4037"/>
    <polygon points="70,20 62,26 72,32" fill="#5D4037"/>
    <path d="M38,78 L42,86 M48,78 L48,86 M58,78 L54,86" stroke="#FF6F00" stroke-width="2"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'perched',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#3E2723" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="50" rx="24" ry="32" fill="#795548"/>
    <ellipse cx="48" cy="54" rx="16" ry="24" fill="#D7CCC8"/>
    <circle cx="38" cy="36" r="10" fill="#FFF"/>
    <circle cx="58" cy="36" r="10" fill="#FFF"/>
    <circle cx="38" cy="36" r="5" fill="#FFB300"/>
    <circle cx="58" cy="36" r="5" fill="#FFB300"/>
    <circle cx="38" cy="36" r="2.5" fill="#212121"/>
    <circle cx="58" cy="36" r="2.5" fill="#212121"/>
    <polygon points="48,40 44,48 52,48" fill="#FF6F00"/>
    <polygon points="26,20 34,26 24,32" fill="#5D4037"/>
    <polygon points="70,20 62,26 72,32" fill="#5D4037"/>
    <path d="M38,78 L42,86 M48,78 L48,86 M58,78 L54,86" stroke="#FF6F00" stroke-width="2"/>
  </g>
</svg>`)
      },
      {
        name: 'winking',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#3E2723" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="50" rx="24" ry="32" fill="#795548"/>
    <ellipse cx="48" cy="54" rx="16" ry="24" fill="#D7CCC8"/>
    <circle cx="38" cy="36" r="10" fill="#FFF"/>
    <circle cx="38" cy="36" r="5" fill="#FFB300"/>
    <circle cx="38" cy="36" r="2.5" fill="#212121"/>
    <!-- Winking eye -->
    <path d="M52,36 Q58,30 64,36" stroke="#3E2723" stroke-width="3"/>
    <polygon points="48,40 44,48 52,48" fill="#FF6F00"/>
    <polygon points="26,20 34,26 24,32" fill="#5D4037"/>
    <polygon points="70,20 62,26 72,32" fill="#5D4037"/>
    <path d="M38,78 L42,86 M48,78 L48,86 M58,78 L54,86" stroke="#FF6F00" stroke-width="2"/>
  </g>
</svg>`)
      },
      {
        name: 'wings-spread',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#3E2723" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Spread wings -->
    <path d="M30,46 Q8,30 4,44 Q14,58 30,56" fill="#6D4C41"/>
    <path d="M66,46 Q88,30 92,44 Q82,58 66,56" fill="#6D4C41"/>
    <ellipse cx="48" cy="50" rx="20" ry="28" fill="#795548"/>
    <ellipse cx="48" cy="54" rx="13" ry="20" fill="#D7CCC8"/>
    <circle cx="41" cy="36" r="8" fill="#FFF"/>
    <circle cx="55" cy="36" r="8" fill="#FFF"/>
    <circle cx="41" cy="36" r="4" fill="#FFB300"/>
    <circle cx="55" cy="36" r="4" fill="#FFB300"/>
    <polygon points="48,40 44,46 52,46" fill="#FF6F00"/>
    <path d="M42,78 L44,86 M54,78 L52,86" stroke="#FF6F00" stroke-width="2"/>
  </g>
</svg>`)
      },
      {
        name: 'night-glow',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1A237E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="50" rx="24" ry="32" fill="#311B92"/>
    <ellipse cx="48" cy="54" rx="16" ry="24" fill="#7E57C2"/>
    <circle cx="38" cy="36" r="11" fill="#FFEB3B" opacity="0.4"/>
    <circle cx="58" cy="36" r="11" fill="#FFEB3B" opacity="0.4"/>
    <circle cx="38" cy="36" r="9" fill="#FFFDE7"/>
    <circle cx="58" cy="36" r="9" fill="#FFFDE7"/>
    <circle cx="38" cy="36" r="4" fill="#FFD600"/>
    <circle cx="58" cy="36" r="4" fill="#FFD600"/>
    <polygon points="48,40 44,48 52,48" fill="#FFAB00"/>
    <path d="M38,78 L42,86 M58,78 L54,86" stroke="#FFAB00" stroke-width="2"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── PENGUIN ────────────────────────────────────────────────────
  {
    name: 'Penguin',
    category: 'Animals',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1A237E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="54" rx="24" ry="30" fill="#283593"/>
    <ellipse cx="48" cy="58" rx="16" ry="22" fill="#FFFFFF"/>
    <circle cx="48" cy="30" r="16" fill="#283593"/>
    <ellipse cx="41" cy="28" rx="3" ry="3.5" fill="white"/>
    <ellipse cx="55" cy="28" rx="3" ry="3.5" fill="white"/>
    <circle cx="41.5" cy="28.5" r="1.8" fill="#000"/>
    <circle cx="55.5" cy="28.5" r="1.8" fill="#000"/>
    <polygon points="48,33 43,39 53,39" fill="#FF8F00"/>
    <ellipse cx="36" cy="80" rx="8" ry="4" fill="#FF8F00"/>
    <ellipse cx="60" cy="80" rx="8" ry="4" fill="#FF8F00"/>
    <path d="M24,50 Q16,60 22,70" fill="#283593"/>
    <path d="M72,50 Q80,60 74,70" fill="#283593"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'standing',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1A237E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="54" rx="24" ry="30" fill="#283593"/>
    <ellipse cx="48" cy="58" rx="16" ry="22" fill="#FFFFFF"/>
    <circle cx="48" cy="30" r="16" fill="#283593"/>
    <circle cx="41" cy="28" r="2.5" fill="#000"/>
    <circle cx="55" cy="28" r="2.5" fill="#000"/>
    <polygon points="48,33 43,39 53,39" fill="#FF8F00"/>
    <ellipse cx="36" cy="80" rx="8" ry="4" fill="#FF8F00"/>
    <ellipse cx="60" cy="80" rx="8" ry="4" fill="#FF8F00"/>
    <path d="M24,50 Q16,60 22,70" fill="#283593"/>
    <path d="M72,50 Q80,60 74,70" fill="#283593"/>
  </g>
</svg>`)
      },
      {
        name: 'waddle-left',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1A237E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-8 48 54)">
    <ellipse cx="48" cy="54" rx="24" ry="30" fill="#283593"/>
    <ellipse cx="48" cy="58" rx="16" ry="22" fill="#FFFFFF"/>
    <circle cx="48" cy="30" r="16" fill="#283593"/>
    <circle cx="41" cy="28" r="2.5" fill="#000"/>
    <circle cx="55" cy="28" r="2.5" fill="#000"/>
    <polygon points="48,33 43,39 53,39" fill="#FF8F00"/>
    <ellipse cx="32" cy="80" rx="8" ry="4" fill="#FF8F00" transform="rotate(-15 32 80)"/>
    <ellipse cx="62" cy="76" rx="8" ry="4" fill="#FF8F00"/>
    <path d="M22,46 Q10,54 18,66" fill="#283593"/>
    <path d="M72,52 Q82,62 76,72" fill="#283593"/>
  </g>
</svg>`)
      },
      {
        name: 'waddle-right',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1A237E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="rotate(8 48 54)">
    <ellipse cx="48" cy="54" rx="24" ry="30" fill="#283593"/>
    <ellipse cx="48" cy="58" rx="16" ry="22" fill="#FFFFFF"/>
    <circle cx="48" cy="30" r="16" fill="#283593"/>
    <circle cx="41" cy="28" r="2.5" fill="#000"/>
    <circle cx="55" cy="28" r="2.5" fill="#000"/>
    <polygon points="48,33 43,39 53,39" fill="#FF8F00"/>
    <ellipse cx="34" cy="76" rx="8" ry="4" fill="#FF8F00"/>
    <ellipse cx="64" cy="80" rx="8" ry="4" fill="#FF8F00" transform="rotate(15 64 80)"/>
    <path d="M24,52 Q14,62 20,72" fill="#283593"/>
    <path d="M74,46 Q86,54 78,66" fill="#283593"/>
  </g>
</svg>`)
      },
      {
        name: 'belly-slide',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1A237E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="50" cy="58" rx="32" ry="16" fill="#283593"/>
    <ellipse cx="50" cy="62" rx="26" ry="10" fill="#FFFFFF"/>
    <circle cx="76" cy="50" r="12" fill="#283593"/>
    <circle cx="78" cy="48" r="2" fill="#000"/>
    <polygon points="86,48 94,52 86,54" fill="#FF8F00"/>
    <ellipse cx="20" cy="56" rx="8" ry="4" fill="#FF8F00"/>
    <path d="M40,50 Q48,34 56,48" fill="#283593"/>
    <!-- Speed snow trails -->
    <line x1="8" y1="68" x2="28" y2="68" stroke="#90CAF9" stroke-width="2"/>
    <line x1="14" y1="72" x2="38" y2="72" stroke="#90CAF9" stroke-width="2"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── FROG ───────────────────────────────────────────────────────
  {
    name: 'Frog',
    category: 'Animals',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="58" rx="26" ry="20" fill="#4CAF50"/>
    <ellipse cx="48" cy="60" rx="18" ry="14" fill="#C8E6C9" stroke="none"/>
    <circle cx="34" cy="30" r="10" fill="#4CAF50"/>
    <circle cx="62" cy="30" r="10" fill="#4CAF50"/>
    <circle cx="34" cy="30" r="6" fill="white"/>
    <circle cx="62" cy="30" r="6" fill="white"/>
    <circle cx="35" cy="30" r="3" fill="#212121"/>
    <circle cx="61" cy="30" r="3" fill="#212121"/>
    <path d="M36,46 Q48,54 60,46" stroke="#1B5E20" stroke-width="2"/>
    <ellipse cx="24" cy="74" rx="10" ry="5" fill="#4CAF50"/>
    <ellipse cx="72" cy="74" rx="10" ry="5" fill="#4CAF50"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'sitting',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="58" rx="26" ry="20" fill="#4CAF50"/>
    <ellipse cx="48" cy="60" rx="18" ry="14" fill="#C8E6C9" stroke="none"/>
    <circle cx="34" cy="30" r="10" fill="#4CAF50"/>
    <circle cx="62" cy="30" r="10" fill="#4CAF50"/>
    <circle cx="34" cy="30" r="6" fill="white"/>
    <circle cx="62" cy="30" r="6" fill="white"/>
    <circle cx="35" cy="30" r="3" fill="#212121"/>
    <circle cx="61" cy="30" r="3" fill="#212121"/>
    <path d="M36,46 Q48,54 60,46" stroke="#1B5E20" stroke-width="2"/>
    <ellipse cx="24" cy="74" rx="10" ry="5" fill="#4CAF50"/>
    <ellipse cx="72" cy="74" rx="10" ry="5" fill="#4CAF50"/>
  </g>
</svg>`)
      },
      {
        name: 'catching-fly',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="44" cy="58" rx="26" ry="20" fill="#4CAF50"/>
    <circle cx="30" cy="30" r="10" fill="#4CAF50"/>
    <circle cx="58" cy="30" r="10" fill="#4CAF50"/>
    <circle cx="30" cy="30" r="6" fill="white"/>
    <circle cx="58" cy="30" r="6" fill="white"/>
    <circle cx="33" cy="29" r="3" fill="#212121"/>
    <circle cx="61" cy="29" r="3" fill="#212121"/>
    <!-- Open mouth with tongue -->
    <ellipse cx="44" cy="48" rx="12" ry="7" fill="#C2185B"/>
    <path d="M52,48 Q72,40 84,28" stroke="#E91E63" stroke-width="3" fill="none"/>
    <!-- Tiny fly -->
    <circle cx="86" cy="26" r="2.5" fill="#212121"/>
    <ellipse cx="85" cy="22" rx="2" ry="3" fill="#BBDEFB" opacity="0.7"/>
    <ellipse cx="20" cy="74" rx="10" ry="5" fill="#4CAF50"/>
    <ellipse cx="68" cy="74" rx="10" ry="5" fill="#4CAF50"/>
  </g>
</svg>`)
      },
      {
        name: 'crouched',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="66" rx="28" ry="15" fill="#4CAF50"/>
    <circle cx="34" cy="42" r="9" fill="#4CAF50"/>
    <circle cx="62" cy="42" r="9" fill="#4CAF50"/>
    <circle cx="34" cy="42" r="5" fill="white"/>
    <circle cx="62" cy="42" r="5" fill="white"/>
    <circle cx="34" cy="42" r="2.5" fill="#000"/>
    <circle cx="62" cy="42" r="2.5" fill="#000"/>
    <ellipse cx="18" cy="72" rx="12" ry="6" fill="#388E3C"/>
    <ellipse cx="78" cy="72" rx="12" ry="6" fill="#388E3C"/>
  </g>
</svg>`)
      },
      {
        name: 'leaping',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Frog stretched out in mid-air -->
    <ellipse cx="48" cy="44" rx="16" ry="24" fill="#4CAF50" transform="rotate(-15 48 44)"/>
    <circle cx="44" cy="22" r="7" fill="#4CAF50"/>
    <circle cx="58" cy="20" r="7" fill="#4CAF50"/>
    <circle cx="44" cy="22" r="4" fill="white"/>
    <circle cx="58" cy="20" r="4" fill="white"/>
    <!-- Back legs stretched -->
    <path d="M40,64 L26,84 L14,88" stroke="#4CAF50" stroke-width="4"/>
    <path d="M54,62 L66,82 L78,88" stroke="#4CAF50" stroke-width="4"/>
    <!-- Front arms outstretched -->
    <path d="M38,36 L24,24" stroke="#4CAF50" stroke-width="3"/>
    <path d="M58,34 L72,22" stroke="#4CAF50" stroke-width="3"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── BUTTERFLY ──────────────────────────────────────────────────
  {
    name: 'Butterfly',
    category: 'Animals',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="28" cy="34" rx="20" ry="18" fill="#FF4081"/>
    <ellipse cx="68" cy="34" rx="20" ry="18" fill="#FF4081"/>
    <ellipse cx="32" cy="58" rx="15" ry="13" fill="#FFC107"/>
    <ellipse cx="64" cy="58" rx="15" ry="13" fill="#FFC107"/>
    <circle cx="28" cy="32" r="5" fill="#FFF" opacity="0.6"/>
    <circle cx="68" cy="32" r="5" fill="#FFF" opacity="0.6"/>
    <ellipse cx="48" cy="48" rx="4" ry="20" fill="#303F9F"/>
    <circle cx="48" cy="26" r="4" fill="#303F9F"/>
    <path d="M48,22 Q40,10 34,6" stroke="#303F9F" stroke-width="2"/>
    <path d="M48,22 Q56,10 62,6" stroke="#303F9F" stroke-width="2"/>
    <circle cx="34" cy="6" r="2.5" fill="#FF4081"/>
    <circle cx="62" cy="6" r="2.5" fill="#FF4081"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'wings-open',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="28" cy="34" rx="20" ry="18" fill="#FF4081"/>
    <ellipse cx="68" cy="34" rx="20" ry="18" fill="#FF4081"/>
    <ellipse cx="32" cy="58" rx="15" ry="13" fill="#FFC107"/>
    <ellipse cx="64" cy="58" rx="15" ry="13" fill="#FFC107"/>
    <ellipse cx="48" cy="48" rx="4" ry="20" fill="#303F9F"/>
    <circle cx="48" cy="26" r="4" fill="#303F9F"/>
    <path d="M48,22 Q40,10 34,6" stroke="#303F9F" stroke-width="2"/>
    <path d="M48,22 Q56,10 62,6" stroke="#303F9F" stroke-width="2"/>
  </g>
</svg>`)
      },
      {
        name: 'wings-half',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="36" cy="34" rx="12" ry="18" fill="#FF4081"/>
    <ellipse cx="60" cy="34" rx="12" ry="18" fill="#FF4081"/>
    <ellipse cx="38" cy="56" rx="9" ry="13" fill="#FFC107"/>
    <ellipse cx="58" cy="56" rx="9" ry="13" fill="#FFC107"/>
    <ellipse cx="48" cy="48" rx="4" ry="20" fill="#303F9F"/>
    <circle cx="48" cy="26" r="4" fill="#303F9F"/>
    <path d="M48,22 Q42,10 38,6" stroke="#303F9F" stroke-width="2"/>
    <path d="M48,22 Q54,10 58,6" stroke="#303F9F" stroke-width="2"/>
  </g>
</svg>`)
      },
      {
        name: 'wings-closed',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M48,48 C30,20 40,8 54,20 C64,30 52,50 48,56 Z" fill="#FF4081"/>
    <path d="M48,56 C40,64 44,72 50,70 C56,66 52,58 48,56 Z" fill="#FFC107"/>
    <ellipse cx="46" cy="50" rx="3" ry="16" fill="#303F9F"/>
    <circle cx="46" cy="32" r="3" fill="#303F9F"/>
    <path d="M46,28 Q40,16 38,10" stroke="#303F9F" stroke-width="2"/>
  </g>
</svg>`)
      },
      {
        name: 'blue-morpho',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#0D47A1" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="28" cy="34" rx="20" ry="18" fill="#00E5FF"/>
    <ellipse cx="68" cy="34" rx="20" ry="18" fill="#00E5FF"/>
    <ellipse cx="32" cy="58" rx="15" ry="13" fill="#2979FF"/>
    <ellipse cx="64" cy="58" rx="15" ry="13" fill="#2979FF"/>
    <ellipse cx="48" cy="48" rx="4" ry="20" fill="#1A237E"/>
    <circle cx="48" cy="26" r="4" fill="#1A237E"/>
    <path d="M48,22 Q40,10 34,6" stroke="#1A237E" stroke-width="2"/>
    <path d="M48,22 Q56,10 62,6" stroke="#1A237E" stroke-width="2"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── DRAGON ─────────────────────────────────────────────────────
  {
    name: 'Dragon',
    category: 'Animals',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20,40 Q10,20 30,30" fill="#E65100"/>
    <path d="M76,40 Q86,20 66,30" fill="#E65100"/>
    <ellipse cx="48" cy="58" rx="22" ry="26" fill="#43A047"/>
    <circle cx="48" cy="30" r="16" fill="#43A047"/>
    <polygon points="36,18 40,8 44,18" fill="#E65100"/>
    <polygon points="52,18 56,8 60,18" fill="#E65100"/>
    <circle cx="41" cy="28" r="3.5" fill="white"/>
    <circle cx="55" cy="28" r="3.5" fill="white"/>
    <circle cx="42" cy="28" r="1.8" fill="#000"/>
    <circle cx="54" cy="28" r="1.8" fill="#000"/>
    <ellipse cx="48" cy="36" rx="8" ry="5" fill="#81C784"/>
    <path d="M40,68 Q24,78 14,70" stroke="#43A047" stroke-width="4"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'standing',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20,40 Q10,20 30,30" fill="#E65100"/>
    <path d="M76,40 Q86,20 66,30" fill="#E65100"/>
    <ellipse cx="48" cy="58" rx="22" ry="26" fill="#43A047"/>
    <circle cx="48" cy="30" r="16" fill="#43A047"/>
    <polygon points="36,18 40,8 44,18" fill="#E65100"/>
    <polygon points="52,18 56,8 60,18" fill="#E65100"/>
    <circle cx="41" cy="28" r="3.5" fill="white"/>
    <circle cx="55" cy="28" r="3.5" fill="white"/>
    <circle cx="42" cy="28" r="1.8" fill="#000"/>
    <circle cx="54" cy="28" r="1.8" fill="#000"/>
    <path d="M40,68 Q24,78 14,70" stroke="#43A047" stroke-width="4"/>
  </g>
</svg>`)
      },
      {
        name: 'breathing-fire',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M16,36 Q6,16 26,26" fill="#E65100"/>
    <ellipse cx="42" cy="58" rx="22" ry="26" fill="#43A047"/>
    <circle cx="44" cy="30" r="16" fill="#43A047"/>
    <polygon points="32,18 36,8 40,18" fill="#E65100"/>
    <polygon points="48,18 52,8 56,18" fill="#E65100"/>
    <circle cx="38" cy="28" r="3.5" fill="white"/>
    <circle cx="50" cy="28" r="3.5" fill="white"/>
    <!-- Fire breath -->
    <path d="M52,36 Q64,30 76,26 Q86,34 94,36 Q84,44 72,42 Z" fill="#FF5722" stroke="#BF360C"/>
    <path d="M56,36 Q68,32 76,30 Q82,36 88,36 Q80,40 70,39 Z" fill="#FFEB3B" stroke="none"/>
  </g>
</svg>`)
      },
      {
        name: 'wings-spread',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Big flared wings -->
    <path d="M30,42 Q4,12 12,38 Q22,48 34,48" fill="#E65100"/>
    <path d="M66,42 Q92,12 84,38 Q74,48 62,48" fill="#E65100"/>
    <ellipse cx="48" cy="58" rx="20" ry="26" fill="#43A047"/>
    <circle cx="48" cy="30" r="16" fill="#43A047"/>
    <polygon points="38,16 42,6 46,16" fill="#E65100"/>
    <polygon points="50,16 54,6 58,16" fill="#E65100"/>
  </g>
</svg>`)
      },
      {
        name: 'flying',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#1B5E20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M28,34 Q6,8 24,18" fill="#E65100"/>
    <path d="M68,34 Q90,8 72,18" fill="#E65100"/>
    <ellipse cx="48" cy="50" rx="26" ry="18" fill="#43A047" transform="rotate(-15 48 50)"/>
    <circle cx="68" cy="36" r="14" fill="#43A047"/>
    <path d="M26,62 Q12,68 6,60" stroke="#43A047" stroke-width="4"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── UNICORN ────────────────────────────────────────────────────
  {
    name: 'Unicorn',
    category: 'Animals',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4A148C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="48,4 44,22 52,22" fill="#FFD54F" stroke="#FF6F00"/>
    <circle cx="48" cy="38" r="18" fill="#FFFFFF"/>
    <ellipse cx="48" cy="64" rx="22" ry="24" fill="#FFFFFF"/>
    <polygon points="34,26 28,12 40,24" fill="#E1BEE7"/>
    <polygon points="62,26 68,12 56,24" fill="#E1BEE7"/>
    <circle cx="41" cy="36" r="3.5" fill="white"/>
    <circle cx="55" cy="36" r="3.5" fill="white"/>
    <circle cx="42" cy="36" r="2" fill="#4A148C"/>
    <circle cx="54" cy="36" r="2" fill="#4A148C"/>
    <path d="M26,30 Q16,40 24,56" stroke="#FF4081" stroke-width="4"/>
    <path d="M70,30 Q80,40 72,56" stroke="#7C4DFF" stroke-width="4"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'standing',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4A148C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="48,4 44,22 52,22" fill="#FFD54F" stroke="#FF6F00"/>
    <circle cx="48" cy="38" r="18" fill="#FFFFFF"/>
    <ellipse cx="48" cy="64" rx="22" ry="24" fill="#FFFFFF"/>
    <polygon points="34,26 28,12 40,24" fill="#E1BEE7"/>
    <polygon points="62,26 68,12 56,24" fill="#E1BEE7"/>
    <circle cx="41" cy="36" r="3.5" fill="white"/>
    <circle cx="55" cy="36" r="3.5" fill="white"/>
    <circle cx="42" cy="36" r="2" fill="#4A148C"/>
    <circle cx="54" cy="36" r="2" fill="#4A148C"/>
    <path d="M26,30 Q16,40 24,56" stroke="#FF4081" stroke-width="4"/>
    <path d="M70,30 Q80,40 72,56" stroke="#7C4DFF" stroke-width="4"/>
  </g>
</svg>`)
      },
      {
        name: 'trotting',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4A148C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="54,4 48,20 58,20" fill="#FFD54F" stroke="#FF6F00"/>
    <circle cx="54" cy="36" r="18" fill="#FFFFFF"/>
    <ellipse cx="46" cy="62" rx="24" ry="20" fill="#FFFFFF" transform="rotate(-6 46 62)"/>
    <ellipse cx="68" cy="78" rx="8" ry="4" fill="#E1BEE7" transform="rotate(20 68 78)"/>
    <ellipse cx="26" cy="80" rx="8" ry="4" fill="#E1BEE7" transform="rotate(-15 26 80)"/>
    <path d="M22,54 Q10,50 8,62" stroke="#FF4081" stroke-width="5"/>
  </g>
</svg>`)
      },
      {
        name: 'rearing',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4A148C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="56,-2 48,16 60,16" fill="#FFD54F" stroke="#FF6F00"/>
    <circle cx="54" cy="28" r="16" fill="#FFFFFF"/>
    <ellipse cx="44" cy="56" rx="20" ry="26" fill="#FFFFFF" transform="rotate(-25 44 56)"/>
    <path d="M60,42 L72,32 L78,38" stroke="#E1BEE7" stroke-width="4"/>
    <path d="M36,78 L34,88 M46,76 L48,88" stroke="#E1BEE7" stroke-width="4"/>
  </g>
</svg>`)
      },
      {
        name: 'magic-star',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#4A148C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Horn with magic burst -->
    <polygon points="48,6 44,22 52,22" fill="#FFD54F" stroke="#FF6F00"/>
    <circle cx="48" cy="4" r="5" fill="#FFEB3B"/>
    <circle cx="48" cy="38" r="18" fill="#FFFFFF"/>
    <ellipse cx="48" cy="64" rx="22" ry="24" fill="#FFFFFF"/>
    <!-- Magic sparkles -->
    <polygon points="36,4 38,8 42,8 39,11 40,15 36,12 32,15 33,11 30,8 34,8" fill="#00E5FF" stroke="none"/>
    <polygon points="60,4 62,8 66,8 63,11 64,15 60,12 56,15 57,11 54,8 58,8" fill="#FF4081" stroke="none"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── DINOSAUR ───────────────────────────────────────────────────
  {
    name: 'Dinosaur',
    category: 'Animals',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#2E7D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M60,20 C40,10 30,30 36,44 L32,60 L24,70 L34,72 L40,64 L56,64 L60,82 L70,82 L66,58 C78,50 80,30 60,20Z" fill="#66BB6A"/>
    <circle cx="52" cy="24" r="3" fill="white"/>
    <circle cx="53" cy="24" r="1.5" fill="#000"/>
    <path d="M50,34 L58,34 L54,38Z" fill="white"/>
    <path d="M24,70 Q14,76 8,72" stroke="#66BB6A" stroke-width="5"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'walk-a',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#2E7D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M60,20 C40,10 30,30 36,44 L32,60 L24,70 L34,72 L40,64 L56,64 L60,82 L70,82 L66,58 C78,50 80,30 60,20Z" fill="#66BB6A"/>
    <circle cx="52" cy="24" r="3" fill="white"/>
    <circle cx="53" cy="24" r="1.5" fill="#000"/>
    <path d="M24,70 Q14,76 8,72" stroke="#66BB6A" stroke-width="5"/>
  </g>
</svg>`)
      },
      {
        name: 'walk-b',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#2E7D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M62,22 C42,12 32,32 38,46 L34,62 L20,74 L30,76 L38,66 L58,66 L68,80 L76,78 L68,60 C80,52 82,32 62,22Z" fill="#66BB6A"/>
    <circle cx="54" cy="26" r="3" fill="white"/>
    <circle cx="55" cy="26" r="1.5" fill="#000"/>
    <path d="M20,74 Q12,70 6,66" stroke="#66BB6A" stroke-width="5"/>
  </g>
</svg>`)
      },
      {
        name: 'roaring',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#2E7D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M66,16 C46,10 32,28 36,44 L32,60 L24,70 L34,72 L40,64 L56,64 L60,82 L70,82 L66,58 C82,46 84,24 66,16Z" fill="#66BB6A"/>
    <polygon points="68,26 84,28 72,36" fill="#D32F2F"/>
    <polygon points="72,28 75,32 78,28" fill="#FFF"/>
    <circle cx="54" cy="20" r="3" fill="white"/>
    <circle cx="55" cy="20" r="1.5" fill="#000"/>
  </g>
</svg>`)
      },
      {
        name: 'tail-swish',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#2E7D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M58,22 C38,12 28,32 34,46 L30,62 L28,74 L38,74 L42,66 L58,66 L62,82 L72,82 L66,60 C78,52 78,32 58,22Z" fill="#66BB6A"/>
    <circle cx="50" cy="26" r="3" fill="white"/>
    <path d="M28,74 Q20,60 14,52" stroke="#66BB6A" stroke-width="6"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── FISH ───────────────────────────────────────────────────────
  {
    name: 'Fish',
    category: 'Animals',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#01579B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="44" cy="48" rx="28" ry="18" fill="#0288D1"/>
    <polygon points="72,48 88,32 88,64" fill="#01579B"/>
    <ellipse cx="44" cy="48" rx="22" ry="14" fill="#29B6F6" stroke="none"/>
    <circle cx="32" cy="44" r="4" fill="white"/>
    <circle cx="33" cy="44" r="2" fill="#000"/>
    <path d="M44,34 Q50,28 56,34" stroke="#01579B"/>
    <path d="M44,62 Q50,68 56,62" stroke="#01579B"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'swimming',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#01579B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="44" cy="48" rx="28" ry="18" fill="#0288D1"/>
    <polygon points="72,48 88,32 88,64" fill="#01579B"/>
    <ellipse cx="44" cy="48" rx="22" ry="14" fill="#29B6F6" stroke="none"/>
    <circle cx="32" cy="44" r="4" fill="white"/>
    <circle cx="33" cy="44" r="2" fill="#000"/>
    <path d="M44,34 Q50,28 56,34" stroke="#01579B"/>
    <path d="M44,62 Q50,68 56,62" stroke="#01579B"/>
  </g>
</svg>`)
      },
      {
        name: 'fin-up',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#01579B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="44" cy="48" rx="28" ry="18" fill="#0288D1"/>
    <polygon points="72,44 90,26 84,58" fill="#01579B"/>
    <circle cx="32" cy="44" r="4" fill="white"/>
    <circle cx="33" cy="44" r="2" fill="#000"/>
    <!-- Top fin raised high -->
    <path d="M42,32 Q50,20 60,32" stroke="#01579B" fill="#29B6F6"/>
  </g>
</svg>`)
      },
      {
        name: 'bubbles',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#01579B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="46" cy="48" rx="26" ry="18" fill="#0288D1"/>
    <polygon points="72,48 88,34 88,62" fill="#01579B"/>
    <circle cx="34" cy="44" r="4" fill="white"/>
    <circle cx="35" cy="44" r="2" fill="#000"/>
    <!-- Bubbles -->
    <circle cx="16" cy="36" r="3.5" stroke="#00E5FF" fill="#E0F7FA"/>
    <circle cx="10" cy="24" r="4.5" stroke="#00E5FF" fill="#E0F7FA"/>
    <circle cx="18" cy="16" r="2.5" stroke="#00E5FF" fill="#E0F7FA"/>
  </g>
</svg>`)
      },
      {
        name: 'goldfish',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#E65100" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="44" cy="48" rx="28" ry="18" fill="#FF9800"/>
    <polygon points="72,48 90,30 90,66" fill="#F57C00"/>
    <circle cx="32" cy="44" r="4" fill="white"/>
    <circle cx="33" cy="44" r="2" fill="#000"/>
    <path d="M44,32 Q50,24 58,32" fill="#FFE082"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── CRAB ───────────────────────────────────────────────────────
  {
    name: 'Crab',
    category: 'Animals',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#991B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M28,52 Q12,50 8,62" stroke="#C23616" stroke-width="2.5"/>
    <path d="M26,58 Q14,64 10,74" stroke="#C23616" stroke-width="2.5"/>
    <path d="M68,52 Q84,50 88,62" stroke="#C23616" stroke-width="2.5"/>
    <path d="M70,58 Q82,64 86,74" stroke="#C23616" stroke-width="2.5"/>
    <path d="M12,18 C6,8 24,6 20,18 C26,8 36,18 24,26 Z" fill="#FF7675"/>
    <path d="M84,18 C90,8 72,6 76,18 C70,8 60,18 72,26 Z" fill="#FF7675"/>
    <ellipse cx="48" cy="56" rx="26" ry="18" fill="#EE5253"/>
    <circle cx="38" cy="32" r="5.5" fill="white" stroke="#991B1B"/>
    <circle cx="58" cy="32" r="5.5" fill="white" stroke="#991B1B"/>
    <circle cx="39" cy="32" r="2.5" fill="#1E293B"/>
    <circle cx="57" cy="32" r="2.5" fill="#1E293B"/>
    <path d="M42,58 Q48,64 54,58" stroke="#7F1D1D" stroke-width="1.8"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'claws-open',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#991B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M28,52 Q12,50 8,62" stroke="#C23616" stroke-width="2.5"/>
    <path d="M26,58 Q14,64 10,74" stroke="#C23616" stroke-width="2.5"/>
    <path d="M68,52 Q84,50 88,62" stroke="#C23616" stroke-width="2.5"/>
    <path d="M70,58 Q82,64 86,74" stroke="#C23616" stroke-width="2.5"/>
    <path d="M12,18 C6,8 24,6 20,18 C26,8 36,18 24,26 Z" fill="#FF7675"/>
    <path d="M84,18 C90,8 72,6 76,18 C70,8 60,18 72,26 Z" fill="#FF7675"/>
    <ellipse cx="48" cy="56" rx="26" ry="18" fill="#EE5253"/>
    <circle cx="38" cy="32" r="5.5" fill="white" stroke="#991B1B"/>
    <circle cx="58" cy="32" r="5.5" fill="white" stroke="#991B1B"/>
    <circle cx="39" cy="32" r="2.5" fill="#1E293B"/>
    <circle cx="57" cy="32" r="2.5" fill="#1E293B"/>
    <path d="M42,58 Q48,64 54,58" stroke="#7F1D1D" stroke-width="1.8"/>
  </g>
</svg>`)
      },
      {
        name: 'claws-snapped',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#991B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M28,50 Q10,46 6,58" stroke="#C23616" stroke-width="2.5"/>
    <path d="M68,50 Q86,46 90,58" stroke="#C23616" stroke-width="2.5"/>
    <ellipse cx="24" cy="22" rx="9" ry="12" fill="#FF7675" transform="rotate(-20 24 22)"/>
    <ellipse cx="72" cy="22" rx="9" ry="12" fill="#FF7675" transform="rotate(20 72 22)"/>
    <line x1="20" y1="12" x2="28" y2="30" stroke="#991B1B" stroke-width="1.5"/>
    <line x1="76" y1="12" x2="68" y2="30" stroke="#991B1B" stroke-width="1.5"/>
    <ellipse cx="48" cy="56" rx="26" ry="18" fill="#EE5253"/>
    <circle cx="38" cy="32" r="5.5" fill="white" stroke="#991B1B"/>
    <circle cx="58" cy="32" r="5.5" fill="white" stroke="#991B1B"/>
    <path d="M42,58 Q48,54 54,58" stroke="#7F1D1D" stroke-width="1.8"/>
  </g>
</svg>`)
      },
      {
        name: 'scuttle-left',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#991B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-10 48 56)">
    <path d="M24,54 Q8,52 4,64" stroke="#C23616" stroke-width="2.5"/>
    <path d="M72,50 Q88,48 92,60" stroke="#C23616" stroke-width="2.5"/>
    <path d="M12,20 C6,10 24,8 20,20 Z" fill="#FF7675"/>
    <path d="M84,16 C90,6 72,4 76,16 Z" fill="#FF7675"/>
    <ellipse cx="48" cy="56" rx="26" ry="18" fill="#EE5253"/>
    <circle cx="38" cy="32" r="5.5" fill="white"/>
    <circle cx="58" cy="32" r="5.5" fill="white"/>
    <circle cx="36" cy="32" r="2.5" fill="#1E293B"/>
    <circle cx="56" cy="32" r="2.5" fill="#1E293B"/>
  </g>
</svg>`)
      },
      {
        name: 'cheering',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#991B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Claws raised high in celebration -->
    <path d="M30,46 Q14,24 16,10" stroke="#C23616" stroke-width="4"/>
    <path d="M66,46 Q82,24 80,10" stroke="#C23616" stroke-width="4"/>
    <path d="M8,4 C2,-4 20,-6 16,4 C22,-4 32,4 20,12 Z" fill="#FF7675"/>
    <path d="M88,4 C94,-4 76,-6 80,4 C74,-4 64,4 76,12 Z" fill="#FF7675"/>
    <ellipse cx="48" cy="56" rx="26" ry="18" fill="#EE5253"/>
    <circle cx="38" cy="32" r="5.5" fill="white"/>
    <circle cx="58" cy="32" r="5.5" fill="white"/>
    <circle cx="38" cy="31" r="2.5" fill="#1E293B"/>
    <circle cx="58" cy="31" r="2.5" fill="#1E293B"/>
    <path d="M40,56 Q48,66 56,56" fill="#D32F2F" stroke="#991B1B"/>
  </g>
</svg>`)
      }
    ]
  },

  // ── BEETLE ─────────────────────────────────────────────────────
  {
    name: 'Beetle',
    category: 'Animals',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#064E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M34,42 Q18,36 14,24" stroke="#064E3B" stroke-width="2.5"/>
    <path d="M32,54 Q14,54 10,58" stroke="#064E3B" stroke-width="2.5"/>
    <path d="M62,42 Q78,36 82,24" stroke="#064E3B" stroke-width="2.5"/>
    <path d="M64,54 Q82,54 86,58" stroke="#064E3B" stroke-width="2.5"/>
    <ellipse cx="48" cy="28" rx="12" ry="9" fill="#065F46"/>
    <ellipse cx="48" cy="38" rx="16" ry="8" fill="#047857"/>
    <circle cx="39" cy="26" r="3" fill="#FBBF24"/>
    <circle cx="57" cy="26" r="3" fill="#FBBF24"/>
    <ellipse cx="48" cy="62" rx="20" ry="24" fill="#10B981"/>
    <line x1="48" y1="46" x2="48" y2="86" stroke="#064E3B" stroke-width="1.5"/>
  </g>
</svg>`),
    costumes: [
      {
        name: 'crawling-a',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#064E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M34,42 Q18,36 14,24" stroke="#064E3B" stroke-width="2.5"/>
    <path d="M32,54 Q14,54 10,58" stroke="#064E3B" stroke-width="2.5"/>
    <path d="M62,42 Q78,36 82,24" stroke="#064E3B" stroke-width="2.5"/>
    <path d="M64,54 Q82,54 86,58" stroke="#064E3B" stroke-width="2.5"/>
    <ellipse cx="48" cy="28" rx="12" ry="9" fill="#065F46"/>
    <ellipse cx="48" cy="38" rx="16" ry="8" fill="#047857"/>
    <circle cx="39" cy="26" r="3" fill="#FBBF24"/>
    <circle cx="57" cy="26" r="3" fill="#FBBF24"/>
    <ellipse cx="48" cy="62" rx="20" ry="24" fill="#10B981"/>
    <line x1="48" y1="46" x2="48" y2="86" stroke="#064E3B" stroke-width="1.5"/>
  </g>
</svg>`)
      },
      {
        name: 'crawling-b',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#064E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M34,40 Q16,38 12,28" stroke="#064E3B" stroke-width="2.5"/>
    <path d="M32,56 Q16,58 12,64" stroke="#064E3B" stroke-width="2.5"/>
    <path d="M62,40 Q80,38 84,28" stroke="#064E3B" stroke-width="2.5"/>
    <path d="M64,56 Q80,58 84,64" stroke="#064E3B" stroke-width="2.5"/>
    <ellipse cx="48" cy="28" rx="12" ry="9" fill="#065F46"/>
    <ellipse cx="48" cy="38" rx="16" ry="8" fill="#047857"/>
    <circle cx="39" cy="26" r="3" fill="#FBBF24"/>
    <circle cx="57" cy="26" r="3" fill="#FBBF24"/>
    <ellipse cx="48" cy="62" rx="20" ry="24" fill="#10B981"/>
  </g>
</svg>`)
      },
      {
        name: 'wings-open',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#064E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Fluttering wings under shell -->
    <ellipse cx="30" cy="50" rx="20" ry="10" fill="#A7F3D0" opacity="0.8" transform="rotate(-30 30 50)"/>
    <ellipse cx="66" cy="50" rx="20" ry="10" fill="#A7F3D0" opacity="0.8" transform="rotate(30 66 50)"/>
    <!-- Shell split open -->
    <path d="M48,46 L24,70 Q20,84 32,84 L48,58 Z" fill="#059669"/>
    <path d="M48,46 L72,70 Q76,84 64,84 L48,58 Z" fill="#059669"/>
    <ellipse cx="48" cy="28" rx="12" ry="9" fill="#065F46"/>
    <circle cx="39" cy="26" r="3" fill="#FBBF24"/>
    <circle cx="57" cy="26" r="3" fill="#FBBF24"/>
  </g>
</svg>`)
      },
      {
        name: 'golden',
        src: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#78350F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="28" rx="12" ry="9" fill="#D97706"/>
    <ellipse cx="48" cy="38" rx="16" ry="8" fill="#F59E0B"/>
    <circle cx="39" cy="26" r="3" fill="#EF4444"/>
    <circle cx="57" cy="26" r="3" fill="#EF4444"/>
    <!-- Golden scarab shell -->
    <ellipse cx="48" cy="62" rx="20" ry="24" fill="#FBBF24"/>
    <line x1="48" y1="46" x2="48" y2="86" stroke="#B45309" stroke-width="2"/>
  </g>
</svg>`)
      }
    ]
  }
];
