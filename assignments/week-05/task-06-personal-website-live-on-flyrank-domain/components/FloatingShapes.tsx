"use client"

export default function FloatingShapes() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-accent/[0.03] blur-[100px] animate-float" />
      <div className="absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-accent-secondary/[0.04] blur-[80px] animate-float-slow" />
      <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-accent/[0.02] blur-[60px] animate-pulse-glow" />

      <svg
        className="absolute top-[20%] left-[15%] h-20 w-20 text-accent/[0.04] animate-float"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <circle cx="50" cy="50" r="40" />
      </svg>
      <svg
        className="absolute top-[60%] right-[20%] h-16 w-16 text-accent-secondary/[0.04] animate-float-slow"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <polygon points="50,10 90,90 10,90" />
      </svg>
      <svg
        className="absolute top-[40%] left-[60%] h-12 w-12 text-accent/[0.03] animate-float"
        viewBox="0 0 100 100"
        fill="currentColor"
        style={{ animationDelay: "2s" }}
      >
        <rect x="15" y="15" width="70" height="70" rx="10" />
      </svg>
      <svg
        className="absolute top-[75%] left-[10%] h-14 w-14 text-accent-secondary/[0.03] animate-float-slow"
        viewBox="0 0 100 100"
        fill="currentColor"
        style={{ animationDelay: "1s" }}
      >
        <polygon points="50,5 61,40 98,40 68,62 79,97 50,75 21,97 32,62 2,40 39,40" />
      </svg>
    </div>
  )
}
