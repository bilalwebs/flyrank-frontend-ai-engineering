import type { Skill, SkillCategory } from "../../types";

interface SkillCardProps {
  skill: Skill;
}

const categoryColors: Record<SkillCategory, string> = {
  frontend: "bg-primary/20 text-primary",
  languages: "bg-violet-500/20 text-violet-400",
  frameworks: "bg-cyan-500/20 text-cyan-400",
  tools: "bg-accent/20 text-accent",
  ai: "bg-emerald-500/20 text-emerald-400",
};

const categoryLabels: Record<SkillCategory, string> = {
  frontend: "Frontend",
  languages: "Language",
  frameworks: "Framework",
  tools: "Tool",
  ai: "AI",
};

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <div
      role="group"
      aria-label={`${skill.name} — ${categoryLabels[skill.category]}`}
      className="flex items-center gap-4 rounded-xl bg-surface p-4 transition-colors duration-200 hover:bg-surface-light sm:p-5"
    >
      <span className="text-3xl" aria-hidden="true">
        {skill.icon}
      </span>

      <div className="flex flex-col gap-1">
        <span className="font-heading text-base font-semibold text-text">
          {skill.name}
        </span>
        <span
          className={`inline-block w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[skill.category]}`}
        >
          {categoryLabels[skill.category]}
        </span>
      </div>
    </div>
  );
}
