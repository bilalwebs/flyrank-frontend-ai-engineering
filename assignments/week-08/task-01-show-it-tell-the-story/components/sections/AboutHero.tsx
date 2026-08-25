import Image from "next/image"
import { aboutData } from "@/data/portfolio"
import { Button } from "@/components/ui/Button"
import { SectionTitle } from "@/components/ui/SectionTitle"

export function AboutHero() {
  return (
    <section className="py-20 sm:py-32" aria-labelledby="about-hero-title">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <div className="flex-shrink-0">
            <div className="relative h-56 w-56 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 sm:h-64 sm:w-64">
              <Image
                src={aboutData.profileImage}
                alt="Profile"
                fill
                sizes="(max-width: 640px) 224px, 256px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <SectionTitle
              title="About Me"
              subtitle="A brief introduction"
              id="about-hero-title"
            />
            {aboutData.bio.map((paragraph, index) => (
              <p
                key={index}
                className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
              >
                {paragraph}
              </p>
            ))}
            <div className="mt-6 flex flex-wrap gap-6 text-sm">
              <div>
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                  Education:{" "}
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {aboutData.education}
                </span>
              </div>
              <div>
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                  Internship:{" "}
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {aboutData.internship}
                </span>
              </div>
              <div>
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                  Goal:{" "}
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {aboutData.goal}
                </span>
              </div>
            </div>
            <div className="mt-8">
              <Button href="/contact" variant="primary">
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
