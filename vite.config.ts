import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

declare module '@remix-run/node' {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
  ],
  ssr: {
    optimizeDeps: {
      include: ['lodash'],
    },
  },
});
