import { skillGroups } from "@/data/portfolio"
import { SkillsCategory } from "@/components/sections/SkillsCategory"

export function SkillsGrid() {
  return (
    <section className="bg-zinc-50 py-20 dark:bg-zinc-950 sm:py-32" aria-labelledby="skills-grid-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="skills-grid-title" className="sr-only">
          All Skills by Category
        </h2>
        <div className="space-y-16">
          {skillGroups.map((group) => (
            <SkillsCategory key={group.category} group={group} />
          ))}
        </div>
      </div>
    </section>
  )
}
