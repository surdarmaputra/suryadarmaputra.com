---
name: build-loop
description: Run this project's guardrail sequence (G1-G7 from AGENTS.md) after any code change and drive it to green. Use when finishing a change, before committing, or when asked to verify work on suryadarmaputra.com.
---

# Build Loop

Guardrails run in sequence. Each retries max 3x. Hard stop on new input mid-loop.
A later guardrail never runs until the earlier one is green.

## Sequence

| # | Gate | Command | On failure |
|---|---|---|---|
| G1 | Harness compliance | none — read diff + sections | list violations with file+line, fix all, re-run G1 from scratch |
| G2 | Lint | `bun run lint` | `bun run lint:fix`, then fix the rest by hand. Never disable a rule |
| G3 | Typecheck | `bun run typecheck` | fix types directly. Never `any` as an escape |
| G4 | Component tests | `bun run test:component` | fix code, not tests, unless the test is clearly wrong |
| G5 | E2E tests | `bun run test:e2e` | fix code, not tests |
| G6 | Build | `bun run build` | imports / exports / config only, no logic changes |
| G7 | Block screenshots | `bun run test:screenshots` | only when a Notion block renderer changed; review the PNGs, do not gate on them |

## G1 detail

Classify each changed file by path using `AGENTS.md` → Harness Refs. Load only
the matching sections. Never load a full doc when a section will do; never load
docs for unchanged paths.

Auto-fail (any one = FAIL):

- new `any` that is not an existing `biome-ignore`d Notion payload
- interpolated Tailwind / DaisyUI classname
- new Notion block renderer without a fixture, a component test and a
  `blockGallery` entry
- a page rendering more than one `<h1>`
- data fetching inside a component instead of a service
- a test-only route not gated behind `ENABLE_TEST_ROUTES`
- secrets or `console.log` in `src/`

Doubt = fail.

## Before starting

`bun install`, then `bun run test:seed` if `src/_generated/` is empty — the
build and e2e need content and the real content is gitignored.

## Harness Docs

```
architecture → docs/harness/architecture.md
conventions  → docs/harness/conventions.md
testing      → docs/harness/testing.md
decisions    → docs/adr/README.md   (authoritative, overrides the harness)
```
