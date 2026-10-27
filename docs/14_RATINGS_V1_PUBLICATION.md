# Ratings V1 content candidate — 26 October 2026

This change prepares two articles in all ten existing languages. It does not publish
them or activate Ratings. All twenty files retain `editorialStatus: draft` and
`reviewedAt: null`. The 14 October approval covers the original 100 articles and
ten site shells only; it supplies no editorial approval for these additions.

## Scope and source evidence

Observed starting HEAD: `4398f817b92850dfa4e16522d6ee41ee715864df`.
No fetch/pull or synchronization was authorized or performed. This is an observed
local base, not a newly synchronized upstream main. The pre-existing untracked
`CLAUDE.md` is unrelated and excluded from the handoff.

Source: [candidate Backend contract](https://github.com/vivek2310sharma/FairSwap-Backend/blob/feat/ratings-v1-backend/docs/contracts/ratings-v1.md),
retrieved 26 October 2026; Git blob SHA `57f3759f6f42040b0e7f2e6ab6b64837479be780`.
The contract is a candidate, not hosted acceptance. Backend PR #59 CI passed and
not deployed, Web #273/#274 CI passed, and Admin #29/#30 CI passed are **task-owner
reports**, not independently verified deployment claims.

The articles cover conversation-based selection, explicit buyer confirmation,
disputes, role-specific categories and four faces, immutable reviews, double-blind
publication, expiry, three-counted-review threshold, replies, reporting limits,
evidence privacy and moderation limits. No phone OTP or 90-day cooldown is added.
The UI's character limit follows the server's normalized Unicode-codepoint rule;
reviewers should check how the released Web counter describes that limit.

Safety wording was checked against [NPCI fraud awareness](https://www.npci.org.in/fraud-awareness)
and the [Ministry of Home Affairs reporting-channel notice](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2287674&lang=1&reg=1).
It includes QR/PIN/OTP warnings, fake payment links, army impersonation, courier
fees, the official cybercrime portal and 1930. It promises neither recovery nor
payment, identity, authenticity, delivery or insurance guarantees.

## Publication behavior

- `src/lib/locales.ts` declares both stable IDs; collection validation requires
  twelve unique articles per locale. Existing categories and routes are reused.
- Shell preflight checks the explicit original ten launch IDs. New drafts cannot
  withdraw shell approval or inherit it. Missing/unreviewed original content still
  blocks an approved shell's build.
- Each new article remains withheld in every production locale until **all ten**
  translations of that ID carry genuine review status and dates. One locale's
  approval is insufficient. Shell approval does not publish articles.
- Existing `visibleArticles` governs routes, navigation, related cards and search.
  Production keeps 100 reviewed articles, ten indexes of ten entries and 260
  sitemap URLs. Draft routes return 404, including query-string bypass attempts.
- Local/preview builds expose 120 articles and 280 locale routes with draft labels,
  no review dates for drafts and noindex. Preview sitemap stays empty. Existing
  deployment-environment guards remain authoritative; `SHOW_DRAFTS` cannot override
  production. Internal article links are checked for missing destinations and
  published-to-draft links fail validation.
- Article-body links retain the existing colour and underline offset and now stay
  underlined, so support and official reporting links do not rely on colour alone.
  The automated Tamil draft accessibility scan exposed this existing styling gap.

## Editorial checklist — no approvals recorded

Each row covers **both** `how-ratings-work` and `report-a-review`. All text is an
AI-prepared editorial candidate, including English. Tests establish structure and
selected regression facts, not native-language fluency or human/legal approval.

| Locale | Language | Source/product parity | Native-language review | Safety/support/legal review | Reviewer, reviewed commit, date | Publication authorized |
| ------ | -------- | --------------------- | ---------------------- | --------------------------- | ------------------------------- | ---------------------- |
| en     | English  | Pending               | Pending                | Pending                     | Unassigned                      | No                     |
| hi     | हिन्दी   | Pending               | Pending                | Pending                     | Unassigned                      | No                     |
| bn     | বাংলা    | Pending               | Pending                | Pending                     | Unassigned                      | No                     |
| mr     | मराठी    | Pending               | Pending                | Pending                     | Unassigned                      | No                     |
| te     | తెలుగు   | Pending               | Pending                | Pending                     | Unassigned                      | No                     |
| ta     | தமிழ்    | Pending               | Pending                | Pending                     | Unassigned                      | No                     |
| gu     | ગુજરાતી  | Pending               | Pending                | Pending                     | Unassigned                      | No                     |
| kn     | ಕನ್ನಡ    | Pending               | Pending                | Pending                     | Unassigned                      | No                     |
| or     | ଓଡ଼ିଆ    | Pending               | Pending                | Pending                     | Unassigned                      | No                     |
| ml     | മലയാളം   | Pending               | Pending                | Pending                     | Unassigned                      | No                     |

Before a separate publication change, record competent human reviewers, exact
reviewed revision, article IDs, date and caveats in the editorial record/Issue #3.
Check all numbered steps, role-specific category names, four choices, confirmation
persistence, deadline and delayed publication, optional text/tags, edit prohibition,
Not rated versus No ratings yet, counted threshold, replies and dispute effects.
Check every warning and private evidence instruction, and canonical support and
grievance links. Confirm actual released Web labels/availability. Do not infer
Android/iOS parity. Resolve all ten rows before setting reviewed metadata for an
article. Never invent review dates from CI or earlier V1 approval.

## Preview then production release preparation

ChatGPT owns GitHub delivery. This local task creates no branch, commit, push, PR,
merge or deployment and changes no Actions files. Historical blueprint/PR #1
instructions are superseded by the current local-only task; do not reuse that old
release branch automatically.

1. Deliver the focused patch through the established HelpCenter review workflow
   into the existing Vercel project `fairswap-helpcenter` **preview** environment.
   Keep deployment protection and noindex enabled. Exact new preview URL and source
   branch are unresolved until ChatGPT delivery; no new project is needed.
2. Require existing CI plus preview browser checks: ten-language navigation, all
   twenty draft routes and labels, all existing routes, search, internal links,
   responsive non-Latin pages and SEO. Record hosted preview revision, URL and
   automated results separately from local evidence. No manual/exploratory tests
   or owner predeployment testing are requested.
3. Deliver the content-preparation change to existing production branch `main`,
   existing project and `https://help.fairswap.in` with drafts still withheld.
   Prior human approval of the new articles is not needed to deploy their gated
   preparation. All existing review/CI gates remain in place.
4. Run automated production checks against the deployed revision: all ten language
   shells, all 100 original article URLs, draft 404s, ten clean search indexes,
   260 sitemap URLs, root English redirect, correct support/grievance destinations
   and no accidental draft navigation. Release owner records READY deployment,
   assigned domain/HTTPS availability and rollback target. These are operational
   production checks, not an instruction to manually explore the site.
5. Publication is a later, explicitly reviewed content change after the checklist
   is complete and the released product matches the text. Rerun preview and
   production checks with the deliberately updated article/index/sitemap counts.
   This task never automatically changes review status.

No migrations, new secrets, dependencies, authentication or payment features.
Environment **names** already used: `VERCEL`, `VERCEL_ENV` (`preview`/`production`).
`SHOW_DRAFTS=true` is used only to test that it cannot bypass production gates.
No environment values need to be configured or changed for this candidate.

## Compatibility and feature activation

- **Backend:** text follows the retrieved Ratings V1 contract, including pending
  buyer seller submissions, confirmation-required counting, sealed reviews and
  case-based moderation. HelpCenter calls no Ratings RPCs and changes no schema.
- **Web:** describes conditional Web availability, existing support tickets and
  support email from `src/lib/support.ts`. Reconfirm labels and deployed contract
  before publication; no Web files or sessions are changed.
- **Admin:** describes authorized investigation and possible actions without
  promising removal, account sanctions or reimbursement. Staff evidence may include
  sealed material; this HelpCenter exposes no case evidence or staff operations.
- **Activation:** Backend's `enabled`, `public_reads`, `jobs_enabled` and
  `staff_enabled` switches remain outside this task. CI-passing consumer PRs do
  not prove deployment. Do not enable any flag as part of content preparation or
  editorial approval. Native-client feature parity is not asserted.

## Rollback and blockers

Rollback owner: ChatGPT/release operator using the existing HelpCenter project.
Restore the previous known-good HelpCenter deployment or revert this focused
change through the normal reviewed workflow. Record the deployment ID before
release, then rerun automated original-route, search and sitemap checks after
rollback. No database or environment rollback is needed. Rolling back content
does not alter Ratings flags or consumer deployments.

Blockers to **publication**: all ten human editorial/language reviews, safety and
grievance review, deployed product parity and explicit publication authorization.
Hosted preview/integration and production acceptance are not claimed by local
checks; delivery is reserved to ChatGPT. Exact local command results and scoped
file hashes are supplied in `ratings-v1-helpcenter-handoff.zip`.

The build tool reported a known security vulnerability in the repository's pinned
Next.js version and recommended an upgrade. The initial build stopped after page
generation; the retry continued with the warning. Dependencies and the lockfile
are unchanged by this content task. Include the unresolved upgrade recommendation
in release assessment; do not mistake a successful retry for security clearance.
The repository-wide formatting check also flags the unrelated, pre-existing
untracked `CLAUDE.md`; scoped formatting is checked separately without editing it.
