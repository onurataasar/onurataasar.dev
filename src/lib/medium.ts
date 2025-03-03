import Parser from "rss-parser";

export type MediumPost = {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  description: string;
  categories: string[];
  content?: string;
};

export async function getMediumPosts(): Promise<MediumPost[]> {
  try {
    // Use fetch with caching
    const response = await fetch("https://medium.com/feed/@onurataasar", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Status code ${response.status}`);
    }

    const xmlData = await response.text();
    const parser = new Parser();
    const feed = await parser.parseString(xmlData);

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
        content: item["content:encoded"] || "",
        description: item.description || item["content:encoded"] || "",
        categories,
      };
    });
  } catch (error) {
    console.error("Failed to fetch Medium posts:", error);
    if (error instanceof Error && error.message.includes("429")) {
      throw new Error("Rate limited by Medium. Please try again later.");
    }
    return [];
  }
}
