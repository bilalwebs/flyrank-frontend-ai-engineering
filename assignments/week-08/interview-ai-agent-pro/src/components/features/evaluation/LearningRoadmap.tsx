import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import type { LearningRecommendation } from "@/types";

interface LearningRoadmapProps {
  recommendations: LearningRecommendation[];
}

export function LearningRoadmap({ recommendations }: LearningRoadmapProps) {
  if (recommendations.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Learning Roadmap</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Personalized improvement recommendations</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {recommendations.map((rec, i) => (
          <div key={i} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">{rec.topic}</h4>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant={rec.priority === "high" ? "danger" : rec.priority === "medium" ? "warning" : "default"}>
                    {rec.priority} priority
                  </Badge>
                </div>
              </div>
              <div className="text-right text-sm">
                <span className="text-zinc-500 dark:text-zinc-400">
                  Level {rec.currentLevel} → {rec.targetLevel}
                </span>
              </div>
            </div>
            <Progress value={rec.currentLevel} max={rec.targetLevel} size="sm" className="mt-3" />
            {rec.resources.length > 0 && (
              <div className="mt-4 space-y-2">
                {rec.resources.map((res, j) => (
                  <a
                    key={j}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-zinc-100 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
                  >
                    <Badge variant="info">{res.type}</Badge>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">{res.title}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{res.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
