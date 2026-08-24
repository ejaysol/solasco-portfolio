import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BackgroundParticlesProps {
  theme?: 'dark' | 'light';
}

// Singleton cached texture
let cachedParticleTexture: THREE.CanvasTexture | null = null;
const getParticleGlowTexture = () => {
  if (cachedParticleTexture) return cachedParticleTexture;
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
  cachedParticleTexture = new THREE.CanvasTexture(canvas);
  return cachedParticleTexture;
};

export default function BackgroundParticles({ theme = 'dark' }: BackgroundParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Adapt particle density for mobile screens
  const count = useMemo(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 600;
    }
    return 1300;
  }, []);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 45;     // X
      pos[i + 1] = (Math.random() - 0.5) * 45; // Y
      pos[i + 2] = (Math.random() - 0.5) * 45; // Z
    }
    return pos;
  }, [count]);

  const glowTex = useMemo(() => getParticleGlowTexture(), []);

  useFrame((state) => {
    if (pointsRef.current) {
      // Slowly rotate the particle field
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12} // Slightly larger now that we have soft textures
        color={theme === 'light' ? "#0088cc" : "#00f0ff"}
        sizeAttenuation={true}
        transparent
        opacity={theme === 'light' ? 0.35 : 0.5}
        depthWrite={false}
        map={glowTex}
        blending={theme === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending}
      />
    </points>
  );
}
