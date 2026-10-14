import Link from "next/link";
import { copy } from "@/lib/copy";
import type { Locale } from "@/lib/locales";
import { preview } from "@/lib/publication";
import { LanguageSelector } from "./language-selector";
import { Icon } from "./icon";
import { MainNav } from "./main-nav";
import { helpOptions, SUPPORT_EMAIL, type HelpContext } from "@/lib/support";
export function Wordmark() {
  return (
    <a className="wordmark" href="https://fairswap.in">
      <span>Fair</span>Swap<small>.in</small>
    </a>
  );
}
export function Header({ locale }: { locale: Locale }) {
  const c = copy(locale);
  return (
    <>
      <a className="skip" href="#main">
        {c.skip}
      </a>
      {preview && (
        <div className="preview" role="note">
          {c.preview}
        </div>
      )}
      <header className="site-header">
        <div className="container header-top">
          <div className="brand">
            <Wordmark />
            <Link href={`/${locale}`} className="brand-caption">
              {c.help}
            </Link>
          </div>
          <LanguageSelector locale={locale} label={c.language} />
        </div>
        <MainNav
          label={c.help}
          links={[
            { label: c.topics, href: `/${locale}/topics` },
            { label: c.safety, href: `/${locale}/safety` },
            { label: c.contact, href: `/${locale}/contact` },
            { label: c.search, href: `/${locale}/search` },
          ]}
        />
      </header>
    </>
  );
}
export function Footer({ locale }: { locale: Locale }) {
  const c = copy(locale);
  const groups = [
    {
      title: c.help,
      links: [
        [c.topics, `/${locale}/topics`],
        [c.safety, `/${locale}/safety`],
        [c.contact, `/${locale}/contact`],
        [c.grievance, "https://fairswap.in/grievance"],
      ],
    },
    {
      title: c.business,
      links: [
        [c.business, `/${locale}/business`],
        [c.boost, `/${locale}/business/boost`],
        [c.banners, `/${locale}/business/banner-advertising`],
      ],
    },
    {
      title: "FairSwap",
      links: [
        [c.marketplace, "https://fairswap.in"],
        [c.careers, `/${locale}/careers`],
      ],
    },
    {
      title: c.legal,
      links: [
        [c.terms, "https://fairswap.in/terms"],
        [c.privacy, "https://fairswap.in/privacy"],
        [c.acceptable, "https://fairswap.in/acceptable-use"],
      ],
    },
  ];
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {groups.map((g) => (
          <div key={g.title}>
            <h2>{g.title}</h2>
            {g.links.map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="container footer-bottom">
        <Wordmark />
        <span>© {new Date().getFullYear()} FairSwap</span>
      </div>
    </footer>
  );
}
export function Support({
  locale,
  context = "general",
  variant = "banner",
}: {
  locale: Locale;
  context?: HelpContext;
  variant?: "banner" | "article";
}) {
  const c = copy(locale);
  const { description, actions } = helpOptions(c, context);
  return (
    <section className={variant === "article" ? "article-escalation" : "support"}>
      <div>
        <h2>{c.needHelp}</h2>
        <p>{description}</p>
      </div>
      <div className="support-actions">
        {actions.map((action, index) => (
          <a
            key={action.href}
            className={`button${index ? " secondary" : ""}${action.isEmail ? " email-action" : ""}`}
            href={action.href}
          >
            {action.label}
            {action.isEmail && (
              <span className="support-email-address">{SUPPORT_EMAIL}</span>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
export function SafetyCallout({ locale }: { locale: Locale }) {
  const c = copy(locale);
  return (
    <Link className="safety-callout" href={`/${locale}/safety`}>
      <div className="icon-tile">
        <Icon />
      </div>
      <div>
        <h2>{c.safety}</h2>
        <p>{c.safetyText}</p>
      </div>
      <span aria-hidden="true">→</span>
    </Link>
  );
}
export function Breadcrumbs({
  locale,
  items,
}: {
  locale: Locale;
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="breadcrumbs" aria-label={copy(locale).help}>
      <ol>
        <li>
          <Link href={`/${locale}`}>{copy(locale).help}</Link>
        </li>
        {items.map((item, i) => (
          <li key={i}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
