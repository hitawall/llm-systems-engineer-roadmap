'use client'

import { useMemo, useState } from 'react'
import { useProgress, getOverallPercent } from '@/hooks/use-progress'
import type { Level, Resource, Skill } from '@/data/types'
import { LevelCard } from './level-card'
import { ProgressControls } from './progress-controls'
import { FilterBar, emptyFilters, isFiltering, type FilterState } from './filter-bar'

export type FilteredSkill = { skill: Skill; visibleResources: Resource[] }

function getAllTags(levels: Level[]): string[] {
  const tags = new Set<string>()
  for (const level of levels)
    for (const skill of level.skills)
      for (const tag of skill.tags)
        tags.add(tag)
  return [...tags].sort()
}

export function RoadmapView({ levels }: { levels: Level[] }) {
  const { progress } = useProgress()
  const overall = getOverallPercent(levels, progress)
  const [filters, setFilters] = useState<FilterState>(emptyFilters)
  const allTags = useMemo(() => getAllTags(levels), [levels])

  const displayLevels = useMemo(() => {
    if (!isFiltering(filters)) return null  // null = show everything unmodified

    const { search, freeOnly, activeTypes, activeTags } = filters
    const q = search.toLowerCase()

    return levels
      .map(level => {
        const skills: FilteredSkill[] = level.skills
          .filter(skill => {
            if (activeTags.size > 0 && !skill.tags.some(t => activeTags.has(t))) return false
            if (q) {
              const titleMatch = skill.title.toLowerCase().includes(q)
              const resourceMatch = skill.resources.some(r => r.title.toLowerCase().includes(q))
              if (!titleMatch && !resourceMatch) return false
            }
            return true
          })
          .map(skill => ({
            skill,
            visibleResources: skill.resources.filter(r => {
              if (freeOnly && r.cost !== 'free') return false
              if (activeTypes.size > 0 && !activeTypes.has(r.type)) return false
              return true
            }),
          }))
        return { level, skills }
      })
      .filter(item => item.skills.length > 0)
  }, [levels, filters])

  const levelsToRender = displayLevels ?? levels.map(level => ({ level, skills: null }))
  const resultCount = displayLevels
    ? displayLevels.reduce((s, l) => s + l.skills.length, 0)
    : null

  return (
    <>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>
            <span className="inline-block w-2 h-2 rounded-full bg-rose-500/60 mr-1.5" />
            core
          </span>
          <span>
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500/60 mr-1.5" />
            recommended
          </span>
          <span>
            <span className="inline-block w-2 h-2 rounded-full bg-zinc-400/60 mr-1.5" />
            optional
          </span>
          <span className="ml-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500/60 mr-1.5" />
            free
          </span>
          <span>
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500/60 mr-1.5" />
            paid
          </span>
          <span>
            <span className="inline-block w-2 h-2 rounded-full bg-sky-500/60 mr-1.5" />
            freemium
          </span>
        </div>
        {overall > 0 && (
          <span className="text-sm font-medium tabular-nums text-primary">
            {overall}% overall
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Click the level number to mark your current position.
        </p>
        <ProgressControls />
      </div>

      <FilterBar filters={filters} allTags={allTags} onChange={setFilters} />

      {resultCount === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No skills match your filters.
        </p>
      ) : (
        <div className="space-y-3">
          {resultCount !== null && (
            <p className="text-xs text-muted-foreground">
              {resultCount} skill{resultCount !== 1 ? 's' : ''} matched
            </p>
          )}
          {levelsToRender.map(({ level, skills }) => (
            <LevelCard key={level.id} level={level} filteredSkills={skills ?? undefined} />
          ))}
        </div>
      )}
    </>
  )
}
