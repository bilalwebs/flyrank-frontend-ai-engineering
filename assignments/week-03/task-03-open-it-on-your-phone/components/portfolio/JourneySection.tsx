"use client";

import { motion } from "framer-motion";
import { Code, Brain, Rocket, Sparkles } from "lucide-react";
import { JOURNEY } from "@/constants/portfolio";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code,
  brain: Brain,
  rocket: Rocket,
  sparkles: Sparkles,
};

export function JourneySection() {
  return (
    <section id="journey" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            My{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600" />
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            The milestones and experiences that shaped my career in tech.
          </p>
        </motion.div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-transparent sm:left-1/2" aria-hidden="true" />

            {JOURNEY.map((item, index) => {
              const Icon = iconMap[item.icon] || Code;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.date}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className={`relative mb-12 flex items-start gap-6 sm:gap-8 ${
                    isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${isEven ? "sm:text-right" : "sm:text-left"} hidden sm:block`}>
                    <div className={`inline-block ${isEven ? "sm:ml-auto" : "sm:mr-auto"}`}>
                      <span className="text-sm font-semibold text-purple-400">{item.date}</span>
                      <h3 className="mt-1 text-lg font-bold text-white">{item.title}</h3>
                      <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-purple-500/30 bg-gray-950 sm:h-14 sm:w-14">
                    <Icon className="h-5 w-5 text-purple-400 sm:h-6 sm:w-6" />
                  </div>

                  <div className={`flex-1 ${isEven ? "sm:text-left" : "sm:text-right"} sm:hidden`}>
                    <span className="text-sm font-semibold text-purple-400">{item.date}</span>
                    <h3 className="mt-1 text-lg font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-400">
                      {item.description}
                    </p>
                  </div>

                  <div className={`flex-1 hidden sm:block`} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
