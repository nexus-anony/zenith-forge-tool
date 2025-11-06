import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolio-data";

type Category = "all" | "language" | "framework" | "tool" | "platform" | "devops";

const categoryColors: Record<Category, string> = {
  all: "border-primary",
  language: "border-tech-language",
  framework: "border-tech-framework",
  tool: "border-tech-tool",
  platform: "border-tech-platform",
  devops: "border-tech-devops",
};

const categoryLabels: Record<Category, string> = {
  all: "All",
  language: "Languages",
  framework: "Frameworks",
  tool: "Tools",
  platform: "Platforms",
  devops: "DevOps",
};

export const TechnologiesSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredTechnologies = activeCategory === "all"
    ? portfolioData.technologies
    : portfolioData.technologies.filter(tech => tech.category === activeCategory);

  return (
    <section id="technologies" ref={ref} className="py-20 sm:py-32 relative">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            Technologies & <span className="gradient-text">Tools</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My technical arsenal for building exceptional digital experiences
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {(Object.keys(categoryLabels) as Category[]).map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full hover-scale ${
                activeCategory === category 
                  ? "glow-primary" 
                  : `${categoryColors[category]} hover:bg-primary/10`
              }`}
            >
              {categoryLabels[category]}
            </Button>
          ))}
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {filteredTechnologies.map((tech, index) => {
            const IconComponent = Icons[tech.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
            const borderColor = categoryColors[tech.category as Category];

            return (
              <motion.div
                key={`${tech.name}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className={`glass p-6 rounded-2xl border-2 ${borderColor} hover:shadow-lg transition-all h-full flex flex-col items-center justify-center gap-3`}>
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors animate-pulse-glow">
                    {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
                  </div>
                  <span className="text-sm font-medium text-center">{tech.name}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Central Featured Tech (Optional Enhancement) */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full animate-pulse-glow" />
            <div className="relative glass p-8 rounded-3xl border-2 border-primary glow-primary">
              <div className="text-center space-y-4">
                <div className="text-5xl font-bold gradient-text">25+</div>
                <div className="text-lg font-medium">Technologies Mastered</div>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Continuously learning and adapting to new tools and frameworks
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
