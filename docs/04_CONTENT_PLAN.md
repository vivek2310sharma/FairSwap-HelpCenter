# 04 — Launch content inventory and editorial operations

## Launch editorial targets

Seven categories; 28 article topics are the long-term catalog (28 x 10 = 280 translated article files at full coverage). For initial launch, fully review and publish 10 priority article topics in ALL 10 supported languages (100 article files), then expand to the 28-topic catalogue. Draft content is not auto-published. Use stable slugs/IDs across locales and verify current FairSwap features.

| Topic / slug prefix | Proposed 4 article slugs |
| --- | --- |
| Account & Access (account) | create-account; login-otp-troubleshooting; update-profile; recover-access |
| Posting & Managing Listings (listings) | post-a-listing; edit-or-delete-listing; listing-under-review; renew-or-repost-listing |
| Buying & Selling (buying-selling) | find-an-item; inspect-before-buying; safe-meetup; complete-an-exchange |
| Messages & Communication (messaging) | contact-a-seller; keep-chat-safe; suspicious-messages; block-a-user |
| Safety & Scams (safety-scams) | avoid-upi-scams; fake-army-officer-scam; fake-courier-scam; advance-payment-warning |
| Reports & Support (reporting-support) | report-a-listing; report-a-user-or-message; submit-support-ticket; appeal-moderation-decision |
| Rules & Policies (rules-policies) | prohibited-items; privacy-and-data-requests; terms-and-acceptable-use; grievance-redressal |
**10 launch-priority article IDs (10 translations each):** create-account, post-a-listing, safe-meetup, contact-a-seller, avoid-upi-scams, fake-army-officer-scam, fake-courier-scam, report-a-listing, submit-support-ticket, grievance-redressal. The topic catalogue has seven categories; every category has at least one article from launch.

## High-priority articles

Safety/Scams articles must be written first and reviewed by a human before publication. Explain: how to identify 'QR to receive money' or UPI collect requests, fake receipt/screenshots, fake courier fees, false identities claiming armed forces affiliation, external payment links, requests for OTP/UPI PIN and deposits. Use practical step-based advice, not defamatory generalisations about legitimate professions. Explain that FairSwap's current marketplace is not an escrow or courier guarantee. For reported financial fraud, link to https://cybercrime.gov.in/ and mention India's cyber financial fraud helpline 1930 with approved context; advise contacting the bank/UPI app support promptly as appropriate. Refer to authorities, but don't promise refunds or investigations.

## Writing template

Each article should:
1. Answer user question in 1-2 lines.
2. List actionable numbered steps (web/app differences explicitly labeled).
3. Highlight risks, limitations or prerequisites.
4. Offer one relevant related article and one escalation link.
5. Provide reviewedAt and internal sourceRefs (up-to-date feature path or official authority).
6. Be available in both EN and HI before public publication.

Avoid screenshots until features are stable; if necessary crop/redact identity and device data.

## Verification and current-product issues

Existing Web provides /help, /safety, /contact, /grievance and /account/support; Admin manages staff tickets. Existing iOS has native Help/Safety content. Android support navigation is not yet established in the inspected code. Never describe an action as currently available on Android/iOS until verified on that platform. A Help Centre must not claim a generic shared UI that doesn't exist.

The initial Web support ticket page is protected by sign-in. Suspension appeals exist but must be independently verified before instructing locked-out users. Review production pilot notices and avoid saying live features are globally available.

Some Web support form category names have differed from older database enum definitions. Before article instructions on choosing a specific ticket category or submissions, validate the latest deployed behavior; this repository must not attempt to fix backend data schema.

## Translation quality

Use human-reviewed, natural content for English, Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Kannada, Odia and Malayalam; never publish unreviewed machine-translated financial/legal guidance. Translate navigation/UI and body, preserve stable IDs/slugs. Localize examples (UPI, PIN, Rupees if costs needed), never reuse Danish examples, kroner, legal procedures or contact points.

Editorial workflow: draft source -> source verification -> translate all ten versions -> native-language reviewers -> product/security/legal review where applicable -> publish PR -> CI checks -> preview QA -> merge. Track reviewedAt and sourceRefs; review all fraud/legal articles at least quarterly and upon product/legal changes. If policy becomes stale, unpublish/draft or update immediately.

## Help Centre search
**Publication gating:** Never suggest a language in which the homepage and the 10 launch-priority articles are not fully translated and reviewed. Keep that language out of the active locale/geo suggestion list until ready. Never render an English article body behind a translated-language URL.

Search should support all 10 scripts, common spellings and relevant synonyms. Maintain a small per-locale index containing only reviewed published content; tag common variants such as 'UPI', 'OTP', 'QR'. Prioritize launch's 10 fully localized article sets, then expand toward 28 before expensive search algorithms.
