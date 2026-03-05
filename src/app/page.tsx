"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import Footer from "@/components/Footer";
import { ScrollReveal, ScrollStagger } from "@/components/motion";
import { HeroEntrance, HeroEntranceItem } from "@/components/HeroEntrance";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";
import { HiOutlineMail, HiOutlineArrowRight } from "react-icons/hi";
import { projects } from "@/lib/projects";

const socials = [
  { href: "https://github.com/onurataasar", icon: FaGithub, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/onur-ata-asar/",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
  {
    href: "https://medium.com/@onurataasar",
    icon: FaMedium,
    label: "Medium",
  },
  {
    href: "mailto:onurataasar@gmail.com",
    icon: HiOutlineMail,
    label: "Email",
  },
];

const skillCategories = [
  {
    label: "Frontend",
    skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS"],
  },
  {
    label: "State & Data",
    skills: ["Redux Toolkit", "Context API", "React Query", "Axios", "REST APIs"],
  },
  {
    label: "Styling",
    skills: [
      "Tailwind CSS",
      "Styled Components",
      "Sass",
      "Framer Motion",
      "Material UI",
    ],
  },
  {
    label: "Testing & DevOps",
    skills: ["Playwright", "Jest", "Azure Pipelines", "Sentry", "Vercel"],
  },
  {
    label: "Tools",
    skills: ["Git", "GitHub", "ESLint", "Prettier", "Figma"],
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Section id="hero" colorToken="hero" grid>
        <div className="col-span-12 lg:col-span-8 lg:col-start-1 flex flex-col justify-center min-h-[inherit]">
          <HeroEntrance>
            <HeroEntranceItem>
              <p className="text-sm font-medium tracking-widest uppercase text-[var(--color-accent)]">
                Selam, ben
              </p>
            </HeroEntranceItem>

            <HeroEntranceItem>
              <h1 className="font-[family-name:var(--font-display)] text-[var(--font-size-display)] font-bold tracking-tight">
                Onur Ata <span className="gradient-text">Asar</span>
              </h1>
            </HeroEntranceItem>

            <HeroEntranceItem>
              <p className="text-xl sm:text-2xl text-[var(--color-text-muted)] font-light">
                Software Developer
              </p>
            </HeroEntranceItem>

            <HeroEntranceItem>
              <p className="text-base text-[var(--color-text-muted)] leading-relaxed max-w-lg">
                Yazılım geliştirme üzerine düşüncelerimi, öğrendiklerimi ve
                deneyimlerimi paylaşıyorum.{" "}
                <Link
                  href="/blog"
                  className="text-[var(--color-accent)] hover:text-[var(--color-accent-secondary)] underline underline-offset-4 transition-colors"
                >
                  Bloglara
                </Link>
                ,{" "}
                <Link
                  href="/notes"
                  className="text-[var(--color-accent)] hover:text-[var(--color-accent-secondary)] underline underline-offset-4 transition-colors"
                >
                  dev notlarıma
                </Link>{" "}
                ve{" "}
                <Link
                  href="/projects"
                  className="text-[var(--color-accent)] hover:text-[var(--color-accent-secondary)] underline underline-offset-4 transition-colors"
                >
                  projelerime
                </Link>{" "}
                göz at.
              </p>
            </HeroEntranceItem>

            <HeroEntranceItem>
              <div className="flex items-center gap-4 pt-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={
                      social.href.startsWith("mailto") ? undefined : "_blank"
                    }
                    rel={
                      social.href.startsWith("mailto")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={22} />
                  </a>
                ))}
              </div>
            </HeroEntranceItem>

            <HeroEntranceItem>
              <div className="w-24 h-1 rounded-full gradient-bg opacity-60" />
            </HeroEntranceItem>
          </HeroEntrance>
        </div>
      </Section>

      {/* About Section */}
      <Section id="about" colorToken="about" grid>
        <div className="col-span-12 lg:col-span-8 lg:col-start-4 flex flex-col justify-center">
          <ScrollReveal>
          <h2 className="font-[family-name:var(--font-display)] text-[var(--font-size-h2)] font-bold mb-6">
            Hakkımda
          </h2>
          <p className="text-base leading-relaxed">
            Experienced Frontend Developer specializing in React, Next.js, and
            TypeScript, with a strong background in developing and maintaining
            production-level web applications. I focus on building scalable
            component systems, integrating complex APIs, and delivering
            performant user experiences. I take full ownership of frontend
            features and thrive in close collaboration with backend and design
            teams in Agile environments, always prioritizing code quality and
            long-term maintainability.
          </p>
          </ScrollReveal>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" colorToken="skills" grid>
        <div className="col-span-12">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-display)] text-[var(--font-size-h2)] font-bold mb-12">
              Technical <span className="opacity-90">Skills</span>
            </h2>
          </ScrollReveal>

          <ScrollStagger staggerDelay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {skillCategories.map((category) => (
                <motion.div
                  key={category.label}
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="p-6 lg:p-8 rounded-2xl border-2 border-current/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-current/30 transition-all duration-300"
                >
                  <h3 className="font-[family-name:var(--font-display)] text-xl lg:text-2xl font-bold mb-4 uppercase tracking-tight">
                    {category.label}
                  </h3>
                  <ul className="space-y-2 text-base lg:text-lg font-medium opacity-90">
                    {category.skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </ScrollStagger>
        </div>
      </Section>

      {/* Featured Projects Section */}
      <Section id="projects" colorToken="projects" grid>
        <div className="col-span-12">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-display)] text-[var(--font-size-h2)] font-bold mb-4">
              Featured <span className="opacity-90">Projects</span>
            </h2>
            <p className="text-lg opacity-90 mb-12 max-w-2xl">
              Production applications I&apos;ve built and contributed to as a frontend developer.
            </p>
          </ScrollReveal>

          <ScrollStagger staggerDelay={0.12}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {projects.slice(0, 3).map((project) => (
                <motion.div
                  key={project.title}
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
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
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 mt-8 text-lg font-semibold hover:underline underline-offset-4"
            >
              See all projects
              <HiOutlineArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </Section>

      {/* Contact Section (Footer) */}
      <Footer />
    </>
  );
}
