'use client'

import { useProgress, getOverallPercent, getWeeklyHours } from '@/hooks/use-progress'
import { levels } from '@/data/roadmap'

export function HeaderProgress() {
  const { progress } = useProgress()
  const pct = getOverallPercent(levels, progress)
  const weeklyHours = getWeeklyHours(progress.timeEntries)

  return (
    <>
      {weeklyHours > 0 && (
        <div className="absolute top-1/2 right-14 -translate-y-1/2 text-xs text-muted-foreground tabular-nums pointer-events-none select-none">
          {weeklyHours}h this week
        </div>
      )}
      {pct > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Overall progress: ${pct}%`}
          />
        </div>
      )}
    </>
  )
}
