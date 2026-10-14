import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { Locale } from "@/lib/locales";
import { copy } from "@/lib/copy";
import { topics } from "@/lib/topics";
import { visibleArticles, type Article } from "@/lib/content";
import { fraud } from "@/lib/fraud";
import { SearchBox } from "./search-box";
import { Suggestion } from "./suggestion";
import { Breadcrumbs, SafetyCallout, Support } from "./site";
import { Icon } from "./icon";
import { articleHelpContext, SUPPORT_EMAIL, EMAIL_HREF } from "@/lib/support";
export function ArticleCards({
  locale,
  articles,
}: {
  locale: Locale;
  articles: Article[];
}) {
  return (
    <div className="article-grid">
      {articles.map((a) => (
        <Link
          prefetch={false}
          className="article-card"
          key={a.id}
          href={`/${locale}/articles/${a.slug}`}
        >
          <h3>{a.title}</h3>
          <p>{a.summary}</p>
        </Link>
      ))}
    </div>
  );
}
export function TopicCards({ locale }: { locale: Locale }) {
  return (
    <div className="topic-grid">
      {topics(locale).map((t, i) => (
        <Link
          className="topic-card"
          key={t.slug}
          href={`/${locale}/topics/${t.slug}`}
        >
          <div className="icon-tile">
            <Icon index={i} />
          </div>
          <h3>{t.title}</h3>
          <p>{t.summary}</p>
          <span className="card-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      ))}
    </div>
  );
}
export function Home({ locale }: { locale: Locale }) {
  const c = copy(locale);
  const articles = visibleArticles(locale);
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <span className="eyebrow">FairSwap · {c.help}</span>
          <h1>{c.hero}</h1>
          <p className="lead">{c.intro}</p>
          <SearchBox locale={locale} c={c} />
        </div>
      </section>
      <div className="container">
        {locale === "en" && <Suggestion />}
        <SafetyCallout locale={locale} />
        <section className="section">
          <div className="section-heading">
            <h2>{c.topics}</h2>
            <Link href={`/${locale}/topics`}>{c.allTopics}</Link>
          </div>
          <TopicCards locale={locale} />
        </section>
        {articles.length > 0 && (
          <section className="section">
            <div className="section-heading">
              <h2>{c.featured}</h2>
            </div>
            <ArticleCards
              locale={locale}
              articles={[
                ...articles.filter((a) =>
                  ["avoid-upi-scams", "safe-meetup", "post-a-listing"].includes(
                    a.id,
                  ),
                ),
              ]}
            />
          </section>
        )}
        <Support locale={locale} />
      </div>
    </>
  );
}
export function Directory({ locale, slug }: { locale: Locale; slug?: string }) {
  const c = copy(locale);
  const topic = topics(locale).find((t) => t.slug === slug);
  const articles = visibleArticles(locale).filter(
    (a) => !slug || a.category === slug,
  );
  return (
    <div className="container page">
      <Breadcrumbs
        locale={locale}
        items={
          topic
            ? [
                { label: c.topics, href: `/${locale}/topics` },
                { label: topic.title },
              ]
            : [{ label: c.topics }]
        }
      />
      <header className="page-heading">
        <span className="eyebrow">{c.help}</span>
        <h1>{topic?.title ?? c.topics}</h1>
        <p className="lead">{topic?.summary ?? c.intro}</p>
      </header>
      {!slug ? (
        <section>
          <TopicCards locale={locale} />
        </section>
      ) : (
        <section aria-label={topic?.title}>
          <ArticleCards locale={locale} articles={articles} />
          {!articles.length && <p>{c.unpublished}</p>}
        </section>
      )}
      <Support
        locale={locale}
        context={
          slug === "account"
            ? "account"
            : slug === "safety-scams"
              ? "safety"
              : "general"
        }
      />
    </div>
  );
}
export function FraudHelp({ locale }: { locale: Locale }) {
  return (
    <aside className="fraud-help">
      <div className="icon-tile">
        <Icon />
      </div>
      <div>
        <h2>{copy(locale).safety}</h2>
        <p>{fraud[locale]}</p>
        <a href="https://cybercrime.gov.in/">
          cybercrime.gov.in
        </a>
      </div>
    </aside>
  );
}
export function ArticlePage({
  locale,
  article: a,
}: {
  locale: Locale;
  article: Article;
}) {
  const c = copy(locale);
  const topic = topics(locale).find((t) => t.slug === a.category)!;
  const related = visibleArticles(locale).filter((other) =>
    a.relatedIds.includes(other.id),
  );
  return (
    <div className="container page">
      <Breadcrumbs
        locale={locale}
        items={[
          { label: topic.title, href: `/${locale}/topics/${topic.slug}` },
          { label: a.title },
        ]}
      />
      <div className="article-layout">
        <article>
          <header className="page-heading">
            <span className="eyebrow">{topic.title}</span>
            <h1>{a.title}</h1>
            {a.editorialStatus === "draft" ? (
              <p className="draft-badge">{c.review}</p>
            ) : (
              <p>
                {c.reviewed}:{" "}
                <time dateTime={a.reviewedAt!}>
                  {new Date(`${a.reviewedAt}T00:00:00Z`).toLocaleDateString(
                    locale,
                    {
                      timeZone: "UTC",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </time>
              </p>
            )}
          </header>
          <div className="prose">
            <ReactMarkdown
              skipHtml
              allowedElements={[
                "p",
                "h2",
                "h3",
                "ol",
                "ul",
                "li",
                "strong",
                "em",
                "a",
                "blockquote",
                "code",
              ]}
              components={{
                a: ({ href, children }) => (
                  <a
                    href={
                      href && /^(https:\/\/|\/)/.test(href) ? href : undefined
                    }
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {a.body}
            </ReactMarkdown>
          </div>
          {a.category === "safety-scams" && <FraudHelp locale={locale} />}
          <Support
            locale={locale}
            context={articleHelpContext(a)}
            variant="article"
          />
        </article>
        <aside className="related">
          <h2>{c.related}</h2>
          {related.map((a) => (
            <Link key={a.id} href={`/${locale}/articles/${a.slug}`}>{a.title}</Link>
          ))}
          <Link href={`/${locale}/topics/${topic.slug}`}>{topic.title}</Link>
          <Link href={`/${locale}/contact`}>{c.contact}</Link>
        </aside>
      </div>
    </div>
  );
}
export function SafetyPage({ locale }: { locale: Locale }) {
  const c = copy(locale);
  return (
    <div className="container page">
      <Breadcrumbs locale={locale} items={[{ label: c.safety }]} />
      <header className="page-heading">
        <span className="eyebrow">FairSwap</span>
        <h1>{c.safety}</h1>
        <p className="lead">{c.safetyText}</p>
        <p className="draft-badge">{c.review}</p>
      </header>
      <ArticleCards
        locale={locale}
        articles={visibleArticles(locale).filter(
          (a) => a.category === "safety-scams" || a.id === "safe-meetup",
        )}
      />
      <FraudHelp locale={locale} />
      <Support locale={locale} context="safety" />
    </div>
  );
}
export function ContactPage({ locale }: { locale: Locale }) {
  const c = copy(locale);
  const entries = [
    {
      title: c.emailSupport,
      text: c.accountHelpText,
      href: EMAIL_HREF,
      label: SUPPORT_EMAIL,
      index: 0,
    },
    {
      title: c.support,
      text: c.supportText,
      href: "https://fairswap.in/account/support",
      label: c.support,
      index: 0,
    },
    {
      title: c.report,
      text: c.reportText,
      href: "https://fairswap.in",
      label: c.marketplace,
      index: 5,
    },
    {
      title: c.grievance,
      text: c.grievanceText,
      href: "https://fairswap.in/grievance",
      label: c.grievance,
      index: 6,
    },
  ];
  return (
    <div className="container page">
      <Breadcrumbs locale={locale} items={[{ label: c.contact }]} />
      <header className="page-heading">
        <span className="eyebrow">FairSwap</span>
        <h1>{c.contact}</h1>
        <p className="lead">{c.needHelp}</p>
      </header>
      <div className="contact-grid">
        {entries.map((e) => (
          <section className="contact-card" key={e.title}>
            <div className="icon-tile">
              <Icon index={e.index} />
            </div>
            <h2>{e.title}</h2>
            <p>{e.text}</p>
            <a className="button secondary" href={e.href}>{e.label}</a>
          </section>
        ))}
      </div>
      <section className="section">
        <h2>{c.contact}</h2>
        <p>
          <a href="https://fairswap.in/contact">{c.contact}</a> ·{" "}
          <a href="https://fairswap.in/safety">{c.safety}</a> ·{" "}
          <a href="https://fairswap.in/privacy">{c.privacy}</a>
        </p>
      </section>
      <SafetyCallout locale={locale} />
    </div>
  );
}
export function ComingSoon({
  locale,
  kind,
}: {
  locale: Locale;
  kind: "business" | "boost" | "banner-advertising" | "careers";
}) {
  const c = copy(locale);
  const title =
    kind === "business"
      ? c.business
      : kind === "boost"
        ? c.boost
        : kind === "careers"
          ? c.careers
          : c.banners;
  const description =
    kind === "boost"
      ? c.boostText
      : kind === "banner-advertising"
        ? c.bannerText
        : kind === "careers"
          ? c.careerText
          : c.unavailable;
  return (
    <div className="container page">
      <Breadcrumbs
        locale={locale}
        items={
          kind === "boost" || kind === "banner-advertising"
            ? [
                { label: c.business, href: `/${locale}/business` },
                { label: title },
              ]
            : [{ label: title }]
        }
      />
      <section className="coming-soon">
        <span className="status-badge">{c.development}</span>
        <h1>{title}</h1>
        <h2>{c.soon}</h2>
        <p className="lead">{description}</p>
        <p>{c.unavailable}</p>
        {kind === "careers" && (
          <p className="career-safety">{c.careerSafety}</p>
        )}
        <div className="actions">
          <Link className="button" href={`/${locale}`}>
            {c.back}
          </Link>
          <a className="button secondary" href="https://fairswap.in">
            {c.marketplace}
          </a>
        </div>
      </section>
      {kind === "business" && (
        <div className="business-grid">
          {[
            { label: c.boost, text: c.boostText, path: "boost" },
            {
              label: c.banners,
              text: c.bannerText,
              path: "banner-advertising",
            },
          ].map((e) => (
            <Link
              className="business-card"
              key={e.path}
              href={`/${locale}/business/${e.path}`}
            >
              <span className="status-badge">{c.soon}</span>
              <h2>{e.label}</h2>
              <p>{e.text}</p>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
