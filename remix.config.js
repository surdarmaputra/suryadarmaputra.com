/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverBuildTarget: 'netlify',
  server: './server.js',
  serverDependenciesToBundle: [
    'aggregate-error',
    'clean-stack',
    'notion-client',
    'notion-utils',
    'p-map',
    'p-queue',
    'p-timeout',
  ],
  ignoredRouteFiles: ['.*'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "api/index.js",
  // publicPath: "/build/",
  // devServerPort: 8002
};
