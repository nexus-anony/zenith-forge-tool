import { useState, useEffect, lazy, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { LoadingScreen } from "@/components/animations/LoadingScreen";

// Lazy load heavy 3D components
const Cinematic3DSection = lazy(() => import("@/components/sections/Cinematic3DSection").then(m => ({ default: m.Cinematic3DSection })));
const AboutSection = lazy(() => import("@/components/sections/AboutSection").then(m => ({ default: m.AboutSection })));
const TechnologiesSection = lazy(() => import("@/components/sections/TechnologiesSection").then(m => ({ default: m.TechnologiesSection })));
const ProjectsSection = lazy(() => import("@/components/sections/ProjectsSection").then(m => ({ default: m.ProjectsSection })));
const AchievementsSection = lazy(() => import("@/components/sections/AchievementsSection").then(m => ({ default: m.AchievementsSection })));
const ProfileLinksSection = lazy(() => import("@/components/sections/ProfileLinksSection").then(m => ({ default: m.ProfileLinksSection })));
const ContactSection = lazy(() => import("@/components/sections/ContactSection").then(m => ({ default: m.ContactSection })));
const FooterSection = lazy(() => import("@/components/sections/FooterSection").then(m => ({ default: m.FooterSection })));

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Minimum loading time to show the animation
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
          <Suspense fallback={<div className="h-screen" />}>
            <Cinematic3DSection />
          </Suspense>
          <Suspense fallback={<div className="h-96" />}>
            <AboutSection />
          </Suspense>
          <Suspense fallback={<div className="h-96" />}>
            <TechnologiesSection />
          </Suspense>
          <Suspense fallback={<div className="h-screen" />}>
            <ProjectsSection />
          </Suspense>
          <Suspense fallback={<div className="h-96" />}>
            <AchievementsSection />
          </Suspense>
          <Suspense fallback={<div className="h-96" />}>
            <ProfileLinksSection />
          </Suspense>
          <Suspense fallback={<div className="h-96" />}>
            <ContactSection />
          </Suspense>
        </main>
        <Suspense fallback={<div className="h-32" />}>
          <FooterSection />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
