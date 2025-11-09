import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CinematicTypography = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.Fog(0x000000, 100, 3000);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    cameraRef.current = camera;
    camera.position.set(0, 0, 500);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Particle field
    createParticleField(scene);

    // Cyberpunk tunnel
    createCyberpunkTunnel(scene);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(0, 200, 0);
    spotLight.angle = Math.PI / 6;
    scene.add(spotLight);

    // Point lights with colors
    const colors = [0xff0080, 0x00ff80, 0x0080ff];
    colors.forEach((color, i) => {
      const light = new THREE.PointLight(color, 1, 800);
      light.position.set(
        Math.cos(i * Math.PI * 2 / 3) * 400,
        0,
        -400 - i * 400
      );
      scene.add(light);
      
      gsap.to(light, {
        intensity: 2,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: i * 0.5
      });
    });

    // Create sprite-based text with character reveal
    createSpriteText('CREATIVE', 200, 0, scene);
    createSpriteText('DEVELOPER', 250, -600, scene);
    createSpriteText('& DESIGNER', 180, -1200, scene);
    createSpriteText('PORTFOLIO', 280, -1800, scene);
    
    // Create character reveal text
    createCharacterRevealText('SCROLL', 150, -300, scene);
    createCharacterRevealText('EXPLORE', 150, -900, scene);
    createCharacterRevealText('DISCOVER', 150, -1500, scene);

    // Create 3D geometric shapes
    createFloatingShapes(scene);

    // Camera animation path
    const cameraPath = [
      { z: 500, x: 0, y: 0, rotation: 0 },
      { z: 0, x: -100, y: 50, rotation: 0.3 },
      { z: -600, x: 100, y: -30, rotation: -0.2 },
      { z: -1200, x: 0, y: 80, rotation: 0 },
      { z: -1800, x: -150, y: 0, rotation: 0.4 },
      { z: -2400, x: 0, y: 0, rotation: 0 }
    ];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=500%',
        scrub: 2,
        pin: true,
        anticipatePin: 1
      }
    });

    cameraPath.forEach((point, i) => {
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
    });

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Rotate particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0005;
      }

      // Spotlight follows camera
      spotLight.position.x = camera.position.x;
      spotLight.position.z = camera.position.z + 100;

      // Update depth of field focus
      updateDepthOfField(camera.position.z);

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const createParticleField = (scene: THREE.Scene) => {
    const particleCount = 3000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 4000;
      positions[i + 1] = (Math.random() - 0.5) * 2000;
      positions[i + 2] = (Math.random() - 0.5) * 5000 - 1000;

      const color = new THREE.Color();
      color.setHSL((positions[i + 2] + 3000) / 6000, 1, 0.5);

      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    particlesRef.current = particles;
    scene.add(particles);
  };

  const createSpriteText = (
    text: string,
    size: number,
    zPosition: number,
    scene: THREE.Scene
  ) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = 2048;
    canvas.height = 512;

    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${size}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Glow effect
    ctx.shadowColor = '#00ffff';
    ctx.shadowBlur = 40;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    ctx.shadowColor = '#ff00ff';
    ctx.shadowBlur = 30;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.9
    });

    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.z = zPosition;
    sprite.scale.set(600, 150, 1);

    // Animate sprite
    gsap.to(sprite.rotation, {
      z: Math.PI * 2,
      duration: 20,
      repeat: -1,
      ease: 'none'
    });

    gsap.to(sprite.material, {
      opacity: 0.5,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    scene.add(sprite);
  };

  const createFloatingShapes = (scene: THREE.Scene) => {
    const shapes = [
      { type: 'torus', z: -300 },
      { type: 'octahedron', z: -900 },
      { type: 'torus', z: -1500 }
    ];

    shapes.forEach((shapeData, i) => {
      let geometry;
      if (shapeData.type === 'torus') {
        geometry = new THREE.TorusGeometry(80, 20, 16, 100);
      } else {
        geometry = new THREE.OctahedronGeometry(60, 0);
      }

      const material = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x0066ff,
        emissiveIntensity: 0.5,
        wireframe: true
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (i % 2 === 0 ? 1 : -1) * 200,
        Math.sin(i) * 100,
        shapeData.z
      );

      scene.add(mesh);

      // Rotate shapes
      gsap.to(mesh.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 10 + i * 2,
        repeat: -1,
        ease: 'none'
      });
    });
  };

  const createCyberpunkTunnel = (scene: THREE.Scene) => {
    const tunnelSegments = 30;
    const colors = [0xff00ff, 0x00ffff, 0xff0080];

    for (let i = 0; i < tunnelSegments; i++) {
      const geometry = new THREE.TorusGeometry(250 + i * 15, 6, 16, 32);
      const material = new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        emissive: colors[i % colors.length],
        emissiveIntensity: 0.8,
        wireframe: true,
        transparent: true,
        opacity: 0.6
      });

      const ring = new THREE.Mesh(geometry, material);
      ring.position.z = -100 - i * 100;
      // Remove the X rotation so rings face the camera
      ring.rotation.x = 0;
      scene.add(ring);

      // Pulsing animation
      gsap.to(ring.scale, {
        x: 1.1,
        y: 1.1,
        z: 1.1,
        duration: 1 + i * 0.1,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });

      // Rotation animation around Z axis (facing camera)
      gsap.to(ring.rotation, {
        z: Math.PI * 2,
        duration: 20 - i * 0.3,
        repeat: -1,
        ease: 'none'
      });
    }
  };

  const createCharacterRevealText = (
    text: string,
    size: number,
    zPosition: number,
    scene: THREE.Scene
  ) => {
    const charSpacing = 80;
    const totalWidth = (text.length - 1) * charSpacing;
    const startX = -totalWidth / 2;

    text.split('').forEach((char, index) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = 512;
      canvas.height = 512;

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${size}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Neon glow
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 30;
      ctx.fillText(char, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0
      });

      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(
        startX + index * charSpacing,
        Math.sin(index * 0.5) * 50,
        zPosition
      );
      sprite.scale.set(100, 100, 1);

      // Character reveal animation with delay
      gsap.to(sprite.material, {
        opacity: 0.9,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power2.out'
      });

      gsap.from(sprite.position, {
        x: sprite.position.x + (Math.random() - 0.5) * 400,
        y: sprite.position.y + (Math.random() - 0.5) * 400,
        duration: 1.2,
        delay: index * 0.1,
        ease: 'back.out(1.7)'
      });

      gsap.from(sprite.scale, {
        x: 0,
        y: 0,
        z: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'back.out(2)'
      });

      // Floating animation
      gsap.to(sprite.position, {
        y: sprite.position.y + Math.sin(index) * 10,
        duration: 2 + index * 0.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });

      scene.add(sprite);
    });
  };

  const updateDepthOfField = (cameraZ: number) => {
    // Calculate focus distance based on camera Z position
    const focusDistance = Math.abs(cameraZ);
    
    // Update material opacity based on distance from focus
    sceneRef.current?.traverse((object) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Sprite) {
        const distance = Math.abs(object.position.z - cameraZ);
        const maxBlurDistance = 400;
        
        if (distance < maxBlurDistance) {
          const blurAmount = distance / maxBlurDistance;
          if (object.material && 'opacity' in object.material) {
            const targetOpacity = 1 - blurAmount * 0.6;
            object.material.opacity = Math.max(targetOpacity, 0.2);
          }
        }
      }
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full"
      style={{ height: '100vh' }}
    />
  );
};
