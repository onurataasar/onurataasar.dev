"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { HeroEntrance, HeroEntranceItem } from "@/components/HeroEntrance";
import { HeroBackground } from "@/components/HeroBackground";
import { HeroTechMarquee } from "@/components/HeroTechMarquee";
import { socials } from "@/lib/home-data";

export function HeroSection() {
  return (
    <Section
      id="hero"
      colorToken="hero"
      grid
      className="relative overflow-hidden"
    >
      <HeroBackground />

      <div className="col-span-12 lg:col-span-7 lg:col-start-1 flex flex-col justify-center min-h-[inherit] relative z-10">
        <HeroEntrance>
          <HeroEntranceItem>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)] text-sm font-semibold tracking-widest uppercase">
              Selam, ben
            </span>
          </HeroEntranceItem>

          <HeroEntranceItem>
            <h1 className="font-[family-name:var(--font-display)] font-bold tracking-tighter leading-[0.9]">
              <span className="block text-[clamp(3rem,12vw,7rem)] text-[var(--color-text)]">
                Onur Ata
              </span>
              <span className="block text-[clamp(3.5rem,14vw,8.5rem)] gradient-text mt-1">
                Asar
              </span>
            </h1>
          </HeroEntranceItem>

          <HeroEntranceItem>
            <div className="inline-flex items-center gap-3 mt-4">
              <div className="w-12 h-1 rounded-full gradient-bg" />
              <p className="font-[family-name:var(--font-display)] text-xl sm:text-2xl lg:text-3xl font-semibold text-[var(--color-text-muted)]">
                Software Developer
              </p>
            </div>
          </HeroEntranceItem>

          <HeroEntranceItem>
            <p className="text-base lg:text-lg text-[var(--color-text-muted)] leading-relaxed max-w-xl mt-6">
              Yazılım geliştirme üzerine düşüncelerimi, öğrendiklerimi ve
              deneyimlerimi paylaşıyorum.{" "}
              <Link
                href="/blog"
                className="text-[var(--color-accent)] hover:text-[var(--color-accent-secondary)] font-semibold underline underline-offset-4 transition-colors"
              >
                Bloglara
              </Link>
              ,{" "}
              <Link
                href="/notes"
                className="text-[var(--color-accent)] hover:text-[var(--color-accent-secondary)] font-semibold underline underline-offset-4 transition-colors"
              >
                dev notlarıma
              </Link>{" "}
              ve{" "}
              <Link
                href="/projects"
                className="text-[var(--color-accent)] hover:text-[var(--color-accent-secondary)] font-semibold underline underline-offset-4 transition-colors"
              >
                projelerime
              </Link>{" "}
              göz at.
            </p>
          </HeroEntranceItem>

          <HeroEntranceItem>
            <div className="flex items-center gap-3 pt-6">
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
                  className="p-3 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 border border-transparent hover:border-[var(--color-accent)]/20 transition-all duration-300"
                  aria-label={social.label}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </HeroEntranceItem>
        </HeroEntrance>
      </div>

      <div className="hidden lg:flex col-span-5 col-start-8 items-center justify-center relative z-10">
        <motion.div
          className="w-full max-w-sm aspect-square rounded-3xl gradient-bg opacity-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>

      <HeroTechMarquee />
    </Section>
  );
}
