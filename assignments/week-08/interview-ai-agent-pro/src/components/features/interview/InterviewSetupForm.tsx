"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { interviewSetupSchema, type InterviewSetupFormData } from "@/lib/validation";
import { INTERVIEW_ROLES, EXPERIENCE_LEVELS, DIFFICULTY_LEVELS, SKILL_OPTIONS } from "@/data/constants";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

const STORAGE_KEY = "interview-ai-sessions";

export function InterviewSetupForm() {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InterviewSetupFormData>({
    resolver: zodResolver(interviewSetupSchema),
    defaultValues: {
      role: "",
      level: undefined,
      skills: [],
      difficulty: undefined,
    },
  });

  const selectedSkills = watch("skills") ?? [];

  const toggleSkill = (skill: string) => {
    const current = selectedSkills;
    if (current.includes(skill)) {
      setValue("skills", current.filter((s) => s !== skill), { shouldValidate: true });
    } else {
      setValue("skills", [...current, skill], { shouldValidate: true });
    }
  };

  const onSubmit = async (data: InterviewSetupFormData) => {
    setIsStarting(true);
    setApiError(null);

    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create interview");
      }

      const { sessionId, session } = await response.json();

      // Save session to localStorage so the chat page can read it
      try {
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        existing.push(session);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      } catch {
        // localStorage might be full or disabled
      }

      router.push(`/interview/${sessionId}`);
    } catch (err) {
      setIsStarting(false);
      setApiError(err instanceof Error ? err.message : "Failed to start interview. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {apiError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
          {apiError}
        </div>
      )}

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Interview Configuration</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Set up your interview parameters</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Select
            label="Job Role"
            placeholder="Select a role"
            error={errors.role?.message}
            options={INTERVIEW_ROLES.map((r) => ({ value: r, label: r }))}
            {...register("role")}
          />

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Experience Level</label>
            <div className="grid gap-3 sm:grid-cols-3">
              {EXPERIENCE_LEVELS.map((level) => (
                <label
                  key={level.value}
                  className={`cursor-pointer rounded-lg border p-4 text-center transition-all ${
                    watch("level") === level.value
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                      : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
                  }`}
                >
                  <input type="radio" value={level.value} className="sr-only" {...register("level")} />
                  <p className="font-medium text-zinc-900 dark:text-zinc-50">{level.label}</p>
                </label>
              ))}
            </div>
            {errors.level && <p className="text-sm text-red-500">{errors.level.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Skills (select at least 1)</label>
            <div className="flex flex-wrap gap-2">
              {SKILL_OPTIONS.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-all ${
                    selectedSkills.includes(skill)
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300"
                      : "border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
            {errors.skills && <p className="text-sm text-red-500">{errors.skills.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Difficulty</label>
            <div className="grid gap-3 sm:grid-cols-3">
              {DIFFICULTY_LEVELS.map((diff) => (
                <label
                  key={diff.value}
                  className={`cursor-pointer rounded-lg border p-4 text-center transition-all ${
                    watch("difficulty") === diff.value
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                      : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
                  }`}
                >
                  <input type="radio" value={diff.value} className="sr-only" {...register("difficulty")} />
                  <p className="font-medium text-zinc-900 dark:text-zinc-50">{diff.label}</p>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{diff.description}</p>
                </label>
              ))}
            </div>
            {errors.difficulty && <p className="text-sm text-red-500">{errors.difficulty.message}</p>}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={isStarting}>
          {isStarting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Starting...
            </>
          ) : (
            <>
              Start Interview <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
