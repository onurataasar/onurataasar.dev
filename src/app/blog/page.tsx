import { getContentList } from "@/lib/mdx";
import { getMediumPosts } from "@/lib/medium";
import { BlogCard } from "@/components/BlogCard";
import {
  PageTransition,
  StaggerContainer,
  StaggerItem,
  FadeIn,
} from "@/components/motion";

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
    <PageTransition className="space-y-4 sm:space-y-8">
      <FadeIn>
        <h1 className="text-4xl font-bold">Blog</h1>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 gap-6" delay={0.2}>
        {[...externalPosts, ...localPosts].map((post) => (
          <StaggerItem key={post.type === "local" ? post.slug : post.link}>
            <BlogCard post={post} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </PageTransition>
  );
}
