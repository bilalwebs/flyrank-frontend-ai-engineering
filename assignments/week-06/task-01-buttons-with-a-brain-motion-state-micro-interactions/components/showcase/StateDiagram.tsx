"use client";

import { motion } from "framer-motion";

const states = [
  { label: "Idle", color: "bg-blue-500/20 border-blue-500/40 text-blue-300" },
  { label: "Hover", color: "bg-blue-500/30 border-blue-400/50 text-blue-200" },
  { label: "Focus", color: "bg-purple-500/20 border-purple-500/40 text-purple-300" },
  { label: "Active", color: "bg-purple-500/30 border-purple-400/50 text-purple-200" },
  { label: "Loading", color: "bg-yellow-500/20 border-yellow-500/40 text-yellow-300" },
  { label: "Success", color: "bg-green-500/20 border-green-500/40 text-green-300" },
  { label: "Error", color: "bg-red-500/20 border-red-500/40 text-red-300" },
  { label: "Disabled", color: "bg-gray-500/20 border-gray-500/40 text-gray-400" },
];

const flowSteps = [
  "Idle → Click → Loading",
  "Loading → 1-3s delay",
  "Loading → 80% → Success",
  "Loading → 20% → Error",
  "Success/Error → 2s → Idle",
  "Hover / Focus / Active = visual only",
];

export function StateDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto mt-16 max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
    >
      <h2 className="mb-2 text-xl font-semibold text-white">State Machine</h2>
      <p className="mb-6 text-sm text-gray-400">
        How the button transitions between states
      </p>

      <div className="mb-8 flex flex-wrap gap-3">
        {states.map((s, i) => (
          <motion.span
            key={s.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.05, duration: 0.3 }}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${s.color}`}
          >
            {s.label}
          </motion.span>
        ))}
      </div>

      <div className="space-y-2">
        {flowSteps.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.08, duration: 0.3 }}
            className="flex items-center gap-2 text-sm text-gray-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
            <code className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-xs text-gray-400">
              {step}
            </code>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
