import { useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import BackgroundParticles from './BackgroundParticles';
import FloatingMesh from './FloatingMesh';

interface SceneCanvasProps {
  type: 'hero' | 'bg';
  scrollProgress?: number;
  theme?: 'dark' | 'light';
  introFinished?: boolean;
}

// Subcomponent to dynamically position the camera and controls based on screen size
function SceneSetup({ theme }: { theme: 'dark' | 'light' }) {
  const { camera, viewport } = useThree();
  const isLight = theme === 'light';

  // Desktop vs mobile framing
  const isDesktop = viewport.width > 7.5;
  const targetCamX = 0;
  const targetCamY = 0;
  const targetCamZ = isDesktop ? 4.2 : 5.0;

  useEffect(() => {
    camera.position.set(targetCamX, targetCamY, targetCamZ);
    camera.lookAt(0, 0, 0);
  }, [camera, targetCamX, targetCamY, targetCamZ]);

  return (
    <>
      {/* Crisp studio lighting for rich textures and colors */}
      <directionalLight position={[5, 6, 5]} intensity={isLight ? 2.5 : 2.0} />
      <directionalLight position={[-5, 4, -5]} intensity={isLight ? 1.4 : 1.0} />
      <pointLight position={[0, -1, 3]} intensity={1.6} color="#ffffff" />
      
      {/* Steady interactive rotation without bouncing or drifting */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.08}
        target={[0, 0, 0]}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
      />
    </>
  );
}

export default function SceneCanvas({
  type,
  scrollProgress = 0,
  theme = 'dark',
  introFinished = false,
}: SceneCanvasProps) {
  const isLight = theme === 'light';
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Only set up observer if intro is finished
    if (!introFinished) {
      setIsInView(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [introFinished]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {introFinished && (
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          dpr={[1, 1.5]}
          style={{ pointerEvents: type === 'hero' ? 'auto' : 'none' }}
          gl={{ powerPreference: 'high-performance', antialias: type === 'hero', alpha: true }}
          frameloop={isInView ? 'always' : 'never'}
        >
          <ambientLight intensity={isLight ? 1.6 : 1.2} />
          
          {type === 'hero' && (
            <>
              <SceneSetup theme={theme} />
              <FloatingMesh scrollProgress={scrollProgress} theme={theme} />
            </>
          )}

          {type === 'bg' && (
            <>
              <pointLight position={[0, 0, 10]} intensity={isLight ? 0.8 : 0.6} color={isLight ? "#0088cc" : "#00f0ff"} />
              <BackgroundParticles theme={theme} />
            </>
          )}
        </Canvas>
      )}
    </div>
  );
}
