import sharp from 'sharp';
import { fetch } from 'undici';

export interface GetOptimizedImageOptions {
  imageUrl: string;
  width?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
}

/**
 * Optimizes an image using sharp.
 *
 * @param options - The options for image optimization.
 * @returns The optimized image as a Buffer.
 */
export default async function getOptimizedImage({
  imageUrl,
  width = 800,
  format = 'webp',
}: GetOptimizedImageOptions): Promise<Buffer> {
  if (!imageUrl) {
    throw new Error('Missing imageUrl');
  }

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const optimizedImage = await sharp(buffer)
      .resize({ width })
      .toFormat(format)
      .toBuffer();

    return optimizedImage;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in getOptimizedImage:', (error as Error).message);
    throw error;
  }
}
