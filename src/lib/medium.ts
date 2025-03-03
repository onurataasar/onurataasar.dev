import Parser from "rss-parser";

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
    const parser = new Parser();
    const feed = await parser.parseURL("https://medium.com/feed/@onurataasar");

    if (!feed.items || feed.items.length === 0) {
      console.error("No articles found");
      return [];
    }

    return feed.items.map((item) => {
      // Extract thumbnail from content if it exists
      const thumbnailMatch = item["content:encoded"]?.match(
        /<img[^>]+src="([^">]+)"/
      );
      // Skip tracking URLs and get actual image URL
      const thumbnail = thumbnailMatch
        ? thumbnailMatch[1].includes("stat?")
          ? ""
          : thumbnailMatch[1]
        : "";

      // Extract categories
      const categories = item.categories || [];

      return {
        title: item.title || "",
        link: item.link || "",
        pubDate: item.pubDate || new Date().toISOString(),
        thumbnail,
        description: item.description || item["content:encoded"] || "",
        categories,
      };
    });
  } catch (error) {
    console.error("Failed to fetch Medium posts:", error);
    return [];
  }
}
