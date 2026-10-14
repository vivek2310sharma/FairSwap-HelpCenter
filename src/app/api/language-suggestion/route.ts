import { labels } from "@/lib/locales";
import { approvedShellLocales } from "@/lib/editorial";
import { suggest } from "@/lib/geo";
// Suggest only locales enabled by the publication allowlist.
// Owner sign-off is recorded in docs/13_RELEASE_APPROVAL.md.
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
