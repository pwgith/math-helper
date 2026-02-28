# Project Instructions

## Purpose

This is the master instruction file. It explains how all project instruction files fit together, when to use each one, and the order in which work should proceed. **Read this file first before doing any work on the project.**

---

## Before You Start — Required Reading

Before beginning **any** task, confirm you have read and understood the relevant instruction files. Follow this protocol:

1. **Always read this file first** to understand which instructions apply to your task.
2. **Read every instruction file listed as relevant** to the task at hand (see the table and workflow below).
3. **Confirm** that you have read and understood the applicable instructions before writing any output. State which files you have read by name.

> **AI agents**: Before starting work, list the instruction files you have read and briefly confirm your understanding of the key rules from each. Do not begin producing deliverables until this confirmation step is complete.

---

## Instruction Files

All instruction files live in `.github/instructions/`. Each file covers a specific concern:

| File | Purpose | When to use |
|---|---|---|
| `instructions.md` | **This file.** Master index and workflow guide. | Always — read first for every task. |
| `codingStandard.instructions.md` | Naming conventions, TypeScript rules, project structure, imports, testing, git, linting, and all general coding practices. | Any task that involves writing or reviewing code, creating files, or naming anything. |
| `uiDesign.instructions.md` | Design system — Tailwind component classes, colour palette, typography, spacing, responsive breakpoints, animations, and HTML mockup requirements. | Designing UI, creating mockups, building front-end components, or reviewing visual output. |
| `useCase.instructions.md` | Use case authoring — template, structure, actor definitions, ID scheme, traceability to features and UI mockups. | Writing, reviewing, or updating use cases. |
| `feature.instructions.md` | Gherkin feature file authoring — scenario writing, specification by example, unique IDs, traceability back to use cases, file organisation. | Writing, reviewing, or updating feature/scenario specifications. |
| `next.js.instructions.md` | Next.js best practices — App Router, Server/Client Components, data fetching, API routes, metadata, middleware, performance, security, deployment. | Building or reviewing Next.js application code. |

---

## Project Structure Overview

```
.github/
  instructions/             # All instruction files (this folder)
specification/
  useCases/                 # Use case documents grouped by actor
  features/                 # Gherkin feature files grouped by area
design/
  ui/                       # HTML mockups (one per UI page)
src/                        # Application source code (Next.js)
```

---

## Workflow — How the Instructions Fit Together

Work flows through these phases. Each phase has a primary instruction file, but the coding standard applies at all times.

### Phase 1: Specification

**Goal**: Define what the system should do.

1. **Define actors** — Create `specification/useCases/actors.md` listing all user types.
   - Follow: `useCase.instructions.md`

2. **Write use cases** — One file per use case, grouped by actor under `specification/useCases/`.
   - Follow: `useCase.instructions.md`, `codingStandard.instructions.md` (file naming)

3. **Write feature files** — Translate use cases into Gherkin scenarios under `specification/features/`.
   - Follow: `feature.instructions.md`, `useCase.instructions.md` (for traceability IDs)
   - Back-link feature/scenario IDs into the originating use cases.

### Phase 2: Design

**Goal**: Define what the system looks like.

4. **Create UI mockups** — One self-contained HTML file per page under `design/ui/`.
   - Follow: `uiDesign.instructions.md`, `codingStandard.instructions.md` (file naming)
   - Link mockups from the relevant use cases (`## UI Reference` section).

### Phase 3: Implementation

**Goal**: Build the system.

5. **Build the Next.js application** — Implement pages, components, API routes, and logic under `src/`.
   - Follow: `next.js.instructions.md`, `codingStandard.instructions.md`, `uiDesign.instructions.md` (design system classes)
   - Reference use cases and feature files as the specification for what to build.

### Phase 4: Verification

**Goal**: Confirm the system works as specified.

6. **Test against feature files** — Use the Gherkin scenarios as the acceptance criteria.
   - Follow: `feature.instructions.md`, `codingStandard.instructions.md` (testing section)

---

## Which Instructions Apply to Each Task?

| Task | Required reading |
|---|---|
| Writing a use case | `useCase.instructions.md`, `codingStandard.instructions.md` |
| Writing feature/scenario files | `feature.instructions.md`, `useCase.instructions.md`, `codingStandard.instructions.md` |
| Creating a UI mockup | `uiDesign.instructions.md`, `codingStandard.instructions.md` |
| Building a page or component | `next.js.instructions.md`, `codingStandard.instructions.md`, `uiDesign.instructions.md` |
| Creating an API route | `next.js.instructions.md`, `codingStandard.instructions.md` |
| Writing tests | `codingStandard.instructions.md`, `feature.instructions.md` |
| Reviewing any deliverable | All files relevant to the deliverable type |
| Starting a new task (any) | `instructions.md` (this file) + applicable files from above |

---

## Key Rules (Quick Reference)

These rules come from the individual instruction files. Refer to the source file for full detail.

- **File naming**: camelCase everywhere (`codingStandard.instructions.md`).
- **One file per concern**: one use case per file, one feature per logical group, one mockup per page.
- **Traceability**: use cases link to features (IDs), features link back to use cases (tags), mockups are referenced from use cases.
- **Specification by example**: Gherkin scenarios use concrete values, test one behaviour, stay lean.
- **Server Components by default**: only add `"use client"` when necessary (`next.js.instructions.md`).
- **Design system first**: use the defined Tailwind component classes; don't invent ad-hoc styles (`uiDesign.instructions.md`).
- **No application code in mockups**: HTML + Tailwind CDN + vanilla JS only (`uiDesign.instructions.md`).
- **Feature files ≤ 400 lines**: split if larger (`feature.instructions.md`).

---

## Adding New Instructions

When a new concern arises that doesn't fit an existing file:

1. Create a new `.instructions.md` file in `.github/instructions/`.
2. Use camelCase for the filename.
3. Add an entry to the table in this file with purpose and usage guidance.
4. Update the "Which Instructions Apply" matrix if needed.
