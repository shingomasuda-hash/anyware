import Link from "next/link";
import type { Business } from "@/data/businesses";
import BusinessZoneScene from "./BusinessZoneScene";

export default function BusinessZone({ business }: { business: Business }) {
  return (
    <article
      className="group relative flex w-[86vw] shrink-0 snap-start flex-col overflow-hidden rounded-md border border-warm-white/10 bg-charcoal text-warm-white sm:w-[70vw] md:w-[46vw] lg:w-[32vw]"
      aria-labelledby={`zone-${business.slug}-heading`}
    >
      <div className="relative aspect-[6/7] w-full overflow-hidden">
        <BusinessZoneScene slug={business.slug} accent={business.accent} />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <span className="type-label text-[11px] text-warm-white/50">
          {business.code} / {business.zoneName}
        </span>
        <h3
          id={`zone-${business.slug}-heading`}
          className="type-jp-heading mt-3 text-xl text-warm-white"
        >
          {business.nameJp}
        </h3>
        <p className="type-jp-body mt-4 flex-1 text-sm leading-relaxed text-warm-white/75">
          {business.catchJp}
        </p>
        <Link
          href={`/business/${business.slug}`}
          className="type-label mt-6 inline-flex items-center gap-2 text-[11px] text-warm-white transition-opacity group-hover:opacity-70"
        >
          {business.enterCta}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
