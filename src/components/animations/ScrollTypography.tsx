'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollVelocity } from '@/hooks/useScrollVelocity';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollTypographyProps {
  text: string;
  className?: string;
  delay?: number;
  enableMagnetic?: boolean;
  enableVelocity?: boolean;
}

export const ScrollTypography = ({ 
  text, 
  className = '', 
  delay = 0,
  enableMagnetic = true,
  enableVelocity = true
}: ScrollTypographyProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const velocity = useScrollVelocity();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = charsRef.current;
    const container = containerRef.current;

    // Initial animation - Particle assembly
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.from(chars, {
      opacity: 0,
      scale: 0,
      x: () => gsap.utils.random(-400, 400),
      y: () => gsap.utils.random(-300, 300),
      rotation: () => gsap.utils.random(-180, 180),
      stagger: {
        each: 0.02,
        from: 'random'
      },
      duration: 1.2,
      ease: 'power3.out',
      delay: delay
    });

    // 3D flip animation
    tl.to(chars, {
      rotationY: 360,
      stagger: 0.03,
      duration: 0.8,
      ease: 'power2.inOut'
    }, '-=0.6');

    // Continuous floating animation
    chars.forEach((char, i) => {
      gsap.to(char, {
        y: () => Math.sin(i * 0.5) * 8,
        rotation: () => Math.sin(i * 0.3) * 2,
        duration: 2 + (i % 3),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.1
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [delay]);

  // Velocity-based effects
  useEffect(() => {
    if (!enableVelocity || !containerRef.current) return;

    const chars = charsRef.current;
    const blur = Math.min(velocity / 100, 8);
    const skew = Math.min(velocity / 200, 5);

    gsap.to(chars, {
      filter: `blur(${blur}px)`,
      skewY: skew,
      duration: 0.3,
      ease: 'power2.out'
    });
  }, [velocity, enableVelocity]);

  // Magnetic effect
  useEffect(() => {
    if (!enableMagnetic || !containerRef.current) return;

    const chars = charsRef.current;
    const container = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;

      chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;

        const distance = Math.hypot(e.clientX - charX, e.clientY - charY);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const angle = Math.atan2(e.clientY - charY, e.clientX - charX);
          const force = (1 - distance / maxDistance) * 30;

          gsap.killTweensOf(char);
          gsap.to(char, {
            x: Math.cos(angle) * force,
            y: Math.sin(angle) * force,
            scale: 1 + force / 100,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: true
          });
        } else {
          gsap.killTweensOf(char);
          gsap.to(char, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)',
            overwrite: true
          });
        }
      });
    };

    const handleMouseLeave = () => {
      chars.forEach((char) => {
        gsap.killTweensOf(char);
        gsap.to(char, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'elastic.out(1, 0.3)',
          overwrite: true
        });
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      // Kill all tweens on cleanup
      chars.forEach(char => gsap.killTweensOf(char));
    };
  }, [enableMagnetic, isHovered]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      ref={containerRef}
      className={`scroll-typography ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          ref={(el) => {
            if (el) charsRef.current[index] = el;
          }}
          className="scroll-char inline-block"
          style={{ 
            display: 'inline-block',
            transformStyle: 'preserve-3d',
            perspective: 1000
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};
