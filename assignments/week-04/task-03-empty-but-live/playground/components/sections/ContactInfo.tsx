import { contactInfo } from "@/data/portfolio"
import { SocialLinks } from "@/components/ui/SocialLinks"
import { Reveal } from "@/components/ui/Reveal"
import {
  MailIcon,
  GithubIcon,
  LinkedinIcon,
  MapPinIcon,
} from "@/components/ui/icons"

const socialLinks = [
  {
    platform: "github",
    url: contactInfo.github,
    label: "GitHub profile",
  },
  {
    platform: "linkedin",
    url: contactInfo.linkedin,
    label: "LinkedIn profile",
  },
  {
    platform: "email",
    url: `mailto:${contactInfo.email}`,
    label: "Send an email",
  },
]

export function ContactInfoSection() {
  const channels = [
    {
      label: "Email",
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      icon: <MailIcon className="h-5 w-5" />,
      external: false,
    },
    {
      label: "GitHub",
      value: contactInfo.github.replace("https://", ""),
      href: contactInfo.github,
      icon: <GithubIcon className="h-5 w-5" />,
      external: true,
    },
    {
      label: "LinkedIn",
      value: contactInfo.linkedin.replace("https://", ""),
      href: contactInfo.linkedin,
      icon: <LinkedinIcon className="h-5 w-5" />,
      external: true,
    },
    {
      label: "Location",
      value: contactInfo.location,
      href: undefined,
      icon: <MapPinIcon className="h-5 w-5" />,
      external: false,
    },
  ]

  return (
    <aside aria-label="Contact information">
      <Reveal>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Contact Information
        </h2>
        <p className="mt-2 text-sm text-muted">
          Feel free to reach out through any of the channels below.
        </p>
      </Reveal>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {channels.map((channel, index) => {
          const content = (
            <article className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-brand">
                {channel.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {channel.label}
                </h3>
                <p className="mt-1 break-all text-sm text-muted transition-colors group-hover:text-brand">
                  {channel.value}
                </p>
              </div>
            </article>
          )

          if (!channel.href) {
            return <Reveal key={channel.label} delay={index * 60}>{content}</Reveal>
          }

          return (
            <Reveal key={channel.label} delay={index * 60}>
              <a
                href={channel.href}
                className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl dark:focus-visible:ring-offset-zinc-950"
                {...(channel.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {content}
              </a>
            </Reveal>
          )
        })}
      </div>

      <Reveal delay={280}>
        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-foreground">Elsewhere</h3>
          <SocialLinks links={socialLinks} className="mt-4" />
        </div>
      </Reveal>
    </aside>
  )
}
