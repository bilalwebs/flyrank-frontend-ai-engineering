import { getAIProvider, type AIProvider } from "./provider";
import type {
  InterviewConfig,
  InterviewQuestion,
  AnswerEvaluation,
  LearningRecommendation,
} from "@/types";

const QUESTION_GENERATOR_SYSTEM = `You are an expert technical interview coach. Generate relevant, challenging interview questions based on the candidate's role, experience level, skills, and difficulty setting.

Rules:
- Questions must be specific to the role and skills
- Adjust complexity based on experience level
- Focus on practical knowledge, not trivia
- Include follow-up potential
- Vary between conceptual, coding, and scenario-based questions

Respond with valid JSON only.`;

const ANSWER_EVALUATOR_SYSTEM = `You are a fair and thorough technical interview evaluator. Assess candidate answers on:
1. Technical correctness (0-10)
2. Explanation quality (0-10)
3. Communication clarity (0-10)

Provide specific, actionable feedback. Be encouraging but honest.

Respond with valid JSON only.`;

const LEARNING_RECOMMENDER_SYSTEM = `You are a personalized learning advisor. Based on interview performance, create a targeted improvement roadmap.

Focus on:
- Specific weak areas identified
- Practical resources (articles, videos, courses)
- Priority ordering based on impact
- Realistic learning paths

Respond with valid JSON only.`;

export class InterviewAgent {
  private provider: AIProvider;

  constructor(provider?: AIProvider) {
    this.provider = provider ?? getAIProvider();
  }

  async generateQuestion(config: InterviewConfig, questionNumber: number): Promise<InterviewQuestion> {
    const prompt = `Generate interview question #${questionNumber} for:
- Role: ${config.role}
- Experience: ${config.level}
- Skills: ${config.skills.join(", ")}
- Difficulty: ${config.difficulty}

Generate ONE question as JSON:
{
  "id": "q-${questionNumber}",
  "question": "the question text",
  "topic": "specific topic area",
  "difficulty": "${config.difficulty}",
  "expectedConcepts": ["concept1", "concept2", "concept3"]
}`;

    return this.provider.generateJSON<InterviewQuestion>(prompt, QUESTION_GENERATOR_SYSTEM);
  }

  async evaluateAnswer(
    question: InterviewQuestion,
    answer: string,
    config: InterviewConfig
  ): Promise<AnswerEvaluation> {
    const prompt = `Evaluate this interview answer:

Question: ${question.question}
Topic: ${question.topic}
Expected concepts: ${question.expectedConcepts.join(", ")}
Candidate level: ${config.level}
Candidate answer: "${answer}"

Score the answer and provide feedback as JSON:
{
  "score": number (0-10),
  "maxScore": 10,
  "technicalCorrectness": number (0-10),
  "explanationQuality": number (0-10),
  "communicationClarity": number (0-10),
  "strengths": ["strength1", "strength2"],
  "weaknesses": ["weakness1", "weakness2"],
  "missingConcepts": ["concept1", "concept2"],
  "improvementAdvice": "detailed advice",
  "followUpSuggestion": "suggested follow-up topic"
}`;

    return this.provider.generateJSON<AnswerEvaluation>(prompt, ANSWER_EVALUATOR_SYSTEM);
  }

  async generateLearningRecommendations(
    evaluations: AnswerEvaluation[],
    config: InterviewConfig
  ): Promise<LearningRecommendation[]> {
    const weakAreas = evaluations.flatMap((e) => e.weaknesses);
    const missingConcepts = evaluations.flatMap((e) => e.missingConcepts);
    const avgScores = {
      technical: evaluations.reduce((s, e) => s + e.technicalCorrectness, 0) / evaluations.length,
      explanation: evaluations.reduce((s, e) => s + e.explanationQuality, 0) / evaluations.length,
      communication: evaluations.reduce((s, e) => s + e.communicationClarity, 0) / evaluations.length,
    };

    const prompt = `Based on interview performance for a ${config.level} ${config.role}:

Weaknesses: ${weakAreas.join(", ")}
Missing concepts: ${missingConcepts.join(", ")}
Average scores - Technical: ${avgScores.technical.toFixed(1)}, Explanation: ${avgScores.explanation.toFixed(1)}, Communication: ${avgScores.communication.toFixed(1)}
Skills tested: ${config.skills.join(", ")}

Generate learning recommendations as JSON array:
[
  {
    "topic": "topic name",
    "currentLevel": number (0-10),
    "targetLevel": number (0-10),
    "resources": [
      {
        "title": "resource title",
        "type": "article" | "video" | "course" | "practice",
        "url": "https://example.com",
        "description": "brief description"
      }
    ],
    "priority": "high" | "medium" | "low"
  }
]

Generate 3-5 recommendations focused on the weakest areas.`;

    return this.provider.generateJSON<LearningRecommendation[]>(prompt, LEARNING_RECOMMENDER_SYSTEM);
  }
}

export function createInterviewAgent(): InterviewAgent {
  return new InterviewAgent();
}
