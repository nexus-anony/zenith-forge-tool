import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { Cinematic3DSection } from "@/components/sections/Cinematic3DSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TechnologiesSection } from "@/components/sections/TechnologiesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ProfileLinksSection } from "@/components/sections/ProfileLinksSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { MotionBlur } from "@/components/animations/MotionBlur";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";

const Index = () => {
  const velocity = useScrollVelocity();

  return (
    <div className="min-h-screen bg-background">
      <MotionBlur />
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
  );
};

export default Index;
