import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageIntro from "@/components/ui/PageIntro";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactCta from "@/components/ui/ContactCta";
import { companyFacts, mvv } from "@/data/company";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "COMPANY｜会社概要｜株式会社AnyWare",
  description:
    "株式会社AnyWareの会社概要。地域創生、ブランディング・PR、事業伴走、飲食店事業、水耕栽培を横断するREGIONAL CREATIVE COMPANYです。",
  path: "/company",
});

export default function CompanyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "TOP", path: "/" }, { name: "COMPANY", path: "/company" }]} />
      <PageIntro eyebrow="WHO WE ARE" title="会社概要" topOffset={false} />

      <section className="bg-warm-white pb-20 sm:pb-28">
        <div className="mx-auto max-w-[900px]" style={{ paddingInline: "var(--page-gutter)" }}>
          <dl className="divide-y divide-line border-y border-line">
            {companyFacts.map((fact) => (
              <div key={fact.label} className="grid gap-1 py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
                <dt className="type-label text-[11px] text-ink/40">{fact.label}</dt>
                <dd className="type-jp-body text-sm text-ink/85">
                  {fact.value ?? "確認中（公開までに確定いたします）"}
                </dd>
              </div>
            ))}
          </dl>
          <p className="type-jp-body mt-6 text-xs text-ink/45">
            ※
            一部項目は本サイト制作時点で一次情報を確認できなかったため「確認中」としています。確定次第、更新いたします。
          </p>
        </div>
      </section>

      <section className="bg-bone py-20 sm:py-28" aria-labelledby="company-mvv-heading">
        <div className="mx-auto max-w-[900px] text-center" style={{ paddingInline: "var(--page-gutter)" }}>
          <SectionLabel eyebrow="MVV" align="center" />
          <h2 id="company-mvv-heading" className="sr-only">
            ミッション・ビジョン・バリュー
          </h2>
          <p className="type-display mt-6 text-2xl text-ink sm:text-3xl">{mvv.mission.body}</p>
          <p className="type-display mt-4 text-xl text-bronze sm:text-2xl">{mvv.vision.body}</p>
          <div className="mt-4 space-y-1">
            {mvv.value.body.map((line) => (
              <p key={line} className="type-display text-lg text-ink/80 sm:text-xl">
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-16 text-center sm:py-20">
        <p className="type-jp-body text-sm text-ink/60">{siteConfig.contact.businessArea}</p>
      </section>

      <ContactCta />
    </>
  );
}
