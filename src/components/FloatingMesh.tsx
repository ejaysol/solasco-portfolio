import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingMeshProps {
  scrollProgress?: number;
  theme?: 'dark' | 'light';
}

function ProceduralSculpture({ theme = 'dark' }: FloatingMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const coreWireRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const satellitesRef = useRef<THREE.Group>(null);

  const isLight = theme === 'light';

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Weightless zero-gravity space floating motion for the whole group
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 1.0) * 0.15;
      groupRef.current.rotation.y = time * 0.15;
    }

    // 2. Spin the central solid core and outer wireframe core in opposite directions
    if (coreRef.current) {
      coreRef.current.rotation.x = time * 0.3;
      coreRef.current.rotation.y = time * 0.5;
    }
    if (coreWireRef.current) {
      coreWireRef.current.rotation.x = -time * 0.2;
      coreWireRef.current.rotation.y = -time * 0.4;
    }

    // 3. Spin the orbiting rings on separate axes
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.4;
      ring1Ref.current.rotation.y = time * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -time * 0.3;
      ring2Ref.current.rotation.z = time * 0.5;
    }

    // 4. Orbiting satellites Group Rotation
    if (satellitesRef.current) {
      satellitesRef.current.rotation.y = -time * 0.6;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.08, 0.45, 0]}>
      {/* Central Solid Geometric Core */}
      <mesh ref={coreRef} castShadow receiveShadow>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshPhysicalMaterial
          color={isLight ? '#bd00ff' : '#00f0ff'}
          emissive={isLight ? '#550080' : '#003366'}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          flatShading={true}
        />
      </mesh>

      {/* Central Outer Wireframe Core (Hologram Overlay Effect) */}
      <mesh ref={coreWireRef}>
        <icosahedronGeometry args={[0.73, 1]} />
        <meshBasicMaterial
          color={isLight ? '#00f0ff' : '#bd00ff'}
          wireframe={true}
          transparent={true}
          opacity={0.4}
        />
      </mesh>

      {/* Orbiting Ring 1 (Cyan/Purple neon) */}
      <mesh ref={ring1Ref} castShadow>
        <torusGeometry args={[1.1, 0.03, 16, 100]} />
        <meshStandardMaterial
          color={isLight ? '#00f0ff' : '#bd00ff'}
          emissive={isLight ? '#004455' : '#440055'}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Orbiting Ring 2 (Pink/Yellow neon) */}
      <mesh ref={ring2Ref} castShadow>
        <torusGeometry args={[1.4, 0.015, 16, 100]} />
        <meshStandardMaterial
          color={isLight ? '#ff0077' : '#ffea00'}
          emissive={isLight ? '#550022' : '#443c00'}
          roughness={0.1}
          metalness={0.95}
        />
      </mesh>

      {/* Orbiting Satellites */}
      <group ref={satellitesRef}>
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const radius = 1.8;
          const yOffset = Math.sin(i) * 0.3;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius]}
              castShadow
            >
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? '#00f0ff' : '#bd00ff'}
                emissive={i % 2 === 0 ? '#004455' : '#440055'}
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export default function FloatingMesh({ theme = 'dark' }: FloatingMeshProps) {
  return (
    <group>
      <ProceduralSculpture theme={theme} />
    </group>
  );
}
