"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Staggered entrance animation for hero content (HOME-01).
 * Runs on mount — hero is above the fold.
 */
export function HeroEntrance({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {children}
    </motion.div>
  );
}

export function HeroEntranceItem({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={item}
      transition={{ duration: 0.5 }}
      className="contents"
    >
      {children}
    </motion.div>
  );
}
