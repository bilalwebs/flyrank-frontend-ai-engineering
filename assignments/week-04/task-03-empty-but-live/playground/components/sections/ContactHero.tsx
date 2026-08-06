import { Reveal } from "@/components/ui/Reveal"
import { Container } from "@/components/ui/Container"
import { Badge } from "@/components/ui/Badge"

export function ContactHero() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="contact-hero-title">
      <Container size="narrow">
        <Reveal>
          <div className="text-center">
            <Badge className="mb-5">Let&apos;s connect</Badge>
            <h1
              id="contact-hero-title"
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              Get in Touch
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              Have a question or want to work together? I would love to hear
              from you. Reach out through any of the channels below or send a
              message directly.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
