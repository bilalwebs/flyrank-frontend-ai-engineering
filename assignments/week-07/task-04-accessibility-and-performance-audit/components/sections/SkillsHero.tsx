import { SectionTitle } from "@/components/ui/SectionTitle"

export function SkillsHero() {
  return (
    <section className="py-20 sm:py-32" aria-labelledby="skills-hero-title">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <SectionTitle
          title="Skills"
          subtitle="Technologies and tools I use to build modern web applications"
          align="center"
          id="skills-hero-title"
        />
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          I continuously learn and experiment with new technologies to stay
          current in the ever-evolving frontend landscape. Below is a snapshot
          of my technical skill set.
        </p>
      </div>
    </section>
  )
}
