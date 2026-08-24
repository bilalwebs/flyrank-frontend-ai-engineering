"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { SKILLS, SKILL_CATEGORIES } from "@/constants/portfolio";
import type { Skill } from "@/lib/types";

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
          {skill.name}
        </span>
        <span className="text-xs text-gray-400">{skill.level}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-600"
        />
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredSkills =
    activeCategory === "all"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  return (
    <section id="skills" className="py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl"
      >
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Skills &{" "}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Technologies
          </span>
        </h2>

        <div className="mt-4 h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-blue-600" />

        <div
          className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-10"
          role="group"
          aria-label="Filter skills by category"
        >
          <button
            type="button"
            onClick={() => handleCategoryChange("all")}
            aria-pressed={activeCategory === "all"}
            className={`min-h-[44px] rounded-lg px-3 text-sm font-medium transition-all sm:px-4 ${
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
              className={`min-h-[44px] rounded-lg px-3 text-sm font-medium transition-all sm:px-4 ${
                activeCategory === cat.key
                  ? "bg-purple-600/20 text-purple-300 ring-1 ring-purple-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2">
          {filteredSkills.map((skill, index) => (
            <SkillBar key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
