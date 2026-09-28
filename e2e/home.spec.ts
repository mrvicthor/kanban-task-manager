import { test, expect } from "@playwright/test";
import data from "../src/data.json" with { type: "json" };

test.describe("home page", () => {
  test("shows the first board and its columns when boards exist", async ({
    page,
  }) => {
    const firstBoard = data.boards[0];
    await page.goto("/");
    await expect(page).toHaveURL(
      (url) => url.searchParams.get("board") === firstBoard.name,
    );
    await expect(
      page.getByRole("heading", { level: 1, name: firstBoard.name }),
    ).toBeVisible();

    for (const column of firstBoard.columns) {
      await expect(
        page.getByRole("heading", {
          name: new RegExp(
            `^${column.name} \\(${column.tasks.length}\\)$`,
            "i",
          ),
        }),
      ).toBeVisible();
    }

    await expect(page.getByText(/create one to get started/i)).toBeHidden();
  });
});
