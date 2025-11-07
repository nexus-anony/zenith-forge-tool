import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { portfolioData } from "@/data/portfolio-data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";

const projectImages: Record<string, string> = {
  project1,
  project2,
  project3,
};

export const ProjectsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="projects" ref={ref} className="py-20 sm:py-32 relative">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            Curated <span className="gradient-text italic">work</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Showcasing my best work and real-world solutions
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent>
            {portfolioData.projects.map((project, index) => (
              <CarouselItem key={project.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex flex-col lg:flex-row gap-8 items-center"
                >
                  {/* Project Image - Left Side */}
                  <div className="w-full lg:w-1/2">
                    <Card className="glass overflow-hidden group border-primary/20">
                      <div className="relative h-[400px] sm:h-[500px] overflow-hidden rounded-lg">
                        <img
                          src={projectImages[project.image]}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                        
                        {/* Metrics Overlay */}
                        <div className="absolute top-4 right-4 flex gap-2">
                          <Badge className="glass backdrop-blur-md bg-background/80">
                            <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
                            {project.metrics.stars}
                          </Badge>
                          <Badge className="glass backdrop-blur-md bg-background/80">
                            {project.metrics.users} users
                          </Badge>
                        </div>

                        {/* Action Buttons Overlay */}
                        <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                          <Button asChild className="flex-1 glow-primary">
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Live Demo
                            </a>
                          </Button>
                          <Button asChild variant="outline" className="flex-1">
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-2" />
                              Code
                            </a>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Project Details - Right Side */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-1 w-12 bg-primary rounded-full" />
                      <h3 className="text-3xl sm:text-4xl font-bold gradient-text">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {project.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3">
                      {project.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-foreground/90">
                          <span className="text-primary text-xl mt-0.5">+</span>
                          <span className="text-base">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-3 pt-4">
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="outline" 
                            className="text-xs px-3 py-1 bg-background/50 backdrop-blur-sm hover:bg-primary/10 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex justify-center gap-4 mt-12">
            <CarouselPrevious className="relative left-0 translate-x-0 translate-y-0 h-12 w-12" />
            <CarouselNext className="relative right-0 translate-x-0 translate-y-0 h-12 w-12" />
          </div>
        </Carousel>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
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
