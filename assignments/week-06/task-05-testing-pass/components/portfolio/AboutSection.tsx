"use client";

import { motion } from "framer-motion";
import { PROFILE } from "@/constants/portfolio";

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl text-center"
      >
        <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          About{" "}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Me
          </span>
        </h2>

        <div className="mt-4 h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-blue-600" />

        <p className="mt-6 text-base leading-relaxed text-gray-300 sm:mt-8 sm:text-lg">
          {PROFILE.bio}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 md:grid-cols-4">
          {[
            { label: "Projects", value: "3+" },
            { label: "Internship", value: "Active" },
            { label: "Focus", value: "AI + Web" },
            { label: "Stack", value: "React/TS" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-3 sm:p-4"
            >
              <p className="text-xl font-bold text-white sm:text-2xl">{stat.value}</p>
              <p className="mt-1 text-xs text-gray-400 sm:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
