# ProofWarden Site

Dark, futuristic single-page website for **ProofWarden**, an active enterprise product providing evidence infrastructure for AI-agent actions.

- Canonical domain: `proofwarden.com`
- Hosting target: Vercel
- Stack: Next.js, TypeScript, Tailwind CSS
- Primary CTA: Request early access
- Public contact: `hello@proofwarden.com`
- Stitch project reference: `https://stitch.withgoogle.com/projects/13685598950125997591`

## What is included

- Single-page landing site with anchor navigation
- Hero, problem, product model, architecture, boundaries, exception preservation, use cases, FAQ, about, and request sections
- `/privacy` Privacy Notice page
- `/intake` Evidence Readiness Review intake page
- Server-side early-access form endpoint at `/api/early-access`
- Server-side Evidence Readiness Review intake endpoint at `/api/evidence-readiness-intake`
- Honeypot field and required-field validation
- Downloadable infographic asset
- Downloadable one-page overview PDF
- `www.proofwarden.com` to `proofwarden.com` redirect middleware
- SEO and Open Graph metadata

## Deployment status

- Vercel project: `chainclock123s-projects/proofwarden-site`
- GitHub integration: `chainclock123/proofwarden-site` on `main`
- Last Vercel import verification: `2026-05-23T04:10:03Z`

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build checks

```bash
npm run lint
npm run build
```

## Environment variables

Copy `.env.example` to `.env.local` for local testing.

```bash
cp .env.example .env.local
```

Required for production email submission:

```text
CONTACT_TO_EMAIL=hello@proofwarden.com
RESEND_API_KEY=<your transactional email provider key>
CONTACT_FROM_EMAIL=<verified sender address>
```

The current API route is prepared for Resend-compatible email sending. If these variables are not configured, the form route returns a safe 503 configuration message rather than exposing secrets or silently dropping requests.

## Deployment on Vercel

1. Push this repo to GitHub.
2. Import the repo into Vercel.
3. Add `proofwarden.com` to the Vercel project.
4. Add `www.proofwarden.com` to the same Vercel project.
5. Set `proofwarden.com` as the primary domain.
6. Configure GoDaddy DNS using the exact records Vercel provides.
7. Add the environment variables in Vercel.
8. Test `/privacy`, `/intake`, download links, mobile layout, and the early-access and intake forms.

## Content guardrails

The website intentionally states that ProofWarden does **not**:

- determine compliance;
- assign liability;
- approve or deny workflows;
- replace auditor or reviewer judgment;
- act as a general AI risk dashboard;
- store raw operational evidence on DUAL;
- make final operational or legal decisions.
