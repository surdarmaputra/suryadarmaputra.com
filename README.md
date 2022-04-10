# [suryadarmaputra.com](https://suryadarmaputra.com)

[![Netlify Status](https://api.netlify.com/api/v1/badges/7533c657-0503-4acf-8ad7-47bedd8ec26a/deploy-status)](https://app.netlify.com/sites/suryadarmaputra/deploys)

Surya's personal site built with [Remix](https://remix.run)

## Netlify Setup

1. Install the [Netlify CLI](https://www.netlify.com/products/dev/):

```sh
yarn global add netlify-cli
```

If you have previously installed the Netlify CLI, you should update it to the latest version:

```sh
yarn global add netlify-cli@latest
```

2. Sign up and log in to Netlify:

```sh
netlify login
```

3. Create a new site:

```sh
netlify init
```

## Development

The Netlify CLI starts your app in development mode, rebuilding assets on file changes.

```sh
yarn dev
```

Open up [http://localhost:3000](http://localhost:3000), and you should be ready to go!

## Deployment

There are two ways to deploy your app to Netlify, you can either link your app to your git repo and have it auto deploy changes to Netlify, or you can deploy your app manually. If you've followed the setup instructions already, all you need to do is run this:

```sh
yarn build
# preview deployment
netlify deploy

# production deployment
netlify deploy --prod
```
