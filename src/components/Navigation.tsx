"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { ThemeToggle } from "@/components/ThemeToggle";

const routes = [
  { href: "/blog", label: "Blog" },
  { href: "/notes", label: "Dev Notes" },
  { href: "/projects", label: "Projects" },
  { href: "/cv", label: "CV" },
];

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

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className="sticky top-0 w-full z-50 bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-border)]/50"
        style={{ transition: "background-color 0.3s ease" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between py-4 lg:py-5">
            {/* Left side - Name */}
            <Link href="/" className="group">
              <span className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl font-bold tracking-tight text-[var(--color-text)] group-hover:gradient-text transition-all duration-300">
                ONUR ATA ASAR
              </span>
            </Link>

            {/* Right side - Links + Toggle */}
            <div className="flex items-center">
              <ul className="flex items-center gap-1 lg:gap-2">
                {routes.map((route) => {
                  const isActive =
                    pathname === route.href ||
                    pathname.startsWith(route.href + "/");
                  return (
                    <li key={route.href}>
                      <Link
                        href={route.href}
                        className={`relative px-3 py-2 font-[family-name:var(--font-display)] text-lg lg:text-xl font-semibold tracking-tight transition-colors duration-200 ${
                          isActive
                            ? "text-[var(--color-accent)]"
                            : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                        }`}
                      >
                        {route.label}
                        {isActive && (
                          <motion.div
                            layoutId="nav-indicator"
                            className="absolute bottom-0 left-3 right-3 h-[3px] bg-[var(--color-accent)] rounded-full"
                            transition={{
                              type: "spring",
                              stiffness: 350,
                              damping: 30,
                            }}
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="border-l border-[var(--color-border)] h-6 mx-2" />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Header */}
          <div className="flex md:hidden items-center justify-between py-3">
            {/* Left - Name */}
            <Link href="/" className="group">
              <span className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--color-text)] group-hover:gradient-text transition-all duration-300">
                ONUR ATA ASAR
              </span>
            </Link>

            {/* Right - Toggle + Hamburger */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                className="relative w-8 h-8 flex items-center justify-center"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                <span className="sr-only">
                  {isOpen ? "Close menu" : "Open menu"}
                </span>
                <div className="w-5 h-4 relative flex flex-col justify-between">
                  <motion.span
                    className="block h-0.5 w-5 bg-[var(--color-text)] rounded-full origin-center"
                    animate={
                      isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }
                    }
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="block h-0.5 w-5 bg-[var(--color-text)] rounded-full"
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.15 }}
                  />
                  <motion.span
                    className="block h-0.5 w-5 bg-[var(--color-text)] rounded-full origin-center"
                    animate={
                      isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
                    }
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-[var(--color-accent)] flex flex-col items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFF8F0"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>

            {/* Overlay nav links */}
            <nav className="flex flex-col items-center gap-6">
              {routes.map((route) => {
                const isActive =
                  pathname === route.href ||
                  pathname.startsWith(route.href + "/");
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold tracking-tight transition-colors duration-200 ${
                      isActive
                        ? "text-[var(--color-highlight)]"
                        : "text-[#FFF8F0] hover:text-[var(--color-highlight)]"
                    }`}
                  >
                    {route.label}
                  </Link>
                );
              })}
            </nav>

            {/* Social icons */}
            <div className="flex items-center gap-5 mt-8">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-[#FFF8F0]/80 hover:text-[#FFF8F0] transition-colors duration-200"
                >
                  <social.icon size={28} />
                </a>
              ))}
            </div>

            {/* Theme toggle in overlay */}
            <div className="mt-6">
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
