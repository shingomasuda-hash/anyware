import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageIntro from "@/components/ui/PageIntro";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactCta from "@/components/ui/ContactCta";
import { works } from "@/data/works";
import { businesses } from "@/data/businesses";

export const metadata: Metadata = buildMetadata({
  title: "WORKS｜支援実績｜株式会社AnyWare",
  description:
    "株式会社AnyWareの支援実績一覧。地域創生、ブランディング・PR、飲食、水耕栽培など、事業を通じて生まれた変化を紹介します。",
  path: "/works",
});

export default function WorksIndexPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "TOP", path: "/" }, { name: "WORKS", path: "/works" }]} />
      <PageIntro
        eyebrow="WORKS"
        title="生まれた変化。"
        lead="確認できる範囲の支援実績をまとめています。詳細な内容は順次更新してまいります。"
        topOffset={false}
      />

      <section className="bg-warm-white pb-20 sm:pb-28">
        <div className="mx-auto max-w-[1100px]" style={{ paddingInline: "var(--page-gutter)" }}>
          <SectionLabel eyebrow="ARCHIVE" />
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {works.map((work, index) => {
              const category = businesses.find((b) => b.slug === work.category);
              return (
                <li key={work.slug}>
                  <Link
                    href={`/works/${work.slug}`}
                    className="group flex flex-col gap-2 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                  >
                    <div className="flex items-start gap-5 sm:items-center">
                      <span className="type-display text-xl text-ink/20 sm:text-2xl">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <span className="type-label text-[10px] text-ink/40">
                          {category?.zoneName}
                        </span>
                        <p className="type-jp-heading mt-1 text-base text-ink sm:text-lg">
                          {work.title}
                        </p>
                        <p className="type-jp-body mt-1 text-sm text-ink/60">
                          {work.resultHeadline}
                        </p>
                      </div>
                    </div>
                    <span className="type-label shrink-0 text-[11px] text-ink/60 transition-transform group-hover:translate-x-1">
                      READ CASE →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
