# Project Overview

Pokemon compatibility diagnosis app (TanStack Start / React 19 / FSD)

# Setup and Basic Usage

Setup instructions and basic usage are documented in [README.md](./README.md).

# Rules

## MUST
- Always propose an implementation plan and wait for approval before starting work.
- Always append `; echo 'exit: $?'` to every Bash command to confirm success.
- Always use dedicated tools for file operations:
  - File reading → `Read`
  - File editing → `Edit`
  - File writing → `Write`
  - File search → `Glob`
  - Content search → `Grep`

## Task Runner

Commands are managed by `mise` tasks in `mise.toml` (humans and AI agents share the same interface).

AI agents must use only these commands — never call `pnpm` directly.

```
mise run dev          # Start development server
mise run typecheck    # TypeScript type check
mise run lint         # Linter
mise run test         # Unit tests
mise run build        # Production build
```

List all tasks with `mise tasks`.

Options are passed after `--`: e.g., `mise run dev -- --port 3001`

## MUST NOT
- Never use `cd` in Bash commands, and never use directory flags (`--dir`, `-C`, `--cwd`, etc.) to change the working directory. Run commands from the project root as-is (e.g., `mise run typecheck`, `mise run lint`, `git status`).
- Never use `grep`, `find`, `cat`, `sed`, or `awk` in Bash. Use dedicated tools instead.

# Coding Standards

@.claude/rules/workflow.md
@.claude/rules/architecture.md
@.claude/rules/typescript.md
@.claude/rules/server-functions.md
@.claude/rules/naming.md
@.claude/rules/styling.md

# Language Settings
- Responses: Japanese
- Thinking: English (for token reduction)
