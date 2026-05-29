'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { useProgress, getOverallPercent } from '@/hooks/use-progress'
import { getLiteFilteredLevels, LITE_STATS } from '@/data/lite-mode'
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
  const { progress, setLiteMode } = useProgress()
  const liteMode = progress.liteMode
  const baseLevels = liteMode ? getLiteFilteredLevels(levels) : levels
  const overall = getOverallPercent(baseLevels, progress)
  const [filters, setFilters] = useState<FilterState>(emptyFilters)
  const allTags = useMemo(() => getAllTags(baseLevels), [baseLevels])

  const displayLevels = useMemo(() => {
    if (!isFiltering(filters)) return null  // null = show everything unmodified

    const { search, freeOnly, activeTypes, activeTags } = filters
    const q = search.toLowerCase()

    return baseLevels
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
  }, [baseLevels, filters])

  const levelsToRender = displayLevels ?? baseLevels.map(level => ({ level, skills: null }))
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
        <div className="flex items-center gap-2">
          {overall > 0 && (
            <span className="text-sm font-medium tabular-nums text-primary">
              {overall}% overall
            </span>
          )}
          {liteMode && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
              Lite
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setLiteMode(true)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              liteMode
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'
            )}
          >
            Lite · {LITE_STATS.skillCount} skills · ~{LITE_STATS.estWeeks}w
          </button>
          <button
            type="button"
            onClick={() => setLiteMode(false)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              !liteMode
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'
            )}
          >
            Full · {LITE_STATS.fullSkillCount} skills · ~{LITE_STATS.fullEstWeeks}w
          </button>
        </div>
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
