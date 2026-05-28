'use client'

import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { useProgress } from '@/hooks/use-progress'
import type { Resource, ResourceType, ResourceCost } from '@/data/types'

const typeColors: Record<ResourceType, string> = {
  course: 'bg-violet-500/10 text-violet-700 dark:text-violet-400',
  docs: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  blog: 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
  paper: 'bg-rose-500/10 text-rose-700 dark:text-rose-400',
  video: 'bg-red-500/10 text-red-700 dark:text-red-400',
  book: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400',
  repo: 'bg-zinc-500/10 text-zinc-700 dark:text-zinc-400',
}

const costColors: Record<ResourceCost, string> = {
  free: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  paid: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  freemium: 'bg-sky-500/10 text-sky-700 dark:text-sky-400',
}

function Chip({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium ${className}`}>
      {children}
    </span>
  )
}

export function ResourceItem({ resource }: { resource: Resource }) {
  const { progress, toggleResource } = useProgress()
  const checked = !!progress.completedResources[resource.id]

  return (
    <div className="flex items-start gap-2.5 py-1.5">
      <Checkbox
        checked={checked}
        onCheckedChange={() => toggleResource(resource.id)}
        className="mt-0.5 shrink-0"
        aria-label={`Mark "${resource.title}" as complete`}
      />
      <div className="flex-1 min-w-0 space-y-0.5">
        <div className="flex items-start justify-between gap-3">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'text-sm leading-snug !no-underline hover:!text-primary transition-colors flex-1 min-w-0',
              checked && 'line-through text-muted-foreground'
            )}
          >
            {resource.title}
          </a>
          <div className="flex items-center gap-1 shrink-0 mt-0.5">
            <Chip className={typeColors[resource.type]}>{resource.type}</Chip>
            <Chip className={costColors[resource.cost]}>{resource.cost}</Chip>
          </div>
        </div>
        {resource.note && (
          <p className="text-xs text-muted-foreground/70 italic">{resource.note}</p>
        )}
      </div>
    </div>
  )
}
