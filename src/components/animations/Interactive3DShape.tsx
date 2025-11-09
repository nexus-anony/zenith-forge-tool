import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface Interactive3DShapeProps {
  type: 'cube' | 'sphere' | 'torus' | 'octahedron' | 'icosahedron';
  color?: number;
  size?: number;
  className?: string;
  enableMouseFollow?: boolean;
}

export const Interactive3DShape = ({ 
  type, 
  color = 0xa78bfa, 
  size = 150,
  className = '',
  enableMouseFollow = true 
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
      50,
      containerRef.current.offsetWidth / containerRef.current.offsetHeight,
      0.1,
      1000
    );
    camera.position.z = 400;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create geometry based on type
    let geometry;
    switch (type) {
      case 'cube':
        geometry = new THREE.BoxGeometry(size, size, size);
        break;
      case 'sphere':
        geometry = new THREE.SphereGeometry(size / 2, 32, 32);
        break;
      case 'torus':
        geometry = new THREE.TorusGeometry(size / 2, size / 6, 20, 100);
        break;
      case 'octahedron':
        geometry = new THREE.OctahedronGeometry(size / 2, 0);
        break;
      case 'icosahedron':
        geometry = new THREE.IcosahedronGeometry(size / 2, 0);
        break;
      default:
        geometry = new THREE.BoxGeometry(size, size, size);
    }

    // Material with glow
    const material = new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.9,
      roughness: 0.1,
      emissive: color,
      emissiveIntensity: 0.6,
      wireframe: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(color, 2, 800);
    pointLight.position.set(0, 0, 300);
    scene.add(pointLight);

    // Auto rotation
    gsap.to(mesh.rotation, {
      y: Math.PI * 2,
      duration: 10,
      repeat: -1,
      ease: 'none'
    });

    // Pulsing scale
    gsap.to(mesh.scale, {
      x: 1.1,
      y: 1.1,
      z: 1.1,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      if (!enableMouseFollow) return;
      
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleMouseEnter = () => {
      if (!meshRef.current) return;
      gsap.to(meshRef.current.scale, {
        x: 1.3,
        y: 1.3,
        z: 1.3,
        duration: 0.5,
        ease: 'back.out(1.7)'
      });
      gsap.to(meshRef.current.material, {
        emissiveIntensity: 1.2,
        duration: 0.5
      });
    };

    const handleMouseLeave = () => {
      if (!meshRef.current) return;
      gsap.to(meshRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      });
      gsap.to(meshRef.current.material, {
        emissiveIntensity: 0.6,
        duration: 0.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      if (meshRef.current && enableMouseFollow) {
        // Smooth follow mouse
        meshRef.current.rotation.x += (mouseRef.current.y * 0.5 - meshRef.current.rotation.x) * 0.05;
        meshRef.current.rotation.z += (mouseRef.current.x * 0.5 - meshRef.current.rotation.z) * 0.05;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.offsetWidth / containerRef.current.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [type, color, size, enableMouseFollow]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full ${className}`}
      style={{ cursor: 'pointer' }}
    />
  );
};
