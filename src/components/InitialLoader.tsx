"use client";

import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import homeElementAnimation from "@/../public/Home-element.json";

const lines = [
  { text: "Onur Ata", gradient: false },
  { text: "Asar", gradient: true },
];

/**
 * Full-screen initial load animation: Lottie loader + brand name reveal.
 * prefers-reduced-motion'a uyumlu.
 */
export function InitialLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(false);
      document.body.classList.remove("initial-load");
      return;
    }

    const staggerDelay = 0.15;
    const holdDuration = 0.8;
    const exitDuration = 0.5;

    const totalDuration =
      staggerDelay * lines.length + 0.6 + holdDuration + exitDuration;

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, totalDuration * 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleExitComplete = () => {
    document.body.classList.remove("initial-load");
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-6 bg-[var(--color-bg)]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
          aria-hidden="true"
        >
          <motion.div
            className="h-48 w-48 shrink-0 sm:h-64 sm:w-64"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Lottie
              animationData={homeElementAnimation}
              loop
              style={{ height: "100%", width: "100%" }}
            />
          </motion.div>

          <motion.h1
            className="text-center font-[family-name:var(--font-display)] font-bold tracking-tighter leading-[0.9]"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.1,
                },
              },
              hidden: {},
            }}
          >
            {lines.map((line) => (
              <motion.span
                key={line.text}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className={
                  line.gradient
                    ? "mt-1 block text-[clamp(2.5rem,12vw,6.5rem)] gradient-text"
                    : "block text-[clamp(2.5rem,10vw,6rem)] text-[var(--color-text)]"
                }
              >
                {line.text}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
