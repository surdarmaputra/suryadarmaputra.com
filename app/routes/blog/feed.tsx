import type { LoaderFunction } from 'remix';

import { getPosts } from '~/services/post';

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

export const loader: LoaderFunction = async ({ request }) => {
  const posts = await getPosts();
  const host =
    request.headers.get('X-Forwarded-Host') ?? request.headers.get('host');
  if (!host) {
    throw new Error('Could not determine domain URL.');
  }
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const domain = `${protocol}://${host}`;
  const blogUrl = `${domain}/blog`;

  const sitemapString = `
    <rss xmlns:blogChannel="${domain}" version="2.0">
    <channel>
      <title>Surya's blog</title>
      <link>${domain}</link>
      <description>Blog posts written by Surya Darma Putra</description>
      <language>en-us</language>
      <generator>Surya Darma Putra</generator>
      <ttl>40</ttl>
      ${posts
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
        .join('\n')}
    </channel>
  </rss>
  `.trim();

  return new Response(sitemapString, {
    headers: {
      'Cache-Control': `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
      'Content-Type': 'application/xml',
      'Content-Length': String(Buffer.byteLength(sitemapString)),
    },
  });
};
