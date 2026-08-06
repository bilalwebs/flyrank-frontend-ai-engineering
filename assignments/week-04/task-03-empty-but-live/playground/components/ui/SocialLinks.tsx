import type { ReactElement } from "react"
import type { SocialLink } from "@/types"
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  ExternalLinkIcon,
} from "@/components/ui/icons"

interface SocialLinksProps {
  links: SocialLink[]
  className?: string
}

const platformIcons: Record<
  string,
  (props: { className?: string }) => ReactElement
> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: MailIcon,
}

export function SocialLinks({ links, className = "" }: SocialLinksProps) {
  if (links.length === 0) {
    return null
  }

  return (
    <ul className={`flex items-center gap-3 ${className}`} role="list" aria-label="Social links">
      {links.map((link) => {
        const Icon = platformIcons[link.platform] ?? ExternalLinkIcon
        return (
          <li key={link.platform}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
              aria-label={link.label}
            >
              <Icon className="h-5 w-5" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
