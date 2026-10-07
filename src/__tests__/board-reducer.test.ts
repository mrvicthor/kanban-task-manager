import { expect, test, describe } from "vitest";
import { boardReducer, type ActionType, type BoardData } from "../domain/board";
import { type Board, type Task } from "@/domain/schema";

describe("boardReducer", () => {
  test("should throw an error for unknown action type", () => {
    const state = {
      boards: [],
    };
    const action = { type: "unknown_action" } as unknown as ActionType;

    expect(() => boardReducer(state, action)).toThrow(
      "Unknown action type: unknown_action",
    );
  });

  test("should add a new board if action type is 'add_board' ", () => {
    const board: Board = {
      id: "learn-java-ab2cc4",
      name: "Learn Java",
      columns: [],
    };
    const initialState = {
      boards: [],
    };
    const next = boardReducer(initialState, {
      type: "add_board",
      boardId: board.id,
      boardName: board.name,
      columns: board.columns,
    });
    expect(next).toEqual({
      ...initialState,
      boards: [
        {
          columns: [],
          id: "learn-java-ab2cc4",
          name: "Learn Java",
        },
      ],
    });
  });

  test("should update board if the action type is 'update_board'", () => {
    const board: Board = {
      id: "learn-java-ab2cc4",
      name: "Learn Java",
      columns: [],
    };
    const initialState: BoardData = {
      boards: [board],
    };
    const updatedBoard: Board = {
      ...board,
      name: "Study JavaScript",
      columns: [
        {
          id: "doing-abvd-0a2ce",
          name: "Doing",
          tasks: [],
        },
      ],
    };
    const next = boardReducer(initialState, {
      type: "update_board",
      boardId: updatedBoard.id,
      columns: updatedBoard.columns,
      boardName: updatedBoard.name,
      columnId: "doing-abvd-0a2ce",
    });
    expect(next).toEqual({ ...initialState, boards: [updatedBoard] });
  });

  test("should be able to delete a board if action type is 'delete_board'", () => {
    const board: Board = {
      id: "learn-java-ab2cc4",
      name: "Learn Java",
      columns: [],
    };
    const initialState: BoardData = {
      boards: [board],
    };
    const next = boardReducer(initialState, {
      type: "delete_board",
      boardId: board.id,
    });

    expect(next).toEqual({ ...initialState, boards: [] });
  });

  test("should add new task to a column if action type is 'add_task'", () => {
    const board: Board = {
      id: "learn-java-ab2cc4",
      name: "Learn Java",
      columns: [
        {
          id: "doing-0abze-3rc56",
          name: "Todo",
          tasks: [],
        },
      ],
    };
    const initialState: BoardData = {
      boards: [board],
    };

    const task: Task = {
      id: crypto.randomUUID(),
      title: "Read a book",
      description: "I have to read",
      subtasks: [],
      status: "Todo",
    };

    const next = boardReducer(initialState, {
      type: "add_task",
      boardId: board.id,
      task,
      status: "Todo",
    });

    expect(next).toEqual({
      ...initialState,
      boards: [
        {
          ...board,
          columns: [
            {
              id: "doing-0abze-3rc56",
              name: "Todo",
              tasks: [{ ...task }],
            },
          ],
        },
      ],
    });
  });

  test("should update task if the action type is 'update_task'", () => {
    const board: Board = {
      id: "learn-java-ab2cc4",
      name: "Learn Java",
      columns: [
        {
          id: "doing-0abze-3rc56",
          name: "Todo",
          tasks: [
            {
              id: "todo-056abc-3rech",
              title: "Read a book",
              description: "I have to read",
              subtasks: [],
              status: "Todo",
            },
          ],
        },
      ],
    };
    const initialState: BoardData = {
      boards: [board],
    };

    const updatedTask: Task = {
      id: "todo-056abc-3rech",
      title: "Watch youtube tutorials",
      description: "I have to read",
      subtasks: [],
      status: "Todo",
    };
    const next = boardReducer(initialState, {
      type: "update_task",
      boardId: board.id,
      oldStatus: board.columns[0].name,
      taskId: updatedTask.id,
      task: updatedTask,
    });

    expect(next).toEqual({
      ...initialState,
      boards: [
        {
          ...board,
          columns: [
            {
              id: "doing-0abze-3rc56",
              name: "Todo",
              tasks: [
                {
                  id: "todo-056abc-3rech",
                  title: updatedTask.title,
                  description: updatedTask.description,
                  subtasks: updatedTask.subtasks,
                  status: updatedTask.status,
                },
              ],
            },
          ],
        },
      ],
    });
  });

  test("should delete task if the action type is 'delete_task'", () => {
    const board: Board = {
      id: "learn-java-ab2cc4",
      name: "Learn Java",
      columns: [
        {
          id: "doing-0abze-3rc56",
          name: "Todo",
          tasks: [
            {
              id: "todo-056abc-3rech",
              title: "Read a book",
              description: "I have to read",
              subtasks: [],
              status: "Todo",
            },
          ],
        },
      ],
    };
    const initialState: BoardData = {
      boards: [board],
    };

    const next = boardReducer(initialState, {
      type: "delete_task",
      boardId: board.id,
      status: board.columns[0].name,
      taskId: board.columns[0].tasks[0].id,
    });

    expect(next).toEqual({
      ...initialState,
      boards: [
        {
          ...board,
          columns: [
            {
              id: "doing-0abze-3rc56",
              name: "Todo",
              tasks: [],
            },
          ],
        },
      ],
    });
  });

  test("should move task to a new column and update it if the action type is 'move_task'", () => {
    const board: Board = {
      id: "board-platform-launch",
      name: "Platform Launch",
      columns: [
        {
          id: "col-platform-launch-todo",
          name: "Todo",
          tasks: [
            {
              id: "task-build-ui-for-onboarding-flow",
              title: "Build UI for onboarding flow",
              description: "",
              status: "Todo",
              subtasks: [
                {
                  id: "subtask-sign-up-page",
                  title: "Sign up page",
                  isCompleted: true,
                },
                {
                  id: "subtask-sign-in-page",
                  title: "Sign in page",
                  isCompleted: false,
                },
                {
                  id: "subtask-welcome-page",
                  title: "Welcome page",
                  isCompleted: false,
                },
              ],
            },
            {
              id: "task-build-ui-for-search",
              title: "Build UI for search",
              description: "",
              status: "Todo",
              subtasks: [
                {
                  id: "subtask-search-page",
                  title: "Search page",
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          id: "col-platform-launch-doing",
          name: "Doing",
          tasks: [
            {
              id: "task-design-settings-and-search-pages",
              title: "Design settings and search pages",
              description: "",
              status: "Doing",
              subtasks: [
                {
                  id: "subtask-settings-account-page",
                  title: "Settings - Account page",
                  isCompleted: true,
                },
                {
                  id: "subtask-settings-billing-page",
                  title: "Settings - Billing page",
                  isCompleted: true,
                },
                {
                  id: "subtask-search-page-2",
                  title: "Search page",
                  isCompleted: false,
                },
              ],
            },
            {
              id: "task-add-account-management-endpoints",
              title: "Add account management endpoints",
              description: "",
              status: "Doing",
              subtasks: [
                {
                  id: "subtask-upgrade-plan",
                  title: "Upgrade plan",
                  isCompleted: true,
                },
                {
                  id: "subtask-cancel-plan",
                  title: "Cancel plan",
                  isCompleted: true,
                },
                {
                  id: "subtask-update-payment-method",
                  title: "Update payment method",
                  isCompleted: false,
                },
              ],
            },
          ],
        },
      ],
    };
    const initialState: BoardData = {
      boards: [board],
    };
    const next = boardReducer(initialState, {
      type: "move_task",
      boardId: board.id,
      taskId: "task-build-ui-for-onboarding-flow",
      toColumnId: "col-platform-launch-doing",
      toIndex: 2,
    });

    expect(next).toEqual({
      ...initialState,
      boards: [
        {
          ...board,
          columns: [
            {
              id: "col-platform-launch-todo",
              name: "Todo",
              tasks: [
                {
                  id: "task-build-ui-for-search",
                  title: "Build UI for search",
                  description: "",
                  status: "Todo",
                  subtasks: [
                    {
                      id: "subtask-search-page",
                      title: "Search page",
                      isCompleted: false,
                    },
                  ],
                },
              ],
            },
            {
              id: "col-platform-launch-doing",
              name: "Doing",
              tasks: [
                {
                  id: "task-design-settings-and-search-pages",
                  title: "Design settings and search pages",
                  description: "",
                  status: "Doing",
                  subtasks: [
                    {
                      id: "subtask-settings-account-page",
                      title: "Settings - Account page",
                      isCompleted: true,
                    },
                    {
                      id: "subtask-settings-billing-page",
                      title: "Settings - Billing page",
                      isCompleted: true,
                    },
                    {
                      id: "subtask-search-page-2",
                      title: "Search page",
                      isCompleted: false,
                    },
                  ],
                },
                {
                  id: "task-add-account-management-endpoints",
                  title: "Add account management endpoints",
                  description: "",
                  status: "Doing",
                  subtasks: [
                    {
                      id: "subtask-upgrade-plan",
                      title: "Upgrade plan",
                      isCompleted: true,
                    },
                    {
                      id: "subtask-cancel-plan",
                      title: "Cancel plan",
                      isCompleted: true,
                    },
                    {
                      id: "subtask-update-payment-method",
                      title: "Update payment method",
                      isCompleted: false,
                    },
                  ],
                },
                {
                  id: "task-build-ui-for-onboarding-flow",
                  title: "Build UI for onboarding flow",
                  description: "",
                  status: "Doing",
                  subtasks: [
                    {
                      id: "subtask-sign-up-page",
                      title: "Sign up page",
                      isCompleted: true,
                    },
                    {
                      id: "subtask-sign-in-page",
                      title: "Sign in page",
                      isCompleted: false,
                    },
                    {
                      id: "subtask-welcome-page",
                      title: "Welcome page",
                      isCompleted: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  });
});
