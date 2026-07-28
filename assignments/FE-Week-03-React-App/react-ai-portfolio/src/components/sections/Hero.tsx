import type { HeroData } from "../../types";
import { Button } from "../ui/Button";

interface HeroProps {
  data: HeroData;
}

export function Hero({ data }: HeroProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-var(--header-height))] items-center overflow-hidden bg-gradient-to-br from-background via-surface to-primary/10"
      aria-label="Introduction"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(76,95,213,0.15),transparent_60%)]" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex-1 animate-fade-in-up">
          <div className="rounded-2xl border border-white/10 bg-surface/60 p-8 backdrop-blur-md sm:p-10">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
              {data.title}
            </p>

            <h1 className="font-heading text-4xl font-bold leading-tight text-text sm:text-5xl lg:text-6xl">
              Hi, I&apos;m{" "}
              <span className="text-primary">{data.name}</span>
            </h1>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-text/70 sm:text-lg">
              {data.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {data.buttons.map((btn) => (
                <Button key={btn.label} href={btn.href} variant={btn.variant}>
                  {btn.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 animate-fade-in-up animation-delay-200">
          <div className="relative">
            <span
              className="absolute -inset-2 rounded-full bg-primary/20 blur-2xl"
              aria-hidden="true"
            />
            <img
              src={data.imageUrl}
              alt={`${data.name} - ${data.title}`}
              width={320}
              height={320}
              fetchPriority="high"
              className="relative h-56 w-56 rounded-full border-4 border-accent object-cover shadow-lg sm:h-64 sm:w-64 lg:h-80 lg:w-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
