"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { ScrollReveal, ScrollStagger } from "@/components/motion";
import { MagneticButton } from "@/components/MagneticButton";
import { HiOutlineArrowRight } from "react-icons/hi";
import { projects } from "@/lib/projects";

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        href="/projects"
        className="block group relative h-full rounded-2xl border border-current/15 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-current/25 transition-all duration-300 p-6 lg:p-8"
      >
        {/* Sağ köşe — proje rengi */}
        {project.color && (
          <div
            className="absolute right-6 lg:right-8 top-6 lg:top-8 w-4 h-4 rounded-full ring-2 ring-current/20"
            style={{ backgroundColor: project.color }}
            aria-hidden
          />
        )}
        {/* Sol accent — hover'da belirir, proje kartına özgü */}
        <div
          className="absolute left-6 lg:left-8 top-6 bottom-6 w-0.5 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300"
          style={{ background: "var(--color-highlight)" }}
        />

        <div className="pl-4">
          <h3 className="font-[family-name:var(--font-display)] text-xl lg:text-2xl font-bold mb-2 group-hover:text-[var(--color-highlight)] transition-colors">
            {project.title}
          </h3>
          <p className="text-sm opacity-70 mb-2">{project.subtitle}</p>
          <p className="text-sm opacity-90 mb-4 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-current/10 border border-current/20 text-current/90"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <Section id="projects" colorToken="projects" grid>
      <div className="col-span-12 max-w-[1400px] mx-auto space-y-12">
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-sm font-medium tracking-widest uppercase opacity-60 mb-4">
              Öne Çıkan <span className="opacity-90">Projeler</span>
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight">
              Production ortamında geliştirdiğim{" "}
              <span className="text-[var(--color-highlight)]">
                web uygulamaları
              </span>
            </h2>
          </div>
          <div className="shrink-0">
            <MagneticButton as="span" strength={0.25}>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-lg font-semibold hover:underline underline-offset-4"
              >
                Tüm projeleri gör
                <HiOutlineArrowRight className="w-5 h-5" />
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>

        <ScrollStagger staggerDelay={0.12}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.slice(0, 6).map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </ScrollStagger>
      </div>
    </Section>
  );
}
