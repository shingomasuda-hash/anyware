export default function ForegroundProps({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 400"
      className={className}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="potGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c0f0c" />
          <stop offset="100%" stopColor="#171915" />
        </linearGradient>
        <linearGradient id="podiumGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0c0f0c" />
          <stop offset="100%" stopColor="#171915" />
        </linearGradient>
      </defs>

      {/* 左手前: 大きな鉢植え（巨大文字の一部を隠す） */}
      <g transform="translate(-40,60) scale(1.35)">
        <path d="M0,200 L130,200 L112,270 L18,270 Z" fill="url(#potGrad)" />
        <ellipse cx="65" cy="200" rx="66" ry="10" fill="#0c0f0c" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M${16 + i * 20},198 C${4 + i * 20},110 ${46 + i * 20},60 ${20 + i * 20},-30`}
            stroke="#526849"
            strokeWidth="13"
            strokeLinecap="round"
            fill="none"
            opacity={0.95 - i * 0.06}
            className="motion-safe-only animate-leafSway"
            style={{ transformOrigin: `${16 + i * 20}px 198px`, animationDelay: `${i * 0.4}s` }}
          />
        ))}
      </g>

      {/* 右手前: 低い塀・ポディウム（巨大文字の裾を隠す） */}
      <g transform="translate(1180,150)">
        <rect x="0" y="0" width="420" height="220" fill="url(#podiumGrad)" />
        <rect x="0" y="0" width="420" height="5" fill="#F1B86B" opacity="0.3" />
        {[70, 170, 270, 370].map((x, i) => (
          <rect key={x} x={x} y="-40" width="4" height="40" fill="#101611" opacity={0.6 - i * 0.05} />
        ))}
      </g>
    </svg>
  );
}
