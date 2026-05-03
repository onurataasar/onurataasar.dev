import Link from "next/link";
import { getContentList } from "@/lib/mdx";
import { getMediumPosts } from "@/lib/medium";

/** Strip HTML tags and collapse whitespace for plain-text preview. */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, (e) => {
      const map: Record<string, string> = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" };
      return map[e] ?? " ";
    })
    .replace(/\s+/g, " ")
    .trim();
}

export default async function BlogPage() {
  const [posts, mediumPosts, notes] = await Promise.all([
    getContentList("blog"),
    getMediumPosts(),
    getContentList("notes"),
  ]);

  const localPosts = posts.map((post) => ({
    type: "local" as const,
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    categories: [] as string[],
    link: null as string | null,
  }));

  const externalPosts = mediumPosts.map((post) => {
    const plain = stripHtml(post.description);
    return {
      type: "medium" as const,
      slug: null as string | null,
      title: post.title,
      description: plain.length > 160 ? plain.slice(0, 160).trimEnd() + "…" : plain,
      date: post.pubDate,
      link: post.link,
      categories: post.categories,
    };
  });

  const allPosts = [...externalPosts, ...localPosts];

  return (
    <div style={{ background: "#f4f3ee", minHeight: "100vh", padding: "64px 32px" }}>
      <style>{`
        .blog-card { background: #f4f3ee; transition: background 0.15s; }
        .blog-card:hover { background: #ede9df; }
        .blog-card:hover .blog-card-title { color: #ff5b1f !important; }
        .note-row { transition: background 0.15s; }
        .note-row:hover { background: rgba(10,10,10,0.03); }
        .note-row:hover .note-title { color: #ff5b1f !important; }
        .note-row:hover .note-arrow { color: #ff5b1f !important; }
      `}</style>

      {/* ── YAZILAR section ─────────────────────────────────────── */}
      <div style={{
        display: "flex", alignItems: "baseline", gap: 16,
        borderBottom: "1px solid #0a0a0a", paddingBottom: 16, marginBottom: 48,
      }}>
        <span style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 11, letterSpacing: "0.1em", color: "#ff5b1f",
        }}>01 / YAZILAR</span>
        <h1 style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 900,
          letterSpacing: "-0.03em", margin: 0, color: "#0a0a0a",
        }}>BLOG .</h1>
        <span style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 11, letterSpacing: "0.08em", color: "rgba(10,10,10,0.35)",
          marginLeft: "auto",
        }}>{allPosts.length} YAZI</span>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "1px",
        background: "#0a0a0a",
        border: "1px solid #0a0a0a",
        marginBottom: 96,
      }}>
        {allPosts.map((post) => {
          const href = post.type === "local"
            ? `/blog/local/${post.slug}`
            : post.link!;
          const key = post.type === "local" ? post.slug! : post.link!;

          return (
            <Link
              key={key}
              href={href}
              target={post.type === "medium" ? "_blank" : undefined}
              rel={post.type === "medium" ? "noopener noreferrer" : undefined}
              style={{ textDecoration: "none", display: "block" }}
            >
              <article className="blog-card" style={{
                padding: "28px", height: "100%",
                display: "flex", flexDirection: "column", gap: 16,
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <time style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: 11, color: "rgba(10,10,10,0.45)", letterSpacing: "0.05em",
                  }}>
                    {post.date
                      ? new Date(post.date).toLocaleDateString("tr-TR", {
                          day: "2-digit", month: "2-digit", year: "numeric",
                        })
                      : ""}
                  </time>
                  <span style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: 10, letterSpacing: "0.08em",
                    color: "#ff5b1f", border: "1px solid #ff5b1f", padding: "2px 6px",
                  }}>
                    {post.type === "local" ? "LOCAL" : "MEDIUM"}
                  </span>
                </div>

                <h2 className="blog-card-title" style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 20, fontWeight: 700, color: "#0a0a0a",
                  margin: 0, lineHeight: 1.25, letterSpacing: "-0.01em",
                  transition: "color 0.15s", flex: 1,
                }}>
                  {post.title}
                </h2>

                {post.description && (
                  <p style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: 14, color: "rgba(10,10,10,0.55)",
                    margin: 0, lineHeight: 1.6,
                  }}>
                    {post.description}
                  </p>
                )}

                {post.categories && post.categories.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: "auto" }}>
                    {post.categories.slice(0, 3).map((cat) => (
                      <span key={cat} style={{
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                        fontSize: 10, letterSpacing: "0.06em",
                        color: "rgba(10,10,10,0.5)",
                        border: "1px solid rgba(10,10,10,0.2)", padding: "2px 6px",
                      }}>
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </Link>
          );
        })}
      </div>

      {/* ── NOTLAR section ──────────────────────────────────────── */}
      <div style={{
        display: "flex", alignItems: "baseline", gap: 16,
        borderBottom: "1px solid #0a0a0a", paddingBottom: 16, marginBottom: 48,
      }}>
        <span style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 11, letterSpacing: "0.1em", color: "#ff5b1f",
        }}>02 / NOTLAR</span>
        <h2 style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 900,
          letterSpacing: "-0.03em", margin: 0, color: "#0a0a0a",
        }}>DEV NOTES .</h2>
        <span style={{
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 11, letterSpacing: "0.08em", color: "rgba(10,10,10,0.35)",
          marginLeft: "auto",
        }}>{notes.length} NOT</span>
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
                <span style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 12, color: "#ff5b1f", letterSpacing: "0.05em",
                  minWidth: 32, flexShrink: 0,
                }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="note-title" style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: 18, fontWeight: 700, color: "#0a0a0a",
                  letterSpacing: "-0.01em", flex: 1, transition: "color 0.15s",
                }}>
                  {note.title}
                </span>
                <time style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 11, color: "rgba(10,10,10,0.45)",
                  letterSpacing: "0.05em", flexShrink: 0,
                }}>
                  {note.date}
                </time>
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
