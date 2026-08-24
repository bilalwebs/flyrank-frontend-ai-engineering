import { aboutData } from "@/data/portfolio"
import { SectionTitle } from "@/components/ui/SectionTitle"

export function ExperienceTimeline() {
  return (
    <section className="bg-zinc-50 py-20 dark:bg-zinc-950 sm:py-32" aria-labelledby="experience-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Experience"
          subtitle="My professional journey"
          align="center"
          id="experience-title"
        />

        <div className="relative mx-auto max-w-3xl">
          <div
            className="absolute left-6 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-800"
            aria-hidden="true"
          />

          <ul className="space-y-12" role="list">
            {aboutData.experience.map((item, index) => (
              <li key={index} className="relative pl-14">
                <div
                  className="absolute left-4 top-1 h-4 w-4 rounded-full border-2 border-primary bg-white dark:bg-zinc-900"
                  aria-hidden="true"
                />
                <article>
                  <p className="text-sm font-medium text-primary">
                    {item.period}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item.organization}
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {item.description}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
