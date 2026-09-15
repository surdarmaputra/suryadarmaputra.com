import { expect, test } from "@playwright/test";

test.describe("RSS feed", () => {
  test("serves valid XML with one item per article", async ({ request }) => {
    const response = await request.get("/articles/feed");

    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain('<rss version="2.0">');
    expect(body).toContain("Block Showcase Article");
    expect(body).toContain("Second Test Article");
    expect((body.match(/<item>/g) ?? []).length).toBe(2);
  });

  test("links each item to its article page", async ({ request }) => {
    const body = await (await request.get("/articles/feed")).text();

    expect(body).toContain("/articles/block-showcase-article/");
    expect(body).toContain("/articles/second-test-article/");
  });
});
