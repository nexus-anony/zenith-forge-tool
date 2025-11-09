import { useEffect, useRef } from 'react';

interface SpeedLinesProps {
  velocity?: number;
  color?: string;
  count?: number;
}

export const SpeedLines = ({ 
  velocity = 0, 
  color = 'rgba(167, 139, 250, 0.5)',
  count = 30 
}: SpeedLinesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linesRef = useRef<Array<{
    x: number;
    y: number;
    length: number;
    speed: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize lines
    linesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 100 + 50,
      speed: Math.random() * 3 + 2,
      opacity: Math.random() * 0.5 + 0.2
    }));

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Only draw if velocity is significant
      if (velocity > 100) {
        const velocityMultiplier = Math.min(velocity / 1000, 3);

        linesRef.current.forEach((line) => {
          // Move line
          line.y += line.speed * velocityMultiplier * 2;

          // Reset if off screen
          if (line.y > canvas.height) {
            line.y = -line.length;
            line.x = Math.random() * canvas.width;
          }

          // Draw line
          ctx.save();
          ctx.globalAlpha = line.opacity * Math.min(velocityMultiplier / 2, 1);
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(line.x, line.y);
          ctx.lineTo(line.x, line.y + line.length * velocityMultiplier);
          ctx.stroke();
          ctx.restore();
        });
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [velocity, color, count]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
