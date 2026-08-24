import type { Skill, NavLink } from "@/lib/types";

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const SKILLS: Skill[] = [
  { name: "React / Next.js", level: 95, category: "frontend" },
  { name: "TypeScript", level: 90, category: "frontend" },
  { name: "Tailwind CSS", level: 92, category: "frontend" },
  { name: "Node.js", level: 85, category: "backend" },
  { name: "Python", level: 88, category: "backend" },
  { name: "PostgreSQL", level: 80, category: "backend" },
  { name: "Git / GitHub", level: 90, category: "tools" },
  { name: "Docker", level: 75, category: "tools" },
  { name: "AI / ML Integration", level: 85, category: "ai" },
  { name: "LLM APIs", level: 88, category: "ai" },
];

export const SKILL_CATEGORIES = [
  { key: "frontend" as const, label: "Frontend" },
  { key: "backend" as const, label: "Backend" },
  { key: "tools" as const, label: "Tools" },
  { key: "ai" as const, label: "AI / ML" },
];

export const PROFILE = {
  name: "Muhammad Bilal Hussain",
  title: "AI Engineer & Full Stack Developer",
  tagline: "Building intelligent web experiences with modern technology.",
  bio: "Passionate about creating production-ready applications that combine beautiful design with powerful functionality. Currently focused on AI-powered frontend engineering and modern web development patterns.",
  email: "bilal@example.com",
};
