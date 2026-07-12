import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageIntro from "@/components/ui/PageIntro";
import SectionLabel from "@/components/ui/SectionLabel";
import { newsPosts } from "@/data/news";

export const metadata: Metadata = buildMetadata({
  title: "NEWS｜お知らせ｜株式会社AnyWare",
  description: "株式会社AnyWareの新着情報、活動レポート、コラムをまとめています。",
  path: "/news",
});

export default function NewsIndexPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "TOP", path: "/" }, { name: "NEWS", path: "/news" }]} />
      <PageIntro eyebrow="NEWS" title="お知らせ" topOffset={false} />

      <section className="bg-warm-white pb-24 sm:pb-32">
        <div className="mx-auto max-w-[900px]" style={{ paddingInline: "var(--page-gutter)" }}>
          <SectionLabel eyebrow="LATEST" />
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {newsPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/news/${post.slug}`}
                  className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:gap-6"
                >
                  <time dateTime={post.date} className="type-label w-28 shrink-0 text-[11px] text-ink/40">
                    {post.date}
                  </time>
                  <span className="type-label shrink-0 rounded-full border border-line px-3 py-1 text-[10px] text-ink/60">
                    {post.category}
                  </span>
                  <span className="type-jp-heading text-base text-ink hover:opacity-70">
                    {post.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
