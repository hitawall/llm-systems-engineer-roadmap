'use client'

import { useState } from 'react'
import { Clock, NotebookPen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { useProgress, isSkillComplete, getSkillHours } from '@/hooks/use-progress'
import type { Resource, Skill, Priority } from '@/data/types'
import { ResourceItem } from './resource-item'
import { SkillNotes } from './skill-notes'
import { SkillTimeTracker } from './skill-time-tracker'

const priorityStyles: Record<Priority, string> = {
  core: 'bg-rose-500/10 text-rose-700 dark:text-rose-400',
  recommended: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  optional: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400',
}

function Chip({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium ${className}`}>
      {children}
    </span>
  )
}

export function SkillRow({ skill, visibleResources }: { skill: Skill; visibleResources?: Resource[] }) {
  const { progress, toggleSkillOverride } = useProgress()
  const complete = isSkillComplete(skill, progress)
  const totalHours = getSkillHours(progress.timeEntries, skill.id)

  const [notesOpen, setNotesOpen] = useState(false)
  const [timeOpen, setTimeOpen] = useState(false)

  return (
    <div className="py-3 space-y-2">
      <div className="flex items-start gap-1.5 flex-wrap">
        <span
          className={cn(
            'text-sm font-medium text-foreground transition-colors',
            complete && 'text-muted-foreground line-through'
          )}
        >
          {skill.title}
        </span>
        <Chip className={priorityStyles[skill.priority]}>{skill.priority}</Chip>
        {skill.tags.map(tag => (
          <Chip key={tag} className="bg-muted text-muted-foreground">
            {tag}
          </Chip>
        ))}
        <div className="ml-auto flex items-center gap-1.5 shrink-0">
          <Checkbox
            checked={complete}
            onCheckedChange={() => toggleSkillOverride(skill.id, skill.resources.map(r => r.id))}
            className="size-3.5"
            aria-label={`Mark "${skill.title}" as complete`}
          />
        </div>
      </div>
      {skill.blurb && (
        <p className="text-xs text-muted-foreground leading-relaxed">{skill.blurb}</p>
      )}
      <div className="divide-y divide-border/50">
        {(visibleResources ?? skill.resources).map(resource => (
          <ResourceItem key={resource.id} resource={resource} />
        ))}
        {visibleResources && visibleResources.length === 0 && (
          <p className="py-2 text-xs text-muted-foreground italic">No resources match the active filters.</p>
        )}
      </div>

      {/* Expandable panels */}
      {notesOpen && <SkillNotes skillId={skill.id} />}
      {timeOpen && <SkillTimeTracker skillId={skill.id} />}

      {/* Toggle buttons */}
      <div className="flex items-center gap-3 pt-1">
        <button
          type="button"
          onClick={() => setNotesOpen(!notesOpen)}
          className={cn(
            'flex items-center gap-1 text-xs transition-colors',
            notesOpen ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <NotebookPen className="size-3" />
          Notes
        </button>
        <button
          type="button"
          onClick={() => setTimeOpen(!timeOpen)}
          className={cn(
            'flex items-center gap-1 text-xs transition-colors',
            timeOpen ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Clock className="size-3" />
          {totalHours > 0 ? `${totalHours}h logged` : 'Log time'}
        </button>
      </div>
    </div>
  )
}
