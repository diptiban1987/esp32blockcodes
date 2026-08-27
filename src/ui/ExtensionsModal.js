import { Extension } from '../extensions';
import { techyblocksToolbox } from '../techyblocksToolbox';
import { refreshBlockSearch } from './blockSearch';
import { refreshIcons } from './icons';
import { showToast } from './ModeSwitcher';

const EXTENSIONS_LIBRARY = [
  {
    id: 'pen',
    name: 'Pen',
    description: 'Draw colorful graphics and artwork with your sprites.',
    color: '#0FBD8C',
    bannerSvg: `
      <svg viewBox="0 0 320 125" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="penBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#00A86B"/>
            <stop offset="100%" stop-color="#004D34"/>
          </linearGradient>
          <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FF3B30"/>
            <stop offset="25%" stop-color="#FF9500"/>
            <stop offset="50%" stop-color="#FFCC00"/>
            <stop offset="75%" stop-color="#34C759"/>
            <stop offset="100%" stop-color="#007AFF"/>
          </linearGradient>
          <filter id="glowPen" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <rect width="320" height="125" fill="url(#penBg)"/>
        <!-- Blueprint Grid Pattern -->
        <g opacity="0.12" stroke="#FFFFFF" stroke-width="1">
          <line x1="0" y1="20" x2="320" y2="20"/><line x1="0" y1="50" x2="320" y2="50"/><line x1="0" y1="80" x2="320" y2="80"/><line x1="0" y1="110" x2="320" y2="110"/>
          <line x1="40" y1="0" x2="40" y2="125"/><line x1="100" y1="0" x2="100" y2="125"/><line x1="160" y1="0" x2="160" y2="125"/><line x1="220" y1="0" x2="220" y2="125"/><line x1="280" y1="0" x2="280" y2="125"/>
        </g>
        <!-- Rainbow Drawing Ribbon -->
        <path d="M 15 95 C 65 95, 75 40, 130 45 C 180 50, 185 90, 230 70 C 250 60, 265 45, 285 35" fill="none" stroke="url(#rainbowGrad)" stroke-width="9" stroke-linecap="round" filter="url(#glowPen)"/>
        <path d="M 15 95 C 65 95, 75 40, 130 45 C 180 50, 185 90, 230 70 C 250 60, 265 45, 285 35" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
        <!-- Color Splashes & Sparkles -->
        <circle cx="85" cy="35" r="4.5" fill="#FFCC00" filter="url(#glowPen)"/>
        <circle cx="160" cy="85" r="4" fill="#34C759" filter="url(#glowPen)"/>
        <circle cx="210" cy="38" r="5" fill="#FF3B30" filter="url(#glowPen)"/>
        <circle cx="265" cy="85" r="3.5" fill="#00C7FF" filter="url(#glowPen)"/>
        <!-- 3D Illustrated Pen -->
        <g transform="translate(195, 8) rotate(35)" filter="drop-shadow(0px 8px 14px rgba(0,0,0,0.5))">
          <path d="M 12 10 L 28 10 L 28 65 L 12 65 Z" fill="#1E293B"/>
          <path d="M 12 10 L 20 10 L 20 65 L 12 65 Z" fill="#334155"/>
          <rect x="12" y="65" width="16" height="5" fill="#F1C40F"/>
          <path d="M 13 70 L 27 70 L 25 90 L 15 90 Z" fill="#E11D48"/>
          <polygon points="15,90 25,90 20,112" fill="#F59E0B"/>
          <polygon points="18,102 22,102 20,115" fill="#FFFFFF"/>
          <line x1="20" y1="95" x2="20" y2="108" stroke="#D97706" stroke-width="1.5"/>
          <rect x="25" y="15" width="4" height="35" rx="2" fill="#F1C40F"/>
        </g>
      </svg>`,
    tag: 'TechyBlocks Extension',
    isAvailable: true,
  },
  {
    id: 'music',
    name: 'Music',
    description: 'Play realistic instruments, drums, synthesizers and notes.',
    color: '#FFBF00',
    bannerSvg: `
      <svg viewBox="0 0 320 125" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="musicBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#EA580C"/>
            <stop offset="50%" stop-color="#D97706"/>
            <stop offset="100%" stop-color="#78350F"/>
          </linearGradient>
        </defs>
        <rect width="320" height="125" fill="url(#musicBg)"/>
        <!-- Equalizer Bars -->
        <g opacity="0.35" fill="#FFFFFF">
          <rect x="15" y="65" width="5" height="35" rx="2"/><rect x="25" y="45" width="5" height="55" rx="2"/>
          <rect x="35" y="30" width="5" height="70" rx="2"/><rect x="45" y="55" width="5" height="45" rx="2"/>
          <rect x="55" y="75" width="5" height="25" rx="2"/><rect x="65" y="40" width="5" height="60" rx="2"/>
          <rect x="75" y="25" width="5" height="75" rx="2"/><rect x="85" y="60" width="5" height="40" rx="2"/>
        </g>
        <!-- Piano Keyboard along bottom -->
        <g transform="translate(0, 85)">
          <rect x="0" y="0" width="320" height="40" fill="#FFFFFF"/>
          <g fill="#18181B">
            <rect x="18" y="0" width="10" height="23" rx="1"/><rect x="34" y="0" width="10" height="23" rx="1"/>
            <rect x="62" y="0" width="10" height="23" rx="1"/><rect x="78" y="0" width="10" height="23" rx="1"/>
            <rect x="94" y="0" width="10" height="23" rx="1"/><rect x="122" y="0" width="10" height="23" rx="1"/>
            <rect x="138" y="0" width="10" height="23" rx="1"/><rect x="166" y="0" width="10" height="23" rx="1"/>
            <rect x="182" y="0" width="10" height="23" rx="1"/><rect x="198" y="0" width="10" height="23" rx="1"/>
            <rect x="226" y="0" width="10" height="23" rx="1"/><rect x="242" y="0" width="10" height="23" rx="1"/>
            <rect x="270" y="0" width="10" height="23" rx="1"/><rect x="286" y="0" width="10" height="23" rx="1"/>
          </g>
          <g stroke="#CBD5E1" stroke-width="1">
            <line x1="14" y1="0" x2="14" y2="40"/><line x1="28" y1="0" x2="28" y2="40"/><line x1="42" y1="0" x2="42" y2="40"/>
            <line x1="56" y1="0" x2="56" y2="40"/><line x1="70" y1="0" x2="70" y2="40"/><line x1="84" y1="0" x2="84" y2="40"/>
            <line x1="98" y1="0" x2="98" y2="40"/><line x1="112" y1="0" x2="112" y2="40"/><line x1="126" y1="0" x2="126" y2="40"/>
            <line x1="140" y1="0" x2="140" y2="40"/><line x1="154" y1="0" x2="154" y2="40"/><line x1="168" y1="0" x2="168" y2="40"/>
            <line x1="182" y1="0" x2="182" y2="40"/><line x1="196" y1="0" x2="196" y2="40"/><line x1="210" y1="0" x2="210" y2="40"/>
          </g>
        </g>
        <!-- Drum & Sticks Illustration -->
        <g transform="translate(185, 14)" filter="drop-shadow(0 6px 14px rgba(0,0,0,0.45))">
          <ellipse cx="60" cy="42" rx="34" ry="15" fill="#DC2626"/>
          <path d="M 26 42 L 26 56 C 26 66, 94 66, 94 56 L 94 42 Z" fill="#991B1B"/>
          <ellipse cx="60" cy="42" rx="32" ry="13" fill="#F8FAFC"/>
          <ellipse cx="60" cy="42" rx="34" ry="15" fill="none" stroke="#E2E8F0" stroke-width="2.5"/>
          <line x1="22" y1="14" x2="56" y2="40" stroke="#FBBF24" stroke-width="4" stroke-linecap="round"/>
          <circle cx="56" cy="40" r="3.5" fill="#D97706"/>
          <line x1="98" y1="12" x2="65" y2="39" stroke="#FBBF24" stroke-width="4" stroke-linecap="round"/>
          <circle cx="65" cy="39" r="3.5" fill="#D97706"/>
        </g>
        <!-- 3D Musical Notes -->
        <g fill="#FEF08A" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))">
          <path d="M 115 18 L 138 12 L 138 30 L 115 36 Z"/>
          <circle cx="113" cy="38" r="7"/><circle cx="136" cy="32" r="7"/>
          <line x1="119" y1="18" x2="119" y2="38" stroke="#FEF08A" stroke-width="3"/>
          <line x1="142" y1="12" x2="142" y2="32" stroke="#FEF08A" stroke-width="3"/>
        </g>
      </svg>`,
    tag: 'Coming Soon',
    isAvailable: false,
  },
  {
    id: 'video_sensing',
    name: 'Video Sensing',
    description: 'Sense physical motion and gestures with your webcam.',
    color: '#15B8E6',
    bannerSvg: `
      <svg viewBox="0 0 320 125" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="videoBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0284C7"/>
            <stop offset="100%" stop-color="#0C4A6E"/>
          </linearGradient>
          <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#38BDF8"/>
            <stop offset="50%" stop-color="#0284C7"/>
            <stop offset="100%" stop-color="#0F172A"/>
          </linearGradient>
        </defs>
        <rect width="320" height="125" fill="url(#videoBg)"/>
        <!-- Radar Grid & Focus Crosshairs -->
        <g stroke="#38BDF8" stroke-width="1.5" opacity="0.35" fill="none">
          <circle cx="150" cy="62" r="48" stroke-dasharray="4 4"/>
          <circle cx="150" cy="62" r="28"/>
          <line x1="150" y1="6" x2="150" y2="118"/>
          <line x1="96" y1="62" x2="204" y2="62"/>
        </g>
        <!-- Motion Tracking Glow Bubbles -->
        <g opacity="0.8" fill="#38BDF8" filter="drop-shadow(0 0 8px rgba(56,189,248,0.7))">
          <circle cx="65" cy="40" r="14" fill-opacity="0.2" stroke="#38BDF8" stroke-width="2"/>
          <circle cx="65" cy="40" r="6"/>
          <circle cx="95" cy="80" r="10" fill-opacity="0.2" stroke="#38BDF8" stroke-width="1.5"/>
          <circle cx="95" cy="80" r="4"/>
        </g>
        <!-- 3D Studio Camera / Optical Lens -->
        <g transform="translate(180, 20)" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.5))">
          <rect x="18" y="12" width="84" height="60" rx="14" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
          <rect x="42" y="4" width="36" height="8" rx="3" fill="#334155"/>
          <circle cx="88" cy="24" r="4.5" fill="#EF4444"/>
          <circle cx="60" cy="42" r="23" fill="#0284C7" stroke="#67E8F9" stroke-width="3"/>
          <circle cx="60" cy="42" r="16" fill="url(#lensGrad)"/>
          <circle cx="60" cy="42" r="8" fill="#38BDF8"/>
          <path d="M 50 34 A 12 12 0 0 1 70 34" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" opacity="0.8"/>
        </g>
      </svg>`,
    tag: 'Coming Soon',
    isAvailable: false,
  },
  {
    id: 'face_sensing',
    name: 'Face Sensing (AI)',
    description: 'Detect faces, emotions, expressions, and poses with AI vision.',
    color: '#9966FF',
    bannerSvg: `
      <svg viewBox="0 0 320 125" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="aiBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#7C3AED"/>
            <stop offset="100%" stop-color="#3B0764"/>
          </linearGradient>
        </defs>
        <rect width="320" height="125" fill="url(#aiBg)"/>
        <!-- Neural Grid -->
        <g opacity="0.35" stroke="#C084FC" stroke-width="1.2" fill="#A855F7">
          <line x1="20" y1="30" x2="60" y2="70"/><line x1="60" y1="70" x2="110" y2="35"/>
          <line x1="60" y1="70" x2="80" y2="105"/><line x1="110" y1="35" x2="150" y2="60"/>
          <circle cx="20" cy="30" r="3.5"/><circle cx="60" cy="70" r="4.5"/><circle cx="110" cy="35" r="4"/>
          <circle cx="80" cy="105" r="3"/><circle cx="150" cy="60" r="3.5"/>
        </g>
        <!-- AI Biometric Face HUD -->
        <g transform="translate(180, 10)" filter="drop-shadow(0 6px 16px rgba(0,0,0,0.5))">
          <path d="M 12 24 L 12 12 L 24 12" fill="none" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
          <path d="M 88 12 L 100 12 L 100 24" fill="none" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
          <path d="M 12 80 L 12 92 L 24 92" fill="none" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
          <path d="M 88 92 L 100 92 L 100 80" fill="none" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
          <ellipse cx="56" cy="52" rx="28" ry="34" fill="#2E1065" stroke="#C084FC" stroke-width="2"/>
          <circle cx="44" cy="44" r="3.5" fill="#38BDF8"/>
          <circle cx="68" cy="44" r="3.5" fill="#38BDF8"/>
          <path d="M 44 64 Q 56 75 68 64" fill="none" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"/>
          <rect x="26" y="2" width="60" height="15" rx="4" fill="#38BDF8"/>
          <text x="56" y="13" font-size="9" font-weight="900" fill="#0F172A" text-anchor="middle" font-family="sans-serif">99.8% AI</text>
        </g>
      </svg>`,
    tag: 'Coming Soon',
    isAvailable: false,
  },
  {
    id: 'text2speech',
    name: 'Text to Speech',
    description: 'Make your sprites speak aloud with expressive, natural voices.',
    color: '#4C97FF',
    bannerSvg: `
      <svg viewBox="0 0 320 125" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="ttsBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2563EB"/>
            <stop offset="100%" stop-color="#1E3A8A"/>
          </linearGradient>
        </defs>
        <rect width="320" height="125" fill="url(#ttsBg)"/>
        <!-- Animated Voice Bars -->
        <g fill="#60A5FA" opacity="0.65">
          <rect x="25" y="52" width="6" height="24" rx="3"/><rect x="37" y="34" width="6" height="58" rx="3"/>
          <rect x="49" y="20" width="6" height="84" rx="3"/><rect x="61" y="40" width="6" height="46" rx="3"/>
          <rect x="73" y="52" width="6" height="24" rx="3"/><rect x="85" y="28" width="6" height="70" rx="3"/>
          <rect x="97" y="42" width="6" height="42" rx="3"/>
        </g>
        <!-- 3D Microphone & Speech Bubble -->
        <g transform="translate(195, 12)" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.45))">
          <path d="M 8 18 C 8 6, 82 6, 82 18 C 82 32, 60 38, 50 48 L 42 38 L 22 38 C 12 38, 8 30, 8 18 Z" fill="#FFFFFF"/>
          <rect x="24" y="20" width="4.5" height="10" rx="2" fill="#2563EB"/>
          <rect x="33" y="16" width="4.5" height="18" rx="2" fill="#3B82F6"/>
          <rect x="42" y="13" width="4.5" height="24" rx="2" fill="#60A5FA"/>
          <rect x="51" y="17" width="4.5" height="16" rx="2" fill="#3B82F6"/>
          <rect x="60" y="21" width="4.5" height="8" rx="2" fill="#2563EB"/>
          <rect x="54" y="54" width="22" height="38" rx="11" fill="#F8FAFC" stroke="#334155" stroke-width="2"/>
          <path d="M 46 68 C 46 84, 84 84, 84 68" fill="none" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/>
          <line x1="65" y1="84" x2="65" y2="100" stroke="#94A3B8" stroke-width="4"/>
          <ellipse cx="65" cy="100" rx="18" ry="4.5" fill="#64748B"/>
        </g>
      </svg>`,
    tag: 'Coming Soon',
    isAvailable: false,
  },
  {
    id: 'translate',
    name: 'Translate',
    description: 'Translate words and dialogue into 50+ world languages.',
    color: '#27AE60',
    bannerSvg: `
      <svg viewBox="0 0 320 125" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="transBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#059669"/>
            <stop offset="100%" stop-color="#064E3B"/>
          </linearGradient>
        </defs>
        <rect width="320" height="125" fill="url(#transBg)"/>
        <!-- Multilingual Speech Cards -->
        <g transform="translate(15, 14)" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.35))">
          <rect x="0" y="0" width="60" height="26" rx="8" fill="#FFFFFF"/>
          <text x="30" y="17" font-size="12.5" font-weight="900" fill="#059669" text-anchor="middle" font-family="sans-serif">Hello</text>
          <rect x="68" y="32" width="64" height="26" rx="8" fill="#34D399"/>
          <text x="100" y="49" font-size="11.5" font-weight="900" fill="#064E3B" text-anchor="middle" font-family="sans-serif">नमस्ते</text>
          <rect x="8" y="64" width="60" height="26" rx="8" fill="#A7F3D0"/>
          <text x="38" y="81" font-size="11.5" font-weight="900" fill="#065F46" text-anchor="middle" font-family="sans-serif">Hola</text>
        </g>
        <!-- 3D Global Earth -->
        <g transform="translate(195, 12)" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.45))">
          <circle cx="52" cy="52" r="44" fill="#10B981" stroke="#34D399" stroke-width="2"/>
          <path d="M 24 44 Q 38 24 58 32 Q 78 27 82 47 Q 87 67 62 77 Q 42 87 28 67 Z" fill="#047857"/>
          <path d="M 62 22 Q 78 18 88 30 Q 80 42 70 37 Z" fill="#047857"/>
          <ellipse cx="52" cy="52" rx="44" ry="18" fill="none" stroke="#A7F3D0" stroke-width="1.5" opacity="0.65"/>
          <ellipse cx="52" cy="52" rx="20" ry="44" fill="none" stroke="#A7F3D0" stroke-width="1.5" opacity="0.65"/>
        </g>
      </svg>`,
    tag: 'Coming Soon',
    isAvailable: false,
  },
  {
    id: 'microbit',
    name: 'micro:bit',
    description: 'Connect hardware, motion sensors, and physical computing.',
    color: '#00B5B5',
    bannerSvg: `
      <svg viewBox="0 0 320 125" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="ubitBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0891B2"/>
            <stop offset="100%" stop-color="#164E63"/>
          </linearGradient>
        </defs>
        <rect width="320" height="125" fill="url(#ubitBg)"/>
        <!-- Circuit traces -->
        <g stroke="#67E8F9" stroke-width="1.5" opacity="0.35" fill="none">
          <path d="M 0 30 L 40 30 L 60 50 L 120 50"/>
          <path d="M 0 90 L 50 90 L 70 70 L 130 70"/>
          <circle cx="120" cy="50" r="3" fill="#67E8F9"/>
          <circle cx="130" cy="70" r="3" fill="#67E8F9"/>
        </g>
        <!-- Realistic micro:bit Board Illustration -->
        <g transform="translate(160, 12)" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.5))">
          <rect x="0" y="0" width="128" height="96" rx="10" fill="#18181B" stroke="#3F3F46" stroke-width="2"/>
          <path d="M 10 0 L 118 0 C 118 10, 10 10, 10 0 Z" fill="#FACC15"/>
          <rect x="6" y="84" width="116" height="12" rx="2" fill="#EAB308"/>
          <g fill="#18181B">
            <rect x="22" y="84" width="4" height="12"/>
            <rect x="42" y="84" width="4" height="12"/>
            <rect x="62" y="84" width="4" height="12"/>
            <rect x="82" y="84" width="4" height="12"/>
            <rect x="102" y="84" width="4" height="12"/>
          </g>
          <circle cx="20" cy="48" r="8" fill="#3F3F46" stroke="#71717A" stroke-width="1.5"/>
          <text x="20" y="52" font-size="9" font-weight="900" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">A</text>
          <circle cx="108" cy="48" r="8" fill="#3F3F46" stroke="#71717A" stroke-width="1.5"/>
          <text x="108" y="52" font-size="9" font-weight="900" fill="#FFFFFF" text-anchor="middle" font-family="sans-serif">B</text>
          <!-- 5x5 Red Glowing LED Heart Matrix -->
          <g transform="translate(48, 26)">
            <circle cx="0" cy="0" r="2.5" fill="#3F3F46"/><circle cx="8" cy="0" r="2.5" fill="#EF4444"/><circle cx="16" cy="0" r="2.5" fill="#3F3F46"/><circle cx="24" cy="0" r="2.5" fill="#EF4444"/><circle cx="32" cy="0" r="2.5" fill="#3F3F46"/>
            <circle cx="0" cy="8" r="2.5" fill="#EF4444"/><circle cx="8" cy="8" r="2.5" fill="#EF4444"/><circle cx="16" cy="8" r="2.5" fill="#EF4444"/><circle cx="24" cy="8" r="2.5" fill="#EF4444"/><circle cx="32" cy="8" r="2.5" fill="#EF4444"/>
            <circle cx="0" cy="16" r="2.5" fill="#EF4444"/><circle cx="8" cy="16" r="2.5" fill="#EF4444"/><circle cx="16" cy="16" r="2.5" fill="#EF4444"/><circle cx="24" cy="16" r="2.5" fill="#EF4444"/><circle cx="32" cy="16" r="2.5" fill="#EF4444"/>
            <circle cx="0" cy="24" r="2.5" fill="#3F3F46"/><circle cx="8" cy="24" r="2.5" fill="#EF4444"/><circle cx="16" cy="24" r="2.5" fill="#EF4444"/><circle cx="24" cy="24" r="2.5" fill="#EF4444"/><circle cx="32" cy="24" r="2.5" fill="#3F3F46"/>
            <circle cx="0" cy="32" r="2.5" fill="#3F3F46"/><circle cx="8" cy="32" r="2.5" fill="#3F3F46"/><circle cx="16" cy="32" r="2.5" fill="#EF4444"/><circle cx="24" cy="32" r="2.5" fill="#3F3F46"/><circle cx="32" cy="32" r="2.5" fill="#3F3F46"/>
          </g>
        </g>
      </svg>`,
    tag: 'Coming Soon',
    isAvailable: false,
  },
  {
    id: 'makeymakey',
    name: 'Makey Makey',
    description: 'Transform everyday objects like fruits and foil into touchpads.',
    color: '#E11D48',
    bannerSvg: `
      <svg viewBox="0 0 320 125" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="makeyBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#BE123C"/>
            <stop offset="100%" stop-color="#4C0519"/>
          </linearGradient>
        </defs>
        <rect width="320" height="125" fill="url(#makeyBg)"/>
        <!-- Alligator Wires -->
        <path d="M 0 40 Q 60 10 110 55 T 200 55" fill="none" stroke="#FBBF24" stroke-width="3" opacity="0.6"/>
        <path d="M 0 85 Q 50 110 120 75 T 210 75" fill="none" stroke="#22C55E" stroke-width="3" opacity="0.6"/>
        <!-- Makey Makey Board -->
        <g transform="translate(170, 14)" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.5))">
          <rect x="0" y="0" width="120" height="90" rx="12" fill="#E11D48" stroke="#F43F5E" stroke-width="2"/>
          <!-- Gold D-Pad -->
          <path d="M 28 20 L 38 20 L 38 32 L 50 32 L 50 42 L 38 42 L 38 54 L 28 54 L 28 42 L 16 42 L 16 32 L 28 32 Z" fill="#FACC15"/>
          <!-- Gold Action Pads -->
          <circle cx="82" cy="28" r="9" fill="#FACC15"/>
          <circle cx="102" cy="48" r="9" fill="#FACC15"/>
          <rect x="18" y="70" width="84" height="10" rx="3" fill="#FACC15"/>
        </g>
      </svg>`,
    tag: 'Coming Soon',
    isAvailable: false,
  }
];

