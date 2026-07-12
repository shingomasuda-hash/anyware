"use client";

import { useInView } from "@/lib/useInView";
import InteriorScene from "@/components/home/InteriorScene";

export default function PhilosophySection() {
  const { ref, inView } = useInView<HTMLElement>(0.35);

  return (
    <section
      id="philosophy"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-night-green py-24 text-warm-white"
      aria-labelledby="philosophy-heading"
    >
      <div className="absolute inset-0">
        <InteriorScene active={inView} className="h-full w-full" />
      </div>
      <div className="surface-vignette" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-night-green via-night-green/50 to-transparent" />

      {/* 光で描かれた壁面サイン */}
      <p
        aria-hidden="true"
        className={`type-display pointer-events-none absolute right-[4%] top-[14%] max-w-[46%] text-right text-[clamp(2.2rem,6.5vw,5.5rem)] leading-[1.05] text-amber-light transition-all duration-[1400ms] ease-district sm:right-[6%] ${
          inView ? "opacity-90 blur-0" : "opacity-25 blur-[2px]"
        }`}
        style={{ textShadow: "0 0 40px rgba(241,184,107,0.45), 0 0 90px rgba(241,184,107,0.2)" }}
      >
        余白を、
        <br />
        遊び場に。
      </p>

      <div
        className="relative z-10 mx-auto w-full max-w-[1400px]"
        style={{ paddingInline: "var(--page-gutter)" }}
      >
        <div
          className={`max-w-md rounded-sm transition-all duration-1000 ease-district ${
            inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="type-label inline-flex items-center gap-3 text-[11px] text-warm-white/60">
            <span className="h-[1px] w-8 bg-warm-white/40" aria-hidden="true" />
            PHILOSOPHY
          </span>
          <h2 id="philosophy-heading" className="type-display mt-5 text-[clamp(1.5rem,3.2vw,2.1rem)] leading-[1.15]">
            WE FIND THE
            <br />
            UNUSED POSSIBILITY.
          </h2>
          <p className="type-jp-body mt-7 text-[15px] leading-loose text-warm-white/90 [text-shadow:0_2px_16px_rgba(0,0,0,0.7)]">
            地域や企業には、まだ名前のついていない価値があります。
            私たちは、その余白を見つけ、人が動く体験へと編集し、事業として根づくところまで伴走します。
          </p>
          <p className="type-jp-body mt-5 text-sm text-warm-white/60 [text-shadow:0_2px_14px_rgba(0,0,0,0.7)]">
            伝えるだけでは終わらない。つくるだけでも終わらない。動き出し、育ち続けるところまで。
          </p>
        </div>
      </div>
    </section>
  );
}
