import netlifyPlugin from '@netlify/vite-plugin-react-router';
import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const plugins = [
  reactRouter(),
  tsconfigPaths(),
];

if (process.env.NETLIFY_DEPLOYMENT === 'true') {
  plugins.push(netlifyPlugin());
}

export default defineConfig({
  plugins,
  ssr: {
    optimizeDeps: {
      include: ['lodash'],
    },
  },
});
