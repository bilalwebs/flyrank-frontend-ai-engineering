export const siteConfig = {
  name: "InterviewAI Agent Pro",
  title: "InterviewAI Agent Pro — AI-Powered Technical Interview Coach",
  description:
    "Practice technical interviews with an AI-powered coach. Get personalized feedback, identify weaknesses, and improve your skills with intelligent interview simulation.",
  url: "https://interview-ai-agent-pro.vercel.app",
  author: "Muhammad Bilal Hussain",
  ogImage: "/og-image.png",
};

export const INTERVIEW_ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile Developer",
  "DevOps Engineer",
  "Data Engineer",
  "ML Engineer",
  "Software Engineer",
] as const;

export const EXPERIENCE_LEVELS = [
  { value: "junior", label: "Junior (0-2 years)" },
  { value: "mid", label: "Mid-Level (2-5 years)" },
  { value: "senior", label: "Senior (5+ years)" },
] as const;

export const DIFFICULTY_LEVELS = [
  { value: "easy", label: "Easy", description: "Fundamentals & basic concepts" },
  { value: "medium", label: "Medium", description: "Intermediate concepts & patterns" },
  { value: "hard", label: "Hard", description: "Advanced topics & system design" },
] as const;

export const SKILL_OPTIONS = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "HTML/CSS",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "GraphQL",
  "REST APIs",
  "Docker",
  "AWS",
  "Git",
  "Testing",
  "System Design",
  "Data Structures",
  "Algorithms",
  "Design Patterns",
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/interview/setup", label: "Start Interview" },
] as const;
