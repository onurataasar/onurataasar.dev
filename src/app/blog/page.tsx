import Link from "next/link";
import { getContentList } from "@/lib/mdx";

export default async function BlogPage() {
  const posts = await getContentList("blog");

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Blog</h1>
      <div className="grid gap-6">
        {posts.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">No posts yet...</p>
        ) : (
          posts.map((post) => (
            <article key={post.slug} className="space-y-2">
              <Link href={`/blog/${post.slug}`} className="block group">
                <h2 className="text-2xl font-semibold group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
                  {post.title}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {post.description}
                </p>
                <time className="text-sm text-zinc-500">{post.date}</time>
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
