import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GalaxyLoaderProps {
  onFinish: () => void;
}

export default function GalaxyLoader({ onFinish }: GalaxyLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isEntering, setIsEntering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simulated smooth progress loader (takes 2.5 seconds)
  useEffect(() => {
    const duration = 2500;
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Auto-transition when progress hits 100%
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        handleEnter();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const handleEnter = () => {
    setIsEntering(true);
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1.8,
      ease: 'power2.inOut',
      onComplete: onFinish,
    });
  };

  const radius = 64;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#020206] flex flex-col items-center justify-center select-none"
      style={{
        background: 'radial-gradient(circle at center, #0e0e22 0%, #020207 100%)',
      }}
    >
      <div className="relative flex flex-col items-center justify-center space-y-12">
        
        {/* Centered Circular Progress Logo Loader */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          
          {/* Cosmic background glow - centered and expanded to prevent blur clipping */}
          <div className="absolute w-72 h-72 bg-gradient-to-tr from-[#00f0ff]/10 to-[#bd00ff]/10 rounded-full blur-3xl animate-pulse duration-[3s]" />
          
          {/* Outer dashed spinning ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[#00f0ff]/20 animate-[spin_20s_linear_infinite]" />
          
          {/* SVG Circular Progress Ring - increased viewBox padding to prevent glow clipping */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 180 180">
            <circle
              cx="90"
              cy="90"
              r={normalizedRadius}
              className="stroke-white/5 fill-none"
              strokeWidth={stroke}
            />
            <circle
              cx="90"
              cy="90"
              r={normalizedRadius}
              className="stroke-[url(#loader-gradient)] fill-none transition-all duration-150 ease-out"
              strokeWidth={stroke + 1}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.5))',
              }}
            />
            <defs>
              <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f0ff" />
                <stop offset="100%" stopColor="#bd00ff" />
              </linearGradient>
            </defs>
          </svg>

          {/* Centered Logo Icon */}
          <img
            src="/logo-white.png"
            alt="SOLASCO Logo"
            className={`w-24 h-auto object-contain relative z-10 drop-shadow-[0_0_15px_rgba(0,240,255,0.45)] transition-all duration-[1.8s] ease-in-out ${
              isEntering ? 'opacity-0 scale-90 blur-md' : 'opacity-100 scale-100'
            }`}
          />
        </div>

        {/* Loading details */}
        <div className="flex flex-col items-center space-y-2 pointer-events-none">
          <h1 className="text-[10px] tracking-[0.4em] text-white/50 font-display font-medium uppercase">
            Ephraim Jay Solasco
          </h1>
          <p className="text-[11px] tracking-[0.35em] text-[#00f0ff] font-semibold uppercase animate-pulse drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
            {progress >= 100 ? "Entering Portfolio..." : `Loading Experience... ${Math.round(progress)}%`}
          </p>
        </div>

      </div>
    </div>
  );
}
