"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { InterviewChat } from "@/components/features/interview/InterviewChat";
import type { InterviewSession } from "@/types";

const STORAGE_KEY = "interview-ai-sessions";

export default function InterviewSessionPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id as string;
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const sessions = JSON.parse(stored) as Array<Record<string, unknown> & { id: string; createdAt: string; completedAt?: string }>;
        const found = sessions.find((s) => s.id === sessionId);
        if (found) {
          setSession({
            id: found.id as string,
            config: found.config as InterviewSession["config"],
            messages: (found.messages as InterviewSession["messages"]) || [],
            currentQuestionIndex: (found.currentQuestionIndex as number) || 0,
            totalQuestions: (found.totalQuestions as number) || 5,
            status: (found.status as InterviewSession["status"]) || "in-progress",
            overallScore: (found.overallScore as number) || 0,
            technicalScore: (found.technicalScore as number) || 0,
            communicationScore: (found.communicationScore as number) || 0,
            weakTopics: (found.weakTopics as string[]) || [],
            learningRoadmap: (found.learningRoadmap as InterviewSession["learningRoadmap"]) || [],
            createdAt: new Date(found.createdAt as string),
            completedAt: found.completedAt ? new Date(found.completedAt as string) : undefined,
          });
          return;
        }
      }

      setError("Session not found. Please start a new interview.");
    } catch {
      setError("Failed to load interview session.");
    }
  }, [sessionId]);

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => router.push("/interview/setup")}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <ArrowLeft className="h-4 w-4" /> Start New Interview
        </button>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-32 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    );
  }

  return <InterviewChat session={session} />;
}
