'use client';

import { useState, useEffect, lazy, Suspense } from "react";
import { Navigation } from "@/src/components/Navigation";
import { HeroSection } from "@/src/components/sections/HeroSection";
import { LoadingScreen } from "@/src/components/animations/LoadingScreen";
import dynamic from 'next/dynamic';

// Dynamic imports with SSR disabled for Three.js components
const Cinematic3DSection = dynamic(
  () => import("@/src/components/sections/Cinematic3DSection").then(m => ({ default: m.Cinematic3DSection })),
  { ssr: false, loading: () => <div className="h-screen bg-background" /> }
);

const AboutSection = dynamic(
  () => import("@/src/components/sections/AboutSection").then(m => ({ default: m.AboutSection })),
  { ssr: false, loading: () => <div className="h-96 bg-background" /> }
);

const TechnologiesSection = dynamic(
  () => import("@/src/components/sections/TechnologiesSection").then(m => ({ default: m.TechnologiesSection })),
  { ssr: false, loading: () => <div className="h-96 bg-background" /> }
);

const ProjectsSection = dynamic(
  () => import("@/src/components/sections/ProjectsSection").then(m => ({ default: m.ProjectsSection })),
  { ssr: false, loading: () => <div className="h-screen bg-background" /> }
);

const AchievementsSection = dynamic(
  () => import("@/src/components/sections/AchievementsSection").then(m => ({ default: m.AchievementsSection })),
  { ssr: false, loading: () => <div className="h-96 bg-background" /> }
);

const ProfileLinksSection = dynamic(
  () => import("@/src/components/sections/ProfileLinksSection").then(m => ({ default: m.ProfileLinksSection })),
  { ssr: false, loading: () => <div className="h-96 bg-background" /> }
);

const ContactSection = dynamic(
  () => import("@/src/components/sections/ContactSection").then(m => ({ default: m.ContactSection })),
  { ssr: false, loading: () => <div className="h-96 bg-background" /> }
);

const FooterSection = dynamic(
  () => import("@/src/components/sections/FooterSection").then(m => ({ default: m.FooterSection })),
  { ssr: false, loading: () => <div className="h-32 bg-background" /> }
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <HeroSection />
          <Cinematic3DSection />
          <AboutSection />
          <TechnologiesSection />
          <ProjectsSection />
          <AchievementsSection />
          <ProfileLinksSection />
          <ContactSection />
        </main>
        <FooterSection />
      </div>
    </>
  );
}
