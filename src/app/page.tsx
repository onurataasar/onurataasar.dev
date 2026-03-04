"use client";
import Link from "next/link";
import {
  FadeIn,
  ParallaxLayer,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
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
    skills: ["Tailwind CSS", "Styled Components", "Sass", "Framer Motion", "Material UI"],
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
    <div className="flex-1 flex flex-col gap-12 sm:gap-16">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24">
        {/* Decorative year numeral */}
        <div className="absolute top-8 right-0 text-[12rem] sm:text-[16rem] font-bold leading-none text-[var(--color-text-ghost)] opacity-[0.04] select-none pointer-events-none font-[family-name:var(--font-instrument-serif)]">
          2026
        </div>

        <FadeIn>
          <p className="text-sm font-medium tracking-widest uppercase text-[var(--color-text-ghost)] mb-4">
            Selam, ben
          </p>
        </FadeIn>

        <ParallaxLayer offset={0.015}>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-[family-name:var(--font-instrument-serif)] tracking-tight leading-[1.1]">
              Onur Ata Asar
            </h1>
          </FadeIn>
        </ParallaxLayer>

        <ParallaxLayer offset={0.025}>
          <FadeIn delay={0.2}>
            <p className="text-xl sm:text-2xl text-[var(--color-accent)] font-light mt-3">
              Software Developer
            </p>
          </FadeIn>
        </ParallaxLayer>

        <FadeIn delay={0.3}>
          <p className="text-base text-[var(--color-text-secondary)] leading-relaxed max-w-lg mt-6">
            Yazılım geliştirme üzerine düşüncelerimi, öğrendiklerimi ve
            deneyimlerimi paylaşıyorum.{" "}
            <Link
              href="/blog"
              className="text-[var(--color-accent)] underline underline-offset-4 decoration-[var(--color-accent)]/30 hover:decoration-[var(--color-accent)] transition-colors"
            >
              Bloglara
            </Link>
            ,{" "}
            <Link
              href="/notes"
              className="text-[var(--color-accent)] underline underline-offset-4 decoration-[var(--color-accent)]/30 hover:decoration-[var(--color-accent)] transition-colors"
            >
              dev notlarıma
            </Link>{" "}
            ve{" "}
            <Link
              href="/projects"
              className="text-[var(--color-accent)] underline underline-offset-4 decoration-[var(--color-accent)]/30 hover:decoration-[var(--color-accent)] transition-colors"
            >
              projelerime
            </Link>{" "}
            göz at.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex items-center gap-3 mt-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  social.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="p-2.5 rounded-xl bg-[var(--color-bg-layer-1)] shadow-[var(--shadow-sm)] text-[var(--color-text-ghost)] hover:text-[var(--color-accent)] hover:shadow-[var(--shadow-md)] transition-all duration-200"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Profile Section */}
      <FadeIn delay={0.5}>
        <section className="card-static p-6 sm:p-8">
          <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
            Experienced Frontend Developer specializing in React, Next.js, and
            TypeScript, with a strong background in developing and maintaining
            production-level web applications. I focus on building scalable
            component systems, integrating complex APIs, and delivering
            performant user experiences. I take full ownership of frontend
            features and thrive in close collaboration with backend and design
            teams in Agile environments, always prioritizing code quality and
            long-term maintainability.
          </p>
        </section>
      </FadeIn>

      {/* Skills Section */}
      <section className="space-y-6">
        <FadeIn delay={0.6}>
          <h2 className="text-2xl font-bold font-[family-name:var(--font-instrument-serif)]">
            Technical Skills
          </h2>
        </FadeIn>

        <StaggerContainer className="space-y-4" delay={0.7} staggerDelay={0.08}>
          {skillCategories.map((category) => (
            <StaggerItem key={category.label}>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-[var(--color-text-ghost)] uppercase tracking-wider">
                  {category.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm rounded-lg bg-[var(--color-bg-layer-1)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </div>
  );
}
