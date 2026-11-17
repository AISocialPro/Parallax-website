import React, { useState } from 'react';
import { PortalCanvas } from '../components/3D/PortalCanvas';
import { Compass, Sparkles, RotateCcw, Zap, ExternalLink, Heart } from 'lucide-react';
import { sound } from '../components/SoundEngine';

interface Scene5FinalProps {
  scrollProgress: number; // 0 to 1 relative to scene 5
  mouseX: number;
  mouseY: number;
  onRestart: () => void;
}

export const Scene5Final: React.FC<Scene5FinalProps> = ({
  scrollProgress,
  mouseX,
  mouseY,
  onRestart,
}) => {
  const [isHyperResonant, setIsHyperResonant] = useState(false);

  // Parallax layers for monolith pathway
  const pathY = scrollProgress * 300;
  const fgPillarsY = scrollProgress * 550;

  const handleResonanceTrigger = () => {
    sound.playClick();
    sound.playTransition();
    setIsHyperResonant(true);
    setTimeout(() => setIsHyperResonant(false), 2500);
  };

  return (
    <section
      id="scene-5"
      className="relative w-full h-[150vh] overflow-hidden bg-[#020307] select-none"
    >
      {/* LAYER 1: Deep Spacetime Vortex Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-gradient-to-tr from-cyan-600/25 via-indigo-600/20 to-rose-600/25 rounded-full blur-[160px] animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-cyan-400/20 rounded-full blur-[90px]" />
      </div>

      {/* LAYER 2: 3D Interactive Singularity Portal Gateway */}
      <PortalCanvas scrollProgress={scrollProgress} mouseX={mouseX} mouseY={mouseY} />

      {/* LAYER 3: Floating Ancient Monolith Pathway into Singularity */}
      <div
        className="absolute bottom-0 inset-x-0 pointer-events-none z-20 transition-transform duration-75"
        style={{
          transform: `translate3d(${mouseX * -35}px, ${pathY}px, 0)`,
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <svg viewBox="0 0 1000 350" fill="none" className="w-full h-auto">
            {/* Perspective Pathway leading to portal */}
            <polygon points="460,120 540,120 720,350 280,350" fill="url(#pathGrad)" opacity="0.8" />
            
            {/* Floating shattered monolith slabs */}
            <polygon points="340,240 400,220 420,270 360,290" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
            <polygon points="620,210 670,230 650,280 600,260" fill="#0f172a" stroke="#818cf8" strokeWidth="1" />
            <polygon points="480,180 520,170 535,210 495,220" fill="#0f172a" stroke="#f43f5e" strokeWidth="1" />

            <defs>
              <linearGradient id="pathGrad" x1="500" y1="120" x2="500" y2="350" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38bdf8" stopOpacity="0.6" />
                <stop offset="0.7" stopColor="#0f172a" stopOpacity="0.9" />
                <stop offset="1" stopColor="#020307" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* LAYER 4: Foreground Ancient Colonnade Silhouettes */}
      <div
        className="absolute -bottom-10 inset-x-0 pointer-events-none z-30 transition-transform duration-75"
        style={{
          transform: `translate3d(${mouseX * -75}px, ${fgPillarsY}px, 0)`,
        }}
      >
        <div className="w-full">
          <svg viewBox="0 0 1440 240" fill="none" className="w-full h-auto">
            {/* Left Colossal Pillar */}
            <rect x="60" y="20" width="70" height="220" fill="#020306" />
            <polygon points="50,20 140,20 120,40 70,40" fill="#020306" />
            {/* Right Colossal Pillar */}
            <rect x="1310" y="20" width="70" height="220" fill="#020306" />
            <polygon points="1300,20 1390,20 1370,40 1320,40" fill="#020306" />
          </svg>
        </div>
      </div>

      {/* CLIMAX EDITORIAL CONTENT */}
      <div className="relative z-30 max-w-4xl mx-auto h-full flex flex-col items-center justify-center text-center px-6 pt-24 pointer-events-none">
        <div className="pointer-events-auto flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel-glow border border-cyan-400/30 mb-6 animate-pulse-slow">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-xs font-mono tracking-[0.35em] uppercase text-cyan-200">
              SECTOR V // THE EVENT HORIZON
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="font-cinematic text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider text-white uppercase text-glow leading-[1.08] mb-6">
            YOUR JOURNEY <br />
            <span className="bg-gradient-to-r from-cyan-300 via-rose-300 to-indigo-300 bg-clip-text text-transparent">
              DOESN'T END
            </span> <br />
            HERE.
          </h2>

          {/* Supporting Text */}
          <p className="max-w-xl font-sans text-base sm:text-xl text-slate-300 tracking-wider font-light leading-relaxed mb-10">
            Reality is only the beginning. The dimensional singularity bends spacetime into boundless frontiers yet to be conceived.
          </p>

          {/* Buttons Group */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
            {/* Primary Action: Replay Journey */}
            <button
              onClick={() => {
                sound.playClick();
                sound.playTransition();
                onRestart();
              }}
              onMouseEnter={() => sound.playHover()}
              data-hover
              data-hover-text="RESTART"
              className="group relative px-9 py-4 rounded-full overflow-hidden glass-panel-glow border border-cyan-400/50 text-white font-mono text-xs tracking-[0.3em] uppercase transition-all duration-300 hover:scale-105 hover:border-cyan-300 hover:shadow-[0_0_40px_rgba(56,189,248,0.8)] flex items-center gap-3 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-cyan-300 group-hover:-rotate-180 transition-transform duration-700" />
              <span className="relative z-10 font-bold text-cyan-100">
                EXPLORE MORE // RESTART
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-cyan-500/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            {/* Resonance Shockwave Trigger */}
            <button
              onClick={handleResonanceTrigger}
              onMouseEnter={() => sound.playHover()}
              data-hover
              data-hover-text="PULSE"
              className="px-6 py-4 rounded-full glass-panel border border-white/10 text-slate-300 hover:text-white hover:border-rose-400/50 font-mono text-xs tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-rose-400" />
              <span>SINGULARITY RESONANCE</span>
            </button>
          </div>

          {/* Hyper Resonance notification */}
          {isHyperResonant && (
            <div className="fixed top-24 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full glass-panel-glow border border-cyan-400 text-cyan-300 font-mono text-xs tracking-widest animate-bounce z-50">
              WARP RESONANCE ENGAGED // 100% ENERGY
            </div>
          )}

          {/* Footer Credits */}
          <div className="pt-8 border-t border-white/10 w-full max-w-2xl flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-4">
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>INTO THE UNKNOWN &bull; EXPERIMENTAL INTERACTIVE PARALLAX</span>
            </div>
            <div>
              AWWWARDS EDITION // 2026
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

