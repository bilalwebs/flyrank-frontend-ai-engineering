import { Background } from "@/components/layout/Background";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { ContactForm } from "@/components/contact/ContactForm";

export default function Home() {
  return (
    <>
      <Background />
      <Header />
      <main className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
