'use client';

import { useEffect, useRef, memo } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CinematicTypographyComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const explosionsRef = useRef<THREE.Points[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup with vibrant background
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x0a0a1a, 0.0003);

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

    // Renderer setup with context loss handling
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      failIfMajorPerformanceCaveat: false
    });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    
    // Handle WebGL context loss/restore
    const canvas = renderer.domElement;
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.log('WebGL context lost');
      cancelAnimationFrame(animationId);
    };
    
    const handleContextRestored = () => {
      console.log('WebGL context restored');
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);
    
    containerRef.current.appendChild(renderer.domElement);

    // Parallax star field layers
    createParallaxStarField(scene);

    // Particle field
    createParticleField(scene);

    // Lighting with design system colors
    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.8);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xa78bfa, 3);
    spotLight.position.set(0, 200, 0);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.5;
    scene.add(spotLight);

    // Reduced point lights to prevent shader errors
    const colors = [0xa78bfa, 0x60a5fa, 0x22d3ee];
    colors.forEach((color, i) => {
      const light = new THREE.PointLight(color, 1.5, 1000);
      light.position.set(
        Math.cos(i * Math.PI * 2 / 3) * 400,
        Math.sin(i * Math.PI) * 150,
        -800 - i * 600
      );
      scene.add(light);
      
      gsap.to(light, {
        intensity: 2.5,
        duration: 2 + i * 0.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: i * 0.5
      });
    });

    // Create enhanced typography with different styles
    createHolographicText('CREATIVE', 220, 0, scene, 0xa78bfa);
    createGlitchText('DEVELOPER', 280, -600, scene);
    createNeonText('& DESIGNER', 200, -1200, scene, 0x22d3ee);
    createChromeText('PORTFOLIO', 300, -1800, scene);
    
    // Create character reveal text with explosions
    createCharacterRevealText('INNOVATE', 150, -300, scene);
    createCharacterRevealText('EXPLORE', 150, -900, scene);
    createCharacterRevealText('DISCOVER', 150, -1500, scene);

    // Create 3D geometric shapes
    createEnhancedFloatingShapes(scene);
    
    // Floating UI panels
    createFloatingUIPanel('SKILLS', -300, 100, -400, scene);
    createFloatingUIPanel('PROJECTS', 300, -80, -1000, scene);
    createFloatingUIPanel('ABOUT', -280, 120, -1600, scene);

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
        end: '+=300%',
        scrub: 2,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
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
        particlesRef.current.rotation.x += 0.0002;
      }
      
      // Animate explosions
      explosionsRef.current.forEach((explosion, i) => {
        explosion.rotation.y += 0.01 + i * 0.002;
        explosion.rotation.x += 0.005;
        if (explosion.material instanceof THREE.PointsMaterial) {
          explosion.material.opacity = Math.max(0.3, explosion.material.opacity);
        }
      });

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
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      cancelAnimationFrame(animationId);
      
      // Kill all GSAP tweens
      gsap.killTweensOf('*');
      
      // Dispose all geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material?.dispose();
          }
        }
        if (object instanceof THREE.Sprite) {
          object.material?.dispose();
          object.material?.map?.dispose();
        }
        if (object instanceof THREE.Points) {
          object.geometry?.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material?.dispose();
          }
        }
      });
      
      renderer.dispose();
      renderer.forceContextLoss();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const createParallaxStarField = (scene: THREE.Scene) => {
    // Create 3 layers of stars at different depths
    const layers = [
      { count: 1500, depth: 8000, size: 2, speed: 0.0002, color: 0xa78bfa },
      { count: 1000, depth: 5000, size: 3, speed: 0.0005, color: 0x60a5fa },
      { count: 500, depth: 3000, size: 4, speed: 0.001, color: 0x22d3ee }
    ];

    layers.forEach((layer, layerIndex) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(layer.count * 3);
      const colors = new Float32Array(layer.count * 3);

      for (let i = 0; i < layer.count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * layer.depth;
        positions[i + 1] = (Math.random() - 0.5) * layer.depth * 0.5;
        positions[i + 2] = (Math.random() - 0.5) * layer.depth - layerIndex * 1000;

        const color = new THREE.Color(layer.color);
        color.multiplyScalar(0.5 + Math.random() * 0.5);
        
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: layer.size,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });

      const stars = new THREE.Points(geometry, material);
      scene.add(stars);

      // Animate each layer
      gsap.to(stars.rotation, {
        y: Math.PI * 2,
        duration: 100 - layerIndex * 20,
        repeat: -1,
        ease: 'none'
      });
    });
  };

  const createParticleField = (scene: THREE.Scene) => {
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 4000;
      positions[i + 1] = (Math.random() - 0.5) * 2000;
      // Push particles further back
      positions[i + 2] = (Math.random() - 0.5) * 5000 - 2000;

      const color = new THREE.Color();
      const hue = (positions[i + 2] + 3000) / 6000;
      color.setHSL(hue, 0.9, 0.6);

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
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    particlesRef.current = particles;
    scene.add(particles);
  };

  const createHolographicText = (
    text: string,
    size: number,
    zPosition: number,
    scene: THREE.Scene,
    color: number
  ) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = 2048;
    canvas.height = 512;

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#a78bfa');
    gradient.addColorStop(0.5, '#60a5fa');
    gradient.addColorStop(1, '#22d3ee');

    ctx.fillStyle = gradient;
    ctx.font = `bold ${size}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Holographic glow
    ctx.shadowColor = `#${color.toString(16)}`;
    ctx.shadowBlur = 60;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.95
    });

    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.z = zPosition;
    sprite.scale.set(700, 175, 1);

    gsap.to(sprite.material, {
      opacity: 0.7,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    scene.add(sprite);
  };

  const createGlitchText = (
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

    // RGB split effect
    ctx.shadowColor = '#ff0080';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = -5;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    ctx.shadowColor = '#00ffff';
    ctx.shadowOffsetX = 5;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    ctx.shadowColor = 'transparent';
    ctx.shadowOffsetX = 0;
    ctx.shadowBlur = 50;
    ctx.shadowColor = '#ffffff';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 1
    });

    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.z = zPosition;
    sprite.scale.set(800, 200, 1);

    // Glitch animation
    gsap.to(sprite.position, {
      x: '+=5',
      duration: 0.1,
      yoyo: true,
      repeat: -1,
      repeatDelay: 2
    });

    scene.add(sprite);
  };

  const createNeonText = (
    text: string,
    size: number,
    zPosition: number,
    scene: THREE.Scene,
    color: number
  ) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = 2048;
    canvas.height = 512;

    ctx.fillStyle = `#${color.toString(16)}`;
    ctx.font = `bold ${size}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Neon glow layers
    for (let i = 0; i < 5; i++) {
      ctx.shadowColor = `#${color.toString(16)}`;
      ctx.shadowBlur = 80 - i * 15;
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    }

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.9
    });

    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.z = zPosition;
    sprite.scale.set(650, 162, 1);

    gsap.to(sprite.material, {
      opacity: 0.6,
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut'
    });

    scene.add(sprite);
  };

  const createChromeText = (
    text: string,
    size: number,
    zPosition: number,
    scene: THREE.Scene
  ) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = 2048;
    canvas.height = 512;

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.4, '#c0c0c0');
    gradient.addColorStop(0.6, '#808080');
    gradient.addColorStop(1, '#ffffff');

    ctx.fillStyle = gradient;
    ctx.font = `bold ${size}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 40;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.95
    });

    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.z = zPosition;
    sprite.scale.set(850, 212, 1);

    gsap.to(sprite.rotation, {
      z: Math.PI * 0.1,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    scene.add(sprite);
  };

  const createEnhancedFloatingShapes = (scene: THREE.Scene) => {
    const shapes = [
      { type: 'torus', z: -300, color: 0xa78bfa },
      { type: 'octahedron', z: -600, color: 0x60a5fa },
      { type: 'icosahedron', z: -900, color: 0x22d3ee },
      { type: 'torusKnot', z: -1200, color: 0xec4899 },
      { type: 'dodecahedron', z: -1500, color: 0xf59e0b },
      { type: 'torus', z: -1800, color: 0xa78bfa }
    ];

    shapes.forEach((shapeData, i) => {
      let geometry;
      switch (shapeData.type) {
        case 'torus':
          geometry = new THREE.TorusGeometry(90, 25, 20, 100);
          break;
        case 'octahedron':
          geometry = new THREE.OctahedronGeometry(70, 1);
          break;
        case 'icosahedron':
          geometry = new THREE.IcosahedronGeometry(65, 0);
          break;
        case 'torusKnot':
          geometry = new THREE.TorusKnotGeometry(50, 15, 100, 16);
          break;
        case 'dodecahedron':
          geometry = new THREE.DodecahedronGeometry(60, 0);
          break;
        default:
          geometry = new THREE.TorusGeometry(80, 20, 16, 100);
      }

      const material = new THREE.MeshBasicMaterial({
        color: shapeData.color,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (i % 2 === 0 ? 1 : -1) * (200 + i * 20),
        Math.sin(i) * 120,
        shapeData.z
      );

      scene.add(mesh);

      // Complex rotation
      gsap.to(mesh.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        z: Math.PI * 2,
        duration: 8 + i * 1.5,
        repeat: -1,
        ease: 'none'
      });

      // Pulsing scale
      gsap.to(mesh.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 2 + i * 0.3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });

      // Floating motion
      gsap.to(mesh.position, {
        y: mesh.position.y + 50,
        duration: 3 + i * 0.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
    });
  };


  const createParticleExplosion = (
    x: number,
    y: number,
    z: number,
    scene: THREE.Scene
  ) => {
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 150;
      
      positions[i] = x + Math.cos(angle) * radius;
      positions[i + 1] = y + Math.sin(angle) * radius;
      positions[i + 2] = z + (Math.random() - 0.5) * 100;

      const explosionColors = [
        new THREE.Color(0xa78bfa),
        new THREE.Color(0x60a5fa),
        new THREE.Color(0x22d3ee),
        new THREE.Color(0xec4899)
      ];
      
      const color = explosionColors[Math.floor(Math.random() * explosionColors.length)];
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 6,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const explosion = new THREE.Points(geometry, material);
    explosionsRef.current.push(explosion);
    scene.add(explosion);

    // Explosion animation
    gsap.fromTo(material, 
      { opacity: 0 },
      { 
        opacity: 0.8,
        duration: 0.5,
        ease: 'power2.out'
      }
    );

    gsap.to(explosion.scale, {
      x: 2,
      y: 2,
      z: 2,
      duration: 2,
      ease: 'power2.out'
    });
  };

  const createFloatingUIPanel = (
    title: string,
    x: number,
    y: number,
    z: number,
    scene: THREE.Scene
  ) => {
    // Create panel background
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = 512;
    canvas.height = 256;

    // Glassmorphism effect
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(167, 139, 250, 0.2)');
    gradient.addColorStop(1, 'rgba(96, 165, 250, 0.1)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = 'rgba(167, 139, 250, 0.5)';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = '#a78bfa';
    ctx.shadowBlur = 20;
    ctx.fillText(title, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.9
    });

    const panel = new THREE.Sprite(spriteMaterial);
    panel.position.set(x, y, z);
    panel.scale.set(300, 150, 1);

    scene.add(panel);

    // Floating animation
    gsap.to(panel.position, {
      y: y + 30,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    // Gentle rotation
    gsap.to(panel.rotation, {
      z: Math.PI * 0.05,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    // Opacity pulse
    gsap.to(panel.material, {
      opacity: 0.6,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });
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

export const CinematicTypography = memo(CinematicTypographyComponent);