let _modalEl = null;
let _workspace = null;

function renderModal() {
  if (_modalEl) return _modalEl;

  const modal = document.createElement('div');
  modal.id = 'extensionsModalOverlay';
  modal.className = 'ext-modal-overlay';
  modal.style.display = 'none';

  modal.innerHTML = `
    <div class="ext-modal-container">
      <div class="ext-modal-header">
        <button class="ext-modal-back-btn" id="extModalBackBtn" title="Back">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <h2 class="ext-modal-title">Choose an Extension</h2>
        <div class="ext-search-wrapper">
          <svg class="ext-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" id="extSearchInput" class="ext-search-input" placeholder="Search extensions..." autocomplete="off" />
        </div>
        <button class="ext-modal-close-btn" id="extModalCloseBtn" title="Close">✕</button>
      </div>

      <div class="ext-modal-body">
        <div class="ext-cards-grid" id="extCardsGrid"></div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeExtensionsModal();
  });

  const closeBtn = modal.querySelector('#extModalCloseBtn');
  const backBtn = modal.querySelector('#extModalBackBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeExtensionsModal);
  if (backBtn) backBtn.addEventListener('click', closeExtensionsModal);

  const searchInput = modal.querySelector('#extSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      populateCards(e.target.value.trim().toLowerCase());
    });
  }

  _modalEl = modal;
  return modal;
}

function populateCards(filter = '') {
  const grid = document.getElementById('extCardsGrid');
  if (!grid) return;

  grid.innerHTML = '';

  const filtered = EXTENSIONS_LIBRARY.filter((ext) => {
    if (!filter) return true;
    return (
      ext.name.toLowerCase().includes(filter) ||
      ext.description.toLowerCase().includes(filter) ||
      ext.tag.toLowerCase().includes(filter)
    );
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="ext-empty-state">
        <p>No extensions found matching "<strong>${filter}</strong>".</p>
      </div>
    `;
    return;
  }

  filtered.forEach((ext) => {
    const isAdded = Extension.isExtensionActive(ext.id);
    const card = document.createElement('div');
    card.className = `ext-card ${isAdded ? 'is-added' : ''} ${!ext.isAvailable ? 'is-coming-soon' : ''}`;
    card.setAttribute('data-id', ext.id);

    card.innerHTML = `
      <div class="ext-card-banner">
        ${ext.bannerSvg}
        <span class="ext-card-tag">${ext.tag}</span>
      </div>
      <div class="ext-card-content">
        <div class="ext-card-title-row">
          <h3 class="ext-card-name">${ext.name}</h3>
          ${isAdded ? '<span class="ext-badge-added">✓ Added</span>' : ''}
        </div>
        <p class="ext-card-desc">${ext.description}</p>
      </div>
    `;

    card.addEventListener('click', () => handleExtensionClick(ext));
    grid.appendChild(card);
  });
}

