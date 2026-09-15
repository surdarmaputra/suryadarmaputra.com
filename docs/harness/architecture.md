# Architecture

ADRs in `docs/adr/` are authoritative. This file is the map; the ADRs are the
rules.

## Layers {#layers}

| Layer | Path | Responsibility |
|---|---|---|
| Route | `src/pages/` | Routing only. Imports one page component, nothing else |
| Page | `src/modules/*/pages/` | Composes a full page from components + services |
| Component | `src/modules/*/components/` | Presentation. No data fetching |
| Service | `src/modules/*/services/` | Reads generated JSON, returns typed domain data |
| Lib | `src/modules/core/libs/` | Third-party integrations (Notion, analytics) |
| Util | `src/modules/*/utils/` | Pure functions, no I/O |

See ADR-001 (`docs/adr/001-module-based-architecture.md`).

## Structure {#structure}

```
src/
  pages/                     routes only
  modules/
    core/                    shared foundation — check here before creating anything
      components/base/       DaisyUI wrappers (button, badge, card, icon, …)
      components/layouts/    page-layout, header, footer, page-header
      libs/notion/           block renderers + Notion client/utils
      styles/global.css      Tailwind v4 + DaisyUI theme and custom utilities
    article/ project/ introduction/
scripts/                     Notion fetch → src/_generated (run manually)
tests/                       fixtures, component, e2e, gallery, screenshots
docs/adr/                    authoritative decisions
docs/harness/                this harness
```

## Data flow {#data-flow}

```
Notion API
  └─ scripts/fetch-*.ts        (bun run generate — needs NOTION_TOKEN)
       └─ src/_generated/data/ (gitignored JSON) + public/images/
            └─ services/       load + transform to domain types
                 └─ pages/     render
                      └─ libs/notion/blocks-renderer.astro → blocks/*.astro
```

Nothing at build time calls Notion. Tests replace the `src/_generated/` step
with `bun run test:seed` (see `testing.md#fixtures`).

## Notion block rendering {#block-rendering}

`blocks-renderer.astro` switches on `block.type` and delegates to one component
per block in `blocks/`. It passes itself as `renderChildren` so nested blocks
recurse. Unsupported block types render nothing — silently, by design.

`regroupListItems()` (`libs/notion/utils.ts`) wraps consecutive
`*_list_item` blocks in synthetic `bulleted_list` / `numbered_list` blocks
before rendering, which is why `list.astro` receives a block with no payload
and reads its items from `children`.

## Import rules {#import-rules}

- Routes import page components only
- Feature modules may import from `core`; `core` never imports from a feature
  module
- Feature modules do not import from each other, except page-level composition
  (e.g. the landing page pulling article and project sections)
- Relative imports only — no path aliases configured

## Boundaries {#boundaries}

- No data fetching in components; services own it
- No Notion types leaking past a service — services return module domain types
- No secrets outside `scripts/` and `.env`
