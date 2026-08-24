import type { Metadata } from "next"
import { AboutHero } from "@/components/sections/AboutHero"
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline"
import { StatsSection } from "@/components/sections/StatsSection"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about my background, education, and experience as a frontend developer and AI engineering student.",
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ExperienceTimeline />
      <StatsSection />
    </>
  )
}
