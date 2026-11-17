import React, { useEffect, useRef } from 'react';

interface WaterfallMistCanvasProps {
  mouseX: number;
}

export const WaterfallMistCanvas: React.FC<WaterfallMistCanvasProps> = ({ mouseX }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Waterfall stream particle droplets
    const streamCount = 200;
    // Waterfalls originate from specific horizontal island positions
    const streams = Array.from({ length: streamCount }, () => ({
      originX: 0.38 + (Math.random() - 0.5) * 0.08, // Island waterfall 1
      x: 0,
      y: Math.random() * height * 0.6 + height * 0.35,
      speedY: Math.random() * 6 + 4,
      length: Math.random() * 20 + 10,
      width: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
    }));

    // Floating aether spores/pollen
    const sporeCount = 70;
    const spores = Array.from({ length: sporeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: -Math.random() * 0.4 - 0.1,
      phase: Math.random() * Math.PI * 2,
    }));

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render waterfalls
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.65)';
      ctx.lineCap = 'round';

      streams.forEach((s) => {
        s.x = width * s.originX + (Math.random() - 0.5) * 12 + mouseX * 20;
        s.y += s.speedY;

        if (s.y > height * 0.88) {
          s.y = height * 0.35;
        }

        ctx.lineWidth = s.width;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + (Math.random() - 0.5) * 2, s.y + s.length);
        ctx.stroke();
      });

      // Render Mist pool at bottom of waterfalls
      const mistX = width * 0.38;
      const mistY = height * 0.85;
      const grad = ctx.createRadialGradient(mistX, mistY, 20, mistX, mistY, 180);
      grad.addColorStop(0, 'rgba(224, 242, 254, 0.25)');
      grad.addColorStop(0.5, 'rgba(186, 230, 253, 0.1)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(mistX, mistY, 180, 0, Math.PI * 2);
      ctx.fill();

      // Render Spores
      spores.forEach((sp) => {
        sp.phase += 0.03;
        sp.x += sp.speedX + Math.sin(sp.phase) * 0.5 + mouseX * 0.2;
        sp.y += sp.speedY;

        if (sp.y < 0) sp.y = height;
        if (sp.x < 0) sp.x = width;
        if (sp.x > width) sp.x = 0;

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(217, 249, 157, 0.55)'; // Ethereal emerald/gold spore
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(217, 249, 157, 0.8)';
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [mouseX]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-20"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

