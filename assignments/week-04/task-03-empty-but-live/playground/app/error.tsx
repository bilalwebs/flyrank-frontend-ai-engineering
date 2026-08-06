"use client"

import { Button } from "@/components/ui/Button"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <section
      className="relative flex flex-1 items-center justify-center overflow-hidden py-20"
      aria-labelledby="error-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_30%,transparent_100%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-md px-4 text-center sm:px-6">
        <p className="text-8xl font-bold text-red-500">!</p>
        <h1
          id="error-title"
          className="mt-4 text-2xl font-bold tracking-tight text-foreground"
        >
          Something Went Wrong
        </h1>
        <p className="mt-3 text-muted">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <Button onClick={reset} variant="primary" size="lg" className="mt-8">
          Try Again
        </Button>
      </div>
    </section>
  )
}
