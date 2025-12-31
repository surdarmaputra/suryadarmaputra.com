# ADR-003: Tailwind CSS Styling Guidelines

## Status

Accepted

## Context

The project uses Tailwind CSS v4 with DaisyUI for styling. Without strict guidelines, developers and AI agents may:
- Create custom CSS classes when Tailwind utilities would suffice
- Duplicate existing custom utilities
- Use inconsistent approaches for custom styling
- Miss opportunities to leverage Tailwind's JIT compiler and utility system
- Create larger CSS bundles than necessary

We need consistent, enforceable rules for when and how to use Tailwind utilities, custom utilities, and the `@apply` directive to ensure:
- Smaller CSS bundles through better JIT compilation
- Consistent styling patterns across the codebase
- Easier maintenance through reusable utilities
- Better performance through utility-first approach

## Decision

We will enforce strict Tailwind CSS styling guidelines throughout the codebase:

### 1. Priority Order for Styling

**Priority 1: Use Tailwind Utility Classes Directly**

Always prefer Tailwind utility classes in component markup. This ensures optimal JIT compilation and smaller CSS bundles.

**Priority 2: Create Reusable Custom Utilities**

If a styling pattern is needed across multiple components and cannot be achieved with existing Tailwind utilities, create a reusable utility using the `@utility` directive in `src/modules/core/styles/global.css`.

**Priority 3: Component-Specific CSS Classes**

Only create regular CSS classes (without `@utility` directive) when the styling is truly specific to a single component and will not be reused elsewhere.

### 2. Custom Utility Creation Rules

**When to Create a Custom Utility (`@utility` directive):**
- The styling pattern is used in multiple components
- The pattern cannot be achieved with existing Tailwind utilities
- The pattern represents a reusable design pattern (e.g., `hover-lift`, `scroll-reveal`)

**When NOT to Create a Custom Utility:**
- A Tailwind utility class already exists for the use case
- The styling is specific to a single component only
- The pattern is a one-off that won't be reused

**Before Creating:**
1. Check `src/modules/core/styles/global.css` for existing custom utilities
2. Verify no Tailwind utility exists for the use case
3. Confirm the pattern will be reused across components

### 3. Use `@apply` Directive

**Always use `@apply` directive** when creating custom utilities or classes. This ensures:
- Consistency with Tailwind's utility system
- Better JIT compilation
- Easier maintenance and refactoring

**Exception:** Only use direct CSS properties when Tailwind utilities don't exist for specific values (e.g., custom box-shadow values, complex animations).

### 4. Component-Specific Classes

For component-specific styling that won't be reused:
- Use regular CSS classes (not `@utility` directive)
- Still use `@apply` directive for Tailwind utilities within the class
- Place in component-specific style blocks or module-specific stylesheets

### 5. Inline Style Restrictions

**Rule: Avoid Inline Styles**

Inline styles (using the `style` attribute) should be avoided in favor of CSS classes and utilities. This ensures:
- Better maintainability and consistency
- Proper JIT compilation by Tailwind
- Easier refactoring and theme changes
- Better separation of concerns

**Exception: CSS Custom Properties (CSS Variables)**

CSS custom properties set via the `style` attribute are acceptable when dynamic values are needed that cannot be predetermined. This is the only acceptable use of the `style` attribute.

**Example:**
```astro
<!-- ✅ GOOD: Using CSS custom property for dynamic rotation -->
<div class="badge-tilt" style={`--badge-tilt: ${tilt}deg;`}>
  <Badge />
</div>

<!-- ❌ BAD: Direct inline style -->
<div style={`transform: rotate(${tilt}deg);`}>
  <Badge />
</div>
```

**When to Use CSS Custom Properties:**
- Dynamic values that vary per item (e.g., random rotation angles, calculated positions)
- Values that depend on runtime data or calculations
- When creating a reusable utility that accepts a CSS variable

**When NOT to Use Inline Styles:**
- Static values that can be predetermined
- Values that follow a pattern (use utility classes with mapping)
- Animation/transition delays (use delay utility classes)
- Colors, spacing, or other design tokens (use Tailwind utilities)

## Consequences

### Positive

- **Smaller CSS Bundles**: Better JIT compilation means only used utilities are included
- **Consistency**: Reusable utilities ensure consistent styling patterns
- **Maintainability**: Centralized custom utilities in `global.css` are easier to maintain
- **Performance**: Utility-first approach reduces CSS size and improves load times
- **Developer Experience**: Clear rules reduce decision fatigue
- **Code Reuse**: Custom utilities prevent duplication of styling patterns

### Negative

