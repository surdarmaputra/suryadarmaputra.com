[suryadarmaputra.com](https://suryadarmaputra.com)

[![Netlify Status](https://api.netlify.com/api/v1/badges/7533c657-0503-4acf-8ad7-47bedd8ec26a/deploy-status)](https://app.netlify.com/sites/suryadarmaputra/deploys)

Surya's personal site built with [Remix](https://remix.run)

## Getting Started

- Install asdf
- Run `asdf install`
- Run `bun install`

> If gyp error occurred when installing canvas, install canvas dependencies: 
> - For MacOS: brew install pkg-config cairo libpng jpeg giflib
> - For Linux: apt get install python3 make g++ pixman-dev cairo-dev pango-dev pkgconfig

- Copy `.env.example` into `.env` and provide Notion token and database IDs
- Copy `extras/projects.json.example` into `extras/projects.json`

## Development

Run the dev server:

```sh
bun run dev
```

Generate content

```sh
bun run generage
```

## Deployment

First, build your app for production:

```sh
bun run build
```

Then run the app in production mode:

```sh
bun run start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `bun run build`

- `build/server`
- `build/client`

### Deploy to Netlify

1. Install the [Netlify CLI](https://www.netlify.com/products/dev/):

```sh
bun add --global netlify-cli
```

If you have previously installed the Netlify CLI, you should update it to the latest version:

```sh
bun add --global netlify-cli@latest
```

2. Sign up and log in to Netlify:

```sh
netlify login
```

3. Create a new site:

```sh
netlify init
```

4. Deploy a preview

```sh
netlify deploy
```

5. Deploy production

```sh
netlify deploy --prod
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
