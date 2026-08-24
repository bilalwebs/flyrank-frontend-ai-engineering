import { Button } from "@/components/ui/Button"

export function CTASection() {
  return (
    <section className="py-20 sm:py-32" aria-labelledby="cta-title">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="cta-title"
          className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
        >
          Let&apos;s Work Together
        </h2>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          I&apos;m always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision.
        </p>
        <div className="mt-8">
          <Button href="/contact" variant="primary" size="lg">
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  )
}
