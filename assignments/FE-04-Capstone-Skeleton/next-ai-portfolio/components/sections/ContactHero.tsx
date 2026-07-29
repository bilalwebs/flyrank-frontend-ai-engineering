import { SectionTitle } from "@/components/ui/SectionTitle"

export function ContactHero() {
  return (
    <section className="py-20 sm:py-32" aria-labelledby="contact-hero-title">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <SectionTitle
          title="Get in Touch"
          subtitle="Have a question or want to work together? I would love to hear from you."
          align="center"
          id="contact-hero-title"
        />
      </div>
    </section>
  )
}
