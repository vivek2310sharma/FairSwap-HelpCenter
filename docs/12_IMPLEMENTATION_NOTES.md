# V1 implementation notes

## Architecture and runtime

Next.js 16.4.0, React 19.3.0, strict TypeScript 5.9.3, Tailwind 4.3.3, Node 24.15.0, pnpm 11.25.0. Application lives at the repository root. Seven category slugs and ten shared article IDs are validated across exactly ten languages.

`src/app/[locale]/[[...path]]/page.tsx` composes reusable server components and prerenders 26 routes per locale (260 locale pages). A catch-all keeps route parsing, metadata and publication checks together. The separate root layout redirects `/` unconditionally to `/en`; localized root layouts set HTML language without dynamic request headers. Unknown URLs use a static global 404; after hydration its text, title and HTML language follow an explicit supported locale in the URL. With JavaScript disabled that global fallback is English. Valid localized pages are fully rendered without JavaScript.

`content/<locale>/<id>.md` is the editorial source of truth. JSON-formatted YAML frontmatter is parsed with gray-matter and validated with Zod. Markdown renders through react-markdown with raw HTML skipped and a restricted element set. Invalid metadata, dates, path/locale mismatch, missing translations, unknown IDs/categories and broken relations fail validation.

Build-time content processing emits ten compact JSON indexes under ignored `public/search/`. Each contains only the current locale. Fetch starts when a visitor focuses/types in search; matching stays on-device. No query URLs, analytics, search endpoint, database, authentication, cookies or contact form. No environment secrets are needed.

Measured preview index sizes: 10,351 bytes (English) to 23,392 bytes (Tamil), before compression. These are file-size measurements, not network or low-end-device benchmarks.

The only dynamic endpoint, `GET /api/language-suggestion`, reads Vercel country/region headers and returns a supported approved language or null with `private, no-store`. It never reads or echoes a raw IP, location or user identifier. The candidate state map follows docs/10, including listed aliases; real carrier/VPN state accuracy remains a manual staging review. Suggestions are not authorization signals.

## Editorial hold and approval

All 100 articles and all site copy are AI-authored candidate drafts. No article has a review date or a reviewed status. The approved shell list is empty. Preview testing is enabled by `VERCEL_ENV=preview`; local builds also permit labelled drafts. On Vercel, unknown environments and production fail closed. No arbitrary draft flag can override production.

Production hides every draft article, removes drafts from search/sitemap and holds unapproved locale shells. English renders a minimal editorial-hold page. Preview responses have `X-Robots-Tag: noindex, nofollow`, page-level noindex, a robots disallow rule and an empty sitemap. No launch or review approval is implied by a successful build.

To publish later, reviewers must verify source/product assertions and all language copy, record actual review dates and set reviewed status through a reviewed PR. An article is public only after **all ten** translations have been reviewed. Approve a locale shell in `src/lib/editorial.ts` only after native-language/product/security/legal review of navigation, page copy, contact/legal links, business placeholders and all priority guidance. The geo endpoint additionally requires complete approved article coverage before suggesting that locale. It currently always returns null. Automated browser tests mock an approved response to verify optional switch/dismiss behavior; they do not publish that language.

Production release, merge, billing and DNS remain owner actions. The original launch checklist in docs/09 stays open.

## Brand provenance

Read-only audit: FairSwap-Web main revision `4c86c3cc47c951c7f66352feee78919432160193`, `src/app/globals.css` and `src/components/header.tsx`, 2026-10-14. The header uses a typographic wordmark: green “Fair”, dark “Swap”, small muted “.in”. This implementation recreates that text wordmark locally. Colors retain Web's `#047857`, `#065f46`, `#ecfdf5` and neutral palette. System fonts cover Indian scripts through the device's installed fallback fonts, without a font CDN. The favicon is a small original exchange-arrow SVG using those colors; owner brand review remains pending. No assets with unclear licensing were copied and no other repository was modified.

## Safety and policy source checks

Primary sources checked 2026-10-14:

- [NPCI Fraud Awareness](https://www.npci.org.in/fraud-awareness): QR/PIN payment direction and fraud precautions.
- [NPCI UPI FAQ](https://www.npci.org.in/what-we-do/upi/faqs): UPI operation and PIN privacy.
- [Government of India, Ministry of Home Affairs release](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2223095): national financial cyber-fraud reporting system and helpline 1930.
- [National Cybercrime Reporting Portal](https://cybercrime.gov.in/): official reporting destination. Direct retrieval timed out in this environment; government source/search results confirmed the reporting route.

These are source checks, not editorial approval. Account/listing/mobile instructions deliberately avoid unverified control labels or promises. Existing FairSwap links are preserved exactly as specified. Live ticket submission, signed-in behavior, suspension appeals, grievance officer details, legal deadlines and current native-app controls still need owner/product/legal review. No binding SLA, escrow, delivery guarantee or refund promise is made.

## Security and dependency decisions

Headers deny framing, prevent MIME sniffing, limit referrer leakage and disable GPS/camera/microphone. CSP permits same-origin resources only, with no eval, remote fonts, third-party scripts, frames or objects. Its explicit inline-script/style allowance is needed for static Next.js hydration and styling; a nonce-based policy would make routes dynamic. Trusted repository Markdown cannot inject raw HTML. Test any future embeds or user-authored content against this choice. HSTS is set only in production. Preview protection remains controlled by the existing Vercel project and has not been disabled.

Next.js supports ESLint >=9. The bundled import/React/a11y plugins still advertise ESLint 9 peer ranges. Three scoped pnpm peer exceptions allow the exact tested ESLint 10.12.0, avoiding unsupported ESLint 9. Lint runs all Next/TypeScript rules with no errors or warnings. Native build-script permissions are limited to esbuild and unrs-resolver. Runtime dependencies and lockfile are pinned. CI checkout and setup-node actions use immutable SHAs, `contents: read`, no credentials or deploy jobs.

## Owner preview checklist

1. Open the protected preview with your Vercel account. Visit `/` and confirm English. Confirm the preview/review notice.
2. Try each language from the visible selector. Switch an article between Hindi, Gujarati, Tamil, Bengali and Odia; URL/content must remain equivalent. Ask native speakers to review every locale.
3. Search `UPI`, native article title words and an unmatched term. Open results and related articles. Confirm no search query appears in the URL.
4. On a 320–390px phone, inspect navigation, footer, article steps and contact options. Try keyboard-only navigation and a real screen reader.
5. Check existing ticket, reporting, grievance, legal and cybercrime destinations. Do not submit test personal data here; the Help Centre has no support form.
6. Check Business, Boost, Banner Advertising and Careers. Each must say under development/coming soon, with no purchase, booking or application flow.
7. Try an invalid URL. Regional suggestions are intentionally absent pending editorial approval; the automated mocked switch/dismiss flow has been verified.

Real Android TalkBack/NVDA/VoiceOver checks, native-language editorial approvals and commercial production readiness remain pending. No Lighthouse score or low-end-device performance result is claimed.
