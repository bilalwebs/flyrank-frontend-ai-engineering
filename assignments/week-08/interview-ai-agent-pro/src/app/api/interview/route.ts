import { NextRequest, NextResponse } from "next/server";
import { interviewSetupSchema } from "@/lib/validation";
import { createInterviewAgent } from "@/lib/ai/agent";
import type { InterviewQuestion } from "@/types";

function getFallbackQuestion(role: string, skills: string[], difficulty: string): InterviewQuestion {
  const skill = skills[0] || "software development";
  return {
    id: "q-1",
    question: `Tell me about your experience with ${skill}. What projects have you built using it, and what challenges did you face?`,
    topic: skill,
    difficulty: difficulty as "easy" | "medium" | "hard",
    expectedConcepts: ["practical experience", "problem solving", "technical depth"],
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = interviewSetupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
    }

    const { role, level, skills, difficulty } = parsed.data;

    let question: InterviewQuestion;
    try {
      const agent = createInterviewAgent();
      question = await agent.generateQuestion({ role, level, skills, difficulty }, 1);
    } catch (aiError) {
      console.warn("AI generation failed, using fallback question:", aiError);
      question = getFallbackQuestion(role, skills, difficulty);
    }

    const sessionId = crypto.randomUUID();
    const now = new Date().toISOString();

    const sessionData = {
      id: sessionId,
      config: { role, level, skills, difficulty },
      messages: [
        {
          id: `welcome-${Date.now()}`,
          role: "assistant" as const,
          content: `Welcome to your ${difficulty} ${role} interview! I'll be asking you 5 questions about ${skills.join(", ")}. Let's begin.\n\n${question.question}`,
          questionId: question.id,
          timestamp: now,
        },
      ],
      currentQuestionIndex: 0,
      totalQuestions: 5,
      status: "in-progress" as const,
      overallScore: 0,
      technicalScore: 0,
      communicationScore: 0,
      weakTopics: [],
      learningRoadmap: [],
      createdAt: now,
    };

    return NextResponse.json({ sessionId, session: sessionData });
  } catch (error) {
    console.error("Interview creation error:", error);
    return NextResponse.json(
      { error: "Failed to create interview. Please try again." },
      { status: 500 }
    );
  }
}
