import { aboutData } from "@/data/portfolio"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Reveal } from "@/components/ui/Reveal"
import { Container } from "@/components/ui/Container"
import { SparklesIcon } from "@/components/ui/icons"

export function StatsSection() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="stats-title">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="By the numbers"
            title="Highlights from my journey"
            subtitle="A snapshot of the work and learning that shapes my approach"
            align="center"
            id="stats-title"
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aboutData.stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 80}>
              <article className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <SparklesIcon className="mx-auto mb-3 h-5 w-5 text-brand" />
                <p className="text-4xl font-bold text-gradient">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-muted">
                  {stat.label}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
