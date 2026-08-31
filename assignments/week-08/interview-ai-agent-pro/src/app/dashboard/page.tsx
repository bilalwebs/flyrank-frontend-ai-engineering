"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/interview";
import { StatsOverview } from "@/components/features/dashboard/StatsOverview";
import { InterviewCard } from "@/components/features/dashboard/InterviewCard";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import type { DashboardStats } from "@/types";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    setStats(getDashboardStats());
  }, []);

  if (!stats) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl">Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Track your interview preparation progress</p>
        </div>
        <Button href="/interview/setup">New Interview</Button>
      </div>

      <StatsOverview stats={stats} />

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Recent Interviews</h2>
            </CardHeader>
            <CardContent>
              {stats.recentInterviews.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">No interviews yet. Start your first one!</p>
                  <Button href="/interview/setup" className="mt-4">
                    Start Interview
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.recentInterviews.map((session) => (
                    <InterviewCard key={session.id} session={session} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Skills Progress</h2>
            </CardHeader>
            <CardContent>
              {stats.skillProgress.length === 0 ? (
                <p className="py-4 text-center text-sm text-zinc-500 dark:text-zinc-400">No skill data yet.</p>
              ) : (
                <div className="space-y-4">
                  {stats.skillProgress.map((skill) => (
                    <div key={skill.skill}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">{skill.skill}</span>
                        <span className="text-zinc-500 dark:text-zinc-400">{skill.score}/10</span>
                      </div>
                      <Progress value={skill.score} max={10} size="sm" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
