---
title: suryadarmaputra.com
stack: Astro 5 · Tailwind CSS v4 · DaisyUI 5 · TypeScript · Bun · Notion · Vitest · Playwright
---

## Env

`.env.example` is the contract. Notes on the two that are not in it:

```env
ENABLE_TEST_ROUTES=        # "true" injects /__test/* routes; never in prod
PLAYWRIGHT_CHROMIUM_PATH=  # sandbox escape hatch; unset locally and in CI
```
`NOTION_*` are needed only by `bun run generate`, never by build or tests.

## Session Start

1. `git status` + current branch, identify the task
2. load only the harness sections the diff touches (refs below)
3. `bun install`, then `bun run test:seed` if `src/_generated/` is empty
4. confirm scope before coding

Budget: this file ≤ 100 lines. Harness docs and ADRs: load sections, not whole
files. Overflow goes to `docs/harness/`.

## Harness Refs

<!-- diff-driven: load ONLY sections matching changed paths -->
<!-- pattern                                        → doc · section(s) -->
```
src/pages/**                                        → architecture.md · #layers #structure
src/modules/*/pages/** · src/modules/*/components/** → conventions.md · #component #styling #a11y
src/modules/core/components/base/**                 → conventions.md · #component #styling
src/modules/core/libs/notion/blocks/**              → conventions.md · #notion-blocks; architecture.md · #block-rendering; testing.md · #component-conventions #new-block
src/modules/core/libs/notion/*.ts                   → architecture.md · #block-rendering #data-flow
src/modules/*/services/**                           → architecture.md · #data-flow #boundaries; conventions.md · #services
src/modules/*/utils/**                              → conventions.md · #naming
src/modules/core/styles/global.css                  → conventions.md · #styling (+ ADR-003)
scripts/**                                          → architecture.md · #data-flow
astro.config.mjs                                    → testing.md · #test-routes
tests/component/**                                  → testing.md · #component-conventions
tests/e2e/**                                        → testing.md · #e2e-conventions
tests/fixtures/** · tests/gallery/**                → testing.md · #fixtures #new-block
any new file                                        → testing.md · (matching section)
cross-module imports detected                       → architecture.md · #import-rules #boundaries
```

ADRs in `docs/adr/` override everything here. Read the relevant ADR before any
architectural, styling or a11y decision.

## Guardrails

**G1: Harness compliance (strict)** — classify each changed file by path, load
only the matching sections, check every changed file against them. One
violation = FAIL. Auto-fail: new `any` without an existing `biome-ignore` ·
interpolated Tailwind classnames · new block renderer with no
fixture/component test/gallery entry · a second `<h1>` on a page · data
fetching inside a component. On FAIL: list violations with file+line → fix →
re-run G1 from scratch.

**G2: Lint** — `bun run lint`. Fix code, never disable rules.
**G3: Typecheck** — `bun run typecheck`. Stays at 0 errors, 0 warnings. No `any` as an escape.
**G4: Component tests** — `bun run test:component`. Fix code, not tests.
**G5: E2E tests** — `bun run test:e2e`. Only after G4 passes.
**G6: Build** — `bun run build`. Imports/exports/config only, no logic changes.
**G7: Block screenshots** — `bun run test:screenshots` when a block renderer
changed; review `tests/screenshots/output/`. Review step, not a CI gate.

Always: no secrets in code · no `console.log` in `src/` · never commit
`src/_generated/` or generated images · never ship a test-only route outside
`ENABLE_TEST_ROUTES`.

## Commands

```bash
bun run dev                # dev server :4321
bun run lint:fix           # biome autofix
bun run test:seed          # fixture content into src/_generated + public/images
bun run test               # component (vitest) then e2e (playwright)
bun run test:screenshots   # one PNG per Notion block
bun run generate           # fetch content from Notion (needs NOTION_TOKEN)
```

## Key Gotchas

- `src/_generated/**` and `public/images/{articles,projects}/**` are gitignored;
  a clean checkout has no content until `bun run generate` or `bun run test:seed`.
- Tailwind JIT cannot see interpolated classnames. Map full strings.
- `/__test/notion-blocks` exists only when `ENABLE_TEST_ROUTES=true`.
- `regroupListItems()` rewrites list items into synthetic list blocks before render.
- Astro components that `return null` throw when rendered directly by the
  Container API — go through `tests/component/notion/render.ts`.
- Bun version is pinned in `.tool-versions`.

## Harness Docs

`docs/harness/{architecture,conventions,testing}.md` ·
`docs/adr/README.md` (authoritative)
