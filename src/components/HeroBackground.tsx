"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Decorative floating shapes for maximalist hero.
 * Abstract blobs and geometric elements using Electric Warm palette.
 * Animations disabled when prefers-reduced-motion.
 */
export function HeroBackground() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (reduceMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div
          className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: "var(--color-accent)" }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[300px] h-[300px] rounded-full opacity-10"
          style={{ background: "var(--color-highlight)" }}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Large accent blob — top right */}
      <motion.div
        className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full opacity-20"
        style={{ background: "var(--color-accent)" }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Yellow highlight blob — bottom left */}
      <motion.div
        className="absolute -bottom-32 -left-32 w-[300px] h-[300px] rounded-full opacity-15"
        style={{ background: "var(--color-highlight)" }}
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Coral accent — center right */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 -right-16 w-64 h-64 rounded-full opacity-10"
        style={{ background: "var(--color-accent-secondary)" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid overlay — subtle */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-text) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-text) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
