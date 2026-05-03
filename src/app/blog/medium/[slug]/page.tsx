import Link from "next/link";
import { getMediumPosts } from "@/lib/medium";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import DOMPurify from "isomorphic-dompurify";

interface MediumPost {
  link: string;
  title: string;
  pubDate: string;
  categories: string[];
  thumbnail?: string;
  content?: string;
  description: string;
}

type Props = {
  params: Promise<{ slug: string }>;
};

async function getMediumPost(slug: string): Promise<MediumPost> {
  try {
    const mediumPosts = await getMediumPosts();
    const mediumPost = mediumPosts.find(
      (post: MediumPost) =>
        post.link
          .split("/")
          .pop()
          ?.replace(/[^a-zA-Z0-9-]/g, "-")
          .toLowerCase() === slug
    );

    if (!mediumPost) {
      throw new Error(`No Medium post found for slug: ${slug}`);
    }

    return mediumPost;
  } catch (error) {
    console.error("Error loading Medium post:", error);
    throw error;
  }
}

export default async function MediumBlogPost({ params }: Props) {
  try {
    const { slug } = await params;

    if (!slug) {
      return notFound();
    }

    const mediumPost = await getMediumPost(slug);
    const sanitizedContent = DOMPurify.sanitize(
      mediumPost.content || mediumPost.description
    );

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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
                marginBottom: 24,
              }}
            >
              <h1
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(32px, 5vw, 64px)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  color: "#0a0a0a",
                  margin: 0,
                  lineHeight: 1.05,
                }}
              >
                {mediumPost.title}
              </h1>

              {/* External link */}
              <div>
                <a
                  href={mediumPost.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    color: "#ff5b1f",
                    textDecoration: "none",
                    border: "1px solid #ff5b1f",
                    padding: "6px 12px",
                    display: "inline-block",
                  }}
                >
                  MEDIUM&apos;DA OKU ↗
                </a>
              </div>
            </div>

            {/* Date + categories */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
              <time
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 12,
                  letterSpacing: "0.06em",
                  color: "rgba(10,10,10,0.45)",
                }}
              >
                {new Date(mediumPost.pubDate).toLocaleDateString("tr-TR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </time>

              {mediumPost.categories.map((category) => (
                <span
                  key={category}
                  style={{
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: 10,
                    letterSpacing: "0.06em",
                    color: "rgba(10,10,10,0.5)",
                    border: "1px solid rgba(10,10,10,0.2)",
                    padding: "2px 6px",
                  }}
                >
                  {category}
                </span>
              ))}
            </div>

            <div
              style={{
                borderBottom: "1px solid rgba(10,10,10,0.15)",
                marginTop: 24,
              }}
            />
          </header>

          {/* Thumbnail */}
          {mediumPost.thumbnail && (
            <div
              style={{
                position: "relative",
                height: 360,
                width: "100%",
                marginBottom: 40,
                overflow: "hidden",
                border: "1px solid rgba(10,10,10,0.15)",
              }}
            >
              <Image
                src={mediumPost.thumbnail}
                alt={mediumPost.title}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          )}

          {/* Prose content */}
          <div
            className="prose prose-zinc max-w-none" style={{ maxWidth: "800px" }}
            style={{
              color: "#0a0a0a",
              fontFamily: "var(--font-inter), sans-serif",
            }}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </article>
      </div>
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes("Rate limited")) {
      return (
        <div
          style={{
            background: "#f4f3ee",
            minHeight: "100vh",
            padding: "64px 32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: 28,
              fontWeight: 700,
              color: "#0a0a0a",
              marginBottom: 16,
              letterSpacing: "-0.02em",
            }}
          >
            Medium rate limit aşıldı.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: 15,
              color: "rgba(10,10,10,0.55)",
              marginBottom: 32,
            }}
          >
            Birkaç dakika sonra tekrar dene ya da doğrudan Medium&apos;dan oku.
          </p>
          <a
            href="https://medium.com/@onurataasar"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 12,
              letterSpacing: "0.08em",
              color: "#f4f3ee",
              background: "#0a0a0a",
              border: "1px solid #0a0a0a",
              padding: "10px 20px",
              textDecoration: "none",
            }}
          >
            MEDIUM PROFİLİ ↗
          </a>
        </div>
      );
    }

    return notFound();
  }
}

export async function generateStaticParams() {
  try {
    const mediumPosts = await getMediumPosts();
    return mediumPosts.map((post) => ({
      slug: post.link
        .split("/")
        .pop()
        ?.replace(/[^a-zA-Z0-9-]/g, "-")
        .toLowerCase(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
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
    const mediumPost = await getMediumPost(slug);
    return {
      title: mediumPost.title,
      description: mediumPost.description || "Read on Medium",
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post",
      description: "Error loading blog post",
    };
  }
}
