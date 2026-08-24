import type { Metadata } from "next"
import { ProjectsHero } from "@/components/sections/ProjectsHero"
import { FeaturedProject } from "@/components/sections/FeaturedProject"
import { ProjectsGrid } from "@/components/sections/ProjectsGrid"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of web applications and tools I have built with React, Next.js, and modern technologies.",
}

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <FeaturedProject />
      <ProjectsGrid />
    </>
  )
}
