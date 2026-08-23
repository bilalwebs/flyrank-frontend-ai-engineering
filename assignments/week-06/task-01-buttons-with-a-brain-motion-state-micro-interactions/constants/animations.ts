import type { BezierDefinition } from "framer-motion";

export const ANIMATION_DURATION = {
  instant: 0.1,
  fast: 0.15,
  normal: 0.25,
  slow: 0.4,
  spinner: 0.8,
} as const;

export const ANIMATION_EASING = {
  spring: [0.34, 1.56, 0.64, 1] as BezierDefinition,
  easeOut: [0.16, 1, 0.3, 1] as BezierDefinition,
  easeIn: [0.55, 0.085, 0.68, 0.53] as BezierDefinition,
  smooth: [0.4, 0, 0.2, 1] as BezierDefinition,
} as const;

export const DELAY_RANGE = {
  min: 1000,
  max: 3000,
} as const;

export const SUCCESS_RATE = 0.8;

export const BUTTON_VARIANTS = {
  primary: {
    idle: "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25",
    hover: "shadow-xl shadow-blue-500/40",
    success:
      "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25",
    error:
      "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/25",
    disabled: "bg-gray-700 text-gray-400 cursor-not-allowed",
  },
  secondary: {
    idle: "bg-white/10 text-white border border-white/20 backdrop-blur-sm",
    hover: "bg-white/20 shadow-lg shadow-white/10",
    success:
      "bg-green-500/20 text-green-300 border border-green-500/30",
    error: "bg-red-500/20 text-red-300 border border-red-500/30",
    disabled:
      "bg-gray-800/50 text-gray-500 border border-gray-700/50 cursor-not-allowed",
  },
  danger: {
    idle: "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/25",
    hover: "shadow-xl shadow-red-500/40",
    success:
      "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25",
    error:
      "bg-gradient-to-r from-red-700 to-rose-700 text-white shadow-lg shadow-red-500/25",
    disabled: "bg-gray-700 text-gray-400 cursor-not-allowed",
  },
} as const;

export const BUTTON_SIZES = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-2.5",
} as const;
