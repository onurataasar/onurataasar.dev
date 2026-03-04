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
        <h1 className="text-4xl font-bold font-[family-name:var(--font-instrument-serif)]">
          Dev Notes
        </h1>
      </FadeIn>

      {notes.length === 0 ? (
        <FadeIn delay={0.2}>
          <p className="text-[var(--color-text-secondary)]">No notes yet...</p>
        </FadeIn>
      ) : (
        <StaggerContainer className="grid gap-4" delay={0.2}>
          {notes.map((note) => (
            <StaggerItem key={note.slug}>
              <Link href={`/notes/${note.slug}`} className="block group">
                <article className="card p-5">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-xl bg-[var(--color-accent-wash)] text-[var(--color-accent)] shrink-0 mt-0.5">
                      <HiOutlineDocumentText size={20} />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <h2 className="text-lg font-semibold group-hover:text-[var(--color-accent)] transition-colors">
                        {note.title}
                      </h2>
                      <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                        {note.description}
                      </p>
                      <time className="text-xs text-[var(--color-text-ghost)]">
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
