"use client";

import Link from "next/link";
import { useRef } from "react";

type MagneticLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
};

const STRENGTH = 0.25;
const MAX_OFFSET = 10;

export default function MagneticLink({
  href,
  children,
  className,
  ...rest
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const clampedX = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, x * STRENGTH));
    const clampedY = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, y * STRENGTH));
    el.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`motion-safe-only inline-block transition-transform duration-300 ease-district ${className ?? ""}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
