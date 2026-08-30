"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILLS, SKILL_CATEGORIES } from "@/constants/portfolio";
import type { Skill } from "@/lib/types";

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:border-purple-500/20 hover:bg-purple-500/5"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
          {skill.name}
        </span>
        <span className="text-xs font-medium text-purple-400">{skill.level}%</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.04, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-600"
        />
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredSkills = useMemo(
    () =>
      activeCategory === "all"
        ? SKILLS
        : SKILLS.filter((s) => s.category === activeCategory),
    [activeCategory]
  );

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  return (
    <section id="skills" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Skills &{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600" />
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Technologies and tools I work with to build modern applications.
          </p>
        </motion.div>

        <div
          className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filter skills by category"
        >
          <button
            type="button"
            onClick={() => handleCategoryChange("all")}
            aria-pressed={activeCategory === "all"}
            className={`min-h-[44px] rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
              activeCategory === "all"
                ? "bg-purple-600/20 text-purple-300 ring-1 ring-purple-500/30"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            All
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => handleCategoryChange(cat.key)}
              aria-pressed={activeCategory === cat.key}
              className={`min-h-[44px] rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.key
                  ? "bg-purple-600/20 text-purple-300 ring-1 ring-purple-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
