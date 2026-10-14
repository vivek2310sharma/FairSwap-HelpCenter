import { notFound } from "next/navigation";
import { locales, isLocale } from "@/lib/locales";
import { Header, Footer } from "@/components/site";
import { preview } from "@/lib/publication";
import { approvedShellLocales } from "@/lib/editorial";
import "../globals.css";
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export const dynamicParams = false;
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const enabled = preview || approvedShellLocales.includes(locale);
  return (
    <html lang={locale} dir="ltr">
      <body>
        {enabled && <Header locale={locale} />}
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        {enabled && <Footer locale={locale} />}
      </body>
    </html>
  );
}
