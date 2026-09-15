# Testing

## Stack

| Layer | Tool | Location |
|---|---|---|
| Component | Vitest + Astro Container API | `tests/component/**/*.test.ts` |
| E2E | Playwright (Chromium) | `tests/e2e/**/*.spec.ts` |
| Screenshots | Playwright | `tests/screenshots/**/*.screenshot.ts` |
| Fixtures | Plain TS factories | `tests/fixtures/` |

No unit-test layer today. Pure helpers in `src/modules/*/utils/` are covered
indirectly through component and e2e tests.

## Commands

```bash
bun run test:seed         # write fixture content into src/_generated + public/images
bun run test:component    # vitest, no browser, no server
bun run test:e2e          # playwright; seeds + builds + previews automatically
bun run test:screenshots  # one PNG per block into tests/screenshots/output/
bun run test              # component then e2e
```

`test:e2e` and `test:screenshots` run their own webServer
(`test:seed` → `ENABLE_TEST_ROUTES=true astro build` → `astro preview`), so no
Notion credentials are needed.

## Fixture data {#fixtures}

`src/_generated/` is produced from Notion and gitignored, so tests never depend
on it. `tests/fixtures/seed-generated-data.ts` writes deterministic stand-ins:

- 2 articles — `block-showcase-article` (every block type) and
  `second-test-article` (prev/next navigation)
- 2 projects — `project-alpha` (personal) and `project-beta` (kargo), so the
  company grouping and related-projects logic have something to group
- placeholder images copied from `tests/fixtures/placeholder-image.png`

Changing a fixture changes what e2e asserts. Update `tests/e2e/routes.ts` when
adding or renaming a fixture page.

## Component conventions {#component-conventions}

- One file per block renderer: `tests/component/notion/<block>.test.ts`
- Render through `renderComponent()` from `tests/component/notion/render.ts` —
  it wraps the component in `host.astro` so components that `return null`
  behave as they do inside `blocks-renderer.astro`, and strips Astro's dev-only
  `data-astro-source-*` attributes
- Use `textContent(html)` for Shiki-highlighted output; token spans break
  substring assertions
- Assert the rendered tag, the classes that carry the visual contract, and the
  text. Assert `""` for blocks that must render nothing
- Build blocks with the factories in `tests/fixtures/notion-blocks.ts`, never
  hand-rolled literals

## E2E conventions {#e2e-conventions}

- One spec per page or flow, named after the page
- Cross-page invariants (title, single `h1`, landmarks, console errors, meta
  description) live in `tests/e2e/pages.spec.ts` and iterate `PAGE_ROUTES`
- Prefer roles and semantic selectors over class names
- Third-party requests (fonts, analytics) are excluded from the console-error
  check — they are unreachable offline
- `.scroll-reveal` items start at `opacity: 0`; call `scrollIntoViewIfNeeded()`
  before asserting visibility

## Adding a new Notion block renderer {#new-block}

1. Add the renderer under `src/modules/core/libs/notion/blocks/`
2. Add a `case` to `blocks-renderer.astro`
3. Add a factory + a `blockGallery` entry in `tests/fixtures/notion-blocks.ts`
4. Add `tests/component/notion/<block>.test.ts`
5. Add assertions to `tests/e2e/notion-blocks.spec.ts`
6. `bun run test:screenshots` → review `tests/screenshots/output/<block>.png`

`blockGallery` drives the gallery page, the screenshot runner, the
"renders every block type" component test and the seeded article, so step 3 is
what wires a new block into all of them.

## Test-only routes {#test-routes}

`/__test/notion-blocks` renders the gallery. It is injected by the
`testRoutes()` integration in `astro.config.mjs` only when
`ENABLE_TEST_ROUTES=true`, so it never reaches a production build. Keep all
test-only routes behind that flag.

## Sandboxed environments

Set `PLAYWRIGHT_CHROMIUM_PATH` to an existing Chromium binary when
`playwright install` is unavailable. Leave it unset locally and in CI.
