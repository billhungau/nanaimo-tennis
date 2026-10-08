// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

/**
 * Prevent the homepage's CBC YouTube player from loading third-party scripts
 * until a visitor explicitly presses Play.
 *
 * TanStack Start may transform route modules in multiple passes, so this plugin
 * only rewrites variants that still contain the original iframe markup.
 */
function deferHomepageYouTube(): Plugin {
  return {
    name: "defer-homepage-youtube",
    enforce: "pre",
    transform(code, id) {
      const normalizedId = id.replace(/\\/g, "/").split("?")[0];
      if (!normalizedId.endsWith("/src/routes/index.tsx")) return null;
      if (!code.includes("cbcEmbedUrl") || !code.includes("<iframe")) return null;

      const importNeedle = 'import { OptimizedImage } from "@/components/optimized-image";';
      const importReplacement = `${importNeedle}\nimport { ClickToPlayYouTube } from "@/components/click-to-play-youtube";`;
      const iframePattern = /<iframe\b[^>]*\bsrc=\{cbcEmbedUrl\}[^>]*\/>/;

      const transformed = code
        .replace(importNeedle, importReplacement)
        .replace(/const cbcEmbedUrl = [^;]+;\s*/, "")
        .replace(
          iframePattern,
          '<ClickToPlayYouTube videoId="oCYB8IJWwFI" title="CBC News coverage of Westwood Lake indoor tennis" />',
        );

      if (transformed === code || transformed.includes("src={cbcEmbedUrl}")) {
        throw new Error("Could not defer the homepage YouTube embed safely.");
      }

      return transformed;
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
