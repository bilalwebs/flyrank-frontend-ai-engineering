import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Bilal Hussain — Frontend AI Engineering Intern",
  description:
    "Portfolio of Muhammad Bilal Hussain, a Frontend AI Engineering intern building modern web applications with React, Next.js, TypeScript, and AI-assisted development tools.",
  authors: [{ name: "Muhammad Bilal Hussain" }],
  creator: "Muhammad Bilal Hussain",
  keywords: ["frontend developer", "AI engineer", "React", "Next.js", "TypeScript", "portfolio"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
