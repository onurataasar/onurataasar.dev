import Link from "next/link";
import { getContentList } from "@/lib/mdx";

export default async function NotesPage() {
  const notes = await getContentList("notes");

  return (
    <div style={{ background: "#f4f3ee", minHeight: "100vh", padding: "64px 32px" }}>
      <style>{`
        .note-row { transition: background 0.15s; }
        .note-row:hover { background: rgba(10,10,10,0.03); }
        .note-row:hover .note-title { color: #ff5b1f !important; }
        .note-row:hover .note-arrow { color: #ff5b1f !important; }
      `}</style>

      {/* Section header */}
      <div style={{
        display: "flex", alignItems: "baseline", gap: 16,
        borderBottom: "1px solid #0a0a0a", paddingBottom: 16, marginBottom: 48,
      }}>
        <span style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 11, letterSpacing: "0.1em", color: "#ff5b1f",
        }}>02 / NOTLAR</span>
        <h1 style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 900,
          letterSpacing: "-0.03em", margin: 0, color: "#0a0a0a",
        }}>DEV NOTES .</h1>
      </div>

      {notes.length === 0 ? (
        <p style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 14, color: "rgba(10,10,10,0.45)",
        }}>Henüz not yok...</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {notes.map((note, index) => (
            <Link key={note.slug} href={`/notes/${note.slug}`} style={{ textDecoration: "none", display: "block" }}>
              <div className="note-row" style={{
                display: "flex", alignItems: "center", gap: 24,
                padding: "20px 8px",
                borderBottom: "1px solid rgba(10,10,10,0.15)",
                cursor: "pointer",
              }}>
                {/* Index */}
                <span style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 12, color: "#ff5b1f", letterSpacing: "0.05em",
                  minWidth: 32, flexShrink: 0,
                }}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Title */}
                <span className="note-title" style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 18, fontWeight: 700, color: "#0a0a0a",
                  letterSpacing: "-0.01em", flex: 1, transition: "color 0.15s",
                }}>
                  {note.title}
                </span>

                {/* Date */}
                <time style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 11, color: "rgba(10,10,10,0.45)",
                  letterSpacing: "0.05em", flexShrink: 0, marginLeft: "auto",
                }}>
                  {note.date}
                </time>

                {/* Arrow */}
                <span className="note-arrow" style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 16, color: "rgba(10,10,10,0.3)", flexShrink: 0,
                  transition: "color 0.15s",
                }}>↗</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
