"use client"

import Image from "next/image"

const infoItems = [
  { label: "Name", value: "Muhammad Bilal Hussain" },
  { label: "Email", value: "bilal@flyrank.com" },
  { label: "Location", value: "Pakistan" },
  { label: "Availability", value: "Open to Opportunities" },
  { label: "Experience", value: "5+ Years" },
  { label: "Education", value: "BS Computer Science" },
]

export default function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            About Me
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Know Who <span className="gradient-text">I Am</span>
          </h2>
        </div>

        <div className="glass-card card-shine rounded-3xl p-8 lg:p-12">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex aspect-[4/5] items-center justify-center rounded-2xl bg-gradient-to-br from-background to-background-secondary border border-border overflow-hidden">
                {/*
                  WORKING PHOTO:
                  Place your image at public/profile/working.jpg
                */}
                <Image
                  src="/profile/working.jpg"
                  alt="Bilal working"
                  width={500}
                  height={625}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-6 lg:col-span-3">
              <p className="text-lg leading-relaxed text-text-secondary">
                I&apos;m a passionate AI Engineer and Full Stack Developer with over 5 years
                of experience building intelligent applications and scalable web systems.
                I specialize in integrating large language models, computer vision, and
                modern AI frameworks into production-grade products.
              </p>
              <p className="text-lg leading-relaxed text-text-secondary">
                From architecting AI-powered pipelines to crafting pixel-perfect
                interfaces, I bridge the gap between cutting-edge AI research and
                real-world user experiences. I&apos;m an active open-source contributor
                and love collaborating with teams that push the boundaries of what&apos;s
                possible with technology.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-3">
                {infoItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-border bg-white/[0.02] p-4"
                  >
                    <p className="text-xs font-medium uppercase tracking-wider text-text-secondary/60">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
