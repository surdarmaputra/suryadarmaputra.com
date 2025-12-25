import { getPosts } from './getPosts';

function escapeCdata(s: string): string {
  return s.replace(/\]\]>/g, ']]]]><![CDATA[>');
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export interface GetFeedXMLParams {
  domain: string;
  blogPath: string;
}

export async function getFeedXML({
  domain,
  blogPath,
}: GetFeedXMLParams): Promise<string> {
  const posts = await getPosts();
  const blogUrl = `${domain}/${blogPath}`;

  const sitemapPostString = posts
    .map(({ date, excerpt, slug, title, updatedAt }) =>
      `
        <item>
          <title><![CDATA[${escapeCdata(title)}]]></title>
          <description><![CDATA[${escapeHtml(excerpt)}]]></description>
          <author><![CDATA[${escapeCdata('Surya Darma Putra')}]]></author>
          <pubDate>${date.toUTCString()}</pubDate>
          <lastBuildDate>${updatedAt.toUTCString()}</lastBuildDate>
          <link>${blogUrl}/${slug}</link>
          <guid>${blogUrl}/${slug}</guid>
        </item>
      `.trim(),
    )
    .join('\n');

  const sitemapString = `
    <rss xmlns:blogChannel="${domain}" version="2.0">
    <channel>
      <title>Surya's articles</title>
      <link>${domain}</link>
      <description>Articles written by Surya Darma Putra</description>
      <language>en-us</language>
      <ttl>40</ttl>
      ${sitemapPostString}
    </channel>
  </rss>
  `.trim();

  return sitemapString;
}
