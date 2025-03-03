import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

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
    <article className="group relative overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
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
        {isExternal && post.thumbnail && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="text-xl font-semibold group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
            {post.title}
          </h3>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400 line-clamp-2">
            {formattedDescription}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <time className="text-sm text-zinc-500">
              {new Date(post.date).toLocaleDateString()}
            </time>
            {isExternal && (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <span
                    key={category}
                    className="px-2 py-1 text-xs rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
