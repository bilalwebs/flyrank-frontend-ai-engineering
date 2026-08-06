import Image from "next/image"
import type { ReactElement } from "react"
import { aboutData } from "@/data/portfolio"
import { Button } from "@/components/ui/Button"
import { SectionTitle } from "@/components/ui/SectionTitle"
import { Reveal } from "@/components/ui/Reveal"
import { Container } from "@/components/ui/Container"
import {
  GraduationCapIcon,
  BriefcaseIcon,
  TargetIcon,
  ArrowRightIcon,
} from "@/components/ui/icons"
import type { AboutDetailKind } from "@/types"

const detailIcons: Record<AboutDetailKind, ReactElement> = {
  education: <GraduationCapIcon className="h-6 w-6" />,
  internship: <BriefcaseIcon className="h-6 w-6" />,
  focus: <TargetIcon className="h-6 w-6" />,
}

export function AboutHero() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="about-hero-title">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto flex max-w-xs items-center justify-center">
              <div
                className="glow-blob absolute inset-0 scale-125"
                aria-hidden="true"
              />
              <div className="relative rounded-3xl bg-linear-to-br from-primary to-accent p-1.5 shadow-2xl shadow-primary/20">
                <div className="overflow-hidden rounded-[1.25rem] bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={aboutData.profileImage}
                    alt="Portrait of Muhammad Bilal Hussain"
                    width={384}
                    height={384}
                    sizes="(max-width: 1024px) 100vw, 384px"
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 w-max -translate-x-1/2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-lg">
                <span className="text-gradient font-semibold">
                  Frontend AI Engineer
                </span>
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <SectionTitle
                eyebrow="About me"
                title="Engineering beautiful, intelligent interfaces"
                subtitle="A short introduction to who I am and what I do"
                id="about-hero-title"
              />
            </Reveal>

            <div className="-mt-6 space-y-4">
              {aboutData.bio.map((paragraph, index) => (
                <Reveal key={index} delay={100 + index * 80}>
                  <p className="text-base leading-relaxed text-muted">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {aboutData.details.map((detail, index) => (
                <Reveal key={detail.kind} delay={index * 80}>
                  <article className="h-full rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-brand">
                      {detailIcons[detail.kind]}
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {detail.title}
                    </h3>
                    <p className="mt-1 text-sm leading-snug text-muted">
                      {detail.value}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={240}>
              <div className="mt-8">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">
                  Technologies
                </h3>
                <ul
                  className="mt-3 flex flex-wrap gap-2"
                  role="list"
                  aria-label="Technologies I work with"
                >
                  {aboutData.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border bg-card px-3.5 py-1.5 font-mono text-xs text-muted"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-8">
                <Button href="/contact" variant="primary">
                  Get in Touch
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
