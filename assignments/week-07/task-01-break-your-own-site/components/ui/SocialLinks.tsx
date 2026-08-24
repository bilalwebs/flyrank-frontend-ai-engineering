import type { SocialLink } from "@/types"

interface SocialLinksProps {
  links: SocialLink[]
}

const platformLabels: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  email: "Email",
}

export function SocialLinks({ links }: SocialLinksProps) {
  if (links.length === 0) {
    return null
  }

  return (
    <ul className="flex items-center gap-4" role="list" aria-label="Social links">
      {links.map((link) => (
        <li key={link.platform}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-primary dark:text-zinc-400 dark:hover:text-primary"
            aria-label={link.label}
          >
            {platformLabels[link.platform] ?? link.label}
          </a>
        </li>
      ))}
    </ul>
  )
}
