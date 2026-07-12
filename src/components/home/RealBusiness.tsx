import SectionLabel from "@/components/ui/SectionLabel";

const CYCLE = ["育てる", "届ける", "食べる", "人が集まる", "地域に価値が戻る"];

export default function RealBusiness() {
  return (
    <section className="bg-deep-green py-24 text-warm-white sm:py-32" aria-labelledby="real-business-heading">
      <div className="mx-auto max-w-[1300px]" style={{ paddingInline: "var(--page-gutter)" }}>
        <SectionLabel eyebrow="REAL BUSINESS" tone="light" />
        <h2
          id="real-business-heading"
          className="type-display mt-6 max-w-2xl text-[clamp(1.7rem,4vw,2.7rem)] leading-[1.15]"
        >
          WE DON&apos;T JUST ADVISE.
          <br />
          WE OPERATE.
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <p className="type-jp-body text-[15px] leading-loose text-warm-white/85">
            AnyWareは、外から提案するだけの会社ではありません。
            <br />
            飲食店や水耕栽培など、自ら事業を立ち上げ、運営し、現場で得た知見を支援に還元します。
            <br />
            <br />
            だからこそ、机上の理想ではなく、現場で実行できる方法を考えます。
          </p>

          <div
            className="flex flex-wrap items-center gap-x-3 gap-y-5"
            role="list"
            aria-label="育てる、届ける、食べる、人が集まる、地域に価値が戻るという循環"
          >
            {CYCLE.map((word, i) => (
              <div key={word} className="flex items-center gap-3" role="listitem">
                <span className="type-jp-heading rounded-full border border-water/50 bg-warm-white/5 px-5 py-2.5 text-sm text-water">
                  {word}
                </span>
                {i < CYCLE.length - 1 ? (
                  <span aria-hidden="true" className="text-water/60">
                    →
                  </span>
                ) : (
                  <span aria-hidden="true" className="text-water/60">
                    ↺
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
