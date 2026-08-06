import type { SkillCategory } from "@/types"
import { skillGroups } from "@/data/portfolio"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { SkillCard } from "@/components/ui/SkillCard"
import { Button } from "@/components/ui/Button"
import { Reveal } from "@/components/ui/Reveal"
import { Container } from "@/components/ui/Container"

const skillCategoryMap = new Map(
  skillGroups.flatMap((group) =>
    group.skills.map((skill) => [skill.name, group.category]),
  ),
)

export function FeaturedSkills() {
  const featuredSkills = skillGroups.flatMap((group) => group.skills).slice(0, 6)

  return (
    <section
      className="border-y border-border bg-card py-20 sm:py-28"
      aria-labelledby="featured-skills-title"
    >
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="What I use"
            title="Skills & Technologies"
            subtitle="The technologies I reach for to design and ship modern web applications"
            align="center"
            id="featured-skills-title"
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredSkills.map((skill, index) => (
            <Reveal key={skill.name} delay={index * 60}>
              <SkillCard
                name={skill.name}
                category={
                  (skillCategoryMap.get(skill.name) as SkillCategory) ??
                  "frontend"
                }
                icon={skill.icon}
                level={skill.level}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 text-center">
            <Button href="/skills" variant="outline" size="lg">
              View All Skills
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
