import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, Lightbulb, Users, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import profileImage from "@/assets/profile.jpg";
import { portfolioData } from "@/data/portfolio-data";
import { Interactive3DShape } from "@/components/animations/Interactive3DShape";

const competencies = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "Building scalable applications with modern technologies",
  },
  {
    icon: Lightbulb,
    title: "Problem Solving",
    description: "Algorithmic thinking and competitive programming",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Working effectively in agile development teams",
  },
  {
    icon: Trophy,
    title: "Continuous Learning",
    description: "Always exploring new technologies and best practices",
  },
];

export const AboutSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" ref={ref} className="py-20 sm:py-32 relative overflow-hidden">
      {/* Interactive 3D shapes in background */}
      <div className="absolute top-20 right-10 w-64 h-64 opacity-30 pointer-events-auto z-0">
        <Interactive3DShape type="sphere" color={0xa78bfa} size={120} />
      </div>
      <div className="absolute bottom-40 left-10 w-48 h-48 opacity-20 pointer-events-auto z-0">
        <Interactive3DShape type="icosahedron" color={0x60a5fa} size={100} />
      </div>
      
      <div className="container px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get to know the person behind the code
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden glow-primary">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
            
            {/* Stats */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
              <Card className="glass p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold gradient-text">3+</div>
                    <div className="text-xs text-muted-foreground">Years Exp</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold gradient-text">50+</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold gradient-text">1500+</div>
                    <div className="text-xs text-muted-foreground">Problems Solved</div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6 lg:pt-8"
          >
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {portfolioData.about.intro}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {portfolioData.about.journey}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              {portfolioData.about.interests.map((interest, index) => (
                <motion.span
                  key={interest}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="px-4 py-2 rounded-full glass text-sm font-medium hover-scale"
                >
                  {interest}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Core Competencies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12"
        >
          {competencies.map((competency, index) => (
            <motion.div
              key={competency.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
            >
              <Card className="glass p-6 hover-scale group h-full">
                <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                  <competency.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{competency.title}</h3>
                <p className="text-sm text-muted-foreground">{competency.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
