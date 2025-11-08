import { useEffect, useState, useRef } from 'react';

export const useScrollVelocity = () => {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    let ticking = false;

    const updateVelocity = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastTime.current;
      
      if (timeDiff > 0) {
        const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);
        const currentVelocity = scrollDiff / timeDiff * 1000; // pixels per second
        
        setVelocity(currentVelocity);
        
        lastScrollY.current = currentScrollY;
        lastTime.current = currentTime;
      }
      
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateVelocity);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return velocity;
};
