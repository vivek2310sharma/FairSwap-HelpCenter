# 11 — Codex Desktop: FULL V1 IMPLEMENTATION IN ONE TASK

**Status:** Ready for Codex implementation. This document is an implementation assignment, NOT a claim that the app exists or has been tested.  
**Assigned target repository:** https://github.com/vivek2310sharma/FairSwap-HelpCenter  
**Existing working branch:** docs/help-center-v1-blueprint  
**Existing draft PR:** https://github.com/vivek2310sharma/FairSwap-HelpCenter/pull/1 (base: main)  
**Vercel project:** FairSwap team / fairswap-helpcenter, already Git-linked to this repo.  
**Output:** ONE complete, testable Help Centre V1 pushed to the EXISTING PR #1 branch. Internal milestones and multiple commits are fine; DO NOT split this assignment into five separate tasks/PRs.

## 0. Execution rules — read before coding

1. Work in Codex Desktop, using GPT-6.1 Sol if offered by the account and model picker. Do not rely on a model name that isn't actually present.
2. Fetch the repository, then checkout the existing branch docs/help-center-v1-blueprint. The current main branch has only a starter README and does NOT contain the full planning documents. Confirm that AGENTS.md and docs/01 through docs/11 are visible before coding. Preserve all planning docs.
3. Read AGENTS.md and docs/01 through docs/10 completely. In case of conflict, this document controls the execution workflow (one task, existing branch/PR), and the latest approved language policy in docs/10 controls localization behavior. Maintain all other security, content, legal and design boundaries.
4. Continue through all internal milestones in ONE Codex assignment without pausing for approvals after each phase. Use small logical commits on the same branch to keep the diff auditable.
5. DO NOT push directly to main, merge PR #1, change production environment, add DNS, disable Vercel protection, buy/upgrade billing, or deploy with CLI --prod. The user will test the connected Vercel PREVIEW and decide whether to merge.
6. Do not edit the other four FairSwap repositories. You may read the Web repo for current approved logo/tokens and existing help/support URLs. If unavailable, use documented safe defaults and report that brand review is pending.
7. Do not ask for secrets. No Supabase project, database, Auth, Storage, service_role, payment gateways, CRM, CMS, email sender, marketing pixels, chatbot, phone/WhatsApp support integration, or third-party IP detection. Existing FairSwap-Web and FairSwap-Admin remain the only support-ticket system.
8. Do not assert an environment, check, live feature, translation approval or Vercel preview succeeded unless actually verified. Deliver the highest-quality preview feasible and report limitations transparently.

## 1. One-shot end-state

Build a polished, real Next.js/TypeScript/Tailwind site that users can navigate and search on mobile and desktop. It must be recognizable as FairSwap, original and designed for India. Take general inspiration from DBA's help topics and business/company navigation, but do not copy DBA code, content, graphics, branding, pricing or Danish assumptions.

Requested pages and behaviors must exist as working routes in all ten supported locales with useful original localized UI, and with honest content lifecycle gating. The final PR should be immediately suitable for an end-to-end Vercel preview test after its code is pushed, without needing another coding prompt.

The site is mostly statically rendered, with only one tiny read-only Vercel Function for regional language suggestions. Keep bandwidth, JavaScript size and dependency weight low. Make no runtime API calls for article content or search queries.

## 2. Technology & repository structure

- Next.js App Router, strict TypeScript, React Server Components, Tailwind CSS, pnpm with lockfile, appropriate compatible Node LTS (the linked Vercel project currently reports Node 24.x). Pin and document package versions instead of blindly using latest.
- App Router directory under src/app, reusable components under src/components, typed utilities under src/lib, translations/content under content/<locale> or equivalent, CI and tests in conventional paths.
- Choose Markdown with a safe renderer OR controlled MDX with an explicitly restricted component set. No arbitrary user-authored HTML, no unsanitized remote embeds or executable content from untrusted sources.
- Zod metadata validation at build time: id, slug, locale, title, summary, category, tags, reviewedAt (or clearly missing if pending), editorialStatus draft/reviewed, sourceRefs, relatedIds. Exclude unpublished material from production sitemap and production search. Reject invalid metadata, duplicate IDs/slugs, unsupported locales, unknown categories and invalid related IDs.
- Do not create separate Next.js/Vercel projects, new Git repos or a monorepo. Keep app at repository root.
- Keep helpers pure and well tested; no broad use of any or suppression of TypeScript errors.

