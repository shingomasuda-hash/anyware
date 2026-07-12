"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticLink from "@/components/ui/MagneticLink";
import { useReducedMotion } from "@/components/motion/MotionProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 実写ビジュアル内のおおよその窓明かり位置（%）。初期表示で順番に光が灯る演出に使う。
const LIGHT_FLARES = [
  { x: "78%", y: "20%", size: 90 },
  { x: "88%", y: "26%", size: 60 },
  { x: "58%", y: "30%", size: 70 },
  { x: "34%", y: "45%", size: 80 },
  { x: "70%", y: "60%", size: 70 },
  { x: "48%", y: "55%", size: 60 },
];

const PARTICLES = Array.from({ length: 18 }).map((_, i) => ({
  x: `${(i * 37) % 100}%`,
  y: `${(i * 53) % 100}%`,
  size: 2 + (i % 3),
  delay: (i % 6) * 0.9,
  duration: 9 + (i % 5) * 2,
}));

export default function HeroDistrict() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollGuideRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      gsap.set([copyRef.current, ctaRef.current, scrollGuideRef.current], {
        opacity: 1,
        clearProps: "transform,clipPath",
      });
      return;
    }

    const ctx = gsap.context(() => {
      // --- 初期表示アニメーション ---
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(imageWrapRef.current, { scale: 1.06 }, { scale: 1, duration: 2.4, ease: "power2.out" }, 0)
        .fromTo(".hero-light-flare", { opacity: 0 }, { opacity: 1, duration: 1.1, stagger: 0.16 }, 0.35)
        .fromTo(
          copyRef.current,
          { clipPath: "inset(0 0 100% 0)", opacity: 0 },
          { clipPath: "inset(0 0 0% 0)", opacity: 1, duration: 1.1, ease: "power4.out" },
          0.5
        )
        .fromTo(ctaRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 1)
        .fromTo(scrollGuideRef.current, { opacity: 0 }, { opacity: 1, duration: 0.9 }, 1.4);

      // --- マウス追従（静かな視差） ---
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      if (!isCoarse) {
        const xImg = gsap.quickTo(imageWrapRef.current, "x", { duration: 0.7, ease: "power3" });
        const yImg = gsap.quickTo(imageWrapRef.current, "y", { duration: 0.7, ease: "power3" });
        const xRefl = gsap.quickTo(reflectionRef.current, "x", { duration: 0.6, ease: "power3" });
        const yRefl = gsap.quickTo(reflectionRef.current, "y", { duration: 0.6, ease: "power3" });
        const xPart = gsap.quickTo(particlesRef.current, "x", { duration: 0.5, ease: "power3" });
        const yPart = gsap.quickTo(particlesRef.current, "y", { duration: 0.5, ease: "power3" });

        const onMove = (event: MouseEvent) => {
          const nx = event.clientX / window.innerWidth - 0.5;
          const ny = event.clientY / window.innerHeight - 0.5;
          xImg(nx * 4);
          yImg(ny * 3);
          xRefl(nx * 16);
          yRefl(ny * 12);
          xPart(nx * 22);
          yPart(ny * 16);
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // スクロール時：建物へ近づき、コピーは奥へ退く
  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        })
        .to(imageWrapRef.current, { scale: 1.16, ease: "none" }, 0)
        .to(copyRef.current, { y: -70, opacity: 0, ease: "none" }, 0)
        .to(ctaRef.current, { y: -50, opacity: 0, ease: "none" }, 0)
        .to(scrollGuideRef.current, { opacity: 0, ease: "none" }, 0);
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night-green text-warm-white"
      aria-label="AnyWareの建築空間 THE ANYWARE HOUSE"
    >
      {/* Layer 1: 背景メインビジュアル */}
      <div ref={imageWrapRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/hero/hero-pc.webp"
          alt="夕暮れの丘に建つAnyWareの建築空間の断面。地域創生の広場、ブランディングスタジオ、事業伴走の円卓、飲食店のキッチン、水耕栽培のグリーンラボが一つの建物としてつながり、巨大なANYWAREの立体文字が手前に立っている。"
          fill
          priority
          sizes="100vw"
          className="hidden object-cover md:block"
          style={{ objectPosition: "56% 46%" }}
        />
        <Image
          src="/images/hero/hero-mobile.webp"
          alt="夕暮れの丘に建つAnyWareの建築空間の断面。地域創生の広場、ブランディングスタジオ、事業伴走の円卓、飲食店のキッチン、水耕栽培のグリーンラボが一つの建物としてつながり、巨大なANYWAREの立体文字が手前に立っている。"
          fill
          priority
          sizes="100vw"
          className="block object-cover md:hidden"
          style={{ objectPosition: "50% 100%" }}
        />
      </div>

      {/* Layer 2: 暗部調整グラデーションマスク */}
      <div
        className="pointer-events-none absolute inset-0 md:w-3/4"
        style={{
          background:
            "linear-gradient(100deg, rgba(9,12,9,0.82) 0%, rgba(9,12,9,0.5) 32%, rgba(9,12,9,0.08) 62%, transparent 78%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Layer 3: ガラス反射レイヤー */}
      <div
        ref={reflectionRef}
        aria-hidden="true"
        className="hero-reflection pointer-events-none absolute inset-0 will-change-transform"
      />

      {/* Layer 4: 光の揺らぎ（窓明かりが点灯していく気配） */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {LIGHT_FLARES.map((f, i) => (
          <span
            key={i}
            className="hero-light-flare motion-safe-only absolute rounded-full animate-breathe"
            style={{
              left: f.x,
              top: f.y,
              width: f.size,
              height: f.size,
              background: "radial-gradient(circle, rgba(241,184,107,0.75), transparent 70%)",
              filter: "blur(5px)",
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
      </div>

      {/* Layer 6: 浮遊する微細な粒子 */}
      <div ref={particlesRef} aria-hidden="true" className="pointer-events-none absolute inset-0 will-change-transform">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="motion-safe-only absolute rounded-full bg-warm-white/50 animate-hero-particle"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Layer 7: コピー・CTA */}
      <div
        className="relative z-10 flex flex-1 flex-col justify-end pb-16 sm:justify-center sm:pb-0"
        style={{ paddingInline: "var(--page-gutter)" }}
      >
        <div ref={copyRef} className="max-w-md sm:max-w-lg">
          <span className="type-label inline-flex items-center gap-3 text-[11px] text-amber-light/90">
            <span className="h-[1px] w-8 bg-amber-light/60" aria-hidden="true" />
            REGIONAL CREATIVE COMPANY
          </span>

          <p className="type-jp-heading mt-5 text-[clamp(1.7rem,4.6vw,2.9rem)] leading-[1.3] text-warm-white [text-shadow:0_4px_24px_rgba(0,0,0,0.75)]">
            余白から、
            <br />
            まちを動かす。
          </p>

          <p className="type-jp-body mt-5 max-w-sm text-[13.5px] leading-loose text-warm-white/85 [text-shadow:0_2px_14px_rgba(0,0,0,0.7)] sm:text-sm">
            地域に眠る価値を見つけ、
            <br className="hidden sm:block" />
            伝わる形に編集し、
            <br className="hidden sm:block" />
            事業として実装し、育てていく。
          </p>
        </div>

        <div ref={ctaRef} className="mt-9 flex flex-wrap items-center gap-3">
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

      {/* Layer 9: スクロールガイド */}
      <div ref={scrollGuideRef} className="relative z-10 flex justify-center pb-8">
        <div className="type-label flex flex-col items-center gap-2 text-[10px] text-warm-white/60">
          SCROLL
          <span className="h-10 w-[1px] overflow-hidden bg-warm-white/30">
            <span className="motion-safe-only block h-full w-full origin-top animate-[scroll-line_2.2s_ease-in-out_infinite] bg-warm-white" />
          </span>
        </div>
      </div>
    </section>
  );
}
