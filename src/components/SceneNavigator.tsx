import React from 'react';
import { sound } from './SoundEngine';

interface SceneNavigatorProps {
  currentScene: number;
  totalScenes: number;
  scrollProgress: number; // 0 to 1
  onJumpToScene: (index: number) => void;
}

const SECTORS = [
  { id: 'scene-1', roman: 'I', name: 'The Beginning', tag: 'TERRA ORIGIN' },
  { id: 'scene-2', roman: 'II', name: 'Floating Islands', tag: 'AETHER SHORES' },
  { id: 'scene-3', roman: 'III', name: 'Cosmic Dimension', tag: 'VOID HORIZON' },
  { id: 'scene-4', roman: 'IV', name: 'The Future City', tag: 'NEO METROPOLIS' },
  { id: 'scene-5', roman: 'V', name: 'Final Destination', tag: 'SINGULARITY' },
];

export const SceneNavigator: React.FC<SceneNavigatorProps> = ({
  currentScene,
  scrollProgress,
  onJumpToScene,
}) => {
  return (
    <aside className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-6 select-none">
      {/* Progress track */}
      <div className="relative flex flex-col items-center gap-5">
        <div className="absolute top-2 bottom-2 w-[1px] bg-slate-800/80 -z-10 overflow-hidden">
          <div
            className="w-full bg-gradient-to-b from-cyan-400 via-indigo-500 to-rose-400 transition-all duration-300 origin-top"
            style={{ height: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
          />
        </div>

        {SECTORS.map((sector, index) => {
          const isActive = currentScene === index;
          return (
            <div
              key={sector.id}
              onClick={() => {
                sound.playClick();
                sound.playTransition();
                onJumpToScene(index);
              }}
              onMouseEnter={() => sound.playHover()}
              data-hover
              data-hover-text={`WARP ${sector.roman}`}
              className="relative group cursor-pointer py-1"
            >
              {/* Indicator Dot & Ring */}
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-3 h-3 rounded-full border transition-all duration-300 flex items-center justify-center ${
                    isActive
                      ? 'border-cyan-400 bg-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.9)] scale-125'
                      : 'border-slate-600 bg-slate-900 group-hover:border-cyan-400/80 group-hover:bg-cyan-900/40'
                  }`}
                >
                  {isActive && <div className="w-1 h-1 rounded-full bg-slate-950" />}
                </div>

                {/* Roman Numeral label */}
                <span
                  className={`absolute right-6 text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${
                    isActive
                      ? 'text-cyan-300 font-bold opacity-100'
                      : 'text-slate-500 opacity-60 group-hover:opacity-100 group-hover:text-slate-300'
                  }`}
                >
                  {sector.roman}
                </span>

                {/* Tooltip drawer on hover */}
                <div className="absolute right-12 whitespace-nowrap px-3 py-1 rounded-md glass-panel border border-cyan-400/20 text-xs font-mono text-cyan-200 pointer-events-none opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-xl">
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest">{sector.tag}</div>
                  <div className="font-semibold text-white">{sector.name}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Realtime Scroll % HUD */}
      <div className="mt-2 text-center">
        <span className="text-[10px] font-mono tracking-widest text-cyan-400/80 font-bold">
          {Math.round(scrollProgress * 100)}%
        </span>
        <div className="text-[8px] font-mono tracking-widest text-slate-600 uppercase">
          DEPTH
        </div>
      </div>
    </aside>
  );
};

