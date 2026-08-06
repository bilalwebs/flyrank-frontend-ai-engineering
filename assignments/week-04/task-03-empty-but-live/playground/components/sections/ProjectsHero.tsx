import { projects } from "@/data/portfolio"
import { Reveal } from "@/components/ui/Reveal"
import { Container } from "@/components/ui/Container"
import { Badge } from "@/components/ui/Badge"

export function ProjectsHero() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="projects-hero-title">
      <Container size="narrow">
        <Reveal>
          <div className="text-center">
            <Badge className="mb-5">
              {projects.length} projects showcased
            </Badge>
            <h1
              id="projects-hero-title"
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              Projects
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              A collection of applications and tools I have built — each one
              reflecting a focus on clean architecture, responsive design, and
              modern development practices.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
