export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center py-20" aria-label="Loading">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <div className="mx-auto h-4 w-40 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="mx-auto h-10 w-72 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            <div className="mx-auto h-5 w-96 max-w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="space-y-4 rounded-2xl border border-border bg-card p-6"
              >
                <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-3 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-2 w-full animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
