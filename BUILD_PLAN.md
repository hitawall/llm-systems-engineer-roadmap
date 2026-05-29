# Build Plan — LLM Roadmap Tracker

Ground-truth dev tracker. Each phase = one feature branch + one PR into main.
Update checkboxes in the same PR that lands the work.

## Phase 0 — Bootstrap
- [x] Next.js 16 + TS + Tailwind scaffold
- [x] shadcn/ui init + base components (Button, Card, Accordion, Checkbox, Badge, Progress, Dialog, Tabs, Input, Textarea, Toggle)
- [x] App shell (header, footer, dark mode toggle)
- [x] About page with honest caveat (spec §6)
- [x] Vercel link + green prod build
- [x] BUILD_PLAN.md committed
PR: #3

## Phase 1 — Read-only roadmap
- [x] `src/data/types.ts` — Level, Skill, Resource, ProjectIdea, ReadingItem, Progress types
- [x] `src/data/roadmap.ts` — Levels 0–6 (incl. Interview Prep), project ideas, tags per skill, resource types
- [x] `src/data/reading-list.ts` — ~15 curated papers/blogs/posts
- [x] `src/components/level-card.tsx` — Accordion with prereq, estWeeks, blurb
- [x] `src/components/skill-row.tsx` — Priority badge, tags, note, resources
- [x] `src/components/resource-item.tsx` — Cost/type badges, external link
- [x] `src/app/page.tsx` — Render full roadmap, mobile responsive
PR: _pending_

## Phase 2 — Personal progress
- [x] `src/hooks/use-progress.ts` — `useSyncExternalStore` over localStorage (`llm-roadmap:progress:v1`)
- [x] Checkbox per resource; skill auto-completes when all resources checked (manual override)
- [x] Level % complete
- [x] Overall weighted-by-priority progress bar (header)
- [x] "I am here" current-level selector + highlight
- [x] Export JSON / Import JSON / Reset with confirm
PR: #5

## Phase 3 — Value-adds (notes + project log + time tracking)
- [x] `src/app/projects/page.tsx` — Per-level project log; entry: title, description, url, shippedAt
- [x] Notes per skill — markdown textarea + react-markdown preview; autosaved to localStorage
- [x] Time tracking — quick-add (date, skillId, hours, note); per-skill totals on SkillRow; weekly total in header
PR: _pending_

## Phase 4 — Polish (filters, search, side pages)
- [ ] Filter bar — cost toggle (free only), resource-type chips (multi), tag chips (multi)
- [ ] Search — substring across skill/resource titles
- [ ] `src/app/reading/page.tsx` — Curated reading list with type/tag filters
- [ ] `src/app/interview-prep/page.tsx` — Level 6: system-design prompts, behavioral, paper list
- [ ] About page polish
PR: _pending_

## Phase 5 — Deferred / optional
- [ ] Cloud sync (Vercel Postgres + NextAuth)
- [ ] Custom domain
- [ ] Vercel Analytics
- [ ] OG image for social sharing
