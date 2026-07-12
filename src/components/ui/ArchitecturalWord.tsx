type ArchitecturalWordProps = {
  text: string;
  depth?: number;
  faceColor?: string;
  sideColor?: string;
  className?: string;
};

export default function ArchitecturalWord({
  text,
  depth = 14,
  faceColor = "#f1ebdd",
  sideColor = "#9a714a",
  className,
}: ArchitecturalWordProps) {
  const shadows = Array.from({ length: depth })
    .map((_, i) => `${i + 1}px ${i + 1}px 0 ${sideColor}`)
    .join(", ");

  return (
    <span
      className={`type-display block select-none ${className ?? ""}`}
      style={{
        color: faceColor,
        textShadow: `${shadows}, ${depth + 4}px ${depth + 6}px 24px rgba(0,0,0,0.35)`,
      }}
      aria-hidden="true"
    >
      {text}
    </span>
  );
}
