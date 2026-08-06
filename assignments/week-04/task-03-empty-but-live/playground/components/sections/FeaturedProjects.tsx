import { projects } from "@/data/portfolio"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { Button } from "@/components/ui/Button"
import { Reveal } from "@/components/ui/Reveal"
import { Container } from "@/components/ui/Container"

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured)

  return (
    <section className="py-20 sm:py-28" aria-labelledby="featured-projects-title">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Selected work"
            title="Featured Projects"
            subtitle="A selection of applications and tools I have built"
            align="center"
            id="featured-projects-title"
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((project, index) => (
            <Reveal key={project.title} delay={index * 100}>
              <ProjectCard {...project} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 text-center">
            <Button href="/projects" variant="outline" size="lg">
              View All Projects
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
