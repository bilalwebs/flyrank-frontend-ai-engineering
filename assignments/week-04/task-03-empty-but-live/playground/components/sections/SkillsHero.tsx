import { Reveal } from "@/components/ui/Reveal"
import { Container } from "@/components/ui/Container"
import { Badge } from "@/components/ui/Badge"

export function SkillsHero() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="skills-hero-title">
      <Container size="narrow">
        <Reveal>
          <div className="text-center">
            <Badge className="mb-5">Continuously learning</Badge>
            <h1
              id="skills-hero-title"
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              Skills
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              The technologies and tools I use to build modern web applications.
              I continuously learn and experiment with new tools to stay current
              in the ever-evolving frontend landscape.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
