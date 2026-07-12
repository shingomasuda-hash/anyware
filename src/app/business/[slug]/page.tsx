import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactCta from "@/components/ui/ContactCta";
import FaqList from "@/components/ui/FaqList";
import BusinessZoneScene from "@/components/home/BusinessZoneScene";
import { businesses, getBusinessBySlug } from "@/data/businesses";
import { works } from "@/data/works";

export function generateStaticParams() {
  return businesses.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const business = getBusinessBySlug(params.slug);
  if (!business) return {};
  return buildMetadata({
    title: `${business.nameJp}｜BUSINESS｜株式会社AnyWare`,
    description: business.leadJp,
    path: `/business/${business.slug}`,
  });
}

export default function BusinessDetailPage({ params }: { params: { slug: string } }) {
  const business = getBusinessBySlug(params.slug);
  if (!business) notFound();

  const relatedWorks = works.filter((w) => w.category === business.slug);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "TOP", path: "/" },
          { name: "BUSINESS", path: "/business" },
          { name: business.zoneName, path: `/business/${business.slug}` },
        ]}
      />

      <section className="grid gap-0 bg-ink text-warm-white lg:grid-cols-2" aria-labelledby="business-detail-heading">
        <div className="order-2 flex flex-col justify-center py-16 sm:py-20 lg:order-1 lg:py-0" style={{ paddingInline: "var(--page-gutter)" }}>
          <SectionLabel eyebrow={`${business.code} / ${business.zoneName}`} tone="light" />
          <h1 id="business-detail-heading" className="type-display mt-6 text-[clamp(1.9rem,4.6vw,3.2rem)] leading-[1.1]">
            {business.nameEn}
          </h1>
          <p className="type-jp-heading mt-3 text-lg text-warm-white/80">{business.nameJp}</p>
          <p className="type-jp-body mt-6 max-w-md text-[15px] leading-loose text-warm-white/85">
            {business.leadJp}
          </p>
        </div>
        <div className="order-1 aspect-[6/5] lg:order-2 lg:aspect-auto">
          <BusinessZoneScene slug={business.slug} accent={business.accent} />
        </div>
      </section>

      <section className="bg-warm-white py-20 sm:py-28" aria-labelledby="role-heading">
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[1fr_1.2fr]" style={{ paddingInline: "var(--page-gutter)" }}>
          <div>
            <SectionLabel eyebrow="ROLE" />
            <h2 id="role-heading" className="type-jp-heading mt-6 text-xl text-ink">
              私たちの役割
            </h2>
            <p className="type-jp-body mt-4 text-[15px] leading-loose text-ink/75">{business.role}</p>
          </div>
          <div>
            <SectionLabel eyebrow="OFTEN HEARD" />
            <h2 className="type-jp-heading mt-6 text-xl text-ink">よくある課題</h2>
            <ul className="mt-4 space-y-3">
              {business.challenges.map((c) => (
                <li key={c} className="type-jp-body flex gap-3 text-sm leading-relaxed text-ink/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-bone py-20 sm:py-28" aria-labelledby="approach-heading">
        <div className="mx-auto max-w-[900px] text-center" style={{ paddingInline: "var(--page-gutter)" }}>
          <SectionLabel eyebrow="OUR APPROACH" align="center" />
          <h2 id="approach-heading" className="type-jp-heading mt-6 text-xl text-ink sm:text-2xl">
            AnyWareの考え方
          </h2>
          <p className="type-jp-body mx-auto mt-5 max-w-2xl text-[15px] leading-loose text-ink/75">
            {business.approach}
          </p>
        </div>
      </section>

      <section className="bg-warm-white py-20 sm:py-28" aria-labelledby="offerings-heading">
        <div className="mx-auto max-w-[1100px]" style={{ paddingInline: "var(--page-gutter)" }}>
          <SectionLabel eyebrow="WHAT WE DO" />
          <h2 id="offerings-heading" className="type-jp-heading mt-6 text-xl text-ink">
            支援・事業内容
          </h2>
          <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {business.offerings.map((o) => (
              <li key={o} className="type-jp-body border-b border-line pb-4 text-sm text-ink/80">
                {o}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-charcoal py-20 text-warm-white sm:py-28" aria-labelledby="process-heading">
        <div className="mx-auto max-w-[1200px]" style={{ paddingInline: "var(--page-gutter)" }}>
          <SectionLabel eyebrow="PROCESS" tone="light" />
          <h2 id="process-heading" className="type-jp-heading mt-6 text-xl">
            進め方
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-5">
            {business.process.map((p) => (
              <li key={p.step}>
                <span className="type-display text-2xl text-warm-white/30">{p.step}</span>
                <p className="type-display mt-2 text-base">{p.title}</p>
                <p className="type-jp-body mt-2 text-xs text-warm-white/60">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {relatedWorks.length > 0 && (
        <section className="bg-warm-white py-20 sm:py-28" aria-labelledby="related-works-heading">
          <div className="mx-auto max-w-[1100px]" style={{ paddingInline: "var(--page-gutter)" }}>
            <SectionLabel eyebrow="RELATED WORKS" />
            <h2 id="related-works-heading" className="type-jp-heading mt-6 text-xl text-ink">
              関連実績
            </h2>
            <ul className="mt-8 space-y-4">
              {relatedWorks.map((w) => (
                <li key={w.slug}>
                  <Link
                    href={`/works/${w.slug}`}
                    className="flex flex-col gap-1 border-b border-line py-4 hover:opacity-70 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="type-jp-heading text-base text-ink">{w.title}</span>
                    <span className="type-label text-[11px] text-ink/50">{w.resultHeadline} →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-bone py-20 sm:py-28" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-[900px]" style={{ paddingInline: "var(--page-gutter)" }}>
          <SectionLabel eyebrow="FAQ" />
          <h2 id="faq-heading" className="type-jp-heading mt-6 text-xl text-ink">
            よくある質問
          </h2>
          <div className="mt-8">
            <FaqList items={business.faq} />
          </div>
        </div>
      </section>

      <ContactCta
        title={`${business.nameJp}について相談する`}
        body="現状の課題が整理できていない段階でもご相談いただけます。まずはお話をお聞かせください。"
      />
    </>
  );
}
