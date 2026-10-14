# FairSwap Help Centre

The independent, India-first, 10-language Help & Safety knowledge centre for [FairSwap](https://fairswap.in).

**Public address:** https://help.fairswap.in  
**Status:** Product-owner approval recorded 2026-10-14; production release preparation underway. Independent native-language and legal-specialist reviews are not evidenced. See docs/13_RELEASE_APPROVAL.md.
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

Local development and Vercel **preview** builds remain noindex and may expose marked future drafts. On 2026-10-14 the product owner approved the current ten-language V1 for release; all 100 article files and ten locale shells now carry this OWNER approval. Vercel **production** builds publish reviewed articles only, generate the ten search indexes and enable optional state-based language suggestions without forced redirects. A draft-visibility flag cannot publish future unreviewed articles. Independent native-language and legal-specialist reviews have not been documented; follow-up checks are tracked in Issue #3.

See [implementation notes](docs/12_IMPLEMENTATION_NOTES.md) for routing, source provenance, security decisions and editorial steps. The existing Vercel Git integration builds PR previews; no new deployment token, database, project or custom domain is needed.

## Repository status and constraints

The original V1 was implemented using Codex Desktop and tested in a protected Vercel preview. The product owner authorized the content and release on 2026-10-14. Track changes and release evidence in PR #1, docs/13_RELEASE_APPROVAL.md and the launch checklist. Preserve the review gate for any future additions or changes.

Reference URLs: [DBA Help](https://support.dba.dk/hc/da), [DBA Marketplace](https://www.dba.dk/), [Vercel Git](https://vercel.com/docs/git/vercel-for-github).

We take inspiration from the reference's information architecture only. All content, pricing, legal information, claims, localization and messaging must be original and specific to India.
