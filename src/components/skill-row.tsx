import type { Skill, Priority } from '@/data/types'
import { ResourceItem } from './resource-item'

const priorityStyles: Record<Priority, string> = {
  core: 'bg-rose-500/10 text-rose-700 dark:text-rose-400',
  recommended: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  optional: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400',
}

function Chip({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium ${className}`}>
      {children}
    </span>
  )
}

export function SkillRow({ skill }: { skill: Skill }) {
  return (
    <div className="py-3 space-y-2">
      <div className="flex items-start gap-1.5 flex-wrap">
        <span className="text-sm font-medium text-foreground">{skill.title}</span>
        <Chip className={priorityStyles[skill.priority]}>{skill.priority}</Chip>
        {skill.tags.map(tag => (
          <Chip key={tag} className="bg-muted text-muted-foreground">
            {tag}
          </Chip>
        ))}
      </div>
      {skill.blurb && (
        <p className="text-xs text-muted-foreground leading-relaxed">{skill.blurb}</p>
      )}
      <div className="divide-y divide-border/50">
        {skill.resources.map(resource => (
          <ResourceItem key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  )
}
