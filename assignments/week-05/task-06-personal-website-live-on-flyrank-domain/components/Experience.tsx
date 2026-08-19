"use client"

const experiences = [
  {
    role: "Senior AI Engineer",
    company: "FlyRank",
    period: "2024 — Present",
    description:
      "Leading AI product development, building LLM-powered tools, and architecting intelligent systems for enterprise clients. Driving the technical vision for AI-first products.",
  },
  {
    role: "Full Stack Developer",
    company: "TechCorp Solutions",
    period: "2022 — 2024",
    description:
      "Built and maintained scalable web applications using React, Next.js, and Node.js. Implemented CI/CD pipelines and led migration to microservices architecture.",
  },
  {
    role: "AI Research Engineer",
    company: "DeepVision Labs",
    period: "2021 — 2022",
    description:
      "Developed computer vision models for real-time object detection. Published research on efficient neural architectures and deployed models at scale on cloud infrastructure.",
  },
  {
    role: "Junior Developer",
    company: "StartupHub",
    period: "2020 — 2021",
    description:
      "Full-stack development of MVP products. Built REST APIs, responsive frontends, and contributed to open-source tools used by thousands of developers.",
  },
]

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 hero-glow pointer-events-none opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            Work Experience
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            My Professional <span className="gradient-text">Journey</span>
          </h2>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent-secondary/50 to-transparent lg:left-1/2 lg:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.role}
                className={`relative flex flex-col gap-6 lg:flex-row ${
                  index % 2 === 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute left-[27px] top-6 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-background shadow-[0_0_12px_rgba(79,140,255,0.4)] lg:left-1/2" />

                <div className="ml-14 lg:ml-0 lg:w-1/2">
                  <div className="glass-card card-shine glass-card-hover rounded-2xl p-6 transition-all duration-300">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {exp.period}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-white">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-text-secondary">
                      {exp.company}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary/80">
                      {exp.description}
                    </p>
                  </div>
                </div>

                <div className="hidden lg:block lg:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
