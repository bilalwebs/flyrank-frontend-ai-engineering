import { projects } from "@/data/portfolio"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { SectionTitle } from "@/components/ui/SectionTitle"

export function FeaturedProject() {
  const featured = projects.find((p) => p.featured)

  if (!featured) {
    return null
  }

  return (
    <section className="py-20 sm:py-32" aria-labelledby="featured-project-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Featured Project"
          subtitle="A closer look at a highlighted project"
          align="center"
          id="featured-project-title"
        />

        <div className="mx-auto max-w-4xl">
          <ProjectCard {...featured} />
        </div>
      </div>
    </section>
  )
}
