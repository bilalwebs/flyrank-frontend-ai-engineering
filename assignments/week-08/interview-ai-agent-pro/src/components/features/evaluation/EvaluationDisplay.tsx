import { ScoreRing } from "@/components/ui/ScoreRing";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { AnswerEvaluation } from "@/types";

interface EvaluationDisplayProps {
  evaluation: AnswerEvaluation;
}

export function EvaluationDisplay({ evaluation }: EvaluationDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Evaluation</h3>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center gap-8">
          <ScoreRing score={evaluation.technicalCorrectness} label="Technical" />
          <ScoreRing score={evaluation.explanationQuality} label="Explanation" />
          <ScoreRing score={evaluation.communicationClarity} label="Communication" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h4 className="mb-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">Strengths</h4>
            <ul className="space-y-1">
              {evaluation.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold text-amber-600 dark:text-amber-400">Areas to Improve</h4>
            <ul className="space-y-1">
              {evaluation.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {evaluation.missingConcepts.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Missing Concepts</h4>
            <div className="flex flex-wrap gap-2">
              {evaluation.missingConcepts.map((c, i) => (
                <Badge key={i} variant="info">{c}</Badge>
              ))}
            </div>
          </div>
        )}

        <div>
          <h4 className="mb-1 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Improvement Advice</h4>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{evaluation.improvementAdvice}</p>
        </div>
      </CardContent>
    </Card>
  );
}
