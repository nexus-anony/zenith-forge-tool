import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';

gsap.registerPlugin(ScrollTrigger);

export const CinematicTypography = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const speedLinesRef = useRef<THREE.LineSegments | null>(null);
  const scrollVelocityRef = useRef(0);
  const lastScrollY = useRef(0);

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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);

    // Post-processing setup
    const composer = new EffectComposer(renderer);
    composerRef.current = composer;
    
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    
    // Bloom effect for neon glow
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.8, // strength
      0.5, // radius
      0.8  // threshold
    );
    composer.addPass(bloomPass);
    
    // Motion blur effect
    const afterimagePass = new AfterimagePass(0.88);
    composer.addPass(afterimagePass);

    // Particle field
    createParticleField(scene);

    // Hyperspace tunnel with multiple layers
    createHyperspaceTunnel(scene);
    
    // Speed lines for hyperspace effect
    createSpeedLines(scene);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(0, 200, 0);
    spotLight.angle = Math.PI / 6;
    scene.add(spotLight);

    // Tunnel lighting system
    createTunnelLights(scene);

    // Create sprite-based text with character reveal
    createSpriteText('CREATIVE', 200, 0, scene);
    createSpriteText('DEVELOPER', 250, -800, scene); // Centered in tunnel
    createSpriteText('& DESIGNER', 180, -3000, scene);
    createSpriteText('PORTFOLIO', 280, -6000, scene);
    
    // Create character reveal text
    createCharacterRevealText('SCROLL', 150, -1500, scene);
    createCharacterRevealText('EXPLORE', 150, -4500, scene);
    createCharacterRevealText('DISCOVER', 150, -9000, scene);

    // Create 3D geometric shapes
    createFloatingShapes(scene);

    // Hyperspace camera rush through tunnel
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Track scroll velocity for effects
          scrollVelocityRef.current = Math.abs(self.getVelocity() / 1000);
        }
      }
    });

    // Camera rushes through tunnel with acceleration
    tl.to(camera.position, {
      z: -15000,
      duration: 10,
      ease: 'power2.in',
      onUpdate: function() {
        // Add camera shake during fast sections
        const progress = this.progress();
        if (progress > 0.3 && progress < 0.8) {
          const shakeIntensity = Math.sin(progress * Math.PI) * 20;
          camera.position.x = (Math.random() - 0.5) * shakeIntensity;
          camera.position.y = (Math.random() - 0.5) * shakeIntensity;
        }
      }
    })
    // FOV increases for speed effect
    .to(camera, {
      fov: 110,
      duration: 10,
      ease: 'power2.in',
      onUpdate: () => {
        camera.updateProjectionMatrix();
      }
    }, 0);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Rotate particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0005;
      }

      // Animate speed lines
      if (speedLinesRef.current) {
        const positions = speedLinesRef.current.geometry.attributes.position;
        for (let i = 0; i < positions.count; i += 2) {
          let z = positions.getZ(i);
          z += 50; // Move toward camera
          if (z > camera.position.z + 500) {
            z = camera.position.z - 2000; // Reset behind camera
          }
          positions.setZ(i, z);
          positions.setZ(i + 1, z + 100);
        }
        positions.needsUpdate = true;
      }

      // Spotlight follows camera
      spotLight.position.x = camera.position.x;
      spotLight.position.z = camera.position.z + 100;
      spotLight.target.position.set(camera.position.x, camera.position.y, camera.position.z - 500);
      spotLight.target.updateMatrixWorld();

      // Update depth of field focus
      updateDepthOfField(camera.position.z);

      // Render with post-processing
      if (composerRef.current) {
        composerRef.current.render();
      }
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

    // Special treatment for DEVELOPER text (tunnel center)
    if (text === 'DEVELOPER') {
      // Counter-rotate to tunnel
      gsap.to(sprite.rotation, {
        z: -Math.PI * 2,
        duration: 25,
        repeat: -1,
        ease: 'none'
      });

      // Holographic glow pulse
      gsap.to(sprite.material, {
        opacity: 1,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
    } else {
      // Animate other sprites
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
    }

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

  const createHyperspaceTunnel = (scene: THREE.Scene) => {
    const isMobile = window.innerWidth < 768;
    const tunnelSegments = isMobile ? 30 : 120;
    const tunnelLayers = [150, 300, 450]; // Three nested tunnel layers
    const neonColors = [0x00ffff, 0xff00ff, 0xff0080, 0x00ff80];

    // Create instanced mesh for performance
    tunnelLayers.forEach((baseRadius, layerIndex) => {
      const geometry = new THREE.TorusGeometry(1, 1, 16, 32);
      const instancedMesh = new THREE.InstancedMesh(
        geometry,
        new THREE.MeshStandardMaterial({
          emissiveIntensity: 0.8,
          wireframe: true,
          transparent: true,
          opacity: 0.6
        }),
        tunnelSegments
      );

      const dummy = new THREE.Object3D();

      for (let i = 0; i < tunnelSegments; i++) {
        const radius = baseRadius + i * 3;
        const thickness = 8 + Math.random() * 4;
        const zPos = -100 - i * 150;

        // Position and scale
        dummy.position.set(0, 0, zPos);
        dummy.scale.set(radius, radius, thickness);
        dummy.rotation.x = 0; // Face camera
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);

        // Set color based on Z position (gradient along tunnel)
        const color = new THREE.Color();
        const hue = ((zPos + 3000) / 18000 + layerIndex * 0.1) % 1;
        color.setHSL(hue, 1, 0.5);
        instancedMesh.setColorAt(i, color);

        // Individual ring animations
        const ring = { 
          index: i, 
          mesh: instancedMesh,
          scale: { x: 1, y: 1, z: 1 },
          rotation: { z: 0 },
          baseRadius: radius
        };

        // Breathing pulse animation
        gsap.to(ring.scale, {
          x: 0.95 + Math.random() * 0.1,
          y: 0.95 + Math.random() * 0.1,
          z: 0.95 + Math.random() * 0.1,
          duration: 1.5 + i * 0.02,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          onUpdate: () => {
            dummy.position.set(0, 0, zPos);
            dummy.scale.set(radius * ring.scale.x, radius * ring.scale.y, thickness * ring.scale.z);
            dummy.rotation.z = ring.rotation.z;
            dummy.updateMatrix();
            instancedMesh.setMatrixAt(i, dummy.matrix);
            instancedMesh.instanceMatrix.needsUpdate = true;
          }
        });

        // Counter-rotating patterns
        const direction = (i + layerIndex) % 2 === 0 ? 1 : -1;
        gsap.to(ring.rotation, {
          z: direction * Math.PI * 2,
          duration: 3 + Math.random() * 5,
          repeat: -1,
          ease: 'none'
        });

        // Inner glow layer
        if (i % 2 === 0) {
          const glowGeometry = new THREE.TorusGeometry(radius + 10, thickness + 2, 16, 32);
          const glowMaterial = new THREE.MeshStandardMaterial({
            color: neonColors[i % neonColors.length],
            emissive: neonColors[i % neonColors.length],
            emissiveIntensity: 1.2,
            side: THREE.BackSide,
            transparent: true,
            opacity: 0.3,
            wireframe: false
          });
          const glowRing = new THREE.Mesh(glowGeometry, glowMaterial);
          glowRing.position.z = zPos;
          scene.add(glowRing);

          // Glow pulse
          gsap.to(glowMaterial, {
            opacity: 0.5,
            duration: 1 + i * 0.05,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut'
          });
        }
      }

      instancedMesh.instanceMatrix.needsUpdate = true;
      if (instancedMesh.instanceColor) {
        instancedMesh.instanceColor.needsUpdate = true;
      }

      // Set material properties
      const material = instancedMesh.material as THREE.MeshStandardMaterial;
      const layerColor = neonColors[layerIndex % neonColors.length];
      material.color.setHex(layerColor);
      material.emissive.setHex(layerColor);

      scene.add(instancedMesh);
    });
  };

  const createSpeedLines = (scene: THREE.Scene) => {
    const lineCount = 500;
    const positions = new Float32Array(lineCount * 6); // 2 vertices per line, 3 coords per vertex
    const colors = new Float32Array(lineCount * 6);

    for (let i = 0; i < lineCount; i++) {
      const angle = (i / lineCount) * Math.PI * 2;
      const radius = 350 + Math.random() * 100;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = -Math.random() * 3000;

      // Start point
      positions[i * 6] = x;
      positions[i * 6 + 1] = y;
      positions[i * 6 + 2] = z;

      // End point (100px line)
      positions[i * 6 + 3] = x;
      positions[i * 6 + 4] = y;
      positions[i * 6 + 5] = z + 100;

      // Cyan color with fade
      const color = new THREE.Color(0x00ffff);
      colors[i * 6] = color.r;
      colors[i * 6 + 1] = color.g;
      colors[i * 6 + 2] = color.b;
      colors[i * 6 + 3] = color.r;
      colors[i * 6 + 4] = color.g;
      colors[i * 6 + 5] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });

    const speedLines = new THREE.LineSegments(geometry, material);
    speedLinesRef.current = speedLines;
    scene.add(speedLines);
  };

  const createTunnelLights = (scene: THREE.Scene) => {
    const lightPositions = 120;
    const colors = [0x00ffff, 0xff00ff, 0xff0080, 0x00ff80];

    for (let i = 0; i < lightPositions; i++) {
      if (i % 5 === 0) { // Every 5th ring
        const color = colors[i % colors.length];
        const light = new THREE.PointLight(color, 1, 1000);
        light.position.set(0, 0, -100 - i * 150);
        scene.add(light);

        // Pulsing intensity with sine wave
        gsap.to(light, {
          intensity: 2,
          duration: 2 + i * 0.02,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });

        // Color cycling
        gsap.to(light.color, {
          r: Math.random(),
          g: Math.random(),
          b: Math.random(),
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
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
