import { LoaderFunctionArgs } from 'react-router';

import { getFeedXML } from '~/modules/blog/services/PostService/getFeedXML';

export async function loader({ request }: LoaderFunctionArgs) {
  const host =
    request.headers.get('X-Forwarded-Host') ?? request.headers.get('host');
  if (!host) {
    throw new Error('Could not determine domain URL.');
  }
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const domain = `${protocol}://${host}`;

  const feedXML = await getFeedXML({
    domain,
    blogPath: 'blog',
  });

  return new Response(feedXML, {
    headers: {
      'Cache-Control': `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
      'Content-Type': 'application/xml',
      'Content-Length': String(Buffer.byteLength(feedXML)),
    },
  });
}
