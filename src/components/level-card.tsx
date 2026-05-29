'use client'

import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useProgress, getLevelPercent } from '@/hooks/use-progress'
import type { Level } from '@/data/types'
import { SkillRow } from './skill-row'
import type { FilteredSkill } from './roadmap-view'

export function LevelCard({ level, filteredSkills }: { level: Level; filteredSkills?: FilteredSkill[] }) {
  const { progress, setCurrentLevel } = useProgress()
  const pct = getLevelPercent(level, progress)
  const isCurrent = progress.currentLevel === level.id

  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-card overflow-hidden transition-colors',
        isCurrent && 'border-primary/40 ring-1 ring-primary/20'
      )}
    >
      <div className="flex">
        {/* "I am here" button — separate from AccordionTrigger to avoid nested buttons */}
        <button
          type="button"
          onClick={() => setCurrentLevel(isCurrent ? undefined : level.id)}
          title={isCurrent ? 'Unmark as current level' : 'Mark as current level'}
          className={cn(
            'flex w-12 shrink-0 items-center justify-center border-r border-border/50 transition-colors hover:bg-muted/50',
            isCurrent && 'bg-primary/5'
          )}
        >
          <span
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors',
              isCurrent
                ? 'bg-primary text-primary-foreground'
                : 'bg-primary/10 text-primary'
            )}
          >
            {level.number}
          </span>
        </button>

        {/* Accordion */}
        <Accordion className="flex-1 min-w-0">
          <AccordionItem value={level.id} className="border-b-0">
            <AccordionTrigger className="px-4 py-4 hover:no-underline">
              <div className="flex-1 min-w-0 text-left pr-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm">{level.title}</span>
                  <span className="text-xs text-muted-foreground font-normal">
                    ~{level.estWeeks}w
                  </span>
                  {pct > 0 && (
                    <span
                      className={cn(
                        'text-xs font-medium tabular-nums',
                        pct === 100
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-primary'
                      )}
                    >
                      {pct}%
                    </span>
                  )}
                </div>
                {level.prereqs.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-0.5 font-normal">
                    prereqs: {level.prereqs.join(', ')}
                  </p>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="[&_a]:no-underline [&_a]:hover:text-primary">
              <div className="px-4 pb-5 space-y-0">
                <p className="text-sm text-muted-foreground leading-relaxed pb-4 mb-1 border-b border-border">
                  {level.blurb}
                </p>
                <div className="divide-y divide-border">
                  {(filteredSkills ?? level.skills.map(s => ({ skill: s, visibleResources: undefined }))).map(({ skill, visibleResources }) => (
                    <SkillRow key={skill.id} skill={skill} visibleResources={visibleResources} />
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
