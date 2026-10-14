# 02 — Architecture, content model and repository structure

## System boundaries

Public visitors -> Vercel edge/CDN -> statically generated Next.js site (articles, categories, information pages, static search indexes). No login or database in V1; the only permitted API route is one tiny location-to-language suggestion endpoint, with no persistence.

Help Centre -> ordinary HTTPS links to existing FairSwap-Web endpoints:
- https://fairswap.in/account/support (authenticated support tickets and moderation appeals)
- https://fairswap.in/grievance (formal grievance mechanism)
- https://fairswap.in/contact (support route guidance)
- https://fairswap.in/safety (existing marketplace safety)
- https://fairswap.in/terms, /privacy, /acceptable-use (canonical legal documents).

The target website owns authentication and authorization. Never send access tokens through URLs, create a separate copy of the support-tickets schema or directly use service_role from this site.

## Technology

- Next.js App Router with server-rendered statically generated content routes
- TypeScript strict, Tailwind CSS; no component library requirement unless justified
- Git-backed content: Markdown or MDX chosen consistently during scaffold; content compilation only from trusted repository
- Zod validates article frontmatter/metadata and locale completeness at build time
- Lightweight build-time generated locale-specific JSON search indexes for the 10 supported languages; tiny client search component loaded on demand
- Static metadata: canonical + hreflang, Open Graph, sitemap, robots, structured Article/Breadcrumb metadata where appropriate
- Vercel GitHub integration for preview and production deployment; no custom server, no ORM, no secrets for V1
- Pin Node LTS / pnpm / Next.js to reviewed compatible versions; document in package.json, lockfile and CI. Don't blindly use latest.

## Proposed tree after Codex scaffolds app

.
  README.md
  AGENTS.md
  docs/01_PRODUCT_SCOPE.md ... docs/09_LAUNCH_CHECKLIST.md
  content/
    en/
      account/
      listings/
      buying-selling/
      messaging/
      safety-scams/
      reporting-support/
      rules-policies/
    hi/
      [same categories and article filenames as en]
  public/
    brand/                   # approved optimized FairSwap assets only
    search/                  # generated per-locale search JSON; no PII
  scripts/
    build-search-index.ts
    validate-content.ts
    check-links.ts
  src/
    app/
      api/
        language-suggestion/route.ts   # only dynamic V1 endpoint; no DB
      [locale]/
        layout.tsx
        page.tsx
        topics/page.tsx
        topics/[slug]/page.tsx
        articles/[slug]/page.tsx
        search/page.tsx
        safety/page.tsx
        contact/page.tsx
        business/page.tsx
        business/boost/page.tsx
        business/banner-advertising/page.tsx
        careers/page.tsx
      page.tsx                # redirect to /en
      sitemap.ts
      robots.ts
      not-found.tsx
      globals.css
    components/
      site-header.tsx
      site-footer.tsx
      topic-card.tsx
      article-layout.tsx
      search-box.tsx
      safety-callout.tsx
      coming-soon.tsx
    lib/
      site-config.ts          # allowlisted external links
      content.ts
      article-schema.ts
      i18n.ts
      geo-suggestions.ts       # allowlisted state -> locale map
      search.ts
    styles/
      tokens.css              # approved FairSwap design tokens
  tests/
    content.test.ts
    routes.test.ts
    links.test.ts
    search.test.ts
    a11y.smoke.spec.ts
  .github/workflows/ci.yml
  package.json, pnpm-lock.yaml, tsconfig.json

This is a proposed layout, not current code.

## Content metadata contract

At build time each article needs: id (shared across locales), slug (stable URL segment), locale (one of en, hi, bn, mr, te, ta, gu, kn, or, ml), title, summary, category, tags, reviewedAt, status (draft/published), sourceRefs (editorial verification), relatedIds. Article body is trusted Markdown/MDX. A metadata schema is validated with Zod; invalid dates, unknown categories, orphaned relations and duplicate slug/id pairs fail CI.

To publish an article in the shared 10-language launch collection: all 10 translations must be approved, sourceRefs verified, and each file marked published. After launch, new article collections may be staged as drafts until all required translations pass review. Do not silently show English body on a translated page. Drafts are excluded from generated routes, indexes and sitemap.

## Search and translations

Use content IDs independent of language so related articles and locale switching retain context. Generated locale-scoped index includes only published title, description, tags, slug and possibly short text excerpts; target compact payload and lazy fetch after user opens Search. Implement simple relevance weighting (title > tag > body); offer topic alternatives and 'Contact support' if no result. Queries and recent searches stay on the device during the session; do not send personal search terms to analytics.
The optional /api/language-suggestion route reads x-vercel-ip-country and x-vercel-ip-country-region from Vercel, returns only an allowlisted locale hint or none, uses private/no-store response headers, does not read/store the raw IP, and never redirects. Fetch only when needed for the English homepage prompt, once per session. Keep the help articles statically rendered and cacheable. Full behavior, state mapping and tests: docs/10_LANGUAGE_SELECTION.md.

Use static UI dictionaries and localized Markdown. Ensure fonts cover Devanagari, Bengali, Telugu, Tamil, Gujarati, Kannada, Odia and Malayalam scripts. Default / to /en unconditionally. Do not auto-detect browser language or use a locale-preference cookie. Explicit /:locale paths determine content; the visitor changes language only by clicking a visible selector or optional state-based suggestion.

## Performance and security

Prioritize: prerendered HTML, low JavaScript, no external fonts/scripts, optimized SVG icons, responsive design, lazy search index, image dimensions, no giant JS bundles. Set a strict but compatible CSP and other browser security headers after testing Next.js/Vercel behavior. No user-generated MDX, no remote embed, no external analytics SDK in V1, no privileged keys. Avoid region-specific CDN HTML caching errors by separating the static HTML from the no-store suggestion endpoint.

Do not depend on the uptime of fairswap.in to serve public article pages; only outbound escalation links depend on the marketplace app. For a down marketplace support backend, show stable fallback contact/grievance guidance with honest status, not fake ticket submission.

## Integration and change management

HelpCenter owns help.fairswap.in. Web, iOS and Android link into it via stable HTTPS deep links. Each existing app must be changed in its own reviewed repo. Existing public /help on Web may redirect only after full content parity + production readiness. Keep /contact and /grievance where legally necessary until separate legal review approves changes.
