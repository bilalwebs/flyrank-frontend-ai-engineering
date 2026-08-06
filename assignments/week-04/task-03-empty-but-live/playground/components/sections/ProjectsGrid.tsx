import { projects } from "@/data/portfolio"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Reveal } from "@/components/ui/Reveal"
import { Container } from "@/components/ui/Container"

export function ProjectsGrid() {
  const remaining = projects.filter((p) => !p.featured)

  if (remaining.length === 0) {
    return null
  }

  return (
    <section
      className="border-t border-border bg-card py-20 sm:py-28"
      aria-labelledby="all-projects-title"
    >
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="More work"
            title="All Projects"
            subtitle="Additional projects I have built along the way"
            align="center"
            id="all-projects-title"
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {remaining.map((project, index) => (
            <Reveal key={project.title} delay={index * 100}>
              <ProjectCard {...project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
