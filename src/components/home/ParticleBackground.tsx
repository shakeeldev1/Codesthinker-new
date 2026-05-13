"use client";

import React, { useEffect, useRef } from 'react';

// Added 'type' and 'pulse' for variety
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: 'small' | 'medium' | 'large' | 'pulsing';
  pulse?: number; 
  pulseSpeed?: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000, radius: 200 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const particleCount = 80;
    const connectionDistance = 140;
    const brandColor = '#07051D'; 
    const lineColorBase = '7, 5, 29'; 

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const types: Particle['type'][] = ['small', 'medium', 'large', 'pulsing'];
      
      for (let i = 0; i < particleCount; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        let size = 1.5;
        let speedMult = 1;

        // Differentiate logic based on type
        switch(type) {
          case 'small': 
            size = Math.random() * 1 + 0.5; 
            speedMult = 1.5; // Fast small dots
            break;
          case 'large': 
            size = Math.random() * 2 + 3; 
            speedMult = 0.4; // Slow heavy dots
            break;
          case 'pulsing': 
            size = 2; 
            speedMult = 0.8;
            break;
          default: size = 2; break;
        }

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speedMult,
          vy: (Math.random() - 0.5) * speedMult,
          size: size,
          type: type,
          pulse: 0,
          pulseSpeed: Math.random() * 0.05 + 0.02
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        // Interaction Logic
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.current.radius) {
          const force = (mouse.current.radius - dist) / mouse.current.radius;
          p.x -= (dx / dist) * force * 5;
          p.y -= (dy / dist) * force * 5;
        }

        // Movement
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges instead of bouncing for a "infinite" feel
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Type-specific drawing effects
        ctx.beginPath();
        
        let currentSize = p.size;
        let opacity = p.type === 'large' ? 0.4 : 0.8;

        if (p.type === 'pulsing') {
          p.pulse! += p.pulseSpeed!;
          currentSize = p.size + Math.sin(p.pulse!) * 2;
          ctx.shadowBlur = 10;
          ctx.shadowColor = brandColor;
        }

        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${lineColorBase}, ${opacity})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Web Connections (Only connect if they aren't the large "background" particles)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (p.type === 'large' && p2.type === 'large') continue;

          const d2x = p.x - p2.x;
          const d2y = p.y - p2.y;
          const distance = Math.sqrt(d2x * d2x + d2y * d2y);

          if (distance < connectionDistance) {
            ctx.beginPath();
            const connOpacity = (1 - distance / connectionDistance) * 0.2;
            ctx.strokeStyle = `rgba(${lineColorBase}, ${connOpacity})`;
            ctx.lineWidth = p.type === 'pulsing' ? 0.5 : 0.2;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleBackground;