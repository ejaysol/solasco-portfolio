import { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Decal, OrbitControls, useTexture, Html, Center } from '@react-three/drei';
import * as THREE from 'three';

interface TechItem {
  name: string;
  icon: string;
  orbitIndex: number; // 0 = inner, 1 = middle, 2 = outer
  phase: number;
}

const TECH_STACK_DATA: TechItem[] = [
  // Inner Orbit: Core Web Foundations (5 items)
  { name: 'HTML5', icon: '/HTML5.svg', orbitIndex: 0, phase: 0 },
  { name: 'CSS3', icon: '/CSS3.svg', orbitIndex: 0, phase: (Math.PI * 2 * 1) / 5 },
  { name: 'JavaScript', icon: '/JAVASCRIPT.svg', orbitIndex: 0, phase: (Math.PI * 2 * 2) / 5 },
  { name: 'TypeScript', icon: '/TYPESCRIPT.svg', orbitIndex: 0, phase: (Math.PI * 2 * 3) / 5 },
  { name: 'React', icon: '/REACT.svg', orbitIndex: 0, phase: (Math.PI * 2 * 4) / 5 },

  // Middle Orbit: Frameworks & Backend / Databases (5 items)
  { name: 'Node.js', icon: '/NODEJS.png', orbitIndex: 1, phase: 0.6 },
  { name: 'MongoDB', icon: '/MONGODB.svg', orbitIndex: 1, phase: 0.6 + (Math.PI * 2 * 1) / 5 },
  { name: 'MySQL', icon: '/MySQL.svg', orbitIndex: 1, phase: 0.6 + (Math.PI * 2 * 2) / 5 },
  { name: 'Git', icon: '/git.svg', orbitIndex: 1, phase: 0.6 + (Math.PI * 2 * 3) / 5 },
  { name: 'Figma', icon: '/figma.svg', orbitIndex: 1, phase: 0.6 + (Math.PI * 2 * 4) / 5 },

  // Outer Orbit: Styling, UI & Design Tools (4 items)
  { name: 'Sass', icon: '/SASS.svg', orbitIndex: 2, phase: 1.2 },
  { name: 'Bootstrap', icon: '/bootstrap.svg', orbitIndex: 2, phase: 1.2 + (Math.PI * 2 * 1) / 4 },
  { name: 'Photoshop', icon: '/Adobe_Photoshop_CC_icon.svg.png', orbitIndex: 2, phase: 1.2 + (Math.PI * 2 * 2) / 4 },
  { name: 'Illustrator', icon: '/Adobe_Illustrator_CC_icon.svg.png', orbitIndex: 2, phase: 1.2 + (Math.PI * 2 * 3) / 4 },
];

// Symmetrical concentric 3D inclined orbital tiers
const ORBIT_CONFIGS = [
  { radius: 4.4, tiltX: 0.35, speed: 0.28, color: '#00f0ff' },  // Inner Orbit
  { radius: 6.8, tiltX: -0.42, speed: 0.20, color: '#bd00ff' }, // Middle Orbit
  { radius: 9.2, tiltX: 0.52, speed: 0.14, color: '#00ffaa' },  // Outer Orbit
];

// Subcomponent: Central Rotating 3D Planet (writes to depth buffer to occlude balls behind it)
function CentralPlanet() {
  const { scene } = useGLTF('/planet/scene.glb', '/draco/');
  const planetRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.depthWrite = true;
          child.material.depthTest = true;
          child.material.transparent = false; // Ensure opaque planet writes solidly to depth buffer
        }
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={planetRef}>
      <Center>
        <primitive object={scene} scale={1.35} />
      </Center>
    </group>
  );
}

// Subcomponent: Symmetrical Orbiting Celestial Path Ring
function OrbitRing({
  radius,
  tiltX,
  color,
}: {
  radius: number;
  tiltX: number;
  color: string;
}) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 120;
    const cosX = Math.cos(tiltX);
    const sinX = Math.sin(tiltX);

    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const x = Math.cos(theta) * radius;
      const zPlane = Math.sin(theta) * radius;

      const y = -zPlane * sinX;
      const z = zPlane * cosX;

      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, [radius, tiltX]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <primitive object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.25, depthWrite: false }))} />
  );
}

