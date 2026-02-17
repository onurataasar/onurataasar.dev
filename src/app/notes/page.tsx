import Link from "next/link";
import { getContentList } from "@/lib/mdx";
import {
  PageTransition,
  StaggerContainer,
  StaggerItem,
  FadeIn,
} from "@/components/motion";
import { HiOutlineDocumentText } from "react-icons/hi";

export default async function NotesPage() {
  const notes = await getContentList("notes");

  return (
    <PageTransition className="space-y-8">
      <FadeIn>
        <h1 className="text-4xl font-bold">Dev Notes</h1>
      </FadeIn>

      {notes.length === 0 ? (
        <FadeIn delay={0.2}>
          <p className="text-zinc-600 dark:text-zinc-400">No notes yet...</p>
        </FadeIn>
      ) : (
        <StaggerContainer className="grid gap-4" delay={0.2}>
          {notes.map((note) => (
            <StaggerItem key={note.slug}>
              <Link href={`/notes/${note.slug}`} className="block group">
                <article className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm p-5 hover:border-violet-300 dark:hover:border-violet-800 shadow-sm hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300">
                  {/* Gradient top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-500/10 text-violet-500 dark:text-violet-400 shrink-0 mt-0.5">
                      <HiOutlineDocumentText size={20} />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <h2 className="text-lg font-semibold group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                        {note.title}
                      </h2>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                        {note.description}
                      </p>
                      <time className="text-xs text-zinc-500">
                        {note.date}
                      </time>
                    </div>
                  </div>
                </article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </PageTransition>
  );
}
