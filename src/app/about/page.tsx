import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageIntro from "@/components/ui/PageIntro";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactCta from "@/components/ui/ContactCta";
import { mvv } from "@/data/company";

export const metadata: Metadata = buildMetadata({
  title: "ABOUT｜株式会社AnyWare",
  description:
    "株式会社AnyWareは、地域や企業に眠る可能性を発見し、価値として編集し、伝え、実行し、育てるREGIONAL CREATIVE COMPANYです。私たちの思想とMVVを紹介します。",
  path: "/about",
});

const FLOW = [
  "地域の魅力を見つける",
  "価値を編集する",
  "人に伝える",
  "事業として実装する",
  "現場に伴走する",
  "地域内で価値を循環させる",
];

const NOT_LIST = [
  "Web制作会社",
  "SNS運用代行会社",
  "広告代理店",
  "飲食コンサル会社",
  "水耕栽培会社",
  "地域創生コンサル会社",
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "TOP", path: "/" }, { name: "ABOUT", path: "/about" }]} />
      <PageIntro
        eyebrow="ABOUT"
        title="地域と企業に眠る可能性を、事業として育てる。"
        lead="AnyWareは、地域創生、ブランディング・PR、事業伴走、飲食、水耕栽培という異なる領域を横断しています。一見バラバラに見えるこれらの事業は、地域の経済圏を動かすひとつの流れとしてつながっています。"
        topOffset={false}
        tone="light"
      />

      <section className="bg-bone py-20 sm:py-28" aria-labelledby="not-list-heading">
        <div className="mx-auto max-w-[1100px]" style={{ paddingInline: "var(--page-gutter)" }}>
          <SectionLabel eyebrow="POSITIONING" />
          <h2 id="not-list-heading" className="type-jp-heading mt-6 max-w-2xl text-xl leading-relaxed text-ink sm:text-2xl">
            AnyWareは、単なる「{NOT_LIST.join("」「")}」ではありません。
          </h2>
          <p className="type-jp-body mt-6 max-w-2xl text-[15px] leading-loose text-ink/75">
            私たちの本質は、地域や企業に眠る可能性を発見し、価値として編集し、伝え、実行し、育てる会社であること。提案するだけでなく、現場に入り、手を動かし、実際の事業運営まで行うことがAnyWareの強みです。
          </p>
        </div>
      </section>

      <section className="bg-warm-white py-20 sm:py-28" aria-labelledby="flow-heading">
        <div className="mx-auto max-w-[1100px]" style={{ paddingInline: "var(--page-gutter)" }}>
          <SectionLabel eyebrow="ONE FLOW" />
          <h2 id="flow-heading" className="type-display mt-6 text-[clamp(1.6rem,3.6vw,2.4rem)] text-ink">
            すべての事業は、
            <br className="sm:hidden" />
            ひとつの流れでつながっている。
          </h2>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FLOW.map((step, i) => (
              <li
                key={step}
                className="rounded-md border border-line bg-bone/60 p-6"
              >
                <span className="type-display text-2xl text-moss">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="type-jp-heading mt-3 text-base text-ink">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink py-20 text-warm-white sm:py-28" aria-labelledby="mvv-about-heading">
        <div className="mx-auto max-w-[1100px]" style={{ paddingInline: "var(--page-gutter)" }}>
          <SectionLabel eyebrow="MVV" tone="light" />
          <h2 id="mvv-about-heading" className="sr-only">
            AnyWareのミッション・ビジョン・バリュー
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            <div>
              <p className="type-label text-[11px] text-warm-white/50">{mvv.mission.label}</p>
              <p className="type-display mt-3 text-3xl">{mvv.mission.body}</p>
            </div>
            <div>
              <p className="type-label text-[11px] text-warm-white/50">{mvv.vision.label}</p>
              <p className="type-display mt-3 text-3xl text-bronze">{mvv.vision.body}</p>
            </div>
            <div>
              <p className="type-label text-[11px] text-warm-white/50">{mvv.value.label}</p>
              {mvv.value.body.map((line) => (
                <p key={line} className="type-display mt-3 text-3xl">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
