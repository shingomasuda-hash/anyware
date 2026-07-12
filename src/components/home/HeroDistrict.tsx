"use client";

import { useEffect, useRef, useState } from "react";
import MagneticLink from "@/components/ui/MagneticLink";
import ArchitecturalWord from "@/components/ui/ArchitecturalWord";
import DistrictIllustration from "@/components/home/DistrictIllustration";
import DistantSkyline from "@/components/home/DistantSkyline";
import ForegroundProps from "@/components/home/ForegroundProps";
import { useReducedMotion } from "@/components/motion/MotionProvider";

export default function HeroDistrict() {
  const sectionRef = useRef<HTMLElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    let raf = 0;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const section = sectionRef.current;
        const camera = cameraRef.current;
        if (!section || !camera) return;
        const progress = Math.min(
          1,
          Math.max(0, -section.getBoundingClientRect().top / window.innerHeight)
        );
        camera.style.setProperty("--scroll-progress", `${progress}`);
      });
    };

    const onMouseMove = (event: MouseEvent) => {
      if (isCoarse) return;
      const camera = cameraRef.current;
      if (!camera) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 2 * 12;
      const y = (event.clientY / window.innerHeight - 0.5) * 2 * 8;
      camera.style.setProperty("--px", `${x}px`);
      camera.style.setProperty("--py", `${y}px`);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden text-warm-white"
      style={{
        background:
          "radial-gradient(120% 90% at 22% 8%, rgba(16,22,17,0.92) 0%, transparent 55%), linear-gradient(185deg, #101611 0%, #171915 46%, #202B22 100%)",
      }}
      aria-label="AnyWareの建築空間 THE ANYWARE HOUSE"
    >
      <div
        ref={cameraRef}
        className="district-scene absolute inset-0"
        style={
          {
            "--scroll-progress": 0,
            transform:
              "translateY(calc(var(--scroll-progress) * -34px)) scale(calc(1 + var(--scroll-progress) * 0.07))",
            transition: ready ? "opacity 1.1s var(--ease-camera)" : undefined,
            opacity: ready ? 1 : 0,
          } as React.CSSProperties
        }
      >
        {/* Layer 02: 遠景の街並み */}
        <div
          className="motion-safe-only absolute inset-x-0 bottom-[24%] h-[48%]"
          style={{ transform: "translate(calc(var(--px, 0px) * 0.3), calc(var(--py, 0px) * 0.3))" }}
        >
          <DistantSkyline className="h-full w-full opacity-90" />
        </div>

        {/* Layer 03+04: 建築断面（外殻＋5部屋）
            モバイルでは建物全体を縮小せず、入口付近を大きくズームして見せる */}
        <div
          className="motion-safe-only absolute inset-x-0 bottom-[6%] h-[80%] overflow-hidden sm:bottom-[8%] md:h-[74%]"
          style={{ transform: "translate(calc(var(--px, 0px) * 0.55), calc(var(--py, 0px) * 0.55))" }}
        >
          <DistrictIllustration className="h-full w-[230%] max-w-none -translate-x-[22%] md:w-full md:translate-x-0" />
        </div>

        {/* Layer 07: 巨大ANYWARE立体文字（建物手前・床に立つ。裾は画面外へ切れてよい） */}
        <div
          className="motion-safe-only absolute inset-x-0 bottom-[3%] flex justify-center sm:bottom-[4%]"
          style={{ transform: "translate(calc(var(--px, 0px) * 0.6), calc(var(--py, 0px) * 0.6))" }}
        >
          <div
            aria-hidden="true"
            className="light-glow pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2"
          />
          <ArchitecturalWord
            text="ANYWARE"
            depth={11}
            className="relative select-none text-[clamp(2.6rem,10vw,7.6rem)] leading-[0.86] tracking-[-0.02em]"
          />
        </div>

        {/* Layer 05: 手前の質感（鉢植え・低い壁） */}
        <div
          className="motion-safe-only absolute inset-x-0 bottom-0 h-[36%]"
          style={{ transform: "translate(calc(var(--px, 0px) * 1), calc(var(--py, 0px) * 1))" }}
        >
          <ForegroundProps className="h-full w-full" />
        </div>
      </div>

      {/* ビネット */}
      <div className="surface-vignette" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-night-green to-transparent" />

      {/* Layer 08: コピー・CTA（暗部の余白に配置） */}
      <div
        className="relative z-10 flex flex-1 flex-col justify-start pt-[calc(var(--header-height)+2.5rem)] sm:pt-[calc(var(--header-height)+3.5rem)]"
        style={{ paddingInline: "var(--page-gutter)" }}
      >
        <div
          className={`max-w-md transition-all duration-1000 ease-district sm:max-w-lg ${
            ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <span className="type-label inline-flex items-center gap-3 text-[11px] text-amber-light/90">
            <span className="h-[1px] w-8 bg-amber-light/60" aria-hidden="true" />
            REGIONAL CREATIVE COMPANY
          </span>

          <p className="type-jp-heading mt-5 text-[clamp(1.7rem,4.6vw,2.7rem)] leading-[1.3] text-warm-white [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
            余白から、
            <br />
            まちを動かす。
          </p>

          <p className="type-jp-body mt-5 max-w-sm text-[13.5px] leading-loose text-warm-white/75 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-sm">
            地域に眠る価値を見つけ、伝わる形に編集し、事業として育てていく。
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticLink
              href="#philosophy"
              className="sign-plate type-label rounded-sm px-6 py-3.5 text-[11px] text-warm-white"
            >
              ENTER ANYWARE
            </MagneticLink>
            <MagneticLink
              href="/contact"
              className="sign-plate type-label rounded-sm px-6 py-3.5 text-[11px] text-amber-light"
            >
              START A PROJECT
            </MagneticLink>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex justify-center pb-8">
        <div className="type-label flex flex-col items-center gap-2 text-[10px] text-warm-white/50">
          SCROLL
          <span className="h-10 w-[1px] overflow-hidden bg-warm-white/25">
            <span className="motion-safe-only block h-full w-full origin-top animate-[scroll-line_2.2s_ease-in-out_infinite] bg-warm-white" />
          </span>
        </div>
      </div>
    </section>
  );
}