## 3. Implement all ten languages correctly

**Exactly:** en English, hi हिन्दी, bn বাংলা, mr मराठी, te తెలుగు, ta தமிழ், gu ગુજરાતી, kn ಕನ್ನಡ, or ଓଡ଼ିଆ, ml മലയാളം. Do NOT add Urdu.

**Simple behavior only:**
- Root / unconditionally redirects to /en. No Accept-Language, navigator.language or browser language negotiation.
- Every /:locale route stays in the specified locale. Never infer language from IP or override explicit user choice.
- Always show a visible ten-language selector, including on small screens; switching preserves equivalent article/topic when a translated version exists and otherwise navigates to the chosen locale homepage.
- Correct HTML lang, readable script fonts, accessible labels, translations of navigation, 404, page titles, search states, support links, Business and Careers.
- Do not show English article bodies under a regional-language URL while labeling the page translated.
- Design must be left-to-right for these ten locales, with graceful responsive spacing and no huge font CDN downloads.

**Approximate location: suggestion only (never a redirect):**
- On the ENGLISH HOMEPAGE only, show at most one small, dismissible 'Gujarati is available — Switch?' type prompt when a supported language can be inferred from India's state code.
- Read Vercel-provided x-vercel-ip-country and x-vercel-ip-country-region in a single small GET /api/language-suggestion endpoint. Only return a supported language code and display name, or null. Cache-Control: private, no-store. Never echo IP, exact state, city, or user identity.
- Map using the vetted allowlist in docs/10_LANGUAGE_SELECTION.md; for unknown region/outside India/no header/ambiguous state or unpublished locale return null. No browser GPS prompt, client-supplied IP, external API, cookies, raw-IP logging or stored geodata.
- English must render immediately even if this endpoint fails. A visitor switches only after clicking the action. Dismissal may be stored as a small boolean in sessionStorage for the session, not a persistent language profile.
- Make state mapping pure and testable; preview/local tests inject controlled headers without requiring the developer to fake their real location. Do not build geo middleware or rewrite pages by location.

## 4. Build the complete public information architecture

Implement in all active locales:
- / -> /en
- /:locale -> Help Centre homepage
- /:locale/topics -> directory of seven categories
- /:locale/topics/:slug -> category landing / curated article list
- /:locale/articles/:slug -> help article
- /:locale/search -> lightweight client-side search/results and empty states
- /:locale/safety -> fraud prevention and safe trading overview
- /:locale/contact -> choose between help articles, existing logged-in support, reporting and grievance mechanisms; no custom form
- /:locale/business -> future business offerings overview
- /:locale/business/boost -> FairSwap Boost coming soon
- /:locale/business/banner-advertising -> Banner Advertising coming soon
- /:locale/careers -> Careers coming soon
- sitemap.xml, robots.txt, branded 404, redirects and metadata

