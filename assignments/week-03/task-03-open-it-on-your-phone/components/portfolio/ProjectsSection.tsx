"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "@/constants/portfolio";

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[number]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] transition-all duration-300 hover:border-purple-500/20 hover:bg-purple-500/5"
    >
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900/30 to-blue-900/30 sm:h-56">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl font-bold text-white/5">{String(index + 1).padStart(2, "0")}</div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-relaxed text-gray-300">{project.description}</p>

        <div className="mt-5 space-y-3">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-400">Problem</h4>
            <p className="mt-1 text-sm text-gray-400">{project.problem}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-400">Solution</h4>
            <p className="mt-1 text-sm text-gray-400">{project.solution}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-green-400">Impact</h4>
            <p className="mt-1 text-sm text-gray-400">{project.impact}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-lg bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6 flex items-center gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} source code on GitHub`}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-300 hover:border-white/25 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            <Github className="h-4 w-4" />
            Code
          </a>
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} live demo`}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600" />
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            A selection of projects that showcase my skills in AI engineering and full-stack development.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
