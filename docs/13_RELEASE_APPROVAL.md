# 13 — FairSwap Help Centre V1 production approval record

**Approval date:** 2026-10-14  
**Approval authority:** FairSwap product owner in the FairSwap project conversation  
**Authorization:** "all approved from me. let's go" (after explicit visual/functionality and English-content discussions).  
**Release target:** GitHub FairSwap-HelpCenter PR #1 → `main` → existing Vercel project `fairswap-helpcenter` → `https://help.fairswap.in`.  
**Hosting:** Retain existing Vercel configuration and plan; no billing, DNS, unrelated repo or Supabase changes.

## Scope of owner approval

The product owner explicitly approved the V1 application, visual UX, the ten English reference guides and the existing ten-language content for publication. The release metadata marks the 100 localized article files as owner-reviewed on the approval date, and enables all ten site shells. This approval is recorded in GitHub history rather than inferred from passing automated tests.

**Important qualification:** No evidence of *independent native-language review* across all nine non-English languages, or external legal-specialist review, has been provided. Do **not** represent the release as separately linguistically or legally certified. The owner authorized publication despite those uncompleted independent checks; track them as subsequent quality work, not as completed sign-offs. The 90 regional-language guides are older and generally less detailed than the revised English reference guides. Translation parity remains an open improvement in Issue #3.

## Published product scope

- English is the unconditional default: `/` → `/en`; no IP/browser-language auto-redirect.
- Ten locale routes: en, hi, bn, mr, te, ta, gu, kn, or, ml; no Urdu.
- Seven Help topics, ten guides in each language, search index per locale (100 localized articles), safety/contact pages, business/Boost/banner-advertising/Careers clearly under development/coming soon.
- Existing external FairSwap support/grievance/contact/legal destinations, login-free Email support button to `mailto:contact@fairswap.in` (address visibly stated on the Contact page only).
- Regional-language suggestions use Vercel approximate IP headers only as a dismissible opt-in offer on the English homepage; no location permission or automatic language switch.
- No Supabase, CMS, support database, authentication, payment collection, banner booking, active Boost or job applications.

## Release gates required before merging

1. All 100 Markdown files: `editorialStatus: reviewed`; `reviewedAt: 2026-10-14`. Remove old draft footers while retaining the translated guidance.
2. Site shell allowlist contains exactly the ten approved locales. Do not include future unreviewed locales/articles.
3. CI passes formatting, lint, typecheck, content validation, unit tests, preview build, browser tests, separate production build and production smoke.
4. Production smoke verifies 100 articles, ten nonempty per-locale search indexes, 260 sitemap URLs, public home/route/Coming Soon pages, English root redirect, support links, verified hint responses, robots/sitemap, and no accidental draft banners.
5. Vercel production deployment reports READY for the merged commit and the assigned help.fairswap.in domain. Verify domain response/HTTPS when possible; if platform protection blocks external access, flag it without disabling security unexpectedly.
6. Public site is distinct from preview: Vercel preview protection, noindex and future-draft gates remain enforced. Do not represent a preview as the public launch.

## Open operational checks after launch

- **Support mailbox:** Owner-provided `contact@fairswap.in` must be active and monitored. Mailbox-level delivery has not been independently tested by the Help Centre code.
- **Translations:** Native-speaker QA for all nine regional languages and semantic alignment to the more specific latest English guides remains an open quality task. Preserve the ability to unpublish material that fails review.
- **Legal/safety:** Existing FairSwap grievance route stays canonical. Any future binding legal claims or statutory deadlines require specialist review before changing.
- **Accessibility/performance:** Run real Android TalkBack/VoiceOver, low-end-device Lighthouse and external mobile network checks. Previous automated browser and accessibility suites are not substitutes.
- **Commerce/hosting:** Reassess suitable Vercel commercial plan at FairSwap's commercial launch. The product owner has requested no plan change at this development stage.
- **Cross-app integration:** FairSwap-Web, iOS and Android Help Centre entry points are separate future changes; do not modify them in this release.

## Rollback

If production pages or translations behave incorrectly, revert the production merge on `main` through a reviewed change, or roll back the Vercel production deployment to the previous known-good deployment. Validate that the domain points to the rolled-back deployment and check the exact failed locale/route before a corrected rollout.

### Evidence log

- PR: https://github.com/vivek2310sharma/FairSwap-HelpCenter/pull/1
- Editorial audit: `docs/12_EDITORIAL_REVIEW_HANDOFF.md`
- Translation tracker: https://github.com/vivek2310sharma/FairSwap-HelpCenter/issues/3
- CI / Vercel production deployment evidence to be appended after results are verified.
