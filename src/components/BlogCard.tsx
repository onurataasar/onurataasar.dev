import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import _ from "lodash";

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

function stripHtml(html: string) {
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
    <article className="group relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm hover:border-violet-300 dark:hover:border-violet-800 shadow-sm hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300">
      {/* Gradient top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {isExternal && (
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-black/80 text-white">
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
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
          <div className="p-4 sm:p-5 flex-1">
            <h3 className="text-lg sm:text-xl font-semibold group-hover:text-violet-600 dark:group-hover:text-violet-400 max-md:w-3/4 transition-colors">
              {_.truncate(post.title, { length: 70 })}
            </h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm line-clamp-4">
              {formattedDescription}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <time className="text-zinc-500">
                {new Date(post.date).toLocaleDateString()}
              </time>
              {isExternal && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <span
                      key={category}
                      className="px-2 py-1 rounded-full bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs"
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
