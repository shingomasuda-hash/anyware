"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";
import { primaryNav, contactNav } from "@/data/navigation";
import MobileMenu from "./MobileMenu";

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(!isHome);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          transparent
            ? "bg-transparent"
            : "bg-warm-white/90 backdrop-blur-md border-b border-line"
        }`}
        style={{ height: "var(--header-height)" }}
      >
        <div
          className="mx-auto flex h-full max-w-[1600px] items-center justify-between"
          style={{ paddingInline: "var(--page-gutter)" }}
        >
          <Link
            href="/"
            className={`type-display text-lg tracking-tight sm:text-xl ${
              transparent ? "text-warm-white" : "text-ink"
            }`}
            aria-label="AnyWare トップページへ"
          >
            AnyWare
          </Link>

          <nav
            aria-label="グローバルナビゲーション"
            className={`hidden items-center gap-8 lg:flex ${
              transparent ? "text-warm-white" : "text-ink"
            }`}
          >
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="type-label text-[11px] transition-opacity hover:opacity-60"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={contactNav.href}
              className={`type-label rounded-full border px-5 py-2 text-[11px] transition-colors ${
                transparent
                  ? "border-warm-white text-warm-white hover:bg-warm-white hover:text-ink"
                  : "border-ink text-ink hover:bg-ink hover:text-warm-white"
              }`}
            >
              {contactNav.label}
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="district-menu"
            className={`type-label flex items-center gap-2 text-[11px] lg:hidden ${
              transparent ? "text-warm-white" : "text-ink"
            }`}
          >
            MENU
            <span className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] rounded-full border border-current">
              <span className="h-[1.5px] w-3.5 bg-current" />
              <span className="h-[1.5px] w-3.5 bg-current" />
            </span>
          </button>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        siteBrand={siteConfig.brandName}
      />
    </>
  );
}
