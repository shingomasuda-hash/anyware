import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata, articleJsonLd } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactCta from "@/components/ui/ContactCta";
import { newsPosts, getNewsBySlug } from "@/data/news";

export function generateStaticParams() {
  return newsPosts.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getNewsBySlug(params.slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.title}｜NEWS｜株式会社AnyWare`,
    description: post.excerpt,
    path: `/news/${post.slug}`,
  });
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const post = getNewsBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "TOP", path: "/" },
          { name: "NEWS", path: "/news" },
          { name: post.title, path: `/news/${post.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: post.title,
              description: post.excerpt,
              path: `/news/${post.slug}`,
              datePublished: post.date,
            })
          ),
        }}
      />

      <article className="bg-warm-white pb-24 pt-10 sm:pb-32">
        <div className="mx-auto max-w-[760px]" style={{ paddingInline: "var(--page-gutter)" }}>
          <SectionLabel eyebrow={post.category} />
          <h1 className="type-display mt-6 text-[clamp(1.6rem,4vw,2.4rem)] leading-[1.2] text-ink">
            {post.title}
          </h1>
          <time dateTime={post.date} className="type-label mt-4 block text-[11px] text-ink/40">
            {post.date}
          </time>

          <div className="type-jp-body mt-10 space-y-5 text-[15px] leading-loose text-ink/80">
            {post.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {post.relatedWorkSlug && (
            <Link
              href={`/works/${post.relatedWorkSlug}`}
              className="type-label mt-10 inline-flex items-center gap-2 text-[11px] text-ink/70 hover:text-ink"
            >
              関連する実績を見る →
            </Link>
          )}

          <Link
            href="/news"
            className="type-label mt-14 block text-[11px] text-ink/60 hover:text-ink"
          >
            ← お知らせ一覧に戻る
          </Link>
        </div>
      </article>

      <ContactCta />
    </>
  );
}
