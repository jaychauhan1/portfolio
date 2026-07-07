export interface Profile {
  name: string
  tagline: string
  email: string
  phone: string
  linkedin: string
  github: string
  citizenship: string
}

export interface Experience {
  title: string
  company: string
  dates: string
  location: string
  bullets: string[]
  tags: string[]
}

export interface Project {
  name: string
  tech: string
  dates: string
  bullets: string[]
}

export interface Education {
  school: string
  dates: string
  degree: string
  gpa: string
  location: string
}

export interface Extracurricular {
  title: string
  org: string
  dates: string
  bullets: string[]
}

export interface Zone {
  id: string
  label: string
  section: SectionId
  hint: string
}

export type SectionId =
  | 'about'
  | 'contact'
  | 'education'
  | 'experience'
  | 'projects'
  | 'skills'

export interface ResumeData {
  profile: Profile
  about: { title: string; paragraphs: string[] }
  education: Education[]
  experience: Experience[]
  projects: Project[]
  extracurriculars: Extracurricular[]
  skills: Record<string, string>
  zones: Zone[]
}

export interface GameZoneEvent {
  section: SectionId
  zoneId: string
  label: string
}
