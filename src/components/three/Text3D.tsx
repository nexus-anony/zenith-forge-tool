import { useRef, useMemo } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Text3DProps {
  text: string;
  position: [number, number, number];
  size?: number;
  color?: string;
  emissive?: string;
}

export const Text3D = ({ text, position, size = 1, color = '#ffffff', emissive = '#0066ff' }: Text3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 10;
      
      // Rotate based on camera proximity
      const distance = state.camera.position.distanceTo(meshRef.current.position);
      if (distance < 400) {
        meshRef.current.rotation.y += 0.001;
      }
    }
  });

  return (
    <Text
      ref={meshRef}
      position={position}
      fontSize={size}
      color={color}
      anchorX="center"
      anchorY="middle"
      font="/fonts/Inter-Bold.woff"
      outlineWidth={0.02}
      outlineColor="#000000"
    >
      {text}
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </Text>
  );
};
