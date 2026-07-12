export default function DistantSkyline({ className }: { className?: string }) {
  const buildings = [
    { x: 20, w: 46, h: 90 },
    { x: 74, w: 30, h: 130 },
    { x: 112, w: 54, h: 70 },
    { x: 900, w: 40, h: 110 },
    { x: 948, w: 26, h: 150 },
    { x: 982, w: 60, h: 80 },
    { x: 1360, w: 50, h: 100 },
    { x: 1418, w: 32, h: 140 },
  ];

  return (
    <svg
      viewBox="0 0 1600 300"
      className={className}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      {/* stars / particles */}
      {Array.from({ length: 26 }).map((_, i) => {
        const x = (i * 61) % 1600;
        const y = (i * 37) % 140;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 5 === 0 ? 1.6 : 0.9}
            fill="#F5F0E5"
            opacity={0.15 + (i % 4) * 0.08}
          />
        );
      })}

      {buildings.map((b, i) => (
        <g key={i} opacity={0.55}>
          <rect x={b.x} y={300 - b.h} width={b.w} height={b.h} fill="#101611" />
          {[0, 1, 2].map((row) => (
            <rect
              key={row}
              x={b.x + 6}
              y={300 - b.h + 12 + row * 22}
              width={b.w - 12}
              height={6}
              fill="#F1B86B"
              opacity={(i + row) % 3 === 0 ? 0.5 : 0.12}
            />
          ))}
        </g>
      ))}

      {/* distant tree line / hills */}
      <path
        d="M0,300 L0,255 Q200,225 420,250 T900,240 T1600,255 L1600,300 Z"
        fill="#202B22"
        opacity="0.65"
      />
    </svg>
  );
}
