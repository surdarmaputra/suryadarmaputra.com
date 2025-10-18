import { forwardRef } from 'react';

const DENSITY_FACTORS = [1, 2] as const;
const DENSITY_REDUCTION_MULTIPLIER = 0.8;
const SUPPORTED_FORMATS = ['avif', 'webp', 'jpeg', 'png'] as const;
const OPTIMIZED_FORMATS = ['webp', 'avif'] as const;
const TAILWIND_BREAKPOINTS = [640, 768, 1024, 1280, 1536] as const;

type ImageFormat = (typeof SUPPORTED_FORMATS)[number];

const hasOriginUrl = (url: string): boolean => {
  try {
    return new URL(url).origin !== 'null';
  } catch {
    return false;
  }
};

const generateOptimizedUrl = (
  url: string,
  format: ImageFormat,
  width: number,
): string => {
  return `/api/optimize-image?url=${encodeURIComponent(url)}&width=${width}&format=${format}`;
};

const generateSrcSet = (
  url?: string,
  format?: ImageFormat,
  width?: number,
): string => {
  if (!url || !format) {
    return '';
  }

  const srcSetEntries = [];

  if (width) {
    // If width prop is provided, generate variations for different pixel densities
    for (const density of DENSITY_FACTORS) {
      const effectiveWidth = width * density;
      srcSetEntries.push(
        `${generateOptimizedUrl(url, format, effectiveWidth)} ${effectiveWidth}w`,
      );
    }
  } else {
    // If no width prop, generate variations for Tailwind breakpoints
    for (const breakpoint of TAILWIND_BREAKPOINTS) {
      for (const density of DENSITY_FACTORS) {
        const effectiveWidth = Math.round(
          breakpoint * density * DENSITY_REDUCTION_MULTIPLIER,
        );
        srcSetEntries.push(
          `${generateOptimizedUrl(url, format, effectiveWidth)} ${effectiveWidth}w`,
        );
      }
    }
  }

  return srcSetEntries.join(', ');
};

const generateSizes = (width?: number): string => {
  if (width) {
    // If width prop is provided, return the fixed width in CSS pixels
    return `${width}px`;
  }

  // If no width prop, use Tailwind breakpoints for responsive sizing
  const sizesByBreakpoint = TAILWIND_BREAKPOINTS.map(
    (breakpoint) =>
      `(max-width: ${breakpoint}px) ${Math.round(breakpoint * DENSITY_REDUCTION_MULTIPLIER)}px`,
  );
  return [...sizesByBreakpoint, '100vw'].join(', ');
};

interface OptimizedImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  width?: number;
  alt: string;
}

const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ src, width, alt, fetchPriority, ...rest }, ref) => {
    if (!src) throw new Error("The 'src' prop is required for OptimizedImage.");

    const requestDomain = import.meta.env.VITE_BASE_URL;
    const imageUrl = hasOriginUrl(src) ? src : `${requestDomain}${src}`;
    const sizes = generateSizes(width);

    if (!imageUrl) return null;

    return (
      <picture>
        {OPTIMIZED_FORMATS.map((format) => (
          <source
            key={format}
            sizes={sizes}
            srcSet={generateSrcSet(imageUrl, format, width)}
            type={`image/${format}`}
          />
        ))}
        {/* Fallback to original requested image (either optimized or not) */}
        <img
          alt={alt}
          fetchPriority={fetchPriority}
          ref={ref}
          sizes={sizes}
          src={generateOptimizedUrl(
            imageUrl,
            SUPPORTED_FORMATS[0],
            width || 320,
          )}
          srcSet={generateSrcSet(imageUrl, SUPPORTED_FORMATS[0], width)}
          width={width}
          {...rest}
        />
      </picture>
    );
  },
);

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
