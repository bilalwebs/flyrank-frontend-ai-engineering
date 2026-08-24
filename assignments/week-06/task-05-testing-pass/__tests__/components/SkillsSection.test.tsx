import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { SKILLS, SKILL_CATEGORIES } from "@/constants/portfolio";

describe("SkillsSection", () => {
  it("renders the section heading", () => {
    render(<SkillsSection />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent(/skills &/i);
    expect(heading).toHaveTextContent(/technologies/i);
  });

  it("renders all skills by default", () => {
    render(<SkillsSection />);
    SKILLS.forEach((skill) => {
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    });
  });

  it("renders all category filter buttons", () => {
    render(<SkillsSection />);
    expect(screen.getByRole("button", { name: /all/i })).toBeInTheDocument();
    SKILL_CATEGORIES.forEach((cat) => {
      expect(screen.getByRole("button", { name: cat.label })).toBeInTheDocument();
    });
  });

  it("filters skills when a category is selected", async () => {
    const user = (await import("@testing-library/user-event")).default.setup();
    render(<SkillsSection />);

    await user.click(screen.getByRole("button", { name: /frontend/i }));

    const frontendSkills = SKILLS.filter((s) => s.category === "frontend");
    const nonFrontendSkills = SKILLS.filter((s) => s.category !== "frontend");

    frontendSkills.forEach((skill) => {
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    });

    nonFrontendSkills.forEach((skill) => {
      expect(screen.queryByText(skill.name)).not.toBeInTheDocument();
    });
  });

  it("shows all skills when All is clicked after filtering", async () => {
    const user = (await import("@testing-library/user-event")).default.setup();
    render(<SkillsSection />);

    await user.click(screen.getByRole("button", { name: /frontend/i }));
    await user.click(screen.getByRole("button", { name: /all/i }));

    SKILLS.forEach((skill) => {
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    });
  });

  it("displays proficiency levels for each skill", () => {
    render(<SkillsSection />);
    SKILLS.forEach((skill) => {
      const matches = screen.getAllByText(skill.level);
      expect(matches.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("has accessible aria-pressed on filter buttons", () => {
    render(<SkillsSection />);
    const allButton = screen.getByRole("button", { name: /all/i });
    expect(allButton).toHaveAttribute("aria-pressed", "true");
  });

  it("has accessible group label for filters", () => {
    render(<SkillsSection />);
    const group = screen.getByRole("group", { name: /filter skills by category/i });
    expect(group).toBeInTheDocument();
  });
});
