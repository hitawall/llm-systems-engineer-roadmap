'use client'

import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import type { ResourceType } from '@/data/types'

const RESOURCE_TYPES: ResourceType[] = ['course', 'docs', 'blog', 'paper', 'video', 'book', 'repo']

export interface FilterState {
  search: string
  freeOnly: boolean
  activeTypes: Set<ResourceType>
  activeTags: Set<string>
}

export function emptyFilters(): FilterState {
  return { search: '', freeOnly: false, activeTypes: new Set(), activeTags: new Set() }
}

export function isFiltering(f: FilterState): boolean {
  return !!(f.search || f.freeOnly || f.activeTypes.size > 0 || f.activeTags.size > 0)
}

interface FilterBarProps {
  filters: FilterState
  allTags: string[]
  onChange: (f: FilterState) => void
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium transition-colors border',
        active
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-transparent text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground'
      )}
    >
      {children}
    </button>
  )
}

export function FilterBar({ filters, allTags, onChange }: FilterBarProps) {
  const { search, freeOnly, activeTypes, activeTags } = filters
  const filtering = isFiltering(filters)

  function toggleType(t: ResourceType) {
    const next = new Set(activeTypes)
    if (next.has(t)) { next.delete(t) } else { next.add(t) }
    onChange({ ...filters, activeTypes: next })
  }

  function toggleTag(tag: string) {
    const next = new Set(activeTags)
    if (next.has(tag)) { next.delete(tag) } else { next.add(tag) }
    onChange({ ...filters, activeTags: next })
  }

  return (
    <div className="space-y-3 rounded-lg border border-border bg-card p-3">
      {/* Search */}
      <div className="relative">
        <Input
          value={search}
          onChange={e => onChange({ ...filters, search: e.target.value })}
          placeholder="Search skills and resources…"
          className="h-8 text-sm pr-8"
        />
        {search && (
          <button
            type="button"
            onClick={() => onChange({ ...filters, search: '' })}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {/* Cost + type row */}
      <div className="flex flex-wrap items-center gap-1.5">
        <Pill active={freeOnly} onClick={() => onChange({ ...filters, freeOnly: !freeOnly })}>
          free only
        </Pill>
        <span className="text-border text-xs">·</span>
        {RESOURCE_TYPES.map(t => (
          <Pill key={t} active={activeTypes.has(t)} onClick={() => toggleType(t)}>
            {t}
          </Pill>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {allTags.map(tag => (
          <Pill key={tag} active={activeTags.has(tag)} onClick={() => toggleTag(tag)}>
            {tag}
          </Pill>
        ))}
      </div>

      {/* Clear all */}
      {filtering && (
        <button
          type="button"
          onClick={() => onChange(emptyFilters())}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          <X className="size-3" />
          Clear all filters
        </button>
      )}
    </div>
  )
}
