"use client";

import { useEffect, useState } from "react";

/**
 * Intersection Observer ile viewport'ta görünen section'ı takip eder.
 * Birden fazla section görünürse, sayfada en altta olan (scroll pozisyonuna en yakın) seçilir.
 * @param sectionIds - Takip edilecek section ID'leri (yukarıdan aşağıya sıralı)
 * @param options - Intersection Observer ayarları
 * @returns Aktif section ID veya null
 */
export function useScrollSpy(
  sectionIds: string[],
  options?: { rootMargin?: string; threshold?: number }
) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const visibleIds = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute("id");
          if (!id || !sectionIds.includes(id)) continue;

          if (entry.isIntersecting) {
            visibleIds.add(id);
          } else {
            visibleIds.delete(id);
          }
        }

        if (visibleIds.size === 0) return;

        const sorted = [...visibleIds].sort(
          (a, b) => sectionIds.indexOf(a) - sectionIds.indexOf(b)
        );
        setActiveId(sorted[sorted.length - 1] ?? null);
      },
      {
        rootMargin: options?.rootMargin ?? "-30% 0px -30% 0px",
        threshold: options?.threshold ?? 0,
      }
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds.join(","), options?.rootMargin, options?.threshold]);

  return activeId;
}
