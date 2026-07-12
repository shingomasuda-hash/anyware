import SectionLabel from "@/components/ui/SectionLabel";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "dark" | "light";
  topOffset?: boolean;
};

export default function PageIntro({
  eyebrow,
  title,
  lead,
  tone = "light",
  topOffset = true,
}: PageIntroProps) {
  const isDark = tone === "dark";
  return (
    <section
      className={`pb-16 sm:pb-20 ${topOffset ? "pt-[calc(var(--header-height)+3.5rem)]" : "pt-10 sm:pt-12"} ${
        isDark ? "bg-ink text-warm-white" : "bg-warm-white text-ink"
      }`}
    >
      <div className="mx-auto max-w-[1200px]" style={{ paddingInline: "var(--page-gutter)" }}>
        <SectionLabel eyebrow={eyebrow} tone={isDark ? "light" : "dark"} />
        <h1 className="type-display mt-6 max-w-3xl text-[clamp(2rem,5.6vw,3.8rem)] leading-[1.05]">
          {title}
        </h1>
        {lead && (
          <p
            className={`type-jp-body mt-6 max-w-xl text-[15px] leading-loose ${
              isDark ? "text-warm-white/75" : "text-ink/70"
            }`}
          >
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
