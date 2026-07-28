import type { PortfolioData } from "../types";

export const portfolioData: PortfolioData = {
  hero: {
    name: "Your Name",
    title: "Frontend AI Engineering Student",
    tagline:
      "Building intelligent, accessible web experiences with React and modern AI tools.",
    imageUrl: "/images/hero-avatar.jpg",
    buttons: [
      {
        label: "View Projects",
        href: "#projects",
        variant: "primary",
      },
      {
        label: "Contact Me",
        href: "#contact",
        variant: "accent",
      },
    ],
  },
  about: {
    bio: "I am a frontend developer passionate about blending clean UI with AI-powered workflows. I build responsive, accessible applications using React, TypeScript, and Tailwind CSS, and I explore how AI coding assistants can accelerate modern development.",
    imageUrl: "/images/avatar.jpg",
    education: "B.Sc. Computer Science — University Name, 2023–2027",
    internship: "Frontend Engineering Intern — Company Name (2025–Present)",
    careerGoal:
      "To become a full-stack developer who leverages AI tools to ship products faster while maintaining clean, accessible, and performant code.",
    experiences: [
      {
        role: "Frontend Engineering Intern",
        organization: "FlyRank",
        period: "2025 – Present",
        description:
          "Building React applications with TypeScript and Tailwind CSS while integrating AI-assisted development workflows.",
      },
      {
        role: "AI Engineering Student",
        organization: "FlyRank Academy",
        period: "2025 – Present",
        description:
          "Learning modern frontend skills, prompt engineering, and AI-powered development practices through hands-on weekly assignments.",
      },
    ],
    stats: [
      { value: "3+", label: "Projects Completed" },
      { value: "12", label: "Skills Learned" },
      { value: "8", label: "Weeks of Training" },
      { value: "100%", label: "Commitment" },
    ],
  },
  skills: [
    { name: "HTML & CSS", icon: "🌐", category: "frontend" },
    { name: "Responsive Design", icon: "📱", category: "frontend" },
    { name: "Accessibility", icon: "♿", category: "frontend" },
    { name: "TypeScript", icon: "📘", category: "languages" },
    { name: "JavaScript", icon: "✨", category: "languages" },
    { name: "Python", icon: "🐍", category: "languages" },
    { name: "React", icon: "⚛️", category: "frameworks" },
    { name: "Next.js", icon: "▲", category: "frameworks" },
    { name: "Tailwind CSS", icon: "🎨", category: "frameworks" },
    { name: "Vite", icon: "⚡", category: "tools" },
    { name: "Git & GitHub", icon: "🔀", category: "tools" },
    { name: "VS Code", icon: "💻", category: "tools" },
    { name: "Figma", icon: "🎯", category: "tools" },
    { name: "ChatGPT / OpenAI", icon: "🤖", category: "ai" },
    { name: "Claude AI", icon: "🧠", category: "ai" },
    { name: "GitHub Copilot", icon: "🛠️", category: "ai" },
    { name: "Prompt Engineering", icon: "📝", category: "ai" },
  ],
  projects: [
    {
      title: "AI Portfolio Website",
      description:
        "A responsive portfolio built with React and Tailwind CSS, designed with AI-assisted workflows and accessibility in mind.",
      imageUrl: "/images/project-portfolio.jpg",
      liveUrl: "#",
      repoUrl: "#",
      tags: ["React", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Task Tracker App",
      description:
        "A drag-and-drop task management interface with local storage persistence and real-time state updates.",
      imageUrl: "/images/project-tasktracker.jpg",
      liveUrl: "#",
      repoUrl: "#",
      tags: ["React", "Vite", "LocalStorage"],
    },
    {
      title: "AI Prompt Showcase",
      description:
        "An interactive gallery of AI prompt engineering techniques, demonstrating structured prompting for code generation.",
      imageUrl: "/images/project-prompts.jpg",
      repoUrl: "#",
      tags: ["TypeScript", "AI", "Prompt Engineering"],
    },
  ],
  contact: {
    email: "hello@example.com",
    socials: [
      { platform: "GitHub", url: "https://github.com/yourusername" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/yourusername" },
      { platform: "Twitter", url: "https://twitter.com/yourusername" },
    ],
  },
};
