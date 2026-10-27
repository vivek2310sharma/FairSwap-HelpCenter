import type { Metadata } from "next";
import { locales, type Locale } from "./locales";
import { origin, preview } from "./publication";
import { loadAll, isPublished, type Article } from "./content";
import { approvedShellLocales } from "./editorial";
export function publishedPathLocales(
  path: string,
  all: Article[] = loadAll(),
): Locale[] {
  const slug = /^\/articles\/([^/]+)$/.exec(path)?.[1];
  return approvedShellLocales.filter(
    (locale) =>
      !slug ||
      all.some((a) => a.locale === locale && a.slug === slug && isPublished(a)),
  );
}
export function metadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const url = `${origin}/${locale}${path}`;
  const available = preview ? locales : publishedPathLocales(path);
  return {
    title: `${title} · FairSwap`,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries([
        ...available.map((l) => [l, `${origin}/${l}${path}`]),
        ...(available.includes("en")
          ? [["x-default", `${origin}/en${path}`]]
          : []),
      ]),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "FairSwap Help Centre",
      type: "website",
      images: [
        {
          url: `${origin}/brand/social-preview.png`,
          width: 1200,
          height: 630,
          alt: "FairSwap",
        },
      ],
    },
    robots: preview
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
