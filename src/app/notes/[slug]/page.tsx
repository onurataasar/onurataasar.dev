import Link from "next/link";
import { getContentBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

const marked = new Marked(
  markedHighlight({
    highlight: (code: string, lang: string) => {
      if (lang && hljs.getLanguage(lang)) {
        try { return hljs.highlight(code, { language: lang }).value; } catch { return code; }
      }
      return code;
    },
  })
);

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  if (!slug) notFound();

  try {
    const { meta, content } = await getContentBySlug("notes", slug);
    const htmlContent = marked.parse(content);

    return (
      <div style={{ background: "#f4f3ee", minHeight: "100vh", padding: "64px 32px" }}>
        <div style={{ marginBottom: 48 }}>
          <Link href="/blog" style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 12, letterSpacing: "0.08em",
            color: "#ff5b1f", textDecoration: "none",
          }}>← NOTLAR</Link>
        </div>

        <article>
          <header style={{ borderBottom: "1px solid #0a0a0a", paddingBottom: 32, marginBottom: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 24 }}>
              <span style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 11, letterSpacing: "0.1em", color: "#ff5b1f",
              }}>DEV NOTE</span>
              <time style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 11, letterSpacing: "0.06em", color: "rgba(10,10,10,0.45)",
              }}>{meta.date}</time>
            </div>
            <h1 style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(32px, 6vw, 80px)", fontWeight: 900,
              letterSpacing: "-0.03em", color: "#0a0a0a",
              margin: "0 0 20px", lineHeight: 1.0,
            }}>{meta.title}</h1>
            {meta.description && (
              <p style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(16px, 2vw, 22px)", fontWeight: 400,
                color: "rgba(10,10,10,0.6)", lineHeight: 1.5,
                margin: 0, maxWidth: 720,
              }}>{meta.description}</p>
            )}
          </header>

          <div
            className="prose prose-zinc max-w-none"
            style={{ maxWidth: 800, color: "#0a0a0a", fontFamily: "var(--font-inter), sans-serif" }}
            dangerouslySetInnerHTML={{ __html: htmlContent as string }}
          />
        </article>
      </div>
    );
  } catch {
    notFound();
  }
}
