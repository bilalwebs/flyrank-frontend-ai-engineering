import type { Social } from "../../types";

interface SocialLinksProps {
  socials: Social[];
  className?: string;
}

export function SocialLinks({ socials, className = "" }: SocialLinksProps) {
  return (
    <nav aria-label="Social media links">
      <ul className={`flex flex-wrap items-center gap-4 ${className}`} role="list">
        {socials.map((social) => (
          <li key={social.platform}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text/70 transition-colors duration-200 hover:text-accent"
            >
              {social.platform}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
