import type {
  HeroData,
  AboutData,
  SkillGroup,
  Project,
  ContactInfo,
} from "@/types"

export const heroData: HeroData = {
  greeting: "Hi, I'm",
  name: "Your Name",
  tagline: "Frontend Developer & AI Engineering Student",
  description:
    "I build accessible, performant web applications with modern technologies.",
  buttons: [
    { label: "View Projects", href: "/projects", variant: "primary" },
    { label: "Contact Me", href: "/contact", variant: "secondary" },
  ],
  avatar: "/images/avatar.svg",
}

export const aboutData: AboutData = {
  bio: [
    "I am a passionate frontend developer focused on building clean, user-friendly web applications. I enjoy working with modern technologies like React, Next.js, and TypeScript.",
    "Currently expanding my skills in AI-assisted development and full-stack engineering. I believe in writing code that is maintainable, accessible, and performant.",
  ],
  education: "B.S. in Computer Science",
  internship: "Frontend Engineering Intern",
  goal: "To become a full-stack developer building impactful web experiences.",
  experience: [
    {
      title: "Frontend Developer Intern",
      organization: "Tech Company",
      period: "2025 - Present",
      description:
        "Building responsive UIs with React and TypeScript. Collaborating with design and backend teams.",
    },
    {
      title: "Junior Developer",
      organization: "Startup Inc.",
      period: "2024 - 2025",
      description:
        "Developed and maintained multiple client-facing applications. Improved performance and accessibility.",
    },
  ],
  stats: [
    { value: "10+", label: "Projects" },
    { value: "3+", label: "Years Learning" },
    { value: "5+", label: "Technologies" },
    { value: "2", label: "Internships" },
  ],
  profileImage: "/images/profile.svg",
}

export const skillGroups: SkillGroup[] = [
  {
    category: "frontend",
    skills: [
      { name: "React", icon: "react", level: 90 },
      { name: "Next.js", icon: "nextjs", level: 85 },
      { name: "HTML/CSS", icon: "html", level: 95 },
      { name: "Tailwind CSS", icon: "tailwind", level: 88 },
    ],
  },
  {
    category: "languages",
    skills: [
      { name: "TypeScript", icon: "typescript", level: 85 },
      { name: "JavaScript", icon: "javascript", level: 90 },
    ],
  },
  {
    category: "frameworks",
    skills: [
      { name: "Express", icon: "express", level: 70 },
    ],
  },
  {
    category: "tools",
    skills: [
      { name: "Git", icon: "git", level: 85 },
      { name: "VS Code", icon: "vscode", level: 90 },
      { name: "Figma", icon: "figma", level: 75 },
    ],
  },
  {
    category: "ai",
    skills: [
      { name: "OpenCode", icon: "opencode", level: 80 },
      { name: "Prompt Engineering", icon: "prompt", level: 85 },
    ],
  },
]

export const projects: Project[] = [
  {
    title: "Project Alpha",
    description:
      "A full-stack web application built with Next.js and PostgreSQL. Features user authentication, real-time updates, and a responsive dashboard.",
    image: "/images/project-alpha.svg",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/project-alpha",
    liveUrl: "https://project-alpha.vercel.app",
    featured: true,
  },
  {
    title: "Project Beta",
    description:
      "An interactive data visualization dashboard built with React and D3.js. Displays real-time metrics and historical trends.",
    image: "/images/project-beta.svg",
    tags: ["React", "D3.js", "TypeScript", "API"],
    githubUrl: "https://github.com/yourusername/project-beta",
    featured: true,
  },
  {
    title: "Project Gamma",
    description:
      "A mobile-first e-commerce platform built with React and Stripe integration. Includes cart, checkout, and order management.",
    image: "/images/project-gamma.svg",
    tags: ["React", "Stripe", "Node.js", "MongoDB"],
    liveUrl: "https://project-gamma.vercel.app",
  },
]

export const contactInfo: ContactInfo = {
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
}
