export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export type FormStatus = "idle" | "submitting" | "success" | "error";

export interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "tools" | "ai" | "languages";
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface Project {
  title: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  techStack: string[];
  github: string;
  liveDemo: string;
  image: string;
}

export interface TimelineItem {
  date: string;
  title: string;
  description: string;
  icon: string;
}
