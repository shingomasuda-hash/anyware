const ACCENT_HEX: Record<string, string> = {
  moss: "#526348",
  bronze: "#9A714A",
  charcoal: "#242522",
  clay: "#A76445",
  water: "#9EBCB5",
};

export default function BusinessZoneScene({
  slug,
  accent,
}: {
  slug: string;
  accent: string;
}) {
  const hex = ACCENT_HEX[accent] ?? "#9A714A";

  return (
    <svg viewBox="0 0 480 560" className="h-full w-full" role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id={`scene-${slug}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hex} stopOpacity="0.5" />
          <stop offset="100%" stopColor="#171817" stopOpacity="0.92" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="480" height="560" fill="#171817" />
      <rect x="0" y="0" width="480" height="560" fill={`url(#scene-${slug})`} />

      {/* window row */}
      {[0, 1, 2, 3].map((w, i) => (
        <rect
          key={w}
          x={40 + w * 100}
          y="48"
          width="64"
          height="26"
          rx="3"
          fill="#f6dfae"
          className="motion-safe-only animate-shimmer"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}

      <line x1="0" y1="420" x2="480" y2="420" stroke="rgba(241,235,221,0.12)" strokeWidth="1.5" />

      <ZoneScene slug={slug} accent={hex} />
    </svg>
  );
}

function ZoneScene({ slug, accent }: { slug: string; accent: string }) {
  switch (slug) {
    case "regional":
      return (
        <g>
          <ellipse cx="240" cy="470" rx="150" ry="26" fill="#000" opacity="0.25" />
          <rect x="150" y="410" width="180" height="14" rx="4" fill={accent} />
          {[-100, -50, 0, 50, 100].map((dx) => (
            <circle key={dx} cx={240 + dx} cy="392" r="12" fill="#f1ebdd" opacity="0.85" />
          ))}
          <rect x="60" y="330" width="70" height="90" fill="#242522" stroke="rgba(241,235,221,0.2)" />
          <rect x="350" y="350" width="60" height="70" fill="#242522" stroke="rgba(241,235,221,0.2)" />
        </g>
      );
    case "branding":
      return (
        <g>
          <rect x="130" y="300" width="220" height="140" rx="6" fill="#0f100f" stroke={accent} strokeWidth="3" />
          <line x1="160" y1="345" x2="320" y2="345" stroke={accent} strokeWidth="3" />
          <line x1="160" y1="375" x2="280" y2="375" stroke={accent} strokeWidth="3" opacity="0.6" />
          <line x1="160" y1="405" x2="250" y2="405" stroke={accent} strokeWidth="3" opacity="0.35" />
          <rect x="60" y="330" width="40" height="80" fill="#f1ebdd" opacity="0.12" />
          <rect x="380" y="320" width="40" height="90" fill="#f1ebdd" opacity="0.12" />
        </g>
      );
    case "partner":
      return (
        <g>
          <rect x="110" y="380" width="260" height="20" rx="4" fill={accent} />
          {[-90, -50, -10, 30, 70, 110].map((dx, i) => (
            <rect
              key={dx}
              x={240 + dx}
              y={330 - (i % 2) * 10}
              width="24"
              height="34"
              fill="#f1ebdd"
              opacity="0.75"
            />
          ))}
          <line x1="140" y1="300" x2="340" y2="300" stroke="rgba(241,235,221,0.25)" strokeWidth="1.5" />
        </g>
      );
    case "food":
      return (
        <g>
          <rect x="120" y="380" width="240" height="18" rx="4" fill={accent} />
          {[190, 240, 290].map((cx, i) => (
            <ellipse
              key={cx}
              cx={cx}
              cy="330"
              rx="10"
              ry="26"
              fill="#f1ebdd"
              opacity="0.3"
              className="motion-safe-only animate-steam"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
          <rect x="150" y="340" width="180" height="8" rx="3" fill="#0f100f" opacity="0.4" />
        </g>
      );
    case "hydroponics":
      return (
        <g>
          {[0, 1, 2, 3].map((row) => (
            <line
              key={row}
              x1="130"
              y1={330 + row * 24}
              x2="350"
              y2={330 + row * 24}
              stroke={accent}
              strokeWidth="3"
              opacity="0.75"
            />
          ))}
          {[-90, -50, -10, 30, 70, 110].map((dx, i) => (
            <ellipse
              key={dx}
              cx={240 + dx}
              cy={318 + (i % 3) * 24}
              rx="10"
              ry="6"
              fill="#c8e0da"
              className="motion-safe-only animate-leafSway"
              style={{ transformOrigin: `${240 + dx}px ${340 + (i % 3) * 24}px`, animationDelay: `${i * 0.25}s` }}
            />
          ))}
        </g>
      );
    default:
      return null;
  }
}
