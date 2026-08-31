"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { formatDate } from "@/lib/utils";
import type { InterviewSession } from "@/types";

export default function ReportPage() {
  const params = useParams();
  const sessionId = params.id as string;
  const [session, setSession] = useState<InterviewSession | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("interview-ai-sessions");
    if (stored) {
      const sessions = JSON.parse(stored) as Array<InterviewSession & { createdAt: string; completedAt?: string }>;
      const found = sessions.find((s) => s.id === sessionId);
      if (found) {
        setSession({
          ...found,
          createdAt: new Date(found.createdAt),
          completedAt: found.completedAt ? new Date(found.completedAt) : undefined,
        });
      }
    }
  }, [sessionId]);

  if (!session) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-48 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    );
  }

  const evaluations = session.messages.filter((m) => m.evaluation).map((m) => m.evaluation!);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4" /> Export
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl">Interview Report</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {session.config.role} · {session.config.level} · {formatDate(new Date(session.createdAt))}
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="py-8">
          <div className="grid gap-8 sm:grid-cols-4">
            <ScoreRing score={session.overallScore} label="Overall" />
            <ScoreRing score={session.technicalScore} label="Technical" />
            <ScoreRing score={session.communicationScore} label="Communication" />
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{evaluations.length}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Questions Answered</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {session.weakTopics.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Weak Areas</h2>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {session.weakTopics.map((topic, i) => (
                <Badge key={i} variant="warning">{topic}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {evaluations.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Question Breakdown</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {evaluations.map((eval_, i) => (
              <div key={i} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Question {i + 1}</p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      Technical: {eval_.technicalCorrectness}/10 · Explanation: {eval_.explanationQuality}/10 · Communication: {eval_.communicationClarity}/10
                    </p>
                  </div>
                  <Badge variant={eval_.score >= 8 ? "success" : eval_.score >= 6 ? "warning" : "danger"}>
                    {eval_.score}/10
                  </Badge>
                </div>
                <Progress value={eval_.score} max={10} size="sm" className="mt-3" />
                {eval_.improvementAdvice && (
                  <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400">{eval_.improvementAdvice}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {session.learningRoadmap && session.learningRoadmap.length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Learning Roadmap</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {session.learningRoadmap.map((rec, i) => (
              <div key={i} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-50">{rec.topic}</h3>
                  <Badge variant={rec.priority === "high" ? "danger" : "warning"}>{rec.priority}</Badge>
                </div>
                <Progress value={rec.currentLevel} max={rec.targetLevel} size="sm" className="mt-2" />
                {rec.resources.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {rec.resources.map((res, j) => (
                      <p key={j} className="text-xs text-zinc-500 dark:text-zinc-400">
                        <Badge variant="info" className="mr-1">{res.type}</Badge>
                        {res.title}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
