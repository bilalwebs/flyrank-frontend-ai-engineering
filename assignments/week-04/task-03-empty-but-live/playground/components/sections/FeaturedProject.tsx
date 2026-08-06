import { projects } from "@/data/portfolio"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Reveal } from "@/components/ui/Reveal"
import { Container } from "@/components/ui/Container"

export function FeaturedProject() {
  const featured = projects.find((p) => p.featured)

  if (!featured) {
    return null
  }

  return (
    <section className="pb-20 sm:pb-28" aria-labelledby="featured-project-title">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="In the spotlight"
            title="Featured Project"
            subtitle="A closer look at what I am currently building"
            align="center"
            id="featured-project-title"
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto max-w-4xl">
            <ProjectCard {...featured} />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
