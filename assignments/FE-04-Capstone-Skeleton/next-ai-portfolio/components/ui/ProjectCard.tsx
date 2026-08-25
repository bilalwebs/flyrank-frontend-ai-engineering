import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  githubUrl,
  liveUrl,
  featured,
}: ProjectCardProps) {
  return (
    <article
      className={`group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[var(--shadow-card)] transition-all duration-200 hover:border-primary/30 hover:shadow-[var(--shadow-card-hover)] dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-primary/30 ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div className="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={image}
          alt={`${title} screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {featured && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 p-5">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {description}
        </p>

        <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              role="listitem"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-4 pt-2">
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              GitHub
            </Link>
          )}
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary transition-colors hover:text-primary-hover"
            >
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
