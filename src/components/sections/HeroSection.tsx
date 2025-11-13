import { useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleNetwork } from "@/components/animations/ParticleNetwork";
import { ScrollTypography } from "@/components/animations/ScrollTypography";
import { GradientText } from "@/components/animations/GradientText";
import heroImage from "@/assets/hero-bg.jpg";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    // Parallax effect for background
    gsap.to('.hero-bg-image', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: '30%',
      scale: 1.2,
      ease: 'none'
    });

    // Hero content fade and scale on scroll
    gsap.to('.hero-content', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: '15%',
      opacity: 0.3,
      scale: 0.9,
      ease: 'none'
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="hero-bg-image absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background" />
      </div>

      {/* Particle Network */}
      <ParticleNetwork />

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 py-20 hero-content">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm sm:text-base text-muted-foreground font-medium"
          >
            Hi there! I'm
          </motion.div>

          {/* Name with Scroll Typography */}
          <div ref={titleRef} className="text-4xl sm:text-6xl lg:text-7xl font-bold">
            <GradientText className="text-4xl sm:text-6xl lg:text-7xl font-bold">
              Alex Developer
            </GradientText>
          </div>

          {/* Animated Title with Scroll Effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-bold"
          >
            <TypeAnimation
              sequence={[
                "Full-Stack Developer",
                2000,
                "UI/UX Enthusiast",
                2000,
                "Problem Solver",
                2000,
                "Competitive Programmer",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="gradient-text-secondary"
            />
          </motion.div>

          {/* Description with Kinetic Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            <ScrollTypography
              text="Specializing in building exceptional digital experiences"
              className="text-base sm:text-lg lg:text-xl text-muted-foreground"
              delay={0.5}
              enableMagnetic={true}
              enableVelocity={true}
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button
              size="lg"
              className="group glow-primary hover-scale w-full sm:w-auto"
              asChild
            >
              <a href="#projects">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hover-scale w-full sm:w-auto"
              asChild
            >
              <a href="#contact">
                Contact Me
                <Mail className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex items-center justify-center gap-4 pt-8"
          >
            {[
              { icon: Github, href: "https://github.com" },
              { icon: Linkedin, href: "https://linkedin.com" },
              { icon: Mail, href: "mailto:alex@developer.com" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass hover:bg-primary/20 transition-colors hover-scale"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2 cursor-pointer hover:border-primary transition-colors"
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-primary rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
