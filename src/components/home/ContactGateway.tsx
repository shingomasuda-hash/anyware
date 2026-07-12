import MagneticLink from "@/components/ui/MagneticLink";
import { consultationAreas } from "@/data/contact";

export default function ContactGateway() {
  return (
    <section id="contact" className="relative overflow-hidden bg-night-green py-24 text-warm-white sm:py-32" aria-labelledby="contact-heading">
      {/* エントランスの壁と扉 */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center opacity-70">
        <svg viewBox="0 0 1600 500" className="h-[70%] w-full" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <defs>
            <linearGradient id="entrance-glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F1B86B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#F1B86B" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="1600" height="500" fill="#0c0f0c" />
          {/* 光が漏れる開口部 */}
          <rect x="600" y="60" width="400" height="440" fill="url(#entrance-glow)" />
          <rect x="640" y="100" width="320" height="400" fill="#171915" />
          {/* 受付カウンター */}
          <rect x="520" y="420" width="560" height="30" rx="4" fill="#8B5E3C" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={560 + i * 130} y="380" width="26" height="40" fill="#F1B86B" opacity="0.4" />
          ))}
        </svg>
      </div>
      <div className="surface-vignette" />

      <div className="relative mx-auto max-w-[1100px] text-center" style={{ paddingInline: "var(--page-gutter)" }}>
        <span className="type-label inline-flex items-center gap-3 text-[11px] text-amber-light/90">
          <span className="h-[1px] w-8 bg-amber-light/60" aria-hidden="true" />
          LET&apos;S MOVE SOMETHING
        </span>
        <h2 id="contact-heading" className="type-display mt-6 text-[clamp(2rem,5.6vw,3.6rem)] leading-[1.1]">
          まだ整理できていない相談から、
          <br />
          一緒に始めましょう。
        </h2>
        <p className="type-jp-body mx-auto mt-6 max-w-xl text-sm text-warm-white/85">
          Web、SNS、採用、事業づくり、地域での取り組み、飲食、水耕栽培など、相談内容がまとまっていない段階でも構いません。
        </p>

        <ul className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-2" aria-label="相談領域の例">
          {consultationAreas.map((area) => (
            <li
              key={area}
              className="type-label rounded-full border border-warm-white/25 px-4 py-2 text-[10px] text-warm-white/70"
            >
              {area}
            </li>
          ))}
        </ul>

        {/* 扉が開くCTA */}
        <MagneticLink
          href="/contact"
          className="group relative mt-12 inline-flex items-center gap-4 overflow-hidden rounded-sm border border-amber-light/60 bg-night-green/70 px-9 py-5"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-amber-light/25 to-transparent opacity-0 transition-all duration-500 ease-district group-hover:opacity-100 group-hover:[transform:scaleX(1.15)]"
          />
          <span className="type-label relative text-[12px] text-warm-white">START A PROJECT</span>
          <span
            aria-hidden="true"
            className="relative text-amber-light transition-transform duration-500 ease-district group-hover:translate-x-2"
          >
            →
          </span>
        </MagneticLink>
      </div>
    </section>
  );
}
