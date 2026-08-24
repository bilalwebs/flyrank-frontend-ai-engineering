import Link from "next/link"
import { navigation } from "@/data/navigation"
import { siteConfig } from "@/data/site"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950" role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <Link
              href="/"
              className="text-lg font-bold text-zinc-900 dark:text-zinc-50"
            >
              Portfolio
            </Link>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Built with Next.js and TypeScript.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2" role="list">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Connect
            </h3>
            <ul className="mt-4 space-y-2" role="list">
              <li>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-8 sm:flex-row dark:border-zinc-800">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            &copy; {year} {siteConfig.author}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://flyrank.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-50"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true" />
              FlyRank Graduate
            </a>
            <a
              href="#main-content"
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
