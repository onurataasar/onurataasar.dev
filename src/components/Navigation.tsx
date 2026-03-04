"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const routes: { href: string; label: string }[] = [
  { href: "/blog", label: "Blog" },
  { href: "/notes", label: "Dev Notes" },
  { href: "/projects", label: "Projects" },
  { href: "/cv", label: "CV" },
];

export function Navigation(): React.JSX.Element {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Track scroll position for background transition
  useEffect(() => {
    function handleScroll(): void {
      setScrolled(window.scrollY > 60);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
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
    <nav className="relative py-4">
      {/* Full-viewport-width scroll background that fades in */}
      <motion.div
        className="absolute inset-0 bg-[var(--color-bg-layer-1)]/80 backdrop-blur-md border-b border-[var(--color-border)] pointer-events-none"
        style={{
          left: "calc(-50vw + 50%)",
          right: "calc(-50vw + 50%)",
          width: "100vw",
        }}
        initial={false}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      <div className="relative flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-[family-name:var(--font-instrument-serif)] italic text-lg text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors duration-200"
        >
          Onur Ata Asar
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-1">
          {routes.map((route) => {
            const isActive =
              pathname === route.href ||
              pathname.startsWith(route.href + "/");
            return (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className={`relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {route.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"
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

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[var(--color-text-secondary)]"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu (bottom sheet) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Bottom sheet */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-bg-layer-1)] rounded-t-2xl p-6 pb-safe md:hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <ul className="space-y-1">
                {routes.map((route) => {
                  const isActive =
                    pathname === route.href ||
                    pathname.startsWith(route.href + "/");
                  return (
                    <li key={route.href}>
                      <Link
                        href={route.href}
                        onClick={() => setIsOpen(false)}
                        className={`block py-4 px-4 text-base font-medium rounded-lg transition-colors duration-200 ${
                          isActive
                            ? "text-[var(--color-accent)] bg-[var(--color-accent-wash)]"
                            : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-accent-wash)]"
                        }`}
                      >
                        {route.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
