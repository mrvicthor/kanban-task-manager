import { test, expect } from "@playwright/test";

test.describe("add task", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "add new task" }).click();
    await expect(
      page.getByRole("dialog", { name: "Add New Task" }),
    ).toBeVisible();
  });
  test("add task", async ({ page }) => {
    const dialog = page.getByRole("dialog", { name: "Add New Task" });
    await dialog.getByLabel("Title").fill("Go for a run");

    await dialog
      .getByLabel("Description")
      .fill("I need to go for a run to stay healthy and fit.");

    const subtasks = dialog.getByRole("textbox", { name: /^Subtask \d+$/ });
    const initialSubtaskCount = await subtasks.count();
    console.log("Initial subtask count:", initialSubtaskCount);
    await dialog
      .getByRole("button", {
        name: `Remove subtask ${initialSubtaskCount}`,
      })
      .click();
    await dialog
      .getByRole("button", {
        name: `Remove subtask ${initialSubtaskCount - 1}`,
      })
      .click();

    await dialog.getByRole("button", { name: "Add New Subtask" }).click();
    await dialog.getByRole("button", { name: "Add New Subtask" }).click();
    await expect(subtasks).toHaveCount(initialSubtaskCount);

    await subtasks.nth(initialSubtaskCount - 1).fill("Go to the park");
    await subtasks.nth(initialSubtaskCount - 2).fill("Run for 30 minutes");

    console.log("Subtask count after removal:", initialSubtaskCount);
    await expect(subtasks).toHaveCount(initialSubtaskCount);
    await dialog.getByRole("button", { name: "Create Task" }).click();
    await expect(dialog).toBeHidden();

    const card = page.getByText("Go for a run", { exact: true });
    await expect(card).toBeVisible();
  });

  test("rejects empty title", async ({ page }) => {
    const dialog = page.getByRole("dialog", { name: "Add New Task" });
    await dialog.getByRole("button", { name: "Create Task" }).click();

    await expect(dialog).toBeVisible();
    await expect(page.getByRole("alert").first()).toBeVisible();
  });
});
