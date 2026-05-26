export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">LLM Systems Engineer Roadmap</h1>
        <p className="mt-3 text-muted-foreground leading-7">
          A personal learning tracker for pivoting from backend engineering into building and deploying LLM systems.
          Phase 1 (the full roadmap) is coming next.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-muted/40 p-6 space-y-3 text-sm">
        <div>
          <span className="font-medium text-foreground">Pace — </span>
          <span className="text-muted-foreground">5–8 hrs/week · ~14–20 calendar weeks to portfolio-ready.</span>
        </div>
        <div>
          <span className="font-medium text-foreground">Target roles — </span>
          <span className="text-muted-foreground">
            LLM Product Engineer, LLMOps / MLOps Engineer, LLM Engineer (RAG), AI Solutions Architect.
          </span>
        </div>
        <div>
          <span className="font-medium text-foreground">Edge — </span>
          <span className="text-muted-foreground">
            The 2026 market wants "can you ship AI to production reliably," not "can you train a model."
          </span>
        </div>
      </div>
    </div>
  )
}
