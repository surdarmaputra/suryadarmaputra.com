## Project agents guide: suryadarmaputra.com

### Mission
Deliver a fast, accessible, and maintainable personal site with posts and projects, keeping content in sync, images optimized, and SEO artifacts up to date. Default to safe edits, small diffs, and zero-regression changes.

### Success criteria (KPIs)
- **Availability**: builds pass and site serves without runtime errors.
- **Performance**: no regressions to Core Web Vitals; images served optimized.
- **Content freshness**: posts/projects generated from sources on demand; feeds and sitemaps current.
- **Quality**: typecheck and lint clean; no console errors; routes render.

## How to run locally
```bash
bun install
bun run dev
```
- App served by React Router dev server. Vite config is in `vite.config.ts`.

### Useful scripts
```bash
# Develop
bun run dev

# Build (local)
bun run build

# Build for Netlify env
bun run build:netlify

# Start built server (after build)
bun run start

# Generate content
a) bun run generate              # posts + projects
b) bun run generate:posts        # only posts
c) bun run generate:posts:unpublished # include drafts
d) bun run generate:projects     # only projects

# Sync with Notion (server-side utilities)
bun run sync

# Quality gates
bun run typecheck
bun run lint
bun run lint:fix
bun run format:fix

# Versioning / commits
bun run versioning
bun run commit
```

## Deployment
- Primary: Netlify (`netlify.toml`). Build via `react-router build`; `build:netlify` sets `NETLIFY_DEPLOYMENT=true`.
- Output: build artifacts in `build/` (`client/` and `server/`).
- Serve locally with `bun run start` (uses `@react-router/serve`).

## Codebase map (high‑level)
- `app/`
  - `routes/` React Router file‑based routes (home, posts, works, sitemap, robots, api.optimize-image).
  - `modules/`
    - `posts/` pages, components, services (feed, list/detail fetch), styles.
    - `project/` list/detail, services.
    - `introduction/` landing/about sections.
    - `core/` base UI, layouts, scripts (analytics, color mode, notion components).
    - `image-optimizer/` component + service to return optimized images.
  - `libs/notion/` Notion integration utilities/types.
  - `styles/global.css` Tailwind CSS v4 pipeline via PostCSS.
- `posts/`, `extras/` generated content sources.
- `public/` static assets.
- `scripts/` data fetchers and sync utilities.

## Conventions
- **Language**: TypeScript, React 19, React Router 7.
- **Styling**: Tailwind CSS (PostCSS pipeline). Keep classes ordered; use `prettier-plugin-tailwindcss`.
- **Format/Lint**: Prettier + ESLint strict. Fix before commit.
- **Imports**: favor absolute paths per `tsconfig.json` paths and `vite-tsconfig-paths`.
- **Components**: prefer small, pure components; memoize expensive UI; avoid inline styles when Tailwind exists.
- **UI library**: prefer shadcn or shadcn-like component libraries for UI primitives.

### Code conventions
- Use kebab-case for file and folder names (including React component files).
- Name React component identifiers with PascalCase inside files.
- Prefer constants for value lists: use `const VALUE = {one: 'one', two: 'two'} as const` and derive types, instead of union types or enums.
- Export a single public item per file; keep helpers internal.
- Prefer named exports.
- Use `type` aliases instead of `interface`.
- Follow a11y and semantic HTML best practices.
- Fix code to satisfy linter rules; do not disable rules.
- When touching legacy code, align it with these conventions.

### Module structure
- `components/` React components
- `pages/` components loaded by the router
- `services/` data retrieval; group related APIs in subfolders
- `styles/` CSS files
- `utils/` utilities and helpers
- `hooks/` custom React hooks

Other than these folders, a module may only contain: `constants.ts` and `types.ts`.

## Content & data
- Posts and projects are generated from external sources into `posts/` and `extras/projects.json` via scripts.
- Posts feed at `routes/posts.feed.ts`; sitemap at `routes/sitemap[.xml].ts`; robots at `routes/robots[.txt].ts`.
- Image optimization via `app/modules/image-optimizer/services/ImageOptimizerService/getOptimizedImage.ts` and `routes/api.optimize-image.ts`.

## Guardrails for agents
- Run `bun run typecheck && bun run lint` before proposing non‑trivial edits.
- Do not commit large assets; place static files in `public/` if needed.
- Prefer additive, backward‑compatible changes. If removing code, verify no route or import breaks.
- Keep SEO endpoints healthy: update feed/sitemap when adding or renaming routes/content.
- Respect environment conditionals (e.g., `NETLIFY_DEPLOYMENT`) when altering build/runtime logic.

## Common tasks
- **Add a blog post**: update source, run `bun run generate` → verify `routes/posts._index.tsx` and `posts.$slug.tsx` render.
- **Add a project**: update `extras/projects.json` or source → `bun run generate:projects` → verify `routes/works._index.tsx` and `works.$slug.tsx`.
- **Optimize an image**: use `OptimizedImage` component; the API route handles transforms.
- **Release housekeeping**: `bun run versioning`, ensure CHANGELOG updates; deploy via Netlify.

## Troubleshooting
- Build fails on Netlify: ensure Node ≥ 20 and `NETLIFY_DEPLOYMENT` logic not regressing.
- Missing content: re‑run `bun run generate` or `bun run sync` and confirm files exist.
- CSS issues: confirm Tailwind/PostCSS versions match and `global.css` imports remain intact.
