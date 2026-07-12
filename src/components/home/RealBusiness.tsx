"use client";

import { useInView } from "@/lib/useInView";

const CYCLE = [
  { label: "育てる", icon: "grow" as const },
  { label: "届ける", icon: "move" as const },
  { label: "食べる", icon: "eat" as const },
  { label: "人が集まる", icon: "people" as const },
  { label: "地域に価値が戻る", icon: "loop" as const },
];

export default function RealBusiness() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <section className="relative overflow-hidden bg-deep-green py-24 text-warm-white sm:py-32" aria-labelledby="real-business-heading">
      <p
        aria-hidden="true"
        className="type-display pointer-events-none absolute inset-x-0 top-10 select-none text-center text-[clamp(2.4rem,9vw,7rem)] leading-[0.95] text-warm-white/[0.06]"
      >
        WE DON&apos;T JUST
        <br />
        ADVISE. WE OPERATE.
      </p>

      <div className="relative mx-auto max-w-[1300px]" style={{ paddingInline: "var(--page-gutter)" }}>
        <span className="type-label inline-flex items-center gap-3 text-[11px] text-warm-white/60">
          <span className="h-[1px] w-8 bg-warm-white/40" aria-hidden="true" />
          REAL BUSINESS
        </span>
        <h2
          id="real-business-heading"
          className="type-display mt-6 max-w-2xl text-[clamp(1.7rem,4vw,2.7rem)] leading-[1.15]"
        >
          WE DON&apos;T JUST ADVISE.
          <br />
          WE OPERATE.
        </h2>

        <p className="type-jp-body mt-8 max-w-lg text-[15px] leading-loose text-warm-white/85">
          AnyWareは、外から提案するだけの会社ではありません。飲食店や水耕栽培など、自ら事業を立ち上げ、運営し、現場で得た知見を支援に還元します。
          <br />
          <br />
          だからこそ、机上の理想ではなく、現場で実行できる方法を考えます。
        </p>

        <div ref={ref} className="relative mt-20">
          <div className="hidden md:flex md:items-center md:justify-between">
            {CYCLE.map((item, i) => (
              <div key={item.label} className="flex items-center">
                <div
                  className="flex flex-col items-center gap-4 transition-all duration-700 ease-district"
                  style={{
                    transitionDelay: `${i * 0.25}s`,
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(14px)",
                  }}
                >
                  <CycleIcon type={item.icon} />
                  <span className="type-jp-heading whitespace-nowrap text-sm text-warm-white/90">{item.label}</span>
                </div>
                {i < CYCLE.length - 1 && (
                  <svg width="56" height="16" viewBox="0 0 56 16" className="mx-2 shrink-0" aria-hidden="true">
                    <line
                      x1="0"
                      y1="8"
                      x2="48"
                      y2="8"
                      stroke="#9CBDB5"
                      strokeWidth="2"
                      strokeDasharray="52"
                      style={{
                        strokeDashoffset: inView ? 0 : 52,
                        transition: `stroke-dashoffset 0.6s ease ${0.3 + i * 0.25}s`,
                      }}
                    />
                    <path d="M44,3 L52,8 L44,13" stroke="#9CBDB5" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6 md:hidden">
            {CYCLE.map((item, i) => (
              <div
                key={item.label}
                className="flex items-center gap-4 transition-all duration-700 ease-district"
                style={{
                  transitionDelay: `${i * 0.2}s`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateX(0)" : "translateX(-10px)",
                }}
              >
                <CycleIcon type={item.icon} />
                <span className="type-jp-heading text-base text-warm-white/90">{item.label}</span>
                {i < CYCLE.length - 1 && <span aria-hidden="true" className="ml-auto text-warm-white/40">↓</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CycleIcon({ type }: { type: "grow" | "move" | "eat" | "people" | "loop" }) {
  const common = "flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-water/40 bg-warm-white/5";
  switch (type) {
    case "grow":
      return (
        <div className={common}>
          <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
            <path d="M13,22 C13,12 7,10 5,4" stroke="#789366" strokeWidth="2.5" fill="none" strokeLinecap="round" className="motion-safe-only animate-leafSway" style={{ transformOrigin: "13px 22px" }} />
            <path d="M13,22 C13,13 19,10 21,5" stroke="#526849" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      );
    case "move":
      return (
        <div className={common}>
          <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
            <rect x="4" y="10" width="14" height="9" rx="1.5" stroke="#F1B86B" strokeWidth="2" fill="none" />
            <path d="M18,13 h4 l2,3 v3 h-6 Z" stroke="#F1B86B" strokeWidth="2" fill="none" />
            <circle cx="9" cy="20" r="1.6" fill="#F1B86B" />
            <circle cx="19" cy="20" r="1.6" fill="#F1B86B" />
          </svg>
        </div>
      );
    case "eat":
      return (
        <div className={common}>
          <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
            <ellipse cx="13" cy="16" rx="9" ry="3.4" stroke="#B56F4B" strokeWidth="2" fill="none" />
            <ellipse cx="13" cy="10" rx="4" ry="6" fill="#F5F0E5" opacity="0.25" className="motion-safe-only animate-steam" />
          </svg>
        </div>
      );
    case "people":
      return (
        <div className={common}>
          <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
            {[7, 13, 19].map((x) => (
              <g key={x}>
                <circle cx={x} cy="8" r="2.6" fill="#DFD5C2" opacity="0.8" />
                <path d={`M${x - 4},20 Q${x},11 ${x + 4},20 Z`} fill="#DFD5C2" opacity="0.6" />
              </g>
            ))}
          </svg>
        </div>
      );
    case "loop":
      return (
        <div className={common}>
          <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
            <path
              d="M6,13 A7,7 0 1 1 13,20"
              stroke="#F1B86B"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
            />
            <path d="M13,20 l-5,-1 l1,-5" stroke="#F1B86B" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
  }
}
