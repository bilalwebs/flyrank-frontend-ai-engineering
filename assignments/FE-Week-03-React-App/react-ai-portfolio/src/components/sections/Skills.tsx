import type { Skill, SkillCategory } from "../../types";
import { SectionTitle } from "../ui/SectionTitle";
import { SkillCard } from "../ui/SkillCard";

interface SkillsProps {
  skills: Skill[];
}

const categoryOrder: SkillCategory[] = [
  "frontend",
  "languages",
  "frameworks",
  "tools",
  "ai",
];

const categoryHeadings: Record<SkillCategory, string> = {
  frontend: "Frontend",
  languages: "Languages",
  frameworks: "Frameworks",
  tools: "Tools",
  ai: "AI",
};

export function Skills({ skills }: SkillsProps) {
  const grouped = categoryOrder
    .map((cat) => ({
      category: cat,
      items: skills.filter((s) => s.category === cat),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section
      id="skills"
      className="w-full bg-surface py-20 sm:py-28"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          id="skills-heading"
          title="Skills & Technologies"
          subtitle="The tools and technologies I work with across frontend, languages, frameworks, and AI."
        />

        <div className="flex flex-col gap-12">
          {grouped.map((group) => (
            <div key={group.category}>
              <h3 className="mb-5 text-center font-heading text-xl font-bold text-text sm:text-left">
                {categoryHeadings[group.category]}
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.items.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
