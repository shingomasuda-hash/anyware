"use client";

import { ecosystemFlow } from "@/data/company";
import { useInView } from "@/lib/useInView";

const NODE_ICON: Record<string, "find" | "edit" | "design" | "move" | "grow"> = {
  FIND: "find",
  EDIT: "edit",
  DESIGN: "design",
  MOVE: "move",
  GROW: "grow",
};

// デスクトップ用の流れる光の座標（5点をなめらかに結ぶ）
const NODES_X = [80, 320, 560, 800, 1040];
const NODE_Y = 140;
const PATH_D = `M${NODES_X[0]},${NODE_Y} C${NODES_X[0] + 80},${NODE_Y - 60} ${NODES_X[1] - 80},${NODE_Y + 60} ${NODES_X[1]},${NODE_Y} S${NODES_X[2] - 60},${NODE_Y - 70} ${NODES_X[2]},${NODE_Y} S${NODES_X[3] - 60},${NODE_Y + 70} ${NODES_X[3]},${NODE_Y} S${NODES_X[4] - 60},${NODE_Y - 60} ${NODES_X[4]},${NODE_Y}`;

const NODES_Y_MOBILE = [40, 220, 400, 580, 760];
const NODE_X_MOBILE = 40;
const PATH_D_MOBILE = `M${NODE_X_MOBILE},${NODES_Y_MOBILE[0]} C${NODE_X_MOBILE + 60},${NODES_Y_MOBILE[0] + 70} ${NODE_X_MOBILE - 60},${NODES_Y_MOBILE[1] - 70} ${NODE_X_MOBILE},${NODES_Y_MOBILE[1]} S${NODE_X_MOBILE + 70},${NODES_Y_MOBILE[2] - 60} ${NODE_X_MOBILE},${NODES_Y_MOBILE[2]} S${NODE_X_MOBILE - 70},${NODES_Y_MOBILE[3] - 60} ${NODE_X_MOBILE},${NODES_Y_MOBILE[3]} S${NODE_X_MOBILE + 60},${NODES_Y_MOBILE[4] - 60} ${NODE_X_MOBILE},${NODES_Y_MOBILE[4]}`;

