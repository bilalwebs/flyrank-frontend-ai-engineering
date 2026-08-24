"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navigation } from "@/data/navigation"
import { MobileNav } from "./MobileNav"

export function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const pathname = usePathname()

  const closeMobileNav = useCallback(() => {
    setIsMobileNavOpen(false)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileNavOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-black/80">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Portfolio
        </Link>

        <ul className="hidden items-center gap-8 md:flex" role="list">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-zinc-600 dark:text-zinc-400"
                }`}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          onClick={() => setIsMobileNavOpen(true)}
          aria-expanded={isMobileNavOpen}
          aria-controls="mobile-navigation"
          aria-label="Open navigation menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </nav>

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={closeMobileNav}
        pathname={pathname}
      />
    </header>
  )
}
