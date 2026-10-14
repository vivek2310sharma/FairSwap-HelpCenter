# 07 — Codex Desktop kickoff (GPT-6.1 Sol when available)

**Current user request (2026-10-14): execute ONE complete build, not the phase-by-phase prompts below. The authoritative complete assignment is docs/11_CODEX_ONE_SHOT_IMPLEMENTATION.md. The phased prompts below are historical alternatives and should NOT be used for this task.**

## Local setup

1. Install/open Codex Desktop. Use GitHub-account-backed repository connection if offered. Clone `https://github.com/vivek2310sharma/FairSwap-HelpCenter.git` to your computer.
2. Open the repository as a project. Select GPT-6.1 Sol in the Codex model picker **only if available to this account and Codex version**; otherwise select the latest capable coding model. Model availability changes; no model setting is committed in code.
3. Open AGENTS.md, README.md and docs/01-11. Ask Codex to inspect them before changing source.
4. For this one-shot task, switch to the existing docs/help-center-v1-blueprint branch with draft PR #1; never implement on main or open separate milestone PRs.
IMPORTANT: Do not implement Accept-Language negotiation, browser locale auto-detection, IP-driven redirects or forced local-language experiences. All visitors landing on / see English. Geo may only suggest. Urdu is excluded.
5. Do not connect the new website to Supabase; do not request/commit secrets. It is a predominantly static public website; the optional Vercel region-hint endpoint is the only dynamic V1 route.
6. Follow docs/11 to implement all phases 0–4 and tests in a single task, push to existing draft PR #1, then the owner tests the Vercel preview. Do not merge to main.

## Ready-to-paste Codex prompt: Phase 0

> You are the CTO-level implementation agent for FairSwap-HelpCenter. Read AGENTS.md, README.md, and docs/01_PRODUCT_SCOPE.md through docs/09_LAUNCH_CHECKLIST.md in full. This is a separate India-first, mobile-first public Help Centre. Implement ONLY Phase 0 from docs/06_DELIVERY_VERCEL.md in a new local branch/worktree `feature/help-foundation`: scaffold current compatible Next.js App Router + strict TypeScript + Tailwind CSS with pnpm, pin versions/lockfile, use FairSwap branding after auditing the Web repo's approved design assets if accessible, and create 10 supported locale home shells, unconditional English root default, manual locale switch (no browser detection), accessible header/footer and basic grouped navigation. Do not add Supabase, authentication, forms, API routes, analytics or additional paid services. Do not make changes to any other repository. Preserve the existing docs. Add scripts for lint, typecheck, tests and build plus scoped GitHub CI. Run the commands and show results, diff and remaining risks. Stop before production deployment or merge. Propose PR for review.

## Ready-to-paste Codex prompt: Phase 1

> Read AGENTS.md and all docs. Implement ONLY Phase 1 in a fresh worktree: typed Markdown/MDX content loader, Zod frontmatter validation, enforced all-10-locale publish state for the launch-priority article set, 7 topic pages, article pages, breadcrumbs, internal links, metadata/hreflang/sitemap and content tests. Seed two original ten-language article sets, flagged for review. Do not copy DBA content. Do not add backend/DB. Run lint, typecheck, tests and build; open a PR.

## Ready-to-paste Codex prompt: Phase 2

> Read the docs and inspect deployed feature assertions against FairSwap-Web, iOS and Android repositories where possible. Implement static build-time ten-locale search with lazy client indexes and no analytics/search logging. Add only the minimal optional GET /api/language-suggestion endpoint that reads Vercel country+state headers, checks an allowlist of states, returns a language hint or none with no-store, and never automatically switches language. Show dismissible suggestion only on the English homepage. English always default. See docs/10_LANGUAGE_SELECTION.md. Add dedicated Safety, Contact and grievance escalation routes and review-first India fraud content. Ensure official cybercrime links and clear separation of private ticket routing. Add tests, performance checks and PR. Do not modify the other repos.

## Ready-to-paste Codex prompt: Phase 3

> Implement Business overview and three placeholder destinations: FairSwap Boost, Banner Advertising and Careers in all 10 supported languages. All pages must clearly say Under development and Coming soon; no live commercial offers, prices, ads ordering, campaign forms, careers submissions, payments or waitlist signup. Add business/company footer sections, cross-language links, structured metadata and tests. Open PR after passing checks.

## Ready-to-paste Codex prompt: Phase 4

> Publish the 10 initial article sets across all 10 locales only after native-speaker content review; expand the rest later. Audit language quality across all 10 locales, brand conformity, source facts, mobile layout, a11y, SEO, broken links and Vercel previews. Prepare release report with explicit pass/fail evidence for docs/09_LAUNCH_CHECKLIST.md. Do not deploy to production until approved.

## Definition of a well-formed Codex response

Every turn should include: interpreted scope, affected files, implementation summary, tests with exact commands and results, risk list, any unverifiable claims, and a PR link when created. Do not claim tests passed unless actually executed.

## Repositories and links

Help Centre: https://github.com/vivek2310sharma/FairSwap-HelpCenter  
Web: https://github.com/vivek2310sharma/FairSwap-Web  
iOS (SwiftUI): https://github.com/vivek2310sharma/FairSwap-iOS  
Android (Kotlin/Compose): https://github.com/vivek2310sharma/FairSwap-Android  
Admin: https://github.com/vivek2310sharma/FairSwap-Admin

The current repositories are independently maintained; do not silently convert native iOS/Android to React Native for this integration.
