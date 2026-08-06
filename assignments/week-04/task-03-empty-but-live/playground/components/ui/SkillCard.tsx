import type { SkillCategory } from "@/types"
import { Badge } from "@/components/ui/Badge"

interface SkillCardProps {
  name: string
  category: SkillCategory
  icon?: string
  level: number
}

const categoryBadgeVariant: Record<
  SkillCategory,
  "default" | "success" | "warning" | "neutral"
> = {
  frontend: "default",
  languages: "success",
  frameworks: "warning",
  tools: "neutral",
  ai: "default",
}

export function SkillCard({ name, category, level }: SkillCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="font-semibold text-card-foreground">{name}</h3>
        <Badge variant={categoryBadgeVariant[category]}>
          {category}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Proficiency</span>
          <span className="font-medium text-card-foreground">{level}%</span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
          role="progressbar"
          aria-valuenow={level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name} proficiency: ${level}%`}
        >
          <div
            className="h-full rounded-full bg-linear-to-r from-primary to-accent transition-all duration-500"
            style={{ width: `${level}%` }}
          />
        </div>
      </div>
    </article>
  )
}
