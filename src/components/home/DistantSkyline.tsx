export default function DistantSkyline({ className }: { className?: string }) {
  // 建物本体の裏にも街並みが続いているように、画面全幅にわたって配置する
  const buildings = [
    { x: 10, w: 46, h: 90 },
    { x: 64, w: 30, h: 140 },
    { x: 104, w: 54, h: 76 },
    { x: 170, w: 34, h: 110 },
    { x: 320, w: 40, h: 70 },
    { x: 400, w: 30, h: 100 },
    { x: 520, w: 44, h: 60 },
    { x: 700, w: 36, h: 90 },
    { x: 820, w: 30, h: 60 },
    { x: 900, w: 40, h: 120 },
    { x: 948, w: 26, h: 160 },
    { x: 982, w: 60, h: 88 },
    { x: 1100, w: 34, h: 70 },
    { x: 1200, w: 44, h: 100 },
    { x: 1300, w: 30, h: 60 },
    { x: 1360, w: 50, h: 110 },
    { x: 1418, w: 32, h: 150 },
    { x: 1500, w: 40, h: 90 },
  ];

  return (
    <svg
      viewBox="0 0 1600 300"
      className={className}
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      {/* stars / particles */}
      {Array.from({ length: 40 }).map((_, i) => {
        const x = (i * 61) % 1600;
        const y = (i * 37) % 160;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 5 === 0 ? 1.8 : 1}
            fill="#F5F0E5"
            opacity={0.2 + (i % 4) * 0.1}
          />
        );
      })}

      {buildings.map((b, i) => (
        <g key={i} opacity={0.8}>
          <rect x={b.x} y={300 - b.h} width={b.w} height={b.h} fill="#0c0f0c" />
          {Array.from({ length: Math.max(2, Math.floor(b.h / 24)) }).map((_, row) => (
            <rect
              key={row}
              x={b.x + 6}
              y={300 - b.h + 10 + row * 22}
              width={b.w - 12}
              height={7}
              fill="#F1B86B"
              opacity={(i + row) % 3 === 0 ? 0.6 : 0.16}
            />
          ))}
        </g>
      ))}

      {/* 遠景の丘・木立のシルエット */}
      <path
        d="M0,300 L0,258 Q200,228 420,252 T900,244 T1600,258 L1600,300 Z"
        fill="#202B22"
        opacity="0.8"
      />
    </svg>
  );
}
