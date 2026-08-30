import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Bilal Hussain — AI Engineer & Full Stack Developer",
  description:
    "Portfolio website with a working contact form. Built with Next.js 16, TypeScript, Tailwind CSS v4, and Netlify Forms.",
  authors: [{ name: "Muhammad Bilal Hussain" }],
  creator: "Muhammad Bilal Hussain",
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
