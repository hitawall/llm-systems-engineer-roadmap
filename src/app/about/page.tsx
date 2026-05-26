export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">About this roadmap</h1>

      <div className="mt-8 space-y-6 text-base leading-7 text-foreground/80">
        <p>
          This is a personal learning tracker built for{" "}
          <strong className="text-foreground">Shubham Arora</strong> — a backend engineer with 5+ years across
          4 companies, pivoting into building and deploying LLM systems.
        </p>

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
          <p>
            This roadmap is designed for slow and steady progress: 5–8 hours per week, roughly 14–20
            calendar weeks to portfolio-ready. It is not a sprint.
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
            <li>
              <strong className="text-foreground">AI / LLM Product Engineer</strong> — GenAI Engineer,
              Forward Deployed Engineer. Best fit.
            </li>
            <li>
              <strong className="text-foreground">LLMOps / MLOps Engineer</strong> — Close second; leans
              on existing infra skills.
            </li>
            <li>
              <strong className="text-foreground">LLM Engineer (RAG-focused)</strong>
            </li>
            <li>
              <strong className="text-foreground">AI Solutions Architect</strong> — Later-career.
            </li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Geography</h2>
          <p>
            Both India roles (incl. remote-for-US/EU) and relocation/sponsorship markets (Germany,
            Netherlands, Canada, UK, Singapore, Ireland). The roadmap is geography-agnostic at the skill
            level; cloud-platform choice in Level 4 is the only geo-sensitive fork.
          </p>
        </section>
      </div>
    </div>
  )
}
