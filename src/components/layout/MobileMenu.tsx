"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { primaryNav, contactNav } from "@/data/navigation";
import { businesses } from "@/data/businesses";

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
      aria-label="サイトメニュー"
      className={`fixed inset-0 z-[60] flex flex-col bg-ink text-warm-white transition-opacity duration-500 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className="flex items-center justify-between"
        style={{ height: "var(--header-height)", paddingInline: "var(--page-gutter)" }}
      >
        <span className="type-display text-lg">{siteBrand}</span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="type-label flex items-center gap-2 text-[11px]"
        >
          CLOSE
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-current">
            <span className="absolute h-[1.5px] w-3.5 rotate-45 bg-current" />
            <span className="absolute h-[1.5px] w-3.5 -rotate-45 bg-current" />
          </span>
        </button>
      </div>

      <nav
        aria-label="サイトの区画一覧"
        className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto"
        style={{ paddingInline: "var(--page-gutter)" }}
      >
        {primaryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="group flex items-baseline justify-between border-b border-warm-white/15 py-4 sm:py-5"
          >
            <span className="type-display text-[clamp(1.8rem,7vw,3.5rem)] transition-transform duration-300 group-hover:translate-x-2">
              {item.label}
            </span>
            <span className="type-jp-body text-sm text-warm-white/50">
              {item.labelJp}
            </span>
          </Link>
        ))}
      </nav>

      <div
        className="border-t border-warm-white/15 py-6"
        style={{ paddingInline: "var(--page-gutter)" }}
      >
        <p className="type-label mb-4 text-[10px] text-warm-white/40">
          THE UPDATE DISTRICT — 5 ZONES
        </p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-5">
          {businesses.map((b) => (
            <li key={b.slug}>
              <Link
                href={`/business/${b.slug}`}
                onClick={onClose}
                className="type-label block text-[11px] text-warm-white/70 hover:text-warm-white"
              >
                {b.code} {b.zoneName}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={contactNav.href}
          onClick={onClose}
          className="type-label mt-6 inline-flex rounded-full border border-warm-white px-6 py-3 text-[11px] hover:bg-warm-white hover:text-ink"
        >
          {contactNav.label}
        </Link>
      </div>
    </div>
  );
}
