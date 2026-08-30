import { PROFILE, NAV_LINKS, SOCIAL_LINKS } from "@/constants/portfolio";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-gray-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="text-lg font-bold text-white">
              {PROFILE.name.split(" ")[0]}
              <span className="text-purple-400">.</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-400">
              {PROFILE.title}. Building intelligent, performant, and accessible web experiences.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-lg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Connect</h3>
            <ul className="mt-4 space-y-2.5">
              {SOCIAL_LINKS.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={link.label}
                      className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-lg"
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">FlyRank Badge</h3>
            <div className="mt-4 rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600/20">
                  <span className="text-xs font-bold text-purple-300">FR</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-purple-300">FlyRank Graduate</p>
                  <p className="text-xs text-gray-500">Frontend AI Engineering</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} {PROFILE.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-xs text-gray-500">
            Built with <Heart className="h-3 w-3 text-red-400" aria-hidden="true" /> using Next.js, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
