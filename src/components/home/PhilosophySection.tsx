"use client";

import { useInView } from "@/lib/useInView";
import SectionLabel from "@/components/ui/SectionLabel";

export default function PhilosophySection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);

  return (
    <section
      id="philosophy"
      className="bg-warm-white py-24 sm:py-32"
      aria-labelledby="philosophy-heading"
    >
      <div
        className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-2 lg:items-center"
        style={{ paddingInline: "var(--page-gutter)" }}
      >
        <div>
          <SectionLabel eyebrow="PHILOSOPHY" />
          <h2
            id="philosophy-heading"
            className="type-display mt-6 text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.1] text-ink"
          >
            WE FIND THE
            <br />
            UNUSED POSSIBILITY.
          </h2>
          <p className="type-jp-body mt-8 max-w-lg text-[15px] text-ink/80">
            地域や企業には、まだ名前のついていない価値があります。
            <br />
            私たちは、その余白を見つけ、人が動く体験へと編集し、事業として根づくところまで伴走します。
          </p>
          <p className="type-jp-body mt-6 max-w-lg text-sm text-ink/50">
            伝えるだけでは終わらない。つくるだけでも終わらない。動き出し、育ち続けるところまで。
          </p>
        </div>

        <div
          ref={ref}
          className="relative aspect-[4/3] overflow-hidden rounded-md border border-line bg-charcoal"
        >
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ease-district ${
              inView ? "opacity-0" : "opacity-100"
            }`}
          >
            <EmptyRoom />
          </div>
          <div
            className={`absolute inset-0 transition-all duration-[1400ms] ease-district ${
              inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <ActivatedRoom />
          </div>
          <p className="type-label absolute bottom-4 left-4 text-[10px] text-warm-white/60">
            {inView ? "ACTIVATED SPACE" : "UNUSED SPACE"}
          </p>
        </div>
      </div>
    </section>
  );
}

function EmptyRoom() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      <rect x="0" y="0" width="400" height="300" fill="#242522" />
      <rect x="24" y="24" width="352" height="252" fill="none" stroke="rgba(241,235,221,0.15)" strokeWidth="1.5" />
      <line x1="24" y1="150" x2="376" y2="150" stroke="rgba(241,235,221,0.1)" strokeWidth="1" />
    </svg>
  );
}

function ActivatedRoom() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      <rect x="0" y="0" width="400" height="300" fill="#253A2B" />
      <rect x="24" y="24" width="352" height="252" fill="none" stroke="rgba(241,235,221,0.15)" strokeWidth="1.5" />
      {[70, 150, 230, 310].map((x, i) => (
        <rect
          key={x}
          x={x}
          y="60"
          width="28"
          height="12"
          rx="2"
          fill="#f6dfae"
          className="motion-safe-only animate-shimmer"
          style={{ animationDelay: `${i * 0.35}s` }}
        />
      ))}
      <rect x="70" y="200" width="180" height="8" rx="3" fill="#9A714A" />
      {[90, 130, 170, 210].map((x) => (
        <circle key={x} cx={x} cy="190" r="6" fill="#f1ebdd" opacity="0.8" />
      ))}
      <ellipse
        cx="320"
        cy="180"
        rx="8"
        ry="18"
        fill="#c8e0da"
        className="motion-safe-only animate-leafSway"
        style={{ transformOrigin: "320px 200px" }}
      />
    </svg>
  );
}
