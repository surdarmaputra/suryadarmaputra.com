import { getPosts } from '~/modules/blog/services/PostService/getPosts';
import { getProjects } from '~/modules/project/services/ProjectService/getProjects';

type SitemapRoute = {
  path: string;
  priority: number;
};

export async function loader({ request }: { request: Request }) {
  // Determine the domain
  const host =
    request.headers.get('X-Forwarded-Host') ?? request.headers.get('host');
  if (!host) {
    throw new Error('Could not determine domain URL.');
  }
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const domain = `${protocol}://${host}`;

  // List of static routes to include in the sitemap with priorities
  const routes: SitemapRoute[] = [
    { path: '/', priority: 1.0 }, // highest
    { path: '/about', priority: 0.9 }, // second place
    { path: '/works', priority: 0.8 }, // third place
    { path: '/posts', priority: 0.7 }, // others
  ];

  // Project routes
  const projects = await getProjects();
  projects.forEach((project) => {
    routes.push({
      path: `/works/${project.slug}`,
      priority: 0.7,
    });
  });

  // Post routes
  const posts = await getPosts();
  posts.forEach((post) => {
    routes.push({
      path: post.href,
      priority: 0.7,
    });
  });

  const urls = routes
    .map(
      ({ path, priority }) => `
  <url>
    <loc>${domain}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urls}
</urlset>`.trim();

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
      'Content-Length': String(Buffer.byteLength(sitemap)),
    },
  });
}
