import type { SkillCategory } from "@/types"
import { skillGroups } from "@/data/portfolio"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { SkillCard } from "@/components/ui/SkillCard"
import { Button } from "@/components/ui/Button"

const skillCategoryMap = new Map(
  skillGroups.flatMap((group) =>
    group.skills.map((skill) => [skill.name, group.category]),
  ),
)

export function FeaturedSkills() {
  const featuredSkills = skillGroups.flatMap((group) => group.skills).slice(0, 6)

  return (
    <section className="py-20 sm:py-32" aria-labelledby="featured-skills-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Skills & Technologies"
          subtitle="Technologies I work with regularly"
          align="center"
          id="featured-skills-title"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredSkills.map((skill) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              category={
                (skillCategoryMap.get(skill.name) as SkillCategory) ??
                "frontend"
              }
              icon={skill.icon}
              level={skill.level}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/skills" variant="outline" size="lg">
            View All Skills
          </Button>
        </div>
      </div>
    </section>
  )
}
