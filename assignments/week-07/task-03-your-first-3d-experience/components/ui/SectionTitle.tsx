interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: "left" | "center"
  id?: string
}

export function SectionTitle({
  title,
  subtitle,
  align = "left",
  id,
}: SectionTitleProps) {
  const alignmentClasses = align === "center" ? "text-center" : "text-left"

  return (
    <div className={`mb-12 ${alignmentClasses}`} id={id}>
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-1 w-16 rounded-full bg-primary ${
          align === "center" ? "mx-auto" : ""
        }`}
        aria-hidden="true"
      />
    </div>
  )
}
