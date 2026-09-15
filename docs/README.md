# Documentation

This directory contains all project documentation.

## Structure

```
docs/
├── README.md           # This file
├── adr/               # Architecture Decision Records
│   ├── README.md       # ADR index and guidelines
│   ├── template.md     # ADR template
│   └── 001-*.md        # Individual ADRs
└── harness/           # Agent harness (loaded by AGENTS.md)
    ├── architecture.md # Layers, structure, data flow, boundaries
    ├── conventions.md  # Naming, components, styling, a11y, Notion blocks
    └── testing.md      # Test stack, fixtures, conventions, adding a block
```

## Agent harness

`AGENTS.md` at the repo root is the entry point for coding agents. It maps
changed file paths to the harness sections that apply and defines the guardrail
sequence (G1-G7). ADRs override the harness wherever they disagree.

## Architecture Decision Records (ADR)

Architecture Decision Records document important architectural decisions made during the project. They help maintain consistency and provide context for future development.

See [adr/README.md](./adr/README.md) for more information.

## Contributing

When adding new documentation:

1. Follow the established structure
2. Use clear, concise language
3. Keep documentation up to date with code changes
4. Reference relevant ADRs when making architectural decisions

