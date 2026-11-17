import React from 'react';
import { CosmicCanvas } from '../components/3D/CosmicCanvas';
import { Orbit, Compass, Radio, Shield } from 'lucide-react';
import { sound } from '../components/SoundEngine';

interface Scene3CosmicProps {
  scrollProgress: number; // 0 to 1 relative to scene 3
  mouseX: number;
  mouseY: number;
}

export const Scene3Cosmic: React.FC<Scene3CosmicProps> = ({ scrollProgress, mouseX, mouseY }) => {
  return (
    <section
      id="scene-3"
      className="relative w-full h-[140vh] overflow-hidden bg-[#02040a] select-none"
    >
      {/* 3D WebGL Three.js Cosmic Environment */}
      <CosmicCanvas scrollProgress={scrollProgress} mouseX={mouseX} mouseY={mouseY} />

      {/* Atmospheric Nebula Lighting Underlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-purple-900/25 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-20 w-[700px] h-[700px] bg-cyan-900/20 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-rose-900/10 rounded-full blur-[180px]" />
      </div>

      {/* Vignette depth framing */}
      <div className="absolute inset-0 vignette pointer-events-none z-10" />

      {/* Narrative & HUD Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto h-full flex flex-col justify-between p-6 sm:p-12 md:p-16 pointer-events-none">
        {/* Top HUD Telemetry */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-cyan-400/80 pointer-events-auto">
          <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-lg border border-cyan-500/20">
            <Orbit className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <span>ORBIT: APEX-9 // GAS GIANT</span>
          </div>
          <div className="flex items-center gap-3 glass-panel px-4 py-2 rounded-lg border border-white/5 text-slate-400">
            <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>GRAVITATIONAL ANOMALY DETECTED</span>
          </div>
        </div>

        {/* Center / Editorial Storytelling Box */}
        <div className="max-w-xl pointer-events-auto my-auto">
          <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-indigo-400/20 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-indigo-300 font-semibold">
                SECTOR III // THE COSMIC DIMENSION
              </span>
            </div>

            <h2 className="font-cinematic text-3xl sm:text-5xl font-extrabold tracking-wide text-white uppercase text-glow mb-4">
              THE CELESTIAL <br />
              <span className="bg-gradient-to-r from-purple-300 via-indigo-200 to-cyan-300 bg-clip-text text-transparent">
                EXPANSE
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-6">
              Traversing beyond planetary perimeters into the deep vacuum. Ancient polyhedral artifacts drift along the gravitational tides of colossal ringed giants and luminous nebulae.
            </p>

            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <button
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                data-hover
                data-hover-text="SCAN"
                className="px-5 py-2.5 rounded-full glass-panel-glow border border-indigo-400/40 text-cyan-200 font-mono text-xs tracking-widest hover:border-cyan-300 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-cyan-300" />
                INITIATE SCAN
              </button>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                WARP SHIELD: NOMINAL
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Coordinates & Depth HUD */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div>COORDINATES: RA 19h 50m / DEC +08°52′</div>
          <div className="hidden sm:block">DISTANCE: 4.28 LIGHT YEARS</div>
        </div>
      </div>
    </section>
  );
};

