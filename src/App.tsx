import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { SceneNavigator } from './components/SceneNavigator';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { Scene1Hero } from './scenes/Scene1Hero';
import { Scene2Islands } from './scenes/Scene2Islands';
import { Scene3Cosmic } from './scenes/Scene3Cosmic';
import { Scene4FutureCity } from './scenes/Scene4FutureCity';
import { Scene5Final } from './scenes/Scene5Final';
import { sound } from './components/SoundEngine';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentScene, setCurrentScene] = useState(0);
  const [totalScrollProgress, setTotalScrollProgress] = useState(0);
  const [sceneProgresses, setSceneProgresses] = useState<number[]>([0, 0, 0, 0, 0]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse move listener with normalized coordinates (-1 to 1)
  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth inertia loop for mouse coordinates
    const loop = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setMousePos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Scroll listener calculating global and per-scene progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const globalProgress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      setTotalScrollProgress(globalProgress);

      // Calculate progress for each section
      const sceneIds = ['scene-1', 'scene-2', 'scene-3', 'scene-4', 'scene-5'];
      const progresses: number[] = [];
      let activeIndex = 0;

      sceneIds.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (!el) {
          progresses.push(0);
          return;
        }

        const rect = el.getBoundingClientRect();
        const elTop = rect.top;
        const elHeight = rect.height;
        const windowHeight = window.innerHeight;

        // Progress from 0 when entering viewport bottom to 1 when scrolling past
        const rawProgress = (windowHeight - elTop) / (elHeight + windowHeight);
        const clampedProgress = Math.min(1, Math.max(0, rawProgress));
        progresses.push(clampedProgress);

        // Check if section is currently centered in viewport
        if (elTop <= windowHeight * 0.5 && elTop + elHeight >= windowHeight * 0.5) {
          activeIndex = idx;
        }
      });

      setSceneProgresses(progresses);
      if (activeIndex !== currentScene) {
        setCurrentScene(activeIndex);
        sound.setSceneTone(activeIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentScene]);

  // Jump to specific scene smoothly
  const jumpToScene = (index: number) => {
    const sceneIds = ['scene-1', 'scene-2', 'scene-3', 'scene-4', 'scene-5'];
    const el = document.getElementById(sceneIds[index]);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full bg-[#030712] text-slate-100 min-h-screen">
      {/* Custom Inertial Cursor */}
      <CustomCursor />

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Persistent Navigation Header */}
      <Navbar
        currentSceneIndex={currentScene}
        totalScenes={5}
        onJumpToScene={jumpToScene}
      />

      {/* Persistent Scene Navigator HUD */}
      <SceneNavigator
        currentScene={currentScene}
        totalScenes={5}
        scrollProgress={totalScrollProgress}
        onJumpToScene={jumpToScene}
      />

      {/* CINEMATIC JOURNEY SCENES */}
      <main className="relative w-full">
        {/* SCENE 1: THE BEGINNING (HERO) */}
        <Scene1Hero
          scrollProgress={sceneProgresses[0] || 0}
          mouseX={mousePos.x}
          mouseY={mousePos.y}
          onExploreClick={() => jumpToScene(1)}
        />

        {/* SCENE 2: THE FLOATING ISLANDS */}
        <Scene2Islands
          scrollProgress={sceneProgresses[1] || 0}
          mouseX={mousePos.x}
          mouseY={mousePos.y}
        />

        {/* SCENE 3: THE COSMIC DIMENSION */}
        <Scene3Cosmic
          scrollProgress={sceneProgresses[2] || 0}
          mouseX={mousePos.x}
          mouseY={mousePos.y}
        />

        {/* SCENE 4: THE FUTURE CITY */}
        <Scene4FutureCity
          scrollProgress={sceneProgresses[3] || 0}
          mouseX={mousePos.x}
          mouseY={mousePos.y}
        />

        {/* SCENE 5: THE FINAL DESTINATION */}
        <Scene5Final
          scrollProgress={sceneProgresses[4] || 0}
          mouseX={mousePos.x}
          mouseY={mousePos.y}
          onRestart={() => jumpToScene(0)}
        />
      </main>
    </div>
  );
};

export default App;

