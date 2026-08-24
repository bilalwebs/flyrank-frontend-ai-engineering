import { projects } from "@/data/portfolio"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { Button } from "@/components/ui/Button"

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured)

  return (
    <section className="bg-zinc-50 py-20 dark:bg-zinc-950 sm:py-32" aria-labelledby="featured-projects-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Featured Projects"
          subtitle="A selection of recent work"
          align="center"
          id="featured-projects-title"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/projects" variant="outline" size="lg">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}
