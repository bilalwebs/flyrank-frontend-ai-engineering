import type { SkillGroup } from "@/types"
import { SkillCard } from "@/components/ui/SkillCard"
import { Reveal } from "@/components/ui/Reveal"

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
    <section aria-label={categoryDisplayNames[group.category] ?? group.category}>
      <Reveal>
        <div className="mb-6 flex items-center gap-3">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            {categoryDisplayNames[group.category] ?? group.category}
          </h3>
          <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-medium text-brand">
            {group.skills.length}
          </span>
          <div
            className="hidden h-px flex-1 bg-border sm:block"
            aria-hidden="true"
          />
        </div>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {group.skills.map((skill, index) => (
          <Reveal key={skill.name} delay={index * 60}>
            <SkillCard
              name={skill.name}
              category={group.category}
              icon={skill.icon}
              level={skill.level}
            />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
