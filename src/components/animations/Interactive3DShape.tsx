import { useEffect, useRef, memo } from 'react';
import * as THREE from 'three';

interface Interactive3DShapeProps {
  type?: 'cube' | 'sphere' | 'torus' | 'octahedron' | 'icosahedron';
  color?: string;
  size?: number;
  position?: { x: number; y: number; z: number };
  autoRotate?: boolean;
  glowIntensity?: number;
}

const Interactive3DShapeComponent = ({
  type = 'cube',
  color = '#a78bfa',
  size = 100,
  position = { x: 0, y: 0, z: 0 },
  autoRotate = true,
  glowIntensity = 0.5
}: Interactive3DShapeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 300;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: false
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(animationId);
    };
    const handleContextRestored = () => {
      renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
    };
    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    containerRef.current.appendChild(renderer.domElement);

    // Create geometry based on type
    let geometry: THREE.BufferGeometry;
    switch (type) {
      case 'sphere':
        geometry = new THREE.SphereGeometry(size, 32, 32);
        break;
      case 'torus':
        geometry = new THREE.TorusGeometry(size, size * 0.4, 16, 100);
        break;
      case 'octahedron':
        geometry = new THREE.OctahedronGeometry(size, 0);
        break;
      case 'icosahedron':
        geometry = new THREE.IcosahedronGeometry(size, 0);
        break;
      default:
        geometry = new THREE.BoxGeometry(size, size, size);
    }

    // Lightweight material (avoids heavy shaders)
    const colorValue = new THREE.Color(color);
    const material = new THREE.MeshBasicMaterial({
      color: colorValue,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });

    // Create mesh
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position.x, position.y, position.z);
    meshRef.current = mesh;
    scene.add(mesh);

    // No lights needed for MeshBasicMaterial; keep scene lightweight

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((e.clientY - rect.top) / rect.height) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (meshRef.current) {
        // Auto rotation
        if (autoRotate) {
          meshRef.current.rotation.x += 0.005;
          meshRef.current.rotation.y += 0.005;
        }

        // Mouse interaction
        meshRef.current.rotation.x += mouseRef.current.y * 0.01;
        meshRef.current.rotation.y += mouseRef.current.x * 0.01;

        // Pulsing scale
        const scale = 1 + Math.sin(Date.now() * 0.001) * 0.1;
        meshRef.current.scale.set(scale, scale, scale);

        // no dynamic light updates needed
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      renderer.dispose();
      renderer.forceContextLoss();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [type, color, size, position, autoRotate, glowIntensity]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none opacity-30"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export const Interactive3DShape = memo(Interactive3DShapeComponent);
