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
  level: string;
  category: "frontend" | "backend" | "tools" | "ai";
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  tag?: string;
}
