# 01 — Product charter, scope and information architecture

Date: 2026-10-14 | Status: proposed V1 specification

## Mission

Make FairSwap's help understandable, searchable, safe and accessible to someone on an inexpensive mobile phone in India, without requiring an account. A support centre is a trust advantage over OLX India when it proactively explains scams and offers clear reporting and human escalation.

Primary audience: buyers, sellers, new users, users facing suspicious payments/messages, and users whose listings/accounts have problems. Secondary audience: companies curious about future professional advertising and potential future job applicants.

## Principles

1. Safety before growth: fraud advice is prominent, specific to India and action-oriented.
2. Accurate product status: distinguish shipped capabilities from envisioned services.
3. Self-service first, human escalation always discoverable.
4. Ten supported languages (English, Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Kannada, Odia, Malayalam) with reviewed translations; no half-translated public pages. No Urdu.
5. One public documentation hub for Web, iOS and Android; private support remains where it is.
6. Maximise static delivery and reuse; no auth, new data store or third-party chatbot.

## V1 navigation

Header: FairSwap logo linked to marketplace, Help Centre, Topics, Safety, ten-language dropdown, compact mobile menu.

Homepage:
- Search: 'How can we help you?' / reviewed translations in all supported locales
- A prominent Safety & Fraud warning/entry point
- Topic cards (Account & Access; Listings; Buying & Selling; Messaging; Safety & Scams; Reports & Support; Policies)
- Popular and newly reviewed articles (curated, not fake usage statistics)
- 'Still need help?' linked to support / grievance
- Footer: For Businesses (FairSwap Boost, Banner Advertising); FairSwap (About / Careers / Marketplace); Support (Help, Safety, Contact, Grievance); Legal (Terms, Privacy, Acceptable Use)

## Public route contract

- /                         -> always redirect to /en, regardless of IP or browser language
- /:locale                  -> home for en, hi, bn, mr, te, ta, gu, kn, or, ml
- /:locale/topics           -> all topic directory
- /:locale/topics/:slug     -> topic/category article list
- /:locale/articles/:slug   -> article; shared stable ASCII slug per language
- /:locale/search           -> client-side search UI using locale-specific index
- /:locale/safety           -> dedicated fraud/safety overview
- /:locale/contact          -> contact/escalation guidance, NOT a new ticket form
- /:locale/business         -> overview of future business products, marked coming soon
- /:locale/business/boost   -> FairSwap Boost placeholder, coming soon
- /:locale/business/banner-advertising -> Banner Advertising placeholder, coming soon
- /:locale/careers          -> Careers placeholder, coming soon
- /sitemap.xml and /robots.txt -> generated public SEO metadata
- unknown locale, slug or article -> useful 404 with links back to Help Centre
**Simple language policy:** English is always the default. Do not inspect browser Accept-Language for redirects. On the English homepage only, a small dismissible message may suggest a published regional language using the visitor's approximate state from Vercel's IP-geolocation headers. Never switch automatically; if unavailable/uncertain, show no message. A manual language selector always works. See docs/10_LANGUAGE_SELECTION.md.

Keep article URLs stable. If a slug changes, preserve a redirect and review internal links. Avoid duplicating current legal documents from fairswap.in.

## Business offering semantics — intentionally separate

**FairSwap Boost:** Possible future tools for professional sellers to manage/promote inventory listings. NOT an active paid service, subscription, guarantee of visibility, unlimited-listing offer or verified-business badge today. Never import the DBA name or Danish pricing as FairSwap terms.

**Banner Advertising:** Possible future display advertising placements on FairSwap surfaces, distinguished from inventory listing promotion. NOT an active ad marketplace, media-buying platform, ad-tracking system or booking channel today. Explicit separation protects future ad transparency and user trust.

**Careers:** A placeholder for future opportunities only. Do not imply vacancies, recruitment windows or applications are accepted. Include an anti-recruitment-scam caution; no applicant data collection.

Visible copy for all three: 'Under development · Coming soon' and 'This service is not available yet. No bookings, payments or applications are being accepted.' Translate into every supported locale, preserving meaning. Do not announce dates.

## V1 scope vs later

V1 (must): 10 supported locales, 7 help categories, 10 high-priority fully localized article sets, fast search, contextual escalation, 3 honest placeholders, branded layout, SEO, accessibility, release automation through Git/Vercel, testing.

Later (requires explicit decisions): self-service ticket login on help.fairswap.in, CMS/editor roles, dedicated support backend, live chat, AI assistant, advertising orders, recruitment applications, analytics/feedback with consent/compliance, further languages beyond the chosen ten.

## User journeys

- Buyer suspects a seller is asking for advance UPI money: homepage -> Safety & Scams -> concrete UPI article -> official cybercrime guidance -> FairSwap report route.
- Seller cannot find a listing: search -> listing visibility article -> support ticket route if unresolved.
- Account holder wants to appeal moderation: search -> appeal article -> existing signed-in support dashboard (suspended account handling remains the existing application).
- Business owner explores promotion: footer -> Business -> Boost / Banner page -> sees clearly unavailable, no sales CTA.
- Candidate explores Careers: footer -> Careers -> clearly under development, no false job claim.

## Measurable acceptance

- All shared public pages and 10 launch article sets available in all 10 locales with reviewed localized copy.
- No dead-end support journeys and no forms or payment flows on the Help Centre.
- Mobile viewport usable at 320–360px, with keyboard and screen-reader navigation.
- All public claims matched to a reviewed current source (repo implementation, live production behavior, authoritative policy/official public resource).
- Search returns local relevant titles without storing or transmitting queries.
- Build, tests and Vercel preview pass before main/production promotion.
