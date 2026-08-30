import type { Skill, NavLink, SocialLink, Project, TimelineItem } from "@/lib/types";

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Workflow", href: "#workflow" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "Email", href: "mailto:bilal@example.com", icon: "mail" },
];

export const SKILLS: Skill[] = [
  { name: "React / Next.js", level: 95, category: "frontend" },
  { name: "TypeScript", level: 90, category: "frontend" },
  { name: "Tailwind CSS", level: 92, category: "frontend" },
  { name: "HTML / CSS", level: 95, category: "frontend" },
  { name: "Node.js", level: 85, category: "backend" },
  { name: "Python", level: 88, category: "backend" },
  { name: "PostgreSQL", level: 80, category: "backend" },
  { name: "REST APIs", level: 88, category: "backend" },
  { name: "Git / GitHub", level: 90, category: "tools" },
  { name: "Docker", level: 75, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "AI / ML Integration", level: 85, category: "ai" },
  { name: "LLM APIs", level: 88, category: "ai" },
  { name: "Prompt Engineering", level: 82, category: "ai" },
  { name: "RAG Systems", level: 78, category: "ai" },
  { name: "JavaScript", level: 92, category: "languages" },
  { name: "SQL", level: 80, category: "languages" },
];

export const SKILL_CATEGORIES = [
  { key: "frontend" as const, label: "Frontend" },
  { key: "ai" as const, label: "AI / ML" },
  { key: "backend" as const, label: "Backend" },
  { key: "tools" as const, label: "Tools" },
  { key: "languages" as const, label: "Languages" },
];

export const PROJECTS: Project[] = [
  {
    title: "AI-Powered Content Generator",
    description: "A SaaS platform that uses LLM APIs to generate marketing content, blog posts, and social media copy.",
    problem: "Marketing teams spend hours creating content manually, leading to inconsistency and burnout.",
    solution: "Built an AI-powered platform with template-based generation, tone customization, and batch processing capabilities.",
    impact: "Reduced content creation time by 70% and improved output consistency across teams.",
    techStack: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS", "PostgreSQL"],
    github: "https://github.com",
    liveDemo: "https://example.com",
    image: "/projects/content-generator.svg",
  },
  {
    title: "Smart Task Manager",
    description: "A productivity app with AI-driven task prioritization and natural language input for managing workflows.",
    problem: "Traditional task managers lack intelligent prioritization and require manual organization.",
    solution: "Developed a task manager with NLP-based input parsing, auto-priority scoring, and adaptive scheduling.",
    impact: "Improved personal productivity by 40% through intelligent task routing and deadline predictions.",
    techStack: ["React", "Node.js", "Python", "MongoDB", "Tailwind CSS"],
    github: "https://github.com",
    liveDemo: "https://example.com",
    image: "/projects/task-manager.svg",
  },
  {
    title: "Portfolio Analytics Dashboard",
    description: "A real-time analytics dashboard for tracking website performance, user engagement, and conversion metrics.",
    problem: "Website owners need consolidated views of performance data scattered across multiple tools.",
    solution: "Created a unified dashboard with real-time data aggregation, custom widgets, and exportable reports.",
    impact: "Enabled data-driven decisions that increased user engagement by 35% within the first month.",
    techStack: ["Next.js", "TypeScript", "Chart.js", "Tailwind CSS", "REST APIs"],
    github: "https://github.com",
    liveDemo: "https://example.com",
    image: "/projects/analytics-dashboard.svg",
  },
];

export const WORKFLOW: TimelineItem[] = [
  { date: "01", title: "Discovery", description: "Understanding requirements, researching market, and defining project scope with clear goals.", icon: "search" },
  { date: "02", title: "Design", description: "Creating wireframes, prototyping UI/UX patterns, and establishing design systems.", icon: "palette" },
  { date: "03", title: "Develop", description: "Building with clean architecture, modular components, and AI-powered features.", icon: "code" },
  { date: "04", title: "Test", description: "Rigorous testing including unit, integration, accessibility, and performance audits.", icon: "test-tube" },
  { date: "05", title: "Deploy", description: "CI/CD pipelines, production deployment, monitoring, and iterative improvements.", icon: "rocket" },
];

export const JOURNEY: TimelineItem[] = [
  { date: "2023", title: "Started Web Development", description: "Began learning HTML, CSS, and JavaScript. Built first static websites and fell in love with frontend.", icon: "code" },
  { date: "2024", title: "Full Stack & AI", description: "Expanded to Node.js, Python, and integrated AI/ML models into web applications.", icon: "brain" },
  { date: "2025", title: "FlyRank AI Engineering", description: "Joined FlyRank Frontend AI Engineering internship, building production-ready AI-powered applications.", icon: "rocket" },
  { date: "2026", title: "Building the Future", description: "Focused on creating intelligent, accessible, and performant web experiences at scale.", icon: "sparkles" },
];

export const PROFILE = {
  name: "Muhammad Bilal Hussain",
  title: "AI Engineer & Full Stack Developer",
  tagline: "Building intelligent web experiences with modern technology.",
  bio: "Passionate about creating production-ready applications that combine beautiful design with powerful functionality. Currently focused on AI-powered frontend engineering and modern web development patterns.",
  email: "bilal@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  location: "Pakistan",
};
