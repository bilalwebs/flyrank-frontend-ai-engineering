import packageJson from "next/package.json"
import { Container } from "@/components/ui/Container"
import { Badge } from "@/components/ui/Badge"
import { Reveal } from "@/components/ui/Reveal"

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
    <section className="py-20 sm:py-28" aria-labelledby="health-title">
      <Container>
        <Reveal>
          <div className="flex items-center gap-3">
            <Badge variant="success">Operational</Badge>
            <h1
              id="health-title"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Health Check
            </h1>
          </div>
          <p className="mt-3 text-muted">
            Runtime status and environment information for this deployment.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry, index) => (
            <Reveal key={entry.label} delay={index * 60}>
              <div className="rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                <p className="text-sm font-medium text-muted">{entry.label}</p>
                <p className="mt-1 break-all text-base font-semibold text-foreground">
                  {entry.value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-foreground">
              JSON Preview
            </h2>
            <pre className="mt-3 overflow-x-auto rounded-2xl border border-border bg-card p-5 text-sm text-foreground">
              {JSON.stringify(healthJson, null, 2)}
            </pre>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
