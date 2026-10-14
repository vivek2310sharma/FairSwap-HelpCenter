# 05 — Security, India compliance, and platform integrations

## Security boundaries

V1 is intentionally public and anonymous. No session creation, no Supabase client or credentials, no database, no analytics storage and no contact forms. Repo content is reviewed/committed, not user-submitted. Validate frontmatter at build time. Prevent unsanitized arbitrary HTML/MDX remote embeds. Never log visitor search terms, phones or other personal data.

Links to FairSwap application: restrict to known https://fairswap.in routes; rel=noopener where opening a new tab. Support contact and grievance information is sourced from current approved main Web pages, NOT hardcoded personal contact details without review.

Content Security Policy should be compatible with static Next.js/Vercel; no unsafe-inline added indiscriminately. Other defense in depth: HSTS via production hosting, no secret environment vars, least-privilege GitHub/Vercel access, dependency pinning, automated secret/dependency checks and human review of contributions.

## Important support ownership

- HelpCenter: public self-service, search, localization, navigation and escalation links
- FairSwap-Web + existing Supabase: ticket submission, status, replies, user authentication, reports, moderation appeals, formal grievance navigation
- FairSwap-Admin: queue management, assignment, staff communication, internal notes, audit and access checks
- iOS native app: Help & Safety entry point using current SwiftUI implementation; integrate by dedicated iOS PR
- Android native app: Jetpack Compose app. Link via Custom Tabs or secure external browser by dedicated Android PR; no assumption this app is React Native
- Web marketplace: update existing /help link/footer in separate reviewed PR when HelpCenter is live; retain /safety, /contact and /grievance until reviewed and purposefully migrated

Never expose private ticket IDs in indexed pages. Do not send a Supabase JWT in a help.fairswap.in URL. Cross-origin SSO is out of scope; tickets remain on signed-in marketplace.

## Indian law and safety

Reference India's Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules and applicable amended rules and the DPDP Act + rules as effective when published. Distinguish statutory grievances, ordinary customer support, safety reports and privacy/data requests. Have legal reviewer verify officer/contact, acknowledgements, deadlines, appeals, handling of personal data, required disclosures and notices. No definitive guarantee of a single deadline for all complaint types.

Official financial cybercrime reporting: https://cybercrime.gov.in/ ; 1930 where applicable. Avoid inventing FairSwap powers to reverse UPI transfers. Encourage users to report within the marketplace and to contact bank/payment provider and authorities as appropriate.

If and when a consent-based analytics service or support input form is added in V2, prepare a fresh DPDP/data flow evaluation; don't collect data now just because Vercel could.

## Business and careers risk controls

FairSwap Boost and Banner Advertising are speculative future offerings. Do not include fake pricing (INR or otherwise), 'buy', 'contact sales', packages, verified-account promises, impression reach or guaranteed placement. Placeholder names should not misleadingly imply current availability. 'Coming soon' means no service is operational. Careers has no application links, uploads or hiring claims. Avoid collecting candidate CVs or contact information.

Any future paid ad product requires explicit commercial, platform policy, ad disclosure, prohibited-ad and payment-provider designs before release.

## Cross-platform acceptance

Web/iOS/Android must:
- Offer a recognizable Help & Support entry point;
- Open https://help.fairswap.in/en (or /hi on explicit choice/preference) using secure browser surfaces, retain back navigation;
- Support deep links to specific help articles;
- Not break offline marketplace flows (show local fallback/cached link information if connectivity is missing);
- Keep reporting and legal help reachable independently when Help Centre is unavailable;
- Never transfer auth tokens through URL query/fragment.

These integrations are post-HelpCenter readiness tasks and must be implemented in separate repos.
