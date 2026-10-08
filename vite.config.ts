// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

function deferHomepageYouTube(): Plugin {
  return {
    name: "defer-homepage-youtube",
    enforce: "pre",
    transform(code, id) {
      if (!id.replace(/\\/g, "/").includes("/src/routes/index.tsx")) return null;
      if (!code.includes("cbcEmbedUrl")) return null;

      const iframePattern = /<iframe\b[^>]*src=\{cbcEmbedUrl\}[^>]*\/>/m;
      if (!iframePattern.test(code)) {
        throw new Error("CBC YouTube iframe found but could not be converted to click-to-play.");
      }

      let next = code;
      if (!next.includes('ClickToPlayYouTube')) {
        next = next.replace(
          /import \{ OptimizedImage \} from "@\/components\/optimized-image";/,
          'import { OptimizedImage } from "@/components/optimized-image";\nimport { ClickToPlayYouTube } from "@/components/click-to-play-youtube";',
        );
      }

      next = next.replace(
        /const cbcEmbedUrl = "https:\/\/www\.youtube\.com\/embed\/oCYB8IJWwFI";\s*/,
        "",
      );
      next = next.replace(
        iframePattern,
        '<ClickToPlayYouTube videoId="oCYB8IJWwFI" title="CBC News coverage of Westwood Lake indoor tennis" thumbnailSrc="/cbc-westwood-cover.webp" />',
      );

      return next;
    },
  };
}

export default defineConfig({
  vite: {
    plugins: [deferHomepageYouTube()],
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
