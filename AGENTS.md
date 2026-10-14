# Codex / AI Contributor Contract

Scope: This repository ONLY, FairSwap-HelpCenter. Read README.md and docs/01 through docs/09 before substantial implementation. Treat this as a production commercial website that is not yet live.

## Non-negotiable decisions

- India-first, English + Hindi at launch. Mobile-first, low-bandwidth, mid/low-end Android usable. Main domain fairswap.in; planned Help Centre domain help.fairswap.in.
- Stack: Next.js App Router + TypeScript strict + Tailwind CSS. Prefer React Server Components and prerendered/static routes. No new backend for V1.
- Content comes from versioned Markdown/MDX files in this repo. Static per-language index for client-side search. No Supabase SDK, DB credentials, Redis, hosted search, CMS, contact form, analytics SDK or AI chatbot in V1.
- Respect boundaries: private support tickets remain in FairSwap-Web/FairSwap-Admin and existing Supabase. Link users to https://fairswap.in/account/support and appropriate reporting/grievance pages. Do not implement cross-origin session transfer, query-string JWTs or unreviewed OAuth.
- Do not claim FairSwap offers payment escrow, courier shipping, guaranteed delivery, payment protection, active paid Boost, banner booking, or active recruiting.
- Business landing, Boost, Banner Advertising and Careers pages MUST say 'Under development' and 'Coming soon' (Hindi equivalent) and have no purchase, application, signup, 'get quote', form or implied activation CTA.
- Do not copy DBA text, imagery, brand, prices, Danish laws, company promises or algorithms. Use only high-level patterns: searchable help, topic navigation, safety and company/business links.
- Audit and adapt existing FairSwap brand tokens and logo from the Web repository where available; do not introduce an unrelated visual identity. Do not copy private keys/assets with unclear licensing.
- Do not modify FairSwap-Web, FairSwap-iOS, FairSwap-Android or FairSwap-Admin in a HelpCenter PR. Integration needs separate PRs in their respective repositories.
- Safety and grievance articles are editorial materials requiring human review. Explicitly mark claims or feature-dependent content as draft if not verified against current FairSwap code/policies.

## Coding and content quality

- Strict TS, no any unless tightly justified. Type/validate structured metadata with Zod at build time. Treat Markdown as trusted reviewed repository content, not user-provided HTML.
- Use small reusable components, semantic HTML, keyboard-accessible controls, useful alt text and tested focus states. Ensure Hindi glyph coverage.
- Prefer build-time content processing and generateStaticParams; avoid runtime work for content pages.
- Keep search entirely client-side with a locale-specific generated compact index loaded on demand. Never upload user search queries.
- Keep locale routes explicit /en and /hi. Never infer country from IP. Don't serve misleading English fallback while labeling content Hindi.
- No secrets committed; no .env files; no unnecessary cookies or third-party trackers; avoid personal data in URLs, events and logs.
- Keep links to legal documents canonical on fairswap.in, and do not paraphrase statutory deadlines as binding without review.
- Test metadata, redirects, broken links, search, a11y, Hindi, mobile layout, static generation and previews. Add automated checks.

## Execution protocol

1. Check actual repository, installed package versions and task docs first.
2. State files to create/modify and acceptance criteria.
3. Implement one focused milestone on a topic branch/worktree (for example feature/help-foundation).
4. Run formatting, linting, typechecking, tests and production build locally; report exact results.
5. Review the diff, fix warnings, open a PR; never self-merge or production-deploy without explicit approval.
6. Preserve existing architecture decisions; propose changes as a reviewed ADR in docs/08_REFERENCES_DECISIONS.md.

After scaffolding, standardize package scripts: pnpm dev, pnpm lint, pnpm typecheck, pnpm test, pnpm build. Use a pinned Node LTS compatible with the selected Next.js version; commit pnpm-lock.yaml and packageManager pin.

## Definition of done

Every shipped route has clear purpose, EN/HI copy, keyboard/mobile usability, correct metadata and link targets, tests, no unapproved product claims, no sensitive data, and a working Vercel preview. See docs/09_LAUNCH_CHECKLIST.md.
