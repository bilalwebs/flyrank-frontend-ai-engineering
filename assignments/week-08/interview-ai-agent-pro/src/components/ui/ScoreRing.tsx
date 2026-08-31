"use client";

interface ScoreRingProps {
  score: number;
  max?: number;
  size?: number;
  label?: string;
}

export function ScoreRing({ score, max = 10, size = 120, label }: ScoreRingProps) {
  const percentage = (score / max) * 100;
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 80) return { stroke: "#10b981", text: "text-emerald-500" };
    if (percentage >= 60) return { stroke: "#f59e0b", text: "text-amber-500" };
    return { stroke: "#ef4444", text: "text-red-500" };
  };

  const colors = getColor();

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-zinc-200 dark:text-zinc-700"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl font-bold ${colors.text}`}>{score}</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">/ {max}</span>
        </div>
      </div>
      {label && <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{label}</p>}
    </div>
  );
}