// Subcomponent: Faceted Icosahedron Decal Ball with proper depth testing behind the planet
function OrbitingBall({
  name,
  icon,
  orbitConfig,
  phase,
  hoveredTech,
  setHoveredTech,
}: {
  name: string;
  icon: string;
  orbitConfig: { radius: number; tiltX: number; speed: number; color: string };
  phase: number;
  hoveredTech: string | null;
  setHoveredTech: (name: string | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [decal] = useTexture([icon]);
  const isHovered = hoveredTech === name;

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      const angle = phase + time * orbitConfig.speed;

      // Calculate position on inclined orbital plane centered at [0, 0, 0]
      const x = Math.cos(angle) * orbitConfig.radius;
      const zPlane = Math.sin(angle) * orbitConfig.radius;

      const cosX = Math.cos(orbitConfig.tiltX);
      const sinX = Math.sin(orbitConfig.tiltX);

      const y = -zPlane * sinX;
      const z = zPlane * cosX;

      groupRef.current.position.set(x, y, z);

      // Smoothly orient decal face to camera
      groupRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredTech(name);
      }}
      onPointerOut={() => setHoveredTech(null)}
    >
      {/* Faceted Icosahedron Decal Ball as defined in Ball.jsx */}
      <mesh
        castShadow
        receiveShadow
        scale={isHovered ? 0.9 : 0.72}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={isHovered ? '#ffffff' : '#f1f5f9'}
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

      {/* Tooltip Badge on Hover */}
      {isHovered && (
        <Html center distanceFactor={14} position={[0, 1.4, 0]}>
          <div className="bg-slate-950/95 border border-[#00f0ff] px-2.5 py-0.5 rounded-full text-xs font-bold text-[#00f0ff] whitespace-nowrap shadow-[0_0_12px_rgba(0,240,255,0.7)] backdrop-blur-md pointer-events-none uppercase tracking-wider">
            {name}
          </div>
        </Html>
      )}
    </group>
  );
}

// Subcomponent: Orbiting Scene Controller & Lighting
function OrbitScene({
  hoveredTech,
  setHoveredTech,
}: {
  hoveredTech: string | null;
  setHoveredTech: (name: string | null) => void;
}) {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={2.0} />
      <directionalLight position={[-10, -10, -10]} intensity={0.8} />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#00f0ff" />

      {/* Central 3D Planet */}
      <CentralPlanet />

      {/* Symmetrical Celestial Orbit Rings */}
      {ORBIT_CONFIGS.map((config, idx) => (
        <OrbitRing
          key={idx}
          radius={config.radius}
          tiltX={config.tiltX}
          color={config.color}
        />
      ))}

      {/* Orbiting Faceted Decal Balls */}
      {TECH_STACK_DATA.map((tech) => (
        <OrbitingBall
          key={tech.name}
          name={tech.name}
          icon={tech.icon}
          orbitConfig={ORBIT_CONFIGS[tech.orbitIndex]}
          phase={tech.phase}
          hoveredTech={hoveredTech}
          setHoveredTech={setHoveredTech}
        />
      ))}

      {/* Interactive OrbitControls centered at [0, 0, 0] */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.05}
        target={[0, 0, 0]}
        minDistance={8}
        maxDistance={25}
      />
    </>
  );
}

export default function PlanetOrbitSystem({ introFinished = false }: { introFinished?: boolean }) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
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
    <div ref={containerRef} className="w-full flex flex-col items-center justify-center my-4">
      {/* 3D Canvas Solar System Container (Centered, transparent) */}
      <div className="relative w-full max-w-5xl h-[540px] sm:h-[620px] md:h-[700px] mx-auto flex items-center justify-center pointer-events-auto">
        {/* Orbit Drag Instruction Overlay */}
        <div className="absolute top-2 right-2 sm:right-6 z-10 pointer-events-none">
          <div className="bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
            <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-widest">
              Drag to Orbit Space
            </span>
          </div>
        </div>

        {/* 3D WebGL Canvas */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          {introFinished && (
            <Canvas
              camera={{ position: [0, 1, 18], fov: 45 }}
              dpr={[1, 1.5]}
              gl={{ powerPreference: 'high-performance', antialias: true, alpha: true }}
              frameloop={isInView ? 'always' : 'never'}
            >
              <Suspense fallback={null}>
                <OrbitScene
                  hoveredTech={hoveredTech}
                  setHoveredTech={setHoveredTech}
                />
              </Suspense>
            </Canvas>
          )}
        </div>
      </div>

      {/* Interactive Tech Stack Filter Tags Below Solar System */}
      <div className="mt-4 flex flex-wrap justify-center gap-2 max-w-4xl px-4 z-10">
        {TECH_STACK_DATA.map((tech) => (
          <button
            key={tech.name}
            onMouseEnter={() => setHoveredTech(tech.name)}
            onMouseLeave={() => setHoveredTech(null)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-display transition-all duration-200 border cursor-pointer flex items-center space-x-2 ${
              hoveredTech === tech.name
                ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-white shadow-[0_0_12px_rgba(0,240,255,0.5)] scale-105'
                : 'bg-white/5 border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/20'
            }`}
          >
            <img src={tech.icon} alt={tech.name} className="w-3.5 h-3.5 object-contain" />
            <span>{tech.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Preload planet GLTF asset
useGLTF.preload('/planet/scene.glb', '/draco/');
