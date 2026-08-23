"use client";

import { Background } from "@/components/layout/Background";
import { Header } from "@/components/layout/Header";
import { ButtonShowcase } from "@/components/showcase/ButtonShowcase";
import { StateDiagram } from "@/components/showcase/StateDiagram";

export default function Home() {
  return (
    <>
      <Background />
      <main className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Header />
        <ButtonShowcase />
        <StateDiagram />

        <footer className="mt-16 text-center text-sm text-gray-500">
          <p className="font-medium text-gray-400">
            Muhammad Bilal Hussain — AI Engineer | Full Stack Developer
          </p>
          <p className="mt-2">
            FlyRank Frontend AI Engineering — Week 06 FE-AA1
          </p>
          <p className="mt-1 text-xs text-gray-600">
            Built with Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion, and Lucide React
          </p>
        </footer>
      </main>
    </>
  );
}
