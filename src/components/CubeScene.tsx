// @ts-nocheck
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      group: any;
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
    }
  }
}

function CubePiece({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime + position[1]) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.95, 0.95, 0.95]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
    </mesh>
  );
}

function CubeModel() {
  const pieces = [
    [0, 0, 0],
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];

  return (
    <group>
      {pieces.map((piece, index) => (
        <CubePiece key={index} position={piece as [number, number, number]} color={index % 2 === 0 ? '#4f8cff' : '#8b5cf6'} />
      ))}
    </group>
  );
}

export default function CubeScene() {
  return (
    <div className="h-[320px] overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/70">
      <Canvas camera={{ position: [4, 4, 4], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.1} />
        <pointLight position={[-4, -3, -2]} intensity={0.4} />
        <CubeModel />
        <OrbitControls enablePan={false} enableZoom autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </div>
  );
}
