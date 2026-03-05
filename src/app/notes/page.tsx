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
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
      <PageTransition className="space-y-8">
        <FadeIn>
          <h1 className="font-[family-name:var(--font-display)] text-[var(--font-size-h1)] font-bold">
            <span className="gradient-text">Dev Notes</span>
          </h1>
        </FadeIn>

        {notes.length === 0 ? (
          <FadeIn delay={0.2}>
            <p className="text-[var(--color-text-muted)]">No notes yet...</p>
          </FadeIn>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" delay={0.2}>
            {notes.map((note) => (
              <StaggerItem key={note.slug}>
                <Link href={`/notes/${note.slug}`} className="block group">
                  <article className="relative overflow-hidden rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] p-6 hover:border-[var(--color-accent)]/50 shadow-sm hover:shadow-lg hover:shadow-[var(--color-accent)]/5 transition-all duration-300">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] shrink-0">
                        <HiOutlineDocumentText size={22} />
                      </div>
                      <div className="space-y-1 flex-1 min-w-0">
                        <h2 className="text-lg font-semibold group-hover:text-[var(--color-accent)] transition-colors font-[family-name:var(--font-display)]">
                          {note.title}
                        </h2>
                        <p className="text-sm text-[var(--color-text-muted)] line-clamp-2">
                          {note.description}
                        </p>
                        <time className="text-xs text-[var(--color-text-muted)]">
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
    </div>
  );
}
