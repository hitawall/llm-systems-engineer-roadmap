export interface SystemDesignPrompt {
  id: string
  title: string
  description: string
  hints: string[]
}

export interface BehavioralQuestion {
  id: string
  question: string
  notes?: string
}

export const systemDesignPrompts: SystemDesignPrompt[] = [
  {
    id: 'sd-rag',
    title: 'Design a RAG system for a 10M-document enterprise knowledge base',
    description: 'A Fortune 500 company wants employees to query internal docs (policies, engineering runbooks, contracts) using natural language. Design the full system.',
    hints: [
      'Chunking strategy — fixed vs. semantic, optimal chunk size for your embedding model',
      'Embedding model choice — OpenAI vs. open-source, latency/cost tradeoffs',
      'Vector store — Pinecone, Weaviate, pgvector; indexing strategies (HNSW)',
      'Hybrid search — dense + BM25/keyword for recall on code/exact terms',
      'Reranking — cross-encoder reranker to improve precision before LLM call',
      'Context window management — packing chunks, handling multi-hop queries',
      'Freshness — incremental indexing pipeline, handling deletions and updates',
    ],
  },
  {
    id: 'sd-chatbot',
    title: 'Design a production chatbot serving 1M+ DAU',
    description: 'A consumer product with 1M daily active users needs a chat interface backed by an LLM. Design for reliability, cost, and latency.',
    hints: [
      'Streaming — SSE/WebSocket for perceived latency, backpressure handling',
      'Caching — semantic cache (GPTCache, redis + embeddings) for repeated queries',
      'Rate limiting and quotas — per-user, per-org, global; graceful degradation',
      'Cost control — model tiering (fast cheap model first, escalate on low confidence)',
      'Prompt injection defense — input sanitisation, output validation',
      'Multi-turn context — context window budget, conversation summarisation',
      'Observability — latency p95/p99, token spend, error rates, content moderation flags',
    ],
  },
  {
    id: 'sd-eval',
    title: 'Design an LLM evaluation pipeline for a production feature',
    description: 'Your team is iterating on an LLM-powered summarisation feature. Design a pipeline that catches regressions and measures improvement across model/prompt changes.',
    hints: [
      'Benchmark dataset — golden set curation, coverage across edge cases',
      'Metrics — ROUGE/BERTScore for extractive, LLM-as-judge for generative quality',
      'LLM-as-judge biases — length bias, position bias, self-enhancement; mitigations',
      'CI integration — eval gate on every prompt change, diff viewer for regression',
      'Human eval loop — when to escalate to human review, Likert scale vs. pairwise',
      'Shadow testing — route % of prod traffic, compare outputs without affecting users',
      'A/B testing — statistical significance, sample size, guardrail metrics',
    ],
  },
  {
    id: 'sd-finetuning',
    title: 'Design a continual fine-tuning pipeline for domain adaptation',
    description: 'A legal-tech startup wants to continuously improve a base LLM on new case law and contracts as they ingest data. Design the training and deployment pipeline.',
    hints: [
      'Data flywheel — collecting high-quality preference data from user corrections',
      'PEFT strategy — LoRA vs. QLoRA; choosing rank and target modules',
      'Training infra — gradient checkpointing, mixed-precision, multi-GPU setup',
      'Catastrophic forgetting — replay buffers, regularisation (EWC), LoRA merging',
      'Evaluation before deploy — held-out legal benchmark, comparison to base model',
      'Serving — adapter hot-swap, blue/green deployment, rollback trigger',
      'Data privacy — PII scrubbing, audit trail, model weights governance',
    ],
  },
  {
    id: 'sd-agents',
    title: 'Design a multi-agent system for automated code review',
    description: 'Build a system that reviews pull requests: checks for bugs, security issues, and adherence to internal coding standards using multiple specialised agents.',
    hints: [
      'Agent decomposition — orchestrator + specialist agents (security, style, logic)',
      'Tool design — code search, test runner, static analyser as LLM tools',
      'Context management — per-agent context limits, shared working memory (scratchpad)',
      'Reliability — retry logic, max-turn limits, detecting agent loops',
      'Human-in-the-loop — confidence threshold, when to surface for human review',
      'Latency budget — parallel agent calls, critical path analysis',
      'Determinism — temperature settings, seed, structured output for downstream parsing',
    ],
  },
  {
    id: 'sd-observability',
    title: 'Design an observability platform for LLM applications',
    description: 'Your company runs 20 different LLM-powered features. Design a centralised platform for tracing, cost tracking, quality monitoring, and alerting.',
    hints: [
      'Trace structure — span per LLM call, token counts, latency, model, prompt version',
      'Sampling strategy — 100% for errors, sampled for success; tail-based sampling',
      'Cost attribution — per-feature, per-user-tier, budget alerts',
      'Quality signals — hallucination detectors, relevance scores, user feedback loop',
      'Prompt versioning — hash or tag prompts, link traces to prompt version',
      'Alerting — latency SLO breach, error rate spike, cost anomaly detection',
      'Privacy — PII masking in traces, retention policy, GDPR compliance',
    ],
  },
  {
    id: 'sd-ab',
    title: 'Design an A/B testing framework for LLM model/prompt changes',
    description: 'Your team ships prompt changes weekly. Design a framework that safely rolls out changes, measures impact on quality and engagement, and auto-rolls back on regression.',
    hints: [
      'Traffic splitting — consistent hashing on user_id, sticky assignment for UX',
      'Guardrail metrics — error rate, latency SLO; must not regress before rollout',
      'Quality metrics — LLM-judge score, engagement (thumbs up, copy, follow-up rate)',
      'Sample size calculation — effect size, power, runtime estimate',
      'Novelty effects — new prompt may see inflated engagement early; hold-out window',
      'Rollback triggers — automated revert if guardrail metric breaches threshold',
      'Multi-armed bandit — when to use vs. fixed allocation; Thompson sampling basics',
    ],
  },
]

