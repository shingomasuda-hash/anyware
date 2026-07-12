"use client";

import { useEffect, useRef, useState } from "react";
import MagneticLink from "@/components/ui/MagneticLink";
import SectionLabel from "@/components/ui/SectionLabel";
import ArchitecturalWord from "@/components/ui/ArchitecturalWord";
import DistrictIllustration from "@/components/home/DistrictIllustration";
import { useReducedMotion } from "@/components/motion/MotionProvider";

export default function HeroDistrict() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
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
        const scene = sceneRef.current;
        if (!section || !scene) return;
        const progress = Math.min(
          1,
          Math.max(0, -section.getBoundingClientRect().top / window.innerHeight)
        );
        scene.style.transform = `translateY(${progress * -40}px) scale(${1 + progress * 0.08})`;
        scene.style.opacity = `${1 - progress * 0.5}`;
      });
    };

    const onMouseMove = (event: MouseEvent) => {
      if (isCoarse) return;
      const scene = sceneRef.current;
      if (!scene) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 12;
      const y = (event.clientY / window.innerHeight - 0.5) * 8;
      scene.style.setProperty("--parallax-x", `${x}px`);
      scene.style.setProperty("--parallax-y", `${y}px`);
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
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-warm-white"
      aria-label="AnyWareの建築空間"
    >
      <div
        ref={sceneRef}
        className="district-scene absolute inset-x-0 bottom-0 h-[62%] min-h-[320px] transition-opacity duration-700"
        style={{
          transform: "translate(var(--parallax-x, 0), var(--parallax-y, 0))",
          opacity: ready ? 1 : 0,
        }}
      >
        <DistrictIllustration className="h-full w-full" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />

      <div
        className="relative z-10 flex flex-1 flex-col justify-center pt-[var(--header-height)]"
        style={{ paddingInline: "var(--page-gutter)" }}
      >
        <div
          className={`max-w-3xl transition-all duration-1000 ease-district ${
            ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <SectionLabel eyebrow="REGIONAL CREATIVE COMPANY" tone="light" />

          <h1 className="mt-6">
            <ArchitecturalWord
              text="ANYWARE"
              depth={10}
              className="text-[clamp(2.6rem,9vw,6rem)] leading-[0.9]"
            />
            <span className="type-jp-heading mt-6 block text-[clamp(1.9rem,5.4vw,3.4rem)] leading-[1.35]">
              余白から、
              <br />
              まちを動かす。
            </span>
          </h1>

          <p className="type-jp-body mt-6 max-w-xl text-[clamp(0.95rem,1.6vw,1.05rem)] text-warm-white/80">
            地域に眠る魅力を見つけ、伝わる形に編集し、事業として実装し、育てていく。AnyWareは、地域創生、ブランディング・PR、事業伴走、飲食、水耕栽培を横断し、地域の経済圏に新しいうねりを生み出します。
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticLink
              href="#philosophy"
              className="type-label rounded-full bg-warm-white px-7 py-3.5 text-[11px] text-ink"
            >
              EXPLORE ANYWARE
            </MagneticLink>
            <MagneticLink
              href="/contact"
              className="type-label rounded-full border border-warm-white/70 px-7 py-3.5 text-[11px] text-warm-white transition-colors hover:bg-warm-white hover:text-ink"
            >
              CONTACT
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
