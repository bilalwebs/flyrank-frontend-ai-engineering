import type { SkillCategory } from "@/types"

interface SkillCardProps {
  name: string
  category: SkillCategory
  icon?: string
  level: number
}

const categoryColors: Record<SkillCategory, string> = {
  frontend: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  languages:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  frameworks:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  tools: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  ai: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
}

const categoryLabels: Record<SkillCategory, string> = {
  frontend: "Frontend",
  languages: "Languages",
  frameworks: "Frameworks",
  tools: "Tools",
  ai: "AI",
}

export function SkillCard({ name, category, level }: SkillCardProps) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-[var(--shadow-card)] transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3 flex items-start justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
          {name}
        </h3>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[category]}`}
        >
          {categoryLabels[category]}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">Proficiency</span>
          <span className="font-medium text-zinc-900 dark:text-zinc-50">
            {level}%
          </span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700"
          role="progressbar"
          aria-valuenow={level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name} proficiency: ${level}%`}
        >
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${level}%` }}
          />
        </div>
      </div>
    </article>
  )
}
