"use client";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";

const socials = [
  { href: "https://github.com/onurataasar", icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/onur-ata-asar/", icon: FaLinkedin, label: "LinkedIn" },
  { href: "https://medium.com/@onurataasar", icon: FaMedium, label: "Medium" },
];

export default function Footer() {
  return (
    <footer className="mt-auto pt-8 pb-6">
      {/* Separator line - indented from edges */}
      <div className="mx-8 h-px bg-[var(--color-border)] mb-8" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-[var(--color-text-ghost)]">
          <span className="font-[family-name:var(--font-instrument-serif)] italic text-[var(--color-text-secondary)]">
            Onur Ata Asar
          </span>
          {" "}&middot; &copy; {new Date().getFullYear()}
        </div>
        <div className="flex gap-2">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[var(--color-text-ghost)] hover:text-[var(--color-accent)] transition-colors duration-200"
              aria-label={social.label}
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
