"use client";

import { Brain, MessageSquare, BarChart3, Target, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300">
            <Sparkles className="h-4 w-4" />
            AI-Powered Interview Coaching
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
            Ace Your Next
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Technical Interview</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Practice with an AI interviewer that adapts to your level, evaluates your answers in real-time, and creates personalized improvement roadmaps.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/interview/setup" size="lg">
              Start Interview <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/dashboard" variant="outline" size="lg">
              View Dashboard
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
