"use client"

import { Suspense } from "react"
import { ShaderCanvas } from "./ShaderCanvas"
import { HeroContent } from "./HeroContent"

function ShaderLoader() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at 30% 50%, rgba(26, 35, 126, 0.4) 0%, transparent 60%), linear-gradient(180deg, #0a0a0a 0%, #0d0d1a 100%)",
      }}
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <div
          className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-cyan-400"
          aria-hidden="true"
        />
        <p className="mt-3 text-sm text-white/50">Loading shader...</p>
      </div>
    </div>
  )
}

export function ShaderHero() {
  return (
    <section
      className="relative min-h-[100dvh] overflow-hidden bg-[#0a0a0a]"
      aria-label="Hero section"
    >
      {/* Shader background — fills entire viewport */}
      <Suspense fallback={<ShaderLoader />}>
        <ShaderCanvas />
      </Suspense>

      {/* Hero text content — sits on top of the shader */}
      <HeroContent />

      {/* Bottom gradient fade — smooth transition to next section */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent"
        aria-hidden="true"
      />
    </section>
  )
}
