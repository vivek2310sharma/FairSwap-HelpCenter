# 08 — Design references, researched decisions and open questions

## Inspiration — principles only

- DBA Help: https://support.dba.dk/hc/da — searchable, topic-led support knowledge base and navigation patterns.
- DBA marketplace: https://www.dba.dk/ — corporate/business/site navigation; distinct ideas for business promotion and display advertising.
- DO NOT copy Danish copy, company names, currency, business pricing, policies, layouts pixel-for-pixel, imagery, technology claims, recruitment information or legal interpretations. 'DBA Boost' is a reference idea; FairSwap Boost is only a proposed working name subject to naming/legal review.
- In India, differentiate from OLX by pairing searchable self-service with visible prevention of UPI/courier/identity scams and clear escalation paths.

## Key architectural decisions (ADRs)

ADR-001 — Independent repo, Vercel website: APPROVED CONCEPT. Separate release lifecycle, one public URL used across clients.

ADR-002 — No new database or Supabase integration in V1: APPROVED CONCEPT. All content stored in Git; no login or new support tickets. One minimal ephemeral Vercel Function is permitted for an IP-derived language suggestion, without storing or logging IP.

ADR-003 — Existing support system stays authoritative: APPROVED CONCEPT. Current FairSwap-Web support backend and Admin dashboard continue owning tickets. Help Centre links only.

ADR-004 — Ten supported launch languages: APPROVED PRODUCT DECISION. English, Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Kannada, Odia and Malayalam. Urdu excluded. No language may be marked available or geo-suggested until its launch content has been reviewed.

ADR-005 — Business offerings and Careers are informational placeholders only: APPROVED CONCEPT. No hidden ordering/signup/lead collection.

ADR-006 — Public domain help.fairswap.in: PROPOSED, pending DNS/Vercel approval.

ADR-007 — Next.js static-first: PROPOSED technical recommendation; pin exact dependency versions when scaffolded.

ADR-008 — Version-controlled content before CMS: PROPOSED; avoid operational overhead while low publishing volume.

ADR-009 — Do not relocate statutory legal routes until reviewed: PROPOSED. Help Centre merely links to canonical fairswap.in policies and grievance flow.

ADR-010 — Current mobile codebases are SwiftUI for iOS and Kotlin/Compose for Android: verified in linked repos at plan time; native integration PRs follow those ecosystems rather than React Native examples.
ADR-011 — English-only default, never browser auto-detect: APPROVED PRODUCT DECISION. Root / redirects to /en; explicit locale routes always respected. No Accept-Language redirect or remembered-locale auto-override.

ADR-012 — Optional approximate-state language suggestion, never an auto-switch: APPROVED PRODUCT DECISION. Use Vercel IP-derived IN/state headers to suggest one supported local language only on English homepage, with a small dismissible prompt; no GPS permission, no third-party location vendor, no IP persistence. See docs/10_LANGUAGE_SELECTION.md.

ADR-013 — One-shot implementation execution: APPROVED USER DIRECTION. Implement full V1 technical scope in one Codex Desktop task against existing planning branch/docs/help-center-v1-blueprint and draft PR #1. Internal phases are code milestones, not separate PRs. Preview via existing Vercel GitHub integration; do not merge or production-deploy before owner QA. See docs/11_CODEX_ONE_SHOT_IMPLEMENTATION.md.

## Open decisions

ADR-014 — Ratings V1 draft expansion (26 October 2026): the current task authorizes
two new article sets as drafts, without extending the 14 October editorial
approval. Shell preflight retains the original ten required reviewed article IDs;
future drafts coexist with published shells. Each new ID still requires all ten
reviewed translations before production publication. See
[Ratings publication checklist](14_RATINGS_V1_PUBLICATION.md). No feature activation
or deployment is authorized by this local preparation task.

- Final brand design token source: audit current FairSwap-Web (colors/fonts/logo variants) and agree one explicit visual contract.
- Confirm ownership and DNS access for fairswap.in.
- Confirm commercially appropriate Vercel account/team and billing.
- Confirm exact canonical support/grievance text from current deployed site and required statutory disclosures with counsel.
- Editorial reviewers for all 10 languages plus specialized safety/legal review.
- Whether to use the name 'FairSwap Boost' as a public working title after trademark/branding check.
- Later: whether to use a managed CMS, formal article feedback, metrics, customer support assistant or paid business products — all out of V1.

## Reference verification

Product/legal guidance must be re-verified against the current live FairSwap implementation and authoritative sources before publication. Recommended primary sources: https://cybercrime.gov.in/, https://www.meity.gov.in/, https://www.indiacode.nic.in/, https://vercel.com/docs/deployments and https://vercel.com/docs/git/vercel-for-github. The help centre should NOT make compliance assertions based solely on competitor behavior.

## Documentation maintenance

When a decision changes, update this ADR first, the product/architecture/UX/content docs where relevant, and AGENTS.md so Codex follows the new approved contract.
