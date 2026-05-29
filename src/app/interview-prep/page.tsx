import { ChevronRight } from 'lucide-react'
import { systemDesignPrompts, behavioralQuestions } from '@/data/interview-prep'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function InterviewPrepPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Interview Prep</h1>
        <p className="text-muted-foreground leading-7 max-w-2xl">
          System design questions, behavioral prompts, and the mental models behind them.
          Work through these after completing Levels 3–5.
        </p>
      </div>

      {/* System Design */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">System Design</h2>
          <p className="text-sm text-muted-foreground">
            Each prompt includes hints — try to answer without them first, then use the hints to pressure-test gaps.
          </p>
        </div>

        <Accordion multiple>
          {systemDesignPrompts.map(prompt => (
            <AccordionItem key={prompt.id} value={prompt.id} className="border rounded-lg mb-2 px-1">
              <AccordionTrigger className="px-3 py-3 hover:no-underline text-left">
                <span className="text-sm font-medium">{prompt.title}</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-3 pb-4 space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{prompt.description}</p>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Key areas to cover</p>
                    <ul className="space-y-1.5">
                      {prompt.hints.map((hint, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <ChevronRight className="size-3.5 shrink-0 mt-0.5 text-muted-foreground" />
                          <span className="text-muted-foreground">{hint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Behavioral */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Behavioral</h2>
          <p className="text-sm text-muted-foreground">
            STAR format for each. Have at least one concrete story ready per question.
          </p>
        </div>

        <div className="space-y-2">
          {behavioralQuestions.map((q, i) => (
            <div key={q.id} className="rounded-lg border border-border bg-card p-4 space-y-2">
              <div className="flex gap-3">
                <span className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary mt-0.5">
                  {i + 1}
                </span>
                <div className="space-y-1.5">
                  <p className="text-sm font-medium leading-relaxed">{q.question}</p>
                  {q.notes && (
                    <p className="text-xs text-muted-foreground leading-relaxed italic">{q.notes}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Further reading</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { label: 'Chip Huyen — Designing ML Systems', url: 'https://www.oreilly.com/library/view/designing-machine-learning/9781098107963/' },
            { label: 'ByteByteGo — ML System Design Interview', url: 'https://bytebytego.com/' },
            { label: 'Hugging Face Blog — LLM engineering posts', url: 'https://huggingface.co/blog' },
            { label: 'What We Learned from a Year of Building with LLMs', url: 'https://www.oreilly.com/radar/what-we-learned-from-a-year-of-building-with-llms-part-i/' },
          ].map(item => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm hover:border-primary/40 transition-colors"
            >
              <span className="flex-1">{item.label}</span>
              <ChevronRight className="size-4 text-muted-foreground shrink-0" />
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
