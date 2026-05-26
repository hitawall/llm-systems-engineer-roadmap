# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git Workflow

Always create a feature branch for changes and open a PR to merge into main. Never commit or merge directly to main.

## Commands

```bash
pnpm install          # install deps (pnpm-workspace.yaml allows sharp + unrs-resolver build scripts)
pnpm dev              # dev server at localhost:3000
pnpm build            # production build — must pass before merging any PR
pnpm lint             # ESLint
```

There are no tests yet. Type-checking runs as part of `pnpm build` via Next.js/Turbopack.

## Architecture

This is a **Next.js 16 App Router** app (TypeScript + Tailwind v4 + shadcn/ui `base-nova` style). It is a static-first personal learning tracker — no backend, no auth, no database.

**Key directories:**
- `src/data/` — typed TS data files; `roadmap.ts` is the single source of truth for all learning content. Do not derive content from comments or READMEs — update this file.
- `src/hooks/` — `use-progress.ts` owns all localStorage read/write via `useSyncExternalStore`. All progress state flows through this hook.
- `src/components/ui/` — shadcn-generated primitives; do not edit these by hand.
- `src/components/` — app-specific components built on top of the ui/ primitives.

**State model:** Progress is persisted in localStorage under the key `llm-roadmap:progress:v1`. The version suffix exists so that breaking content changes (renaming/deleting skill IDs) can trigger a migration. Pure content additions never need a version bump.

**Dark mode:** Controlled via `.dark` / `.light` classes on `<html>`, set by `src/components/theme-toggle.tsx`. `suppressHydrationWarning` is set on `<html>` to avoid SSR mismatch. The CSS media query also respects system preference for users who haven't toggled manually.

**shadcn note:** Components use `@base-ui/react` (not Radix UI). Tailwind v4 dark mode uses `@custom-variant dark` in `globals.css`.

## Dev tracker

See `BUILD_PLAN.md` at repo root for phase/feature checklists. Update checkboxes in the same PR that lands the work.
