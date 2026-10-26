import { locales, type Locale } from "./locales";

// Release approval: the product owner authorized publication on 2026-10-14.
// This records OWNER sign-off only; independent native-language and legal
// specialist reviews have not been verified. See docs/13_RELEASE_APPROVAL.md.
export const approvedShellLocales: readonly Locale[] = locales;

// The 2026-10-14 shell approval covers this original launch collection only.
// Future article drafts must neither revoke that approval nor inherit it.
export const shellRequiredArticleIds = [
  "create-account",
  "post-a-listing",
  "safe-meetup",
  "contact-a-seller",
  "avoid-upi-scams",
  "fake-army-officer-scam",
  "fake-courier-scam",
  "report-a-listing",
  "submit-support-ticket",
  "grievance-redressal",
] as const;
