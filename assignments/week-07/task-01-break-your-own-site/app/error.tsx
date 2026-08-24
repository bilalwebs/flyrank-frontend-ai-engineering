"use client"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <section className="flex flex-1 items-center justify-center py-20" aria-labelledby="error-title">
      <div className="mx-auto max-w-md px-4 text-center sm:px-6">
        <p className="text-8xl font-bold text-red-500">!</p>
        <h1
          id="error-title"
          className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50"
        >
          Something Went Wrong
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          An unexpected error occurred. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Try Again
        </button>
      </div>
    </section>
  )
}
