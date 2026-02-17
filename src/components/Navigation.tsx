"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
        <ul className="hidden md:flex gap-1">
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
                      ? "text-violet-600 dark:text-violet-400"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  {route.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-violet-50 dark:bg-violet-500/10 rounded-md -z-10"
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

        {/* Hamburger button */}
        <button
          className="md:hidden relative w-8 h-8 flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
          <div className="w-5 h-4 relative flex flex-col justify-between">
            <motion.span
              className="block h-0.5 w-5 bg-zinc-600 dark:bg-zinc-400 rounded-full origin-center"
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 w-5 bg-zinc-600 dark:bg-zinc-400 rounded-full"
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block h-0.5 w-5 bg-zinc-600 dark:bg-zinc-400 rounded-full origin-center"
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </button>
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
              className="absolute left-0 right-0 top-full z-50 mt-px bg-zinc-50/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50 rounded-b-lg py-2 md:hidden"
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
                          ? "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
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
