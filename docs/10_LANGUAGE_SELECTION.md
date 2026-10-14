# 10 — Approved language policy: English default, optional IP-state suggestion

Status: Approved user direction (2026-10-14). Applies to the FairSwap Help Centre only.

## Supported languages — exactly ten

| Locale | Language | Display name |
| --- | --- | --- |
| en | English | English |
| hi | Hindi | हिन्दी |
| bn | Bengali | বাংলা |
| mr | Marathi | मराठी |
| te | Telugu | తెలుగు |
| ta | Tamil | தமிழ் |
| gu | Gujarati | ગુજરાતી |
| kn | Kannada | ಕನ್ನಡ |
| or | Odia | ଓଡ଼ିଆ |
| ml | Malayalam | മലയാളം |

Urdu is explicitly OUT of scope. All ten are left-to-right languages. Use a typed `SUPPORTED_LOCALES` constant and never show a locale as live unless its translated content is reviewed and actually published.

## Exactly how the site behaves (keep it simple)

1. Every visit to `https://help.fairswap.in/` starts in English. Redirect `/` to `/en` unconditionally. Do not inspect `Accept-Language`, `navigator.language`, saved browser preferences or IP to select the page language.
2. Explicit locale links such as `/gu` or `/ta/articles/avoid-upi-scams` remain in that locale. Language changes only when the visitor selects one using the always-visible selector or clicks the optional suggestion. Do not auto-redirect on subsequent navigations.
3. On the English homepage, once per browser session at most, optionally show one small, dismissible inline suggestion inferred from Vercel's approximate IP-state data: e.g. `ગુજરાતી ઉપલબ્ધ છે — Would you like to view FairSwap Help Centre in Gujarati?` with `Switch to Gujarati` and `×`. Visitor remains in English unless they click Switch.
4. No suggestion on deep-linked pages, translated pages, or when detection is missing, uncertain or the destination locale is not fully reviewed/published. No banners blocking content, permission requests, notifications or modal dialogs.
5. Manual language selection is always available for all launched locales. No cookie or local-storage automatic preference. The URL alone identifies the active language. Optional `sessionStorage` boolean may suppress a dismissed suggestion only for the current session (no IP/state/lang profile).
6. No GPS, location-permission prompt, reverse geocoding, city/lat/long, third-party geo API, user profiling or server-side IP storage.

## Candidate state mapping

Only if `x-vercel-ip-country === IN` and region is in a vetted allowlist. The region is the ISO 3166-2 suffix in `x-vercel-ip-country-region` from Vercel. Confirm header values during staging; older aliases may appear. The mapping offers an option, not a claim about what the user speaks.

| Region code(s) | Suggested language |
| --- | --- |
| GJ (Gujarat) | gu Gujarati |
| MH (Maharashtra) | mr Marathi |
| WB (West Bengal) | bn Bengali |
| AP (Andhra Pradesh); TS/TG (Telangana legacy alias) | te Telugu |
| TN (Tamil Nadu) | ta Tamil |
| KA (Karnataka) | kn Kannada |
| OD/OR (Odisha legacy alias) | or Odia |
| KL (Kerala) | ml Malayalam |
| UP, MP, RJ, BR, JH, HR, DL, HP, CG/CT, UK/UT (selected Hindi-belt states) | hi Hindi |

Other/mixed-language states: NO automatic suggestion at first. Never infer language for an unsupported state/country. Review state/code changes and real production headers. The user may choose any published language in the selector.

The mappings are suggestions based on a broad state pattern, not individual linguistic identity. State detection can be wrong due to VPN, corporate networks, mobile carrier routing or proxy traffic. English remains fully usable.

## Minimal Vercel implementation, no Supabase

- Keep all Next.js content pages prerendered/static and CDN-cacheable.
- Add ONLY `GET /api/language-suggestion` as a minimal, low-payload Next.js route handler on Vercel.
- Read `request.headers.get('x-vercel-ip-country')` and `request.headers.get('x-vercel-ip-country-region')` on the server. Do not accept client-supplied region query parameters. Avoid reading `x-forwarded-for` or raw IP.
- Return JSON `{ "locale": "gu", "label": "ગુજરાતી" }` or `{ "locale": null }`; no state, IP, city, user identifier or granular location in payload. Use `Cache-Control: private, no-store`.
- Render English immediately with static HTML. A tiny client component fetches the endpoint only on English homepage and only if not already dismissed in that session. Failure is silent and has no effect on page content.
- Check published-locale allowlist before suggesting. Only show if target locale has approved homepage, navigation, legal/support links, business placeholders and the common 10-priority knowledge articles. During initial rollout, keep a locale disabled until ready.
- Keep Vercel deployment scope and provenance trusted. Geolocation headers are platform-supplied in production; never make security/authorization decisions from them. In local tests, use controlled fixtures, and in Vercel preview verify actual header values.

No database, CMS, Supabase SDK or server-stored preference is required. This does introduce ONE tiny read-only Vercel Function, not a support backend.

## Acceptance tests

- `/` always -> `/en` for visitors with different region headers and browser Accept-Language values.
- `/gu` -> Gujarati without any redirect to English or another language.
- IP state GJ on `/en` -> optional Gujarati prompt, no automatic redirect, dismiss works.
- State TN -> optional Tamil; AP and TS/TG -> Telugu; OD/OR -> Odia; unknown -> none.
- Outside India, absent country/region headers, invalid/misleading codes or disabled locale -> no prompt.
- Switching uses a manual click and routes to the correct localized page; no explicit locale overridden.
- Session suppresses repeated suggestion, without a permanent tracking cookie, IP persistence, console logs or third-party calls.
- Simulate weak mobile connection: page displays immediately in English and a failing hint endpoint does not block navigation.

## Supporting docs

Vercel request geo headers: https://vercel.com/docs/headers/request-headers
Vercel region code discussion: https://vercel.com/docs/headers
India state code references should be verified against current ISO 3166-2 and observed Vercel deployment data, not assumed from Indian vehicle registration codes.

All other project docs must conform to this policy; never reintroduce browser-language auto-selection.
