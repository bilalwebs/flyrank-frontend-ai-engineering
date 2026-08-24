import Image from "next/image"
import { heroData } from "@/data/portfolio"
import { Button } from "@/components/ui/Button"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-zinc-50 to-white py-20 dark:from-zinc-950 dark:to-black sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <p className="mb-3 text-lg font-medium text-primary">
              {heroData.greeting}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
              {heroData.name}
            </h1>
            <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400">
              {heroData.tagline}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {heroData.description}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
              {heroData.buttons.map((button) => (
                <Button
                  key={button.href}
                  href={button.href}
                  variant={button.variant}
                  size="lg"
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-primary/20 bg-zinc-100 dark:bg-zinc-800 sm:h-80 sm:w-80">
              <Image
                src={heroData.avatar}
                alt={heroData.name}
                fill
                sizes="(max-width: 640px) 256px, 320px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
