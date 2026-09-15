# Conventions

## Naming {#naming}

| Thing | Style |
|---|---|
| Files and folders | kebab-case |
| Component identifiers | PascalCase |
| Functions and variables | camelCase |
| Types | PascalCase, prefer `type` over `interface` |
| Exports | named exports (Astro components excepted) |

## Component {#component}

- Prefer `.astro`; reach for a framework component only when client state
  genuinely demands it
- Props typed with a local `interface Props`
- Reusable UI goes in `src/modules/core/components/base/` as a thin DaisyUI
  wrapper — check DaisyUI before writing custom markup
- Single-use markup can stay inline; extract on the second repetition

## Styling {#styling}

ADR-003 is authoritative (`docs/adr/003-tailwind-css-styling-guidelines.md`).

- Tailwind utilities first; shared custom utilities via `@utility` in
  `global.css`; `@apply` inside them
- **Never** build a classname by interpolation — map full classnames:
  ```ts
  // bad: JIT cannot see this
  const cls = `btn-${variant}`;
  // good
  const cls = { primary: "btn-primary", ghost: "btn-ghost" }[variant];
  ```
  Reference: `src/modules/core/components/base/button.astro`
- Inline styles only for CSS custom properties carrying dynamic values

## Accessibility {#a11y}

ADR-002 is authoritative (`docs/adr/002-accessibility-semantic-html.md`).
Biome enforces the a11y rules at error level.

- Semantic elements over `div`/`span`
- Exactly one `<h1>` per page (the page header owns it); body content starts at
  `h2`
- Every image needs meaningful `alt`; every input needs a `<label>`
- Interactive means `<button>`/`<a>`, keyboard reachable, visible focus
- Never skip heading levels

## Services {#services}

- Read from `src/_generated/data/`, never from the network
- Return module domain types, not raw Notion shapes
- Transform in `utils/`, keep the service thin

## Notion blocks {#notion-blocks}

- One component per block type in `src/modules/core/libs/notion/blocks/`
- Guard first: `if (!("type" in block) || block.type !== "<type>") return null;`
- Shared extraction helpers live in `renderer-utils.ts`
- Accept `children` + `renderChildren` when the block can nest
- Every renderer needs a fixture, a component test and gallery coverage — see
  `testing.md#new-block`

## Imports {#imports}

- Relative paths; no aliases configured
- Biome sorts imports (`bun run lint:fix`)
- `import type` for type-only imports

## Linting {#linting}

- Fix code to satisfy Biome; do not disable rules
- `biome-ignore` only for the Notion `any` payloads that already carry one
- No `console.log` in `src/`
