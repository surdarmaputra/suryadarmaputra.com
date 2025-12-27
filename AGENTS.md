# Project Agents Guide: suryadarmaputra.com

## Mission

Deliver a fast, accessible, and maintainable personal site with posts and projects, keeping content in sync, images optimized, and SEO artifacts up to date. Default to safe edits, small diffs, and zero-regression changes.

## Success Criteria (KPIs)

- **Availability**: builds pass and site serves without runtime errors
- **Performance**: no regressions to Core Web Vitals; images served optimized
- **Content freshness**: posts/projects generated from sources on demand; feeds and sitemaps current
- **Quality**: typecheck and lint clean; no console errors; routes render

## Architecture Decision Records (ADRs)

**CRITICAL: All agents MUST read and follow ALL ADRs from the `docs/adr/` directory.**

- **ADR Directory**: `docs/adr/`
- **ADR Index**: `docs/adr/README.md` - Lists all available ADRs
- **ADR Template**: `docs/adr/template.md` - Format for new ADRs

### ADR Reference Rules

1. **Before making any architectural decision**, check existing ADRs in `docs/adr/`
2. **When implementing features**, follow all relevant ADRs
3. **New ADRs added** to `docs/adr/` must be automatically considered
4. **ADRs are authoritative** - they override any other documentation
5. **If an ADR conflicts** with instructions, the ADR takes precedence

### Current ADRs

Check `docs/adr/README.md` for the complete, up-to-date list. As of this writing:
- ADR-001: Module-Based Architecture (defines module structure, routing patterns, core module)

## How to Run Locally

```bash
bun install
bun run dev
```

- App served by Astro dev server at `localhost:4321`
- Astro config: `astro.config.mjs`

### Useful Scripts

```bash
# Develop
bun run dev

# Build
bun run build

# Preview build locally
bun run preview

# Astro CLI
bun run astro ...
```

## Codebase Map (High-Level)

```
src/
├── pages/              # Route files ONLY (routing concerns)
│   └── *.astro        # Import page components from modules
├── modules/            # Feature modules (self-contained)
│   ├── core/          # Shared foundation
│   │   ├── components/  # Shared UI components
│   │   ├── utils/       # Shared utilities
│   │   ├── hooks/       # Shared hooks
│   │   ├── libs/        # Third-party integrations
│   │   ├── types.ts     # Shared types
│   │   └── constants.ts # Shared constants
│   └── {feature}/      # Feature modules (blog, project, etc.)
│       ├── components/  # Module-specific components
│       ├── pages/       # Page components (loaded by routes)
│       ├── services/     # Data fetching and business logic
│       ├── utils/       # Module-specific utilities
│       ├── hooks/       # Custom hooks
│       ├── libs/         # Module-specific integrations
│       ├── styles/       # Module-specific styles
│       ├── types.ts      # Module types
│       └── constants.ts  # Module constants
├── styles/
│   └── global.css      # Tailwind CSS + DaisyUI
└── ...

public/                 # Static assets
docs/                   # Documentation
└── adr/               # Architecture Decision Records
```

## Architecture Rules

**IMPORTANT: All architectural rules are defined in ADRs. Read the relevant ADRs from `docs/adr/` before implementing features.**

### Quick Reference

- **Module Structure**: See ADR-001 in `docs/adr/001-module-based-architecture.md`
- **Routing Pattern**: See ADR-001 in `docs/adr/001-module-based-architecture.md`
- **Core Module**: See ADR-001 in `docs/adr/001-module-based-architecture.md`

**Before implementing any feature:**
1. Check `docs/adr/README.md` for all available ADRs
2. Read relevant ADRs for architectural guidance
3. Follow the decisions documented in ADRs

## Conventions

- **Language**: TypeScript, Astro 5
- **Styling**: Tailwind CSS v4 + DaisyUI 5
- **Format/Lint**: Follow project linting rules
- **Imports**: Use relative paths or configure path aliases in `tsconfig.json`
- **Components**: Prefer Astro components; use framework components when needed

### Code Conventions

- Use kebab-case for file and folder names
- Name component identifiers with PascalCase
- Prefer named exports
- Use `type` aliases instead of `interface` when possible
- Follow a11y and semantic HTML best practices
- Fix code to satisfy linter rules; do not disable rules

## Guardrails for Agents

### Architecture Enforcement

- **ALWAYS** read relevant ADRs from `docs/adr/` before making architectural decisions
- **ALWAYS** follow the decisions and rules defined in ADRs
- **NEVER** violate architectural patterns documented in ADRs
- **ALWAYS** check `docs/adr/README.md` for the complete list of ADRs
- If you need to deviate from an ADR, create a new ADR first

### Code Reuse Priority

- **ALWAYS** check `src/modules/core/` first before creating new components, utilities, or hooks
- **PRIORITIZE** reusing existing implementations from the core module
- **ONLY** create new code if it's obviously specific to a feature module
- **BEFORE** creating anything new:
  1. Search the core module for existing implementations
  2. Check if existing code can be extended or reused
  3. Consider if the new code should be in core (if reusable) or module-specific
- **AVOID** duplicating functionality that already exists in core

### Code Quality

- Run `bun run build` before proposing non-trivial edits
- Do not commit large assets; place static files in `public/` if needed
- Prefer additive, backward-compatible changes
- If removing code, verify no route or import breaks
- Keep SEO endpoints healthy: update feed/sitemap when adding or renaming routes/content

### ADR Compliance

- **MANDATORY**: Read relevant ADRs from `docs/adr/` before implementing any feature
- Check `docs/adr/README.md` for all available ADRs
- ADRs are the single source of truth for architectural decisions
- Follow ADR decisions strictly - they override any other documentation
- If you need to deviate from an ADR, create a new ADR first

## Common Tasks

**Note**: For detailed implementation patterns, refer to the relevant ADRs in `docs/adr/`.

### Adding a New Page

See ADR-001 for the routing pattern. General steps:
1. Read ADR-001 for module structure requirements
2. Create page component in appropriate module
3. Create route file that imports the page component

### Adding a New Module

See ADR-001 for module structure. General steps:
1. Read ADR-001 for required module structure
2. Create module directory with required folders
3. Follow the self-contained module pattern

### Adding Shared Components

See ADR-001 for core module structure. General steps:
1. Read ADR-001 for core module organization
2. **FIRST**: Check if a similar component already exists in `src/modules/core/components/`
3. If not found, add to appropriate location in `src/modules/core/`
4. Follow the shared component patterns

### Before Creating New Code

**ALWAYS follow this priority:**
1. **Check core module first** - Search `src/modules/core/` for existing implementations
2. **Reuse or extend** - Can existing code be adapted or extended?
3. **Evaluate placement** - Should this be in core (reusable) or module-specific?
4. **Create only if necessary** - Only create new code if it's obviously module-specific or doesn't exist

## Troubleshooting

- **Build fails**: Check for missing imports, verify structure matches ADRs in `docs/adr/`
- **Route not working**: Read ADR-001 for routing patterns, verify route file follows the pattern
- **Component not found**: Check import path, verify component exists in correct module per ADR-001
- **Architecture violations**: Review relevant ADRs in `docs/adr/` and ensure compliance
- **Unclear implementation**: Read the relevant ADR for detailed guidance

## References

- **ADRs**: `docs/adr/` - Architecture Decision Records
- **ADR Index**: `docs/adr/README.md`
- **Project Documentation**: `docs/README.md`
- **Astro Docs**: https://docs.astro.build
- **DaisyUI Docs**: https://daisyui.com

