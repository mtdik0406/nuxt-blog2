import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should display the blog title", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Latest Posts");
  });

  test("should display blog posts", async ({ page }) => {
    await page.goto("/");
    const posts = page.locator("article");
    await expect(posts).toHaveCount(3);
  });

  test("should navigate to blog post", async ({ page }) => {
    await page.goto("/");
    await page.click("article:first-child a");
    await expect(page).toHaveURL(/\/blog\//);
  });
});

test.describe("Navigation", () => {
  test("should navigate to tags page", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/tags"]');
    await expect(page).toHaveURL("/tags");
    await expect(page.locator("h1")).toContainText("Tags");
  });

  test("should toggle dark mode", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");

    // Check initial state (system preference or light)
    const initialClass = await html.getAttribute("class");

    // Click theme toggle button
    await page.click('button[aria-label="テーマ切り替え"]');

    // Check that class changed
    const newClass = await html.getAttribute("class");
    expect(newClass).not.toBe(initialClass);
  });
});

test.describe("Blog Post", () => {
  test("should display post content", async ({ page }) => {
    await page.goto("/blog/hello-world");
    await expect(page.locator("h1")).toContainText("ブログを開設しました");
  });

  test("should display tags on post", async ({ page }) => {
    await page.goto("/blog/hello-world");
    await expect(page.locator("text=#お知らせ")).toBeVisible();
  });
});
