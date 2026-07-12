"use client";

import { businesses, type Business } from "@/data/businesses";

// 部屋ごとの内装色温度（暖色〜寒色のグラデーション定義）
const ROOM_GRADIENT: Record<Business["slug"], [string, string]> = {
  regional: ["#5b4a34", "#2a2117"], // TOWN COMMONS: 自然光〜夕方の中間
  branding: ["#3a3a3c", "#17181a"], // SIGNAL STUDIO: 少し白いスタジオ光
  partner: ["#4a3624", "#201810"], // PARTNER ROOM: 真鍮と濃い木
  food: ["#6b3f22", "#2c1b10"], // TABLE & KITCHEN: 最も暖かいオレンジ
  hydroponics: ["#28433c", "#12211d"], // GREEN LAB: 緑と淡い水色
};

const VIEW_W = 1600;
const VIEW_H = 900;
const BUILD_X0 = 130;
const BUILD_X1 = 1470;
const GROUND_Y = 760;
const DOME_PEAK_Y = 150;
const SHELL_TOP_Y = 380;
const INSET = 20;

function domePath(x0: number, x1: number, topY: number, peakY: number, groundY: number) {
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
  const innerX0 = BUILD_X0 + INSET;
  const innerX1 = BUILD_X1 - INSET;
  const roomCount = businesses.length;
  const totalRoomWidth = innerX1 - innerX0;
  const roomWidth = totalRoomWidth / roomCount;

  const shellPath = domePath(BUILD_X0, BUILD_X1, SHELL_TOP_Y, DOME_PEAK_Y, GROUND_Y);
  const clipPath = domePath(innerX0, innerX1, SHELL_TOP_Y + 10, DOME_PEAK_Y + 22, GROUND_Y);

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className={className}
      role="img"
      aria-label="AnyWareの5つの事業が一つの建築空間としてつながる断面図"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <clipPath id="domeInteriorClip">
          <path d={clipPath} />
        </clipPath>
        {businesses.map((b) => (
          <linearGradient key={b.slug} id={`room-grad-${b.slug}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ROOM_GRADIENT[b.slug][0]} />
            <stop offset="100%" stopColor={ROOM_GRADIENT[b.slug][1]} />
          </linearGradient>
        ))}
        <linearGradient id="shellGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#232620" />
          <stop offset="100%" stopColor="#101611" />
        </linearGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 地面の影 */}
      <ellipse cx={(BUILD_X0 + BUILD_X1) / 2} cy={GROUND_Y + 20} rx="760" ry="46" fill="url(#groundShadow)" />

      {/* 建築外殻（ドーム型シェル） */}
      <path d={shellPath} fill="url(#shellGrad)" />
      <path
        d={shellPath}
        fill="none"
        stroke="#F1B86B"
        strokeOpacity="0.35"
        strokeWidth="3"
        filter="url(#softGlow)"
      />

      {/* 屋根に埋め込まれた灯り */}
      {Array.from({ length: 9 }).map((_, i) => {
        const t = i / 8;
        const x = BUILD_X0 + 60 + t * (BUILD_X1 - BUILD_X0 - 120);
        const midX = (BUILD_X0 + BUILD_X1) / 2;
        const arcT = (x - BUILD_X0) / (BUILD_X1 - BUILD_X0);
        const y = SHELL_TOP_Y - Math.sin(arcT * Math.PI) * (SHELL_TOP_Y - DOME_PEAK_Y) + 14;
        return (
          <rect
            key={i}
            x={x - 12}
            y={y}
            width="24"
            height="7"
            rx="2"
            fill="#F1B86B"
            className="motion-safe-only animate-shimmer"
            style={{ animationDelay: `${i * 0.35}s` }}
          />
        );
      })}

      {/* 内部5部屋（ドーム断面でクリップ） */}
      <g clipPath="url(#domeInteriorClip)">
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
              <rect x={x} y={120} width={roomWidth} height={GROUND_Y - 120} fill={`url(#room-grad-${b.slug})`} />
              <RoomProps slug={b.slug} x={x} width={roomWidth} groundY={GROUND_Y} />
              {/* ガラス反射帯 */}
              <polygon
                points={`${x},${GROUND_Y} ${x + roomWidth * 0.4},${GROUND_Y - 620} ${x + roomWidth * 0.62},${GROUND_Y - 620} ${x + roomWidth * 0.22},${GROUND_Y}`}
                fill="#F5F0E5"
                opacity="0.05"
                style={{ mixBlendMode: "screen" }}
              />
            </g>
          );
        })}

        {/* 間仕切り柱 */}
        {Array.from({ length: roomCount - 1 }).map((_, i) => (
          <rect
            key={i}
            x={innerX0 + (i + 1) * roomWidth - 3}
            y={120}
            width="6"
            height={GROUND_Y - 120}
            fill="#A47A4E"
            opacity="0.4"
          />
        ))}
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
            <rect
              x={x + 14}
              y={402}
              width={plateW}
              height="32"
              fill="#0c0f0c"
              opacity="0.72"
            />
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
          {/* 共同テーブル */}
          <rect x={cx - width * 0.36} y={gY - 34} width={width * 0.72} height="14" rx="3" fill="#8B5E3C" />
          {[0.3, 0.5, 0.7].map((f, i) => (
            <rect key={i} x={cx - width * 0.36 + width * 0.72 * f - 3} y={gY - 20} width="6" height="20" fill="#5b4530" />
          ))}
          {/* 人のシルエット */}
          {[-0.24, -0.06, 0.12, 0.28].map((f, i) => (
            <g key={i} transform={`translate(${cx + width * f},${gY - 60})`}>
              <circle cx="0" cy="0" r="8" fill="#DFD5C2" opacity="0.75" />
              <path d="M-10,10 Q0,-4 10,10 L10,30 L-10,30 Z" fill="#DFD5C2" opacity="0.55" />
            </g>
          ))}
          {/* 小さな旗 */}
          {[0.42, 0.5, 0.58].map((f, i) => (
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
          <rect x={cx - width * 0.4} y={gY - 200} width="70" height="90" fill="#171915" opacity="0.5" />
          {[0, 1, 2].map((r) => (
            <rect key={r} x={cx - width * 0.4 + 10} y={gY - 190 + r * 26} width="50" height="16" fill="#F1B86B" opacity="0.3" />
          ))}
        </g>
      );
    case "branding":
      return (
        <g>
          {/* 大型スクリーン */}
          <rect x={cx - width * 0.34} y={gY - 260} width={width * 0.68} height={150} rx="4" fill="#0c0d0b" stroke="#F5F0E5" strokeOpacity="0.25" strokeWidth="2" />
          <rect x={cx - width * 0.3} y={gY - 240} width={width * 0.26} height={110} fill="#9CBDB5" opacity="0.35" />
          <rect x={cx - width * 0.02} y={gY - 240} width={width * 0.3} height={110} fill="#F1B86B" opacity="0.2" />
          {/* 三脚カメラ */}
          <g transform={`translate(${cx + width * 0.22},${gY - 20})`}>
            <path d="M-14,0 L0,-30 L14,0 Z" fill="none" stroke="#DFD5C2" strokeOpacity="0.5" strokeWidth="2" />
            <rect x="-14" y="-46" width="28" height="18" rx="3" fill="#DFD5C2" opacity="0.65" />
          </g>
          {/* ポスター */}
          {[0, 1].map((i) => (
            <rect key={i} x={cx - width * 0.42 + i * 30} y={gY - 130} width="22" height="70" fill="#B56F4B" opacity={0.4 - i * 0.1} />
          ))}
        </g>
      );
    case "partner":
      return (
        <g>
          {/* 円形テーブル */}
          <ellipse cx={cx} cy={gY - 40} rx={width * 0.34} ry="16" fill="#4a3624" stroke="#A47A4E" strokeOpacity="0.5" />
          <ellipse cx={cx} cy={gY - 44} rx={width * 0.3} ry="12" fill="#5c422b" />
          {/* 図面の線 */}
          {[-0.2, -0.05, 0.1, 0.24].map((f, i) => (
            <line key={i} x1={cx + width * f - 20} y1={gY - 46} x2={cx + width * f + 20} y2={gY - 46} stroke="#DFD5C2" strokeOpacity="0.4" strokeWidth="1.5" />
          ))}
          {/* ペンダントライト */}
          <line x1={cx} y1={gY - 260} x2={cx} y2={gY - 120} stroke="#A47A4E" strokeOpacity="0.5" strokeWidth="2" />
          <circle cx={cx} cy={gY - 112} r="14" fill="#F1B86B" opacity="0.85" className="motion-safe-only animate-breathe" />
          {/* 人物 */}
          {[-0.4, 0.4].map((f, i) => (
            <g key={i} transform={`translate(${cx + width * f},${gY - 70})`}>
              <circle cx="0" cy="0" r="7" fill="#DFD5C2" opacity="0.6" />
              <path d="M-9,9 Q0,-2 9,9 L9,26 L-9,26 Z" fill="#DFD5C2" opacity="0.45" />
            </g>
          ))}
        </g>
      );
    case "food":
      return (
        <g>
          {/* オープンキッチンカウンター */}
          <rect x={cx - width * 0.36} y={gY - 60} width={width * 0.72} height="22" rx="2" fill="#6b3f22" />
          <rect x={cx - width * 0.36} y={gY - 40} width={width * 0.72} height="6" fill="#2c1b10" />
          {/* 湯気 */}
          {[-0.14, 0, 0.14].map((f, i) => (
            <ellipse
              key={i}
              cx={cx + width * f}
              cy={gY - 110}
              rx="9"
              ry="26"
              fill="#F5F0E5"
              opacity="0.3"
              className="motion-safe-only animate-steam"
              style={{ animationDelay: `${i * 0.6}s` }}
            />
          ))}
          {/* ペンダントライト */}
          {[-0.24, 0.24].map((f, i) => (
            <g key={i}>
              <line x1={cx + width * f} y1={gY - 280} x2={cx + width * f} y2={gY - 150} stroke="#8B5E3C" strokeOpacity="0.6" strokeWidth="2" />
              <circle cx={cx + width * f} cy={gY - 142} r="12" fill="#F1B86B" opacity="0.9" className="motion-safe-only animate-flicker" />
            </g>
          ))}
          {/* 器 */}
          {[-0.2, -0.06, 0.08, 0.22].map((f, i) => (
            <ellipse key={i} cx={cx + width * f} cy={gY - 70} rx="9" ry="4" fill="#DFD5C2" opacity="0.7" />
          ))}
        </g>
      );
    case "hydroponics":
      return (
        <g>
          {/* 水耕栽培ラック */}
          {[0, 1, 2, 3].map((row) => (
            <line
              key={row}
              x1={cx - width * 0.32}
              y1={gY - 40 - row * 36}
              x2={cx + width * 0.32}
              y2={gY - 40 - row * 36}
              stroke="#9CBDB5"
              strokeWidth="3"
              opacity="0.7"
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => {
            const f = -0.28 + (i % 5) * 0.14;
            const row = Math.floor(i / 5);
            return (
              <ellipse
                key={i}
                cx={cx + width * f}
                cy={gY - 52 - row * 36}
                rx="11"
                ry="6"
                fill="#789366"
                className="motion-safe-only animate-leafSway"
                style={{ transformOrigin: `${cx + width * f}px ${gY - 40 - row * 36}px`, animationDelay: `${i * 0.25}s` }}
              />
            );
          })}
          {/* 水滴 */}
          {[-0.2, 0.05, 0.24].map((f, i) => (
            <circle
              key={i}
              cx={cx + width * f}
              cy={gY - 150}
              r="3"
              fill="#9CBDB5"
              className="motion-safe-only animate-drip"
              style={{ animationDelay: `${i * 0.8}s` }}
            />
          ))}
          {/* LED光 */}
          <rect x={cx - width * 0.34} y={gY - 210} width={width * 0.68} height="6" fill="#9CBDB5" opacity="0.6" className="motion-safe-only animate-breathe" />
        </g>
      );
    default:
      return null;
  }
}
