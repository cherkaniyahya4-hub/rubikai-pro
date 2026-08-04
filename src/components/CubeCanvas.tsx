import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface CubeCanvasProps {
  cubeColors?: Record<string, string>;
}

const faceLayout = [
  { key: 'Front', position: [0, 0, 1.02], rotation: [0, 0, 0] },
  { key: 'Right', position: [1.02, 0, 0], rotation: [0, -Math.PI / 2, 0] },
  { key: 'Back', position: [0, 0, -1.02], rotation: [0, Math.PI, 0] },
  { key: 'Left', position: [-1.02, 0, 0], rotation: [0, Math.PI / 2, 0] },
  { key: 'Top', position: [0, 1.02, 0], rotation: [-Math.PI / 2, 0, 0] },
  { key: 'Bottom', position: [0, -1.02, 0], rotation: [Math.PI / 2, 0, 0] },
];

function CubeScene({ cubeColors }: CubeCanvasProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.2;
    }
  });

  const colors = useMemo(() => ({
    Front: cubeColors?.Front ?? '#ffffff',
    Right: cubeColors?.Right ?? '#ff5f1f',
    Back: cubeColors?.Back ?? '#0f172a',
    Left: cubeColors?.Left ?? '#2dd4bf',
    Top: cubeColors?.Top ?? '#facc15',
    Bottom: cubeColors?.Bottom ?? '#ef4444',
  }), [cubeColors]);

  return (
    <group ref={groupRef}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshStandardMaterial color="#020617" metalness={0.65} roughness={0.08} envMapIntensity={1.2} />
      </mesh>
      {faceLayout.map((face) => (
        <mesh key={face.key} position={face.position as [number, number, number]} rotation={face.rotation as [number, number, number]} castShadow>
          <planeGeometry args={[1.12, 1.12]} />
          <meshBasicMaterial color={colors[face.key as keyof typeof colors]} />
        </mesh>
      ))}
      <ContactShadows position={[0, -1.2, 0]} scale={8} blur={2.5} opacity={0.35} />
    </group>
  );
}

export default function CubeCanvas({ cubeColors }: CubeCanvasProps) {
  return (
    <div className="h-[380px] rounded-[28px] border border-white/10 bg-slate-950/70 p-2">
      <Canvas camera={{ position: [0, 0, 6], fov: 35 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 4]} intensity={1.7} />
        <pointLight position={[-4, -2, -3]} intensity={0.8} color="#8b5cf6" />
        <CubeScene cubeColors={cubeColors} />
        <OrbitControls enablePan={false} enableZoom enableRotate />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
