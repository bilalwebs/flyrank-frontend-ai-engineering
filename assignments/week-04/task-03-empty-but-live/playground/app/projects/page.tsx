import { ProjectsHero } from "@/components/sections/ProjectsHero"
import { FeaturedProject } from "@/components/sections/FeaturedProject"
import { ProjectsGrid } from "@/components/sections/ProjectsGrid"

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <FeaturedProject />
      <ProjectsGrid />
    </>
  )
}
