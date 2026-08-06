"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { navigation } from "@/data/navigation"
import { siteConfig } from "@/data/site"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { CloseIcon } from "@/components/ui/icons"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  pathname: string
}

export function MobileNav({ isOpen, onClose, pathname }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      closeButtonRef.current?.focus()
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onClose])

  const initials = siteConfig.author
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-zinc-950/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-y-0 right-0 z-50 flex w-80 max-w-[85vw] flex-col bg-background shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-accent text-sm font-bold text-white shadow-sm shadow-primary/30">
              {initials}
            </span>
            <span className="text-sm font-semibold text-foreground">Menu</span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-zinc-100 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-950"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-1" role="list">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
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
        </nav>

        <div className="flex items-center justify-between border-t border-border px-6 py-4">
          <span className="text-sm text-muted">Appearance</span>
          <ThemeToggle />
        </div>
      </div>
    </>
  )
}
