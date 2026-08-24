"use client"

import { useState, useEffect, useCallback, lazy, Suspense } from "react"

const Scene = lazy(() =>
  import("@/components/three/Scene").then((mod) => ({ default: mod.Scene }))
)

import { ControlPanel } from "@/components/ui/ControlPanel"

const COLORS = ["#4c5fd5", "#10b981", "#f59e0b", "#f43f5e", "#06b6d4", "#8b5cf6"]

function SceneLoader() {
  return (
    <div className="flex h-[500px] items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 sm:h-[600px] dark:border-zinc-800 dark:bg-zinc-900">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-zinc-200 border-t-primary" />
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          Loading 3D scene...
        </p>
      </div>
    </div>
  )
}

export default function ThreeDExperiencePage() {
  const [isAnimating, setIsAnimating] = useState(true)
  const [isWireframe, setIsWireframe] = useState(false)
  const [colorIndex, setColorIndex] = useState(0)
  const color = COLORS[colorIndex]

  const handleColorChange = useCallback(() => {
    setColorIndex((prev) => (prev + 1) % COLORS.length)
  }, [])

  const handleToggleAnimation = useCallback(() => {
    setIsAnimating((prev) => !prev)
  }, [])

  const handleToggleWireframe = useCallback(() => {
    setIsWireframe((prev) => !prev)
  }, [])

  const handleResetCamera = useCallback(() => {
    window.dispatchEvent(new CustomEvent("reset-camera"))
  }, [])

  useEffect(() => {
    const handleColorEvent = (e: Event) => {
      const customEvent = e as CustomEvent
      const index = COLORS.indexOf(customEvent.detail)
      if (index !== -1) {
        setColorIndex(index)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (e.code) {
        case "Space":
          e.preventDefault()
          setIsAnimating((prev) => !prev)
          break
        case "KeyW":
          setIsWireframe((prev) => !prev)
          break
        case "KeyR":
          handleResetCamera()
          break
      }
    }

    window.addEventListener("color-change", handleColorEvent)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("color-change", handleColorEvent)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleResetCamera])

  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium text-primary">
            Week 7 &middot; Task 03
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Your First 3D Experience
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            An interactive 3D scene built with React Three Fiber and Three.js
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div>
            <Suspense fallback={<SceneLoader />}>
              <Scene
                isAnimating={isAnimating}
                isWireframe={isWireframe}
                color={color}
                onColorChange={handleColorChange}
              />
            </Suspense>
          </div>

          <aside>
            <ControlPanel
              isAnimating={isAnimating}
              isWireframe={isWireframe}
              color={color}
              onToggleAnimation={handleToggleAnimation}
              onToggleWireframe={handleToggleWireframe}
              onResetCamera={handleResetCamera}
            />
          </aside>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <article className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              React Three Fiber
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Declarative React renderer for Three.js. Build 3D scenes using
              familiar React components and hooks.
            </p>
          </article>
          <article className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              Interactive Controls
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Click the shape to change colors. Use buttons or keyboard
              shortcuts to toggle animation and wireframe.
            </p>
          </article>
          <article className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              Performance First
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Lazy-loaded canvas, Suspense boundaries, and reduced motion
              support for optimal performance.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
