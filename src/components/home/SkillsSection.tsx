"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Section } from "@/components/Section";
import { ScrollReveal } from "@/components/motion";
import { skillCategories } from "@/lib/home-data";
import {
  FaReact,
  FaDatabase,
  FaPalette,
  FaFlask,
  FaTools,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function useReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduceMotion;
}

const PLACEHOLDER_COLORS: Record<string, { from: string; to: string }> = {
  Frontend: { from: "#FF6B35", to: "#FFD23F" },
  "State & Data": { from: "#FF4444", to: "#FF6B35" },
  Styling: { from: "#FFD23F", to: "#FF6B35" },
  "Testing & DevOps": { from: "#1A1A2E", to: "#64748B" },
  Tools: { from: "#FF6B35", to: "#FF4444" },
};

const CATEGORY_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Frontend: FaReact,
  "State & Data": FaDatabase,
  Styling: FaPalette,
  "Testing & DevOps": FaFlask,
  Tools: FaTools,
};

function PlaceholderIcon({ label }: { label: string }) {
  const Icon = CATEGORY_ICONS[label] ?? FaReact;
  return <Icon className="w-12 h-12 lg:w-14 lg:h-14 opacity-70" aria-hidden />;
}

function SkillCard({
  category,
  reduceMotion,
}: {
  category: (typeof skillCategories)[0];
  reduceMotion: boolean;
}) {
  const springConfig = { stiffness: 300, damping: 25 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const relX = (e.clientX - centerX) / (rect.width / 2);
    const relY = (e.clientY - centerY) / (rect.height / 2);
    rotateX.set(relY * -4);
    rotateY.set(relX * 4);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const colors = PLACEHOLDER_COLORS[category.label] ?? {
    from: "#FF6B35",
    to: "#FFD23F",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="embla__slide min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pr-4 lg:pr-6 h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          reduceMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
              }
        }
        className="h-full rounded-2xl border-2 border-current/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-current/30 transition-all duration-300 overflow-hidden group"
      >
        <div className="flex flex-col h-full">
          <div
            className="relative w-full h-36 lg:h-3/5 overflow-hidden shrink-0 flex flex-col items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${colors.from}40, ${colors.to}60)`,
            }}
          >
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23fff' stroke-width='0.5' opacity='0.5'%3E%3Cpath d='M0 16h32M16 0v32'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
            <div className="relative z-10 flex flex-col items-center justify-center gap-1.5 text-center px-3">
              <PlaceholderIcon label={category.label} />
              <span className="font-[family-name:var(--font-display)] text-xs lg:text-sm font-bold uppercase tracking-widest opacity-80">
                {category.label}
              </span>
              {category.description && (
                <p className="text-xs opacity-75 leading-snug max-w-[90%]">
                  {category.description}
                </p>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none" />
          </div>

          <div className="p-4 lg:p-5 flex-1 min-h-0 overflow-y-auto">
            <ul className="flex flex-wrap gap-4">
              {category.skills.map((skill) => (
                <motion.li
                  key={skill}
                  initial={false}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                  className="px-6 tracking-wider py-3 text-xl font-medium rounded-full bg-current/15 hover:bg-current/25 border border-current/20 hover:border-current/40 transition-colors cursor-default"
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function SkillsSection() {
  const reduceMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
    },
    [Autoplay({ delay: 3500 })],
  );

  useEffect(() => {
    emblaApi?.plugins().autoplay?.play();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <Section id="skills" colorToken="skills" grid>
      <div className="col-span-12 overflow-visible space-y-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <ScrollReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-[var(--font-size-h2)] font-bold mb-2">
                Technical <span className="opacity-90">Skills</span>
              </h2>
              <p className="text-base lg:text-5xl opacity-90 max-w-2xl">
                Alanımda kullandığım geliştirme araçları ve teknolojiler.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={scrollPrev}
                className="p-3 rounded-xl text-current/80 hover:text-current hover:bg-current/10 transition-all"
                aria-label="Önceki"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="p-3 rounded-xl text-current/80 hover:text-current hover:bg-current/10 transition-all"
                aria-label="Sonraki"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            </div>
          </ScrollReveal>
        </div>

        <div className="relative w-[100vw] h-4/5 left-1/2 -translate-x-1/2">
          <div className="overflow-hidden h-full" ref={emblaRef}>
            <div className="flex touch-pan-y  h-full">
              {skillCategories.map((category) => (
                <SkillCard
                  key={category.label}
                  category={category}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
