"use client";

import { useEffect, useState } from "react";

/**
 * Sayfa scroll pozisyonuna göre 0-1 arası progress değeri döner.
 * @returns 0 (en üst) - 1 (en alt)
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const maxScroll = scrollHeight - clientHeight;
      setProgress(maxScroll <= 0 ? 0 : scrollTop / maxScroll);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}
