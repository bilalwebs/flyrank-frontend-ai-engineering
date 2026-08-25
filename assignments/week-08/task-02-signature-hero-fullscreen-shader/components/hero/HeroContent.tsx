import { heroData } from "@/data/portfolio"
import { Button } from "@/components/ui/Button"

export function HeroContent() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 text-center">
        <p className="mb-4 text-lg font-medium text-cyan-300 sm:text-xl">
          {heroData.greeting}
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
          {heroData.name}
        </h1>

        <p className="mt-4 max-w-2xl text-xl font-light text-blue-200/80 sm:text-2xl">
          {heroData.tagline}
        </p>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-300/70 sm:text-lg">
          {heroData.description}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          {heroData.buttons.map((button) => (
            <Button
              key={button.href}
              href={button.href}
              variant={button.variant === "primary" ? "primary" : "secondary"}
              size="lg"
            >
              {button.label}
            </Button>
          ))}
        </div>

        <div className="mt-16 animate-bounce text-white/40">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
