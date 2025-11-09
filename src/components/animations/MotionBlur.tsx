import { motion } from 'framer-motion';
import { useScrollVelocity } from '@/hooks/useScrollVelocity';

export const MotionBlur = () => {
  const velocity = useScrollVelocity();
  
  // Calculate blur based on velocity
  const blur = Math.min(velocity / 200, 10);
  const opacity = Math.min(velocity / 2000, 0.3);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-40"
      style={{
        background: `linear-gradient(180deg, transparent 0%, rgba(167, 139, 250, ${opacity}) 50%, transparent 100%)`,
        filter: `blur(${blur}px)`,
        transition: 'all 0.1s ease-out'
      }}
    />
  );
};
