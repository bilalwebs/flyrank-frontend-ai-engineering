"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { PROFILE, SOCIAL_LINKS } from "@/constants/portfolio";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-4 text-center sm:min-h-[90vh]">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-4xl"
      >
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300"
        >
          <span className="h-2 w-2 rounded-full bg-green-400" aria-hidden="true" />
          Available for opportunities
        </motion.div>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {PROFILE.name.split(" ")[0]}
          </span>
          <span className="block mt-2 text-3xl font-semibold text-gray-200 sm:text-4xl md:text-5xl">
            {PROFILE.name.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 sm:text-xl"
        >
          {PROFILE.title} crafting intelligent, performant, and accessible web experiences.
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#contact"
            className="group relative inline-flex min-h-[48px] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Get In Touch
            <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
          </a>
          <a
            href="#projects"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/10 px-8 py-3.5 text-sm font-semibold text-gray-200 transition-all duration-300 hover:border-white/25 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            View Projects
          </a>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex items-center justify-center gap-4"
          aria-label="Social links"
        >
          {SOCIAL_LINKS.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-gray-400 transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                {Icon && <Icon className="h-5 w-5" />}
              </a>
            );
          })}
        </motion.div>
      </motion.div>

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 sm:bottom-12"
      >
        <a
          href="#about"
          aria-label="Scroll to about section"
          className="group flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-gray-400 transition-colors duration-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        >
          {shouldReduceMotion ? (
            <ArrowDown className="h-5 w-5" />
          ) : (
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="h-5 w-5" />
            </motion.div>
          )}
        </a>
      </motion.div>
    </section>
  );
}
