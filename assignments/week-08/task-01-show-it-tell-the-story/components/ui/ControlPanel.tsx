"use client"

interface ControlPanelProps {
  isAnimating: boolean
  isWireframe: boolean
  color: string
  onToggleAnimation: () => void
  onToggleWireframe: () => void
  onResetCamera: () => void
  onSelectColor: (index: number) => void
}

const colorOptions = [
  { name: "Indigo", value: "#4c5fd5" },
  { name: "Emerald", value: "#10b981" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Purple", value: "#8b5cf6" },
]

export function ControlPanel({
  isAnimating,
  isWireframe,
  color,
  onToggleAnimation,
  onToggleWireframe,
  onResetCamera,
  onSelectColor,
}: ControlPanelProps) {
  const handleColorKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex = index

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault()
        nextIndex = (index + 1) % colorOptions.length
        break
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault()
        nextIndex = (index - 1 + colorOptions.length) % colorOptions.length
        break
      case "Home":
        e.preventDefault()
        nextIndex = 0
        break
      case "End":
        e.preventDefault()
        nextIndex = colorOptions.length - 1
        break
      default:
        return
    }

    onSelectColor(nextIndex)
    const nextButton = e.currentTarget.parentElement?.querySelector(
      `[data-color-index="${nextIndex}"]`
    ) as HTMLElement | null
    nextButton?.focus()
  }

  return (
    <div
      className="space-y-6 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
      role="region"
      aria-label="3D Scene Controls"
    >
      <div>
        <h2
          id="controls-heading"
          className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100"
        >
          Controls
        </h2>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={onToggleAnimation}
          className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
            isAnimating
              ? "bg-primary text-white hover:bg-primary-hover"
              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          }`}
          aria-pressed={isAnimating}
        >
          <span>Animation</span>
          <span className="text-xs opacity-75">
            {isAnimating ? "ON" : "OFF"}
          </span>
        </button>

        <button
          type="button"
          onClick={onToggleWireframe}
          className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
            isWireframe
              ? "bg-primary text-white hover:bg-primary-hover"
              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          }`}
          aria-pressed={isWireframe}
        >
          <span>Wireframe</span>
          <span className="text-xs opacity-75">
            {isWireframe ? "ON" : "OFF"}
          </span>
        </button>

        <button
          type="button"
          onClick={onResetCamera}
          className="flex w-full items-center justify-center rounded-lg bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          Reset Camera
        </button>
      </div>

      <div>
        <h3
          id="color-heading"
          className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100"
        >
          Color
        </h3>
        <div
          className="grid grid-cols-3 gap-2"
          role="radiogroup"
          aria-labelledby="color-heading"
        >
          {colorOptions.map((option, index) => (
            <button
              key={option.value}
              type="button"
              data-color-index={index}
              onClick={() => onSelectColor(index)}
              onKeyDown={(e) => handleColorKeyDown(e, index)}
              className={`flex flex-col items-center gap-1 rounded-lg p-2 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                color === option.value
                  ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-zinc-900"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
              role="radio"
              aria-checked={color === option.value}
              aria-label={option.name}
              tabIndex={color === option.value ? 0 : -1}
            >
              <div
                className="h-6 w-6 rounded-full border-2 border-white shadow-md"
                style={{ backgroundColor: option.value }}
                aria-hidden="true"
              />
              <span className="text-xs text-zinc-600 dark:text-zinc-400">
                {option.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Keyboard Shortcuts
        </h4>
        <ul className="mt-2 space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
          <li>
            <kbd className="rounded bg-zinc-200 px-1.5 py-0.5 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
              Space
            </kbd>{" "}
            Toggle animation
          </li>
          <li>
            <kbd className="rounded bg-zinc-200 px-1.5 py-0.5 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
              W
            </kbd>{" "}
            Toggle wireframe
          </li>
          <li>
            <kbd className="rounded bg-zinc-200 px-1.5 py-0.5 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
              R
            </kbd>{" "}
            Reset camera
          </li>
        </ul>
      </div>
    </div>
  )
}
