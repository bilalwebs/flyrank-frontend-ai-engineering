import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/Header";

describe("Header", () => {
  it("renders the brand name", () => {
    render(<Header />);
    expect(screen.getByText("Muhammad")).toBeInTheDocument();
  });

  it("renders navigation links on desktop", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Skills" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  it("renders the mobile menu button", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });

  it("renders GitHub link in header", () => {
    render(<Header />);
    const githubLink = screen.getByLabelText("GitHub profile");
    expect(githubLink).toHaveAttribute("href", "https://github.com/bilalwebs");
    expect(githubLink).toHaveAttribute("target", "_blank");
  });

  it("renders LinkedIn link in header", () => {
    render(<Header />);
    const linkedinLink = screen.getByLabelText("LinkedIn profile");
    expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/in/bilalwebs");
    expect(linkedinLink).toHaveAttribute("target", "_blank");
  });

  it("has correct aria-label on nav", () => {
    render(<Header />);
    expect(screen.getByRole("navigation", { name: /main navigation/i })).toBeInTheDocument();
  });
});
