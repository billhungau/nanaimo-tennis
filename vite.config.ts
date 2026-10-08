// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

/**
 * The homepage historically embeds CBC's YouTube player directly. Even with
 * loading="lazy", Lighthouse still downloads roughly 850 KB of YouTube
 * JavaScript/CSS. Transform that one embed into our local click-to-play
 * component so no YouTube resources are requested until a visitor presses Play.
 *
 * This is intentionally narrow and fails loudly if the expected source markup
 * changes, rather than silently reintroducing the third-party payload.
 */
function deferHomepageYouTube(): Plugin {
  return {
    name: "defer-homepage-youtube",
    enforce: "pre",
    transform(code, id) {
      if (!id.replace(/\\/g, "/").endsWith("/src/routes/index.tsx")) return null;

      const importNeedle = 'import { OptimizedImage } from "@/components/optimized-image";';
      const embedConst = 'const cbcEmbedUrl = "https://www.youtube.com/embed/oCYB8IJWwFI";\n';
      const iframeNeedle = '<iframe className="size-full" src={cbcEmbedUrl} title="CBC News coverage of Westwood Lake indoor tennis" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />';

      if (!code.includes(importNeedle) || !code.includes(iframeNeedle)) {
        throw new Error("Homepage YouTube embed markup changed; update deferHomepageYouTube transform.");
      }

      return code
        .replace(importNeedle, `${importNeedle}\nimport { ClickToPlayYouTube } from "@/components/click-to-play-youtube";`)
        .replace(embedConst, "")
        .replace(
          iframeNeedle,
          '<ClickToPlayYouTube videoId="oCYB8IJWwFI" title="CBC News coverage of Westwood Lake indoor tennis" />',
        );
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
