# 04 — Launch content inventory and editorial operations

## Launch editorial targets

Seven categories; 28 paired articles in English and Hindi (56 source files). Draft content is not auto-published. Use stable slugs/IDs across locales and review claims against current FairSwap features.

| Topic / slug prefix | Proposed 4 article slugs |
| --- | --- |
| Account & Access (account) | create-account; login-otp-troubleshooting; update-profile; recover-access |
| Posting & Managing Listings (listings) | post-a-listing; edit-or-delete-listing; listing-under-review; renew-or-repost-listing |
| Buying & Selling (buying-selling) | find-an-item; inspect-before-buying; safe-meetup; complete-an-exchange |
| Messages & Communication (messaging) | contact-a-seller; keep-chat-safe; suspicious-messages; block-a-user |
| Safety & Scams (safety-scams) | avoid-upi-scams; fake-army-officer-scam; fake-courier-scam; advance-payment-warning |
| Reports & Support (reporting-support) | report-a-listing; report-a-user-or-message; submit-support-ticket; appeal-moderation-decision |
| Rules & Policies (rules-policies) | prohibited-items; privacy-and-data-requests; terms-and-acceptable-use; grievance-redressal |

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

Use human-reviewed Indian Hindi (Devanagari); avoid machine-translated financial and legal claims. Translate navigation/UI and body, preserve stable IDs/slugs. Localize examples (UPI, PIN, Rupees if costs needed), never reuse Danish examples, kroner, legal procedures or contact points.

Editorial workflow: draft source -> source verification -> bilingual translation -> Hindi reviewer -> product/security/legal review where applicable -> publish PR -> CI checks -> preview QA -> merge. Track reviewedAt and sourceRefs; review all fraud/legal articles at least quarterly and upon product/legal changes. If policy becomes stale, unpublish/draft or update immediately.

## Help Centre search

Search should find typo-tolerant titles if inexpensive, broad relevant synonyms and Devanagari queries. Index Hindi content in Hindi, English in English; tag common variants such as 'UPI', 'OTP', 'QR' in both. Keep indexes light. Prioritize 28 article sets over clever algorithms.
