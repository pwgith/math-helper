# Implement Feature

## Purpose

Guide the implementation of a feature in Next.js by translating the specification (use case, Gherkin feature file) and UI mockup into working application code.

## Required Reading

Before implementing a feature, review the following instruction files **in order**:

1. **`.github/instructions/next.js.instructions.md`** — Primary reference. Defines the App Router conventions, component patterns, server/client boundaries, data fetching, error handling, and project scaffold. Follow this file exactly when creating routes, pages, layouts, and components.
2. **`.github/instructions/codingStandard.instructions.md`** — Supplies naming conventions, TypeScript rules, React component patterns, project structure, and testing guidelines. All implementation code must conform to these standards.
3. **`.github/instructions/uiDesign.instructions.md`** — Defines the design system, component classes, colour palette, typography, spacing, and responsive breakpoints. The implementation must faithfully reproduce the visual design from the HTML mockup using the design system's Tailwind classes.
4. **`.github/instructions/feature.instructions.md`** — Describes the Gherkin feature format and traceability model. Use the scenarios and example data to understand the expected behaviour and edge cases the implementation must support.
5. **`.github/instructions/useCase.instructions.md`** — Describes the use case structure, flows, and business rules. The implementation must satisfy every flow (main, alternative, exception) documented in the use case.

## Steps

1. Read each instruction file listed above.
2. Read the **use case** file provided as input. Identify the actor, main flow, alternative flows, exception flows, business rules, and postconditions.
3. Read the **feature file(s)** linked to the use case. Extract the scenarios, example data, and expected outcomes — these define the acceptance criteria the implementation must satisfy.
4. Read the **HTML mockup** linked to the use case (in `./design/ui/`). Study the layout, component structure, interactive states (default, loading, result, error), and responsive behaviour.
5. Plan the implementation:
   - Identify the **route(s)** needed under `src/app/` (page, layout, loading, error files).
   - Identify **components** to extract into `src/components/` or `src/components/ui/` for reusability.
   - Identify any **types/interfaces** to define in `src/types/`.
   - Identify any **utility functions** or **business logic** to place in `src/lib/`.
   - Identify any **custom hooks** to place in `src/hooks/`.
   - Identify any **constants** to place in `src/constants/`.
6. Implement the feature:
   - Create the page route under `src/app/` following App Router conventions (`page.tsx` with default export).
   - Build components as **functional components** with typed props interfaces. Use **named exports** for non-page components.
   - Translate the HTML mockup's Tailwind classes and design system components into React/JSX, preserving the visual design exactly.
   - Implement all interactive behaviour: form handling, input validation, state transitions (default → loading → result/error), and calculations.
   - Handle all **alternative flows** (e.g., switching modes, recalculating) and **exception flows** (e.g., validation errors, empty states) from the use case.
   - Use `"use client"` only for components that require client-side interactivity (event handlers, state, effects). Keep components server-rendered by default.
   - Ensure **accessibility**: semantic HTML, ARIA attributes, keyboard navigation, and focus management matching the mockup.
   - Ensure **responsive behaviour**: mobile-first design working at 320px, 768px, and 1024px+ breakpoints.
7. Verify against the feature file scenarios — every scenario and example row should produce the documented expected outcome.
8. Verify against the use case — every flow (main, alternative, exception) and business rule should be supported.
9. Verify against the mockup — the implemented UI should visually match the HTML mockup at all breakpoints.

## Inputs

When invoking this prompt, provide:

- **Use case** — Path to the use case file (e.g., `specification/useCases/user/calculatePercentage.md`).
- **Feature file** *(optional)* — Path to the feature file if not discoverable from the use case's `## Features` table.
- **UI Mockup** *(optional)* — Path to the HTML mockup if not linked in the use case's `## UI Reference` section.
- **Scope** *(optional)* — Limit to specific flows if you do not want full implementation (e.g., "main flow only", "UI shell without logic").
- **Additional context** *(optional)* — Any extra technical constraints, API details, or implementation notes.
