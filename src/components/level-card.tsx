import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { Level } from '@/data/types'
import { SkillRow } from './skill-row'

export function LevelCard({ level }: { level: Level }) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <Accordion>
        <AccordionItem value={level.id} className="border-b-0">
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {level.number}
              </span>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm">{level.title}</span>
                  <span className="text-xs text-muted-foreground font-normal">~{level.estWeeks}w</span>
                </div>
                {level.prereqs.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-0.5 font-normal">
                    prereqs: {level.prereqs.join(', ')}
                  </p>
                )}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="[&_a]:no-underline [&_a]:hover:text-primary">
            <div className="px-5 pb-5 space-y-0">
              <p className="text-sm text-muted-foreground leading-relaxed pb-4 mb-1 border-b border-border">
                {level.blurb}
              </p>
              <div className="divide-y divide-border">
                {level.skills.map(skill => (
                  <SkillRow key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
