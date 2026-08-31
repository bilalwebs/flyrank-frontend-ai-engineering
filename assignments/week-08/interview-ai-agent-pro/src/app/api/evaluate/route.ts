import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createInterviewAgent } from "@/lib/ai/agent";
import type { AnswerEvaluation, InterviewQuestion, InterviewConfig } from "@/types";

const evaluateSchema = z.object({
  answer: z.string().min(1),
  questionText: z.string().min(1),
  questionId: z.string(),
  config: z.object({
    role: z.string(),
    level: z.enum(["junior", "mid", "senior"]),
    skills: z.array(z.string()),
    difficulty: z.enum(["easy", "medium", "hard"]),
  }),
});

function getFallbackEvaluation(answer: string): AnswerEvaluation {
  const wordCount = answer.split(/\s+/).length;
  const hasCode = /```|code|function|class|const|let|var|import/i.test(answer);
  const score = Math.min(10, Math.max(3, Math.floor(wordCount / 20) + (hasCode ? 2 : 0)));

  return {
    score,
    maxScore: 10,
    technicalCorrectness: Math.max(3, score - 1),
    explanationQuality: Math.min(10, score + 1),
    communicationClarity: Math.min(10, score + 1),
    strengths: ["Provided a response", "Attempted to explain the concept"],
    weaknesses: ["Could provide more technical depth", "Consider adding code examples"],
    missingConcepts: [],
    improvementAdvice: "Try to include specific examples and technical details in your answers.",
    followUpSuggestion: "Consider diving deeper into practical implementations.",
  };
}

const FALLBACK_QUESTIONS: InterviewQuestion[] = [
  { id: "q-2", question: "How do you handle state management in large applications? What patterns do you follow?", topic: "State Management", difficulty: "medium", expectedConcepts: [] },
  { id: "q-3", question: "Explain the concept of component composition. How does it improve code reusability?", topic: "Component Design", difficulty: "medium", expectedConcepts: [] },
  { id: "q-4", question: "What strategies do you use for debugging complex issues in production?", topic: "Debugging", difficulty: "medium", expectedConcepts: [] },
  { id: "q-5", question: "Describe a time you had to optimize performance. What techniques did you use?", topic: "Performance", difficulty: "medium", expectedConcepts: [] },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = evaluateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { answer, questionText, questionId, config } = parsed.data;

    const question: InterviewQuestion = {
      id: questionId,
      question: questionText,
      topic: "technical",
      difficulty: config.difficulty,
      expectedConcepts: [],
    };

    let evaluation: AnswerEvaluation;
    try {
      const agent = createInterviewAgent();
      evaluation = await agent.evaluateAnswer(question, answer, config);
    } catch (aiError) {
      console.warn("AI evaluation failed, using fallback:", aiError);
      evaluation = getFallbackEvaluation(answer);
    }

    // Determine question number from ID (e.g., "q-1" -> 1)
    const qNum = parseInt(questionId.replace("q-", ""), 10) || 1;
    const isComplete = qNum >= 5;

    let nextQuestion: InterviewQuestion | null = null;
    if (!isComplete) {
      const nextNum = qNum + 1;
      const fallbackQ = FALLBACK_QUESTIONS.find((q) => q.id === `q-${nextNum}`);

      try {
        const agent = createInterviewAgent();
        nextQuestion = await agent.generateQuestion(config, nextNum);
      } catch (aiError) {
        console.warn("AI question generation failed, using fallback:", aiError);
        nextQuestion = fallbackQ || {
          id: `q-${nextNum}`,
          question: `Question ${nextNum}: Can you explain a more advanced concept in ${config.skills[0] || "your field"}?`,
          topic: config.skills[0] || "general",
          difficulty: config.difficulty,
          expectedConcepts: [],
        };
      }
    }

    return NextResponse.json({ evaluation, nextQuestion, isComplete });
  } catch (error) {
    console.error("Evaluation error:", error);
    return NextResponse.json(
      { error: "Failed to evaluate answer. Please try again." },
      { status: 500 }
    );
  }
}
