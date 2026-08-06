import { Button } from "@/components/ui/Button"
import { ArrowRightIcon } from "@/components/ui/icons"

export default function NotFound() {
  return (
    <section
      className="relative flex flex-1 items-center justify-center overflow-hidden py-20"
      aria-labelledby="not-found-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_30%,transparent_100%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-md px-4 text-center sm:px-6">
        <p className="text-8xl font-bold text-gradient">404</p>
        <h1
          id="not-found-title"
          className="mt-4 text-2xl font-bold tracking-tight text-foreground"
        >
          Page Not Found
        </h1>
        <p className="mt-3 text-muted">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button href="/" variant="primary" size="lg" className="mt-8">
          Return Home
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
