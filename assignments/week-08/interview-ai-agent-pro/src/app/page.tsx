import { HeroSection } from "@/components/features/landing/HeroSection";
import { FeaturesSection } from "@/components/features/landing/FeaturesSection";
import { HowItWorksSection } from "@/components/features/landing/HowItWorksSection";
import { CTASection } from "@/components/features/landing/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </>
  );
}