export default function EcosystemFlow() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <section className="relative overflow-hidden bg-night-green py-24 text-warm-white sm:py-32" aria-labelledby="how-we-work-heading">
      <div className="mx-auto max-w-[1300px]" style={{ paddingInline: "var(--page-gutter)" }}>
        <span className="type-label inline-flex items-center gap-3 text-[11px] text-warm-white/60">
          <span className="h-[1px] w-8 bg-warm-white/40" aria-hidden="true" />
          HOW WE WORK
        </span>
        <h2 id="how-we-work-heading" className="type-display mt-6 max-w-xl text-[clamp(1.8rem,4.2vw,2.9rem)] leading-[1.1]">
          FROM POSSIBILITY
          <br />
          TO MOVEMENT.
        </h2>
        <p className="type-jp-body mt-5 max-w-md text-sm text-warm-white/70">
          可能性を、動き続ける仕組みに。街の中を流れる一本の光として。
        </p>

        <div ref={ref} className="relative mt-20">
          {/* デスクトップ: 横方向に流れる光 */}
          <div className="relative hidden md:block" style={{ height: "420px" }}>
            <svg viewBox="0 0 1120 280" className="absolute inset-x-0 top-0 h-[280px] w-full" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="flow-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#526849" />
                  <stop offset="50%" stopColor="#A47A4E" />
                  <stop offset="100%" stopColor="#F1B86B" />
                </linearGradient>
              </defs>
              <path d={PATH_D} stroke="#F5F0E5" strokeOpacity="0.08" strokeWidth="2" fill="none" />
              <path
                d={PATH_D}
                stroke="url(#flow-grad)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="1400"
                style={{
                  strokeDashoffset: inView ? 0 : 1400,
                  transition: "stroke-dashoffset 2.2s var(--ease-camera)",
                }}
              />
              {NODES_X.map((x, i) => (
                <circle
                  key={x}
                  cx={x}
                  cy={NODE_Y}
                  r="7"
                  fill="#F1B86B"
                  className="motion-safe-only animate-breathe"
                  style={{
                    animationDelay: `${i * 0.3}s`,
                    opacity: inView ? 1 : 0,
                    transition: `opacity 0.6s ease ${0.3 + i * 0.35}s`,
                  }}
                />
              ))}
            </svg>

            <div className="absolute inset-x-0 top-0 grid h-full grid-cols-5">
              {ecosystemFlow.map((step, i) => (
                <div
                  key={step.step}
                  className="flex flex-col items-center px-2 text-center transition-all duration-700 ease-district"
                  style={{
                    transitionDelay: `${0.4 + i * 0.35}s`,
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(16px)",
                  }}
                >
                  <div className="h-[180px]" aria-hidden="true" />
                  <FlowIcon type={NODE_ICON[step.title]} />
                  <p className="type-display mt-4 text-lg">{step.title}</p>
                  <p className="type-jp-body mt-2 text-xs text-warm-white/60">{step.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* モバイル: 縦方向に流れる光 */}
          <div className="relative md:hidden" style={{ height: `${NODES_Y_MOBILE[4] + 220}px` }}>
            <svg viewBox="0 0 80 900" className="absolute left-0 top-0 h-full w-20" preserveAspectRatio="none" aria-hidden="true">
              <path d={PATH_D_MOBILE} stroke="#F5F0E5" strokeOpacity="0.08" strokeWidth="2" fill="none" />
              <path
                d={PATH_D_MOBILE}
                stroke="url(#flow-grad)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="1200"
                style={{
                  strokeDashoffset: inView ? 0 : 1200,
                  transition: "stroke-dashoffset 2s var(--ease-camera)",
                }}
              />
            </svg>
            {ecosystemFlow.map((step, i) => (
              <div
                key={step.step}
                className="absolute left-24 right-0 transition-all duration-700 ease-district"
                style={{
                  top: `${NODES_Y_MOBILE[i] - 30}px`,
                  transitionDelay: `${0.3 + i * 0.3}s`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateX(0)" : "translateX(12px)",
                }}
              >
                <p className="type-display text-lg">{step.title}</p>
                <p className="type-jp-body mt-1 text-xs text-warm-white/60">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowIcon({ type }: { type: "find" | "edit" | "design" | "move" | "grow" }) {
  switch (type) {
    case "find":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
          <circle cx="20" cy="20" r="3" fill="#F1B86B" className="motion-safe-only animate-breathe" />
          <circle cx="20" cy="20" r="14" stroke="#F5F0E5" strokeOpacity="0.25" fill="none" />
        </svg>
      );
    case "edit":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
          {[8, 16, 24].map((y, i) => (
            <line key={y} x1="6" y1={y} x2={6 + 20 - i * 4} y2={y} stroke="#A47A4E" strokeWidth="3" strokeLinecap="round" />
          ))}
        </svg>
      );
    case "design":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
          <rect x="6" y="6" width="28" height="28" stroke="#F5F0E5" strokeOpacity="0.3" fill="none" />
          <line x1="6" y1="20" x2="34" y2="20" stroke="#F5F0E5" strokeOpacity="0.3" />
          <line x1="20" y1="6" x2="20" y2="34" stroke="#F5F0E5" strokeOpacity="0.3" />
          <circle cx="20" cy="20" r="4" fill="#F1B86B" />
        </svg>
      );
    case "move":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
          <line x1="4" y1="20" x2="30" y2="20" stroke="#9CBDB5" strokeWidth="2.5" />
          <path d="M24,13 L32,20 L24,27" stroke="#9CBDB5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "grow":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
          <path d="M20,34 C20,20 12,18 10,8" stroke="#789366" strokeWidth="3" fill="none" strokeLinecap="round" className="motion-safe-only animate-leafSway" style={{ transformOrigin: "20px 34px" }} />
          <path d="M20,34 C20,22 28,18 30,10" stroke="#526849" strokeWidth="3" fill="none" strokeLinecap="round" className="motion-safe-only animate-leafSway" style={{ transformOrigin: "20px 34px", animationDelay: "0.3s" }} />
        </svg>
      );
  }
}
