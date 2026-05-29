import { readingList } from '@/data/reading-list'
import { ReadingView } from '@/components/reading-view'

export default function ReadingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Reading List</h1>
        <p className="text-muted-foreground leading-7 max-w-2xl">
          Curated papers, blogs, and posts. The foundation papers are worth reading in full;
          the rest are worth skimming for mental models.
        </p>
      </div>
      <ReadingView items={readingList} />
    </div>
  )
}
