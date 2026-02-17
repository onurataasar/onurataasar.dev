"use client";
import { FaGithubSquare, FaLinkedin, FaMedium } from "react-icons/fa";
import { motion } from "framer-motion";

const socials = [
  {
    href: "https://medium.com/@onurataasar",
    icon: FaMedium,
    label: "Medium",
  },
  {
    href: "https://github.com/onurataasar",
    icon: FaGithubSquare,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/onur-ata-asar/",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto pt-8 pb-6">
      {/* Gradient separator line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent mb-8" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h3 className="font-semibold">
              Onur Ata Asar{" "}
              <span className="text-zinc-500 dark:text-zinc-500 font-normal text-xs">
                © {new Date().getFullYear()}
              </span>
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-500 max-md:text-center">
              Developer
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          {socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-zinc-500 dark:text-zinc-500 hover:text-violet-500 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-colors"
              whileHover={{ scale: 1.1, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.label}
            >
              <social.icon size={22} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
