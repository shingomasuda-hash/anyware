import Link from "next/link";
import { siteConfig } from "@/data/site";
import { primaryNav, contactNav, footerLegalNav } from "@/data/navigation";
import { businesses } from "@/data/businesses";

export default function SiteFooter() {
  return (
    <footer className="bg-ink text-warm-white">
      <div
        className="mx-auto max-w-[1600px] py-16 sm:py-24"
        style={{ paddingInline: "var(--page-gutter)" }}
      >
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="type-display text-3xl sm:text-4xl">AnyWare</p>
            <p className="type-label mt-3 text-[11px] text-warm-white/50">
              {siteConfig.category}
            </p>
            <p className="type-jp-body mt-6 max-w-xs text-sm text-warm-white/70">
              余白から、まちを動かす。地域創生、ブランディング・PR、事業伴走、飲食、水耕栽培を横断し、地域の経済圏に新しいうねりを生み出します。
            </p>
            <Link
              href={contactNav.href}
              className="type-label mt-8 inline-flex rounded-full border border-warm-white px-6 py-3 text-[11px] transition-colors hover:bg-warm-white hover:text-ink"
            >
              {contactNav.label}
            </Link>
          </div>

          <nav aria-label="サイトナビゲーション">
            <p className="type-label mb-4 text-[10px] text-warm-white/40">SITE</p>
            <ul className="space-y-3">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="type-jp-body text-sm text-warm-white/80 hover:text-warm-white"
                  >
                    {item.labelJp}
                  </Link>
                </li>
              ))}
              {footerLegalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="type-jp-body text-sm text-warm-white/80 hover:text-warm-white"
                  >
                    {item.labelJp}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="事業一覧">
            <p className="type-label mb-4 text-[10px] text-warm-white/40">
              BUSINESS
            </p>
            <ul className="space-y-3">
              {businesses.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/business/${b.slug}`}
                    className="type-jp-body text-sm text-warm-white/80 hover:text-warm-white"
                  >
                    {b.code} {b.nameJp}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-warm-white/15 pt-8 text-xs text-warm-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}
          </p>
          <p>{siteConfig.contact.businessArea}</p>
        </div>
      </div>
    </footer>
  );
}
