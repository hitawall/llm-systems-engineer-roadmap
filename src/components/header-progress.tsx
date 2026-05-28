'use client'

import { useProgress, getOverallPercent } from '@/hooks/use-progress'
import { levels } from '@/data/roadmap'

export function HeaderProgress() {
  const { progress } = useProgress()
  const pct = getOverallPercent(levels, progress)

  if (pct === 0) return null

  return (
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
  )
}
