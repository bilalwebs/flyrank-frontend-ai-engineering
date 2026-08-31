import { Settings, MessageSquare, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Settings,
    step: "01",
    title: "Configure Your Session",
    description: "Select your role, experience level, target skills, and difficulty. The AI tailors everything to your profile.",
  },
  {
    icon: MessageSquare,
    step: "02",
    title: "Practice & Learn",
    description: "Answer AI-generated questions. Get real-time feedback on technical accuracy and communication.",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Review & Improve",
    description: "Receive a comprehensive report with scores, weak areas, and a personalized learning roadmap.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-zinc-50 py-20 dark:bg-zinc-950 sm:py-28" aria-labelledby="how-it-works-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 id="how-it-works-title" className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Three simple steps to improve your interview skills.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.step} className="relative text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                  <Icon className="h-8 w-8" />
                </div>
                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">Step {step.step}</p>
                <h3 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{step.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
