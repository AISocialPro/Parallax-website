import React from 'react';
import { WaterfallMistCanvas } from '../components/WaterfallMistCanvas';
import { Sparkles, Wind } from 'lucide-react';
import { sound } from '../components/SoundEngine';

interface Scene2IslandsProps {
  scrollProgress: number; // 0 to 1 relative to scene 2
  mouseX: number;
  mouseY: number;
}

export const Scene2Islands: React.FC<Scene2IslandsProps> = ({ scrollProgress, mouseX, mouseY }) => {
  // Depth speed offsets
  const skyY = scrollProgress * 120;
  const farIslandsY = scrollProgress * 260;
  const mainIslandY = scrollProgress * 420;
  const bridgeY = scrollProgress * 580;
  const fgIslandY = scrollProgress * 800;

  // Island horizontal sway / levitation
  const sway1 = Math.sin(scrollProgress * Math.PI) * 20;

  return (
    <section
      id="scene-2"
      className="relative w-full h-[140vh] overflow-hidden bg-[#050b14] select-none"
    >
      {/* LAYER 1: Ethereal Dawn Atmosphere & Volumetric Sunbeams */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-75"
        style={{
          transform: `translate3d(${mouseX * 15}px, ${skyY + mouseY * 12}px, 0)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128] via-[#0d1e3d] to-[#06202e]" />
        
        {/* God Rays / Volumetric Light */}
        <div className="absolute -top-32 left-1/4 w-[800px] h-[700px] bg-gradient-to-b from-cyan-400/20 via-sky-300/10 to-transparent rotate-12 blur-3xl pointer-events-none" />
        <div className="absolute -top-40 right-1/3 w-[600px] h-[800px] bg-gradient-to-b from-indigo-400/15 via-emerald-300/10 to-transparent -rotate-12 blur-3xl pointer-events-none" />
      </div>

      {/* LAYER 2: Distant Floating Islets & Cloud Banks */}
      <div
        className="absolute top-[18%] inset-x-0 pointer-events-none z-10 transition-transform duration-100"
        style={{
          transform: `translate3d(${mouseX * -25}px, ${farIslandsY}px, 0)`,
        }}
      >
        {/* Distant Islet 1 (Left) */}
        <div className="absolute left-[10%] top-10 opacity-70 scale-75">
          <svg width="220" height="140" viewBox="0 0 220 140" fill="none">
            <path
              d="M20,50 Q60,35 110,40 Q170,45 200,60 Q170,110 110,130 Q60,110 20,50 Z"
              fill="#0f2942"
            />
            {/* Castle ruins silhouette */}
            <rect x="90" y="25" width="12" height="20" fill="#0c1d2e" />
            <rect x="110" y="18" width="15" height="27" fill="#0c1d2e" />
            <rect x="130" y="28" width="10" height="17" fill="#0c1d2e" />
          </svg>
        </div>

        {/* Distant Islet 2 (Right) */}
        <div className="absolute right-[12%] top-24 opacity-60 scale-90">
          <svg width="260" height="160" viewBox="0 0 260 160" fill="none">
            <path
              d="M30,60 Q90,45 150,50 Q220,55 240,70 Q200,135 140,150 Q70,130 30,60 Z"
              fill="#0d243b"
            />
            {/* Ancient arches */}
            <path d="M120,50 A15,15 0 0,1 150,50" stroke="#38bdf8" strokeWidth="2" fill="none" opacity="0.6" />
          </svg>
        </div>

        {/* Billowing Soft Clouds */}
        <div className="absolute top-36 left-0 right-0 h-44 bg-gradient-to-r from-cyan-900/10 via-sky-800/20 to-cyan-900/10 blur-2xl opacity-60" />
      </div>

      {/* LAYER 3: Main Massive Floating Island with Ancient Sanctum */}
      <div
        className="absolute top-[28%] left-1/2 -translate-x-1/2 pointer-events-none z-20 transition-transform duration-100"
        style={{
          transform: `translate3d(calc(-50% + ${mouseX * -45 + sway1}px), ${mainIslandY}px, 0)`,
        }}
      >
        <div className="relative w-[360px] sm:w-[580px] md:w-[780px]">
          <svg
            viewBox="0 0 780 460"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.8)]"
          >
            {/* Floating Island Rock Base */}
            <path
              d="M60,140 C140,110 320,120 480,110 C640,100 720,130 740,160 C700,260 560,380 420,440 C340,410 240,320 160,240 C100,210 50,170 60,140 Z"
              fill="url(#islandRockGrad)"
            />
            {/* Lush Upper Moss & Foliage Shelf */}
            <path
              d="M50,145 C150,115 310,125 480,115 C650,105 730,135 750,165 C680,185 540,180 420,185 C280,190 140,185 50,145 Z"
              fill="url(#mossGrad)"
            />
            
            {/* Ancient Solarpunk Temple / Monument Structure */}
            <g opacity="0.95">
              {/* Central Dome */}
              <path d="M360,115 A40,40 0 0,1 440,115 Z" fill="#0c1e33" stroke="#38bdf8" strokeWidth="1.5" />
              {/* Spire */}
              <line x1="400" y1="75" x2="400" y2="40" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="400" cy="38" r="4" fill="#38bdf8" className="animate-ping" />
              {/* Colonades */}
              <rect x="330" y="105" width="8" height="25" fill="#0f2845" />
              <rect x="350" y="100" width="8" height="30" fill="#0f2845" />
              <rect x="442" y="100" width="8" height="30" fill="#0f2845" />
              <rect x="462" y="105" width="8" height="25" fill="#0f2845" />
            </g>

            {/* Glowing Aether Crystal veins in rock fissures */}
            <path
              d="M320,210 L340,260 L330,310 L360,370"
              stroke="#38bdf8"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#glowFilter)"
              opacity="0.8"
            />
            <path
              d="M480,220 L460,270 L490,340"
              stroke="#818cf8"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#glowFilter)"
              opacity="0.75"
            />

            <defs>
              <linearGradient id="islandRockGrad" x1="400" y1="120" x2="400" y2="440" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1e293b" />
                <stop offset="0.4" stopColor="#0f172a" />
                <stop offset="0.85" stopColor="#080d1a" />
                <stop offset="1" stopColor="#030712" />
              </linearGradient>
              <linearGradient id="mossGrad" x1="400" y1="105" x2="400" y2="185" gradientUnits="userSpaceOnUse">
                <stop stopColor="#065f46" />
                <stop offset="0.5" stopColor="#047857" />
                <stop offset="1" stopColor="#0f172a" />
              </linearGradient>
              <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>
      </div>

      {/* Procedural Waterfalls & Airborne Mist */}
      <WaterfallMistCanvas mouseX={mouseX} />

      {/* LAYER 4: Suspended Bridge & Hanging Rock Fragment Tethers */}
      <div
        className="absolute top-[48%] left-0 right-0 pointer-events-none z-30 transition-transform duration-75"
        style={{
          transform: `translate3d(${mouseX * -65}px, ${bridgeY}px, 0)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-8 relative">
          <svg
            viewBox="0 0 1200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto opacity-70"
          >
            {/* Hanging suspension chains/vines */}
            <path
              d="M100,50 Q450,150 750,90"
              stroke="rgba(148, 163, 184, 0.4)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            {/* Suspended stepping stone slabs */}
            <polygon points="260,95 290,95 285,105 255,105" fill="#1e293b" />
            <polygon points="350,110 385,110 380,120 345,120" fill="#1e293b" />
            <polygon points="460,118 495,118 490,128 455,128" fill="#1e293b" />
            <polygon points="580,105 615,105 610,115 575,115" fill="#1e293b" />
          </svg>
        </div>
      </div>

      {/* LAYER 5: Foreground Floating Crags & Crystal Relic */}
      <div
        className="absolute -bottom-10 right-4 sm:right-16 pointer-events-none z-30 transition-transform duration-75"
        style={{
          transform: `translate3d(${mouseX * -95}px, ${fgIslandY}px, 0)`,
        }}
      >
        <div className="relative w-64 sm:w-80 h-72">
          <svg viewBox="0 0 320 300" fill="none" className="w-full h-full">
            <path
              d="M40,90 Q120,70 240,85 Q310,100 290,180 Q240,280 140,295 Q50,260 25,180 Z"
              fill="#060b14"
            />
            {/* Floating levitating crystal shard on the rock */}
            <polygon
              points="160,20 185,65 160,110 135,65"
              fill="#38bdf8"
              fillOpacity="0.75"
              stroke="#e0f2fe"
              strokeWidth="2"
              className="animate-float"
            />
          </svg>
        </div>
      </div>

      {/* STORYTELLING EDITORIAL CONTENT */}
      <div className="relative z-30 max-w-4xl mx-auto h-full flex flex-col justify-center px-6 sm:px-12 pointer-events-none">
        <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-cyan-400/20 max-w-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto">
          {/* Sector Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-emerald-300 font-semibold">
              SECTOR II // AETHER SANCTUARY
            </span>
          </div>

          <h2 className="font-cinematic text-3xl sm:text-5xl font-extrabold tracking-wide text-white uppercase text-glow mb-4">
            THE FLOATING <br />
            <span className="text-cyan-300">ISLANDS</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-6">
            Where gravity dissolves into clouds. Suspended landmasses drift through perpetual dawn, fed by eternal waterfalls that vanish into the radiant abyss below.
          </p>

          {/* Interactive Feature Cards */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10 font-mono text-xs">
            <div
              className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 flex flex-col gap-1 cursor-pointer hover:border-cyan-400 transition-colors"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              data-hover
              data-hover-text="INSPECT"
            >
              <div className="flex items-center gap-1.5 text-cyan-300 text-[11px]">
                <Wind className="w-3.5 h-3.5" />
                <span>GRAVITY NULL</span>
              </div>
              <span className="text-slate-400 text-[10px]">Harmonic equilibrium</span>
            </div>

            <div
              className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/20 flex flex-col gap-1 cursor-pointer hover:border-indigo-400 transition-colors"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              data-hover
              data-hover-text="ANALYZE"
            >
              <div className="flex items-center gap-1.5 text-indigo-300 text-[11px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CASCADE FLOW</span>
              </div>
              <span className="text-slate-400 text-[10px]">Closed-loop hydration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

