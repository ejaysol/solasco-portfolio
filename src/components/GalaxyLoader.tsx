import { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useProgress, OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

// Singleton cached texture to prevent creating multiple canvas textures
let cachedGlowTexture: THREE.CanvasTexture | null = null;
const getGlowTexture = () => {
  if (cachedGlowTexture) return cachedGlowTexture;
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.7)');
    gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);
  }
  cachedGlowTexture = new THREE.CanvasTexture(canvas);
  return cachedGlowTexture;
};

// Subcomponent: Centered, steady and color-gradient galaxy points model
function GalaxyModel({ isEntering }: { isEntering: boolean }) {
  const { scene } = useGLTF('/scene.gltf');
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.PointsMaterial | null>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Points) {
        const points = child;
        
        // Center the geometry of the point cloud
        points.geometry.center();
        
        // Reset all parent transforms to identity to clear pre-applied scaling/rotation
        let parent = points.parent;
        while (parent && parent !== scene) {
          parent.position.set(0, 0, 0);
          parent.rotation.set(0, 0, 0);
          parent.scale.set(1, 1, 1);
          parent = parent.parent;
        }

        // Compute bounding box to scale points relative to canvas size
        points.geometry.computeBoundingBox();
        const bbox = points.geometry.boundingBox;
        if (bbox) {
          const size = new THREE.Vector3();
          bbox.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z);
          const scaleFactor = 7.5 / maxDim;
          points.scale.set(scaleFactor, scaleFactor, scaleFactor);
        }

        // Apply custom radial color gradient to points (Cyan inside -> Blue -> Purple outside)
        const positions = points.geometry.attributes.position;
        let colors = points.geometry.attributes.color;

        if (positions) {
          const count = positions.count;
          if (!colors) {
            points.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
            colors = points.geometry.attributes.color;
          }

          const posArr = positions.array as Float32Array;
          const colorArr = colors.array as Float32Array;
          const itemSize = colors.itemSize;

          for (let i = 0; i < count; i++) {
            const x = posArr[i * 3];
            const y = posArr[i * 3 + 1];
            const z = posArr[i * 3 + 2];
            
            const dist = Math.sqrt(x * x + y * y + z * z);
            const maxRadius = 160;
            const t = Math.min(dist / maxRadius, 1.0);
            
            let r = 0;
            let g = 0.94;
            let b = 1.0;
            
            if (t < 0.5) {
              const factor = t * 2;
              g = 0.94 - factor * 0.74;
              r = t * 0.2;
            } else {
              const factor = (t - 0.5) * 2;
              r = 0.2 + factor * 0.6;
              g = (1 - factor) * 0.2;
            }

            const index = i * itemSize;
            colorArr[index] = r;
            colorArr[index + 1] = g;
            colorArr[index + 2] = b;
            if (itemSize === 4) {
              colorArr[index + 3] = 1.0;
            }
          }
          colors.needsUpdate = true;
        }

        // Tweak the points material
        const mat = points.material;
        if (mat && !Array.isArray(mat)) {
          mat.transparent = true;
          mat.opacity = 0.95;
          mat.depthWrite = false;
          mat.blending = THREE.AdditiveBlending;
          mat.vertexColors = true;
          mat.map = getGlowTexture();
          
          if ('color' in mat) {
            (mat as any).color.setHex(0xffffff);
          }
          
          if ('size' in mat) {
            (mat as any).size = 0.05;
          }
          mat.needsUpdate = true;
          materialRef.current = mat as THREE.PointsMaterial;
        }
      }
    });
  }, [scene]);

  // GSAP animation triggered when starting the warp transition
  useEffect(() => {
    if (isEntering && materialRef.current) {
      gsap.to(materialRef.current, {
        opacity: 0,
        duration: 2.2,
        ease: 'power3.inOut',
      });
      gsap.to(materialRef.current, {
        size: 1.5,
        duration: 2.2,
        ease: 'power3.in',
      });
    }
  }, [isEntering]);

  // Steady calm rotation without wild mouse drifting
  useFrame((_, delta) => {
    if (groupRef.current) {
      if (isEntering) {
        groupRef.current.rotation.y += delta * 2.5;
      } else {
        // Steady, gentle continuous celestial rotation
        groupRef.current.rotation.y += delta * 0.08;
      }
    }
  });

  return <primitive ref={groupRef} object={scene} />;
}

// Subcomponent: Soft glowing transition sprite during warp
function TransitionSprite({ isEntering }: { isEntering: boolean }) {
  const spriteRef = useRef<THREE.Sprite>(null);
  const glowTex = useMemo(() => getGlowTexture(), []);

  useEffect(() => {
    if (isEntering && spriteRef.current) {
      const sprite = spriteRef.current;
      const mat = sprite.material as THREE.SpriteMaterial;
      
      sprite.scale.set(0.1, 0.1, 0.1);
      mat.opacity = 0;
      
      gsap.to(sprite.scale, {
        x: 45,
        y: 45,
        z: 45,
        duration: 2.4,
        ease: 'power3.in',
      });
      
      gsap.to(mat, {
        opacity: 1.0,
        duration: 1.8,
        delay: 0.2,
        ease: 'power2.in',
      });
    }
  }, [isEntering]);

  return (
    <sprite ref={spriteRef} position={[0, 0, 0]}>
      <spriteMaterial
        color="#00f0ff"
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={glowTex}
      />
    </sprite>
  );
}

