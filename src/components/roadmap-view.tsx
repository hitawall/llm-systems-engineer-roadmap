'use client'

import { useProgress, getOverallPercent } from '@/hooks/use-progress'
import type { Level } from '@/data/types'
import { LevelCard } from './level-card'
import { ProgressControls } from './progress-controls'

export function RoadmapView({ levels }: { levels: Level[] }) {
  const { progress } = useProgress()
  const overall = getOverallPercent(levels, progress)

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

      <div className="space-y-3">
        {levels.map(level => (
          <LevelCard key={level.id} level={level} />
        ))}
      </div>
    </>
  )
}
