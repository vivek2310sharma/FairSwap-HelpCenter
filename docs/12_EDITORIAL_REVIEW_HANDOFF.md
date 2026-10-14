# 12 — Editorial review handoff (14 October 2026)

Status: FIRST-PASS TECHNICAL FACT CHECK COMPLETE for the ten English article drafts. Human editorial and translation approval is NOT COMPLETE. This is a record of source-code checks, not an assertion that the public marketplace has been independently tested in production.

## Changes completed

All ten English article drafts in `content/en/` have been revised to provide specific, useful instructions, clearer fallback paths, and updated `sourceRefs`:

- `create-account`: Web sign-up uses display name, email and password (minimum eight characters), policy acceptance, age confirmation and an email-confirmation journey. Web sign-in offers password or an email OTP for existing accounts. An unauthenticated user can choose Email support.
- `post-a-listing`: Web entry `/account/listings/new` requires sign-in. Saved drafts appear in My Listings; where supported, the owner can submit them for review. Publication is not immediate, and category-level restrictions or pilot maintenance can prevent submission.
- `contact-a-seller`: The Web listing detail includes Contact Seller and conversations under `/account/messages`. Reporting user/message controls exist in Web chat.
- `report-a-listing`: The guide does not assume that a Report Listing button is present on every current listing detail page or mobile platform. It points to available page/conversation controls or email support.
- `submit-support-ticket`: Account support redirects unauthenticated visitors to sign-in; signed-in users have a New Inquiry form and can view/reply to tickets. Email support covers people who cannot sign in.
- `safe-meetup`: Follows FairSwap's local, daylight, public-meeting and inspection guidance.
- `avoid-upi-scams`: Follows NPCI's fraud-awareness guidance about QR/PIN and the Government of India's cybercrime reporting channels. Do not promise reimbursement or bank transfer reversal.
- `fake-army-officer-scam`: Focuses on impersonation and scam behavior, not legitimate armed forces personnel.
- `fake-courier-scam`: Explains that FairSwap does not currently operate shipping or escrow. Requires independent checks of any claimed courier.
- `grievance-redressal`: Directs formal matters to FairSwap's existing grievance notice and clearly separates ordinary support and cybercrime reporting.

### Sources used for the first pass

FairSwap-Web source repository (current main branch at check time): `src/app/auth/sign-up/page.tsx`, `src/app/auth/sign-in/page.tsx`, `src/app/auth/actions.ts`, `src/app/account/listings/new/page.tsx`, `src/app/account/listings/page.tsx`, `src/components/listings/ContactSellerButton.tsx`, `src/components/communication/ChatThread.tsx`, `src/components/communication/ReportDialog.tsx`, `src/app/account/support/page.tsx`, `src/app/contact/page.tsx`, `src/app/grievance/page.tsx`, `src/app/safety/page.tsx`.

Government/NPCI guidance: https://www.npci.org.in/fraud-awareness ; https://cybercrime.gov.in/ .

These references support the wording of a draft; they do not establish legal sign-off or that all features are fully available on Android and iOS. FairSwap-Web's exact release flags and deployment status may differ from main-branch code.

## Localization must now follow the updated English reference

The nine non-English content collections (90 article files) still reflect the earlier, more generic source. They are **not synchronized to the revised English instructions** and therefore must not be approved merely because schema tests pass. Updating UI dictionaries alone is not enough.

Required locale sign-offs: `hi` हिन्दी; `bn` বাংলা; `mr` मराठी; `te` తెలుగు; `ta` தமிழ்; `gu` ગુજરાતી; `kn` ಕನ್ನಡ; `or` ଓଡ଼ିଆ; `ml` മലയാളം.

For each article, a translator should:

1. Rework the translation against the latest `content/en/<slug>.md` rather than blindly accepting the old localized file.
2. Verify the meaning, full numbered steps, names of actual actions, sensitive terms (UPI/OTP/PIN), support/grievance distinctions, URLs and scam prevention messages.
3. Flag Web-only instructions explicitly when mobile apps differ; never invent phone-OTP sign-up or feature parity across platforms.
4. Check script readability, grammar, terminology, native phrasing and clear warning tone on a mobile-sized viewport.
5. Record the reviewed Git commit, reviewer, date, article IDs and any caveats in GitHub Issue #3 before approving publication.

AI can provide an initial translation draft or discrepancy report, but final linguistic approval requires a competent human reviewer. Human reviewers have not yet been appointed or verified.

## Publication gates — still closed

- [ ] Product owner confirms current English Web flows, login/signup and support email availability.
- [ ] English editorial approval recorded for all ten articles.
- [ ] All nine translated article collections updated to the English master and individually human-reviewed.
- [ ] All localized site/navigation/business/careers/safety/support UI copy reviewed.
- [ ] Safety-specific content and formal-grievance references checked before sign-off.
- [ ] Only then set article `editorialStatus: reviewed`, meaningful `reviewedAt` dates and approved shell locales.
- [ ] Re-run production-mode build and draft-exclusion tests; obtain explicit approval before merging the PR.

**Do not merge or set approval flags as a shortcut.** The existing production gate deliberately withholds drafts until the agreed locale set has been reviewed.

## Operational notes

- `contact@fairswap.in` is an owner-provided support contact used by the Help Centre. Verify that the inbox is active and monitored before promoting this path to public production.
- The Help Centre's Email support button opens the mailbox via `mailto:` and does not require authentication. No additional address label needs to appear underneath on every article.
- The canonical formal grievance page on fairswap.in remains the only official grievance route represented here.
- A separate FairSwap-Web implementation review may be necessary if users expect a listing-specific Report button on every listing; current Web chat Report User/Message controls are confirmed in source. Do not claim an unverified listing control exists.
- Mobile apps require independent product walkthroughs to validate equivalent page labels, sign-in and report capabilities.

Review tracker: https://github.com/vivek2310sharma/FairSwap-HelpCenter/issues/3 .

## Release decision

**Preview only.** Visual and functional QA was previously approved by the owner; that approval does not apply to the new English article copy or to native-language text. Keep draft PR #1 open for review.