Homepage needs a polished compact mobile hero, prominent search, seven tappable topic cards, India-focused safety shortcut, curated popular/featured articles (don't fabricate usage statistics), an obvious 'Still need help?' section, and grouped footer navigation.

Category taxonomy:
1. Account & Access
2. Posting & Managing Listings
3. Buying & Selling
4. Messaging & Communication
5. Safety & Scams
6. Reports & Support
7. Rules & Policies

Article pages need breadcrumbs, concise answer, steps, related articles, reviewed date/status when approved, and context-appropriate escalation link. Homepage/category/article UI should be readable on 320px/360px Android, tablet and desktop. Use actual FairSwap visual tokens/logo after inspecting FairSwap-Web's src/app/globals.css / brand assets. Create a small independent, documented token map: no cross-repo runtime dependency.

SEO: generateStaticParams for content routes, canonical/hreflang with per-locale URLs, metadata and OG, sitemap for only approved public pages and reviewed published articles, noindex on staging previews and unreviewed content. Consider structured Breadcrumb/Article metadata only when claims are supported. Business/Careers placeholders should not imply live offers.

## 5. Content — deliver usable breadth in one run

The long-term catalogue is 28 topics x 10 languages. For THIS one-shot V1, author the TEN priority article sets below in ALL TEN locales (100 article drafts) plus the seven translated topic summaries and key site/page copy. Do not defer translation of the site shell to a later phase.

Priority article IDs:
- create-account
- post-a-listing
- safe-meetup
- contact-a-seller
- avoid-upi-scams
- fake-army-officer-scam
- fake-courier-scam
- report-a-listing
- submit-support-ticket
- grievance-redressal

Every article should have an original, understandable answer and practical steps, not a one-paragraph stub. Keep neutral Indian English and natural Hindi/Bengali/Marathi/Telugu/Tamil/Gujarati/Kannada/Odia/Malayalam. Avoid inventing actual FairSwap features not present in the current repositories; if platform steps aren't verified, state the uncertainty or provide generic guidance and flag editorial review.

For financial fraud, explain UPI collect requests, fake payment screenshots, QR scanning to receive funds, suspicious courier fees and advance deposits without defaming real armed forces members. Direct relevant victims to India's official cybercrime portal (https://cybercrime.gov.in/) and financial fraud helpline 1930 with careful caveats. Do not promise recovery or legal outcomes, claim FairSwap operates escrow, or claim safety reports equal formal grievance submissions.

**Non-negotiable editorial honesty:** AI-authored Indian-language translations, safety and legal content are candidate drafts, NOT human-approved. Mark each as review_required / draft until a human approves it, and explicitly surface that in the delivery handoff. To let the owner test all languages on the protected Vercel PREVIEW, support a safe preview-only draft-visibility mode with a conspicuous PREVIEW / EDITORIAL REVIEW REQUIRED label. Prevent draft pages being indexed or inadvertently shipped as published production content. Do not automatically set reviewedAt or editorialStatus=reviewed. The human launch checklist remains open until native-language/security/legal review.

Build-time search: generate one compact, locale-specific search index for all ten languages. In preview it may index preview-only drafts, clearly marked and noindexed; in production it must index reviewed published articles only. Lazy load search only when needed; query must stay local, with no API search endpoint and no logging or analytics.

## 6. Contact support without duplicating the backend

Make support flows useful but keep them outside the new site:
- Existing authenticated tickets and replies: https://fairswap.in/account/support
- Existing formal grievance route: https://fairswap.in/grievance
- Existing contact guidance: https://fairswap.in/contact
- Existing marketplace safety: https://fairswap.in/safety
- Canonical legal documents: https://fairswap.in/terms, /privacy and /acceptable-use
- Reports/Block controls are attached to relevant listings/profiles/chats in the existing marketplace when available, not a generic new Help Centre ticket submission API.

No new login, OAuth flow, Supabase client/session transfer, JWT in URLs or public ticket ID exposure. Allow cross-domain support to require sign-in in the existing Web app. Never promise a specific SLA or a working mobile feature until verified against the platform code.

Review India DPDP / applicable IT Rules notices and grievance paths for accuracy; do not rewrite binding legal claims without verified primary sources and owner/counsel approval.

## 7. Future businesses and careers — complete but honest pages

For /business, /business/boost, /business/banner-advertising and /careers, make professional designed landing pages in all ten locales with clear translated badges:
- Under development
- Coming soon
- Not available yet

FairSwap Boost = conceivable professional seller/listing promotion products, separate from display advertising. Banner Advertising = possible future display placement offerings. Careers = company jobs info placeholder. No launch dates, price tiers, contact-sales forms, lead-capture forms, advertisements booked, UPI/payment buttons, company badges, current vacancies or CV submissions. Provide only links back to the Help Centre and FairSwap marketplace. Do not borrow DBA product copy/pricing.

Tests should confirm every locale communicates that these are not live and there are no buy/apply/signup/booking forms/buttons.

## 8. Visual, accessibility, responsive and performance targets

Design as a modern consumer support destination (not a developer documentation starter or admin dashboard): clear hierarchy, restrained visual depth, good typography, consistent card patterns, helpful icons, readable articles, meaningful mobile footer and trust-centric illustrations only if original/licensed. No hotlinked or watermarked assets. Use semantic HTML and accessible navigation.

Test at 320, 360, 390, 768 and desktop widths. No horizontal overflow. Tap targets around 44px, skip-to-content, keyboard-visible focus, heading hierarchy, screen-reader labels, alt text, sufficient contrast, reduced motion, locale-correct script rendering, no blocking layout shifts. Test at least one non-Latin locale on an Android-style mobile viewport.

Performance goals: static-first HTML, keep homepage initial client JavaScript lean, defer search index, no external runtime fonts, avoid video/carousel, compress assets and render well under low bandwidth. Report real measurements if tools are available; don't fabricate Lighthouse scores.

## 9. Tests, CI, security and release gates

Implement and actually execute:
- pnpm install --frozen-lockfile after lockfile created
- pnpm lint
- pnpm typecheck
- pnpm test (unit and content)
- pnpm build
- content validation and broken internal links
- Playwright smoke flows, where toolchain supports it, with mobile viewport and keyboard/a11y checks
- script/CI asserting all ten locale homepages and Coming soon pages render
- root redirect always /en independent of Accept-Language and geo
- explicit /gu /ta /or etc. never overridden
- geo endpoint supported/unsupported states, empty header, no-store, no IP persistence and dismiss/switch behavior
- draft vs reviewed content visibility and noindex behavior
- search index coverage and local-only query behavior
- 404, hreflang/canonical, sitemap/robots, all help/escalation links
- at least one accessibility smoke test for non-Latin languages

Add GitHub Actions CI for non-secret checks with least-privilege token and lockfile install. Pin reviewed third-party actions to SHAs. No new Vercel deploy job or token needed: the existing Git integration is already linked.

If a test cannot run in Codex's environment (e.g. missing Chromium), report it as NOT RUN with specific cause, not PASS. Include exact commands/results. Do not request production tokens.

## 10. Vercel handoff — the user will test

Verified current connection: FairSwap team, Vercel project fairswap-helpcenter, GitHub repo vivek2310sharma/FairSwap-HelpCenter, Node configured 24.x. Project is not confirmed live at a custom domain, and current domains are Vercel-generated. Existing generated .vercel.app deployments may require authenticated Vercel access due to project protection. Keep this protection enabled.

Do not create a new Vercel project, manually deploy to production, change billing/plan, alter DNS or assign help.fairswap.in. The Vercel team currently reports Hobby; a commercial production launch requires an appropriate paid/business plan review by the owner, not an agent billing change.

Push code to the EXISTING docs/help-center-v1-blueprint branch / draft PR #1. Vercel's linked Git integration should produce a PREVIEW deployment for a buildable branch commit. Inspect GitHub/Vercel deployment checks where available; if a build fails, fix it in the SAME branch, re-push, and inspect again. The user tests the preview URL; do not merge or mark released on their behalf.

Only after the owner's preview QA and content/legal approval should PR #1 be merged into main and the custom domain configured separately. Cross-repo Web, iOS and Android integration stays outside this task.

## 11. Required final deliverable from Codex

Do not stop after scaffold, first page, or a plan. Continue to a working V1 preview with all routes, 10 locale shells, 100 translated draft articles, functional local search, safe state-language suggestion, support routing, and 3 Coming soon pages. Do not substitute screenshots or mockups for working source.

At the end, post:
1. Git branch and updated PR #1 URL; exact commit SHA.
2. Vercel preview URL and build status (or an explicit blocker with logs).
3. Implemented route list and representative URLs in English, Hindi, Gujarati, Tamil, Bengali, Odia and other locales.
4. Actual quality checks with PASS/FAIL/NOT RUN evidence and command output summary.
5. Editorial/human review gaps for safety, law and all ten translations; no claim of approvals.
6. Known limitations and recommended fixes, prioritized.
7. Concise manual Vercel QA steps for owner; explicitly say NOT MERGED / NOT PRODUCTION.

In this one-shot mode, work through foundation, content/locale infrastructure, content/search, business/careers, tests and preview end to end within the existing PR. Multiple commits are fine; the review boundary is one complete pull request.
