"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { businesses } from "@/data/businesses";
import BusinessZoneScene from "@/components/home/BusinessZoneScene";
import { useReducedMotion } from "@/components/motion/MotionProvider";

export default function BusinessDistrict() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="business" className="relative bg-ink" aria-label="AnyWareの5つの事業空間">
      <div className="hidden md:block">
        {!reducedMotion ? <PinnedTour /> : <StackedRooms />}
      </div>
      <div className="md:hidden">
        <StackedRooms />
      </div>
    </section>
  );
}

function PinnedTour() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const progress = Math.min(1, Math.max(0, -rect.top / total));
        const idx = Math.min(businesses.length - 1, Math.floor(progress * businesses.length));
        setActive(idx);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ height: `${businesses.length * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        {businesses.map((b, i) => (
          <div
            key={b.slug}
            className="absolute inset-0 transition-opacity duration-700 ease-district"
            style={{ opacity: active === i ? 1 : 0 }}
            aria-hidden={active !== i}
          >
            <BusinessZoneScene slug={b.slug} accent={b.accent} />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/50" />
        <div className="surface-vignette" />

        {/* サイン案内板（コンテンツ） */}
        <div
          className="relative z-10 flex h-full flex-col justify-end pb-20 sm:pb-24"
          style={{ paddingInline: "var(--page-gutter)" }}
        >
          <div className="relative max-w-lg" style={{ minHeight: "220px" }}>
            {businesses.map((b, i) => (
              <div
                key={b.slug}
                className={`absolute inset-0 transition-all duration-700 ease-district ${
                  active === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
                }`}
                aria-hidden={active !== i}
              >
                <span className="type-label text-[11px] text-amber-light/90">
                  {b.code} / {b.zoneName}
                </span>
                <h3 className="type-jp-heading mt-3 text-2xl text-warm-white sm:text-3xl">
                  {b.nameJp}
                </h3>
                <p className="type-jp-body mt-4 max-w-md text-sm leading-relaxed text-warm-white/80 [text-shadow:0_2px_14px_rgba(0,0,0,0.6)]">
                  {b.catchJp}
                </p>
                <Link
                  href={`/business/${b.slug}`}
                  className="sign-plate type-label mt-7 inline-flex rounded-sm px-6 py-3.5 text-[11px] text-warm-white"
                >
                  {b.enterCta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* 進行インジケーター */}
        <div className="absolute right-6 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-4 sm:right-10">
          {businesses.map((b, i) => (
            <a
              key={b.slug}
              href={`#business`}
              onClick={(e) => {
                e.preventDefault();
                const el = wrapRef.current;
                if (!el) return;
                const total = el.getBoundingClientRect().height - window.innerHeight;
                window.scrollTo({
                  top: el.offsetTop + (total * i) / (businesses.length - 1) + 4,
                  behavior: "smooth",
                });
              }}
              className="group flex items-center gap-2"
              aria-label={`${b.code} ${b.nameJp}へ移動`}
              aria-current={active === i ? "true" : undefined}
            >
              <span
                className={`h-2 w-2 rounded-full border border-warm-white/60 transition-all ${
                  active === i ? "bg-amber-light scale-125" : "bg-transparent"
                }`}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function StackedRooms() {
  return (
    <div>
      {businesses.map((b, i) => (
        <div key={b.slug} className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
          <div className="absolute inset-0">
            <BusinessZoneScene slug={b.slug} accent={b.accent} />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/40" />

          <div className="relative z-10 pb-16 pt-24" style={{ paddingInline: "var(--page-gutter)" }}>
            <span className="type-label text-[11px] text-amber-light/90">
              {b.code} / {b.zoneName}
            </span>
            <h3 className="type-jp-heading mt-3 text-2xl text-warm-white">{b.nameJp}</h3>
            <p className="type-jp-body mt-4 text-sm leading-relaxed text-warm-white/80 [text-shadow:0_2px_14px_rgba(0,0,0,0.6)]">
              {b.catchJp}
            </p>
            <Link
              href={`/business/${b.slug}`}
              className="sign-plate type-label mt-7 inline-flex rounded-sm px-6 py-3.5 text-[11px] text-warm-white"
            >
              {b.enterCta}
            </Link>
            <p className="type-label mt-8 text-[10px] text-warm-white/35">
              {String(i + 1).padStart(2, "0")} / {String(businesses.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
