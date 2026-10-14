# 09 — Launch readiness, test matrix and rollout acceptance

Status: NOT STARTED. Tick only after evidence is collected from actual build, browser and production checks.

## Repository & build
- [ ] Node LTS version and pnpm version pinned; lockfile committed, dependency changes reviewed.
- [ ] Clean install / lint / typecheck / unit tests / content validation / production build succeed in CI.
- [ ] GitHub Actions scoped least-privilege; protected main and required review/checks set.
- [ ] No secrets, Supabase SDK, database, auth, form handlers, analytics tracking or payment integrations.
- [ ] Preview deployments build on PRs and are reviewed before merge.

## Visual, UX and accessibility
- [ ] FairSwap visual tokens/logo approved; design uses same recognizable style on Web and native app journeys.
- [ ] Mobile widths 320, 360, 390, tablet and desktop verified: no horizontal scrolling, 44px targets and usable navigation.
- [ ] WCAG-aligned keyboard, focus, contrast, semantic heading, labels, skip navigation and screen-reader smoke tests completed.
- [ ] Correct fonts and html lang attributes for all 10 locales render on low-end Android and desktop.

## Content and translations
- [ ] All 7 topic categories and shared UI translated in all 10 locales.
- [ ] 10 priority article sets (100 language files) reviewed and published for initial launch; 28-topic / 280-translation catalog remains roadmap. No English masquerading as translated content.
- [ ] Fraud, payments, reporting and legal claims verified by product/security/legal/editorial owner.
- [ ] Dynamic content/feature labels checked against current FairSwap Web, iOS and Android implementation.
- [ ] SourceRefs and last reviewed dates present and correct for each published article.
- [ ] Correct article URLs, related links, 404s, hreflang, canonical, sitemap, robots and share previews.
- [ ] Search indexes contain no draft or personally identifiable data, load on demand, work in all 10 active locales and do not transmit user queries.
- [ ] / always opens English /en irrespective of IP or Accept-Language; explicit /:locale links never auto-change.
- [ ] All 10 languages are manually selectable; no Urdu, no forced IP/browser redirects, no locale cookies.
- [ ] On English homepage only, a recognized India/state IP can offer a small optional translated-language suggestion; Switch is explicit, Dismiss works and does not repeat during the session.
- [ ] Missing geo headers, non-India IP, VPN/mismatched region, inactive locale or missing translation -> no suggestion and normal English page.
- [ ] Geo endpoint uses Vercel server-side headers, Cache-Control: private, no-store; stores/logs no IP, location or search queries; no GPS permission or third-party geo API.

## Business, advertising and careers
- [ ] Business landing explains products as future possibilities only.
- [ ] FairSwap Boost is Under development/Coming soon; no paid claims/guarantees.
- [ ] Banner Advertising is Under development/Coming soon; no orders, booking or targeting data collection.
- [ ] Careers is Under development/Coming soon; no false vacancies or applicant collection.
- [ ] All 10 locales show the same unavailable status; automated assertions ensure no buy/apply/signup/payment controls.

## Security and compliance
- [ ] HTTPS with valid cert; tested security headers and no uncontrolled external embeds/scripts.
- [ ] Grievance, support, reporting and data-privacy actions remain reachable at official FairSwap routes.
- [ ] No auth/session token or sensitive information passed to help URLs.
- [ ] Legal and grievance notices reviewed for India-specific requirements, without unsupported deadline claims.
- [ ] Accessibility, dependency/secret checks pass.

## Deployment
- [ ] Vercel team/project and commercial plan approved.
- [ ] DNS for help.fairswap.in configured and validated.
- [ ] CI/Vercel deployment target, repository and branch confirmed.
- [ ] Production health of / and all 10 locale paths, topics, articles, search, safety, contact, business, boost, banner and careers confirmed.
- [ ] No broken links, 404 redirect loops or accidentally indexed draft pages.
- [ ] Tested rollback plan and owner on-call/contact defined.

## Later cross-repo rollout (not a blocker for website launch)
- [ ] FairSwap-Web links and /help replacement or redirect PR reviewed; preserve legal paths.
- [ ] iOS native Help & Safety links updated; returns/back behavior verified.
- [ ] Android Compose Help entry point added; Custom Tabs and offline fallback verified.
- [ ] All platforms tested against production Help Centre with EN/HI deep links.

## Human launch sign-off

Product: [ ]   Engineering: [ ]   Safety/content: [ ]   All 10 language reviewers: [ ]   Legal/compliance: [ ]   Release owner: [ ]

Only mark launched when the public URL and all core checks have been verified. An approved architecture plan is not the same as a deployed website.
