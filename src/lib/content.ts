import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { articleIds, categories, locales, type Locale } from "./locales";
import { preview } from "./publication";
export const articleSchema = z
  .object({
    id: z.enum(articleIds),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    locale: z.enum(locales),
    title: z.string().min(5),
    summary: z.string().min(30),
    category: z.enum(categories),
    tags: z.array(z.string().min(1)).min(1),
    reviewedAt: z.iso.date().nullable(),
    editorialStatus: z.enum(["draft", "reviewed"]),
    sourceRefs: z
      .array(
        z
          .url()
          .refine(
            (value) => value.startsWith("https://"),
            "Sources require HTTPS",
          ),
      )
      .min(1),
    relatedIds: z.array(z.enum(articleIds)).min(1),
  })
  .strict()
  .superRefine((a, ctx) => {
    if (a.editorialStatus === "reviewed" && !a.reviewedAt)
      ctx.addIssue({
        code: "custom",
        message: "Reviewed content requires a date",
      });
    if (a.editorialStatus === "draft" && a.reviewedAt)
      ctx.addIssue({
        code: "custom",
        message: "Draft cannot claim a review date",
      });
  });
export type Article = z.infer<typeof articleSchema> & { body: string };
export function loadAll(): Article[] {
  return locales.flatMap((locale) =>
    readdirSync(join(process.cwd(), "content", locale))
      .filter((f) => f.endsWith(".md"))
      .map((file) => {
        const parsed = matter(
          readFileSync(join(process.cwd(), "content", locale, file), "utf8"),
        );
        const metadata = articleSchema.parse(parsed.data);
        if (
          metadata.locale !== locale ||
          file !== `${metadata.slug}.md` ||
          metadata.id !== metadata.slug
        )
          throw new Error(`Content path mismatch: ${locale}/${file}`);
        return { ...metadata, body: parsed.content };
      }),
  );
}
export function validateCollection(all: Article[]) {
  for (const locale of locales) {
    const set = all.filter((a) => a.locale === locale);
    if (
      set.length !== articleIds.length ||
      new Set(set.map((a) => a.id)).size !== set.length ||
      new Set(set.map((a) => a.slug)).size !== set.length
    )
      throw new Error(`Incomplete or duplicate collection: ${locale}`);
    for (const a of set) {
      if (
        a.relatedIds.some(
          (id) => id === a.id || !set.some((other) => other.id === id),
        )
      )
        throw new Error(`Invalid relation: ${a.id}`);
      if (!/1\. /u.test(a.body) || a.body.length < 200)
        throw new Error(`Incomplete body: ${a.id}`);
    }
  }
}
export function isPublished(a: Article, all: Article[]): boolean {
  return locales.every((locale) =>
    all.some(
      (other) =>
        other.id === a.id &&
        other.locale === locale &&
        other.editorialStatus === "reviewed" &&
        !!other.reviewedAt,
    ),
  );
}
export function visibleArticles(locale: Locale): Article[] {
  const all = loadAll();
  return all.filter(
    (a) => a.locale === locale && (preview || isPublished(a, all)),
  );
}
