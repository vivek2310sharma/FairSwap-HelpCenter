# V1 verification evidence

Application revision: `84c76fc3097bf6011ac8e6f13cf220c4f49d902e` (follow-up documentation commits preserve this application tree).

Local verification on 2026-10-14:

| Command / check                        | Result                                                                                                                                                        |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install --frozen-lockfile`       | PASS; lockfile unchanged                                                                                                                                      |
| `pnpm peers check`                     | PASS; no peer dependency issues                                                                                                                               |
| `pnpm format:check`                    | PASS                                                                                                                                                          |
| `pnpm lint`                            | PASS; zero errors/warnings                                                                                                                                    |
| `pnpm typecheck`                       | PASS                                                                                                                                                          |
| `pnpm content:check` / build preflight | PASS; 100 Markdown drafts, 10 complete UI dictionaries, 7 categories per locale, validated relations                                                          |
| `pnpm test`                            | PASS; 4 files, 56 tests                                                                                                                                       |
| `pnpm build` (preview/local mode)      | PASS; 260 locale pages statically rendered plus root/404/SEO/icon; only geo hint is dynamic                                                                   |
| `pnpm test:browser`                    | PASS; 17 tests, 39.9 seconds on final application build                                                                                                       |
| `pnpm test:browser --grep Android`     | PASS; additional Tamil Android-style test, 4.4 seconds total                                                                                                  |
| Production-mode `pnpm build`           | PASS; draft content withheld                                                                                                                                  |
| `pnpm test:production`                 | PASS; draft article 404s, all 10 indexes empty, unapproved locale shells withheld, English editorial hold noindexed, empty sitemap, robots disallow, geo null |
| `git diff --check`                     | PASS                                                                                                                                                          |

The committed browser suite now contains **18 tests**. It crawls all **260 locale routes and their internal links**, tests every locale's home/search/coming-soon pages, unconditional root redirect, context-preserving language switching, localized 404 hydration, index errors and empty states, local-only queries, mocked suggestion switch/dismiss, no-store/security headers, canonical/hreflang and preview robots/sitemap. Layout tests cover 320, 360, 390, 768 and 1280px. Hindi homepage and Tamil article accessibility scans passed with zero violations for the tested WCAG A/AA tags. The Android-style Tamil journey raised no browser page errors.

Production-mode checks were run before a final optimization removed content filesystem reads from the hint endpoint and moved the equivalent approval coverage check into build preflight; production exclusion is also covered by the 56-test unit suite. GitHub Actions reruns the complete 18-test browser suite and production smoke on the pushed revision.

Not run: real-device TalkBack/NVDA/VoiceOver, real low-end Android performance, Lighthouse, authenticated ticket submission or legal workflow actions. No results are implied for these checks. Editorial, product, brand, safety, legal and all ten native-language approvals are still pending. State-code mapping follows the approved candidate allowlist; actual carrier/VPN geolocation accuracy must be reviewed in staging before enabling suggestions.

Deployment status and the latest exact commit/preview URL are maintained in PR #1 after inspecting Vercel's Git-generated preview. Existing project `fairswap-helpcenter` is the only deployment target. Preview protection stays enabled. This implementation is **NOT MERGED / NOT PRODUCTION**.

Manual owner QA is listed in [implementation notes](12_IMPLEMENTATION_NOTES.md#owner-preview-checklist).
