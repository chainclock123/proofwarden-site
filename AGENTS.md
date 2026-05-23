# ProofWarden Site - Agent Instructions

## Scope

This repository contains the ProofWarden public site.

These instructions apply to the entire repository unless a more specific `AGENTS.md` is added in a subdirectory.

## Working Rules

- Keep changes focused on the requested site work.
- Preserve existing content, styling, and project structure unless the task clearly requires changing them.
- Do not commit secrets, API keys, bearer tokens, private credentials, `.env` files, or generated credential JSON.
- Prefer clear, product-facing language over broad claims.
- Before finishing implementation work, run the most relevant local checks available in the repo, such as lint, typecheck, build, or tests.
- If dependencies are missing or the repo has no project scripts yet, state that plainly in the handoff.

## Git

- Use short, descriptive commit messages.
- Do not rewrite shared history unless explicitly asked.
- Preserve unrelated user changes in the worktree.
