"use client"

import { MoonIcon, SunIcon } from "@/components/ui/icons"

export function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement
    const isDark = root.classList.contains("dark")

    root.classList.toggle("dark", !isDark)
    try {
      localStorage.setItem("theme", isDark ? "light" : "dark")
    } catch {
      // Ignore storage errors (e.g. private browsing)
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-offset-zinc-950"
    >
      <SunIcon className="h-5 w-5 dark:hidden" />
      <MoonIcon className="hidden h-5 w-5 dark:block" />
    </button>
  )
}
