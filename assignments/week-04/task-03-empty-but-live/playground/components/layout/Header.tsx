"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navigation } from "@/data/navigation"
import { siteConfig } from "@/data/site"
import { contactInfo } from "@/data/portfolio"
import { MobileNav } from "./MobileNav"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { GithubIcon, MenuIcon } from "@/components/ui/icons"

export function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const closeMobileNav = useCallback(() => {
    setIsMobileNavOpen(false)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
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

  const initials = siteConfig.author
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl transition-shadow duration-300 ${
        isScrolled ? "shadow-lg shadow-zinc-950/5 dark:shadow-black/20" : ""
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-accent text-sm font-bold text-white shadow-sm shadow-primary/30">
            {initials}
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:block">
            Muhammad Bilal Hussain
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex" role="list">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${
                    isActive
                      ? "bg-primary/10 text-brand"
                      : "text-muted hover:bg-zinc-100 hover:text-foreground dark:hover:bg-zinc-800/70"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-1">
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="hidden h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-zinc-100 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:inline-flex dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-950"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-zinc-100 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:hidden dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-950"
            onClick={() => setIsMobileNavOpen(true)}
            aria-expanded={isMobileNavOpen}
            aria-controls="mobile-navigation"
            aria-label="Open navigation menu"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={closeMobileNav}
        pathname={pathname}
      />
    </header>
  )
}
