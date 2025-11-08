import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface ProjectCard3DProps {
  title: string;
  description: string;
  tech: string[];
  position: [number, number, number];
  color: string;
}

export const ProjectCard3D = ({ title, description, tech, position, color }: ProjectCard3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const boxRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current && boxRef.current) {
      // Distance from camera
      const distance = state.camera.position.distanceTo(groupRef.current.position);
      
      // Scale and rotate based on proximity
      if (distance < 600) {
        const scale = Math.max(0.8, 1 - (distance - 200) / 400);
        groupRef.current.scale.setScalar(scale);
        boxRef.current.rotation.y += 0.005;
      } else {
        groupRef.current.scale.setScalar(0.8);
      }

      // Tilt toward camera
      groupRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Card background */}
      <RoundedBox
        ref={boxRef}
        args={[300, 200, 30]}
        radius={10}
        smoothness={4}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.3}
          transparent
          opacity={0.9}
        />
      </RoundedBox>

      {/* Title */}
      <Text
        position={[0, 50, 20]}
        fontSize={24}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
        maxWidth={250}
      >
        {title}
      </Text>

      {/* Description */}
      <Text
        position={[0, 0, 20]}
        fontSize={14}
        color="#cccccc"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Regular.woff"
        maxWidth={250}
      >
        {description}
      </Text>

      {/* Tech stack */}
      <Text
        position={[0, -50, 20]}
        fontSize={12}
        color="#888888"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Regular.woff"
        maxWidth={250}
      >
        {tech.join(' • ')}
      </Text>

      {/* Point light */}
      <pointLight
        position={[0, 0, 50]}
        intensity={1}
        distance={400}
        color={color}
      />
    </group>
  );
};
