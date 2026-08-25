import { aboutData } from "@/data/portfolio"
import { SectionTitle } from "@/components/ui/SectionTitle"

export function StatsSection() {
  return (
    <section className="py-20 sm:py-32" aria-labelledby="stats-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="By the Numbers"
          subtitle="Highlights from my journey"
          align="center"
          id="stats-title"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aboutData.stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-xl border border-zinc-200 bg-white p-8 text-center transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-4xl font-bold text-primary">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {stat.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
