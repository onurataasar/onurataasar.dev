"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const routes = [
  { href: "/blog", label: "Blog" },
  { href: "/notes", label: "Dev Notes" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between py-4 mb-8 border-b border-zinc-200/50 dark:border-zinc-800/50">
      <Link href="/" className="text-lg font-semibold group">
        <span className="group-hover:gradient-text transition-all duration-300">
          Onur Ata Asar
        </span>
      </Link>
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
    </nav>
  );
}
