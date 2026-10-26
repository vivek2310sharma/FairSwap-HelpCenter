import { mkdirSync, writeFileSync } from "node:fs";
import { loadAll, validateCollection, isPublished } from "../src/lib/content";
import { locales } from "../src/lib/locales";
import { copy } from "../src/lib/copy";
import { topics } from "../src/lib/topics";
import { preview } from "../src/lib/publication";
import {
  approvedShellLocales,
  shellRequiredArticleIds,
} from "../src/lib/editorial";
const all = loadAll();
validateCollection(all);
for (const locale of approvedShellLocales) {
  if (
    !shellRequiredArticleIds.every((id) =>
      all.some(
        (a) => a.locale === locale && a.id === id && isPublished(a, all),
      ),
    )
  )
    throw new Error(
      `Shell approval requires complete reviewed articles: ${locale}`,
    );
}
mkdirSync("public/search", { recursive: true });
for (const locale of locales) {
  copy(locale);
  if (topics(locale).length !== 7) throw new Error("Invalid taxonomy");
  const entries = all
    .filter((a) => a.locale === locale && (preview || isPublished(a, all)))
    .map((a) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      summary: a.summary,
      tags: a.tags,
      text: a.body,
      draft: !isPublished(a, all),
    }));
  writeFileSync(
    `public/search/${locale}.json`,
    JSON.stringify(entries),
    "utf8",
  );
}
console.log(
  `PASS: ${all.length} articles, ${locales.length} complete UI dictionaries, 7 categories/locale. ${preview ? "Preview drafts enabled" : "Production: reviewed collections only"}. Generated 10 search indexes.`,
);
