import { forwardRef, useEffect,useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  width?: number;
  alt: string;
}

const SUPPORTED_FORMATS = ['avif', 'webp', 'jpeg', 'png'] as const;
type ImageFormat = typeof SUPPORTED_FORMATS[number];

const hasOriginUrl = (url: string): boolean => {
  try {
    return new URL(url).origin !== 'null';
  } catch {
    return false;
  }
};

const detectBestFormat = (): ImageFormat => {
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    for (const format of SUPPORTED_FORMATS) {
      if (canvas.toDataURL(`image/${format}`).indexOf(`data:image/${format}`) === 0) {
        return format;
      }
    }
  }
  return 'jpeg';
};

const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ src, width = 800, alt, ...rest }, ref) => {
    if (!src) throw new Error("The 'src' prop is required for OptimizedImage.");

    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
      const requestDomain = typeof window !== 'undefined' ? window.location.origin : '';
      const format = detectBestFormat();
      const fullSrc = hasOriginUrl(src) ? src : `${requestDomain}${src}`;
      const optimizedUrl = `/api/optimize-image?url=${encodeURIComponent(fullSrc)}&width=${width}&format=${format}`;
      setImageUrl(optimizedUrl);
    }, [src, width]);

    if (!imageUrl) return null;

    return <img alt={alt} ref={ref} src={imageUrl} {...rest} />;
  },
);

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
