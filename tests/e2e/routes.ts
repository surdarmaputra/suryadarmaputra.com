/** Every page route the site serves with the seeded fixture content. */
export const PAGE_ROUTES = [
  { path: "/", title: "Home", heading: "Surya Darma Putra" },
  { path: "/about", title: "About Me", heading: "About Me" },
  { path: "/articles", title: "Articles", heading: "Articles" },
  {
    path: "/articles/block-showcase-article",
    title: "Block Showcase Article",
    heading: "Block Showcase Article",
  },
  {
    path: "/articles/second-test-article",
    title: "Second Test Article",
    heading: "Second Test Article",
  },
  { path: "/projects", title: "Projects", heading: "Projects" },
  { path: "/projects/project-alpha", title: "Project Alpha", heading: "Project Alpha" },
  { path: "/projects/project-beta", title: "Project Beta", heading: "Project Beta" },
] as const;

export const SITE_NAME = "Surya Darma Putra";
