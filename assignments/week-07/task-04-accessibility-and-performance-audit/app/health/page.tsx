import packageJson from "next/package.json"

export const dynamic = "force-dynamic"

interface HealthEntry {
  label: string
  value: string
}

export default function HealthPage() {
  const entries: HealthEntry[] = [
    { label: "Status", value: "OK" },
    { label: "Timestamp", value: new Date().toISOString() },
    { label: "Environment", value: process.env.NODE_ENV },
    { label: "Node.js Version", value: process.version },
    { label: "Next.js Version", value: packageJson.version ?? "16.2.12" },
  ]

  const healthJson = Object.fromEntries(
    entries.map((e) => [e.label.toLowerCase().replace(/\s+/g, "_"), e.value]),
  )

  return (
    <section className="py-20 sm:py-32" aria-labelledby="health-title">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1
          id="health-title"
          className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
        >
          Health Check
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Runtime status and environment information.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {entries.map((entry) => (
            <div
              key={entry.label}
              className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {entry.label}
              </p>
              <p className="mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {entry.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            JSON Preview
          </h2>
          <pre className="mt-3 overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
            {JSON.stringify(healthJson, null, 2)}
          </pre>
        </div>
      </div>
    </section>
  )
}
