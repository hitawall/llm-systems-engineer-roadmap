import { levels } from '@/data/roadmap'
import { RoadmapView } from '@/components/roadmap-view'

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">LLM Systems Engineer Roadmap</h1>
        <p className="text-muted-foreground leading-7 max-w-2xl">
          A personal learning tracker for pivoting into building and deploying LLM systems.
          5–8 hrs/week · ~14–20 calendar weeks to portfolio-ready.
        </p>
      </div>
      <RoadmapView levels={levels} />
    </div>
  )
}
