import type { MetadataRoute } from "next";
import { origin, preview } from "@/lib/publication";
import { approvedShellLocales } from "@/lib/editorial";
export default function robots(): MetadataRoute.Robots {
  const blocked = preview || approvedShellLocales.length === 0;
  return {
    rules: {
      userAgent: "*",
      ...(blocked
        ? { disallow: "/" }
        : { allow: "/", disallow: ["/api/", "/search/"] }),
    },
    ...(blocked ? {} : { sitemap: `${origin}/sitemap.xml` }),
  };
}
