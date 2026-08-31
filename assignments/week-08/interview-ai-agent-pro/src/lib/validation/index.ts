import { z } from "zod";

export const interviewSetupSchema = z.object({
  role: z.string().min(1, "Please select a role"),
  level: z.enum(["junior", "mid", "senior"], {
    required_error: "Please select an experience level",
  }),
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
  difficulty: z.enum(["easy", "medium", "hard"], {
    required_error: "Please select a difficulty level",
  }),
});

export type InterviewSetupFormData = z.infer<typeof interviewSetupSchema>;

export const answerSchema = z.object({
  answer: z
    .string()
    .min(10, "Please provide a more detailed answer (at least 10 characters)")
    .max(5000, "Answer must be at most 5000 characters"),
});

export type AnswerFormData = z.infer<typeof answerSchema>;
