interface SectionTitleProps {
  id?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({
  id,
  title,
  subtitle,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={`mb-10 text-center md:mb-14 ${className}`}>
      <h2
        id={id}
        className="font-heading text-3xl font-bold text-text sm:text-4xl md:text-5xl"
      >
        {title}
      </h2>
      <span
        className="mx-auto mt-3 block h-1 w-16 rounded-full bg-accent"
        aria-hidden="true"
      />
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-text/70 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
