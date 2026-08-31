import { describe, it, expect } from "vitest";
import { interviewSetupSchema, answerSchema } from "@/lib/validation";

describe("interviewSetupSchema", () => {
  it("validates correct input", () => {
    const result = interviewSetupSchema.safeParse({
      role: "Frontend Developer",
      level: "junior",
      skills: ["React", "TypeScript"],
      difficulty: "medium",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty role", () => {
    const result = interviewSetupSchema.safeParse({
      role: "",
      level: "junior",
      skills: ["React"],
      difficulty: "medium",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty skills", () => {
    const result = interviewSetupSchema.safeParse({
      role: "Frontend Developer",
      level: "junior",
      skills: [],
      difficulty: "medium",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid level", () => {
    const result = interviewSetupSchema.safeParse({
      role: "Frontend Developer",
      level: "expert",
      skills: ["React"],
      difficulty: "medium",
    });
    expect(result.success).false;
  });
});

describe("answerSchema", () => {
  it("validates correct answer", () => {
    const result = answerSchema.safeParse({
      answer: "This is a detailed answer about React hooks and their usage patterns.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short answer", () => {
    const result = answerSchema.safeParse({ answer: "Hi" });
    expect(result.success).toBe(false);
  });
});
