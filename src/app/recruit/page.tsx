import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageIntro from "@/components/ui/PageIntro";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactCta from "@/components/ui/ContactCta";
import { recruitCopy } from "@/data/company";
import { businesses } from "@/data/businesses";

export const metadata: Metadata = buildMetadata({
  title: "RECRUIT｜採用情報｜株式会社AnyWare",
  description:
    "株式会社AnyWareの採用情報。地域創生、ブランディング・PR、事業伴走、飲食、水耕栽培という複数の事業領域を横断し、まだない仕事や事業を自らつくっていく仲間を求めています。",
  path: "/recruit",
});

export default function RecruitPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "TOP", path: "/" }, { name: "RECRUIT", path: "/recruit" }]} />
      <PageIntro
        eyebrow="JOIN ANYWARE"
        title={recruitCopy.headline}
        lead={recruitCopy.headlineJp}
        tone="dark"
        topOffset={false}
      />

      <section className="bg-warm-white py-20 sm:py-28">
        <div className="mx-auto max-w-[900px]" style={{ paddingInline: "var(--page-gutter)" }}>
          {recruitCopy.body.map((p) => (
            <p key={p} className="type-jp-body mb-5 text-[15px] leading-loose text-ink/80">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="bg-bone py-20 sm:py-28" aria-labelledby="recruit-points-heading">
        <div className="mx-auto max-w-[1100px]" style={{ paddingInline: "var(--page-gutter)" }}>
          <SectionLabel eyebrow="WHY ANYWARE" />
          <h2 id="recruit-points-heading" className="sr-only">
            AnyWareで働く理由
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {recruitCopy.points.map((point) => (
              <div key={point.title} className="rounded-md border border-line bg-warm-white p-6">
                <h3 className="type-jp-heading text-lg text-ink">{point.title}</h3>
                <p className="type-jp-body mt-3 text-sm leading-relaxed text-ink/70">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-warm-white sm:py-28" aria-labelledby="recruit-fields-heading">
        <div className="mx-auto max-w-[1100px]" style={{ paddingInline: "var(--page-gutter)" }}>
          <SectionLabel eyebrow="FIELDS" tone="light" />
          <h2 id="recruit-fields-heading" className="type-jp-heading mt-6 text-xl">
            関われる事業領域
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {businesses.map((b) => (
              <li key={b.slug} className="rounded-md border border-warm-white/15 p-5">
                <span className="type-label text-[10px] text-warm-white/50">
                  {b.code} / {b.zoneName}
                </span>
                <p className="type-jp-heading mt-2 text-base">{b.nameJp}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCta
        title="AnyWareでの働き方について聞いてみる"
        body="募集職種の詳細はお問い合わせフォームよりお気軽にご連絡ください。相談から始めていただいて構いません。"
      />
    </>
  );
}
