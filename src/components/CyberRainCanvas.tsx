import React, { useEffect, useRef } from 'react';

interface CyberRainCanvasProps {
  mouseX: number;
}

export const CyberRainCanvas: React.FC<CyberRainCanvasProps> = ({ mouseX }) => {
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

    // Rain particles
    const rainCount = 150;
    const rain = Array.from({ length: rainCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 25 + 15,
      speed: Math.random() * 12 + 15,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    // Flying Vehicles / Traffic Streaks across skyway altitudes
    const lanes = [height * 0.35, height * 0.48, height * 0.62, height * 0.72];
    const vehicleCount = 16;
    const vehicles = Array.from({ length: vehicleCount }, (_, idx) => {
      const lane = lanes[idx % lanes.length];
      const direction = idx % 2 === 0 ? 1 : -1;
      return {
        x: Math.random() * width,
        y: lane + (Math.random() - 0.5) * 20,
        speed: (Math.random() * 4 + 5) * direction,
        length: Math.random() * 60 + 40,
        color: direction === 1 ? 'rgba(56, 189, 248, 0.9)' : 'rgba(244, 63, 94, 0.9)', // Blue headlights or red taillights
        glow: direction === 1 ? '#38bdf8' : '#f43f5e',
        lane,
      };
    });

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Cyberpunk Rain
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      rain.forEach((r) => {
        r.y += r.speed;
        r.x += mouseX * 0.5 - 0.8; // subtle wind angle

        if (r.y > height) {
          r.y = -20;
          r.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.moveTo(r.x, r.y);
        ctx.lineTo(r.x - 2, r.y + r.length);
        ctx.stroke();
      });

      // Render Flying Aerocars
      vehicles.forEach((v) => {
        v.x += v.speed;

        if (v.speed > 0 && v.x > width + 100) {
          v.x = -100;
        } else if (v.speed < 0 && v.x < -100) {
          v.x = width + 100;
        }

        ctx.save();
        ctx.strokeStyle = v.color;
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 12;
        ctx.shadowColor = v.glow;

        ctx.beginPath();
        ctx.moveTo(v.x, v.y);
        ctx.lineTo(v.x - (v.speed * 8), v.y);
        ctx.stroke();

        // Bright cabin / cockpit point
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(v.x, v.y, 1.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
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

