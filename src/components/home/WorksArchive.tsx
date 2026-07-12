"use client";

import Link from "next/link";
import { works } from "@/data/works";
import { businesses } from "@/data/businesses";
import BusinessZoneScene from "@/components/home/BusinessZoneScene";
import { useInView } from "@/lib/useInView";

// デスクトップでの配置（実績ごとに異なるレイアウト＝雑誌の見開きのような編集）
const LAYOUT = [
  { pos: "left-0 top-0 w-[62%] h-[560px]", z: 10 }, // 1件目: 大きく横長
  { pos: "right-[2%] top-[80px] w-[30%] h-[440px]", z: 20 }, // 2件目: 縦長・重なる
  { pos: "left-[8%] top-[610px] w-[46%] h-[320px]", z: 10 }, // 3件目: 横長
  { pos: "right-[6%] top-[640px] w-[34%] h-[280px]", z: 15 }, // 4件目
];

export default function WorksArchive() {
  return (
    <section id="works" className="relative overflow-hidden bg-ink py-24 sm:py-32" aria-labelledby="works-heading">
      {/* 背景の巨大文字 */}
      <p
        aria-hidden="true"
        className="type-display pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 select-none whitespace-nowrap text-[clamp(6rem,20vw,16rem)] leading-none text-warm-white/[0.04]"
      >
        WORKS
      </p>

      <div className="relative mx-auto max-w-[1600px]" style={{ paddingInline: "var(--page-gutter)" }}>
        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="type-label inline-flex items-center gap-3 text-[11px] text-warm-white/60">
              <span className="h-[1px] w-8 bg-warm-white/40" aria-hidden="true" />
              MOVEMENT WE CREATED
            </span>
            <h2 id="works-heading" className="type-display mt-6 text-[clamp(1.8rem,4.2vw,2.9rem)] leading-[1.1] text-warm-white">
              生まれた変化。
            </h2>
          </div>
          <Link
            href="/works"
            className="type-label inline-flex items-center gap-2 text-[11px] text-warm-white/70 hover:text-warm-white"
          >
            VIEW ALL WORKS →
          </Link>
        </div>

        {/* デスクトップ: 重なりのある編集レイアウト */}
        <div className="relative mt-16 hidden md:block" style={{ height: "960px" }}>
          {works.map((work, index) => {
            const layout = LAYOUT[index % LAYOUT.length];
            const category = businesses.find((b) => b.slug === work.category);
            return (
              <WorkPanel
                key={work.slug}
                work={work}
                index={index}
                categoryLabel={category?.zoneName}
                accent={category?.accent ?? "bronze"}
                className={`absolute ${layout.pos}`}
                style={{ zIndex: layout.z }}
              />
            );
          })}
        </div>

        {/* モバイル: 縦積み、1件ずつ異なる比率 */}
        <div className="mt-14 flex flex-col gap-6 md:hidden">
          {works.map((work, index) => {
            const category = businesses.find((b) => b.slug === work.category);
            return (
              <WorkPanel
                key={work.slug}
                work={work}
                index={index}
                categoryLabel={category?.zoneName}
                accent={category?.accent ?? "bronze"}
                className={`relative w-full ${index % 2 === 0 ? "h-[360px]" : "h-[440px]"}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WorkPanel({
  work,
  index,
  categoryLabel,
  accent,
  className,
  style,
}: {
  work: (typeof works)[number];
  index: number;
  categoryLabel?: string;
  accent: string;
  className: string;
  style?: React.CSSProperties;
}) {
  // 注意: IntersectionObserverの対象要素自体にclip-pathを付けると、
  // 描画上の面積が0になり判定が発火しなくなる。refは素の外枠に、
  // clip-pathは内側の別要素にかける。
  const { ref, inView } = useInView<HTMLAnchorElement>(0.2);

  return (
    <Link
      href={`/works/${work.slug}`}
      ref={ref}
      className={`group block overflow-hidden rounded-sm border border-line-light ${className}`}
      style={style}
    >
      <div
        className="relative h-full w-full"
        style={{
          clipPath: inView ? "inset(0 0 0 0)" : "inset(0 0 0 100%)",
          transition: "clip-path 1s var(--ease-camera)",
          transitionDelay: `${index * 120}ms`,
        }}
      >
        <BusinessZoneScene slug={work.category} accent={accent} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

        {categoryLabel && (
          <span className="type-label absolute left-4 top-4 rounded-sm border border-warm-white/30 bg-night-green/60 px-2.5 py-1 text-[9px] text-warm-white/85">
            {categoryLabel}
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="type-display text-[clamp(1.1rem,2.4vw,1.7rem)] leading-[1.15] text-warm-white transition-transform duration-500 group-hover:-translate-y-1">
            {work.title}
          </p>
          <p className="type-jp-body mt-2 text-xs text-warm-white/70">{work.resultHeadline}</p>
        </div>
      </div>
    </Link>
  );
}
