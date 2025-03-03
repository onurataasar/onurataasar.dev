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
      <article className="max-w-none">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{meta.title}</h1>
          <div className="flex items-center gap-4">
            <time className="text-sm text-zinc-600 dark:text-zinc-400">
              {meta.date}
            </time>
          </div>
        </header>
        <div
          className="prose prose-zinc dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent as string }}
        />
      </article>
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
