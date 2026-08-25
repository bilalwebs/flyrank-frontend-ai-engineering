import type { SkillGroup } from "@/types"
import { SkillCard } from "@/components/ui/SkillCard"

interface SkillsCategoryProps {
  group: SkillGroup
}

const categoryDisplayNames: Record<string, string> = {
  frontend: "Frontend",
  languages: "Languages",
  frameworks: "Frameworks",
  tools: "Tools",
  ai: "AI",
}

export function SkillsCategory({ group }: SkillsCategoryProps) {
  return (
    <section>
      <h3 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        {categoryDisplayNames[group.category] ?? group.category}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {group.skills.map((skill) => (
          <SkillCard
            key={skill.name}
            name={skill.name}
            category={group.category}
            icon={skill.icon}
            level={skill.level}
          />
        ))}
      </div>
    </section>
  )
}
