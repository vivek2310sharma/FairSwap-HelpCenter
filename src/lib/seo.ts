import type { Metadata } from "next";
import { locales, type Locale } from "./locales";
import { origin, preview } from "./publication";
import { approvedShellLocales } from "./editorial";
export function metadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const url = `${origin}/${locale}${path}`;
  return {
    title: `${title} · FairSwap`,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries([
        ...(preview ? locales : approvedShellLocales).map((l) => [
          l,
          `${origin}/${l}${path}`,
        ]),
        ["x-default", `${origin}/en${path}`],
      ]),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "FairSwap Help Centre",
      type: "website",
    },
    robots: preview
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
