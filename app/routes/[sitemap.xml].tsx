import type { LoaderFunction } from 'remix';

import { getPosts } from '~/services/post';

export const loader: LoaderFunction = async ({ request }) => {
  const posts = await getPosts();
  const host =
    request.headers.get('X-Forwarded-Host') ?? request.headers.get('host');
  if (!host) {
    throw new Error('Could not determine domain URL.');
  }
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const domain = `${protocol}://${host}`;

  const sitemapString = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      <url>
        <loc>${domain}/</loc>
      </url>
      ${posts.map(
        ({ slug, updatedAt }) => `
        <url>
          <loc>${domain}/${slug}</loc>
          <lastmod>${updatedAt}</lastmod>
        </url> 
      `,
      )}
    </urlset>
  `.trim();

  return new Response(sitemapString, {
    headers: {
      'Cache-Control': `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
      'Content-Type': 'application/xml',
      'Content-Length': String(Buffer.byteLength(sitemapString)),
    },
  });
};
