"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Loader2, CheckCircle, XCircle, Bot, User } from "lucide-react";
import { answerSchema, type AnswerFormData } from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Badge } from "@/components/ui/Badge";
import type { InterviewSession, AnswerEvaluation, InterviewMessage } from "@/types";

const STORAGE_KEY = "interview-ai-sessions";
const TOTAL_QUESTIONS = 5;

interface InterviewChatProps {
  session: InterviewSession;
}

function saveSession(session: InterviewSession) {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as InterviewSession[];
    const idx = stored.findIndex((s) => s.id === session.id);
    if (idx >= 0) {
      stored[idx] = session;
    } else {
      stored.push(session);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // localStorage might be full
  }
}

export function InterviewChat({ session: initialSession }: InterviewChatProps) {
  const router = useRouter();
  const [session, setSession] = useState(initialSession);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AnswerFormData>({
    resolver: zodResolver(answerSchema),
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [session.messages]);

  // Find the CURRENT question: last assistant message without evaluation
  // that comes AFTER the last user message
  const getCurrentQuestion = (): InterviewMessage | null => {
    const messages = session.messages;
    let lastUserIdx = -1;

    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "user") {
        lastUserIdx = i;
        break;
      }
    }

    // Find the first assistant message after the last user message
    for (let i = lastUserIdx + 1; i < messages.length; i++) {
      if (messages[i].role === "assistant" && !messages[i].evaluation) {
        return messages[i];
      }
    }

    // If no user message yet, find the first assistant message
    if (lastUserIdx === -1) {
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].role === "assistant" && !messages[i].evaluation) {
          return messages[i];
        }
      }
    }

    return null;
  };

  const currentQuestion = getCurrentQuestion();

  // Count how many questions have been answered (assistant messages with evaluation)
  const questionsAnswered = session.messages.filter(
    (m) => m.role === "assistant" && m.evaluation
  ).length;

  const isComplete = questionsAnswered >= TOTAL_QUESTIONS;

  const onSubmitAnswer = useCallback(
    async (data: AnswerFormData) => {
      if (!currentQuestion || isComplete) return;
      setIsEvaluating(true);
      setError(null);

      try {
        const response = await fetch("/api/evaluate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answer: data.answer,
            questionText: currentQuestion.content,
            questionId: currentQuestion.questionId || `q-${questionsAnswered + 1}`,
            config: session.config,
          }),
        });

        if (!response.ok) throw new Error("Failed to evaluate answer");

        const { evaluation, nextQuestion } = await response.json();

        // Add user answer
        const userMessage: InterviewMessage = {
          id: `user-${Date.now()}`,
          role: "user",
          content: data.answer,
          timestamp: new Date(),
        };

        // Add evaluation + next question (or completion message)
        const newQuestionNum = questionsAnswered + 1;
        const nowComplete = newQuestionNum >= TOTAL_QUESTIONS;

        const assistantMessage: InterviewMessage = {
          id: `eval-${Date.now()}`,
          role: "assistant",
          content: nowComplete
            ? "Interview complete! Generating your report..."
            : nextQuestion?.question || "Generating next question...",
          questionId: nowComplete ? undefined : nextQuestion?.id,
          evaluation,
          timestamp: new Date(),
        };

        const updatedSession: InterviewSession = {
          ...session,
          messages: [...session.messages, userMessage, assistantMessage],
          currentQuestionIndex: newQuestionNum,
        };

        setSession(updatedSession);
        saveSession(updatedSession);
        reset();

        if (nowComplete) {
          // Calculate final scores
          const evals = updatedSession.messages
            .filter((m) => m.evaluation)
            .map((m) => m.evaluation!);

          const overallScore = Math.round((evals.reduce((s, e) => s + e.score, 0) / evals.length) * 10) / 10;
          const technicalScore = Math.round((evals.reduce((s, e) => s + e.technicalCorrectness, 0) / evals.length) * 10) / 10;
          const communicationScore = Math.round((evals.reduce((s, e) => s + e.communicationClarity, 0) / evals.length) * 10) / 10;
          const weakTopics = [...new Set(evals.flatMap((e) => e.weaknesses))].slice(0, 5);

          const finalSession: InterviewSession = {
            ...updatedSession,
            status: "completed",
            overallScore,
            technicalScore,
            communicationScore,
            weakTopics,
            completedAt: new Date(),
          };

          saveSession(finalSession);

          try {
            const reportResponse = await fetch("/api/report", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ evaluations: evals, config: session.config }),
            });

            if (reportResponse.ok) {
              const reportData = await reportResponse.json();
              finalSession.learningRoadmap = reportData.learningRoadmap;
              saveSession(finalSession);
            }
          } catch {
            // Report generation is optional
          }

          setTimeout(() => router.push(`/interview/report/${session.id}`), 2000);
        }
      } catch {
        setError("Failed to evaluate answer. Please try again.");
      } finally {
        setIsEvaluating(false);
      }
    },
    [currentQuestion, session, isComplete, questionsAnswered, reset, router]
  );

  const getScoreBadge = (score: number) => {
    if (score >= 8) return <Badge variant="success">{score}/10</Badge>;
    if (score >= 6) return <Badge variant="warning">{score}/10</Badge>;
    return <Badge variant="danger">{score}/10</Badge>;
  };

  return (
    <div className="flex h-[calc(100vh-200px)] flex-col">
      {/* Progress bar */}
      <div className="border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
            <span>Question {Math.min(questionsAnswered + 1, TOTAL_QUESTIONS)} of {TOTAL_QUESTIONS}</span>
            <span>{questionsAnswered} answered</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-500"
              style={{ width: `${(questionsAnswered / TOTAL_QUESTIONS) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {session.messages.length === 0 && (
            <div className="text-center text-zinc-500 dark:text-zinc-400">
              <Bot className="mx-auto h-12 w-12 opacity-50" />
              <p className="mt-4">Starting your interview...</p>
            </div>
          )}

          {session.messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                msg.role === "user" ? "bg-indigo-100 dark:bg-indigo-900/30" : "bg-zinc-100 dark:bg-zinc-800"
              }`}>
                {msg.role === "user" ? (
                  <User className="h-4 w-4 text-indigo-600" />
                ) : (
                  <Bot className="h-4 w-4 text-zinc-600" />
                )}
              </div>

              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>

                {msg.evaluation && (
                  <div className="mt-3 border-t border-white/20 pt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium opacity-80">Score:</span>
                      {getScoreBadge(msg.evaluation.score)}
                    </div>
                    {msg.evaluation.strengths.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-medium opacity-80">Strengths:</p>
                        <ul className="mt-1 space-y-0.5">
                          {msg.evaluation.strengths.map((s, i) => (
                            <li key={i} className="flex items-start gap-1 text-xs opacity-90">
                              <CheckCircle className="mt-0.5 h-3 w-3 shrink-0" /> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {msg.evaluation.weaknesses.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-medium opacity-80">Areas to improve:</p>
                        <ul className="mt-1 space-y-0.5">
                          {msg.evaluation.weaknesses.map((w, i) => (
                            <li key={i} className="flex items-start gap-1 text-xs opacity-90">
                              <XCircle className="mt-0.5 h-3 w-3 shrink-0" /> {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isEvaluating && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                <Bot className="h-4 w-4 text-zinc-600" />
              </div>
              <div className="rounded-2xl bg-zinc-100 px-4 py-3 dark:bg-zinc-800">
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Evaluating your answer...
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950 sm:px-6">
        <form onSubmit={handleSubmit(onSubmitAnswer)} className="mx-auto max-w-3xl">
          {isComplete ? (
            <div className="rounded-lg bg-green-50 p-4 text-center text-sm text-green-700 dark:bg-green-900/20 dark:text-green-300">
              Interview complete! Redirecting to your report...
            </div>
          ) : (
            <div className="flex gap-3">
              <div className="flex-1">
                <Textarea
                  label="Your Answer"
                  placeholder="Type your answer here..."
                  rows={3}
                  error={errors.answer?.message}
                  {...register("answer")}
                />
              </div>
              <div className="flex items-end">
                <Button type="submit" disabled={isEvaluating}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
