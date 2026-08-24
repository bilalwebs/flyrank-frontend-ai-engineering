import { SectionTitle } from "@/components/ui/SectionTitle"

export function ProjectsHero() {
  return (
    <section className="py-20 sm:py-32" aria-labelledby="projects-hero-title">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <SectionTitle
          title="Projects"
          subtitle="A collection of applications and tools I have built"
          align="center"
          id="projects-hero-title"
        />
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Each project reflects a focus on clean architecture, responsive design,
          and modern development practices. Browse the source code or try the
          live demos.
        </p>
      </div>
    </section>
  )
}
