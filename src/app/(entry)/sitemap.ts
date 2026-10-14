import type { MetadataRoute } from "next";
import { locales, categories } from "@/lib/locales";
import { loadAll, isPublished } from "@/lib/content";
import { origin, preview } from "@/lib/publication";
import { approvedShellLocales } from "@/lib/editorial";
export default function sitemap(): MetadataRoute.Sitemap {
  if (preview) return [];
  const all = loadAll();
  return approvedShellLocales.flatMap((locale) =>
    [
      "",
      "/topics",
      "/search",
      "/safety",
      "/contact",
      "/business",
      "/business/boost",
      "/business/banner-advertising",
      "/careers",
      ...categories.map((c) => `/topics/${c}`),
      ...all
        .filter((a) => a.locale === locale && isPublished(a, all))
        .map((a) => `/articles/${a.slug}`),
    ].map((path) => ({
      url: `${origin}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(
          locales
            .filter((l) => approvedShellLocales.includes(l))
            .map((l) => [l, `${origin}/${l}${path}`]),
        ),
      },
    })),
  );
}
