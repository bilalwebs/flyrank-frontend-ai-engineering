import type {
  HeroData,
  AboutData,
  SkillGroup,
  Project,
  ContactInfo,
} from "@/types"

export const heroData: HeroData = {
  greeting: "Hello, I'm",
  name: "Muhammad Bilal Hussain",
  role: "Frontend AI Engineer",
  description:
    "Building modern AI-powered web applications using React, Next.js, TypeScript and AI.",
  availability: "Open to opportunities",
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "AI SDK",
  ],
  buttons: [
    { label: "View Projects", href: "/projects", variant: "primary" },
    { label: "Contact Me", href: "/contact", variant: "secondary" },
  ],
  avatar: "/images/avatar.svg",
}

export const aboutData: AboutData = {
  bio: [
    "I am a Frontend AI Engineer focused on building clean, accessible, and performant web applications. I combine modern frontend engineering with AI-assisted workflows to ship polished products faster.",
    "Currently expanding my skills across the full stack while exploring how AI tooling can elevate the quality and speed of everyday frontend development.",
  ],
  details: [
    {
      kind: "education",
      title: "Education",
      value: "B.S. in Computer Science",
    },
    {
      kind: "internship",
      title: "Internship",
      value: "Frontend AI Engineering Intern at FlyRank",
    },
    {
      kind: "focus",
      title: "Current Focus",
      value: "AI-powered web apps with Next.js and the AI SDK",
    },
  ],
  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Git",
    "GitHub",
    "AI SDK",
  ],
  experience: [
    {
      title: "Frontend AI Engineering Intern",
      organization: "FlyRank",
      period: "2026 - Present",
      description:
        "Building accessible, production-ready frontend features with Next.js, TypeScript, and Tailwind CSS while integrating AI-assisted development workflows.",
    },
    {
      title: "Frontend Developer",
      organization: "Independent Projects",
      period: "2024 - 2026",
      description:
        "Designed and shipped responsive web applications end-to-end, focusing on clean architecture, performance, and accessibility.",
    },
  ],
  stats: [
    { value: "10+", label: "Projects Built" },
    { value: "3+", label: "Years Learning" },
    { value: "5+", label: "Technologies" },
    { value: "1", label: "Internship" },
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
      { name: "React", icon: "react", level: 90 },
      { name: "Next.js", icon: "nextjs", level: 85 },
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
      { name: "AI SDK", icon: "ai-sdk", level: 80 },
    ],
  },
]

export const projects: Project[] = [
  {
    title: "AI Chat Interface",
    description:
      "A streaming AI chat application powered by the AI SDK. Features token streaming, markdown rendering, keyboard navigation, and fully accessible chat controls.",
    image: "/images/project-alpha.svg",
    tags: ["Next.js", "React", "TypeScript", "AI SDK"],
    status: "In Development",
    githubUrl: "https://github.com/mbilalhussain/ai-chat-interface",
    liveUrl: "https://ai-chat-interface.vercel.app",
    featured: true,
  },
  {
    title: "Accessible Component Library",
    description:
      "A reusable set of keyboard-navigable UI components built from scratch — buttons, forms, dialogs, and navigation — designed with WCAG and screen-reader support in mind.",
    image: "/images/project-beta.svg",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    status: "Completed",
    githubUrl: "https://github.com/mbilalhussain/accessible-components",
  },
  {
    title: "AI Portfolio",
    description:
      "This portfolio — a premium, production-ready showcase built with the Next.js App Router. Features dark mode, accessible navigation, and a performant static-first architecture.",
    image: "/images/project-gamma.svg",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    status: "Live",
    githubUrl: "https://github.com/mbilalhussain/ai-portfolio",
    liveUrl: "https://your-portfolio.vercel.app",
  },
]

export const contactInfo: ContactInfo = {
  email: "hello@mbilalhussain.dev",
  github: "https://github.com/mbilalhussain",
  linkedin: "https://linkedin.com/in/mbilalhussain",
  location: "Lahore, Pakistan",
}