export const behavioralQuestions: BehavioralQuestion[] = [
  {
    id: 'bq-failure',
    question: 'Tell me about a system you built that failed in production. How did you diagnose and fix it?',
    notes: 'STAR format. Emphasise what you learned and the observability tooling you added afterward.',
  },
  {
    id: 'bq-tradeoff',
    question: 'Describe a time you had to make a meaningful trade-off between model quality and latency or cost.',
    notes: 'Concrete numbers help (e.g., "dropping from GPT-4 to Haiku cut cost 10x with 5% quality drop on our eval set").',
  },
  {
    id: 'bq-ambiguity',
    question: 'How do you decide when an LLM feature is "good enough" to ship? Walk me through your evaluation process.',
    notes: 'Shows eval maturity. Mention golden datasets, LLM-as-judge, user study, and rollout strategy.',
  },
  {
    id: 'bq-nontechnical',
    question: 'How would you explain hallucinations — and the limits of your mitigation strategies — to a non-technical stakeholder?',
    notes: 'Tests communication. Frame around user impact and the system guardrails, not just model internals.',
  },
  {
    id: 'bq-current',
    question: 'How do you stay current with the LLM landscape given the pace of change? What did you read or build last week?',
    notes: 'Have a genuine, specific answer. Arxiv Sanity, Hugging Face blog, Chip Huyen newsletter, and actual side projects are all valid.',
  },
  {
    id: 'bq-ownership',
    question: 'Describe a project where you owned both the ML component and the backend/infra. What did you learn?',
    notes: 'LLM engineering roles blur the ML/backend boundary. Show you are comfortable in both.',
  },
  {
    id: 'bq-pushback',
    question: 'Tell me about a time you pushed back on using an LLM when a simpler solution was better.',
    notes: 'Shows engineering judgement. LLMs are not always the right tool.',
  },
  {
    id: 'bq-collab',
    question: 'How do you work with product/design on AI features where user expectations are hard to set?',
    notes: 'Focus on setting clear eval criteria upfront, iterating with prototypes, and managing "AI magic" expectations.',
  },
]
