import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
}

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center justify-center py-20" aria-labelledby="not-found-title">
      <div className="mx-auto max-w-md px-4 text-center sm:px-6">
        <p className="text-8xl font-bold text-primary">404</p>
        <h1
          id="not-found-title"
          className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50"
        >
          Page Not Found
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Return Home
        </Link>
      </div>
    </section>
  )
}
