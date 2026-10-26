export const locales = [
  "en",
  "hi",
  "bn",
  "mr",
  "te",
  "ta",
  "gu",
  "kn",
  "or",
  "ml",
] as const;
export type Locale = (typeof locales)[number];
export const labels: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
  bn: "বাংলা",
  mr: "मराठी",
  te: "తెలుగు",
  ta: "தமிழ்",
  gu: "ગુજરાતી",
  kn: "ಕನ್ನಡ",
  or: "ଓଡ଼ିଆ",
  ml: "മലയാളം",
};
export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
export const categories = [
  "account",
  "listings",
  "buying-selling",
  "messaging",
  "safety-scams",
  "reporting-support",
  "rules-policies",
] as const;
export const articleIds = [
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
  "how-ratings-work",
  "report-a-review",
] as const;
