"use client";

/** PHILOSOPHYセクション背景: 「何もない空間」が「活動する空間」へ変化する断面ルーム */
export default function InteriorScene({ active, className }: { active: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="余白が活動する場所に変化していく部屋"
    >
      <defs>
        <linearGradient id="ph-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#232620" />
          <stop offset="100%" stopColor="#101611" />
        </linearGradient>
        <radialGradient id="ph-spot" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#F1B86B" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#F1B86B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="900" fill="url(#ph-wall)" />

      {/* 床 */}
      <rect x="0" y="700" width="1600" height="200" fill="#0c0f0c" />
      <line x1="0" y1="700" x2="1600" y2="700" stroke="#F1B86B" strokeOpacity="0.15" strokeWidth="1.5" />

      {/* 柱の質感 */}
      {[220, 700, 1180].map((x) => (
        <rect key={x} x={x} y="140" width="10" height="560" fill="#000" opacity="0.18" />
      ))}

      {/* スポットライト（常時） */}
      <rect x="0" y="0" width="1600" height="900" fill="url(#ph-spot)" style={{ transition: "opacity 1.4s ease" }} opacity={active ? 1 : 0.4} />

      {/* --- ここから scroll-inで増えていく要素 --- */}
      <g style={{ transition: "opacity 1.2s ease 0.1s", opacity: active ? 1 : 0 }}>
        {/* 天井の照明が点灯 */}
        {[380, 620, 860, 1100, 1340].map((x, i) => (
          <g key={x}>
            <line x1={x} y1="140" x2={x} y2="230" stroke="#8B5E3C" strokeWidth="2" opacity="0.5" />
            <circle
              cx={x}
              cy="238"
              r="10"
              fill="#F1B86B"
              className="motion-safe-only animate-breathe"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          </g>
        ))}
      </g>

      <g style={{ transition: "opacity 1.2s ease 0.5s, transform 1.2s ease 0.5s", opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(20px)" }}>
        {/* 植物が増える */}
        <g transform="translate(1360,560)">
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M0,140 C${-10 + i * 12},70 ${20 + i * 10},30 ${4 + i * 14},-40`}
              stroke="#526849"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              className="motion-safe-only animate-leafSway"
              style={{ transformOrigin: "0px 140px", animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </g>
      </g>

      <g style={{ transition: "opacity 1.2s ease 0.9s", opacity: active ? 1 : 0 }}>
        {/* 人の気配 */}
        <g transform="translate(300,640)">
          <circle cx="0" cy="0" r="14" fill="#DFD5C2" opacity="0.7" />
          <path d="M-18,18 Q0,-6 18,18 L18,60 L-18,60 Z" fill="#DFD5C2" opacity="0.5" />
        </g>
      </g>
    </svg>
  );
}
