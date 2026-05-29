'use client'

import { useEffect, useSyncExternalStore } from 'react'
import type { Level, Progress, ProjectEntry, Skill, TimeEntry } from '@/data/types'

const STORAGE_KEY = 'llm-roadmap:progress:v1'

export const DEFAULT_PROGRESS: Progress = {
  completedResources: {},
  completedSkills: {},
  notes: {},
  projectEntries: [],
  timeEntries: [],
}

function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

function readStorage(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_PROGRESS }
    const p = JSON.parse(raw) as Partial<Progress>
    const isPlainObj = (v: unknown): v is Record<string, unknown> =>
      typeof v === 'object' && v !== null && !Array.isArray(v)
    return {
      completedResources: isPlainObj(p.completedResources) ? (p.completedResources as Record<string, boolean>) : {},
      completedSkills: isPlainObj(p.completedSkills) ? (p.completedSkills as Record<string, boolean>) : {},
      currentLevel: typeof p.currentLevel === 'string' ? p.currentLevel : undefined,
      notes: isPlainObj(p.notes) ? (p.notes as Record<string, string>) : {},
      projectEntries: Array.isArray(p.projectEntries) ? p.projectEntries : [],
      timeEntries: Array.isArray(p.timeEntries) ? p.timeEntries : [],
    }
  } catch {
    return { ...DEFAULT_PROGRESS }
  }
}

// Module-level store — shared across all hook instances
let _snap: Progress = DEFAULT_PROGRESS
let _hydrated = false
let _storageHandler: ((e: StorageEvent) => void) | null = null
let _listeners: Array<() => void> = []

function notify(): void {
  for (const l of _listeners) l()
}

function subscribe(cb: () => void): () => void {
  _listeners = [..._listeners, cb]
  return () => {
    _listeners = _listeners.filter(l => l !== cb)
  }
}

function getSnapshot(): Progress {
  return _snap
}

function getServerSnapshot(): Progress {
  return DEFAULT_PROGRESS
}

function dispatch(updater: (p: Progress) => Progress): void {
  _snap = updater(_snap)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(_snap))
  notify()
}

// --- Derived helpers (exported for use in components) ---

export function isSkillComplete(skill: Skill, progress: Progress): boolean {
  const explicit = progress.completedSkills[skill.id]
  if (explicit === true) return true
  if (explicit === false) return false
  return skill.resources.length > 0 && skill.resources.every(r => progress.completedResources[r.id])
}

const WEIGHT: Record<'core' | 'recommended' | 'optional', number> = {
  core: 3,
  recommended: 2,
  optional: 1,
}

export function getLevelPercent(level: Level, progress: Progress): number {
  if (level.skills.length === 0) return 0
  const done = level.skills.filter(s => isSkillComplete(s, progress)).length
  return Math.round((done / level.skills.length) * 100)
}

export function getOverallPercent(levels: Level[], progress: Progress): number {
  let total = 0
  let done = 0
  for (const level of levels) {
    for (const skill of level.skills) {
      const w = WEIGHT[skill.priority]
      total += w
      if (isSkillComplete(skill, progress)) done += w
    }
  }
  return total === 0 ? 0 : Math.round((done / total) * 100)
}

export function getWeeklyHours(timeEntries: TimeEntry[]): number {
  const now = new Date()
  const dayOfWeek = now.getDay() // 0=Sun
  const monday = new Date(now)
  monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7))
  monday.setHours(0, 0, 0, 0)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 7)

  return timeEntries
    .filter(e => {
      const d = new Date(e.date)
      return d >= monday && d < sunday
    })
    .reduce((sum, e) => sum + e.hours, 0)
}

export function getSkillHours(timeEntries: TimeEntry[], skillId: string): number {
  return timeEntries
    .filter(e => e.skillId === skillId)
    .reduce((sum, e) => sum + e.hours, 0)
}

// --- Hook ---

