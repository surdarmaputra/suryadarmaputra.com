# Base Image
FROM oven/bun:1.1.36-alpine AS dependencies-env
COPY . /app

# Build
FROM dependencies-env AS build-env
COPY ./package.json bun.lockb /app/
WORKDIR /app
RUN apk add --update --no-cache \
  python3 \
  g++ \
  make \
  pkgconf-dev \
  pixman-dev \
  cairo-dev \
  pango-dev \
  && ln -sf python3 /usr/bin/python
RUN bun install
RUN bun run build

# Install production deps only
FROM dependencies-env AS production-dependencies-env
COPY ./package.json bun.lockb /app/
WORKDIR /app
RUN apk add --update --no-cache \
  python3 \
  g++ \
  make \
  pkgconf-dev \
  pixman-dev \
  cairo-dev \
  pango-dev \
  && ln -sf python3 /usr/bin/python
RUN bun install --production

# Final image
FROM dependencies-env
COPY ./package.json bun.lockb /app/
COPY --from=build-env /app/build /app/build
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
EXPOSE 3000
CMD ["bun", "run", "start"]
