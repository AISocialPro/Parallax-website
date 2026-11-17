import React from 'react';
import { CyberRainCanvas } from '../components/CyberRainCanvas';
import { Building2, Cpu, Zap, Activity } from 'lucide-react';
import { sound } from '../components/SoundEngine';

interface Scene4FutureCityProps {
  scrollProgress: number; // 0 to 1 relative to scene 4
  mouseX: number;
  mouseY: number;
}

export const Scene4FutureCity: React.FC<Scene4FutureCityProps> = ({
  scrollProgress,
  mouseX,
  mouseY,
}) => {
  // Speed multipliers for city parallax
  const skyY = scrollProgress * 110;
  const farSkylineY = scrollProgress * 280;
  const midTowersY = scrollProgress * 460;
  const skywayY = scrollProgress * 620;
  const fgRooftopY = scrollProgress * 840;

  return (
    <section
      id="scene-4"
      className="relative w-full h-[140vh] overflow-hidden bg-[#030611] select-none"
    >
      {/* LAYER 1: Electric Smog Twilight Sky & Sweeping Searchlights */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-75"
        style={{
          transform: `translate3d(${mouseX * 15}px, ${skyY + mouseY * 12}px, 0)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#090b1c] via-[#110f2e] to-[#040817]" />
        
        {/* Dynamic Sweeping Searchlight Beams */}
        <div
          className="absolute -bottom-20 left-1/4 w-32 h-[800px] bg-gradient-to-t from-cyan-400/25 via-cyan-400/5 to-transparent origin-bottom blur-xl pointer-events-none"
          style={{
            transform: `rotate(${Math.sin(scrollProgress * 4) * 20 - 15}deg)`,
          }}
        />
        <div
          className="absolute -bottom-20 right-1/3 w-28 h-[800px] bg-gradient-to-t from-rose-500/20 via-rose-500/5 to-transparent origin-bottom blur-xl pointer-events-none"
          style={{
            transform: `rotate(${Math.cos(scrollProgress * 3.5) * 25 + 10}deg)`,
          }}
        />

        {/* Megastructure Skyline Hologram Halo */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[300px] bg-rose-600/15 rounded-full blur-[140px]" />
      </div>

      {/* LAYER 2: Distant Megatower Silhouettes & Window Grids */}
      <div
        className="absolute top-[20%] inset-x-0 pointer-events-none z-10 transition-transform duration-100"
        style={{
          transform: `translate3d(${mouseX * -30}px, ${farSkylineY}px, 0)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 opacity-75">
          <svg viewBox="0 0 1200 500" fill="none" className="w-full h-auto">
            {/* Distant Spire 1 */}
            <rect x="80" y="140" width="70" height="360" fill="#0b1126" />
            <polygon points="115,40 100,140 130,140" fill="#0b1126" />
            {/* Window rows */}
            <line x1="95" y1="160" x2="135" y2="160" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
            <line x1="95" y1="180" x2="135" y2="180" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
            <line x1="95" y1="200" x2="135" y2="200" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />

            {/* Distant Obelisk 2 */}
            <rect x="220" y="100" width="110" height="400" fill="#0d1430" />
            <polygon points="275,30 250,100 300,100" fill="#0d1430" />
            <circle cx="275" cy="25" r="3" fill="#f43f5e" className="animate-ping" />

            {/* Distant Mega-Arcology Center */}
            <polygon points="500,80 650,220 700,500 450,500" fill="#080d21" />
            <line x1="520" y1="260" x2="620" y2="260" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" opacity="0.8" />
            <line x1="510" y1="300" x2="640" y2="300" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" opacity="0.8" />
            <line x1="490" y1="340" x2="660" y2="340" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" opacity="0.8" />

            {/* Right Spire Cluster */}
            <rect x="880" y="120" width="80" height="380" fill="#0c1229" />
            <polygon points="920,40 905,120 935,120" fill="#0c1229" />
            <rect x="1000" y="160" width="100" height="340" fill="#090e21" />
          </svg>
        </div>
      </div>

      {/* Atmospheric Fog Sheet Layer */}
      <div className="absolute top-[40%] inset-x-0 h-48 bg-gradient-to-t from-cyan-950/20 via-rose-950/20 to-transparent pointer-events-none z-10 blur-3xl opacity-70" />

      {/* LAYER 3: Mid-Ground Cyberpunk Skyscraper Complexes & Neon Billboards */}
      <div
        className="absolute top-[32%] inset-x-0 pointer-events-none z-20 transition-transform duration-75"
        style={{
          transform: `translate3d(${mouseX * -50}px, ${midTowersY}px, 0)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <svg viewBox="0 0 1200 480" fill="none" className="w-full h-auto">
            {/* Heavy Megatower Left */}
            <rect x="40" y="80" width="160" height="400" fill="#060917" stroke="#1e293b" strokeWidth="1" />
            {/* Neon sign "NEXUS" */}
            <text x="75" y="140" fill="#f43f5e" fontFamily="monospace" fontSize="16" letterSpacing="4" fontWeight="bold" filter="url(#cityGlow)">
              NEXUS
            </text>
            {/* Illuminated window matrix */}
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={`win-${i}`}
                x1="60"
                y1={170 + i * 25}
                x2="180"
                y2={170 + i * 25}
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="6 4"
                opacity="0.85"
              />
            ))}

            {/* Angular Corporate Tower Right */}
            <polygon points="900,60 1120,120 1140,480 880,480" fill="#050814" stroke="#1e293b" strokeWidth="1" />
            {/* Neon sign "AETHEL" */}
            <text x="940" y="130" fill="#38bdf8" fontFamily="monospace" fontSize="18" letterSpacing="5" fontWeight="bold" filter="url(#cityGlow)">
              AETHEL // 09
            </text>
            {Array.from({ length: 9 }).map((_, i) => (
              <line
                key={`win2-${i}`}
                x1="910"
                y1={160 + i * 28}
                x2="1100"
                y2={160 + i * 28}
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="8 6"
                opacity="0.75"
              />
            ))}

            <defs>
              <filter id="cityGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>
      </div>

      {/* High-speed Flying Aerocar Streaks & Cyberpunk Rain */}
      <CyberRainCanvas mouseX={mouseX} />

      {/* LAYER 4: Elevated Skyway Highway Ribbon */}
      <div
        className="absolute top-[52%] inset-x-0 pointer-events-none z-20 transition-transform duration-75"
        style={{
          transform: `translate3d(${mouseX * -70}px, ${skywayY}px, 0)`,
        }}
      >
        <div className="w-full">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
            {/* Curving Transit Highway Bridge */}
            <path
              d="M-50,60 Q400,20 800,80 T1500,40"
              stroke="#0f172a"
              strokeWidth="16"
              fill="none"
            />
            {/* Luminescent road guide rails */}
            <path
              d="M-50,54 Q400,14 800,74 T1500,34"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="12 8"
              fill="none"
              opacity="0.8"
            />
            <path
              d="M-50,66 Q400,26 800,86 T1500,46"
              stroke="#f43f5e"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
          </svg>
        </div>
      </div>

      {/* LAYER 5: Foreground Rooftop Platform, Railings & Industrial Beacons */}
      <div
        className="absolute -bottom-8 inset-x-0 pointer-events-none z-30 transition-transform duration-75"
        style={{
          transform: `translate3d(${mouseX * -95}px, ${fgRooftopY}px, 0)`,
        }}
      >
        <div className="w-full">
          <svg viewBox="0 0 1440 220" fill="none" className="w-full h-auto">
            {/* Rooftop floor plate */}
            <path d="M-50,110 L1500,90 L1500,240 L-50,240 Z" fill="#020308" />
            {/* Industrial Railing */}
            <line x1="-50" y1="90" x2="1500" y2="70" stroke="#334155" strokeWidth="3" />
            {Array.from({ length: 30 }).map((_, i) => (
              <line
                key={`post-${i}`}
                x1={i * 50}
                y1={88 - i * 0.7}
                x2={i * 50}
                y2={110}
                stroke="#334155"
                strokeWidth="2"
              />
            ))}
            {/* Warning beacon lights */}
            <circle cx="180" cy="85" r="4" fill="#f43f5e" className="animate-ping" />
            <circle cx="720" cy="80" r="4" fill="#38bdf8" className="animate-ping" />
            <circle cx="1260" cy="73" r="4" fill="#f43f5e" className="animate-ping" />
          </svg>
        </div>
      </div>

      {/* Scanline CRT overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-20 z-30" />

      {/* EDITORIAL STORYTELLING CARD */}
      <div className="relative z-30 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 sm:px-12 pointer-events-none">
        <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-rose-500/20 max-w-xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] pointer-events-auto ml-auto">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-rose-300 font-semibold">
              SECTOR IV // THE FUTURE CITY
            </span>
          </div>

          <h2 className="font-cinematic text-3xl sm:text-5xl font-extrabold tracking-wide text-white uppercase text-glow mb-4">
            CHRONOS <br />
            <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-cyan-300 bg-clip-text text-transparent">
              METROPOLIS
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-6">
            A vertical civilization pulsating with synthetic life. Automated aerocars carve incandescent trails through towering mega-structures and atmospheric neon precipitation.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 font-mono text-xs">
            <div
              className="p-3 rounded-lg bg-rose-950/25 border border-rose-500/20 flex flex-col gap-1 cursor-pointer hover:border-rose-400 transition-colors"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              data-hover
              data-hover-text="DRONE"
            >
              <div className="flex items-center gap-1.5 text-rose-300 text-[11px]">
                <Activity className="w-3.5 h-3.5" />
                <span>GRID TRAFFIC</span>
              </div>
              <span className="text-slate-400 text-[10px]">98.4% Autonomous</span>
            </div>

            <div
              className="p-3 rounded-lg bg-cyan-950/25 border border-cyan-500/20 flex flex-col gap-1 cursor-pointer hover:border-cyan-400 transition-colors"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              data-hover
              data-hover-text="ENERGY"
            >
              <div className="flex items-center gap-1.5 text-cyan-300 text-[11px]">
                <Zap className="w-3.5 h-3.5" />
                <span>POWER CORE</span>
              </div>
              <span className="text-slate-400 text-[10px]">Zero-point reactor</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

