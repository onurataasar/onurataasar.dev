"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  { href: "/blog", label: "Blog" },
  { href: "/notes", label: "Dev Notes" },
];

export function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center justify-between py-4 mb-8 border-b border-zinc-200 dark:border-zinc-800">
      <Link
        href="/"
        className="text-lg font-semibold hover:text-zinc-600 dark:hover:text-zinc-300"
      >
        Onur Ata Asar
      </Link>
      <ul className="flex gap-6">
        {routes.map((route) => (
          <li key={route.href}>
            <Link
              href={route.href}
              className={`${
                pathname === route.href
                  ? "text-zinc-600 dark:text-zinc-300 font-bold"
                  : "hover:text-zinc-600 dark:hover:text-zinc-300"
              }`}
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
