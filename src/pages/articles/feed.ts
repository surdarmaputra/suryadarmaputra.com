import { getArticles } from "../../modules/article/services/article-service";
import { PERSONAL } from "../../modules/core/constants";

export async function GET() {
  const siteUrl = (process.env.BASE_URL || "http://localhost:4321").replace(/\/$/, "");
  const blogUrl = `${siteUrl}/articles/`;

  const articles = await getArticles();

  const items = articles
    .map((article) => {
      const link = `${blogUrl}${article.slug}/`;
      const pubDate = new Date(article.date).toUTCString();
      const lastBuildDate = new Date(article.updatedAt).toUTCString();
      return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <description><![CDATA[${article.excerpt}]]></description>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <lastBuildDate>${lastBuildDate}</lastBuildDate>
      <author>${PERSONAL.NAME}</author>
    </item>`;
    })
    .join("");

  const now = new Date().toUTCString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title><![CDATA[${PERSONAL.NAME} - Articles]]></title>
    <link>${blogUrl}</link>
    <description><![CDATA[${PERSONAL.TITLE}]]></description>
    <language>en-us</language>
    <ttl>60</ttl>
    <lastBuildDate>${now}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
