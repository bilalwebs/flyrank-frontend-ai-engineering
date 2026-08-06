import { Button } from "@/components/ui/Button"
import { Reveal } from "@/components/ui/Reveal"
import { Container } from "@/components/ui/Container"
import { ArrowRightIcon } from "@/components/ui/icons"

export function CTASection() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-card py-20 sm:py-28" aria-labelledby="cta-title">
      <div
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_30%,transparent_100%)]"
        aria-hidden="true"
      />
      <div
        className="glow-blob pointer-events-none absolute left-1/2 top-1/2 h-80 w-[40rem] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />

      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="cta-title"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Let&apos;s work together
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              I&apos;m always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="primary" size="lg">
                Get in Touch
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
              <Button href="/projects" variant="ghost" size="lg">
                View my work
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
