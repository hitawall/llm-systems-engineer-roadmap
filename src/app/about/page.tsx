import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const NAV_SECTIONS = [
  { href: '/', label: 'Roadmap', desc: 'Full 7-level curriculum with skills, resources, and progress tracking' },
  { href: '/projects', label: 'Project Log', desc: 'Track projects you\'ve shipped at each level' },
  { href: '/reading', label: 'Reading List', desc: '15 curated papers and blogs — the foundational mental models' },
  { href: '/interview-prep', label: 'Interview Prep', desc: 'System design prompts and behavioral questions for LLM roles' },
]

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">About this roadmap</h1>

      <div className="mt-8 space-y-8 text-base leading-7 text-foreground/80">
        <p>
          A personal learning tracker built for{' '}
          <strong className="text-foreground">Shubham Arora</strong> — backend engineer with 5+ years
          across 4 companies, pivoting into building and deploying LLM systems. 5–8 hrs/week,
          ~14–20 calendar weeks to portfolio-ready.
        </p>

        {/* Quick nav */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">What&apos;s in here</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {NAV_SECTIONS.map(s => (
              <Link
                key={s.href}
                href={s.href}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-3 hover:border-primary/40 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{s.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{s.desc}</p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground shrink-0 mt-0.5" />
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">The honest caveat</h2>
          <p>
            Most &ldquo;2026 roadmap&rdquo; sources are published by course-sellers; the urgency framing is
            partly marketing. The skill demand is real and well-corroborated across independent job
            postings — the panic is not.
          </p>
          <p className="font-medium text-foreground">
            Alternate courses with building. Never stack courses without shipping. Portfolio &gt;
            certificates, especially given an existing engineering track record.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">The edge</h2>
          <p>
            The 2026 market wants &ldquo;can you ship AI to production reliably,&rdquo; not &ldquo;can you
            train a model.&rdquo; Ops, eval, and deployment skills transfer directly from existing backend
            experience and are a differentiator vs pure-ML candidates.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Target roles (demand-ranked)</h2>
          <ol className="list-decimal list-inside space-y-1.5 text-muted-foreground">
            <li><strong className="text-foreground">AI / LLM Product Engineer</strong> — GenAI Engineer, Forward Deployed Engineer. Best fit.</li>
            <li><strong className="text-foreground">LLMOps / MLOps Engineer</strong> — Close second; leans on existing infra skills.</li>
            <li><strong className="text-foreground">LLM Engineer (RAG-focused)</strong></li>
            <li><strong className="text-foreground">AI Solutions Architect</strong> — Later-career.</li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Geography</h2>
          <p>
            India roles (incl. remote-for-US/EU) and relocation/sponsorship markets (Germany,
            Netherlands, Canada, UK, Singapore, Ireland). The roadmap is geography-agnostic at the skill
            level; cloud-platform choice in Level 4 is the only geo-sensitive fork.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Stack</h2>
          <p className="text-sm text-muted-foreground">
            Next.js 16 · TypeScript · Tailwind v4 · shadcn/ui (base-nova / @base-ui/react) ·
            react-markdown · localStorage for all persistence · no backend, no auth.
          </p>
        </section>
      </div>
    </div>
  )
}
