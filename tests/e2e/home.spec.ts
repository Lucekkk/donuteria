import { test, expect } from "@playwright/test";

test("home page shows title", async ({ page }) => {
  await page.goto("http://localhost:3000");
  const heading = page.getByRole("heading", { name: /Słodki donut/i }).first();
  await expect(heading).toBeVisible();
});
