export type ExperienceLevel = "junior" | "mid" | "senior";
export type InterviewDifficulty = "easy" | "medium" | "hard";
export type AITranscriptRole = "user" | "assistant";

export interface InterviewConfig {
  role: string;
  level: ExperienceLevel;
  skills: string[];
  difficulty: InterviewDifficulty;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  topic: string;
  difficulty: InterviewDifficulty;
  expectedConcepts: string[];
}

export interface AnswerEvaluation {
  score: number;
  maxScore: number;
  technicalCorrectness: number;
  explanationQuality: number;
  communicationClarity: number;
  strengths: string[];
  weaknesses: string[];
  missingConcepts: string[];
  improvementAdvice: string;
  followUpSuggestion: string;
}

export interface InterviewMessage {
  id: string;
  role: AITranscriptRole;
  content: string;
  questionId?: string;
  evaluation?: AnswerEvaluation;
  timestamp: Date;
}

export interface InterviewSession {
  id: string;
  config: InterviewConfig;
  messages: InterviewMessage[];
  currentQuestionIndex: number;
  totalQuestions: number;
  status: "setup" | "in-progress" | "completed";
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  weakTopics: string[];
  learningRoadmap: LearningRecommendation[];
  createdAt: Date;
  completedAt?: Date;
}

export interface LearningRecommendation {
  topic: string;
  currentLevel: number;
  targetLevel: number;
  resources: LearningResource[];
  priority: "high" | "medium" | "low";
}

export interface LearningResource {
  title: string;
  type: "article" | "video" | "course" | "practice";
  url: string;
  description: string;
}

export interface DashboardStats {
  totalInterviews: number;
  averageScore: number;
  improvementRate: number;
  recentInterviews: InterviewSession[];
  skillProgress: SkillProgress[];
}

export interface SkillProgress {
  skill: string;
  score: number;
  trend: "up" | "down" | "stable";
  interviewCount: number;
}

export interface AIProviderConfig {
  provider: "groq" | "gemini";
  apiKey: string;
  model: string;
}

export interface AIToolCall {
  name: string;
  arguments: Record<string, unknown>;
}

export interface AIResponse {
  content: string;
  toolCalls?: AIToolCall[];
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}
