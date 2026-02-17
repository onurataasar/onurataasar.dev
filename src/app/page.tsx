"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/motion";
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

export default function Home() {
  return (
    <div className="flex-1 flex items-center justify-center">
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
            </Link>{" "}
            ve{" "}
            <Link
              href="/notes"
              className="text-violet-500 dark:text-violet-400 hover:text-violet-600 dark:hover:text-violet-300 underline underline-offset-4 decoration-violet-500/30 hover:decoration-violet-500 transition-colors"
            >
              dev notlarıma
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
    </div>
  );
}
