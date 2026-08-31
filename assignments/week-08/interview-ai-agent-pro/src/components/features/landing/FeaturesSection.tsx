import { Brain, MessageSquare, BarChart3, Target, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Interview Agent",
    description: "Intelligent agent that generates role-specific questions and adapts difficulty based on your responses.",
  },
  {
    icon: MessageSquare,
    title: "Real-Time Evaluation",
    description: "Get instant feedback on technical accuracy, explanation quality, and communication clarity.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Track your progress across sessions with detailed scoring and trend analysis.",
  },
  {
    icon: Target,
    title: "Weakness Detection",
    description: "AI identifies knowledge gaps and generates targeted improvement recommendations.",
  },
  {
    icon: Zap,
    title: "Adaptive Difficulty",
    description: "Questions automatically adjust to challenge you at the right level.",
  },
  {
    icon: Shield,
    title: "Structured Feedback",
    description: "Detailed breakdowns of strengths, weaknesses, and actionable improvement advice.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="features-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 id="features-title" className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Everything you need to prepare for technical interviews with confidence.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all duration-200 hover:border-indigo-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-800">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 transition-colors group-hover:bg-indigo-100 dark:bg-indigo-900/20 dark:group-hover:bg-indigo-900/30">
                  <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
