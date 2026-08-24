import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
  Html,
} from '@react-three/drei';

interface BallProps {
  imgUrl: string;
}

function CanvasLoader() {
  return (
    <Html center>
      <div className="flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-[#00f0ff] border-t-transparent rounded-full animate-spin" />
      </div>
    </Html>
  );
}

function Ball({ imgUrl }: BallProps) {
  const [decal] = useTexture([imgUrl]);

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 0.05]} intensity={1} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#f1f5f9"
          roughness={0.3}
          metalness={0.1}
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
        />
      </mesh>
    </Float>
  );
}

interface BallCanvasProps {
  icon: string;
}

export default function BallCanvas({ icon }: BallCanvasProps) {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.1}
        />
        <Ball imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}
