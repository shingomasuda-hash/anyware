import MagneticLink from "@/components/ui/MagneticLink";
import SectionLabel from "@/components/ui/SectionLabel";
import { consultationAreas } from "@/data/contact";

export default function ContactGateway() {
  return (
    <section id="contact" className="bg-clay py-24 text-warm-white sm:py-32" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-[1100px] text-center" style={{ paddingInline: "var(--page-gutter)" }}>
        <SectionLabel eyebrow="LET'S MOVE SOMETHING" align="center" tone="light" />
        <h2
          id="contact-heading"
          className="type-display mt-6 text-[clamp(2rem,5.6vw,3.6rem)] leading-[1.1]"
        >
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
              className="type-label rounded-full border border-warm-white/40 px-4 py-2 text-[10px] text-warm-white/85"
            >
              {area}
            </li>
          ))}
        </ul>

        <MagneticLink
          href="/contact"
          className="type-label mt-10 inline-flex rounded-full bg-warm-white px-9 py-4 text-[12px] text-ink"
        >
          相談の入口をつくる
        </MagneticLink>
      </div>
    </section>
  );
}
