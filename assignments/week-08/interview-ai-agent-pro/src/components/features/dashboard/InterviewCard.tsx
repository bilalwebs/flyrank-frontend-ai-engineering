import Link from "next/link";
import { Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { formatDate } from "@/lib/utils";
import type { InterviewSession } from "@/types";

interface InterviewCardProps {
  session: InterviewSession;
}

export function InterviewCard({ session }: InterviewCardProps) {
  return (
    <Link href={`/interview/report/${session.id}`} className="block">
      <Card hover>
        <CardContent className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{session.config.role}</h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(new Date(session.createdAt))}
              </div>
            </div>
            <ScoreRing score={session.overallScore} size={60} />
          </div>

          <div className="flex flex-wrap gap-1.5">
            <Badge variant="info">{session.config.level}</Badge>
            <Badge variant="default">{session.config.difficulty}</Badge>
            {session.config.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="default">{skill}</Badge>
            ))}
            {session.config.skills.length > 3 && (
              <Badge variant="default">+{session.config.skills.length - 3}</Badge>
            )}
          </div>

          {session.status === "completed" && (
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-3.5 w-3.5" />
                {session.overallScore}/10
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
