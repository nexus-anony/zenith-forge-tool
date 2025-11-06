import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as Icons from "lucide-react";
import { Card } from "@/components/ui/card";
import { portfolioData } from "@/data/portfolio-data";

export const ProfileLinksSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="links" ref={ref} className="py-20 sm:py-32 relative">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            Connect <span className="gradient-text">With Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find me on various platforms and let's collaborate
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {portfolioData.profileLinks.map((link, index) => {
            const IconComponent = Icons[link.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

            return (
              <motion.a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group"
              >
                <Card className="glass p-6 h-full flex flex-col items-center justify-center gap-4 hover:shadow-xl hover:shadow-primary/20 transition-all">
                  <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors animate-pulse-glow">
                    {IconComponent && (
                      <IconComponent className={`h-8 w-8 ${link.color || 'text-primary'}`} />
                    )}
                  </div>
                  
                  <div className="text-center">
                    <div className="font-semibold mb-1">{link.platform}</div>
                    <div className="text-xs text-muted-foreground">
                      {link.stats.label}
                    </div>
                    <div className="text-sm font-medium text-primary mt-1">
                      {link.stats.value}
                    </div>
                  </div>
                </Card>
              </motion.a>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Let's build something amazing together!
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover-scale glow-primary"
            >
              Get In Touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
