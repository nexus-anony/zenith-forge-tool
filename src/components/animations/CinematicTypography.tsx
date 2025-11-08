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

    // Create sprite-based text (performance optimized)
    createSpriteText('CREATIVE', 200, 0, scene);
    createSpriteText('DEVELOPER', 250, -600, scene);
    createSpriteText('& DESIGNER', 180, -1200, scene);
    createSpriteText('PORTFOLIO', 280, -1800, scene);

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

  return (
    <div 
      ref={containerRef} 
      className="relative w-full"
      style={{ height: '100vh' }}
    />
  );
};
