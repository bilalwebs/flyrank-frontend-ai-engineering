import { NextRequest, NextResponse } from "next/server";
import { createInterviewAgent } from "@/lib/ai/agent";
import type { AnswerEvaluation, InterviewConfig, LearningRecommendation } from "@/types";

function getFallbackRecommendations(evaluations: AnswerEvaluation[], config: InterviewConfig): LearningRecommendation[] {
  const avgScore = evaluations.reduce((s, e) => s + e.score, 0) / evaluations.length;
  const weakAreas = [...new Set(evaluations.flatMap((e) => e.weaknesses))].slice(0, 3);

  return weakAreas.map((topic, i) => ({
    topic,
    currentLevel: Math.max(1, Math.floor(avgScore) - 1),
    targetLevel: 10,
    resources: [
      {
        title: `Learn about ${topic}`,
        type: "article" as const,
        url: `https://developer.mozilla.org/search?q=${encodeURIComponent(topic)}`,
        description: `Resources for improving your knowledge of ${topic}`,
      },
    ],
    priority: i === 0 ? "high" as const : "medium" as const,
  }));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, evaluations, config } = body as {
      sessionId: string;
      evaluations: AnswerEvaluation[];
      config: InterviewConfig;
    };

    if (!evaluations?.length) {
      return NextResponse.json({ error: "No evaluations provided" }, { status: 400 });
    }

    let learningRoadmap: LearningRecommendation[];
    try {
      const agent = createInterviewAgent();
      learningRoadmap = await agent.generateLearningRecommendations(evaluations, config);
    } catch (aiError) {
      console.warn("AI recommendation failed, using fallback:", aiError);
      learningRoadmap = getFallbackRecommendations(evaluations, config);
    }

    const overallScore = Math.round((evaluations.reduce((s, e) => s + e.score, 0) / evaluations.length) * 10) / 10;
    const technicalScore = Math.round((evaluations.reduce((s, e) => s + e.technicalCorrectness, 0) / evaluations.length) * 10) / 10;
    const communicationScore = Math.round((evaluations.reduce((s, e) => s + e.communicationClarity, 0) / evaluations.length) * 10) / 10;

    const weakTopics = [...new Set(evaluations.flatMap((e) => e.weaknesses))].slice(0, 5);

    return NextResponse.json({ overallScore, technicalScore, communicationScore, weakTopics, learningRoadmap });
  } catch (error) {
    console.error("Report generation error:", error);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
