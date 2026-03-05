"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";

/**
 * Theme toggle button with sun/moon icons.
 * Handles hydration mismatch by waiting for mount before rendering icons.
 */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  /** Toggle between light and dark themes */
  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  // Render a placeholder with matching dimensions to avoid layout shift
  if (!mounted) {
    return (
      <div
        className="w-9 h-9 rounded-lg"
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="relative w-9 h-9 flex items-center justify-center rounded-lg
        text-[var(--color-text-muted)] hover:text-[var(--color-accent)]
        hover:bg-[var(--color-accent)]/10
        transition-all duration-200 cursor-pointer"
    >
      {isDark ? (
        <HiOutlineSun className="w-5 h-5" />
      ) : (
        <HiOutlineMoon className="w-5 h-5" />
      )}
    </button>
  );
}
