import { test, expect } from "@playwright/test";

test("add board with columns", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "add new board", exact: true })
    .click();

  const dialog = page.getByRole("dialog", { name: "Add New Board" });
  await expect(dialog).toBeVisible();

  await dialog.getByPlaceholder("e.g. Web Design").fill("Learn Java");

  const columns = dialog.getByRole("combobox");
  await expect(columns).toHaveCount(2);
  await expect(columns.nth(0)).toHaveText(/Todo/);
  await expect(columns.nth(1)).toHaveText(/Doing/);
  const removeButton = dialog.getByRole("button", { name: "Remove Column" });
  const initialColumnCount = await columns.count();

  await dialog.getByRole("button", { name: "Add New Column" }).click();
  await expect(columns).toHaveCount(initialColumnCount + 1);

  await columns.last().click();
  await page.getByRole("option", { name: "Done" }).click();
  await expect(columns.last()).toHaveText(/Done/);

  await dialog.getByRole("button", { name: "Add New Column" }).click();
  await expect(columns).toHaveCount(initialColumnCount + 2);
  await removeButton.last().click();
  await expect(columns).toHaveCount(initialColumnCount + 1);

  await dialog.getByRole("button", { name: "Create New Board" }).click();
  await expect(dialog).toBeHidden();

  await expect(page.getByRole("heading", { name: /done/i })).toBeVisible();
});

test("rejects duplicate columns", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "add new board", exact: true })
    .click();

  const dialog = page.getByRole("dialog", { name: "Add New Board" });
  await dialog.getByPlaceholder("e.g. Web Design").fill("Learn Java");

  await dialog.getByRole("button", { name: "Add New Column" }).click();
  await dialog.getByRole("combobox").last().click();
  await page.getByRole("option", { name: "Doing" }).click();

  await dialog.getByRole("button", { name: "Create New Board" }).click();

  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("alert")).toBeVisible();
});
