'use client'

import { useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Textarea } from '@/components/ui/textarea'
import { useProgress } from '@/hooks/use-progress'

export function SkillNotes({ skillId }: { skillId: string }) {
  const { progress, setNote } = useProgress()
  const [preview, setPreview] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const value = progress.notes[skillId] ?? ''

  function handleChange(next: string) {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setNote(skillId, next), 500)
  }

  return (
    <div className="pt-2 pb-1 space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Notes</span>
        <button
          type="button"
          onClick={() => setPreview(!preview)}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto"
        >
          {preview ? 'Edit' : 'Preview'}
        </button>
      </div>

      {preview ? (
        <div className={`min-h-[80px] rounded-md border border-border bg-muted/30 p-3 text-sm prose prose-sm dark:prose-invert max-w-none ${!value && 'text-muted-foreground italic'}`}>
          {value ? (
            <ReactMarkdown>{value}</ReactMarkdown>
          ) : (
            <span>No notes yet.</span>
          )}
        </div>
      ) : (
        <Textarea
          defaultValue={value}
          onChange={e => handleChange(e.target.value)}
          placeholder="Jot down notes, links, key takeaways… (Markdown supported)"
          className="text-sm min-h-[80px] resize-y"
        />
      )}
    </div>
  )
}
