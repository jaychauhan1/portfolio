export interface Profile {
  name: string
  displayName: string
  shortName: string
  title: string
  taglines: string[]
  bio: string
  bioExtended: string[]
  email: string
  phone: string
  linkedin: string
  github: string
  resumeUrl: string
}

export interface SkillCategory {
  category: string
  items: string[]
}

export interface Experience {
  title: string
  company: string
  dates: string
  location: string
  description: string
  highlights: string[]
}

export interface Project {
  name: string
  description: string
  tech: string[]
  link: string
}

export interface ResumeData {
  profile: Profile
  skills: SkillCategory[]
  experience: Experience[]
  projects: Project[]
  education: {
    school: string
    degree: string
    gpa: string
    dates: string
  }
}

export type SectionId = 'about' | 'skills' | 'work' | 'projects' | 'contact'

export const SECTIONS: { id: SectionId; label: string; index: number }[] = [
  { id: 'about', label: 'About', index: 0 },
  { id: 'skills', label: 'Skills', index: 1 },
  { id: 'work', label: 'Work', index: 2 },
  { id: 'projects', label: 'Projects', index: 3 },
  { id: 'contact', label: 'Contact', index: 4 },
]
