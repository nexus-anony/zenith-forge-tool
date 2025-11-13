'use client';

import { CinematicTypography } from "@/components/animations/CinematicTypography";

export const Cinematic3DSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      <CinematicTypography />
      
      {/* Overlay content */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="text-center space-y-4 opacity-0 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
          <p className="text-muted-foreground text-sm sm:text-base">Scroll to explore</p>
        </div>
      </div>
    </section>
  );
};
