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
- Follow a11y and semantic HTML best practices (see ADR-002)
- Fix code to satisfy linter rules; do not disable rules

### Styling Guidelines (Tailwind/DaisyUI)

**CRITICAL: Classname Construction Rule**

- **NEVER** use string interpolation for Tailwind/DaisyUI classnames
- **ALWAYS** use string mapping with full text classnames
- This ensures Tailwind/DaisyUI's JIT compiler can detect the classes and include them in the CSS

**Why This Matters:**
Tailwind/DaisyUI's JIT compiler scans source code for class names. Dynamically constructed classnames (using template literals) are not detected, so the CSS is not generated, resulting in missing styles.

**Examples:**

```typescript
// ❌ BAD: String interpolation - JIT compiler cannot detect these
const variantClass = `btn-${variant}`;
const sizeClass = `btn-${size}`;

// ✅ GOOD: String mapping with full classnames - JIT compiler can detect these
const variantClassMap: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
  // ... all variants with full classnames
};

const sizeClassMap: Record<ButtonSize, string> = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
  xl: "btn-xl",
};

const variantClass = variantClassMap[variant];
const sizeClass = sizeClassMap[size];
```

**Reference Implementation:**
See `src/modules/core/components/base/button.astro` for a complete example of proper classname mapping.

### Accessibility (A11y) Guidelines

**CRITICAL: All code MUST follow strict accessibility guidelines. See ADR-002 for detailed rules.**

#### Semantic HTML Requirements

- **ALWAYS** use semantic HTML elements:
  - `<header>` for site headers
  - `<nav>` for navigation
  - `<main>` for main content
  - `<article>` for standalone content
  - `<section>` for thematic grouping
  - `<aside>` for sidebar content
  - `<footer>` for footers
- **AVOID** generic `<div>` and `<span>` when semantic alternatives exist
- **MAINTAIN** proper heading hierarchy (h1 → h2 → h3, no skipping levels)
- **USE** appropriate semantic elements for content structure

#### Accessibility Requirements

- **Images**: ALL images MUST have descriptive `alt` attributes
  - Good: `<img src="photo.jpg" alt="A person reading a book in a library" />`
  - Bad: `<img src="photo.jpg" />` or `<img src="photo.jpg" alt="" />`
- **Forms**: ALL form inputs MUST have associated `<label>` elements
  - Good: `<label for="email">Email</label><input type="email" id="email" />`
  - Bad: `<input type="email" placeholder="Email" />`
- **Interactive Elements**: ALL interactive elements MUST be keyboard accessible
  - Use `<button>` for actions, not `<div>` with click handlers
  - Ensure focus indicators are visible
  - Maintain logical tab order
- **ARIA**: Use ARIA attributes when semantic HTML is insufficient
  - Use `aria-label` for icon-only buttons
  - Use `aria-describedby` for additional context
  - Use `role` attributes only when necessary
- **Keyboard Navigation**: ALL functionality MUST be accessible via keyboard
  - No mouse-only interactions
  - Proper focus management
  - Escape key closes modals/dropdowns

#### Examples

```html
<!-- Good: Semantic and accessible -->
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h1>Article Title</h1>
    <img src="photo.jpg" alt="Descriptive alt text" />
    <form>
      <label for="email">Email Address</label>
      <input type="email" id="email" name="email" required />
      <button type="submit">Submit</button>
    </form>
  </article>
</main>

<!-- Bad: Non-semantic and inaccessible -->
<div class="header">
  <div class="nav">
    <div class="link">Home</div>
  </div>
</div>
<div class="content">
  <div class="title">Article Title</div>
  <img src="photo.jpg" />
  <div class="form">
    <input type="email" placeholder="Email" />
    <div class="button" onclick="submit()">Submit</div>
  </div>
</div>
```

#### Enforcement

- BiomeJS linting enforces a11y rules at error level
- Pre-commit hooks prevent commits with a11y violations
- All a11y errors MUST be fixed before code can be committed
- See ADR-002 in `docs/adr/002-accessibility-semantic-html.md` for complete guidelines

## Guardrails for Agents

### Accessibility and Semantic HTML Enforcement

- **MANDATORY**: All code MUST follow strict accessibility guidelines (see ADR-002)
- **ALWAYS** use semantic HTML elements instead of generic divs/spans
- **ALWAYS** include alt text for images, labels for form inputs
- **ALWAYS** ensure keyboard accessibility for all interactive elements
- **NEVER** skip heading levels (h1 → h2 → h3)
- **NEVER** use non-interactive elements (div, span) for interactive functionality
- **ALWAYS** fix a11y linting errors before committing
- See "Accessibility (A11y) Guidelines" section below for detailed rules

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

### Component Creation Decision

- **If a similar component is needed multiple times in a page**, create a reusable component:
  1. **First**: Check if a DaisyUI component exists for this use case
  2. **If DaisyUI has it**: Create a wrapper component in `src/modules/core/components/base/` using the DaisyUI component
  3. **If DaisyUI doesn't have it**: Create a custom component following the same pattern
  4. **Example**: If buttons are used multiple times with similar styling/props, create a `Button` component wrapper around DaisyUI's `btn` class
- **Single use components** can remain inline, but if you find yourself repeating similar markup, extract it to a component

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

