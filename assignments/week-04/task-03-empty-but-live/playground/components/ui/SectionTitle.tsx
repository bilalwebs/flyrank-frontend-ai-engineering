import { SparklesIcon } from "@/components/ui/icons"

interface SectionTitleProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: "left" | "center"
  id?: string
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  id,
}: SectionTitleProps) {
  const alignmentClasses = align === "center" ? "text-center" : "text-left"
  const isCentered = align === "center"

  return (
    <div className={`mb-12 ${alignmentClasses}`} id={id}>
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand">
          <SparklesIcon className="h-3.5 w-3.5" />
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-lg text-muted ${
            isCentered ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-5 h-1 w-16 rounded-full bg-linear-to-r from-primary to-accent ${
          isCentered ? "mx-auto" : ""
        }`}
        aria-hidden="true"
      />
    </div>
  )
}
