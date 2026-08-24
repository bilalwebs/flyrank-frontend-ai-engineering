"use client"

import { Environment } from "@react-three/drei"

export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4c5fd5" />
      <pointLight position={[5, -5, 5]} intensity={0.3} color="#e8a33d" />
      <Environment preset="city" />
    </>
  )
}
