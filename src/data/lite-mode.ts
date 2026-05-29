import type { Level } from './types'

export const LITE_STATS = {
  skillCount: 22,
  resourceCount: 36,
  estWeeks: 10,
  fullSkillCount: 28,
  fullResourceCount: 69,
  fullEstWeeks: 19,
} as const

export const LITE_SKILL_IDS = new Set([
  'l0-python', 'l0-numpy', 'l0-stats', 'l0-ml',
  'l1-nn', 'l1-transformers',
  'l2-prompting', 'l2-apis', 'l2-embeddings', 'l2-rag-basics',
  'l3-advanced-rag', 'l3-vectordb', 'l3-eval', 'l3-observability',
  'l4-tool-use', 'l4-agent-patterns', 'l4-langgraph',
  'l5-serving', 'l5-quantization', 'l5-finetuning',
  'l6-system-design', 'l6-behavioral',
])

// Best 1–2 resources per skill: prioritise free, practical, and most widely referenced
export const LITE_RESOURCE_IDS = new Set([
  // l0-python (2)
  'l0-python-r1', 'l0-python-r2',
  // l0-numpy (2)
  'l0-numpy-r1', 'l0-numpy-r2',
  // l0-stats (1)
  'l0-stats-r1',
  // l0-ml (1) — Fast.ai is free and practical
  'l0-ml-r1',
  // l1-nn (1) — 3Blue1Brown visual intro
  'l1-nn-r1',
  // l1-transformers (2) — skip the dense paper; keep visual blog + build-from-scratch
  'l1-transformers-r2', 'l1-transformers-r3',
  // l2-prompting (2)
  'l2-prompting-r1', 'l2-prompting-r3',
  // l2-apis (2)
  'l2-apis-r1', 'l2-apis-r2',
  // l2-embeddings (2 — only 2 exist)
  'l2-embeddings-r1', 'l2-embeddings-r2',
  // l2-rag-basics (1) — structured course over raw tutorial
  'l2-rag-basics-r2',
  // l3-advanced-rag (1) — practical docs over survey paper
  'l3-advanced-rag-r1',
  // l3-vectordb (2) — Pinecone (managed) + pgvector (self-hosted)
  'l3-vectordb-r1', 'l3-vectordb-r3',
  // l3-eval (2)
  'l3-eval-r1', 'l3-eval-r2',
  // l3-observability (2)
  'l3-observability-r1', 'l3-observability-r2',
  // l4-tool-use (2 — only 2 exist)
  'l4-tool-use-r1', 'l4-tool-use-r2',
  // l4-agent-patterns (2 — only 2 exist)
  'l4-agent-patterns-r1', 'l4-agent-patterns-r2',
  // l4-langgraph (1) — course over raw docs
  'l4-langgraph-r2',
  // l5-serving (1) — vLLM is the industry standard
  'l5-serving-r1',
  // l5-quantization (2)
  'l5-quantization-r1', 'l5-quantization-r2',
  // l5-finetuning (2) — PEFT docs + practical course; skip QLoRA paper
  'l5-finetuning-r1', 'l5-finetuning-r3',
  // l6-system-design (2) — AI Engineering book + free blog
  'l6-system-design-r1', 'l6-system-design-r3',
  // l6-behavioral (1)
  'l6-behavioral-r1',
])

export function getLiteFilteredLevels(levels: Level[]): Level[] {
  return levels
    .map(level => ({
      ...level,
      skills: level.skills
        .filter(s => LITE_SKILL_IDS.has(s.id))
        .map(s => ({
          ...s,
          resources: s.resources.filter(r => LITE_RESOURCE_IDS.has(r.id)),
        })),
    }))
    .filter(level => level.skills.length > 0)
}
