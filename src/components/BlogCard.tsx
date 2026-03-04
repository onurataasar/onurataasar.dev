import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import _ from "lodash";
import { SiMedium } from "react-icons/si";

interface BaseBlogPost {
  title: string;
  description: string;
  date: string;
}

interface LocalPost extends BaseBlogPost {
  type: "local";
  slug: string;
}

interface ExternalPost extends BaseBlogPost {
  type: "medium";
  link: string;
  thumbnail?: string;
  categories: string[];
}

type BlogPost = LocalPost | ExternalPost;

interface BlogCardProps {
  post: BlogPost;
}

function stripHtml(html: string): string {
  const cleanHtml = DOMPurify.sanitize(html);
  return cleanHtml.replace(/<[^>]*>/g, "").trim();
}

export function BlogCard({ post }: BlogCardProps) {
  const isExternal = post.type === "medium";
  const slug = isExternal
    ? post.link
        .split("/")
        .pop()
        ?.replace(/[^a-zA-Z0-9-]/g, "-")
        .toLowerCase()
    : post.slug;

  const formattedDescription = stripHtml(post.description);

  return (
    <article className="card group overflow-hidden">
      {isExternal && (
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-lg bg-[var(--color-bg-layer-2)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">
            <SiMedium size={14} />
            Medium
          </span>
        </div>
      )}
      <Link
        href={`/blog/${isExternal ? "medium" : "local"}/${slug}`}
        className="block h-full"
      >
        <div className="flex flex-col sm:flex-row">
          {isExternal && post.thumbnail && (
            <div className="relative w-full sm:w-48 h-48 sm:h-auto aspect-[4/3] sm:aspect-auto overflow-hidden shrink-0">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover rounded-t-2xl sm:rounded-t-none sm:rounded-l-2xl transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
          <div className="p-5 sm:p-6 flex-1">
            <h3 className="text-lg sm:text-xl font-semibold group-hover:text-[var(--color-accent)] max-md:w-3/4 transition-colors">
              {_.truncate(post.title, { length: 70 })}
            </h3>
            <p className="mt-2 text-[var(--color-text-secondary)] text-xs sm:text-sm line-clamp-4">
              {formattedDescription}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <time className="text-[var(--color-text-ghost)] text-sm">
                {new Date(post.date).toLocaleDateString()}
              </time>
              {isExternal && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <span
                      key={category}
                      className="px-2 py-0.5 rounded-md bg-[var(--color-accent-wash)] text-[var(--color-accent)] text-xs"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
