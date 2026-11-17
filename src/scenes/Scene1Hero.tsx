import React, { useRef } from 'react';
import { ChevronDown, Compass, Sparkles } from 'lucide-react';
import { EmbersCanvas } from '../components/EmbersCanvas';
import { sound } from '../components/SoundEngine';

interface Scene1HeroProps {
  scrollProgress: number; // 0 to 1
  mouseX: number;
  mouseY: number;
  onExploreClick: () => void;
}

export const Scene1Hero: React.FC<Scene1HeroProps> = ({
  scrollProgress,
  mouseX,
  mouseY,
  onExploreClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax speed calculation for layers
  // As user scrolls:
  // Layer 1 (Sky): moves slowly (0.1x)
  // Layer 2 (Moon): moves moderately (0.25x) + scales
  // Layer 3 (Far Mountains): moves at 0.45x
  // Layer 4 (Mid Mountains): moves at 0.75x
  // Layer 5 (Foreground): moves fast (1.3x)
  const skyY = scrollProgress * 100;
  const moonY = scrollProgress * 220;
  const moonScale = 1 + scrollProgress * 0.3;
  const farMtnY = scrollProgress * 300;
  const midMtnY = scrollProgress * 480;
  const fgMtnY = scrollProgress * 700;

  // Title fade and blur as we descend
  const titleOpacity = Math.max(0, 1 - scrollProgress * 2.2);
  const titleY = -scrollProgress * 250;
  const titleBlur = scrollProgress * 15;

  return (
    <section
      ref={containerRef}
      id="scene-1"
      className="relative w-full h-[140vh] overflow-hidden bg-[#030712] select-none"
    >
      {/* LAYER 1: Deep Cosmic Gradient Sky & Stars */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${mouseX * 10}px, ${skyY + mouseY * 10}px, 0)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#090d24] to-[#1e1b4b]" />
        
        {/* Celestial Starfield Backdrop */}
        <div className="absolute inset-0 opacity-80 bg-[radial-gradient(1px_1px_at_20px_30px,#fff,transparent),radial-gradient(1.5px_1.5px_at_120px_180px,#38bdf8,transparent),radial-gradient(1px_1px_at_280px_90px,#cbd5e1,transparent),radial-gradient(1.5px_1.5px_at_450px_320px,#f43f5e,transparent),radial-gradient(1.2px_1.2px_at_650px_140px,#fff,transparent),radial-gradient(1.5px_1.5px_at_890px_220px,#818cf8,transparent)] [background-size:550px_550px]" />
        
        {/* Soft Cosmic Aurora / Nebula Cloud */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-[130px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-cyan-600/15 rounded-full blur-[120px]" />
      </div>

      {/* LAYER 2: Gigantic Mystical Moon / Planet with Corona */}
      <div
        className="absolute top-[8%] left-1/2 -translate-x-1/2 pointer-events-none transition-transform duration-100 ease-out z-10"
        style={{
          transform: `translate3d(calc(-50% + ${mouseX * 25}px), ${moonY + mouseY * 20}px, 0) scale(${moonScale})`,
        }}
      >
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] rounded-full flex items-center justify-center">
          {/* Corona Glow Rings */}
          <div className="absolute -inset-10 rounded-full bg-cyan-400/15 blur-[60px] animate-pulse-slow" />
          <div className="absolute -inset-4 rounded-full bg-indigo-500/20 blur-[40px]" />
          
          {/* Moon Core with Crater Details */}
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#94a3b8] relative overflow-hidden shadow-[inset_-25px_-25px_60px_rgba(2,6,23,0.95),0_0_80px_rgba(56,189,248,0.25)] border border-cyan-300/20">
            {/* Crater shadows */}
            <div className="absolute top-12 left-16 w-20 h-20 rounded-full bg-slate-900/40 blur-xs shadow-inner" />
            <div className="absolute top-36 left-48 w-28 h-28 rounded-full bg-slate-900/35 blur-xs shadow-inner" />
            <div className="absolute bottom-16 left-28 w-16 h-16 rounded-full bg-slate-900/30 blur-xs shadow-inner" />
            <div className="absolute top-24 right-20 w-12 h-12 rounded-full bg-slate-900/40 blur-xs shadow-inner" />
            
            {/* Moon Atmospheric Rim Light */}
            <div className="absolute inset-0 rounded-full shadow-[inset_15px_15px_40px_rgba(186,230,253,0.45)]" />
          </div>
        </div>
      </div>

      {/* LAYER 2.5: Atmospheric Drifting Clouds / Fog */}
      <div
        className="absolute top-[30%] inset-x-0 h-96 pointer-events-none opacity-40 z-10 transition-transform duration-150"
        style={{
          transform: `translate3d(${mouseX * -30}px, ${farMtnY * 0.7}px, 0)`,
        }}
      >
        <div className="w-full h-full bg-gradient-to-t from-transparent via-cyan-950/30 to-transparent blur-3xl" />
      </div>

      {/* LAYER 3: Distant Jagged Mountains */}
      <div
        className="absolute bottom-0 inset-x-0 pointer-events-none z-10 transition-transform duration-75"
        style={{
          transform: `translate3d(${mouseX * -35}px, ${farMtnY}px, 0)`,
        }}
      >
        <svg
          viewBox="0 0 1440 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto object-cover opacity-85"
          preserveAspectRatio="none"
        >
          <path
            d="M0,320 L120,240 L280,310 L440,180 L620,280 L760,160 L920,260 L1080,190 L1260,290 L1440,210 L1440,480 L0,480 Z"
            fill="url(#distantMtnGrad)"
          />
          <defs>
            <linearGradient id="distantMtnGrad" x1="720" y1="160" x2="720" y2="480" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1e1b4b" stopOpacity="0.9" />
              <stop offset="0.6" stopColor="#0c112e" />
              <stop offset="1" stopColor="#030712" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* LAYER 4: Middle-Ground Ridge & Ancient Spire Monoliths */}
      <div
        className="absolute bottom-0 inset-x-0 pointer-events-none z-20 transition-transform duration-75"
        style={{
          transform: `translate3d(${mouseX * -55}px, ${midMtnY}px, 0)`,
        }}
      >
        <svg
          viewBox="0 0 1440 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto object-cover"
          preserveAspectRatio="none"
        >
          <path
            d="M0,280 L180,340 L340,210 L520,300 L680,180 L840,310 L1020,200 L1200,290 L1360,190 L1440,240 L1440,420 L0,420 Z"
            fill="url(#midMtnGrad)"
          />
          {/* Glowing Monolith Pillars */}
          <polygon points="335,210 345,160 355,210" fill="#38bdf8" fillOpacity="0.4" />
          <polygon points="675,180 680,120 685,180" fill="#818cf8" fillOpacity="0.5" />
          <polygon points="1015,200 1020,135 1025,200" fill="#38bdf8" fillOpacity="0.4" />
          <defs>
            <linearGradient id="midMtnGrad" x1="720" y1="120" x2="720" y2="420" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0f172a" />
              <stop offset="0.7" stopColor="#060a17" />
              <stop offset="1" stopColor="#030712" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Atmospheric Mist Separator */}
      <div className="absolute bottom-24 inset-x-0 h-32 bg-gradient-to-t from-cyan-950/40 via-transparent to-transparent pointer-events-none z-20 blur-xl" />

      {/* LAYER 5: Foreground High-Detail Silhouettes */}
      <div
        className="absolute -bottom-10 inset-x-0 pointer-events-none z-30 transition-transform duration-75"
        style={{
          transform: `translate3d(${mouseX * -80}px, ${fgMtnY}px, 0)`,
        }}
      >
        <svg
          viewBox="0 0 1440 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto object-cover"
          preserveAspectRatio="none"
        >
          <path
            d="M-50,180 Q150,70 380,160 T850,110 T1320,170 T1500,100 L1500,320 L-50,320 Z"
            fill="#02040a"
          />
        </svg>
      </div>

      {/* Atmospheric Glowing Embers reacting to cursor */}
      <EmbersCanvas mouseX={mouseX} mouseY={mouseY} />

      {/* CINEMATIC HERO TYPOGRAPHY & INTERACTIVE CALL TO ACTION */}
      <div
        className="relative z-30 max-w-5xl mx-auto h-screen flex flex-col items-center justify-center text-center px-6 pt-16 transition-all duration-100 ease-out"
        style={{
          opacity: titleOpacity,
          transform: `translate3d(0, ${titleY}px, 0)`,
          filter: `blur(${titleBlur}px)`,
        }}
      >
        {/* Subtitle Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel-glow mb-6 animate-pulse-slow">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-cyan-200">
            A Cinematic Parallax Odyssey
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-cinematic text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.12em] text-white uppercase text-glow leading-[1.08] mb-6">
          THE WORLD IS <br />
          <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent">
            BIGGER THAN
          </span> <br />
          YOU IMAGINE.
        </h1>

        {/* Supporting Text */}
        <p className="max-w-xl font-sans text-base sm:text-lg md:text-xl text-slate-300 tracking-wider font-light leading-relaxed mb-10">
          An interactive journey beyond the boundaries of reality. Scroll to traverse across dimensions of light, matter, and imagination.
        </p>

        {/* Interactive Explore Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => {
              sound.playClick();
              sound.playTransition();
              onExploreClick();
            }}
            onMouseEnter={() => sound.playHover()}
            data-hover
            data-hover-text="BEGIN"
            className="group relative px-9 py-4 rounded-full overflow-hidden glass-panel-glow border border-cyan-400/40 text-white font-mono text-xs tracking-[0.3em] uppercase transition-all duration-300 hover:scale-105 hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] flex items-center gap-3 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-cyan-300 group-hover:rotate-90 transition-transform duration-500" />
            <span className="relative z-10 font-bold text-cyan-100">
              EXPLORE THE UNKNOWN
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-cyan-500/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>

        {/* Scroll-down indicator */}
        <div
          onClick={() => {
            sound.playClick();
            onExploreClick();
          }}
          data-hover
          data-hover-text="SCROLL"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] text-cyan-300/80 uppercase group-hover:text-cyan-200 transition-colors">
            SCROLL TO DESCEND
          </span>
          <div className="w-5 h-9 rounded-full border border-cyan-400/30 flex items-start justify-center p-1 group-hover:border-cyan-400 transition-colors">
            <div className="w-1.5 h-2.5 rounded-full bg-cyan-400 animate-bounce" />
          </div>
          <ChevronDown className="w-4 h-4 text-cyan-400/60 animate-pulse -mt-1" />
        </div>
      </div>
    </section>
  );
};

