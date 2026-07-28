export interface HeroButton {
  label: string;
  href: string;
  variant: "primary" | "accent";
}

export interface HeroData {
  name: string;
  title: string;
  tagline: string;
  imageUrl: string;
  buttons: HeroButton[];
}

export interface Experience {
  role: string;
  organization: string;
  period: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface AboutData {
  bio: string;
  imageUrl: string;
  education: string;
  internship: string;
  careerGoal: string;
  experiences: Experience[];
  stats: Stat[];
}

export type SkillCategory = "frontend" | "languages" | "frameworks" | "tools" | "ai";

export interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
}

export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
  tags: string[];
}

export interface Social {
  platform: string;
  url: string;
}

export interface ContactData {
  email: string;
  socials: Social[];
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  skills: Skill[];
  projects: Project[];
  contact: ContactData;
}
