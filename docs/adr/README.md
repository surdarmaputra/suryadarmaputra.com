# Architecture Decision Records (ADR)

This directory contains Architecture Decision Records (ADRs) for the suryadarmaputra.com project.

## What is an ADR?

An Architecture Decision Record is a document that captures an important architectural decision made along with its context and consequences. ADRs help us:

- Understand why certain decisions were made
- Maintain consistency across the codebase
- Onboard new team members
- Revisit decisions when context changes

## ADR Format

All ADRs follow a standard format with the following sections:

- **Status**: The current state of the decision (Proposed, Accepted, Deprecated, Superseded)
- **Context**: The issue or challenge that motivated the decision
- **Decision**: The solution or approach chosen
- **Consequences**: The positive and negative impacts of the decision

See [template.md](./template.md) for the ADR template.

## ADR Index

| ADR | Title | Status |
|-----|-------|--------|
| [001](./001-module-based-architecture.md) | Module-Based Architecture | Accepted |
| [002](./002-accessibility-semantic-html.md) | Accessibility and Semantic HTML Guidelines | Accepted |
| [003](./003-tailwind-css-styling-guidelines.md) | Tailwind CSS Styling Guidelines | Accepted |

## Creating a New ADR

1. Copy `template.md` to a new file: `docs/adr/XXX-descriptive-title.md`
2. Replace `XXX` with the next sequential number
3. Fill in all sections following the template
4. Update this README to include the new ADR in the index
5. Set initial status to "Proposed" for review

## Status Definitions

- **Proposed**: Decision is under consideration
- **Accepted**: Decision has been approved and is being implemented
- **Deprecated**: Decision is no longer in use but kept for historical reference
- **Superseded**: Decision has been replaced by another ADR (reference the new ADR)

