# FairSwap Help Centre

The independent, India-first, 10-language Help & Safety knowledge centre for [FairSwap](https://fairswap.in).

**Proposed public address:** https://help.fairswap.in  
**Status:** V1 implemented for protected preview testing; editorial approvals and production release pending.
**Git strategy:** Work on branches; preview, test, review and merge into main.  
**V1:** Static Next.js content with 10 languages, English default, optional IP-state language suggestion, no database and no Supabase project or integration. The suggestion uses one minimal Vercel Function; it does not require GPS permission.

## Read this first

1. [Product scope, information architecture and routes](docs/01_PRODUCT_SCOPE.md)
2. [Architecture and file structure](docs/02_ARCHITECTURE.md)
3. [UX, brand and page copy](docs/03_DESIGN_UX.md)
4. [Editorial and multilingual content plan](docs/04_CONTENT_PLAN.md)
5. [Safety, compliance and external integration boundaries](docs/05_SECURITY_INTEGRATIONS.md)
6. [Implementation phases, acceptance tests and release plan](docs/06_DELIVERY_VERCEL.md)
7. [Codex Desktop kickoff and ready-to-paste tasks](docs/07_CODEX_KICKOFF.md)
8. [Reference research and decisions](docs/08_REFERENCES_DECISIONS.md)
9. [Launch readiness checklist](docs/09_LAUNCH_CHECKLIST.md)
10. [Language selection and IP-based suggestions](docs/10_LANGUAGE_SELECTION.md)
11. [One-shot full Codex implementation assignment](docs/11_CODEX_ONE_SHOT_IMPLEMENTATION.md)
12. [Editorial fact-check and translation review handoff](docs/12_EDITORIAL_REVIEW_HANDOFF.md)

Read [AGENTS.md](AGENTS.md) before asking a coding agent to change this repository.

## What's in scope?

- Publicly readable guidance in English, Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Kannada, Odia and Malayalam, with lightweight on-device search.
- Fraud and safe-trading advice tailored to India.
- Clear escalation to existing FairSwap support tickets, content reports and formal grievance channels on fairswap.in.
- Under-development / Coming soon pages for **FairSwap Boost**, **Banner Advertising**, and **Careers**.
- Responsive, accessible, search-indexable pages on Vercel.

**Not in V1:** New authentication, a support-ticket database, contact forms, chatbots, payment collection, boost ordering, ad campaign management, job applications, user profiles, a CMS, or any promises that planned services are live.
**Language behavior:** Opening `/` always lands on `/en`. Never auto-redirect by browser language or IP. Visitors may switch from a small, dismissible state-based suggestion (if available) or a visible 10-language selector. Explicit locale URLs remain in the chosen language. No Urdu.

## Development and verification

Use Node 24.15.0 and pnpm 11.25.0 at the repository root:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

`pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm content:check`, `pnpm build`, and `pnpm test:browser` verify the application. Install Chromium with `pnpm exec playwright install chromium` before browser tests. `pnpm format:check` enforces formatting. GitHub Actions runs these checks plus a separate production-mode build and `pnpm test:production`.

Local development and Vercel **preview** builds expose all 100 Markdown drafts with conspicuous review notices and noindex. Vercel **production** builds hide drafts and unapproved locale shells, emit empty draft-free search indexes and serve an English editorial-hold page. Production cannot be enabled by a draft-visibility flag. Human approval is required for the page-copy registry in `src/lib/editorial.ts` and all ten translations of each article before publishing. Regional suggestions stay disabled until their destination language is fully approved.

See [implementation notes](docs/12_IMPLEMENTATION_NOTES.md) for routing, source provenance, security decisions and editorial steps. The existing Vercel Git integration builds PR previews; no new deployment token, database, project or custom domain is needed.

## Repository status and constraints

This planning pack is the starting contract for Codex Desktop (GPT-6.1 Sol where available). The approved current execution approach is ONE full implementation task on the existing docs/help-center-v1-blueprint branch, updating draft PR #1; see docs/11_CODEX_ONE_SHOT_IMPLEMENTATION.md. After Codex pushes code, use the existing linked Vercel project to test a preview. Do not merge to main or represent unreviewed translations as published content until the owner approves.

Reference URLs: [DBA Help](https://support.dba.dk/hc/da), [DBA Marketplace](https://www.dba.dk/), [Vercel Git](https://vercel.com/docs/git/vercel-for-github).

We take inspiration from the reference's information architecture only. All content, pricing, legal information, claims, localization and messaging must be original and specific to India.
