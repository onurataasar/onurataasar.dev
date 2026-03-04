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
      <article className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold font-[family-name:var(--font-instrument-serif)]">{meta.title}</h1>
          <p className="text-xl text-[var(--color-text-secondary)]">
            {meta.description}
          </p>
          <time className="text-sm text-[var(--color-text-ghost)]">{meta.date}</time>
        </header>
        <div
          className="prose dark:prose-invert max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: htmlContent as string }}
        />
      </article>
    );
  } catch {
    notFound();
  }
}