function handleExtensionClick(ext) {
  if (!ext.isAvailable) {
    showToast(`🚀 ${ext.name} extension is coming soon in the next update!`);
    return;
  }

  if (Extension.isExtensionActive(ext.id)) {
    showToast(`ℹ️ ${ext.name} is already added in your workspace.`);
    closeExtensionsModal();
    selectToolboxCategory(ext.name);
    return;
  }

  // Activate extension
  Extension.activateExtension(ext.id);

  if (_workspace) {
    try {
      const updatedToolbox = Extension.applyExtensionsToToolbox(techyblocksToolbox);
      _workspace.updateToolbox(updatedToolbox);
      refreshBlockSearch(updatedToolbox);
    } catch (err) {
      console.warn('[Extension] Error updating toolbox:', err);
    }
  }

  closeExtensionsModal();
  showToast(`✨ ${ext.name} extension added to workspace!`);

  setTimeout(() => {
    selectToolboxCategory(ext.name);
    refreshIcons();
  }, 100);
}

function selectToolboxCategory(categoryName) {
  try {
    const categories = document.querySelectorAll('.blocklyToolboxCategory');
    for (const cat of categories) {
      const label = cat.querySelector('.blocklyToolboxCategoryLabel');
      if (label && label.textContent.trim().toLowerCase() === categoryName.toLowerCase()) {
        cat.click();
        cat.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        break;
      }
    }
  } catch (_) {}
}

export function openExtensionsModal(ws) {
  if (ws) _workspace = ws;
  const modal = renderModal();
  populateCards('');
  const searchInput = modal.querySelector('#extSearchInput');
  if (searchInput) searchInput.value = '';
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  if (searchInput) setTimeout(() => searchInput.focus(), 150);
}

export function closeExtensionsModal() {
  if (_modalEl) {
    _modalEl.style.display = 'none';
  }
  document.body.style.overflow = '';
}

export function initExtensionsModal(ws) {
  if (ws) _workspace = ws;
  renderModal();

  const headerBtn = document.getElementById('headerExtensionBtn');
  if (headerBtn) {
    headerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openExtensionsModal(_workspace);
    });
  }

  const stickyBtn = document.getElementById('scratchStickyExtBtn');
  if (stickyBtn) {
    stickyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openExtensionsModal(_workspace);
    });
  }
}
