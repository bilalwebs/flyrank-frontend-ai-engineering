import type { Project } from "../../types";
import { Button } from "./Button";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-surface transition-transform duration-200 hover:scale-[1.02]">
      <div className="aspect-video w-full overflow-hidden bg-surface-light">
        <img
          src={project.imageUrl}
          alt={`${project.title} screenshot`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <h3 className="font-heading text-xl font-bold text-text">
          {project.title}
        </h3>

        <p className="text-sm leading-relaxed text-text/70">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <span
              key={tag}
              role="listitem"
              className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          {project.liveUrl && (
            <Button href={project.liveUrl} variant="accent">
              Live Demo
            </Button>
          )}
          {project.repoUrl && (
            <Button href={project.repoUrl}>
              Source Code
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
