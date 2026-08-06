import type { ReactNode } from "react"

type BadgeVariant = "default" | "primary" | "success" | "warning" | "neutral"

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-primary/10 text-brand ring-primary/20",
  primary:
    "bg-primary text-primary-foreground",
  success:
    "bg-emerald-100 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/15 dark:text-emerald-300",
  warning:
    "bg-amber-100 text-amber-700 ring-amber-600/20 dark:bg-amber-500/15 dark:text-amber-300",
  neutral:
    "bg-zinc-100 text-zinc-600 ring-zinc-500/20 dark:bg-zinc-800 dark:text-zinc-300",
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
