import type { ReactNode } from "react"

type ContainerSize = "default" | "narrow" | "wide"

interface ContainerProps {
  children: ReactNode
  size?: ContainerSize
  className?: string
}

const sizeClasses: Record<ContainerSize, string> = {
  default: "max-w-6xl",
  narrow: "max-w-3xl",
  wide: "max-w-7xl",
}

export function Container({
  children,
  size = "default",
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`}
    >
      {children}
    </div>
  )
}
