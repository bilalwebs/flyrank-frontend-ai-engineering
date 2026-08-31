import { describe, it, expect, vi } from "vitest";

describe("Interview Agent", () => {
  it("creates agent with provider", async () => {
    const mockProvider = {
      generate: vi.fn().mockResolvedValue("test response"),
      generateJSON: vi.fn().mockResolvedValue({ test: true }),
    };

    const { InterviewAgent } = await import("@/lib/ai/agent");
    const agent = new InterviewAgent(mockProvider);
    expect(agent).toBeDefined();
  });
});

describe("Interview Service", () => {
  it("creates a session", async () => {
    const { createInterviewSession } = await import("@/services/interview");
    const session = createInterviewSession({
      role: "Frontend Developer",
      level: "junior",
      skills: ["React"],
      difficulty: "easy",
    });

    expect(session).toBeDefined();
    expect(session.id).toBeDefined();
    expect(session.config.role).toBe("Frontend Developer");
    expect(session.status).toBe("setup");
  });
});
