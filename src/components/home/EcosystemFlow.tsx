"use client";

import SectionLabel from "@/components/ui/SectionLabel";
import { ecosystemFlow } from "@/data/company";
import { useInView } from "@/lib/useInView";

export default function EcosystemFlow() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <section className="bg-bone py-24 sm:py-32" aria-labelledby="how-we-work-heading">
      <div className="mx-auto max-w-[1400px]" style={{ paddingInline: "var(--page-gutter)" }}>
        <SectionLabel eyebrow="HOW WE WORK" />
        <h2
          id="how-we-work-heading"
          className="type-display mt-6 max-w-xl text-[clamp(1.8rem,4.2vw,2.9rem)] leading-[1.1] text-ink"
        >
          FROM POSSIBILITY
          <br />
          TO MOVEMENT.
        </h2>
        <p className="type-jp-body mt-5 max-w-md text-sm text-ink/70">
          可能性を、動き続ける仕組みに。ひとつの流れとして、街の中を循環していきます。
        </p>

        <div ref={ref} className="relative mt-20">
          <div
            className="absolute left-4 top-0 h-full w-[2px] bg-gradient-to-b from-moss via-bronze to-water sm:left-0 sm:top-6 sm:h-[2px] sm:w-full sm:bg-gradient-to-r"
            aria-hidden="true"
          />
          <ol className="relative flex flex-col gap-10 sm:flex-row sm:justify-between sm:gap-4">
            {ecosystemFlow.map((step, i) => (
              <li
                key={step.step}
                className={`relative flex items-start gap-4 pl-10 transition-all duration-700 ease-district sm:flex-col sm:items-center sm:pl-0 sm:text-center ${
                  inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 140}ms` }}
              >
                <span
                  className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-ink bg-warm-white text-xs font-semibold sm:static sm:mb-4"
                  aria-hidden="true"
                >
                  {step.step}
                </span>
                <div className="sm:max-w-[180px]">
                  <p className="type-display text-lg text-ink">{step.title}</p>
                  <p className="type-jp-body mt-2 text-xs text-ink/60">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
