import type {
  InterviewSession,
  InterviewConfig,
  InterviewMessage,
  AnswerEvaluation,
  DashboardStats,
  SkillProgress,
} from "@/types";
import { generateId } from "@/lib/utils";

const STORAGE_KEY = "interview-ai-sessions";

function getSessions(): InterviewSession[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw).map((s: InterviewSession & { createdAt: string; completedAt?: string }) => ({
      ...s,
      createdAt: new Date(s.createdAt),
      completedAt: s.completedAt ? new Date(s.completedAt) : undefined,
    }));
  } catch {
    return [];
  }
}

function saveSessions(sessions: InterviewSession[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function createInterviewSession(config: InterviewConfig): InterviewSession {
  const session: InterviewSession = {
    id: generateId(),
    config,
    messages: [],
    currentQuestionIndex: 0,
    totalQuestions: 5,
    status: "setup",
    overallScore: 0,
    technicalScore: 0,
    communicationScore: 0,
    weakTopics: [],
    learningRoadmap: [],
    createdAt: new Date(),
  };

  const sessions = getSessions();
  sessions.push(session);
  saveSessions(sessions);
  return session;
}

export function getSession(id: string): InterviewSession | undefined {
  return getSessions().find((s) => s.id === id);
}

export function updateSession(updated: InterviewSession): void {
  const sessions = getSessions();
  const index = sessions.findIndex((s) => s.id === updated.id);
  if (index >= 0) {
    sessions[index] = updated;
    saveSessions(sessions);
  }
}

export function addMessage(sessionId: string, message: InterviewMessage): void {
  const session = getSession(sessionId);
  if (!session) return;
  session.messages.push(message);
  updateSession(session);
}

export function getDashboardStats(): DashboardStats {
  const sessions = getSessions().filter((s) => s.status === "completed");

  const totalInterviews = sessions.length;
  const averageScore =
    totalInterviews > 0
      ? sessions.reduce((sum, s) => sum + s.overallScore, 0) / totalInterviews
      : 0;

  const improvementRate =
    sessions.length >= 2
      ? ((sessions[sessions.length - 1].overallScore - sessions[0].overallScore) /
          sessions[0].overallScore) *
        100
      : 0;

  const skillMap = new Map<string, { totalScore: number; count: number }>();
  for (const session of sessions) {
    for (const skill of session.config.skills) {
      const existing = skillMap.get(skill) ?? { totalScore: 0, count: 0 };
      existing.totalScore += session.overallScore;
      existing.count += 1;
      skillMap.set(skill, existing);
    }
  }

  const skillProgress: SkillProgress[] = Array.from(skillMap.entries()).map(([skill, data]) => ({
    skill,
    score: Math.round((data.totalScore / data.count) * 10) / 10,
    trend: "stable" as const,
    interviewCount: data.count,
  }));

  return {
    totalInterviews,
    averageScore: Math.round(averageScore * 10) / 10,
    improvementRate: Math.round(improvementRate),
    recentInterviews: sessions.slice(-5).reverse(),
    skillProgress,
  };
}

export function deleteSession(id: string): void {
  const sessions = getSessions().filter((s) => s.id !== id);
  saveSessions(sessions);
}
