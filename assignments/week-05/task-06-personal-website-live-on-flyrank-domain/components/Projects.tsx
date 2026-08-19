"use client"

import Image from "next/image"

const projects = [
  {
    title: "AI Content Studio",
    description:
      "An AI-powered content generation platform using GPT-4 and custom fine-tuned models. Features real-time streaming, multi-language support, and collaborative editing.",
    image: "/projects/project1.jpg",
    tags: ["Next.js", "OpenAI", "TypeScript", "Tailwind"],
    github: "#",
    demo: "#",
  },
  {
    title: "Neural Vision Engine",
    description:
      "Computer vision pipeline for real-time object detection and scene understanding. Deployed on AWS with sub-100ms inference latency at scale.",
    image: "/projects/project2.jpg",
    tags: ["Python", "PyTorch", "FastAPI", "Docker"],
    github: "#",
    demo: "#",
  },
  {
    title: "SmartDocs Platform",
    description:
      "Intelligent document processing system with RAG architecture. Parses, indexes, and answers questions across thousands of enterprise documents.",
    image: "/projects/project3.jpg",
    tags: ["React", "Node.js", "PostgreSQL", "LangChain"],
    github: "#",
    demo: "#",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            Featured Work
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Projects I&apos;ve <span className="gradient-text">Built</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">
            A selection of projects that showcase my expertise in AI engineering
            and full-stack development.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="glass-card card-shine glass-card-hover group overflow-hidden rounded-2xl transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-background-secondary to-background">
                {/*
                  PROJECT IMAGES:
                  Place images at:
                    public/projects/project1.jpg
                    public/projects/project2.jpg
                    public/projects/project3.jpg
                */}
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={375}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-secondary/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <a
                    href={project.github}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white/5 px-4 py-2 text-xs font-medium text-text-secondary transition-colors hover:border-accent/30 hover:text-white"
                  >
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    Code
                  </a>
                  <a
                    href={project.demo}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-accent/10 px-4 py-2 text-xs font-medium text-accent transition-colors hover:bg-accent/20"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
