"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { primaryNav, contactNav } from "@/data/navigation";
import { businesses } from "@/data/businesses";
import DistrictIllustration from "@/components/home/DistrictIllustration";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  siteBrand: string;
};

export default function MobileMenu({ open, onClose, siteBrand }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      id="district-menu"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="サイトメニュー（建物案内図）"
      className={`fixed inset-0 z-[60] flex flex-col overflow-hidden bg-night-green text-warm-white transition-opacity duration-500 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* 背景の建物案内図 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] opacity-[0.14]">
        <DistrictIllustration className="h-full w-full" />
      </div>
      <div className="surface-vignette" />

      <div
        className="relative flex items-center justify-between"
        style={{ height: "var(--header-height)", paddingInline: "var(--page-gutter)" }}
      >
        <span className="type-display text-lg">{siteBrand}</span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="sign-plate type-label flex items-center gap-2 rounded-sm px-4 py-2 text-[11px]"
        >
          CLOSE
          <span className="relative flex h-6 w-6 items-center justify-center">
            <span className="absolute h-[1.5px] w-3.5 rotate-45 bg-current" />
            <span className="absolute h-[1.5px] w-3.5 -rotate-45 bg-current" />
          </span>
        </button>
      </div>

      <nav
        aria-label="サイトの区画一覧"
        className="relative flex flex-1 flex-col justify-center gap-1 overflow-y-auto"
        style={{ paddingInline: "var(--page-gutter)" }}
      >
        {primaryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="group flex items-baseline justify-between border-b border-line-light py-4 sm:py-5"
          >
            <span className="type-display text-[clamp(1.8rem,7vw,3.5rem)] transition-colors duration-300 group-hover:text-amber-light">
              {item.label}
            </span>
            <span className="type-jp-body text-sm text-warm-white/50">
              {item.labelJp}
            </span>
          </Link>
        ))}
      </nav>

      <div
        className="relative border-t border-line-light py-6"
        style={{ paddingInline: "var(--page-gutter)" }}
      >
        <p className="type-label mb-4 text-[10px] text-warm-white/40">
          THE ANYWARE HOUSE — 5 ROOMS
        </p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-5">
          {businesses.map((b) => (
            <li key={b.slug}>
              <Link
                href={`/business/${b.slug}`}
                onClick={onClose}
                className="type-label block text-[11px] text-warm-white/70 hover:text-amber-light"
              >
                {b.code} {b.zoneName}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={contactNav.href}
          onClick={onClose}
          className="sign-plate type-label mt-6 inline-flex rounded-sm px-6 py-3 text-[11px]"
        >
          {contactNav.label}
        </Link>
      </div>
    </div>
  );
}
