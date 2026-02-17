"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
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
    <div className="flex-1 flex flex-col gap-16 py-12 sm:py-20">
      {/* Hero Section */}
      <section className="space-y-6 max-w-2xl">
        <FadeIn delay={0}>
          <p className="text-sm font-medium tracking-widest uppercase text-violet-500 dark:text-violet-400">
            Selam, ben
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
            Onur Ata <span className="gradient-text">Asar</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 font-light">
            Software Developer
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg">
            Yazılım geliştirme üzerine düşüncelerimi, öğrendiklerimi ve
            deneyimlerimi paylaşıyorum.{" "}
            <Link
              href="/blog"
              className="text-violet-500 dark:text-violet-400 hover:text-violet-600 dark:hover:text-violet-300 underline underline-offset-4 decoration-violet-500/30 hover:decoration-violet-500 transition-colors"
            >
              Bloglara
            </Link>
            ,{" "}
            <Link
              href="/notes"
              className="text-violet-500 dark:text-violet-400 hover:text-violet-600 dark:hover:text-violet-300 underline underline-offset-4 decoration-violet-500/30 hover:decoration-violet-500 transition-colors"
            >
              dev notlarıma
            </Link>{" "}
            ve{" "}
            <Link
              href="/projects"
              className="text-violet-500 dark:text-violet-400 hover:text-violet-600 dark:hover:text-violet-300 underline underline-offset-4 decoration-violet-500/30 hover:decoration-violet-500 transition-colors"
            >
              projelerime
            </Link>{" "}
            göz at.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex items-center gap-4 pt-2">
            {socials.map((social) => (
              <motion.a
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
                className="p-2 rounded-lg text-zinc-500 hover:text-violet-500 dark:text-zinc-400 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon size={22} />
              </motion.a>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="w-24 h-1 rounded-full gradient-bg opacity-60" />
        </FadeIn>
      </section>

      {/* Profile Section */}
      <FadeIn delay={0.6}>
        <section className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm p-6">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-60" />
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
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
        <FadeIn delay={0.7}>
          <h2 className="text-2xl font-bold">
            Technical <span className="gradient-text">Skills</span>
          </h2>
        </FadeIn>

        <StaggerContainer className="space-y-4" delay={0.8} staggerDelay={0.1}>
          {skillCategories.map((category) => (
            <StaggerItem key={category.label}>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  {category.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:border-violet-300 dark:hover:border-violet-700 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
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
