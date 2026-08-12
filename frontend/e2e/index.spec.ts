import { test, expect } from "@playwright/test";

test("トップページが表示される", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("ポケモン相性診断 | Poke App");
  await expect(page.getByRole("heading", { name: "ポケモン相性診断" })).toBeVisible();
});
