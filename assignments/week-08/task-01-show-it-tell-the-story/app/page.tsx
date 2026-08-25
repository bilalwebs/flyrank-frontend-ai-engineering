"use client"

import { useState, useEffect, useCallback, lazy, Suspense } from "react"

const Scene = lazy(() =>
  import("@/components/three/Scene").then((mod) => ({ default: mod.Scene }))
)

import { ControlPanel } from "@/components/ui/ControlPanel"

const COLORS = ["#4c5fd5", "#10b981", "#f59e0b", "#f43f5e", "#06b6d4", "#8b5cf6"]
const COLOR_NAMES = ["Indigo", "Emerald", "Amber", "Rose", "Cyan", "Purple"]

function SceneLoader() {
  return (
    <div
      className="flex h-[500px] items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 sm:h-[600px] dark:border-zinc-800 dark:bg-zinc-900"
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <div
          className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-zinc-200 border-t-primary"
          aria-hidden="true"
        />
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
  const [statusMessage, setStatusMessage] = useState("")
  const color = COLORS[colorIndex]

  const announceStatus = useCallback((message: string) => {
    setStatusMessage("")
    requestAnimationFrame(() => {
      setStatusMessage(message)
    })
  }, [])

  const handleColorChange = useCallback(() => {
    setColorIndex((prev) => {
      const next = (prev + 1) % COLORS.length
      announceStatus(`Color changed to ${COLOR_NAMES[next]}`)
      return next
    })
  }, [announceStatus])

  const handleToggleAnimation = useCallback(() => {
    setIsAnimating((prev) => {
      const next = !prev
      announceStatus(`Animation ${next ? "started" : "paused"}`)
      return next
    })
  }, [announceStatus])

  const handleToggleWireframe = useCallback(() => {
    setIsWireframe((prev) => {
      const next = !prev
      announceStatus(`Wireframe ${next ? "enabled" : "disabled"}`)
      return next
    })
  }, [announceStatus])

  const handleResetCamera = useCallback(() => {
    window.dispatchEvent(new CustomEvent("reset-camera"))
    announceStatus("Camera position reset")
  }, [announceStatus])

  const handleSelectColor = useCallback(
    (index: number) => {
      setColorIndex(index)
      announceStatus(`Color changed to ${COLOR_NAMES[index]}`)
    },
    [announceStatus]
  )

  useEffect(() => {
    const handleColorEvent = (e: Event) => {
      const customEvent = e as CustomEvent
      const index = COLORS.indexOf(customEvent.detail)
      if (index !== -1) {
        setColorIndex(index)
        announceStatus(`Color changed to ${COLOR_NAMES[index]}`)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      switch (e.code) {
        case "Space":
          e.preventDefault()
          setIsAnimating((prev) => {
            const next = !prev
            announceStatus(`Animation ${next ? "started" : "paused"}`)
            return next
          })
          break
        case "KeyW":
          setIsWireframe((prev) => {
            const next = !prev
            announceStatus(`Wireframe ${next ? "enabled" : "disabled"}`)
            return next
          })
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
  }, [handleResetCamera, announceStatus])

  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-medium text-primary">
            Week 7 &middot; Task 04
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Accessibility &amp; Performance Audit
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            An interactive 3D scene with optimized accessibility and performance
          </p>
        </div>

        <div
          className="sr-only"
          role="status"
          aria-live="assertive"
          aria-atomic="true"
        >
          {statusMessage}
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

          <aside aria-label="3D scene controls">
            <ControlPanel
              isAnimating={isAnimating}
              isWireframe={isWireframe}
              color={color}
              onToggleAnimation={handleToggleAnimation}
              onToggleWireframe={handleToggleWireframe}
              onResetCamera={handleResetCamera}
              onSelectColor={handleSelectColor}
            />
          </aside>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <article className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
              React Three Fiber
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Declarative React renderer for Three.js. Build 3D scenes using
              familiar React components and hooks.
            </p>
          </article>
          <article className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
              Interactive Controls
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Click the shape to change colors. Use buttons or keyboard
              shortcuts to toggle animation and wireframe.
            </p>
          </article>
          <article className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
              Performance First
            </h2>
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
