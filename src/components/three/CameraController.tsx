import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

interface CameraControllerProps {
  scrollContainerId: string;
}

export const CameraController = ({ scrollContainerId }: CameraControllerProps) => {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Camera path waypoints
    const waypoints = [
      { x: 0, y: 0, z: 500, rotation: 0, fov: 75 },
      { x: -100, y: 50, z: 0, rotation: 0.2, fov: 80 },
      { x: 100, y: -30, z: -600, rotation: -0.15, fov: 85 },
      { x: 0, y: 80, z: -1200, rotation: 0, fov: 95 },
      { x: -150, y: 0, z: -1800, rotation: 0.3, fov: 100 },
      { x: 0, y: 0, z: -2000, rotation: 0, fov: 75 }
    ];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `#${scrollContainerId}`,
        start: 'top top',
        end: '+=500%',
        scrub: 2,
        pin: false,
        onUpdate: (self) => {
          // Calculate scroll velocity
          const currentScrollY = self.scroll();
          velocityRef.current = Math.abs(currentScrollY - lastScrollY.current);
          lastScrollY.current = currentScrollY;
        }
      }
    });

    // Animate camera through waypoints
    waypoints.forEach((point, i) => {
      tl.to(camera.position, {
        x: point.x,
        y: point.y,
        z: point.z,
        duration: 1,
        ease: 'power1.inOut'
      }, i)
      .to(camera.rotation, {
        z: point.rotation,
        duration: 1,
        ease: 'power2.inOut'
      }, i);

      // FOV changes based on velocity
      if (camera instanceof THREE.PerspectiveCamera) {
        tl.to(camera, {
          fov: point.fov,
          duration: 1,
          ease: 'power2.inOut',
          onUpdate: () => {
            camera.updateProjectionMatrix();
          }
        }, i);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [camera, scrollContainerId]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    // Apply mouse parallax to camera rotation
    if (camera) {
      camera.rotation.y += (mouseRef.current.x * 0.05 - camera.rotation.y) * 0.05;
      camera.rotation.x += (mouseRef.current.y * 0.05 - camera.rotation.x) * 0.05;

      // Velocity-based FOV wobble
      if (camera instanceof THREE.PerspectiveCamera && velocityRef.current > 10) {
        const wobble = Math.min(velocityRef.current / 100, 10);
        camera.fov += wobble;
        camera.updateProjectionMatrix();
        velocityRef.current *= 0.9; // Decay
      }
    }
  });

  return null;
};
