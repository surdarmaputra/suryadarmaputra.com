# suryadarmaputra.com

Personal website built with [Astro](https://astro.build), sourcing content from Notion.

## How it works

Content (articles and projects) is pulled from Notion at build time and rendered as a static site.

```
Netlify build
  └─ bun run generate   # fetch Notion data → src/_generated/
  └─ bun run build      # Astro → dist/
```

The `src/_generated/` directory is never committed — it is created fresh on every build.

## Local development

```sh
bun install
cp .env.example .env   # fill in your Notion credentials
bun run generate       # fetch content from Notion
bun dev                # start dev server at localhost:4321
```

Required environment variables:

| Variable | Description |
| --- | --- |
| `NOTION_TOKEN` | Notion integration token |
| `NOTION_ARTICLES_DATABASE_ID` | Notion database ID for articles |
| `NOTION_PROJECTS_DATABASE_ID` | Notion database ID for projects |
| `BASE_URL` | Public URL of the site (e.g. `https://suryadarmaputra.com/`) |

## Commands

| Command | Action |
| --- | --- |
| `bun install` | Install dependencies |
| `bun run generate` | Fetch content from Notion |
| `bun dev` | Start local dev server |
| `bun run build` | Build production site to `./dist/` |
| `bun run preview` | Preview the production build locally |
| `bun run lint` | Check code with Biome |
| `bun run lint:fix` | Auto-fix lint issues |
| `bun run typecheck` | Typecheck with `astro check` |
| `bun run test` | Component tests then e2e tests |
| `bun run test:component` | Notion block renderer tests (Vitest) |
| `bun run test:e2e` | Page tests (Playwright) |
| `bun run test:screenshots` | Capture one PNG per Notion block |
| `bun run test:seed` | Write fixture content into `src/_generated/` |

## Testing

Tests never call Notion. `bun run test:seed` writes deterministic fixture
content into `src/_generated/` and `public/images/`, and the Playwright config
seeds, builds and previews the site on its own — so `bun run test` works on a
clean checkout with no credentials.

See [`docs/harness/testing.md`](./docs/harness/testing.md), and
[`AGENTS.md`](./AGENTS.md) for the guardrail sequence agents must follow.

## Rebuilding articles

Articles and projects are fetched from Notion at build time. To publish new or updated content:

1. Go to the [Netlify dashboard](https://app.netlify.com)
2. Open the site → **Deploys**
3. Click **Trigger deploy → Deploy site**

Netlify will re-run `bun run generate` (fetching the latest Notion content) followed by `bun run build`.
