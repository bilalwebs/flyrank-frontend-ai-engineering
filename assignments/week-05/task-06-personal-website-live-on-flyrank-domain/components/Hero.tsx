"use client"

import Image from "next/image"

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-[72px]"
    >
      <div className="hero-glow absolute inset-0 pointer-events-none" />

      <div className="absolute top-20 right-[10%] h-72 w-72 rounded-full bg-accent/10 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-20 left-[5%] h-64 w-64 rounded-full bg-accent-secondary/10 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-4 py-1.5 text-sm text-text-secondary">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            Available for opportunities
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[64px] lg:leading-[1.1]">
            Hi, I&apos;m{" "}
            <span className="gradient-text">Muhammad Bilal</span>
            <br />
            <span className="text-text-secondary">Hussain</span>
          </h1>

          <div className="flex flex-wrap gap-3">
            {["AI Engineer", "Full Stack Developer", "Open Source Contributor"].map(
              (role) => (
                <span
                  key={role}
                  className="rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm font-medium text-accent"
                >
                  {role}
                </span>
              )
            )}
          </div>

          <p className="max-w-lg text-lg leading-relaxed text-text-secondary">
            Building intelligent systems at the intersection of AI and full-stack
            engineering. Passionate about creating tools that make a real difference
            in how people interact with technology.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-secondary px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(79,140,255,0.3)] transition-all duration-300 hover:shadow-[0_4px_30px_rgba(79,140,255,0.5)] hover:scale-105"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-accent/30 hover:bg-accent/5"
            >
              Contact Me
            </a>
          </div>

          <div className="flex items-center gap-4 pt-4">
            {[
              { label: "GitHub", path: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" },
              { label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
              { label: "Twitter", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
              { label: "Email", path: "M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-white/5 text-text-secondary transition-all duration-300 hover:border-accent/30 hover:bg-accent/10 hover:text-accent"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute h-80 w-80 rounded-full bg-gradient-to-br from-accent/20 to-accent-secondary/20 blur-[60px] animate-pulse-glow" />
          <div className="absolute h-[400px] w-[400px] rounded-full border border-accent/10 animate-[spin_20s_linear_infinite]" />
          <div className="absolute h-[320px] w-[320px] rounded-full border border-accent-secondary/10 animate-[spin_30s_linear_infinite_reverse]" />

          <div className="relative">
            <div className="flex h-[300px] w-[300px] items-center justify-center rounded-full bg-gradient-to-br from-background-secondary to-background border border-border overflow-hidden lg:h-[360px] lg:w-[360px]">
              {/*
                PROFILE PHOTO:
                Place your image at public/profile/photo.jpg
                Then uncomment the <Image> tag below and remove the <div> placeholder.
              */}
              <Image
                src="/profile/photo.jpg"
                alt="Muhammad Bilal Hussain"
                width={360}
                height={360}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            <div className="absolute -right-4 top-8 rounded-xl glass-card px-4 py-2.5 text-sm font-medium animate-float">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-success" />
              Open to Work
            </div>
            <div className="absolute -left-4 bottom-12 rounded-xl glass-card px-4 py-2.5 text-sm font-medium animate-float-slow">
              <span className="gradient-text font-bold">5+</span>&nbsp;Years Experience
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
