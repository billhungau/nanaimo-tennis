import type { ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "srcSet"> & {
  src: string;
  widths: readonly number[];
  quality?: number;
};

/** Static build-time WebP variants, with the original URL as a native browser fallback. */
export function OptimizedImage({ src, widths, quality: _quality, sizes, ...props }: Props) {
  const basename = src.split("/").pop()?.replace(/\.[^.]+$/, "");
  const candidates = [...new Set(widths)].sort((a, b) => a - b);
  const srcSet = candidates.map((w) => `/optimized/${basename}-${w}.webp ${w}w`).join(", ");
  return (
    <picture className="contents">
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img {...props} src={src} sizes={sizes} />
    </picture>
  );
}
