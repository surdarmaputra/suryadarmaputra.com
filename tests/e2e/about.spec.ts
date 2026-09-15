import { expect, test } from "@playwright/test";

test.describe("about page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("shows the About Me header", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("About Me");
  });

  test("shows the profile photo with descriptive alt text", async ({ page }) => {
    const photo = page.locator('img[src="/images/me.jpeg"]').first();

    await expect(photo).toBeAttached();
    expect(await photo.getAttribute("alt")).toBeTruthy();
  });

  test("links out to social profiles", async ({ page }) => {
    await expect(page.locator('a[href="https://github.com/surdarmaputra"]').first()).toBeAttached();
    await expect(
      page.locator('a[href="https://linkedin.com/in/surdarmaputra"]').first()
    ).toBeAttached();
  });
});
