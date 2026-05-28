'use client'

import { useRef, useState } from 'react'
import { useProgress } from '@/hooks/use-progress'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function ProgressControls() {
  const { exportData, importData, reset } = useProgress()
  const fileRef = useRef<HTMLInputElement>(null)
  const [showReset, setShowReset] = useState(false)

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        importData(reader.result as string)
      } catch {
        alert('Could not import: invalid progress file.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={exportData}>
        Export
      </Button>
      <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
        Import
      </Button>
      <input
        ref={fileRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleImport}
      />
      <Button variant="outline" size="sm" onClick={() => setShowReset(true)}>
        Reset
      </Button>

      <Dialog open={showReset} onOpenChange={(open) => setShowReset(open)}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Reset all progress?</DialogTitle>
            <DialogDescription>
              This will permanently clear all checkboxes and your current-level marker.
              This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReset(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                reset()
                setShowReset(false)
              }}
            >
              Reset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
