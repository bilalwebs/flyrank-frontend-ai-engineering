"use client";

import { motion } from "framer-motion";
import { PROFILE } from "@/constants/portfolio";
import { Zap, Target, Users, Code2 } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and well-structured code.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimizing for speed, accessibility, and user experience.",
  },
  {
    icon: Target,
    title: "Problem Solving",
    description: "Turning complex challenges into elegant, functional solutions.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working effectively with teams to deliver impactful products.",
  },
];

const stats = [
  { label: "Projects", value: "20+" },
  { label: "Experience", value: "3+ yrs" },
  { label: "Focus", value: "AI & Web" },
  { label: "Stack", value: "Full Stack" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            About{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-10 max-w-3xl text-center"
        >
          <p className="text-lg leading-relaxed text-gray-300 sm:text-xl">
            {PROFILE.bio}
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center transition-all duration-300 hover:border-purple-500/20 hover:bg-purple-500/5"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600/15 transition-colors duration-300 group-hover:bg-purple-600/25">
                  <Icon className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 text-center transition-all duration-300 hover:border-purple-500/20"
            >
              <p className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
