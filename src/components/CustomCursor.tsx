import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.documentElement.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('button, a, [data-hover], input');
      if (interactiveEl) {
        setIsHovered(true);
        const text = interactiveEl.getAttribute('data-hover-text');
        setHoverText(text);
      } else {
        setIsHovered(false);
        setHoverText(null);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [isVisible]);

  // Inertial smooth lerp for the outer ring
  useEffect(() => {
    const loop = () => {
      setPos((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.18,
        y: prev.y + (targetPos.y - prev.y) * 0.18,
      }));
      requestRef.current = requestAnimationFrame(loop);
    };
    requestRef.current = requestAnimationFrame(loop);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [targetPos]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Glow Ring */}
      <div
        className="fixed top-0 left-0 transition-transform duration-75 ease-out rounded-full border pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          width: isHovered ? '64px' : isClicking ? '28px' : '40px',
          height: isHovered ? '64px' : isClicking ? '28px' : '40px',
          borderColor: isHovered ? 'rgba(56, 189, 248, 0.9)' : 'rgba(129, 140, 248, 0.4)',
          backgroundColor: isHovered ? 'rgba(56, 189, 248, 0.12)' : 'rgba(56, 189, 248, 0.02)',
          boxShadow: isHovered
            ? '0 0 24px rgba(56, 189, 248, 0.5), inset 0 0 12px rgba(56, 189, 248, 0.3)'
            : '0 0 10px rgba(56, 189, 248, 0.1)',
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s, background-color 0.2s',
        }}
      >
        {hoverText && (
          <span className="text-[9px] font-mono tracking-widest text-cyan-200 font-bold uppercase select-none">
            {hoverText}
          </span>
        )}
      </div>

      {/* Center Point Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${targetPos.x}px, ${targetPos.y}px, 0)`,
          backgroundColor: isHovered ? '#38bdf8' : '#ffffff',
          boxShadow: '0 0 8px #38bdf8',
          opacity: isHovered && hoverText ? 0 : 1,
        }}
      />
    </div>
  );
};

