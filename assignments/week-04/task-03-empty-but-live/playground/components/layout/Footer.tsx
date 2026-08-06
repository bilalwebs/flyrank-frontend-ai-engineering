import Link from "next/link"
import { footerNavigation } from "@/data/navigation"
import { siteConfig } from "@/data/site"
import { contactInfo } from "@/data/portfolio"
import { Container } from "@/components/ui/Container"
import { ArrowUpIcon } from "@/components/ui/icons"

const socialLinks = [
  { platform: "github", url: contactInfo.github, label: "GitHub profile" },
  { platform: "linkedin", url: contactInfo.linkedin, label: "LinkedIn profile" },
  { platform: "email", url: `mailto:${contactInfo.email}`, label: "Send an email" },
]

export function Footer() {
  const year = 2026

  return (
    <footer
      className="border-t border-border bg-card"
      role="contentinfo"
    >
      <Container className="py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="text-base font-semibold tracking-tight text-foreground transition-colors hover:text-brand"
            >
              {siteConfig.author}
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Frontend AI Engineer building modern, accessible, and performant
              web applications.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5" role="list">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Connect
            </h3>
            <ul className="mt-4 space-y-2.5" role="list">
              {socialLinks.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition-colors hover:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            &copy; {year} {siteConfig.author}
          </p>
          <p className="font-mono text-xs text-muted">
            Built with Next.js &bull; React &bull; TypeScript &bull; Tailwind
            CSS
          </p>
          <a
            href="#main-content"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full"
          >
            Back to top
            <ArrowUpIcon className="h-4 w-4" />
          </a>
        </div>
      </Container>
    </footer>
  )
}
