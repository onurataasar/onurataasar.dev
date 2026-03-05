"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import Footer from "@/components/Footer";
import { ScrollReveal, ScrollStagger } from "@/components/motion";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

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
          <div className="space-y-6">
            <ScrollReveal delay={0}>
              <p className="text-sm font-medium tracking-widest uppercase text-[var(--color-accent)]">
                Selam, ben
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1} direction="up">
              <h1 className="font-[family-name:var(--font-display)] text-[var(--font-size-display)] font-bold tracking-tight">
                Onur Ata <span className="gradient-text">Asar</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-xl sm:text-2xl text-[var(--color-text-muted)] font-light">
                Software Developer
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
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
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
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
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
            <div className="w-24 h-1 rounded-full gradient-bg opacity-60" />
            </ScrollReveal>
          </div>
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
      <Section id="skills" colorToken="skills">
        <div className="space-y-6">
          <ScrollReveal>
          <h2 className="font-[family-name:var(--font-display)] text-[var(--font-size-h2)] font-bold">
            Technical <span className="opacity-90">Skills</span>
          </h2>
          </ScrollReveal>

          <ScrollStagger staggerDelay={0.06}>
          <div className="space-y-4">
            {skillCategories.map((category) => (
              <motion.div
                key={category.label}
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.4 }}
                className="space-y-2"
              >
                <h3 className="text-sm font-medium opacity-80 uppercase tracking-wider">
                  {category.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm rounded-full border border-current/30 bg-white/20 hover:bg-white/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          </ScrollStagger>
        </div>
      </Section>

      {/* Contact Section (Footer) */}
      <Footer />
    </>
  );
}
