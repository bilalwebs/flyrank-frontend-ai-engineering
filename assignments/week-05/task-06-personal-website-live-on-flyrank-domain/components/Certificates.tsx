"use client"

const certificates = [
  {
    title: "Google Cloud Professional",
    issuer: "Google",
    year: "2024",
    color: "#4285F4",
    icon: "G",
  },
  {
    title: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2023",
    color: "#FF9900",
    icon: "A",
  },
  {
    title: "OpenAI API Certified",
    issuer: "OpenAI",
    year: "2024",
    color: "#10A37F",
    icon: "O",
  },
  {
    title: "Hackathon Winner",
    issuer: "TechCrunch Disrupt",
    year: "2023",
    color: "#7C5CFF",
    icon: "H",
  },
  {
    title: "FlyRank AI Fellowship",
    issuer: "FlyRank",
    year: "2024",
    color: "#4F8CFF",
    icon: "F",
  },
]

export default function Certificates() {
  return (
    <section id="certificates" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            Certificates
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Achievements & <span className="gradient-text">Credentials</span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {certificates.map((cert) => (
            <div
              key={cert.title}
              className="glass-card card-shine glass-card-hover rounded-2xl p-6 transition-all duration-300"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl text-lg font-bold text-white"
                style={{ backgroundColor: `${cert.color}20`, color: cert.color }}
              >
                {cert.icon}
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">
                {cert.title}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">{cert.issuer}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-text-secondary/60">{cert.year}</span>
                <span className="inline-block h-1 w-1 rounded-full bg-success" />
                <span className="text-xs font-medium text-success">Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
