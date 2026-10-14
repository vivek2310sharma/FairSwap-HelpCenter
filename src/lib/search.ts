export type SearchEntry = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  text: string;
  draft: boolean;
};
export function normalize(value: string) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}\p{M}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}
export function search(entries: SearchEntry[], query: string): SearchEntry[] {
  const tokens = normalize(query).split(" ").filter(Boolean);
  if (!tokens.length) return [];
  return entries
    .map((entry) => {
      const title = normalize(entry.title),
        tags = normalize(entry.tags.join(" ")),
        body = normalize(`${entry.summary} ${entry.text}`);
      const scores = tokens.map(
        (token) =>
          (title.includes(token) ? 10 : 0) +
          (tags.includes(token) ? 5 : 0) +
          (body.includes(token) ? 1 : 0),
      );
      return {
        entry,
        score: scores.every((s) => s > 0)
          ? scores.reduce((a, b) => a + b, 0)
          : 0,
      };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.id.localeCompare(b.entry.id))
    .map((r) => r.entry);
}
