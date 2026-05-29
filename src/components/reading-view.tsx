'use client'

import { useState, useMemo } from 'react'
import { ExternalLink, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import type { ReadingItem, ResourceType } from '@/data/types'

const TYPE_LABELS: Record<ResourceType, string> = {
  paper: 'paper',
  blog: 'blog',
  course: 'course',
  docs: 'docs',
  video: 'video',
  book: 'book',
  repo: 'repo',
}

const TYPE_COLORS: Record<ResourceType, string> = {
  paper:  'bg-violet-500/10 text-violet-700 dark:text-violet-400',
  blog:   'bg-sky-500/10 text-sky-700 dark:text-sky-400',
  course: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  docs:   'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  video:  'bg-rose-500/10 text-rose-700 dark:text-rose-400',
  book:   'bg-orange-500/10 text-orange-700 dark:text-orange-400',
  repo:   'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400',
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

function getAllTags(items: ReadingItem[]) {
  const tags = new Set<string>()
  for (const item of items) for (const t of item.tags) tags.add(t)
  return [...tags].sort()
}

function getTypes(items: ReadingItem[]) {
  const types = new Set<ResourceType>()
  for (const item of items) types.add(item.type)
  return [...types] as ResourceType[]
}

export function ReadingView({ items }: { items: ReadingItem[] }) {
  const [search, setSearch] = useState('')
  const [activeTypes, setActiveTypes] = useState<Set<ResourceType>>(new Set())
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set())

  const allTags = useMemo(() => getAllTags(items), [items])
  const allTypes = useMemo(() => getTypes(items), [items])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return items.filter(item => {
      if (activeTypes.size > 0 && !activeTypes.has(item.type)) return false
      if (activeTags.size > 0 && !item.tags.some(t => activeTags.has(t))) return false
      if (q && !item.title.toLowerCase().includes(q) && !(item.note?.toLowerCase().includes(q))) return false
      return true
    })
  }, [items, search, activeTypes, activeTags])

  const anyFilter = !!(search || activeTypes.size || activeTags.size)

  function toggleType(t: ResourceType) {
    const next = new Set(activeTypes)
    if (next.has(t)) { next.delete(t) } else { next.add(t) }
    setActiveTypes(next)
  }
  function toggleTag(tag: string) {
    const next = new Set(activeTags)
    if (next.has(tag)) { next.delete(tag) } else { next.add(tag) }
    setActiveTags(next)
  }
  function clearAll() {
    setSearch('')
    setActiveTypes(new Set())
    setActiveTags(new Set())
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="space-y-3 rounded-lg border border-border bg-card p-3">
        <div className="relative">
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search titles and notes…"
            className="h-8 text-sm pr-8"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {allTypes.map(t => (
            <Pill key={t} active={activeTypes.has(t)} onClick={() => toggleType(t)}>
              {TYPE_LABELS[t]}
            </Pill>
          ))}
          <span className="text-border text-xs self-center">·</span>
          {allTags.map(tag => (
            <Pill key={tag} active={activeTags.has(tag)} onClick={() => toggleTag(tag)}>
              {tag}
            </Pill>
          ))}
        </div>
        {anyFilter && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <X className="size-3" />
            Clear filters
          </button>
        )}
      </div>

      {/* Count */}
      {anyFilter && (
        <p className="text-xs text-muted-foreground">
          {filtered.length} of {items.length} items
        </p>
      )}

      {/* List */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">No items match your filters.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map(item => (
            <div key={item.id} className="rounded-lg border border-border bg-card p-4 space-y-2">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      {item.title}
                      <ExternalLink className="size-3 opacity-50" />
                    </a>
                    <span className={cn('rounded-full px-1.5 py-0.5 text-[10px] font-medium', TYPE_COLORS[item.type])}>
                      {TYPE_LABELS[item.type]}
                    </span>
                  </div>
                  {item.note && (
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.note}</p>
                  )}
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {item.tags.map(tag => (
                      <span key={tag} className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
