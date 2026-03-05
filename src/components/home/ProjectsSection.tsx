"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { ScrollReveal, ScrollStagger } from "@/components/motion";
import { MagneticButton } from "@/components/MagneticButton";
import { HiOutlineArrowRight } from "react-icons/hi";
import { projects } from "@/lib/projects";

export function ProjectsSection() {
  return (
    <Section id="projects" colorToken="projects" grid>
      <div className="col-span-12">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-display)] text-[var(--font-size-h2)] font-bold mb-4">
            Featured <span className="opacity-90">Projects</span>
          </h2>
          <p className="text-lg opacity-90 mb-12 max-w-2xl">
            Production applications I&apos;ve built and contributed to as a
            frontend developer.
          </p>
        </ScrollReveal>

        <ScrollStagger staggerDelay={0.12}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.slice(0, 3).map((project) => (
              <motion.div
                key={project.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link
                  href="/projects"
                  className="block group p-6 lg:p-8 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/40 transition-all duration-300 h-full"
                >
                  <h3 className="font-[family-name:var(--font-display)] text-xl lg:text-2xl font-bold mb-2 group-hover:underline underline-offset-4">
                    {project.title}
                  </h3>
                  <p className="text-sm opacity-90 mb-3">
                    {project.subtitle} — {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold opacity-90 group-hover:gap-3 transition-all">
                    View all projects
                    <HiOutlineArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </ScrollStagger>

        <ScrollReveal>
          <MagneticButton as="span" strength={0.25}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 mt-8 text-lg font-semibold hover:underline underline-offset-4"
            >
              See all projects
              <HiOutlineArrowRight className="w-5 h-5" />
            </Link>
          </MagneticButton>
        </ScrollReveal>
      </div>
    </Section>
  );
}
