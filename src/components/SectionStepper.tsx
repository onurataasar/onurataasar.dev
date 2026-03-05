"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineCode,
  HiOutlineFolder,
  HiOutlineMail,
} from "react-icons/hi";
import type { IconType } from "react-icons";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const SECTIONS: { id: string; icon: IconType; label: string }[] = [
  { id: "hero", icon: HiOutlineHome, label: "Ana sayfa" },
  { id: "about", icon: HiOutlineUser, label: "Hakkımda" },
  { id: "skills", icon: HiOutlineCode, label: "Yetenekler" },
  { id: "projects", icon: HiOutlineFolder, label: "Projeler" },
  { id: "contact", icon: HiOutlineMail, label: "İletişim" },
];

export function SectionStepper() {
  const activeId = useScrollSpy(SECTIONS.map((s) => s.id));
  const scrollProgress = useScrollProgress();
  const [optimisticId, setOptimisticId] = useState<string | null>(null);

  const displayId = optimisticId ?? activeId;

  useEffect(() => {
    if (optimisticId && activeId === optimisticId) {
      setOptimisticId(null);
    }
  }, [optimisticId, activeId]);

  const handleClick = (id: string) => {
    setOptimisticId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const progressDeg = scrollProgress * 360;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex">
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        style={{
          background: `conic-gradient(from -90deg, color-mix(in srgb, currentColor 25%, transparent) ${progressDeg}deg, transparent ${progressDeg}deg)`,
          maskImage: `linear-gradient(#fff,#fff), linear-gradient(#fff,#fff)`,
          maskSize: `100% 100%, calc(100% - 4px) calc(100% - 4px)`,
          maskPosition: `0 0, 2px 2px`,
          maskRepeat: `no-repeat`,
          maskComposite: `exclude`,
        }}
      />
      <nav
        className="relative z-0 flex flex-col gap-2 p-2 rounded-2xl bg-current/[0.04] backdrop-blur-sm"
        aria-label="Bölüm navigasyonu"
      >
        {SECTIONS.map(({ id, icon: Icon, label }) => {
          const isActive = displayId === id;
          return (
            <motion.button
              key={id}
              type="button"
              onClick={() => handleClick(id)}
              aria-label={label}
              aria-current={isActive ? "true" : undefined}
              className="relative flex items-center justify-center w-11 h-11 rounded-xl text-current/60 hover:text-current hover:bg-current/10 transition-colors"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.span
                  layoutId="stepper-active"
                  className="absolute inset-0 rounded-xl bg-current/15 border border-current/25"
                  transition={{ type: "spring", stiffness: 700, damping: 40 }}
                />
              )}
              <Icon
                className="relative z-10 w-5 h-5"
                style={{ opacity: isActive ? 1 : 0.7 }}
              />
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}
