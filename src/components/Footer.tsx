"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
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

export default function Footer() {
  return (
    <Section id="contact" colorToken="contact" grid>
      <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
        <h2 className="font-[family-name:var(--font-display)] text-[var(--font-size-h1)] font-bold">
          Say hello
        </h2>
        <p className="mt-4 text-lg opacity-90">
          Got a project? Want to collaborate? Just want to say hi?
        </p>
        <Link
          href="mailto:onurataasar@gmail.com"
          className="mt-6 text-2xl lg:text-3xl font-semibold underline underline-offset-4 decoration-2 hover:opacity-90 transition-opacity"
        >
          onurataasar@gmail.com
        </Link>
      </div>

      <div className="col-span-12 lg:col-span-5 flex flex-col justify-center lg:items-end">
        <div className="flex flex-wrap gap-6 lg:gap-8">
          {socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                social.href.startsWith("mailto")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="flex items-center gap-3 text-lg hover:opacity-80 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.label}
            >
              <social.icon size={24} />
              <span>{social.label}</span>
            </motion.a>
          ))}
        </div>
      </div>

      <div className="col-span-12 pt-8 mt-8 border-t border-current/20 text-sm opacity-75">
        © {new Date().getFullYear()} Onur Ata Asar
      </div>
    </Section>
  );
}
