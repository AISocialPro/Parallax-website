import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';
import { sound } from './SoundEngine';

interface LoadingScreenProps {
  onComplete: () => void;
}

const STATUS_MESSAGES = [
  "INITIALIZING QUANTUM DEPTH MATRIX...",
  "COMPUTING 5-LAYER PARALLAX COORDINATES...",
  "CALIBRATING ATMOSPHERIC DENSITY & CLOUDS...",
  "SYNCHRONIZING CELESTIAL ORBITS & NEBULAS...",
  "MATERIALIZING NEO-METROPOLIS TRAFFIC VECTORS...",
  "ALIGNING EVENT HORIZON SINGULARITY...",
  "EXPERIENCE SYNTHESIZED // READY"
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Smooth artificial progression simulating asset & shader warmup
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        const increment = Math.max(1, Math.floor(Math.random() * 8) + 1);
        const next = Math.min(100, prev + increment);
        const nextStatus = Math.min(
          STATUS_MESSAGES.length - 1,
          Math.floor((next / 100) * (STATUS_MESSAGES.length - 1))
        );
        setStatusIdx(nextStatus);
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    sound.init();
    sound.playClick();
    sound.playTransition();
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 900);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] transition-opacity duration-1000 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Star Ambient Field */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-600/15 via-indigo-600/10 to-rose-600/15 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-lg px-6 text-center">
        {/* Animated Rotating Portal Ring Icon */}
        <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-cyan-400/20 border-dashed animate-spin-slow" />
          <div
            className="absolute inset-2 rounded-full border-2 border-t-cyan-400 border-r-indigo-400 border-b-transparent border-l-transparent animate-spin"
            style={{ animationDuration: '3s' }}
          />
          <div
            className="absolute inset-5 rounded-full border border-rose-400/30 border-dashed animate-spin"
            style={{ animationDuration: '8s', animationDirection: 'reverse' }}
          />
          <div className="w-12 h-12 rounded-full bg-slate-900/80 border border-cyan-300/40 flex items-center justify-center shadow-[0_0_25px_rgba(56,189,248,0.4)]">
            <Compass className="w-6 h-6 text-cyan-300 animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <h1 className="font-cinematic text-2xl md:text-3xl font-extrabold tracking-[0.4em] text-white uppercase text-glow mb-2">
          INTO THE UNKNOWN
        </h1>
        <p className="font-sans text-xs md:text-sm tracking-[0.25em] text-cyan-200/60 uppercase mb-8">
          Somewhere between imagination and reality
        </p>

        {/* Loading Bar & Percent */}
        <div className="w-full max-w-xs mb-4">
          <div className="flex justify-between items-center text-[11px] font-mono mb-2">
            <span className="text-slate-400 tracking-wider">EXPEDITION PROTOCOL</span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>
          <div className="h-[3px] w-full bg-slate-800 rounded-full overflow-hidden p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-rose-400 rounded-full transition-all duration-150 ease-out shadow-[0_0_12px_rgba(56,189,248,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Dynamic Status Log */}
        <p className="font-mono text-[10px] text-slate-500 tracking-widest uppercase h-4 transition-all duration-300 mb-8">
          {STATUS_MESSAGES[statusIdx]}
        </p>

        {/* Enter Button Once Ready */}
        <div className="h-12 flex items-center justify-center">
          {isReady ? (
            <button
              onClick={handleStart}
              data-hover
              data-hover-text="LAUNCH"
              className="group relative px-8 py-3 rounded-full overflow-hidden glass-panel-glow text-white font-mono text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:scale-105 active:scale-95 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] flex items-center gap-3"
            >
              <span className="relative z-10 flex items-center gap-2 font-bold text-cyan-100">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                ENTER THE EXPERIENCE
                <ArrowRight className="w-3.5 h-3.5 text-cyan-300 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-cyan-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          ) : (
            <div className="text-[11px] font-mono text-slate-600 tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              SYNCHRONIZING SHADERS...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

