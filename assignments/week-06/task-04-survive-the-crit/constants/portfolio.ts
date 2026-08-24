import type { Skill, NavLink, Project } from "@/lib/types";

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const SKILLS: Skill[] = [
  { name: "React / Next.js", level: "Advanced", category: "frontend" },
  { name: "TypeScript", level: "Advanced", category: "frontend" },
  { name: "Tailwind CSS", level: "Advanced", category: "frontend" },
  { name: "Node.js", level: "Intermediate", category: "backend" },
  { name: "Python", level: "Intermediate", category: "backend" },
  { name: "PostgreSQL", level: "Intermediate", category: "backend" },
  { name: "Git / GitHub", level: "Advanced", category: "tools" },
  { name: "Docker", level: "Beginner", category: "tools" },
  { name: "AI / ML Integration", level: "Intermediate", category: "ai" },
  { name: "LLM APIs", level: "Intermediate", category: "ai" },
];

export const SKILL_CATEGORIES = [
  { key: "frontend" as const, label: "Frontend" },
  { key: "backend" as const, label: "Backend" },
  { key: "tools" as const, label: "Tools" },
  { key: "ai" as const, label: "AI / ML" },
];

export const PROJECTS: Project[] = [
  {
    title: "AI Job Application Assistant",
    description:
      "Full-stack MVP that automates job applications using AI. Parses job descriptions, generates tailored cover letters, and tracks application status.",
    tech: ["Next.js", "TypeScript", "OpenAI API", "Prisma", "PostgreSQL"],
    github: "https://github.com/bilalwebs",
    live: "#",
    tag: "AI / Full Stack",
  },
  {
    title: "Developer Portfolio with Contact Form",
    description:
      "Production-ready portfolio with Netlify Forms integration, client-side validation, accessible form design, and responsive layout across all devices.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Netlify"],
    github: "https://github.com/bilalwebs",
    live: "#",
    tag: "Frontend",
  },
  {
    title: "React AI Portfolio",
    description:
      "Interactive portfolio showcasing AI-assisted development skills with modern React patterns, component architecture, and TypeScript strict mode.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    github: "https://github.com/bilalwebs",
    live: "#",
    tag: "React",
  },
];

export const PROFILE = {
  name: "Muhammad Bilal Hussain",
  title: "Frontend AI Engineering Intern",
  tagline:
    "I build modern, responsive frontend web applications using React, Next.js, TypeScript, and AI-assisted development tools.",
  bio: "Frontend AI Engineering intern with hands-on experience building production-ready web applications. Skilled in React, Next.js, and TypeScript with a focus on accessibility, responsive design, and AI-assisted development workflows. Currently completing the FlyRank Frontend AI Engineering Internship, building real-world projects every week.",
  email: "bilal@example.com",
  github: "https://github.com/bilalwebs",
  linkedin: "https://linkedin.com/in/bilalwebs",
};
