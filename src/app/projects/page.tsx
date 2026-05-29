import { levels } from '@/data/roadmap'
import { ProjectsView } from '@/components/projects-view'

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Project Log</h1>
        <p className="text-muted-foreground leading-7 max-w-2xl">
          Track projects you&apos;ve shipped at each level. Portfolio beats certificates.
        </p>
      </div>
      <ProjectsView levels={levels} />
    </div>
  )
}
