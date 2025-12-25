import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { ServerRouter, Link, UNSAFE_withErrorBoundaryProps, useRouteError, isRouteErrorResponse, UNSAFE_withComponentProps, Outlet, useLoaderData, Meta, Links, ScrollRestoration, Scripts, useLocation, NavLink, useNavigation, redirect } from "react-router";
import sharp from "sharp";
import { fetch } from "undici";
import fs from "fs/promises";
import "lodash/identity.js";
import path from "path";
import React, { useState, useEffect, useMemo, forwardRef, useRef, lazy, useCallback } from "react";
import { SlArrowUp, SlMenu, SlRocket, SlArrowRightCircle, SlArrowLeftCircle, SlPencil, SlStar, SlMagnifier, SlArrowDownCircle, SlUser, SlBriefcase } from "react-icons/sl";
import { twMerge } from "tailwind-merge";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import LazyLoad, { forceCheck } from "react-lazyload";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import debounce from "lodash/debounce.js";
import dayjs from "dayjs";
import { SiLinkedin, SiGithub, SiX } from "react-icons/si";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, reactRouterContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    reactRouterContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    reactRouterContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, reactRouterContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: reactRouterContext, url: request.url }),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, reactRouterContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: reactRouterContext, url: request.url }),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function GeneralErrorPage() {
  return /* @__PURE__ */ jsxs("div", { className: "flex h-screen flex-col items-center justify-center px-4 py-16 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "relative mb-6", children: /* @__PURE__ */ jsx("span", { className: "animate-bounce text-8xl font-extrabold text-amber-400 drop-shadow-lg", children: "Oops" }) }),
    /* @__PURE__ */ jsx("h1", { className: "animate-fade-in mb-2 text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100", children: "Something wrong :(" }),
    /* @__PURE__ */ jsx("p", { className: "animate-fade-in mb-6 text-lg text-slate-600 delay-100 dark:text-slate-400", children: "Sorry, something went wrong on our end. Please try refreshing the page, or come back later." }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: "group inline-flex items-center rounded-lg bg-amber-400 px-6 py-2 font-semibold text-slate-900 shadow-lg transition-all duration-200 hover:bg-amber-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:bg-amber-500 dark:text-slate-900",
        onClick: () => window.location.reload(),
        type: "button",
        children: [
          /* @__PURE__ */ jsx("span", { className: "mr-2 transition-transform duration-200 group-hover:-translate-x-1 group-hover:scale-110", children: "↻" }),
          "Refresh Page"
        ]
      }
    )
  ] });
}
function NotFoundPage() {
  return /* @__PURE__ */ jsxs("div", { className: "flex h-screen flex-col items-center justify-center px-4 py-16 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "relative mb-6", children: /* @__PURE__ */ jsx("span", { className: "animate-bounce text-8xl font-extrabold text-amber-400 drop-shadow-lg", children: "404" }) }),
    /* @__PURE__ */ jsx("h1", { className: "animate-fade-in mb-2 text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100", children: "Page Not Found" }),
    /* @__PURE__ */ jsx("p", { className: "animate-fade-in mb-6 text-lg text-slate-600 delay-100 dark:text-slate-400", children: "Sorry, the page you are looking for does not exist or has been moved." }),
    /* @__PURE__ */ jsxs(
      Link,
      {
        className: "group inline-flex items-center rounded-lg bg-amber-400 px-6 py-2 font-semibold text-slate-900 shadow-lg transition-all duration-200 hover:bg-amber-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:bg-amber-500 dark:text-slate-900",
        to: "/",
        children: [
          /* @__PURE__ */ jsx("span", { className: "mr-2 transition-transform duration-200 group-hover:-translate-x-1 group-hover:scale-110", children: "←" }),
          "Back to Home"
        ]
      }
    )
  ] });
}
function ColorModeScript() {
  return /* @__PURE__ */ jsx(
    "script",
    {
      dangerouslySetInnerHTML: {
        __html: `
          if (localStorage.theme === 'light' || !('theme' in localStorage)) {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
          }
            
          if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light')
          }  
        `
      }
    }
  );
}
function GTagScript({ measurementId }) {
  if (!measurementId) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      dangerouslySetInnerHTML: {
        __html: `
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"><\/script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${measurementId}');
        <\/script>
      `
      }
    }
  );
}
const links$1 = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "preload",
  as: "font",
  href: "https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLDD4Z1xlFd2JQEk.woff2",
  type: "font/woff2",
  crossOrigin: "anonymous"
}, {
  rel: "preload",
  as: "font",
  href: "https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLEj6Z1xlFd2JQEk.woff2",
  type: "font/woff2",
  crossOrigin: "anonymous"
}, {
  rel: "preload",
  as: "font",
  href: "https://fonts.gstatic.com/s/poppins/v22/pxiByp8kv8JHgFVrLDz8Z1xlFd2JQEk.woff2",
  type: "font/woff2",
  crossOrigin: "anonymous"
}, {
  rel: "preload",
  as: "style",
  href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=optional",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=optional",
  crossOrigin: "anonymous"
}];
async function loader$a() {
  return {
    googleAnalyticsMeasurementId: process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID
  };
}
function Layout({
  children
}) {
  const loaderData = useLoaderData();
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        content: "width=device-width, initial-scale=1",
        name: "viewport"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx("style", {
        children: `
          .break-words {
            overflow-wrap: break-word;
          }
          .container {
            width: 100%;
          }
          .flex {
            display: flex;
          }
          .font-extrabold {
            font-weight: 800;
          }
          .font-semibold {
            font-weight: 600;
          }
          .items-center {
            align-items: center;
          }
          .mb-1 {
            margin-bottom: 0.25rem;
          }
          .mb-32 {
            margin-bottom: 8rem;
          }
          .min-h-screen {
            min-height: 100vh;
          }
          .mt-14 {
            margin-top: 3.5rem;
          }
          .mt-4 {
            margin-top: 1rem;
          }
          .mx-auto {
            margin-left: auto;
            margin-right: auto;
          }
          .pb-16 {
            padding-bottom: 4rem;
          }
          .pt-16 {
            padding-top: 4rem;
          }
          .px-6 {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
          .relative {
            position: relative;
          }
          .tracking-tight {
            letter-spacing: -0.025em;
          }
          .w-full {
            width: 100%;
          }
        `
      }), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      className: "relative mx-auto flex min-h-screen flex-col justify-between px-6 break-words text-slate-700 selection:bg-amber-500 selection:text-slate-900 data-scroll-locked:px-6 dark:bg-slate-900 dark:text-slate-400",
      children: [children, /* @__PURE__ */ jsx(ColorModeScript, {}), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {}), (loaderData == null ? void 0 : loaderData.googleAnalyticsMeasurementId) ? /* @__PURE__ */ jsx(GTagScript, {
        measurementId: loaderData.googleAnalyticsMeasurementId
      }) : null]
    })]
  });
}
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ jsx(NotFoundPage, {});
  }
  return /* @__PURE__ */ jsx(GeneralErrorPage, {});
});
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links: links$1,
  loader: loader$a
}, Symbol.toStringTag, { value: "Module" }));
async function getOptimizedImage({
  imageUrl,
  width = 800,
  format = "webp"
}) {
  if (!imageUrl) {
    throw new Error("Missing imageUrl");
  }
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    const optimizedImage = await sharp(buffer).resize({ width }).toFormat(format).toBuffer();
    return optimizedImage;
  } catch (error) {
    console.error("Error in getOptimizedImage:", error.message);
    throw error;
  }
}
const loader$9 = async ({
  request
}) => {
  const url = new URL(request.url);
  const imageUrl = url.searchParams.get("url");
  const width = parseInt(url.searchParams.get("width") || "800", 10);
  const format = url.searchParams.get("format") || "webp";
  if (!imageUrl) {
    return new Response("Missing 'url' query parameter", {
      status: 400
    });
  }
  try {
    const optimizedImage = await getOptimizedImage({
      imageUrl,
      width,
      format
    });
    return new Response(optimizedImage, {
      headers: {
        "Content-Type": `image/${format}`,
        "Cache-Control": "public, max-age=31536000"
        // Cache for 1 year
      }
    });
  } catch (error) {
    console.error("Error in loader:", error.message);
    return new Response("Error processing image", {
      status: 500
    });
  }
};
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$9
}, Symbol.toStringTag, { value: "Module" }));
function concatPlainTexts(blocks) {
  return blocks.reduce((finalText, text) => finalText + text.plain_text, "");
}
function getTextFromProperties(properties, fieldName) {
  var _a, _b;
  return (_b = (_a = properties == null ? void 0 : properties[fieldName]) == null ? void 0 : _a.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item) => item.type === "text"
  )) == null ? void 0 : _b.plain_text;
}
function getFileExtensionFromUrl(url = "") {
  if (url == null ? void 0 : url.includes(".gif")) {
    return "gif";
  }
  if (url == null ? void 0 : url.includes(".png")) {
    return "png";
  }
}
const PROJECTS_FILE = path.resolve("extras/projects.json");
async function getProjects() {
  const fileContent = await fs.readFile(PROJECTS_FILE);
  const projects = JSON.parse(fileContent.toString());
  return projects.map((project) => {
    var _a, _b, _c, _d;
    const { category, link, tags } = project.properties;
    const date = new Date(project.properties.created_at);
    const updatedAt = new Date(project.properties.updated_at);
    const thumbnailExtension = getFileExtensionFromUrl(
      (_c = (_b = (_a = project.properties.thumbnail) == null ? void 0 : _a[0]) == null ? void 0 : _b.file) == null ? void 0 : _c.url
    );
    const thumbnailUrl = thumbnailExtension ? `/images/projects/${project.id}-0.${thumbnailExtension}` : null;
    const thumbnailPlaceholderUrl = thumbnailExtension ? `/images/projects/${project.id}-0-placeholder.png` : null;
    const summary = project.properties.summary.map((item) => item.plain_text).join(" ");
    const company = (_d = project.properties.company) == null ? void 0 : _d.name;
    const slug = getTextFromProperties(project.properties, "slug");
    const highlightMessage = getTextFromProperties(
      project.properties,
      "highlight_message"
    );
    return {
      category,
      company,
      date,
      id: project.id,
      link,
      summary,
      tags,
      thumbnailUrl,
      thumbnailPlaceholderUrl,
      title: project.title,
      updatedAt,
      blocks: project.blocks,
      isHighlighted: project.properties.highlighted,
      highlightMessage,
      slug: slug || project.id
    };
  });
}
async function loader$8() {
  const projects = await getProjects();
  const extras = {
    projects
  };
  return new Response(JSON.stringify(extras), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$8
}, Symbol.toStringTag, { value: "Module" }));
const POSTS_DIR = path.resolve("posts");
function formatPost(fileName, fileContent, isFullPost = false) {
  const { blocks, excerpt, properties, readingTime, title } = JSON.parse(
    fileContent.toString()
  );
  const date = properties.custom_created_at ? new Date(properties.custom_created_at) : new Date(properties.created_at);
  const updatedAt = new Date(properties.updated_at);
  const slug = fileName.replace(/\.json$/, "");
  const href = `/blog/${slug}`;
  const highlightMessage = getTextFromProperties(
    properties,
    "highlight_message"
  );
  return {
    category: properties.category,
    date,
    excerpt,
    href,
    readingTime,
    slug,
    tags: properties.tags,
    title,
    isHighlighted: properties.highlighted,
    highlightMessage,
    updatedAt,
    ...isFullPost ? { blocks } : {}
  };
}
async function getPosts() {
  const postsDir = path.resolve(POSTS_DIR);
  let files;
  try {
    files = await fs.readdir(postsDir);
  } catch (error) {
    files = [];
  }
  const posts = await Promise.all(
    files.map(async (fileName) => {
      const fileContent = await fs.readFile(path.join(postsDir, fileName));
      return formatPost(fileName, fileContent);
    })
  );
  return posts.sort(
    (first, second) => second.date.getTime() - first.date.getTime()
  );
}
async function loader$7({
  request
}) {
  const host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  if (!host) {
    throw new Error("Could not determine domain URL.");
  }
  const protocol = host.includes("localhost") ? "http" : "https";
  const domain = `${protocol}://${host}`;
  const routes2 = [
    {
      path: "/",
      priority: 1
    },
    // highest
    {
      path: "/about",
      priority: 0.9
    },
    // second place
    {
      path: "/work",
      priority: 0.8
    },
    // third place
    {
      path: "/blog",
      priority: 0.7
    }
    // others
  ];
  const projects = await getProjects();
  projects.forEach((project) => {
    routes2.push({
      path: `/work/${project.slug}`,
      priority: 0.7
    });
  });
  const posts = await getPosts();
  posts.forEach((post) => {
    routes2.push({
      path: post.href,
      priority: 0.7
    });
  });
  const urls = routes2.map(({
    path: path2,
    priority
  }) => `
  <url>
    <loc>${domain}${path2}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`).join("");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urls}
