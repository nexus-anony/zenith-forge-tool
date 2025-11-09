import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GradientTextProps {
  children: string;
  className?: string;
  colors?: string[];
}

export const GradientText = ({ 
  children, 
  className = '',
  colors = ['#a855f7', '#3b82f6', '#06b6d4', '#a855f7']
}: GradientTextProps) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Continuous gradient animation
    gsap.to(textRef.current, {
      backgroundPosition: '200% center',
      duration: 8,
      repeat: -1,
      ease: 'linear'
    });

  }, [colors]);

  return (
    <span
      ref={textRef}
      className={`gradient-text-animated ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        display: 'inline-block'
      }}
    >
      {children}
    </span>
  );
};
