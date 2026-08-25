"use client"

import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { SceneContent } from "./SceneContent"

interface SceneProps {
  isAnimating: boolean
  isWireframe: boolean
  color: string
  onColorChange: () => void
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4c5fd5" wireframe />
    </mesh>
  )
}

export function Scene({
  isAnimating,
  isWireframe,
  color,
  onColorChange,
}: SceneProps) {
  const [hasWebGL, setHasWebGL] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches)
    motionQuery.addEventListener("change", handler)

    requestAnimationFrame(() => {
      setPrefersReducedMotion(motionQuery.matches)
      const canvas = document.createElement("canvas")
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (!gl) {
        setHasWebGL(false)
      }
    })

    return () => motionQuery.removeEventListener("change", handler)
  }, [])

  if (!hasWebGL) {
    return (
      <div
        className="flex h-[500px] items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
        role="alert"
        aria-live="assertive"
      >
        <div className="text-center">
          <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            WebGL Not Supported
          </p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Your browser does not support WebGL. Please try a modern browser.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div
        className="relative h-[500px] w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 sm:h-[600px] dark:border-zinc-800 dark:focus-within:ring-offset-zinc-950"
        role="group"
        aria-label="Interactive 3D scene. Use Tab to focus the canvas, then drag to orbit, scroll to zoom, and click the shape to change colors."
        tabIndex={0}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false }}
          style={{ background: "#0a0a0a" }}
          frameloop={prefersReducedMotion ? "never" : "always"}
        >
          <Suspense fallback={<LoadingFallback />}>
            <SceneContent
              isAnimating={prefersReducedMotion ? false : isAnimating}
              isWireframe={isWireframe}
              color={color}
              onColorChange={onColorChange}
            />
          </Suspense>
        </Canvas>

        <div
          className="absolute bottom-4 left-4 rounded-lg bg-black/50 px-3 py-2 text-xs text-white backdrop-blur-sm"
          aria-hidden="true"
        >
          <p>Drag to orbit | Scroll to zoom | Click shape to change color</p>
        </div>
      </div>
    </div>
  )
}
