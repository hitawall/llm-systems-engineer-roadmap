export type ResourceType = 'course' | 'docs' | 'blog' | 'paper' | 'video' | 'book' | 'repo'
export type ResourceCost = 'free' | 'paid' | 'freemium'
export type Priority = 'core' | 'recommended' | 'optional'

export interface Resource {
  id: string
  title: string
  url: string
  type: ResourceType
  cost: ResourceCost
  note?: string
}

export interface Skill {
  id: string
  title: string
  priority: Priority
  tags: string[]
  blurb?: string
  resources: Resource[]
}

export interface Level {
  id: string
  number: number
  title: string
  blurb: string
  prereqs: string[]
  estWeeks: number
  skills: Skill[]
}

export interface ProjectIdea {
  levelId: string
  title: string
  description: string
  tags: string[]
}

export interface ReadingItem {
  id: string
  title: string
  url: string
  type: ResourceType
  tags: string[]
  note?: string
}

export interface ProjectEntry {
  id: string
  levelId: string
  title: string
  description: string
  url?: string
  shippedAt: string  // YYYY-MM-DD
}

export interface TimeEntry {
  id: string
  skillId: string
  date: string       // YYYY-MM-DD
  hours: number
  note?: string
}

export interface Progress {
  completedResources: Record<string, boolean>
  completedSkills: Record<string, boolean>
  currentLevel?: string
  notes: Record<string, string>
  projectEntries: ProjectEntry[]
  timeEntries: TimeEntry[]
}
