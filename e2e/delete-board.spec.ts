import { test, expect } from "@playwright/test";
import data from "../src/data.json" with { type: "json" };

const [firstBoard, secondBoard] = data.boards;

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(
    (url) => url.searchParams.get("board") === firstBoard.name,
  );
  await page.getByRole("button", { name: "Board options" }).click();
  await page.getByRole("menuitem", { name: "Delete Board" }).click();
});

test("delete board and moves to next board", async ({ page }) => {
  const confirm = page.getByRole("alertdialog");
  await expect(confirm).toContainText(firstBoard.name);

  await confirm.getByRole("button", { name: "Delete", exact: true }).click();
  await expect(confirm).toBeHidden();

  await expect(page).toHaveURL(
    (url) => url.searchParams.get("board") === secondBoard.name,
  );
  await expect(
    page.getByRole("heading", { name: secondBoard.name }),
  ).toBeVisible();
  await expect(page.getByText(firstBoard.name, { exact: true })).toHaveCount(0);
});

test("cancel keeps the board", async ({ page }) => {
  const confirm = page.getByRole("alertdialog");
  await confirm.getByRole("button", { name: "Cancel" }).click();
  await expect(confirm).toBeHidden();

  await expect(page).toHaveURL(
    (url) => url.searchParams.get("board") === firstBoard.name,
  );
  await expect(
    page.getByText(firstBoard.name, { exact: true }).first(),
  ).toBeVisible();
});

test("deleting the last board moves to the previous one", async ({ page }) => {
  await page.goto("/");
  const last = data.boards.at(-1);
  console.log("last board", last);
  await page.getByRole("button", { name: last!.name }).click();
  await expect(page).toHaveURL(
    (url) => url.searchParams.get("board") === last!.name,
  );

  await expect(page.getByRole("heading", { name: last!.name })).toBeVisible();

  await page.getByRole("button", { name: "Board options" }).click();
  await page.getByRole("menuitem", { name: "Delete Board" }).click();

  await page
    .getByRole("alertdialog")
    .getByRole("button", { name: "Delete", exact: true })
    .click();

  await expect(page.getByText(last!.name, { exact: true })).toHaveCount(0);
  await expect(page).toHaveURL(
    (url) => url.searchParams.get("board") === firstBoard.name,
  );
});
