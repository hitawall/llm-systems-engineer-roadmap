'use client'

import { useState } from 'react'
import { ExternalLink, Pencil, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useProgress } from '@/hooks/use-progress'
import type { Level, ProjectEntry } from '@/data/types'

type FormState = {
  title: string
  description: string
  url: string
  shippedAt: string
}

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function emptyForm(): FormState {
  return { title: '', description: '', url: '', shippedAt: todayISO() }
}

function ProjectForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: FormState
  onSave: (f: FormState) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState(initial)
  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }))

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <label className="text-xs font-medium">Title *</label>
        <Input value={form.title} onChange={set('title')} placeholder="My RAG chatbot" />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium">Description</label>
        <Textarea
          value={form.description}
          onChange={set('description')}
          placeholder="What did you build and what did you learn?"
          className="min-h-[72px] resize-y"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium">URL (optional)</label>
          <Input value={form.url} onChange={set('url')} placeholder="https://github.com/…" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium">Shipped at *</label>
          <Input type="date" value={form.shippedAt} onChange={set('shippedAt')} />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button
          onClick={() => onSave(form)}
          disabled={!form.title.trim() || !form.shippedAt}
        >
          Save
        </Button>
      </DialogFooter>
    </div>
  )
}

function ProjectCard({
  entry,
  onEdit,
  onDelete,
}: {
  entry: ProjectEntry
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="rounded-md border border-border bg-card p-3 space-y-1.5">
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium">{entry.title}</span>
            <span className="text-xs text-muted-foreground tabular-nums">{entry.shippedAt}</span>
            {entry.url && (
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-xs text-primary hover:underline"
              >
                <ExternalLink className="size-3" />
                link
              </a>
            )}
          </div>
          {entry.description && (
            <p className="text-xs text-muted-foreground leading-relaxed mt-1">{entry.description}</p>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={onEdit}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Edit project"
          >
            <Pencil className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="text-muted-foreground hover:text-destructive transition-colors"
            aria-label="Delete project"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function ProjectsView({ levels }: { levels: Level[] }) {
  const { progress, addProjectEntry, updateProjectEntry, deleteProjectEntry } = useProgress()
  const [addingTo, setAddingTo] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)

  function handleAdd(levelId: string, form: FormState) {
    addProjectEntry({
      levelId,
      title: form.title.trim(),
      description: form.description.trim(),
      url: form.url.trim() || undefined,
      shippedAt: form.shippedAt,
    })
    setAddingTo(null)
  }

  function handleEdit(entry: ProjectEntry, form: FormState) {
    updateProjectEntry(entry.id, {
      title: form.title.trim(),
      description: form.description.trim(),
      url: form.url.trim() || undefined,
      shippedAt: form.shippedAt,
    })
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      {levels.map(level => {
        const entries = progress.projectEntries.filter(e => e.levelId === level.id)
        const editingEntry = editingId ? entries.find(e => e.id === editingId) : undefined

        return (
          <div key={level.id} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {level.number}
                </span>
                <h2 className="text-sm font-semibold">{level.title}</h2>
              </div>
              {entries.length > 0 && (
                <span className="text-xs text-muted-foreground">{entries.length} project{entries.length !== 1 ? 's' : ''}</span>
              )}
            </div>

            {entries.length > 0 && (
              <div className="space-y-2">
                {entries
                  .slice()
                  .sort((a, b) => b.shippedAt.localeCompare(a.shippedAt))
                  .map(entry => (
                    <div key={entry.id}>
                      <Dialog
                        open={editingId === entry.id}
                        onOpenChange={open => { if (!open) setEditingId(null) }}
                      >
                        <ProjectCard
                          entry={entry}
                          onEdit={() => setEditingId(entry.id)}
                          onDelete={() => deleteProjectEntry(entry.id)}
                        />
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Edit project</DialogTitle>
                          </DialogHeader>
                          {editingEntry && (
                            <ProjectForm
                              initial={{
                                title: editingEntry.title,
                                description: editingEntry.description,
                                url: editingEntry.url ?? '',
                                shippedAt: editingEntry.shippedAt,
                              }}
                              onSave={form => handleEdit(entry, form)}
                              onCancel={() => setEditingId(null)}
                            />
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  ))}
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs gap-1.5"
              onClick={() => setAddingTo(level.id)}
            >
              <Plus className="size-3" />
              Add project
            </Button>

            <Dialog
              open={addingTo === level.id}
              onOpenChange={open => { if (!open) setAddingTo(null) }}
            >
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add project — {level.title}</DialogTitle>
                </DialogHeader>
                <ProjectForm
                  initial={emptyForm()}
                  onSave={form => handleAdd(level.id, form)}
                  onCancel={() => setAddingTo(null)}
                />
              </DialogContent>
            </Dialog>
          </div>
        )
      })}
    </div>
  )
}
