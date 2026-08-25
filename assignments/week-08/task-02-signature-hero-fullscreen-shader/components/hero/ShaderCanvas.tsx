"use client"

import { useRef, useMemo, useCallback, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { heroFragmentShader } from "@/lib/shaders/hero"

// ============================================================================
// Vertex Shader — minimal fullscreen quad
// ============================================================================

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// ============================================================================
// AuroraMesh — the fullscreen quad that renders the aurora shader
// ============================================================================

interface AuroraMeshProps {
  mouseRef: React.RefObject<THREE.Vector2>
  prefersReducedMotion: boolean
}

function AuroraMesh({ mouseRef, prefersReducedMotion }: AuroraMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const startTimeRef = useRef(0)
  const startedRef = useRef(false)
  const { size } = useThree()

  // Create shader material with uniforms
  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // Initialize start time after mount (not during render)
  useEffect(() => {
    startTimeRef.current = Date.now()
    startedRef.current = true
  }, [])

  // Update resolution when canvas resizes
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_resolution.value.set(
        size.width,
        size.height
      )
    }
  }, [size])

  // Animation loop — updates time uniform each frame
  useFrame(() => {
    if (!materialRef.current) return

    // Update time (skip if reduced motion is preferred)
    if (!prefersReducedMotion && startedRef.current) {
      const elapsed = (Date.now() - startTimeRef.current) / 1000
      materialRef.current.uniforms.u_time.value = elapsed
    }

    // Smooth mouse interpolation — lerp toward target for fluid motion
    const currentMouse = materialRef.current.uniforms.u_mouse.value
    currentMouse.lerp(mouseRef.current, 0.05)
  })

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={heroFragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}

// ============================================================================
// StaticFallback — gradient shown when reduced motion is preferred
// ============================================================================

function StaticFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at 30% 50%, rgba(26, 35, 126, 0.4) 0%, transparent 60%), radial-gradient(ellipse at 70% 40%, rgba(0, 150, 136, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(103, 58, 183, 0.25) 0%, transparent 55%), linear-gradient(180deg, #0a0a0a 0%, #0d0d1a 100%)",
      }}
      aria-hidden="true"
    />
  )
}

// ============================================================================
// ShaderCanvas — main exported component
// ============================================================================

export interface ShaderCanvasProps {
  className?: string
}

export function ShaderCanvas({ className }: ShaderCanvasProps) {
  const mouseRef = useRef(new THREE.Vector2(0.5, 0.5))
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [hasWebGL, setHasWebGL] = useState(true)

  // Detect WebGL support
  useEffect(() => {
    requestAnimationFrame(() => {
      try {
        const canvas = document.createElement("canvas")
        const gl =
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
        if (!gl) setHasWebGL(false)
      } catch {
        setHasWebGL(false)
      }
    })
  }, [])

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    requestAnimationFrame(() => {
      setPrefersReducedMotion(mq.matches)
    })

    const handler = (e: MediaQueryListEvent) => {
      requestAnimationFrame(() => {
        setPrefersReducedMotion(e.matches)
      })
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Pause animation when tab is hidden (visibilitychange)
  useEffect(() => {
    const handleVisibility = () => {
      requestAnimationFrame(() => {
        setIsVisible(!document.hidden)
      })
    }
    document.addEventListener("visibilitychange", handleVisibility)
    return () => document.removeEventListener("visibilitychange", handleVisibility)
  }, [])

  // Track mouse movement — normalized to 0.0–1.0
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    mouseRef.current.set(
      (e.clientX - rect.left) / rect.width,
      1.0 - (e.clientY - rect.top) / rect.height
    )
  }, [])

  // Touch support for mobile
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    mouseRef.current.set(
      (touch.clientX - rect.left) / rect.width,
      1.0 - (touch.clientY - rect.top) / rect.height
    )
  }, [])

  // Show static fallback for reduced motion or no WebGL
  if (prefersReducedMotion || !hasWebGL) {
    return <StaticFallback />
  }

  return (
    <div
      className={`absolute inset-0 ${className ?? ""}`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 2]}
        frameloop={isVisible ? "always" : "never"}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 1], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <AuroraMesh mouseRef={mouseRef} prefersReducedMotion={prefersReducedMotion} />
      </Canvas>
    </div>
  )
}
