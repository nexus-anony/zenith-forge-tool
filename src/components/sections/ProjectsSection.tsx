import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/data/portfolio-data";
import { useState, useRef, useEffect } from "react";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";
import { Interactive3DShape } from "@/components/animations/Interactive3DShape";

const projectImages: Record<string, string> = {
  project1,
  project2,
  project3,
};

export const ProjectsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeProject, setActiveProject] = useState(0);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = projectRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setActiveProject(index);
            }
          });
        },
        { threshold: [0.5], rootMargin: "-20% 0px -20% 0px" }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const project = portfolioData.projects[activeProject];

  return (
    <section id="projects" ref={ref} className="py-20 sm:py-32 relative overflow-hidden">
      <Interactive3DShape type="torus" color="#60a5fa" size={70} position={{ x: 100, y: 50, z: -100 }} />
      <div className="container px-4 sm:px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            Curated <span className="gradient-text italic font-serif">work</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Showcasing my best work and real-world solutions
          </p>
        </motion.div>
      </div>

      {/* Split Layout - Vertical Scroll */}
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left Side - Vertically Stacked Projects */}
          <div className="w-full lg:w-1/2 space-y-16 order-2 lg:order-1">
            {portfolioData.projects.map((proj, index) => (
              <motion.div
                key={proj.id}
                ref={(el) => (projectRefs.current[index] = el)}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5, margin: "-10%" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className={`glass overflow-hidden group transition-all duration-500 ${
                  activeProject === index 
                    ? 'border-primary/50 shadow-2xl shadow-primary/20 scale-100' 
                    : 'border-border/20 opacity-40 scale-95'
                }`}>
                  <div className="relative h-[400px] sm:h-[500px] overflow-hidden rounded-lg">
                    <img
                      src={projectImages[proj.image]}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    
                    {/* Title Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        {proj.title}
                      </h3>
                      <div className="flex gap-2">
                        <Badge className="glass backdrop-blur-md bg-background/80">
                          <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
                          {proj.metrics.stars}
                        </Badge>
                        <Badge className="glass backdrop-blur-md bg-background/80">
                          {proj.metrics.users}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Right Side - Sticky Project Details */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-24 lg:h-[calc(100vh-12rem)] lg:overflow-y-auto order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 pb-8"
              >
                {/* Header Line */}
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="h-1 bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: 48 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                  <h3 className="text-3xl sm:text-4xl font-bold gradient-text">
                    {project.title}
                  </h3>
                </div>

                {/* Description */}
                <motion.p 
                  className="text-muted-foreground text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {project.description}
                </motion.p>

                {/* Features */}
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {project.features.map((feature, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + idx * 0.1 }}
                      className="flex items-start gap-3 text-foreground/90"
                    >
                      <span className="text-primary text-xl mt-0.5 font-bold">+</span>
                      <span className="text-base">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Tech Stack */}
                <motion.div 
                  className="space-y-3 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.8 + idx * 0.05 }}
                      >
                        <Badge 
                          variant="outline" 
                          className="text-xs px-3 py-1 bg-background/50 backdrop-blur-sm hover:bg-primary/10 transition-colors"
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex gap-3 pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <Button asChild className="flex-1 glow-primary">
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* View More */}
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20"
        >
          <Button size="lg" variant="outline" className="hover-scale" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 mr-2" />
              View All Projects on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
