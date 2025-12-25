import type { LoaderFunction } from 'react-router';

import getOptimizedImage from '~/modules/image-optimizer/services/ImageOptimizerService/getOptimizedImage';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const imageUrl = url.searchParams.get('url');
  const width = parseInt(url.searchParams.get('width') || '800', 10);
  const format = (url.searchParams.get('format') || 'webp') as
    | 'webp'
    | 'jpeg'
    | 'png'
    | 'avif';

  if (!imageUrl) {
    return new Response("Missing 'url' query parameter", { status: 400 });
  }

  try {
    const optimizedImage = await getOptimizedImage({ imageUrl, width, format });

    return new Response(optimizedImage, {
      headers: {
        'Content-Type': `image/${format}`,
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in loader:', (error as Error).message);
    return new Response('Error processing image', { status: 500 });
  }
};
