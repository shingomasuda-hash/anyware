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
  faceColor = "#F5F0E5",
  sideColor = "#A47A4E",
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
        textShadow: `-1px -1px 0 rgba(241,184,107,0.55), ${shadows}, ${depth + 6}px ${
          depth + 10
        }px 30px rgba(0,0,0,0.5)`,
      }}
      aria-hidden="true"
    >
      {text}
    </span>
  );
}
