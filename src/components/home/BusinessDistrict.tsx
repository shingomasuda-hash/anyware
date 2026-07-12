"use client";

import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { businesses } from "@/data/businesses";
import BusinessZone from "./BusinessZone";

export default function BusinessDistrict() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({
      left: dir * trackRef.current.clientWidth * 0.9,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="business"
      className="bg-ink py-24 sm:py-32"
      aria-labelledby="business-heading"
    >
      <div
        className="mx-auto flex max-w-[1600px] flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        style={{ paddingInline: "var(--page-gutter)" }}
      >
        <div>
          <SectionLabel eyebrow="BUSINESS ECOSYSTEM" tone="light" />
          <h2
            id="business-heading"
            className="type-display mt-6 text-[clamp(1.8rem,4.4vw,3rem)] leading-[1.05] text-warm-white"
          >
            ONE DISTRICT.
            <br />
            FIVE WAYS TO MOVE IT.
          </h2>
          <p className="type-jp-body mt-5 max-w-md text-sm text-warm-white/70">
            5つの事業で、ひとつの経済圏を動かす。それぞれの部屋に入りながら、AnyWareの事業を巡ってください。
          </p>
        </div>

        <div className="hidden gap-3 sm:flex">
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-warm-white/30 text-warm-white transition-colors hover:bg-warm-white hover:text-ink"
            aria-label="前の事業へ"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-warm-white/30 text-warm-white transition-colors hover:bg-warm-white hover:text-ink"
            aria-label="次の事業へ"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        style={{ paddingInline: "var(--page-gutter)" }}
        role="list"
        aria-label="AnyWareの5つの事業"
      >
        {businesses.map((business) => (
          <div role="listitem" key={business.slug}>
            <BusinessZone business={business} />
          </div>
        ))}
      </div>
    </section>
  );
}
