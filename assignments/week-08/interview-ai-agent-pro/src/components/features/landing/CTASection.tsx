import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="cta-title">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 sm:p-12 dark:border-indigo-800 dark:from-indigo-950/50 dark:to-purple-950/50">
          <h2 id="cta-title" className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Ready to Level Up?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
            Start practicing with AI-powered interview coaching and build the confidence you need to land your dream role.
          </p>
          <div className="mt-8">
            <Button href="/interview/setup" size="lg">
              Start Your First Interview <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
