import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Muhammad Bilal Hussain — AI Engineer & Full Stack Developer",
  description:
    "Portfolio of Muhammad Bilal Hussain — AI Engineer, Full Stack Developer, and Open Source Contributor building intelligent systems with Python, TypeScript, React, and modern AI frameworks.",
  keywords: [
    "AI Engineer",
    "Full Stack Developer",
    "Python",
    "TypeScript",
    "React",
    "Next.js",
    "OpenAI",
    "Portfolio",
  ],
  authors: [{ name: "Muhammad Bilal Hussain" }],
  creator: "Muhammad Bilal Hussain",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Muhammad Bilal Hussain Portfolio",
    title: "Muhammad Bilal Hussain — AI Engineer & Full Stack Developer",
    description:
      "Portfolio of Muhammad Bilal Hussain — AI Engineer, Full Stack Developer, and Open Source Contributor.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="flex min-h-screen flex-col bg-background text-text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
