// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";

/**
 * Injects the test-only Notion block gallery route. Enabled by setting
 * ENABLE_TEST_ROUTES=true so the route never reaches a production build.
 */
function testRoutes() {
  return {
    name: "test-routes",
    hooks: {
      /** @param {{ injectRoute: (route: { pattern: string, entrypoint: string }) => void }} options */
      "astro:config:setup": ({ injectRoute }) => {
        if (process.env.ENABLE_TEST_ROUTES !== "true") return;

        injectRoute({
          pattern: "/__test/notion-blocks",
          entrypoint: "./tests/gallery/notion-blocks.astro",
        });
      },
    },
  };
}

export default defineConfig({
  prefetch: {
    defaultStrategy: "viewport",
    prefetchAll: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [icon(), testRoutes()],
});
