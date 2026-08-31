import { describe, it, expect } from "vitest";
import { cn, formatScore, getScoreColor, formatDate } from "@/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
  });
});

describe("formatScore", () => {
  it("formats score with default max", () => {
    expect(formatScore(8)).toBe("8/10");
  });

  it("formats score with custom max", () => {
    expect(formatScore(7, 14)).toBe("7/14");
  });
});

describe("getScoreColor", () => {
  it("returns green for high scores", () => {
    expect(getScoreColor(9)).toBe("text-emerald-500");
  });

  it("returns amber for medium scores", () => {
    expect(getScoreColor(7)).toBe("text-amber-500");
  });

  it("returns red for low scores", () => {
    expect(getScoreColor(4)).toBe("text-red-500");
  });
});

describe("formatDate", () => {
  it("formats a date", () => {
    const date = new Date("2025-01-15");
    const result = formatDate(date);
    expect(result).toContain("Jan");
    expect(result).toContain("15");
    expect(result).toContain("2025");
  });
});
