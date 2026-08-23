import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buttons with a Brain — Motion & State Micro-interactions",
  description:
    "Smart buttons with intelligent state management, GPU-friendly animations, and production-ready accessibility.",
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
