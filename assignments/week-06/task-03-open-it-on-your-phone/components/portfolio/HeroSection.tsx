"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { PROFILE } from "@/constants/portfolio";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="flex min-h-[60vh] sm:min-h-[70vh] flex-col items-center justify-center px-2 text-center">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-xs font-medium uppercase tracking-widest text-purple-300 sm:text-sm"
        >
          {PROFILE.title}
        </motion.p>

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          {PROFILE.name.split(" ")[0]}{" "}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {PROFILE.name.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-base text-gray-300 sm:mt-6 sm:text-lg"
        >
          {PROFILE.tagline}
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4"
        >
          <a
            href="#contact"
            className="min-h-[44px] rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Get In Touch
          </a>
          <a
            href="#about"
            className="min-h-[44px] rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-gray-200 transition-all hover:border-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Learn More
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 sm:mt-16"
      >
        <a
          href="#about"
          aria-label="Scroll to about section"
          className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-gray-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-lg p-2"
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
