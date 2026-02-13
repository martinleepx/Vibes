# CLAUDE.md

This file provides guidance for AI assistants working on the Vibes repository.

## Project Overview

Vibes is a vibe coding project. The repository is in its early stages and will evolve as features are added.

## Repository Structure

```
Vibes/
├── CLAUDE.md        # AI assistant guidance (this file)
├── README.md        # Project readme
└── .git/            # Git repository metadata
```

**Note:** This is a new repository. Update this section as the project structure grows.

## Development Setup

No build tools, package managers, or dependencies are configured yet. Update this section when the tech stack is chosen.

<!-- Example (uncomment/replace when applicable):
### Prerequisites
- Node.js >= 18
- npm or yarn

### Install
```sh
npm install
```

### Run
```sh
npm run dev
```

### Test
```sh
npm test
```

### Lint
```sh
npm run lint
```
-->

## Conventions

### Git Workflow

- The default branch is `master`.
- Use descriptive commit messages that explain *why* a change was made.
- Keep commits focused on a single logical change.

### Code Style

No linting or formatting tools are configured yet. When they are added, document the commands here and enforce them in CI.

### Testing

No test framework is configured yet. When one is added, document:
- How to run the full test suite
- How to run a single test file
- Naming conventions for test files

## Key Decisions

Track important architectural and tooling decisions here as they are made.

<!-- Example:
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Language | TypeScript | Type safety for large codebase |
| Framework | React | Team familiarity |
| State management | Zustand | Lightweight, simple API |
-->

## Common Tasks for AI Assistants

- **Before making changes:** Read relevant files to understand existing patterns.
- **After making changes:** Run any configured linters and tests before committing.
- **When adding dependencies:** Document why they are needed and check for existing alternatives in the project.
- **Keep this file updated:** When you add significant structure, tooling, or conventions to the project, update this CLAUDE.md to reflect the current state.
