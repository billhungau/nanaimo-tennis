import { useState, type ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  widths: readonly number[];
  quality?: number;
};

/**
 * Vercel's image CDN is optional: preserve the original asset URL as a
 * fallback if an optimized request is unavailable on a deployment.
 */
export function OptimizedImage({ src, widths, quality = 75, sizes, onError, ...props }: Props) {
  const [fallback, setFallback] = useState(false);
  const optimized = (width: number) =>
    `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
  const sorted = [...new Set(widths)].sort((a, b) => a - b);
  return (
    <img
      {...props}
      src={fallback ? src : optimized(sorted[sorted.length - 1])}
      srcSet={fallback ? undefined : sorted.map((w) => `${optimized(w)} ${w}w`).join(", ")}
      sizes={sizes}
      onError={(event) => {
        if (!fallback) setFallback(true);
        onError?.(event);
      }}
    />
  );
}
