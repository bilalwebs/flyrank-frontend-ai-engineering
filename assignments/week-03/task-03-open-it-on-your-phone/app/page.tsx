import { Background } from "@/components/layout/Background";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { WorkflowSection } from "@/components/portfolio/WorkflowSection";
import { JourneySection } from "@/components/portfolio/JourneySection";
import { ContactForm } from "@/components/contact/ContactForm";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Background />
      <Header />
      <main id="main-content" className="relative">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <WorkflowSection />
        <JourneySection />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
