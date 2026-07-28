import { useState, useEffect, useCallback } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

const sectionIds = navLinks.map((link) => link.href.slice(1));

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeMenu]);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md">
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to content
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a
          href="#home"
          className="font-heading text-xl font-bold text-text transition-colors hover:text-accent"
        >
          Portfolio
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden md:block"
        >
          <ul className="flex items-center gap-6" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    activeId === link.href.slice(1)
                      ? "text-accent"
                      : "text-text/70 hover:text-text"
                  }`}
                  aria-current={activeId === link.href.slice(1) ? "true" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="flex flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <span
            className={`block h-0.5 w-6 bg-text transition-transform duration-200 ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
            aria-hidden="true"
          />
          <span
            className={`block h-0.5 w-6 bg-text transition-opacity duration-200 ${
              isOpen ? "opacity-0" : ""
            }`}
            aria-hidden="true"
          />
          <span
            className={`block h-0.5 w-6 bg-text transition-transform duration-200 ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden ${isOpen ? "block" : "hidden"}`}
      >
        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col gap-1 px-4 pb-4" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    activeId === link.href.slice(1)
                      ? "bg-surface text-accent"
                      : "text-text/70 hover:bg-surface hover:text-text"
                  }`}
                  aria-current={activeId === link.href.slice(1) ? "true" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
