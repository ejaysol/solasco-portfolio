import { useRef, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingMeshProps {
  scrollProgress?: number;
  theme?: 'dark' | 'light';
}

function Model() {
  const { scene } = useGLTF('/textures/scene.gltf');
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // Ensure all meshes receive and cast shadows, and use double-sided rendering
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.side = THREE.DoubleSide;
        }
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      // Gentle, weightless zero-gravity space floating motion
      groupRef.current.position.y = Math.sin(time * 1.2) * 0.08;
      groupRef.current.rotation.z = Math.sin(time * 0.9) * 0.025;
    }
  });

  return (
    // Space floating group centered around [0, 0, 0]
    <group ref={groupRef} rotation={[0.08, 0.45, 0]}>
      {/* Exact geometric offset [-0.3, -1.1, 0] centers the computer screen directly at [0, 0, 0] */}
      <primitive
        object={scene}
        position={[-0.3, -1.1, 0]}
        scale={0.75}
      />
    </group>
  );
}

export default function FloatingMesh({}: FloatingMeshProps) {
  return (
    <Suspense fallback={null}>
      <Model />
    </Suspense>
  );
}

// Preload model assets
useGLTF.preload('/textures/scene.gltf');
