import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders the author name", () => {
    render(<Footer />);
    expect(screen.getByText("Muhammad Bilal Hussain")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<Footer />);
    expect(screen.getByText("Frontend AI Engineering Intern")).toBeInTheDocument();
  });

  it("renders email link", () => {
    render(<Footer />);
    const emailLink = screen.getByText("Email");
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:bilal@example.com");
  });

  it("renders GitHub link", () => {
    render(<Footer />);
    const githubLink = screen.getByLabelText("GitHub profile");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", "https://github.com/bilalwebs");
    expect(githubLink).toHaveAttribute("target", "_blank");
  });

  it("renders LinkedIn link", () => {
    render(<Footer />);
    const linkedinLink = screen.getByLabelText("LinkedIn profile");
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/in/bilalwebs");
    expect(linkedinLink).toHaveAttribute("target", "_blank");
  });

  it("renders the internship credit", () => {
    render(<Footer />);
    expect(screen.getByText(/FlyRank Frontend AI Engineering/)).toBeInTheDocument();
  });
});
