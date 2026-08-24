import type { Metadata } from "next"
import { SkillsHero } from "@/components/sections/SkillsHero"
import { SkillsGrid } from "@/components/sections/SkillsGrid"

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technologies and tools I use to build modern web applications including React, Next.js, TypeScript, and more.",
}

export default function SkillsPage() {
  return (
    <>
      <SkillsHero />
      <SkillsGrid />
    </>
  )
}
