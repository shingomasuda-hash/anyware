import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactCta from "@/components/ui/ContactCta";
import BusinessZoneScene from "@/components/home/BusinessZoneScene";
import { works, getWorkBySlug } from "@/data/works";
import { getBusinessBySlug } from "@/data/businesses";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const work = getWorkBySlug(params.slug);
  if (!work) return {};
  return buildMetadata({
    title: `${work.title}｜WORKS｜株式会社AnyWare`,
    description: work.summary,
    path: `/works/${work.slug}`,
  });
}

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const work = getWorkBySlug(params.slug);
  if (!work) notFound();
  const category = getBusinessBySlug(work.category);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "TOP", path: "/" },
          { name: "WORKS", path: "/works" },
          { name: work.title, path: `/works/${work.slug}` },
        ]}
      />

      <section className="bg-warm-white pb-20 pt-10 sm:pb-28">
        <div className="mx-auto max-w-[1000px]" style={{ paddingInline: "var(--page-gutter)" }}>
          {category && <SectionLabel eyebrow={`${category.code} / ${category.zoneName}`} />}
          <h1 className="type-display mt-6 text-[clamp(1.7rem,4.4vw,2.8rem)] leading-[1.15] text-ink">
            {work.title}
          </h1>
          <p className="type-jp-heading mt-4 text-lg text-clay">{work.resultHeadline}</p>

          <div className="mt-10 aspect-[16/9] overflow-hidden rounded-md">
            {category && <BusinessZoneScene slug={category.slug} accent={category.accent} />}
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="type-label text-[10px] text-ink/40">CLIENT</dt>
                <dd className="mt-1 text-ink/80">{work.clientLabel}</dd>
              </div>
              <div>
                <dt className="type-label text-[10px] text-ink/40">CATEGORY</dt>
                <dd className="mt-1 text-ink/80">{category?.nameJp}</dd>
              </div>
              <div>
                <dt className="type-label text-[10px] text-ink/40">DATE</dt>
                <dd className="mt-1 text-ink/80">{work.date}</dd>
              </div>
            </dl>
            <div>
              <p className="type-jp-body text-[15px] leading-loose text-ink/80">{work.summary}</p>
              {!work.confirmed && (
                <p className="type-jp-body mt-4 text-xs text-ink/50">
                  ※ 本記事は詳細情報を確認中です。公開前に一次情報での確認が必要です。
                </p>
              )}
            </div>
          </div>

          <Link
            href="/works"
            className="type-label mt-14 inline-flex items-center gap-2 text-[11px] text-ink/60 hover:text-ink"
          >
            ← 実績一覧に戻る
          </Link>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
