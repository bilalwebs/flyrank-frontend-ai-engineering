"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "@/constants/portfolio";

export function ProjectsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="projects" className="py-16 sm:py-20">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl"
      >
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Featured{" "}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>

        <div className="mt-4 h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-blue-600" />

        <p className="mt-4 text-center text-sm text-gray-400 sm:text-base">
          Real projects built during my internship and personal learning.
        </p>

        <div className="mt-8 grid gap-6 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-white/10 hover:bg-white/[0.04]"
            >
              {project.tag && (
                <span className="mb-3 self-start rounded-full bg-purple-600/20 px-3 py-1 text-xs font-medium text-purple-300">
                  {project.tag}
                </span>
              )}

              <h3 className="text-lg font-semibold text-white">{project.title}</h3>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-white/5 px-2 py-1 text-xs text-gray-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition-all hover:border-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  Code
                </a>
                {project.live !== "#" && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] inline-flex items-center gap-2 rounded-lg bg-purple-600/20 px-4 py-2 text-sm text-purple-300 transition-all hover:bg-purple-600/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Live
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
