import { getContentBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

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

export default async function NotePage({ params }: Props) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  try {
    const { meta, content } = await getContentBySlug("notes", slug);
    const htmlContent = marked.parse(content);

    return (
      <article className="space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold">{meta.title}</h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            {meta.description}
          </p>
          <time className="text-sm text-zinc-500">{meta.date}</time>
        </header>
        <div
          className="prose prose-zinc dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    );
  } catch {
    notFound();
  }
}
