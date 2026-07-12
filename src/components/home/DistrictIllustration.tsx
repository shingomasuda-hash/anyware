"use client";

import { useId } from "react";
import { businesses, type Business } from "@/data/businesses";

// 部屋ごとの内装色温度（暖色〜寒色のグラデーション定義。3段階で光の減衰を作る）
const ROOM_GRADIENT: Record<Business["slug"], [string, string, string]> = {
  regional: ["#7a5f3f", "#4a3823", "#1e1710"], // TOWN COMMONS: 自然光〜夕方の中間
  branding: ["#54555c", "#2c2d31", "#131316"], // SIGNAL STUDIO: 少し白いスタジオ光
  partner: ["#5f4630", "#3a2a1a", "#170f09"], // PARTNER ROOM: 真鍮と濃い木
  food: ["#8a4f28", "#502c14", "#1f130a"], // TABLE & KITCHEN: 最も暖かいオレンジ
  hydroponics: ["#396053", "#1f3830", "#0d1a16"], // GREEN LAB: 緑と淡い水色
};

const VIEW_W = 1600;
const VIEW_H = 940;
const BUILD_X0 = 90;
const BUILD_X1 = 1510;
const GROUND_Y = 740;
const DOME_PEAK_Y = 30;
const SHELL_TOP_Y = 330;
const INSET = 26;

// 丸みのある建築外形（アーチ状の屋根＋わずかに内側へすぼまる側壁＝樽型のシルエット）
function shellPath(x0: number, x1: number, topY: number, peakY: number, groundY: number) {
  const midX = (x0 + x1) / 2;
  const bow = 34; // 側壁のふくらみ
  return `M${x0},${topY}
    Q${midX},${peakY} ${x1},${topY}
    C${x1 + bow},${topY + (groundY - topY) * 0.4} ${x1 + bow},${topY + (groundY - topY) * 0.75} ${x1},${groundY}
    L${x0},${groundY}
    C${x0 - bow},${topY + (groundY - topY) * 0.75} ${x0 - bow},${topY + (groundY - topY) * 0.4} ${x0},${topY}
    Z`;
}

function domeClipPath(x0: number, x1: number, topY: number, peakY: number, groundY: number) {
  const midX = (x0 + x1) / 2;
  return `M${x0},${topY} Q${midX},${peakY} ${x1},${topY} L${x1},${groundY} L${x0},${groundY} Z`;
}

type DistrictIllustrationProps = {
  activeSlug?: string | null;
  className?: string;
  /** 指定した場合、先頭からlitCount件のみ点灯させ、残りは暗くする（MVVの順次点灯演出用） */
  litCount?: number;
  showConnections?: boolean;
};

