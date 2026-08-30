"use client";

import { motion } from "framer-motion";
import { Search, Palette, Code, TestTube, Rocket } from "lucide-react";
import { WORKFLOW } from "@/constants/portfolio";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  search: Search,
  palette: Palette,
  code: Code,
  "test-tube": TestTube,
  rocket: Rocket,
};

export function WorkflowSection() {
  return (
    <section id="workflow" className="py-20 sm:py-28">
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
              Workflow
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600" />
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            A structured approach to delivering high-quality software from concept to deployment.
          </p>
        </motion.div>

        <div className="mx-auto mt-14 max-w-4xl">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-transparent sm:left-1/2" aria-hidden="true" />

            {WORKFLOW.map((step, index) => {
              const Icon = iconMap[step.icon] || Code;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative mb-10 flex items-center gap-6 sm:gap-8 ${
                    isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${isEven ? "sm:text-right" : "sm:text-left"} hidden sm:block`}>
                    <div className={`inline-block ${isEven ? "sm:ml-auto" : "sm:mr-auto"}`}>
                      <h3 className="text-lg font-bold text-white">{step.title}</h3>
                      <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-purple-500/30 bg-gray-950 sm:h-14 sm:w-14">
                    <Icon className="h-5 w-5 text-purple-400 sm:h-6 sm:w-6" />
                  </div>

                  <div className={`flex-1 ${isEven ? "sm:text-left" : "sm:text-right"} sm:hidden`}>
                    <h3 className="text-lg font-bold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-400">
                      {step.description}
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
