# 06 — Incremental delivery plan and Vercel deployment

## Workstream phases and dependency order

### Phase 0 — Foundation (Codex PR 1)
- Confirm repo layout, docs and source of truth, configure Node/pnpm exact versions and Next.js App Router TS strict Tailwind.
- Build static shell for 10 explicit locales (en, hi, bn, mr, te, ta, gu, kn, or, ml), default / -> /en, 10-language selector, skip-link, header/footer, theme and global 404. No browser-language detection.
- Audit FairSwap-Web brand tokens and use approved asset; copy only the design contract/approved logo, not dependencies wholesale.
- Baseline lint/typecheck/test/build and GitHub CI.
**Exit:** all 10 locale shells render and pass CI in preview; English is unconditional default, no database/auth configured. Add reviewed language copy incrementally, never expose untranslated placeholder UI as complete.

### Phase 1 — Help information architecture (Codex PR 2)
- Create content metadata schema, typed categories, Markdown/MDX compiler, locale completeness validation, topic cards and static /articles routes.
- Add curated topic listing, breadcrumbs, canonical and hreflang, sitemap/robots.
- Seed 2 original article sets with translations in all 10 locales (20 source files), expand to 10 reviewed launch article sets (100 files) before launch, then toward the 28-topic full catalog.
**Exit:** build fails on invalid content/locale, no drafts publicly indexed.

### Phase 2 — Safety and search (Codex PR 3)
- Implement 10 compact per-locale generated search indexes; lazy search UI, title/tag relevance and no-results recommendations. Add one optional IP-state suggestion endpoint on English homepage using Vercel country/region headers only, with no redirect or storage; see docs/10_LANGUAGE_SELECTION.md.
- Complete fraud/safety articles, official reporting references, internal report links, contact and grievance navigation.
- Add accessible mobile performance smoke tests and link checks.
**Exit:** safety content human reviewed, search works locally without query logging, English remains default even when regional suggestion is available, endpoint fails safely when geo headers are missing.

### Phase 3 — Business and Careers (Codex PR 4)
- /:locale/business, /:locale/business/boost, /:locale/business/banner-advertising and /:locale/careers.
- Display clear Under development + Coming soon in all 10 approved locales, no forms or payment buttons, add grouped footer links.
**Exit:** tests assert Coming soon in all 10 locales, no unavailable-language fallback and absence of forms/booking/purchase/application CTAs.

### Phase 4 — Content and launch QA (Codex PR 5+)
- Publish 10 launch-priority article sets across all 10 locales; expand to 28 topics later. Cross-reference source paths and validate product claims.
- Accessibility, 320/360/390px layout, SEO, security and realistic low-network smoke tests.
- Validate link parity and no dead ends.
**Exit:** all checks in docs/09_LAUNCH_CHECKLIST.md pass and human sign-off.

### Phase 5 — Vercel launch (human approved)
- In Vercel, select correct team/project scope. Use an appropriate commercial plan, usually Pro rather than Hobby.
- Import GitHub repo; framework Next.js, project root repository root. Install via pinned packageManager and lockfile.
- Enable preview deployments on pull requests; production only main after checks/review, no command line production override by agents.
- Provision help.fairswap.in under fairswap.in DNS with Vercel-provided target; do not assume DNS provider, records or project ID. Confirm automatic HTTPS, apex/subdomain routing and canonical SEO URL.
- Test preview + production with curl/browser for all 10 locales and representative articles, then verify sitemaps, redirects, broken links, headers, noindex drafts, optional state suggestion and performance.
- Monitor deployment errors and support links; know how to roll back a bad production build.
**Exit:** production site works at help.fairswap.in, is indexed as intended and rollback plan tested.

### Phase 6 — Link rollout in other repositories (separate PRs)
- FairSwap-Web: update Help links, footer and possibly /help redirect only when parity/URL reliability verified. Preserve legal routes and authentication.
- FairSwap-iOS: adapt existing SwiftUI HelpSafetyView to open public articles with SFSafariViewController or supported system browser strategy; preserve native safety and grievance access.
- FairSwap-Android: add Help menu in current Jetpack Compose account/nav flows; launch browser via Android Custom Tabs. Add offline messaging.
- FairSwap-Admin: no change required for public V1; only consider crosslinks if operators benefit.
**Exit:** all three clients route to shared content, default to English, allow an explicit choice among 10 locales, and existing legal/support flows still work.

## Developer workflows

Use Codex Desktop with repo cloned locally; select GPT-6.1 Sol if shown/available in model selector. Agents use discrete worktrees: feature/help-foundation, feature/content-routing, feature/search-safety, feature/business-careers. Keep dependency changes and UI changes separate where possible. Work through PRs, not uncontrolled direct production changes. If Codex Desktop cannot connect to GitHub/Vercel, use existing authenticated desktop app UI; do not paste tokens in chat. Verify available current model names in app, not by guessing.

For remote multi-file work, have Codex plan and implement one phase then run tests, show the diff and make PR. Read AGENTS.md in every worktree. Preserve .env secrecy and all changes scoped to this repo.

## CI checks

At minimum: pnpm install --frozen-lockfile, lint, typecheck, content validation (metadata, translations and source links), unit tests, Next.js production build, generated search-index checks and key-route smoke tests. Add Playwright E2E and axe checks for mobile/i18n before production. Actions should be pinned to reviewed SHA and permissions scoped contents:read for CI. No secret-bearing untrusted PR jobs.

## Deployment configuration

Prefer native Vercel Git integration (push->preview, main->production) over custom CLI pipelines unless deployment gates require something else. A mostly static Next.js site needs no Supabase env vars, DB migrations or cron; the optional region suggestion uses one no-state Vercel Function. If CI release gating is important, configure Git branch protection/deployment checks within available plan and permissions. Review Vercel commercial subscription and usage limits.
