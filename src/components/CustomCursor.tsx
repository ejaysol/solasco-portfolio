import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const emitterRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device is touch-based or on mobile screen
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024;
    if (isTouch) return;

    // Enable custom cursor styles
    document.documentElement.classList.add('custom-cursor-active');

    // Setup Canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle state tracking
    let particles: Particle[] = [];
    const colors = ['#00f0ff', '#bd00ff', '#ffffff'];

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseRef.current.x = clientX;
      mouseRef.current.y = clientY;
      
      // Animate the dot quickly
      gsap.to(dotRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
      
      // Animate the outer ring with a slight delay (lag effect)
      gsap.to(cursorRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive')
      ) {
        gsap.to(cursorRef.current, {
          scale: 1.5,
          borderColor: '#bd00ff',
          backgroundColor: 'rgba(189, 0, 255, 0.05)',
          duration: 0.2,
        });
        gsap.to(dotRef.current, {
          scale: 0.5,
          backgroundColor: '#00f0ff',
          duration: 0.2,
        });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive')
      ) {
        gsap.to(cursorRef.current, {
          scale: 1,
          borderColor: '#00f0ff',
          backgroundColor: 'transparent',
          duration: 0.2,
        });
        gsap.to(dotRef.current, {
          scale: 1,
          backgroundColor: '#bd00ff',
          duration: 0.2,
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    // Set initial emitter position
    emitterRef.current.x = window.innerWidth / 2;
    emitterRef.current.y = window.innerHeight / 2;

    // Animation loop using requestAnimationFrame
    let animationFrameId: number;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const emitter = emitterRef.current;
      const mouse = mouseRef.current;
      
      const dx = mouse.x - emitter.x;
      const dy = mouse.y - emitter.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Lerp emitter position to track the cursor with a fluid lag
      emitter.x += dx * 0.15;
      emitter.y += dy * 0.15;

      // Spawn milkyway stardust particles proportional to speed
      if (dist > 1.5) {
        const spawnCount = Math.min(Math.floor(dist / 4) + 1, 4);
        for (let i = 0; i < spawnCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 6;
          const px = emitter.x + Math.cos(angle) * radius;
          const py = emitter.y + Math.sin(angle) * radius;

          // Drag velocity opposite to cursor movement + scatter
          const vx = -dx * 0.05 + (Math.random() - 0.5) * 1.5;
          const vy = -dy * 0.05 + (Math.random() - 0.5) * 1.5;
          
          const size = Math.random() * 2.5 + 0.8;
          const color = colors[Math.floor(Math.random() * colors.length)];
          const maxLife = Math.random() * 20 + 20; // 20 to 40 frames

          particles.push({
            x: px,
            y: py,
            vx,
            vy,
            size,
            color,
            alpha: 1,
            life: maxLife,
            maxLife
          });
        }
      }

      // Update, draw, and filter particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97; // Drag factor
        p.vy *= 0.97;

        p.life -= 1;
        p.alpha = Math.max(p.life / p.maxLife, 0);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.alpha, 0, Math.PI * 2);
        
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.65;
        
        // Add a starry glow shadow effect
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
      });

      // Clear shadows and global alpha for standard rendering operations
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      particles = particles.filter((p) => p.life > 0);

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block" />
      <div ref={cursorRef} className="custom-cursor hidden lg:block" />
      <div ref={dotRef} className="custom-cursor-dot hidden lg:block" />
    </>
  );
}
