import Link from "next/link";

export function Navigation() {
  return (
    <nav className="flex items-center justify-between py-4 mb-8 border-b border-zinc-200 dark:border-zinc-800">
      <Link
        href="/"
        className="text-lg font-semibold hover:text-zinc-600 dark:hover:text-zinc-300"
      >
        Onur Ata Asar
      </Link>
      <ul className="flex gap-6">
        <li>
          <Link
            href="/blog"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            href="/notes"
            className="hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            Dev Notes
          </Link>
        </li>
      </ul>
    </nav>
  );
}
