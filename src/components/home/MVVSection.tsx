"use client";

import { mvv } from "@/data/company";
import DistrictIllustration from "@/components/home/DistrictIllustration";
import { useInView } from "@/lib/useInView";

export default function MVVSection() {
  const { ref, inView } = useInView<HTMLElement>(0.2);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-ink py-24 text-warm-white sm:py-36"
      aria-labelledby="mvv-heading"
    >
      <h2 id="mvv-heading" className="sr-only">
        AnyWareのミッション・ビジョン・バリュー
      </h2>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] opacity-40">
        <DistrictIllustration className="h-full w-full" litCount={inView ? 5 : 0} showConnections />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink/60 to-ink" />

      <div
        className="relative mx-auto flex max-w-[1300px] flex-col gap-16 sm:gap-24"
        style={{ paddingInline: "var(--page-gutter)" }}
      >
        {/* MISSION: 建物の屋上・外壁 */}
        <div
          className="transition-all duration-1000 ease-district"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)" }}
        >
          <span className="type-label inline-flex items-center gap-3 text-[11px] text-amber-light/80">
            <span className="h-[1px] w-8 bg-amber-light/50" aria-hidden="true" />
            {mvv.mission.label} — ROOFTOP
          </span>
          <p className="type-display mt-4 text-[clamp(2.2rem,7vw,5rem)] leading-[1.02]">
            {mvv.mission.body}
          </p>
        </div>

        {/* VISION: 建物中央の大空間 */}
        <div
          className="transition-all duration-1000 ease-district sm:ml-[12%]"
          style={{ transitionDelay: "0.3s", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)" }}
        >
          <span className="type-label inline-flex items-center gap-3 text-[11px] text-amber-light/80">
            <span className="h-[1px] w-8 bg-amber-light/50" aria-hidden="true" />
            {mvv.vision.label} — GREAT HALL
          </span>
          <p className="type-display mt-4 text-[clamp(1.9rem,6vw,4.2rem)] leading-[1.05] text-bronze">
            {mvv.vision.body}
          </p>
        </div>

        {/* VALUE: 入口・通路 */}
        <div
          className="transition-all duration-1000 ease-district sm:ml-[24%]"
          style={{ transitionDelay: "0.6s", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)" }}
        >
          <span className="type-label inline-flex items-center gap-3 text-[11px] text-amber-light/80">
            <span className="h-[1px] w-8 bg-amber-light/50" aria-hidden="true" />
            {mvv.value.label} — ENTRANCE
          </span>
          <div className="type-display mt-4 space-y-1 text-[clamp(1.7rem,5vw,3.4rem)] leading-[1.1] text-warm-white/90">
            {mvv.value.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
