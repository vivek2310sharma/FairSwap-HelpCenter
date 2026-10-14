import type { Locale } from "./locales";
const states: Record<string, Locale> = {
  GJ: "gu",
  MH: "mr",
  WB: "bn",
  AP: "te",
  TS: "te",
  TG: "te",
  TN: "ta",
  KA: "kn",
  OD: "or",
  OR: "or",
  KL: "ml",
  UP: "hi",
  MP: "hi",
  RJ: "hi",
  BR: "hi",
  JH: "hi",
  HR: "hi",
  DL: "hi",
  HP: "hi",
  CG: "hi",
  CT: "hi",
  UK: "hi",
  UT: "hi",
};
export function suggest(
  country: string | null,
  region: string | null,
  available: readonly Locale[],
): Locale | null {
  if (country !== "IN" || !region) return null;
  const locale = states[region];
  return locale && available.includes(locale) ? locale : null;
}
