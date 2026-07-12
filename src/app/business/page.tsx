import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageIntro from "@/components/ui/PageIntro";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactCta from "@/components/ui/ContactCta";
import BusinessZoneScene from "@/components/home/BusinessZoneScene";
import { businesses } from "@/data/businesses";

export const metadata: Metadata = buildMetadata({
  title: "BUSINESS｜事業内容｜株式会社AnyWare",
  description:
    "地域創生・地域共創、ブランディング・PR、事業伴走・コンサルティング、飲食店事業、水耕栽培事業。AnyWareの5つの事業と、それらがつながる仕組みを紹介します。",
  path: "/business",
});

export default function BusinessIndexPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "TOP", path: "/" }, { name: "BUSINESS", path: "/business" }]} />
      <PageIntro
        eyebrow="BUSINESS"
        title="5つの事業で、ひとつの経済圏を動かす。"
        lead="地域創生、ブランディング・PR、事業伴走、飲食、水耕栽培。それぞれの事業は独立したサービスではなく、地域の魅力を見つけ、編集し、伝え、実装し、伴走し、循環させるという一つの流れでつながっています。"
        topOffset={false}
      />

      <section className="bg-warm-white pb-20 sm:pb-28">
        <div className="mx-auto max-w-[1400px]" style={{ paddingInline: "var(--page-gutter)" }}>
          <SectionLabel eyebrow="FIVE ZONES" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {businesses.map((b) => (
              <Link
                key={b.slug}
                href={`/business/${b.slug}`}
                className="group flex flex-col overflow-hidden rounded-md border border-line bg-charcoal text-warm-white"
              >
                <div className="aspect-[6/5] w-full">
                  <BusinessZoneScene slug={b.slug} accent={b.accent} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="type-label text-[11px] text-warm-white/50">
                    {b.code} / {b.zoneName}
                  </span>
                  <h2 className="type-jp-heading mt-2 text-lg">{b.nameJp}</h2>
                  <p className="type-jp-body mt-3 flex-1 text-sm text-warm-white/70">{b.catchJp}</p>
                  <span className="type-label mt-5 inline-flex items-center gap-2 text-[11px] transition-opacity group-hover:opacity-60">
                    {b.enterCta} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