export default function DistrictIllustration({
  activeSlug = null,
  className,
  litCount,
  showConnections = false,
}: DistrictIllustrationProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const innerX0 = BUILD_X0 + INSET;
  const innerX1 = BUILD_X1 - INSET;
  const roomCount = businesses.length;
  const totalRoomWidth = innerX1 - innerX0;
  const roomWidth = totalRoomWidth / roomCount;

  const outerShell = shellPath(BUILD_X0, BUILD_X1, SHELL_TOP_Y, DOME_PEAK_Y, GROUND_Y);
  const clipPath = domeClipPath(innerX0, innerX1, SHELL_TOP_Y + 10, DOME_PEAK_Y + 20, GROUND_Y);

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className={className}
      role="img"
      aria-label="AnyWareの5つの事業が一つの建築空間としてつながる断面図"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <clipPath id={`domeInteriorClip-${uid}`}>
          <path d={clipPath} />
        </clipPath>
        <clipPath id={`outerShellClip-${uid}`}>
          <path d={outerShell} />
        </clipPath>
        {businesses.map((b) => (
          <linearGradient key={b.slug} id={`room-grad-${uid}-${b.slug}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ROOM_GRADIENT[b.slug][0]} />
            <stop offset="46%" stopColor={ROOM_GRADIENT[b.slug][1]} />
            <stop offset="100%" stopColor={ROOM_GRADIENT[b.slug][2]} />
          </linearGradient>
        ))}
        <linearGradient id={`shellGrad-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c2f27" />
          <stop offset="55%" stopColor="#171915" />
          <stop offset="100%" stopColor="#0a0c09" />
        </linearGradient>
        <linearGradient id={`reflectionFade-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="1" />
        </linearGradient>
        <mask id={`reflectionMask-${uid}`}>
          <rect x="0" y={GROUND_Y} width={VIEW_W} height={VIEW_H - GROUND_Y} fill={`url(#reflectionFade-${uid})`} />
        </mask>
        <filter id={`softGlow-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <radialGradient id={`groundShadow-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`lightPool-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F1B86B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#F1B86B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 地面の影 */}
      <ellipse cx={(BUILD_X0 + BUILD_X1) / 2} cy={GROUND_Y + 24} rx="820" ry="50" fill={`url(#groundShadow-${uid})`} />

      {/* 床の反射（鏡面に映る部屋の逆さ像） */}
      <g mask={`url(#reflectionMask-${uid})`} opacity="0.5">
        <g transform={`translate(0,${2 * GROUND_Y}) scale(1,-1)`}>
          {businesses.map((b, i) => {
            const x = innerX0 + i * roomWidth;
            return (
              <rect
                key={b.slug}
                x={x}
                y={GROUND_Y - 210}
                width={roomWidth}
                height="210"
                fill={`url(#room-grad-${uid}-${b.slug})`}
              />
            );
          })}
        </g>
      </g>
      <rect x="0" y={GROUND_Y} width={VIEW_W} height="4" fill="#F1B86B" opacity="0.28" />

      {/* 建築外殻（樽型シェル） */}
      <path d={outerShell} fill={`url(#shellGrad-${uid})`} />
      <path d={outerShell} fill="none" stroke="#F1B86B" strokeOpacity="0.4" strokeWidth="3" filter={`url(#softGlow-${uid})`} />
      <path d={outerShell} fill="none" stroke="#F5F0E5" strokeOpacity="0.12" strokeWidth="1.5" />

      {/* 屋根に埋め込まれた灯り（2列） */}
      <g clipPath={`url(#outerShellClip-${uid})`}>
        {Array.from({ length: 13 }).map((_, i) => {
          const t = i / 12;
          const x = BUILD_X0 + 40 + t * (BUILD_X1 - BUILD_X0 - 80);
          const arcT = (x - BUILD_X0) / (BUILD_X1 - BUILD_X0);
          const y = SHELL_TOP_Y - Math.sin(arcT * Math.PI) * (SHELL_TOP_Y - DOME_PEAK_Y) + 10;
          return (
            <g key={i}>
              <rect
                x={x - 10}
                y={y}
                width="20"
                height="6"
                rx="2"
                fill="#F1B86B"
                className="motion-safe-only animate-shimmer"
                style={{ animationDelay: `${i * 0.28}s` }}
              />
              <ellipse cx={x} cy={y + 40} rx="30" ry="46" fill={`url(#lightPool-${uid})`} opacity="0.35" />
            </g>
          );
        })}
      </g>

      {/* 内部5部屋（ドーム断面でクリップ） */}
      <g clipPath={`url(#domeInteriorClip-${uid})`}>
        {businesses.map((b, i) => {
          const x = innerX0 + i * roomWidth;
          const isActive =
            litCount !== undefined ? i < litCount : activeSlug ? activeSlug === b.slug : true;
          const delay = litCount !== undefined ? `${i * 0.28}s` : "0s";
          return (
            <g
              key={b.slug}
              opacity={isActive ? 1 : litCount !== undefined ? 0.12 : 0.32}
              style={{ transition: `opacity 0.8s var(--ease-district) ${delay}` }}
            >
              <rect x={x} y={20} width={roomWidth} height={GROUND_Y - 20} fill={`url(#room-grad-${uid}-${b.slug})`} />
              {/* 床タイルの質感 */}
              {Array.from({ length: 5 }).map((_, ti) => (
                <line
                  key={ti}
                  x1={x + (ti + 1) * (roomWidth / 6)}
                  y1={GROUND_Y}
                  x2={x + roomWidth / 2 + ((ti + 1) * (roomWidth / 6) - roomWidth / 2) * 0.3}
                  y2={GROUND_Y - 140}
                  stroke="#000"
                  strokeOpacity="0.15"
                  strokeWidth="1"
                />
              ))}
              <RoomProps slug={b.slug} x={x} width={roomWidth} groundY={GROUND_Y} />
              {/* ガラス反射帯 */}
              <polygon
                points={`${x},${GROUND_Y} ${x + roomWidth * 0.38},${GROUND_Y - 680} ${x + roomWidth * 0.6},${GROUND_Y - 680} ${x + roomWidth * 0.2},${GROUND_Y}`}
                fill="#F5F0E5"
                opacity="0.06"
                style={{ mixBlendMode: "screen" }}
              />
              <polygon
                points={`${x + roomWidth * 0.66},${GROUND_Y} ${x + roomWidth * 0.86},${GROUND_Y - 500} ${x + roomWidth * 0.94},${GROUND_Y - 500} ${x + roomWidth * 0.78},${GROUND_Y}`}
                fill="#F5F0E5"
                opacity="0.04"
                style={{ mixBlendMode: "screen" }}
              />
            </g>
          );
        })}

        {/* 間仕切り：アーチ型の開口 */}
        {Array.from({ length: roomCount - 1 }).map((_, i) => {
          const dividerX = innerX0 + (i + 1) * roomWidth;
          return (
            <g key={i}>
              <rect x={dividerX - 5} y={20} width="10" height={GROUND_Y - 20} fill="#0a0c09" opacity="0.85" />
              <rect x={dividerX - 5} y={20} width="2" height={GROUND_Y - 20} fill="#F1B86B" opacity="0.35" />
              <rect x={dividerX + 3} y={20} width="2" height={GROUND_Y - 20} fill="#000" opacity="0.3" />
            </g>
          );
        })}
      </g>

      {/* 部屋名サイン（壁面プレート） */}
      {businesses.map((b, i) => {
        const x = innerX0 + i * roomWidth;
        const isActive = activeSlug ? activeSlug === b.slug : true;
        const plateW = roomWidth - 28;
        return (
          <g
            key={b.slug}
            opacity={isActive ? 0.92 : 0.3}
            style={{ transition: "opacity 0.6s var(--ease-district)" }}
          >
            <rect x={x + 14} y={402} width={plateW} height="32" fill="#0c0f0c" opacity="0.75" />
            <rect x={x + 14} y={402} width={plateW} height="2" fill="#F1B86B" opacity="0.55" />
            <text
              x={x + 14 + 10}
              y={423}
              fill="#F5F0E5"
              fontSize="14"
              fontWeight="700"
              fontFamily="var(--font-display)"
              letterSpacing="1"
            >
              {String(i + 1).padStart(2, "0")} · {b.zoneName}
            </text>
          </g>
        );
      })}

      {showConnections && (
        <g fill="none" stroke="#F1B86B" strokeLinecap="round">
          {businesses.slice(0, -1).map((_, i) => {
            const x1 = innerX0 + i * roomWidth + roomWidth / 2;
            const x2 = innerX0 + (i + 1) * roomWidth + roomWidth / 2;
            const lit = litCount === undefined || i + 1 < litCount;
            return (
              <path
                key={i}
                d={`M${x1},${GROUND_Y - 30} Q${(x1 + x2) / 2},${GROUND_Y - 90} ${x2},${GROUND_Y - 30}`}
                strokeWidth="2.5"
                strokeDasharray="8 10"
                opacity={lit ? 0.8 : 0.08}
                style={{ transition: `opacity 0.8s ease ${(i + 1) * 0.28}s` }}
              />
            );
          })}
        </g>
      )}
    </svg>
  );
}

function RoomProps({
  slug,
  x,
  width,
  groundY,
}: {
  slug: string;
  x: number;
  width: number;
  groundY: number;
}) {
  const cx = x + width / 2;
  const gY = groundY - 6;

  switch (slug) {
    case "regional":
      return (
        <g>
          {/* 奥の棚壁 */}
          <rect x={x + 6} y={gY - 320} width={width - 12} height="140" fill="#000" opacity="0.16" />
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={i} x={x + 14 + i * ((width - 28) / 6)} y={gY - 310} width={(width - 28) / 6 - 6} height="120" fill="#8B5E3C" opacity="0.35" />
          ))}
          {/* 共同テーブル */}
          <ellipse cx={cx} cy={gY - 2} rx={width * 0.4} ry="10" fill="#000" opacity="0.25" />
          <rect x={cx - width * 0.36} y={gY - 34} width={width * 0.72} height="14" rx="3" fill="#8B5E3C" />
          <rect x={cx - width * 0.36} y={gY - 22} width={width * 0.72} height="4" fill="#5c4128" />
          {[0.15, 0.35, 0.5, 0.65, 0.85].map((f, i) => (
            <rect key={i} x={cx - width * 0.36 + width * 0.72 * f - 3} y={gY - 20} width="6" height="20" fill="#5b4530" />
          ))}
          {/* テーブル上の器・地図・商品 */}
          {[-0.26, -0.1, 0.06, 0.22].map((f, i) => (
            <rect key={i} x={cx + width * f - 8} y={gY - 42} width="16" height="10" fill="#DFD5C2" opacity={0.5 + (i % 2) * 0.2} />
          ))}
          {/* 人のシルエット */}
          {[-0.3, -0.15, 0, 0.16, 0.32].map((f, i) => (
            <g key={i} transform={`translate(${cx + width * f},${gY - 60})`}>
              <circle cx="0" cy="0" r="8" fill="#DFD5C2" opacity="0.78" />
              <path d="M-10,10 Q0,-4 10,10 L10,30 L-10,30 Z" fill="#DFD5C2" opacity="0.58" />
            </g>
          ))}
          {/* 小さな旗 */}
          {[0.4, 0.5, 0.6].map((f, i) => (
            <g
              key={i}
              className="motion-safe-only animate-leafSway"
              style={{ transformOrigin: `${cx + width * f}px ${gY - 110}px`, animationDelay: `${i * 0.5}s` }}
            >
              <line x1={cx + width * f} y1={gY - 150} x2={cx + width * f} y2={gY - 110} stroke="#8B5E3C" strokeWidth="1.5" opacity="0.7" />
              <path d={`M${cx + width * f},${gY - 150} l16,5 l-16,5 Z`} fill="#B56F4B" opacity="0.85" />
            </g>
          ))}
          {/* 掲示板 */}
          <rect x={cx - width * 0.42} y={gY - 210} width="76" height="96" fill="#171915" opacity="0.55" />
          <rect x={cx - width * 0.42} y={gY - 210} width="76" height="3" fill="#F1B86B" opacity="0.4" />
          {[0, 1, 2].map((r) => (
            <rect key={r} x={cx - width * 0.42 + 10} y={gY - 198 + r * 28} width="56" height="18" fill="#F1B86B" opacity="0.28" />
          ))}
          {/* 鉢植え */}
          <g transform={`translate(${cx + width * 0.42},${gY - 6})`}>
            <path d="M-14,0 L14,0 L10,-16 L-10,-16 Z" fill="#171915" opacity="0.7" />
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M${-6 + i * 6},-16 C${-14 + i * 6},-50 ${8 + i * 6},-40 ${2 + i * 6},-90`} stroke="#526849" strokeWidth="5" fill="none" strokeLinecap="round" />
            ))}
          </g>
        </g>
      );
    case "branding":
      return (
        <g>
          {/* 壁のタイポグラフィ */}
          <text x={cx} y={gY - 300} textAnchor="middle" fontSize="46" fontFamily="var(--font-display)" fontWeight="800" fill="#F5F0E5" opacity="0.06">
            SIGNAL
          </text>
          {/* 大型スクリーン */}
          <rect x={cx - width * 0.34} y={gY - 270} width={width * 0.68} height={158} rx="4" fill="#0c0d0b" stroke="#F5F0E5" strokeOpacity="0.28" strokeWidth="2" />
          <rect x={cx - width * 0.3} y={gY - 250} width={width * 0.26} height={118} fill="#9CBDB5" opacity="0.35" />
          <rect x={cx - width * 0.02} y={gY - 250} width={width * 0.3} height={118} fill="#F1B86B" opacity="0.2" />
          <line x1={cx - width * 0.28} y1={gY - 165} x2={cx - width * 0.1} y2={gY - 165} stroke="#F5F0E5" strokeOpacity="0.4" strokeWidth="2" />
          {/* 三脚カメラ */}
          <g transform={`translate(${cx + width * 0.22},${gY - 20})`}>
            <path d="M-14,0 L0,-30 L14,0 Z" fill="none" stroke="#DFD5C2" strokeOpacity="0.55" strokeWidth="2" />
            <rect x="-14" y="-46" width="28" height="18" rx="3" fill="#DFD5C2" opacity="0.68" />
            <circle cx="0" cy="-37" r="6" fill="#101611" />
          </g>
          {/* 棚と機材 */}
          <rect x={cx - width * 0.44} y={gY - 130} width={width * 0.16} height="120" fill="#171915" opacity="0.5" />
          {[0, 1, 2].map((r) => (
            <rect key={r} x={cx - width * 0.44 + 6} y={gY - 118 + r * 36} width={width * 0.16 - 12} height="26" fill="#54555c" opacity="0.6" />
          ))}
          {/* ポスター列 */}
          {[0, 1, 2].map((i) => (
            <rect key={i} x={cx + width * 0.3 + i * 26} y={gY - 150} width="18" height="90" fill="#B56F4B" opacity={0.45 - i * 0.1} />
          ))}
          {/* デスクと椅子 */}
          <rect x={cx - width * 0.1} y={gY - 14} width={width * 0.2} height="10" fill="#8B5E3C" opacity="0.7" />
        </g>
      );
    case "partner":
      return (
        <g>
          {/* 壁の図面 */}
          <rect x={x + 10} y={gY - 300} width={width * 0.3} height="120" fill="#171915" opacity="0.4" />
          {[0, 1, 2, 3].map((r) => (
            <line key={r} x1={x + 20} y1={gY - 288 + r * 26} x2={x + 10 + width * 0.3 - 16} y2={gY - 288 + r * 26} stroke="#DFD5C2" strokeOpacity="0.3" strokeWidth="1.5" />
          ))}
          {/* 円形テーブル */}
          <ellipse cx={cx} cy={gY - 4} rx={width * 0.36} ry="12" fill="#000" opacity="0.25" />
          <ellipse cx={cx} cy={gY - 40} rx={width * 0.34} ry="16" fill="#4a3624" stroke="#A47A4E" strokeOpacity="0.5" />
          <ellipse cx={cx} cy={gY - 44} rx={width * 0.3} ry="12" fill="#5c422b" />
          {/* 図面の線・付箋 */}
          {[-0.2, -0.05, 0.1, 0.24].map((f, i) => (
            <line key={i} x1={cx + width * f - 20} y1={gY - 46} x2={cx + width * f + 20} y2={gY - 46} stroke="#DFD5C2" strokeOpacity="0.4" strokeWidth="1.5" />
          ))}
          {[-0.16, 0.02, 0.2].map((f, i) => (
            <rect key={i} x={cx + width * f - 6} y={gY - 52} width="12" height="12" fill="#F1B86B" opacity="0.5" transform={`rotate(${(i - 1) * 8} ${cx + width * f} ${gY - 46})`} />
          ))}
          {/* ペンダントライト */}
          <line x1={cx} y1={gY - 300} x2={cx} y2={gY - 120} stroke="#A47A4E" strokeOpacity="0.5" strokeWidth="2" />
          <circle cx={cx} cy={gY - 112} r="14" fill="#F1B86B" opacity="0.85" className="motion-safe-only animate-breathe" />
          {/* 人物 */}
          {[-0.42, -0.15, 0.15, 0.42].map((f, i) => (
            <g key={i} transform={`translate(${cx + width * f},${gY - 70})`}>
              <circle cx="0" cy="0" r="7" fill="#DFD5C2" opacity="0.62" />
              <path d="M-9,9 Q0,-2 9,9 L9,26 L-9,26 Z" fill="#DFD5C2" opacity="0.46" />
            </g>
          ))}
          {/* 本棚 */}
          <rect x={cx + width * 0.28} y={gY - 200} width={width * 0.16} height="196" fill="#171915" opacity="0.4" />
          {Array.from({ length: 4 }).map((_, r) => (
            <rect key={r} x={cx + width * 0.28 + 6} y={gY - 188 + r * 46} width={width * 0.16 - 12} height="38" fill="#5f4630" opacity="0.5" />
          ))}
        </g>
      );
    case "food":
      return (
        <g>
          {/* 背面の食器棚 */}
          <rect x={x + 8} y={gY - 340} width={width - 16} height="100" fill="#000" opacity="0.18" />
          {Array.from({ length: 7 }).map((_, i) => (
            <ellipse key={i} cx={x + 26 + i * ((width - 40) / 6)} cy={gY - 300} rx="10" ry="4" fill="#DFD5C2" opacity="0.4" />
          ))}
          {/* オープンキッチンカウンター */}
          <rect x={cx - width * 0.38} y={gY - 62} width={width * 0.76} height="24" rx="2" fill="#8a4f28" />
          <rect x={cx - width * 0.38} y={gY - 40} width={width * 0.76} height="8" fill="#2c1b10" />
          {/* コンロの炎の気配 */}
          <circle cx={cx - width * 0.1} cy={gY - 52} r="5" fill="#F1B86B" opacity="0.8" className="motion-safe-only animate-flicker" />
          {/* 湯気 */}
          {[-0.18, -0.02, 0.14, 0.28].map((f, i) => (
            <ellipse
              key={i}
              cx={cx + width * f}
              cy={gY - 116}
              rx="9"
              ry="28"
              fill="#F5F0E5"
              opacity="0.32"
              className="motion-safe-only animate-steam"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
          {/* ペンダントライト（3灯） */}
          {[-0.28, 0, 0.28].map((f, i) => (
            <g key={i}>
              <line x1={cx + width * f} y1={gY - 300} x2={cx + width * f} y2={gY - 160} stroke="#8B5E3C" strokeOpacity="0.6" strokeWidth="2" />
              <circle cx={cx + width * f} cy={gY - 152} r="13" fill="#F1B86B" opacity="0.92" className="motion-safe-only animate-flicker" style={{ animationDelay: `${i * 0.4}s` }} />
            </g>
          ))}
          {/* 器・料理・カウンター客 */}
          {[-0.24, -0.12, 0, 0.12, 0.24].map((f, i) => (
            <ellipse key={i} cx={cx + width * f} cy={gY - 72} rx="9" ry="4" fill="#DFD5C2" opacity="0.72" />
          ))}
          <g transform={`translate(${cx + width * 0.36},${gY - 68})`}>
            <circle cx="0" cy="0" r="7" fill="#DFD5C2" opacity="0.6" />
            <path d="M-9,9 Q0,-2 9,9 L9,24 L-9,24 Z" fill="#DFD5C2" opacity="0.45" />
          </g>
        </g>
      );
    case "hydroponics":
      return (
        <g>
          {/* ガラス張りの背面フレーム */}
          <rect x={x + 8} y={gY - 340} width={width - 16} height="330" fill="none" stroke="#9CBDB5" strokeOpacity="0.2" strokeWidth="1.5" />
          {[0.33, 0.66].map((f, i) => (
            <line key={i} x1={x + 8 + (width - 16) * f} y1={gY - 340} x2={x + 8 + (width - 16) * f} y2={gY - 10} stroke="#9CBDB5" strokeOpacity="0.15" strokeWidth="1" />
          ))}
          {/* 水耕栽培ラック（4段） */}
          {[0, 1, 2, 3].map((row) => (
            <line
              key={row}
              x1={cx - width * 0.34}
              y1={gY - 30 - row * 40}
              x2={cx + width * 0.34}
              y2={gY - 30 - row * 40}
              stroke="#9CBDB5"
              strokeWidth="3"
              opacity="0.7"
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => {
            const f = -0.3 + (i % 5) * 0.15;
            const row = Math.floor(i / 5);
            return (
              <ellipse
                key={i}
                cx={cx + width * f}
                cy={gY - 42 - row * 40}
                rx="11"
                ry="6"
                fill="#789366"
                className="motion-safe-only animate-leafSway"
                style={{ transformOrigin: `${cx + width * f}px ${gY - 30 - row * 40}px`, animationDelay: `${i * 0.2}s` }}
              />
            );
          })}
          {/* 水滴 */}
          {[-0.24, -0.05, 0.14, 0.3].map((f, i) => (
            <circle
              key={i}
              cx={cx + width * f}
              cy={gY - 190}
              r="3"
              fill="#9CBDB5"
              className="motion-safe-only animate-drip"
              style={{ animationDelay: `${i * 0.7}s` }}
            />
          ))}
          {/* LED光（2本） */}
          <rect x={cx - width * 0.36} y={gY - 230} width={width * 0.72} height="6" fill="#9CBDB5" opacity="0.55" className="motion-safe-only animate-breathe" />
          <rect x={cx - width * 0.36} y={gY - 320} width={width * 0.72} height="5" fill="#9CBDB5" opacity="0.4" className="motion-safe-only animate-breathe" style={{ animationDelay: "1s" }} />
          {/* 出荷用の箱 */}
          <rect x={cx - width * 0.4} y={gY - 30} width="34" height="24" fill="#8B5E3C" opacity="0.5" />
        </g>
      );
    default:
      return null;
  }
}
