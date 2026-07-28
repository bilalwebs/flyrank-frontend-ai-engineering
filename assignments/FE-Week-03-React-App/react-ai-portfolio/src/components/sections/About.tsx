import type { AboutData } from "../../types";
import { SectionTitle } from "../ui/SectionTitle";

interface AboutProps {
  data: AboutData;
}

export function About({ data }: AboutProps) {
  return (
    <section
      id="about"
      className="w-full bg-background py-20 sm:py-28"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          id="about-heading"
          title="About Me"
          subtitle="A snapshot of my journey, education, and what drives me forward."
        />

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="flex flex-col items-center gap-8 lg:w-2/5 lg:items-start">
            <div className="relative">
              <span
                className="absolute -inset-2 rounded-full bg-accent/20 blur-2xl"
                aria-hidden="true"
              />
              <img
                src={data.imageUrl}
                alt="Profile photo"
                width={224}
                height={224}
                className="relative h-48 w-48 rounded-full border-4 border-primary object-cover shadow-lg sm:h-56 sm:w-56"
              />
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-surface/60 p-6 backdrop-blur-md">
              <p className="text-base leading-relaxed text-text/80">
                {data.bio}
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6">
            <div className="rounded-2xl border border-white/10 bg-surface/60 p-6 backdrop-blur-md">
              <h3 className="mb-2 font-heading text-lg font-semibold text-accent">
                Education
              </h3>
              <p className="text-sm leading-relaxed text-text/70">
                {data.education}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-surface/60 p-6 backdrop-blur-md">
              <h3 className="mb-2 font-heading text-lg font-semibold text-accent">
                Current Internship
              </h3>
              <p className="text-sm leading-relaxed text-text/70">
                {data.internship}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-surface/60 p-6 backdrop-blur-md">
              <h3 className="mb-2 font-heading text-lg font-semibold text-accent">
                Career Goal
              </h3>
              <p className="text-sm leading-relaxed text-text/70">
                {data.careerGoal}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <h3 className="mb-6 text-center font-heading text-2xl font-bold text-text sm:text-left">
            Experience
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            {data.experiences.map((exp) => (
              <article
                key={exp.role}
                className="rounded-2xl border border-white/10 bg-surface/60 p-6 backdrop-blur-md transition-colors duration-200 hover:bg-surface-light"
              >
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-accent">
                  {exp.period}
                </p>
                <h4 className="font-heading text-lg font-bold text-text">
                  {exp.role}
                </h4>
                <p className="mb-3 text-sm font-medium text-primary">
                  {exp.organization}
                </p>
                <p className="text-sm leading-relaxed text-text/70">
                  {exp.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h3 className="mb-6 text-center font-heading text-2xl font-bold text-text sm:text-left">
            By the Numbers
          </h3>
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {data.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 rounded-2xl border border-l-4 border-l-accent border-white/10 bg-surface/60 p-6 text-center backdrop-blur-md"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-heading text-3xl font-bold text-accent">
                  {stat.value}
                </dd>
                <dd className="text-xs text-text/60">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
