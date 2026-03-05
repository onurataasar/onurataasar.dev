"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineCode, HiOutlineArrowLeft } from "react-icons/hi";
import { projects } from "@/lib/projects";
import { ScrollReveal, ScrollStagger } from "@/components/motion";

export default function ProjectsPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
      <ScrollReveal>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors mb-8"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          Ana sayfa
        </Link>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h1 className="font-[family-name:var(--font-display)] text-[var(--font-size-h1)] font-bold">
          <span className="gradient-text">Projects</span>
        </h1>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <p className="text-[var(--color-text-muted)] max-w-2xl mt-4 text-lg">
          Production applications I&apos;ve built and contributed to as a
          frontend developer.
        </p>
      </ScrollReveal>

      <ScrollStagger className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16" staggerDelay={0.12}>
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5 }}
            className={`group relative overflow-hidden rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] p-8 hover:border-[var(--color-accent)]/50 hover:shadow-lg hover:shadow-[var(--color-accent)]/5 transition-all duration-300 ${
              index % 2 === 1 ? "lg:mt-12" : ""
            }`}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] shrink-0">
                <HiOutlineCode size={24} />
              </div>
              <div className="space-y-4 flex-1 min-w-0">
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold group-hover:text-[var(--color-accent)] transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-[var(--color-text-muted)] mt-1">
                    {project.subtitle} — {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-sm font-medium rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <ul className="space-y-2 text-[var(--color-text-muted)]">
                  {project.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[var(--color-accent)] mt-1.5 shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        ))}
      </ScrollStagger>
    </div>
  );
}
