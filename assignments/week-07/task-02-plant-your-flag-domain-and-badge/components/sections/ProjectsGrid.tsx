import { projects } from "@/data/portfolio"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { SectionTitle } from "@/components/ui/SectionTitle"

export function ProjectsGrid() {
  const remaining = projects.filter((p) => !p.featured)

  if (remaining.length === 0) {
    return null
  }

  return (
    <section className="bg-zinc-50 py-20 dark:bg-zinc-950 sm:py-32" aria-labelledby="all-projects-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="All Projects"
          subtitle="More projects I have worked on"
          align="center"
          id="all-projects-title"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {remaining.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}
