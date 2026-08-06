import { aboutData } from "@/data/portfolio"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Reveal } from "@/components/ui/Reveal"
import { Container } from "@/components/ui/Container"

export function ExperienceTimeline() {
  return (
    <section
      className="border-y border-border bg-card py-20 sm:py-28"
      aria-labelledby="experience-title"
    >
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="My journey"
            title="Experience"
            subtitle="A look at my professional path so far"
            align="center"
            id="experience-title"
          />
        </Reveal>

        <div className="relative mx-auto max-w-3xl">
          <div
            className="absolute left-5 top-0 h-full w-px bg-linear-to-b from-primary via-border to-transparent"
            aria-hidden="true"
          />

          <ul className="space-y-10" role="list">
            {aboutData.experience.map((item, index) => (
              <li key={index} className="relative pl-14">
                <span
                  className="absolute left-2 top-2 h-6 w-6 rounded-full border border-primary/40 bg-background shadow-[0_0_0_4px] shadow-primary/10"
                  aria-hidden="true"
                >
                  <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
                </span>
                <Reveal delay={index * 100}>
                  <article className="group rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                    <p className="inline-flex rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-medium text-brand">
                      {item.period}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold text-foreground transition-colors group-hover:text-brand">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-muted">
                      {item.organization}
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
