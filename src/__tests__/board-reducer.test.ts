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
});
