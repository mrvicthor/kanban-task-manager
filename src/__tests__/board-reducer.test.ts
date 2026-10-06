import { expect, test, describe } from "vitest";
import { boardReducer, type ActionType, type BoardData } from "../domain/board";
import { type Board } from "@/domain/schema";

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
});
