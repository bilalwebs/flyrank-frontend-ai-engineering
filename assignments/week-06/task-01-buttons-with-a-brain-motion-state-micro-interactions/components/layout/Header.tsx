"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative mb-16 text-center"
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400 backdrop-blur-sm">
        <Sparkles size={14} className="text-purple-400" />
        Week 06 — FE-AA1
      </div>

      <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
        Buttons with a{" "}
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Brain
        </span>
      </h1>

      <p className="mx-auto max-w-2xl text-lg text-gray-400">
        Motion &amp; State Micro-interactions — Smart buttons with intelligent
        state management, GPU-friendly animations, and production-ready
        accessibility.
      </p>

      <p className="mt-4 text-sm text-gray-500">
        by{" "}
        <span className="font-medium text-gray-400">
          Muhammad Bilal Hussain
        </span>{" "}
        — AI Engineer | Full Stack Developer
      </p>
    </motion.header>
  );
}
