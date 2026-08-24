import { PROFILE } from "@/constants/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-gray-950">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <p className="font-medium text-gray-200">{PROFILE.name}</p>
            <p className="mt-1 text-sm text-gray-400">{PROFILE.title}</p>
          </div>

          <div className="flex gap-6">
            <a
              href={`mailto:${PROFILE.email}`}
              className="min-h-[44px] inline-flex items-center text-sm text-gray-400 transition-colors hover:text-white"
            >
              Email
            </a>
            <a
              href="#contact"
              className="min-h-[44px] inline-flex items-center text-sm text-gray-400 transition-colors hover:text-white"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-8 text-center">
          <p className="text-xs text-gray-400">
            FlyRank Frontend AI Engineering — Week 06 Task 03
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Built with Next.js 16, TypeScript, Tailwind CSS v4, and Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
