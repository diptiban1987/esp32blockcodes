// Built-in high-end sprite library with colorful vector SVGs
const svg = (raw) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(raw)}`;

export const SPRITE_LIBRARY = [
  // ── ANIMALS ──────────────────────────────────────────────
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
  {
    name: 'Crab',
    category: 'Animals',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <radialGradient id="crabBodyGrad" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FF6B6B"/>
      <stop offset="60%" stop-color="#EE5253"/>
      <stop offset="100%" stop-color="#C23616"/>
    </radialGradient>
    <linearGradient id="crabClawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF7675"/>
      <stop offset="100%" stop-color="#D63031"/>
    </linearGradient>
  </defs>
  <g fill="none" stroke="#991B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Walking Legs Left -->
    <path d="M28,52 Q12,50 8,62" stroke="#C23616" stroke-width="2.5"/>
    <path d="M26,58 Q14,64 10,74" stroke="#C23616" stroke-width="2.5"/>
    <path d="M28,64 Q18,74 16,84" stroke="#C23616" stroke-width="2.5"/>
    <!-- Walking Legs Right -->
    <path d="M68,52 Q84,50 88,62" stroke="#C23616" stroke-width="2.5"/>
    <path d="M70,58 Q82,64 86,74" stroke="#C23616" stroke-width="2.5"/>
    <path d="M68,64 Q78,74 80,84" stroke="#C23616" stroke-width="2.5"/>
    <!-- Claw Arms -->
    <path d="M30,46 Q16,34 20,24" stroke="#C23616" stroke-width="4"/>
    <path d="M66,46 Q80,34 76,24" stroke="#C23616" stroke-width="4"/>
    <!-- Big Pincers Left -->
    <path d="M12,18 C6,8 24,6 20,18 C26,8 36,18 24,26 Z" fill="url(#crabClawGrad)"/>
    <!-- Big Pincers Right -->
    <path d="M84,18 C90,8 72,6 76,18 C70,8 60,18 72,26 Z" fill="url(#crabClawGrad)"/>
    <!-- Main Shell Body -->
    <ellipse cx="48" cy="56" rx="26" ry="18" fill="url(#crabBodyGrad)"/>
    <!-- Eye Stalks -->
    <line x1="40" y1="42" x2="38" y2="34" stroke="#C23616" stroke-width="3"/>
    <line x1="56" y1="42" x2="58" y2="34" stroke="#C23616" stroke-width="3"/>
    <circle cx="38" cy="32" r="5.5" fill="white" stroke="#991B1B"/>
    <circle cx="58" cy="32" r="5.5" fill="white" stroke="#991B1B"/>
    <circle cx="39" cy="32" r="2.5" fill="#1E293B"/>
    <circle cx="57" cy="32" r="2.5" fill="#1E293B"/>
    <circle cx="40" cy="31" r="1" fill="#FFFFFF"/>
    <circle cx="58" cy="31" r="1" fill="#FFFFFF"/>
    <!-- Smile -->
    <path d="M42,58 Q48,64 54,58" stroke="#7F1D1D" stroke-width="1.8"/>
    <!-- Blush -->
    <circle cx="34" cy="56" r="2.5" fill="#FF8787" opacity="0.8" stroke="none"/>
    <circle cx="62" cy="56" r="2.5" fill="#FF8787" opacity="0.8" stroke="none"/>
  </g>
</svg>`),
  },
  {
    name: 'Beetle',
    category: 'Animals',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <radialGradient id="beetleShell" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="45%" stop-color="#047857"/>
      <stop offset="100%" stop-color="#064E3B"/>
    </radialGradient>
    <linearGradient id="beetleHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6EE7B7" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#047857" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <g fill="none" stroke="#064E3B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Legs Left -->
    <path d="M34,42 Q18,36 14,24" stroke="#064E3B" stroke-width="2.5"/>
    <path d="M32,54 Q14,54 10,58" stroke="#064E3B" stroke-width="2.5"/>
    <path d="M34,68 Q18,74 14,86" stroke="#064E3B" stroke-width="2.5"/>
    <!-- Legs Right -->
    <path d="M62,42 Q78,36 82,24" stroke="#064E3B" stroke-width="2.5"/>
    <path d="M64,54 Q82,54 86,58" stroke="#064E3B" stroke-width="2.5"/>
    <path d="M62,68 Q78,74 82,86" stroke="#064E3B" stroke-width="2.5"/>
    <!-- Antennae / Mandibles -->
    <path d="M42,22 Q34,10 26,12" stroke="#064E3B" stroke-width="2"/>
    <path d="M54,22 Q62,10 70,12" stroke="#064E3B" stroke-width="2"/>
    <circle cx="26" cy="12" r="2" fill="#047857"/>
    <circle cx="70" cy="12" r="2" fill="#047857"/>
    <!-- Head & Thorax -->
    <ellipse cx="48" cy="28" rx="12" ry="9" fill="#065F46"/>
    <ellipse cx="48" cy="38" rx="16" ry="8" fill="#047857"/>
    <!-- Eyes -->
    <circle cx="39" cy="26" r="3" fill="#FBBF24" stroke="#78350F"/>
    <circle cx="57" cy="26" r="3" fill="#FBBF24" stroke="#78350F"/>
    <circle cx="39" cy="26" r="1.5" fill="#000"/>
    <circle cx="57" cy="26" r="1.5" fill="#000"/>
    <!-- Abdomen Shell -->
    <ellipse cx="48" cy="62" rx="20" ry="24" fill="url(#beetleShell)"/>
    <!-- Wing Seam Line -->
    <line x1="48" y1="42" x2="48" y2="86" stroke="#022C22" stroke-width="2"/>
    <!-- Shell Sheen Highlight -->
    <ellipse cx="40" cy="54" rx="6" ry="12" fill="url(#beetleHighlight)" stroke="none" transform="rotate(-15 40 54)"/>
  </g>
</svg>`),
  },

  // ── PEOPLE ───────────────────────────────────────────────
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
  },
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
  },
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
  },
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
  },
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
  },
  {
    name: 'Queen',
    category: 'People',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <linearGradient id="queenGown" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8B5CF6"/>
      <stop offset="100%" stop-color="#6D28D9"/>
    </linearGradient>
    <linearGradient id="queenGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="100%" stop-color="#F59E0B"/>
    </linearGradient>
  </defs>
  <g fill="none" stroke="#4C1D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Royal Gown / Body -->
    <path d="M28,52 L68,52 L78,88 L18,88 Z" fill="url(#queenGown)" stroke="#4C1D95"/>
    <path d="M38,52 L48,88 L58,52" fill="#7C3AED" stroke="#4C1D95" opacity="0.6"/>
    <!-- Gown Trim -->
    <rect x="24" y="84" width="48" height="4" rx="2" fill="url(#queenGold)" stroke="#B45309"/>
    <!-- Bodice & Royal Jewel -->
    <path d="M34,48 L62,48 L58,62 L38,62 Z" fill="#DDD6FE" stroke="#4C1D95"/>
    <circle cx="48" cy="55" r="3.5" fill="#EF4444" stroke="#991B1B"/>
    <!-- Arms -->
    <path d="M26,50 Q16,62 26,72" stroke="#FDE68A" stroke-width="3.5" fill="none"/>
    <path d="M70,50 Q80,62 70,72" stroke="#FDE68A" stroke-width="3.5" fill="none"/>
    <!-- Hair (behind & sides) -->
    <path d="M26,26 Q18,48 24,60 Q34,58 32,40 Z" fill="#78350F" stroke="#451A03"/>
    <path d="M70,26 Q78,48 72,60 Q62,58 64,40 Z" fill="#78350F" stroke="#451A03"/>
    <!-- Head / Face -->
    <circle cx="48" cy="34" r="15" fill="#FFEDD5" stroke="#4C1D95"/>
    <!-- Front Hair -->
    <path d="M33,26 Q48,18 63,26 Q48,22 33,26 Z" fill="#78350F" stroke="#451A03"/>
    <!-- Eyes with eyelashes -->
    <ellipse cx="42" cy="33" rx="2.5" ry="3" fill="#1E1B4B"/>
    <ellipse cx="54" cy="33" rx="2.5" ry="3" fill="#1E1B4B"/>
    <circle cx="41" cy="32" r="0.8" fill="#FFFFFF"/>
    <circle cx="53" cy="32" r="0.8" fill="#FFFFFF"/>
    <path d="M39,30 L38,28 M44,29 L45,27" stroke="#1E1B4B" stroke-width="1.2"/>
    <path d="M57,30 L58,28 M52,29 L51,27" stroke="#1E1B4B" stroke-width="1.2"/>
    <!-- Blush -->
    <circle cx="38" cy="37" r="2" fill="#FDA4AF" stroke="none" opacity="0.8"/>
    <circle cx="58" cy="37" r="2" fill="#FDA4AF" stroke="none" opacity="0.8"/>
    <!-- Smile -->
    <path d="M44,40 Q48,44 52,40" stroke="#E11D48" stroke-width="1.5" fill="none"/>
    <!-- Royal Crown -->
    <polygon points="34,22 37,12 43,18 48,8 53,18 59,12 62,22" fill="url(#queenGold)" stroke="#B45309" stroke-width="1.5"/>
    <circle cx="37" cy="12" r="1.5" fill="#EF4444" stroke="#991B1B" stroke-width="0.8"/>
    <circle cx="48" cy="8" r="1.8" fill="#3B82F6" stroke="#1D4ED8" stroke-width="0.8"/>
    <circle cx="59" cy="12" r="1.5" fill="#10B981" stroke="#047857" stroke-width="0.8"/>
  </g>
</svg>`),
  },

  // ── FANTASY ──────────────────────────────────────────────
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
  },
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
  },
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
  },
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
  },

  // ── SPORTS (NEW CATEGORY) ───────────────────────────────
  {
    name: 'Ball',
    category: 'Sports',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <radialGradient id="ballGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFE082"/>
      <stop offset="25%" stop-color="#FFB300"/>
      <stop offset="60%" stop-color="#FF6F00"/>
      <stop offset="100%" stop-color="#C43E00"/>
    </radialGradient>
    <radialGradient id="ballHighlight" cx="32%" cy="30%" r="35%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <!-- Ball Base Sphere -->
    <circle cx="48" cy="48" r="36" fill="url(#ballGrad)" stroke="#B23C00" stroke-width="2"/>
    <!-- Dynamic Decorative Swirl Bands -->
    <path d="M22,34 Q48,58 74,34" stroke="#FFF" stroke-width="3" fill="none" opacity="0.45"/>
    <path d="M22,62 Q48,38 74,62" stroke="#FFF" stroke-width="3" fill="none" opacity="0.45"/>
    <!-- 3D Glow / Specular Highlight -->
    <ellipse cx="38" cy="36" rx="20" ry="14" fill="url(#ballHighlight)"/>
    <circle cx="34" cy="30" r="4.5" fill="#FFFFFF" opacity="0.9"/>
  </g>
</svg>`),
  },
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
  },
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
  },
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
  },
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
  },
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
  },

  // ── MUSIC (NEW CATEGORY) ─────────────────────────────────
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
  },
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
  },
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
  },
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
  },

  // ── VEHICLES (NEW CATEGORY) ──────────────────────────────
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
  },
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
  },
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
  },

  // ── SPACE ────────────────────────────────────────────────
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
  },
  {
    name: 'Saturn',
    category: 'Space',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="48" cy="48" r="22" fill="#FFB74D"/>
    <ellipse cx="48" cy="48" rx="42" ry="12" stroke="#FFD54F" stroke-width="5" transform="rotate(-20 48 48)"/>
  </g>
</svg>`),
  },

  // ── THINGS ───────────────────────────────────────────────
  {
    name: 'Spaceship',
    category: 'Things',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#263238" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="48" cy="44" rx="40" ry="16" fill="#90A4AE"/>
    <ellipse cx="48" cy="36" rx="22" ry="18" fill="#80DEEA" opacity="0.8"/>
    <ellipse cx="48" cy="44" rx="34" ry="10" fill="#B0BEC5"/>
    <circle cx="28" cy="44" r="3" fill="#FFEB3B"/>
    <circle cx="48" cy="46" r="3" fill="#FFEB3B"/>
    <circle cx="68" cy="44" r="3" fill="#FFEB3B"/>
    <line x1="30" y1="58" x2="22" y2="76" stroke-width="3" stroke="#546E7A"/>
    <line x1="66" y1="58" x2="74" y2="76" stroke-width="3" stroke="#546E7A"/>
  </g>
</svg>`),
  },
  {
    name: 'Rocket',
    category: 'Things',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#212121" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M48,8 C34,28 32,56 36,72 L60,72 C64,56 62,28 48,8Z" fill="#ECEFF1"/>
    <circle cx="48" cy="40" r="8" fill="#29B6F6"/>
    <circle cx="48" cy="40" r="4" fill="#0288D1"/>
    <path d="M36,54 Q24,64 28,78 L36,68Z" fill="#FF5252"/>
    <path d="M60,54 Q72,64 68,78 L60,68Z" fill="#FF5252"/>
    <path d="M40,72 L40,84 Q48,92 56,84 L56,72Z" fill="#FF9800"/>
    <path d="M44,72 L44,80 Q48,86 52,80 L52,72Z" fill="#FFEB3B"/>
    <ellipse cx="48" cy="14" rx="4" ry="6" fill="#FF5252"/>
  </g>
</svg>`),
  },
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
  },
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
  },
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
  },
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
  },
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
  },
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
  },
  {
    name: 'Star',
    category: 'Things',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <polygon points="48,8 58,34 86,34 64,52 72,80 48,64 24,80 32,52 10,34 38,34" fill="#FFD54F" stroke="#FF6F00" stroke-width="2"/>
</svg>`),
  },
  {
    name: 'Ball',
    category: 'Things',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <circle cx="48" cy="48" r="34" fill="#FF3D00" stroke="#DD2C00" stroke-width="2"/>
  <path d="M20,32 Q48,24 76,32 M20,64 Q48,72 76,64" stroke="white" stroke-width="3" fill="none"/>
  <line x1="48" y1="14" x2="48" y2="82" stroke="white" stroke-width="3"/>
</svg>`),
  },
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
  },
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
  },
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
  },
  {
    name: 'Pot',
    category: 'Things',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <radialGradient id="potGrad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FB923C"/>
      <stop offset="50%" stop-color="#EA580C"/>
      <stop offset="100%" stop-color="#9A3412"/>
    </radialGradient>
    <linearGradient id="potRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FDBA74"/>
      <stop offset="50%" stop-color="#FB923C"/>
      <stop offset="100%" stop-color="#C2410C"/>
    </linearGradient>
  </defs>
  <g fill="none" stroke="#7C2D12" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Pot Side Handles -->
    <path d="M20,44 C10,44 10,58 22,60" stroke="#9A3412" stroke-width="3" fill="none"/>
    <path d="M76,44 C86,44 86,58 74,60" stroke="#9A3412" stroke-width="3" fill="none"/>
    <!-- Pot Body -->
    <path d="M24,36 L72,36 C76,52 74,74 64,84 L32,84 C22,74 20,52 24,36 Z" fill="url(#potGrad)"/>
    <!-- Decorative Belly Band -->
    <path d="M22,54 Q48,60 74,54" stroke="#FDBA74" stroke-width="2.5" opacity="0.6"/>
    <!-- Pot Top Rim -->
    <ellipse cx="48" cy="34" rx="28" ry="7" fill="url(#potRimGrad)" stroke="#7C2D12" stroke-width="1.5"/>
    <ellipse cx="48" cy="34" rx="22" ry="4" fill="#7C2D12" opacity="0.85"/>
    <!-- Plant / Green Sprout inside Pot -->
    <path d="M48,34 Q42,16 32,20 Q44,24 46,33" fill="#22C55E" stroke="#15803D" stroke-width="1.2"/>
    <path d="M48,34 Q54,12 66,16 Q54,22 50,33" fill="#16A34A" stroke="#15803D" stroke-width="1.2"/>
    <path d="M48,34 L48,16" stroke="#15803D" stroke-width="2"/>
    <circle cx="48" cy="14" r="2" fill="#4ADE80" stroke="#15803D"/>
  </g>
</svg>`),
  },

  // ── FOOD ─────────────────────────────────────────────────
  {
    name: 'Apple',
    category: 'Food',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <radialGradient id="appleGrad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FF6B6B"/>
      <stop offset="40%" stop-color="#EF4444"/>
      <stop offset="80%" stop-color="#DC2626"/>
      <stop offset="100%" stop-color="#991B1B"/>
    </radialGradient>
    <radialGradient id="appleHighlight" cx="30%" cy="25%" r="35%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <g fill="none" stroke="#7F1D1D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Apple Leaf -->
    <path d="M48,22 Q60,10 70,16 Q62,28 48,22 Z" fill="#22C55E" stroke="#15803D" stroke-width="1.5"/>
    <path d="M48,22 Q58,16 70,16" stroke="#15803D" stroke-width="1"/>
    <!-- Apple Stem -->
    <path d="M48,30 C46,18 52,12 56,8" stroke="#78350F" stroke-width="3.5" fill="none"/>
    <!-- Apple Main Body -->
    <path d="M48,32 C34,24 16,32 16,52 C16,74 36,86 48,84 C60,86 80,74 80,52 C80,32 62,24 48,32 Z" fill="url(#appleGrad)"/>
    <!-- Glossy Highlight -->
    <ellipse cx="34" cy="44" rx="8" ry="14" fill="url(#appleHighlight)" stroke="none" transform="rotate(-20 34 44)"/>
    <circle cx="30" cy="38" r="2.5" fill="#FFFFFF" opacity="0.9" stroke="none"/>
  </g>
</svg>`),
  },
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
  },
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
  },
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
  },
  {
    name: 'Apple',
    category: 'Food',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#B71C1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M48,26 Q36,18 24,28 Q10,42 22,66 Q36,88 48,76 Q60,88 74,66 Q86,42 72,28 Q60,18 48,26Z" fill="#FF1744"/>
    <path d="M48,24 Q52,14 48,8" stroke="#3E2723" stroke-width="3"/>
    <path d="M48,16 Q60,10 64,18Z" fill="#76FF03" stroke="#33691E"/>
  </g>
</svg>`),
  },
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
  },

  // ── NATURE ───────────────────────────────────────────────
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
  },
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
  },
  {
    name: 'Cloud',
    category: 'Nature',
    svg: svg(`<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <g fill="none" stroke="#0288D1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M26,64 L70,64 C80,64 86,54 80,44 C82,30 66,24 56,32 C48,20 30,24 30,38 C20,38 16,52 26,64Z" fill="#E0F7FA"/>
  </g>
</svg>`),
  },
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
  },
];
