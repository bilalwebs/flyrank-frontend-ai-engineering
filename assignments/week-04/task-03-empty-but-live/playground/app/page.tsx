import { Hero } from "@/components/sections/Hero"
import { FeaturedSkills } from "@/components/sections/FeaturedSkills"
import { FeaturedProjects } from "@/components/sections/FeaturedProjects"
import { CTASection } from "@/components/sections/CTASection"

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedSkills />
      <FeaturedProjects />
      <CTASection />
    </>
  )
}
