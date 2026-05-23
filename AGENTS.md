# ProofWarden Site - Agent Instructions

## Scope

These instructions apply to the entire repository unless a more specific `AGENTS.md` is added in a subdirectory.

## Project Goal

Build proofwarden.com as a dark, futuristic, single-page educational website for ProofWarden, an active enterprise product providing evidence infrastructure for AI-agent actions.

## Audience

Enterprise AI deployers, risk teams, governance teams, audit teams, assurance teams, compliance reviewers, and AI operations leaders.

## Primary CTA

Request early access.

## Canonical Domain

proofwarden.com

Redirect www.proofwarden.com to proofwarden.com after deployment.

## Stack Preference

Use Next.js, TypeScript, Tailwind CSS, and a clean componentized structure suitable for deployment on Vercel.

## Design Source Of Truth

Use the Stitch MCP design context / Design DNA as the visual source of truth.

The site should be dark, futuristic, enterprise-grade, spacious, polished, and credible. Use the ProofWarden infographic as visual inspiration, but avoid making the web page too dense.

## Content Constraints

Do not include founder name or founder bio.

Do not claim that ProofWarden determines compliance, assigns liability, approves workflows, replaces auditors, or makes legal decisions.

Do not imply raw evidence is stored on DUAL.

Always preserve the distinction between:

- customer evidence vault
- DUAL proof layer
- reviewer evidence record

## Required Sections

- Hero
- Problem
- Product model
- Architecture
- Boundaries
- Exception preservation
- Use cases
- What ProofWarden does / does not do
- FAQ
- About
- Request early access
- Footer
- Privacy Notice page at `/privacy`

## Required Form Recipient

Early access requests should be sent to:

`proofwarden.thirstily220@simplelogin.com`

Use this through an environment variable:

`CONTACT_TO_EMAIL=proofwarden.thirstily220@simplelogin.com`

## Security Requirements

- Do not hardcode secrets.
- Use server-side form handling.
- Use environment variables for email provider keys.
- Do not expose API keys client-side.
- Validate required fields.
- Include a hidden honeypot field for basic spam protection.

## Build Checks

Before finishing, run:

```bash
npm run lint
npm run build
```

If those scripts do not exist, add reasonable equivalents.

## Review Guidelines

Check for:

- responsive layout
- accessible colour contrast
- working anchor navigation
- working or clearly documented contact form route
- no secrets committed
- no overclaiming in product copy
- `/privacy` page linked in footer

## Git

- Use short, descriptive commit messages.
- Do not rewrite shared history unless explicitly asked.
- Preserve unrelated user changes in the worktree.
