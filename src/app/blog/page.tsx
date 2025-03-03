import { getContentList } from "@/lib/mdx";
import { getMediumPosts } from "@/lib/medium";
import { BlogCard } from "@/components/BlogCard";

export default async function BlogPage() {
  const [posts, mediumPosts] = await Promise.all([
    getContentList("blog"),
    getMediumPosts(),
  ]);

  const localPosts = posts.map((post) => ({
    type: "local" as const,
    ...post,
    date: post.date,
  }));

  const externalPosts = mediumPosts.map((post) => ({
    type: "medium" as const,
    title: post.title,
    description: post.description,
    date: post.pubDate,
    link: post.link,
    thumbnail: post.thumbnail,
    categories: post.categories,
  }));

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold">Blog</h1>

      <div className="space-y-8">
        <div className="grid gap-6">
          {externalPosts.map((post) => (
            <BlogCard key={post.link} post={post} />
          ))}
        </div>
        <div className="grid gap-6">
          {localPosts.length === 0 ? (
            <p className="text-zinc-600 dark:text-zinc-400">No posts yet...</p>
          ) : (
            localPosts.map((post) => <BlogCard key={post.slug} post={post} />)
          )}
        </div>
      </div>
    </div>
  );
}