</urlset>`.trim();
  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
      "Content-Length": String(Buffer.byteLength(sitemap))
    }
  });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$7
}, Symbol.toStringTag, { value: "Module" }));
async function loader$6() {
  const content = `
User-agent: *
Disallow: /extras.json
Disallow: /api
Allow: /

Sitemap: ${process.env.BASE_URL || "https://suryadarmaputra.com"}/sitemap.xml
Host: ${process.env.BASE_URL || "https://suryadarmaputra.com"}
`.trim();
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
function HeroSection({
  children,
  description,
  descriptionClassName,
  title,
  titleClassName
}) {
  const [isClientReady, setIsClientReady] = useState(false);
  useEffect(() => {
    setIsClientReady(true);
  }, []);
  return /* @__PURE__ */ jsxs("section", { className: "container mx-auto my-8 md:py-16 lg:max-w-3xl", children: [
    /* @__PURE__ */ jsx(
      "h1",
      {
        className: twMerge(
          "flex w-full items-center gap-2 text-left text-3xl font-extrabold leading-none tracking-tight text-black dark:text-slate-100 md:gap-4 md:text-5xl",
          "-translate-x-4 opacity-0 transition-all delay-100 duration-300 ease-out",
          isClientReady ? "translate-x-0 opacity-100" : "",
          titleClassName
        ),
        children: title
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: twMerge(
          "mt-2 w-full text-left text-sm font-light leading-normal tracking-tight text-slate-600 dark:text-slate-400 md:w-3/5 md:text-base",
          "-translate-x-4 opacity-0 transition-all delay-300 duration-300 ease-out",
          isClientReady ? "translate-x-0 opacity-100" : "",
          descriptionClassName
        ),
        children: description
      }
    ),
    children
  ] });
}
function SmartLink({
  children,
  className,
  href
}) {
  if (!href) return null;
  if (href == null ? void 0 : href.includes("http")) {
    return /* @__PURE__ */ jsx("a", { className, href, children });
  }
  return /* @__PURE__ */ jsx(Link, { className, prefetch: "viewport", to: href, viewTransition: true, children });
}
const links = [
  { label: "Home", href: "/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/surdarmaputra" },
  { label: "GitHub", href: "https://github.com/surdarmaputra" }
];
function Footer({ isLinksVisible = true }) {
  return /* @__PURE__ */ jsxs(
    "footer",
    {
      className: twMerge(
        "relative -mx-6 overflow-hidden pt-8 text-center md:mt-24",
        isLinksVisible ? "h-48 md:h-40" : "h-44 md:h-32"
      ),
      children: [
        /* @__PURE__ */ jsx("span", { className: "mb-0.5 block text-sm font-light text-slate-600 dark:text-slate-400", children: "Copyright © 2024 Surya Darma Putra" }),
        isLinksVisible && links.map(({ label, href }) => /* @__PURE__ */ jsx(
          SmartLink,
          {
            className: "animated-link mr-3 pb-1 text-sm font-extralight text-slate-500 last:mr-0 dark:text-slate-400",
            href,
            children: label
          },
          href
        )),
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": "true",
            className: "absolute left-0 right-0 text-center text-7xl font-extrabold tracking-tighter text-slate-300 opacity-40 dark:text-slate-800 leading-none -bottom-4",
            children: "Let's Build"
          }
        )
      ]
    }
  );
}
function ColorModeToggle({ isDark, onChange }) {
  const toggleClassName = useMemo(
    () => isDark ? "bg-slate-300 shadow-sm shadow-slate-300 translate-x-full" : "bg-amber-500 shadow-sm shadow-amber-500 left-0",
    [isDark]
  );
  const handleClick = () => {
    onChange(!isDark);
  };
  return /* @__PURE__ */ jsxs(
    "button",
    {
      "aria-label": isDark ? "Switch to light mode" : "Switch to dark mode",
      className: "relative flex h-4 w-8  md:h-7 md:w-14 cursor-pointer items-center justify-between rounded-full bg-slate-200 px-1 dark:bg-slate-700",
      onClick: handleClick,
      type: "button",
      children: [
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: isDark ? "Switch to light mode" : "Switch to dark mode" }),
        /* @__PURE__ */ jsx(HiOutlineMoon, { className: "w-4 h-4 md:w-5 md:h-5 mr-1" }),
        /* @__PURE__ */ jsx(HiOutlineSun, { className: "w-4 h-4 md:w-5 md:h-5 ml-1" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `absolute h-4 w-4 md:h-7 md:w-7 rounded-full transition-transform ${toggleClassName} `
          }
        )
      ]
    }
  );
}
const DENSITY_FACTORS = [1, 2];
const DENSITY_REDUCTION_MULTIPLIER = 0.8;
const SUPPORTED_FORMATS = ["avif", "webp", "jpeg", "png"];
const TAILWIND_BREAKPOINTS = [640, 768, 1024, 1280, 1536];
const hasOriginUrl = (url) => {
  try {
    return new URL(url).origin !== "null";
  } catch {
    return false;
  }
};
const detectBestFormat = () => {
  const canvas = document.createElement("canvas");
  if (canvas.getContext && canvas.getContext("2d")) {
    for (const format of SUPPORTED_FORMATS) {
      if (canvas.toDataURL(`image/${format}`).indexOf(`data:image/${format}`) === 0) {
        return format;
      }
    }
  }
  return "jpeg";
};
const generateOptimizedUrl = (url, format, width) => {
  return `/api/optimize-image?url=${encodeURIComponent(url)}&width=${width}&format=${format}`;
};
const generateSrcSet = (url, format, width) => {
  if (!url || !format) {
    return "";
  }
  const srcSetEntries = [];
  if (width) {
    for (const density of DENSITY_FACTORS) {
      const effectiveWidth = width * density;
      srcSetEntries.push(
        `${generateOptimizedUrl(url, format, effectiveWidth)} ${effectiveWidth}w`
      );
    }
  } else {
    for (const breakpoint of TAILWIND_BREAKPOINTS) {
      for (const density of DENSITY_FACTORS) {
        const effectiveWidth = Math.round(
          breakpoint * density * DENSITY_REDUCTION_MULTIPLIER
        );
        srcSetEntries.push(
          `${generateOptimizedUrl(url, format, effectiveWidth)} ${effectiveWidth}w`
        );
      }
    }
  }
  return srcSetEntries.join(", ");
};
const generateSizes = (width) => {
  if (width) {
    return `${width}px`;
  }
  const sizesByBreakpoint = TAILWIND_BREAKPOINTS.map(
    (breakpoint) => `(max-width: ${breakpoint}px) ${Math.round(breakpoint * DENSITY_REDUCTION_MULTIPLIER)}px`
  );
  return [...sizesByBreakpoint, "100vw"].join(", ");
};
const OptimizedImage = forwardRef(
  ({ src, width, alt, fetchPriority, ...rest }, ref) => {
    if (!src) throw new Error("The 'src' prop is required for OptimizedImage.");
    const [imageUrl, setImageUrl] = useState(void 0);
    const [format, setFormat] = useState(void 0);
    const srcSet = generateSrcSet(imageUrl, format, width);
    const sizes = generateSizes(width);
    useEffect(() => {
      const requestDomain = typeof window !== "undefined" ? window.location.origin : "";
      setFormat(detectBestFormat());
      setImageUrl(hasOriginUrl(src) ? src : `${requestDomain}${src}`);
    }, [src]);
    if (!imageUrl) return null;
    return /* @__PURE__ */ jsx(
      "img",
      {
        alt,
        fetchPriority,
        ref,
        sizes,
        src: generateOptimizedUrl(
          imageUrl,
          format,
          width || 320
        ),
        srcSet,
        width,
        ...rest
      }
    );
  }
);
OptimizedImage.displayName = "OptimizedImage";
const NAVIGATION_ITEMS = [
  {
    id: "work",
    label: "Work",
    landingHref: "#work",
    href: "/work"
  },
  {
    id: "blog",
    label: "Blog",
    landingHref: "#blog",
    href: "/blog"
  },
  {
    id: "connect",
    label: "Connect",
    landingHref: "#connect",
    href: ""
  },
  {
    id: "about",
    label: "About",
    landingHref: "/about",
    href: "/about"
  }
];
function useNavbar() {
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();
  const logoPath = useMemo(
    () => isDark ? "/site-logo-bw.png" : "/site-logo.png",
    [isDark]
  );
  const toggleColorMode = (becomeDark) => {
    setIsDark(becomeDark);
    window.localStorage.theme = becomeDark ? "dark" : "light";
    if (becomeDark) {
      window.document.documentElement.classList.add("dark");
      window.document.documentElement.classList.remove("light");
    } else {
      window.document.documentElement.classList.add("light");
      window.document.documentElement.classList.remove("dark");
    }
  };
  const shouldShowNavigation = (landingHref, href) => {
    if (location.pathname === "/") {
      return Boolean(landingHref);
    }
    return Boolean(href);
  };
  const handleClickNavigationItem = (event, headingId) => {
    if (location.pathname !== "/" || !headingId.startsWith("#")) return;
    event.preventDefault();
    const element = document.querySelector(headingId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const navigationItems = NAVIGATION_ITEMS.filter(
    (item) => shouldShowNavigation(item.landingHref, item.href)
  ).map((item) => ({
    ...item,
    onClick: (event) => handleClickNavigationItem(event, item.landingHref),
    to: location.pathname === "/" ? item.landingHref : item.href
  }));
  useEffect(() => {
    const isCurrentlyDark = !window.localStorage.theme ? true : window.localStorage.theme === "dark";
    setIsDark(isCurrentlyDark);
  }, [setIsDark]);
  return {
    handleClickNavigationItem,
    isDark,
    logoPath,
    navigationItems,
    toggleColorMode
  };
}
function Header() {
  const {
    handleClickNavigationItem,
    isDark,
    logoPath,
    navigationItems,
    toggleColorMode
  } = useNavbar();
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("header", { className: "container mx-auto mb-4 flex items-center justify-between py-3 lg:max-w-3xl", children: [
    /* @__PURE__ */ jsx(
      Link,
      {
        onClick: (event) => handleClickNavigationItem(event, "body"),
        prefetch: "viewport",
        to: "/",
        viewTransition: true,
        children: /* @__PURE__ */ jsx(
          OptimizedImage,
          {
            alt: "Site logo",
            className: "rounded-md border-2 border-slate-100 dark:border-slate-700",
            src: logoPath,
            width: 36
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs("nav", { className: "flex items-center", children: [
      navigationItems.map(({ id, label, landingHref, to }) => /* @__PURE__ */ jsx(
        NavLink,
        {
          className: "animated-link mr-3 py-1 text-sm font-light! text-slate-500 dark:text-slate-400 md:mr-8",
          onClick: (event) => handleClickNavigationItem(event, landingHref),
          prefetch: "viewport",
          to,
          viewTransition: true,
          children: label
        },
        id
      )),
      /* @__PURE__ */ jsx(ColorModeToggle, { isDark, onChange: toggleColorMode })
    ] })
  ] }) });
}
function useDefaultWindowListeners() {
  function handleWindowResize() {
    forceCheck();
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
}
const BUTTON_COLOR = {
  primary: "primary",
  secondary: "secondary"
};
const BUTTON_VARIANT = {
  filled: "filled",
  outlined: "outlined",
  text: "text"
};
const BUTTON_COLOR_CLASSNAMES = {
  filled: {
    primary: " bg-amber-500 text-slate-900",
    secondary: "bg-slate-500 text-slate-900 dark:bg-slate-400"
  },
  outlined: {
    primary: "border border-amber-500 text-slate-900",
    secondary: "border border-slate-500 text-slate-900 dark:border-slate-400 dark:text-slate-400"
  },
  text: {
    primary: "text-amber-500",
    secondary: "text-slate-500"
  }
};
function getButtonClassName({
  variant,
  color,
  className
}) {
  return twMerge(
    "px-5 py-2 text-sm font-medium rounded-full flex items-center justify-center gap-2 cursor-pointer",
    BUTTON_COLOR_CLASSNAMES[variant][color],
    className
  );
}
function Button({
  "aria-label": ariaLabel,
  className,
  children,
  color = BUTTON_COLOR.primary,
  onClick,
  variant = BUTTON_VARIANT.filled
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      "aria-label": ariaLabel,
      className: getButtonClassName({ variant, color, className }),
      onClick,
      type: "button",
      children
    }
  );
}
function FloatingNavigation() {
  const floatingButtonRef = useRef(null);
  const menuContainerRef = useRef(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const location = useLocation();
  const { handleClickNavigationItem, navigationItems } = useNavbar();
  const navItemClassName = twMerge(
    "animated-link cursor-pointer my-2 ml-6 mr-6 py-1 pl-4 text-right text-sm font-light text-slate-500 dark:text-slate-400 md:ml-10 md:text-lg",
    location.pathname === "/" ? "font-light!" : ""
  );
  const toggleMenu = () => setIsMenuVisible((currentlyVisible) => !currentlyVisible);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  useEffect(() => {
    const handleScroll = () => {
      if (floatingButtonRef.current) {
        if (window.scrollY > 0) {
          floatingButtonRef.current.classList.remove("translate-x-[150%]");
        } else {
          floatingButtonRef.current.classList.add("translate-x-[150%]");
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (!isMenuVisible) return;
    function handleClickOutside(event) {
      const menuNode = menuContainerRef.current;
      if (menuNode && !menuNode.contains(event.target)) {
        setIsMenuVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [isMenuVisible]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed bottom-4 right-4 z-30 translate-x-[150%] transition-transform",
      ref: floatingButtonRef,
      children: /* @__PURE__ */ jsxs("div", { className: "relative flex gap-4", ref: menuContainerRef, children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: twMerge(
              "absolute -top-2 right-0 h-0 w-0 -translate-y-full overflow-hidden rounded-md border-slate-100 bg-white shadow-lg transition-all ease-in-out dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300",
              isMenuVisible && "h-max w-max border py-2"
            ),
            children: /* @__PURE__ */ jsxs("nav", { className: "flex flex-col items-end", children: [
              location.pathname !== "/" && /* @__PURE__ */ jsx(
                NavLink,
                {
                  className: navItemClassName,
                  prefetch: "viewport",
                  to: "/",
                  viewTransition: true,
                  children: "Home"
                }
              ),
              navigationItems.map(({ id, label, landingHref, to }) => /* @__PURE__ */ jsx(
                NavLink,
                {
                  className: navItemClassName,
                  onClick: (event) => handleClickNavigationItem(event, landingHref),
                  prefetch: "viewport",
                  to,
                  viewTransition: true,
                  children: label
                },
                id
              ))
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            "aria-label": "Floating Scroll to Top",
            className: "h-12 w-12 border border-slate-100 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300",
            color: "primary",
            onClick: scrollToTop,
            variant: "filled",
            children: /* @__PURE__ */ jsx(SlArrowUp, { className: "h-4 w-4", size: 16 })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            "aria-label": "Floating Navigation",
            className: "h-12 w-12 border border-slate-100 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300",
            color: "primary",
            onClick: toggleMenu,
            variant: "filled",
            children: /* @__PURE__ */ jsx(SlMenu, { className: "h-4 w-4", size: 16 })
          }
        )
      ] })
    }
  );
}
const STEP_WIDTHS = [
  "opacity-0",
  "w-1/6",
  "w-3/6",
  "w-5/6",
  "w-full"
];
const PageProgressBar = forwardRef((_, ref) => {
  const { state } = useNavigation();
  const simulator = useRef(null);
  const [widthIndex, setWidthIndex] = useState(0);
  if (widthIndex >= STEP_WIDTHS.length - 1) {
    if (simulator.current) {
      clearInterval(simulator.current);
    }
    setTimeout(() => {
      setWidthIndex(0);
    }, 500);
  }
  useEffect(() => {
    if (state === "loading" || state === "submitting") {
      setWidthIndex(1);
      simulator.current = setInterval(() => {
        setWidthIndex((currentIndex) => currentIndex + 1);
      }, 2e3);
    } else {
      setWidthIndex(STEP_WIDTHS.length - 1);
    }
    return () => {
      if (simulator.current) {
        clearInterval(simulator.current);
      }
    };
  }, [state]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: twMerge(
        "fixed top-0 left-0 z-50 h-1 bg-linear-to-r from-amber-500 via-pink-600 to-sky-500 transition-all",
        STEP_WIDTHS[widthIndex]
      ),
      ref
    }
  );
});
PageProgressBar.displayName = "PageProgressBar";
function DefaultLayout({
  children,
  isFooterLinksVisible
}) {
  useDefaultWindowListeners();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PageProgressBar, {}),
    /* @__PURE__ */ jsx(Header, {}),
    children,
    /* @__PURE__ */ jsx(FloatingNavigation, {}),
    /* @__PURE__ */ jsx(Footer, { isLinksVisible: isFooterLinksVisible })
  ] });
}
function ProjectCard({
  className,
  imageSize,
  isClientReady,
  project
}) {
  const [isSelected, setIsSelected] = useState(false);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "aria-hidden": "true",
      className: twMerge(
        "group/project-card relative block h-40 w-40 lg:h-60 lg:w-60",
        className
      ),
      onClick: () => setIsSelected(true),
      onMouseLeave: () => setIsSelected(false),
      children: [
        /* @__PURE__ */ jsx("div", { className: "h-full w-full overflow-hidden rounded-md shadow-lg", children: project.thumbnailUrl && project.thumbnailPlaceholderUrl && isClientReady ? (
          /* eslint-disable indent */
          /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              LazyLoad,
              {
                className: "h-full w-full lg:hidden",
                placeholder: /* @__PURE__ */ jsx(
                  "img",
                  {
                    alt: `${project.title} thumbnail`,
                    className: "h-full w-full object-cover blur-xl",
                    src: project.thumbnailPlaceholderUrl
                  }
                ),
                children: /* @__PURE__ */ jsx(
                  OptimizedImage,
                  {
                    alt: `${project.title} thumbnail`,
                    className: twMerge(
                      "h-full w-full object-cover transition-transform duration-500 ease-in-out",
                      isSelected && "scale-105",
                      "group-hover/project-card:scale-105"
                    ),
                    fetchPriority: "high",
                    src: project.thumbnailUrl,
                    width: (imageSize == null ? void 0 : imageSize.sm) || 160
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              LazyLoad,
              {
                className: "hidden h-full w-full lg:block",
                placeholder: /* @__PURE__ */ jsx(
                  "img",
                  {
                    alt: `${project.title} thumbnail`,
                    className: "h-full w-full object-cover blur-xl",
                    src: project.thumbnailPlaceholderUrl
                  }
                ),
                children: /* @__PURE__ */ jsx(
                  OptimizedImage,
                  {
                    alt: `${project.title} thumbnail`,
                    className: twMerge(
                      "h-full w-full object-cover transition-transform duration-500 ease-in-out",
                      isSelected && "scale-105",
                      "group-hover/project-card:scale-105"
                    ),
                    fetchPriority: "high",
                    src: project.thumbnailUrl,
                    width: (imageSize == null ? void 0 : imageSize.lg) || 240
                  }
                )
              }
            )
          ] })
        ) : /* @__PURE__ */ jsx(
          "div",
          {
            className: twMerge(
              "flex h-full w-full items-center justify-center bg-slate-100 transition-transform duration-500 ease-in-out dark:bg-slate-200",
              isSelected && "scale-105",
              "group-hover/project-card:scale-105"
            ),
            children: /* @__PURE__ */ jsx(SlRocket, { className: "h-10 w-10 text-slate-300" })
          }
        ) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: twMerge(
              "absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center rounded-md bg-slate-50/95 p-2 opacity-0 transition-all dark:bg-slate-900/90",
              isSelected ? "opacity-100" : "",
              "group-hover/project-card:opacity-100"
            ),
            children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: twMerge(
                    "-translate-y-full text-center text-base leading-tight font-semibold text-slate-900 opacity-0 transition-all dark:text-slate-50",
                    isSelected && "translate-y-0 opacity-100",
                    "group-hover/project-card:translate-y-0 group-hover/project-card:opacity-100"
                  ),
                  children: project.title
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-3 text-xs font-light text-slate-500 dark:text-slate-100", children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    className: twMerge(
                      "animated-link -translate-x-full opacity-0",
                      isSelected && "translate-x-0 opacity-100",
                      "group-hover/project-card:translate-x-0 group-hover/project-card:opacity-100"
                    ),
                    prefetch: "viewport",
                    to: `/work/${project.slug}`,
                    type: "button",
                    viewTransition: true,
                    children: "Detail"
                  }
                ),
                project.link ? /* @__PURE__ */ jsxs(
                  "a",
                  {
                    className: twMerge(
                      "animated-link flex translate-x-full items-center gap-1 opacity-0",
                      isSelected && "translate-x-0 opacity-100",
                      "group-hover/project-card:translate-x-0 group-hover/project-card:opacity-100"
                    ),
                    href: project.link,
                    rel: "noreferrer",
                    target: "_blank",
                    children: [
                      "Preview",
                      /* @__PURE__ */ jsx(SlArrowRightCircle, {})
                    ]
                  }
                ) : null
              ] })
            ] })
          }
        )
      ]
    }
  );
}
function ProjectListPage({ projects }) {
  const [isClientReady, setIsClientReady] = useState(false);
  useEffect(() => {
    setIsClientReady(true);
  }, []);
  return /* @__PURE__ */ jsxs(DefaultLayout, { children: [
    /* @__PURE__ */ jsx(
      HeroSection,
      {
        description: "I've built many things on web supporting various businesses. In spare time, I built my own stuff, too.",
        title: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "relative h-4 w-4 rounded-full bg-amber-500 dark:bg-slate-800 md:h-8 md:w-8", children: /* @__PURE__ */ jsx(SlRocket, { className: "absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 md:h-10 md:w-10" }) }),
          /* @__PURE__ */ jsx("div", { children: "Work" })
        ] })
      }
    ),
    (projects == null ? void 0 : projects.length) ? /* @__PURE__ */ jsx(
      "div",
      {
        className: twMerge(
          "container mx-auto grid grid-cols-2 gap-4 lg:max-w-3xl lg:grid-cols-3 lg:gap-8",
          "translate-y-4 opacity-0 transition-all delay-300 duration-300 ease-out",
          isClientReady ? "translate-y-0 opacity-100" : ""
        ),
        children: projects.map((project) => /* @__PURE__ */ jsx(
          ProjectCard,
          {
            className: "w-full lg:w-full",
            isClientReady,
            project
          },
          project.id
        ))
      }
    ) : /* @__PURE__ */ jsx("div", { className: "pb-48 pt-16 text-center text-4xl font-bold text-slate-200 dark:text-slate-700", children: "Content is coming soon!" })
  ] });
}
const meta$5 = () => {
  return [{
    title: "My Work - Surya Darma Putra"
  }, {
    name: "description",
    content: "Work by Surya Darma Putra"
  }, {
    name: "keywords",
    content: ["software engineer", "javascript", "react", "vue"].join(", ")
  }];
};
async function loader$5() {
  const projects = await getProjects();
  return {
    projects
  };
}
const work__index = UNSAFE_withComponentProps(function Work() {
  const {
    projects
  } = useLoaderData();
  return /* @__PURE__ */ jsx(ProjectListPage, {
    projects
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: work__index,
  loader: loader$5,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
function hasAnnotation(annotations) {
  const { color, ...otherAnnotations } = annotations;
  return Object.keys(otherAnnotations).some((key) => {
    const annotationKey = key;
    return !!annotations[annotationKey];
  });
}
function TextWithAnnotations({
  annotations,
  children,
  href
}) {
  const className = `
    ${annotations.bold ? "font-semibold" : ""}
    ${annotations.italic ? "italic" : ""}
    ${annotations.strikethrough ? "line-through" : ""}
    ${annotations.underline ? "underline" : ""}
  `;
  if (href) {
    return /* @__PURE__ */ jsx("a", { className, href, rel: "noreferrer", target: "_blank", children: annotations.code ? /* @__PURE__ */ jsx("code", { children }) : children });
  }
  if (annotations.code) {
    return /* @__PURE__ */ jsx("code", { children });
  }
  return /* @__PURE__ */ jsx("span", { className, children });
}
function RichText({ block }) {
  const { annotations, plain_text: plainText, href } = block;
  if (!plainText) return null;
  if (href) {
    return /* @__PURE__ */ jsx("a", { href, rel: "noreferrer", target: "_blank", children: plainText });
  }
  if (hasAnnotation(annotations)) {
    return /* @__PURE__ */ jsx(TextWithAnnotations, { annotations, href, children: plainText });
  }
  return /* @__PURE__ */ jsx(Fragment, { children: plainText });
}
function getBlockContent(block) {
  switch (block.type) {
    case "heading_1":
      return block.heading_1;
    case "heading_2":
      return block.heading_2;
    case "heading_3":
      return block.heading_3;
  }
}
function Heading({ block }) {
  const level = block.type.replace("heading_", "");
  const headingTag = `h${level}`;
  const richTexts = getBlockContent(block).rich_text || [];
  return React.createElement(
    headingTag,
    null,
    richTexts.map((richTextBlock, index) => /* @__PURE__ */ jsx(RichText, { block: richTextBlock }, index))
  );
}
const listTagMap = {
  bulleted_list: "ul",
  numbered_list: "ol"
};
function getListItemRichText(block) {
  switch (block.type) {
    case "bulleted_list_item":
      return block.bulleted_list_item.rich_text;
    case "numbered_list_item":
      return block.numbered_list_item.rich_text;
  }
}
function ListItem({ block, children }) {
  const richTexts = getListItemRichText(block);
  return /* @__PURE__ */ jsxs("li", { children: [
    richTexts.map((richTextBlock, index) => /* @__PURE__ */ jsx(RichText, { block: richTextBlock }, index)),
    children
  ] });
}
function List({ block, children }) {
  const ListTag = listTagMap[block.type];
  return React.createElement(ListTag, null, children);
}
const headingBlockTypes = ["heading_1", "heading_2", "heading_3"];
function Paragraph({
  block,
  previousBlockType = null,
  children
}) {
  const richTexts = block.paragraph.rich_text;
  if (!(richTexts == null ? void 0 : richTexts.length)) return null;
  const className = previousBlockType && headingBlockTypes.includes(previousBlockType) ? "mt-3" : "";
  return /* @__PURE__ */ jsxs("p", { className, children: [
    richTexts.map((richTextBlock, index) => /* @__PURE__ */ jsx(RichText, { block: richTextBlock }, index)),
    children
  ] });
}
function Quote({ block, children }) {
  const parentRichTexts = block.quote.rich_text;
  const richTexts = [...parentRichTexts];
  return /* @__PURE__ */ jsxs("blockquote", { children: [
    richTexts.map((richTextBlock, index) => /* @__PURE__ */ jsx(RichText, { block: richTextBlock }, index)),
    children
  ] });
}
const Code = lazy(
  () => import("./Code-EX-2OHHV.js").then((component) => ({ default: component.Code }))
);
const Embed = lazy(
  () => import("./Embed-BACyl67-.js").then((component) => ({ default: component.Embed }))
);
const Image = lazy(
  () => import("./Image-yohgbcfJ.js").then((component) => ({ default: component.Image }))
);
const componentMap = {
  paragraph: Paragraph,
  heading_1: Heading,
  heading_2: Heading,
  heading_3: Heading,
  code: Code,
  quote: Quote,
  bulleted_list: List,
  bulleted_list_item: ListItem,
  numbered_list: List,
  numbered_list_item: ListItem,
  image: Image,
  embed: Embed
};
function BlocksRenderer({ blocks, imageBasePath }) {
  return /* @__PURE__ */ jsx(Fragment, { children: blocks.map(({ block, children }, index) => {
    var _a;
    if (!("type" in block)) return null;
    const mapKey = block.type;
    const Component = componentMap[mapKey];
    const previousBlockType = (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      index > 0 ? (_a = blocks[index - 1].block) == null ? void 0 : _a.type : null
    );
    if (!Component) return null;
    const BlockComponent = Component;
    return /* @__PURE__ */ jsx(
      BlockComponent,
      {
        basePath: imageBasePath,
        block,
        previousBlockType,
        children: (children == null ? void 0 : children.length) ? /* @__PURE__ */ jsx(BlocksRenderer, { blocks: children }) : null
      },
      block.id
    );
  }) });
}
function Tag({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: `mb-2 mr-2 rounded-md bg-slate-200 px-2 py-0.5 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-400 ${className} `,
      ...props,
      children
    }
  );
}
function Tags({ category, className = "", tags = [] }) {
  if (!Array.isArray(tags) || !tags.length) return null;
  return /* @__PURE__ */ jsxs("div", { className: `flex flex-wrap ${className}`, children: [
    category && /* @__PURE__ */ jsx(Tag, { children: category }),
    tags == null ? void 0 : tags.map((tag) => /* @__PURE__ */ jsx(Tag, { children: tag }, tag))
  ] });
}
const usePrevNextButtons = (emblaApi, onButtonClick) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi, onButtonClick]);
  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi, onButtonClick]);
  const onSelect = useCallback((api) => {
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);
  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);
  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  };
};
const MultipleItemsCarousel = forwardRef(
  (props, ref) => {
    const { slides, options, className, itemClassName } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
      AutoScroll({
        startDelay: 0,
        playOnInit: options == null ? void 0 : options.autoPlay,
        speed: 0.5,
        stopOnMouseEnter: true,
        stopOnInteraction: true,
        direction: options == null ? void 0 : options.playDirection
      })
    ]);
    const {
      prevBtnDisabled,
      nextBtnDisabled,
      onPrevButtonClick,
      onNextButtonClick
    } = usePrevNextButtons(emblaApi);
    const play = useCallback(() => {
      var _a;
      const autoScroll = (_a = emblaApi == null ? void 0 : emblaApi.plugins()) == null ? void 0 : _a.autoScroll;
      if (!autoScroll) return;
      autoScroll.play();
    }, [emblaApi]);
    const debouncedPlay = debounce(play, 2e3);
    const pause = useCallback(() => {
      var _a;
      const autoScroll = (_a = emblaApi == null ? void 0 : emblaApi.plugins()) == null ? void 0 : _a.autoScroll;
      if (!autoScroll) return;
      autoScroll.stop();
    }, [emblaApi]);
    const debouncedPause = debounce(pause, 2e3);
    const handleClickAutoplay = useCallback(
      (callback) => {
        var _a;
        const autoScroll = (_a = emblaApi == null ? void 0 : emblaApi.plugins()) == null ? void 0 : _a.autoScroll;
        if (!autoScroll) return;
        const resetOrStop = autoScroll.options.stopOnInteraction === false ? autoScroll.reset : autoScroll.stop;
        resetOrStop();
        callback();
      },
      [emblaApi]
    );
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: twMerge(
          "group/multi-item-carousel relative m-auto max-w-3xl",
          className
        ),
        onMouseEnter: () => debouncedPause(),
        onMouseLeave: () => debouncedPlay(),
        ref,
        children: [
          /* @__PURE__ */ jsx("div", { className: "overflow-hidden py-4", ref: emblaRef, children: /* @__PURE__ */ jsx("div", { className: "flex", children: slides.map((item, index) => /* @__PURE__ */ jsx(
            "div",
            {
              className: twMerge(
                "w-[45%] shrink-0 grow-0 pl-3",
                itemClassName
              ),
              children: item
            },
            index
          )) }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              "aria-label": "Scroll to left",
              className: "absolute top-1/2 left-2 z-10 -translate-x-full -translate-y-1/2 cursor-pointer rounded-full bg-slate-50 opacity-0 transition group-hover/multi-item-carousel:translate-x-0 group-hover/multi-item-carousel:opacity-100 dark:bg-slate-800 dark:text-slate-400",
              disabled: prevBtnDisabled,
              onClick: () => handleClickAutoplay(onPrevButtonClick),
              type: "button",
              children: /* @__PURE__ */ jsx(SlArrowLeftCircle, { className: "h-8 w-8 md:h-12 md:w-12" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              "aria-label": "Scroll to right",
              className: "absolute top-1/2 right-2 z-10 translate-x-full -translate-y-1/2 cursor-pointer rounded-full bg-slate-50 opacity-0 transition group-hover/multi-item-carousel:translate-x-0 group-hover/multi-item-carousel:opacity-100 dark:bg-slate-800 dark:text-slate-400",
              disabled: nextBtnDisabled,
              onClick: () => handleClickAutoplay(onNextButtonClick),
              type: "button",
              children: /* @__PURE__ */ jsx(SlArrowRightCircle, { className: "h-8 w-8 md:h-12 md:w-12" })
            }
          )
        ]
      }
    );
  }
);
MultipleItemsCarousel.displayName = "MultipleItemsCarousel";
const ProjectCarousel = forwardRef(
  ({ className, projects }, ref) => {
    const [isClientReady, setIsClientReady] = useState(false);
    const finalProjects = (projects == null ? void 0 : projects.length) && projects.length <= 5 ? [...projects, ...projects, ...projects] : projects;
    useEffect(() => {
      setIsClientReady(true);
    }, []);
    if (!(projects == null ? void 0 : projects.length)) return null;
    return /* @__PURE__ */ jsxs(
      "section",
      {
        className: twMerge(
          "group/project-carousel flex flex-col gap-4 md:gap-6",
          "transition-all duration-700 ease-out",
          isClientReady ? "translate-x-0 opacity-100 delay-300" : "translate-x-24 opacity-0",
          className
        ),
        id: "work",
        ref,
        children: [
          /* @__PURE__ */ jsx(
            MultipleItemsCarousel,
            {
              className: "max-w-full",
              itemClassName: "w-44 pl-4 lg:w-64",
              options: { loop: true, autoPlay: true, playDirection: "forward" },
              slides: [
                ...finalProjects.map((project, index) => /* @__PURE__ */ jsx(
                  ProjectCard,
                  {
                    isClientReady,
                    project
                  },
                  index
                ))
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            SmartLink,
            {
              className: twMerge(
                "animated-link mx-auto flex w-fit items-center gap-2 text-sm text-amber-500 md:text-base",
                "translate-y-8 opacity-0 transition-all duration-1000 ease-out",
                isClientReady && "translate-y-0 opacity-100 delay-500"
              ),
              href: "/work",
              children: [
                "All Works",
                /* @__PURE__ */ jsx(SlArrowRightCircle, { className: "mt-0.5" })
              ]
            }
          )
        ]
      }
    );
  }
);
ProjectCarousel.displayName = "ProjectCarousel";
function ProjectDetailPage({
  project,
  projects
}) {
  var _a, _b;
  return /* @__PURE__ */ jsxs(DefaultLayout, { children: [
    /* @__PURE__ */ jsx(
      HeroSection,
      {
        description: /* @__PURE__ */ jsx(Fragment, { children: project.link ? /* @__PURE__ */ jsx("div", { className: "mt-2 flex justify-center gap-4 md:mt-4", children: /* @__PURE__ */ jsxs(
          "a",
          {
            className: "animated-link flex items-center gap-2 font-medium text-amber-500",
            href: project.link,
            rel: "noreferrer",
            target: "_blank",
            children: [
              "Preview ",
              /* @__PURE__ */ jsx(SlArrowRightCircle, {})
            ]
          }
        ) }) : null }),
        descriptionClassName: "mx-auto",
        title: project.title,
        titleClassName: "text-center justify-center"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto my-8 flex flex-col md:text-center lg:max-w-3xl", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-6", children: project.thumbnailUrl ? /* @__PURE__ */ jsx(
        OptimizedImage,
        {
          alt: `${project.title} thumbnail`,
          className: "mx-auto rounded-md shadow-lg lg:max-w-2xl",
          src: project.thumbnailUrl
        }
      ) : null }),
      /* @__PURE__ */ jsxs("article", { className: "mx-auto lg:max-w-2xl", children: [
        /* @__PURE__ */ jsx("p", { children: project.summary }),
        Boolean((_a = project.blocks) == null ? void 0 : _a.length) && /* @__PURE__ */ jsx(
          BlocksRenderer,
          {
            blocks: project.blocks || [],
            imageBasePath: "/images/projects"
          }
        )
      ] }),
      ((_b = project.tags) == null ? void 0 : _b.length) ? /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "font-bold", children: "Tags:" }),
        /* @__PURE__ */ jsx(Tags, { className: "md:justify-center", tags: project.tags })
      ] }) : null
    ] }),
    /* @__PURE__ */ jsx(
      ProjectCarousel,
      {
        className: "z-10 -mx-6 mb-12 mt-10 overflow-hidden py-2",
        projects
      }
    )
  ] });
}
const meta$4 = ({
  data
}) => {
  const project = data == null ? void 0 : data.project;
  if (!project) {
    return [];
  }
  return [{
    title: `${project.title} - Surya Darma Putra`
  }, {
    name: "keywords",
    content: [...(project == null ? void 0 : project.tags) || []].join(", ")
  }];
};
async function loader$4({
  params
}) {
  const {
    slug
  } = params;
  if (!slug) {
    throw redirect("/work");
  }
  const projects = await getProjects();
  const project = projects.find((item) => item.slug === slug);
  if (!project) {
    throw redirect("/work");
  }
  return {
    project,
    projects
  };
}
const work_$slug = UNSAFE_withComponentProps(function WorkById() {
  const {
    project,
    projects
  } = useLoaderData();
  return /* @__PURE__ */ jsx(ProjectDetailPage, {
    project,
    projects
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: work_$slug,
  loader: loader$4,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
const CAMPAIGNS_FILE = path.resolve("extras/campaigns.json");
async function getCampaigns() {
  const fileContent = await fs.readFile(CAMPAIGNS_FILE);
  const campaigns = JSON.parse(fileContent.toString());
  return campaigns.map((campaign) => {
    var _a, _b, _c, _d, _e;
    const date = new Date(campaign.properties.date);
    const thumbnailExtension = getFileExtensionFromUrl(
      (_c = (_b = (_a = campaign.properties.thumbnail) == null ? void 0 : _a[0]) == null ? void 0 : _b.file) == null ? void 0 : _c.url
    );
    const thumbnailUrl = thumbnailExtension ? `/images/campaigns/${campaign.id}-0.${thumbnailExtension}` : null;
    const thumbnailPlaceholderUrl = thumbnailExtension ? `/images/campaigns/${campaign.id}-0-placeholder.png` : null;
    const title = campaign.title;
    const message = getTextFromProperties(campaign.properties, "message");
    const icon = (_d = campaign.properties.icon) == null ? void 0 : _d.name;
    const type = ((_e = campaign.properties.type) == null ? void 0 : _e.name) || "";
    const internal = getTextFromProperties(
      campaign.properties,
      "internal_link"
    );
    const external = campaign.properties.external_link;
    return {
      id: campaign.id,
      title,
      message,
      type,
      icon,
      date,
      thumbnailUrl,
      thumbnailPlaceholderUrl,
      link: { internal, external },
      isHighlighted: true
    };
  });
}
function BrandHero({ className }) {
  const [isClientReady, setIsClientReady] = useState(false);
  useEffect(() => {
    setIsClientReady(true);
  }, []);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: twMerge(
        "flex w-full items-center justify-between gap-4 text-center md:flex-col-reverse",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "animate-enter-from-left md:animate-enter-from-bottom flex w-2/3 flex-col gap-2 text-left opacity-0 md:text-center", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl leading-6 font-bold tracking-tight text-black md:text-5xl md:leading-11 md:font-extrabold dark:text-slate-100", children: "Surya Darma Putra" }),
          /* @__PURE__ */ jsx("p", { className: "w-full text-sm font-light text-slate-600 md:text-base dark:text-slate-400", children: "Software Engineer / Web / Mobile. Explore my works below." })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: twMerge(
              "shrink-0 translate-x-full opacity-0 transition-all duration-300 ease-out md:translate-x-0 md:-translate-y-full",
              isClientReady ? "translate-x-0 opacity-100 md:translate-y-0" : ""
            ),
            children: /* @__PURE__ */ jsx(
              OptimizedImage,
              {
                alt: "me",
                className: "h-20 w-20 rounded-full object-cover",
                height: 80,
                src: "/images/me.jpeg",
                width: 80
              }
            )
          }
        )
      ]
    }
  );
}
function HighlightCard({
  className,
  thumbnailUrl,
  icon,
  title,
  description,
  href
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: twMerge(
        "group relative z-20 cursor-pointer overflow-hidden rounded-md p-0.5 shadow-xl transition-shadow duration-200 hover:shadow-2xl dark:bg-slate-900",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "animated-border-highlight absolute -z-10" }),
        /* @__PURE__ */ jsxs(
          SmartLink,
          {
            className: "flex h-full items-center gap-3 rounded-md bg-white p-2 md:p-3 dark:bg-slate-950",
            href,
            style: { textDecoration: "none" },
            children: [
              thumbnailUrl ? /* @__PURE__ */ jsx("div", { className: "h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100 shadow-sm md:h-16 md:w-16 dark:border-slate-700 dark:bg-slate-800", children: /* @__PURE__ */ jsx(
                OptimizedImage,
                {
                  alt: title,
                  className: "h-full w-full object-cover transition-transform duration-200 group-hover:scale-105",
                  src: thumbnailUrl
                }
              ) }) : /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-amber-200 to-amber-400 text-3xl font-bold text-white md:h-16 md:w-16 dark:from-sky-950 dark:to-sky-900 dark:text-slate-400 [&_svg]:h-6 [&_svg]:w-6 [&_svg]:md:h-8 [&_svg]:md:w-8", children: icon || /* @__PURE__ */ jsx(SlRocket, {}) }),
              /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 flex-col justify-between", children: [
                /* @__PURE__ */ jsx("h3", { className: "mb-1 text-sm leading-snug font-semibold text-slate-900 transition-colors md:text-base dark:text-white", children: /* @__PURE__ */ jsx("span", { className: "animated-link", children: title }) }),
                /* @__PURE__ */ jsx("p", { className: "line-clamp-3 text-xs leading-snug text-slate-600 md:text-sm dark:text-slate-300", children: description })
              ] })
            ]
          }
        )
      ]
    }
  );
}
const campaignIconMap = {
  rocket: /* @__PURE__ */ jsx(SlRocket, {}),
  pencil: /* @__PURE__ */ jsx(SlPencil, {}),
  star: /* @__PURE__ */ jsx(SlStar, {}),
  new: /* @__PURE__ */ jsx(SlStar, {})
};
function HighlightsSection({
  className,
  posts,
  projects,
  campaigns = []
}) {
  const highlightedProjects = projects.filter((item) => item.isHighlighted);
  const highlightedPosts = posts.filter((item) => item.isHighlighted);
  const highlightedCampaigns = campaigns;
  const getCampaignIcon = (icon) => campaignIconMap[icon ?? ""] ?? /* @__PURE__ */ jsx(SlRocket, {});
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: twMerge(
        "flex flex-col justify-center gap-4 md:flex-row",
        className
      ),
      children: [
        highlightedCampaigns == null ? void 0 : highlightedCampaigns.map((item) => /* @__PURE__ */ jsx(
          HighlightCard,
          {
            className: "animate-enter-from-bottom animate-delay-75 md:w-1/3",
            description: item.message || "",
            href: item.link.internal || item.link.external || "#",
            icon: getCampaignIcon(item.icon),
            title: item.title
          },
          item.id
        )),
        highlightedProjects == null ? void 0 : highlightedProjects.map((item) => /* @__PURE__ */ jsx(
          HighlightCard,
          {
            className: "animate-enter-from-left animate-delay-75 md:w-1/3",
            description: item.highlightMessage || item.summary,
            href: `/work/${item.slug}`,
            title: item.title
          },
          item.id
        )),
        highlightedPosts == null ? void 0 : highlightedPosts.map((item) => /* @__PURE__ */ jsx(
          HighlightCard,
          {
            className: "animate-enter-from-right animate-delay-75 md:w-1/3",
            description: item.highlightMessage || "",
            href: `/blog/${item.slug}`,
            icon: /* @__PURE__ */ jsx(SlPencil, {}),
            title: item.title
          },
          item.slug
        ))
      ]
    }
  );
}
const PostList$2 = lazy(
  () => Promise.resolve().then(() => PostList$1).then((mod) => ({
    default: mod.PostList
  }))
);
const GetInTouchSection$2 = lazy(() => Promise.resolve().then(() => GetInTouchSection$1));
function LandingPage({
  posts,
  projects,
  campaigns
}) {
  return /* @__PURE__ */ jsxs(DefaultLayout, { isFooterLinksVisible: false, children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-24 right-0 z-10 h-72 w-72 rounded-full bg-red-400 opacity-10 blur-3xl dark:bg-sky-800" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-72 left-0 z-10 h-72 w-72 rounded-full bg-cyan-400 opacity-10 blur-3xl dark:bg-cyan-600" }),
    /* @__PURE__ */ jsx(BrandHero, { className: "z-20 py-12" }),
    /* @__PURE__ */ jsx(
      HighlightsSection,
      {
        campaigns,
        className: "pt-8 pb-12 md:pt-16 md:pb-20",
        posts,
        projects
      }
    ),
    /* @__PURE__ */ jsx(
      ProjectCarousel,
      {
        className: "z-10 -mx-6 overflow-hidden pt-10 pb-8 lg:py-20",
        projects
      }
    ),
    /* @__PURE__ */ jsx(
      PostList$2,
      {
        className: "mx-auto py-12 md:w-max lg:py-16",
        isTitleVisible: true,
        posts
      }
    ),
    /* @__PURE__ */ jsx(GetInTouchSection$2, { className: "py-10" }),
    !(posts == null ? void 0 : posts.length) && !(projects == null ? void 0 : projects.length) && !(campaigns == null ? void 0 : campaigns.length) ? /* @__PURE__ */ jsx("div", { className: "pt-16 pb-48 text-center text-4xl font-bold text-slate-200 dark:text-slate-700", children: "Content is coming soon!" }) : null
  ] });
}
const meta$3 = () => {
  return [{
    title: "Surya Darma Putra - Software engineer based in Bali, Indonesia"
  }, {
    name: "description",
    content: "👋 Hello, I'm Surya, a software engineer. I do web development using JavaScript, React and Vue ecosystems."
  }, {
    name: "keywords",
    content: ["software engineer", "javascript", "react", "vue"].join(", ")
  }];
};
async function loader$3() {
  const posts = await getPosts();
  const projects = await getProjects();
  const campaigns = await getCampaigns();
  return {
    posts,
    projects,
    campaigns
  };
}
const _index = UNSAFE_withComponentProps(function Index() {
  const {
    posts,
    projects,
    campaigns
  } = useLoaderData();
  return /* @__PURE__ */ jsx(LandingPage, {
    campaigns,
    posts,
    projects
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _index,
  loader: loader$3,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const AboutMeShortSection = forwardRef(
  ({ className, isActionsVisible, isTitleVisible, onClickExploreMyWork }, ref) => {
    return /* @__PURE__ */ jsxs(
      "section",
      {
        className: twMerge("container mx-auto lg:max-w-3xl", className),
        id: "about",
        ref,
        children: [
          isTitleVisible && /* @__PURE__ */ jsxs("h2", { className: "mb-8 inline-flex items-center gap-4 text-2xl font-extrabold text-slate-800 dark:text-slate-200", children: [
            /* @__PURE__ */ jsx("div", { className: "relative h-8 w-8 rounded-full bg-amber-500 dark:bg-slate-800", children: /* @__PURE__ */ jsx(SlMagnifier, { className: "absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2" }) }),
            "Who am I?"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-16", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center gap-4 text-sm font-light leading-6 md:text-base", children: [
                /* @__PURE__ */ jsxs("p", { children: [
                  "Hi, I'm ",
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Surya" }),
                  ", a software engineer with expertise in",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "TypeScript" }),
                  " and",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "React.js" }),
                  ". Currently working at",
                  " ",
                  /* @__PURE__ */ jsx(
                    SmartLink,
                    {
                      className: "animated-underline",
                      href: "https://www.gotocompany.com/en/products/goto-financial",
                      children: "GoTo Financial - Merchant Lending"
                    }
                  ),
                  " ",
                  "team as a ",
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Frontend Lead" }),
                  "."
                ] }),
                /* @__PURE__ */ jsx("div", { className: "w-2/5 shrink-0 md:hidden", children: /* @__PURE__ */ jsx(
                  OptimizedImage,
                  {
                    alt: "me",
                    className: "h-36 w-36 rounded-full object-cover",
                    src: "/images/me.jpeg",
                    width: 144
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm font-light leading-6 md:text-base", children: "Beyond web apps, I develop mobile apps, developer tools, set up infrastructure and CI/CD, and integrate APIs like Notion or ChatGPT. Any challenge software engineering can solve, I’m on it." }),
              /* @__PURE__ */ jsxs("p", { className: "mb-4 text-sm font-light leading-6 md:text-base", children: [
                "I believe in ",
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "pragmatic" }),
                " ",
                "problem-solving, not being tied to specific tools or languages. My mission is to help businesses",
                " ",
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "grow" }),
                " and operate",
                " ",
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "efficiently" }),
                "."
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "hidden w-1/3 shrink-0 md:block", children: /* @__PURE__ */ jsx(
              OptimizedImage,
              {
                alt: "me",
                className: "-mt-24 h-60 w-60 rounded-full object-cover",
                src: "/images/me.jpeg",
                width: 240
              }
            ) })
          ] }),
          isActionsVisible && /* @__PURE__ */ jsxs("div", { className: "mt-2 inline-flex flex-col gap-3", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                "aria-label": "More About Me",
                className: getButtonClassName({
                  color: "secondary",
                  variant: "outlined"
                }),
                prefetch: "viewport",
                to: "/about",
                viewTransition: true,
                children: "More About Me..."
              }
            ),
            /* @__PURE__ */ jsxs(
              Button,
              {
                "aria-label": "Explore My Work",
                color: "primary",
                onClick: onClickExploreMyWork,
                variant: "filled",
                children: [
                  "Explore My Work",
                  /* @__PURE__ */ jsx(SlArrowDownCircle, { className: "h-4 w-4 animate-bounce" })
                ]
              }
            )
          ] })
        ]
      }
    );
  }
);
AboutMeShortSection.displayName = "AboutMeShortSection";
const SOCIAL_LINKS = [
  {
    id: "linkedin",
    Icon: SiLinkedin,
    href: "https://www.linkedin.com/in/surdarmaputra",
    label: "Visit Surya's LinkedIn"
  },
  {
    id: "github",
    Icon: SiGithub,
    href: "https://github.com/surdarmaputra",
    label: "Visit Surya's GitHub"
  },
  {
    id: "x",
    Icon: SiX,
    href: "https://x.com/surdarmaputra",
    label: "Visit Surya's X"
  }
];
const GetInTouchSection = forwardRef(
  (props, ref) => {
    return /* @__PURE__ */ jsxs(
      "section",
      {
        className: `flex flex-col gap-2 ${props.className}`,
        id: "connect",
        ref,
        children: [
          /* @__PURE__ */ jsxs("h2", { className: "mx-auto inline-flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200", children: [
            /* @__PURE__ */ jsx("div", { className: "relative h-3 w-3 rounded-full bg-amber-500 dark:bg-slate-800", children: /* @__PURE__ */ jsx(SlMagnifier, { className: "absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2" }) }),
            /* @__PURE__ */ jsx("div", { children: "Find me on" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mx-auto flex gap-2", children: SOCIAL_LINKS.map(({ id, Icon, href, label }) => /* @__PURE__ */ jsx(
            "a",
            {
              "aria-label": label,
              className: "group rounded-xl bg-slate-50 p-5 transition hover:scale-105 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800",
              href,
              rel: "noreferrer",
              target: "_blank",
              children: /* @__PURE__ */ jsx(Icon, { className: "h-12 w-12 text-slate-400 transition-transform group-hover:scale-110 group-hover:text-slate-500 dark:group-hover:text-slate-300 md:h-20 md:w-20" })
            },
            id
          )) })
        ]
      }
    );
  }
);
GetInTouchSection.displayName = "GetInTouchSection";
const GetInTouchSection$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GetInTouchSection
}, Symbol.toStringTag, { value: "Module" }));
const experiences = [
  {
    company: "GoTo Financial",
    link: "https://www.gotocompany.com/en/products/goto-financial",
    role: "Frontend Lead",
    start: "2024-07-01",
    end: null,
    descriptions: [
      /* @__PURE__ */ jsxs("div", { children: [
        "At GoTo Financial, I ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "lead" }),
        " the Merchant Lending team, delivering financing solutions to",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "empower" }),
        " our merchant ecosystem and support their business ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "growth" }),
        ". I've gained experience managing",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "high-usage" }),
        " products,",
        " ",
        "collaborating with ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "global teams" }),
        " ",
        "to integrate multiple subsystems, and focusing on",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "cost efficiency" }),
        " and",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "profitability" }),
        "."
      ] }, 0),
      /* @__PURE__ */ jsxs("div", { children: [
        "My first project involved rebranding our flagship product with a new service and user experience. We successfully delivered it",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "on time" }),
        " with",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "zero downtime" }),
        ",",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "improved testing coverage" }),
        " by over 50%, and developed a",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "standardized UI" }),
        " library with design tokens."
      ] }, 1)
    ]
  },
  {
    company: "Kargo Technologies",
    link: "https://kargo.tech/",
    role: "Senior Frontend Engineer",
    start: "2021-06-01",
    end: "2024-07-01",
    descriptions: [
      /* @__PURE__ */ jsxs("div", { children: [
        "Working at a ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "fast-growing" }),
        " ",
        "logistic company has offered valuable learning opportunities."
      ] }, 0),
      /* @__PURE__ */ jsxs("div", { children: [
        "I ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "initiated" }),
        " frontend unit testing, ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "published" }),
        " NPM packages,",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "improved" }),
        " CI/CD, built",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "growth-focused" }),
        " features in web and mobile apps, ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "optimized" }),
        " ",
        "funnels, conducted A/B testing, and",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "integrated AI" }),
        " to enhance operations."
      ] }, 1)
    ]
  },
  {
    company: "Bukalapak",
    link: "https://www.bukalapak.com/",
    role: "Frontend Engineer",
    start: "2018-07-01",
    end: "2021-06-01",
    descriptions: [
      /* @__PURE__ */ jsx("div", { children: "Bukalapak, beyond being an online marketplace, also offers financial products to empower users by increasing their purchasing power and supporting business growth." }, 0),
      /* @__PURE__ */ jsxs("div", { children: [
        "I developed ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "webview" }),
        " pages and",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "dashboards" }),
        " for financial products, doing ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "cloud migration" }),
        " ",
        "to GCP, gaining hands-on experience with",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "diverse tech stacks and workflows" }),
        ". This role marked my first venture into building products in a tech startup environment."
      ] }, 1)
    ]
  },
  {
    company: "Artcak Technology",
    link: "https://artcak.id/",
    role: "Web Developer",
    start: "2017-02-01",
    end: "2018-07-01",
    descriptions: [
      /* @__PURE__ */ jsxs("div", { children: [
        "Artcak offers mobile and web development services across various industries, including tours and travel, internet providers, and state-owned enterprises. My responsibilities included developing",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "REST APIs" }),
        " and",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "web dashboards" }),
        ", creating",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "project starters" }),
        ", implementing",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "API testing" }),
        ", and",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "integrating Docker" }),
        " into our workflow."
      ] }, 0)
    ]
  },
  {
    company: null,
    link: null,
    role: "Freelance Web Developer",
    start: "2015-11-01",
    end: "2017-02-01",
    descriptions: [
      /* @__PURE__ */ jsxs("div", { children: [
        "This marked ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "the beginning" }),
        " of my professional software development journey. During college, I took on",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "freelance projects" }),
        " referred by friends and lecturers."
      ] }, 0)
    ]
  }
];
function formatWorkDuration(start, end) {
  const formattedStart = dayjs(start).format("MMM YYYY");
  const formattedEnd = end ? dayjs(end).format("MMM YYYY") : null;
  const durationMonth = end ? dayjs(end).diff(dayjs(start), "month") : dayjs(/* @__PURE__ */ new Date()).diff(dayjs(start), "month");
  const duration = durationMonth >= 12 ? `${Math.floor(durationMonth / 12)} years ${durationMonth % 12} months` : `${durationMonth} months`;
  if (end === null) {
    return `${formattedStart} - present (${duration})`;
  }
  return `${formattedStart} - ${formattedEnd} (${duration})`;
}
function AboutPage() {
  return /* @__PURE__ */ jsxs(DefaultLayout, { isFooterLinksVisible: false, children: [
    /* @__PURE__ */ jsx(
      HeroSection,
      {
        description: "Who is Surya and what he does",
        title: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "relative h-4 w-4 rounded-full bg-amber-500 dark:bg-slate-800 md:h-8 md:w-8", children: /* @__PURE__ */ jsx(SlUser, { className: "absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 md:h-10 md:w-10" }) }),
          /* @__PURE__ */ jsx("div", { children: "About" })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(AboutMeShortSection, {}),
    /* @__PURE__ */ jsxs("section", { className: "container mx-auto mb-12 mt-4 pt-16 text-xl font-light md:mb-20 lg:max-w-3xl", children: [
      /* @__PURE__ */ jsxs("h2", { className: "mb-10 inline-flex items-center gap-4 text-2xl font-extrabold text-slate-800 dark:text-slate-200", children: [
        /* @__PURE__ */ jsx("div", { className: "relative h-8 w-8 rounded-full bg-amber-500 dark:bg-slate-800", children: /* @__PURE__ */ jsx(SlBriefcase, { className: "absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2" }) }),
        /* @__PURE__ */ jsx("div", { children: "Experience" })
      ] }),
      experiences.map(
        ({ company, link, role, start, end, descriptions }, index) => /* @__PURE__ */ jsxs("div", { className: "relative pb-8 pl-6", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-2 inline-flex h-2 w-2 animate-ping rounded-full bg-amber-500" }),
          /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-2 inline-flex h-2 w-2 rounded-full bg-amber-500" }),
          index < experiences.length - 1 && /* @__PURE__ */ jsx("div", { className: "absolute left-[3px] top-2 -z-10 -mb-10 h-full border-l-2 border-slate-100 dark:border-slate-800" }),
          /* @__PURE__ */ jsxs("h3", { className: "mb-0 pb-1 text-sm font-bold leading-6 text-slate-700 dark:text-slate-300 md:text-base", children: [
            role,
            company && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("span", { children: " at " }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  className: "animated-underline pb-0.5",
                  href: link,
                  rel: "noreferrer",
                  target: "_blank",
                  children: company
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("small", { className: "mb-4 block text-sm font-light leading-6 text-slate-500", children: formatWorkDuration(start, end) }),
          descriptions.map((description, descriptionIndex) => /* @__PURE__ */ jsx(
            "p",
            {
              className: "mb-4 text-sm font-light leading-6 md:text-base",
              children: description
            },
            descriptionIndex
          ))
        ] }, company)
      )
    ] }),
    /* @__PURE__ */ jsx(GetInTouchSection, { className: "py-16" })
  ] });
}
const meta$2 = () => {
  return [{
    title: "Surya Darma Putra - About me"
  }, {
    name: "description",
    content: "👋 Hello, I'm Surya, a software engineer based in Bali, Indonesia. I do web development using JavaScript, React and Vue ecosystems."
  }, {
    keywords: ["software engineer", "javascript", "react", "vue"].join(", ")
  }];
};
const about = UNSAFE_withComponentProps(function About() {
  return /* @__PURE__ */ jsx(AboutPage, {});
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const blog = UNSAFE_withComponentProps(function Blog() {
  return /* @__PURE__ */ jsx(DefaultLayout, {
    children: /* @__PURE__ */ jsx(Outlet, {})
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: blog
}, Symbol.toStringTag, { value: "Module" }));
function PostMetaData({
  className = "",
  date,
  readingTime
}) {
  const formattedDate = useMemo(
    () => date ? dayjs(date).format("MMM D, YYYY") : null,
    [date]
  );
  if (!formattedDate && !readingTime) {
    return null;
  }
  const items = [formattedDate, readingTime].filter(Boolean);
  return /* @__PURE__ */ jsx(
    "small",
    {
      className: `container mx-auto block text-xs font-light tracking-tight text-slate-500 dark:text-slate-600 md:text-sm lg:max-w-3xl ${className}`,
      children: items.map((item, index) => /* @__PURE__ */ jsx("span", { className: "mr-4 inline-block", children: item }, index))
    }
  );
}
const PostList = forwardRef(
  (props, ref) => {
    const { className, posts, isTitleVisible } = props;
    const itemTitleClassName = "text-sm md:text-base leading-snug tracking-tight";
    const [isClientReady, setIsClientReady] = useState(false);
    useEffect(() => {
      setIsClientReady(true);
    }, []);
    if (!(posts == null ? void 0 : posts.length)) return null;
    return /* @__PURE__ */ jsxs(
      "section",
      {
        className: twMerge(
          "container mx-auto translate-y-8 opacity-0 transition-all delay-500 duration-300 ease-out lg:max-w-3xl",
          isClientReady ? "translate-y-0 opacity-100" : "",
          className
        ),
        id: "blog",
        ref,
        children: [
          isTitleVisible && /* @__PURE__ */ jsxs("h2", { className: "mb-4 inline-flex w-full items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200 md:mb-12 md:justify-center md:text-4xl", children: [
            /* @__PURE__ */ jsx("div", { className: "relative h-3 w-3 rounded-full bg-amber-500 dark:bg-slate-800 md:h-6 md:w-6", children: /* @__PURE__ */ jsx(SlPencil, { className: "absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 md:h-8 md:w-8" }) }),
            /* @__PURE__ */ jsx("div", { children: "Blog" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex w-full flex-col gap-5", children: posts.map(({ date, href, readingTime, title }, index) => /* @__PURE__ */ jsx("div", { className: "group", children: /* @__PURE__ */ jsxs(SmartLink, { className: "block", href, children: [
            /* @__PURE__ */ jsx(
              PostMetaData,
              {
                className: "mb-1",
                date,
                readingTime
              }
            ),
            isTitleVisible ? /* @__PURE__ */ jsx("h3", { className: itemTitleClassName, children: /* @__PURE__ */ jsx("span", { className: "animated-link text-slate-600 dark:text-slate-100", children: title }) }) : /* @__PURE__ */ jsx("h2", { className: itemTitleClassName, children: /* @__PURE__ */ jsx("span", { className: "animated-link text-slate-600 dark:text-slate-100", children: title }) })
          ] }) }, index)) })
        ]
      }
    );
  }
);
PostList.displayName = "PostList";
const PostList$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PostList
}, Symbol.toStringTag, { value: "Module" }));
function PostListPage({ posts }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      HeroSection,
      {
        description: "Software engineering, learning materials, experiments and opinions.",
        title: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "relative h-4 w-4 rounded-full bg-amber-500 dark:bg-slate-800 md:h-8 md:w-8", children: /* @__PURE__ */ jsx(SlPencil, { className: "absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 md:h-10 md:w-10" }) }),
          /* @__PURE__ */ jsx("div", { children: "Blog" })
        ] })
      }
    ),
    (posts == null ? void 0 : posts.length) ? /* @__PURE__ */ jsx(PostList, { className: "pb-16 pt-8 md:pb-20 md:pt-0", posts }) : /* @__PURE__ */ jsx("div", { className: "pb-48 pt-16 text-center text-4xl font-bold text-slate-200 dark:text-slate-700", children: "Content is coming soon!" })
  ] });
}
const meta$1 = () => {
  return [{
    title: "Blog - Surya Darma Putra"
  }, {
    name: "description",
    content: "Blog posts by Surya Darma Putra"
  }, {
    name: "keywords",
    content: ["software engineer", "javascript", "react", "vue"].join(", ")
  }];
};
async function loader$2() {
  const posts = await getPosts();
  return {
    posts
  };
}
const blog__index = UNSAFE_withComponentProps(function BlogIndex() {
  const {
    posts
  } = useLoaderData();
  return /* @__PURE__ */ jsx(PostListPage, {
    posts
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: blog__index,
  loader: loader$2,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const maxTitleLength = 32;
function formatTitle(title) {
  return title.length > maxTitleLength ? `${title.slice(0, maxTitleLength)}...` : title;
}
function PostLink({ post, next = false }) {
  const wrapperClassName = `
    flex gap-3 items-center py-3 px-4 md:mx-2 mb-4 md:mb-0 rounded-full text-slate-400 
    ${next ? "flex-row-reverse justify-end text-right" : "flex-row justify-start text-left"}
  `;
  if (!post) {
    return /* @__PURE__ */ jsx("div", { className: wrapperClassName });
  }
  return /* @__PURE__ */ jsxs(
    Link,
    {
      className: `${wrapperClassName} border border-slate-300 transition hover:border-slate-400 hover:text-slate-500`,
      prefetch: "viewport",
      title: post.title,
      to: post.href,
      viewTransition: true,
      children: [
        next ? /* @__PURE__ */ jsx(SlArrowRightCircle, {}) : /* @__PURE__ */ jsx(SlArrowLeftCircle, {}),
        /* @__PURE__ */ jsx("div", { children: formatTitle(post.title) })
      ]
    }
  );
}
function PostSwitcher({
  className,
  previousPost,
  nextPost
}) {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: `flex flex-col justify-between md:flex-row ${className}`,
      children: [
        /* @__PURE__ */ jsx(PostLink, { post: previousPost }),
        /* @__PURE__ */ jsx(PostLink, { next: true, post: nextPost })
      ]
    }
  );
}
function PostDetailPage({
  post,
  nextPost,
  previousPost
}) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      PostMetaData,
      {
        className: "mt-20",
        date: post.date,
        readingTime: post.readingTime
      }
    ),
    /* @__PURE__ */ jsx("h2", { className: "lg:max-w-3xl container mx-auto mb-4 mt-4 text-5xl font-extrabold leading-tight text-slate-900 dark:text-slate-300", children: post.title }),
    /* @__PURE__ */ jsx("article", { className: "container mx-auto lg:max-w-3xl", children: /* @__PURE__ */ jsx(BlocksRenderer, { blocks: post.blocks }) }),
    /* @__PURE__ */ jsx(
      Tags,
      {
        category: post.category,
        className: "container mx-auto mb-20 mt-14 md:mt-20 lg:max-w-3xl",
        tags: post.tags
      }
    ),
    /* @__PURE__ */ jsx(
      PostSwitcher,
      {
        className: "container mx-auto mb-20 lg:max-w-3xl",
        nextPost,
        previousPost
      }
    )
  ] });
}
async function getPostBySlug(slug) {
  if (!slug) return null;
  const fileName = `${slug}.json`;
  let fileContent;
  try {
    fileContent = await fs.readFile(path.join(POSTS_DIR, fileName));
  } catch (error) {
    fileContent = null;
  }
  const post = fileContent ? formatPost(fileName, fileContent, true) : null;
  return post;
}
async function getPostDetailAndNavigationBySlug(slug) {
  const posts = await getPosts();
  const post = await getPostBySlug(slug);
  const currentPostIndex = posts.findIndex((item) => item.slug === slug);
  const previousPost = currentPostIndex > 0 ? posts[currentPostIndex - 1] : null;
  const nextPost = currentPostIndex < posts.length - 1 ? posts[currentPostIndex + 1] : null;
  return {
    post,
    previousPost,
    nextPost
  };
}
const meta = ({
  data
}) => {
  const post = data == null ? void 0 : data.post;
  if (!post) {
    return [];
  }
  return [{
    title: `${post.title} - Surya Darma Putra`
  }, {
    name: "description",
    content: post.excerpt
  }, {
    name: "keywords",
    content: [post.category, ...(post == null ? void 0 : post.tags) || []].join(", ")
  }];
};
async function loader$1({
  params
}) {
  const {
    slug
  } = params;
  if (!slug) {
    throw redirect("/blog");
  }
  const {
    post,
    nextPost,
    previousPost
  } = await getPostDetailAndNavigationBySlug(slug);
  if (!post) {
    throw redirect("/blog");
  }
  return {
    post,
    nextPost,
    previousPost
  };
}
const blog_$slug = UNSAFE_withComponentProps(function BlogSlug() {
  const {
    post,
    nextPost,
    previousPost
  } = useLoaderData();
  return /* @__PURE__ */ jsx(PostDetailPage, {
    nextPost,
    post,
    previousPost
  });
});
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: blog_$slug,
  loader: loader$1,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function escapeCdata(s) {
  return s.replace(/\]\]>/g, "]]]]><![CDATA[>");
}
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
async function getFeedXML({
  domain,
  blogPath
}) {
  const posts = await getPosts();
  const blogUrl = `${domain}/${blogPath}`;
  const sitemapPostString = posts.map(
    ({ date, excerpt, slug, title, updatedAt }) => `
        <item>
          <title><![CDATA[${escapeCdata(title)}]]></title>
          <description><![CDATA[${escapeHtml(excerpt)}]]></description>
          <author><![CDATA[${escapeCdata("Surya Darma Putra")}]]></author>
          <pubDate>${date.toUTCString()}</pubDate>
          <lastBuildDate>${updatedAt.toUTCString()}</lastBuildDate>
          <link>${blogUrl}/${slug}</link>
          <guid>${blogUrl}/${slug}</guid>
        </item>
      `.trim()
  ).join("\n");
  const sitemapString = `
    <rss xmlns:blogChannel="${domain}" version="2.0">
    <channel>
      <title>Surya's blog</title>
      <link>${domain}</link>
      <description>Blog posts written by Surya Darma Putra</description>
      <language>en-us</language>
      <ttl>40</ttl>
      ${sitemapPostString}
    </channel>
  </rss>
  `.trim();
  return sitemapString;
}
async function loader({
  request
}) {
  const host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  if (!host) {
    throw new Error("Could not determine domain URL.");
  }
  const protocol = host.includes("localhost") ? "http" : "https";
  const domain = `${protocol}://${host}`;
  const feedXML = await getFeedXML({
    domain,
    blogPath: "blog"
  });
  return new Response(feedXML, {
    headers: {
      "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
      "Content-Type": "application/xml",
      "Content-Length": String(Buffer.byteLength(feedXML))
    }
  });
}
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CSKzMUw5.js", "imports": ["/assets/chunk-B7RQU5TL-55_CKvuM.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-Cz_339Ip.js", "imports": ["/assets/chunk-B7RQU5TL-55_CKvuM.js"], "css": ["/assets/root-CcP3BZqm.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/api.optimize-image": { "id": "routes/api.optimize-image", "parentId": "root", "path": "api/optimize-image", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/api.optimize-image-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/extras[.json]": { "id": "routes/extras[.json]", "parentId": "root", "path": "extras.json", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/extras_.json_-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/sitemap[.xml]": { "id": "routes/sitemap[.xml]", "parentId": "root", "path": "sitemap.xml", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/sitemap_.xml_-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/robots[.txt]": { "id": "routes/robots[.txt]", "parentId": "root", "path": "robots.txt", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/robots_.txt_-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/work._index": { "id": "routes/work._index", "parentId": "root", "path": "work", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/work._index-I2bRc3pQ.js", "imports": ["/assets/chunk-B7RQU5TL-55_CKvuM.js", "/assets/index-DMi2Toep.js", "/assets/SmartLink-BnwH7jTb.js", "/assets/HeroSection-DJ8kSL_G.js", "/assets/DefaultLayout-DFN0FtIT.js", "/assets/ProjectCard-C8t63Hcu.js", "/assets/index-BYc-GQoV.js", "/assets/index-BKNjMPK8.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/work.$slug": { "id": "routes/work.$slug", "parentId": "root", "path": "work/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/work._slug-BviUQa_O.js", "imports": ["/assets/chunk-B7RQU5TL-55_CKvuM.js", "/assets/Tag-CMoo1dVg.js", "/assets/index-DMi2Toep.js", "/assets/HeroSection-DJ8kSL_G.js", "/assets/DefaultLayout-DFN0FtIT.js", "/assets/index-BYc-GQoV.js", "/assets/ProjectCarousel-DOvMqOsG.js", "/assets/preload-helper-D7HrI6pR.js", "/assets/SmartLink-BnwH7jTb.js", "/assets/index-BKNjMPK8.js", "/assets/ProjectCard-C8t63Hcu.js"], "css": ["/assets/Tag-CkiA8Iw3.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_index-BUgjyhbU.js", "imports": ["/assets/chunk-B7RQU5TL-55_CKvuM.js", "/assets/preload-helper-D7HrI6pR.js", "/assets/DefaultLayout-DFN0FtIT.js", "/assets/ProjectCarousel-DOvMqOsG.js", "/assets/SmartLink-BnwH7jTb.js", "/assets/index-BYc-GQoV.js", "/assets/index-DMi2Toep.js", "/assets/ProjectCard-C8t63Hcu.js", "/assets/index-BKNjMPK8.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-CvrTmzVV.js", "imports": ["/assets/chunk-B7RQU5TL-55_CKvuM.js", "/assets/dayjs.min-BBf2RD_Y.js", "/assets/index-DMi2Toep.js", "/assets/HeroSection-DJ8kSL_G.js", "/assets/DefaultLayout-DFN0FtIT.js", "/assets/SmartLink-BnwH7jTb.js", "/assets/index-BYc-GQoV.js", "/assets/GetInTouchSection-CVybfYmN.js", "/assets/index-BKNjMPK8.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/blog": { "id": "routes/blog", "parentId": "root", "path": "blog", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/blog-Bv6SVNBx.js", "imports": ["/assets/chunk-B7RQU5TL-55_CKvuM.js", "/assets/DefaultLayout-DFN0FtIT.js", "/assets/SmartLink-BnwH7jTb.js", "/assets/index-DMi2Toep.js", "/assets/index-BYc-GQoV.js", "/assets/index-BKNjMPK8.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/blog._index": { "id": "routes/blog._index", "parentId": "routes/blog", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/blog._index-CMaGuKho.js", "imports": ["/assets/chunk-B7RQU5TL-55_CKvuM.js", "/assets/index-DMi2Toep.js", "/assets/HeroSection-DJ8kSL_G.js", "/assets/PostList-oIuDQVRP.js", "/assets/SmartLink-BnwH7jTb.js", "/assets/PostMetaData-ConSlU12.js", "/assets/dayjs.min-BBf2RD_Y.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/blog.$slug": { "id": "routes/blog.$slug", "parentId": "routes/blog", "path": ":slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/blog._slug-3GqaWiAX.js", "imports": ["/assets/chunk-B7RQU5TL-55_CKvuM.js", "/assets/Tag-CMoo1dVg.js", "/assets/PostMetaData-ConSlU12.js", "/assets/index-DMi2Toep.js", "/assets/preload-helper-D7HrI6pR.js", "/assets/dayjs.min-BBf2RD_Y.js"], "css": ["/assets/Tag-CkiA8Iw3.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/blog.feed": { "id": "routes/blog.feed", "parentId": "routes/blog", "path": "feed", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/blog.feed-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-67adac50.js", "version": "67adac50", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/api.optimize-image": {
    id: "routes/api.optimize-image",
    parentId: "root",
    path: "api/optimize-image",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/extras[.json]": {
    id: "routes/extras[.json]",
    parentId: "root",
    path: "extras.json",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/sitemap[.xml]": {
    id: "routes/sitemap[.xml]",
    parentId: "root",
    path: "sitemap.xml",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/robots[.txt]": {
    id: "routes/robots[.txt]",
    parentId: "root",
    path: "robots.txt",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/work._index": {
    id: "routes/work._index",
    parentId: "root",
    path: "work",
    index: true,
    caseSensitive: void 0,
    module: route5
  },
  "routes/work.$slug": {
    id: "routes/work.$slug",
    parentId: "root",
    path: "work/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route7
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/blog": {
    id: "routes/blog",
    parentId: "root",
    path: "blog",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/blog._index": {
    id: "routes/blog._index",
    parentId: "routes/blog",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route10
  },
  "routes/blog.$slug": {
    id: "routes/blog.$slug",
    parentId: "routes/blog",
    path: ":slug",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/blog.feed": {
    id: "routes/blog.feed",
    parentId: "routes/blog",
    path: "feed",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  }
};
export {
  OptimizedImage as O,
  RichText as R,
  assetsBuildDirectory as a,
  basename as b,
  concatPlainTexts as c,
  publicPath as d,
  entry as e,
  future as f,
  getFileExtensionFromUrl as g,
  routes as h,
  isSpaMode as i,
  serverManifest as j,
  prerender as p,
  routeDiscovery as r,
  ssr as s
};
//# sourceMappingURL=server-build-BR9HeBqZ.js.map
