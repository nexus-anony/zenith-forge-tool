import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(167, 139, 250, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(96, 165, 250, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 80%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(167, 139, 250, 0.15) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Main loading content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Animated logo/text */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <motion.h1
                className="text-6xl sm:text-8xl font-bold gradient-text"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(167, 139, 250, 0.5)',
                    '0 0 40px rgba(96, 165, 250, 0.5)',
                    '0 0 20px rgba(167, 139, 250, 0.5)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Portfolio
              </motion.h1>

              {/* Orbiting particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                  style={{
                    background: i === 0 ? '#a78bfa' : i === 1 ? '#60a5fa' : '#22d3ee',
                  }}
                  animate={{
                    x: [0, Math.cos(i * (Math.PI * 2) / 3) * 100],
                    y: [0, Math.sin(i * (Math.PI * 2) / 3) * 100],
                    rotate: 360,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 sm:w-96">
              <div className="relative h-2 bg-background/50 rounded-full overflow-hidden border border-primary/20">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 50%, #22d3ee 100%)',
                    boxShadow: '0 0 20px rgba(167, 139, 250, 0.5)',
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Progress text */}
              <motion.div
                className="mt-4 text-center text-sm text-muted-foreground font-mono"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Loading experience... {Math.round(progress)}%
              </motion.div>
            </div>

            {/* Loading dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-primary/30"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-primary/30"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-primary/30"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-primary/30"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
