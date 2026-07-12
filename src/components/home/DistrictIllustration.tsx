"use client";

import { businesses, type Business } from "@/data/businesses";

const ACCENT_HEX: Record<Business["accent"], string> = {
  moss: "#526348",
  bronze: "#9A714A",
  charcoal: "#242522",
  clay: "#A76445",
  water: "#9EBCB5",
};

const ZONE_WIDTH = 216;
const ZONE_GAP = 8;
const START_X = 24;

function zoneX(index: number) {
  return START_X + index * (ZONE_WIDTH + ZONE_GAP);
}

type DistrictIllustrationProps = {
  activeSlug?: string | null;
  showConnections?: boolean;
  className?: string;
};

export default function DistrictIllustration({
  activeSlug = null,
  showConnections = false,
  className,
}: DistrictIllustrationProps) {
  const totalWidth = START_X * 2 + businesses.length * ZONE_WIDTH + (businesses.length - 1) * ZONE_GAP;
  const roofY = 90;
  const groundY = 560;
  const centers = businesses.map((_, i) => zoneX(i) + ZONE_WIDTH / 2);

  return (
    <svg
      viewBox={`0 0 ${totalWidth} 620`}
      className={className}
      role="img"
      aria-label="AnyWareの5つの事業が並ぶ建築空間の断面図"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3c3428" />
          <stop offset="45%" stopColor="#8a5a3f" />
          <stop offset="100%" stopColor="#e8c391" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#171817" />
          <stop offset="100%" stopColor="#0f100f" />
        </linearGradient>
        {businesses.map((b) => (
          <linearGradient key={b.slug} id={`fill-${b.slug}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ACCENT_HEX[b.accent]} stopOpacity="0.55" />
            <stop offset="100%" stopColor={ACCENT_HEX[b.accent]} stopOpacity="0.18" />
          </linearGradient>
        ))}
      </defs>

      {/* sky */}
      <rect x="0" y="0" width={totalWidth} height={roofY + 40} fill="url(#sky)" opacity="0.9" />

      {/* ground */}
      <rect x="0" y={groundY} width={totalWidth} height={620 - groundY} fill="url(#ground)" />

      {/* building shell */}
      <rect
        x={START_X - 16}
        y={roofY}
        width={totalWidth - (START_X - 16) * 2}
        height={groundY - roofY}
        rx="18"
        fill="#1b1c19"
        stroke="rgba(241,235,221,0.14)"
        strokeWidth="1.5"
      />

      {/* roofline light */}
      <rect
        x={START_X - 16}
        y={roofY}
        width={totalWidth - (START_X - 16) * 2}
        height="4"
        fill="#e8c391"
        opacity="0.5"
      />

      {businesses.map((b, i) => {
        const x = zoneX(i);
        const isActive = activeSlug ? activeSlug === b.slug : true;
        const midY = (roofY + groundY) / 2;
        return (
          <g
            key={b.slug}
            opacity={isActive ? 1 : 0.35}
            style={{ transition: "opacity 0.6s var(--ease-district)" }}
          >
            {/* room volume */}
            <rect
              x={x}
              y={roofY + 14}
              width={ZONE_WIDTH}
              height={groundY - roofY - 28}
              fill={`url(#fill-${b.slug})`}
            />
            {/* floor line (mid mezzanine) */}
            <line
              x1={x}
              y1={midY}
              x2={x + ZONE_WIDTH}
              y2={midY}
              stroke="rgba(241,235,221,0.16)"
              strokeWidth="1"
            />
            {/* divider */}
            {i > 0 && (
              <line
                x1={x}
                y1={roofY + 14}
                x2={x}
                y2={groundY - 14}
                stroke="rgba(241,235,221,0.14)"
                strokeWidth="1"
              />
            )}

            {/* window lights along top */}
            {[0, 1, 2].map((w) => (
              <rect
                key={w}
                x={x + 24 + w * 64}
                y={roofY + 30}
                width="34"
                height="14"
                rx="2"
                fill="#f6dfae"
                className="motion-safe-only animate-shimmer"
                style={{ animationDelay: `${(i + w) * 0.4}s` }}
              />
            ))}

            <ZoneMotif slug={b.slug} x={x} groundY={groundY} width={ZONE_WIDTH} accent={ACCENT_HEX[b.accent]} />

            {/* zone code label */}
            <text
              x={x + 16}
              y={groundY - 24}
              fill="#f1ebdd"
              opacity="0.7"
              fontSize="13"
              fontFamily="var(--font-display)"
              letterSpacing="2"
            >
              {b.code} {b.zoneName}
            </text>
          </g>
        );
      })}

      {showConnections && (
        <g fill="none" stroke="#e8c391" strokeWidth="2" strokeLinecap="round">
          {centers.slice(0, -1).map((cx, i) => {
            const nextCx = centers[i + 1] ?? cx;
            return (
              <path
                key={i}
                d={`M ${cx} ${groundY - 40} Q ${(cx + nextCx) / 2} ${groundY - 90} ${nextCx} ${groundY - 40}`}
                strokeDasharray="6 8"
                className="motion-safe-only"
                opacity="0.75"
              />
            );
          })}
        </g>
      )}
    </svg>
  );
}

function ZoneMotif({
  slug,
  x,
  groundY,
  width,
  accent,
}: {
  slug: string;
  x: number;
  groundY: number;
  width: number;
  accent: string;
}) {
  const baseY = groundY - 60;
  const cx = x + width / 2;

  switch (slug) {
    case "regional":
      return (
        <g>
          <ellipse cx={cx} cy={baseY + 34} rx="58" ry="10" fill="#000" opacity="0.2" />
          <rect x={cx - 46} y={baseY} width="92" height="8" rx="3" fill={accent} />
          {[-30, -10, 10, 30].map((dx) => (
            <circle key={dx} cx={cx + dx} cy={baseY - 8} r="6" fill="#f1ebdd" opacity="0.8" />
          ))}
        </g>
      );
    case "branding":
      return (
        <g>
          <rect x={cx - 44} y={baseY - 40} width="88" height="56" rx="3" fill="#0f100f" stroke={accent} strokeWidth="2" />
          <line x1={cx - 30} y1={baseY - 20} x2={cx + 30} y2={baseY - 20} stroke={accent} strokeWidth="2" />
          <line x1={cx - 30} y1={baseY - 6} x2={cx + 10} y2={baseY - 6} stroke={accent} strokeWidth="2" opacity="0.6" />
        </g>
      );
    case "partner":
      return (
        <g>
          <rect x={cx - 52} y={baseY} width="104" height="10" rx="2" fill={accent} />
          {[-36, -12, 12, 36].map((dx) => (
            <rect key={dx} x={cx + dx} y={baseY - 22} width="14" height="18" fill="#f1ebdd" opacity="0.7" />
          ))}
        </g>
      );
    case "food":
      return (
        <g>
          <rect x={cx - 40} y={baseY} width="80" height="10" rx="2" fill={accent} />
          {[-16, 0, 16].map((dx, i) => (
            <ellipse
              key={dx}
              cx={cx + dx}
              cy={baseY - 30}
              rx="6"
              ry="14"
              fill="#f1ebdd"
              opacity="0.35"
              className="motion-safe-only animate-steam"
              style={{ animationDelay: `${i * 0.6}s` }}
            />
          ))}
        </g>
      );
    case "hydroponics":
      return (
        <g>
          {[0, 1, 2].map((row) => (
            <line
              key={row}
              x1={cx - 40}
              y1={baseY - row * 16}
              x2={cx + 40}
              y2={baseY - row * 16}
              stroke={accent}
              strokeWidth="2"
              opacity="0.7"
            />
          ))}
          {[-28, -8, 12, 32].map((dx, i) => (
            <ellipse
              key={dx}
              cx={cx + dx}
              cy={baseY - 8 - (i % 2) * 16}
              rx="7"
              ry="4"
              fill="#c8e0da"
              className="motion-safe-only animate-leafSway"
              style={{ transformOrigin: `${cx + dx}px ${baseY}px`, animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </g>
      );
    default:
      return null;
  }
}
