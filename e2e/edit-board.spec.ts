import { test, expect } from "@playwright/test";
import data from "../src/data.json" with { type: "json" };

test("edit board", async ({ page }) => {
  const firstBoard = data.boards[0];
  await page.goto("/");
  await expect(page).toHaveURL(
    (url) => url.searchParams.get("board") === firstBoard.name,
  );
  await page.getByRole("button", { name: "Board options" }).click();
  await page.getByRole("menuitem", { name: "Edit Board" }).click();
  await page.getByLabel("Board Name").fill("1");
  await page.getByRole("button", { name: "Save Changes" }).click();

  await expect(
    page
      .getByRole("alert")
      .filter({ hasText: "Board name must contain at least one letter" }),
  ).toBeVisible();

  await page.getByLabel("Board Name").clear();
  await page.getByLabel("Board Name").fill("Learn Java");
  await page.getByRole("button", { name: "Save Changes" }).click();
  await expect(page).toHaveURL(
    (url) => url.searchParams.get("board") === "Learn Java",
  );
});
