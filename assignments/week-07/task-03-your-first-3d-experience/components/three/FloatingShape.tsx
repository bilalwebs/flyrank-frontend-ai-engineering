"use client"

import { useRef, useState, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface FloatingShapeProps {
  isAnimating: boolean
  isWireframe: boolean
  color: string
  onColorChange: () => void
}

export function FloatingShape({
  isAnimating,
  isWireframe,
  color,
  onColorChange,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: color,
        wireframe: isWireframe,
        metalness: 0.7,
        roughness: 0.2,
        emissive: hovered ? color : "#000000",
        emissiveIntensity: hovered ? 0.3 : 0,
      }),
    [color, isWireframe, hovered]
  )

  useFrame((state) => {
    if (!meshRef.current || !isAnimating) return

    const time = state.clock.getElapsedTime()

    meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.3
    meshRef.current.rotation.y += 0.005
    meshRef.current.rotation.z = Math.cos(time * 0.3) * 0.2

    meshRef.current.position.y = Math.sin(time * 0.8) * 0.15
    meshRef.current.position.x = Math.cos(time * 0.5) * 0.1
  })

  const handleClick = () => {
    setClicked(!clicked)
    onColorChange()
  }

  return (
    <mesh
      ref={meshRef}
      material={material}
      onClick={handleClick}
      onPointerOver={() => {
        setHovered(true)
        document.body.style.cursor = "pointer"
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = "auto"
      }}
      scale={clicked ? 1.1 : 1}
      castShadow
      receiveShadow
    >
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
    </mesh>
  )
}
