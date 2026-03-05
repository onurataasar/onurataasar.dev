"use client";

import { Section } from "@/components/Section";
import { ScrollReveal } from "@/components/motion";
import { aboutText } from "@/lib/home-data";

/**
 * About section — Editorial, text-focused.
 * Hero'dan farklı: blobs yok, dikey accent çizgi, dar kolon, okunabilirlik odaklı.
 */
export function AboutSection() {
  return (
    <Section id="about" colorToken="about">
      <div className="relative">
        {/* Sol dikey accent — editorial pull-quote tarzı */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-full opacity-40 hidden lg:block"
          style={{ background: "var(--color-highlight)" }}
        />

        <div className="lg:pl-12 max-w-2xl">
          <ScrollReveal>
            <p className="text-sm font-medium tracking-widest uppercase opacity-60 mb-4">
              Hakkımda
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight mb-8">
              React, Next.js ve TypeScript ile
              <br />
              <span className="text-[var(--color-highlight)]">production-ready</span>
              {" "}uygulamalar.
            </h2>

            <p className="text-base lg:text-lg leading-relaxed opacity-90">
              {aboutText}
            </p>

            {/* Alt çizgi — minimal dekorasyon */}
            <div
              className="mt-10 w-20 h-0.5 rounded-full opacity-50"
              style={{ background: "var(--color-highlight)" }}
            />
          </ScrollReveal>
        </div>
      </div>
    </Section>
  );
}
