export interface SiteConfig {
  title: string
  description: string
  url: string
  author: string
  keywords: string[]
  ogImage: string
}

export interface NavItem {
  label: string
  href: string
  isExternal?: boolean
}

export interface SocialLink {
  platform: string
  url: string
  label: string
}

export interface HeroButton {
  label: string
  href: string
  variant: "primary" | "secondary"
}

export interface HeroData {
  greeting: string
  name: string
  role: string
  description: string
  availability: string
  skills: string[]
  buttons: HeroButton[]
  avatar: string
}

export interface ExperienceItem {
  title: string
  organization: string
  period: string
  description: string
}

export interface StatCard {
  value: string
  label: string
}

export type AboutDetailKind = "education" | "internship" | "focus"

export interface AboutDetail {
  kind: AboutDetailKind
  title: string
  value: string
}

export interface AboutData {
  bio: string[]
  details: AboutDetail[]
  skills: string[]
  experience: ExperienceItem[]
  stats: StatCard[]
  profileImage: string
}

export interface Skill {
  name: string
  icon: string
  level: number
}

export type SkillCategory =
  | "frontend"
  | "languages"
  | "frameworks"
  | "tools"
  | "ai"

export interface SkillGroup {
  category: SkillCategory
  skills: Skill[]
}

export type ProjectStatus = "Live" | "Completed" | "In Development" | "Coming Soon"

export interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  status: ProjectStatus
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
}

export interface ContactInfo {
  email: string
  github: string
  linkedin: string
  location: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}
