// @ts-nocheck
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useMemo } from 'react';

function CubeMesh() {
  const colors = useMemo(() => ['#4f8cff', '#f59e0b', '#ffffff', '#10b981', '#ef4444', '#8b5cf6'], []);

  return (
    <group>
      {colors.map((color, index) => (
        <mesh key={color + index} position={[0, 0, 0]}>
          <boxGeometry args={[0.95, 0.95, 0.95]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

export default function CubeViewer() {
  return (
    <div className="h-[320px] overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/70">
      <Canvas camera={{ position: [4, 4, 4], fov: 45 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 5, 5]} intensity={1.1} />
        <CubeMesh />
        <OrbitControls enablePan={false} enableZoom autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </div>
  );
}