- **Requires Discipline**: Developers must check for existing utilities before creating new ones
- **Learning Curve**: Team members need to understand Tailwind v4 `@utility` syntax
- **Potential Refactoring**: Existing code may need updates to follow guidelines
- **Decision Overhead**: Need to evaluate whether to create utility vs. use component-specific class

### Mitigation

- Provide clear documentation and examples in this ADR
- Reference implementation in `src/modules/core/styles/global.css`
- Quick reference guide in `AGENTS.md`
- Code reviews to ensure adherence
- Automated linting where possible

## Guidelines for Implementation

### Rule 1: Use Tailwind Utilities Directly

```astro
<!-- ✅ GOOD: Using Tailwind utilities directly -->
<div class="flex items-center justify-between p-4 bg-base-100 rounded-lg">
  <h2 class="text-2xl font-bold">Title</h2>
  <button class="btn btn-primary">Action</button>
</div>

<!-- ❌ BAD: Creating custom class when Tailwind utilities exist -->
<div class="custom-card">
  <h2 class="custom-title">Title</h2>
  <button class="custom-button">Action</button>
</div>
<style>
  .custom-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background-color: var(--color-base-100);
    border-radius: 0.5rem;
  }
</style>
```

### Rule 2: Create Reusable Utilities with `@utility` and `@apply`

```css
/* ✅ GOOD: Reusable utility using @utility and @apply */
@utility hover-lift {
  @apply transition-[transform,box-shadow] duration-300 ease-in-out;
}

@layer utilities {
  .hover-lift:hover {
    @apply -translate-y-1 shadow-lg;
  }
}

/* ❌ BAD: Not using @apply directive */
@utility hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
```

### Rule 3: Component-Specific Classes (No `@utility`)

```astro
<!-- ✅ GOOD: Component-specific class for single-use styling -->
<div class="hero-gradient">
  <h1>Welcome</h1>
</div>
<style>
  .hero-gradient {
    @apply relative overflow-hidden;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  }
</style>

<!-- ❌ BAD: Using @utility for component-specific styling -->
<!-- In global.css -->
@utility hero-gradient {
  @apply relative overflow-hidden;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
}
```

### Rule 4: Check for Existing Utilities Before Creating

```css
/* ✅ GOOD: Check global.css first, then create if needed */
/* If hover-lift already exists, reuse it instead of creating hover-raise */

/* ❌ BAD: Creating duplicate utility without checking */
@utility hover-raise {
  @apply transition-transform duration-300;
}
.hover-raise:hover {
  @apply -translate-y-1;
}
/* This duplicates existing hover-lift utility */
```

### Rule 5: Use `@apply` for All Tailwind Utilities

```css
/* ✅ GOOD: Using @apply for Tailwind utilities */
@utility scroll-reveal {
  @apply opacity-0 translate-y-8 transition-[opacity,transform] duration-[600ms] ease-out;
}

@layer utilities {
  .scroll-reveal.revealed {
    @apply opacity-100 translate-y-0;
  }
}

/* ❌ BAD: Not using @apply */
@utility scroll-reveal {
  opacity: 0;
  transform: translateY(2rem);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
```

### Exception: Direct CSS for Non-Utility Values

```css
/* ✅ GOOD: Using direct CSS when Tailwind utility doesn't exist for specific value */
@layer utilities {
  .hover-lift:hover {
    @apply -translate-y-1;
    /* Custom box-shadow value not available as Tailwind utility */
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
}
```

## Reference Implementation

See `src/modules/core/styles/global.css` for examples of:
- Custom utilities using `@utility` directive
- Proper use of `@apply` directive
- Hover states in `@layer utilities`
- Component-specific classes (ornament classes)

## Workflow Checklist

Before creating any custom styling:

1. ✅ Check if Tailwind utility exists for the use case
2. ✅ Check `src/modules/core/styles/global.css` for existing custom utilities
3. ✅ Determine if styling will be reused (utility) or single-use (component class)
4. ✅ Use `@utility` directive for reusable patterns
5. ✅ Use `@apply` directive for all Tailwind utilities
6. ✅ Place reusable utilities in `src/modules/core/styles/global.css`
7. ✅ Place component-specific classes in component style blocks
8. ✅ Avoid inline styles; use CSS classes/utilities instead
9. ✅ For dynamic values, use CSS custom properties with utility classes

## References

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS @utility Directive](https://tailwindcss.com/docs/utility-directives)
- [Tailwind CSS @apply Directive](https://tailwindcss.com/docs/functions-and-directives#apply)
- Reference Implementation: `src/modules/core/styles/global.css`

