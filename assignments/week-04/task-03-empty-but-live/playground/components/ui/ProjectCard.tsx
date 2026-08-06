import Image from "next/image"
import type { ProjectStatus } from "@/types"
import { Badge } from "@/components/ui/Badge"
import { GithubIcon, ExternalLinkIcon, SparklesIcon } from "@/components/ui/icons"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tags: string[]
  status: ProjectStatus
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
}

const statusVariant: Record<
  ProjectStatus,
  "success" | "default" | "warning" | "neutral"
> = {
  Live: "success",
  Completed: "default",
  "In Development": "warning",
  "Coming Soon": "neutral",
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  status,
  githubUrl,
  liveUrl,
  featured,
}: ProjectCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
      <div className="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={image}
          alt={`${title} screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/50 via-transparent to-transparent opacity-60"
          aria-hidden="true"
        />
        <div className="absolute right-3 top-3 flex gap-2">
          {featured && (
            <Badge className="border border-zinc-200/40 bg-white/90 text-zinc-800 backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/90 dark:text-zinc-100">
              <SparklesIcon className="h-3 w-3" />
              Featured
            </Badge>
          )}
          <Badge variant={statusVariant[status]}>{status}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-xl font-semibold text-card-foreground transition-colors group-hover:text-brand">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted">{description}</p>

        <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
          {tags.map((tag) => (
            <span
              key={tag}
              role="listitem"
              className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:hover:bg-zinc-800/50 dark:focus-visible:ring-offset-zinc-950"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
          )}
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-b from-primary to-primary-hover px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
            >
              <ExternalLinkIcon className="h-4 w-4" />
              Live Demo
            </a>
          ) : (
            <span
              aria-disabled="true"
              title="Demo coming soon"
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-border px-4 py-2 text-sm font-medium text-muted"
            >
              <ExternalLinkIcon className="h-4 w-4" />
              Demo
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                Soon
              </span>
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
