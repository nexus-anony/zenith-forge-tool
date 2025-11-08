import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Text3D } from '@/components/three/Text3D';
import { ParticleField } from '@/components/three/ParticleField';
import { ProjectCard3D } from '@/components/three/ProjectCard3D';
import { CameraController } from '@/components/three/CameraController';
import projectsData from '@/data/projects.json';
import aboutData from '@/data/about.json';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  zPosition: number;
  color: string;
}

export const CinematicScene = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const projects: Project[] = projectsData.projects;
  const particleCount = isMobile ? 300 : 3000;

  return (
    <div id="cinematic-scroll-container" className="relative" style={{ height: '500vh' }}>
      {/* Fixed Canvas */}
      <div className="fixed inset-0 w-full h-screen">
        <Canvas
          camera={{ 
            position: [0, 0, 500], 
            fov: 75, 
            near: 0.1, 
            far: 10000 
          }}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
          }}
        >
          {/* Background */}
          <color attach="background" args={['#000510']} />
          <fog attach="fog" args={['#000510', 100, 3000]} />

          {/* Lighting */}
          <ambientLight intensity={0.3} />
          
          <spotLight
            position={[0, 200, 0]}
            angle={Math.PI / 6}
            penumbra={0.3}
            intensity={1.5}
            castShadow
          />

          {/* Pulsing point lights */}
          <pointLight position={[300, 0, -500]} intensity={1} distance={800} color="#ff0080" />
          <pointLight position={[-300, 0, -800]} intensity={1} distance={800} color="#00ff80" />
          <pointLight position={[300, 0, -1200]} intensity={1} distance={800} color="#0080ff" />
          <pointLight position={[-300, 0, -1500]} intensity={1} distance={800} color="#ff8000" />

          {/* Scene Content */}
          <Suspense fallback={null}>
            {/* Section Titles */}
            {aboutData.sections.map((section, i) => (
              <Text3D
                key={i}
                text={section.title}
                position={[0, 100, section.position]}
                size={80}
                color="#ffffff"
                emissive="#0066ff"
              />
            ))}

            {/* Project Cards */}
            {projects.map((project, i) => (
              <ProjectCard3D
                key={project.id}
                title={project.title}
                description={project.description}
                tech={project.tech}
                position={[
                  (i % 2 === 0 ? 1 : -1) * 350,
                  Math.sin(i) * 50,
                  project.zPosition
                ]}
                color={project.color}
              />
            ))}

            {/* Particle Field */}
            <ParticleField count={particleCount} />

            {/* Camera Controller */}
            <CameraController scrollContainerId="cinematic-scroll-container" />
          </Suspense>

          {/* Post-processing Effects */}
          {!isMobile && (
            <EffectComposer>
              <Bloom
                intensity={0.5}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
              />
            </EffectComposer>
          )}
        </Canvas>
      </div>

      {/* Scroll Instructions */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div className="text-center space-y-2 animate-fade-in">
          <p className="text-muted-foreground text-sm">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full mx-auto flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-primary rounded-full animate-[bounce_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
};