// Subcomponent: Camera setup with initial Zoom-In to Zoom-Out cinematic reveal and warp zoom trigger
function CameraController({ isEntering }: { isEntering: boolean }) {
  const { camera } = useThree();

  useEffect(() => {
    // Start zoomed in close to the heart of the galaxy
    camera.position.set(0, 0, 3.5);
    camera.lookAt(0, 0, 0);

    // Smoothly pull back (zoom out) to full galaxy perspective
    gsap.to(camera.position, {
      z: 15,
      duration: 3.2,
      ease: 'power3.out',
    });
  }, [camera]);

  useEffect(() => {
    if (isEntering) {
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: -2.5,
        duration: 2.4,
        ease: 'power3.inOut',
      });
      gsap.to(camera.rotation, {
        z: Math.PI * 2.0,
        duration: 2.4,
        ease: 'power3.inOut',
      });
    }
  }, [isEntering, camera]);

  return null;
}

interface GalaxyLoaderProps {
  onFinish: () => void;
}

export default function GalaxyLoader({ onFinish }: GalaxyLoaderProps) {
  const [isEntering, setIsEntering] = useState(false);
  const { progress } = useProgress();
  const [showEnterBtn, setShowEnterBtn] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setShowEnterBtn(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const handleEnter = () => {
    setIsEntering(true);
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 2.2,
      ease: 'power2.inOut',
      onComplete: onFinish,
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#020206] flex flex-col items-center justify-center select-none"
      style={{
        background: 'radial-gradient(circle at center, #0e0e22 0%, #020207 100%)',
      }}
    >
      {/* 3D Galaxy Canvas with Steady OrbitControls */}
      <div className="absolute inset-0 w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ powerPreference: 'high-performance', antialias: false }}
        >
          <Suspense fallback={null}>
            <GalaxyModel isEntering={isEntering} />
          </Suspense>
          <CameraController isEntering={isEntering} />
          <TransitionSprite isEntering={isEntering} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.08}
            rotateSpeed={0.6}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      </div>

      {/* Futuristic UI Overlay - Classic Minimal Style */}
      <div className="relative z-10 flex flex-col items-center justify-end w-full h-full pb-20 pointer-events-none">
        <div className="flex flex-col items-center w-full max-w-sm px-6 text-center space-y-8">
          
          <div className="flex flex-col space-y-2">
            <h1 className="text-xs tracking-[0.4em] text-white/70 font-display font-medium uppercase">
              Ephraim Jay Solasco
            </h1>
            <p className="text-[11px] tracking-[0.35em] text-[#00f0ff] font-semibold uppercase animate-pulse drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
              {isEntering
                ? "Entering Portfolio..."
                : showEnterBtn
                ? "Ready to Explore"
                : "Loading Portfolio Experience..."}
            </p>
          </div>

          {/* Progress Bar */}
          {!showEnterBtn && (
            <div className="flex flex-col w-full items-center space-y-3 transition-all duration-500">
              <div className="w-full h-[4px] bg-white/5 border border-white/5 rounded-full overflow-hidden relative shadow-[0_0_12px_rgba(0,0,0,0.5)]">
                <div
                  className="h-full bg-gradient-to-r from-[#00f0ff] to-[#bd00ff] transition-all duration-300 ease-out shadow-[0_0_15px_rgba(0,240,255,0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="flex w-full justify-between items-center px-1 text-[9px] text-slate-500 font-mono tracking-widest uppercase">
                <span>PORTFOLIO_ASSETS</span>
                <span className="text-[#00f0ff] font-bold">{Math.round(progress)}%</span>
              </div>
            </div>
          )}

          {/* Glowing Enter Button */}
          {showEnterBtn && (
            <button
              onClick={handleEnter}
              disabled={isEntering}
              className={`pointer-events-auto flex items-center justify-center space-x-3 px-10 py-4 bg-transparent border border-[#00f0ff]/40 text-white rounded-full font-bold font-display text-xs tracking-[0.3em] uppercase transition-all duration-500 hover:border-[#bd00ff] hover:text-[#bd00ff] hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_25px_rgba(0,240,255,0.1)] hover:shadow-[0_0_35px_rgba(189,0,255,0.3)] ${
                isEntering ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100 animate-pulse'
              }`}
            >
              <span>Explore Portfolio</span>
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

// Preload the galaxy model assets
useGLTF.preload('/scene.gltf');
