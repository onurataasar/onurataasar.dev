import Link from "next/link";
import { getContentList } from "@/lib/mdx";

export default async function NotesPage() {
  const notes = await getContentList("notes");

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Dev Notes</h1>
      <div className="grid gap-6">
        {notes.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">No notes yet...</p>
        ) : (
          notes.map((note) => (
            <article key={note.slug} className="space-y-2">
              <Link href={`/notes/${note.slug}`} className="block group">
                <h2 className="text-2xl font-semibold group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
                  {note.title}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {note.description}
                </p>
                <time className="text-sm text-zinc-500">{note.date}</time>
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
