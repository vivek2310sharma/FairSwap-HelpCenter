import { labels } from "@/lib/locales";
import { approvedShellLocales } from "@/lib/editorial";
import { suggest } from "@/lib/geo";
// No locale has completed human UI/product/legal review yet. Reviewers must
// explicitly approve the shell AND all ten launch articles before adding one.
export function GET(request: Request) {
  // Build validation guarantees each approved shell has all ten approved
  // priority articles. Keep this function free of content IO and parsers.
  const locale = suggest(
    request.headers.get("x-vercel-ip-country"),
    request.headers.get("x-vercel-ip-country-region"),
    approvedShellLocales,
  );
  return Response.json(
    locale ? { locale, label: labels[locale] } : { locale: null },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
