"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ReducedMotionContext = createContext(false);

export const useReducedMotion = () => useContext(ReducedMotionContext);

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return (
    <ReducedMotionContext.Provider value={reduced}>
      {children}
    </ReducedMotionContext.Provider>
  );
}
