import { useState, useEffect, useRef } from 'react';
import BallCanvas from './BallCanvas';

interface LazyBallCanvasProps {
  icon: string;
}

export default function LazyBallCanvas({ icon }: LazyBallCanvasProps) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { 
        rootMargin: '150px', // Load slightly before it enters the viewport
        threshold: 0.01 
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      {inView ? (
        <BallCanvas icon={icon} />
      ) : (
        // Render a clean, glowing placeholder sphere ring while loading or off-screen
        <div className="w-[85px] h-[85px] rounded-full border border-dashed border-white/10 animate-[spin_20s_linear_infinite] flex items-center justify-center">
          <div className="w-[60px] h-[60px] rounded-full bg-white/5 border border-white/5 flex items-center justify-center animate-pulse">
            <div className="w-2 h-2 rounded-full bg-[#bd00ff]/50" />
          </div>
        </div>
      )}
    </div>
  );
}
