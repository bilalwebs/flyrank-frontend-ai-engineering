"use client";

import { useReducedMotion } from "framer-motion";

export function Background() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {shouldReduceMotion ? (
        <>
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-600/15 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-600/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-3xl" />
        </>
      ) : (
        <>
          <div
            className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-600/15 blur-3xl"
            style={{
              animation: "bgDrift1 20s ease-in-out infinite",
            }}
          />
          <div
            className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-600/15 blur-3xl"
            style={{
              animation: "bgDrift2 25s ease-in-out infinite",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-3xl"
            style={{
              animation: "bgPulse 15s ease-in-out infinite",
            }}
          />
        </>
      )}
    </div>
  );
}
