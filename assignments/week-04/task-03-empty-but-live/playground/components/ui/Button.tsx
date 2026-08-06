import Link from "next/link"

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  className?: string
  type?: "button" | "submit" | "reset"
  href?: string
  onClick?: () => void
  ariaLabel?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-linear-to-b from-primary to-primary-hover text-primary-foreground shadow-sm shadow-primary/25 hover:shadow-md hover:shadow-primary/30",
  secondary:
    "bg-foreground text-background shadow-sm hover:opacity-90 dark:shadow-zinc-900/50",
  outline:
    "border border-border bg-card text-foreground hover:border-primary/40 hover:bg-zinc-50 dark:hover:bg-zinc-800/50",
  ghost:
    "text-muted hover:bg-zinc-100 hover:text-foreground dark:hover:bg-zinc-800",
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
  type = "button",
  href,
  onClick,
  ariaLabel,
}: ButtonProps) {
  const baseStyles =
    "inline-flex select-none items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0 dark:focus-visible:ring-offset-zinc-950"

  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto")

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          aria-label={ariaLabel}
        >
          {loading && <Spinner />}
          {children}
        </a>
      )
    }

    return (
      <Link href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {loading && <Spinner />}
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-busy={loading}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}
