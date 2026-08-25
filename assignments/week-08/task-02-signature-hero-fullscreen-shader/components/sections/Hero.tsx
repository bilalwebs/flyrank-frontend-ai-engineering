"use client"

import { lazy, Suspense } from "react"

const ShaderHero = lazy(() =>
  import("@/components/hero/ShaderHero").then((mod) => ({
    default: mod.ShaderHero,
  }))
)

function HeroFallback() {
  return (
    <section
      className="relative min-h-[100dvh] overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 30% 50%, rgba(26, 35, 126, 0.4) 0%, transparent 60%), radial-gradient(ellipse at 70% 40%, rgba(0, 150, 136, 0.3) 0%, transparent 50%), linear-gradient(180deg, #0a0a0a 0%, #0d0d1a 100%)",
      }}
      aria-label="Hero section"
    >
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <div>
          <p className="mb-4 text-lg font-medium text-cyan-300 sm:text-xl">
            Loading...
          </p>
        </div>
      </div>
    </section>
  )
}

export function Hero() {
  return (
    <Suspense fallback={<HeroFallback />}>
      <ShaderHero />
    </Suspense>
  )
}
