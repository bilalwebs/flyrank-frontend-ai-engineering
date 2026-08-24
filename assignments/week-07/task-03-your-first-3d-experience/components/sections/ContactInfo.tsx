import { contactInfo } from "@/data/portfolio"
import { SocialLinks } from "@/components/ui/SocialLinks"

export function ContactInfoSection() {
  const socialLinks = [
    {
      platform: "github",
      url: contactInfo.github,
      label: "GitHub Profile",
    },
    {
      platform: "linkedin",
      url: contactInfo.linkedin,
      label: "LinkedIn Profile",
    },
    {
      platform: "email",
      url: `mailto:${contactInfo.email}`,
      label: "Send an Email",
    },
  ]

  return (
    <aside className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Contact Information
        </h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Feel free to reach out through any of the channels below.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Email
          </p>
          <a
            href={`mailto:${contactInfo.email}`}
            className="text-sm text-zinc-600 transition-colors hover:text-primary dark:text-zinc-400 dark:hover:text-primary"
          >
            {contactInfo.email}
          </a>
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            GitHub
          </p>
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-600 transition-colors hover:text-primary dark:text-zinc-400 dark:hover:text-primary"
          >
            {contactInfo.github}
          </a>
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            LinkedIn
          </p>
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-600 transition-colors hover:text-primary dark:text-zinc-400 dark:hover:text-primary"
          >
            {contactInfo.linkedin}
          </a>
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Social Links
        </p>
        <SocialLinks links={socialLinks} />
      </div>
    </aside>
  )
}
