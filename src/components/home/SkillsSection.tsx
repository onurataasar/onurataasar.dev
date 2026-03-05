"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { Section } from "@/components/Section";
import { ScrollReveal, ScrollStagger } from "@/components/motion";
import { skillCategories } from "@/lib/home-data";
import Image from "next/image";

/** Bento grid layout: Frontend büyük, diğerleri küçük kartlar */
const BENTO_LAYOUT: Record<string, string> = {
  Frontend: "md:col-span-2 md:row-span-2",
  "State & Data": "md:col-span-1",
  Styling: "md:col-span-1",
  "Testing & DevOps": "md:col-span-1",
  Tools: "md:col-span-1",
};

/** Placeholder görsel — her kategori için benzersiz gradient */
const PLACEHOLDER_COLORS: Record<string, { from: string; to: string }> = {
  Frontend: { from: "#FF6B35", to: "#FFD23F" },
  "State & Data": { from: "#FF4444", to: "#FF6B35" },
  Styling: { from: "#FFD23F", to: "#FF6B35" },
  "Testing & DevOps": { from: "#1A1A2E", to: "#64748B" },
  Tools: { from: "#FF6B35", to: "#FF4444" },
};

function SkillCard({
  category,
  layoutClass,
  index,
}: {
  category: (typeof skillCategories)[0];
  layoutClass: string;
  index: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 25 };
  const rotateX = useSpring(
    useMotionValue(0),
    springConfig
  );
  const rotateY = useSpring(
    useMotionValue(0),
    springConfig
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget) return;
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

  const isLarge = layoutClass.includes("row-span-2");

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={layoutClass}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        className="h-full rounded-2xl border-2 border-current/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-current/30 transition-all duration-300 overflow-hidden group"
      >
        <div className="flex flex-col h-full">
          {/* Placeholder görsel alanı */}
          <div
            className="relative w-full aspect-video overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${colors.from}22, ${colors.to}33)`,
            }}
          >
            {/* Placeholder pattern overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0zM20 20h20v20H20z' fill='none' stroke='%23fff' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
              }}
            />
            <Image
              src={`https://placehold.co/${isLarge ? "600x400" : "400x200"}/1a1a2e/ff6b35?text=${encodeURIComponent(category.label)}&font=inter`}
              alt={`${category.label} placeholder`}
              fill
              className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: `linear-gradient(180deg, transparent 0%, var(--color-section-skills) 100%)`,
                opacity: 0.5,
              }}
            />
          </div>

          <div className="p-5 lg:p-6 flex-1 flex flex-col">
            <h3 className="font-[family-name:var(--font-display)] text-lg lg:text-xl font-bold mb-3 uppercase tracking-tight">
              {category.label}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <motion.li
                  key={skill}
                  initial={false}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                  className="px-3 py-1.5 text-sm font-medium rounded-full bg-current/15 hover:bg-current/25 border border-current/20 hover:border-current/40 transition-colors cursor-default"
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
  return (
    <Section id="skills" colorToken="skills" grid>
      <div className="col-span-12">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-display)] text-[var(--font-size-h2)] font-bold mb-4">
            Technical <span className="opacity-90">Skills</span>
          </h2>
          <p className="text-lg opacity-90 mb-12 max-w-2xl">
            UI/UX odaklı geliştirme araçları ve teknolojiler.
          </p>
        </ScrollReveal>

        <ScrollStagger staggerDelay={0.08}>
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 lg:gap-6 auto-rows-fr">
            {skillCategories.map((category, index) => (
              <SkillCard
                key={category.label}
                category={category}
                layoutClass={BENTO_LAYOUT[category.label] ?? ""}
                index={index}
              />
            ))}
          </div>
        </ScrollStagger>
      </div>
    </Section>
  );
}
