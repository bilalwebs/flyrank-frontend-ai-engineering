import Image from "next/image"
import { heroData } from "@/data/portfolio"
import { Button } from "@/components/ui/Button"
import { Reveal } from "@/components/ui/Reveal"
import { Container } from "@/components/ui/Container"
import {
  ArrowRightIcon,
  MailIcon,
  SparklesIcon,
} from "@/components/ui/icons"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent_100%)]"
        aria-hidden="true"
      />
      <div
        className="glow-blob pointer-events-none absolute -left-32 top-8 h-96 w-96"
        aria-hidden="true"
      />
      <div
        className="glow-blob pointer-events-none absolute -right-32 top-40 h-96 w-96 opacity-70"
        aria-hidden="true"
      />

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="text-center lg:text-left">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {heroData.availability}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <p className="mt-6 font-mono text-sm uppercase tracking-[0.25em] text-brand">
                {heroData.greeting}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {heroData.name}
              </h1>
            </Reveal>

            <Reveal delay={300}>
              <p className="mt-3 flex items-center justify-center gap-2 text-2xl font-semibold text-gradient sm:text-3xl lg:justify-start">
                <SparklesIcon className="h-6 w-6 shrink-0" />
                {heroData.role}
              </p>
            </Reveal>

            <Reveal delay={400}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted lg:mx-0">
                {heroData.description}
              </p>
            </Reveal>

            <Reveal delay={500}>
              <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
                {heroData.buttons.map((button) => (
                  <Button
                    key={button.href}
                    href={button.href}
                    variant={button.variant === "primary" ? "primary" : "outline"}
                    size="lg"
                  >
                    {button.label}
                    {button.href === "/projects" ? (
                      <ArrowRightIcon className="h-4 w-4" />
                    ) : (
                      <MailIcon className="h-4 w-4" />
                    )}
                  </Button>
                ))}
              </div>
            </Reveal>

            <Reveal delay={600}>
              <ul
                className="mt-10 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
                role="list"
                aria-label="Key technologies"
              >
                {heroData.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-border bg-card px-3.5 py-1.5 font-mono text-xs text-muted"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={300} className="hidden lg:block">
            <div className="relative mx-auto flex max-w-sm items-center justify-center">
              <div
                className="glow-blob absolute inset-0 scale-150"
                aria-hidden="true"
              />
              <div className="relative rounded-full bg-linear-to-br from-primary to-accent p-1.5 shadow-2xl shadow-primary/20">
                <div className="overflow-hidden rounded-full border-4 border-background bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={heroData.avatar}
                    alt={`Portrait of ${heroData.name}`}
                    width={320}
                    height={320}
                    sizes="320px"
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
