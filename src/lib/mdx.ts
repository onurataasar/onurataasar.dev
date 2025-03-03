import fs from "fs";
import path from "path";
import matter from "gray-matter";

type ContentType = "blog" | "notes";

interface ContentMeta {
  title: string;
  date: string;
  description: string;
  slug: string;
  isLocal: boolean; // true if the post is local, false if it's a Medium post
}

export async function getContentList(
  type: ContentType
): Promise<ContentMeta[]> {
  const contentDir = path.join(process.cwd(), "content", type);
  const files = fs.readdirSync(contentDir);

  const contents = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const source = fs.readFileSync(path.join(contentDir, file), "utf8");
      const { data } = matter(source);
      return {
        ...data,
        slug: file.replace(".mdx", ""),
        isLocal: !source.includes("medium.com"),
      } as ContentMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return contents;
}

export async function getContentBySlug(type: ContentType, slug: string) {
  const contentDir = path.join(process.cwd(), "content", type);
  const source = fs.readFileSync(path.join(contentDir, `${slug}.mdx`), "utf8");
  const { data, content } = matter(source);

  return {
    meta: {
      ...data,
      slug,
      isLocal: !source.includes("medium.com"),
    } as ContentMeta,
    content,
  };
}
