import { mvv } from "@/data/company";
import DistrictIllustration from "@/components/home/DistrictIllustration";
import SectionLabel from "@/components/ui/SectionLabel";

export default function MVVSection() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-warm-white sm:py-36" aria-labelledby="mvv-heading">
      <h2 id="mvv-heading" className="sr-only">
        AnyWareのミッション・ビジョン・バリュー
      </h2>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] opacity-25">
        <DistrictIllustration className="h-full w-full" showConnections />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />

      <div
        className="relative mx-auto flex max-w-[1300px] flex-col gap-16 sm:gap-24"
        style={{ paddingInline: "var(--page-gutter)" }}
      >
        <div>
          <SectionLabel eyebrow={mvv.mission.label} tone="light" />
          <p className="type-display mt-4 text-[clamp(2.2rem,7vw,5rem)] leading-[1.02]">
            {mvv.mission.body}
          </p>
        </div>

        <div className="sm:ml-[12%]">
          <SectionLabel eyebrow={mvv.vision.label} tone="light" />
          <p className="type-display mt-4 text-[clamp(1.9rem,6vw,4.2rem)] leading-[1.05] text-bronze">
            {mvv.vision.body}
          </p>
        </div>

        <div className="sm:ml-[24%]">
          <SectionLabel eyebrow={mvv.value.label} tone="light" />
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
