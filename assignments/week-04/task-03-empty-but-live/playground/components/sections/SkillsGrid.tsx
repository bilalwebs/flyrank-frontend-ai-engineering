import { skillGroups } from "@/data/portfolio"
import { SkillsCategory } from "@/components/sections/SkillsCategory"
import { Container } from "@/components/ui/Container"

export function SkillsGrid() {
  return (
    <section
      className="border-t border-border bg-card py-20 sm:py-28"
      aria-labelledby="skills-grid-title"
    >
      <Container>
        <h2 id="skills-grid-title" className="sr-only">
          All Skills by Category
        </h2>
        <div className="space-y-16">
          {skillGroups.map((group) => (
            <SkillsCategory key={group.category} group={group} />
          ))}
        </div>
      </Container>
    </section>
  )
}