export function useProgress() {
  const progress = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  // Hydrate from localStorage after mount (deferred to avoid hydration mismatch)
  useEffect(() => {
    if (!_hydrated) {
      _hydrated = true
      _snap = readStorage()
      notify()
    }
    if (!_storageHandler) {
      _storageHandler = (e: StorageEvent) => {
        if (e.key === STORAGE_KEY) {
          _snap = readStorage()
          notify()
        }
      }
      window.addEventListener('storage', _storageHandler)
    }
  }, [])

  return {
    progress,

    toggleResource(resourceId: string) {
      dispatch(prev => ({
        ...prev,
        completedResources: {
          ...prev.completedResources,
          [resourceId]: !prev.completedResources[resourceId],
        },
      }))
    },

    // If an explicit override exists, remove it (back to auto-detect).
    // If absent, set to the opposite of the current auto-detected value (resources only, no override).
    toggleSkillOverride(skillId: string, resourceIds: string[]) {
      dispatch(prev => {
        if (skillId in prev.completedSkills) {
          const rest = Object.fromEntries(
            Object.entries(prev.completedSkills).filter(([k]) => k !== skillId)
          ) as Record<string, boolean>
          return { ...prev, completedSkills: rest }
        }
        const autoComplete = resourceIds.length > 0 && resourceIds.every(r => prev.completedResources[r])
        return {
          ...prev,
          completedSkills: { ...prev.completedSkills, [skillId]: !autoComplete },
        }
      })
    },

    setCurrentLevel(levelId: string | undefined) {
      dispatch(prev => ({ ...prev, currentLevel: levelId }))
    },

    setNote(skillId: string, markdown: string) {
      dispatch(prev => ({
        ...prev,
        notes: { ...prev.notes, [skillId]: markdown },
      }))
    },

    addProjectEntry(entry: Omit<ProjectEntry, 'id'>) {
      dispatch(prev => ({
        ...prev,
        projectEntries: [...prev.projectEntries, { ...entry, id: genId() }],
      }))
    },

    updateProjectEntry(id: string, updates: Partial<Omit<ProjectEntry, 'id'>>) {
      dispatch(prev => ({
        ...prev,
        projectEntries: prev.projectEntries.map(e => e.id === id ? { ...e, ...updates } : e),
      }))
    },

    deleteProjectEntry(id: string) {
      dispatch(prev => ({
        ...prev,
        projectEntries: prev.projectEntries.filter(e => e.id !== id),
      }))
    },

    addTimeEntry(entry: Omit<TimeEntry, 'id'>) {
      dispatch(prev => ({
        ...prev,
        timeEntries: [...prev.timeEntries, { ...entry, id: genId() }],
      }))
    },

    deleteTimeEntry(id: string) {
      dispatch(prev => ({
        ...prev,
        timeEntries: prev.timeEntries.filter(e => e.id !== id),
      }))
    },

    exportData() {
      const blob = new Blob([JSON.stringify(_snap, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'llm-roadmap-progress.json'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    },

    importData(json: string) {
      const p = JSON.parse(json) as Partial<Progress>
      const isPlainObj = (v: unknown): v is Record<string, boolean> =>
        typeof v === 'object' && v !== null && !Array.isArray(v)
      dispatch(() => ({
        completedResources: isPlainObj(p.completedResources) ? p.completedResources : {},
        completedSkills: isPlainObj(p.completedSkills) ? p.completedSkills : {},
        currentLevel: typeof p.currentLevel === 'string' ? p.currentLevel : undefined,
        notes: isPlainObj(p.notes) ? (p.notes as Record<string, string>) : {},
        projectEntries: Array.isArray(p.projectEntries) ? p.projectEntries : [],
        timeEntries: Array.isArray(p.timeEntries) ? p.timeEntries : [],
      }))
    },

    reset() {
      dispatch(() => ({ ...DEFAULT_PROGRESS }))
    },
  }
}
