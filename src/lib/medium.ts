import { MediumArticles } from "medium-article-api";

export type MediumPost = {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  description: string;
  categories: string[];
};

export async function getMediumPosts(): Promise<MediumPost[]> {
  try {
    const mediumApi = MediumArticles();
    const article = await mediumApi.getLatestArticle("@onurataasar");

    if (!article) {
      console.error("No article found");
      return [];
    }

    // Return as a single-item array since getLatestArticle returns just one article
    return [
      {
        title: article.title || "",
        link: article.link || "",
        pubDate: article.pubDate || new Date().toISOString(),
        thumbnail: article.thumbnail || "",
        description: article.description || "",
        categories: Array.isArray(article.categories) ? article.categories : [],
      },
    ];
  } catch (error) {
    console.error("Failed to fetch Medium posts:", error);
    return [];
  }
}
