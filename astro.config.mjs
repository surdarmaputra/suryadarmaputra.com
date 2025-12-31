// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";

export default defineConfig({
  prefetch: {
    defaultStrategy: "viewport",
    prefetchAll: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [icon()],
});
