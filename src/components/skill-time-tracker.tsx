'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useProgress } from '@/hooks/use-progress'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export function SkillTimeTracker({ skillId }: { skillId: string }) {
  const { progress, addTimeEntry, deleteTimeEntry } = useProgress()
  const entries = progress.timeEntries.filter(e => e.skillId === skillId)

  const [date, setDate] = useState(todayISO)
  const [hours, setHours] = useState('')
  const [note, setNote] = useState('')

  function handleAdd() {
    const h = parseFloat(hours)
    if (!date || !Number.isFinite(h) || h <= 0) return
    addTimeEntry({ skillId, date, hours: h, note: note.trim() || undefined })
    setHours('')
    setNote('')
    setDate(todayISO())
  }

  return (
    <div className="pt-2 pb-1 space-y-3">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Time log</span>

      {/* Add form */}
      <div className="flex flex-wrap gap-2 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground">Date</label>
          <Input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="h-7 text-xs w-36"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-muted-foreground">Hours</label>
          <Input
            type="number"
            min="0.25"
            step="0.25"
            value={hours}
            onChange={e => setHours(e.target.value)}
            placeholder="1.5"
            className="h-7 text-xs w-20"
          />
        </div>
        <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
          <label className="text-xs text-muted-foreground">Note (optional)</label>
          <Input
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="What did you work on?"
            className="h-7 text-xs"
            onKeyDown={e => { if (e.key === 'Enter') handleAdd() }}
          />
        </div>
        <Button size="sm" onClick={handleAdd} className="h-7 text-xs shrink-0">
          Log
        </Button>
      </div>

      {/* Past entries */}
      {entries.length > 0 && (
        <div className="space-y-1">
          {entries
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date))
            .map(entry => (
              <div key={entry.id} className="flex items-center gap-2 text-xs">
                <span className="tabular-nums text-muted-foreground w-20 shrink-0">{entry.date}</span>
                <span className="font-medium tabular-nums w-10 shrink-0">{entry.hours}h</span>
                {entry.note && <span className="text-muted-foreground truncate flex-1">{entry.note}</span>}
                <button
                  type="button"
                  onClick={() => deleteTimeEntry(entry.id)}
                  className="shrink-0 text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Delete entry"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
