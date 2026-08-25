"use client"

import { memo } from "react"
import { OrbitControls, Stars } from "@react-three/drei"
import { FloatingShape } from "./FloatingShape"
import { Lighting } from "./Lighting"

interface SceneContentProps {
  isAnimating: boolean
  isWireframe: boolean
  color: string
  onColorChange: () => void
}

export const SceneContent = memo(function SceneContent({
  isAnimating,
  isWireframe,
  color,
  onColorChange,
}: SceneContentProps) {
  return (
    <>
      <Lighting />
      <FloatingShape
        isAnimating={isAnimating}
        isWireframe={isWireframe}
        color={color}
        onColorChange={onColorChange}
      />
      <Stars
        radius={100}
        depth={50}
        count={2500}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={10}
        autoRotate={false}
        makeDefault
      />
      <fog attach="fog" args={["#0a0a0a", 5, 15]} />
    </>
  )
})
