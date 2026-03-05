"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const techTags = [
  "React",
  "Next.js",
  "TypeScript",
  "Framer Motion",
  "Tailwind",
  "Node.js",
];

/**
 * Scrolling tech stack marquee for hero.
 * Disabled when prefers-reduced-motion.
 */
export function HeroTechMarquee() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (reduceMotion) return null;

  return (
    <div className="absolute bottom-6 left-0 right-0 overflow-hidden py-2 md:bottom-8">
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: [0, -720] }}
        transition={{
          x: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
      >
        {[...techTags, ...techTags].map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="text-sm font-medium text-[var(--color-text-muted)]/60 px-4 py-2 rounded-full border border-[var(--color-border)]/50"
          >
            {tag}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
