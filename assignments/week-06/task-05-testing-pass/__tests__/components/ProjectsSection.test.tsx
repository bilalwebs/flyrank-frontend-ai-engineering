import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { PROJECTS } from "@/constants/portfolio";

describe("ProjectsSection", () => {
  it("renders the section heading", () => {
    render(<ProjectsSection />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent(/featured/i);
    expect(heading).toHaveTextContent(/projects/i);
  });

  it("renders all project cards", () => {
    render(<ProjectsSection />);
    PROJECTS.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it("renders project descriptions", () => {
    render(<ProjectsSection />);
    PROJECTS.forEach((project) => {
      expect(screen.getByText(project.description)).toBeInTheDocument();
    });
  });

  it("renders tech stack tags for each project", () => {
    render(<ProjectsSection />);
    PROJECTS.forEach((project) => {
      project.tech.forEach((tech) => {
        expect(screen.getAllByText(tech).length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  it("renders GitHub links for each project", () => {
    render(<ProjectsSection />);
    const codeLinks = screen.getAllByText("Code");
    expect(codeLinks.length).toBe(PROJECTS.length);
  });

  it("renders project tags when present", () => {
    render(<ProjectsSection />);
    const taggedProjects = PROJECTS.filter((p) => p.tag);
    taggedProjects.forEach((project) => {
      const matches = screen.getAllByText(project.tag!);
      expect(matches.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("has accessible article elements", () => {
    render(<ProjectsSection />);
    const articles = screen.getAllByRole("article");
    expect(articles.length).toBe(PROJECTS.length);
  });
});
