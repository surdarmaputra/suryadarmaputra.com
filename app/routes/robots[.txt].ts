export async function loader() {
  const content = `
User-agent: *
Disallow: /extras.json
Disallow: /api
Allow: /

Sitemap: ${process.env.BASE_URL || 'https://suryadarmaputra.com'}/sitemap.xml
Host: ${process.env.BASE_URL || 'https://suryadarmaputra.com'}
`.trim();

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
