"use client"

const annotations = [
  {
    id: "home",
    label: "HERO SECTION",
    description: "Primary introduction with name, roles, CTA buttons, and profile image.",
  },
  {
    id: "about",
    label: "ABOUT SECTION",
    description: "Professional biography and personal information grid.",
  },
  {
    id: "skills",
    label: "SKILLS SECTION",
    description: "Interactive skill cards with animated progress bars.",
  },
  {
    id: "projects",
    label: "PROJECTS SECTION",
    description: "Featured project showcase with hover interactions.",
  },
  {
    id: "experience",
    label: "WORK EXPERIENCE",
    description: "Vertical timeline of career progression.",
  },
  {
    id: "certificates",
    label: "CERTIFICATES",
    description: "Credential cards validating expertise.",
  },
  {
    id: "blog",
    label: "BLOG / ARTICLES",
    description: "Technical writing and thought leadership.",
  },
  {
    id: "contact",
    label: "CONTACT SECTION",
    description: "Contact info and form for opportunities.",
  },
]

export default function SectionAnnotations() {
  return (
    <section className="relative py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            UI Case Study
          </span>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            Page <span className="gradient-text">Structure</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-text-secondary">
            Every section is labeled and annotated for a clear understanding of the portfolio layout.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {annotations.map((annotation, index) => (
            <div
              key={annotation.id}
              className="glass-card rounded-xl p-4 transition-all duration-300 hover:border-accent/20 hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-[11px] font-bold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 bg-accent/10" />
                <svg
                  className="h-3.5 w-3.5 flex-shrink-0 text-accent/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
              <h3 className="mt-3 text-xs font-bold uppercase tracking-wider text-white">
                {annotation.label}
              </h3>
              <p className="mt-1.5 text-[11px] leading-relaxed text-text-secondary/70">
                {annotation.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
