interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeStyles: Record<string, string> = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

function getProgressColor(value: number, max: number): string {
  const pct = (value / max) * 100;
  if (pct >= 80) return "bg-emerald-500";
  if (pct >= 60) return "bg-amber-500";
  return "bg-red-500";
}

export function Progress({ value, max = 100, className = "", showLabel = false, size = "md" }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={className}>
      {showLabel && (
        <div className="mb-1 flex justify-between text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">Progress</span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={`w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700 ${sizeStyles[size]}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${getProgressColor(value, max)} ${sizeStyles[size]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
