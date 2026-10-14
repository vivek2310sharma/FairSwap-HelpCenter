"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function MainNav({
  label,
  links,
}: {
  label: string;
  links: { label: string; href: string }[];
}) {
  const pathname = usePathname();
  return (
    <nav className="container main-nav" aria-label={label}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={
            pathname === link.href || pathname.startsWith(`${link.href}/`)
              ? "page"
              : undefined
          }
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
