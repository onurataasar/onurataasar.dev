import Link from "next/link";
import { getContentBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { Metadata } from "next";

const marked = new Marked(
  markedHighlight({
    highlight: (code: string, lang: string) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(code, { language: lang }).value;
        } catch {
          return code;
        }
      }
      return code;
    },
  })
);

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function LocalBlogPost({ params }: Props) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  try {
    const { meta, content } = await getContentBySlug("blog", slug);
    const htmlContent = marked.parse(content);

    return (
      <div
        style={{
          background: "#f4f3ee",
          minHeight: "100vh",
          padding: "64px 32px",
        }}
      >
        {/* Back link */}
        <div style={{ marginBottom: 48 }}>
          <Link
            href="/blog"
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 12,
              letterSpacing: "0.08em",
              color: "#ff5b1f",
              textDecoration: "none",
            }}
          >
            ← BLOG
          </Link>
        </div>

        <article style={{ maxWidth: "none" }}>
          {/* Article header */}
          <header style={{ marginBottom: 48 }}>
            <h1
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "clamp(32px, 5vw, 64px)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: "#0a0a0a",
                margin: "0 0 20px 0",
                lineHeight: 1.05,
              }}
            >
              {meta.title}
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <time
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 12,
                  letterSpacing: "0.06em",
                  color: "rgba(10,10,10,0.45)",
                }}
              >
                {meta.date}
              </time>
            </div>

            <div
              style={{
                borderBottom: "1px solid rgba(10,10,10,0.15)",
                marginTop: 24,
              }}
            />
          </header>

          {/* Prose content */}
          <div
            className="prose prose-zinc max-w-none" style={{ maxWidth: "800px" }}
            style={{
              color: "#0a0a0a",
              fontFamily: "var(--font-inter), sans-serif",
            }}
            dangerouslySetInnerHTML={{ __html: htmlContent as string }}
          />
        </article>
      </div>
    );
  } catch {
    notFound();
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (!slug) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found",
    };
  }

  try {
    const { meta } = await getContentBySlug("blog", slug);
    return {
      title: meta.title,
      description: meta.description,
    };
  } catch {
    return {
      title: "Blog Post",
      description: "Error loading blog post",
    };
  }
}
