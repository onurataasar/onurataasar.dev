import { getMediumPosts } from "@/lib/medium";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import DOMPurify from "isomorphic-dompurify";
import { FaExternalLinkAlt } from "react-icons/fa";

interface MediumPost {
  link: string;
  title: string;
  pubDate: string;
  categories: string[];
  thumbnail?: string;
  content?: string;
  description: string;
}

// Updated Props type to treat params as a Promise to match the expected PageProps
type Props = {
  params: Promise<{ slug: string }>; // Dynamic route parameter as a promise
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
  // Await params to resolve the promise and access slug
  const { slug } = await params;

  if (!slug) {
    return notFound();
  }

  const mediumPost = await getMediumPost(slug);
  const sanitizedContent = DOMPurify.sanitize(
    mediumPost.content || mediumPost.description
  );

  return (
    <article className="max-w-none">
      <header className="mb-8">
        <div className="flex justify-between items-start">
          <h1 className="text-4xl font-bold mb-4">{mediumPost.title}</h1>
          <div className="not-prose">
            <a
              href={mediumPost.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors italic text-sm whitespace-nowrap"
            >
              <FaExternalLinkAlt size={16} className="mr-2" />
              Medium&apos;da oku
            </a>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <time className="text-sm text-zinc-600 dark:text-zinc-400">
            {new Date(mediumPost.pubDate).toLocaleDateString()}
          </time>
          <div className="flex flex-wrap gap-2">
            {mediumPost.categories.map((category) => (
              <span
                key={category}
                className="px-2 py-1 text-xs rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </header>
      {mediumPost.thumbnail && (
        <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={mediumPost.thumbnail}
            alt={mediumPost.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <div className="space-y-6">
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>
    </article>
  );
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

// Updated generateMetadata to handle params as a Promise
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Await params to resolve the promise and access slug
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
