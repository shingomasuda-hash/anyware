type SectionLabelProps = {
  eyebrow: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
};

export default function SectionLabel({
  eyebrow,
  align = "left",
  tone = "dark",
}: SectionLabelProps) {
  return (
    <span
      className={`type-label inline-flex items-center gap-3 text-[11px] sm:text-xs ${
        align === "center" ? "justify-center" : ""
      } ${tone === "dark" ? "text-ink/70" : "text-warm-white/70"}`}
    >
      <span
        className={`h-[1px] w-8 ${
          tone === "dark" ? "bg-ink/40" : "bg-warm-white/50"
        }`}
        aria-hidden="true"
      />
      {eyebrow}
    </span>
  );
}
