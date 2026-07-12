const ACCENT_HEX: Record<string, string> = {
  moss: "#526849",
  bronze: "#A47A4E",
  charcoal: "#232620",
  clay: "#B56F4B",
  water: "#9CBDB5",
};

const WALL_GRADIENT: Record<string, [string, string]> = {
  regional: ["#5b4a34", "#241c12"],
  branding: ["#3a3a3c", "#151617"],
  partner: ["#4a3624", "#1c150e"],
  food: ["#6b3f22", "#26160c"],
  hydroponics: ["#28433c", "#0f1c18"],
};

export default function BusinessZoneScene({
  slug,
  accent,
}: {
  slug: string;
  accent: string;
}) {
  const hex = ACCENT_HEX[accent] ?? "#A47A4E";
  const [wallTop, wallBottom] = WALL_GRADIENT[slug] ?? ["#3a3a3c", "#151617"];

  return (
    <svg viewBox="0 0 1600 1000" className="h-full w-full" role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id={`wall-${slug}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={wallTop} />
          <stop offset="100%" stopColor={wallBottom} />
        </linearGradient>
        <linearGradient id={`floor-${slug}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c0f0c" />
          <stop offset="100%" stopColor="#050605" />
        </linearGradient>
      </defs>

      {/* 奥の壁 */}
      <rect x="0" y="0" width="1600" height="720" fill={`url(#wall-${slug})`} />
      {/* 側壁（奥行き） */}
      <polygon points="0,0 220,60 220,760 0,720" fill="#000" opacity="0.28" />
      <polygon points="1600,0 1380,60 1380,760 1600,720" fill="#000" opacity="0.28" />
      {/* 床 */}
      <polygon points="0,720 1600,720 1600,1000 0,1000" fill={`url(#floor-${slug})`} />
      <line x1="0" y1="720" x2="1600" y2="720" stroke="#F1B86B" strokeOpacity="0.18" strokeWidth="2" />
      {/* 床の奥行きライン */}
      {[300, 700, 1100].map((x) => (
        <line key={x} x1={800} y1="720" x2={x} y2="1000" stroke="#F5F0E5" strokeOpacity="0.04" strokeWidth="1" />
      ))}

      {/* 天井の照明 */}
      {[220, 560, 900, 1240, 1420].map((x, i) => (
        <rect
          key={x}
          x={x}
          y="36"
          width="56"
          height="16"
          rx="3"
          fill="#F1B86B"
          className="motion-safe-only animate-shimmer"
          style={{ animationDelay: `${i * 0.35}s` }}
        />
      ))}

      <RoomProps slug={slug} accent={hex} />

      {/* ガラス反射帯 */}
      <polygon points="60,1000 640,120 760,120 220,1000" fill="#F5F0E5" opacity="0.045" style={{ mixBlendMode: "screen" }} />
    </svg>
  );
}

function RoomProps({ slug, accent }: { slug: string; accent: string }) {
  const cx = 800;
  const gY = 720;

  switch (slug) {
    case "regional":
      return (
        <g>
          <ellipse cx={cx} cy={gY + 150} rx="420" ry="50" fill="#000" opacity="0.3" />
          {/* 共同テーブル */}
          <rect x={cx - 380} y={gY + 60} width="760" height="34" rx="6" fill="#8B5E3C" />
          {[-320, -180, -40, 100, 240, 340].map((dx) => (
            <rect key={dx} x={cx + dx - 8} y={gY + 90} width="16" height="60" fill="#5b4530" />
          ))}
          {/* 人のシルエット */}
          {[-300, -180, -60, 60, 180, 300].map((dx, i) => (
            <g key={dx} transform={`translate(${cx + dx},${gY})`}>
              <circle cx="0" cy="0" r="20" fill="#DFD5C2" opacity="0.78" />
              <path d="M-26,26 Q0,-8 26,26 L26,74 L-26,74 Z" fill="#DFD5C2" opacity="0.55" />
            </g>
          ))}
          {/* 小さな旗 */}
          {[-220, -20, 180].map((dx, i) => (
            <g
              key={dx}
              className="motion-safe-only animate-leafSway"
              style={{ transformOrigin: `${cx + dx}px ${gY - 210}px`, animationDelay: `${i * 0.5}s` }}
            >
              <line x1={cx + dx} y1={gY - 300} x2={cx + dx} y2={gY - 210} stroke="#8B5E3C" strokeWidth="3" opacity="0.7" />
              <path d={`M${cx + dx},${gY - 300} l38,10 l-38,10 Z`} fill="#B56F4B" opacity="0.9" />
            </g>
          ))}
          {/* 掲示板 */}
          <rect x={cx - 620} y={gY - 320} width="180" height="220" fill="#171915" opacity="0.55" />
          {[0, 1, 2, 3].map((r) => (
            <rect key={r} x={cx - 600} y={gY - 300 + r * 48} width="140" height="34" fill="#F1B86B" opacity="0.28" />
          ))}
          {/* 地域地図（右） */}
          <rect x={cx + 460} y={gY - 340} width="200" height="240" fill="#171915" opacity="0.5" />
          {Array.from({ length: 5 }).map((_, i) => (
            <circle key={i} cx={cx + 500 + (i % 3) * 55} cy={gY - 300 + Math.floor(i / 3) * 90} r="6" fill="#F1B86B" opacity="0.7" />
          ))}
        </g>
      );
    case "branding":
      return (
        <g>
          <ellipse cx={cx} cy={gY + 150} rx="420" ry="50" fill="#000" opacity="0.3" />
          {/* 大型スクリーン */}
          <rect x={cx - 320} y={gY - 420} width="640" height="360" rx="6" fill="#0c0d0b" stroke="#F5F0E5" strokeOpacity="0.28" strokeWidth="3" />
          <rect x={cx - 280} y={gY - 380} width="260" height="280" fill="#9CBDB5" opacity="0.32" />
          <rect x={cx + 0} y={gY - 380} width="240" height="280" fill="#F1B86B" opacity="0.2" />
          <line x1={cx - 260} y1={gY - 260} x2={cx - 60} y2={gY - 260} stroke="#F5F0E5" strokeOpacity="0.4" strokeWidth="4" />
          <line x1={cx - 260} y1={gY - 200} x2={cx - 120} y2={gY - 200} stroke="#F5F0E5" strokeOpacity="0.25" strokeWidth="4" />
          {/* 三脚カメラ */}
          <g transform={`translate(${cx + 420},${gY - 30})`}>
            <path d="M-30,0 L0,-70 L30,0 Z" fill="none" stroke="#DFD5C2" strokeOpacity="0.55" strokeWidth="4" />
            <rect x="-32" y="-104" width="64" height="42" rx="6" fill="#DFD5C2" opacity="0.7" />
            <circle cx="0" cy="-83" r="12" fill="#101611" />
          </g>
          {/* ポスター列 */}
          {[0, 1, 2].map((i) => (
            <rect key={i} x={cx - 640 + i * 90} y={gY - 300} width="60" height="200" fill="#B56F4B" opacity={0.42 - i * 0.08} />
          ))}
        </g>
      );
    case "partner":
      return (
        <g>
          <ellipse cx={cx} cy={gY + 150} rx="420" ry="50" fill="#000" opacity="0.3" />
          {/* 円形テーブル */}
          <ellipse cx={cx} cy={gY + 90} rx="340" ry="60" fill="#4a3624" stroke="#A47A4E" strokeOpacity="0.55" strokeWidth="3" />
          <ellipse cx={cx} cy={gY + 80} rx="300" ry="48" fill="#5c422b" />
          {/* 図面の線 */}
          {[-220, -100, 20, 140, 240].map((dx, i) => (
            <line key={dx} x1={cx + dx - 60} y1={gY + 80} x2={cx + dx + 60} y2={gY + 80} stroke="#DFD5C2" strokeOpacity="0.35" strokeWidth="3" />
          ))}
          {/* ペンダントライト */}
          <line x1={cx} y1={gY - 380} x2={cx} y2={gY - 120} stroke="#A47A4E" strokeOpacity="0.55" strokeWidth="3" />
          <circle cx={cx} cy={gY - 104} r="26" fill="#F1B86B" opacity="0.88" className="motion-safe-only animate-breathe" />
          {/* 人物 */}
          {[-420, -140, 140, 420].map((dx, i) => (
            <g key={dx} transform={`translate(${cx + dx},${gY + 10})`}>
              <circle cx="0" cy="0" r="18" fill="#DFD5C2" opacity="0.65" />
              <path d="M-24,22 Q0,-6 24,22 L24,64 L-24,64 Z" fill="#DFD5C2" opacity="0.48" />
            </g>
          ))}
          {/* 街をつなぐマップの線 */}
          <path d={`M${cx - 600},${gY - 260} Q${cx - 200},${gY - 400} ${cx + 600},${gY - 260}`} stroke="#F1B86B" strokeOpacity="0.25" strokeDasharray="10 12" strokeWidth="2" fill="none" />
        </g>
      );
    case "food":
      return (
        <g>
          <ellipse cx={cx} cy={gY + 150} rx="420" ry="50" fill="#000" opacity="0.3" />
          {/* オープンキッチンカウンター */}
          <rect x={cx - 400} y={gY + 20} width="800" height="70" rx="4" fill="#6b3f22" />
          <rect x={cx - 400} y={gY + 78} width="800" height="16" fill="#26160c" />
          {/* 湯気 */}
          {[-160, -60, 40, 140].map((dx, i) => (
            <ellipse
              key={dx}
              cx={cx + dx}
              cy={gY - 130}
              rx="22"
              ry="60"
              fill="#F5F0E5"
              opacity="0.28"
              className="motion-safe-only animate-steam"
              style={{ animationDelay: `${i * 0.6}s` }}
            />
          ))}
          {/* ペンダントライト */}
          {[-260, 0, 260].map((dx, i) => (
            <g key={dx}>
              <line x1={cx + dx} y1={gY - 400} x2={cx + dx} y2={gY - 190} stroke="#8B5E3C" strokeOpacity="0.6" strokeWidth="3" />
              <circle cx={cx + dx} cy={gY - 172} r="24" fill="#F1B86B" opacity="0.92" className="motion-safe-only animate-flicker" />
            </g>
          ))}
          {/* 器・カウンター客席 */}
          {[-320, -220, -120, 120, 220, 320].map((dx, i) => (
            <ellipse key={dx} cx={cx + dx} cy={gY + 4} rx="20" ry="9" fill="#DFD5C2" opacity="0.72" />
          ))}
        </g>
      );
    case "hydroponics":
      return (
        <g>
          <ellipse cx={cx} cy={gY + 150} rx="420" ry="50" fill="#000" opacity="0.3" />
          {/* 水耕栽培ラック（3列） */}
          {[-360, 0, 360].map((rx, ri) => (
            <g key={rx}>
              {[0, 1, 2, 3].map((row) => (
                <line
                  key={row}
                  x1={cx + rx - 150}
                  y1={gY + 50 - row * 92}
                  x2={cx + rx + 150}
                  y2={gY + 50 - row * 92}
                  stroke="#9CBDB5"
                  strokeWidth="5"
                  opacity="0.75"
                />
              ))}
              {Array.from({ length: 12 }).map((_, i) => {
                const dx = -140 + (i % 6) * 56;
                const row = Math.floor(i / 6);
                return (
                  <ellipse
                    key={i}
                    cx={cx + rx + dx}
                    cy={gY + 30 - row * 92}
                    rx="18"
                    ry="10"
                    fill="#789366"
                    className="motion-safe-only animate-leafSway"
                    style={{ transformOrigin: `${cx + rx + dx}px ${gY + 50 - row * 92}px`, animationDelay: `${(ri + i) * 0.2}s` }}
                  />
                );
              })}
            </g>
          ))}
          {/* 水滴 */}
          {[-460, -100, 260, 500].map((dx, i) => (
            <circle
              key={dx}
              cx={cx + dx}
              cy={gY - 260}
              r="6"
              fill="#9CBDB5"
              className="motion-safe-only animate-drip"
              style={{ animationDelay: `${i * 0.7}s` }}
            />
          ))}
          {/* LED光 */}
          <rect x={cx - 560} y={gY - 400} width="1120" height="10" fill="#9CBDB5" opacity="0.55" className="motion-safe-only animate-breathe" />
        </g>
      );
    default:
      return null;
  }
}
