import { notFound } from "next/navigation";
import { isLocale, locales, categories } from "@/lib/locales";
import { copy } from "@/lib/copy";
import { visibleArticles } from "@/lib/content";
import { metadata } from "@/lib/seo";
import { preview } from "@/lib/publication";
import { approvedShellLocales } from "@/lib/editorial";
import { topics } from "@/lib/topics";
import {
  Home,
  Directory,
  ArticlePage,
  SafetyPage,
  ContactPage,
  ComingSoon,
} from "@/components/pages";
import { SearchBox } from "@/components/search-box";
import { Breadcrumbs, Support } from "@/components/site";
type Params = { locale: string; path?: string[] };
export const dynamicParams = true;
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    [
      [],
      ["topics"],
      ["search"],
      ["safety"],
      ["contact"],
      ["business"],
      ["business", "boost"],
      ["business", "banner-advertising"],
      ["careers"],
      ...categories.map((slug) => ["topics", slug]),
      ...visibleArticles(locale).map((a) => ["articles", a.slug]),
    ].map((path) => ({ locale, path })),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, path = [] } = await params;
  if (!isLocale(locale)) return {};
  const c = copy(locale);
  const article =
    path[0] === "articles"
      ? visibleArticles(locale).find((a) => a.slug === path[1])
      : undefined;
  const key = path.join("/");
  const topic =
    path[0] === "topics" && path.length === 2
      ? topics(locale).find((t) => t.slug === path[1])
      : undefined;
  const title =
    article?.title ??
    topic?.title ??
    {
      topics: c.topics,
      search: c.search,
      safety: c.safety,
      contact: c.contact,
      business: c.business,
      "business/boost": c.boost,
      "business/banner-advertising": c.banners,
      careers: c.careers,
    }[key] ??
    c.help;
  return {
    ...metadata(
      locale,
      key ? `/${key}` : "",
      title,
      article?.summary ?? topic?.summary ?? c.intro,
    ),
    robots:
      preview ||
      !approvedShellLocales.includes(locale) ||
      article?.editorialStatus === "draft"
        ? { index: false, follow: false }
        : { index: true, follow: true },
  };
}
export default async function Page({ params }: { params: Promise<Params> }) {
  const { locale, path = [] } = await params;
  if (!isLocale(locale)) notFound();
  const c = copy(locale);
  const key = path.join("/");
  if (!preview && !approvedShellLocales.includes(locale)) {
    if (locale === "en" && !key)
      return (
        <section className="container page narrow">
          <h1>FairSwap Help Centre</h1>
          <p>Our guidance is awaiting editorial approval.</p>
          <a className="button" href="https://fairswap.in/contact">
            Contact FairSwap
          </a>
        </section>
      );
    notFound();
  }
  if (!key) return <Home locale={locale} />;
  if (key === "topics") return <Directory locale={locale} />;
  if (
    path[0] === "topics" &&
    path.length === 2 &&
    categories.some((slug) => slug === path[1])
  )
    return <Directory locale={locale} slug={path[1]} />;
  if (path[0] === "articles" && path.length === 2) {
    const a = visibleArticles(locale).find((a) => a.slug === path[1]);
    if (!a) notFound();
    return <ArticlePage locale={locale} article={a} />;
  }
  if (key === "safety") return <SafetyPage locale={locale} />;
  if (key === "contact") return <ContactPage locale={locale} />;
  if (key === "search")
    return (
      <div className="container page narrow">
        <Breadcrumbs locale={locale} items={[{ label: c.search }]} />
        <h1>{c.search}</h1>
        <SearchBox locale={locale} c={c} />
        <Support locale={locale} />
      </div>
    );
  if (
    [
      "business",
      "business/boost",
      "business/banner-advertising",
      "careers",
    ].includes(key)
  )
    return (
      <ComingSoon
        locale={locale}
        kind={
          path[path.length - 1] as
            | "business"
            | "boost"
            | "banner-advertising"
            | "careers"
        }
      />
    );
  notFound();
}
