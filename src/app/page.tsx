import { levels } from '@/data/roadmap'
import { LevelCard } from '@/components/level-card'

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">LLM Systems Engineer Roadmap</h1>
        <p className="text-muted-foreground leading-7 max-w-2xl">
          A personal learning tracker for pivoting into building and deploying LLM systems.
          5–8 hrs/week · ~14–20 calendar weeks to portfolio-ready.
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
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
      </div>

      <div className="space-y-3">
        {levels.map(level => (
          <LevelCard key={level.id} level={level} />
        ))}
      </div>
    </div>
  )
}
