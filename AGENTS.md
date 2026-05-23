# ProofWarden Site - Agent Instructions

## Project goal

Build proofwarden.com as a dark, futuristic, single-page educational website for ProofWarden, an active enterprise product providing evidence infrastructure for AI-agent actions.

## Audience

Enterprise AI deployers, risk teams, governance teams, audit teams, assurance teams, compliance reviewers, and AI operations leaders.

## Primary CTA

Request early access.

## Canonical domain

proofwarden.com

Redirect www.proofwarden.com to proofwarden.com after deployment.

## Stack

Next.js, TypeScript, Tailwind CSS, and a clean componentized structure suitable for deployment on Vercel.

## Design source of truth

Use the Stitch MCP design context / Design DNA as the visual source of truth when available.

Stitch project reference:

https://stitch.withgoogle.com/projects/13685598950125997591

The site should be dark, futuristic, enterprise-grade, spacious, polished, and credible. Use the ProofWarden infographic as visual inspiration, but avoid making the web page too dense.

## Content constraints

Do not include founder name or founder bio.

Do not claim that ProofWarden determines compliance, assigns liability, approves workflows, replaces auditors, or makes legal decisions.

Do not imply raw evidence is stored on DUAL.

Always preserve the distinction between:
- Customer Evidence Vault
- DUAL Proof Layer
- Reviewer Evidence Record

## Required sections

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
- Privacy Notice page at /privacy

## Required form recipient

Early access requests should be sent to:

proofwarden.thirstily220@simplelogin.com

Use this through an environment variable:

CONTACT_TO_EMAIL=proofwarden.thirstily220@simplelogin.com

## Security requirements

Do not hardcode secrets.

Use server-side form handling.

Use environment variables for email provider keys.

Do not expose API keys client-side.

Validate required fields.

Include a hidden honeypot field for basic spam protection.

## Build checks

Before finishing, run:

npm run lint
npm run build

## Review guidelines

Check for:
- Responsive layout
- Accessible colour contrast
- Working anchor navigation
- Working or clearly documented contact form route
- No secrets committed
- No overclaiming in product copy
- /privacy page linked in footer
