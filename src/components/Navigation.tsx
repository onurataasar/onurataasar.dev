"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

const routes = [
  { href: "/blog", label: "Blog" },
  { href: "/notes", label: "Dev Notes" },
  { href: "/projects", label: "Projects" },
  { href: "/cv", label: "CV" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="relative py-4 border-b border-zinc-200/50 dark:border-zinc-800/50">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold group">
          <span className="group-hover:gradient-text transition-all duration-300">
            Onur Ata Asar
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <ul className="flex gap-1">
            {routes.map((route) => {
              const isActive =
                pathname === route.href ||
                pathname.startsWith(route.href + "/");
              return (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                      isActive
                        ? "text-[var(--color-accent)] dark:text-[var(--color-accent)]"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    {route.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-[var(--color-accent)]/10 rounded-md -z-10"
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
          <div className="ml-2 border-l border-[var(--color-border)] pl-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            className="relative w-8 h-8 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <motion.span
                className="block h-0.5 w-5 bg-[var(--color-text-muted)] rounded-full origin-center"
                animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-0.5 w-5 bg-[var(--color-text-muted)] rounded-full"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block h-0.5 w-5 bg-[var(--color-text-muted)] rounded-full origin-center"
                animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu panel */}
            <motion.ul
              className="absolute left-0 right-0 top-full z-50 mt-px bg-[var(--color-surface)]/95 backdrop-blur-md border-b border-[var(--color-border)] rounded-b-lg py-2 md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {routes.map((route) => {
                const isActive =
                  pathname === route.href ||
                  pathname.startsWith(route.href + "/");
                return (
                  <li key={route.href}>
                    <Link
                      href={route.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-[var(--color-accent)] bg-[var(--color-accent)]/10"
                          : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-border)]/30"
                      }`}
                    >
                      {route.label}
                    </Link>
                  </li>
                );
              })}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
