import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, Compass, Sparkles } from 'lucide-react';
import { sound } from './SoundEngine';

interface NavbarProps {
  currentSceneIndex: number;
  totalScenes: number;
  onJumpToScene: (index: number) => void;
}

const SCENE_NAMES = [
  "I. THE BEGINNING",
  "II. FLOATING ISLANDS",
  "III. COSMIC DIMENSION",
  "IV. THE FUTURE CITY",
  "V. FINAL DESTINATION"
];

export const Navbar: React.FC<NavbarProps> = ({ currentSceneIndex, onJumpToScene }) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    sound.init();
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  const handleToggleFullscreen = () => {
    sound.playHover();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'py-3.5 glass-panel border-b border-cyan-500/10' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <div
          onClick={() => {
            sound.playClick();
            onJumpToScene(0);
          }}
          data-hover
          data-hover-text="ORIGIN"
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-8 h-8 rounded-full border border-cyan-400/40 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-cyan-300 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.5)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 group-hover:scale-110 transition-transform duration-500" />
            <Compass className="w-4 h-4 text-cyan-300 transition-transform duration-700 group-hover:rotate-180" />
          </div>
          <div>
            <h1 className="text-sm tracking-[0.35em] font-cinematic font-semibold text-white group-hover:text-cyan-200 transition-colors uppercase">
              Into The Unknown
            </h1>
            <p className="text-[10px] tracking-widest text-slate-400 font-mono hidden sm:block">
              EXPEDITION // 2026
            </p>
          </div>
        </div>

        {/* Center: Current Chapter status */}
        <div className="hidden lg:flex items-center gap-3 glass-panel px-4 py-1.5 rounded-full border border-white/5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono tracking-wider text-cyan-300 font-medium">
            {SCENE_NAMES[currentSceneIndex] || "EXPEDITION"}
          </span>
          <span className="text-slate-500 text-xs">|</span>
          <span className="text-xs font-mono text-slate-400">
            SECTOR 0{currentSceneIndex + 1} / 05
          </span>
        </div>

        {/* Right controls: Sound, Fullscreen, Warp jump */}
        <div className="flex items-center gap-3">
          {/* Audio toggle button with sound waves */}
          <button
            onClick={handleToggleSound}
            data-hover
            data-hover-text={isMuted ? "UNMUTE" : "MUTE"}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-full glass-panel border border-cyan-400/20 hover:border-cyan-400/50 hover:bg-cyan-500/10 text-cyan-200 transition-all text-xs font-mono group"
            title={isMuted ? "Enable Sound" : "Mute Sound"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-400 group-hover:text-cyan-300" />
            ) : (
              <div className="flex items-center gap-1">
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span className="flex items-end gap-[2px] h-3 ml-1">
                  <span className="w-[2px] h-2 bg-cyan-400 animate-pulse" />
                  <span className="w-[2px] h-3 bg-cyan-400 animate-pulse delay-100" />
                  <span className="w-[2px] h-1.5 bg-cyan-400 animate-pulse delay-200" />
                </span>
              </div>
            )}
            <span className="hidden md:inline text-[11px] font-medium tracking-wider">
              {isMuted ? "SOUND: OFF" : "AUDIO: ON"}
            </span>
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={handleToggleFullscreen}
            data-hover
            data-hover-text="SCREEN"
            className="w-8 h-8 rounded-full glass-panel border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-500/10 flex items-center justify-center text-slate-300 hover:text-cyan-200 transition-all"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};

