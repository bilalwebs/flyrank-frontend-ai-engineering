import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { Progress } from "@/components/ui/Progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { DashboardStats } from "@/types";

interface StatsOverviewProps {
  stats: DashboardStats;
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="flex items-center gap-4 py-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/20">
            <span className="text-xl font-bold text-indigo-600">{stats.totalInterviews}</span>
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Interviews</p>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{stats.totalInterviews}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-4 py-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
            <span className="text-xl font-bold text-emerald-600">{stats.averageScore}</span>
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Average Score</p>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{stats.averageScore}/10</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-4 py-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-900/20">
            {stats.improvementRate > 0 ? (
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            ) : stats.improvementRate < 0 ? (
              <TrendingDown className="h-5 w-5 text-red-600" />
            ) : (
              <Minus className="h-5 w-5 text-zinc-400" />
            )}
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Improvement</p>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {stats.improvementRate > 0 ? "+" : ""}{stats.improvementRate}%
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-4">
          <p className="mb-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">Skills Tracked</p>
          <div className="space-y-2">
            {stats.skillProgress.slice(0, 3).map((skill) => (
              <div key={skill.skill} className="flex items-center justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400 truncate">{skill.skill}</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-50">{skill.score}/10</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
