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
  category: "frontend" | "backend" | "tools" | "ai";
}

export interface NavLink {
  label: string;
  href: string;
}
